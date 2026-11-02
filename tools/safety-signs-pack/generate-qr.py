"""Deterministic local QR assets; ReportLab encoder + independent Zbar decode."""
import json,pathlib,hashlib,sys
from PIL import Image,ImageDraw
from reportlab.graphics.barcode import qrencoder
sys.path.insert(0,str(pathlib.Path(__file__).resolve().parent))
from qr import decode
root=pathlib.Path('app/public/safety-signs/qr');rows=[]
slugs=json.loads(pathlib.Path('docs/safety-signs-pack/evidence/baseline.json').read_text())['slugs']
for locale in ['tr','en']:
 (root/locale).mkdir(parents=True,exist_ok=True)
 for slug in slugs:
  url=f'https://www.sernem.com/{locale}/safety-signs/{slug}'
  q=qrencoder.QRCode(None,qrencoder.QRErrorCorrectLevel.M);q.addData(url);q.make();n=len(q.modules);border=4;scale=12;side=n+8
  im=Image.new('RGB',(side*scale,side*scale),'white');draw=ImageDraw.Draw(im)
  for y,row in enumerate(q.modules):
   for x,dark in enumerate(row):
    if dark:draw.rectangle(((x+4)*scale,(y+4)*scale,(x+5)*scale-1,(y+5)*scale-1),fill='black')
  file=root/locale/(slug+'.png');im.save(file,optimize=True);assert decode(file)==[url]
  rows.append({'locale':locale,'slug':slug,'target':url,'modules':n,'quietZoneModules':4,'pixels':side*scale,'sha256':hashlib.sha256(file.read_bytes()).hexdigest(),'result':'PASS'})
pathlib.Path('docs/safety-signs-pack/evidence/qr-assets.json').write_text(json.dumps({'encoder':'ReportLab M, four-module white quiet zone; Zbar independent decoder','results':rows},indent=2)+'\n')
print(len(rows),'QR assets PASS')
