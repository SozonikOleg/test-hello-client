# test-hello-client

Headless React menu (TypeScript) + demo shell (Tailwind, React Router).

## Demo

After deploy: `https://<your-github-username>.github.io/test-hello-client/`

Routes use hash URLs, e.g. `.../test-hello-client/#/inventory/products`.

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

Headless logic: `src/menu/`. Styling and routing: `src/demo/`.
