"""Deterministic real QR encoding with installed ReportLab; URLs from one canonical JSON."""
import json,pathlib,hashlib
from PIL import Image,ImageDraw
from reportlab.graphics.barcode import qrencoder
from qr import decode
root=pathlib.Path('app/public');targets=json.loads(pathlib.Path('app/lib/posters-v2/qr-targets.json').read_text());rows=[]
for locale,t in targets.items():
 q=qrencoder.QRCode(None,qrencoder.QRErrorCorrectLevel.M);q.addData(t['url']);q.make();n=len(q.modules);border=4;scale=24;side=n+2*border;im=Image.new('RGB',(side*scale,side*scale),'white');draw=ImageDraw.Draw(im);paths=[]
 for y,row in enumerate(q.modules):
  for x,dark in enumerate(row):
   if dark:
    a,b=x+border,y+border;draw.rectangle((a*scale,b*scale,(a+1)*scale-1,(b+1)*scale-1),fill='black');paths.append(f'M{a} {b}h1v1h-1z')
 png=root/t['png'].lstrip('/');svg=root/t['svg'].lstrip('/');im.save(png,optimize=True)
 svg.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {side} {side}" width="{side*scale}" height="{side*scale}" shape-rendering="crispEdges"><rect width="{side}" height="{side}" fill="#fff"/><path d="{"".join(paths)}" fill="#000"/></svg>\n')
 assert decode(png)==[t['url']]
 rows.append({'locale':locale,'target':t['url'],'modules':n,'quietZoneModules':border,'errorCorrection':'M','pngPixels':side*scale,'png':str(png),'svg':str(svg),'decoded':decode(png),'sha256':hashlib.sha256(png.read_bytes()).hexdigest()})
pathlib.Path('docs/p13-review/qr-fix/assets.json').write_text(json.dumps({'encoder':'ReportLab QRCode, real encoded matrix, no image synthesis','results':rows},indent=2)+'\n')
