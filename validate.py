from pathlib import Path
from bs4 import BeautifulSoup
import json,re,sys
root=Path(__file__).parent
errors=[]
notes=[]

# Required files
required=['index.html','styles.css','app.js','manifest.webmanifest','sw.js','.nojekyll','assets/alicia-original.webp','assets/alicia-fortachona.webp','icons/icon-180.png','icons/icon-192.png','icons/icon-512.png']
for f in required:
    if not (root/f).exists(): errors.append(f'Falta {f}')

html=(root/'index.html').read_text(encoding='utf-8')
soup=BeautifulSoup(html,'lxml')
ids=[tag.get('id') for tag in soup.find_all(attrs={'id':True})]
dups=sorted({i for i in ids if ids.count(i)>1})
if dups: errors.append(f'IDs duplicados: {dups}')

# Local refs in HTML
for tag,attr in [('link','href'),('script','src'),('img','src'),('source','srcset')]:
    for node in soup.find_all(tag):
        ref=node.get(attr)
        if not ref or ref.startswith(('http://','https://','#','data:')): continue
        ref=ref.split()[0].split('?')[0].replace('./','')
        if not (root/ref).exists(): errors.append(f'Referencia rota en HTML: {ref}')

# Every hard-coded qs('#id') has a matching DOM id
js=(root/'app.js').read_text(encoding='utf-8')
for domid in sorted(set(re.findall(r"qs\('#([^']+)'",js))):
    if domid not in ids: errors.append(f'JS referencia ID inexistente: #{domid}')

# Manifest valid and icon files exist
try:
    manifest=json.loads((root/'manifest.webmanifest').read_text())
    for icon in manifest.get('icons',[]):
        p=icon['src'].replace('./','')
        if not (root/p).exists(): errors.append(f'Icono manifest inexistente: {p}')
    if manifest.get('display')!='standalone': errors.append('Manifest no está en modo standalone')
except Exception as e:
    errors.append(f'Manifest inválido: {e}')

# Service worker listed assets exist
sw=(root/'sw.js').read_text()
for ref in re.findall(r"'\./([^']+)'",sw):
    if ref and not (root/ref).exists(): errors.append(f'SW cachea archivo inexistente: {ref}')

# Basic feature presence
checks={
    'PWA manifest':'rel="manifest"',
    'Service worker registration':'serviceWorker.register',
    'Local persistence':'localStorage',
    'Export backup':'export-data',
    'Weight chart':'weight-chart',
    'Calorie calculator':'calculateCalories',
    'Recipes dataset':'const recipes = [',
    '3 bodyweight workouts':"id: 'base-c'",
    'Band phase':"id: 'band-c'",
}
for name,needle in checks.items():
    corpus=html+js
    if needle not in corpus: errors.append(f'Falta feature: {name}')
    else: notes.append(name)

# Count recipes/workouts from source
recipe_count=len(re.findall(r"\{id:'r\d+'",js))
base_count=len(re.findall(r"id: 'base-[abc]'",js))
band_count=len(re.findall(r"id: 'band-[abc]'",js))
if recipe_count!=12: errors.append(f'Se esperaban 12 recetas; hay {recipe_count}')
if base_count!=3: errors.append(f'Se esperaban 3 entrenos base; hay {base_count}')
if band_count!=3: errors.append(f'Se esperaban 3 entrenos bandas; hay {band_count}')

print('VALIDATION REPORT')
print('-----------------')
print(f'HTML IDs: {len(ids)} (duplicates: {len(dups)})')
print(f'Recipes: {recipe_count}')
print(f'Bodyweight workouts: {base_count}')
print(f'Band workouts: {band_count}')
print(f'Checks passed: {len(notes)}')
if errors:
    print('\nERRORS:')
    for e in errors: print('-',e)
    sys.exit(1)
print('\nPASS: static integrity checks completed without errors.')
