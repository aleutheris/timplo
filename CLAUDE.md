# CLAUDE.md

Governance for this project — for humans and any model — lives in
[`docs/governance/`](docs/governance/).

This project is worked on most often with Claude, so the **always-on governance core is
imported below** (Claude auto-loads `@`-imports; plain links are not). Everything else loads
on demand — do not preload it.

@docs/governance/README.md
@docs/governance/generic/process/framework.md

## Loading the rest (on demand)

The router (imported above) owns the loading triggers — follow them, and load only what the
task needs. The deeper tiers (`framework-reference.md`, `artifact-model.md`, `epic-process.md`,
`project-instructions.md`, templates, and individual records) are **not** preloaded.

This file is a thin pointer plus the Claude import of the always-on core; the single source of
governance is `docs/governance/`.
