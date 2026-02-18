# Phase 2 Frontend Extraction Plan (Backend-Preserving)

## Scope Constraints
- Backend source code remains unchanged.
- No deletions in existing backend project.
- This plan defines **extraction/migration steps** and a **file move map** only.

---

## 1) Frontend assets currently inside backend project

### A. Application source (TypeScript + page modules)
- `Core_Sh/ClientApp/**`
  - Legacy page modules (feature-per-folder)
  - Shared helpers (`App.ts`, `Layout.ts`, `SystemTools.ts`, `AjaxCaller.ts`, `Entities.ts`)
  - UI helpers (`DataTable.ts`, `IgGrid.ts`, `JsGrid.ts`, `EsGrid.ts`, `MessageBox.ts`)

### B. Server-rendered views/templates
- `Core_Sh/Views/Home/*.cshtml`
  - Screen templates that are currently rendered to HTML and returned to browser runtime.
- `Core_Sh/Views/Shared/*.cshtml`
- `Core_Sh/Views/_ViewImports.cshtml`
- `Core_Sh/Views/_ViewStart.cshtml`

### C. Static frontend assets
- `Core_Sh/wwwroot/ClientApp/**` (compiled/bundled client artifacts)
- `Core_Sh/wwwroot/css/**`
- `Core_Sh/wwwroot/js/**`
- `Core_Sh/wwwroot/images/**`
- `Core_Sh/wwwroot/fonts/**`
- `Core_Sh/wwwroot/lib/**`
- `Core_Sh/wwwroot/vendors/**`
- `Core_Sh/wwwroot/NewStyle/**`
- `Core_Sh/wwwroot/Content/**`
- `Core_Sh/wwwroot/Scripts/**`
- `Core_Sh/wwwroot/jsgrid/**`
- `Core_Sh/wwwroot/System/**`
- `Core_Sh/wwwroot/StyleProfile/**`
- `Core_Sh/wwwroot/Images_Setting/**`

### D. Legacy script/style sources outside `wwwroot`
- `Core_Sh/Scripts/**`

### E. Localization/resources used by views
- `Core_Sh/Resources/**`

### F. Frontend build metadata
- `Core_Sh/tsconfig.json`

---

## 2) Migration script plan (extract to standalone React app)

## Target folder model
- Keep backend as-is.
- Create a sibling frontend project (example): `Frontend_React/`.

## Script plan (phased)
1. **Inventory + classify**
   - Enumerate view screens (`Views/Home/*Index.cshtml`).
   - Enumerate module scripts (`ClientApp/**`).
   - Build module manifest: `moduleCode -> {legacyView, legacyScript, routePath}`.

2. **Bootstrap React workspace**
   - Initialize React + TypeScript app (`vite` or `create-react-app`).
   - Install routing, data client, form/grid wrappers.

3. **Copy frontend assets (non-destructive)**
   - Copy static assets to `Frontend_React/public/legacy/*`.
   - Copy reusable TS logic into `Frontend_React/src/legacy/*`.
   - Keep paths intact initially to reduce breakage.

4. **Create compatibility shell**
   - Build `LegacyLayout` React shell with header/sidebar/content host.
   - Add module lazy-loader stub that mounts migrated screens progressively.

5. **Route-first migration**
   - Generate React routes from module manifest.
   - Map legacy navigation clicks to `react-router` navigation.

6. **API contract switch**
   - Stop consuming HTML payload endpoints.
   - Use JSON contracts (`module manifest`, `privileges`, `session`, `resources`).

7. **Incremental screen replacement**
   - For each module: move logic from jQuery DOM manipulation to React state/components.
   - Keep shared API layer stable while replacing screen internals.

8. **Validation gate**
   - Compare old/new menu visibility rules and privilege outcomes.
   - Smoke test route coverage and main CRUD/reporting flows.

## Suggested migration script skeleton
- `scripts/phase2-extract-frontend.sh`
  - create frontend app folder
  - copy source/static trees per move map
  - emit `module-manifest.json` from view/script names
  - generate route stubs and API client templates

