# Using Notion to update site content

The site works with zero setup — it ships with real content in `src/data/seed.ts`
(Nashville's 9 places, Belfast's Nordr, all four city blurbs). This document is
for switching that over to Notion, so you can add and edit places, cities and
journal posts from a normal Notion page instead of editing code.

## Why Notion, and what it's not great at

Good fit for this site: you already think in Notion, a "Place" is naturally a
database row (name, category, a few facts, some body text), and non-technical
edits — fixing a typo in Butchertown Hall's hours, adding a tenth Nashville
place — should not require a code change or a redeploy triggered by you opening
a pull request.

Two real limitations, both already handled by the code in `src/lib/notion.ts`,
worth knowing about:

- **Notion's image URLs expire.** The API hands back pre-signed links that stop
  working after about an hour — fine inside Notion, broken if a visitor's page
  is still cached with one of those links in it. The site downloads every image
  once at build time into `public/notion-cache/` and serves that local copy
  instead, so this never surfaces as a broken image on the live site. It does
  mean a changed image needs a rebuild to show up, not just a Notion edit.
- **The API is rate-limited** (~3 requests/second). That's irrelevant to a
  visitor loading a page — the site only talks to Notion at build time, never
  per-request — but it does mean don't expect instant updates the moment you
  edit a row. See "Keeping content fresh" below.

If neither of those trade-offs sit right, the honest alternative is a proper
headless CMS (Sanity is the one worth a look — real content modeling, an image
CDN with no expiry problem, a purpose-built editor) or just editing the files
in `src/data/seed.ts` directly, which is the most reliable option of all since
there's no external service in the loop, at the cost of editing content in a
code editor rather than a nice UI.

## 1. Create the integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations) → **New integration**.
2. Name it "Bon Voyage Site", associate it with your workspace, give it **Read content** capability only (the site never writes to Notion).
3. Copy the **Internal Integration Token** — this is `NOTION_TOKEN`.

## 2. Create three databases

Create these as three separate full-page databases (not inline tables) in Notion.
Property **names must match exactly** (case-sensitive) — the reader in
`src/lib/notion.ts` looks them up by name.

### Cities

| Property | Type |
|---|---|
| Name | Title |
| Slug | Text — e.g. `nashville`, must match the `citySlug` used in Places |
| Place Count | Number |
| Teaser Line | Text |
| Description | Text |
| Updated | Text — e.g. `Aug 2026` |
| Hero Image | Files & media |

### Places

| Property | Type |
|---|---|
| Name | Title |
| Slug | Text — used in the URL, e.g. `butchertown-hall` |
| City Slug | Text — must match a City's Slug, e.g. `nashville` |
| City | Text — display name, e.g. `Nashville` |
| Category | Select — one of `Dine`, `Drink`, `Discover`, `Activity`, `Stay` |
| Verdict | Select — one of `Don't Miss`, `Worth It`, `Worth It If`, `Editors Pick` (leave blank for no verdict pill) |
| Take | Text — the one-line description shown on the card |
| Practical Pills | Multi-select — e.g. `Open Late`, `Book Ahead`, `No Cover` |
| Neighbourhood | Text |
| Cost | Select — one of `Low`, `Medium`, `High`, `Luxury` |
| Hero Image | Files & media |
| Gallery | Files & media (multiple) |
| Body | Text — paragraphs separated by a blank line |
| Skip It If | Text |
| Address / Website / Hours / Brunch / Typical Spend / Nearest / Booking / Payment | Text — the place-page fact rows; leave any of these blank to omit that row |

### Journal

| Property | Type |
|---|---|
| Title | Title |
| Slug | Text |
| City Slug | Text |
| City | Text |
| Date | Text — e.g. `June 2026` |
| Read Minutes | Number |
| Hero Image | Files & media |

**What's not wired up yet:** Routes (the "Follow a Route Instead" section on
city pages) still come from `src/data/seed.ts` — there wasn't an established
content model for these yet in Figma beyond the two example teasers, so it
felt premature to lock in a Notion schema for them. Worth a fourth database
once the Routes page pattern is designed.

## 3. Share each database with the integration

Open each database → **···** menu (top right) → **Connections** → add
"Bon Voyage Site". Do this for all three — a database the integration can't
see comes back empty and the site silently falls back to seed content for
that content type (see `src/lib/content.ts`), which is a safe failure but a
confusing one if you were expecting your Notion edits to show up.

## 4. Find each database's ID

Open the database as a full page, copy its URL:
`https://www.notion.so/yourworkspace/DATABASE_ID?v=...` — the `DATABASE_ID`
is the 32-character string right after your workspace name.

## 5. Set environment variables

Copy `.env.example` to `.env.local` and fill in:

```
NOTION_TOKEN=secret_xxx...
NOTION_CITIES_DB_ID=...
NOTION_PLACES_DB_ID=...
NOTION_JOURNAL_DB_ID=...
```

Restart the dev server / redeploy. If `NOTION_TOKEN` is unset, the site
silently uses the seed data — nothing breaks either way.

## Keeping content fresh

Because Notion is only read at build time, a Notion edit needs a rebuild to
reach the live site. Two ways to handle that, roughly in order of effort:

1. **Simplest — rebuild on a schedule.** On Vercel, a cron-triggered deploy
   hook every hour or so is a few minutes of setup and is honestly enough for
   a site that isn't publishing breaking news.
2. **Instant — a Notion automation or button that hits a deploy hook.** Vercel
   (or any host) gives you a webhook URL that triggers a rebuild; Notion
   doesn't fire webhooks on edit natively, but a "Publish" button property
   plus a small automation (Notion's own automations, or Zapier/Make) can
   call that URL when you flip it.

Either way, nothing about the site's code changes — this is a deploy-config
decision, not a content-model one.
