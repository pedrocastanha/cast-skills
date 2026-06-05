// cli/convert.js
export function parseSkill(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { frontmatter: '', body: md.trim() };
  return { frontmatter: m[1], body: m[2].trim() };
}

export function getDescription(md) {
  const { frontmatter } = parseSkill(md);
  const m = frontmatter.match(/description:\s*([^\n]*(?:\n\s+[^\n]*)*)/);
  if (!m) return '';
  return m[1].replace(/\s*\n\s+/g, ' ').trim();
}

export function toCursorMdc(name, md) {
  const { body } = parseSkill(md);
  const desc = getDescription(md);
  return `---\ndescription: ${desc}\nglobs:\nalwaysApply: false\n---\n\n${body}\n`;
}

export function toWindsurfRule(name, md) {
  const { body } = parseSkill(md);
  return `# ${name}\n\n${body}\n`;
}
