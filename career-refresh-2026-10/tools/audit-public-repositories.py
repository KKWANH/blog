"""Review every public KKWANH repository using allowed public sources.

This reads metadata, trees, documentation, manifests and suitable source.
It never executes repository code or routes around the observed raw-Python
download restriction. Public output contains evidence paths, not file bodies.
"""
from pathlib import Path, PurePosixPath
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib, json, re, subprocess, sys, threading, urllib.request, urllib.error, urllib.parse

ROOT = Path(__file__).resolve().parents[1] / 'source/github-2026-10-27'
OUT = ROOT / 'full-audit'
HEADERS = {'User-Agent':'kwanho-public-repository-review','Accept':'application/vnd.github+json'}
RESTRICTED_EXTENSIONS = {'.py'}  # observed Zscaler restriction; do not bypass
LOCK = threading.Lock()

TECH = {
 'cpp':('C++','languages'), 'c':('C','languages'), 'python':('Python','languages'),
 'javascript':('JavaScript','web'), 'typescript':('TypeScript','web'),
 'csharp':('C#','languages'), 'java':('Java','languages'), 'shell':('Shell','languages'),
 'asm':('x86-64 ASM','languages'), 'php':('PHP','web'), 'html':('HTML','web'), 'css':('CSS','web'),
 'react':('React','web'), 'nextjs':('Next.js','web'), 'django':('Django','web'),
 'flask':('Flask','web'), 'fastify':('Fastify','web'), 'nestjs':('NestJS','web'),
 'express':('Express','web'), 'vite':('Vite','tools'), 'tailwind':('Tailwind CSS','web'),
 'motion':('Motion','web'), 'threejs':('Three.js','web'), 'supabase':('Supabase','tools'),
 'postgres':('PostgreSQL','tools'), 'sqlite':('SQLite','tools'), 'prisma':('Prisma','tools'),
 'redis':('Redis','tools'), 'qt':('Qt / QML','web'), 'unity':('Unity','design'),
 'qml':('QML','web'), 'dbus':('D-Bus','systems'), 'can':('CAN bus','systems'),
 'ros':('ROS','systems'), 'carla':('CARLA','systems'), 'sockets':('Sockets','systems'),
 'kqueue':('kqueue','systems'), 'pthreads':('Pthreads','systems'), 'posix':('POSIX APIs','systems'),
 'websocket':('WebSocket','systems'), 'rest':('REST','systems'), 'docker':('Docker','tools'),
 'compose':('Docker Compose','tools'), 'nginx':('NGINX','tools'), 'mariadb':('MariaDB','tools'),
 'mysql':('MySQL','tools'), 'wordpress':('WordPress','web'), 'linux':('Linux','tools'),
 'make':('Make','tools'), 'qmake':('qmake','tools'), 'cmake':('CMake','tools'),
 'git':('Git','tools'), 'github-actions':('GitHub Actions','tools'),
 'azure':('Azure','tools'), 'bicep':('Bicep','tools'), 'raspberrypi':('Raspberry Pi','systems'),
 'arduino':('Arduino','systems'), 'numpy':('NumPy','data'), 'pandas':('Pandas','data'),
 'matplotlib':('Matplotlib','data'), 'seaborn':('Seaborn','data'), 'scipy':('SciPy','data'),
 'sklearn':('scikit-learn','data'), 'mne':('MNE','data'), 'torch':('PyTorch','data'),
 'tensorflow':('TensorFlow','data'), 'opencv':('OpenCV','data'), 'jupyter':('Jupyter','data'),
 'pillow':('Pillow','data'), 'pygame':('Pygame','design'), 'selenium':('Selenium','tools'),
 'pyautogui':('PyAutoGUI','tools'), 'playwright':('Playwright','tools'), 'vitest':('Vitest','tools'),
 'jest':('Jest','tools'), 'zustand':('Zustand','web'), 'socketio':('Socket.IO','systems'),
 'bootstrap':('Bootstrap','web'), 'sass':('Sass','web'), 'jquery':('jQuery','web'),
 'minilibx':('MiniLibX','design'), 'raycasting':('Raycasting','practice'),
 'oauth':('OAuth','systems'), 'electron':('Electron','tools'), 'zod':('Zod','web'),
 'maplibre':('MapLibre','web'), 'yolo':('YOLO','data'), 'velocitas':('Velocitas','systems'),
}
EXTENSIONS = {
 '.cpp':'cpp','.cc':'cpp','.cxx':'cpp','.hpp':'cpp','.c':'c','.py':'python',
 '.js':'javascript','.jsx':'javascript','.ts':'typescript','.tsx':'typescript',
 '.cs':'csharp','.java':'java','.sh':'shell','.bash':'shell','.s':'asm','.asm':'asm',
 '.php':'php','.html':'html','.htm':'html','.css':'css','.scss':'sass','.qml':'qml',
 '.bicep':'bicep','.ipynb':'jupyter',
}
DEPENDENCIES = {
 'react':'react','react-dom':'react','next':'nextjs','typescript':'typescript',
 'django':'django','flask':'flask','fastify':'fastify','express':'express',
 'vite':'vite','tailwindcss':'tailwind','framer-motion':'motion','motion':'motion',
 'three':'threejs','pg':'postgres','postgres':'postgres','better-sqlite3':'sqlite',
 'sqlite3':'sqlite','prisma':'prisma','@prisma/client':'prisma','redis':'redis',
 'ioredis':'redis','numpy':'numpy','pandas':'pandas','matplotlib':'matplotlib',
 'seaborn':'seaborn','scipy':'scipy','scikit-learn':'sklearn','sklearn':'sklearn',
 'mne':'mne','torch':'torch','torchvision':'torch','tensorflow':'tensorflow',
 'opencv-python':'opencv','pillow':'pillow','pygame':'pygame','selenium':'selenium',
 'pyautogui':'pyautogui','python-can':'can','dbus-python':'dbus','pyqt5':'qt',
 'pyqt6':'qt','pyside2':'qt','pyside6':'qt','playwright':'playwright',
 '@playwright/test':'playwright','vitest':'vitest','jest':'jest','zustand':'zustand',
 'socket.io':'socketio','socket.io-client':'socketio','ws':'websocket',
 'bootstrap':'bootstrap','sass':'sass','jquery':'jquery','electron':'electron',
 'zod':'zod','maplibre-gl':'maplibre',
}
PATTERNS = {
 'qt':r'\bQt(?:5|6|Quick|Widgets|Gui|Qml)?\b|#\s*include\s*[<"][Qq][A-Z]',
 'dbus':r'\bD-?Bus\b|QDBus', 'can':r'(?-i:\bCAN\b)|socketcan|python-can',
 'ros':r'\bROS\s*[12]?\b|\brospy\b|\brclpy\b', 'carla':r'\bCARLA\b',
 'sockets':r'\bsocket\s*\(|\bSOCK_STREAM\b', 'kqueue':r'\bkqueue\s*\(|\bkevent\s*\(',
 'pthreads':r'\bpthread_(?:create|mutex|join)', 'posix':r'\b(?:fork|execve|dup2|pipe)\s*\(',
 'websocket':r'\bWebSockets?\b', 'rest':r'(?-i:\bREST(?:ful)?\b)',
 'docker':r'\bDocker\b', 'compose':r'docker[- ]compose', 'nginx':r'\bnginx\b',
 'mariadb':r'\bMariaDB\b', 'mysql':r'\bMySQL\b', 'wordpress':r'\bWordPress\b',
 'postgres':r'\bPostgreSQL\b|\bPostgres\b', 'sqlite':r'\bSQLite\b',
    'linux':r'\b(?:Linux|Ubuntu|Debian|Alpine)\b', 'qmake':r'\bqmake\b',
    'git':r'\bgit\s+(?:clone|checkout|commit|push|pull)\b',
 'cmake':r'\bCMake\b', 'azure':r'\bAzure\b|Microsoft\.(?:Web|Storage|Sql|Resources)',
 'raspberrypi':r'\bRaspberry\s*Pi\b|\bRPi\b', 'arduino':r'\bArduino\b',
 'unity':r'\bUnityEngine\b|\bUnity(?:\s*3D)?\b',
 'numpy':r'\bNumPy\b|\bimport\s+numpy\b', 'pandas':r'\bPandas\b|\bimport\s+pandas\b',
 'matplotlib':r'\bmatplotlib\b', 'seaborn':r'\bseaborn\b', 'scipy':r'\bSciPy\b',
 'sklearn':r'\bscikit-learn\b|\bsklearn\b', 'mne':r'\bMNE\b',
 'torch':r'\bPyTorch\b|\bimport\s+torch\b', 'tensorflow':r'\bTensorFlow\b',
 'opencv':r'\bOpenCV\b|\bimport\s+cv2\b', 'minilibx':r'\bMiniLibX\b|\bmlx_[a-z_]+\s*\(',
 'raycasting':r'\bray[- ]?cast(?:ing)?\b', 'oauth':r'\bOAuth\s*2?\b',
 'nextjs':r'\bNext\.?js\b', 'react':r'\bReact(?:\.js|JS)?\b',
 'django':r'\bDjango\b', 'supabase':r'\bSupabase\b', 'tailwind':r'\bTailwind\b',
 'velocitas':r'\bVelocitas\b', 'yolo':r'\bYOLO(?:v\d+)?\b',
}


