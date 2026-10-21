from pathlib import Path
import sys
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root/'.pdf-tools'))
import pymupdf as pdf
page=pdf.open(root/'public/assets/venu-arcade-brochure.pdf')[3]
# Exact regions of the specification page, measured on its 1.2x preview.
regions={
    'spec-project-name':(0,405,356,587),
    'spec-buddha':(367,405,627,587),
    'spec-brand-panel':(1127,0,1376,198),
    'spec-family':(1098,736,1429,901),
}
for name,box in regions.items():
    page.get_pixmap(matrix=pdf.Matrix(2,2),clip=pdf.Rect([v/1.2 for v in box])).save(root/f'public/assets/{name}.jpg',jpg_quality=94)
print('Extracted four original specification-page artwork regions.')
