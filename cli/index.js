#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { TOOLS, resolveDir, detectInstalled } from './tools.js';
import { installSkill } from './install.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_ROOT = path.join(HERE, '..', 'skills');

const LINKED_PAIR = ['creating-project-skills', 'using-project-skills'];

const SKILL_HINTS = {
  'creating-project-skills': 'bootstrap a project skill tree',
  'using-project-skills': 'always-on router into project skills',
  'explaining-changes': 'deep beginner-friendly explanations of changes',
};

function discoverSkills() {
  return fs.readdirSync(SKILLS_ROOT, { withFileTypes: true })
    .filter(d => d.isDirectory() && fs.existsSync(path.join(SKILLS_ROOT, d.name, 'SKILL.md')))
    .map(d => d.name);
}

async function main() {
  console.clear();
  p.intro(pc.bgCyan(pc.black(' cast-skills ')));

  const available = discoverSkills();

  const skillChoices = await p.multiselect({
    message: 'Which skills to install?',
    options: available.map(name => {
      const isLinked = LINKED_PAIR.includes(name);
      const hint = SKILL_HINTS[name] || '';
      return {
        value: name,
        label: name + (isLinked ? pc.green('  ★ recommended pair') : ''),
        hint,
      };
    }),
    initialValues: available,
    required: true,
  });
  if (p.isCancel(skillChoices)) return p.cancel('Cancelled.');

  const hasLinkedPair = LINKED_PAIR.every(n => skillChoices.includes(n));
  if (!hasLinkedPair && LINKED_PAIR.some(n => skillChoices.includes(n))) {
    const missing = LINKED_PAIR.find(n => !skillChoices.includes(n));
    p.log.warn(
      `${pc.yellow(missing)} works best paired with the other. Consider installing both.`
    );
  }

  p.note(
    skillChoices.map(n => `  ${pc.cyan(n)}`).join('\n'),
    `Installing ${skillChoices.length} skill${skillChoices.length > 1 ? 's' : ''}`
  );

  const detected = detectInstalled().map(t => t.id);
  const tools = await p.multiselect({
    message: 'Which AI tools should I install into?',
    options: TOOLS.map(t => ({
      value: t.id,
      label: t.label + (detected.includes(t.id) ? pc.dim('  (detected)') : ''),
      hint: t.tier === 'adapter' ? 'project-level, converted format' : undefined,
    })),
    initialValues: detected.length ? detected : ['claude'],
    required: true,
  });
  if (p.isCancel(tools)) return p.cancel('Cancelled.');

  const scope = await p.select({
    message: 'Install scope?',
    options: [
      { value: 'user', label: 'User-level (all projects)', hint: 'recommended' },
      { value: 'project', label: 'Project-level (this repo only)' },
    ],
    initialValue: 'user',
  });
  if (p.isCancel(scope)) return p.cancel('Cancelled.');

  const results = [];
  const s = p.spinner();
  for (const id of tools) {
    const tool = TOOLS.find(t => t.id === id);
    const dest = resolveDir(tool, scope);
    if (!dest) {
      results.push({ tool: tool.label, status: pc.yellow('skipped'), detail: 'no user-level path (project-only tool)' });
      continue;
    }
    s.start(`Installing into ${tool.label}`);
    try {
      for (const name of skillChoices) {
        installSkill(path.join(SKILLS_ROOT, name), dest, tool);
      }
      results.push({ tool: tool.label, status: pc.green('ok'), detail: `${skillChoices.length} skill${skillChoices.length > 1 ? 's' : ''} → ${dest}` });
    } catch (err) {
      results.push({ tool: tool.label, status: pc.red('failed'), detail: err.message });
    }
    s.stop(`${tool.label} done`);
  }

  p.note(results.map(r => `${r.status.padEnd(16)} ${r.tool}\n  ${pc.dim(r.detail)}`).join('\n'), 'Results');
  p.outro(
    'Next: open any project and start a feature.\n' +
    `${pc.dim('The agent will offer to run /skill-creator to set up project skills.')}`
  );
}

main().catch((e) => { console.error(e); process.exit(1); });
