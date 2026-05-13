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
