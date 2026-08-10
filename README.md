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

## Menu API (JSX only)

Menu is declared as compound components, not config arrays:

```tsx
<Menu>
  <Menu.Panel>
    <Menu.List>
      <Menu.Item isActive={isActive}>
        {(props) => <Link {...props} to="/trends">Trends</Link>}
      </Menu.Item>
      <Menu.Submenu isActive={branchActive}>
        <Menu.SubmenuTrigger>{(props) => <button {...props} />}</Menu.SubmenuTrigger>
        <Menu.SubmenuContent>...</Menu.SubmenuContent>
      </Menu.Submenu>
    </Menu.List>
  </Menu.Panel>
</Menu>
```

Import headless menu: `@/shared/ui/menu` or `src/menu/` (re-export for the test brief).

## FSD layout (assignment rules preserved)

| FSD layer | Path | Role |
| --- | --- | --- |
| **shared/ui/menu** | `src/shared/ui/menu/` | Headless menu: a11y, layout modes; **no** router, **no** Tailwind |
| **shared** (demo UI) | `hello-client-menu`, `mobile-shell`, `icons` | Tailwind presentation for HelloClient |
| **features** | `src/features/menu-router/` | `Link`, paths, `useMenuRouteState()` — router only here |
| **widgets** | `src/widgets/app-shell/` | `Menu` provider, localStorage, shell layout |
| **pages** | `src/pages/*/` | Route screens (products, placeholder, integration demo) |
| **app** | `src/app/` | `HashRouter`, route tree |

Layer imports: upper layers may use lower ones (`app` → `pages` → `widgets` → `features` → `shared`). `shared/ui/menu` does not import router or app code.

See `features/menu-router/ui/RouterMenuIntegration.tsx` and `StateDrivenMenu.example.tsx`.
