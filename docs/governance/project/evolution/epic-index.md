# Epic Index

Registry of epics and their priority ordering (it absorbs the prioritization the retired
`product-backlog.md` once held). One row per epic; task states live inline in each epic file.
This index is the single source of truth for **epic state**. States and lifecycle follow
`artifact-model.md` and `epic-process.md`.

Priority order below reflects the original delivery sequence. All epics are **Done** (the MVP
scope is complete); reprioritize this list when new epics enter Ideation.

## Index

| Priority | ID | Title | Status | Epic | Related | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | EPIC-260001 | Bootstrap umbrella (stack, governance, first running app) | Done | [EPIC-260001.md](epics/EPIC-260001.md) | ADR-260001, ADR-260002; split into 260002/003/004 | v1 `BI-260001`; scope split into the three delivery epics. |
| 2 | EPIC-260002 | Multi-timer editing experience | Done | [EPIC-260002.md](epics/EPIC-260002.md) | REQ-FR-260001/260002/260006, ADR-260002 | v1 `BI-260002`; timer library view. |
| 3 | EPIC-260003 | Active countdown interaction | Done | [EPIC-260003.md](epics/EPIC-260003.md) | REQ-FR-260003/260004/260005/260006, REQ-CR-260002, ADR-260002 | v1 `BI-260003`; selected timer view. |
| 4 | EPIC-260004 | Persistence, responsiveness, and deployment | Done | [EPIC-260004.md](epics/EPIC-260004.md) | REQ-QR-260002/260003, REQ-OR-260001, REQ-CR-260001, ADR-260001 | v1 `BI-260004`; localStorage + responsive + Pages deploy. |

## Tracking Rules

1. Keep this index synchronized with the `epics/` folder contents.
2. Epic state is `Ideation → Ready → Done`; the two human review gates are the transitions into **Ready** (plan review) and **Done** (implementation review).
3. Keep rows in priority order; reprioritize open epics per the scoring policy in `epic-process.md`.
4. A `Done` epic's brief is frozen in place — epics are never archived. Never delete a row.
