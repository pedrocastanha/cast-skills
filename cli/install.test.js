// cli/install.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { installSkill } from './install.js';
import { toolById } from './tools.js';

function tmp() { return fs.mkdtempSync(path.join(os.tmpdir(), 'cast-')); }

function makeSrcSkill(root) {
  const dir = path.join(root, 'using-project-skills');
  fs.mkdirSync(path.join(dir, 'references'), { recursive: true });
  fs.writeFileSync(path.join(dir, 'SKILL.md'),
    '---\nname: using-project-skills\ndescription: Test desc.\n---\n\n# Body\n');
  fs.writeFileSync(path.join(dir, 'references', 'extra.md'), '# Extra\n');
  return dir;
}

test('native install copies the whole skill tree', () => {
  const src = makeSrcSkill(tmp());
  const dest = tmp();
  const out = installSkill(src, dest, toolById('claude'));
  assert.ok(fs.existsSync(path.join(out, 'SKILL.md')));
  assert.ok(fs.existsSync(path.join(out, 'references', 'extra.md')));
});

test('cursor adapter writes a single .mdc file', () => {
  const src = makeSrcSkill(tmp());
  const dest = tmp();
  const out = installSkill(src, dest, toolById('cursor'));
  assert.ok(out.endsWith('using-project-skills.mdc'));
  assert.match(fs.readFileSync(out, 'utf8'), /alwaysApply: false/);
});

test('windsurf adapter writes a single rule .md file', () => {
  const src = makeSrcSkill(tmp());
  const dest = tmp();
  const out = installSkill(src, dest, toolById('windsurf'));
  assert.ok(out.endsWith('using-project-skills.md'));
  assert.match(fs.readFileSync(out, 'utf8'), /# using-project-skills/);
});
