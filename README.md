# test-hello-client

Headless React menu (TypeScript) + HelloClient demo (Tailwind, React Router, [Feature-Sliced Design](https://feature-sliced.design/)).

## Demo

After deploy: `https://<your-github-username>.github.io/test-hello-client/`

Routes use hash URLs, e.g. `.../test-hello-client/#/inventory/products`.

State-driven menu sandbox: `#/demo/integration`.

## Local run

```bash
npm install
npm run dev
```

## GitHub Pages

1. Push this repo to GitHub (default branch `main` or `master`).
2. **Settings → Pages → Build and deployment → Source:** GitHub Actions.
3. Push to `main`/`master` — workflow [deploy-github-pages.yml](.github/workflows/deploy-github-pages.yml) builds and publishes `dist`.

Production build uses `VITE_BASE=/<repo-name>/` so assets load correctly on project pages.

## Menu API

Three layers — separate behavior, router integration, and business markup:

### 1. HeadlessMenu — behavior only (Storybook / tests, no router)

```tsx
import { HeadlessMenu } from '@/shared/ui/menu'

<HeadlessMenu>
  <HeadlessMenu.Panel>
    <HeadlessMenu.List>
      <HeadlessMenu.Item isActive={isActive}>
        {(props) => <button {...props} onClick={...}>Trends</button>}
      </HeadlessMenu.Item>
    </HeadlessMenu.List>
  </HeadlessMenu.Panel>
</HeadlessMenu>
```

Import: `@/shared/ui/menu` or `src/menu/` (re-export).

### 2. RouterMenu — router + product styling

```tsx
import { RouterMenu } from '@/features/menu-router'

<RouterMenu layout="sidebar">
  <RouterMenu.Group label="Inventory" icon={IconInventory} matchPrefix="/inventory">
    <RouterMenu.Item label="Products" to="/inventory/products" />
    <RouterMenu.Item label="Orders" to="/inventory/orders" />
  </RouterMenu.Group>
  <RouterMenu.Item label="Trends" to="/trends" icon={IconTrends} />
</RouterMenu>
```

Active path, `Link`, and HelloClient styles are handled inside `RouterMenu` — no render props at the business layer.

### 3. Business layer — declarative nav tree

Nav items live in `widgets/app-shell/ui/AppMenuNav.tsx`. The shell picks layout (`sidebar`, `mobile-tabs`, `mobile-overflow`) and reuses the same tree.

See `StateDrivenMenu.example.tsx` (HeadlessMenu without router) and `AppMenuNav.tsx` (RouterMenu).

## FSD layout (assignment rules preserved)

| FSD layer | Path | Role |
| --- | --- | --- |
| **shared/ui/menu** | `src/shared/ui/menu/` | Headless menu: a11y, layout modes; **no** router, **no** Tailwind |
| **shared** (demo UI) | `hello-client-menu`, `mobile-shell`, `icons` | Tailwind presentation for HelloClient |
| **features** | `src/features/menu-router/` | `RouterMenu`, `useMenuRouteState()` — router + styling integration |
| **widgets** | `src/widgets/app-shell/` | `Menu` provider, localStorage, shell layout |
| **pages** | `src/pages/*/` | Route screens (products, placeholder, integration demo) |
| **app** | `src/app/` | `HashRouter`, route tree |

Layer imports: upper layers may use lower ones (`app` → `pages` → `widgets` → `features` → `shared`). `shared/ui/menu` does not import router or app code.

See `features/menu-router/ui/RouterMenu.tsx`, `widgets/app-shell/ui/AppMenuNav.tsx`, and `StateDrivenMenu.example.tsx`.
