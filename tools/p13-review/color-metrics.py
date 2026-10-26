"""Actual 170dpi PDF raster color area before/after, full 60 output matrix."""
import pathlib,json,fitz,numpy as np
from PIL import Image
p=pathlib.Path('docs/p13-review/final-revision');before=pathlib.Path('/tmp/p13-colour-before');after=pathlib.Path('/tmp/p13-final');rows=[]
for f in sorted(after.glob('*.pdf')):
 row={'file':f.name}
 for phase,directory in [('before',before),('after',after)]:
  doc=fitz.open(directory/f.name);pix=doc[0].get_pixmap(matrix=fitz.Matrix(170/72,170/72),alpha=False);im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples);hsv=np.asarray(im.convert('HSV'));fraction=float(((hsv[:,:,1]>100)&(hsv[:,:,2]>65)).mean()*100);row[phase+'SaturatedPercent']=fraction
  im.thumbnail((1400,2000));im.save(p/(phase+'-'+f.stem+'.webp'),lossless=True,method=4)
  if phase=='after' and f.name in ['tr-hot-work-safety-rules-a4.pdf','en-hot-work-safety-rules-a3.pdf']:im.convert('L').save(p/('grayscale-'+f.stem+'.webp'),lossless=True,method=4)
 row['result']='PASS' if row['afterSaturatedPercent']>row['beforeSaturatedPercent'] else 'FAIL';rows.append(row);print(row,flush=True)
(p/'color-results.json').write_text(json.dumps({'results':rows,'method':'Each actual single-page PDF rasterized at 170dpi. Pillow 8-bit HSV: S>100/255, V>65/255. Baseline exact SHA 4186391a31ae4fbcb455df56f1b4aa16d9526a8d. User files not provided; percentages are not claimed identical. Color percentage alone is not acceptance: contrast, labels, grayscale, geometry and font gates also apply.'},indent=2)+'\n')
assert len(rows)==60 and all(r['result']=='PASS' for r in rows)
