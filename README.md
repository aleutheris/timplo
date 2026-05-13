# Timplo

Timplo is a simple multi-timer web app built for GitHub Pages.

Users can create several named countdown timers, edit each timer's minutes and seconds, switch the active timer instantly, and tap or click the active view to pause and resume. Each timer can also be reset to its configured duration.

## Stack

- React
- TypeScript
- Vite
- GitHub Pages via GitHub Actions

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

The Vite configuration uses a relative base path so the static build works from GitHub Pages.

## Deployment

Deployment is handled by `.github/workflows/deploy.yml` using GitHub Pages Actions.

1. Push to the `main` branch.
2. In repository settings, enable GitHub Pages and set source to `GitHub Actions`.
3. The workflow builds the app and publishes the `dist` output.

## Persistence and responsiveness

- Timer definitions and state are stored in browser localStorage.
- Selected timer context is restored after refresh on the same device.
- Layout and controls are responsive for desktop and mobile touch usage.
