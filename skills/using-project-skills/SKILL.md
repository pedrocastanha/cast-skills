---
name: using-project-skills
description: Use at the START of any feature, fix, refactor, or change in a project. Checks for
  the project's skill tree (skills/project-context and skills/spec-driven-development), loads project
  context, and routes the task into the project's spec-driven workflow. If no project skills exist,
  offers once to create them with /skill-creator. Triggers on "add a feature", "implement", "fix",
  "refactor", "build", "change", "new endpoint", "new module", or starting any development task.
---

# Using Project Skills

The front door for development work in a project. Run this reasoning before writing any code.

## Step 1 — Look for the project skill tree

Check whether these exist in the current project:

- `skills/project-context/SKILL.md`
- `skills/spec-driven-development/SKILL.md`

```bash
ls skills/project-context/SKILL.md skills/spec-driven-development/SKILL.md 2>/dev/null
```

## Step 2 — Route

**If both exist (project is set up):**

1. Read `skills/project-context/SKILL.md` first — domain, conventions, module map.
2. Identify which module(s) the task touches from the module map.
3. Read the affected `<module>/SKILL.md` (and submodule skill, if relevant).
4. Hand off to `skills/spec-driven-development/SKILL.md` and follow it (spec-first, TDD with
   immutable phase-1 tests).

Do not start editing code before completing Step 2.

## Step 3 — After the work lands

When a **non-trivial** change is finished (touched 2+ files, introduced a new concept/pattern/
dependency, or contained non-obvious logic — not a rename, bump, or typo), hand off to
`explaining-changes`, which offers — once, non-blocking — a beginner-friendly explanation at the depth
the user wants. Skip the offer for trivial tweaks. The user can also ask for it any time ("me explica").

**If they do NOT exist (project not set up):**

Offer — **once per session, non-blocking**:

> No project skills found. I can read this codebase and generate a project skill tree
> (project-context, per-module skills, and a project-adapted spec-driven-development workflow)
> by running `/skill-creator`. Want me to set that up now? If not, I'll proceed without it.

- If the user accepts → invoke `creating-project-skills`.
- If the user declines or ignores → proceed with the task normally and **do not ask again this
  session**. Track that the offer was made; do not repeat it.

## Why this matters

Project skills carry the business rules, module relationships, and conventions that are not
obvious from any single file. Loading them before coding prevents architecture drift and rework.
