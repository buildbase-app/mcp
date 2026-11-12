#!/usr/bin/env node
// Drift and validity check for this repository.
// Node 20 or later, no dependencies. Prints one line per check and exits 1 on
// any failure. Run from anywhere: node scripts/check.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ENDPOINT = 'https://api.console.buildbase.app/mcp';
const HOST = 'api.console.buildbase.app';
const SERVER_CARD = `https://${HOST}/.well-known/mcp/server-card.json`;
const TITLE = 'BuildBase Console';
const NAME_RE = /^[a-zA-Z0-9.-]+\/[a-zA-Z0-9._-]+$/;
const MAX_BYTES = 1024 * 1024;
const TIMEOUT_MS = 10_000;
const USER_AGENT = 'buildbase-mcp-repo-check (+https://github.com/buildbase-app/mcp)';

// Plugin manifests and where each keeps its version.
const MANIFESTS = [
  '.claude-plugin/plugin.json',
  '.claude-plugin/marketplace.json',
  '.codex-plugin/plugin.json',
  '.cursor-plugin/plugin.json',
  'gemini-extension.json',
];
// Files that must name the endpoint.
const MUST_NAME_ENDPOINT = ['server.json', '.mcp.json', 'mcp.json', 'README.md', 'llms-install.md'];

// Built from parts so this file does not match its own list.
const FORBIDDEN = [
  ['saas', 'os'].join('-'),
  ['localhost', ':'].join(''),
  ['.', 'env'].join(''),
  ['sk', 'live'].join('_'),
  ['BEGIN', 'PRIVATE', 'KEY'].join(' '),
];
// The ignore list is the one place that is meant to name env files.
const FORBIDDEN_EXEMPT = { '.gitignore': [['.', 'env'].join('')] };

let failures = 0;
const pass = (label, detail = '') => console.log(`PASS  ${label}${detail ? ` - ${detail}` : ''}`);
const fail = (label, detail) => {
  failures += 1;
  console.log(`FAIL  ${label} - ${detail}`);
};
const warn = (label, detail) => console.log(`WARN  ${label} - ${detail}`);

// ---------------------------------------------------------------- files

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else out.push(relative(ROOT, full).split('\\').join('/'));
  }
  return out.sort();
}

const files = walk(ROOT);
const read = (rel) => readFileSync(join(ROOT, rel), 'utf8');
const isBinary = (rel) => readFileSync(join(ROOT, rel)).subarray(0, 8000).includes(0);
const textFiles = files.filter((f) => !isBinary(f));
const markdownFiles = files.filter((f) => extname(f) === '.md');
const clientGuides = files.filter((f) => f.startsWith('docs/clients/') && f.endsWith('.md'));

// ---------------------------------------------------------------- 1. JSON parses

const json = {};
{
  const bad = [];
  for (const f of files.filter((f) => extname(f) === '.json')) {
    try {
      json[f] = JSON.parse(read(f));
    } catch (err) {
      bad.push(`${f}: ${err.message}`);
    }
  }
  if (bad.length) fail('1. JSON files parse', bad.join('; '));
  else pass('1. JSON files parse', `${Object.keys(json).length} files`);
}

// ---------------------------------------------------------------- 2. server.json

