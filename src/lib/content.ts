import { City, Place, JournalPost, Route } from "./types";
import { cities as seedCities, places as seedPlaces, journalPosts as seedJournal, routes as seedRoutes } from "@/data/seed";
import { notionConfigured, fetchCitiesFromNotion, fetchPlacesFromNotion, fetchJournalFromNotion } from "./notion";

// ─────────────────────────────────────────────────────────────────────────
// The ONE place every page imports content from. Pages never import
// src/data/seed or src/lib/notion directly — that's what keeps switching
// content sources a one-line change instead of a site-wide find/replace.
//
// No NOTION_TOKEN configured (the default, works out of the box) → the
// site runs on the seed content in src/data/seed.ts.
// NOTION_TOKEN + database IDs set (see NOTION_SETUP.md) → content comes
// from Notion instead, fetched once at build time.
//
// Routes aren't modeled in Notion yet (see NOTION_SETUP.md's "what's not
// wired up yet" section) — they always come from the seed file.
// ─────────────────────────────────────────────────────────────────────────

let cache: { cities: City[]; places: Place[]; journal: JournalPost[] } | null = null;

async function load() {
  if (cache) return cache;
  if (notionConfigured) {
    const [cities, places, journal] = await Promise.all([
      fetchCitiesFromNotion(),
      fetchPlacesFromNotion(),
      fetchJournalFromNotion(),
    ]);
    // Fall back per-content-type if a database came back empty (e.g. only
    // Places has been populated so far) rather than showing an empty site.
    cache = {
      cities: cities.length ? cities : seedCities,
      places: places.length ? places : seedPlaces,
      journal: journal.length ? journal : seedJournal,
    };
  } else {
    cache = { cities: seedCities, places: seedPlaces, journal: seedJournal };
  }
  return cache;
}

export async function getCities(): Promise<City[]> {
  return (await load()).cities;
}

export async function getCity(slug: string): Promise<City | undefined> {
  return (await load()).cities.find((c) => c.slug === slug);
}

export async function getPlaces(citySlug?: string): Promise<Place[]> {
  const { places } = await load();
  return citySlug ? places.filter((p) => p.citySlug === citySlug) : places;
}

export async function getPlace(slug: string): Promise<Place | undefined> {
  return (await load()).places.find((p) => p.slug === slug);
}

export async function getJournalPosts(): Promise<JournalPost[]> {
  return (await load()).journal;
}

export async function getRoutes(citySlug?: string): Promise<Route[]> {
  return citySlug ? seedRoutes.filter((r) => r.citySlug === citySlug) : seedRoutes;
}
