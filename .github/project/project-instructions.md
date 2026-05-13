# Timplo Project Instructions

## Project Profile

- Project name: Timplo
- Goal: a simple web-based multi-timer app that runs on GitHub Pages.
- Primary users: people who want quick named countdown timers on desktop and mobile browsers.
- Constraints: static hosting only, no backend, mobile-friendly interactions, at most 10 timers, timer durations from `00:01` to `59:59`, and short timer names up to 15 characters.

## Architecture Instantiation

- Major modules and responsibilities:
  - `src/App.tsx`: app orchestration, view navigation, and timer state coordination.
  - `src/timer.ts`: timer types, formatting, creation, and local storage helpers.
  - `src/components/TimerList.tsx`: timer library view with add, edit, delete, and selection actions.
  - `src/components/TimerStage.tsx`: selected timer view with back navigation, enlarged timer display, reset button, and tap-to-run interaction.
  - `.github/workflows/deploy.yml`: GitHub Pages deployment pipeline.
- Module ownership map: app state in the page shell, display logic in components, timer rules in `src/timer.ts`.
- Allowed dependency directions: components may depend on shared timer helpers; helpers must not depend on React.
- Boundary contract catalog: local timer state shape, localStorage key `timplo.timer-state.v1`, and the GitHub Pages build output under `dist`.
- Behavior-oriented slicing plan: timer library view, selected timer view, tap-to-run controls, persistence, and deployment.

## Interface Governance Instantiation

- Project-specific approval authority: repository owner or maintainer.
- Required approval SLA: same-day review for scope changes affecting timer behavior or deployment.
- Contract versioning strategy: keep localStorage schema changes backward-compatible where practical and bump the storage key if needed.
- ICR storage location: `.github/project/evolution/adr/` for decisions that affect public behavior or deployment.

## Verification Instantiation

- Critical end-to-end flows: open the timer library view, create timers, edit names and durations, delete timers from the library view, select a timer without auto-start, open the selected timer view, tap to start, tap to stop, tap to resume, reset from below the selected timer, return to the library view, switch selection while preserving remaining time, and deploy the static build.
- Required boundary contracts to test: timer formatting, countdown tick behavior, and localStorage load/save.
- Integration points with highest failure risk: browser timer ticking, touch interactions, and GitHub Pages asset paths.
- Component/service checks for fault localization: timer library view, selected timer view transitions, and the enlarged countdown panel.
- Optional unit-test focus areas: formatting and time normalization helpers.

## Delivery Instantiation

- Branching constraints for this project: keep the main branch deployable for GitHub Pages.
- CI gates and blocking checks: `npm run build` must pass before deployment.
- Rollback strategy by release type: revert the last merge or redeploy the prior successful build.
- Observability minimum for release: browser console should remain clean and timer state should persist locally.

## Quality Gate Instantiation

- Requirement taxonomy for this project: `FR`, `QR`, `OR`, and `CR`.
- Portability acceptance checks: the app builds as static files and runs without a backend.
- Maintainability acceptance checks: code remains split into focused modules and avoids duplicated timer logic.
- Observability acceptance checks: timer state and selection are visible in the UI and reflected in local storage.
- Contract-stability checks: local storage data loads safely when the shape changes.
- Readability and documentation checks: README explains the workflow and timer interactions.

## Stack Addendum

- Language and runtime: TypeScript in the browser.
- Frameworks and platform: React, Vite, and GitHub Pages.
- Data/storage choices: browser localStorage only.
- Infrastructure/deployment model: static site deployment via GitHub Actions.

## Evolution Tracking

- Decision cadence: create an ADR when a platform or interaction decision affects the app shape.
- Review cadence for project instructions: revisit when the timer workflow or hosting model changes.
- Requirement ID allocation: the repository maintainer will create requirement records and keep IDs stable.
- Backlog item ownership: the maintainer keeps backlog slices aligned to user-visible timer behavior.

## Loading Matrix Instantiation

Always-on:

- `.github/copilot-instructions.md`
- `.github/project/project-instructions.md`

Usually referenced:

- `README.md`
- `src/timer.ts`

On-demand:

- `.github/project/evolution/requirements/`
- `.github/project/evolution/adr/`
- `.github/project/evolution/backlog-items/`
- `.github/project/learnings/`
