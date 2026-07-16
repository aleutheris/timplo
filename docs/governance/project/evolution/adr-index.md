# ADR Index

Registry of architectural decision records. One row per ADR; full detail lives in each record.
This index is the single source of truth for ADR status. Status values and the archival
lifecycle follow `docs/governance/generic/process/artifact-model.md`.

## Index

| ID | Title | Status | Record | Related | Notes |
| --- | --- | --- | --- | --- | --- |
| ADR-260001 | Use React, TypeScript, and Vite for the timer app | Accepted | [ADR-260001.md](adr/ADR-260001.md) | REQ-OR-260001, REQ-CR-260001, EPIC-260001, EPIC-260004 | Foundational stack + static-deploy decision. |
| ADR-260002 | Single active timer model with browser-local persistence | Accepted | [ADR-260002.md](adr/ADR-260002.md) | REQ-FR-260001, REQ-FR-260003, REQ-QR-260003, EPIC-260002, EPIC-260003 | One selected/running timer at a time; localStorage persistence. |

## Tracking Rules

1. Keep this index synchronized with the `adr/` folder contents.
2. Update status as ADRs progress (`Proposed → Accepted`, then a terminal status if superseded).
3. On a terminal status with no active references, move the record to `adr/superseded/` and keep a one-line tombstone here.
4. Never delete a row.
