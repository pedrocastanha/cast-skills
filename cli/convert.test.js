// cli/convert.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseSkill, getDescription, toCursorMdc, toWindsurfRule } from './convert.js';

const SAMPLE = `---
name: using-project-skills
description: Use when starting a feature, fix, or refactor. Routes into project skills.
---

# Using Project Skills

Body line one.
`;

test('parseSkill splits frontmatter and body', () => {
  const { frontmatter, body } = parseSkill(SAMPLE);
  assert.match(frontmatter, /name: using-project-skills/);
  assert.match(body, /# Using Project Skills/);
  assert.doesNotMatch(body, /^---/);
});

test('getDescription extracts the description value', () => {
  assert.equal(getDescription(SAMPLE),
    'Use when starting a feature, fix, or refactor. Routes into project skills.');
});

test('toCursorMdc emits .mdc frontmatter with alwaysApply', () => {
  const out = toCursorMdc('using-project-skills', SAMPLE);
  assert.match(out, /alwaysApply: false/);
  assert.match(out, /description: Use when starting/);
  assert.match(out, /# Using Project Skills/);
});

test('toWindsurfRule prefixes a heading and keeps the body', () => {
  const out = toWindsurfRule('using-project-skills', SAMPLE);
  assert.match(out, /^# using-project-skills/);
  assert.match(out, /Body line one\./);
});
