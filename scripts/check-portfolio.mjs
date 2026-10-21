import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { projects } from '../src/content.mjs';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE
  ? pathToFileURL(process.env.PLAYWRIGHT_MODULE).href : 'playwright');
const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
await mkdir('artifacts', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ acceptDownloads: true });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ['/portfolio/', '/projects/', ...projects.map(p => `/projects/${p.id}/`)]) {
      await page.goto(base + route);
      await page.evaluate(() => document.fonts.ready);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${route} overflow at ${width}`);
      assert.equal(await page.locator('main h1').count(), 1);
      assert.equal(await page.locator('.download-link').getAttribute('href'), '/portfolio.pdf');
      if (route === '/projects/bitria/' || route === '/portfolio/') {
        assert.equal(await page.locator('.architecture-diagram svg').count(), 4);
        assert.equal(await page.locator('.architecture-diagram foreignObject').count(), 0);
        for (const figure of await page.locator('.architecture-diagram').all()) {
          const box = await figure.boundingBox();
          assert(box.width > 100 && box.height > 80);
        }
      }
    }
  }
  await page.goto(base + '/projects/bitria/');
  await page.evaluate(() => document.fonts.ready);
  for (let i = 0; i < 4; i++) await page.locator('.architecture-diagram').nth(i).screenshot({ path: `artifacts/diagram-${i + 1}.png` });
  await page.locator('#implementation').screenshot({ path: 'artifacts/bitria-implementation.png' });
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto(base + '/projects/bitria/');
  await page.locator('#implementation').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'artifacts/bitria-diagram-mobile.png' });
  await page.goto(base + '/projects/');
  const downloadEvent = page.waitForEvent('download');
  await page.locator('.download-link').click();
  const download = await downloadEvent;
  assert.equal(download.suggestedFilename(), '김수환_포트폴리오.pdf');
  assert.equal(await download.failure(), null);
  const response = await page.request.get(base + '/portfolio.pdf');
  assert.equal(response.status(), 200);
  assert.equal(Buffer.from(await response.body()).subarray(0, 4).toString(), '%PDF');
  assert.deepEqual(errors, []);
  console.log('Checked 10 portfolio routes at 3 widths, 4 SVG diagrams, and PDF download');
} finally { await browser.close(); }
