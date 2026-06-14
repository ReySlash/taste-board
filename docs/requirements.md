# TasteBoard Release Requirements

## Summary

TasteBoard is a responsive Next.js 16 App Router application for discovering meal and cocktail recipes from public APIs. The current release focuses on browse, detail, and favorites flows that can be deployed without a backend.

This document describes the currently supported product behavior for the deployable release in this repository. It is not an aspirational backlog.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- `shadcn/ui`
- `next-themes`
- `react-icons`

Not yet present:
- automated end-to-end tests

## Product Goals

- Help users quickly move between meal and cocktail discovery flows.
- Keep the UI image-forward and responsive on desktop and mobile.
- Let users save favorites without authentication.
- Keep the app deployable on top of public APIs and browser-local state only.

## Implemented Routes

- `/`
- `/meals`
- `/meals/[id]`
- `/cocktails`
- `/cocktails/[id]`
- `/favorites`

## Route Behavior

### `/`
- Presents the product hero and primary calls to action.
- Includes responsive desktop and mobile layouts.
- Includes the current footer attribution content.

### `/meals`
- Supports browsing by meal category.
- Supports searching meals by name.
- Uses `category` and `queryName` query parameters.
- Treats category browsing and name search as separate modes.
- Shows results as recipe cards.
- Supports favorite toggling from cards.
- Uses a desktop sidebar and a mobile filter drawer.

### `/cocktails`
- Supports browsing by cocktail category.
- Supports searching cocktails by name.
- Uses `category` and `queryName` query parameters.
- Treats category browsing and name search as separate modes.
- Shows results as recipe cards.
- Supports favorite toggling from cards.
- Uses a desktop sidebar and a mobile filter drawer.

### `/meals/[id]`
- Fetches meal details by id.
- Renders image, title, metadata badges, ingredients, instructions, and YouTube content when available.
- Supports favorite toggling from the detail view.
- Generates route-specific metadata from the fetched meal.
- Sends malformed or missing ids to the shared not-found page.

### `/cocktails/[id]`
- Fetches cocktail details by id.
- Renders image, title, metadata badges, ingredients, instructions, and video content when available.
- Generates route-specific metadata from the fetched cocktail.
- Sends malformed or missing ids to the shared not-found page.

Current limitation:
- The cocktail detail page still shows a placeholder outline heart button instead of the shared local-storage favorite button used elsewhere.

### `/favorites`
- Reads saved items from browser `localStorage`.
- Aggregates meals and cocktails in one grid.
- Updates in response to local favorite changes.
- Is intentionally not indexable by search engines.

Current limitation:
- The favorites page does not yet provide tabs or segmented filtering by item type.

### Not Found
- Unmatched URLs render the root `app/not-found` experience.
- Invalid or unavailable meal and cocktail detail ids render the same not-found experience.
- The not-found page provides recovery links to home, meals, and cocktails.

## Favorites Persistence

- Favorites are anonymous and browser-local only.
- Persistence uses `localStorage`.
- The shared saved-item shape is:
  - `id`
  - `productType`
  - `title`
  - `description`
  - `image`
- The app uses the custom event `tasteboard:favorites-updated` to synchronize UI state after writes.

## Search And Filter Rules

- Search is name-based only.
- Category is the only user-facing filter.
- Search and category browsing do not combine in one API request.
- Starting a name search replaces category browsing behavior for that request.
- Starting category browsing replaces search behavior for that request.
- Current default categories:
  - meals: `Beef`
  - cocktails: `Beer`

## External APIs

### TheMealDB

Current usage:
- search meals by name
- filter meals by category
- lookup meal by id
- fetch meal categories

### TheCocktailDB

Current usage:
- search cocktails by name
- filter cocktails by category
- lookup cocktail by id
- fetch cocktail categories

## SEO Requirements

- `NEXT_PUBLIC_SITE_URL` is the production source of truth for metadata base.
- The root layout provides default title, description, Open Graph, and Twitter metadata.
- Public routes generate route-specific titles, descriptions, canonicals, and social metadata.
- Listing-page canonicals preserve active filter or search query parameters.
- Detail pages use route-specific API images when available.
- `/favorites` must emit `noindex,nofollow`.

## Responsive Behavior

- Home page uses distinct desktop and mobile hero layouts.
- Top navigation collapses into a mobile slide-out menu.
- Listing filters collapse into a mobile slide-out drawer.
- On listing pages, the grid column scrolls while the desktop sidebar remains fixed in place.
- Detail pages remain vertically scrollable so full recipe content is accessible.

## Non-Functional Expectations

- The app must build and run without requiring premium API features.
- Remote image hosts used by the APIs must stay configured in `next.config.ts`.
- The deployed app must expose valid canonical and social metadata.
- The home page footer must remain reachable on smaller screens.
- The app must keep the current automated utility/component test suite passing.

## Known Gaps

- No normalization layer separates raw API payloads from rendering.
- No pagination is currently implemented on listing pages.
- The cocktail detail page favorite experience is not yet aligned with the meal detail page.
- No end-to-end browser test coverage is currently implemented.

## Release Validation

Minimum validation before deployment:
- `pnpm lint`
- `pnpm test`
- `pnpm build`
- Manual verification of:
  - `/`
  - `/meals`
  - `/meals?category=Beef`
  - `/meals?queryName=chicken`
  - `/cocktails`
  - `/cocktails?category=Beer`
  - `/cocktails?queryName=margarita`
  - a meal detail route
  - a cocktail detail route
  - `/favorites`
  - an invalid detail route such as `/meals/asdadasdsa`
  - an unmatched route

Manual checks should confirm:
- metadata is route-specific
- canonical URLs resolve against `NEXT_PUBLIC_SITE_URL`
- `/favorites` is `noindex`
- home footer is visible on smaller screens
- listing-page sidebar behavior is preserved on desktop
- invalid IDs and unknown URLs render the custom not-found page
