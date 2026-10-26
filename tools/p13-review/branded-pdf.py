import pathlib,json,fitz,subprocess,hashlib,unicodedata,re
from qr import decode
p=pathlib.Path('docs/p13-review/final-revision');out=[];posters=json.loads(pathlib.Path('docs/p13-review/definitions-before.json').read_text())
def norm(s,locale):
 if locale=='tr':s=s.replace('İ','i').replace('I','ı')
 return re.sub(r'\s+',' ',unicodedata.normalize('NFC',s).casefold()).strip()
for file in sorted(pathlib.Path('/tmp/p13-final-branded').glob('*.pdf')):
 locale=file.name[:2];code=file.stem[3:-3];poster=next(x for x in posters if x['code']==code);doc=fitz.open(file);text=' '.join(page.get_text() for page in doc);raster='/tmp/p13-branded-qr-'+file.stem
 subprocess.run(['pdftoppm','-f','1','-singlefile','-scale-to','2500','-png',str(file),raster],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);qr=decode(raster+'.png');title=norm(poster['title'][locale],locale) in norm(text,locale);good=title and len(doc)==1 and f'https://sernem.com/{locale}/posters' in qr and '2026-10-26' in text and '2.0' in text and '�' not in text
 out.append({'file':file.name,'result':'PASS' if good else 'FAIL','title':title,'qr':qr,'pages':len(doc),'sha256':hashlib.sha256(file.read_bytes()).hexdigest()});print(out[-1],flush=True)
(p/'branded-pdf-results.json').write_text(json.dumps({'results':out,'scope':'60 local PDFs, actual Master with synthetic company logo; current print header visible, QR decoded. Not real customer auth/storage or physical print.'},indent=2)+'\n');assert len(out)==60 and all(r['result']=='PASS' for r in out)
