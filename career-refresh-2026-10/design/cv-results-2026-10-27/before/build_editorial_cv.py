"""Generate the local A4 CV design and its matching Google Docs instructions."""
from pathlib import Path
from html import escape
import json

HERE = Path(__file__).resolve().parent
DEST = HERE.parent / 'design/cv-editorial-2026-10-27'
spec = json.loads((HERE/'editorial-design.json').read_text(encoding='utf-8'))
content = json.loads((HERE/'editorial-content.json').read_text(encoding='utf-8'))
e = escape

def emphasize(text, phrases, markdown=False, keep=()):
    value = text if markdown else e(text)
    if not markdown:
        for phrase in keep:
            value = value.replace(e(phrase), f'<span class="cv-nowrap">{e(phrase)}</span>')
    for phrase in phrases:
        needle = phrase if markdown else e(phrase)
        value = value.replace(needle, f'**{needle}**' if markdown else f'<strong class="cv-emphasis">{needle}</strong>')
    return value


def render():
    jobs = ''
    for job in content['experience']:
        inline_role = f'<span>{e(job["role"])}</span>' if spec.get('experience_layout') != 'role-line' else ''
        role_context = f'<strong class="job-role">{e(job["role"])}</strong><span class="job-separator"> · </span>{e(job["context"])}' if spec.get('experience_layout') == 'role-line' else e(job['context'])
        jobs += f'''<article class="job" data-current="{str(job['current']).lower()}">
          <div class="job-title"><h3>{e(job['company'])}{inline_role}</h3><time>{e(job['dates'])}</time></div>
          <p class="job-context">{role_context}</p><ul>{''.join(f'<li>{emphasize(bullet,job.get("emphasis",[]))}</li>' for bullet in job['bullets'])}</ul>
        </article>'''
    skills = ''
    skill_marks = ['cv-code.svg', 'cv-systems.svg', 'cv-interface.svg']
    for index, row in enumerate(content['skills']):
        icon = f'<span class="capability-mark" aria-hidden="true" style="mask-image:url(assets/{skill_marks[index]})"></span>' if spec.get('skills_format') == 'capability-grid' and spec.get('skills_icons',True) else ''
        value = ''.join(f'<span class="skill-text-line">{e(line)}</span>' for line in row['lines']) if row.get('lines') and spec.get('skills_format') == 'capability-grid' else e(row['text'])
        skills += f'<p><strong>{icon}{e(row["label"])}{":" if spec.get("skills_format") == "inline" else ""}</strong> <span>{value}</span></p>'
    projects = ''.join(f'''<article class="project" data-layout="{e(spec.get('project_layout','stacked'))}"><div class="project-title"><h3><a href="{e(project['link'])}">{e(project['name'])}</a></h3><span>{e(project['dates'])}</span></div><p>{emphasize(project['description'],project.get('emphasis',[]),keep=project.get('keep_together',[]))}</p></article>''' for project in content['projects'])
    education = ''.join(f'''<div class="education-item"><div><strong>{e(row['name'])}</strong><p>{e(row['detail'])}</p></div><span>{e(row['date'])}</span></div>''' for row in content['education'])
    training = ''.join(f'''<article class="cv-training-item" data-training="{e(row['id'])}"><h3>{e(row['name'])}<span> · {e(row['program'])}</span></h3><p>{e(row['period'] or row['location'])} · {e(row['status'])}</p></article>''' for row in content.get('training', []))
    header_style = f"padding:{spec['header_padding_mm']}mm;border:{spec['header_border_pt']}pt solid var(--rule);border-left:{spec['header_edge_pt']}pt solid var(--accent);border-radius:1.5mm;background:{spec['header_fill']}" if spec.get('header_style') == 'nameplate' else f"padding-bottom:{spec.get('header_bottom_mm',5)}mm;border-bottom:.5pt solid var(--rule);background:linear-gradient(var(--accent),var(--accent)) left bottom/34mm 2pt no-repeat"
    if spec.get('header_style') == 'editorial':
        header_style = f"padding-bottom:{spec.get('header_bottom_mm',4)}mm;border-bottom:.5pt solid var(--rule)"
        if spec.get('header_accent'):
            header_style += f";padding-top:{spec.get('header_top_mm',2)}mm;background:linear-gradient(var(--accent),var(--accent)) left top/{spec.get('header_accent_width_mm',12)}mm {spec.get('header_accent_pt',1.5)}pt no-repeat"
    stacked_header = spec.get('header_layout') in ['stacked', 'identity-panel', 'type-led', 'signature']
    location = '' if stacked_header else f'<p class="cv-location">{e(content["location"])}</p>'
    contacts = f'<span class="contact-location">{e(content["location"])}</span>' if stacked_header else ''
    contacts += f'<a href="mailto:{e(content["email"])}">{e(content["email"])}</a><a href="{e(content["website"])}">kwanho.dev</a><a href="{e(content["linkedin"])}">LinkedIn</a><a href="{e(content["github"])}">GitHub</a>'
    if spec.get('header_layout') == 'signature':
        focus_text = '<br>'.join(e(line) for line in content.get('focusLines', [content['focusLine']]))
        identity = f'<div class="cv-signature-name"><h1 class="cv-name">{e(content["name"])}</h1><span class="cv-window-mark" aria-hidden="true"></span></div><div class="cv-signature-role"><p class="cv-role">{e(content["role"])}</p><p class="cv-focus-inline">{focus_text}</p></div>'
    elif spec.get('header_layout') == 'identity-panel':
        identity = f'<div class="cv-identity-copy"><h1 class="cv-name">{e(content["name"])}</h1><p class="cv-focus-line">C++ · Systems, integration &amp; interfaces</p></div><div class="cv-role-panel"><p>{e(content["role"]).replace(" ","<br>",1)}</p><span class="cv-window-mark" aria-hidden="true"></span></div>'
    else:
        identity = f'<div class="cv-identity-copy"><h1 class="cv-name">{e(content["name"])}</h1><p class="cv-role">{e(content["role"])}</p>{location}</div>'
    focus = f'<div class="focus-strip">{"".join(f"<span>{e(item)}</span>" for item in content["focus"])}</div>' if spec.get('show_focus_tags', True) else ''
    variables = ';'.join(f'--{key.replace("_","-")}:{value}' for key,value in spec.items() if key in ['ink','accent','muted','rule','panel'])
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Kwanho Kim · CV design</title><style>
@font-face{{font-family:Manrope;src:url('assets/manrope-700.ttf') format('truetype');font-weight:700;font-display:swap}}
@font-face{{font-family:"Source Serif 4";src:url('assets/source-serif-4-400.ttf') format('truetype');font-weight:400;font-display:swap}}
@font-face{{font-family:Inter;src:url('assets/inter-400.ttf') format('truetype');font-weight:400;font-display:swap}}
@font-face{{font-family:Inter;src:url('assets/inter-500.ttf') format('truetype');font-weight:500;font-display:swap}}
@font-face{{font-family:Inter;src:url('assets/inter-600.ttf') format('truetype');font-weight:600;font-display:swap}}
@font-face{{font-family:Inter;src:url('assets/inter-700.ttf') format('truetype');font-weight:700;font-display:swap}}
*{{box-sizing:border-box}}:root{{{variables}}}body{{margin:0;background:#e7ebe7;color:var(--ink);font:14px/1.6 Inter,Arial,sans-serif}}
.studio{{max-width:1280px;margin:auto;padding:30px 24px}}.studio-header{{display:flex;flex-wrap:wrap;gap:20px;align-items:center;justify-content:space-between;margin-bottom:24px}}.studio-header h1{{font:600 25px Manrope,sans-serif;letter-spacing:-.03em;margin:8px 0}}.studio-header p{{max-width:68ch;color:#56645a;margin:0}}.studio-header a{{color:#245540}}.toolbar{{display:flex;flex-wrap:wrap;gap:8px}}button,.toolbar a{{min-height:44px;padding:10px 15px;border:1px solid #6b8271;border-radius:5px;background:#fafbf8;color:#1c392a;font:500 13px Inter,sans-serif;cursor:pointer;text-decoration:none}}button[aria-pressed=true]{{background:#244c38;color:#fff}}button:focus-visible,a:focus-visible{{outline:2px solid #007b52;outline-offset:4px}}
.workspace{{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:30px;align-items:start}}.paper-scroll{{overflow:auto;padding:14px 14px 28px;max-width:100%}}.paper-stage{{margin:auto}}
.resume-paper{{width:210mm;min-height:297mm;padding:{spec['margin_top_mm']}mm {spec['margin_x_mm']}mm {spec['margin_bottom_mm']}mm;background:#fff;margin:auto;box-shadow:0 8px 35px #253c241c;font-family:{spec['body_font']},Arial,sans-serif;font-size:{spec['body_pt']}pt;line-height:{spec['body_line_pt']}pt;color:var(--ink)}}
.resume-paper h1,.resume-paper h2,.resume-paper h3,.resume-paper p,.resume-paper ul{{margin:0}}.resume-paper a{{color:inherit;text-decoration:none}}.resume-paper a:hover{{text-decoration:underline}}
.cv-emphasis{{font-weight:{spec.get('emphasis_weight',500)}}}
.cv-nowrap{{white-space:nowrap}}
.cv-header{{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8mm;{header_style}}}
.cv-name{{font-family:"{spec['name_font']}",Georgia,serif;font-size:{spec['name_pt']}pt;line-height:1.06;font-weight:{spec.get('name_weight',700)};letter-spacing:{spec.get('name_letter_spacing_em',-.035)}em;word-spacing:{spec.get('name_word_spacing_em',0)}em}}.cv-role{{font-size:{spec['role_pt']}pt;font-weight:500;color:var(--accent);margin-top:2.2mm!important}}.cv-location{{font-size:{spec['meta_pt']}pt;color:var(--muted);margin-top:1.4mm!important}}
.cv-contact{{font-size:{spec['meta_pt']}pt;line-height:1.65;text-align:right;align-self:center}}.cv-contact a{{display:block}}.cv-contact .social-links{{display:flex;gap:3mm;justify-content:flex-end}}.social-links a{{display:inline}}.focus-strip{{display:flex;flex-wrap:wrap;gap:2mm;margin-top:4mm}}.focus-strip span{{font-size:9pt;line-height:1.4;padding:1mm 2mm;border:.5pt solid #bdcec1;border-radius:2mm;color:#34583f}}
.cv-header[data-layout="stacked"]{{display:block}}.cv-header[data-layout="stacked"] .cv-contact{{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:1.2mm 3mm;text-align:left;margin-top:3mm;font-size:{spec.get('contact_pt',spec['meta_pt'])}pt;line-height:1.4;color:var(--muted)}}.cv-header[data-layout="stacked"] .cv-contact a{{display:inline}}.contact-location{{white-space:nowrap}}
.cv-header[data-layout="identity-panel"]{{display:grid;grid-template-columns:minmax(0,1fr) 43mm;gap:3mm 8mm;align-items:center}}.cv-focus-line{{font-size:10pt;line-height:14pt;color:var(--muted);margin-top:2mm!important}}.cv-role-panel{{display:flex;align-items:center;justify-content:space-between;gap:3mm;background:#173e2c;color:#f4f4e7;padding:3mm;border-radius:1mm;min-height:18mm}}.cv-role-panel p{{font:600 12pt/1.2 Inter,sans-serif;letter-spacing:-.02em}}.cv-window-mark{{display:block;width:8mm;height:8mm;flex:0 0 8mm;background:#dbe6c4;mask:url('assets/cv-window-mark.svg') center/contain no-repeat}}
.cv-header[data-layout="identity-panel"] .cv-contact,.cv-header[data-layout="type-led"] .cv-contact{{grid-column:1/-1;display:flex;flex-wrap:wrap;justify-content:space-between;gap:1.2mm 3mm;font-size:{spec.get('contact_pt',9.5)}pt;line-height:1.4;text-align:left;color:var(--muted)}}.cv-header[data-layout="identity-panel"] .cv-contact a,.cv-header[data-layout="type-led"] .cv-contact a{{display:inline}}
.cv-header[data-layout="type-led"]{{display:block}}.cv-header[data-layout="type-led"] .cv-name{{font:700 26pt/1.05 Manrope,sans-serif;letter-spacing:-.035em}}.cv-header[data-layout="type-led"] .cv-role{{font:500 25pt/1.1 Inter,sans-serif;color:#78917b;letter-spacing:-.035em;margin-top:1mm!important}}.cv-header[data-layout="type-led"] .cv-contact{{margin-top:3mm}}
.cv-header[data-layout="signature"]{{display:block}}.cv-signature-name{{display:flex;align-items:center;justify-content:space-between}}.cv-signature-name .cv-window-mark{{width:8mm;height:8mm;background:var(--accent)}}.cv-signature-role{{display:flex;align-items:center;justify-content:space-between;gap:7mm;margin-top:1mm}}.cv-header[data-layout="signature"] .cv-role{{font:500 {spec['role_pt']}pt/1.1 Inter,sans-serif;color:{spec.get('role_ink','#416E50')};letter-spacing:-.035em;margin:0!important}}.cv-focus-inline{{font-size:9.5pt;line-height:12.5pt;text-align:right;color:var(--muted);max-width:54mm}}.cv-header[data-layout="signature"] .cv-contact{{display:flex;justify-content:space-between;gap:3mm;margin-top:3mm;text-align:left;font-size:{spec.get('contact_pt',9.5)}pt;line-height:1.4;color:var(--muted)}}.cv-header[data-layout="signature"] .cv-contact a{{display:inline}}
.cv-contact a,.project-title a{{text-decoration:underline;text-decoration-color:#8da58f;text-decoration-thickness:.5pt;text-underline-offset:1.5pt}}
.cv-section{{margin-top:{spec['section_gap_pt']}pt}}.cv-section>h2{{font-size:{spec['section_pt']}pt;line-height:1.3;font-weight:{spec.get('section_weight',700)};letter-spacing:{spec.get('section_tracking_em',.06)}em;color:var(--accent);margin-bottom:4pt;text-transform:{'uppercase' if spec.get('section_caps',True) else 'none'}}}
.job+.job{{margin-top:{spec['job_gap_pt']}pt}}.job-title,.project-title{{display:flex;justify-content:space-between;align-items:baseline;gap:3mm}}.job-title h3{{font-size:{spec['company_pt']}pt;line-height:1.3;font-weight:{spec.get('company_weight',700)};color:var(--ink)}}.job-title h3 span{{font-size:{spec['body_pt']}pt;font-weight:400;margin-left:2.5mm}}.job-title time,.project-title>span{{font-size:{spec['meta_pt']}pt;color:var(--muted);white-space:nowrap;font-variant-numeric:tabular-nums}}.job-context{{font-size:{spec['meta_pt']}pt;color:var(--muted);line-height:14pt;margin-top:1pt!important;margin-bottom:3pt!important}}.job-role{{font-size:{spec['body_pt']}pt;font-weight:500;color:var(--ink)}}.job-separator{{color:#a2b0a5}}.job ul{{padding-left:3.8mm}}.job li{{padding-left:.3mm;margin-top:2pt}}.job li::marker{{color:#57775e;font-size:.75em}}
.skills-band{{background:var(--panel);border:.5pt solid #e0e8e1;border-radius:2.4mm;padding:{spec.get('skills_padding_y_mm',3)}mm {spec.get('skills_padding_x_mm',3.5)}mm;font-size:{spec.get('skills_pt',spec['body_pt'])}pt}}.skills-band p{{display:grid;grid-template-columns:27mm 1fr;gap:2mm;line-height:{spec.get('skills_line_pt',14.5)}pt}}.skills-band p+p{{margin-top:2pt}}.skills-band strong{{font-size:{spec.get('skills_pt',9.5)}pt;font-weight:600;color:#31553e}}.skills-band[data-format="inline"] p{{display:block}}.skills-band[data-format="inline"] strong{{margin-right:1.2mm}}
.skills-band[data-format="capability-grid"]{{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:3mm;padding:3mm;background:#f2f5ef;border:.5pt solid #dce5d9;border-radius:1.8mm}}.skills-band[data-format="capability-grid"] p{{display:block;margin:0}}.skills-band[data-format="capability-grid"] p+p{{border-left:.5pt solid #cbd8c7;padding-left:3mm}}.skills-band[data-format="capability-grid"] strong{{display:flex;align-items:center;gap:1.5mm;font-size:9.5pt;margin-bottom:3pt;line-height:14pt}}.capability-mark{{display:inline-block;width:{spec.get('skills_icon_size_pt',12)}pt;height:{spec.get('skills_icon_size_pt',12)}pt;flex:0 0 {spec.get('skills_icon_size_pt',12)}pt;background:var(--accent);mask-repeat:no-repeat;mask-size:contain;mask-position:center}}
.skill-text-line{{display:block}}
.skills-band[data-surface="rules"]{{background:transparent;border:0;border-top:.65pt solid var(--rule);border-bottom:.65pt solid var(--rule);border-radius:0;padding-inline:0}}.skills-band[data-surface="rules"] p+p{{border-left:.5pt solid var(--rule)}}
.project-title h3{{font-size:{spec['body_pt']}pt;font-weight:600}}.project-title a{{text-decoration:underline;text-decoration-color:#91a796;text-underline-offset:2pt}}.project>p{{margin-top:2pt;line-height:{spec['body_line_pt']}pt}}.project+.project{{margin-top:{spec.get('project_gap_pt',5)}pt}}
.project[data-layout="index"]{{display:grid;grid-template-columns:{spec.get('project_label_mm',38)}mm minmax(0,1fr);gap:{spec.get('project_column_gap_mm',5)}mm;align-items:start}}.project[data-layout="index"] .project-title{{display:block}}.project[data-layout="index"] .project-title>span{{display:block;margin-top:2pt}}.project[data-layout="index"]>p{{margin-top:0}}
.education-item{{display:flex;gap:4mm;justify-content:space-between;align-items:baseline}}.education-item+.education-item{{margin-top:4pt}}.education-item strong{{font-size:{spec.get('education_name_pt',10)}pt;font-weight:600}}.education-item p{{font-size:{spec['meta_pt']}pt;line-height:1.4;color:var(--muted)}}.education-item>span{{font-size:{spec['meta_pt']}pt;white-space:nowrap;color:var(--muted);font-variant-numeric:tabular-nums}}.cv-footer{{border-top:.5pt solid var(--rule);margin-top:8pt;padding-top:5pt;font-size:{spec.get('footer_pt',9)}pt;color:var(--muted)}}
.cv-training-grid{{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:5mm;margin-top:{6 if spec.get('training_divider') else 4}pt;{'border-top:.5pt solid var(--rule);padding-top:3pt' if spec.get('training_divider') else ''}}}.cv-training-item h3{{font-size:{spec.get('training_name_pt',10)}pt;line-height:14pt;font-weight:600}}.cv-training-item h3 span{{font-size:{spec['meta_pt']}pt;font-weight:400;margin-left:1.5mm}}.cv-training-item p{{font-size:{spec['meta_pt']}pt;line-height:12.5pt;color:var(--muted);margin-top:1pt}}
.design-notes{{position:sticky;top:24px;padding:22px;background:#f6f8f4;border:1px solid #c8d4c9;border-radius:8px}}.design-notes h2{{font:600 18px Manrope,sans-serif;margin:0 0 16px}}.design-notes dl{{margin:0;font-size:13px}}.design-notes dt{{font-weight:600;margin-top:16px}}.design-notes dd{{margin:4px 0 0;color:#536658}}.design-notes a{{color:#25553b}}.design-notes .version{{font-size:11px;color:#6b786e;margin-top:20px}}.annotation{{display:none}}body.annotated .cv-header,body.annotated .cv-section{{outline:1px dashed #8da896;outline-offset:3px}}body.annotated .annotation{{display:block;color:#667c6c;font-size:12px;margin:8px 0}}
@media(max-width:1120px){{.workspace{{grid-template-columns:minmax(0,1fr)}}.design-notes{{position:static;max-width:794px;margin:auto}}}}@media(max-width:650px){{.studio{{padding:20px 10px}}.paper-scroll{{padding:8px;}}.studio-header{{padding-inline:10px}}}}
@media screen{{.resume-paper{{transform:scale(var(--paper-scale,1));transform-origin:top left;margin:0}}}}
@page{{size:A4;margin:0}}@media print{{body{{background:#fff}}.studio{{padding:0;margin:0;max-width:none}}.studio-header,.design-notes,.annotation{{display:none!important}}.workspace{{display:block}}.paper-scroll{{overflow:visible;padding:0}}.paper-stage{{width:auto!important;height:auto!important;margin:0}}.resume-paper{{margin:0;box-shadow:none;transform:none!important}}.job,.project,.education-item,.cv-training-grid{{break-inside:avoid}}.cv-section>h2{{break-after:avoid}}body.annotated .cv-header,body.annotated .cv-section{{outline:none}}}}
</style></head><body><main class="studio">
<header class="studio-header"><div><a href="/studio/">Local design studio</a><h1>Kwanho Kim · CV proof</h1><p>Current A4 layout. Use the full-size view to inspect the type and spacing.</p></div><div class="toolbar"><button id="fit" type="button" aria-pressed="true">Fit page</button><button id="annotations" type="button" aria-pressed="false">Show layout guides</button><button type="button" onclick="window.print()">Print / Save PDF</button><button id="copy" type="button">Copy CV text</button></div></header>
<div class="workspace"><div class="paper-scroll" tabindex="0" aria-label="A4 CV preview; use Fit page or 100 percent to change the view"><div class="paper-stage"><article class="resume-paper" aria-label="Kwanho Kim CV">
<header class="cv-header" data-layout="{e(spec.get('header_layout','split'))}">{identity}<div class="cv-contact">{contacts}</div></header>
{focus}
<section class="cv-section"><h2>Experience</h2>{jobs}</section>
<section class="cv-section"><h2>Technical skills</h2><div class="skills-band" data-format="{e(spec.get('skills_format','columns'))}" data-surface="{e(spec.get('skills_surface','panel'))}">{skills}</div></section>
<section class="cv-section"><h2>Selected projects</h2>{projects}</section>
<section class="cv-section"><h2>Education &amp; training</h2>{education}<div class="cv-training-grid" role="group" aria-label="Completed technical programs">{training}</div></section>
<footer class="cv-footer">{e(content['languages'])}</footer>
</article></div></div><aside class="design-notes"><h2>Design decisions</h2><dl>
<dt>1. A visible identity</dt><dd>The serif name and large forest-green Software Engineer line provide the focal point. The two-pane mark connects to the paper card.</dd>
<dt>2. Readable evidence</dt><dd>{e(spec['body_font'])} {spec['body_pt']}pt / {spec['body_line_pt']}pt. Company, role and date have distinct levels.</dd>
<dt>3. Structured evidence</dt><dd>The ruled capability columns and project index keep the body ordered. The header carries the main graphic emphasis.</dd>
<dt>4. Distinct programs</dt><dd>42 and SEA:ME each have their own entry and completed status. Only SEA:ME has a confirmed date range.</dd>
<dt>5. Complete essentials</dt><dd>Name, role, email, city/country and links are present. Phone is optional. This general international CV does not need age, a full address or a photograph.</dd>
</dl><p class="annotation">Guides expose layout blocks only; they are not printed.</p><p><a href="design-values.json">Exact design values</a> · <a href="google-docs.md">Google Docs guide</a></p><p><a href="cv-copy.md">Matching CV text</a> · <a href="/studio/cv-interface-details-2026-10-27/index.html">Designer &amp; recruiter reviews</a></p><p class="version">Design {e(spec['version'])} · Local prototype · Google Docs reconstruction guidance is synchronized by the generator.</p><p id="copy-status" role="status"></p></aside></div></main>
<script>
const paper=document.querySelector('.resume-paper'),stage=document.querySelector('.paper-stage'),scroller=document.querySelector('.paper-scroll');let fit=true;
function fitPaper(){{const width=paper.offsetWidth,height=paper.offsetHeight,scale=fit?Math.min(1,(scroller.clientWidth-28)/width):1;paper.style.setProperty('--paper-scale',String(scale));stage.style.width=width*scale+'px';stage.style.height=height*scale+'px';}}
document.getElementById('fit').addEventListener('click',function(){{fit=!fit;this.setAttribute('aria-pressed',String(fit));this.textContent=fit?'Fit page':'100% view';fitPaper();}});
new ResizeObserver(fitPaper).observe(scroller);document.fonts.ready.then(fitPaper);fitPaper();
document.getElementById('annotations').addEventListener('click',function(){{const enabled=document.body.classList.toggle('annotated');this.setAttribute('aria-pressed',String(enabled));this.textContent=enabled?'Hide layout guides':'Show layout guides';}});
document.getElementById('copy').addEventListener('click',async function(){{try{{await navigator.clipboard.writeText(document.querySelector('.resume-paper').innerText);document.getElementById('copy-status').textContent='CV text copied.';}}catch{{document.getElementById('copy-status').textContent='Select the CV text to copy it.';}}}});
</script></body></html>'''


def markdown():
    skill_lines='\n'.join(f"{row['label']}: {row['text']}" for row in content['skills'])
    name_weight = 'Regular 400' if spec.get('name_weight') == 400 else 'Bold 700'
    header_advice = f"""이름과 직무를 왼쪽 기준선에 놓고, 그 아래에 위치·이메일·웹·LinkedIn·GitHub를 한 줄로 정렬합니다. 위치는 `{content['location']}`, 메일은 `{content['email']}`입니다. 이메일 링크도 `mailto:{content['email']}`로 맞춥니다.

Docs에서는 이름과 직무를 일반 문단으로 만들고 연락처 행에 탭 정지점 또는 테두리 없는 한 줄 표를 사용할 수 있습니다. 이름을 둘러싼 상자는 사용하지 않습니다. 연락처 크기는 {spec.get('contact_pt',spec['meta_pt'])}pt, 머리말 아래 여백은 {spec.get('header_bottom_mm',4)}mm입니다.

머리말 아래에는 0.5pt `{spec['rule']}` 선을 한 번 사용합니다. 종이 느낌은 서체·정렬·여백으로 연결하고, 질감이나 그림자 이미지를 얹지 않습니다.""" if spec.get('header_layout') == 'stacked' else f"""왼쪽 이름/직무와 오른쪽 연락처를 두 열로 배치합니다. 메일은 `{content['email']}`입니다. 현재 HTML의 여백과 색을 기준으로 재현합니다."""
    if spec.get('header_accent'):
        header_advice += f"\n\n이름 위에는 폭 {spec['header_accent_width_mm']}mm, 두께 {spec['header_accent_pt']}pt의 짧은 초록 선을 두고 {spec['header_top_mm']}mm를 띄웁니다. 전체 이름을 둘러싸는 상자는 없습니다. Docs에서는 짧은 선을 정확히 재현하기 어렵다면 아래 구분선만 유지해도 됩니다. 이메일·웹·프로필 링크는 옅은 초록 밑줄로 구별하고 위치에는 밑줄을 넣지 않습니다."
    if spec.get('header_layout') == 'signature':
        header_advice = f"""이름은 왼쪽의 {spec['name_pt']}pt {spec['name_font']} Regular, 바로 아래 Software Engineer는 {spec['role_pt']}pt Inter Medium, `{spec.get('role_ink','#416E50')}`로 둡니다. 이름과 큰 직함의 대비가 시각적 포인트입니다. 실제 회사별 직함은 본문에서 유지합니다.

오른쪽 위에는 약 8mm 크기의 글자 없는 두 칸 창 모양을, 그 아래에는 9.5pt 보조색으로 `Systems & interfaces` / `Integration · C++`를 두 줄로 정렬합니다. 화살표나 클릭 버튼 모양으로 만들지 않습니다.

Docs에서는 테두리 없는 2열 표(약 112mm/62mm)로 이름·직함과 기호·보조문구를 배치하고, 연락처 한 줄은 표 아래에 둡니다. 연락처는 {spec.get('contact_pt',9.5)}pt이며 `{content['location']}`, `{content['email']}`, 웹사이트, LinkedIn, GitHub입니다. 이메일·웹·프로필 링크에는 가는 밑줄을 적용합니다. 아래 구분선은 약 0.5pt `{spec['rule']}`입니다."""
    skills_advice = f"""기술 영역은 옅은 바탕의 세 칸으로 나눕니다. Docs에서는 본문 폭 {210-2*spec['margin_x_mm']}mm에 맞춘 3열 1행 표를 쓰고, 셀 내부 여백을 약 3mm로 둡니다. 배경은 `#F2F5EF`, 구분선은 0.5pt `#CBD8C7`입니다. 칸 제목은 9.5pt Semibold, 내용은 {spec.get('skills_pt',10.5)}pt / {spec.get('skills_line_pt',14)}pt입니다.

카테고리 아이콘은 동일한 선 두께의 코드·연결·인터페이스 기호이며 약 {spec.get('skills_icon_size_pt',11)}pt(3.9mm) 크기입니다. 기술 이름을 그림으로 대체하지 않습니다. Languages는 `C++, C, Python;` 다음에 줄을 바꿔 `TypeScript, JavaScript`를 둡니다. Figma의 기본 UI 경험이라는 표현을 유지합니다.""" if spec.get('skills_format') == 'capability-grid' else f"""기술 라벨과 내용을 같은 문단에 두고 {spec.get('skills_pt',spec['body_pt'])}pt로 조판합니다. 옅은 `{spec['panel']}` 배경과 짧은 안쪽 여백으로 구분합니다."""
    if spec.get('skills_surface') == 'rules':
        skills_advice = f"""기술 영역은 채운 상자 없이 세 칸으로 나눕니다. Docs에서는 3열 1행 표에 위아래 약 0.65pt `{spec['rule']}` 선과 칸 사이 0.5pt 세로선만 두고, 외곽 좌우 테두리와 배경색은 제거합니다. 제목은 9.5pt Semibold, 내용은 {spec.get('skills_pt',10.5)}pt / {spec.get('skills_line_pt',14)}pt입니다. 아이콘은 추가하지 않습니다.

Languages는 `C++, C, Python;` / `TypeScript, JavaScript` 두 줄을 의도적으로 나눕니다. Figma의 기본 UI 경험이라는 범위를 유지합니다."""
    return f'''# Google Docs 제작용 CV 디자인 명세

현재 시안: `{spec['version']}`. 실제 HTML A4 레이아웃과 이 문서는 같은 `editorial-design.json` / `editorial-content.json`에서 생성합니다. 시각 자료는 `http://localhost:3100/studio/cv-editorial-2026-10-27/index.html`에서 확인합니다.

붙여넣을 영어 본문은 같은 데이터로 생성한 `editorial-copy.md`에 있습니다. 미리보기의 Copy CV text 버튼으로도 복사할 수 있습니다.

## 디자인 방향

세리프 이름과 큰 초록 직함의 대비를 주된 디자인 포인트로 사용합니다. 명함과 연결되는 작은 창 모양, 정렬선과 구획이 일관된 인상을 만듭니다. 경력은 회사·역할·날짜·근거를 나누어 읽히게 하고 본문을 장식으로 채우지 않습니다.

## 1. 실제 지면과 여백

- A4 세로, 210 × 297mm, 흰색.
- 좌우 {spec['margin_x_mm']}mm, 위 {spec['margin_top_mm']}mm, 아래 {spec['margin_bottom_mm']}mm.
- 본문 폭 {210-2*spec['margin_x_mm']}mm. 왼쪽 정렬.
- Google Docs에서 페이지 모드, 인쇄 레이아웃과 눈금자를 켭니다.

## 2. 서체와 크기

| 요소 | 서체 | 크기 | 굵기 | 색 |
| --- | --- | --- | --- | --- |
| 이름 | {spec['name_font']} | {spec['name_pt']}pt | {name_weight} | `{spec['ink']}` |
| 머리말 직함 | {spec['body_font']} | {spec['role_pt']}pt | Medium 500, 없으면 Regular | `{spec.get('role_ink',spec['accent'])}` |
| 회사 | {spec['body_font']} | {spec['company_pt']}pt | Semibold {spec.get('company_weight',700)} | `{spec['ink']}` |
| 본문 | {spec['body_font']} | {spec['body_pt']}pt | Regular 400 | `{spec['ink']}` |
| 기술 영역 | {spec['body_font']} | {spec.get('skills_pt',spec['body_pt'])}pt | 라벨 Semibold / 내용 Regular | `{spec['ink']}` |
| 날짜·위치·기관 | {spec['body_font']} | {spec['meta_pt']}pt | Regular 400 | `{spec['muted']}` |
| 언어 정보 | {spec['body_font']} | {spec.get('footer_pt',9)}pt | Regular 400 | `{spec['muted']}` |
| 섹션 제목 | {spec['body_font']} | {spec['section_pt']}pt | Semibold {spec.get('section_weight',700)} | `{spec['accent']}` |

Docs의 글꼴 더보기에서 {spec['name_font']}와 Inter 제공 여부를 확인합니다. 사용할 수 없으면 이름은 Georgia Regular, 본문은 Arial로 통일하고 줄바꿈을 다시 확인합니다. HTML의 미세한 자간은 Docs에서 똑같이 지정할 수 없으므로 공백 문자로 흉내 내지 않습니다.

## 3. 머리말

{header_advice}

## 4. 경력과 날짜

회사명은 {spec['company_pt']}pt Semibold로 독립된 행에 두고, 날짜를 같은 행의 오른쪽에 맞춥니다. 직함은 다음 행에서 {spec['body_pt']}pt Medium으로, 팀/위치는 그 뒤에 {spec['meta_pt']}pt 보조색으로 둡니다. Docs에 해당 굵기가 없으면 Bold/Regular로 두 단계만 사용합니다. 날짜 탭은 왼쪽 본문 기준선에서 {210-2*spec['margin_x_mm']}mm 위치입니다. 공백 여러 개로 정렬하지 않습니다.

강조는 lifter fault recovery, Python WebSocket client, V2X demonstrator 같은 실제 작업 구절에만 제한합니다. HTML은 Medium {spec.get('emphasis_weight',500)}을 사용합니다. 문장 전체를 굵게 만들지 않습니다.

경력 사이의 간격은 {spec['job_gap_pt']}pt, 섹션 앞은 {spec['section_gap_pt']}pt입니다. 본문은 {spec['body_pt']}pt / HTML 기준 {spec['body_line_pt']}pt 줄 간격입니다. Docs의 배수 간격은 글꼴 메트릭의 영향을 받으므로 1.15~1.2에서 시작해 화면과 인쇄 결과를 보며 조정합니다. 줄 간격 입력란에 `{spec['body_line_pt']}`를 배수로 넣지 않습니다.

불릿은 실제 목록으로 만들고 글 시작을 약 3.8mm 들여씁니다. 두 번째 줄은 첫 단어에 맞춥니다. 회사·팀/위치 행은 다음 단락과 함께 유지하고, 각 불릿은 줄을 함께 유지합니다.

## 5. 기술 영역

아래 내용을 실제 텍스트로 유지합니다. 라벨만 Bold로 둡니다.

```text
{skill_lines}
```

{skills_advice}

## 6. 프로젝트와 학력

프로젝트명과 공개 저장소 링크를 연결하고, 본인 기여와 팀 수상 범위를 함께 적습니다. BCX 수상은 digital.auto & mobility challenge의 1위입니다. C++ containers는 42 프로젝트로 표시하며 vector, stack, AVL 기반 map과 iterator라는 실제 코드 범위로 설명합니다. 새 테스트를 통과했다고 주장하지 않습니다. Ariadne는 CV에서 제외합니다.

현재 프로젝트 부분은 왼쪽 {spec.get('project_label_mm',38)}mm에 이름/맥락, 오른쪽에 기여 설명을 둡니다. 간격은 {spec.get('project_column_gap_mm',5)}mm입니다. Docs에서는 두 행의 테두리 없는 표로 재현할 수 있으며, 복사·내보내기 뒤 각 프로젝트의 제목과 설명 순서를 확인합니다.

학력은 학위 취득과 진행 중 상태를 구분합니다. Computer Engineering과 Business Administration은 같은 기관 아래 각각의 취득 연도와 함께 묶습니다.

42와 SEA:ME는 각각 독립된 교육 항목으로 둡니다. HTML에서는 두 열에 나란히 배치하되 각 프로그램의 이름·내용·수료 상태를 따로 표시합니다. Docs에서는 마지막 교육 부분에만 테두리 없는 2열 표를 사용하거나 두 문단으로 분리할 수 있습니다.

현재 프로그램 이름은 {spec.get('training_name_pt',10)}pt Semibold입니다. 학위 항목과 프로그램 사이에 0.5pt의 옅은 선과 짧은 여백을 두어 서로 다른 자격임을 구분합니다.

- **42 — Software engineering:** Seoul / Wolfsburg · Completed. 수료 날짜는 제공되지 않았으므로 만들지 않습니다.
- **SEA:ME — Automotive & Mobility:** Jul 2023–Jun 2024 · Completed.

학위와 프로그램 수료를 같은 자격으로 표현하지 않습니다.

## 7. 마무리

본문을 먼저 완성한 뒤 이름, 회사, 섹션 제목 스타일을 적용합니다. 넘치면 반복 표현과 선택 항목을 줄이고 간격을 조정합니다. {spec['body_pt']}pt 본문을 더 작게 줄여 한 페이지에 억지로 맞추지 않습니다.

HTML/PDF 검토 결과는 별도 리뷰 기록에 남깁니다. 실제 Google Docs 조판·내보내기·ATS 처리는 아직 검증한 것이 아닙니다. 링크와 복사된 텍스트 순서를 확인하고, 글꼴이 바뀌면 페이지 수를 다시 확인합니다.

## 8. 연락처·개인 정보와 내용의 충분성

현재 기본 정보는 이름, C++ 직무, `{content['email']}`, `{content['location']}`, 웹사이트, LinkedIn과 GitHub입니다. 채용 연락을 받을 주소로 Gmail을 사용합니다. 도메인 메일 자체도 부적절한 것은 아니지만, CV에는 실제로 관리할 주 연락처 하나를 명확하게 둡니다.

- **현재 도시/국가:** Leuven, Belgium이면 충분합니다. 상세 주소와 우편번호는 지원서에서 필요할 때 제공합니다.
- **전화번호:** 있으면 연락에 유용하지만 선택 사항입니다. 추가한다면 본인이 제공한 국가번호 포함 번호를 사용합니다. 현재 문서에는 임의 번호나 빈 칸을 넣지 않습니다.
- **나이·생년월일:** 이 국제기업 지원용 기본 CV에서는 생략합니다.
- **사진:** 현재 기본판에서는 생략합니다. 해당 채용 절차가 요청하거나 별도 현지 관행을 따를 이유가 있을 때 별도 판을 검토합니다.
- **취업허가·스폰서십:** 지원 국가별로 정확히 확인된 상태를 요청에 맞춰 적습니다. 벨기에 거주만으로 다른 국가의 취업허가를 추정하지 않습니다.

현재 문서는 경력, 핵심 기술, 두 프로젝트, 취득/재학 학력, 두 기술 교육, 언어를 갖추고 있어 공통 지원용 한 페이지로 충분합니다. 섹션을 더 늘리기보다 공고에 따라 내용을 선택합니다. 네트워크/서버 C++ 공고라면 webserv를, Qt/장비 UI 공고라면 PiRacer를 프로젝트 한 칸에 넣는 방식이 적절합니다. 전체 저장소 기술 목록이나 확인되지 않은 성과 숫자를 그대로 추가하지 않습니다.
'''

def copy_markdown():
    lines = [
      f"# {content['name']}", '', content['role'], '',
      *([content['focusLine'], ''] if content.get('focusLine') else []),
      f"{content['location']} | {content['email']} | {content['website']}",
      f"{content['linkedin']} | {content['github']}", '', '## Experience', '',
    ]
    for job in content['experience']:
        lines += [f"### {job['company']} — {job['role']}", '', f"{job['dates']} · {job['context']}", '']
        lines += [f"- {emphasize(bullet,job.get('emphasis',[]),markdown=True)}" for bullet in job['bullets']]
        lines += ['']
    lines += ['## Technical skills', '']
    lines += [f"- **{row['label']}:** {row['text']}" for row in content['skills']]
    lines += ['', '## Selected projects', '']
    for project in content['projects']:
        lines += [f"### [{project['name']}]({project['link']})", '', project['dates'], '', emphasize(project['description'],project.get('emphasis',[]),markdown=True), '']
    lines += ['## Education & training', '']
    for row in content['education']:
        date = f" · {row['date']}" if row['date'] else ''
        lines += [f"- **{row['name']}**{date}: {row['detail']}"]
    for program in content.get('training', []):
        metadata = program['period'] or program['location']
        lines += ['', f"### {program['name']}", '', program['program'], '', f"{metadata} · {program['status']}"]
    lines += ['', content['languages'], '']
    return '\n'.join(lines)


html = render()
(DEST/'index.html').write_text(html, encoding='utf-8')
(DEST/'design-values.json').write_text(json.dumps(spec, ensure_ascii=False, indent=2), encoding='utf-8')
guide = markdown()
(HERE/'google-docs-design-spec.md').write_text(guide, encoding='utf-8')
(DEST/'google-docs.md').write_text(guide, encoding='utf-8')
copy = copy_markdown()
(HERE/'editorial-copy.md').write_text(copy, encoding='utf-8')
(DEST/'cv-copy.md').write_text(copy, encoding='utf-8')
print(f'Generated {DEST / "index.html"} and matching Markdown specification.')
