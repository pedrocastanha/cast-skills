# HTML Template

For the optional visual walkthrough: a **single self-contained `explanations/NNN-slug.html`** file.
No build step, no local dependencies — it opens straight in a browser.

## Rules

- One file. Styles inline in `<style>`. Scripts via CDN only.
- Mermaid diagrams render live (Mermaid via CDN). Reuse the same diagrams as the `.md`.
- Depth sections are **collapsible** (`<details>`), so the reader expands only the level they want.
- Clean, readable typography. Generous spacing. Works in light environments.
- Write content in the conversation's language. Keep the beginner-first tone and the central analogy.

## Skeleton

```html
<!DOCTYPE html>
<html lang="{pt-BR|en}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{Title}</title>
  <script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ startOnLoad: true, theme: 'default' });
  </script>
  <style>
    :root { --ink:#1a1a2e; --muted:#5c5c7a; --accent:#7c3aed; --bg:#fafaff; --card:#fff; --line:#e7e7f0; }
    * { box-sizing: border-box; }
    body { margin:0; background:var(--bg); color:var(--ink);
           font:16px/1.7 system-ui,-apple-system,Segoe UI,Roboto,sans-serif; }
    main { max-width:760px; margin:0 auto; padding:48px 24px 96px; }
    h1 { font-size:2rem; line-height:1.2; margin:0 0 8px; }
    .meta { color:var(--muted); font-size:.9rem; margin-bottom:32px; }
    h2 { margin-top:40px; border-bottom:1px solid var(--line); padding-bottom:6px; }
    .analogy { background:var(--card); border-left:4px solid var(--accent);
               padding:16px 20px; border-radius:8px; margin:24px 0; }
    code { background:#f0f0f7; padding:2px 6px; border-radius:4px; font-size:.9em; }
    pre { background:var(--ink); color:#eee; padding:16px; border-radius:10px; overflow:auto; }
    pre code { background:none; color:inherit; }
    details { background:var(--card); border:1px solid var(--line); border-radius:10px;
              padding:8px 20px; margin:16px 0; }
    summary { cursor:pointer; font-weight:600; padding:8px 0; }
    table { border-collapse:collapse; width:100%; margin:16px 0; }
    th,td { border:1px solid var(--line); padding:8px 10px; text-align:left; }
    .mermaid { background:var(--card); border:1px solid var(--line);
               border-radius:10px; padding:16px; margin:24px 0; text-align:center; }
    a { color:var(--accent); }
  </style>
</head>
<body>
  <main>
    <h1>{Title}</h1>
    <div class="meta">{Scope} · {Date} · Depth {1–4}</div>

    <p><strong>TL;DR —</strong> {2–3 plain sentences}</p>

    <div class="analogy">🧠 <strong>The analogy:</strong> {central analogy}</div>

    <h2>What changed and why</h2>
    <p>{intent → what we did}</p>

    <h2>How it works</h2>
    <div class="mermaid">
flowchart TD
    A([Input]) --> B[Step]
    B --> C([Result])
    </div>
    <p>{walkthrough}</p>

    <!-- One <details> per depth level included -->
    <details open>
      <summary>Level 2 — Dev</summary>
      {data flow, decisions table, snippets}
    </details>
    <details>
      <summary>Level 3 — Under the hood</summary>
      {compilation, runtime, memory, complexity}
    </details>

    <h2>Glossary</h2>
    <ul><li><strong>{Term}</strong> — {definition}</li></ul>

    <h2>How to verify it yourself</h2>
    <ol><li>{step}</li></ol>

    <h2>References</h2>
    <ul><li><a href="{url}">{source}</a></li></ul>
  </main>
</body>
</html>
```

Include only the `<details>` depth blocks matching the chosen level (Level 4 = all of them).
Optional: add Prism via CDN for syntax-highlighted code if the snippets are substantial.
