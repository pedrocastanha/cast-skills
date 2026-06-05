---
name: creating-project-skills
description: Use when the user runs /skill-creator or asks to "set up project skills", "create
  project context", "initialize skills", "bootstrap project skills", or "generate project knowledge
  base". Reads the codebase, interviews the user, and generates a per-project skill tree:
  skills/project-context, skills/spec-driven-development (a project-adapted TDD clone of
  tlc-spec-driven), and a SKILL.md for each module and significant submodule.
---

# Creating Project Skills

Generates a structured, per-project skill tree. Four phases. Copy this checklist:

```
Bootstrap progress:
- [ ] Phase 1: DETECT  (read codebase)
- [ ] Phase 2: INTERVIEW  (ask only what code can't answer)
- [ ] Phase 3: GENERATE  (write the tree)
- [ ] Phase 4: REPORT  (summary + next step)
```

## Phase 1 — DETECT (automated, no user input)

1. **Identity**: name (`package.json` `.name` or root folder), framework (`@nestjs/core`, `express`,
   `next`, `fastify`, etc.), test tool (`jest`, `vitest`, `mocha`), language (TS if `tsconfig.json`).
2. **Modules** (try in order, stop at first match):
   a. NestJS: `find . -name "*.module.ts" -not -path "*/node_modules/*"` → base name = module.
   b. Monorepo: `packages/*/package.json` or `apps/*/package.json` → each is a module.
   c. Flat: `src/*/` dirs with ≥5 source files → each is a module.
   d. Fallback: ask the user to list the main modules.
3. **Per module**: path, main files (services, controllers, resolvers, guards, DTOs), imports from
   other project modules, obvious purpose.
4. **Entities**: `*.entity.ts`, `*.model.ts`, `*.schema.ts`, `schema.prisma`.
5. **Communication**: `EventEmitter`, `@nestjs/event-emitter`, `Bull`, `RabbitMQ`, `Kafka`, HTTP
   clients (`HttpModule`, `axios`, `fetch`) between modules.
6. **Conventions**: file naming, class naming, service naming, test file location — from real files.

## Phase 2 — INTERVIEW (one question at a time)

1. "What is the system's main domain? (e.g. fintech, health, e-commerce, HR, logistics)"
2. For each module whose purpose is NOT obvious from code: "Module `{name}` at `{path}` — what is its
   main responsibility?" (skip obvious ones like `auth`, `users`).
3. "How do modules communicate? (internal events/queues, HTTP between services, shared DB, direct DI)"
4. "Any global business rule not visible in code? (e.g. 'every user must belong to an organization')"

## Phase 3 — GENERATE

Read the templates with the Read tool (not auto-loaded):
- `references/project-context-template.md`
- `references/module-template.md`
- `references/sdd-skill-template.md`
- `references/tdd-immutable.md`

Generate in this order:

### 1. `skills/project-context/SKILL.md`
Fill `project-context-template.md`: project name, domain, core entities, tech stack, code
conventions, a module-map table linking each `<module>/SKILL.md`, communication patterns, global
business rules.

### 2. `skills/spec-driven-development/` (full clone + project overlay)
- Copy the entire bundled clone verbatim:
  `cp -r references/sdd-clone/* skills/spec-driven-development/`
  This brings `SKILL.md` + all `references/*.md` from tlc-spec-driven (stack-agnostic).
- Overwrite `skills/spec-driven-development/SKILL.md` header using `sdd-skill-template.md`, filled
  with the project name + framework, and the instruction to load `project-context` then the affected
  `<module>/SKILL.md` before any code.
- Generate `skills/spec-driven-development/references/project-conventions.md` from DETECT data
  (framework, module structure, file/class/service naming, test pattern, one representative module
  folder tree).
- Copy `references/tdd-immutable.md` into
  `skills/spec-driven-development/references/tdd-immutable.md`, and ensure the SKILL.md prominently
  links it: **tests are written first in phase 1 as the frozen contract; implementation conforms to
  the tests; tests are never edited to make code pass.**

### 3. `<module>/SKILL.md` per module
Fill `module-template.md`: responsibility, business rules, internal structure + naming, key
abstractions, and relationships — **Emits / Consumes / Depends-on** — plus known gotchas.

### 4. `<module>/<submodule>/SKILL.md`
For submodules with ≥3 significant files (services, controllers, guards, strategies), generate a
deeper skill with the same template.

## Phase 4 — REPORT

```
Skills generated:
✓ skills/project-context/SKILL.md
✓ skills/spec-driven-development/SKILL.md (+ references/)
✓ {module}/SKILL.md ...

New module → copy an existing {module}/SKILL.md and adapt.
New submodule → {module}/{submodule}/SKILL.md, same template.

Next: start any feature — using-project-skills will route you through spec-driven-development.
```
