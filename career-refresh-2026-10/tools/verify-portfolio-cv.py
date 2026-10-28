from pathlib import Path
import hashlib, json, re, shutil, subprocess
import pymupdf
from playwright.sync_api import sync_playwright

ROOT = Path(r'C:\Projects\career-refresh-2026-10')
OUT = ROOT/'design/portfolio-review-2026-10-27/cv'
REPO = Path(r'C:\Projects\blog')
if json.loads((ROOT/'cv/editorial-design.json').read_text(encoding='utf-8')).get('renderer') == 'results':
    raise SystemExit('This is the historical signature-CV verifier. Use tools/verify-results-cv.py for the current renderer.')
subprocess.run([r'C:\Program Files\Python313\python.exe','-X','utf8',str(ROOT/'cv/build_editorial_cv.py')],check=True)
with sync_playwright() as p:
    browser=p.chromium.launch(channel='msedge',headless=True)
    page=browser.new_page(viewport={'width':1600,'height':1400},device_scale_factor=1.5)
    page.goto('http://localhost:3100/studio/cv-editorial-2026-10-27/index.html',wait_until='networkidle')
    page.evaluate('()=>document.fonts.ready')
    layout=page.locator('.resume-paper').evaluate('e=>({height:e.clientHeight,contentHeight:e.scrollHeight,width:e.clientWidth,contentWidth:e.scrollWidth})')
    page.locator('.resume-paper').screenshot(path=str(OUT/'final-full.png'))
    page.locator('.cv-header').screenshot(path=str(OUT/'final-header.png'))
    page.pdf(path=str(OUT/'final.pdf'),format='A4',prefer_css_page_size=True,print_background=True,tagged=True,outline=True)
    browser.close()

doc=pymupdf.open(OUT/'final.pdf')
text='\n'.join(page.get_text() for page in doc)
flat=re.sub(r'\s+',' ',text)
fonts=[font for page in doc for font in page.get_fonts()]
links=[link for page in doc for link in page.get_links()]
spans=[span for page in doc for block in page.get_text('dict')['blocks'] if 'lines' in block for line in block['lines'] for span in line['spans'] if span['text'].strip()]
copy=(ROOT/'cv/editorial-copy.md').read_text(encoding='utf-8')
spec=(ROOT/'cv/google-docs-design-spec.md').read_text(encoding='utf-8')
checks={
    'one_a4_page':len(doc)==1 and abs(doc[0].rect.width-595.276)<1 and abs(doc[0].rect.height-841.89)<1,
    'no_html_overflow':layout['contentHeight']<=layout['height']+2 and layout['contentWidth']<=layout['width']+2,
    'name_then_broad_role':flat.startswith('Kwanho Kim Software Engineer'),
    'personal_email': 'kwanho0096@gmail.com' in text and 'contact@kwanho.dev' not in text,
    'leuven_retained':'Leuven, Belgium' in text,
    'three_typographic_scales':all(any(abs(span['size']-size)<.15 for span in spans) for size in [30,24,11]),
    'embedded_fonts':bool(fonts) and all(bool(doc.extract_font(font[0])[3]) for font in fonts),
    'unicode_maps':bool(fonts) and all('/ToUnicode' in doc.xref_object(font[0]) for font in fonts),
    'tagged_pdf':'/StructTreeRoot' in doc.xref_object(doc.pdf_catalog()),
    'six_working_link_targets':len(links)==6 and all(link.get('uri','').startswith(('https://','mailto:')) for link in links),
    'email_link':any(link.get('uri')=='mailto:kwanho0096@gmail.com' for link in links),
    'scope_and_training_preserved':all(term in flat for term in ['early implementation','team review','digital.auto','42','SEA:ME','Completed','Figma (basic UI)']),
    'copy_synchronized':all(term in copy for term in ['Software Engineer','kwanho0096@gmail.com','Systems & interfaces','Integration','SEA:ME']),
    'design_spec_synchronized':all(term in spec for term in ['24pt','#416E50','두 칸 창','아이콘은 추가하지 않습니다']),
}
report={'checks':checks,'passed':all(checks.values()),'page_count':len(doc),'links':len(links),'fonts':sorted(set(font[3] for font in fonts)),'layout':layout,'pdf_sha256':hashlib.sha256((OUT/'final.pdf').read_bytes()).hexdigest(),'limits':['No physical print, real Google Docs import or ATS acceptance test.']}
(OUT/'final-text.txt').write_text(text,encoding='utf-8')
doc[0].get_pixmap(matrix=pymupdf.Matrix(1.5,1.5),colorspace=pymupdf.csGRAY).save(OUT/'final-grayscale.png')
(OUT/'verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
assert report['passed']
shutil.copyfile(OUT/'final.pdf',REPO/'public/CV.pdf')
print('Selected verified PDF copied to the local public/CV.pdf.')
