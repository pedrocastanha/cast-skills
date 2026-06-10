---
name: explaining-changes
description: Use after finishing a non-trivial feature or change (not a trivial tweak like a rename,
  version bump, or typo), or whenever the user asks to "explain what you did", "how does this work",
  "walk me through it", "explain like I'm five", "under the hood", "why did you do it that way",
  "me explica", "como funciona", or "por que". Also use when the user wants a written or visual (HTML)
  walkthrough of a change, saved to study later. Produces a deep, beginner-friendly explanation file
  with diagrams, analogies, and references in a gitignored explanations/ folder.
---

# Explaining Changes

Turn finished work into a lasting, beginner-friendly explanation the user can study later — from
"explain it like I'm five" all the way down to compilation and runtime internals.

**Core principle:** A change isn't understood until someone with no context could understand it.
Every explanation teaches with analogies, real references, and diagrams — never hand-waving.

## When to use

- **Automatically**, once, after completing a **non-trivial** change (see heuristic below).
- **On demand**, any time the user asks to understand something ("me explica", "how does this work",
  "walk me through it", "under the hood").

**Non-trivial heuristic** — qualifies if the change does ANY of:
- touches 2+ files, OR
- introduces a new concept, pattern, dependency, or abstraction, OR
- contains logic that isn't obvious at a glance (algorithms, concurrency, state machines, protocols).

**Do NOT auto-offer for trivial tweaks:** renames, version bumps, formatting, typos, copy edits,
single-line config changes. If the user explicitly asks, always explain regardless of size.

## The four depth levels

Ask which level the user wants (they pick per change — it depends on the day):

| # | Level | Audience | Focuses on | Adds |
|---|-------|----------|------------|------|
| 1 | **Leigo / ELI5** | a curious beginner | *what* and *why* | one strong central analogy, zero jargon, one simple diagram |
| 2 | **Dev** | a teammate | *how it works* | data flow, components, design decisions, trade-offs, code snippets, sequence/flow diagrams |
| 3 | **Metal / under-the-hood** | the deeply curious | *what happens beneath* | compilation/transpilation, runtime, memory, I/O, data structures, complexity, what the framework does for you |
| 4 | **Completo** | wants everything | the whole climb | one document that rises from ELI5 → Dev → Metal, stitched into a single progressive read |

## Workflow

1. **Qualify.** Auto-trigger: apply the non-trivial heuristic. User asked: always qualifies.
2. **Ask** (one short prompt): *"Quer uma explicação? Profundidade — 1 Leigo / 2 Dev / 3 Metal /
   4 Completo? Gerar HTML visual junto?"* If auto-offering and the user declines or ignores, drop it
   and **don't ask again this session**.
3. **Prepare the folder.** Ensure `explanations/` exists and is gitignored:
   ```bash
   mkdir -p explanations
   grep -qxF 'explanations/' .gitignore 2>/dev/null || echo 'explanations/' >> .gitignore
   ```
4. **Gather facts — do not fabricate.** Read the actual diff/files, recover the *why* from the spec or
   the user's intent, and trace the *how* through the code. For any internal you're unsure about
   (how the compiler/runtime/library behaves), verify before writing: codebase → project docs →
   context7 MCP → web → otherwise flag it explicitly as uncertain. Inventing internals is worse than
   admitting a gap.
5. **Write the explanation.** Read `references/explanation-template.md` and write
   `explanations/NNN-slug.md` (NNN = next zero-padded sequence in the folder, slug = kebab topic).
   Follow the content contract and the chosen level. **Write in the language of the conversation.**
6. **Optional HTML.** If requested, read `references/html-template.md` and render a self-contained
   `explanations/NNN-slug.html` (diagrams rendered, collapsible sections, clean styling).
7. **Report** the path(s) written and a one-line summary.

## What every explanation must contain (content contract)

Regardless of level, every file includes:

- **Title + date + scope** — which feature/files this covers.
- **TL;DR** — 2–3 sentences a beginner can follow.
- **Central analogy** — a real-world comparison the reader already understands.
- **What changed & why** — the intent, not just the code.
- **How it works** — prose plus **at least one Mermaid diagram** (flow, sequence, or graph).
- **Glossary** — define every non-obvious term in plain language.
- **References** — links to official docs, specs, or sources backing the explanation.
- **How to verify** — how the reader can see it working themselves.
- **Further reading** — where to go deeper.

**Tone:** explain to a smart beginner. Define jargon the moment it appears. Lean on analogies. Cite
references. Never say "it just works" — say *how*.

## Common mistakes

| Mistake | Fix |
|---------|-----|
| Auto-explaining a trivial tweak | Apply the heuristic; trivial = stay silent unless asked |
| Asking about explanation every turn | Offer once per session on auto-trigger; respect a "no" |
| Fabricating how an internal works | Verify (codebase → docs → context7 → web) or flag as uncertain |
| Wall of text, no diagram | Every file needs ≥1 Mermaid diagram and a central analogy |
| Jargon without definition | Define every term inline; that's the whole point |
| Committing explanations/ to git | It's gitignored personal study material, not repo docs |

## Why this matters

The user wants to *actually understand* their codebase — not just receive working code. A persisted,
beginner-first explanation with analogies and references turns each change into something they can
revisit and learn from, at whatever depth they have energy for that day.
