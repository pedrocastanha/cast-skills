---
name: skill-creator
description: Use this skill when the user invokes /skill-creator, asks to "set up project
  skills", "create project context", "initialize skills", "generate project knowledge base",
  or "bootstrap project skills". Reads the codebase, interviews the user, and generates
  project-context, SDD, and module SKILL.md files.
---

# Skill Creator

Generates a structured skill system for this project. Runs in 4 phases.

## Phase 1: DETECT (automated — no user input needed)

Read and analyze the project. Collect:

**1. Project identity**
- Name: from `package.json` `.name`, or root directory name
- Framework: look for `@nestjs/core`, `express`, `next`, `fastify` in dependencies
- Test tool: look for `jest`, `vitest`, `mocha` in devDependencies
- Language: TypeScript if `tsconfig.json` exists, else JavaScript

**2. Module detection** (try in order, stop when one matches):

a. **NestJS modules**: `find . -name "*.module.ts" -not -path "*/node_modules/*"` → extract base names (e.g., `auth.module.ts` → module `auth`, path `src/auth/`)

b. **Monorepo packages**: look for `packages/*/package.json` or `apps/*/package.json` → each package is a module

c. **Flat src directories**: list `src/*/` subdirectories with ≥5 `.ts` or `.js` files → each is a module

d. **Fallback**: ask "Quais são os módulos principais do sistema? (ex: auth, users, payments)"

**3. Per module, collect:**
- Path
- Main files (services, controllers, resolvers, guards, DTOs)
- Imports from other project modules (cross-module deps)
- Obvious purpose from file names and class names

**4. Entities**: look for `*.entity.ts`, `*.model.ts`, `*.schema.ts`, Prisma schema (`schema.prisma`), or TypeORM entities

**5. Communication patterns**: look for `EventEmitter`, `@nestjs/event-emitter`, `Bull`, `RabbitMQ`, `Kafka` imports; HTTP client usage (`HttpModule`, `axios`, `fetch`) between modules

---

## Phase 2: INTERVIEW (ask only what code cannot answer)

Ask one question at a time. Wait for answer before next.

**Always ask:**

1. "Qual o domínio principal do sistema? (ex: fintech, saúde, e-commerce, RH, logística)"

2. For each detected module where purpose is not obvious from code:
   "Encontrei o módulo `{name}` em `{path}`. Qual sua responsabilidade principal?"
   Skip if purpose is clear from file names (e.g., `auth` = authentication, `users` = user management).

3. "Como os módulos se comunicam? Marca as que se aplicam:
   - Eventos/filas internas (EventEmitter, Bull, RabbitMQ)
   - HTTP entre serviços
   - Banco de dados compartilhado
   - Chamadas diretas de serviço (injeção de dependência)"

4. "Tem alguma regra de negócio global importante que não aparece no código? (ex: 'todo usuário precisa ter organização', 'pagamentos só processam em dias úteis')"

---

## Phase 3: GENERATE

Read the three templates:
- Read `skills/skill-creator/references/project-context-template.md`
- Read `skills/skill-creator/references/sdd-template.md`
- Read `skills/skill-creator/references/module-template.md`

Fill each template with data collected in DETECT + INTERVIEW.

**Generate in this order:**

### 1. `skills/project-context/SKILL.md`
Fill project-context-template with:
- `{PROJECT_NAME}` ← package.json `.name` or root folder name
- `{DOMAIN_DESCRIPTION}` ← answer from interview Q1
- `{ENTITIES_LIST}` ← bullet list of detected entities with one-line description each
- `{TECH_STACK}` ← detected framework + ORM + test tool (e.g., "NestJS, Prisma, Jest")
- `{MODULE_TABLE_ROWS}` ← one markdown table row per module:
  `| {name} | {path} | [{name}/SKILL.md]({relative-link-to-module-SKILL.md}) |`
- `{COMMUNICATION_PATTERNS}` ← answer from interview Q3, formatted as bullet list
- `{GLOBAL_BUSINESS_RULES}` ← answer from interview Q4 as bullet list, or "None noted"

### 2. `skills/sdd/SKILL.md`
Fill sdd-template with:
- `{PROJECT_NAME}` ← project name
- `{FRAMEWORK}` ← detected framework
- `{MODULE_STRUCTURE_PATTERN}` ← description of detected pattern (e.g., "NestJS modules in `src/{name}/{name}.module.ts`")
- `{FILE_NAMING}` ← pattern from existing files (e.g., `kebab-case.service.ts`)
- `{CLASS_NAMING}` ← pattern from existing classes (e.g., `PascalCase`)
- `{SERVICE_NAMING}` ← example from codebase (e.g., `AuthService`, `PaymentsService`)
- `{TEST_PATTERN}` ← detected test setup (e.g., "Jest, co-located `*.spec.ts` files")
- `{MODULE_FOLDER_TEMPLATE}` ← paste actual `tree`-style structure of one representative module

### 3. `{module-path}/SKILL.md` for each detected module
Fill module-template with:
- `{MODULE_NAME}` ← module name
- `{MODULE_PATH}` ← relative path (e.g., `src/auth`)
- `{MODULE_RESPONSIBILITY}` ← from interview Q2 or inferred from code
- `{BUSINESS_RULES}` ← bullet list inferred from service methods, guards, validators in that module
- `{INTERNAL_STRUCTURE}` ← actual file listing of that module folder
- `{NAMING_CONVENTIONS}` ← patterns found (e.g., `*.service.ts`, `*.guard.ts`, `*.dto.ts`)
- `{KEY_ABSTRACTIONS}` ← main classes and one-line description of each
- `{EMITTED_EVENTS_OR_CALLS}` ← events emitted or HTTP calls made outbound (or "None detected")
- `{CONSUMED_EVENTS_OR_CALLS}` ← events listened to or endpoints exposed (or "None detected")
- `{DEPENDENCIES_ON_OTHER_MODULES}` ← modules imported in this module's providers/imports array
- `{GOTCHAS}` ← non-obvious things from interview or code comments (or "None noted")

**Sub-module detection:** if a module subdirectory has ≥3 significant files (services, controllers, guards, strategies), also create `{module-path}/{subdir}/SKILL.md` using the module-template.

---

## Phase 4: REPORT

After all files are written, output:

```
Skills geradas:
✓ skills/project-context/SKILL.md
✓ skills/sdd/SKILL.md
✓ {module-1-path}/SKILL.md
✓ {module-2-path}/SKILL.md
...

Para novos módulos: crie {novo-modulo}/SKILL.md usando um módulo existente como referência.
Para sub-módulos: crie {modulo}/{subdir}/SKILL.md seguindo o mesmo padrão.

Próximo passo: rode /sdd antes de iniciar qualquer nova feature.
```

---

## Reference Files Location

Templates are in:
```
skills/skill-creator/references/
├── project-context-template.md
├── sdd-template.md
└── module-template.md
```

Read these explicitly during Phase 3 using the Read tool. They are not loaded automatically.
