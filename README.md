# In a few words...

A small ecommerce front end built with Vue 3 and TypeScript. It lists products from a mock API, supports search, sorting, category filtering and pagination, and lets the user manage a shopping basket that survives a page reload.

## Requirements

Node 20.19+ or 22.12+ and npm.

## Running locally

Install dependencies:

```
npm install
```

Copy the example environment file. It points the app at the local mock API.

```
cp .env.example .env
```

The data is served by [json-server](https://github.com/typicode/json-server) from `db.json`. Start it in one terminal:

```
npm run mock
```

This runs on port 3001, which is the value in `.env.example`. Start the app in a second terminal:

```
npm run dev
```

Vite prints the local URL (usually http://localhost:5173).

Other useful scripts:

```
npm run test:run
npm run build
```

## How it is put together

The data fetching follows a single pattern. List and detail views are async components: they `await` their data at the top of `setup()`, and the application shell wraps the router view in a `<Suspense>` block. Loading state is therefore handled in one place instead of being repeated in every view. Errors thrown during fetching bubble up to one `ErrorBoundary` component, which renders the error page. A not found case is just a `createError(404)` thrown from the API layer, so the same mechanism covers missing products, missing categories and unknown URLs.

Components never talk to axios directly. Everything goes through a thin layer in `src/api`, which owns the endpoint shapes and turns the raw responses into the types the app uses. Keeping the backend specifics in one folder means that replacing json-server with a real service later is a localized change rather than a rewrite across the components.

List state lives in the URL. Search term, sort order, selected category and current page are all query parameters. The views read them and refetch, so there is no duplicated local state, the browser back button behaves correctly, and any view is shareable by its link. Product and category pages are addressed by slug for readable URLs, while the numeric ids are kept only for the data layer.

The basket is a Pinia store, persisted to local storage so it is still there after a refresh. The theme preference is stored the same way. Styling is plain SCSS with CSS variables that drive the light and dark themes. There is no component library on purpose; the styling stays simple and the variables make dark mode a matter of swapping a handful of values.

## Testing

Tests use Vitest, which shares the Vite configuration and runs TypeScript and single file components without extra tooling. Its API matches Jest, so the style is familiar. The suite covers the cart store logic (adding, merging quantities, removing, totals), the product and category lists including their empty state, and the not found view. Run them with `npm test`.

## Notes on a few decisions

The mock data exposed a quirk of json-server. It returns record ids as strings but leaves foreign keys untouched, and its relation embedding and its filtering then disagree on types: embedding needs the key to match the stringified id, while filtering coerces the query value to a number. To get both working I kept `categoryId` as a string so that embedding a product's category works, and added a separate numeric `categoryRef` field used only for the category filter.

Prices are shown as a plain two decimal value with the euro symbol after the number, which is the local convention. An earlier version used `Intl.NumberFormat`, but its non breaking space before the symbol made string assertions in tests fragile, so the simpler form was kept.

Combining a page transition with `<Suspense>` needs the key on the inner component rather than on the Suspense node, otherwise the view can render blank on navigation. This is worth knowing if the transition is changed later.

## Features

Beyond the core listing, search and basket, the app includes category filtering, sorting by name and price, pagination, a dark mode toggle, a persisted basket, a responsive layout with a collapsible menu on small screens, and add to basket feedback through a small toast.
