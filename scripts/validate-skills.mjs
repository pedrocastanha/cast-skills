// scripts/validate-skills.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.join(process.cwd(), 'skills');
let errors = 0;

function walkSkillMds(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walkSkillMds(full));
    else if (e.name === 'SKILL.md') out.push(full);
  }
  return out;
}

for (const file of walkSkillMds(ROOT)) {
  const md = fs.readFileSync(file, 'utf8');
  const rel = path.relative(process.cwd(), file);
  const fm = md.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) { console.error(`✗ ${rel}: missing YAML frontmatter`); errors++; continue; }
  if (!/\nname:\s*\S/.test('\n' + fm[1])) { console.error(`✗ ${rel}: missing name`); errors++; }
  if (!/\ndescription:\s*\S/.test('\n' + fm[1])) { console.error(`✗ ${rel}: missing description`); errors++; }
  const lines = md.split('\n').length;
  if (lines > 500) { console.error(`✗ ${rel}: ${lines} lines (>500)`); errors++; }
}

if (errors) { console.error(`\n${errors} problem(s).`); process.exit(1); }
console.log('All SKILL.md files valid.');
