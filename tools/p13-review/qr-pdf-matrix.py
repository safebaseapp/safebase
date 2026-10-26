"""Strict full-page QR checks at 170 and 100 DPI, no crop/upscale or retries."""
import pathlib,json,fitz,hashlib
from qr import decode
out=pathlib.Path('docs/p13-review/qr-fix');targets=json.loads(pathlib.Path('app/lib/posters-v2/qr-targets.json').read_text());results=[]
for mode,folder in [('standard','/tmp/p13-qr'),('branded','/tmp/p13-final-branded')]:
 files=sorted(pathlib.Path(folder).glob('*.pdf'));assert len(files)==60,(mode,len(files))
 for file in files:
  doc=fitz.open(file);locale=file.name[:2];scans=[]
  for dpi in [170,100]:
   pix=doc[0].get_pixmap(matrix=fitz.Matrix(dpi/72,dpi/72),alpha=False);path=f'/tmp/p13-qr-scan-{mode}-{file.stem}-{dpi}.png';pix.save(path);values=decode(path);scans.append({'dpi':dpi,'pixels':[pix.width,pix.height],'decoded':values,'result':'PASS' if values==[targets[locale]['url']] else 'FAIL'})
  images=[]
  for image in doc[0].get_images(full=True):
   if image[2]!=888 or image[3]!=888:continue
   for rect in doc[0].get_image_rects(image[0]):images.append({'totalMm':rect.width*25.4/72,'coreMm':rect.width*25.4/72*29/37,'square':abs(rect.width-rect.height)<.01})
  good=len(doc)==1 and all(x['result']=='PASS' for x in scans) and len(images)==1 and images[0]['square'] and images[0]['coreMm']>=18
  r={'mode':mode,'file':file.name,'pages':len(doc),'target':targets[locale]['url'],'scans':scans,'qrPhysicalSize':images,'sha256':hashlib.sha256(file.read_bytes()).hexdigest(),'result':'PASS' if good else 'FAIL'};results.append(r);print(mode,file.name,r['result'],images,flush=True)
(out/'qr-pdf-results.json').write_text(json.dumps({'results':results,'method':'Independent Zbar decoder, each full page rendered by PyMuPDF at 170 and 100 DPI. No crops, upscale, retries or relaxed thresholds. QR image dimensions extracted from PDF image matrices; black matrix 29/37 of full asset. Physical phone/printer NOT TESTED.'},indent=2)+'\n');assert len(results)==120 and all(r['result']=='PASS' for r in results)
