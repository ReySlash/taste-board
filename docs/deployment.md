# Deployment Checklist

## Environment

Set:

```bash
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
```

Why it matters:
- canonical URLs
- metadata base
- Open Graph/Twitter URL resolution

## Pre-Deploy Checks

Run:

```bash
pnpm lint
pnpm test
pnpm build
```

Validate manually:
- `/`
- `/meals`
- `/meals?category=Beef`
- `/meals?queryName=chicken`
- `/cocktails`
- `/cocktails?category=Beer`
- `/cocktails?queryName=margarita`
- one meal detail route
- one cocktail detail route
- `/favorites`
- one invalid detail route such as `/meals/asdadasdsa`
- one unmatched route

Confirm:
- page titles are route-specific
- descriptions are route-specific
- canonical tags use the production domain
- Open Graph image tags exist
- Twitter card metadata exists
- `/favorites` returns `noindex,nofollow`
- home footer is visible on smaller screens
- desktop listing pages keep the sidebar fixed while the results column scrolls
- invalid IDs and unknown URLs show the custom not-found page

## Infrastructure Notes

- The app uses remote images from TheMealDB, TheCocktailDB, YouTube thumbnails, and Vercel-hosted avatars. Keep those hosts allowed in `next.config.ts`.
- The app uses `next/font/google` for Geist fonts. The build environment needs network access to Google Fonts unless the font strategy changes later.
- Favorites are stored in browser `localStorage`, so `/favorites` is user-specific and intentionally non-indexable.

## Known Release Risks

- The cocktail detail page favorite control is not yet aligned with the shared local-storage favorite flow.
- The current automated suite covers utilities and key client components, but there is still no E2E coverage for full route-level flows.
