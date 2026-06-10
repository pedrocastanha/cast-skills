# Explanation Template

Skeleton for `explanations/NNN-slug.md`. Fill every section. Write in the conversation's language.
Keep the beginner-first tone: define jargon inline, lean on the central analogy, cite real references.

The **common sections** below appear in every level. Then add the per-level depth block(s).
For **Level 4 (Completo)**, include the Level 1, 2, and 3 depth blocks in order, so the document
climbs from ELI5 to the metal.

---

## Common sections (always)

```markdown
# {Title — what this change is, in plain words}

> **Scope:** {feature / files touched}
> **Date:** {YYYY-MM-DD}
> **Depth:** {1 Leigo | 2 Dev | 3 Metal | 4 Completo}

## TL;DR
{2–3 sentences a total beginner can follow. No jargon.}

## The analogy
{One real-world comparison the reader already understands. Carry it through the whole doc.}

## What changed and why
{The intent first — the problem we were solving — then what we actually did. Link the two.}

## How it works
{Prose explanation, building from the analogy. Include AT LEAST one Mermaid diagram.}

​```mermaid
flowchart TD
    A([Input]) --> B[Step]
    B --> C([Result])
​```

## Glossary
- **{Term}** — {plain-language definition}.

## How to verify it yourself
{Concrete steps: run this, click that, watch this happen.}

## References
- {Official doc / spec / source — with URL}

## Further reading
- {Where to go deeper}
```

---

## Level 1 — Leigo / ELI5 (depth block)

Goal: someone with zero programming background gets the *what* and *why*.

- Lead with the analogy; keep it concrete and physical.
- One simple diagram (boxes and arrows), no technical labels.
- Absolutely no unexplained jargon. If a term is unavoidable, define it in one breath.
- End with "why this is good for you" in one sentence.

---

## Level 2 — Dev (depth block)

Goal: a teammate could maintain or extend this.

```markdown
## Data flow
{How data/control moves through the pieces. Use a sequence or flow diagram.}

​```mermaid
sequenceDiagram
    participant U as Caller
    participant S as Service
    U->>S: request
    S-->>U: response
​```

## Key decisions and trade-offs
| Decision | Why | Alternative considered | Why not |
|----------|-----|------------------------|---------|

## Code walkthrough
{Short, real snippets from the change. Comment WHY, not just what.}

## Edge cases & failure modes
{What happens when inputs are bad, services are down, etc.}
```

---

## Level 3 — Metal / under-the-hood (depth block)

Goal: explain what happens *beneath* the code the user wrote. Verify each claim (codebase → docs →
context7 → web) or flag it as uncertain — never invent internals.

```markdown
## From source to running code
{Compilation / transpilation / bundling / interpretation — the path this code takes to execute.
 Name the actual toolchain (tsc, babel, V8, JIT, bytecode, etc.).}

## Runtime & memory
{What lives on the stack vs heap, allocations, garbage collection, references, lifetimes —
 whatever applies to this language/runtime.}

## Data structures & complexity
{The structures in play and their time/space complexity. Big-O where relevant.}

## I/O, concurrency & the event loop
{Syscalls, async scheduling, threads, blocking vs non-blocking — as applicable.}

## What the framework/library does for you
{The work hidden behind the abstraction you called.}
```

---

## Diagram guidance

- Prefer Mermaid (`flowchart`, `sequenceDiagram`, `graph`, `stateDiagram-v2`).
- Quote any label containing special characters: `A["Build (tsc)"]`.
- One diagram per major idea — don't cram everything into one.
- If the `mermaid-studio` skill is installed, delegate rendering to it for richer output.
