import pathlib,json,subprocess,xml.etree.ElementTree as ET,re,hashlib,os
from PIL import Image,ImageDraw
from qr import decode
afterDir=pathlib.Path(os.environ.get('P13_PDF_DIR','/tmp/p13-after'))
evidence=pathlib.Path(os.environ.get('P13_EVIDENCE_DIR','docs/p13-review'))
beforeDir=pathlib.Path(os.environ.get('P13_BEFORE_PDF_DIR','/tmp/p13-before'))
rasterPrefix='/tmp/p13-'+evidence.name+'-raster-'
rows=[]
posters=json.loads(pathlib.Path('docs/p13-review/definitions-before.json').read_text())
slugFiles={'scaffold-safety-rules':'scaffold.ts','hot-work-safety-rules':'hot-work.ts','confined-space-entry-rules':'confined-space.ts','electrical-safety-rules':'electrical.ts','loto-golden-rules':'loto.ts','fire-safety-rules':'fire.ts','mandatory-ppe':'ppe.ts'}
def norm(text,locale):
 if locale=='tr':text=text.replace('İ','i').replace('I','ı')
 return re.sub(r'\s+',' ',text.casefold()).strip()

for pdf in sorted(afterDir.glob('*.pdf')):
 locale=pdf.name.split('-')[0];expected=f'https://sernem.com/{locale}/posters';bbox=subprocess.check_output(['pdftotext','-bbox',str(pdf),'-'],text=True);tree=ET.fromstring(bbox);violations=[]
 for page in tree.iter():
  if page.tag.endswith('page'):
   w,h=float(page.attrib['width']),float(page.attrib['height'])
   for word in page.iter():
    if word.tag.endswith('word'):
     a=word.attrib
     if float(a['xMin'])<0 or float(a['yMin'])<0 or float(a['xMax'])>w+.5 or float(a['yMax'])>h+.5:violations.append(word.text)
 image=rasterPrefix+pdf.stem
 subprocess.run(['pdftoppm','-f','1','-singlefile','-scale-to','2500','-png',str(pdf),image],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
 qr=decode(image+'.png');slug=pdf.stem[3:-3];file=slugFiles.get(slug,slug.removesuffix('-rules')+'.ts');poster=next(p for p in posters if p['file']==file);text=subprocess.check_output(['pdftotext','-layout',str(pdf),'-'],text=True);titlePresent=norm(poster['title'][locale],locale) in norm(text,locale);good=not violations and expected in qr and titlePresent and not re.search('NaN|Infinity|�',text)
 rows.append({'file':pdf.name,'result':'PASS' if good else 'FAIL','qrDecoded':qr,'expectedQr':expected,'titleAndLocaleGlyphs':titlePresent,'outOfPageWords':violations,'textCharacters':len(text),'sha256':hashlib.sha256(pdf.read_bytes()).hexdigest()})
 print(rows[-1],flush=True)
assert len(rows)==60,len(rows)
(evidence/'pdf-results.json').write_text(json.dumps({'results':rows,'note':'All 15 topics × TR/EN × A4/A3. Page count/dimensions in after-fonts.json (readability matrix) and DOM text clipping in browser-results.json; this test independently checks PDF text bounds and decodes each rendered QR at 2500px. No claim of physical printer or phone-camera testing.'},indent=2)+'\n')
assert all(x['result']=='PASS' for x in rows)

# Deterministic before/after evidence from real browser-produced PDFs, without screenshot-scroll artefacts.
for phase in ['before','after']:
 for locale in ['tr','en']:
  for slug in (['working-at-height-rules','hot-work-safety-rules','ladder-safety-rules','scaffold-safety-rules','excavation-safety-rules','fire-safety-rules','confined-space-entry-rules','loto-golden-rules'] if evidence.name=='acceptance' else [p.stem[3:-3] for p in sorted(afterDir.glob(locale+'-*-a4.pdf'))] if evidence.name=='readability' else ['housekeeping-safety-rules','working-at-height-rules','chemical-safety-rules']):
   source=str((beforeDir if phase=='before' else afterDir)/f'{locale}-{slug}-a4.pdf')
   output=str(evidence/f'{phase}-{locale}-{slug}')
   subprocess.run(['pdftoppm','-f','1','-singlefile','-scale-to','1400','-png',source,output],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
for locale in ['tr','en']:
 overview=Image.new('RGB',(1200,1100),'#cbd5e1');draw=ImageDraw.Draw(overview)
 for i,pdf in enumerate(sorted(afterDir.glob(locale+'-*-a4.pdf'))):
  image=Image.open(rasterPrefix+pdf.stem+'.png').convert('RGB');image.thumbnail((220,320));x=(i%5)*240+10;y=(i//5)*365+22;overview.paste(image,(x,y));draw.text((x,y-15),pdf.name[3:-7],fill='#0f172a')
 overview.save(evidence/f'after-{locale}-overview.jpg',quality=90)