const server = json['server.json'];
const changelogVersion = (() => {
  const m = existsSync(join(ROOT, 'CHANGELOG.md'))
    ? read('CHANGELOG.md').match(/^## \[(\d+\.\d+\.\d+[^\]]*)\]/m)
    : null;
  return m ? m[1] : null;
})();
{
  const problems = [];
  if (!server) problems.push('server.json is missing or does not parse');
  else {
    if (!NAME_RE.test(server.name ?? '')) problems.push(`name "${server.name}" does not match ${NAME_RE}`);
    const len = (server.description ?? '').length;
    if (len === 0 || len > 100) problems.push(`description is ${len} characters (must be 1 to 100)`);
    if (!changelogVersion) problems.push('no "## [x.y.z]" heading in CHANGELOG.md');
    else if (server.version !== changelogVersion)
      problems.push(`version ${server.version} does not equal CHANGELOG.md ${changelogVersion}`);
    const url = server.remotes?.[0]?.url;
    if (url !== ENDPOINT) problems.push(`remotes[0].url is "${url}", expected ${ENDPOINT}`);
  }
  if (problems.length) fail('2. server.json', problems.join('; '));
  else pass('2. server.json', `${server.name} ${server.version}`);
}

// ---------------------------------------------------------------- 3. endpoint is identical everywhere

// Any URL on our API host that is not a well-known metadata URL must be the
// endpoint exactly. Install links carry it encoded, so decode them too.
// Decodes repeatedly: a link wrapped in a redirect link is encoded twice.
function percentDecode(text) {
  let out = text;
  for (let i = 0; i < 4; i += 1) {
    const next = out.replace(/(%[0-9A-Fa-f]{2})+/g, (m) => {
      try {
        return decodeURIComponent(m);
      } catch {
        return m;
      }
    });
    if (next === out) break;
    out = next;
  }
  return out;
}

function endpointVariants(text) {
  const found = [];
  const re = new RegExp(`[a-z]*:?/*${HOST.replace(/\./g, '\\.')}[^\\s"'\`)<>\\]&]*`, 'gi');
  for (const m of percentDecode(text).matchAll(re)) {
    const url = m[0].replace(/[.,;:]+$/, '');
    if (url.includes('/.well-known/') || url.includes('/org/')) continue;
    if (url !== ENDPOINT) found.push(url);
  }
  return found;
}

// Cursor install links carry the server config as base64 JSON in `config=`.
// URL-encoded links (Claude, VS Code) are covered by endpointVariants.
function decodedInstallLinkUrls(text) {
  const urls = [];
  for (const m of text.matchAll(/[?&]config=([A-Za-z0-9+/=%_-]+)/g)) {
    const raw = decodeURIComponent(m[1]);
    if (raw.startsWith('{')) continue;
    try {
      const decoded = JSON.parse(Buffer.from(raw, 'base64').toString('utf8'));
      urls.push(decoded?.url ?? '(no url in config)');
    } catch {
      urls.push(`(undecodable config: ${raw.slice(0, 40)}...)`);
    }
  }
  return urls;
}

{
  const problems = [];
  const mustName = [...MUST_NAME_ENDPOINT, ...clientGuides];
  for (const f of mustName) {
    if (!files.includes(f)) problems.push(`${f} is missing`);
    else if (!read(f).includes(ENDPOINT)) problems.push(`${f} does not contain ${ENDPOINT}`);
  }
  for (const f of textFiles) {
    if (f === 'scripts/check.mjs') continue;
    const text = read(f);
    for (const v of endpointVariants(text)) problems.push(`${f} has "${v}"`);
    for (const u of decodedInstallLinkUrls(text))
      if (u !== ENDPOINT) problems.push(`${f} has an install link for "${u}"`);
  }
  // Manifests that point at a server file instead of naming the URL inline.
  for (const f of MANIFESTS) {
    const m = json[f];
    if (!m) continue;
    const ref = typeof m.mcpServers === 'string' ? m.mcpServers : null;
    if (ref) {
      // Relative to the plugin root, which is the repo root.
      const target = ref.replace(/^\.\//, '');
      if (!files.includes(target)) problems.push(`${f} points at ${ref}, which does not exist`);
      else if (!read(target).includes(ENDPOINT)) problems.push(`${f} points at ${ref}, which lacks the endpoint`);
    }
  }
  if (problems.length) fail('3. Endpoint is identical everywhere', problems.join('; '));
  else pass('3. Endpoint is identical everywhere', `${mustName.length} files name it`);
}

// ---------------------------------------------------------------- 3b. logo paths exist

// Manifests name the logo by a path in this repo, and server.json by its raw
// GitHub URL. Either way the file must be here.
{
  const RAW = 'https://raw.githubusercontent.com/buildbase-app/mcp/main/';
  const problems = [];
  const refs = [];
  for (const f of MANIFESTS) {
    const m = json[f];
    if (!m) continue;
    for (const key of ['icon', 'logo', 'composerIcon']) {
      const v = m[key] ?? m.interface?.[key];
      // Plugin paths are relative to the plugin root, which is the repo root.
      if (typeof v === 'string' && !/^https?:/.test(v)) refs.push([f, v]);
    }
  }
  for (const icon of server?.icons ?? []) {
    if (!icon.src?.startsWith(RAW)) problems.push(`server.json icon ${icon.src} is not a raw URL of this repo`);
    else refs.push(['server.json', icon.src.slice(RAW.length)]);
  }
  for (const [f, path] of refs) {
    const clean = path.replace(/^\.\//, '');
    if (!files.includes(clean)) problems.push(`${f} names ${clean}, which does not exist`);
  }
  if (problems.length) fail('3b. Logo files exist', problems.join('; '));
  else pass('3b. Logo files exist', `${refs.length} references`);
}

// ---------------------------------------------------------------- 4. manifest versions

{
  const problems = [];
  const want = server?.version;
  for (const f of MANIFESTS) {
    const m = json[f];
    if (!m) {
      problems.push(`${f} is missing or does not parse`);
      continue;
    }
    const versions = [];
    if (m.version !== undefined) versions.push(['version', m.version]);
    if (m.metadata?.version !== undefined) versions.push(['metadata.version', m.metadata.version]);
    for (const [i, p] of (m.plugins ?? []).entries())
      if (p.version !== undefined) versions.push([`plugins[${i}].version`, p.version]);
    if (!versions.length) problems.push(`${f} has no version`);
    for (const [where, v] of versions) if (v !== want) problems.push(`${f} ${where} is ${v}, expected ${want}`);
  }
  if (problems.length) fail('4. Manifest versions equal server.json', problems.join('; '));
  else pass('4. Manifest versions equal server.json', want);
}

// ---------------------------------------------------------------- network helpers

async function request(url, method, extra = {}) {
  return fetch(url, {
    method,
    redirect: 'follow',
    signal: AbortSignal.timeout(TIMEOUT_MS),
    headers: { 'user-agent': USER_AGENT, ...(extra.headers ?? {}) },
    body: extra.body,
  });
}

async function withRetry(fn) {
  try {
    return await fn();
  } catch {
    await new Promise((r) => setTimeout(r, 1000));
    return fn();
  }
}

// ---------------------------------------------------------------- 5. live Server Card

function readmeLongDescription() {
  if (!files.includes('README.md')) return null;
  const lines = read('README.md').split('\n');
  const start = lines.findIndex((l) => l.startsWith('# '));
  if (start < 0) return null;
  const para = [];
  for (const l of lines.slice(start + 1)) {
    if (!l.trim()) {
      if (para.length) break;
      continue;
    }
    if (/^(#|!\[|\[!\[|<)/.test(l)) {
      if (para.length) break;
      continue;
    }
    para.push(l.trim());
  }
  return para.join(' ') || null;
}

try {
  const res = await withRetry(() => request(SERVER_CARD, 'GET'));
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const card = await res.json();
  const problems = [];
  if (card.title !== TITLE) problems.push(`title is "${card.title}", expected "${TITLE}"`);
  const cardEndpoint = card.endpoint ?? card.transport?.endpoint ?? card.remotes?.[0]?.url;
  if (cardEndpoint !== ENDPOINT) problems.push(`endpoint is "${cardEndpoint}", expected ${ENDPOINT}`);
  const readmeDesc = readmeLongDescription();
  if (card.description !== readmeDesc)
    problems.push(
      'the card description differs from the first paragraph of README.md. ' +
        'If the server changed on purpose, update README.md, the store texts and MAINTENANCE.md; ' +
        'if not, the server card needs fixing. ' +
        `Card: "${card.description}" README: "${readmeDesc}"`,
    );
  if (problems.length) fail('5. Live Server Card', problems.join('; '));
  else pass('5. Live Server Card', `${card.name} ${card.version}`);
} catch (err) {
  fail('5. Live Server Card', `${SERVER_CARD} not reachable: ${err.message}`);
}

// ---------------------------------------------------------------- 6. sign-in required

try {
  const res = await withRetry(() =>
    request(ENDPOINT, 'POST', {
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/list' }),
    }),
  );
  if (res.status === 401) pass('6. Unauthenticated POST returns 401');
  else fail('6. Unauthenticated POST returns 401', `got HTTP ${res.status}`);
} catch (err) {
  fail('6. Unauthenticated POST returns 401', err.message);
}

// ---------------------------------------------------------------- 7. links in Markdown

function markdownLinks(text) {
  // Code is commands and config, not links: skip fenced blocks and inline code.
  const prose = text.replace(/```[\s\S]*?```/g, '').replace(/`[^`\n]*`/g, '');
  const urls = new Set();
  for (const m of prose.matchAll(/https:\/\/[^\s)<>"'\]`]+/g)) {
    const url = m[0].replace(/[.,;:!?*_]+$/, '');
    if (/\/\/(localhost|127\.0\.0\.1)([:/]|$)/.test(url)) continue;
    if (url === ENDPOINT) continue; // checked by 6
    urls.add(url);
  }
  return urls;
}

async function linkStatus(url) {
  const once = async () => {
    // Install links redirect to an app (vscode:, cursor:), which fetch cannot
    // follow. A redirect to a non-web scheme counts as working.
    const first = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': USER_AGENT },
    });
    const location = first.headers.get('location');
    if (first.status >= 300 && first.status < 400 && location) {
      const protocol = new URL(location, url).protocol;
      if (protocol !== 'https:' && protocol !== 'http:') return first.status;
    }
    let res = await request(url, 'HEAD');
    if (res.status >= 400) res = await request(url, 'GET');
    return res.status;
  };
  try {
    const status = await withRetry(once);
    if (status < 400) return null;
    return `HTTP ${status}`;
  } catch (err) {
    return err.name === 'TimeoutError' ? 'timed out' : err.message;
  }
}

