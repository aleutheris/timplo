# ICR Index

Append-only audit log of Interface Change Requests (`ICR-YYNNNN`). One row per ICR; list `Open`
requests first. ICRs are never moved or deleted. Status values and lifecycle follow
`docs/governance/generic/process/artifact-model.md` (`Open → Approved → Implemented`; `Rejected`
and `Withdrawn` terminal).

No ICRs recorded yet. When a boundary contract (see project-instructions §2 — the timer state
shape, the localStorage key `timplo.timer-state.v1`, or the `dist` build output) needs a change,
file an ICR here using `docs/governance/generic/templates/interface-change-request.template.md`.

## Index

| ID | Title | Status | Record | Related | Notes |
| --- | --- | --- | --- | --- | --- |
| _(none yet)_ | | | | | |

## Tracking Rules

1. List `Open` requests first; keep this index synchronized with the `icr/` folder.
2. Progress status `Open → Approved → Implemented`; `Rejected`/`Withdrawn` are terminal.
3. An approved ICR's effect lands in the contract it modifies; the ICR records *why*.
4. Never move, delete, or reuse an ICR ID.