---

## 3) Replace server-rendered HTML endpoints with JSON contracts (design)

## Current HTML-centric endpoints (legacy behavior)
- `GET /Home/GetPagesLogin_Home` -> JSON string containing HTML fragments per module.
- `GET /Home/GetAllView` -> JSON string containing HTML fragments for all modules.
- `GET /Home/GetAllViewNew` -> JSON string containing HTML fragments by privilege-filtered list.
- `GET /Home/OpenView?moduleCode=...` -> raw HTML of selected module view.
- `GET /Home/Index`, `GET /Home/ContainerIndex` -> serves `htmlContainerIndex` shell page.

## Target JSON contracts (React-ready)
1. `GET /api/navigation/modules`
   - returns module list and route metadata
   - payload:
     - `moduleCode`, `titleAr`, `titleEn`, `route`, `icon`, `category`, `order`

2. `GET /api/auth/privileges?compCode=...&roleIds=...&finYear=...`
   - returns privilege matrix and allowed modules
   - payload:
     - `modules[]` (`moduleCode`, `access`, `available`, CRUD flags)

3. `GET /api/session/bootstrap`
   - returns startup context for React
   - payload:
     - `language`, `company`, `branch`, `finYear`, `user`, `controlFlags`

4. `GET /api/resources?lang=ar|en`
   - returns localization dictionary used by menus/screens

5. `GET /api/modules/{moduleCode}/metadata`
   - optional per-module schema/lookup dependencies

> Result: React receives data contracts only; page markup is rendered client-side.

---

## 4) React routing structure equivalent to existing navigation

## Core routes
- `/login` -> Login page
- `/home` -> Home dashboard/menu host
- `/profile` -> Profile
- `/not-found` -> fallback

## Module route convention
- Route pattern: `/app/:moduleCode` (or explicit static paths per module).
- Example explicit mappings:
  - `/app/tr-sales` <-> `TR_Sales`
  - `/app/view-sales` <-> `ViewSales`
  - `/app/show-price` <-> `ShowPrice`
  - `/app/view-show-price` <-> `ViewShowPrice`
  - `/app/job-order` <-> `JobOrder`
  - `/app/view-job-order` <-> `ViewJobOrder`
  - `/app/delivery-order` <-> `DeliveryOrder`
  - `/app/view-delivery-order` <-> `ViewDeliveryOrder`
  - `/app/purchases` <-> `Purchases`
  - `/app/view-purchases` <-> `ViewPurchases`
  - `/app/out-works` <-> `OutWorks`
  - `/app/view-out-works` <-> `ViewOutWorks`
  - `/app/financial` <-> `Financial`
  - `/app/view-financial` <-> `ViewFinancial`
  - `/app/customer` <-> `Customer`
  - `/app/edit-customer` <-> `EditCustomer`
  - `/app/suppliers` <-> `Suppliers`
  - `/app/edit-suppliers` <-> `EditSuppliers`
  - `/app/partners` <-> `Partners`
  - `/app/edit-partners` <-> `EditPartners`
  - `/app/items` <-> `Items`
  - `/app/view-items` <-> `ViewItems`
  - `/app/account-tree` <-> `AccountTree`
  - `/app/edit-account-tree` <-> `EditAccountTree`
  - `/app/voucher` <-> `Voucher`
  - `/app/wallet` <-> `Wallet`
  - `/app/reports/*` -> report screens (`Rep_*`, `TaxReport`, `StockReport`, etc.)

## Navigation behavior parity
- Menu visibility driven by `controlFlags` and privilege contracts (same logic as legacy `PagesInMenu` + privilege endpoints).
- Deep-link support replaces hash/HTML-fragment loading.

---

## 5) API client layer for React (generation design)

## Folder structure
- `Frontend_React/src/api/http.ts`
- `Frontend_React/src/api/endpoints.ts`
- `Frontend_React/src/api/contracts.ts`
- `Frontend_React/src/api/clients/`
  - `navigationClient.ts`
  - `authClient.ts`
  - `sessionClient.ts`
  - `resourcesClient.ts`
  - `moduleClient.ts`

