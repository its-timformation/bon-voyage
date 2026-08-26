import { Client, isFullPage } from "@notionhq/client";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import type { City, Place, JournalPost, Fact } from "./types";

// ─────────────────────────────────────────────────────────────────────────
// Notion-as-CMS
//
// Three databases, one per content type — see NOTION_SETUP.md for the exact
// property names/types each database needs. This file only runs at BUILD
// TIME (inside generateStaticParams / the page's async server component),
// never in the browser, so the token never reaches the client.
//
// Two things this file exists specifically to work around:
//
// 1. Notion's file/image URLs are pre-signed S3 links that expire (roughly
//    an hour). If we put them straight into the HTML, images would 404 for
//    visitors after the link expired. `cacheImage()` downloads each image
//    once at build time into /public/notion-cache and returns a stable
//    local path — the site then never depends on Notion's URL surviving.
//
// 2. The Notion API is rate-limited (~3 requests/sec) and is not something
//    you want a live visitor's page load blocking on. This file is only
//    ever called at build time (Next's static generation / ISR revalidate),
//    never from a client request — so normal traffic never touches Notion.
// ─────────────────────────────────────────────────────────────────────────

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const CITIES_DB = process.env.NOTION_CITIES_DB_ID;
const PLACES_DB = process.env.NOTION_PLACES_DB_ID;
const JOURNAL_DB = process.env.NOTION_JOURNAL_DB_ID;

export const notionConfigured = Boolean(NOTION_TOKEN && CITIES_DB && PLACES_DB);

const client = NOTION_TOKEN ? new Client({ auth: NOTION_TOKEN }) : null;

const CACHE_DIR = path.join(process.cwd(), "public", "notion-cache");

async function cacheImage(url: string | null | undefined): Promise<string | undefined> {
  if (!url) return undefined;
  if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

  const hash = crypto.createHash("sha1").update(url.split("?")[0]).digest("hex").slice(0, 16);
  const ext = (url.split("?")[0].split(".").pop() || "jpg").slice(0, 4);
  const filename = `${hash}.${ext}`;
  const localPath = path.join(CACHE_DIR, filename);
  const publicPath = `/notion-cache/${filename}`;

  if (fs.existsSync(localPath)) return publicPath;

  try {
    const res = await fetch(url);
    if (!res.ok) return undefined;
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(localPath, buf);
    return publicPath;
  } catch {
    // Build shouldn't fail because one image didn't download — the page
    // just renders without that image rather than breaking the whole build.
    return undefined;
  }
}

// ── Property readers — small helpers over Notion's verbose property shape ──
type NotionProps = Record<string, any>;

function title(props: NotionProps, key: string): string {
  return props[key]?.title?.map((t: any) => t.plain_text).join("") ?? "";
}
function richText(props: NotionProps, key: string): string {
  return props[key]?.rich_text?.map((t: any) => t.plain_text).join("") ?? "";
}
function richTextParagraphs(props: NotionProps, key: string): string[] {
  const text = richText(props, key);
  return text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
}
function select(props: NotionProps, key: string): string | undefined {
  return props[key]?.select?.name;
}
function multiSelect(props: NotionProps, key: string): string[] {
  return props[key]?.multi_select?.map((o: any) => o.name) ?? [];
}
function number(props: NotionProps, key: string): number | undefined {
  return props[key]?.number ?? undefined;
}
function relationIds(props: NotionProps, key: string): string[] {
  return props[key]?.relation?.map((r: any) => r.id) ?? [];
}
function firstFileUrl(props: NotionProps, key: string): string | undefined {
  const file = props[key]?.files?.[0];
  if (!file) return undefined;
  return file.type === "external" ? file.external?.url : file.file?.url;
}
function allFileUrls(props: NotionProps, key: string): string[] {
  const files = props[key]?.files ?? [];
  return files
    .map((f: any) => (f.type === "external" ? f.external?.url : f.file?.url))
    .filter(Boolean);
}

// The 2025-09-03 Notion API split each database into one-or-more "data
// sources" — querying rows now happens against a data source id, not the
// database id directly. A database created the normal way (not a merged
// multi-source one) has exactly one, so we resolve and cache database id ->
// its first data source id, once.
const dataSourceIdCache = new Map<string, string>();