def request(url, api=False):
    headers=HEADERS if api else {'User-Agent':'Mozilla/5.0'}
    with urllib.request.urlopen(urllib.request.Request(url,headers=headers),timeout=45) as response:
        return response.read(15_000_000 if api else 2_000_000),dict(response.headers)


def excluded(path):
    lower='/'+path.lower()
    return any(x in lower for x in ['/node_modules/','/vendor/','/library/','/packagecache/',
        '/.git/','/obj/','/bin/','/build/','/dist/','/cgibinary/','/yarn.lock','/package-lock.json',
        '/pnpm-lock.yaml','/.env','/credentials','/secrets','/private.key'])


def context(repo):
    name=repo['name']
    if name=='ai-assistant':return 'ai-directed','AI-directed/configured project; implementation expertise is not inferred.'
    if name=='blog':return 'profile','Owner-directed portfolio with AI-assisted implementation.'
    if name=='ColorSavesLife':return 'project','Owner-confirmed team project; challenge award and bounded contribution.'
    if name in ['KKWANH','_projects']:return 'profile','Profile/project index.'
    if repo['size']==0:return 'empty','Empty repository.'
    if repo['fork'] and not name.startswith('SEAME-Warmup'):return 'reference','Fork/reference; personal implementation is not established by the fork.'
    if name.startswith(('42','SEAME','DES','python-module','python_piscine','CPP_','azure-')) or name in [
        'ft_containers','webserv','cub3d_kkim','ft_printf','libasm','libasm_dogeTESTER',
        'ft_linear_regression','dslr','multilayer_perception','total-perspective-vortex',
        'AlgorithmNotes','ErrDayAlgorithm','BoncheonAlgorithm','velocitas-first-app','MarioThread']:
        return 'learning','Learning/team project; inspect the stated contribution and source.'
    if name=='QuantumPang2':return 'learning','Early Unity menu/scene prototype; broad gameplay implementation is not established.'
    return 'project','Repository project; listed technologies describe its code, not a proficiency rating.'


