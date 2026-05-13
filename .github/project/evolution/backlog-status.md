# Backlog Status Tracker

Canonical tracker for the current backlog items.
This file uses only these workflow states:

- `Ready`: the item is clear enough to implement.
- `Done`: the item has been implemented and verified.
- `Unclear`: the item still has scope overlap, ambiguity, or needs refinement before implementation.

## Active Backlog Items

| Backlog ID | Title | Status | Backlog Item | Notes |
| --- | --- | --- | --- | --- |
| BI-260002 | Multi-timer editing experience | Done | [BI-260002.md](backlog-items/BI-260002.md) | Implemented and build-verified: timer library view now supports add, edit, delete, and select actions with limits enforced. |
| BI-260003 | Active countdown interaction | Done | [BI-260003.md](backlog-items/BI-260003.md) | Implemented and build-verified: selected timer view with back navigation, enlarged square timer, tap start/stop/resume, and reset below the timer. |
| BI-260004 | Persistence, responsiveness, and deployment | Done | [BI-260004.md](backlog-items/BI-260004.md) | Implemented and build-verified: browser persistence hardened, selected timer restored after refresh, responsive behavior retained, and GitHub Pages deployment workflow documented and configured. |

## Historical Items

| Backlog ID | Title | Status | Backlog Item | Notes |
| --- | --- | --- | --- | --- |
| BI-260001 | Superseded bootstrap umbrella item | Unclear | [BI-260001.md](backlog-items/BI-260001.md) | Removed from the active backlog because it overlapped the clearer delivery slices BI-260002, BI-260003, and BI-260004. |

## Tracking Rules

1. Keep this file synchronized with the `backlog-items/` folder.
2. Every backlog item must have exactly one status: `Ready`, `Done`, or `Unclear`.
3. Mark an item `Unclear` when it overlaps another item or is not precise enough to start.
4. Mark an item `Done` only after implementation and verification are complete.
5. Keep the active backlog limited to implementable items; move superseded items to the historical section.
6. Prefer smaller, behavior-focused items over broad bootstrap items.
