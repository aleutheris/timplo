# Timplo Project Instructions

Project-instantiated governance for Timplo. Foundational policy is **not** restated here — it
lives in the generic tier.

## Source of Truth (Do Not Duplicate)

- Foundation policy and agent behavior: `docs/governance/generic/process/framework.md`
- Engineering depth (SOLID, taxonomy, verification): `docs/governance/generic/process/framework-reference.md`
- Record model, naming, indexing, archival: `docs/governance/generic/process/artifact-model.md`
- Epic/task planning policy: `docs/governance/generic/process/epic-process.md`
- Interface approval workflow template: `docs/governance/generic/templates/interface-change-request.template.md`

## 1. Project Profile

- Project name: Timplo
- Governance version: v2.0.0 (adopted from `docs/governance/CHANGELOG.md`)
- Goal: a simple web-based multi-timer app that runs on GitHub Pages.
- Primary users: people who want quick named countdown timers on desktop and mobile browsers.
- Constraints: static hosting only, no backend, mobile-friendly interactions, at most 10 timers, timer durations from `00:01` to `59:59`, and short timer names up to 15 characters.

## 2. Architecture Instantiation

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

## 3. Interface Governance Instantiation

- Project-specific approval authority: repository owner or maintainer.
- Required approval SLA: same-day review for scope changes affecting timer behavior or deployment.
- Contract versioning strategy: keep localStorage schema changes backward-compatible where practical and bump the storage key if needed.
- ICR storage location: `docs/governance/project/evolution/icr/` (registered in `icr-index.md`).

All contract changes must use `docs/governance/generic/templates/interface-change-request.template.md`.

## 4. Verification Instantiation

- Critical end-to-end flows: open the timer library view, create timers, edit names and durations, delete timers from the library view, select a timer without auto-start, open the selected timer view, tap to start, tap to stop, tap to resume, reset from below the selected timer, return to the library view, switch selection while preserving remaining time, and deploy the static build.
- Required boundary contracts to test: timer formatting, countdown tick behavior, and localStorage load/save.
- Integration points with highest failure risk: browser timer ticking, touch interactions, and GitHub Pages asset paths.
- Component/service checks for fault localization: timer library view, selected timer view transitions, and the enlarged countdown panel.
- Optional unit-test focus areas: formatting and time normalization helpers.

## 5. Delivery Instantiation

- Branching constraints for this project: keep the main branch deployable for GitHub Pages.
- CI gates and blocking checks: `npm run build` must pass before deployment.
- Rollback strategy by release type: revert the last merge or redeploy the prior successful build.
- Observability minimum for release: browser console should remain clean and timer state should persist locally.

## 6. Quality Gate Instantiation

Requirement taxonomy and record naming follow `framework-reference.md` §2 and `artifact-model.md`.

- Requirement ID allocation: the repository maintainer creates `REQ-FR/QR/OR/CR` records and keeps IDs stable.
- Portability acceptance checks: the app builds as static files and runs without a backend.
- Maintainability acceptance checks: code remains split into focused modules and avoids duplicated timer logic.
- Observability acceptance checks: timer state and selection are visible in the UI and reflected in local storage.
- Contract-stability checks: local storage data loads safely when the shape changes.
- Readability and documentation checks: README explains the workflow and timer interactions.

Code cohesion defaults (per `framework.md` §4):

- File size guardrail: `<= 200 lines`.
- Function size guardrail: `<= 30 lines where practical`.

## 7. Stack Addendum

- Language and runtime: TypeScript in the browser.
- Frameworks and platform: React, Vite, and GitHub Pages.
- Data/storage choices: browser localStorage only.
- Infrastructure/deployment model: static site deployment via GitHub Actions.

## 8. Evolution Tracking

Records live under `docs/governance/project/evolution/` (learnings under
`docs/governance/project/learnings/`), one file per item, each index beside the folder it
registers. Naming, status values, the index-first rule, and the archival lifecycle follow
`artifact-model.md`.

- `evolution/adr/` + `adr-index.md`
- `evolution/requirements/` + `requirement-index.md`
- `evolution/icr/` + `icr-index.md`
- `evolution/contracts/` + `contract-index.md`
- `evolution/epics/` + `epic-index.md` (priority-ordered)
- `evolution/roadmap.md` (architecture-direction narrative; not an index)
- `learnings/` + `learning-index.md`

Project-specific instantiation:

- Decision cadence: create an ADR when a platform or interaction decision affects the app shape.
- Review cadence for project instructions: revisit when the timer workflow or hosting model changes.
- Epic ownership: the maintainer writes and maintains epics and their inline task checklists, keeping slices aligned to user-visible timer behavior.

## 9. Loading Matrix Instantiation

Tiers and budget guardrails follow `framework.md` §8; the project-specific files per tier:

Always-on:

- `docs/governance/README.md`
- `docs/governance/project/project-instructions.md`

Usually referenced:

- `README.md`
- `src/timer.ts`

On-demand:

- `docs/governance/project/evolution/requirements/`
- `docs/governance/project/evolution/roadmap.md` and `docs/governance/project/evolution/adr/`
- `docs/governance/project/evolution/epics/`
- `docs/governance/project/evolution/icr/` and `docs/governance/project/evolution/contracts/`
- `docs/governance/project/learnings/`