{
  const where = new Map();
  for (const f of markdownFiles)
    for (const u of markdownLinks(read(f))) where.set(u, [...(where.get(u) ?? []), f]);
  const urls = [...where.keys()];
  const broken = [];
  const queue = [...urls];
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (queue.length) {
        const url = queue.shift();
        const problem = await linkStatus(url);
        if (problem) broken.push(`${url} (${problem}, in ${where.get(url).join(', ')})`);
      }
    }),
  );
  if (broken.length) fail('7. Markdown links resolve', broken.sort().join('; '));
  else pass('7. Markdown links resolve', `${urls.length} links`);
}

// ---------------------------------------------------------------- 8. no long dashes

{
  const hits = [];
  for (const f of textFiles) {
    read(f)
      .split('\n')
      .forEach((line, i) => {
        if (/[\u2013\u2014]/.test(line)) hits.push(`${f}:${i + 1}`);
      });
  }
  if (hits.length) fail('8. No em or en dashes', hits.join(', '));
  else pass('8. No em or en dashes', `${textFiles.length} text files`);
}

// ---------------------------------------------------------------- 9. file sizes

{
  const big = files.filter((f) => !f.startsWith('assets/') && statSync(join(ROOT, f)).size > MAX_BYTES);
  if (big.length) fail('9. No file over 1 MB outside assets/', big.join(', '));
  else pass('9. No file over 1 MB outside assets/');
}

