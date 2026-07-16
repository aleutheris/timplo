# Roadmap (Architecture Direction)

A short, living architecture-direction narrative — not an index and not a per-item record. It
holds the current architecture shape, the near-term direction, and the major decisions still
pending. When a direction hardens into a decision, record the ADR and link it here.

## Current shape

Timplo is a static, backend-less React + TypeScript app built with Vite and deployed to GitHub
Pages via GitHub Actions (ADR-260001). Timer logic lives in a small shared helper (`src/timer.ts`);
components hold display logic; the page shell holds app state. The model is a list of timers with
one selected timer at a time, only the selected timer runs, and state persists in localStorage
under `timplo.timer-state.v1` (ADR-260002). Two views: a timer library view and a selected timer
view.

## Near-term direction

The MVP scope (EPIC-260001 through EPIC-260004) is complete. No new epics are in flight. Next
work, if any, should enter as new epics in `epic-index.md` (Ideation → Ready → Done).

## Pending decisions

- None open. Boundary surfaces that would require an ADR/ICR if changed: the persisted timer
  state shape and its storage key, and the static build/deploy contract (see `contract-index.md`).
