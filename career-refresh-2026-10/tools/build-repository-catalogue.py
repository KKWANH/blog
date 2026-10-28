"""Create the public, source-linked catalogue without copying repository bodies."""
from pathlib import Path
import json,re

ROOT=Path(__file__).resolve().parents[1]
AUDIT=ROOT/'source/github-2026-10-27/full-audit'
# Historical full-audit exporter. For incremental current refreshes use npm run skills:sync.
DEST=Path(r'C:\Projects\blog\contents\about\repositories.generated.json')
data=json.loads((AUDIT/'catalogue.json').read_text(encoding='utf-8'))
aliases={'sockets':'http','posix':'processes','pthreads':'threads','qml':'qt'}
labels={'http':'HTTP / sockets','processes':'Unix processes','threads':'Threads & mutexes','qt':'Qt / QML'}
extra={
 'postgres':('PostgreSQL','tools',r'\bpsycopg2(?:-binary)?\b'),
 'bootstrap':('Bootstrap','web',r'\bdjango-bootstrap[34]\b'),
 'gunicorn':('Gunicorn','tools',r'\bgunicorn\b'),
 'gazebo':('Gazebo','systems',r'\bGazebo\b'),
 'ollama':('Ollama','tools',r'\bOllama\b'),
 'pydantic':('Pydantic','tools',r'\bpydantic\b'),
 'ccxt':('CCXT','tools',r'\bccxt\b'),
}
repos=[]
for item in data['repositories']:
    technologies={}
    for tech in item['technologies']:
        key=aliases.get(tech['id'],tech['id'])
        record=technologies.setdefault(key,{'id':key,'label':labels.get(key,tech['label']),'group':tech['group'],'evidence':[]})
        for evidence in tech['evidence']:
            if evidence not in record['evidence'] and len(record['evidence'])<3:record['evidence'].append(evidence)
    for source in item['sources']:
        file=AUDIT/'files'/f'{item["name"]}--{source["path"].replace("/","__")}.txt'
        text=file.read_text(encoding='utf-8')
        for key,(label,group,pattern) in extra.items():
            if re.search(pattern,text,re.I):
                record=technologies.setdefault(key,{'id':key,'label':label,'group':group,'evidence':[]})
                evidence={'path':source['path'],'basis':'declared dependency / project documentation'}
                if evidence not in record['evidence'] and len(record['evidence'])<3:record['evidence'].append(evidence)
    scope=item['scope'];note=item['scopeNote']
    if item['name']=='MarioThread':note='Learning/team adaptation of a credited upstream Qt racing project.'
    if item['name'].startswith('azure-') or item['name']=='velocitas-first-app':note='Learning/template repository; technology presence is not a production-expertise claim.'
    if item['name']=='AutoTrader-Template':note='Template-based project; dependencies describe its stack.'
    if item['name']=='QuantumPang':scope='learning';note='Earlier Unity/C# project practice.'
    if item['name']=='test_repository':scope='learning';note='Small Java exercises/sandbox.'
    limits=[]
    if item['limitations']:
        limits.append('Accessible documentation/configuration and available source were reviewed. Some source files could not be inspected.')
    repos.append({
        'name':item['name'],'url':item['url'],'description':item['description'],
        'scope':scope,'scopeNote':note,'status':item['status'],
        'commit':item.get('commit'),'updatedAt':item['updatedAt'],
        'sources':[{'path':s['path'],'url':s['url']} for s in item['sources']],
        'limitations':limits,'technologies':sorted(technologies.values(),key=lambda t:t['label'].casefold()),
    })
inventory=json.loads((AUDIT/'inventory.json').read_text(encoding='utf-8'))
assert {r['name'] for r in repos}=={r['name'] for r in inventory}
assert all(r['status'] in ['reviewed','reviewed-limited','empty'] for r in repos)
assert all(r['sources'] or r['status']=='empty' for r in repos)
catalogue={'reviewedAt':data['observedAt'],'count':len(repos),'inspectedFiles':sum(len(r['sources']) for r in repos),'repositories':repos}
DEST.write_text(json.dumps(catalogue,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'repositories':len(repos),'inspectedFiles':catalogue['inspectedFiles'],'technologyIds':len({t['id'] for r in repos for t in r['technologies']}),'bytes':DEST.stat().st_size},indent=2))
