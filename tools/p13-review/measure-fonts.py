"""Actual PDF span measurements; no CSS-size assumptions in the acceptance gate."""
import pathlib,json,collections,fitz,sys
pdfDir=pathlib.Path(sys.argv[1]);out=pathlib.Path(sys.argv[2]);results=[]
for path in sorted(pdfDir.glob('*.pdf')):
 doc=fitz.open(path);hist=collections.Counter();bodySizes=[];criticalSizes=[];badAlpha=[]
 rectanglesPath=path.with_suffix('.rects.json');roles=json.loads(rectanglesPath.read_text()) if rectanglesPath.exists() else None
 spans=[]
 for page in doc:
  for block in page.get_text('dict')['blocks']:
   for line in block.get('lines',[]):
    for span in line['spans']:
     n=sum(c.isprintable() for c in span['text']);size=span['size'];hist[round(size,3)]+=n
     if not n:continue
     spans.append({'text':span['text'],'size':size,'bbox':span['bbox']})
     if span.get('alpha',255)!=255:badAlpha.append(span['text'])
     if roles and any(c.isalnum() for c in span['text']):
      x0,y0,x1,y1=span['bbox'];x,y=(x0+x1)/2,(y0+y1)/2
      for name,target in [('body',bodySizes),('critical',criticalSizes)]:
       if any(r['x']-.5<=x<=r['right']+.5 and r['y']-.5<=y<=r['bottom']+.5 for r in roles[name]):target.append(size)
 total=sum(hist.values());under=sum(n for s,n in hist.items() if s<6);minBody=min(bodySizes) if bodySizes else None;minCritical=min(criticalSizes) if criticalSizes else None
 expectedSize=(595,842) if path.stem.endswith('a4') else (842,1191)
 dimensionOK=abs(doc[0].rect.width-expectedSize[0])<2 and abs(doc[0].rect.height-expectedSize[1])<2
 good=dimensionOK and len(doc)==1 and under==0 and not badAlpha and minBody is not None and minBody>=8 and minCritical is not None and minCritical>=7.5
 results.append({'file':path.name,'result':'PASS' if good else 'FAIL','pages':len(doc),'dimensionsMatch':dimensionOK,'pageSizePt':list(doc[0].rect),'printableChars':total,'under6Chars':under,'under6Percent':under/total*100 if total else None,'weightedMeanPt':sum(s*n for s,n in hist.items())/total if total else None,'minimumPt':min(hist) if hist else None,'bodyMinimumPt':minBody,'criticalMinimumPt':minCritical,'histogram':dict(sorted(hist.items())),'nonOpaqueText':badAlpha})
 print(path.name,results[-1]['result'],'min',min(hist),'body',minBody,'critical',minCritical,'under6',under,flush=True)
out.write_text(json.dumps({'results':results,'method':'PyMuPDF span.size weighted by all str.isprintable characters, including spaces. Body/critical roles mapped by text-span centers to actual print-media DOM rectangles in PDF points; no font-size exclusion. Threshold: one page, no character below 6pt, body >=8pt and safety/legal/PPE text >=7.5pt, no non-opaque text. A4 and A3 measured separately.'},indent=2)+'\n')
assert len(results)==60,len(results)
assert all(r['result']=='PASS' for r in results)
