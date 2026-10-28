"""Result-led CV renderer. Canonical facts remain in editorial-content.json."""
from html import escape as e


def effective_spec(spec):
    return {**spec, **spec.get('variant_overrides', {}).get(spec.get('results_layout'), {})}


def marked(text, phrases=()):
    value = e(text)
    for phrase in phrases:
        value = value.replace(e(phrase), f'<strong>{e(phrase)}</strong>')
    return value.replace('end-to-end', '<span class="cv-nowrap">end-to-end</span>')


def selected_projects(content):
    return [project for project in content['projects'] if project.get('includeInCV', True)]


def copy_text(content, spec):
    lines = [f"# {content['name']}", '', content['role'], '',
             f"{content['location']} · {content['email']} · kwanho.dev",
             f"LinkedIn: {content['linkedin']} · GitHub: {content['github']}",
             '', '## Experience', '']
    for job in content['experience']:
        lines += [f"### {job['company']} — {job['role']}", '',
                  f"{job['dates']} · {job['location']} · {job['domain']}", '']
        lines += [f"- {bullet}" for bullet in job['bullets']]
        if job.get('currentFocus'):
            lines += ['', 'In progress: ' + job['currentFocus']]
        lines += ['']
    lines += ['## Team project & award', '']
    for project in selected_projects(content):
        award = project.get('award')
        lines += [f"### [{project['name']}]({project['link']})", '', project['dates'], '']
        if award:
            lines += [f"{award['credit']} {award['rank']} place in the {award['scope']} at {award['event']}.", '']
        lines += [project['description'], '']
    lines += ['## Technical skills', '']
    lines += [f"- **{row['label']}:** {row['text']}" for row in content['skills']]
    lines += ['', '## Education', '']
    for row in content['education']:
        lines += [f"- **{row['name']}**{' · '+row['date'] if row['date'] else ''}: {row['detail']}"]
    lines += ['', '## Technical training', '']
    for row in content['training']:
        lines += [f"- **{row['name']}** — {row['program']}. {row['period'] or row['location']} · {row['status']}."]
    lines += ['', content['languages'], '']
    return '\n'.join(lines)


def design_guide(content, spec):
    spec = effective_spec(spec)
    indexed = spec.get('results_layout') == 'index'
    structure = f"회사·날짜·도시는 왼쪽 {spec.get('job_label_mm',35)}mm, 직함과 기여 내용은 오른쪽에 둡니다. 간격은 {spec.get('job_column_gap_mm',6)}mm입니다. Docs에서는 테두리 없는 2열 표를 사용하고 셀의 기본 안쪽 여백을 제거합니다." if indexed else "회사·직함은 왼쪽, 날짜는 같은 줄의 오른쪽 탭에 둡니다. 본문은 한 열로 사용합니다. 공백을 여러 번 넣어 날짜를 맞추지 않습니다."
    return f"""# Google Docs / Word reconstruction — result-led CV

This guide, HTML and `editorial-copy.md` are generated from the same canonical
content/design JSON. No physical print or real Google Docs import is implied.

## Content hierarchy

1. Name and Software Engineer.
2. A single contact row.
3. Professional experience: problem/result first, implementation detail second.
4. The BCX team/challenge result and personal contribution.
5. Technical skills, education, completed training and languages.

Keep ongoing KLA recovery work labelled **In progress**. The default one-page
selection omits container coursework; its source remains in the portfolio.
Do not reintroduce unmeasured time savings, uptime, support-ticket reductions,
system-wide ownership, hardware validation or an overall BCX win.

## A4 and typography

- A4 portrait; left/right {spec['margin_x_mm']}mm, top {spec['margin_top_mm']}mm,
  bottom {spec['margin_bottom_mm']}mm.
- Name: {spec['name_font']} Bold, {spec['name_pt']}pt, dark ink.
- Role: Inter Medium, {spec['role_pt']}pt, forest green. It is smaller than the name.
- Narrative: Inter Regular {spec['body_pt']}pt, exact {spec['body_line_pt']}pt line spacing.
- Company/role: 11–12.5pt Semibold; dates, cities and supporting metadata:
  {spec['meta_pt']}pt.
- Main ink `{spec['ink']}`, accent `{spec['accent']}`, secondary text
  `{spec['muted']}`, rules `{spec['rule']}`.
- If Inter is unavailable, use Arial and recheck wrapping. Do not shrink the
  narrative below 11pt to force one page.

The editable DOCX deliberately uses {spec.get('word_body_font','Arial')} for
body text and embeds the Manrope name font. The local Word renderer substituted
Inter during an initial export, so the Word companion uses this explicit,
verified fallback rather than silently promising identical glyph metrics.
The HTML/PDF proof uses Inter. Recheck wrapping after Google Docs import.

## Header

Use the name and role once. Put the sector context and {'a thin vertical rule' if spec.get('results_header_mark') == 'rule' else 'a small window mark'} on the
right, without a box around the profession. Below, keep exactly one contact row:
{content['location']} · {content['email']} · kwanho.dev · LinkedIn · GitHub.
Use the canonical HTTPS/mailto links, muted green underlines and no default blue.
Do not repeat location/email beneath a second horizontal line.

## Experience

{structure}

Lead the Pickit entry with the communication failure and fix. The log tool is a
concrete deliverable; retain it without claiming measured time savings. Use
short bold phrases to aid scanning, not a bold keyword on every technical term.
For KLA, place the current recovery design below completed software changes
with the explicit **In progress** label.

## Award and supporting sections

Use one compact forest field for **Team / 1st**, with the named
`digital.auto & mobility challenge` and `BCX 2024` immediately beside it.
The text must not imply an individual or overall-event victory. Keep the
candidate's Python-client/integration/presentation contribution readable.

Keep skill names as text. Education and technical training may share a lower
two-column area. 42 and SEA:ME remain separate and completed; 42 has no invented
attendance/completion date. Preserve the awarded/in-progress degree statuses.

## Export check

Check actual page count, ordinary-size reading, first-line reading order,
links, embedded fonts and text selection after export. Copy content from
`editorial-copy.md`; do not treat a PDF screenshot as editable text.
"""


