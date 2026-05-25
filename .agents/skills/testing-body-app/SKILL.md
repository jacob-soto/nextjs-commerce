---
name: testing-body-app
description: End-to-end testing procedure for the body.app map-based social platform (routes under `/body`, shops, merchant dashboard, profile, and `/api/body`).
when_to_use: Use whenever a task touches `app/(body)/**`, `components/body/**`, `lib/body/data.ts`, or `app/api/body/route.ts`, or when the user asks to verify / smoke-test body.app.
---

# Testing skill: body.app

body.app is a self-contained route group (`app/(body)/`) bolted onto the Shopify nextjs-commerce starter. It has **no Shopify dependencies** — all data is static mock data in `lib/body/data.ts` — so it can be tested without any storefront credentials.

## 1. Setup

1. Install deps with the repo's package manager (pnpm is required by `package.json`):
   ```bash
   pnpm install
   ```
2. Start the dev server:
   ```bash
   pnpm dev
   ```
   It binds to `http://localhost:3000` by default. No `.env` is required for body.app — the map uses CartoDB dark tiles (no API key) and there are no live API calls.
3. Open Chrome at `http://localhost:3000/body` (the existing Devin Chrome browser via CDP works; do not relaunch).
4. **Maximize the browser window before recording** so the full app is visible:
   ```bash
   sudo apt-get install -y wmctrl 2>/dev/null; wmctrl -r :ACTIVE: -b add,maximized_vert,maximized_horz
   ```

## 2. Route inventory

All routes are under the `(body)` route group with its own dark-themed layout (`app/(body)/layout.tsx`). Source-of-truth nav list lives in `components/body/nav.tsx`.

| Route                     | Purpose                                                                 | Source                                  |
|---------------------------|-------------------------------------------------------------------------|-----------------------------------------|
| `/body`                   | Leaflet map with user markers and Wave/Message user cards               | `app/(body)/body/page.tsx`, `components/body/map.tsx` |
| `/body/shop`              | Shop index (links into the 3 category shops)                            | `app/(body)/body/shop/page.tsx`         |
| `/body/shop/designer`     | Designer Clothing & Apparel — 8 products, $95–$345                      | `app/(body)/body/shop/designer/page.tsx` |
| `/body/shop/intimates`    | Intimates & Accessories — 8 products, $28–$110                          | `app/(body)/body/shop/intimates/page.tsx` |
| `/body/shop/athletics`    | Athletics — 10 products, $30–$299                                       | `app/(body)/body/shop/athletics/page.tsx` |
| `/body/merchants`         | Merchant Dashboard — stat cards, stacked revenue chart, orders, inventory | `app/(body)/body/merchants/page.tsx`, `components/body/merchant-dashboard.tsx` |
| `/body/profile`           | User profile, stats, recent orders, settings                            | `app/(body)/body/profile/page.tsx`      |
| `/api/body`               | JSON status endpoint (no auth)                                          | `app/api/body/route.ts`                 |

## 3. Test assertions

Group tests under `It should …` blocks. Use the `annotate_recording` tool to mark a `test_start` for each, then a single consolidated `assertion`.

### Test 1 — Map page renders with markers and user card

Navigate to `/body`. Wait for Leaflet tiles to load.

- **Precondition**: 10 markers visible (online green, idle yellow, offline gray), tile basemap is dark CartoDB.
- Click any green/yellow marker.
- **Assertion**: A user card slides in on the right showing the username (e.g. `alex_m`), a `Now`/`Xm ago · Y.Z mi` status line, a bio, and both `Wave 👋` and `Message` buttons. The "Nearby" panel on the left lists online users above idle ones.
- Source of truth for user data: `MAP_USERS` in `lib/body/data.ts` (7 online, 2 idle, 1 offline — the offline user `casey_l` is intentionally hidden from the Nearby panel).

### Test 2 — Designer shop, category filtering

Navigate to `/body/shop/designer`.

- **Precondition**: Product grid shows 8 cards, prices $95–$345, header reads "Designer Clothing & Apparel".
- Click the **Tops** filter chip.
- **Assertion**: Grid filters down to **3 products** (`Oversized Cashmere Hoodie`, `Merino Wool Turtleneck`, `Graphic Mesh Tank`); counter reads "3 products".
- Click **Accessories**.
- **Assertion**: Grid filters down to **1 product** (`Leather Harness Belt`); counter reads "1 product".

### Test 3 — Athletics shop, sort dropdown

Navigate to `/body/shop/athletics`.

- **Precondition**: 10 product cards, prices range $30–$299.
- Set sort = `Price: Low → High`.
- **Assertion**: First card is `Creatine Monohydrate 500g` at **$30**.
- Set sort = `Price: High → Low`.
- **Assertion**: First card is `Adjustable Dumbbell Set` at **$299**.