## Core generation outputs
1. **Typed contracts** (`contracts.ts`)
   - `ModuleNavItem`, `PrivilegeItem`, `BootstrapSession`, `ResourceMap`, `ModuleMetadata`.

2. **HTTP wrapper** (`http.ts`)
   - base URL, auth/header interceptors, error normalization, timeout handling.

3. **Endpoint constants** (`endpoints.ts`)
   - centralized paths for all JSON contracts.

4. **Domain clients** (`clients/*.ts`)
   - pure functions returning typed promises.

5. **React hooks layer (optional)**
   - `useBootstrapSession`, `useModuleNavigation`, `usePrivileges` with React Query.

---

## File move map (non-destructive copy plan)

| Source (backend repo) | Destination (new React app) | Action | Notes |
|---|---|---|---|
| `Core_Sh/ClientApp/**` | `Frontend_React/src/legacy/clientapp/**` | Copy | Preserve module folders for incremental refactor. |
| `Core_Sh/Scripts/**` | `Frontend_React/src/legacy/scripts/**` | Copy | Legacy helper libs not under `wwwroot`. |
| `Core_Sh/wwwroot/NewStyle/**` | `Frontend_React/public/legacy/NewStyle/**` | Copy | Theme assets/css/images referenced by views. |
| `Core_Sh/wwwroot/Content/**` | `Frontend_React/public/legacy/Content/**` | Copy | CSS/content resources. |
| `Core_Sh/wwwroot/Scripts/**` | `Frontend_React/public/legacy/Scripts/**` | Copy | Third-party + custom browser scripts. |
| `Core_Sh/wwwroot/js/**` | `Frontend_React/public/legacy/js/**` | Copy | Runtime scripts. |
| `Core_Sh/wwwroot/css/**` | `Frontend_React/public/legacy/css/**` | Copy | Base stylesheets. |
| `Core_Sh/wwwroot/images/**` | `Frontend_React/public/legacy/images/**` | Copy | Shared image assets. |
| `Core_Sh/wwwroot/fonts/**` | `Frontend_React/public/legacy/fonts/**` | Copy | Font assets. |
| `Core_Sh/wwwroot/lib/**` | `Frontend_React/public/legacy/lib/**` | Copy | Client libs. |
| `Core_Sh/wwwroot/vendors/**` | `Frontend_React/public/legacy/vendors/**` | Copy | Vendor bundles. |
| `Core_Sh/wwwroot/jsgrid/**` | `Frontend_React/public/legacy/jsgrid/**` | Copy | Grid plugin assets. |
| `Core_Sh/wwwroot/System/**` | `Frontend_React/public/legacy/System/**` | Copy | System static assets. |
| `Core_Sh/wwwroot/StyleProfile/**` | `Frontend_React/public/legacy/StyleProfile/**` | Copy | Profile styles. |
| `Core_Sh/wwwroot/Images_Setting/**` | `Frontend_React/public/legacy/Images_Setting/**` | Copy | Settings images. |
| `Core_Sh/Resources/**` | `Frontend_React/src/legacy/resources/**` | Copy | Localization/resource payload extraction source. |
| `Core_Sh/Views/Home/*.cshtml` | `Frontend_React/docs/legacy-views/*.cshtml` | Copy | Reference only during JSX conversion. |
| `Core_Sh/Views/Shared/*.cshtml` | `Frontend_React/docs/legacy-views/shared/*.cshtml` | Copy | Layout reference during shell reconstruction. |
| `Core_Sh/tsconfig.json` | `Frontend_React/docs/legacy/tsconfig.legacy.json` | Copy | Keep as migration reference. |

---

## Deliverable format for execution phase
- `module-manifest.json` (generated): complete module inventory + route map.
- `asset-copy-log.json` (generated): copied files and checksums.
- `api-contracts-v1.md` (generated): finalized JSON schema for backend/frontend integration.
