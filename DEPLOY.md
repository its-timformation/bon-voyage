# Deploying to Cloudflare (free)

The site is a fully static export now (`output: "export"` in `next.config.ts`) —
no server, no database, so Cloudflare's free static hosting is a clean fit and
Turso isn't needed anywhere in this stack.

**Why this file exists:** this project was built in a sandboxed cloud session
that can reach npm/GitHub's API but is blocked from reaching
`api.cloudflare.com` directly, and the GitHub token available there can't
create new repos. Both the actual Cloudflare deploy and the GitHub push need
to happen from a machine with normal internet access — yours. The steps below
are copy-paste from your own terminal.

## Fastest path — you already have Wrangler set up

If you've deployed to Cloudflare from your machine before (e.g. for your
other projects), you're almost certainly already logged in.

```bash
cd bonvoyage-site
npm install
npm run build          # generates the static site into ./out
npx wrangler pages deploy out --project-name=bon-voyage
```

First run will ask you to log in (`wrangler login`, opens a browser) if you
aren't already. It creates the Pages project on the fly and gives you a
`https://bon-voyage.pages.dev` URL (or `<something>.pages.dev` if that name's
taken — Wrangler will say). Every time you want to push an update, rebuild
and re-run that last command.

## Alternative — Git-connected, auto-deploys on every push

A bit more setup once, but after that you never touch the CLI again — push to
GitHub and Cloudflare rebuilds automatically.

```bash
cd bonvoyage-site
git init                      # if not already a repo
git add -A
git commit -m "Bon Voyage site"
gh repo create bon-voyage-site --public --source=. --push
# or manually: create a repo on github.com, then
#   git remote add origin https://github.com/<you>/bon-voyage-site.git
#   git push -u origin main
```

Then in the Cloudflare dashboard:

1. **Workers & Pages** → **Create application** → **Pages** tab → **Connect to Git**.
2. Pick the repo you just pushed.
3. Framework preset: **Next.js (Static HTML Export)** — this fills in the build
   command (`npx next build`) and build output directory (`out`) for you.
4. **Save and Deploy**.

## Notes

- The Cloudflare API token you pasted in chat couldn't be used (network
  restriction on this end) — worth revoking it at
  dash.cloudflare.com/profile/api-tokens and cutting a fresh one only if/when
  you actually need CLI access again.
- If you'd rather use Render instead: Render's free **Static Site** works the
  same way — connect the GitHub repo, build command `npm run build`, publish
  directory `out`.
- Notion CMS wiring is unchanged — see `NOTION_SETUP.md`. Add the three
  `NOTION_*` env vars in Cloudflare Pages' **Settings → Environment Variables**
  (or Render's dashboard) once you've set up the databases, and rebuild.
