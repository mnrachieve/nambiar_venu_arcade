import sys, shutil
from pathlib import Path
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root/'.pdf-tools'))
import pymupdf as pdf
doc=pdf.open(r'C:\Users\saiteja\Downloads\Brochure (1).pdf')
assets=root/'public'/'assets'
assets.mkdir(parents=True,exist_ok=True)
# Regions are expressed against the reviewed 1.2x page previews.
regions=[('exterior-day',1,(6,210,1160,964)),('exterior-evening',4,(6,210,1160,964)),('landscape',3,(0,0,713,398)),('entrance',3,(0,598,713,985)),('terrace',5,(14,14,1198,546)),('exterior-angle',5,(850,551,1448,954)),('location-map',6,(101,109,608,628))]
for name,index,coords in regions:
    clip=pdf.Rect([v/1.2 for v in coords])
    pix=doc[index].get_pixmap(matrix=pdf.Matrix(2,2),clip=clip)
    pix.save(assets/f'{name}.jpg',jpg_quality=90)
doc[2].get_pixmap(matrix=pdf.Matrix(2.5,2.5)).save(assets/'floor-plan.jpg',jpg_quality=95)
doc[3].get_pixmap(matrix=pdf.Matrix(1.6,1.6)).save(assets/'specifications.jpg',jpg_quality=92)
shutil.copyfile(r'C:\Users\saiteja\Downloads\Brochure (1).pdf',assets/'venu-arcade-brochure.pdf')
shutil.copyfile(r'C:\Users\saiteja\Downloads\WhatsApp Image 2026-10-07 at 5.15.28 PM.jpeg',assets/'mnr-logo.jpg')
print('Exported brochure imagery, floor plan, location map, PDF and original logo.')
