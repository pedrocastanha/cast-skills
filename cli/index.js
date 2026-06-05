#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { TOOLS, resolveDir, detectInstalled } from './tools.js';
import { installSkill } from './install.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SKILLS_ROOT = path.join(HERE, '..', 'skills');
const SKILL_NAMES = ['creating-project-skills', 'using-project-skills'];

async function main() {
  console.clear();
  p.intro(pc.bgCyan(pc.black(' cast-skills ')));
  p.note(
    'Installs two cross-tool skills:\n' +
    `  ${pc.cyan('creating-project-skills')}  bootstrap a project skill tree\n` +
    `  ${pc.cyan('using-project-skills')}     always-on router into them`,
    'What you get'
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
      for (const name of SKILL_NAMES) {
        installSkill(path.join(SKILLS_ROOT, name), dest, tool);
      }
      results.push({ tool: tool.label, status: pc.green('ok'), detail: dest });
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
