"""Capture an actual CV cycle state; critique is written after viewing images."""
from pathlib import Path
import argparse, hashlib, json, shutil
import pymupdf
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
DESIGN = ROOT/'design/cv-designer-cycles-2026-10-27'
CURRENT = ROOT/'design/cv-editorial-2026-10-27'
parser=argparse.ArgumentParser()
parser.add_argument('cycle',type=int,choices=range(1,6))
parser.add_argument('phase',choices=['before','after'])
args=parser.parse_args()
prefix=f'{args.cycle:02d}-{args.phase}'
out=DESIGN/'cycles'

with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True)
    page=browser.new_page(viewport={'width':1600,'height':1400},device_scale_factor=1.5)
    errors=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.goto('http://localhost:3100/studio/cv-editorial-2026-10-27/index.html',wait_until='networkidle')
    page.evaluate('document.fonts.ready')
    paper=page.locator('.resume-paper')
    rect=paper.bounding_box()
    paper.screenshot(path=str(out/f'{prefix}-full.png'))
    page.screenshot(path=str(out/f'{prefix}-top.png'),clip={'x':rect['x'],'y':rect['y'],'width':rect['width'],'height':min(430,rect['height'])})
    page.pdf(path=str(out/f'{prefix}.pdf'),format='A4',prefer_css_page_size=True,print_background=True,tagged=True,outline=True)
    measures=paper.evaluate('''e=>({width:e.offsetWidth,height:e.offsetHeight,header:e.querySelector('.cv-header').getBoundingClientRect().height,bodySize:getComputedStyle(e).fontSize,fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),sections:[...e.querySelectorAll('.cv-section')].map(s=>({title:s.querySelector('h2')?.textContent,height:s.getBoundingClientRect().height}))})''')
    browser.close()

document=pymupdf.open(out/f'{prefix}.pdf')
text='\n'.join(page.get_text() for page in document)
report={'cycle':args.cycle,'phase':args.phase,'pages':len(document),'measurements':measures,'runtime_errors':errors,'links':sum(len(page.get_links()) for page in document),'pdf_sha256':hashlib.sha256((out/f'{prefix}.pdf').read_bytes()).hexdigest()}
(out/f'{prefix}.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
(out/f'{prefix}-text.txt').write_text(text,encoding='utf-8')
for name in ['editorial-content.json','editorial-design.json']:
    shutil.copyfile(ROOT/'cv'/name,out/f'{prefix}-{name}')
html=(CURRENT/'index.html').read_text(encoding='utf-8')
(out/f'{prefix}.html').write_text(html.replace("url('assets/","url('../../cv-editorial-2026-10-27/assets/"),encoding='utf-8')
print(json.dumps(report,indent=2))
