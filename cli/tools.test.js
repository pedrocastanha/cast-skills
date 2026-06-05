// cli/tools.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { TOOLS, resolveDir, toolById } from './tools.js';

test('registry has the six supported tools', () => {
  assert.deepEqual(TOOLS.map(t => t.id).sort(),
    ['claude', 'codex', 'copilot', 'cursor', 'gemini', 'windsurf']);
});

test('user-level claude resolves to ~/.claude/skills', () => {
  const dir = resolveDir(toolById('claude'), 'user', { home: '/home/u', cwd: '/proj' });
  assert.equal(dir, path.join('/home/u', '.claude/skills'));
});

test('cursor has no user-level dir (project-only)', () => {
  assert.equal(resolveDir(toolById('cursor'), 'user', { home: '/home/u', cwd: '/proj' }), null);
});

test('project-level copilot resolves to cwd/.github/skills', () => {
  const dir = resolveDir(toolById('copilot'), 'project', { home: '/home/u', cwd: '/proj' });
  assert.equal(dir, path.join('/proj', '.github/skills'));
});

test('windsurf project dir is a rules dir', () => {
  const dir = resolveDir(toolById('windsurf'), 'project', { home: '/home/u', cwd: '/proj' });
  assert.equal(dir, path.join('/proj', '.windsurf/rules'));
});
