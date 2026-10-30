"""Independent artifact QA: PDF size/page count, PNG pixels, full artifact QR decode."""
import pathlib,json,sys,hashlib
import fitz
from PIL import Image
sys.path.insert(0,'tools/safety-signs-pack')
from qr import decode
out=pathlib.Path('docs/safety-signs-pack/evidence');results=[]
for f in sorted(pathlib.Path('/tmp/signs-exports').glob('*')):
 mode,locale,rest=f.name.split('-',2);slug,tail=rest.rsplit('-',1);fmt=tail.split('.')[0];target=f'https://www.sernem.com/{locale}/safety-signs/{slug}'
 scans=[];ok=True;pages=None;dims=None
 if f.suffix=='.pdf':
  doc=fitz.open(f);pages=len(doc);dims=list(doc[0].rect);expect=(595.28,841.89) if fmt=='a4' else (841.89,1190.55)
  ok=pages==1 and abs(doc[0].rect.width-expect[0])<2 and abs(doc[0].rect.height-expect[1])<2
  for dpi in [100,170]:
   pix=doc[0].get_pixmap(matrix=fitz.Matrix(dpi/72,dpi/72),alpha=False);p=f'/tmp/signs-scan-{f.stem}-{dpi}.png';pix.save(p);values=decode(p);scans.append({'dpi':dpi,'decoded':values,'expected':[] if mode=='premium' else [target]});ok=ok and values==([] if mode=='premium' else [target]);pathlib.Path(p).unlink()
 else:
  im=Image.open(f);dims=list(im.size);values=decode(f);scans.append({'dpi':'native 2480x3508','decoded':values});ok=dims==[2480,3508] and values==([] if mode=='premium' else [target])
 results.append({'file':f.name,'result':'PASS' if ok else 'FAIL','pages':pages,'dimensions':dims,'scans':scans,'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
 if not ok:print('FAIL',f.name,scans,flush=True)
print(len(results),'artifacts',sum(r['result']=='PASS' for r in results),'PASS',flush=True)
(out/'artifacts.json').write_text(json.dumps({'results':results,'method':'PyMuPDF full PDF page at 100/170 DPI and native full PNG; Zbar, no crop, upscale or retry. Physical phone/printer NOT TESTED. Clean files must decode no QR.'},indent=2)+'\n')
assert len(results)==432 and all(r['result']=='PASS' for r in results)
