import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { renderToStaticMarkup } from 'react-dom/server';
import { pages, notFound } from '../src/ui/pages.jsx';

export const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, 'dist');
const origin = 'https://shkiimaa.github.io';
const html = element => `<!doctype html>\n${renderToStaticMarkup(element)}`;

export async function build() {
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  await cp(path.join(root, 'public'), out, { recursive: true });
  await cp(path.join(root, 'src/app.js'), path.join(out, 'app.js'));
  // 스타일: Tailwind가 src/ui 컴포넌트에서 쓴 클래스만 모아 만든다
  execFileSync(path.join(root, 'node_modules/.bin/tailwindcss'), ['-i', path.join(root, 'src/tailwind.css'), '-o', path.join(out, 'styles.css'), '--minify'], { stdio: 'pipe' });
  for (const [route, page] of pages) {
    const directory = path.join(out, route);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), html(page()));
  }
  await writeFile(path.join(out, '404.html'), html(notFound()));
  await writeFile(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(([route]) => `<url><loc>${origin}${route}</loc></url>`).join('')}</urlset>`);
  await writeFile(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  console.log(`Built ${pages.length} pages → dist/`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await build();
