import sys, json
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.pdf-tools'))
import fitz

root = Path(__file__).resolve().parents[1]
work = root / '.brochure-work'
work.mkdir(exist_ok=True)
doc = fitz.open(r'C:\Users\saiteja\Downloads\Brochure (1).pdf')
all_text = []
report = []
for i, page in enumerate(doc):
    txt = page.get_text()
    all_text.append(f'\n--- PAGE {i+1} ---\n{txt}')
    page.get_pixmap(matrix=fitz.Matrix(1.2,1.2)).save(work / f'page-{i+1}.png')
    report.append({'page': i+1, 'size': list(page.rect), 'images': [{'xref': img[0], 'width':img[2], 'height':img[3]} for img in page.get_images()]})
(work / 'text.txt').write_text(''.join(all_text), encoding='utf-8')
(work / 'report.json').write_text(json.dumps(report,indent=2))
print(''.join(all_text))
print(json.dumps(report))
