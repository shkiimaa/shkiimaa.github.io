import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { root, build } from './build.mjs';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
await mkdir(path.join(root, 'artifacts'), { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const [name, route] of [['resume', '/'], ['career', '/career/']]) {
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });
    // Narrow screen rules must never stack task labels or project metadata in print.
    for (const width of [390, 794]) {
      await page.setViewportSize({ width, height: 1123 });
      if (name === 'career') {
        const rows = await page.locator('.task-list>div, .project-meta').evaluateAll(elements =>
          elements.map(el => [...el.children].map(child => child.getBoundingClientRect().top)));
        assert(rows.every(tops => Math.abs(tops[0] - tops[1]) < 2), 'Print rows must stay in two columns');
      }
    }
    await page.evaluate(() => {
      for (const anchor of document.querySelectorAll('a[href^="/"]')) {
        anchor.href = `https://shkiimaa.github.io${anchor.getAttribute('href')}`;
      }
    });
    await page.pdf({
      path: path.join(root, 'public', `${name}.pdf`), format: 'A4',
      printBackground: true, preferCSSPageSize: true, tagged: true,
      displayHeaderFooter: true, headerTemplate: '<span></span>',
      footerTemplate: '<div style="width:100%;font-family:Arial,sans-serif;font-size:8px;color:#777;text-align:right;padding-right:55px"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: { top: '15mm', bottom: '16mm', left: '15mm', right: '15mm' }
    });
    await page.emulateMedia({ media: 'screen' });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
    }
    console.log(`Exported ${name}.pdf; print rows and screen overflow checked`);
  }
} finally {
  await browser.close();
}
await build();
