"""Fallback PDF export when Chromium cannot launch. Requires WeasyPrint 70.

Run the local server first. Set SITE_URL if it uses a different port.
"""
import os
import re
from pathlib import Path
from urllib.request import urlopen
from weasyprint import HTML

ROOT = Path(__file__).resolve().parent.parent
BASE = os.environ.get('SITE_URL', 'http://127.0.0.1:4173')
FALLBACK_PRINT = """
@page { @bottom-right { content: counter(page) " / " counter(pages);
 font-family: Pretendard, sans-serif; font-size: 7pt; color: #68717d; } }
.intro-heading,.section-heading,.company-heading,.education-row,.project-meta { display: block; }
.intro-heading h1,.intro-heading .role-badge,.section-heading h2,.section-heading>span { display: inline-block; white-space: nowrap; width: auto; vertical-align: baseline; }
.intro-heading h1 { margin-right: 15pt; }
.section-heading h2 { margin-right: 10pt; }
.company-heading>div { display: inline-block; width: auto; }
.company-heading>p { float: right; }
.company-heading h2,.row-meta h3,.education-row h3 { white-space: nowrap; }
.education-row>div { display: inline-block; }
.education-row>p { float: right; white-space: nowrap; }
.project-meta>span { display: inline; white-space: normal; }
.project-meta>span+span { margin-left: 10pt; }
.contact-links { display: block; }
.contact-links a { display: inline-block; margin-right: 14pt; }
.portfolio-cover { display: block; }
.portfolio-cover h1 { margin-bottom: 7pt; }
.portfolio-cover>p:last-child { text-align: left; max-width: none; margin: 0; }
.portfolio-document .project-gallery { display: block; font-size: 9pt; }
.portfolio-document .project-gallery figure { display: block; width: 100%; margin: 0 0 12pt; break-inside: avoid-page; }
.portfolio-document .image-expand { display: block; padding: 5pt; }
.portfolio-document .image-expand img { display: block; width: 75% !important; height: auto !important; max-height: none !important; margin: auto; }
.portfolio-document .implementation-section .project-gallery figure { width: 100%; margin-right: 0; }
.portfolio-document .implementation-section .project-gallery .image-expand img { width: 75% !important; height: auto !important; max-height: none !important; margin: auto; }
.portfolio-document .implementation-section { break-inside: avoid-page; }
.career-project .project-overview { break-inside: avoid-page !important; }
.portfolio-overview,.portfolio-scope { break-inside: avoid-page !important; }
.portfolio-document #xrgis .image-expand img { width: 55% !important; }
.portfolio-cover>p:last-child { float: none; width: auto; justify-self: start; }
.after-flow { margin-top: 12pt; border-left: 2pt solid #2457ce; padding-left: 10pt; }
.after-flow h4 { font-size: 10pt; }
.after-flow ol { margin: 5pt 0 0; padding-left: 15pt; font-size: 9pt; }
"""
for name, route in [('resume', '/'), ('career', '/career/'), ('portfolio', '/portfolio/')]:
    with urlopen(BASE + route) as response:
        source = response.read().decode('utf-8')
    source = re.sub(r'(<a\b[^>]*\bhref=")(/[^\"]*)',
                    r'\1https://shkiimaa.github.io\2', source)
    source = re.sub(r'<button class="image-expand"[^>]*>(.*?)</button>', r'<div class="image-expand">\1</div>', source, flags=re.S)
    source = source.replace('</head>', '<style>' + FALLBACK_PRINT + '</style></head>')
    document = HTML(string=source, base_url=BASE + route).render()
    document.write_pdf(ROOT / 'public' / f'{name}.pdf')
    print(f'Exported {name}.pdf: {len(document.pages)} pages')
