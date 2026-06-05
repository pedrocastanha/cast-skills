---
description: Generate a per-project skill tree (project-context, spec-driven-development, module skills)
argument-hint: Optional — list specific modules to generate (e.g. "auth users payments")
allowed-tools: ["Read", "Write", "Glob", "Grep", "Bash", "Skill"]
---

Invoke the `creating-project-skills` skill to generate a structured skill tree for this project.

{{#if args}}
Focus on these modules: {{args}}
Generate module skills only for those, plus project-context and spec-driven-development.
{{/if}}

Start immediately with Phase 1: DETECT. Do not ask for permission or summarize first — begin reading
the project structure.
