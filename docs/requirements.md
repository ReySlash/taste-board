# TasteBoard MVP Requirements

## Summary
TasteBoard is a responsive recipe and cocktail discovery app built on the existing Next.js 16 App Router project in this repository. The MVP provides a polished browse-and-save experience across desktop and mobile for meals and cocktails, using TheMealDB and TheCocktailDB as the data sources.

The first implementation targets:
- Next.js 16
- React 19
- Tailwind CSS 4
- `shadcn/ui` for reusable UI primitives
- `zod` for API response validation and internal normalization
- A test suite covering unit, component, and end-to-end behavior

The MVP scope includes:
- Home page
- Meals listing page
- Cocktails listing page
- Favorites page
- Meal detail page
- Cocktail detail page
- Name-based search
- Category-only filtering
- Local browser persistence for favorites

Out of scope for v1:
- Authentication or user accounts
- Backend database
- Synced favorites
- Search by id
- Filters by ingredient, area, glass, or alcoholic type
- Premium-only API capabilities

## Product Goals
- Help users quickly discover meals and cocktails from a single product.
- Make browsing feel fast and visually rich on both desktop and mobile.
- Let users save favorites without requiring sign-in.
- Keep the MVP implementation simple enough to ship on top of public APIs with clear constraints.

## Core User Journeys
1. A user lands on the home page and navigates to meals or cocktails.
2. A user searches meals or cocktails by name or browses by category, depending on the current discovery mode.
3. A user opens a detail page to view ingredients, instructions, and supporting media.
4. A user adds or removes favorites from listing cards or detail views.
5. A user revisits the app and sees previously saved favorites still available on the same device.
6. A mobile user opens a filter drawer, adjusts category selection, and browses updated results.

## Target Stack
- Framework: Next.js 16 with App Router
- UI: React 19
- Styling: Tailwind CSS 4
- Components: `shadcn/ui`
- Validation: `zod`
- Testing:
  - Unit tests for utilities and data mapping
  - Component/integration tests for UI behavior
  - End-to-end tests for primary user journeys

## Information Architecture
Required routes:
- `/`
- `/meals`
- `/cocktails`
- `/favorites`
- `/meals/[id]`
- `/cocktails/[id]`

Route intent:
- `/` introduces the product and links users into meal and cocktail discovery.
- `/meals` supports name-based search mode, category browse mode, paging, and favoriting.
- `/cocktails` supports name-based search mode, category browse mode, paging, and favoriting.
- `/favorites` aggregates saved meals and cocktails in one place.
- `/meals/[id]` shows the full meal detail.
- `/cocktails/[id]` shows the full cocktail detail.

## Functional Requirements

### Home Page
- Display product branding and primary navigation.
- Present a hero section that communicates the meal-and-cocktail discovery value proposition.
- Provide clear calls to action for browsing meals and cocktails.
- Include sections that preview featured or popular-looking content if implementation chooses to surface them.
- Work across desktop and mobile layouts inspired by the provided mockups.

### Meals Page
- Provide a search field that searches meals by name only.
- Provide a category filter and no other user-facing filters.
- Search and category browsing do not combine in a single API request. Starting one mode may replace the other in URL state and results.
- Show results as cards with image, title, category, and favorite action.
- Support pagination over fetched result sets.
- Show loading, empty, and error states.
- Preserve browse state in the URL where practical using query parameters such as `queryName`, `category`, and `page`.
- Allow users to add or remove favorites directly from the listing.

### Cocktails Page
- Provide a search field that searches cocktails by name only.
- Provide a category filter and no other user-facing filters.
- Search and category browsing do not combine in a single API request. Starting one mode may replace the other in URL state and results.
- Show results as cards with image, title, category, and favorite action.
- Support pagination over fetched result sets.
- Show loading, empty, and error states.
- Preserve browse state in the URL where practical using query parameters such as `queryName`, `category`, and `page`.
- Allow users to add or remove favorites directly from the listing.

### Favorites Page
- Aggregate saved meals and cocktails in one unified view.
- Allow users to filter the favorites view by content type using tabs or equivalent segmented controls.
- Show empty-state messaging when no favorites exist.
- Support removing favorites directly from the saved list.
- Persist saved items across browser reloads on the same device.

### Meal Detail Page
- Fetch meal details by id from the route parameter.
- Display hero image, title, category, secondary metadata, ingredients, instructions, and YouTube link when available.
- Allow the user to add or remove the meal from favorites.
- Handle missing or invalid ids with a user-friendly not-found or error state.

### Cocktail Detail Page
- Fetch cocktail details by id from the route parameter.
- Display hero image, title, category, secondary metadata, ingredients, instructions, and YouTube link when available.
- Allow the user to add or remove the cocktail from favorites.
- Handle missing or invalid ids with a user-friendly not-found or error state.

## Search, Filter, and Pagination Rules
- Search is strictly name-based.
- Search must never be described or implemented as id-based.
- Category is the only exposed user-facing filter in v1.
- Name search and category browsing are separate modes when backed by the public MealDB and CocktailDB APIs.
- The UI may reset one mode when the other is activated, rather than composing both in a single request.
- Any optional sort control must rely only on supported non-premium data behavior.
- Pagination may be client-managed over fetched results because the public APIs do not provide native pagination suited to the target UI.
- Query parameters should represent browse state where useful:
  - `queryName`
  - `category`
  - `page`
  - `sort` only if the implementation keeps it within supported behavior

