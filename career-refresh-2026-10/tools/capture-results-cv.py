from pathlib import Path
import argparse, json, sys
import pymupdf
from playwright.sync_api import sync_playwright

ROOT=Path(r'C:\Projects\career-refresh-2026-10')
OUT=ROOT/'design/cv-results-2026-10-27'
sys.path.insert(0,str(ROOT/'cv'))
from results_layout import render

parser=argparse.ArgumentParser()
parser.add_argument('--round',type=int,required=True)
args=parser.parse_args()
assert 1<=args.round<=20
content=json.loads((ROOT/'cv/editorial-content.json').read_text(encoding='utf-8'))
design=json.loads((ROOT/'cv/editorial-design.json').read_text(encoding='utf-8'))
(OUT/f'content-{args.round}.json').write_text(json.dumps(content,ensure_ascii=False,indent=2),encoding='utf-8')
report={}
with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True)
    for layout in ['index','linear']:
        spec={**design,'results_layout':layout,'version':f'results-cv-{layout}-{args.round}'}
        name=f'{layout}-{args.round}'
        html=render(content,spec).replace('<head>','<head><base href="/studio/cv-editorial-2026-10-27/">',1)
        (OUT/f'{name}.html').write_text(html,encoding='utf-8')
        (OUT/f'{name}-design.json').write_text(json.dumps(spec,indent=2),encoding='utf-8')
        page=browser.new_page(viewport={'width':1600,'height':1450},device_scale_factor=1.5)
        page.goto(f'http://localhost:3100/studio/cv-results-2026-10-27/{name}.html',wait_until='networkidle')
        page.evaluate('()=>document.fonts.ready')
        page.locator('.resume-paper').screenshot(path=str(OUT/'captures'/f'{name}-full.png'))
        page.locator('.cv-header').screenshot(path=str(OUT/'captures'/f'{name}-header.png'))
        box=page.locator('.resume-paper').evaluate('e=>({client:e.clientHeight,scroll:e.scrollHeight})')
        page.pdf(path=str(OUT/f'{name}.pdf'),format='A4',prefer_css_page_size=True,print_background=True,tagged=True,outline=True)
        page.close()
        doc=pymupdf.open(OUT/f'{name}.pdf')
        (OUT/f'{name}-text.txt').write_text('\n'.join(page.get_text() for page in doc),encoding='utf-8')
        doc[0].get_pixmap(matrix=pymupdf.Matrix(1.5,1.5),colorspace=pymupdf.csGRAY).save(OUT/'captures'/f'{name}-gray.png')
        report[layout]={'pages':len(doc),'layout':box}
    browser.close()
(OUT/f'round-{args.round}-layout.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