def candidates(paths, reference):
    usable=[p for p in paths if not excluded(p)]
    readmes=sorted([p for p in usable if PurePosixPath(p).name.lower() in ['readme.md','readme.rst','readme.txt','readme']],key=lambda p:(p.count('/'),len(p)))
    manifests=[];dependency_files=[]
    for path in usable:
        base=PurePosixPath(path).name.lower()
        if base=='package.json' or re.search(r'requir.*(?:\.txt)?$',base) or base in ['pyproject.toml','pipfile','setup.cfg','environment.yml','environment.yaml']:
            dependency_files.append(path)
        if base in ['package.json','requirements.txt','pyproject.toml','pipfile','setup.cfg','environment.yml',
                    'environment.yaml','cmakelists.txt','makefile','dockerfile','docker-compose.yml',
                    'docker-compose.yaml','compose.yaml','compose.yml','.gitmodules','projectversion.txt'] or path.endswith(('.pro','.csproj','.gradle','.bicep')):
            manifests.append(path)
    manifests.sort(key=lambda p:(p.count('/'),len(p)))
    source=sorted([p for p in usable if PurePosixPath(p).suffix.lower() in EXTENSIONS and PurePosixPath(p).suffix.lower() not in ['.py','.ipynb','.css','.scss','.html','.htm']],key=lambda p:(1 if any(s in p.lower() for s in ['test','example','demo']) else 0,0 if any(s in p.lower() for s in ['main.','app.','index.','scripts/','srcs/']) else 1,p.count('/'),len(p)))
    chosen=list(dict.fromkeys(readmes[:1]+dependency_files[:12]+manifests[:(3 if reference else 6)]+([] if reference else source[:4])))
    if not chosen:
        chosen=[p for p in usable if p.lower() in ['index.html','_config.yml','index.md']][:2]
    return chosen


