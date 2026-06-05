// cli/install.js
import fs from 'node:fs';
import path from 'node:path';
import { toCursorMdc, toWindsurfRule } from './convert.js';

export function installSkill(srcSkillDir, destSkillsDir, tool) {
  const name = path.basename(srcSkillDir);
  fs.mkdirSync(destSkillsDir, { recursive: true });

  if (tool.tier === 'native') {
    const out = path.join(destSkillsDir, name);
    fs.cpSync(srcSkillDir, out, { recursive: true });
    return out;
  }

  const md = fs.readFileSync(path.join(srcSkillDir, 'SKILL.md'), 'utf8');
  if (tool.id === 'cursor') {
    const out = path.join(destSkillsDir, `${name}.mdc`);
    fs.writeFileSync(out, toCursorMdc(name, md));
    return out;
  }
  if (tool.id === 'windsurf') {
    const out = path.join(destSkillsDir, `${name}.md`);
    fs.writeFileSync(out, toWindsurfRule(name, md));
    return out;
  }
  throw new Error(`No installer for tool ${tool.id}`);
}