def render(content, spec):
    spec = effective_spec(spec)
    layout = spec.get('results_layout', 'index')
    jobs = []
    for job in content['experience']:
        bullets = ''.join(f'<li>{marked(text,job.get("emphasis",[]))}</li>' for text in job['bullets'])
        progress = f'<p class="job-progress"><span>In progress</span>{e(job["currentFocus"])}</p>' if job.get('currentFocus') else ''
        if layout == 'index':
            header = f'<div class="job-meta"><h3>{e(job["company"])}</h3><time>{e(job["dates"])}</time><p>{e(job["location"])}</p></div>'
            body = f'<div class="job-body"><div class="job-role-line"><h4>{e(job["role"])}</h4></div><ul>{bullets}</ul>{progress}</div>'
        else:
            header = f'<div class="job-linear-heading"><h3>{e(job["company"])}</h3><strong>{e(job["role"])}</strong><time>{e(job["dates"])}<span> · {e(job["location"])}</span></time></div>'
            body = f'<div class="job-body"><ul>{bullets}</ul>{progress}</div>'
        jobs.append(f'<article class="job" data-layout="{layout}" data-current="{str(job["current"]).lower()}">{header}{body}</article>')
    projects = []
    for project in selected_projects(content):
        award = project.get('award')
        flag = f'<div class="award-result"><span>Winner</span><strong>{e(award["rank"])}</strong></div>' if award else ''
        scope = f'<p class="award-scope">{e(award["scope"])} · {e(award["event"])}</p>' if award else ''
        projects.append(f'<article class="award-project">{flag}<div><div class="award-heading"><h3><a href="{e(project["link"])}">{e(project["name"])}</a></h3><span>{e(project["dates"])}</span></div>{scope}<p class="award-contribution">{e(project["description"])}</p></div></article>')
    skills = ''.join(f'<div><h3>{e(row["label"])}</h3><p>{"<br>".join(e(line) for line in row.get("lines", [row["text"]]))}</p></div>' for row in content['skills'])
    education = ''.join(f'<article class="education-item"><div class="education-heading"><h3>{e(row["name"])}</h3><span>{e(row["date"])}</span></div><p>{"<br>".join(e(line) for line in row.get("detailLines", [row["detail"]]))}</p></article>' for row in content['education'])
    training = ''.join(f'<article class="training-item" data-training="{e(row["id"])}"><h3>{e(row["name"])}<span>{e(row["status"])}</span></h3><p>{e(row["program"])}</p><p>{e(row["period"] or row["location"])}</p></article>' for row in content['training'])
    variables = ';'.join(f'--{key}:{spec[key]}' for key in ['ink','accent','muted','rule'])
    mark = 'identity-rule' if spec.get('results_header_mark') == 'rule' else 'identity-mark'
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Kwanho Kim · result-led CV</title>
<style>
@font-face{{font-family:Manrope;src:url('assets/manrope-700.ttf') format('truetype');font-weight:700;font-display:swap}}
@font-face{{font-family:Inter;src:url('assets/inter-400.ttf') format('truetype');font-weight:400;font-display:swap}}
@font-face{{font-family:Inter;src:url('assets/inter-500.ttf') format('truetype');font-weight:500;font-display:swap}}
@font-face{{font-family:Inter;src:url('assets/inter-600.ttf') format('truetype');font-weight:600;font-display:swap}}
*{{box-sizing:border-box}}body{{margin:0;background:#e7ece5;color:#1b2e22;font-family:Inter,Arial,sans-serif}}.studio{{max-width:1260px;padding:28px 24px 70px;margin:auto}}.studio-header{{display:flex;gap:20px;justify-content:space-between;align-items:center;margin:0 0 20px}}.studio-header h1{{font-size:20px;margin:4px 0}}.studio-header p{{font-size:13px;color:#56695b;margin:0}}.toolbar{{display:flex;flex-wrap:wrap;gap:8px}}.toolbar button{{background:#f5f8f1;border:1px solid #9eaf9c;border-radius:4px;padding:10px 13px;min-height:44px;color:#21432e;cursor:pointer}}.workspace{{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:26px;align-items:start}}.paper-scroll{{overflow:auto;padding:12px}}.paper-stage{{margin:auto}}.resume-paper{{{variables};width:210mm;min-height:297mm;height:297mm;padding:{spec['margin_top_mm']}mm {spec['margin_x_mm']}mm {spec['margin_bottom_mm']}mm;background:#fff;color:var(--ink);font:400 {spec['body_pt']}pt/{spec['body_line_pt']}pt Inter,Arial,sans-serif;box-shadow:0 8px 30px #1c382326;display:flex;flex-direction:column;transform:scale(var(--paper-scale,1));transform-origin:top left}}.resume-paper h1,.resume-paper h2,.resume-paper h3,.resume-paper h4,.resume-paper p{{margin:0}}.resume-paper a{{color:inherit;text-decoration:underline;text-decoration-color:#8da58f;text-decoration-thickness:.5pt;text-underline-offset:1.4pt}}.resume-paper strong{{font-weight:600}}.cv-header{{padding-bottom:3mm;border-bottom:.6pt solid var(--rule)}}.identity-row{{display:flex;justify-content:space-between;align-items:start;gap:12mm}}.cv-name{{font:700 {spec['name_pt']}pt/1.08 Manrope,Arial,sans-serif;letter-spacing:-.035em}}.cv-role{{font-size:{spec['role_pt']}pt;font-weight:500;line-height:18pt;color:var(--accent);margin-top:2mm!important}}.identity-context{{display:flex;align-items:center;gap:4mm;font-size:9pt;line-height:12pt;color:var(--muted);text-align:right}}.identity-context p span{{display:block}}.identity-mark{{width:7mm;height:7mm;flex:0 0 7mm;background:var(--accent);mask:url('assets/cv-window-mark.svg') center/contain no-repeat}}.cv-contact{{display:flex;justify-content:space-between;align-items:center;gap:2.5mm;margin-top:4mm;font-size:{spec['contact_pt']}pt;line-height:13pt;color:#415748}}.cv-section{{margin-top:{spec['section_gap_pt']}pt}}.section-title{{font:600 {spec['section_pt']}pt/13pt Inter,Arial,sans-serif;color:var(--accent);letter-spacing:.075em;text-transform:uppercase;margin-bottom:5pt!important}}.job+.job{{margin-top:{spec['job_gap_pt']}pt}}.job[data-layout="index"]{{display:grid;grid-template-columns:{spec.get('job_label_mm',35)}mm minmax(0,1fr);gap:{spec.get('job_column_gap_mm',6)}mm}}.job-meta{{border-left:1.5pt solid #89a58c;padding-left:2.3mm}}.job-meta h3{{font-size:12pt;line-height:15.5pt;font-weight:600}}.job-meta time{{display:block;font-size:{spec['meta_pt']}pt;line-height:13pt;color:var(--muted);margin-top:2pt;white-space:nowrap}}.job-meta p{{font-size:{spec['meta_pt']}pt;line-height:13pt;color:var(--muted);margin-top:1pt}}.job-role-line{{display:flex;align-items:baseline;justify-content:space-between;gap:2mm;margin-bottom:2pt}}.job-role-line h4{{font-size:11pt;line-height:15pt;font-weight:600}}.job-role-line>span{{font-size:9pt;line-height:12pt;color:var(--muted);text-align:right}}.job-body ul{{padding:0 0 0 3.6mm;margin:0}}.job-body li{{padding-left:.2mm;margin:2pt 0 0}}.job-body li::marker{{color:#567b59;font-size:.75em}}.job-body li strong{{font-weight:600}}.job-progress{{margin-top:4pt!important;padding-left:3.8mm;font-size:10pt;line-height:13.5pt;color:#536759}}.job-progress>span{{font-weight:600;color:#315d40;margin-right:1.5mm}}.job-linear-heading{{display:flex;gap:3mm;align-items:baseline}}.job-linear-heading h3{{font-size:12.5pt;line-height:16pt;font-weight:600}}.job-linear-heading>strong{{font-size:11pt;font-weight:500}}.job-linear-heading time{{margin-left:auto;font-size:{spec['meta_pt']}pt;color:var(--muted)}}.job-linear-context{{font-size:{spec['meta_pt']}pt;line-height:13pt;color:var(--muted);margin-bottom:3pt!important}}.award-project{{display:grid;grid-template-columns:{spec.get('award_label_mm',22)}mm minmax(0,1fr);gap:4mm;align-items:start}}.award-result{{background:var(--accent);color:#f7f8ed;min-height:17mm;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.5mm;border-radius:2px}}.award-result>span{{font-size:7.5pt;line-height:9.5pt;text-transform:uppercase;letter-spacing:.12em}}.award-result>strong{{font:700 18pt/20pt Manrope,Arial,sans-serif}}.award-heading{{display:flex;justify-content:space-between;gap:3mm;align-items:baseline}}.award-heading h3{{font-size:11.5pt;line-height:15pt;font-weight:600}}.award-heading>span{{font-size:{spec['meta_pt']}pt;color:var(--muted)}}.award-scope{{font-size:10pt;line-height:14pt;color:#31573b;margin-top:1pt!important}}.award-contribution{{margin-top:3pt!important}}.skills-band{{display:grid;grid-template-columns:1.05fr 1.05fr 1fr;gap:4mm;padding-block:2.3mm;border-block:.5pt solid var(--rule)}}.skills-band h3{{font-size:9.5pt;line-height:13pt;font-weight:600;color:#365b40;margin-bottom:2pt!important}}.skills-band p{{font-size:10pt;line-height:13.5pt}}.education-grid{{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:8mm}}.education-item+.education-item,.training-item+.training-item{{margin-top:5pt}}.education-heading{{display:flex;justify-content:space-between;gap:3mm;align-items:baseline}}.education-heading h3,.training-item h3{{font-size:10pt;line-height:13pt;font-weight:600}}.education-heading>span{{font-size:9pt;line-height:12pt;color:var(--muted);white-space:nowrap}}.education-item p,.training-item p{{font-size:9.5pt;line-height:12.5pt;color:var(--muted)}}.training-item h3{{display:flex;justify-content:space-between;gap:2mm}}.training-item h3>span{{font-size:9pt;color:#59745a;font-weight:400}}.cv-footer{{margin-top:auto;padding-top:5pt;border-top:.5pt solid var(--rule);font-size:9.5pt;line-height:12pt;color:var(--muted)}}.design-notes{{padding:22px;background:#f8faf4;border:1px solid #bdccba;border-radius:6px;font-size:13px;line-height:1.7}}.design-notes h2{{font-size:18px;margin:0 0 12px}}.design-notes p{{margin:10px 0}}.design-notes a{{color:#285739}}body.annotated .cv-header,body.annotated .cv-section{{outline:1px dashed #8da896;outline-offset:3px}}@media(max-width:1100px){{.workspace{{grid-template-columns:1fr}}.design-notes{{max-width:794px;margin:auto}}}}@media(max-width:650px){{.studio{{padding:18px 8px}}.studio-header{{display:block;padding:0 12px}}.toolbar{{margin-top:12px}}}}
.resume-paper>*{{flex-shrink:0}}.job-progress{{font-size:{spec['body_pt']}pt;line-height:{spec['body_line_pt']}pt}}.identity-rule{{width:1pt;height:36pt;background:var(--accent);flex-shrink:0}}.education-grid{{padding-bottom:4pt}}.cv-nowrap{{white-space:nowrap}}
@page{{size:A4;margin:0}}@media print{{body{{background:#fff}}.studio{{max-width:none;margin:0;padding:0}}.studio-header,.design-notes{{display:none!important}}.workspace{{display:block}}.paper-scroll{{overflow:visible;padding:0}}.paper-stage{{width:auto!important;height:auto!important}}.resume-paper{{transform:none!important;box-shadow:none;margin:0;break-after:page}}.job,.award-project,.education-grid,.skills-band{{break-inside:avoid}}.section-title{{break-after:avoid}}}}
</style></head><body><main class="studio"><header class="studio-header"><div><a href="/studio/cv-results-2026-10-27/index.html">Copy and layout comparison</a><h1>CV · result-led edition</h1><p>Actual A4 layout · {e(spec['version'])}</p></div><div class="toolbar"><button id="fit" type="button" aria-pressed="true">Fit page</button><button id="guides" type="button" aria-pressed="false">Layout guides</button><button id="print" type="button">Print / PDF</button><button id="copy" type="button">Copy text</button></div></header><div class="workspace"><div class="paper-scroll" tabindex="0" aria-label="A4 CV preview"><div class="paper-stage"><article class="resume-paper" aria-label="Kwanho Kim CV">
<header class="cv-header"><div class="identity-row"><div><h1 class="cv-name">{e(content['name'])}</h1><p class="cv-role">{e(content['role'])}</p></div><div class="identity-context"><p>{''.join(f'<span>{e(domain)}</span>' for domain in content['domains'])}</p><span class="{mark}" aria-hidden="true"></span></div></div><div class="cv-contact"><span>{e(content['location'])}</span><a href="mailto:{e(content['email'])}">{e(content['email'])}</a><a href="{e(content['website'])}">kwanho.dev</a><a href="{e(content['linkedin'])}">linkedin.com/in/kwanhokim</a><a href="{e(content['github'])}">github.com/KKWANH</a></div></header>
<section class="cv-section"><h2 class="section-title">Experience</h2>{''.join(jobs)}</section>
<section class="cv-section"><h2 class="section-title">Team project &amp; award</h2>{''.join(projects)}</section>
<section class="cv-section"><h2 class="section-title">Technical skills</h2><div class="skills-band">{skills}</div></section>
<div class="cv-section education-grid"><section><h2 class="section-title">Education</h2>{education}</section><section><h2 class="section-title">Technical training</h2>{training}</section></div>
<footer class="cv-footer">{e(content['languages'])}</footer></article></div></div><aside class="design-notes"><h2>What changed</h2><p><strong>Result first.</strong> A resolved communication failure, usable log tools and visible camera state lead the experience copy.</p><p><strong>Work in progress stays explicit.</strong> The broader KLA recovery design is not presented as shipped.</p><p><strong>A purposeful accent.</strong> The real team/challenge result carries the colour field; the profession does not look like a button.</p><p><strong>One contact row.</strong> Name and role have different sizes; the duplicate contact block is removed.</p><p><a href="cv-copy.md">Matching CV text</a> · <a href="google-docs.md">Docs/Word guide</a> · <a href="design-values.json">Design values</a></p><p id="copy-status" role="status"></p></aside></div></main>
<script>
const paper=document.querySelector('.resume-paper'),stage=document.querySelector('.paper-stage'),scroller=document.querySelector('.paper-scroll');let fit=true;
function fitPaper(){{const scale=fit?Math.min(1,(scroller.clientWidth-24)/paper.offsetWidth):1;paper.style.setProperty('--paper-scale',String(scale));stage.style.width=paper.offsetWidth*scale+'px';stage.style.height=paper.offsetHeight*scale+'px';}}
document.getElementById('fit').addEventListener('click',function(){{fit=!fit;this.setAttribute('aria-pressed',String(fit));this.textContent=fit?'Fit page':'100% view';fitPaper();}});new ResizeObserver(fitPaper).observe(scroller);document.fonts.ready.then(fitPaper);fitPaper();
document.getElementById('guides').addEventListener('click',function(){{const value=document.body.classList.toggle('annotated');this.setAttribute('aria-pressed',String(value));}});
document.getElementById('print').addEventListener('click',()=>window.print());
document.getElementById('copy').addEventListener('click',async()=>{{try{{await navigator.clipboard.writeText(paper.innerText);document.getElementById('copy-status').textContent='CV text copied.';}}catch{{document.getElementById('copy-status').textContent='Select the CV text to copy it.';}}}});
</script></body></html>"""
