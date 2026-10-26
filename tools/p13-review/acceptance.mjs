import fs from'node:fs';import assert from'node:assert/strict';import{execFileSync}from'node:child_process';
const dir=process.env.P13_PDF_DIR||'/tmp/p13-acceptance',out=process.env.P13_EVIDENCE_DIR||'docs/p13-review/acceptance',results=[];
const topics={
 'hot-work-safety-rules':{tr:['35 ft','daha uzakta','ABD OSHA','en az 30 dakika','gözcü gereken','daha uzun','kısaltma'],en:['35 ft','beyond this distance','US OSHA','at least 30 minutes','requiring a watch','stricter local','do not shorten']},
 'working-at-height-rules':{tr:['5.000 lb (22,2 kN)','VEYA','bağımsız','güvenlik katsayısı en az 2','nitelikli kişi gözetiminde tasarla, kur ve kullan','≥6 ft'],en:['5,000 lb (22.2 kN)','OR the alternative','independent','safety factor of at least 2','designed, installed and used','qualified person','≥6 ft']},
 'ladder-safety-rules':{tr:['çalışma uzunluğunun dörtte biri','≥3 ft','rijit desteğe','VE tutamak'],en:['one-quarter of working length','≥3 ft','rigid support AND','grasping device']},
 'scaffold-safety-rules':{tr:['kendi ağırlığına','4×','kullanım yükünü artırma izni değildir','1 in (2,5 cm)','İstisnaları','>2 ft'],en:['own weight plus','4×','not permission to increase','1 in (2.5 cm)','exceptions','>2 ft']},
 'excavation-safety-rules':{tr:['≥4 ft','25 ft (7,62 m)','2 ft (0,61 m)','Alternatif','stabil kaya','<5 ft','yetkin kişi'],en:['≥4 ft','25 ft (7.62 m)','2 ft (0.61 m)','Alternatively','stable rock','<5 ft','competent person']},
 'fire-safety-rules':{tr:['≤75 ft','≤50 ft','görsel kontrol','bakım kontrolü','eğitim ayrı','1910.157(d)','tahliye planı istisnalarını'],en:['≤75 ft','≤50 ft','visual inspection','maintenance check','training is a separate','1910.157(d)','evacuation-plan exemptions']},
 'confined-space-entry-rules':{tr:['19,5–23,5%','>10% LFL','tek başına izin değildir','izin sınırında'],en:['19.5–23.5%','>10% LFL','not an entry permit','permit limits']},
 'loto-golden-rules':{tr:['≥1/YIL','uygulayandan farklı yetkili çalışan'],en:['≥1/YEAR','authorized employee other than the user']}
};
function norm(s,locale){return s.replace(/([–-])\s+/g,'$1').replace(/\s+/g,' ').normalize('NFC').toLocaleLowerCase(locale==='tr'?'tr-TR':'en-US')}
for(const [slug,locales]of Object.entries(topics))for(const locale of ['tr','en'])for(const size of ['a4','a3']){
 const file=`${dir}/${locale}-${slug}-${size}.pdf`,text=norm(execFileSync('pdftotext',['-raw',file,'-'],{encoding:'utf8'}),locale),missing=locales[locale].filter(phrase=>!text.includes(norm(phrase,locale)));results.push({slug,locale,size,result:missing.length?'FAIL':'PASS',missing});console.log(results.at(-1));
}
fs.writeFileSync(out+'/mandatory-content-results.json',JSON.stringify({results,note:'Regression of scoped mandatory content actually present in PDFs. Text matches are not independent verification of current law. Official network sources remain NOT VERIFIED.'},null,2)+'\n');assert.ok(results.every(r=>r.result==='PASS'));
