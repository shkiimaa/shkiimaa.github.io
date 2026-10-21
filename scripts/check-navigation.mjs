import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

const { chromium } = process.env.PLAYWRIGHT_MODULE
  ? await import(pathToFileURL(process.env.PLAYWRIGHT_MODULE).href)
  : await import('playwright');
const browser = await chromium.launch({ headless: true });
const base = process.env.SITE_URL || 'http://127.0.0.1:4173';
const settle = page => page.evaluate(() => new Promise(resolve => {
  let previous = scrollY, stable = 0;
  const frame = () => {
    stable = Math.abs(scrollY - previous) < 1 ? stable + 1 : 0;
    previous = scrollY;
    stable >= 8 ? resolve() : requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}));

try {
  for (const height of [800, 1100]) {
    const page = await browser.newPage({ viewport: { width: 1440, height } });
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    for (const id of ['skills', 'education', 'skills', 'experience', 'about']) {
      await page.locator(`.section-nav a[href="#${id}"]`).click();
      await settle(page);
      assert.equal(await page.locator('.section-nav a[aria-current]').getAttribute('href'), `#${id}`, `Clicked ${id} at height ${height}`);
      assert.equal(await page.evaluate(() => location.hash), `#${id}`);
      assert.ok(await page.locator(`#${id}`).evaluate(element => {
        const box = element.getBoundingClientRect();
        return box.top < innerHeight && box.bottom > 0;
      }), `${id} must be visible`);
    }
    await page.mouse.wheel(0, 20000);
    await settle(page);
    assert.equal(await page.locator('.section-nav a[aria-current]').getAttribute('href'), '#education', 'Bottom of document must select education');
    await page.mouse.wheel(0, -20000);
    await settle(page);
    assert.equal(await page.locator('.section-nav a[aria-current]').getAttribute('href'), '#about', 'Scrolling to top must restore about');
    await page.goto(`${base}/#skills`);
    await page.evaluate(() => document.fonts.ready);
    await settle(page);
    assert.equal(await page.locator('.section-nav a[aria-current]').getAttribute('href'), '#skills', 'Direct skills link');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.section-nav a[href="#education"]').click();
    await settle(page);
    assert.equal(await page.locator('.section-nav a[aria-current]').getAttribute('href'), '#education', 'Reduced motion navigation');
    for (const [route, ids] of [['/career/', ['xrgis', 'doit-homepage', 'bitria']], ['/projects/bitria/', ['technology', 'work', 'overview']]]) {
      await page.goto(base + route);
      await page.evaluate(() => document.fonts.ready);
      for (const id of ids) {
        await page.locator(`.section-nav a[href="#${id}"]`).click();
        await settle(page);
        assert.equal(await page.locator('.section-nav a[aria-current]').getAttribute('href'), `#${id}`, `${route} ${id}`);
      }
    }
    await page.close();
  }
  console.log('Navigation passed: skills, education, manual scrolling, direct links and reduced motion at two desktop heights.');
} finally {
  await browser.close();
}
