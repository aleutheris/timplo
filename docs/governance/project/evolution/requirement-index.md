# Requirement Index

Registry of requirement records (`REQ-XY-YYNNNN`, `XY ∈ {FR, QR, OR, CR}`). One row per record;
full detail lives in each file. This index is the single source of truth for requirement status.
Status values and archival follow `docs/governance/generic/process/artifact-model.md`.

## Index

| ID | Title | Status | Record | Related | Notes |
| --- | --- | --- | --- | --- | --- |
| REQ-FR-260001 | Multi-timer countdown behavior | Active | [REQ-FR-260001.md](requirements/REQ-FR-260001.md) | ADR-260002, EPIC-260001, EPIC-260002 | Core multi-timer behavior. |
| REQ-FR-260002 | Multiple named timers | Active | [REQ-FR-260002.md](requirements/REQ-FR-260002.md) | ADR-260002, EPIC-260002 | Library view: add/name/edit/delete. |
| REQ-FR-260003 | Active timer switching and control | Active | [REQ-FR-260003.md](requirements/REQ-FR-260003.md) | ADR-260002, EPIC-260003 | One selected/running timer at a time. |
| REQ-FR-260004 | Reset and finish behavior | Active | [REQ-FR-260004.md](requirements/REQ-FR-260004.md) | ADR-260002, EPIC-260003 | Reset + auto-return to paused at zero. |
| REQ-FR-260005 | Countdown visual state | Active | [REQ-FR-260005.md](requirements/REQ-FR-260005.md) | ADR-260002, EPIC-260003 | Distinct paused/running/reset visuals. |
| REQ-FR-260006 | Two-view screen structure | Active | [REQ-FR-260006.md](requirements/REQ-FR-260006.md) | ADR-260002, EPIC-260002, EPIC-260003 | Library view + selected timer view. |
| REQ-QR-260002 | Mobile-friendly web experience | Active | [REQ-QR-260002.md](requirements/REQ-QR-260002.md) | ADR-260001, EPIC-260004 | Responsive + touch interaction. |
| REQ-QR-260003 | Browser-local persistence | Active | [REQ-QR-260003.md](requirements/REQ-QR-260003.md) | ADR-260002, EPIC-260004 | localStorage restore across reload. |
| REQ-OR-260001 | Static GitHub Pages deployment | Active | [REQ-OR-260001.md](requirements/REQ-OR-260001.md) | ADR-260001, EPIC-260001, EPIC-260004 | Static build published via Actions. |
| REQ-CR-260001 | Static hosting only | Active | [REQ-CR-260001.md](requirements/REQ-CR-260001.md) | ADR-260001, EPIC-260004 | No backend dependency. |
| REQ-CR-260002 | Timer limits and naming constraints | Active | [REQ-CR-260002.md](requirements/REQ-CR-260002.md) | EPIC-260003 | ≤10 timers, `00:01`–`59:59`, name ≤15 chars. |

## Tracking Rules

1. Keep this index synchronized with the `requirements/` folder contents.
2. Update status as requirements progress (`Proposed → Active`, then a terminal status).
3. On a terminal status with no active references, move the record to `requirements/superseded/` and keep a one-line tombstone here.
4. Never delete a row.
