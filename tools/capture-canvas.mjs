#!/usr/bin/env node
// capture-canvas.mjs: render Claude Design canvas boards locally and save full-height PNGs.
// Procedure and plan format: LOCAL.md → Capturing reference PNGs.
//
//   node capture-canvas.mjs --site <dir> --out <dir> --plan <plan.json>
//                           [--port 0] [--cdp-port 0] [--chrome /usr/bin/google-chrome] [--timezone <IANA>]
//
// Ports default to 0: the OS picks free ones, so parallel runs don't collide.
// <site> holds the canvas's project/ files (boards, shared CSS), support.js (the canvas's artifact-type/dc-runtime.js)
// and _blob/<id> for every /_blob/<id> the boards reference. Needs Node 22+ (global WebSocket, fetch).
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { parseArgs } from 'node:util';

const { values: opt } = parseArgs({
  options: {
    site: { type: 'string' }, out: { type: 'string' }, plan: { type: 'string' },
    port: { type: 'string', default: '0' }, 'cdp-port': { type: 'string', default: '0' },
    chrome: { type: 'string', default: '/usr/bin/google-chrome' }, timezone: { type: 'string' },
  },
});
const die = msg => { console.error(msg); process.exit(1); };
if (!opt.site || !opt.out || !opt.plan) die('usage: --site <dir> --out <dir> --plan <plan.json>');
const site = path.resolve(opt.site);
const outDir = path.resolve(opt.out);
const plan = JSON.parse(fs.readFileSync(opt.plan, 'utf8'));
fs.mkdirSync(outDir, { recursive: true });

// Preflight: the runtime and every referenced upload must be present, or boards render broken.
if (!fs.existsSync(path.join(site, 'support.js'))) die(`missing ${site}/support.js (the canvas's artifact-type/dc-runtime.js)`);
const boards = fs.readdirSync(site).filter(f => f.endsWith('.dc.html'));
const blobIds = new Set(boards.flatMap(f => [...fs.readFileSync(path.join(site, f), 'utf8').matchAll(/\/_blob\/([0-9a-zA-Z_-]+)/g)].map(m => m[1])));
const missing = [...blobIds].filter(id => !fs.existsSync(path.join(site, '_blob', id)));
if (missing.length) die(`missing uploads in ${site}/_blob/: ${missing.join(', ')}`);
for (const shot of plan) if (!fs.existsSync(path.join(site, shot.file))) die(`plan names ${shot.file}, not in ${site}`);

// Uploads are saved under their bare id, so their type comes from the first bytes.
const sniff = buf => {
  const hex = buf.subarray(0, 4).toString('hex');
  if (hex === '89504e47') return 'image/png';
  if (hex.startsWith('ffd8ff')) return 'image/jpeg';
  if (hex === '47494638') return 'image/gif';
  if (hex === '52494646') return 'image/webp';
  if (hex === '774f4632') return 'font/woff2';
  if (hex === '774f4646') return 'font/woff';
  const head = buf.subarray(0, 256).toString('utf8').trimStart();
  if (head.startsWith('<svg') || head.startsWith('<?xml')) return 'image/svg+xml';
  return 'application/octet-stream';
};
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json' };
const srv = http.createServer((req, res) => {
  const rel = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  const f = path.join(site, rel);
  if (!f.startsWith(site + path.sep) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  const buf = fs.readFileSync(f);
  res.writeHead(200, { 'content-type': rel.startsWith('/_blob/') ? sniff(buf) : (types[path.extname(f)] || 'application/octet-stream') });
  res.end(buf);
});
await new Promise(r => srv.listen(Number(opt.port), '127.0.0.1', r));
const port = srv.address().port;

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'capture-canvas-'));
const chrome = spawn(opt.chrome, ['--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${opt['cdp-port']}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
chrome.on('error', e => die(`cannot start Chrome at ${opt.chrome}: ${e.message}`));
const sleep = ms => new Promise(r => setTimeout(r, ms));
const cleanup = async () => { chrome.kill(); srv.close(); await sleep(500); fs.rmSync(profile, { recursive: true, force: true }); };

// With --cdp-port 0 Chrome picks the port and writes it to DevToolsActivePort in the profile.
let cdpPort = Number(opt['cdp-port']);
let targets = [];
for (let i = 0; i < 50 && !targets.some(t => t.type === 'page'); i++) {
  if (!cdpPort) { try { cdpPort = Number(fs.readFileSync(path.join(profile, 'DevToolsActivePort'), 'utf8').split('\n')[0]); } catch {} }
  if (cdpPort) { try { targets = await (await fetch(`http://127.0.0.1:${cdpPort}/json/list`)).json(); } catch {} }
  await sleep(200);
}
const page = targets.find(t => t.type === 'page');
if (!page) { await cleanup(); die('Chrome DevTools did not come up. In a sandboxed session, point TMPDIR at a directory Chrome may write to (observed: the scratchpad\'s parent).'); }
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise(r => { ws.onopen = r; });
let seq = 0;
const pending = new Map();
ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
const send = (method, params = {}) => new Promise(r => { const i = ++seq; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const evaluate = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;
const fullHeight = 'Math.ceil(Math.max(document.documentElement.scrollHeight, document.body.scrollHeight))';
await send('Page.enable');
await send('Runtime.enable');
if (opt.timezone) await send('Emulation.setTimezoneOverride', { timezoneId: opt.timezone });

let failures = 0;
for (const shot of plan) {
  await send('Emulation.setDefaultBackgroundColorOverride', shot.transparent ? { color: { r: 0, g: 0, b: 0, a: 0 } } : {});
  await send('Emulation.setDeviceMetricsOverride', { width: shot.width, height: shot.h || 768, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `http://127.0.0.1:${port}/${shot.file}` });
  await sleep(2500);
  for (const action of shot.actions || []) {
    if (await evaluate(action) !== true) { console.log('ACTION FAILED', shot.out, action); failures++; }
    await sleep(600);
  }
  // Grow the viewport to the content height, then re-measure: layout can shift once it is taller.
  const h1 = shot.h || await evaluate(shot.measure || fullHeight);
  await send('Emulation.setDeviceMetricsOverride', { width: shot.width, height: h1, deviceScaleFactor: 1, mobile: false });
  await sleep(700);
  const h = shot.h || await evaluate(shot.measure || fullHeight);
  if (await evaluate("document.body.innerText.includes('{{')")) { console.log('UNRENDERED HOLE', shot.out); failures++; }
  const shotRes = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: shot.width, height: h, scale: 1 }, captureBeyondViewport: true });
  fs.writeFileSync(path.join(outDir, shot.out), Buffer.from(shotRes.result.data, 'base64'));
  console.log(shot.out, `${shot.width}x${h}`);
}
ws.close();
await cleanup();
process.exit(failures ? 2 : 0);
