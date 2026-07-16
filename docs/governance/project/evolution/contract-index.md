# Contract Index

Registry of boundary contracts (`<name>-contract.md`). One row per contract. This index is the
single source of truth for contract status. Status values and archival follow
`docs/governance/generic/process/artifact-model.md`. Changes to a contract require an ICR
(`framework.md` §3).

No contract records authored yet. The known boundary surfaces for Timplo (candidates for a
contract record if one is ever formalized) are the persisted timer state shape under the
localStorage key `timplo.timer-state.v1` and the static `dist` build output consumed by GitHub
Pages — see project-instructions §2.

## Index

| ID | Title | Status | Record | Related | Notes |
| --- | --- | --- | --- | --- | --- |
| _(none yet)_ | | | | | |

## Tracking Rules

1. Keep this index synchronized with the `contracts/` folder.
2. Update status as contracts progress (`Proposed → Active`, then a terminal status).
3. On a terminal status with no active references, move the record to `contracts/superseded/` and keep a one-line tombstone here.
4. Never delete a row.