// ---------------------------------------------------------------- 10. forbidden strings

{
  const hits = [];
  for (const f of textFiles) {
    const text = read(f);
    for (const s of FORBIDDEN) {
      if ((FORBIDDEN_EXEMPT[f] ?? []).includes(s)) continue;
      if (text.includes(s)) hits.push(`${f} contains "${s}"`);
    }
  }
  if (hits.length) fail('10. No forbidden strings', hits.join('; '));
  else pass('10. No forbidden strings');
}

// ---------------------------------------------------------------- optional SDK listing check

// Warning only. `buildbase agent listing` exits 1 while it has TODOs, so read
// its output whatever the exit code. Known today: the live card's name is not
// reverse-DNS and its description is over 100 characters (server-side fixes).
if (process.argv.includes('--sdk')) {
  const { spawnSync } = await import('node:child_process');
  const args = ['-y', '-p', '@buildbase/sdk@latest', 'buildbase', 'agent', 'listing', '--url', ENDPOINT, '--json'];
  const run = spawnSync('npx', args, { encoding: 'utf8', timeout: 180_000, shell: process.platform === 'win32' });
  try {
    const todos = JSON.parse(run.stdout).todos ?? [];
    if (todos.length) for (const t of todos) warn('SDK listing TODO', t);
    else console.log('INFO  SDK listing - no TODOs');
  } catch {
    const why = run.error?.message ?? (run.stderr || run.stdout || `exit ${run.status}`).trim().split('\n')[0];
    warn('SDK listing', `could not run: ${why}`);
  }
}

console.log(failures ? `\n${failures} check(s) failed.` : '\nAll checks passed.');
process.exit(failures ? 1 : 0);