def audit(repo):
    name=repo['name'];scope,note=context(repo)
    result={'name':name,'url':repo['html_url'],'fork':repo['fork'],'scope':scope,'scopeNote':note,
            'description':repo.get('description') or '', 'updatedAt':repo['pushed_at'],
            'defaultBranch':repo['default_branch'],'sources':[],'limitations':[],'technologies':[]}
    if scope=='empty':
        result.update(status='empty',commit=None,fileCount=0);return result
    refs=subprocess.run(['git','ls-remote',repo['clone_url'],'refs/heads/'+repo['default_branch']],
                        capture_output=True,text=True,timeout=60,check=True).stdout.split()
    if not refs:
        result.update(status='empty',commit=None,fileCount=0);return result
    sha=refs[0];result['commit']=sha
    caches=[OUT/(name+'-tree.json'),ROOT/(name+'-tree.json')]
    cached=next((json.loads(path.read_text(encoding='utf-8')) for path in caches if path.exists()),None)
    if cached and cached.get('commit')==sha:
        tree=cached['tree'];depth=cached.get('depth','recursive')
    else:
        recursive=not(repo['fork'] and repo['size']>10000)
        url=f'https://api.github.com/repos/KKWANH/{name}/git/trees/{sha}'+('?recursive=1' if recursive else '')
        raw,_=request(url,True);tree=json.loads(raw);depth='recursive' if recursive else 'root'
    (OUT/(name+'-tree.json')).write_text(json.dumps({'repo':name,'commit':sha,'depth':depth,'tree':tree},ensure_ascii=False),encoding='utf-8')
    paths=[entry['path'] for entry in tree.get('tree',[]) if entry['type']=='blob'];usable=[p for p in paths if not excluded(p)]
    result['fileCount']=len(paths);result['treeDepth']=depth
    old_review=OUT/(name+'-review.json')
    may_reuse=old_review.exists() and json.loads(old_review.read_text(encoding='utf-8')).get('commit')==sha
    if tree.get('truncated'):result['limitations'].append('Tree response was truncated.')
    tech={}
    def add(key,path,basis):
        if key not in TECH:return
        tech.setdefault(key,[])
        evidence={'path':path,'basis':basis}
        if evidence not in tech[key] and len(tech[key])<3:tech[key].append(evidence)
    for path in usable:
        suffix=PurePosixPath(path).suffix.lower()
        if suffix in EXTENSIONS:add(EXTENSIONS[suffix],path,'source-file presence')
        base=PurePosixPath(path).name.lower()
        if base=='makefile':add('make',path,'build file')
        if base=='cmakelists.txt':add('cmake',path,'build file')
        if suffix=='.pro':add('qmake',path,'build file')
        if base=='dockerfile':add('docker',path,'container configuration')
        if base in ['docker-compose.yml','docker-compose.yaml','compose.yaml','compose.yml']:add('compose',path,'service configuration')
        if '/.github/workflows/' in '/'+path:add('github-actions',path,'workflow file')
    blocked_python=[p for p in usable if p.lower().endswith('.py')]
    if blocked_python:
        result['limitations'].append('Raw .py downloads are restricted by the corporate security gateway; accessible documentation/manifests are reviewed instead.')
    chosen=candidates(paths,scope=='reference')
    prior_observations=ROOT/'selected-file-observations.json'
    if prior_observations.exists():
        prior=json.loads(prior_observations.read_text(encoding='utf-8'))
        chosen=list(dict.fromkeys(chosen+[item['path'] for item in prior if item['repo']==name and not item.get('error') and f'/{sha}/' in item.get('url','')]))
    for path in chosen:
        suffix=PurePosixPath(path).suffix.lower()
        if suffix in RESTRICTED_EXTENSIONS:
            result['limitations'].append(f'{path}: source download not retried after a corporate gateway restriction.')
            continue
        url=f'https://raw.githubusercontent.com/KKWANH/{name}/{sha}/{urllib.parse.quote(path)}'
        try:
            file=OUT/'files'/f'{name}--{path.replace("/","__")}.txt'
            if may_reuse and file.exists():
                data=file.read_bytes()
            else:
                data,headers=request(url)
            if len(data)>=2_000_000:
                result['limitations'].append(f'{path}: too large for the selected text review.');continue
            text=data.decode('utf-8','replace')
            file.write_text(text,encoding='utf-8')
            result['sources'].append({'path':path,'url':f'https://github.com/KKWANH/{name}/blob/{sha}/{urllib.parse.quote(path)}','bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
            base=PurePosixPath(path).name.lower()
            basis='README declaration' if base.startswith('readme') else 'manifest/configuration' if base in ['package.json','requirements.txt','pyproject.toml','pipfile','setup.cfg','environment.yml','docker-compose.yml','dockerfile'] else 'inspected source'
            if base=='package.json':
                try:
                    package=json.loads(text)
                    for dependency in list(package.get('dependencies',{}))+list(package.get('devDependencies',{})):
                        key=DEPENDENCIES.get(dependency.lower())
                        if key:add(key,path,'direct dependency')
                        if dependency.startswith('@supabase/'):add('supabase',path,'direct dependency')
                        if dependency.startswith('@nestjs/'):add('nestjs',path,'direct dependency')
                except (ValueError,TypeError):pass
            if re.search(r'requir.*(?:\.txt)?$',base) or base in ['pyproject.toml','pipfile','setup.cfg','environment.yml','environment.yaml']:
                for package,key in DEPENDENCIES.items():
                    if re.search(r'(?<![a-z0-9_-])'+re.escape(package)+r'(?![a-z0-9_-])',text,re.I):add(key,path,'declared Python dependency')
            for key,pattern in PATTERNS.items():
                if re.search(pattern,text,re.I):add(key,path,basis)
        except urllib.error.HTTPError as error:
            server=error.headers.get('Server','')
            result['limitations'].append(f'{path}: HTTP {error.code}'+(' from corporate security gateway' if 'Zscaler' in server else ''))
            if 'Zscaler' in server:
                with LOCK:RESTRICTED_EXTENSIONS.add(suffix)
        except Exception as error:
            result['limitations'].append(f'{path}: {type(error).__name__}')
    result['technologies']=[{'id':key,'label':TECH[key][0],'group':TECH[key][1],'evidence':evidence} for key,evidence in sorted(tech.items())]
    result['status']='reviewed-limited' if result['limitations'] else 'reviewed'
    if not result['sources']:
        result['status']='tree-only'
        result['limitations'].append('No selected text file was readable; technology evidence is limited to the tree.')
    (OUT/(name+'-review.json')).write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    return result


def review(repo):
    try:
        return audit(repo)
    except Exception as error:
        scope,note=context(repo)
        return {'name':repo['name'],'url':repo['html_url'],'scope':scope,'scopeNote':note,
                'status':'unresolved','sources':[],'technologies':[],'limitations':[f'{type(error).__name__}: {str(error)[:160]}']}


def main():
    if '--resume' in sys.argv:
        repos=json.loads((OUT/'inventory.json').read_text(encoding='utf-8'))
    else:
        raw,_=request('https://api.github.com/users/KKWANH/repos?type=owner&sort=updated&per_page=100',True)
        repos=json.loads(raw)
    if len(repos)==100:raise RuntimeError('Pagination required; do not call a partial page a complete inventory.')
    (OUT/'inventory.json').write_text(json.dumps(repos,ensure_ascii=False,indent=2),encoding='utf-8')
    results=[]
    with ThreadPoolExecutor(max_workers=3) as pool:
        for i,result in enumerate(pool.map(review,repos),1):
            results.append(result)
            (OUT/'catalogue-progress.json').write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding='utf-8')
            print(f'{i}/{len(repos)} {result["name"]}: {result["status"]}, {len(result["sources"])} inspected files, {len(result["technologies"])} technologies',flush=True)
    summary={'observedAt':datetime.now(timezone.utc).isoformat(),'owner':'KKWANH','count':len(repos),
             'reviewedCount':len(results),'repositories':results,'technologyDefinitions':{key:{'label':value[0],'group':value[1]} for key,value in TECH.items()}}
    (OUT/'catalogue.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'count':len(results),'with_sources':sum(bool(r['sources']) for r in results),'empty':sum(r['status']=='empty' for r in results),'limited':sum(r['status']=='reviewed-limited' for r in results),'technologies':len({t['id'] for r in results for t in r['technologies']})},indent=2),flush=True)


if __name__=='__main__':
    main()
