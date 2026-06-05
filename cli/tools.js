// cli/tools.js
import os from 'node:os';
import path from 'node:path';

export const TOOLS = [
  { id: 'claude',   label: 'Claude Code',       tier: 'native',  userDir: '.claude/skills',  projectDir: '.claude/skills' },
  { id: 'copilot',  label: 'GitHub Copilot',    tier: 'native',  userDir: '.copilot/skills', projectDir: '.github/skills' },
  { id: 'gemini',   label: 'Gemini CLI',        tier: 'native',  userDir: '.gemini/skills',  projectDir: '.gemini/skills' },
  { id: 'codex',    label: 'Codex / universal', tier: 'native',  userDir: '.agents/skills',  projectDir: '.agents/skills' },
  { id: 'cursor',   label: 'Cursor',            tier: 'adapter', userDir: null,               projectDir: '.cursor/skills' },
  { id: 'windsurf', label: 'Windsurf',          tier: 'adapter', userDir: null,               projectDir: '.windsurf/rules' },
];

export function toolById(id) {
  const t = TOOLS.find(x => x.id === id);
  if (!t) throw new Error(`Unknown tool: ${id}`);
  return t;
}

export function resolveDir(tool, scope, { home = os.homedir(), cwd = process.cwd() } = {}) {
  if (scope === 'user') {
    if (!tool.userDir) return null;
    return path.join(home, tool.userDir);
  }
  return path.join(cwd, tool.projectDir);
}

// Detect which tools already have a config dir on disk (for the "all detected" shortcut).
export function detectInstalled(tools = TOOLS, { home = os.homedir() } = {}) {
  return tools.filter(t => t.userDir && existsSyncSafe(path.join(home, t.userDir.split('/')[0])));
}

import fs from 'node:fs';
function existsSyncSafe(p) { try { return fs.existsSync(p); } catch { return false; } }