Sort options live in `components/body/shop-page.tsx` (`price-low`, `price-high`, `rating`).

### Test 4 — Intimates shop, category breadth

Navigate to `/body/shop/intimates`.

- **Assertion**: 8 products spanning **4 categories** — Underwear (3), Bodywear (1), Loungewear (2), Accessories (2). Each category chip is clickable; counter updates accordingly.

### Test 5 — Merchant Dashboard

Navigate to `/body/merchants`.

- **Assertion (stat cards)**: Six stat cards read exactly:
  - **Total Revenue $284,750**, Total Orders **3,842**, Total Products **26**, Conversion **4.7%**, Avg Order Value **$74.12**, Monthly Growth **12.3%**.
- **Assertion (revenue chart)**: The 6-month stacked bar chart (Jan–Jun) renders. **Every** bar's three segments (designer / intimates / athletics) **fully fill** the bar — no empty space at the top of shorter months. (See Known Issue #1.)
- **Assertion (orders & inventory)**: Recent Orders table and Product Inventory table render with non-empty rows. Inventory total row count = 26 (8 + 8 + 10).

Numbers come from `MERCHANT_STATS` and `MONTHLY_REVENUE` in `lib/body/data.ts`.

### Test 6 — Profile

Navigate to `/body/profile`.

- **Assertion**: Header reads `Jacob Soto · @jacob_soto · 📍 New York, NY`. Stat row shows **23 Orders / 47 Wishlist / 12 Reviews / 4,820 Points**. Recent Orders section contains 4 rows including `Oversized Cashmere Hoodie · $345 · Delivered` and `Adjustable Dumbbell Set · $299 · Delivered`.

### Test 7 — Cross-page navigation

From any body.app page, click each item in the top nav (`Explore`, `Designer`, `Intimates`, `Athletics`, `Merchants`, `Profile`).

- **Assertion**: Active nav item is highlighted (`bg-zinc-800 text-white`); URL and page content change without a full reload.

### Test 8 — `/api/body` JSON endpoint

```bash
curl -s http://localhost:3000/api/body | jq
```

- **Assertion**: HTTP 200, JSON with `platform: "body.app"`, `version: "1.0.0"`, `status: "operational"`, `stats.activeUsers === 7`, `stats.totalUsers === 10`, and `stats.shops.{designer,intimates,athletics}.products` equal `[8, 8, 10]` respectively. `stats.merchant.totalRevenue === 284750`.

### Test 9 — No regression on Shopify `(shop)` routes

Navigate to `/` and confirm the existing Shopify storefront still renders without runtime errors. body.app is fully isolated in its own route group; if `/` 500s, body.app code has bled into `(shop)`.

## 4. Known issues

1. **Revenue chart segment heights** — historical bug (fixed in commit `e0777a3` on PR #4 per Devin Review feedback): `dH/iH/aH` were multiplied by `h` instead of `100`, leaving empty space at the top of shorter months' bars. Regression test: visually confirm Jan's bar (smallest month) is fully stacked from baseline to its top.
2. **Map tiles are external (CartoDB)** — if `basemaps.cartocdn.com` is unreachable, the map page will render with a blank gray background but markers still mount. Don't fail the test on a transient tile-load issue; reload once.
3. **Leaflet CSS is injected at runtime** — `components/body/map.tsx` programmatically appends `<link href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css">`. If unpkg is blocked, markers will appear mis-styled but still clickable.
4. **No auth** — every page renders without a session; the `Sign In` button is decorative.

## 5. Recording & reporting

1. Start a screen recording **before** opening `/body`.
2. Use `annotate_recording` with `type="setup"` for the initial dev-server-ready state, then a `test_start`/`assertion` pair per test above (use the exact `It should …` test names from Section 3).
3. Stop the recording and attach it to the PR or session that triggered the test.
4. Post a results table like the one on [PR #4](https://github.com/jacob-soto/nextjs-commerce/pull/4) listing each test and `passed` / `failed` / `untested`.

## 6. Quick smoke (no recording)

When you just need a fast green-light:

```bash
pnpm dev &
sleep 5
curl -fs http://localhost:3000/body              > /dev/null && echo "ok: /body"
curl -fs http://localhost:3000/body/shop/designer > /dev/null && echo "ok: designer"
curl -fs http://localhost:3000/body/shop/intimates > /dev/null && echo "ok: intimates"
curl -fs http://localhost:3000/body/shop/athletics > /dev/null && echo "ok: athletics"
curl -fs http://localhost:3000/body/merchants    > /dev/null && echo "ok: merchants"
curl -fs http://localhost:3000/body/profile      > /dev/null && echo "ok: profile"
curl -fs http://localhost:3000/api/body | jq -e '.stats.totalUsers == 10 and .stats.shops.athletics.products == 10' && echo "ok: api"
```

All seven lines should print `ok: …`. If any fails, the corresponding route or data shape has regressed.
