"""Bundle app templates and write ordinary, independent CSS section files."""
import json
import re
from pathlib import Path

root = Path(__file__).resolve().parent

def compile_css(source):
    definitions = dict(re.findall(r'(--[\w-]+)\s*:\s*([^;]+);', source))
    css = re.sub(r'--[\w-]+\s*:[^;]+;', '', source)
    css = re.sub(r'var\((--[\w-]+)\)', lambda m: definitions[m[1]].strip(), css)
    css = re.sub(r'rgb\(255\s+255\s+255\s*/\s*([\d.]+)%\)', lambda m: 'rgba(255, 255, 255, '+str(float(m[1])/100).rstrip('0').rstrip('.')+')', css)
    css = re.sub(r'background:\s*(rgba\([^;]+\));', r'background-color: \1;', css)
    css = re.sub(r'calc\(-1\s*\*\s*([\d.]+)(px|rem|em)\)', lambda m: '-'+m[1]+m[2], css)
    css = re.sub(r'[^{}]+\{\s*\}', '', css)
    return re.sub(r'\n\s*\n', '\n', css).strip()+'\n'

entries = json.loads((root / 'catalog.json').read_text()) + json.loads((root / 'applied-catalog.json').read_text())
for entry in entries:
    entry['html'] = (root / (entry['id'] + '.html')).read_text()
    entry['css'] = (root / 'templates' / (entry['id'] + '.css')).read_text()
    if '<script' in entry['html'].lower() or 'onclick=' in entry['html'].lower():
        raise ValueError('Examples must work without JavaScript: ' + entry['id'])
    simple = compile_css(entry['css'])
    assert '--ex-' not in simple and 'var(' not in simple
    (root / (entry['id'] + '.css')).write_text(simple)
(root / 'sections.json').write_text(json.dumps(entries, ensure_ascii=False) + '\n')
print(f"Bundled {len(entries)} HTML/CSS sections with plain exported CSS.")
