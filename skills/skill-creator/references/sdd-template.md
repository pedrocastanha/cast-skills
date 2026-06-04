---
name: sdd
description: Use this skill when starting any new feature, fix, or change in this project.
  Drives spec-first development adapted to this project's patterns and stack.
---

# Spec-Driven Development — {PROJECT_NAME}

## Before Any Code

**Step 1 — Load project context:**
Invoke the `project-context` skill. Read it fully before writing any spec.

**Step 2 — Read module skill:**
Find the affected module in the module map. Read `{affected-module}/SKILL.md`.

## Writing the Spec

Create a spec file at `docs/specs/YYYY-MM-DD-{feature-name}.md` with:

```markdown
## Goal
One sentence: what this adds or fixes.

## Context
Which modules are affected. Which business rules apply.

## Approach
How it will work. Key decisions.

## Acceptance Criteria
- [ ] Specific, testable condition
- [ ] Another condition

## Out of Scope
What this does NOT do.
```

## Project Conventions

**Framework:** {FRAMEWORK}
**Module structure:** {MODULE_STRUCTURE_PATTERN}
**Naming:**
- Files: {FILE_NAMING}
- Classes: {CLASS_NAMING}
- Services: {SERVICE_NAMING}

**Test pattern:**
{TEST_PATTERN}

**Folder structure per module:**
```
{MODULE_FOLDER_TEMPLATE}
```

## Implementation Order

1. Write spec and get approval
2. Write failing tests first (TDD)
3. Implement against tests
4. Update affected `{module}/SKILL.md` if business rules changed
5. Commit with conventional commit message