## External APIs

### TheMealDB
Supported v1 usage:
- Search meals by name
- Lookup meal details by id
- Retrieve meal categories

Constraints:
- Name search is the primary browse mechanism.
- Public v1 endpoints do not support combining name search and category filtering in one request.
- Detail pages may use ids internally for data fetching.
- Ingredient, area, and other extra filter capabilities are out of scope even if the API exposes them.
- Premium-only endpoints must not be required for the MVP.

### TheCocktailDB
Supported v1 usage:
- Search cocktails by name
- Lookup cocktail details by id
- Retrieve cocktail categories

Constraints:
- Name search is the primary browse mechanism.
- Public v1 endpoints do not support combining name search and category filtering in one request.
- Detail pages may use ids internally for data fetching.
- Glass, ingredient, alcoholic, and other extra filter capabilities are out of scope even if the API exposes them.
- Premium-only endpoints must not be required for the MVP.

## Data Validation and Normalization
The UI must not depend directly on raw API responses. The app should validate external payloads with `zod` and convert them into internal normalized types before rendering or persisting data.

Required normalized item shape:
- `id`
- `type`
- `title`
- `image`
- `category`
- `secondaryMeta`
- `ingredients`
- `instructions`
- `youtubeUrl`
- `durationLabel`

Type expectations:
- `id`: stable string identifier from the source API
- `type`: `"meal"` or `"cocktail"`
- `title`: display name
- `image`: primary image URL
- `category`: source category label
- `secondaryMeta`: short secondary label such as cuisine or drink subtype
- `ingredients`: normalized list of ingredient strings or ingredient-measure pairs
- `instructions`: ordered or display-ready instruction content
- `youtubeUrl`: optional tutorial or related video link
- `durationLabel`: optional display label when a duration is available or approximated by the design system

Required `zod` schema coverage:
- Meal search response
- Meal detail response
- Meal category response
- Cocktail search response
- Cocktail detail response
- Cocktail category response
- Favorite persistence payload

## Favorites Persistence
- Favorites are anonymous and browser-local only.
- Persistence must use `localStorage`.
- Meals and cocktails must share one saved-item format so the favorites page can render both from a single source of truth.
- Favorite actions must be available on both listing cards and detail pages.
- The UI must reflect saved state consistently across routes after hydration.

## Rendering and State Strategy
- Use hybrid rendering where practical.
- Initial listing and detail data should be server-rendered when it materially improves load performance and shareability.
- Client components should own interactive behavior such as:
  - Search input state
  - Category selection
  - Favorites toggling
  - Pagination controls
  - Mobile filter drawer or sheet behavior
- URL state should be used for shareable browse pages when practical.

## UI and Component Requirements
Use `shadcn/ui` as the primary component foundation for common interactive primitives. Expected primitives include:
- Button
- Input
- Card
- Tabs
- Sheet or Drawer
- Select
- Breadcrumb

Design requirements:
- Preserve the general visual hierarchy and responsive intent of the provided mockups.
- Support both desktop and mobile views without separate applications.
- Keep the interface image-forward and simple to scan.
- Ensure navigation between the major content areas is always obvious.

## Responsive and Mobile Behavior
- Mobile layouts must support the home, listing, and detail experiences shown in the design direction.
- Listing filters should collapse into a mobile sheet or drawer.
- Mobile search and category filter behavior must remain aligned with the same mutually exclusive mode rules as desktop.
- Detail pages must remain readable and actionable on small screens, including favorites and instruction access.

## Non-Functional Requirements
- Validate all external API responses before use in UI rendering.
- Handle loading, empty, malformed-data, and network-failure states gracefully.
- Keep page transitions and interactions responsive under typical public API latency.
- Favor implementation simplicity over speculative abstraction beyond the normalized model and service boundary.
- Do not require premium API subscriptions to complete the MVP.

## Testing Requirements

### Unit Tests
- API mapping and normalization utilities
- `zod` schema validation behavior
- Search query-state helpers
- Favorites storage helpers

### Component / Integration Tests
- Search by name on meals
- Search by name on cocktails
- Category browse interactions
- Pagination behavior
- Favorites toggling from cards
- Favorites toggling from detail pages
- Loading, empty, and error states

### End-to-End Tests
- Browse meals by name
- Browse meals by category
- Browse cocktails by name
- Browse cocktails by category
- Open detail pages from listing cards
- Add and remove favorites
- Verify favorites persist across reloads
- Verify mobile filter drawer or sheet interactions
- Verify the favorites page merges saved meals and cocktails correctly

## Acceptance Criteria
- A requirements document exists at `docs/requirements.md`.
- The requirements accurately describe a full TasteBoard MVP on top of this Next.js project.
- The stack explicitly includes Next.js, React, Tailwind, `shadcn/ui`, `zod`, and a test suite.
- Search is defined as name-based only.
- Category is defined as the only user-facing filter in v1.
- Detail pages are allowed to use ids internally for route-based data fetching only.
- Favorites are defined as anonymous and persisted in browser local storage.
- The document specifies routes, normalized item requirements, API rules, UI expectations, and testing scope clearly enough for implementation.

## Implementation Notes for This Repo
- The current repository is a minimal Next.js App Router starter and does not yet contain product-specific routes or domain logic.
- The implementation should add the product routes and supporting data/UI layers incrementally from this baseline.
- The document should be treated as the source of truth for the first engineering pass unless later product decisions explicitly revise it.
