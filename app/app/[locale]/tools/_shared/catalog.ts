export type ToolId = 'risk-matrix'|'trir'|'ltifr'|'severity-rate'|'dart'|'sling-tension'|'noise-exposure'|'man-hours'|'heat-stress';
export const calculators: {id:ToolId; title:[string,string]; description:[string,string]; kind:'lagging'|'operational'}[] = [
 {id:'risk-matrix',title:['5×5 Risk Matrisi','5×5 Risk Matrix'],description:['Olasılık × şiddet; başlangıç ve kalan risk.','Likelihood × severity; initial and residual risk.'],kind:'operational'},
 {id:'trir',title:['TRIR','TRIR'],description:['Kaydedilebilir vakalar / 200.000 saat.','Recordable cases / 200,000 hours.'],kind:'lagging'},
 {id:'ltifr',title:['LTIFR','LTIFR'],description:['Kayıp zamanlı yaralanmalar / 1.000.000 saat.','Lost-time injuries / 1,000,000 hours.'],kind:'lagging'},
 {id:'severity-rate',title:['Şiddet Oranı','Severity Rate'],description:['Kayıp iş günleri / 200.000 saat.','Lost workdays / 200,000 hours.'],kind:'lagging'},
 {id:'dart',title:['DART','DART'],description:['İşten uzak kalma, kısıtlı iş veya görev değişimi vakaları.','Days away, restricted work or job transfer cases.'],kind:'lagging'},
 {id:'sling-tension',title:['Sapan Açısı ve Gerilimi','Sling Angle & Tension'],description:['Simetrik iki kollu statik kaldırmada kol kuvveti.','Leg force for a symmetric two-leg static lift.'],kind:'operational'},
 {id:'noise-exposure',title:['Gürültü Maruziyeti','Noise Exposure'],description:['NIOSH 85 dBA / 8 saat ve 3 dB değişim oranı.','NIOSH 85 dBA / 8 hours and 3 dB exchange rate.'],kind:'operational'},
 {id:'man-hours',title:['Adam-Saat','Man-Hours'],description:['Vardiya, fazla mesai, mola ve devamsızlık saatleri.','Shifts, overtime, breaks and absence hours.'],kind:'operational'},
 {id:'heat-stress',title:['Isı Stresi / WBGT','Heat Stress / WBGT'],description:['Ölçülen WBGT ile saha taraması; tahmini WBGT üretmez.','Screen measured WBGT; does not invent WBGT estimates.'],kind:'operational'},
];
export const planning = [
 {href:'/tools/simops',title:['SIMOPS Planlayıcı','SIMOPS Planner']},
 {href:'/tools/quick-risk-assessment',title:['HIRARC Risk Analizi','HIRARC Risk Assessment']},
 {href:'/tools/method-statement',title:['Çalışma Yöntemi (Method Statement)','Method Statement']},
 {href:'/safety-pack',title:['Saha Güvenlik Paketi','Safety Pack']},
 {href:'/ppe-standards',title:['KKD Standartları','PPE Standards']},
];
export const newTools:ToolId[]=['dart','sling-tension','noise-exposure','man-hours','heat-stress'];
export const sources = {
 dart:'https://www.bls.gov/iif/overview/compute-nonfatal-incidence-rates.htm',
 sling:'https://www.osha.gov/safe-sling-use/tables-figures',
 noise:'https://www.cdc.gov/niosh/docs/98-126/pdfs/criteriadoc_98-126.pdf',
 heat:'https://www.osha.gov/heat-exposure/hazards',
 hours:'https://www.bls.gov/iif/overview/compute-nonfatal-incidence-rates.htm',
};
