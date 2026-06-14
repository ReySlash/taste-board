# TasteBoard

TasteBoard is a Next.js 16 recipe discovery app for browsing meals and cocktails, opening full detail pages, and saving favorites locally in the browser.

## Current Product Surface

Implemented routes:
- `/`
- `/meals`
- `/meals/[id]`
- `/cocktails`
- `/cocktails/[id]`
- `/favorites`

Implemented user-facing behavior:
- Home hero with responsive mobile and desktop layouts
- Meal and cocktail browsing by category
- Meal and cocktail search by name
- Local favorites with `localStorage`
- Favorite toggling from cards and detail pages
- Mobile slide-out navigation
- Mobile slide-out filter drawer on listing pages
- Dynamic SEO metadata for public routes
- Custom not-found page for unmatched routes and invalid detail ids
- `noindex,nofollow` on `/favorites`

Current constraints:
- Search and category browsing are separate modes
- Favorites are device-local only
- No authentication
- No backend database
- No pagination

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `shadcn/ui`
- `next-themes`
- `react-icons`

Testing:
- Vitest
- React Testing Library
- jsdom

## Environment

Required for deployment:

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

Notes:
- `NEXT_PUBLIC_SITE_URL` is used for canonical URLs and metadata base resolution.
- Without it, the app falls back to `http://localhost:3000` for runtime safety.

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm test
pnpm test:watch
```

## Deployment Notes

Before deploying:
- Set `NEXT_PUBLIC_SITE_URL` to the production origin.
- Run `pnpm lint`.
- Run `pnpm test`.
- Run `pnpm build`.
- Verify metadata output for `/`, `/meals`, `/cocktails`, detail routes, `/favorites`, and 404 paths.
- Confirm remote image hosts remain allowed in [next.config.ts](next.config.ts).

Build caveat:
- The app uses `next/font/google` for Geist fonts, so build environments need outbound network access to fetch those fonts unless the font strategy changes later.

## SEO Behavior

- Root layout defines shared metadata defaults and title templating.
- Home, listing, and detail routes generate route-specific titles, descriptions, canonicals, and Open Graph/Twitter tags.
- Listing-page canonicals preserve active `category` or `queryName`.
- Detail pages use API images as route-specific social images.
- Invalid detail ids and unmatched routes resolve through the custom not-found page.
- `/favorites` is intentionally excluded from indexing because its content depends on browser-local state.

## Testing

Current automated coverage focuses on:
- favorites persistence helpers
- meals/cocktails filter helpers
- favorite button interaction
- cards grid empty/rendered states
- mobile side-nav drawer behavior

## Data Sources

- [TheMealDB](https://www.themealdb.com/)
- [TheCocktailDB](https://www.thecocktaildb.com/)

Current API usage:
- search by name
- filter by category
- lookup by id
- fetch category lists

## Documentation Map

- Product scope: [docs/requirements.md](docs/requirements.md)
- Deployment checklist: [docs/deployment.md](docs/deployment.md)
- Collaboration rules: [AGENTS.md](AGENTS.md)
