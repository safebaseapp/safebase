"""Rebuild point-size comparison artifacts from measured before/after PDFs."""
import pathlib,json,collections,fitz,hashlib
import os
os.environ.setdefault('MPLCONFIGDIR','/tmp/p13-matplotlib')
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
p=pathlib.Path(os.environ.get('P13_EVIDENCE_DIR','docs/p13-review/readability'));before=json.loads((p/'before-distributions.json').read_text())['results'];after=json.loads((p/'after-fonts.json').read_text())['results']
path=pathlib.Path('docs/p13-review/acceptance/sample-tr-hot-work-a4.pdf');doc=fitz.open(path);hist=collections.Counter();nonspace=0
for block in doc[0].get_text('dict')['blocks']:
 for line in block.get('lines',[]):
  for span in line['spans']:
   hist[round(span['size'],3)]+=sum(c.isprintable() for c in span['text']);nonspace+=sum(c.isprintable() and not c.isspace() for c in span['text'])
total=sum(hist.values());under=sum(n for s,n in hist.items() if s<6)
(p/'before-fonts.json').write_text(json.dumps({'file':str(path),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'pages':len(doc),'printableCharsIncludingSpaces':total,'nonWhitespaceChars':nonspace,'under6Chars':under,'under6Percent':under/total*100,'weightedMeanPt':sum(s*n for s,n in hist.items())/total,'histogram':dict(sorted(hist.items())),'method':'All str.isprintable characters including spaces. User file not supplied; 3004 character count is not claimed reproduced. Repository sample count is recorded with SHA256.'},indent=2)+'\n')
fig,axes=plt.subplots(2,2,figsize=(13,8),layout='constrained')
for row,size in enumerate(['a4','a3']):
 for col,(label,rows) in enumerate([('Before',before),('After',after)]):
  counts=collections.Counter()
  for r in rows:
   if r['file'].endswith(size+'.pdf'):
    for pt,n in r['histogram'].items():counts[float(pt)]+=n
  ax=axes[row,col];denom=sum(counts.values());ax.bar(list(counts),[n/denom*100 for n in counts.values()],width=.25,color='#0891b2' if col else '#64748b');ax.axvline(6,color='#dc2626',linestyle='--',label='6 pt');ax.axvline(8,color='#0284c7',linestyle=':',label='8 pt');ax.set(title=f'{label} / {size.upper()} / 30 PDFs',xlabel='Actual PDF font size (pt)',ylabel='Printable characters (%)',xlim=(0,36));ax.legend()
fig.savefig(p/'font-histograms.png',dpi=160);fig.savefig(p/'font-histograms.svg');plt.close(fig)
svg=p/'font-histograms.svg';svg.write_text('\n'.join(line.rstrip() for line in svg.read_text().splitlines()).rstrip()+'\n')
previous={r['file']:r for r in before};lines=['# Gerçek PDF punto karşılaştırması','', '15 poster × TR/EN × A4/A3; boşluklar dahil tüm yazdırılabilir karakterler. Boyutlar PyMuPDF span.size değerleridir.','', '| PDF | Önce <6 pt % | Sonra <6 pt % | Sonra minimum pt | Gövde minimum pt | Kritik minimum pt | Sayfa |','|---|---:|---:|---:|---:|---:|---:|']
for r in after:lines.append(f"| {r['file']} | {previous[r['file']]['under6Percent']:.2f} | {r['under6Percent']:.2f} | {r['minimumPt']:.3f} | {r['bodyMinimumPt']:.3f} | {r['criticalMinimumPt']:.3f} | {r['pages']} |")
(p/'FONT-MEASUREMENTS.md').write_text('\n'.join(lines)+'\n')
