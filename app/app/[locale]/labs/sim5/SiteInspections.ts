export type SiteInspection = {
 id:string;scenarioId:string;location:[number,number,number];level:number;
 visibleEvidence:[string,string];hazardType:string;requiredControls:[string,string][];
 question:[string,string];questionTR:string;questionEN:string;
 answers:[[string,string],[string,string]];correct:number;correctAnswer:number;
 explanation:[string,string];explanationTR:string;explanationEN:string;
 inspectionRadius:number;completed:boolean;
};
function inspection(id:string,location:[number,number,number],level:number,evidence:[string,string],hazardType:string,question:[string,string],answers:[[string,string],[string,string]],correct:number,explanation:[string,string],requiredControls:[string,string][],inspectionRadius=6):SiteInspection {
 return {id,scenarioId:id,location,level,visibleEvidence:evidence,hazardType,requiredControls,question,questionTR:question[0],questionEN:question[1],answers,correct,correctAnswer:correct,explanation,explanationTR:explanation[0],explanationEN:explanation[1],inspectionRadius,completed:false};
}
export const siteInspections:Record<string,SiteInspection>={
 leak:inspection('leak',[22,1,-20],0,['Flanştan damlama ve yerde sıvı birikimi','Dripping flange and pooled liquid'],'loss-of-containment',
 ['Tank sahasında şüpheli sızıntı var. İlk adım?','Suspected tank-yard leak. First action?'],
 [['Alanı izole et, güvenli mesafeden bildir','Isolate the area and report from a safe distance'],['Sızıntının kaynağına yaklaş','Approach the leak source']],0,
 ['Bilinmeyen salıma yaklaşma; acil müdahale prosedürünü başlat.','Do not approach an unknown release; initiate the emergency response procedure.'],[['İzolasyon ve bildirim','Isolation and reporting']]),
 hotwork:inspection('hotwork',[-22,1,-5],0,['Aktif kaynak, yakında yanıcı variller ve görevli bulunmayan yangın gözcüsü noktası','Active welding, nearby combustible drums and an unstaffed fire-watch station'],'hot-work',
 ['Kaynak sürüyor; yanıcı variller yakında ve yangın gözcüsü yok. Ne yaparsın?','Welding is active; combustible drums are nearby and no fire watch is present. What do you do?'],
 [['Yangın söndürücü ile işe başla','Start with a fire extinguisher'],['İşi durdur, izin ve gaz ölçümünü doğrula','Stop work and verify permit and gas testing']],1,
 ['İşi durdur; yanıcıları uzaklaştır veya koru. İzni, gerekli atmosfer testini ve görevlendirilmiş yangın gözcüsünü doğrulamadan yeniden başlatma.','Stop work; remove or protect combustibles. Verify the permit, required atmosphere testing and a designated fire watch before restarting.'],[['Yanıcı kontrolü, izin ve yangın gözcüsü','Combustible control, permit and fire watch']]),
 lifting:inspection('lifting',[-22.8,2.6,47],0,['İki sapanla dengeli boru, açık ayaklar, kapalı yük alanı ve dışarıdaki işaretçi','Balanced two-sling pipe, deployed outriggers, enclosed load area and signaller outside'],'lifting',
 ['Bariyer dışından kaldırmayı inceliyorsun. Hangi kontrol doğrulanmalı?','You are inspecting the lift from outside the barrier. Which controls must be verified?'],
 [['Bariyer varken sapan ve işaretçi kontrolü gerekmez','A barrier makes rigging and signaller checks unnecessary'],['Kaldırma planı, sapanlar, zemin/ayaklar ve işaretçi iletişimi','Lift plan, rigging, ground/outriggers and signaller communication']],1,
 ['Bariyer dışında kal. Yük kapasitesi ve ağırlık merkezi, uygun sapan açıları, zemin/ayak desteği ve tek yetkili işaretçiyle iletişimi doğrula.','Remain outside the barrier. Verify capacity and centre of gravity, suitable sling angles, ground/outrigger support and communication with the designated signaller.'],[['Plan, donanım, ayak desteği ve iletişim','Plan, rigging, outrigger support and communication']],6.5),
 access:inspection('access',[19.5,1,-5],0,['İşaretli erişimi kapatan paletler ve kasa','Pallets and crate obstructing the marked access'],'blocked-access',
 ['Acil çıkış güzergâhı engellenmiş. Ne yaparsın?','An emergency route is obstructed. What do you do?'],
 [['Engeli güvenle kaldırttır ve erişimi doğrula','Arrange safe removal and verify access'],['Vardiya sonunu bekle','Wait until the end of the shift']],0,
 ['Acil kaçış yolları sürekli açık tutulmalıdır. Paletlere tırmanma; açık yan yaklaşımı kullan ve engelin kontrollü kaldırılmasını bildir.','Emergency escape routes must remain clear. Do not climb the pallets; use the clear side approach and arrange controlled removal.'],[['Güzergâhın açık tutulması','Clear access route']]),
 droppedTool:inspection('droppedTool',[57.8,11.24,-24.1],1,['Korkuluk kenarında sabitlenmemiş anahtar; topuk levhası yok','Unsecured spanner beside the guardrail; no toe board'],'dropped-object',
 ['Üst platform kenarında sabitlenmemiş alet ve eksik topuk levhası var. Doğru kontrol?','An unsecured tool is beside the upper-platform edge and the toe board is missing. Correct controls?'],
 [['Aleti sabitle, uygun kenar tutmasını sağla ve alt bölgeyi izole et','Secure the tool, provide suitable edge containment and isolate the area below'],['Korkuluk olduğu için aleti bırak','Leave the tool because a guardrail is present']],0,
 ['Korkuluk insan düşmesini sınırlar; küçük aletlerin düşmesini tek başına önlemez. Aleti emniyete al, topuk levhası/eşdeğer tutma ve alt seviye kontrolünü sağla.','Guardrails limit falls of people; they do not alone contain small tools. Secure the tool, provide toe boards or equivalent containment and control the area below.'],[['Alet sabitleme, kenar tutma ve alt bölge kontrolü','Tool restraint, edge containment and control below']],2.4),
 materials:inspection('materials',[51.5,11.24,-26.55],1,['Dar üst yürüyüş yolunda açık kutudaki küçük bağlantı parçaları','Small fittings in an open container on the narrow elevated walkway'],'work-at-height-housekeeping',
 ['Korkuluklu üst yürüyüş yolunda küçük parçalar açık kutuda. Ne yaparsın?','Small fittings are in an open container on a guarded elevated walkway. What do you do?'],
 [['Herkese koşulsuz emniyet kemeri taktırıp parçaları bırak','Require harnesses unconditionally and leave the fittings'],['Parçaları kapalı kutuya al, geçişi açık tut; düşme korumasını işe göre değerlendir','Contain fittings in a closed box, keep access clear and assess fall protection for the task']],1,
 ['Kapalı malzeme kabı ve düzen düşen cisimleri önler. Tam korkuluklu alanda kemer otomatik bir zorunluluk değildir; kenara erişim veya korkuluk sökümü gibi koşullar ayrı değerlendirilir.','Closed storage and housekeeping prevent dropped objects. Harnesses are not automatically required within fully guarded areas; edge access or guardrail removal requires a task-specific assessment.'],[['Kapalı kap ve açık erişim','Closed container and clear access']],2.2)
};
/** The camera represents eyes, while hazard levels are defined by the walking surface. */
export function canInspectAt(h:SiteInspection,p:{x:number;y:number;z:number}){
 const feet=p.y-1.7;
 if(h.level===1&&feet<8.5)return false;
 if(h.level===0&&feet>1)return false;
 return Math.hypot(p.x-h.location[0],p.y-h.location[1],p.z-h.location[2])<h.inspectionRadius;
}