async function resolveDataSourceId(databaseId: string): Promise<string | null> {
  if (dataSourceIdCache.has(databaseId)) return dataSourceIdCache.get(databaseId)!;
  if (!client) return null;
  const db = await client.databases.retrieve({ database_id: databaseId });
  const dataSourceId = (db as any).data_sources?.[0]?.id as string | undefined;
  if (!dataSourceId) return null;
  dataSourceIdCache.set(databaseId, dataSourceId);
  return dataSourceId;
}

async function queryAll(databaseId: string) {
  if (!client) return [];
  const dataSourceId = await resolveDataSourceId(databaseId);
  if (!dataSourceId) return [];
  const pages: any[] = [];
  let cursor: string | undefined = undefined;
  do {
    const res = await client.dataSources.query({ data_source_id: dataSourceId, start_cursor: cursor });
    pages.push(...res.results);
    cursor = res.has_more ? (res.next_cursor ?? undefined) : undefined;
  } while (cursor);
  return pages.filter(isFullPage);
}

// ── Public fetchers — one per content type ──────────────────────────────

export async function fetchCitiesFromNotion(): Promise<City[]> {
  if (!client || !CITIES_DB) return [];
  const pages = await queryAll(CITIES_DB);
  const out: City[] = [];
  for (const page of pages) {
    const p = page.properties as NotionProps;
    out.push({
      slug: richText(p, "Slug") || title(p, "Name").toLowerCase().replace(/\s+/g, "-"),
      name: title(p, "Name"),
      placeCount: number(p, "Place Count") ?? 0,
      updated: richText(p, "Updated") || new Date(page.last_edited_time).toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      teaserLine: richText(p, "Teaser Line"),
      description: richText(p, "Description"),
      heroImage: await cacheImage(firstFileUrl(p, "Hero Image")),
    });
  }
  return out;
}

export async function fetchPlacesFromNotion(): Promise<Place[]> {
  if (!client || !PLACES_DB) return [];
  const pages = await queryAll(PLACES_DB);
  const out: Place[] = [];
  for (const page of pages) {
    const p = page.properties as NotionProps;
    const factLabels = ["Address", "Website", "Hours", "Brunch", "Typical Spend", "Nearest", "Booking", "Payment"];
    const facts: Fact[] = factLabels
      .map((label) => ({ label, value: richText(p, label) }))
      .filter((f) => f.value);

    out.push({
      slug: richText(p, "Slug") || title(p, "Name").toLowerCase().replace(/\s+/g, "-"),
      citySlug: richText(p, "City Slug"),
      city: richText(p, "City") || relationIds(p, "City").join(""),
      name: title(p, "Name"),
      category: (select(p, "Category") as any) || "Discover",
      verdict: select(p, "Verdict") as any,
      take: richText(p, "Take"),
      practicalPills: multiSelect(p, "Practical Pills"),
      neighbourhood: richText(p, "Neighbourhood"),
      cost: (select(p, "Cost") as any) || "Medium",
      heroImage: await cacheImage(firstFileUrl(p, "Hero Image")),
      gallery: await Promise.all(allFileUrls(p, "Gallery").map(cacheImage)).then((arr) => arr.filter(Boolean) as string[]),
      body: richTextParagraphs(p, "Body"),
      skipItIf: richText(p, "Skip It If"),
      facts,
    });
  }
  return out;
}

export async function fetchJournalFromNotion(): Promise<JournalPost[]> {
  if (!client || !JOURNAL_DB) return [];
  const pages = await queryAll(JOURNAL_DB);
  const out: JournalPost[] = [];
  for (const page of pages) {
    const p = page.properties as NotionProps;
    out.push({
      slug: richText(p, "Slug") || title(p, "Title").toLowerCase().replace(/\s+/g, "-"),
      title: title(p, "Title"),
      citySlug: richText(p, "City Slug"),
      city: richText(p, "City"),
      date: richText(p, "Date"),
      readMins: number(p, "Read Minutes") ?? 4,
      heroImage: await cacheImage(firstFileUrl(p, "Hero Image")),
    });
  }
  return out;
}
