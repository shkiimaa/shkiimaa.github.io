import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root } from './build.mjs';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
if (!process.env.MERMAID_SCRIPT) throw new Error('Set MERMAID_SCRIPT to mermaid/dist/mermaid.min.js');
const target = path.join(root, 'public/assets/diagrams');
await mkdir(target, { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 1000 } });
  await page.goto(process.env.SITE_URL || 'http://127.0.0.1:4173');
  await page.evaluate(() => document.fonts.ready);
  await page.addScriptTag({ path: process.env.MERMAID_SCRIPT });
  await page.evaluate(() => mermaid.initialize({
    startOnLoad: false, securityLevel: 'strict', theme: 'base', htmlLabels: false,
    fontFamily: 'Pretendard, sans-serif',
    themeVariables: { fontFamily: 'Pretendard, sans-serif', fontSize: '15px',
      primaryColor: '#f5f7fb', primaryTextColor: '#20242b', primaryBorderColor: '#aab4c5',
      lineColor: '#68717d', secondaryColor: '#edf2fc', tertiaryColor: '#ffffff',
      actorBkg: '#f5f7fb', actorBorder: '#aab4c5', actorTextColor: '#20242b',
      signalColor: '#4d5663', signalTextColor: '#20242b', noteBkgColor: '#edf2fc', noteBorderColor: '#aab4c5' },
    flowchart: { htmlLabels: false, curve: 'linear', nodeSpacing: 25, rankSpacing: 35 },
    sequence: { useMaxWidth: true, wrap: true, actorMargin: 35, width: 140, messageMargin: 30 }
  }));
  for (const file of (await readdir(path.join(root, 'src/diagrams'))).filter(f => f.endsWith('.mmd'))) {
    const source = await readFile(path.join(root, 'src/diagrams', file), 'utf8');
    const name = file.replace(/\.mmd$/, '');
    const svg = await page.evaluate(async ({ name, source }) => {
      const rendered = await mermaid.render(name, source);
      return rendered.svg;
    }, { name, source });
    if (!svg.includes('<svg') || svg.includes('<foreignObject')) throw new Error(`Non-vector diagram: ${name}`);
    await writeFile(path.join(target, `${name}.svg`), svg);
    console.log(`Rendered ${name}.svg`);
  }
} finally { await browser.close(); }
