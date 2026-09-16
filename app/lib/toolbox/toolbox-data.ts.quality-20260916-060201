export type ToolboxLocale = "tr" | "en";

export type ToolboxLocalizedContent = {
  title?: string;
  subtitle?: string;
  application_subtitle?: string;
  duration?: string;
  objective_title?: string;
  objective?: unknown;
  explanation_title?: string;
  explanation?: unknown;
  scenario_title?: string;
  scenario?: unknown;
  remember_title?: string;
  remember?: unknown;
  hazards_title?: string;
  hazards?: unknown;
  controls_title?: string;
  controls?: unknown;
  supervisor_title?: string;
  supervisor_script?: unknown;
  questions_title?: string;
  questions?: unknown;
  verification_title?: string;
  verification?: unknown;
  attendance_title?: string;
  fields?: unknown;
  table_headers?: unknown;
  notes_title?: string;
  footer?: unknown;
  [key: string]: unknown;
};

export type ToolboxRecord = {
  slug: string;
  sourceFile: string;
  base: string;
  tr: ToolboxLocalizedContent;
  en: ToolboxLocalizedContent;
};

export const toolboxData = [
  {
    "slug": "chemical-safety",
    "sourceFile": "chemical_safety.py",
    "base": "chemical-safety-toolbox-talk",
    "tr": {
      "title": "KİMYASAL GÜVENLİĞİ TOOLBOX TALK",
      "subtitle": "Maruziyet, sıçrama, yangın ve uygunsuz depolama risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Kimyasalların kullanımı, taşınması, depolanması ve bertarafı sırasında oluşabilecek soluma, cilt ve göz teması, yangın, reaksiyon, dökülme ve çevresel maruziyet risklerini değerlendirmek; işe başlamadan önce SDS, etiket, KKD, havalandırma ve acil durum düzenlemelerinin uygunluğunu doğrulamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Kimyasalın tehlikesi yalnızca kokusundan veya görünümünden anlaşılamaz. İşe başlamadan önce ürün etiketi ve Güvenlik Bilgi Formu incelenmeli; tehlikeler, maruziyet yolları, uygun KKD, ilk yardım ve dökülme müdahalesi öğrenilmelidir.",
        "Kimyasallar yalnızca orijinal veya uygun şekilde etiketlenmiş kaplarda tutulmalıdır. Etiketsiz kaplar, içecek şişeleri veya uyumsuz kaplar ciddi karışıklık, yanlış kullanım ve tehlikeli reaksiyon riskleri oluşturur.",
        "Uygun eldiven seçimi kimyasalın türüne bağlıdır. Her eldiven her kimyasala karşı koruma sağlamaz. Havalandırma, gözlük veya yüz siperi, koruyucu giysi ve solunum koruması SDS ve risk değerlendirmesine göre belirlenmelidir."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan temizlik kimyasalını etiketsiz küçük bir kaba aktardı. Kabın içinde daha önce farklı bir kimyasal bulunmuştu.",
        "İki ürün reaksiyona girerek sıcaklık ve tahriş edici buhar oluşturdu. Çalışan uygun gözlük ve eldiven kullanmadığı için sıçramaya maruz kaldı.",
        "Olay; orijinal veya etiketli kap kullanımı, SDS kontrolü, uyumluluk değerlendirmesi ve doğru KKD seçimiyle tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Etiketi okunmayan, içeriği bilinmeyen veya uygunluğu doğrulanmamış bir kimyasalı kullanmayın. İşi durdurun ve yetkili kişiye bildirin.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Kimyasalın solunması, yutulması veya cilt tarafından emilmesi.",
        "Göz ve cilde sıçrama sonucu yanık veya tahriş.",
        "Yanıcı sıvı, buhar veya aerosollerin tutuşması.",
        "Uyumsuz kimyasalların karıştırılması.",
        "Etiketsiz veya yanlış etiketlenmiş kaplar.",
        "Yetersiz havalandırma ve buhar birikmesi.",
        "Dökülme, sızıntı ve çevresel kirlenme.",
        "Kimyasal atıkların yanlış kapta biriktirilmesi."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "İşe başlamadan önce güncel SDS'yi inceleyin.",
        "Ürün etiketini ve GHS piktogramlarını doğrulayın.",
        "Kimyasala uygun eldiven, gözlük ve koruyucu giysi kullanın.",
        "Gerekli havalandırma ve solunum korumasını sağlayın.",
        "Kimyasalları yalnızca uygun ve etiketli kaplarda tutun.",
        "Uyumsuz kimyasalları ayrı depolayın.",
        "Göz duşu ve acil duş erişimini açık tutun.",
        "Dökülme kiti ve uygun emici malzemeyi hazır bulundurun.",
        "Atıkları türüne uygun, kapalı ve etiketli kaplara alın.",
        "Maruziyet veya dökülmede alanı güvenli hale getirip bildirin."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün kullanacağımız kimyasalın etiketi ve SDS'si kontrol edilmeden işe başlamıyoruz. Hangi eldiven, gözlük ve koruyucu kıyafetin gerekli olduğunu doğrulayacağız. Etiketsiz kaba kimyasal aktarmayacağız ve uyumsuz ürünleri birlikte depolamayacağız. Dökülme veya maruziyet durumunda işi durduracak, alanı güvenli hale getirecek ve acil durum prosedürünü uygulayacağız.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Kullanılacak kimyasalın SDS'si nerede?",
        "Etiket ve GHS piktogramları okunabilir mi?",
        "Bu kimyasal için hangi eldiven kullanılmalı?",
        "Göz duşu ve acil duş nerede?",
        "Dökülme kiti ve uygun emici malzeme hazır mı?",
        "Maruziyet veya sızıntıda ilk yapılacak işlem nedir?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "SDS mevcut",
        "Etiket okunabilir",
        "Kap uygun",
        "KKD uygun",
        "Havalandırma yeterli",
        "Göz duşu erişilebilir",
        "Acil duş erişilebilir",
        "Dökülme kiti hazır",
        "Atık kabı hazır",
        "Ekip bilgilendirildi"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — SDS, kimyasal risk değerlendirmesi ve saha prosedürleri önceliklidir."
    },
    "en": {
      "title": "CHEMICAL SAFETY TOOLBOX TALK",
      "subtitle": "Control exposure, splash, fire and incompatible-storage hazards.",
      "application_subtitle": "Hazards, control measures and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review inhalation, skin and eye contact, fire, reaction, spill and environmental hazards during the use, handling, storage and disposal of chemicals, and verify SDS information, labelling, PPE, ventilation and emergency arrangements before work begins.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "A chemical's hazards cannot be identified by smell or appearance alone. Before use, review the product label and Safety Data Sheet to understand hazards, exposure routes, required PPE, first aid and spill-response requirements.",
        "Chemicals must remain in original or correctly labelled containers. Unlabelled containers, drink bottles and incompatible containers can lead to misidentification, incorrect use and dangerous reactions.",
        "Glove selection depends on the chemical involved. Not every glove protects against every substance. Ventilation, goggles or face shields, protective clothing and respiratory protection must be selected according to the SDS and risk assessment."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker transferred a cleaning chemical into an unlabelled small container that had previously held a different product.",
        "The chemicals reacted, generating heat and irritating vapour. The worker was exposed to a splash because suitable eye and hand protection had not been selected.",
        "The incident could have been prevented by using an original or labelled container, reviewing the SDS, checking chemical compatibility and selecting the correct PPE."
      ],
      "remember_title": "REMEMBER",
      "remember": "Do not use a chemical if the label is unreadable, the contents are unknown or suitability has not been confirmed. Stop the task and report it.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Inhalation, ingestion or absorption through the skin.",
        "Eye and skin burns or irritation from splashes.",
        "Ignition of flammable liquids, vapours or aerosols.",
        "Mixing incompatible chemicals.",
        "Unlabelled or incorrectly labelled containers.",
        "Poor ventilation and vapour accumulation.",
        "Spills, leaks and environmental contamination.",
        "Chemical waste placed in unsuitable containers."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Review the current SDS before starting work.",
        "Verify the product label and GHS pictograms.",
        "Use chemical-resistant gloves, eye protection and clothing.",
        "Provide suitable ventilation and respiratory protection.",
        "Keep chemicals in suitable, correctly labelled containers.",
        "Segregate incompatible chemicals during storage.",
        "Keep eyewash and emergency showers accessible.",
        "Provide a spill kit and suitable absorbent materials.",
        "Place waste in closed and correctly labelled containers.",
        "Stop work, control the area and report exposure or spills."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, we will not begin until the chemical label and SDS have been reviewed. We will confirm the correct gloves, eye protection and protective clothing. Chemicals will not be transferred into unlabelled containers, and incompatible products will be kept separate. During a spill or exposure, we will stop work, secure the area and follow the emergency procedure.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Where is the SDS for the chemical being used?",
        "Are the label and GHS pictograms readable?",
        "Which gloves are suitable for this chemical?",
        "Where are the eyewash and emergency shower?",
        "Is the spill kit and suitable absorbent material ready?",
        "What is the first action during exposure or leakage?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "SDS available",
        "Label readable",
        "Container suitable",
        "PPE suitable",
        "Ventilation adequate",
        "Eyewash accessible",
        "Emergency shower accessible",
        "Spill kit ready",
        "Waste container ready",
        "Team briefed"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Safety Data Sheets, chemical risk assessments and site procedures take priority."
    }
  },
  {
    "slug": "confined-space",
    "sourceFile": "confined_space.py",
    "base": "confined-space-toolbox-talk",
    "tr": {
      "title": "KAPALI ALAN ÇALIŞMALARI TOOLBOX TALK",
      "subtitle": "Atmosferik tehlikeleri, enerji kaynaklarını ve kurtarma risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, giriş kontrolleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Kapalı alan girişlerinde oksijen yetersizliği veya zenginleşmesi, toksik ve yanıcı gazlar, beklenmeyen enerji, sıkışma, boğulma ve kurtarma gecikmesi risklerini değerlendirmek; girişten önce izin, gaz ölçümü, izolasyon, havalandırma, gözcü ve kurtarma düzenlemelerinin tamamlandığını doğrulamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Kapalı alan; giriş ve çıkışı sınırlı, sürekli çalışma için tasarlanmamış ve tehlikeli atmosfer veya fiziksel tehlike oluşturabilecek tank, kolon, reaktör, kanal, kuyu, menhol, silo ve benzeri alanları kapsar.",
        "Kapalı alana girişten önce atmosfer üst, orta ve alt seviyelerde uygun gaz dedektörüyle ölçülmelidir. Oksijen, yanıcı gaz seviyesi ve beklenen toksik gazlar kontrol edilmeli; koşullar değişebileceği için gerekli durumlarda sürekli ölçüm yapılmalıdır.",
        "Dışarıdaki gözcü başka bir işle meşgul olmamalı, içeri girenlerle sürekli iletişim kurmalı ve acil durumda izinsiz şekilde içeri girmemelidir. Kurtarma planı, ekip, tripod, vinç veya diğer ekipmanlar giriş başlamadan önce hazır ve uygulanabilir olmalıdır."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan kısa süreli kontrol yapmak için bir tankın içine girdi. Giriş izni tamamlanmamıştı ve son gaz ölçümü birkaç saat önce yapılmıştı.",
        "Tank içindeki oksijen seviyesi proses kalıntısı nedeniyle düşmüştü. Çalışan birkaç dakika içinde bilincini kaybetti. Dışarıdaki ikinci çalışan kurtarma amacıyla korumasız şekilde içeri girdi ve o da etkilendi.",
        "Olay; güncel gaz ölçümü, sürekli atmosfer takibi, dışarıda görevli gözcü, giriş kontrolü ve girişsiz kurtarma planı ile tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Kapalı alanda kazazedeyi kurtarmak için plansız şekilde içeri girmek ikinci bir kazazede oluşturabilir. Önce alarm verin ve onaylı kurtarma planını uygulayın.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Oksijen yetersizliği veya oksijen zenginleşmesi.",
        "Yanıcı gaz, buhar veya toz nedeniyle yangın ve patlama.",
        "H₂S, CO, solvent buharı veya diğer toksik maddeler.",
        "Beklenmeyen akış, basınç, buhar veya ürün girişi.",
        "Hareketli ekipman ve yetersiz enerji izolasyonu.",
        "Sıvı, toz veya gevşek malzeme içinde boğulma.",
        "Dar giriş, düşme, kayma ve sıkışma tehlikeleri.",
        "Isı stresi, yetersiz görüş ve zayıf haberleşme."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Geçerli kapalı alan giriş iznini doğrulayın.",
        "Alanı ve bütün bağlantılı enerji kaynaklarını izole edin.",
        "Giriş öncesi üst, orta ve alt seviyelerde gaz ölçümü yapın.",
        "Gerekli durumlarda sürekli atmosfer takibi sağlayın.",
        "Yeterli mekanik havalandırma uygulayın.",
        "Yetkin ve yalnızca bu görevle ilgilenen gözcü görevlendirin.",
        "İçeri giren personel ile sürekli iletişim sağlayın.",
        "Giriş-çıkış ve personel sayım kaydını tutun.",
        "Kurtarma planı, ekip ve ekipmanı girişten önce hazırlayın.",
        "Koşullar değişirse alanı derhal tahliye edin."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün kapalı alana izin, izolasyon ve güncel gaz ölçümü tamamlanmadan girmiyoruz. Gaz ölçümü yalnızca girişte değil, koşullar değişiyorsa çalışma boyunca takip edilecek. Gözcü dışarıda kalacak, başka işle ilgilenmeyecek ve personel giriş çıkışını takip edecek. Alarm durumunda kimse plansız kurtarma için içeri girmeyecek; onaylı kurtarma planı uygulanacak.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Kapalı alan giriş izni onaylı ve güncel mi?",
        "Son gaz ölçümünü kim yaptı ve sonuçlar nedir?",
        "Hangi enerji ve proses hatları izole edildi?",
        "Gözcü kim ve iletişim yöntemi nedir?",
        "Sürekli gaz takibi nasıl sağlanacak?",
        "Kurtarma ekibi ve ekipmanı nerede hazır bekliyor?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Giriş izni onaylı",
        "Risk değerlendirmesi uygun",
        "İzolasyon tamam",
        "Gaz ölçümü uygun",
        "Dedektör kontrol edildi",
        "Havalandırma hazır",
        "Gözcü görevde",
        "İletişim sağlandı",
        "Kurtarma ekipmanı hazır",
        "Personel kaydı başlatıldı"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Kapalı alan giriş izni, gaz ölçümü, izolasyon ve saha kurtarma prosedürleri önceliklidir."
    },
    "en": {
      "title": "CONFINED SPACE TOOLBOX TALK",
      "subtitle": "Control atmospheric hazards, energy sources and rescue risks.",
      "application_subtitle": "Hazards, entry controls and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review oxygen deficiency or enrichment, toxic and flammable atmospheres, unexpected energy, engulfment, entrapment and delayed-rescue hazards, and verify that the permit, gas testing, isolation, ventilation, attendant and rescue arrangements are complete before entry.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "A confined space includes tanks, columns, reactors, ducts, pits, manholes, silos and similar areas with limited entry or exit, not designed for continuous occupancy and capable of containing atmospheric or physical hazards.",
        "Before entry, the atmosphere must be tested at upper, middle and lower levels with a suitable gas detector. Oxygen, flammable gas and expected toxic gases must be checked, and continuous monitoring must be used where conditions may change.",
        "The attendant must remain outside, maintain communication and avoid unrelated duties. The attendant must not enter for an unplanned rescue. The rescue plan, team, tripod, winch or other equipment must be ready and practical before entry begins."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker entered a tank for a short inspection. The entry permit was incomplete and the most recent gas test had been completed several hours earlier.",
        "Residual process material reduced the oxygen level. The worker lost consciousness, and a second worker entered without protection in an attempt to rescue the casualty.",
        "The event could have been prevented through current gas testing, continuous monitoring, a dedicated attendant, controlled entry and a non-entry rescue arrangement."
      ],
      "remember_title": "REMEMBER",
      "remember": "Entering a confined space without a rescue plan can create a second casualty. Raise the alarm and follow the approved rescue procedure.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Oxygen deficiency or oxygen enrichment.",
        "Fire or explosion from flammable gases, vapours or dust.",
        "H₂S, CO, solvent vapours or other toxic substances.",
        "Unexpected flow, pressure, steam or product entry.",
        "Moving equipment and inadequate energy isolation.",
        "Engulfment in liquid, powder or loose material.",
        "Restricted access, falls, slips and entrapment.",
        "Heat stress, poor visibility and communication failure."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Verify the approved confined-space entry permit.",
        "Isolate the space and all connected energy sources.",
        "Test the atmosphere at upper, middle and lower levels.",
        "Provide continuous atmospheric monitoring where required.",
        "Provide adequate mechanical ventilation.",
        "Assign a competent and dedicated attendant.",
        "Maintain continuous communication with entrants.",
        "Record entry, exit and personnel count.",
        "Prepare the rescue plan, team and equipment before entry.",
        "Evacuate immediately if conditions change."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, no one will enter today until the permit, isolation and current gas testing are complete. Atmospheric conditions will be monitored throughout the work where required. The attendant will remain outside, avoid unrelated duties and track everyone entering and leaving. During an alarm, no one will enter for an unplanned rescue; the approved rescue plan will be followed.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Is the confined-space entry permit approved and current?",
        "Who completed the latest gas test and what were the results?",
        "Which energy and process connections have been isolated?",
        "Who is the attendant and how will communication be maintained?",
        "How will continuous gas monitoring be provided?",
        "Where are the rescue team and equipment positioned?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Entry permit approved",
        "Risk assessment suitable",
        "Isolation complete",
        "Gas test acceptable",
        "Detector checked",
        "Ventilation ready",
        "Attendant in position",
        "Communication established",
        "Rescue equipment ready",
        "Entry log started"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Entry permits, gas testing, isolation and site rescue procedures take priority."
    }
  },
  {
    "slug": "crane-banksman-safety",
    "sourceFile": "crane_banksman_safety.py",
    "base": "crane-banksman-safety-toolbox-talk",
    "tr": {
      "title": "VİNÇ VE İŞARETÇİ GÜVENLİĞİ TOOLBOX TALK",
      "subtitle": "İletişim kaybı, kör kaldırma ve yük hareketi risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, iletişim kuralları ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Vinç operatörü, banksman ve kaldırma ekibi arasındaki iletişimi güvenli hale getirmek; kör kaldırma, yanlış işaret, dönüş yarıçapı, yük altında çalışma ve haberleşme kaybından kaynaklanan çarpma, sıkışma ve yük düşmesi risklerini önlemektir.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Operatöre yalnızca önceden belirlenmiş ve yetkin banksman yön vermelidir. Birden fazla kişinin komut vermesi karışıklık yaratır ve yükün kontrolsüz hareketine neden olabilir.",
        "Banksman, operatörün ve yükün güvenli görüşünü korumalıdır. Kör kaldırmalarda telsiz veya uygun haberleşme sistemi kullanılmalı; iletişim kesildiğinde kaldırma hemen durdurulmalıdır.",
        "Acil durdurma işareti herkes tarafından verilebilir. Ancak normal yönlendirme yalnızca atanmış banksman tarafından yapılmalı ve işaretler işe başlamadan önce ekipçe doğrulanmalıdır."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir kör kaldırma sırasında operatöre hem banksman hem de yakındaki bir süpervizör farklı yönlerde komut verdi.",
        "Operatör hangi komutu takip edeceğini karıştırdı ve yük dönüş alanına doğru salınım yaptı.",
        "Olay; tek işaretçi kuralı, önceden belirlenmiş telsiz kanalı ve iletişim kaybında işi durdurma kuralıyla önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Operatör banksmanı göremiyor veya haberleşme kesiliyorsa kaldırma durmalıdır. Şüpheli durumda hareket etmeyin.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Birden fazla kişinin operatöre komut vermesi.",
        "Standart olmayan veya yanlış anlaşılan el işaretleri.",
        "Kör kaldırmada iletişim kaybı.",
        "Banksmanın yük veya operatör görüşünden çıkması.",
        "Vinç dönüş yarıçapında personel bulunması.",
        "Yük altında veya düşme hattında çalışan olması.",
        "Telsiz arızası, parazit veya yanlış kanal kullanımı.",
        "Rüzgâr nedeniyle yükün kontrolsüz salınımı."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Yetkin ve atanmış tek banksman belirleyin.",
        "Standart el işaretlerini işe başlamadan doğrulayın.",
        "Kör kaldırmalarda güvenilir telsiz iletişimi kullanın.",
        "İletişim kesilirse kaldırmayı derhal durdurun.",
        "Banksmanın yükü ve operatörü görebileceği konumu koruyun.",
        "Vinç dönüş yarıçapını bariyerleyin.",
        "Yük altında ve düşme hattında personel bulundurmayın.",
        "Acil durdurma işaretini tüm ekibe açıklayın.",
        "Rüzgâr ve görüş koşullarını takip edin.",
        "Banksman değişirse operatörü ve ekibi bilgilendirin."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün operatöre yalnızca atanmış banksman yön verecek. El işaretlerini ve telsiz kanalını işe başlamadan doğrulayacağız. Operatör banksmanı göremezse veya haberleşme kesilirse kaldırma hemen duracak. Dönüş yarıçapı ve yük altı tamamen boş tutulacak. Acil durdurma işaretini herkes verebilir.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Bugünkü atanmış banksman kim?",
        "Kullanılacak el işaretleri doğrulandı mı?",
        "Telsiz kanalı ve yedek iletişim yöntemi nedir?",
        "Kör kaldırmada banksman nerede duracak?",
        "Vinç dönüş yarıçapı tamamen bariyerlendi mi?",
        "İletişim kesilirse operatör ne yapacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Banksman yetkin",
        "Tek işaretçi belirlendi",
        "İşaretler doğrulandı",
        "Telsiz çalışıyor",
        "Yedek iletişim hazır",
        "Dönüş alanı bariyerli",
        "Yük altı boş",
        "Görüş uygun",
        "Rüzgâr uygun",
        "Ekip bilgilendirildi"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Kaldırma planı, işaretleşme kuralları ve saha vinç prosedürleri önceliklidir."
    },
    "en": {
      "title": "CRANE AND BANKSMAN SAFETY TOOLBOX TALK",
      "subtitle": "Control communication failure, blind-lift and load-movement hazards.",
      "application_subtitle": "Hazards, communication rules and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Ensure safe communication between the crane operator, banksman and lifting team, and prevent collision, crushing and dropped-load hazards caused by blind lifts, conflicting signals, swing-radius exposure and communication failure.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Only the designated and competent banksman should direct the operator. Conflicting instructions from several people can lead to uncontrolled load movement.",
        "The banksman must maintain safe visibility of the operator and load. Blind lifts require reliable radio communication, and the lift must stop immediately if communication is lost.",
        "Anyone may give the emergency-stop signal. Normal operating directions, however, must come only from the appointed banksman using agreed standard signals."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "During a blind lift, both the banksman and a nearby supervisor gave the operator different instructions.",
        "The operator became uncertain and the load swung toward the crane's operating area.",
        "The event could have been prevented through the one-signalman rule, an agreed radio channel and immediate stop on communication loss."
      ],
      "remember_title": "REMEMBER",
      "remember": "If the operator cannot see the banksman or communication is lost, the lift must stop. Do not move when in doubt.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Multiple people directing the operator.",
        "Non-standard or misunderstood hand signals.",
        "Communication failure during blind lifting.",
        "Banksman moving out of the operator's or load's view.",
        "Personnel inside the crane swing radius.",
        "Workers below the suspended load or in the line of fire.",
        "Radio failure, interference or incorrect channel use.",
        "Uncontrolled load movement caused by wind."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Appoint one competent banksman.",
        "Confirm standard signals before starting.",
        "Use reliable radio communication for blind lifts.",
        "Stop the lift immediately if communication is lost.",
        "Position the banksman with clear visibility.",
        "Barricade the crane swing radius.",
        "Keep personnel clear of suspended loads.",
        "Explain the emergency-stop signal to the team.",
        "Monitor wind and visibility conditions.",
        "Inform the operator and team if the banksman changes."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, only the appointed banksman will direct the operator today. We will verify hand signals and radio channels before starting. If the operator loses sight of the banksman or communication fails, the lift will stop immediately. The swing radius and suspended-load area will remain clear. Anyone may give the emergency-stop signal.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Who is the appointed banksman today?",
        "Have the hand signals been confirmed?",
        "Which radio channel and backup method will be used?",
        "Where will the banksman stand during the blind lift?",
        "Is the crane swing radius fully barricaded?",
        "What will the operator do if communication is lost?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Banksman competent",
        "Single signalman appointed",
        "Signals confirmed",
        "Radio working",
        "Backup communication ready",
        "Swing area barricaded",
        "Load path clear",
        "Visibility suitable",
        "Wind acceptable",
        "Team briefed"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Lifting plans, signalling rules and site crane procedures take priority."
    }
  },
  {
    "slug": "dropped-objects",
    "sourceFile": "dropped_objects.py",
    "base": "dropped-objects-toolbox-talk",
    "tr": {
      "title": "DÜŞEN CİSİMLERİN ÖNLENMESİ TOOLBOX TALK",
      "subtitle": "Alet, malzeme ve ekipmanların alt seviyelere düşmesini önleyin.",
      "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Yüksekte, iskelede, platformda ve kaldırma alanlarında kullanılan alet, malzeme ve ekipmanların düşmesi sonucu oluşabilecek yaralanma, ekipman hasarı ve üretim kaybı risklerini değerlendirmek; işe başlamadan önce sabitleme, bariyerleme ve alt alan kontrollerini doğrulamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Küçük bir somun, anahtar veya el aleti bile yükseklikten düştüğünde ciddi yaralanmaya neden olabilir. Cismin ağırlığı kadar düşme yüksekliği, şekli ve çarpma noktası da sonucun şiddetini belirler.",
        "Aletler uygun tool lanyard ile bağlanmalı, küçük parçalar kapalı çantalarda tutulmalı ve platform kenarlarında gevşek malzeme bırakılmamalıdır. Topuk levhası tek başına tüm düşen cisim risklerini önlemez.",
        "Alt çalışma alanı bariyerlenmeli ve düşen cisim hattında personel bulunmamalıdır. Malzeme kaldırma, taşıma veya elden ele verme sırasında güvenli yöntem kullanılmalı; malzeme aşağıya atılmamalıdır."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan iskele üzerinde bağlantı yaparken anahtarını platform kenarına bıraktı. Alet herhangi bir bağlantı sistemiyle sabitlenmemişti.",
        "Çalışan yer değiştirirken ayağıyla anahtara temas etti ve alet alt seviyeye düştü. Alt alan yeterince bariyerlenmediği için yakındaki bir çalışan tehlikeye maruz kaldı.",
        "Olay; alet bağlama sistemi, kapalı takım çantası, etkin alt alan bariyerlemesi ve çalışma öncesi düşen cisim kontrolüyle tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Yüksekte kullanılan her alet ve malzeme düşme potansiyeline sahiptir. Sabitleyin, kapatın, bariyerleyin ve alt alanı boş tutun.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Bağlanmamış el aletleri ve küçük parçalar.",
        "Platform veya iskele kenarında bırakılan malzemeler.",
        "Eksik topuk levhası veya kenar koruması.",
        "Açık takım çantaları ve uygunsuz malzeme taşıma.",
        "Alt alanda çalışan personel bulunması.",
        "Kaldırma sırasında gevşek veya dengesiz yük.",
        "Rüzgârla hareket eden hafif malzemeler.",
        "Yukarıdan aşağıya malzeme atılması."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Aletleri uygun tool lanyard ile sabitleyin.",
        "Küçük parçaları kapalı çanta veya kaplarda tutun.",
        "Platform kenarlarında gevşek malzeme bırakmayın.",
        "Topuk levhası, ağ ve kenar korumasını kontrol edin.",
        "Alt alanı bariyerleyin ve yasaklı alan oluşturun.",
        "Malzemeleri kontrollü yöntemle indirip kaldırın.",
        "Yükleri taşımadan önce gevşek parçaları sabitleyin.",
        "Rüzgâr koşullarını ve hafif malzemeleri kontrol edin.",
        "Çalışma sonrası platformu tamamen temizleyin.",
        "Düşen cisim riski görülürse işi durdurun."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün yüksekte kullandığımız hiçbir aleti veya küçük parçayı serbest bırakmayacağız. Aletler bağlanacak, küçük parçalar kapalı çantalarda tutulacak ve platform kenarlarında malzeme bırakılmayacak. Alt alan bariyerli ve boş olacak. Rüzgâr, eksik topuk levhası veya gevşek malzeme görürsek işi durduracağız.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Bugün hangi aletler yüksekte kullanılacak?",
        "Aletlerin bağlama noktaları ve lanyardları uygun mu?",
        "Küçük parçalar nasıl taşınacak ve saklanacak?",
        "Alt alan tamamen bariyerlendi mi?",
        "Platform kenarlarında gevşek malzeme var mı?",
        "Düşen cisim görülürse çalışma nasıl durdurulacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Aletler bağlı",
        "Takım çantaları kapalı",
        "Küçük parçalar güvenli",
        "Topuk levhaları tamam",
        "Kenar koruması uygun",
        "Alt alan bariyerli",
        "Yükler sabit",
        "Rüzgâr uygun",
        "Platform temiz",
        "Ekip bilgilendirildi"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Düşen cisim kontrol planı, yüksekte çalışma kuralları ve saha prosedürleri önceliklidir."
    },
    "en": {
      "title": "DROPPED OBJECT PREVENTION TOOLBOX TALK",
      "subtitle": "Prevent tools, materials and equipment from falling to lower levels.",
      "application_subtitle": "Hazards, control measures and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review injury, equipment-damage and production-loss hazards caused by tools, materials and equipment falling from height, scaffolds, platforms and lifting areas, and verify tethering, exclusion-zone and lower-area controls before work begins.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Even a small nut, wrench or hand tool can cause serious injury when dropped from height. The severity depends on the object's weight, drop height, shape and impact point.",
        "Tools must be secured with suitable tool lanyards, small parts kept in closed containers and loose materials kept away from platform edges. Toe boards alone do not eliminate every dropped-object hazard.",
        "The area below must be barricaded and kept clear of personnel. Materials must be raised, lowered and passed using controlled methods and must never be thrown from one level to another."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker left a wrench close to the edge of a scaffold platform while completing a connection task. The tool was not secured.",
        "While repositioning, the worker contacted the wrench with a foot and it fell to the level below. A nearby worker was exposed because the lower area had not been fully barricaded.",
        "The incident could have been prevented through tool tethering, closed tool bags, effective exclusion control and a dropped-object inspection before starting."
      ],
      "remember_title": "REMEMBER",
      "remember": "Every tool and material used at height can fall. Secure it, contain it, barricade the area and keep people out of the line of fire.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Unsecured hand tools and small components.",
        "Materials left near scaffold or platform edges.",
        "Missing toe boards or edge protection.",
        "Open tool bags and unsafe material handling.",
        "Personnel working in the area below.",
        "Loose or unstable loads during lifting.",
        "Lightweight materials moved by wind.",
        "Materials thrown between levels."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Secure tools with suitable tool lanyards.",
        "Keep small parts in closed bags or containers.",
        "Do not leave loose materials near platform edges.",
        "Check toe boards, netting and edge protection.",
        "Barricade the lower area and create an exclusion zone.",
        "Raise and lower materials using controlled methods.",
        "Secure loose components before moving loads.",
        "Assess wind conditions and lightweight materials.",
        "Clean platforms completely after the task.",
        "Stop work when dropped-object risk is identified."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, no tool or small component used at height will remain unsecured today. Tools will be tethered, small parts kept in closed bags and materials kept away from platform edges. The area below will remain barricaded and clear. We will stop work if wind, missing toe boards or loose materials create a hazard.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Which tools will be used at height today?",
        "Are tool lanyards and attachment points suitable?",
        "How will small components be carried and stored?",
        "Is the lower area completely barricaded?",
        "Are any loose materials present near platform edges?",
        "How will work stop if a dropped-object hazard is identified?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Tools tethered",
        "Tool bags closed",
        "Small parts secured",
        "Toe boards complete",
        "Edge protection suitable",
        "Lower area barricaded",
        "Loads secured",
        "Wind acceptable",
        "Platform clean",
        "Team briefed"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Dropped-object controls, work-at-height requirements and site procedures take priority."
    }
  },
  {
    "slug": "electrical-safety",
    "sourceFile": "electrical_safety.py",
    "base": "electrical-safety-toolbox-talk",
    "tr": {
      "title": "ELEKTRİK GÜVENLİĞİ TOOLBOX TALK",
      "subtitle": "Elektrik çarpması, ark parlaması ve yangın risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Elektrikli ekipman, geçici enerji dağıtımı, kablo, priz, pano ve enerji kaynaklarından kaynaklanan elektrik çarpması, ark parlaması, yanık, yangın ve beklenmeyen enerjilenme risklerini değerlendirmek ve işe başlamadan önce gerekli kontrolleri doğrulamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Elektrik görünmez bir tehlikedir. Hasarlı bir kablo, gevşek bağlantı, açık pano, uygunsuz topraklama veya ıslak ortam çalışanı ölümcül elektrik akımına maruz bırakabilir.",
        "Elektrikli ekipman yalnızca yetkili kişiler tarafından kurulmalı, onarılmalı ve müdahale edilmelidir. Koruyucu kapakların açılması, sigortaların değiştirilmesi veya enerjili devre üzerinde kontrol yapılması yetkisiz personel tarafından yapılmamalıdır.",
        "Enerjisiz çalışma esas olmalıdır. Müdahale öncesinde enerji kesilmeli, LOTO uygulanmalı, gerilim yokluğu uygun test cihazıyla doğrulanmalı ve yeniden enerjilenme önlenmelidir."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan taşınabilir elektrikli el aletini kullanmadan önce kabloyu kontrol etmedi. Kablonun dış izolasyonu kesilmiş ve iletken kısmı görünür hale gelmişti.",
        "Ekipman nemli bir alanda kullanılırken çalışan hasarlı bölüme temas etti ve elektrik çarpmasına maruz kaldı. Devrede uygun kaçak akım koruması da bulunmuyordu.",
        "Olay; kullanım öncesi kontrol, hasarlı ekipmanın karantinaya alınması, uygun RCD/GFCI koruması ve kuru çalışma koşullarıyla tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Elektrikli ekipmanda hasar, açık iletken, yanık kokusu veya anormal ısınma görürseniz kullanmayın. Enerjiyi kesin, ekipmanı etiketleyin ve yetkili kişiye bildirin.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Hasarlı kablo, fiş, priz veya ekipman gövdesi.",
        "Açık veya kilitsiz elektrik panoları.",
        "Islak ortamda uygunsuz elektrikli ekipman kullanımı.",
        "Uygunsuz topraklama veya kaçak akım koruması eksikliği.",
        "Aşırı yüklenmiş uzatma kabloları ve çoklu prizler.",
        "Enerjili devrelerde yetkisiz çalışma.",
        "Ark parlaması, kısa devre ve sıcak yüzeyler.",
        "Kabloların geçiş yollarında hasar görmesi veya takılma riski."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Ekipmanı, kabloyu, fişi ve prizi kullanımdan önce kontrol edin.",
        "Hasarlı ekipmanı kullanımdan kaldırın ve karantinaya alın.",
        "Uygun topraklama ve kaçak akım korumasını doğrulayın.",
        "Elektrik panolarını kapalı, kilitli ve erişilebilir tutun.",
        "Kabloları su, keskin kenar ve araç yollarından koruyun.",
        "Uzatma kablolarını aşırı yüklemeyin veya seri bağlamayın.",
        "Enerjisiz çalışma ve LOTO uygulamasını önceliklendirin.",
        "Gerilim yokluğunu uygun test cihazıyla doğrulayın.",
        "Yalnızca yetkili elektrik personelinin müdahale etmesini sağlayın.",
        "Yangın veya elektrik arızasında enerjiyi güvenli şekilde kesin."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün kullanacağımız kablo, priz ve elektrikli ekipmanları işe başlamadan kontrol edeceğiz. Hasarlı, ıslak, açık iletkenli veya anormal ısınan hiçbir ekipmanı kullanmayacağız. Elektrik panolarına yalnızca yetkili personel müdahale edecek. Müdahale öncesinde enerji kesilecek, LOTO uygulanacak ve gerilim yokluğu doğrulanacak.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Kullanılacak kablo ve ekipmanlar kontrol edildi mi?",
        "Kaçak akım koruması ve topraklama uygun mu?",
        "Kablolar su, keskin kenar ve araçlardan korunuyor mu?",
        "Elektrik panoları kapalı ve kilitli mi?",
        "Hasarlı ekipman görülürse ne yapılacak?",
        "Enerji izolasyonunu ve testini kim yapacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Kablolar sağlam",
        "Fişler sağlam",
        "Prizler uygun",
        "Topraklama mevcut",
        "RCD/GFCI koruması aktif",
        "Panolar kapalı",
        "Alan kuru",
        "Kablolar korumalı",
        "LOTO hazır",
        "Yetkili personel belli"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Elektrik izolasyonu, LOTO ve saha elektrik prosedürleri önceliklidir."
    },
    "en": {
      "title": "ELECTRICAL SAFETY TOOLBOX TALK",
      "subtitle": "Control electric shock, arc-flash and fire hazards.",
      "application_subtitle": "Hazards, control measures and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review electric-shock, arc-flash, burn, fire and unexpected-energisation hazards associated with electrical equipment, temporary power, cables, sockets, panels and energy sources, and verify the required controls before work begins.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Electricity is an invisible hazard. A damaged cable, loose connection, open panel, poor earthing or wet environment can expose a worker to a fatal electric current.",
        "Electrical equipment must only be installed, repaired or opened by authorised personnel. Unauthorised workers must not remove covers, replace protective devices or work on energised circuits.",
        "De-energised work must be the normal approach. Before intervention, power must be isolated, LOTO applied, absence of voltage verified with a suitable tester and re-energisation prevented."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker used a portable electric tool without inspecting the supply cable. The outer insulation had been cut and the conductor was exposed.",
        "The tool was used in a damp area and the worker contacted the damaged section, receiving an electric shock. Suitable residual-current protection was not installed.",
        "The incident could have been prevented through pre-use inspection, quarantine of damaged equipment, suitable RCD/GFCI protection and dry working conditions."
      ],
      "remember_title": "REMEMBER",
      "remember": "Do not use electrical equipment showing damage, exposed conductors, burning smell or abnormal heat. Isolate the supply, tag the equipment and report it to an authorised person.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Damaged cables, plugs, sockets or equipment enclosures.",
        "Open or unlocked electrical panels.",
        "Unsuitable equipment used in wet conditions.",
        "Poor earthing or missing residual-current protection.",
        "Overloaded extension leads and multiple adapters.",
        "Unauthorised work on energised circuits.",
        "Arc flash, short circuits and hot surfaces.",
        "Cables damaged in access routes or creating trip hazards."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Inspect equipment, cables, plugs and sockets before use.",
        "Remove damaged equipment from service and quarantine it.",
        "Verify suitable earthing and residual-current protection.",
        "Keep electrical panels closed, locked and accessible.",
        "Protect cables from water, sharp edges and vehicle routes.",
        "Do not overload or daisy-chain extension leads.",
        "Prioritise de-energised work and apply LOTO.",
        "Verify absence of voltage with a suitable tester.",
        "Allow only authorised electrical personnel to intervene.",
        "Safely isolate power during electrical faults or fires."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, before starting today, we will inspect all cables, sockets and electrical equipment. We will not use anything damaged, wet, showing exposed conductors or abnormal heat. Only authorised personnel may access electrical panels. Before intervention, power will be isolated, LOTO applied and absence of voltage verified.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Have all cables and electrical tools been inspected?",
        "Are earthing and residual-current protection suitable?",
        "Are cables protected from water, edges and vehicles?",
        "Are electrical panels closed and locked?",
        "What action will be taken if damaged equipment is found?",
        "Who will complete the isolation and electrical testing?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Cables intact",
        "Plugs intact",
        "Sockets suitable",
        "Earthing available",
        "RCD/GFCI active",
        "Panels closed",
        "Area dry",
        "Cables protected",
        "LOTO ready",
        "Authorised person identified"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Electrical isolation, LOTO and site electrical procedures take priority."
    }
  },
  {
    "slug": "excavation-safety",
    "sourceFile": "excavation_safety.py",
    "base": "excavation-safety-toolbox-talk",
    "tr": {
      "title": "KAZI GÜVENLİĞİ TOOLBOX TALK",
      "subtitle": "Göçük, yeraltı hatları ve ağır ekipman risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Kazı çalışmalarında göçük, yeraltı tesisatları, düşme, ağır ekipman ve atmosferik tehlikeleri değerlendirerek güvenli çalışma koşullarını sağlamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Her kazı çalışması başlamadan önce kazı izni, yeraltı hatları ve çalışma yöntemi doğrulanmalıdır.",
        "1,2 m ve üzerindeki kazılarda uygun koruma yöntemi (şevlendirme, iksa veya trench box) değerlendirilmelidir.",
        "Kazı günlük olarak ve yağmur, titreşim veya zemin değişikliğinden sonra yeniden kontrol edilmelidir."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir ekip 2,5 m derinliğindeki kazıda şevlendirme yapmadan çalışmaya başladı.",
        "Ekskavatör çalışırken gevşeyen toprak aniden göçtü ve çalışan bel hizasına kadar toprak altında kaldı.",
        "Kazı koruması, güvenli mesafe ve günlük kontrol uygulanmış olsaydı olay yaşanmayacaktı."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Korumasız kazıya girmek birkaç saniye içinde ölümcül bir göçüğe neden olabilir.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Kazı göçmesi",
        "Yeraltı elektrik kabloları",
        "Gaz veya ürün hatları",
        "Su baskını",
        "Ağır ekipman hareketi",
        "Kazıya düşme",
        "Malzeme düşmesi",
        "Yetersiz giriş-çıkış"
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Kazı iznini doğrulayın.",
        "Yeraltı hatlarını belirleyin.",
        "Şevlendirme, iksa veya trench box kullanın.",
        "Kazıya güvenli merdiven sağlayın.",
        "Kazı kenarını bariyerleyin.",
        "Toprağı kenardan uzak istifleyin.",
        "Ağır ekipmanı güvenli mesafede tutun.",
        "Yağmur sonrası yeniden kontrol yapın.",
        "Gaz ölçümü gerektiğinde uygulayın.",
        "Acil kurtarma planını doğrulayın."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Bugün kazıya girmeden önce izinleri, yeraltı hatlarını ve kazı korumasını birlikte kontrol edeceğiz. Korumasız kazıya girmeyeceğiz. Kazı kenarında gereksiz personel bulunmayacak ve ağır ekipman güvenli mesafede çalışacak.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Kazı izni onaylı mı?",
        "Yeraltı hatları doğrulandı mı?",
        "Şevlendirme yeterli mi?",
        "Merdiven hazır mı?",
        "Bariyerleme tamam mı?",
        "Acil durumda çıkış nereden olacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Permit hazır",
        "Utility kontrol edildi",
        "Şev uygun",
        "Merdiven mevcut",
        "Bariyer hazır",
        "Toprak güvenli",
        "Gaz kontrolü",
        "Ağır ekipman uzak",
        "Gözcü hazır",
        "Acil plan hazır"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Excavation Safety"
    },
    "en": {
      "title": "EXCAVATION SAFETY TOOLBOX TALK",
      "subtitle": "Control collapse, underground utilities and heavy equipment hazards.",
      "application_subtitle": "Hazards, control measures and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Prevent trench collapse, utility strikes, falls and equipment hazards during excavation work.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Verify permits and underground utilities before excavation.",
        "Provide sloping, shoring or trench boxes where required.",
        "Inspect excavations daily and after weather or ground changes."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "Workers entered an unsupported trench.",
        "The sidewall collapsed after equipment vibration.",
        "Proper trench protection would have prevented the incident."
      ],
      "remember_title": "REMEMBER",
      "remember": "Never enter an unprotected excavation.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Collapse",
        "Underground utilities",
        "Flooding",
        "Heavy equipment",
        "Falls",
        "Falling material",
        "Poor access",
        "Atmospheric hazards"
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Verify permit.",
        "Locate underground services.",
        "Use trench protection.",
        "Provide ladders.",
        "Barricade excavation.",
        "Keep spoil away from edge.",
        "Maintain equipment clearance.",
        "Inspect after rain.",
        "Gas test if required.",
        "Prepare emergency plan."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "No one will enter an excavation until permits, trench protection and access have been verified.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Is the permit approved?",
        "Are utilities identified?",
        "Is trench protection installed?",
        "Is access safe?",
        "Is barricading complete?",
        "What is the emergency escape route?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Permit approved",
        "Utilities identified",
        "Protection installed",
        "Ladder available",
        "Barricaded",
        "Ground stable",
        "Gas checked",
        "Equipment clear",
        "Standby ready",
        "Emergency plan"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes",
      "footer": "SERNEM HSE Resource — Excavation Safety"
    }
  },
  {
    "slug": "fire-safety",
    "sourceFile": "fire_safety.py",
    "base": "fire-safety-toolbox-talk",
    "tr": {
      "title": "YANGIN GÜVENLİĞİ TOOLBOX TALK",
      "subtitle": "Yangın risklerini önleyin ve acil durumda doğru müdahale edin.",
      "application_subtitle": "Yangın tehlikeleri, kontrol önlemleri ve acil durum hazırlığı.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Yangınların oluşmasını önlemek, erken müdahaleyi sağlamak ve personelin güvenli tahliyesini desteklemektir.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Yangın; yakıt, oksijen ve ısı bir araya geldiğinde oluşur. Bu üç unsurdan biri ortadan kaldırıldığında yangın kontrol altına alınabilir.",
        "Yanıcı malzemeler düzenli depolanmalı, sıcak çalışmalar izin sistemiyle yürütülmeli ve yangın söndürücüler kolay erişilebilir durumda olmalıdır.",
        "Her çalışan alarm noktalarını, kaçış yollarını ve toplanma alanını bilmelidir."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Taşlama sırasında oluşan kıvılcımlar yakındaki yanıcı malzemeleri tutuşturdu.",
        "Yangın söndürücüye hızlı erişim sayesinde küçük yangın büyümeden kontrol altına alındı.",
        "Alan temizliği ve uygun kıvılcım koruması kullanılsaydı olay tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Küçük bir kıvılcım büyük bir yangına dönüşebilir. Önlemek, söndürmekten daha güvenlidir.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Sıcak çalışmalar",
        "Yanıcı sıvılar",
        "Gaz kaçakları",
        "Elektrik arızaları",
        "Sigara kullanımı",
        "Kötü housekeeping",
        "Aşırı yüklenmiş elektrik tesisatı",
        "Uygunsuz depolama"
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Hot Work Permit uygulayın.",
        "Yanıcı malzemeleri uzaklaştırın.",
        "Yangın söndürücüleri kontrol edin.",
        "Kaçış yollarını açık tutun.",
        "Yangın gözcüsü görevlendirin.",
        "Elektrik arızalarını bildirin.",
        "Housekeeping kurallarına uyun.",
        "Gaz tüplerini doğru depolayın.",
        "PASS yöntemini bilin.",
        "Alarm durumunda tahliye olun."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Bugün sıcak çalışma alanlarını, yangın söndürücüleri ve kaçış yollarını kontrol edeceğiz. Yanıcı malzemeler uzaklaştırılacak ve herkes en yakın alarm noktasını bilecek.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "En yakın yangın söndürücü nerede?",
        "Toplanma alanı nerede?",
        "Hot Work Permit gerekli mi?",
        "Yangın alarmı nasıl verilir?",
        "PASS yöntemi nedir?",
        "Kaçış yolu açık mı?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Söndürücü uygun",
        "Kaçış yolları açık",
        "Alarm noktası biliniyor",
        "Yanıcı malzeme kaldırıldı",
        "Hot Work Permit hazır",
        "Yangın gözcüsü mevcut",
        "Housekeeping uygun",
        "Gaz tüpleri güvenli",
        "Ekip bilgilendirildi",
        "Toplanma alanı biliniyor"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları",
      "footer": "SERNEM HSE Resource — Fire Safety"
    },
    "en": {
      "title": "FIRE SAFETY TOOLBOX TALK",
      "subtitle": "Prevent fire hazards and respond safely in emergencies.",
      "application_subtitle": "Fire hazards, control measures and emergency preparedness.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Prevent fires, support early response and ensure safe evacuation of personnel.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Fire requires fuel, oxygen and heat. Removing one of these elements helps prevent or control fire.",
        "Store flammable materials correctly, manage hot work under permit and keep extinguishers accessible.",
        "Everyone must know alarm points, escape routes and assembly areas."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "Grinding sparks ignited nearby combustible materials.",
        "A nearby extinguisher allowed the fire to be controlled quickly.",
        "Good housekeeping and spark protection would have prevented the incident."
      ],
      "remember_title": "REMEMBER",
      "remember": "Preventing a fire is always safer than fighting one.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Hot work",
        "Flammable liquids",
        "Gas leaks",
        "Electrical faults",
        "Smoking",
        "Poor housekeeping",
        "Overloaded circuits",
        "Improper storage"
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Apply Hot Work Permit.",
        "Remove combustible materials.",
        "Inspect fire extinguishers.",
        "Keep escape routes clear.",
        "Assign a fire watch.",
        "Report electrical defects.",
        "Maintain good housekeeping.",
        "Store gas cylinders correctly.",
        "Know the PASS method.",
        "Evacuate when alarms sound."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Today we will verify hot work controls, extinguishers and escape routes. Everyone must know the nearest alarm point and assembly area.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Where is the nearest extinguisher?",
        "Where is the assembly point?",
        "Is a Hot Work Permit required?",
        "How do you raise the alarm?",
        "What is the PASS method?",
        "Is the escape route clear?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Extinguisher available",
        "Escape routes clear",
        "Alarm point known",
        "Combustibles removed",
        "Permit ready",
        "Fire watch assigned",
        "Housekeeping good",
        "Gas cylinders secure",
        "Team briefed",
        "Assembly point known"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes",
      "footer": "SERNEM HSE Resource — Fire Safety"
    }
  },
  {
    "slug": "forklift-safety",
    "sourceFile": "forklift_safety.py",
    "base": "forklift-safety-toolbox-talk",
    "tr": {
      "title": "FORKLIFT GÜVENLİĞİ TOOLBOX TALK",
      "subtitle": "Devrilme, çarpma ve yük düşmesi risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, güvenli sürüş kuralları ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Forklift kullanımında devrilme, çarpma, yük düşmesi, kör nokta ve yaya güvenliği risklerini değerlendirerek güvenli çalışma kurallarını uygulamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Forklift yalnızca eğitimli ve yetkilendirilmiş operatörler tarafından kullanılmalıdır. Vardiya öncesinde frenler, direksiyon, çatallar, lastikler, korna, geri vites alarmı ve ikaz lambaları kontrol edilmelidir.",
        "Yük, çatallar üzerinde dengeli taşınmalı ve görüşü kapatacak yüklerle ileri sürüş yapılmamalıdır. Görüş engelleniyorsa geri sürüş veya spotter kullanılmalıdır.",
        "Forklift hareket halindeyken operatör emniyet kemerini takmalı, hız limitlerine uymalı ve yayalara her zaman öncelik vermelidir."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir operatör görüşünü tamamen kapatan yüksek bir yükle ilerledi.",
        "Kavşakta yayayı fark edemedi ve ani fren sırasında yük çatallardan kayarak zemine düştü.",
        "Geri sürüş, spotter desteği ve doğru yük taşıma yüksekliği kullanılsaydı olay önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Forklift bir taşıma ekipmanıdır, personel taşıma aracı değildir. Yayalar her zaman önceliklidir.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Forklift devrilmesi.",
        "Yükün düşmesi.",
        "Kör noktalarda yaya çarpması.",
        "Aşırı yükleme.",
        "Yüksek hız.",
        "Emniyet kemeri kullanılmaması.",
        "Eğimde kontrol kaybı.",
        "Yetkisiz operatör kullanımı."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Günlük forklift kontrolünü tamamlayın.",
        "Yalnızca yetkili operatör kullanmalıdır.",
        "Emniyet kemerini her zaman takın.",
        "Yükü alçak seviyede taşıyın.",
        "Görüş engelleniyorsa geri sürün veya spotter kullanın.",
        "Yaya yollarına dikkat edin.",
        "Hız limitlerine uyun.",
        "Park ederken çatalları tamamen indirin.",
        "Kontağı kapatın ve park frenini çekin.",
        "Arızalı forklifti kullanmayın."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Bugün forklift kullanan tüm operatörler günlük kontrollerini tamamlayacak. Yük görüşü engelliyorsa geri sürüş veya spotter kullanılacak. Yayalara öncelik verilecek, emniyet kemeri takılacak ve hız limitlerine kesinlikle uyulacaktır.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Forklift günlük kontrolü tamamlandı mı?",
        "Operatör yetkili mi?",
        "Yük görüşü engelliyor mu?",
        "Spotter gerekli mi?",
        "Yaya yolları belirlendi mi?",
        "Park prosedürü nasıl uygulanacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Operatör yetkili",
        "Forklift kontrol edildi",
        "Frenler sağlam",
        "Korna çalışıyor",
        "Alarm çalışıyor",
        "Çatallar sağlam",
        "Yük güvenli",
        "Emniyet kemeri takılı",
        "Yaya yolları açık",
        "Park alanı uygun"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Forklift Safety"
    },
    "en": {
      "title": "FORKLIFT SAFETY TOOLBOX TALK",
      "subtitle": "Control overturning, collision and dropped-load hazards.",
      "application_subtitle": "Hazards, safe driving practices and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review forklift hazards including overturning, collisions, dropped loads, blind spots and pedestrian safety while applying safe operating practices.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Only trained and authorised operators may operate forklifts. Complete daily inspections before use.",
        "Carry loads low, stable and within rated capacity. Use reverse travel or a spotter when the load blocks visibility.",
        "Wear the seat belt, obey site speed limits and always give way to pedestrians."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "An operator travelled forward with a load blocking visibility.",
        "A pedestrian entered the intersection and the operator braked suddenly, causing the load to shift.",
        "The incident could have been prevented through reverse travel, a spotter and correct load positioning."
      ],
      "remember_title": "REMEMBER",
      "remember": "A forklift is a material handling vehicle, not a personnel carrier.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Overturning",
        "Dropped loads",
        "Blind spots",
        "Pedestrian collisions",
        "Overloading",
        "Excessive speed",
        "No seat belt",
        "Unauthorised operators"
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Complete the daily inspection.",
        "Use authorised operators only.",
        "Wear the seat belt.",
        "Carry loads low.",
        "Use reverse travel or a spotter if visibility is blocked.",
        "Follow pedestrian controls.",
        "Obey speed limits.",
        "Lower forks before parking.",
        "Apply the parking brake.",
        "Remove defective forklifts from service."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Today we will verify daily inspections, ensure seat belts are worn, keep loads low and use spotters where visibility is limited. Pedestrians always have priority.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Has the daily inspection been completed?",
        "Is the operator authorised?",
        "Is visibility restricted?",
        "Is a spotter required?",
        "Are pedestrian routes protected?",
        "How will the forklift be parked safely?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Authorised operator",
        "Inspection complete",
        "Brakes OK",
        "Horn working",
        "Alarm working",
        "Forks OK",
        "Load secure",
        "Seat belt worn",
        "Pedestrian routes clear",
        "Safe parking area"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes",
      "footer": "SERNEM HSE Resource — Forklift Safety"
    }
  },
  {
    "slug": "hand-power-tools",
    "sourceFile": "hand_power_tools.py",
    "base": "hand-power-tools-toolbox-talk",
    "tr": {
      "title": "EL ALETLERİ VE ELEKTRİKLİ EL ALETLERİ TOOLBOX TALK",
      "subtitle": "Kesilme, sıkışma, elektrik çarpması ve fırlayan parça risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, doğru kullanım ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "El aletleri ve elektrikli el aletlerinin seçimi, kontrolü ve kullanımı sırasında oluşabilecek kesilme, ezilme, sıkışma, elektrik çarpması, disk veya uç kırılması ve fırlayan parça risklerini değerlendirmek; işe başlamadan önce ekipman, koruyucu ve KKD kontrollerini doğrulamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Her alet yalnızca tasarlandığı iş için kullanılmalıdır. Tornavidayı keski, anahtarı çekiç veya uygun olmayan diski taşlama makinesinde kullanmak kontrol kaybına ve ekipman arızasına neden olabilir.",
        "Elektrikli el aletlerinde kablo, fiş, gövde, tetik, koruyucu ve aksesuarlar kullanım öncesi kontrol edilmelidir. Hasarlı ekipman kullanılmamalı, işaretlenmeli ve karantinaya alınmalıdır.",
        "Disk, uç veya aksesuar değişimi öncesinde enerji tamamen kesilmelidir. Koruyucular sökülmemeli, aksesuarın çapı ve maksimum devri makineyle uyumlu olmalıdır."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan taşlama makinesinde uygun olmayan çapta ve düşük devir kapasiteli bir disk kullandı. Koruyucu da çalışmayı kolaylaştırmak amacıyla çıkarılmıştı.",
        "Makine çalışırken disk parçalandı ve yüksek hızla fırlayan parçalar çalışanın yüzüne ve yakındaki bir personele yöneldi.",
        "Olay; doğru disk seçimi, maksimum devir kontrolü, koruyucunun yerinde tutulması, yüz siperi kullanımı ve işe başlamadan önce ekipman kontrolüyle tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Hasarlı, koruyucusuz veya uygunsuz aksesuar takılmış bir aleti kullanmayın. İşi durdurun ve ekipmanı karantinaya alın.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Hasarlı kablo, fiş, gövde veya tetik.",
        "Koruyucusu çıkarılmış veya değiştirilmiş ekipman.",
        "Uygun olmayan disk, uç veya aksesuar kullanımı.",
        "Disk veya aksesuar maksimum devrinin aşılması.",
        "Kesilme, ezilme, sıkışma ve geri tepme.",
        "Elektrik çarpması ve kısa devre.",
        "Fırlayan parça, kıvılcım ve toz maruziyeti.",
        "Kablo ve hortumların geçiş yollarında bırakılması."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Aleti ve aksesuarlarını kullanımdan önce kontrol edin.",
        "Yalnızca işe uygun ve onaylı ekipman kullanın.",
        "Koruyucuları yerinde ve çalışır durumda tutun.",
        "Disk çapı ve maksimum devir uyumunu doğrulayın.",
        "Uç veya disk değişiminden önce enerjiyi kesin.",
        "İşi sabitleyin ve doğru çalışma pozisyonunu koruyun.",
        "Kablo ve hortumları güvenli güzergâhlardan geçirin.",
        "Uygun gözlük, yüz siperi, eldiven ve işitme koruması kullanın.",
        "Hasarlı ekipmanı karantinaya alın ve bildirin.",
        "Yetkisiz tamir veya değişiklik yapmayın."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün kullanacağımız bütün el aletlerini ve elektrikli ekipmanları işe başlamadan kontrol edeceğiz. Koruyucusu olmayan, kablosu hasarlı veya uygunsuz aksesuar takılmış ekipmanı kullanmayacağız. Disk ve uç değişiminde enerjiyi keseceğiz. İş parçasını sabitleyecek, doğru KKD'yi kullanacak ve hasarlı ekipmanı hemen karantinaya alacağız.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Kullanılacak alet ve aksesuarlar kontrol edildi mi?",
        "Koruyucular yerinde ve çalışır durumda mı?",
        "Disk veya ucun kapasitesi makineyle uyumlu mu?",
        "Enerji kesmeden aksesuar değiştirilecek mi?",
        "Kablo ve hortumlar güvenli şekilde yönlendirildi mi?",
        "Hasarlı ekipman görülürse ne yapılacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Alet sağlam",
        "Kablo ve fiş sağlam",
        "Koruyucu yerinde",
        "Aksesuar uygun",
        "Devir uyumu doğrulandı",
        "İş parçası sabit",
        "Kablo güzergâhı güvenli",
        "KKD uygun",
        "Alan bariyerli",
        "Hasarlı ekipman ayrıldı"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Üretici talimatları, ekipman kontrolleri ve saha prosedürleri önceliklidir."
    },
    "en": {
      "title": "HAND AND POWER TOOLS TOOLBOX TALK",
      "subtitle": "Control cutting, crushing, electric-shock and flying-particle hazards.",
      "application_subtitle": "Hazards, correct use and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review cutting, crushing, entanglement, electric-shock, accessory failure and flying-particle hazards during the selection, inspection and use of hand and power tools, and verify equipment, guarding and PPE controls before work begins.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Every tool must be used only for its intended purpose. Using a screwdriver as a chisel, a wrench as a hammer or an unsuitable disc on a grinder can lead to loss of control and equipment failure.",
        "Power tools must be inspected before use, including cables, plugs, housings, triggers, guards and accessories. Damaged equipment must be removed from service, tagged and quarantined.",
        "Power must be isolated before changing discs, bits or accessories. Guards must not be removed, and accessory size and maximum speed must be compatible with the tool."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker fitted an oversized grinding disc with an insufficient speed rating. The guard had also been removed to make the task easier.",
        "The disc shattered during operation, sending high-speed fragments toward the worker and another person nearby.",
        "The incident could have been prevented through correct disc selection, speed verification, use of the guard, face protection and a pre-use inspection."
      ],
      "remember_title": "REMEMBER",
      "remember": "Do not use damaged, unguarded equipment or tools fitted with unsuitable accessories. Stop work and quarantine the tool.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Damaged cables, plugs, housings or triggers.",
        "Removed or modified guards.",
        "Incorrect discs, bits or accessories.",
        "Accessory speed rating lower than tool speed.",
        "Cuts, crushing, entanglement and kickback.",
        "Electric shock and short circuits.",
        "Flying particles, sparks and dust exposure.",
        "Cables and hoses creating trip or damage hazards."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Inspect the tool and accessories before use.",
        "Use only approved equipment suitable for the task.",
        "Keep guards fitted and functional.",
        "Verify disc size and maximum speed compatibility.",
        "Isolate power before changing accessories.",
        "Secure the workpiece and maintain a stable position.",
        "Route cables and hoses safely.",
        "Use suitable eye, face, hand and hearing protection.",
        "Quarantine and report damaged equipment.",
        "Do not complete unauthorised repairs or modifications."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, before starting today, we will inspect every hand tool and power tool. We will not use equipment with damaged cables, missing guards or unsuitable accessories. Power will be isolated before changing discs or bits. We will secure the workpiece, use the correct PPE and quarantine damaged tools immediately.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Have the tools and accessories been inspected?",
        "Are all guards fitted and functional?",
        "Is the disc or bit compatible with the tool?",
        "Will power be isolated before changing accessories?",
        "Are cables and hoses routed safely?",
        "What action will be taken if damaged equipment is found?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Tool intact",
        "Cable and plug intact",
        "Guard fitted",
        "Accessory suitable",
        "Speed compatibility verified",
        "Workpiece secured",
        "Cable route safe",
        "PPE suitable",
        "Area controlled",
        "Damaged tools removed"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Manufacturer instructions, equipment inspection requirements and site procedures take priority."
    }
  },
  {
    "slug": "hot-work",
    "sourceFile": "hot_work.py",
    "base": "hot-work-toolbox-talk",
    "tr": {
      "title": "SICAK ÇALIŞMA TOOLBOX TALK",
      "subtitle": "Kaynak, kesme ve taşlama işlerinde yangın ve patlamayı önleyin.",
      "application_subtitle": "Tehlikeler, kontroller ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Kaynak, kesme, taşlama, lehimleme ve kıvılcım oluşturan diğer faaliyetlerde yangın, patlama, yanık ve zararlı duman risklerini ekiple birlikte değerlendirmek ve işe başlamadan önce gerekli kontrolleri doğrulamak.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Sıcak çalışma, açık alev oluşturan işlerle sınırlı değildir. Taşlama, metal kesme ve sıcak yüzey oluşturan işlemler de kıvılcım, cüruf veya yüksek sıcaklık nedeniyle yangın başlatabilir.",
        "Kıvılcımlar çalışma noktasında kalmaz. Platform boşluklarından, kablo geçişlerinden ve açıklıklardan alt veya bitişik alanlara ulaşabilir. Yanıcı malzeme görünürde olmasa bile izolasyon, toz, yağ kalıntısı veya atıklar gizli yanma oluşturabilir.",
        "Bu nedenle sıcak çalışma yalnızca geçerli izin, uygun gaz ölçümü, yanıcı maddelerin kontrolü, hazır söndürme ekipmanı ve görevini bilen yangın gözcüsü bulunduğunda başlatılmalıdır. İş sona erse bile yangın riski hemen bitmez."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir bakım ekibi kısa süreli taşlama yaptı. Çalışma alanındaki görünen yanıcı maddeler kaldırılmıştı ancak platform altındaki izolasyon malzemesi fark edilmedi.",
        "Kıvılcımlar platform boşluğundan aşağı düştü. Yangın gözcüsü başka bir işle meşgul olduğu ve iş sonrası kontrol yapılmadığı için yaklaşık yirmi dakika sonra izolasyon tutuştu.",
        "Olay; üretim kaybına, ekipman hasarına ve acil tahliyeye neden oldu. Uygun bariyerleme, bağımsız yangın gözcüsü ve iş sonrası gözetim ile tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Sıcak çalışma kaynaklı yangınların bir bölümü iş bittikten sonra, gizli kor veya ısınmış malzeme nedeniyle başlar.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Kıvılcım ve cürufun alt veya bitişik alanlara ulaşması.",
        "Yanıcı gaz, buhar, solvent veya tozun tutuşması.",
        "Hat veya ekipmanda kalan ürün ve basınç.",
        "Hasarlı kablo, hortum, regülatör veya bağlantılar.",
        "Kaynak dumanı ve yetersiz havalandırma.",
        "Kapalı alanda oksijen ve gaz seviyelerinin değişmesi.",
        "Tüplerin uygunsuz taşınması veya sabitlenmemesi.",
        "İş sonrasında fark edilmeyen kor ve gizli yanma."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Geçerli sıcak çalışma iznini doğrulayın.",
        "Gerekli atmosfer ölçümlerini yapın ve kaydedin.",
        "Yanıcı maddeleri kaldırın veya uygun örtüyle koruyun.",
        "Alt ve bitişik alanları kontrol edip bariyerleyin.",
        "Yetkin ve yalnızca bu görevle ilgilenen yangın gözcüsü atayın.",
        "Uygun söndürücü ve yangın örtüsünü hazır tutun.",
        "Kablo, hortum, regülatör ve ekipmanı kontrol edin.",
        "Yeterli havalandırma ve duman kontrolü sağlayın.",
        "Kıvılcım ve sıcak malzemenin yayılmasını engelleyin.",
        "İş sonrası gözetim süresini izin üzerinde doğrulayın."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün yapacağımız kaynak, kesme veya taşlama işi küçük bir kıvılcımla büyük bir yangına dönüşebilir. İzin onaylı değilse, gaz ölçümü uygun değilse, yangın gözcüsü görevini bilmiyorsa veya yanıcı maddeler korunmamışsa işe başlamıyoruz. Alt katları ve gizli boşlukları da kontrol edeceğiz. İş bittikten sonra alanı terk etmek yerine izin üzerinde belirtilen süre boyunca yangın gözetimini sürdüreceğiz.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Bugünkü yangın gözcüsü kim ve tek görevi bu mu?",
        "En yakın uygun yangın söndürücü ve alarm noktası nerede?",
        "Gaz ölçümü ne zaman yapıldı ve sonucu nedir?",
        "Kıvılcımlar alt veya bitişik alanlara ulaşabilir mi?",
        "İş sonrası alanı kim ve ne kadar süre kontrol edecek?",
        "Koşullar değişirse çalışmayı kim durduracak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "İzin onaylı",
        "Gaz ölçümü uygun",
        "Yangın gözcüsü hazır",
        "Söndürücü hazır",
        "Yanıcılar kaldırıldı",
        "Alt alan kontrol edildi",
        "Ekipman sağlam",
        "KKD uygun",
        "Havalandırma yeterli",
        "İş sonrası kontrol planlandı"
      ],
      "attendance_title": "KATILIM VE ONAY FORMU",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Çalışma izni, risk değerlendirmesi ve saha prosedürleri önceliklidir."
    },
    "en": {
      "title": "HOT WORK TOOLBOX TALK",
      "subtitle": "Prevent fire and explosion during welding, cutting and grinding.",
      "application_subtitle": "Hazards, controls and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review fire, explosion, burn and fume hazards associated with welding, cutting, grinding, brazing and other spark-producing work, and verify all required controls before starting.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Hot work is not limited to activities involving an open flame. Grinding, metal cutting and other heat-producing work can start fires through sparks, slag and hot surfaces.",
        "Sparks do not remain at the immediate work point. They can travel through platform gaps, penetrations and openings into lower or adjacent areas. Hidden insulation, dust, oil residue or waste can smoulder without being immediately visible.",
        "Hot work must therefore begin only when the permit is valid, gas testing is acceptable, combustibles are controlled, firefighting equipment is ready and a trained fire watch is present. The fire risk continues after the task has stopped."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A maintenance team carried out a short grinding task. Visible combustibles had been removed, but insulation below the platform had not been identified.",
        "Sparks fell through a platform gap. The fire watch was distracted by another duty and no post-work inspection was completed. The insulation ignited approximately twenty minutes later.",
        "The event caused production loss, equipment damage and an emergency evacuation. Proper screening, a dedicated fire watch and post-work monitoring would have prevented it."
      ],
      "remember_title": "REMEMBER",
      "remember": "Some hot-work fires begin after the task is complete because of hidden embers or heated materials.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Sparks and slag reaching lower or adjacent areas.",
        "Ignition of flammable gases, vapours, solvents or dust.",
        "Residual product or pressure inside lines and equipment.",
        "Damaged cables, hoses, regulators or connections.",
        "Welding fumes and inadequate ventilation.",
        "Changing oxygen or gas levels in enclosed spaces.",
        "Unsafe handling or storage of gas cylinders.",
        "Hidden embers and combustion after completion."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Verify the approved hot-work permit.",
        "Complete and record required atmospheric testing.",
        "Remove combustibles or protect them with suitable covers.",
        "Inspect and barricade lower and adjacent areas.",
        "Assign a trained and dedicated fire watch.",
        "Provide appropriate extinguishers and fire blankets.",
        "Inspect cables, hoses, regulators and equipment.",
        "Provide adequate ventilation and fume control.",
        "Contain sparks, slag and hot materials.",
        "Confirm the post-work monitoring period on the permit."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, today's welding, cutting or grinding can turn a small spark into a major fire. We will not start if the permit is not approved, gas testing is unsafe, the fire watch does not understand the role or combustibles remain unprotected. We must inspect lower levels and hidden openings as well. After the work stops, the fire watch will continue for the full period stated on the permit.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Who is today's dedicated fire watch?",
        "Where are the nearest suitable extinguisher and alarm point?",
        "When was gas testing completed and what were the results?",
        "Can sparks reach lower or adjacent areas?",
        "Who will inspect the area after completion and for how long?",
        "Who has authority to stop the work if conditions change?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Permit approved",
        "Gas test acceptable",
        "Fire watch ready",
        "Extinguisher ready",
        "Combustibles removed",
        "Lower area checked",
        "Equipment inspected",
        "PPE suitable",
        "Ventilation adequate",
        "Post-work watch planned"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Permit conditions, risk assessments and site procedures take priority."
    }
  },
  {
    "slug": "housekeeping",
    "sourceFile": "housekeeping.py",
    "base": "housekeeping-toolbox-talk",
    "tr": {
      "title": "HOUSEKEEPING VE DÜZEN TOOLBOX TALK",
      "subtitle": "Temiz geçiş yolları, düzenli çalışma alanları ve güvenli atık yönetimi sağlayın.",
      "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Çalışma alanındaki düzensizlik, atık, döküntü, uygunsuz istifleme ve kapatılmış geçiş yollarından kaynaklanan kayma, takılma, düşme, yangın ve erişim risklerini değerlendirmek ve iş boyunca düzenin korunmasını sağlamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Housekeeping yalnızca iş bitiminde yapılan temizlik değildir. Malzeme, ekipman, kablo, hortum, ambalaj ve atıkların çalışma boyunca güvenli şekilde düzenlenmesi işin temel bir parçasıdır.",
        "Geçiş yollarındaki küçük bir parça, yerde bırakılan bir kablo veya dökülen yağ ciddi yaralanmalara neden olabilir. Aynı düzensizlik acil çıkışları, yangın ekipmanlarını ve kurtarma erişimini de engelleyebilir.",
        "Her ekip kendi çalışma alanından sorumludur. Atıklar uygun kaplara ayrılmalı, malzemeler devrilmeyecek şekilde istiflenmeli ve iş ilerledikçe gereksiz ekipman sahadan kaldırılmalıdır."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir bakım ekibi çalışma sırasında kablo parçalarını, ambalajları ve kullanılmayan ekipmanı platform geçiş yolunda bıraktı.",
        "Vardiya değişiminde alana giren başka bir çalışan yerdeki kabloya takıldı, dengesini kaybetti ve elindeki ekipmanı alt seviyeye düşürdü.",
        "Olay; geçiş yollarının sürekli açık tutulması, atıkların anında toplanması ve vardiya tesliminden önce alan kontrolü yapılmasıyla tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Temiz ve düzenli bir saha yalnızca iyi görünmez; düşmeleri, yangınları, ekipman hasarını ve acil durumlarda gecikmeyi önler.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Geçiş yollarındaki kablo, hortum, malzeme ve atıklar.",
        "Yağ, su veya kimyasal döküntüleri.",
        "Uygunsuz ve dengesiz malzeme istifleri.",
        "Acil çıkışların veya yangın ekipmanlarının engellenmesi.",
        "Keskin kenarlı metal ve ambalaj atıkları.",
        "Platform ve iskelelerde aşırı malzeme birikmesi.",
        "Yanıcı atıkların uygunsuz kaplarda tutulması.",
        "İş bitiminde alanda bırakılan ekipman ve artık malzemeler."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Geçiş ve kaçış yollarını sürekli açık tutun.",
        "Kablo ve hortumları güvenli güzergâhlardan geçirin.",
        "Döküntüleri hemen temizleyin ve alanı işaretleyin.",
        "Atıkları türüne uygun işaretli kaplara atın.",
        "Malzemeleri sağlam, dengeli ve erişilebilir şekilde istifleyin.",
        "Yangın ekipmanı ve panoların önünü boş bırakın.",
        "Keskin atıkları uygun kaplarda toplayın.",
        "Platformlarda gereksiz malzeme biriktirmeyin.",
        "Vardiya sonunda çalışma alanını kontrol edin.",
        "Uygunsuzluğu gördüğünüz anda düzeltin veya bildirin."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün çalışma alanını yalnızca iş sonunda değil, iş boyunca düzenli tutacağız. Geçiş yollarında kablo, hortum, atık veya gereksiz malzeme bırakmayacağız. Döküntü görürsek beklemeyecek, alanı güvenli hale getirip temizleyeceğiz. Acil çıkışların ve yangın ekipmanlarının önü her zaman açık olacak. Her ekip kendi alanından sorumludur.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Bugünkü geçiş ve kaçış yolları tamamen açık mı?",
        "Kablo ve hortumlar güvenli şekilde yönlendirildi mi?",
        "Atık kapları nerede ve doğru şekilde işaretli mi?",
        "Döküntü olması halinde kim müdahale edecek?",
        "Yangın ekipmanlarının önü açık mı?",
        "Vardiya sonunda alanı kim kontrol edecek?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Geçiş yolları açık",
        "Acil çıkışlar açık",
        "Kablolar düzenli",
        "Hortumlar güvenli",
        "Atık kapları hazır",
        "İstifleme güvenli",
        "Döküntü yok",
        "Yangın ekipmanı erişilebilir",
        "Platformlar temiz",
        "Alan sorumlusu belli"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Atık yönetimi, yangın güvenliği ve saha prosedürleri önceliklidir."
    },
    "en": {
      "title": "HOUSEKEEPING TOOLBOX TALK",
      "subtitle": "Maintain clear walkways, organised work areas and safe waste control.",
      "application_subtitle": "Hazards, control measures and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review slip, trip, fall, fire and access hazards caused by poor housekeeping, waste, spills, unsafe storage and obstructed walkways, and maintain an orderly work area throughout the task.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Housekeeping is not limited to cleaning at the end of the job. Materials, tools, cables, hoses, packaging and waste must be controlled safely throughout the work.",
        "A small item in a walkway, an unsecured cable or an oil spill can cause a serious injury. Poor housekeeping can also block emergency exits, firefighting equipment and rescue access.",
        "Each team is responsible for its own work area. Waste must be segregated, materials must be stored securely and unnecessary equipment must be removed as the work progresses."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A maintenance team left cable pieces, packaging and unused equipment in a platform walkway.",
        "During the shift change, another worker entered the area, tripped over a cable and dropped equipment to a lower level.",
        "The incident could have been prevented by keeping walkways clear, removing waste immediately and inspecting the area before handing over the shift."
      ],
      "remember_title": "REMEMBER",
      "remember": "A clean and organised workplace does more than look professional; it prevents falls, fires, equipment damage and delays during emergencies.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Cables, hoses, materials and waste in walkways.",
        "Oil, water or chemical spills.",
        "Unsafe or unstable material storage.",
        "Blocked emergency exits or firefighting equipment.",
        "Sharp metal and packaging waste.",
        "Excessive material stored on platforms or scaffolds.",
        "Flammable waste stored in unsuitable containers.",
        "Tools and leftover materials abandoned after work."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Keep access and escape routes clear at all times.",
        "Route cables and hoses safely.",
        "Clean spills immediately and mark the area.",
        "Place waste in correctly labelled containers.",
        "Store materials securely and in a stable condition.",
        "Keep firefighting equipment and panels accessible.",
        "Dispose of sharp waste in suitable containers.",
        "Avoid unnecessary material accumulation on platforms.",
        "Inspect the work area at the end of the shift.",
        "Correct or report poor housekeeping immediately."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, today we will maintain good housekeeping throughout the task, not only at the end. We will not leave cables, hoses, waste or unnecessary materials in walkways. Any spill will be controlled and cleaned immediately. Emergency exits and firefighting equipment must remain accessible. Each team is responsible for its own work area.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Are today's access and escape routes completely clear?",
        "Have cables and hoses been routed safely?",
        "Where are the waste containers and are they correctly labelled?",
        "Who will respond if a spill occurs?",
        "Is firefighting equipment fully accessible?",
        "Who will inspect the area at the end of the shift?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Walkways clear",
        "Emergency exits clear",
        "Cables organised",
        "Hoses routed safely",
        "Waste containers ready",
        "Storage stable",
        "No spills present",
        "Fire equipment accessible",
        "Platforms clean",
        "Area owner identified"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Waste management, fire safety and site procedures take priority."
    }
  },
  {
    "slug": "ladder-safety",
    "sourceFile": "ladder_safety.py",
    "base": "ladder-safety-toolbox-talk",
    "tr": {
      "title": "MERDİVEN GÜVENLİĞİ TOOLBOX TALK",
      "subtitle": "Düşme, kayma ve devrilme risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, güvenli kullanım ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Seyyar ve sabit merdivenlerin güvenli kullanımını sağlayarak düşme, kayma, devrilme ve yanlış kullanım kaynaklı kazaları önlemektir.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Merdiven yalnızca kısa süreli ve düşük riskli işler için kullanılmalıdır. Uzun süreli çalışmalar için platform veya iskele tercih edilmelidir.",
        "Merdiven her kullanımdan önce kontrol edilmeli; çatlak, eğilmiş basamak, gevşek bağlantı ve kaydırmaz ayak eksikliği varsa kullanılmamalıdır.",
        "Kurulum sırasında 4:1 açısı uygulanmalı, üç temas noktası korunmalı ve merdiven sağlam bir zemine yerleştirilmelidir. Üst basamakta çalışılmamalı ve yana aşırı uzanılmamalıdır."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan gevşek zemine yerleştirilen merdivende üst basamakta çalışırken yana uzandı.",
        "Merdiven kaydı ve çalışan dengesini kaybederek düştü.",
        "Doğru açı, sağlam zemin, merdivenin sabitlenmesi ve çalışma pozisyonunun değiştirilmesi ile olay tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Merdiven sizi işe ulaştırır; çalışma platformunun yerini almaz.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Hasarlı merdiven kullanımı.",
        "Yanlış kurulum açısı.",
        "Kaygan veya dengesiz zemin.",
        "Üst basamakta çalışma.",
        "Yana aşırı uzanma.",
        "Metal merdivenin elektrik yakınında kullanılması.",
        "Merdivenin sabitlenmemesi.",
        "Merdivende yük taşıma."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Merdiveni kullanmadan önce kontrol edin.",
        "4:1 kurulum kuralını uygulayın.",
        "Üç temas noktasını koruyun.",
        "Merdiveni sabitleyin.",
        "Üst basamakta çalışmayın.",
        "Yana uzanmak yerine merdiveni yeniden konumlandırın.",
        "Elektrik işlerinde fiberglas merdiven kullanın.",
        "Kaymaz ayakları kontrol edin.",
        "Hasarlı merdiveni etiketleyip kullanımdan kaldırın.",
        "Gerekirse çalışma alanını bariyerleyin."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Bugün tüm merdivenler kullanılmadan önce kontrol edilecek. Hasarlı merdiven kullanılmayacak. 4:1 açısı uygulanacak, üç temas noktası korunacak ve kimse üst basamakta çalışmayacak.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Merdiven kontrol edildi mi?",
        "4:1 açısı uygulandı mı?",
        "Merdiven sabitlendi mi?",
        "Zemin güvenli mi?",
        "Elektrik riski var mı?",
        "Üç temas noktası korunacak mı?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Merdiven sağlam",
        "Basamaklar sağlam",
        "Kaymaz ayaklar uygun",
        "4:1 açısı doğru",
        "Merdiven sabit",
        "Zemin güvenli",
        "Elektrik riski değerlendirildi",
        "Üç temas noktası uygulanacak",
        "KKD uygun",
        "Ekip bilgilendirildi"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları",
      "footer": "SERNEM HSE Resource — Ladder Safety"
    },
    "en": {
      "title": "LADDER SAFETY TOOLBOX TALK",
      "subtitle": "Control fall, slip and overturn hazards.",
      "application_subtitle": "Hazards, safe use and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Ensure the safe use of portable and fixed ladders while preventing falls, slips, overturning and misuse.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Use ladders only for short-duration, low-risk work.",
        "Inspect ladders before use and remove damaged ladders from service.",
        "Apply the 4:1 rule, maintain three points of contact and position the ladder on stable ground."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker overreached while standing on the top step of a ladder.",
        "The ladder slipped and the worker fell.",
        "Correct positioning and repositioning the ladder would have prevented the incident."
      ],
      "remember_title": "REMEMBER",
      "remember": "A ladder provides access, not a work platform.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Damaged ladders",
        "Incorrect angle",
        "Unstable ground",
        "Standing on the top step",
        "Overreaching",
        "Metal ladders near electricity",
        "Unsecured ladders",
        "Carrying loads while climbing"
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Inspect before use.",
        "Apply the 4:1 rule.",
        "Maintain three points of contact.",
        "Secure the ladder.",
        "Do not stand on the top step.",
        "Reposition instead of overreaching.",
        "Use fiberglass ladders near electricity.",
        "Check anti-slip feet.",
        "Remove damaged ladders from service.",
        "Barricade the area if necessary."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Today all ladders will be inspected before use. We will apply the 4:1 rule, maintain three points of contact and never work from the top step.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Has the ladder been inspected?",
        "Is the 4:1 rule applied?",
        "Is the ladder secured?",
        "Is the ground stable?",
        "Is there an electrical hazard?",
        "Will three points of contact be maintained?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Ladder inspected",
        "Rungs intact",
        "Anti-slip feet OK",
        "Correct angle",
        "Ladder secured",
        "Ground stable",
        "Electrical hazard assessed",
        "Three-point contact",
        "PPE worn",
        "Team briefed"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes",
      "footer": "SERNEM HSE Resource — Ladder Safety"
    }
  },
  {
    "slug": "lifting-operations",
    "sourceFile": "lifting_operations.py",
    "base": "lifting-operations-toolbox-talk",
    "tr": {
      "title": "KALDIRMA OPERASYONLARI TOOLBOX TALK",
      "subtitle": "Yük düşmesi, sıkışma ve ekipman arızası risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, kaldırma kontrolleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Vinç, kaldırma ekipmanı ve aksesuarlarıyla yapılan çalışmalarda yük düşmesi, sıkışma, çarpma, devrilme, aşırı yükleme ve iletişim hatası risklerini değerlendirmek; kaldırma planı, yetkin personel, ekipman uygunluğu ve alan kontrolünü doğrulamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Kaldırma operasyonu yalnızca vincin yükü kaldırması değildir. Operatör, rigger, işaretçi, kaldırma aksesuarları, zemin, rüzgâr, yükün ağırlık merkezi ve çalışma alanı birlikte değerlendirilmelidir.",
        "Kullanılacak sapan, mapa, kanca, travers ve diğer aksesuarların kapasitesi yüke uygun olmalı; kimlikleri, sertifikaları ve fiziksel durumları kontrol edilmelidir. Hasarlı veya etiketsiz ekipman kullanılmamalıdır.",
        "Yük altında veya dönüş yarıçapı içinde personel bulunmamalıdır. Kör kaldırmalarda iletişim yöntemi net olmalı ve yalnızca belirlenmiş işaretçi operatöre komut vermelidir."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir ekip kısa süreli kaldırma için mevcut sapanı kullandı ancak sapanın etiketi okunmuyordu ve yükün ağırlığı doğrulanmamıştı.",
        "Kaldırma sırasında yük dengesizleşti, bir taraf aşağı düştü ve yakındaki çalışan sıkışma tehlikesi yaşadı. Alan yeterince bariyerlenmemişti.",
        "Olay; kaldırma planı, yük ağırlığı doğrulaması, uygun kapasitede ekipman seçimi, deneme kaldırması ve etkin bariyerleme ile önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Yük havadayken kimse yükün altında veya düşme hattında bulunmamalıdır. Şüphe varsa kaldırmayı durdurun.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Yükün düşmesi veya kontrolsüz salınımı.",
        "Uygun olmayan veya hasarlı kaldırma aksesuarları.",
        "Aşırı yükleme veya yanlış kapasite seçimi.",
        "Yük ağırlık merkezinin yanlış değerlendirilmesi.",
        "Personelin yük altında veya dönüş alanında bulunması.",
        "Kör kaldırma ve iletişim kaybı.",
        "Yetersiz zemin taşıma kapasitesi veya uygunsuz destekleme.",
        "Yüksek rüzgâr ve olumsuz hava koşulları."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Onaylı kaldırma planını ve risk değerlendirmesini doğrulayın.",
        "Yük ağırlığını ve ağırlık merkezini belirleyin.",
        "Vinç ve aksesuarların kapasitesini kontrol edin.",
        "Sapan, kanca, mapa ve diğer ekipmanı görsel olarak inceleyin.",
        "Yetkin operatör, rigger ve işaretçi görevlendirin.",
        "Kaldırma alanını bariyerleyin ve personeli uzak tutun.",
        "Kör kaldırmalarda güvenilir iletişim yöntemi sağlayın.",
        "Gerekli durumlarda tag line kullanın.",
        "Deneme kaldırması yaparak yük dengesini kontrol edin.",
        "Rüzgâr, zemin ve çevresel koşulları doğrulayın."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün kaldırma başlamadan önce planı, yük ağırlığını, ekipman kapasitesini ve bariyerlemeyi birlikte kontrol edeceğiz. Yük altında veya dönüş alanında kimse bulunmayacak. Operatöre yalnızca belirlenmiş işaretçi komut verecek. Ekipmanda hasar, iletişim kaybı veya koşullarda değişiklik olursa kaldırmayı hemen durduracağız.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Yükün ağırlığı ve ağırlık merkezi doğrulandı mı?",
        "Kullanılacak ekipmanın kapasitesi uygun mu?",
        "Operatör, rigger ve işaretçi kim?",
        "Kaldırma alanı tamamen bariyerlendi mi?",
        "Kör kaldırmada iletişim nasıl sağlanacak?",
        "Rüzgâr veya zemin koşulları kaldırmaya uygun mu?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Kaldırma planı onaylı",
        "Yük ağırlığı biliniyor",
        "Ağırlık merkezi belirlendi",
        "Ekipman kapasitesi uygun",
        "Aksesuarlar kontrol edildi",
        "Personel yetkin",
        "Alan bariyerli",
        "İletişim hazır",
        "Deneme kaldırması planlı",
        "Hava ve zemin uygun"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Kaldırma planı, ekipman sertifikaları ve saha kaldırma prosedürleri önceliklidir."
    },
    "en": {
      "title": "LIFTING OPERATIONS TOOLBOX TALK",
      "subtitle": "Control dropped-load, crushing and equipment-failure hazards.",
      "application_subtitle": "Hazards, lifting controls and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review dropped-load, crushing, impact, overturning, overloading and communication hazards during lifting operations, and verify the lifting plan, competent personnel, equipment suitability and work-area controls before starting.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "A lifting operation involves more than the crane itself. The operator, rigger, signalman, lifting accessories, ground conditions, wind, load centre of gravity and work area must be considered together.",
        "Slings, shackles, hooks, beams and other accessories must be suitable for the load. Their identification, certification and physical condition must be checked. Damaged or unmarked equipment must not be used.",
        "No person may stand below a suspended load or within the swing radius. During blind lifts, communication must be reliable and only the designated signalman should direct the operator."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A team used an available sling for a short lift, but the sling label was unreadable and the load weight had not been verified.",
        "During lifting, the load became unstable and one side dropped. A nearby worker was exposed to a crushing hazard because the area was not adequately barricaded.",
        "The event could have been prevented through an approved lifting plan, verified load weight, correct equipment selection, a trial lift and effective exclusion control."
      ],
      "remember_title": "REMEMBER",
      "remember": "No one may stand below a suspended load or in the line of fire. Stop the lift whenever there is doubt.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Dropped loads or uncontrolled load movement.",
        "Unsuitable or damaged lifting accessories.",
        "Overloading or incorrect capacity selection.",
        "Incorrect assessment of the load centre of gravity.",
        "Personnel inside the suspended-load or swing area.",
        "Blind lifting and loss of communication.",
        "Poor ground bearing capacity or inadequate outrigger support.",
        "High winds and adverse weather conditions."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Verify the approved lifting plan and risk assessment.",
        "Confirm the load weight and centre of gravity.",
        "Check crane and accessory capacities.",
        "Inspect slings, hooks, shackles and other equipment.",
        "Assign competent operators, riggers and signalmen.",
        "Barricade the lifting area and exclude personnel.",
        "Provide reliable communication for blind lifts.",
        "Use tag lines where appropriate.",
        "Complete a trial lift to confirm load stability.",
        "Verify wind, ground and environmental conditions."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, before lifting today, we will confirm the plan, load weight, equipment capacity and exclusion zone. No one will stand below the load or inside the swing area. Only the designated signalman will direct the operator. We will stop immediately if equipment damage, communication failure or changing conditions are identified.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Has the load weight and centre of gravity been confirmed?",
        "Is the selected equipment capacity suitable?",
        "Who are the operator, rigger and signalman?",
        "Is the lifting area fully barricaded?",
        "How will communication be maintained during a blind lift?",
        "Are wind and ground conditions acceptable?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Lifting plan approved",
        "Load weight confirmed",
        "Centre of gravity identified",
        "Equipment capacity suitable",
        "Accessories inspected",
        "Personnel competent",
        "Area barricaded",
        "Communication ready",
        "Trial lift planned",
        "Weather and ground suitable"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Lifting plans, equipment certification and site lifting procedures take priority."
    }
  },
  {
    "slug": "loto",
    "sourceFile": "loto.py",
    "base": "loto-toolbox-talk",
    "tr": {
      "title": "LOTO ENERJİ İZOLASYONU TOOLBOX TALK",
      "subtitle": "Beklenmeyen enerji verilmesini, hareketi ve tehlikeli enerji boşalmasını önleyin.",
      "application_subtitle": "Tehlikeler, izolasyon adımları ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Bakım, temizlik, ayar, kontrol ve müdahale çalışmalarında elektriksel, mekanik, hidrolik, pnömatik, termal, kimyasal ve depolanmış enerjileri güvenli şekilde izole etmek; ekipmanın beklenmedik şekilde çalışmasını veya enerji boşaltmasını önlemektir.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "LOTO yalnızca elektrik şalterini kapatmak değildir. Ekipmanda bulunan bütün enerji kaynakları belirlenmeli, uygun izolasyon noktalarından ayrılmalı, kilitlenmeli, etiketlenmeli ve kalan enerji güvenli şekilde boşaltılmalıdır.",
        "Her çalışan kendi kişisel kilidini kullanmalıdır. Bir başkasının kilidine güvenerek çalışmak veya ekip kilidi bulunurken kişisel kilit takmamak ciddi bir kontrol kaybıdır. Kişisel kilit yalnızca sahibi tarafından çıkarılmalıdır.",
        "İzolasyon tamamlandıktan sonra sıfır enerji durumu doğrulanmalıdır. Start düğmesine basmak, uygun test cihazıyla ölçüm yapmak, basıncı boşaltmak ve hareketli parçaları emniyete almak gibi doğrulamalar yapılmadan çalışmaya başlanmamalıdır."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir bakım ekibi sıkışan ekipmana müdahale etmek için ana şalteri kapattı ancak pnömatik hattı izole etmedi ve sistemde kalan basıncı boşaltmadı.",
        "Çalışan hareketli parçaya müdahale ederken sistemdeki basınç aniden boşaldı ve ekipman beklenmedik şekilde hareket etti.",
        "Olay; bütün enerji kaynaklarının belirlenmesi, hava hattının kilitlenmesi, kalan basıncın boşaltılması ve sıfır enerji doğrulaması ile tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Kapatılmış ekipman güvenli ekipman değildir. İzole edilmiş, kilitlenmiş, etiketlenmiş ve sıfır enerji durumu doğrulanmış ekipman güvenlidir.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Belirlenmemiş ikincil veya yedek enerji kaynakları.",
        "Şalter kapalı olsa bile ekipmanın yeniden enerjilenmesi.",
        "Hidrolik veya pnömatik sistemlerde kalan basınç.",
        "Yay, volan, karşı ağırlık veya yükseltilmiş parçalar.",
        "Sıcak yüzeyler, buhar veya termal enerji.",
        "Başka bir kişinin kilidinin yetkisiz çıkarılması.",
        "Vardiya değişiminde kilit kontrolünün kaybedilmesi.",
        "Test ve devreye alma sırasında çalışanların tehlike alanında kalması."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Bütün enerji kaynaklarını ve izolasyon noktalarını belirleyin.",
        "Ekipmanı normal durdurma yöntemiyle kapatın.",
        "Enerji kaynaklarını fiziksel olarak izole edin.",
        "Her çalışan kendi kişisel kilidini ve etiketini taksın.",
        "Depolanmış enerjiyi boşaltın, sabitleyin veya bloke edin.",
        "Elektriksel sıfır enerji durumunu uygun cihazla test edin.",
        "Start denemesi yaparak ekipmanın çalışmadığını doğrulayın.",
        "İzolasyon sınırını ve etkilediği ekipmanı ekiple paylaşın.",
        "Vardiya değişiminde kilit transfer prosedürünü uygulayın.",
        "Kilitler çıkarılmadan önce alanı ve personeli kontrol edin."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün çalışacağımız ekipmanda yalnızca şalteri kapatmak yeterli değildir. Elektrik, hava, hidrolik basınç, sıcaklık, yay ve hareketli parçalar dahil bütün enerji kaynaklarını belirleyeceğiz. Her çalışan kendi kişisel kilidini takacak. Kalan enerji boşaltılmadan ve sıfır enerji durumu doğrulanmadan çalışmaya başlamayacağız. İzolasyonda bir değişiklik olursa işi hemen durduracağız.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Ekipmanın bütün enerji kaynakları belirlendi mi?",
        "Hangi izolasyon noktaları kilitlenecek?",
        "Depolanmış enerji nasıl boşaltılacak veya sabitlenecek?",
        "Her çalışan kendi kişisel kilidini taktı mı?",
        "Sıfır enerji durumu nasıl doğrulanacak?",
        "Vardiya değişiminde kilit kontrolü nasıl devredilecek?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "İzolasyon planı hazır",
        "Enerji kaynakları belirlendi",
        "Ekipman durduruldu",
        "İzolasyon noktaları kapalı",
        "Kişisel kilitler takılı",
        "Etiketler okunabilir",
        "Kalan enerji boşaltıldı",
        "Sıfır enerji doğrulandı",
        "Start testi yapıldı",
        "Ekip bilgilendirildi"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — İzolasyon planı, çalışma izni ve saha LOTO prosedürleri önceliklidir."
    },
    "en": {
      "title": "LOCKOUT TAGOUT TOOLBOX TALK",
      "subtitle": "Prevent unexpected energisation, movement and release of hazardous energy.",
      "application_subtitle": "Hazards, isolation steps and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Safely isolate electrical, mechanical, hydraulic, pneumatic, thermal, chemical and stored energy during maintenance, cleaning, adjustment and inspection work, and prevent unexpected start-up or hazardous energy release.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "LOTO is not limited to switching off electrical power. Every energy source must be identified, isolated at the correct point, locked, tagged and relieved of stored energy before work begins.",
        "Each worker must use an individual personal lock. Working under another person's lock or relying only on a group lock creates a serious loss of control. A personal lock should only be removed by its owner under the approved procedure.",
        "Zero-energy status must be verified after isolation. Try-start testing, electrical testing, pressure release and securing moving parts must be completed before anyone enters the danger zone."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A maintenance team switched off the main electrical isolator before clearing a jam, but did not isolate the pneumatic line or release residual pressure.",
        "While a worker reached into the equipment, the remaining pressure released and caused unexpected movement.",
        "The incident could have been prevented by identifying all energy sources, locking the air supply, releasing residual pressure and verifying a zero-energy condition."
      ],
      "remember_title": "REMEMBER",
      "remember": "Switched-off equipment is not necessarily safe. Equipment is safe only when it is isolated, locked, tagged and verified at zero energy.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Unidentified secondary or backup energy sources.",
        "Unexpected re-energisation after shutdown.",
        "Residual hydraulic or pneumatic pressure.",
        "Springs, flywheels, counterweights or raised components.",
        "Hot surfaces, steam or stored thermal energy.",
        "Unauthorised removal of another worker's lock.",
        "Loss of lock control during shift change.",
        "Workers remaining exposed during testing or commissioning."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Identify all energy sources and isolation points.",
        "Shut down equipment using the normal stop procedure.",
        "Physically isolate every hazardous energy source.",
        "Each worker must apply a personal lock and tag.",
        "Release, restrain or block all stored energy.",
        "Test electrical isolation with a suitable test instrument.",
        "Complete a try-start test to confirm no operation.",
        "Communicate the isolation boundary to the full team.",
        "Apply the approved shift-change lock-transfer procedure.",
        "Check the area and personnel before removing locks."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, switching off the equipment is not enough. We will identify every energy source, including electricity, air, hydraulic pressure, heat, springs and moving parts. Each worker will apply a personal lock. We will not begin until stored energy has been released and zero energy has been verified. Any change to the isolation requires the work to stop immediately.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Have all energy sources been identified?",
        "Which isolation points will be locked?",
        "How will stored energy be released or restrained?",
        "Has each worker applied a personal lock?",
        "How will zero energy be verified?",
        "How will lock control transfer during shift change?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Isolation plan ready",
        "Energy sources identified",
        "Equipment shut down",
        "Isolation points secured",
        "Personal locks applied",
        "Tags readable",
        "Stored energy released",
        "Zero energy verified",
        "Try-start completed",
        "Team informed"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Isolation plans, permits and site LOTO procedures take priority."
    }
  },
  {
    "slug": "manual-handling",
    "sourceFile": "manual_handling.py",
    "base": "manual-handling-toolbox-talk",
    "tr": {
      "title": "ELLE TAŞIMA TOOLBOX TALK",
      "subtitle": "Yükleri doğru değerlendirin, güvenli kaldırın ve gereksiz zorlanmayı önleyin.",
      "application_subtitle": "Kaldırma, taşıma, itme, çekme ve elle konumlandırma işleri öncesinde uygulanır.",
      "duration": "5–7 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Elle taşıma sırasında bel, sırt, omuz, el ve kas-iskelet yaralanmalarını önlemek; yükün, çalışma alanının ve kişinin kapasitesinin işe başlamadan önce değerlendirilmesini sağlamak.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Elle taşıma yalnızca ağır yüklerin kaldırılması değildir. Taşıma, indirme, itme, çekme, tutma ve tekrarlı hareketler de kas-iskelet sistemini zorlayabilir.",
        "Yükün ağırlığı kadar şekli, tutma noktaları, dengesizliği, görüşü engellemesi ve taşıma mesafesi de değerlendirilmelidir.",
        "Mümkün olan her durumda forklift, transpalet, vinç, el arabası veya başka bir mekanik yardım kullanılmalıdır.",
        "Yük güvenli şekilde taşınamıyorsa çalışan tek başına kaldırmaya zorlanmamalıdır."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan, zeminden yaklaşık 30 kilogramlık düzensiz şekilli bir ekipman parçasını tek başına kaldırmaya çalışır.",
        "Yükün uygun tutma noktası yoktur ve taşıma yolu üzerindeki malzemeler çalışanın hareketini sınırlar.",
        "Çalışan yükü kaldırırken belinden ani şekilde dönerek yaralanır."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": [
        "Yükü kaldırmadan önce ağırlığını ve ağırlık merkezini değerlendirin.",
        "Ayaklarınızı dengeli konumlandırın ve yükü vücudunuza yakın tutun.",
        "Belden eğilmek yerine dizlerinizi bükün.",
        "Yük taşırken gövdenizi döndürmeyin; ayaklarınızla yön değiştirin.",
        "Yardım istemek zayıflık değil, doğru güvenlik davranışıdır."
      ],
      "hazards_title": "ANA TEHLİKELER",
      "hazards": [
        "Bel ve sırt incinmeleri",
        "Kas zorlanmaları ve burkulmalar",
        "El ve parmak sıkışmaları",
        "Yükün düşmesi",
        "Kayma, takılma ve düşme",
        "Görüşün engellenmesi",
        "Tekrarlı hareketlere bağlı zorlanmalar"
      ],
      "controls_title": "TEMEL KONTROLLER",
      "controls": [
        "Yükü kaldırmadan önce ağırlığını, boyutunu, şeklini ve tutma noktalarını değerlendirin.",
        "Mekanik kaldırma ve taşıma ekipmanlarını öncelikli olarak kullanın.",
        "Taşıma yolunu önceden kontrol edin ve engelleri kaldırın.",
        "Gerekli olduğunda ekip halinde kaldırma yapın ve tek bir kişiyi yönlendirme için belirleyin.",
        "Yükü vücuda yakın tutun ve ani hareketlerden kaçının.",
        "Uygun eldiven ve iş ayakkabısı kullanın.",
        "Kapasitenizi aşan veya kontrol edemediğiniz yükleri kaldırmayın."
      ],
      "supervisor_title": "SUPERVISOR KONUŞMA METNİ",
      "supervisor_script": [
        "Bugün elle taşıma sırasında en çok hangi işlerde zorlanıyoruz?",
        "Sahada kullanabileceğimiz mekanik yardımcı ekipmanlar nelerdir?",
        "Taşıma yolu üzerinde yük taşımayı zorlaştıran engeller var mı?",
        "Tek kişiyle yapılmaması gereken işler hangileridir?"
      ],
      "questions_title": "EKİBE SORULAR",
      "questions": [
        "Bu yükü tek başınıza güvenli şekilde kaldırabilir misiniz?",
        "Yükün ağırlık merkezi nerede?",
        "Taşıma yolu temiz ve güvenli mi?",
        "Mekanik yardım veya ikinci bir çalışan gerekli mi?",
        "Yük görüş alanınızı kapatıyor mu?"
      ],
      "verification_title": "İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Yük ve taşıma yöntemi değerlendirildi.",
        "Taşıma yolu temizlendi.",
        "Gerekli mekanik yardım hazır.",
        "Ekip halinde kaldırma gerekiyorsa görevler belirlendi.",
        "Uygun KKD kullanılıyor."
      ],
      "attendance_title": "KATILIM VE KAYIT",
      "fields": [
        "Tarih",
        "Saha / Bölge",
        "Supervisor",
        "Katılımcılar",
        "İmza"
      ],
      "table_headers": [
        "Ad Soyad",
        "Görev",
        "İmza"
      ],
      "notes_title": "NOTLAR",
      "footer": "Bu toolbox genel rehberlik sağlar. Sahaya özgü risk değerlendirmesi, iş yöntemi ve şirket prosedürleri uygulanmalıdır."
    },
    "en": {
      "title": "MANUAL HANDLING TOOLBOX TALK",
      "subtitle": "Assess loads correctly, lift safely and prevent unnecessary strain.",
      "application_subtitle": "Use before lifting, carrying, pushing, pulling or manually positioning loads.",
      "duration": "5–7 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Prevent back, shoulder, hand and musculoskeletal injuries during manual handling by assessing the load, work area and individual capacity before starting.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Manual handling includes lifting, lowering, carrying, pushing, pulling, holding and repetitive movements.",
        "The load's shape, grip points, stability, travel distance and effect on visibility must be considered, not only its weight.",
        "Use forklifts, pallet trucks, cranes, trolleys or other mechanical aids whenever reasonably practicable.",
        "Workers must not be pressured to lift a load that cannot be handled safely."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker attempts to lift an irregular 30-kilogram equipment part from the floor without assistance.",
        "The load has poor grip points and materials obstruct the carrying route.",
        "The worker twists while lifting and suffers a back injury."
      ],
      "remember_title": "REMEMBER",
      "remember": [
        "Assess the load and centre of gravity before lifting.",
        "Keep a stable stance and hold the load close to your body.",
        "Bend your knees instead of bending from the waist.",
        "Turn with your feet instead of twisting your torso.",
        "Asking for assistance is the correct safety decision."
      ],
      "hazards_title": "MAIN HAZARDS",
      "hazards": [
        "Back and spinal injuries",
        "Muscle strains and sprains",
        "Hand and finger trapping",
        "Dropped loads",
        "Slips, trips and falls",
        "Restricted visibility",
        "Repetitive strain injuries"
      ],
      "controls_title": "KEY CONTROLS",
      "controls": [
        "Assess the load's weight, size, shape and grip points.",
        "Use mechanical lifting and transport equipment wherever possible.",
        "Inspect and clear the carrying route before starting.",
        "Use team lifting where required and appoint one person to coordinate.",
        "Keep the load close to the body and avoid sudden movements.",
        "Wear suitable gloves and safety footwear.",
        "Do not lift loads beyond your safe capacity or control."
      ],
      "supervisor_title": "SUPERVISOR SCRIPT",
      "supervisor_script": [
        "Which manual-handling tasks create the most difficulty today?",
        "What mechanical aids are available in our work area?",
        "Are there obstacles along the planned carrying route?",
        "Which tasks must not be completed by one person?"
      ],
      "questions_title": "QUESTIONS FOR THE TEAM",
      "questions": [
        "Can you safely control this load alone?",
        "Where is the load's centre of gravity?",
        "Is the carrying route clear?",
        "Is mechanical assistance or a second worker required?",
        "Does the load restrict your view?"
      ],
      "verification_title": "VERIFY BEFORE STARTING",
      "verification": [
        "The load and handling method have been assessed.",
        "The carrying route is clear.",
        "Required mechanical aids are available.",
        "Team-lifting roles are agreed where required.",
        "Suitable PPE is being used."
      ],
      "attendance_title": "ATTENDANCE AND RECORD",
      "fields": [
        "Date",
        "Site / Area",
        "Supervisor",
        "Participants",
        "Signature"
      ],
      "table_headers": [
        "Name",
        "Position",
        "Signature"
      ],
      "notes_title": "NOTES",
      "footer": "This toolbox provides general guidance. Apply site-specific risk assessments, work methods and company procedures."
    }
  },
  {
    "slug": "mobile-equipment-safety",
    "sourceFile": "mobile_equipment_safety.py",
    "base": "mobile-equipment-safety-toolbox-talk",
    "tr": {
      "title": "MOBİL EKİPMAN GÜVENLİĞİ TOOLBOX TALK",
      "subtitle": "Kör nokta, geri manevra, çarpma ve devrilme risklerini kontrol edin.",
      "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Ekskavatör, loader, telehandler, forklift, manlift, dumper ve benzeri mobil ekipmanların kullanımı sırasında oluşabilecek çarpma, sıkışma, ezilme, devrilme, kör nokta ve geri manevra risklerini değerlendirmek; operatör, ekipman, alan ve yaya kontrollerini doğrulamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Mobil ekipmanların çevresinde operatörün doğrudan göremediği geniş kör noktalar bulunur. Yaya personel operatörle göz teması kurmadan ve güvenli geçiş onayı almadan ekipmana yaklaşmamalıdır.",
        "Geri manevra, dar alan, yoğun yaya trafiği veya sınırlı görüş bulunan çalışmalarda yetkin bir spotter/banksman kullanılmalıdır. İşaretler önceden belirlenmeli ve operatöre yalnızca tek kişi yön vermelidir.",
        "Ekipman her vardiya öncesinde kontrol edilmelidir. Fren, direksiyon, lastik, alarm, ışık, kamera, ayna, emniyet kemeri ve acil durdurma sistemlerinde uygunsuzluk varsa ekipman kullanılmamalıdır."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir loader geri manevra yaparken çalışma alanından geçen bir çalışan ekipmanın kör noktasında kaldı. Alan yaya trafiğine açık ve spotter görevlendirilmemişti.",
        "Geri vites alarmı çalışmasına rağmen yüksek saha gürültüsü nedeniyle çalışan alarmı duymadı. Operatör kameradaki görüntüyü geç fark etti ve ani fren yaptı.",
        "Olay; yaya-araç ayrımı, etkin bariyerleme, spotter kullanımı, görüş ekipmanlarının kontrolü ve güvenli geçiş prosedürüyle tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Operatör sizi görmüyorsa güvende değilsiniz. Mobil ekipmana yaklaşmadan önce göz teması kurun, onay alın ve hareket tamamen durmadan yaklaşmayın.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Operatör kör noktalarında yaya personel bulunması.",
        "Kontrolsüz geri manevra ve yetersiz spotter kullanımı.",
        "Yaya ve araç yollarının ayrılmaması.",
        "Aşırı hız veya saha hız limitlerine uyulmaması.",
        "Emniyet kemeri kullanılmaması.",
        "Dengesiz zemin, eğim veya kenar yakınında çalışma.",
        "Arızalı alarm, ışık, kamera, ayna veya fren sistemi.",
        "Yanlış park, istemsiz hareket ve yetkisiz kullanım."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Yalnızca yetkili ve yetkin operatörlerin ekipman kullanmasını sağlayın.",
        "Her vardiya öncesinde günlük ekipman kontrolü yapın.",
        "Yaya ve araç güzergâhlarını fiziksel olarak ayırın.",
        "Geri manevra ve sınırlı görüşte spotter/banksman kullanın.",
        "Operatör ile spotter arasında standart işaretleri belirleyin.",
        "Saha hız limitlerine ve trafik yönlendirmelerine uyun.",
        "Operatör emniyet kemerini her zaman kullansın.",
        "Zemin, eğim, kenar mesafesi ve taşıma kapasitesini kontrol edin.",
        "Park ederken ekipmanı güvenli konuma alın ve enerjiyi kesin.",
        "Arızalı ekipmanı kullanımdan kaldırın ve bildirin."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün mobil ekipmanların çevresinde kör nokta ve geri manevra risklerine özellikle dikkat edeceğiz. Yaya yolları dışında hareket etmeyeceğiz ve operatörle göz teması kurmadan ekipmana yaklaşmayacağız. Gerekli alanlarda spotter kullanılacak ve operatöre yalnızca belirlenmiş kişi yön verecek. Alarm, kamera, fren veya emniyet kemerinde sorun varsa ekipman çalıştırılmayacak.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Bugünkü yaya ve araç yolları ayrılmış mı?",
        "Geri manevrada spotter kim olacak?",
        "Operatör ile spotter hangi işaretleri kullanacak?",
        "Ekipmanın günlük kontrolü tamamlandı mı?",
        "Kör noktalar ve yasaklı alanlar nerede?",
        "Arıza veya görüş kaybında çalışma nasıl durdurulacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Operatör yetkili",
        "Günlük kontrol tamam",
        "Fren ve direksiyon sağlam",
        "Alarm ve ışıklar çalışıyor",
        "Kamera ve aynalar uygun",
        "Emniyet kemeri sağlam",
        "Spotter hazır",
        "Yaya yolları ayrılmış",
        "Zemin uygun",
        "Park alanı güvenli"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Trafik yönetim planı, üretici talimatları ve saha mobil ekipman prosedürleri önceliklidir."
    },
    "en": {
      "title": "MOBILE EQUIPMENT SAFETY TOOLBOX TALK",
      "subtitle": "Control blind-spot, reversing, collision and overturning hazards.",
      "application_subtitle": "Hazards, control measures and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review collision, crushing, entrapment, overturning, blind-spot and reversing hazards associated with excavators, loaders, telehandlers, forklifts, mobile elevating work platforms, dumpers and similar equipment, and verify operator, equipment, area and pedestrian controls.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Mobile equipment has large blind spots that cannot be seen directly by the operator. Pedestrians must not approach until eye contact is established and safe passage has been confirmed.",
        "A competent spotter or banksman must be used during reversing, restricted visibility, confined movement or heavy pedestrian activity. Signals must be agreed and only one person should direct the operator.",
        "Equipment must be inspected before every shift. Brakes, steering, tyres, alarms, lights, cameras, mirrors, seat belts and emergency systems must be serviceable before use."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A loader reversed while a pedestrian crossed the work area and entered the operator's blind spot. The area remained open to pedestrian traffic and no spotter had been assigned.",
        "Although the reverse alarm operated, high site noise prevented the pedestrian from hearing it. The operator noticed the worker late on the camera and applied emergency braking.",
        "The event could have been prevented through pedestrian-vehicle separation, effective barricading, spotter control, visibility checks and a controlled crossing procedure."
      ],
      "remember_title": "REMEMBER",
      "remember": "If the operator cannot see you, you are not safe. Establish eye contact, obtain confirmation and never approach until the equipment has fully stopped.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Pedestrians entering operator blind spots.",
        "Uncontrolled reversing or inadequate spotter control.",
        "Failure to separate pedestrian and vehicle routes.",
        "Excessive speed or failure to follow site limits.",
        "Seat belt not used by the operator.",
        "Unstable ground, slopes or work near edges.",
        "Defective alarms, lights, cameras, mirrors or brakes.",
        "Unsafe parking, unintended movement or unauthorised use."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Allow only authorised and competent operators to use equipment.",
        "Complete a daily pre-use inspection before every shift.",
        "Physically separate pedestrian and vehicle routes.",
        "Use a spotter or banksman during reversing and restricted visibility.",
        "Agree standard signals between the operator and spotter.",
        "Follow site speed limits and traffic-management controls.",
        "Require the operator to wear the seat belt at all times.",
        "Check ground condition, slope, edge distance and bearing capacity.",
        "Park safely, lower attachments and isolate power.",
        "Remove defective equipment from service and report it."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, today we will pay particular attention to blind spots and reversing movements around mobile equipment. We will remain within pedestrian routes and will not approach until eye contact is made with the operator. A spotter will be used where required, and only the designated person will direct the operator. Equipment with defective alarms, cameras, brakes or seat belts will not be used.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Are pedestrian and vehicle routes separated today?",
        "Who will act as the reversing spotter?",
        "Which signals will the operator and spotter use?",
        "Has the daily equipment inspection been completed?",
        "Where are the blind spots and exclusion zones?",
        "How will work stop if visibility or equipment condition changes?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Operator authorised",
        "Daily inspection complete",
        "Brakes and steering serviceable",
        "Alarms and lights working",
        "Cameras and mirrors suitable",
        "Seat belt serviceable",
        "Spotter ready",
        "Pedestrian routes separated",
        "Ground suitable",
        "Parking area safe"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Traffic-management plans, manufacturer instructions and site mobile-equipment procedures take priority."
    }
  },
  {
    "slug": "ppe-safety",
    "sourceFile": "ppe_safety.py",
    "base": "ppe-safety-toolbox-talk",
    "tr": {
      "title": "KİŞİSEL KORUYUCU DONANIM TOOLBOX TALK",
      "subtitle": "İşe uygun KKD seçin, doğru kullanın ve hasarlı ekipmanı değiştirmeden çalışmayın.",
      "application_subtitle": "Tehlikeler, doğru kullanım ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Yapılan işe ve mevcut tehlikelere uygun kişisel koruyucu donanımın seçilmesini, kullanım öncesinde kontrol edilmesini, doğru şekilde takılmasını, bakımının yapılmasını ve hasarlı veya uygunsuz KKD'nin kullanılmamasını sağlamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "KKD, riskleri kaynağında ortadan kaldırmaz ve toplu koruma önlemlerinin yerine geçmez. Ancak diğer kontroller yeterli olmadığında çalışan ile tehlike arasındaki son savunma hattını oluşturur.",
        "Her KKD her iş için uygun değildir. Eldiven, gözlük, yüz siperi, kulak koruyucu, solunum koruyucu, baret ve ayakkabı seçimi yapılan işe, kimyasala, darbeye, gürültüye ve maruziyet seviyesine göre belirlenmelidir.",
        "KKD her kullanımdan önce kontrol edilmeli, doğru bedende olmalı ve vücuda uygun şekilde ayarlanmalıdır. Çatlak baret, çizilmiş gözlük, yırtılmış eldiven veya süresi geçmiş filtre yeterli koruma sağlamaz."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan taşlama işi sırasında standart iş gözlüğü kullandı ancak yüz siperi takmadı. Gözlüğün camı da yoğun şekilde çizilmişti.",
        "Taşlama diskinden kopan küçük bir parça gözlüğün kenarından geçerek çalışanın yüzüne çarptı ve yaralanmaya neden oldu.",
        "Olay; işe uygun göz koruması ve yüz siperi seçimi, kullanım öncesi kontrol ve hasarlı KKD'nin değiştirilmesiyle tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "KKD'yi yalnızca takmış olmak yeterli değildir. İşe uygun, sağlam, doğru ayarlanmış ve doğru şekilde kullanılan KKD koruma sağlar.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Yapılan işe uygun olmayan KKD seçimi.",
        "Hasarlı, çatlak, yırtılmış veya kirli KKD kullanımı.",
        "Uygun olmayan beden veya yanlış ayar.",
        "Baret çene bağının açık bırakılması.",
        "Yanlış filtreli solunum koruyucu kullanımı.",
        "Kimyasala uygun olmayan eldiven seçimi.",
        "Gözlük veya yüz siperi kullanılmaması.",
        "Gürültülü alanda kulak koruyucu kullanılmaması."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Risk değerlendirmesine göre işe uygun KKD seçin.",
        "KKD'yi her kullanımdan önce görsel olarak kontrol edin.",
        "Hasarlı veya uygunsuz KKD'yi derhal değiştirin.",
        "KKD'yi doğru bedende ve doğru ayarda kullanın.",
        "Baret çene bağını gerekli alanlarda kapalı tutun.",
        "Solunum koruyucu filtre tipini ve süresini doğrulayın.",
        "Kimyasala uygun eldiven seçimini SDS'ye göre yapın.",
        "KKD'yi temiz, kuru ve korumalı yerde saklayın.",
        "Ortak kullanılan KKD'yi kullanım öncesi temizleyin.",
        "KKD kullanımı konusunda eğitim ve talimatları uygulayın."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün kullanacağımız KKD'yi yalnızca zorunluluk olduğu için takmayacağız. Yapacağımız işe uygun olup olmadığını, hasarını, temizliğini ve ayarını birlikte kontrol edeceğiz. Hasarlı baret, çizilmiş gözlük, yırtılmış eldiven veya uygun olmayan filtre ile çalışmayacağız. KKD son savunma hattıdır; doğru seçilmediğinde koruma sağlamaz.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Bugünkü iş için hangi KKD'ler zorunlu?",
        "KKD'ler kullanım öncesi kontrol edildi mi?",
        "Eldiven türü yapılan işe uygun mu?",
        "Gözlük veya yüz siperi yeterli koruma sağlıyor mu?",
        "Solunum koruyucu filtre tipi ve süresi uygun mu?",
        "Hasarlı KKD görülürse ne yapılacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Baret sağlam",
        "Çene bağı uygun",
        "Gözlük temiz",
        "Yüz siperi hazır",
        "Eldiven uygun",
        "Ayakkabı sağlam",
        "Kulak koruyucu hazır",
        "Maske/filtre uygun",
        "KKD bedeni uygun",
        "Ekip bilgilendirildi"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Risk değerlendirmesi, üretici talimatları ve saha KKD prosedürleri önceliklidir."
    },
    "en": {
      "title": "PERSONAL PROTECTIVE EQUIPMENT TOOLBOX TALK",
      "subtitle": "Select suitable PPE, use it correctly and replace damaged equipment before work.",
      "application_subtitle": "Hazards, correct use and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Ensure that personal protective equipment is suitable for the task and hazards, inspected before use, fitted correctly, maintained properly and removed from service when damaged or unsuitable.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "PPE does not eliminate hazards and must not replace engineering or collective controls. It is the final line of defence between the worker and the hazard when other controls cannot fully remove the risk.",
        "Not every type of PPE is suitable for every task. Gloves, eye protection, face shields, hearing protection, respirators, helmets and footwear must be selected according to the specific chemical, impact, noise or exposure hazard.",
        "PPE must be inspected before each use, fit the wearer correctly and be adjusted properly. A cracked helmet, scratched eyewear, torn gloves or expired filter will not provide effective protection."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker used standard safety glasses for grinding but did not wear a face shield. The lenses were also heavily scratched.",
        "A fragment from the grinding disc passed around the edge of the glasses and struck the worker's face.",
        "The incident could have been prevented by selecting suitable eye and face protection, completing a pre-use inspection and replacing damaged PPE."
      ],
      "remember_title": "REMEMBER",
      "remember": "Simply wearing PPE is not enough. Protection depends on correct selection, good condition, proper fit and correct use.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "PPE unsuitable for the task or hazard.",
        "Damaged, cracked, torn or contaminated PPE.",
        "Incorrect size or poor adjustment.",
        "Helmet chin strap left open where required.",
        "Respirator fitted with the wrong filter.",
        "Gloves incompatible with the chemical used.",
        "Missing eye or face protection.",
        "No hearing protection in high-noise areas."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Select PPE according to the risk assessment.",
        "Inspect PPE visually before every use.",
        "Replace damaged or unsuitable PPE immediately.",
        "Use the correct size and adjust PPE properly.",
        "Secure helmet chin straps where required.",
        "Verify respirator filter type and service life.",
        "Select chemical gloves using SDS information.",
        "Store PPE in a clean, dry and protected area.",
        "Clean shared PPE before use.",
        "Follow PPE training and manufacturer instructions."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, today we will not wear PPE simply to meet a rule. We will confirm that each item is suitable for the task, free from damage, clean and correctly adjusted. We will not work with cracked helmets, scratched eyewear, torn gloves or unsuitable filters. PPE is the final line of defence and must be selected and used correctly.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Which PPE is mandatory for today's task?",
        "Has all PPE been inspected before use?",
        "Are the selected gloves suitable for the task?",
        "Is eye or face protection adequate?",
        "Is the respirator filter type and service life suitable?",
        "What action will be taken if damaged PPE is found?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Helmet intact",
        "Chin strap suitable",
        "Eyewear clean",
        "Face shield ready",
        "Gloves suitable",
        "Footwear intact",
        "Hearing protection ready",
        "Respirator/filter suitable",
        "PPE fits correctly",
        "Team briefed"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Risk assessments, manufacturer instructions and site PPE procedures take priority."
    }
  },
  {
    "slug": "safety-harness",
    "sourceFile": "safety_harness.py",
    "base": "safety-harness-toolbox-talk",
    "tr": {
      "title": "EMNİYET KEMERİ KULLANIMI TOOLBOX TALK",
      "subtitle": "Doğru seçim, kontrol, bağlantı ve kurtarma ile düşüşleri önleyin.",
      "application_subtitle": "Tehlikeler, doğru kullanım ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Tam vücut emniyet kemeri, lanyard, şok emici ve bağlantı elemanlarının doğru seçilmesini, kontrol edilmesini ve kullanılmasını sağlamak; yanlış ankraj, bağlantısız çalışma ve düşüş sonrası askıda kalma risklerini önlemektir.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Emniyet kemeri yalnızca vücuda takılan bir KKD değildir. Kemer, bağlantı elemanı, şok emici, yaşam hattı ve ankraj noktası birlikte çalışan bir düşüş durdurma sistemidir. Bu parçalardan biri uygun değilse sistem çalışanı korumaz.",
        "Kemer vücuda uygun şekilde ayarlanmalıdır. Bacak ve omuz kayışları çok gevşek olursa düşüş sırasında çalışan kemerden çıkabilir veya ciddi iç yaralanmalar meydana gelebilir. Çok sıkı ayar ise hareketi ve dolaşımı olumsuz etkileyebilir.",
        "Bağlantı mümkün olduğunca omuz seviyesinin üzerinde yapılmalı ve sürekli bağlantı korunmalıdır. Düşüş mesafesi, şok emicinin açılma mesafesi, çalışanın boyu ve alt seviyedeki engeller dikkate alınmadan yapılan bağlantı zemine çarpmayı önleyemeyebilir."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan boru platformunda kısa süreli bağlantı işi yapmak için tam vücut emniyet kemeri giydi ancak çift kollu lanyardın iki kancasını da kemer üzerindeki uygun olmayan taşıma halkalarına taktı.",
        "Platform değiştirirken bağlantısını tamamen kesti. Ayağının kayması sonucu düşmeye başladı ancak hiçbir kanca ankraja bağlı olmadığı için sistem düşüşü durduramadı.",
        "Olay; işe başlamadan önce ekipman kontrolü, doğru bağlantı eğitimi, yüzde yüz bağlı kalma kuralı ve süpervizör doğrulaması ile önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Emniyet kemeri giymek koruma sağlamaz; doğru ankraja doğru ekipmanla sürekli bağlı olmak ve uygulanabilir bir kurtarma planına sahip olmak koruma sağlar.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Hasarlı, kesilmiş, yanmış veya kimyasala maruz kalmış kayışlar.",
        "Eksik, gevşek veya yanlış kapatılmış tokalar.",
        "Uygun olmayan ankraj noktasına bağlantı yapılması.",
        "Çalışma sırasında bağlantının tamamen kesilmesi.",
        "Lanyard kancasının kendi kayışına geri bağlanması.",
        "Yetersiz düşüş açıklığı nedeniyle alt seviyeye çarpma.",
        "Yanlış konum nedeniyle salınım düşüşü oluşması.",
        "Düşüş sonrasında uzun süre askıda kalma ve geç kurtarma."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Yalnızca onaylı tam vücut emniyet kemeri kullanın.",
        "Her kullanımdan önce kayış, dikiş, toka, D-ring ve etiketleri kontrol edin.",
        "Periyodik kontrol ve kayıt durumunu doğrulayın.",
        "Kemeri vücuda uygun ve dengeli biçimde ayarlayın.",
        "Bağlantıyı yalnızca onaylı ve yeterli dayanımdaki ankraja yapın.",
        "Ankrajı mümkün olduğunca omuz seviyesinin üzerinde seçin.",
        "Çift kollu lanyard ile yüzde yüz bağlı kalma kuralını uygulayın.",
        "Düşüş açıklığını ve salınım düşüşü riskini hesaplayın.",
        "Keskin kenarlara temas eden ekipmanı uygun şekilde koruyun.",
        "Kurtarma planını, ekibini ve ekipmanını işe başlamadan doğrulayın."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün emniyet kemerini yalnızca giymiş olmak için kullanmayacağız. Kayışları, tokaları, D-ringleri, lanyardı ve kancaları birlikte kontrol edeceğiz. Bağlantı sadece onaylı ankraj noktasına yapılacak ve yer değiştirirken yüzde yüz bağlı kalacağız. Yetersiz düşüş mesafesi, keskin kenar veya uygunsuz ankraj varsa işe başlamayacağız. Bir düşüş olursa çalışanı nasıl kurtaracağımız işe başlamadan bilinmelidir.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Kemer ve lanyard üzerinde hasar, kesik veya yanık var mı?",
        "Bugün kullanılacak ankraj noktası kim tarafından onaylandı?",
        "Yer değiştirirken yüzde yüz bağlantı nasıl korunacak?",
        "Düşüş için yeterli açıklık mevcut mu?",
        "Keskin kenar veya salınım düşüşü riski var mı?",
        "Bir düşüş durumunda kurtarmayı kim ve nasıl yapacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Kemer kontrol edildi",
        "Etiket okunabilir",
        "Tokalar sağlam",
        "Dikişler sağlam",
        "Lanyard uygun",
        "Şok emici sağlam",
        "Ankraj onaylı",
        "Yüzde yüz bağlantı mümkün",
        "Düşüş açıklığı yeterli",
        "Kurtarma planı hazır"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Üretici talimatları, risk değerlendirmesi ve saha prosedürleri önceliklidir."
    },
    "en": {
      "title": "SAFETY HARNESS USE TOOLBOX TALK",
      "subtitle": "Prevent falls through correct selection, inspection, connection and rescue.",
      "application_subtitle": "Hazards, correct use and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Ensure that full-body harnesses, lanyards, energy absorbers and connectors are correctly selected, inspected and used, and prevent unsafe anchorage, disconnection and suspension-related risks.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "A safety harness is not a stand-alone item of PPE. The harness, connector, energy absorber, lifeline and anchor point form one fall-arrest system. If any component is unsuitable, the system may fail to protect the worker.",
        "The harness must be adjusted correctly to the worker's body. Loose leg or shoulder straps can allow the worker to slip from the harness or suffer serious injury during a fall. Excessively tight straps may restrict movement and circulation.",
        "The connection should be made as high as practicable and continuous attachment must be maintained. Fall clearance must include lanyard length, energy-absorber deployment, worker height and a safety margin above lower-level obstructions."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker wore a full-body harness for a short connection task on a pipe platform, but attached both hooks of the twin lanyard to unsuitable parking loops on the harness.",
        "While moving between platforms, the worker disconnected completely. When the worker slipped, neither hook was attached to an anchor and the system could not arrest the fall.",
        "The incident could have been prevented through pre-use inspection, correct connection training, continuous attachment and supervisor verification before work began."
      ],
      "remember_title": "REMEMBER",
      "remember": "Wearing a harness does not provide protection by itself. Protection requires correct anchorage, suitable connecting equipment, continuous attachment and a practical rescue plan.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Cut, burned, chemically damaged or worn webbing.",
        "Missing, loose or incorrectly fastened buckles.",
        "Connection to an unsuitable anchor point.",
        "Complete disconnection while moving or repositioning.",
        "Connecting a snap hook back onto its own lanyard.",
        "Insufficient fall clearance above a lower level.",
        "Swing-fall exposure caused by poor positioning.",
        "Prolonged suspension and delayed rescue after a fall."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Use only an approved full-body harness.",
        "Inspect webbing, stitching, buckles, D-rings and labels before every use.",
        "Verify periodic inspection status and records.",
        "Adjust the harness correctly and evenly to the body.",
        "Connect only to approved and adequately rated anchor points.",
        "Select an anchor as high as reasonably practicable.",
        "Maintain continuous attachment with a twin-leg lanyard where required.",
        "Check available fall clearance and swing-fall exposure.",
        "Protect equipment from sharp-edge contact.",
        "Confirm the rescue plan, rescue team and equipment before starting."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, today we will not wear a harness simply to meet a rule. We will inspect the webbing, buckles, D-rings, lanyard and hooks together. Connection will be made only to an approved anchor and continuous attachment will be maintained while moving. We will not start if fall clearance is inadequate, an edge is unprotected or the anchor is unsuitable. Everyone must understand the rescue arrangement.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "Is there any damage, cutting or burning on the harness or lanyard?",
        "Who approved the anchor point to be used today?",
        "How will continuous attachment be maintained while moving?",
        "Is sufficient fall clearance available?",
        "Is there any sharp-edge or swing-fall exposure?",
        "Who will perform the rescue and how will it be completed?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Harness inspected",
        "Label readable",
        "Buckles secure",
        "Stitching intact",
        "Lanyard suitable",
        "Energy absorber intact",
        "Anchor approved",
        "Continuous attachment possible",
        "Fall clearance adequate",
        "Rescue plan ready"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Manufacturer instructions, risk assessments and site procedures take priority."
    }
  },
  {
    "slug": "scaffold-safety",
    "sourceFile": "scaffold_safety.py",
    "base": "scaffold-safety-toolbox-talk",
    "tr": {
      "title": "İSKELE GÜVENLİĞİ TOOLBOX TALK",
      "subtitle": "Etiket, erişim, platform ve korkulukları kullanımdan önce doğrulayın.",
      "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "İskele kullanımında düşme, düşen cisim, uygunsuz erişim, eksik platform, aşırı yükleme ve yetkisiz değişiklik risklerini değerlendirmek; iskeleyi kullanmadan önce etiket, kontrol tarihi ve fiziksel durumunu doğrulamaktır.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "İskele; platform, korkuluk, ara korkuluk, topuk levhası, merdiven, trapdoor, çapraz bağlantılar ve ankrajlardan oluşan bütüncül bir sistemdir. Tek bir parçanın eksikliği dahi düşme veya çökme riskini artırabilir.",
        "İskele yalnızca yetkili iskele personeli tarafından kurulmalı, değiştirilmeli ve sökülmelidir. Kullanıcılar platform, korkuluk, merdiven veya bağlantı elemanlarını kendi ihtiyaçlarına göre sökmemeli ya da değiştirmemelidir.",
        "Etiket uygun olsa bile kullanıcı her kullanım öncesinde görsel kontrol yapmalıdır. Kırmızı veya etiketsiz iskele kullanılmamalı; sarı etikette belirtilen özel koşullar anlaşılmadan iskeleye erişilmemelidir."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir ekip, boru bağlantısına ulaşmak için yeşil etiketli bir iskele kullandı. Çalışma sırasında malzeme geçirmek amacıyla ara korkuluk yerinden çıkarıldı.",
        "Korkuluk geri takılmadan vardiya değişti. Yeni ekip eksikliği fark etmeden çalışmaya başladı ve bir çalışan açık kenarda dengesini kaybetti.",
        "Olay; kullanıcıların iskele parçalarını değiştirmemesi, eksikliğin derhal bildirilmesi, iskelenin kapatılması ve yetkili ekip tarafından yeniden kontrol edilmesiyle önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Etiket tek başına yeterli değildir. Eksik, gevşek, hasarlı veya değiştirilmiş bir parça görürseniz iskeleyi kullanmayın ve durumu hemen bildirin.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Etiketsiz, kırmızı etiketli veya kontrol süresi geçmiş iskele.",
        "Eksik üst korkuluk, ara korkuluk veya topuk levhası.",
        "Tam döşenmemiş, gevşek veya hasarlı platformlar.",
        "Açık bırakılan trapdoor ve erişim açıklıkları.",
        "Uygunsuz merdiven kullanımı veya dışarıdan tırmanma.",
        "Yetkisiz parça sökme veya iskele değişikliği.",
        "Aşırı yükleme ve uygunsuz malzeme istifleme.",
        "Alt seviyeye düşen alet ve malzemeler."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "İskele etiketini ve kontrol tarihini doğrulayın.",
        "Her kullanımdan önce görsel kontrol yapın.",
        "Korkuluk, ara korkuluk ve topuk levhalarını kontrol edin.",
        "Platformların tam, sabit ve hasarsız olduğunu doğrulayın.",
        "Trapdoorları kullanım dışında kapalı tutun.",
        "Yalnızca belirlenmiş güvenli erişim yolunu kullanın.",
        "İskele parçalarını yetkisiz şekilde değiştirmeyin.",
        "İzin verilen yük kapasitesini aşmayın.",
        "Aletleri sabitleyin ve alt alanı bariyerleyin.",
        "Uygunsuzlukta kullanımı durdurup yetkili kişiye bildirin."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün iskeleye çıkmadan önce etiketi, kontrol tarihini, erişimi, platformları, korkulukları ve trapdoorları birlikte kontrol edeceğiz. Etiket yoksa, kırmızıysa veya herhangi bir parça eksikse iskeleyi kullanmayacağız. Hiç kimse korkuluk, platform veya bağlantı parçasını kendi başına sökmeyecek. Bir uygunsuzluk görürsek alanı kapatıp yetkili iskele ekibine bildireceğiz.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "İskele etiketi hangi renkte ve kontrol tarihi geçerli mi?",
        "Platformlar tam, sabit ve hasarsız mı?",
        "Korkuluklar ve topuk levhaları tamam mı?",
        "Trapdoorlar kullanım dışında kapalı mı?",
        "Güvenli erişim merdiveni mevcut mu?",
        "Uygunsuzluk görülürse kime bildirilecek?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "Etiket uygun",
        "Kontrol tarihi geçerli",
        "Platformlar tam",
        "Korkuluklar tamam",
        "Topuk levhaları mevcut",
        "Trapdoorlar çalışıyor",
        "Erişim güvenli",
        "Yetkisiz değişiklik yok",
        "Alt alan korumalı",
        "Yük kapasitesi uygun"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — İskele etiketi, risk değerlendirmesi ve saha prosedürleri önceliklidir."
    },
    "en": {
      "title": "SCAFFOLD SAFETY TOOLBOX TALK",
      "subtitle": "Verify the tag, access, platforms and guardrails before use.",
      "application_subtitle": "Hazards, control measures and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review fall, falling-object, unsafe-access, incomplete-platform, overloading and unauthorised-alteration hazards, and verify the scaffold tag, inspection date and physical condition before use.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "A scaffold is a complete system consisting of platforms, top rails, mid-rails, toe boards, ladders, trapdoors, braces and ties. A single missing component can increase the risk of a fall or structural failure.",
        "Scaffolds must only be erected, altered and dismantled by authorised scaffold personnel. Users must not remove or reposition platforms, rails, ladders or structural components for convenience.",
        "Even when the tag is acceptable, the user must complete a visual inspection before every use. Untagged or red-tagged scaffolds must not be used, and yellow-tag conditions must be understood before access."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A team used a green-tagged scaffold to reach a pipe connection. During the task, a mid-rail was removed to pass material through the platform.",
        "The rail was not replaced before the shift changed. The next team began work without noticing the missing component, and a worker lost balance near the open edge.",
        "The event could have been prevented by prohibiting unauthorised alterations, reporting the defect immediately, closing the scaffold and arranging reinspection by the authorised scaffold team."
      ],
      "remember_title": "REMEMBER",
      "remember": "A valid tag is not enough. Do not use a scaffold with missing, loose, damaged or altered components; report the condition immediately.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Untagged, red-tagged or overdue scaffold inspection.",
        "Missing top rails, mid-rails or toe boards.",
        "Incomplete, loose or damaged working platforms.",
        "Open trapdoors and access openings.",
        "Unsafe ladders or climbing outside the scaffold.",
        "Unauthorised removal or alteration of components.",
        "Overloading and unsafe material storage.",
        "Tools and materials falling to lower levels."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Verify the scaffold tag and inspection date.",
        "Complete a visual inspection before every use.",
        "Check top rails, mid-rails and toe boards.",
        "Confirm platforms are complete, secured and undamaged.",
        "Keep trapdoors closed when not in use.",
        "Use only the designated safe access route.",
        "Never alter scaffold components without authorisation.",
        "Do not exceed the permitted load capacity.",
        "Secure tools and barricade the area below.",
        "Stop use and report defects immediately."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, before accessing the scaffold today, we will check the tag, inspection date, access, platforms, guardrails and trapdoors. We will not use the scaffold if the tag is missing, red or if any component is incomplete. No one may remove rails, decks or structural parts. Any defect must be reported and the scaffold kept out of use until checked by the authorised scaffold team.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "What colour is the scaffold tag and is the inspection date valid?",
        "Are the platforms complete, secured and undamaged?",
        "Are guardrails and toe boards complete?",
        "Are trapdoors closed when not in use?",
        "Is a safe access ladder available?",
        "Who must be contacted if a defect is identified?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Tag acceptable",
        "Inspection date valid",
        "Platforms complete",
        "Guardrails complete",
        "Toe boards fitted",
        "Trapdoors functional",
        "Access safe",
        "No unauthorised changes",
        "Lower area protected",
        "Load capacity suitable"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Scaffold tags, risk assessments and site procedures take priority."
    }
  },
  {
    "slug": "working-at-height",
    "sourceFile": "working_at_height.py",
    "base": "working-at-height-toolbox-talk",
    "tr": {
      "title": "YÜKSEKTE ÇALIŞMA TOOLBOX TALK",
      "subtitle": "Düşmeleri, düşen cisimleri ve ölümcül yaralanmaları önleyin.",
      "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
      "duration": "8–10 DAKİKA",
      "objective_title": "AMAÇ",
      "objective": "Yüksekte çalışma sırasında meydana gelebilecek düşme, düşen cisim, uygunsuz erişim ve yetersiz kurtarma risklerini değerlendirmek; işe başlamadan önce gerekli bütün koruyucu önlemleri doğrulamak.",
      "explanation_title": "KONU ANLATIMI",
      "explanation": [
        "Yüksekte çalışma yalnızca çok yüksek yapılarda gerçekleştirilen işler değildir. Bir kişinin düşerek yaralanabileceği seviye farkı bulunan platformlar, iskeleler, merdivenler, çatılar, açıklıklar ve ekipman üstleri de yüksekte çalışma kapsamındadır.",
        "Düşmeler çoğu zaman korumasız kenarlar, açık zemin boşlukları, uygunsuz erişim, hasarlı ekipman veya emniyet kemerinin yanlış kullanılması nedeniyle meydana gelir. Düşen alet ve malzemeler ise alt seviyedeki çalışanlar için ölümcül risk oluşturabilir.",
        "İşe yalnızca uygun çalışma izni, risk değerlendirmesi, güvenli erişim, kontrol edilmiş ekipman ve uygulanabilir bir kurtarma planı mevcut olduğunda başlanmalıdır. Toplu koruma önlemleri her zaman kişisel düşüş durdurma sistemlerinden önce değerlendirilmelidir."
      ],
      "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
      "scenario": [
        "Bir çalışan, kısa süreli bir bağlantı işi için platform korkuluğunun dışına uzandı. İşin yalnızca birkaç dakika süreceği düşünülerek uygun çalışma platformu kurulmadı.",
        "Çalışanın emniyet kemeri vardı ancak bağlantı kancası uygun bir ankraj noktasına takılı değildi. Dengesini kaybettiğinde düşüşü durduracak etkin bir sistem bulunmuyordu.",
        "Olay; uygun platform kurulması, korkulukların korunması, onaylı ankraj kullanılması ve işe başlamadan önce süpervizör kontrolü yapılmasıyla tamamen önlenebilirdi."
      ],
      "remember_title": "UNUTMAYIN",
      "remember": "Emniyet kemeri giymek tek başına yeterli değildir. Doğru ankraj, uygun bağlantı sistemi, yeterli düşüş mesafesi ve hazır bir kurtarma planı birlikte bulunmalıdır.",
      "hazards_title": "TEMEL TEHLİKELER",
      "hazards": [
        "Korumasız kenarlardan veya platformlardan düşme.",
        "Açık zemin boşlukları, geçişler ve trapdoor açıklıkları.",
        "Uygun olmayan merdiven, iskele veya çalışma platformu.",
        "Hasarlı ya da yanlış kullanılan emniyet kemeri ve lanyard.",
        "Uygun olmayan veya yetersiz dayanımlı ankraj noktası.",
        "Alet, ekipman ve malzemelerin alt seviyelere düşmesi.",
        "Olumsuz hava, kaygan yüzey veya yetersiz aydınlatma.",
        "Düşüş sonrası askıda kalma ve yetersiz kurtarma hazırlığı."
      ],
      "controls_title": "KONTROL ÖNLEMLERİ",
      "controls": [
        "Geçerli çalışma izni ve risk değerlendirmesini doğrulayın.",
        "Öncelikle korkuluk, platform ve kapak gibi toplu korumaları kullanın.",
        "İskele, merdiven ve erişim ekipmanının kontrolünü doğrulayın.",
        "Tam vücut emniyet kemeri ve uygun bağlantı sistemini inceleyin.",
        "Yalnızca onaylı ve yeterli dayanımdaki ankraj noktalarını kullanın.",
        "Aletleri bağlayın ve alt çalışma alanını bariyerlerle koruyun.",
        "Hava, yüzey ve aydınlatma koşullarını işe başlamadan değerlendirin.",
        "Yeterli düşüş açıklığı ve salınım düşüşü riskini kontrol edin.",
        "Çalışma boyunca yetkili gözetim ve iletişim sağlayın.",
        "Uygulanabilir kurtarma planı ile ekipmanı hazır bulundurun."
      ],
      "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
      "supervisor_script": "Arkadaşlar, bugün yapacağımız yüksekte çalışma küçük bir dengesizlikte ölümcül bir düşüşe dönüşebilir. Korkuluklar, erişim yolu, çalışma platformu ve ankraj noktası kontrol edilmeden işe başlamıyoruz. Emniyet kemerinin yalnızca giyilmiş olması yeterli değildir; bağlantının doğru ve sürekli olması gerekir. Koşullar değişirse işi durduracak ve alanı yeniden değerlendireceğiz. Bir düşüş yaşanması durumunda kurtarmayı nasıl yapacağımız herkesçe bilinmelidir.",
      "questions_title": "EKİBE SORULACAK SORULAR",
      "questions": [
        "Bugünkü çalışma hangi yükseklikte ve hangi alanda yapılacak?",
        "Korkuluklar, platform ve güvenli erişim tamam mı?",
        "Kullanılacak ankraj noktası kim tarafından onaylandı?",
        "Emniyet kemeri ve bağlantı ekipmanı kontrol edildi mi?",
        "Alet ve malzemelerin düşmesi nasıl önlenecek?",
        "Bir düşüş durumunda kurtarmayı kim ve nasıl yapacak?"
      ],
      "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
      "verification": [
        "İzin onaylı",
        "Risk değerlendirmesi uygun",
        "Güvenli erişim hazır",
        "Korkuluklar tamam",
        "Platform kontrol edildi",
        "Ankraj onaylı",
        "Emniyet kemeri sağlam",
        "Bağlantı sistemi uygun",
        "Alt alan bariyerli",
        "Kurtarma planı hazır"
      ],
      "attendance_title": "KATILIM VE ONAY",
      "fields": [
        "Proje / Saha",
        "Tarih",
        "Konuşmayı yapan",
        "Çalışma alanı"
      ],
      "table_headers": [
        "No",
        "Ad Soyad",
        "Firma / Görev",
        "İmza"
      ],
      "notes_title": "Süpervizör notları / ek saha talimatları",
      "footer": "SERNEM HSE Resource — Çalışma izni, risk değerlendirmesi ve saha prosedürleri önceliklidir."
    },
    "en": {
      "title": "WORKING AT HEIGHT TOOLBOX TALK",
      "subtitle": "Prevent falls, falling objects and fatal injuries.",
      "application_subtitle": "Hazards, control measures and daily pre-work verification.",
      "duration": "8–10 MINUTES",
      "objective_title": "OBJECTIVE",
      "objective": "Review fall, falling-object, unsafe-access and rescue hazards associated with working at height, and verify that all required protective measures are in place before the task begins.",
      "explanation_title": "TOPIC EXPLANATION",
      "explanation": [
        "Working at height is not limited to very tall structures. Platforms, scaffolds, ladders, roofs, openings and equipment surfaces are included whenever a person could fall from one level to another and suffer injury.",
        "Falls commonly involve unprotected edges, open floor penetrations, unsafe access, defective equipment or incorrect use of fall-protection systems. Dropped tools and materials can also cause fatal injuries to people working below.",
        "Work must begin only when the permit, risk assessment, safe access, inspected equipment and a practical rescue plan are available. Collective protection such as guardrails and working platforms must be considered before personal fall-arrest systems."
      ],
      "scenario_title": "REALISTIC SITE SCENARIO",
      "scenario": [
        "A worker leaned outside a platform guardrail to complete a short connection task. Because the job was expected to take only a few minutes, a suitable working platform was not installed.",
        "The worker wore a harness, but the connecting hook was not attached to an approved anchor point. When balance was lost, no effective system was available to arrest the fall.",
        "The event could have been completely prevented by providing a suitable platform, maintaining the guardrails, using an approved anchor and completing a supervisor check before starting."
      ],
      "remember_title": "REMEMBER",
      "remember": "Wearing a harness is not enough. Correct anchorage, a suitable connecting system, adequate fall clearance and a ready rescue plan must all be provided.",
      "hazards_title": "KEY HAZARDS",
      "hazards": [
        "Falls from unprotected edges or working platforms.",
        "Open floor penetrations, access openings and trapdoors.",
        "Unsuitable ladders, scaffolds or working platforms.",
        "Damaged or incorrectly used harnesses and lanyards.",
        "Unapproved or inadequate anchor points.",
        "Tools, equipment or materials falling to lower levels.",
        "Adverse weather, slippery surfaces or poor lighting.",
        "Suspension after a fall and inadequate rescue preparation."
      ],
      "controls_title": "CONTROL MEASURES",
      "controls": [
        "Verify the approved permit and risk assessment.",
        "Use guardrails, platforms and covers as the first priority.",
        "Confirm inspection of scaffolds, ladders and access equipment.",
        "Inspect the full-body harness and connecting system.",
        "Use only approved and adequately rated anchor points.",
        "Secure tools and barricade the area below.",
        "Assess weather, surface and lighting conditions.",
        "Check fall clearance and swing-fall exposure.",
        "Provide competent supervision and communication.",
        "Keep a practical rescue plan and equipment ready."
      ],
      "supervisor_title": "SUPERVISOR TALKING SCRIPT",
      "supervisor_script": "Team, today's work at height can become a fatal fall after one small loss of balance. We will not start until guardrails, access, the working platform and the anchor point have been checked. Simply wearing a harness is not enough; the worker must remain correctly connected. If conditions change, we will stop and reassess the work. Everyone must understand how rescue will be completed if a fall occurs.",
      "questions_title": "DISCUSSION QUESTIONS",
      "questions": [
        "At what height and in which area will today's work take place?",
        "Are the guardrails, platform and safe access complete?",
        "Who approved the anchor point that will be used?",
        "Have the harness and connecting equipment been inspected?",
        "How will dropped tools and materials be prevented?",
        "Who will perform the rescue and how will it be completed?"
      ],
      "verification_title": "VERIFY BEFORE STARTING TODAY",
      "verification": [
        "Permit approved",
        "Risk assessment suitable",
        "Safe access ready",
        "Guardrails complete",
        "Platform inspected",
        "Anchor approved",
        "Harness serviceable",
        "Connection suitable",
        "Lower area barricaded",
        "Rescue plan ready"
      ],
      "attendance_title": "ATTENDANCE AND APPROVAL",
      "fields": [
        "Project / Site",
        "Date",
        "Presented by",
        "Work area"
      ],
      "table_headers": [
        "No",
        "Full Name",
        "Company / Role",
        "Signature"
      ],
      "notes_title": "Supervisor notes / additional site instructions",
      "footer": "SERNEM HSE Resource — Permit conditions, risk assessments and site procedures take priority."
    }
  }
,
{
  "slug": "line-of-fire",
  "tr": {
    "title": "ATEŞ HATTI / LINE OF FIRE TOOLBOX TALK",
      "application_subtitle": "Güvenli konumlandırma, enerji kontrolü ve iş öncesi saha doğrulaması.",
      "subtitle": "Hareket, basınç ve depolanmış enerjinin tehlike hattından uzak durun.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Hareketli ekipman, askıdaki yük, basınçlı sistemler ve depolanmış enerjinin beklenmeyen hareketinden kaynaklanan çarpma, ezilme, sıkışma ve fırlayan cisim risklerini değerlendirmek; çalışanların güvenli konumda kalmasını sağlamaktır.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Ateş hattı, bir yük, araç, ekipman veya enerji beklenmedik şekilde hareket ettiğinde kişinin doğrudan yaralanabileceği bölgedir.",
      "Askıdaki yük altı, araç kör noktaları, basınçlı hortumların karşısı, gergin halatların geri tepme hattı ve hareketli ekipman çevresi tipik ateş hattı bölgeleridir.",
      "İşe başlamadan önce 'Bir şey hareket eder, kopar, boşalır veya düşerse nereye gider?' sorusu sorulmalı ve çalışan konumu buna göre planlanmalıdır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekip vinçle boru spool'unu yerine yönlendirirken bir çalışan bağlantı noktasını görmek için yük ile sabit yapı arasına girdi.",
      "Yük kısa süreli salınım yaptı ve çalışan ciddi bir sıkışma tehlikesine maruz kaldı. Banksman acil durdurma işareti verdi.",
      "Olay; yük yolunun önceden belirlenmesi, dışlama alanı, uygun tag line kullanımı ve personelin sıkışma bölgesine girmemesiyle önlenebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Hareket eden veya hareket etme potansiyeli bulunan bir yük, araç ya da ekipman ile sabit bir nesne arasına girmeyin.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Askıdaki veya hareket eden yüklerin hareket hattında bulunmak.",
      "Araçların kör noktalarında veya geri manevra alanında bulunmak.",
      "Yük ile sabit yapı arasında sıkışmak.",
      "Gergin halat, sapan veya kablonun koparak geri tepmesi.",
      "Basınçlı hortum veya bağlantının arızalanarak savrulması.",
      "Dönen veya hareketli makine parçalarına yaklaşmak.",
      "Depolanmış mekanik, hidrolik veya pnömatik enerjinin boşalması.",
      "İletişim kaybı veya yetkisiz personelin dışlama alanına girmesi."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Hareket ve yük yollarını işe başlamadan belirleyin.",
      "Personeli askıdaki yüklerden uzak tutun.",
      "Sıkışma bölgelerinde dışlama alanı oluşturun.",
      "Yükleri mümkün olduğunda tag line ile yönlendirin.",
      "Araç hareketlerinde banksman veya spotter kullanın.",
      "Basınçlı sistemleri müdahale öncesi boşaltın.",
      "Tehlikeli enerjileri izole edin ve LOTO uygulayın.",
      "Gergin halat ve sapanların geri tepme hattından uzak durun.",
      "Operatör ve ekip arasında açık iletişim sağlayın.",
      "Koşullar değiştiğinde işi durdurup ateş hattını yeniden değerlendirin."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün yalnızca işi değil, bir şey beklenmedik şekilde hareket ederse nereye gideceğini de değerlendireceğiz. Hiç kimse askıdaki yük altında, araç kör noktasında veya hareketli yük ile sabit yapı arasında durmayacak. Konumunuzdan emin değilseniz işi durdurun.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü ana ateş hattı bölgeleri nerede?",
      "Yük veya ekipman beklenmedik hareket ederse nereye gidebilir?",
      "Sıkışma noktaları hangileri?",
      "Araç kör noktalarından nasıl uzak duracağız?",
      "Depolanmış enerji nasıl kontrol edilecek?",
      "Koşullar değişirse işi kim durdurabilir?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Hareket hatları belirlendi",
      "Sıkışma noktaları belirlendi",
      "Dışlama alanı hazır",
      "Yük yolu boş",
      "Tag line uygun",
      "Banksman belli",
      "Enerji izolasyonu uygun",
      "Basınç kontrol edildi",
      "İletişim doğrulandı",
      "Ekip güvenli konumu biliyor"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "LINE OF FIRE TOOLBOX TALK",
      "application_subtitle": "Safe positioning, energy control and daily field verification.",
      "subtitle": "Stay clear of movement, pressure and stored-energy paths.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Review struck-by, crushing, caught-between and projectile hazards created by moving equipment, suspended loads, pressurised systems and stored energy, and ensure personnel remain in safe positions.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "The line of fire is any area where a person could be injured if a load, vehicle, equipment component or stored energy moves unexpectedly.",
      "Typical examples include below suspended loads, vehicle blind spots, in front of pressurised hoses, snap-back zones and moving-equipment operating areas.",
      "Before starting, ask where anything could travel if it moves, breaks, releases or falls, and position people outside that path."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A crew was positioning a pipe spool by crane when a worker stepped between the suspended load and a fixed structure to see the connection point.",
      "The load swung briefly and created an immediate crushing hazard. The banksman gave the emergency-stop signal.",
      "The event could have been prevented by defining the load path, maintaining the exclusion zone, using a suitable tag line and keeping personnel out of the pinch zone."
],
    "remember_title": "REMEMBER",
    "remember": "Never position yourself between a moving or potentially moving load, vehicle or equipment and a fixed object.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Standing in the path of suspended or moving loads.",
      "Vehicle blind spots and reversing areas.",
      "Being caught between a load and a fixed structure.",
      "Snap-back from tensioned ropes, slings or cables.",
      "Failure and whipping of pressurised hoses.",
      "Exposure to rotating or moving machinery.",
      "Unexpected release of stored mechanical, hydraulic or pneumatic energy.",
      "Communication failure or unauthorised entry into exclusion zones."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify movement and load paths before starting.",
      "Keep personnel clear of suspended loads.",
      "Establish exclusion zones around crushing hazards.",
      "Use suitable tag lines where practicable.",
      "Use a competent banksman or spotter.",
      "Depressurise systems before intervention.",
      "Isolate hazardous energy and apply LOTO.",
      "Stay outside snap-back zones.",
      "Maintain clear operator-to-crew communication.",
      "Stop and reassess whenever conditions change."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, today we will consider not only the task but where anything could travel if it moves unexpectedly. No one will stand below suspended loads, in vehicle blind spots or between moving loads and fixed structures. Stop the task if your position is uncertain.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Where are today's main line-of-fire areas?",
      "Where could the load or equipment travel unexpectedly?",
      "What are the main pinch points?",
      "How will we stay clear of vehicle blind spots?",
      "How will stored energy be controlled?",
      "Who may stop the job if conditions change?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Movement paths identified",
      "Pinch points identified",
      "Exclusion zone ready",
      "Load path clear",
      "Tag line suitable",
      "Banksman identified",
      "Energy isolation suitable",
      "Pressure controlled",
      "Communication confirmed",
      "Crew understands safe positions"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "pinch-points",
  "tr": {
    "title": "SIKIŞMA NOKTALARI TOOLBOX TALK",
      "application_subtitle": "Sıkışma tehlikeleri, güvenli hizalama ve iş öncesi doğrulama.",
      "subtitle": "El, parmak ve vücudu sıkışma ve ezilme noktalarından uzak tutun.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Flanş, boru, kapak, yük, hareketli ekipman ve mekanik parçalar arasında oluşabilecek sıkışma ve ezilme yaralanmalarını önlemek; elle hizalama yerine güvenli araç ve yöntemlerin kullanılmasını sağlamaktır.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Sıkışma noktaları çoğu zaman rutin ve basit görünen işlerde oluşur.",
      "Bir borunun hizalanması, kapağın kapanması veya yükün birkaç santimetre hareket etmesi bile el ve parmaklarda ciddi ezilme veya amputasyon yaralanmasına neden olabilir.",
      "Elleri tehlike bölgesine sokmak yerine uygun hizalama ekipmanı, pry bar, drift pin, push-pull tool veya mekanik yardım kullanılmalıdır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan iki flanşı hizalamak için parmaklarını bağlantı boşluğuna yerleştirdi.",
      "Borunun destek noktası hafifçe hareket etti ve flanşlar aniden kapanarak çalışanın elini sıkıştırdı.",
      "Olay; mekanik hizalama ekipmanı kullanılması, borunun sabitlenmesi ve ellerin sıkışma bölgesinden uzak tutulmasıyla önlenebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Elinizin bulunduğu boşluk kapanabiliyorsa orası bir sıkışma noktasıdır.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Flanş ve boru bağlantıları.",
      "Hareket eden yükler.",
      "Kapı, kapak ve menteşeler.",
      "Elle hizalanan ekipman.",
      "Dönen makine parçaları.",
      "Hidrolik veya mekanik hareket.",
      "Yük ile sabit yapı arasındaki bölgeler.",
      "Stabil olmayan veya desteklenmemiş malzemeler."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Eller yerine uygun hizalama aleti kullanın.",
      "Ekipmanı hareket öncesi sabitleyin.",
      "Tehlikeli enerjiyi izole edin.",
      "Sıkışma noktalarını işe başlamadan belirleyin.",
      "Ellerinizi hareket hattından uzak tutun.",
      "Yükü elle itmek yerine mekanik yardım kullanın.",
      "Operatörle net iletişim kurun.",
      "Beklenmeyen hareketi önlemek için takoz kullanın.",
      "Uygun eldiven kullanın ancak eldiveni ana kontrol olarak görmeyin.",
      "Koşullar değişirse işi durdurun."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün hiçbir flanş, boru veya hareketli parça arasına elimizi sokmayacağız. Hizalama için uygun alet kullanacağız ve ekipmanın beklenmedik hareketini önleyeceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü sıkışma noktaları nerede?",
      "Hangi ekipman beklenmedik hareket edebilir?",
      "Hizalama için hangi aleti kullanacağız?",
      "Ekipman nasıl sabitlenecek?",
      "Enerji izolasyonu gerekli mi?",
      "İş sırasında konum değişirse ne yapacağız?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Sıkışma noktaları belirlendi",
      "Ekipman sabit",
      "Hizalama aleti hazır",
      "Enerji izolasyonu uygun",
      "Eller hareket hattından uzak",
      "Takozlar hazır",
      "Yük yolu kontrollü",
      "Operatör iletişimi hazır",
      "KKD uygun",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "PINCH POINTS TOOLBOX TALK",
      "application_subtitle": "Pinch hazards, safe alignment and daily pre-work verification.",
      "subtitle": "Keep hands, fingers and body parts clear of pinch and crush zones.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent crushing and caught-between injuries created by flanges, pipes, covers, loads, moving equipment and mechanical components, and ensure safe tools are used instead of hands for alignment.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Pinch points are commonly created during routine tasks that appear simple.",
      "A pipe, cover or load moving only a few centimetres can cause severe crushing or amputation injuries.",
      "Use alignment tools, pry bars, drift pins, push-pull tools or mechanical assistance instead of placing hands in closing gaps."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker placed fingers between two flanges while trying to align a pipe connection.",
      "The pipe shifted slightly on its support and the flanges closed suddenly, trapping the worker's hand.",
      "The event could have been prevented by securing the pipe, using alignment tools and keeping hands outside the pinch zone."
],
    "remember_title": "REMEMBER",
    "remember": "If the gap can close while your hand is inside it, it is a pinch point.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Flanges and pipe connections.",
      "Moving loads.",
      "Doors, covers and hinges.",
      "Manual alignment of equipment.",
      "Rotating machinery components.",
      "Hydraulic or mechanical movement.",
      "Loads close to fixed structures.",
      "Unstable or unsupported materials."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Use suitable alignment tools instead of hands.",
      "Secure equipment before movement.",
      "Isolate hazardous energy.",
      "Identify pinch points before starting.",
      "Keep hands outside movement paths.",
      "Use mechanical assistance instead of pushing loads by hand.",
      "Maintain clear operator communication.",
      "Use chocks to prevent unexpected movement.",
      "Use suitable gloves but do not rely on gloves as the main control.",
      "Stop work if conditions change."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, no one will place hands between flanges, pipes or moving components today. We will use suitable alignment tools and control any potential movement before starting.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Where are today's pinch points?",
      "Which equipment could move unexpectedly?",
      "Which alignment tools will be used?",
      "How will the equipment be secured?",
      "Is energy isolation required?",
      "What will we do if positioning changes?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Pinch points identified",
      "Equipment secured",
      "Alignment tools ready",
      "Energy isolation suitable",
      "Hands clear of movement",
      "Chocks ready",
      "Load path controlled",
      "Operator communication ready",
      "PPE suitable",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "slips-trips-falls",
  "tr": {
    "title": "KAYMA TAKILMA VE DÜŞMELER TOOLBOX TALK",
      "application_subtitle": "Housekeeping, geçiş yolları ve günlük saha doğrulaması.",
      "subtitle": "Yürüyüş yollarını açık tutun ve aynı seviyedeki düşmeleri önleyin.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Yağ, su, kablo, hortum, düzensiz malzeme, seviye farkı ve yetersiz aydınlatmadan kaynaklanan kayma, takılma ve aynı seviyede düşmeleri önlemektir.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Kayma ve takılmalar basit görünse de burkulma, kırık ve iş günü kaybının önemli nedenlerindendir.",
      "Geçiş yollarındaki kablo, hortum, ambalaj ve dökülmeler özellikle yoğun saha trafiğinde ciddi risk oluşturur.",
      "Housekeeping sürekli yapılmalı; yalnız vardiya sonunda yapılan temizlik yeterli görülmemelidir."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan yürüyüş yolundan geçerken zemindeki şeffaf yağ tabakasını fark etmedi.",
      "Aynı bölgede geçiş yolundan geçirilen bir hortum da bulunuyordu ve çalışan dengesini kaybederek düştü.",
      "Dökülmenin hemen temizlenmesi, hortumun uygun güzergâhtan geçirilmesi ve alanın işaretlenmesi olayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Geçiş yolu çalışma alanı değildir; açık, temiz ve engelsiz tutulmalıdır.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yağ, su ve kimyasal dökülmeleri.",
      "Yürüyüş yolundaki kablo ve hortumlar.",
      "Düzensiz istiflenmiş malzemeler.",
      "Bozuk veya seviye farkı olan zemin.",
      "Yetersiz aydınlatma.",
      "Merdiven ve geçişlerde gevşek cisimler.",
      "Islak veya çamurlu dış alanlar.",
      "Koşarak veya dikkatsiz yürümek."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Dökülmeleri derhal temizleyin.",
      "Kablo ve hortumları geçiş yollarından uzak tutun.",
      "Malzemeleri belirlenmiş alanlarda istifleyin.",
      "Bozuk zemini işaretleyin ve bildirin.",
      "Yeterli aydınlatma sağlayın.",
      "Merdiven ve platformları temiz tutun.",
      "Islak alanlarda uygun kaymaz yüzey kullanın.",
      "Geçici tehlikeleri bariyer veya işaretle belirtin.",
      "Uygun tabanlı iş ayakkabısı kullanın.",
      "Housekeeping kontrolünü vardiya boyunca sürdürün."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün geçiş yollarını depolama alanı olarak kullanmayacağız. Dökülme, hortum, kablo veya bozuk zemin görürsek geçip gitmeyeceğiz; tehlikeyi ortadan kaldıracağız veya alanı kontrol altına alacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü ana yürüyüş yolları açık mı?",
      "Dökülme riski bulunan yerler nerede?",
      "Kablo ve hortumlar nasıl yönlendirilecek?",
      "Bozuk zemin var mı?",
      "Aydınlatma yeterli mi?",
      "Tehlike görülürse kim müdahale edecek?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Yürüyüş yolları açık",
      "Dökülme yok",
      "Kablolar kontrollü",
      "Hortumlar kontrollü",
      "Malzeme istifi uygun",
      "Zemin güvenli",
      "Aydınlatma yeterli",
      "Merdivenler temiz",
      "Kaymaz ayakkabı uygun",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "SLIPS TRIPS AND FALLS TOOLBOX TALK",
      "application_subtitle": "Housekeeping, access routes and daily field verification.",
      "subtitle": "Keep walkways clear and prevent same-level falls.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent slips, trips and same-level falls caused by oil, water, cables, hoses, poor storage, uneven surfaces and inadequate lighting.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Slips and trips may appear minor but are common causes of sprains, fractures and lost workdays.",
      "Cables, hoses, packaging and spills in access routes become especially hazardous in busy work areas.",
      "Housekeeping must be continuous throughout the shift rather than treated only as an end-of-shift activity."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker walked through an access route and did not see a thin layer of oil on the floor.",
      "A hose was also routed across the same walkway and the worker lost balance and fell.",
      "Immediate spill cleanup, correct hose routing and temporary warning controls would have prevented the event."
],
    "remember_title": "REMEMBER",
    "remember": "A walkway is not a storage area. Keep it clear, clean and unobstructed.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Oil, water and chemical spills.",
      "Cables and hoses across walkways.",
      "Poorly stored materials.",
      "Uneven or damaged surfaces.",
      "Poor lighting.",
      "Loose objects on stairs and access routes.",
      "Wet or muddy outdoor surfaces.",
      "Running or walking without attention."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Clean spills immediately.",
      "Keep cables and hoses away from access routes.",
      "Store materials in designated areas.",
      "Mark and report damaged surfaces.",
      "Provide adequate lighting.",
      "Keep stairs and platforms clean.",
      "Use suitable slip-resistant surfaces in wet areas.",
      "Barricade or mark temporary hazards.",
      "Wear suitable slip-resistant footwear.",
      "Maintain housekeeping throughout the shift."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, access routes will not be used for storage today. If you see a spill, cable, hose or damaged surface, do not simply walk past it; remove the hazard or control the area.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Are today's main access routes clear?",
      "Where could spills occur?",
      "How will cables and hoses be routed?",
      "Are there damaged surfaces?",
      "Is lighting adequate?",
      "Who will act when a hazard is found?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Walkways clear",
      "No uncontrolled spills",
      "Cables controlled",
      "Hoses controlled",
      "Storage suitable",
      "Surface safe",
      "Lighting adequate",
      "Stairs clean",
      "Footwear suitable",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "vehicle-pedestrian-interface",
  "tr": {
    "title": "ARAÇ VE YAYA ETKİLEŞİMİ TOOLBOX TALK",
      "application_subtitle": "Kör noktalar, trafik kontrolü ve saha doğrulaması.",
      "subtitle": "Araç ve yayaları fiziksel ve operasyonel olarak birbirinden ayırın.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Mobil ekipman ve araçların yaya çalışanlarla etkileşiminde oluşabilecek çarpma, ezilme ve geri manevra risklerini kontrol etmektir.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Ağır ekipman operatörünün görüş alanı düşündüğünüzden çok daha sınırlı olabilir.",
      "Geri manevra, dönüş, dar alan ve yüksek gürültü seviyeleri yaya çalışanların fark edilmesini zorlaştırır.",
      "En güçlü kontrol yayalar ile araçların fiziksel olarak ayrılmasıdır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan kestirme yol kullanarak forkliftin geri manevra yaptığı alandan geçmeye çalıştı.",
      "Operatör çalışanı kör noktada göremedi ve spotter da başka yöne bakıyordu.",
      "Fiziksel yaya yolu, bariyer, belirlenmiş geçiş noktası ve kesintisiz spotter kontrolü olayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Operatör sizi görmüyorsa aracın sizi gördüğünü varsaymayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Araç kör noktaları.",
      "Geri manevra.",
      "Yaya ve araç yollarının kesişmesi.",
      "Dar geçişler.",
      "Yüksek gürültü.",
      "Yetersiz aydınlatma.",
      "Spotter iletişim kaybı.",
      "Yetkisiz kestirme yaya geçişleri."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Yaya ve araç yollarını fiziksel olarak ayırın.",
      "Belirlenmiş yaya geçişlerini kullanın.",
      "Geri manevrada spotter kullanın.",
      "Operatörle göz teması kurmadan yaklaşmayın.",
      "Hız limitlerini uygulayın.",
      "Kör köşe ve kapılarda uyarı sistemi kullanın.",
      "Görüşü engelleyen yüklerle kontrollü hareket edin.",
      "Gece çalışmalarında yeterli aydınlatma sağlayın.",
      "Telefon kullanımını hareket alanlarında yasaklayın.",
      "Trafik planını işe başlamadan ekiple gözden geçirin."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün araç yolundan yürümeyeceğiz ve kestirme kullanmayacağız. Bir araca yaklaşmadan önce operatörle göz teması kuracağız. Operatör bizi görmüyorsa güvenli mesafede kalacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü yaya yolları nerede?",
      "Araç kör noktaları hangileri?",
      "Geri manevrada spotter kim?",
      "Yaya ve araç yolları nerede kesişiyor?",
      "Hız limiti nedir?",
      "İletişim kaybolursa araç ne yapacak?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Yaya yolları belli",
      "Araç yolları belli",
      "Bariyerler uygun",
      "Geçiş noktaları belli",
      "Spotter atanmış",
      "Hız limiti belirlenmiş",
      "Aydınlatma uygun",
      "Kör köşeler kontrollü",
      "İletişim yöntemi belli",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "VEHICLE PEDESTRIAN INTERFACE TOOLBOX TALK",
      "application_subtitle": "Blind spots, traffic controls and daily field verification.",
      "subtitle": "Physically and operationally separate vehicles from pedestrians.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Control struck-by, crushing and reversing hazards where vehicles and mobile equipment interact with pedestrians.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Heavy-equipment operators may have much larger blind spots than pedestrians expect.",
      "Reversing, turning, restricted areas and high noise levels make pedestrians difficult to detect.",
      "The strongest control is physical separation between pedestrian and vehicle routes."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker took a shortcut through an area where a forklift was reversing.",
      "The operator could not see the worker in the blind spot and the spotter was looking in another direction.",
      "A segregated walkway, barriers, designated crossing point and continuous spotter control would have prevented the event."
],
    "remember_title": "REMEMBER",
    "remember": "If the operator cannot see you, never assume the vehicle has seen you.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Vehicle blind spots.",
      "Reversing movements.",
      "Pedestrian and vehicle route crossings.",
      "Restricted access routes.",
      "High noise levels.",
      "Poor lighting.",
      "Loss of spotter communication.",
      "Unauthorised pedestrian shortcuts."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Physically separate pedestrian and vehicle routes.",
      "Use designated pedestrian crossings.",
      "Use a spotter during reversing.",
      "Make eye contact before approaching vehicles.",
      "Enforce site speed limits.",
      "Use warning systems at blind corners.",
      "Control movement when loads restrict visibility.",
      "Provide adequate lighting during night work.",
      "Prohibit phone use in traffic movement areas.",
      "Review the traffic plan with the crew before starting."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, we will not walk in vehicle routes or take shortcuts today. Before approaching a vehicle, make eye contact with the operator. If the operator cannot see you, stay clear.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Where are today's pedestrian routes?",
      "Where are the vehicle blind spots?",
      "Who is the reversing spotter?",
      "Where do pedestrian and vehicle routes cross?",
      "What is the site speed limit?",
      "What happens if communication is lost?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Pedestrian routes identified",
      "Vehicle routes identified",
      "Barriers suitable",
      "Crossings identified",
      "Spotter appointed",
      "Speed limit confirmed",
      "Lighting adequate",
      "Blind corners controlled",
      "Communication method confirmed",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "compressed-gas-cylinders",
  "tr": {
    "title": "BASINÇLI GAZ TÜPLERİ TOOLBOX TALK",
      "application_subtitle": "Basınç, yangın ve tüp devrilme risklerinin saha kontrolü.",
      "subtitle": "Gaz tüplerini güvenli taşıyın, depolayın ve kullanın.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Basınçlı gaz tüplerinin taşınması, depolanması ve kullanımı sırasında devrilme, valf kırılması, yangın, patlama ve gaz kaçağı risklerini kontrol etmektir.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Basınçlı gaz tüpleri yüksek miktarda enerji içerir ve valfin kırılması tüpü kontrolsüz bir projektil haline getirebilir.",
      "Yanıcı gazlar oksitleyici gazlardan uygun mesafe veya yangına dayanımlı bariyer ile ayrılmalıdır.",
      "Tüpler dik, sabitlenmiş, valf koruması takılı ve uygun havalandırılan alanda tutulmalıdır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan oksijen tüpünü zincirle sabitlemeden duvara yasladı.",
      "Tüp devrildi ve valf koruması olmadığı için valf zemine çarptı.",
      "Tüpün uygun taşıma arabasıyla taşınması, dik sabitlenmesi ve valf kapağının kullanılması olayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Tüpü valfinden, regülatöründen veya hortumundan taşıma aracı olarak kullanmayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Tüp devrilmesi.",
      "Valf kırılması.",
      "Yanıcı gaz kaçağı.",
      "Oksijen zenginleşmesi.",
      "Uyumsuz gazların birlikte depolanması.",
      "Hasarlı regülatör veya hortum.",
      "Isı kaynağına maruz kalma.",
      "Yanlış tüp veya gaz bağlantısı."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Tüpleri dik ve güvenli şekilde sabitleyin.",
      "Taşıma sırasında uygun tüp arabası kullanın.",
      "Valf koruma kapağını takın.",
      "Oksijen ile yanıcı gazları uygun şekilde ayırın.",
      "Tüpleri ısı ve ateş kaynaklarından uzak tutun.",
      "Regülatör ve hortumları kullanımdan önce kontrol edin.",
      "Yağ ve gresin oksijen ekipmanına temasını önleyin.",
      "Kullanılmayan tüplerin valflerini kapatın.",
      "Tüp etiketini ve gaz tipini doğrulayın.",
      "Kaçak şüphesinde alanı boşaltın ve güvenli şekilde bildirin."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün hiçbir tüp serbest bırakılmayacak veya elde yuvarlanmayacak. Tüpler dik sabitlenecek, doğru regülatör kullanılacak ve oksijen ekipmanına yağ veya gres temas ettirilmeyecek.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Tüpler güvenli şekilde sabitlendi mi?",
      "Oksijen ve yanıcı gazlar ayrıldı mı?",
      "Regülatörler uygun mu?",
      "Hortumlarda hasar var mı?",
      "Tüp etiketleri okunabilir mi?",
      "Kaçak görülürse ne yapacağız?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Tüpler dik",
      "Tüpler sabit",
      "Valf kapakları uygun",
      "Gaz tipleri doğrulandı",
      "Ayrım mesafesi uygun",
      "Regülatörler sağlam",
      "Hortumlar sağlam",
      "Isı kaynağı uzakta",
      "Havalandırma yeterli",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "COMPRESSED GAS CYLINDERS TOOLBOX TALK",
      "application_subtitle": "Pressure, fire and cylinder-stability field controls.",
      "subtitle": "Handle, store and use compressed-gas cylinders safely.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Control cylinder-fall, valve-damage, fire, explosion and gas-leak hazards during transport, storage and use of compressed-gas cylinders.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Compressed-gas cylinders contain significant stored energy and a broken valve can turn a cylinder into an uncontrolled projectile.",
      "Fuel gases must be suitably separated from oxidising gases by distance or approved fire-resistant separation.",
      "Cylinders should remain upright, secured, protected and stored in adequately ventilated areas."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker leaned an oxygen cylinder against a wall without securing it.",
      "The cylinder fell and the unprotected valve struck the floor.",
      "Using a suitable cylinder trolley, securing the cylinder upright and fitting the valve cap would have prevented the event."
],
    "remember_title": "REMEMBER",
    "remember": "Never handle a cylinder by the valve, regulator or hose.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Cylinder falling.",
      "Valve breakage.",
      "Flammable gas leakage.",
      "Oxygen enrichment.",
      "Incompatible gases stored together.",
      "Damaged regulators or hoses.",
      "Exposure to heat sources.",
      "Incorrect cylinder or gas connection."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Secure cylinders upright.",
      "Use a suitable cylinder trolley for transport.",
      "Fit valve-protection caps when required.",
      "Separate oxygen from fuel gases appropriately.",
      "Keep cylinders away from heat and ignition sources.",
      "Inspect regulators and hoses before use.",
      "Keep oil and grease away from oxygen equipment.",
      "Close cylinder valves when not in use.",
      "Verify cylinder labels and gas type.",
      "Evacuate and report safely if leakage is suspected."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, no cylinder will be left unsecured or rolled by hand today. Cylinders will remain upright, the correct regulator will be used and oil or grease will never contact oxygen equipment.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Are all cylinders secured?",
      "Are oxygen and fuel gases separated?",
      "Are regulators suitable?",
      "Are hoses free from damage?",
      "Are cylinder labels readable?",
      "What will we do if a leak is detected?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Cylinders upright",
      "Cylinders secured",
      "Valve caps suitable",
      "Gas types verified",
      "Separation suitable",
      "Regulators intact",
      "Hoses intact",
      "Heat sources controlled",
      "Ventilation adequate",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "pressure-testing",
  "tr": {
    "title": "BASINÇ TESTİ TOOLBOX TALK",
      "application_subtitle": "Basınç sınırları, dışlama alanı ve test öncesi saha doğrulaması.",
      "subtitle": "Basınçlı testlerde kontrolsüz enerji boşalmasını ve ekipman arızasını önleyin.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Hidrostatik ve pnömatik basınç testlerinde aşırı basınç, bağlantı arızası, kör tapa veya flanş fırlaması, hortum savrulması ve kontrolsüz enerji boşalmasından kaynaklanan ciddi yaralanmaları önlemektir.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Basınç testi sırasında sistem normal işletmeden çok farklı enerji seviyelerine ulaşabilir. Küçük bir bağlantı hatası bile ciddi bir enerji boşalmasına neden olabilir.",
      "Pnömatik testler sıkıştırılabilir gaz nedeniyle hidrostatik testlerden daha yüksek depolanmış enerji içerebilir ve özel değerlendirme gerektirir.",
      "Test başlamadan önce test basıncı, ekipman sınırları, körlemeler, kalibrasyonlu göstergeler, emniyet cihazları ve dışlama alanı doğrulanmalıdır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekip boru hattında basınç testi yaparken geçici kör flanş yeterli kapasitede olmadığı halde teste devam etti.",
      "Basınç yükselirken bağlantı deformasyona uğradı ve flanş çevresinde ciddi sızıntı başladı.",
      "Testin durdurulması, uygun rated ekipman kullanılması, doğru test paketi ve dışlama alanı olayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Basınçlı sistemde küçük bir sızıntı dahi yüksek enerjili jet veya ekipman fırlaması anlamına gelebilir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Aşırı basınç nedeniyle ekipman veya hat arızası.",
      "Kör tapa, flanş veya fittinglerin fırlaması.",
      "Basınçlı hortum veya bağlantının savrulması.",
      "Yüksek basınçlı sıvı enjeksiyon yaralanması.",
      "Pnömatik testte yüksek depolanmış enerji.",
      "Yanlış veya kalibrasyonsuz basınç göstergeleri.",
      "Uygunsuz test ekipmanı veya geçici bağlantılar.",
      "Personelin dışlama alanına girmesi."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Onaylı test prosedürü ve test paketini doğrulayın.",
      "Test basıncını ve ekipman tasarım limitlerini kontrol edin.",
      "Kalibrasyonlu manometreler kullanın.",
      "Uygun basınç tahliye cihazlarını sağlayın.",
      "Geçici bağlantı, tapa ve körlemelerin ratinglerini doğrulayın.",
      "Test alanında etkili dışlama bölgesi oluşturun.",
      "Basıncı kontrollü ve kademeli olarak yükseltin.",
      "Sızıntı kontrolünü güvenli mesafeden yapın.",
      "Basıncı tamamen boşaltmadan müdahale etmeyin.",
      "Anormal durum veya sızıntıda testi hemen durdurun."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün basınç testi sırasında sistemin depolanmış enerji içerdiğini unutmayacağız. Test basıncı, körlemeler, göstergeler ve dışlama alanı doğrulanmadan teste başlamıyoruz. Basınç altındaki bağlantıya yaklaşmayacağız veya müdahale etmeyeceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü test basıncı nedir?",
      "Sistemin maksimum izin verilen basıncı nedir?",
      "Manometrelerin kalibrasyonu geçerli mi?",
      "Dışlama alanı nerede?",
      "Basınç nasıl güvenli şekilde boşaltılacak?",
      "Sızıntı veya anormallikte kim testi durduracak?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Test prosedürü onaylı",
      "Test basıncı doğrulandı",
      "Ekipman rating uygun",
      "Manometre kalibre",
      "Tahliye sistemi hazır",
      "Körlemeler uygun",
      "Dışlama alanı hazır",
      "İletişim yöntemi belli",
      "Basınç boşaltma yöntemi belli",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "PRESSURE TESTING TOOLBOX TALK",
      "application_subtitle": "Pressure limits, exclusion zones and pre-test field verification.",
      "subtitle": "Prevent uncontrolled energy release and equipment failure during pressure testing.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent serious injuries caused by overpressure, connection failure, ejected blinds or flanges, hose whip and uncontrolled energy release during hydrostatic and pneumatic testing.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Pressure testing can expose systems to energy levels very different from normal operating conditions. A small connection failure can release significant energy.",
      "Pneumatic testing can contain considerably more stored energy than hydrostatic testing because gases are compressible and therefore requires additional precautions.",
      "Before testing, confirm test pressure, equipment limits, blinds, calibrated gauges, relief devices and the exclusion zone."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A crew pressure-tested a piping system using a temporary blind that was not adequately rated.",
      "As pressure increased, the connection began to deform and a significant leak developed around the flange.",
      "The event could have been prevented through correct rated equipment, an approved test package, controlled pressurisation and an effective exclusion zone."
],
    "remember_title": "REMEMBER",
    "remember": "Even a small leak from a pressurised system can create a high-energy jet or projectile hazard.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Equipment or piping failure from overpressure.",
      "Ejection of blinds, flanges or fittings.",
      "Hose whip from pressurised connections.",
      "High-pressure fluid injection injuries.",
      "High stored energy during pneumatic testing.",
      "Incorrect or uncalibrated pressure gauges.",
      "Unsuitable temporary test equipment.",
      "Personnel entering the exclusion zone."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Verify the approved test procedure and test package.",
      "Confirm test pressure and equipment design limits.",
      "Use calibrated pressure gauges.",
      "Provide suitable pressure-relief devices.",
      "Verify ratings of temporary connections and blinds.",
      "Establish an effective exclusion zone.",
      "Increase pressure slowly and in controlled stages.",
      "Inspect for leaks from a safe distance.",
      "Do not intervene until pressure is fully released.",
      "Stop the test immediately if leakage or abnormal conditions occur."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, today's pressure test involves stored energy. We will not start until test pressure, blinds, gauges and the exclusion zone are verified. No one will approach or intervene on a connection while it remains pressurised.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What is today's test pressure?",
      "What is the system's allowable pressure limit?",
      "Are pressure gauges within calibration?",
      "Where is the exclusion zone?",
      "How will pressure be safely released?",
      "Who will stop the test if leakage occurs?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Test procedure approved",
      "Test pressure confirmed",
      "Equipment rating suitable",
      "Gauge calibrated",
      "Relief system ready",
      "Blinds suitable",
      "Exclusion zone ready",
      "Communication confirmed",
      "Depressurisation method confirmed",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "grinding-cutting-safety",
  "tr": {
    "title": "TAŞLAMA VE KESME GÜVENLİĞİ TOOLBOX TALK",
      "application_subtitle": "Disk seçimi, koruyucu muhafaza ve günlük ekipman kontrolü.",
      "subtitle": "Taşlama ve kesme sırasında disk kırılması, kıvılcım ve fırlayan parça risklerini kontrol edin.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Taşlama ve kesme çalışmalarında disk kırılması, fırlayan parçalar, kıvılcımlar, yangın, kesilme ve ekipman geri tepmesinden kaynaklanan yaralanmaları önlemektir.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Taşlama diskleri yüksek devirde çalışır ve yanlış disk seçimi, hasar veya aşırı yüklenme disk parçalanmasına neden olabilir.",
      "Diskin maksimum RPM değeri kullanılan makinenin devrinden düşük olmamalıdır ve koruyucu muhafaza doğru konumda bulunmalıdır.",
      "Kıvılcımlar yanıcı malzemeleri tutuşturabilir; çalışma alanı, alt seviyeler ve kıvılcım yönü işe başlamadan kontrol edilmelidir."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan metal kesmek için uygun olmayan ve üzerinde çatlak bulunan diski avuç taşlamaya taktı.",
      "Disk yüksek devirde parçalandı ve parçalar çalışma alanına savruldu.",
      "Doğru disk seçimi, kullanım öncesi kontrol ve koruyucu muhafazanın uygun kullanımı yaralanmayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Hasarlı, yanlış tipte veya RPM değeri uygun olmayan diski hiçbir zaman kullanmayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Disk kırılması ve fırlayan parçalar.",
      "Kıvılcımların yanıcı malzemeleri tutuşturması.",
      "Ekipmanın geri tepmesi.",
      "Koruyucu muhafazanın çıkarılması.",
      "Yanlış disk veya aksesuar kullanımı.",
      "Keskin metal kenarlar.",
      "Göz ve yüz yaralanmaları.",
      "Gürültü ve metal tozu maruziyeti."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Disk tipini yapılacak işe uygun seçin.",
      "Disk RPM değerini makine devriyle karşılaştırın.",
      "Diskte çatlak ve hasar kontrolü yapın.",
      "Koruyucu muhafazayı doğru konumda kullanın.",
      "Yanıcı malzemeleri kıvılcım hattından uzaklaştırın.",
      "İş parçasını sağlam şekilde sabitleyin.",
      "İki elle kontrollü çalışma yapın.",
      "Gözlük ve yüz siperi kullanın.",
      "Uygun işitme ve solunum koruması kullanın.",
      "Disk değişiminden önce enerjiyi kesin."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, taşlama makinesini kullanmadan önce disk, muhafaza ve RPM uyumunu kontrol edeceğiz. Kıvılcım yönünde personel veya yanıcı malzeme olmayacak. Koruyucusu çıkarılmış ekipman kullanılmayacak.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Kullanılan disk işe uygun mu?",
      "Disk RPM değeri makineyle uyumlu mu?",
      "Koruyucu muhafaza yerinde mi?",
      "Kıvılcımlar nereye gidecek?",
      "İş parçası sabit mi?",
      "Disk değişiminde enerji nasıl kesilecek?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Disk uygun",
      "Disk hasarsız",
      "RPM uyumlu",
      "Muhafaza yerinde",
      "İş parçası sabit",
      "Kıvılcım alanı temiz",
      "Göz koruması uygun",
      "Yüz siperi hazır",
      "İşitme koruması uygun",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "GRINDING AND CUTTING SAFETY TOOLBOX TALK",
      "application_subtitle": "Disc selection, guarding and daily equipment verification.",
      "subtitle": "Control disc failure, sparks and flying-particle hazards during grinding and cutting.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent injuries caused by disc failure, flying particles, sparks, fire, cuts and tool kickback during grinding and cutting work.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Grinding discs operate at very high speed and incorrect selection, damage or excessive loading can cause catastrophic disc failure.",
      "The disc's maximum RPM rating must be suitable for the machine and the guard must remain correctly positioned.",
      "Sparks can ignite combustible materials, so the work area, lower levels and spark direction must be checked before starting."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker fitted a cracked and unsuitable cutting disc to an angle grinder.",
      "The disc failed at high speed and fragments were thrown across the work area.",
      "Correct disc selection, pre-use inspection and proper guarding would have prevented the event."
],
    "remember_title": "REMEMBER",
    "remember": "Never use a damaged disc or one with an unsuitable type or RPM rating.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Disc failure and flying fragments.",
      "Sparks igniting combustible materials.",
      "Tool kickback.",
      "Removed or incorrectly positioned guards.",
      "Incorrect discs or accessories.",
      "Sharp metal edges.",
      "Eye and face injuries.",
      "Noise and metal-dust exposure."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Select the correct disc for the task.",
      "Confirm the disc RPM rating suits the machine.",
      "Inspect discs for cracks or damage.",
      "Keep the guard correctly positioned.",
      "Remove combustibles from the spark path.",
      "Secure the workpiece firmly.",
      "Maintain controlled two-handed operation.",
      "Use safety glasses and a face shield.",
      "Use suitable hearing and respiratory protection.",
      "Isolate power before changing discs."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, before using any grinder we will check the disc, guard and RPM compatibility. No person or combustible material will remain in the spark path. Equipment without a suitable guard will not be used.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the disc suitable for the task?",
      "Is the disc RPM rating compatible?",
      "Is the guard correctly positioned?",
      "Where will sparks travel?",
      "Is the workpiece secured?",
      "How will power be isolated before disc changes?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Disc suitable",
      "Disc undamaged",
      "RPM compatible",
      "Guard fitted",
      "Workpiece secured",
      "Spark area clear",
      "Eye protection suitable",
      "Face shield ready",
      "Hearing protection suitable",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "welding-fumes",
  "tr": {
    "title": "KAYNAK DUMANI TOOLBOX TALK",
      "application_subtitle": "Havalandırma, LEV ve solunum koruması saha doğrulaması.",
      "subtitle": "Kaynak dumanı ve metal buharlarına maruziyeti kaynağında kontrol edin.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Kaynak sırasında oluşan metal dumanı, gaz ve partiküllerin solunmasından kaynaklanan akut ve uzun süreli sağlık risklerini azaltmaktır.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Kaynak dumanı gözle görünenden daha ince partiküller ve çeşitli metal oksitler içerebilir.",
      "Paslanmaz çelik, galvanizli metal veya boyalı yüzeyler farklı ve daha ciddi maruziyet riskleri oluşturabilir.",
      "En etkili kontrol dumanı kaynağında yakalayan lokal emiş sistemi ve yeterli genel havalandırmadır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir kaynakçı dar ve zayıf havalandırılan alanda uzun süre kaynak yaptı.",
      "LEV kullanılmadı ve duman kaynakçının solunum bölgesinde birikti.",
      "Uygun lokal emiş, hava değişimi ve gerekli solunum koruması maruziyeti önemli ölçüde azaltabilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Kaynak dumanının görünmemesi havanın güvenli olduğu anlamına gelmez.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Metal dumanı solunması.",
      "Paslanmaz çelik kaynak dumanları.",
      "Galvaniz kaplamadan çıkan çinko oksit.",
      "Boyalı yüzeylerden toksik duman.",
      "Kapalı veya dar alanlarda duman birikmesi.",
      "Yetersiz havalandırma.",
      "Yanlış solunum koruyucu seçimi.",
      "Uzun süreli kronik maruziyet."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Kaynak yapılacak malzemeyi ve kaplamayı belirleyin.",
      "Yüzeydeki boya veya kaplamayı güvenli şekilde temizleyin.",
      "Lokal emiş havalandırması kullanın.",
      "Genel havalandırmayı yeterli seviyede sağlayın.",
      "Kaynakçının başını duman bulutunun dışında tutun.",
      "Gerekliyse uygun respiratör kullanın.",
      "Respiratör için fit test ve filtre uygunluğunu doğrulayın.",
      "Kapalı alanlarda atmosfer kontrolü yapın.",
      "LEV sisteminin çalışmasını işe başlamadan doğrulayın.",
      "Maruziyet kontrolü yetersizse işi durdurun."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün kaynak dumanını yalnızca KKD ile kontrol etmeyeceğiz. Önce lokal emiş ve havalandırmayı sağlayacağız. Malzeme ve kaplama türünü kontrol edecek, gerekiyorsa uygun respiratör kullanacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugün hangi metal kaynaklanacak?",
      "Yüzeyde boya veya kaplama var mı?",
      "LEV sistemi çalışıyor mu?",
      "Kaynakçının solunum bölgesi nerede?",
      "Respiratör gerekiyorsa doğru filtre seçildi mi?",
      "Havalandırma bozulursa ne yapacağız?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Malzeme türü belli",
      "Kaplama kontrol edildi",
      "LEV çalışıyor",
      "Havalandırma yeterli",
      "Kaynakçı konumu uygun",
      "Respiratör gerekliliği değerlendirildi",
      "Filtre uygun",
      "Fit test geçerli",
      "Atmosfer kontrolü uygun",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "WELDING FUMES TOOLBOX TALK",
      "application_subtitle": "Ventilation, LEV and respiratory-protection field verification.",
      "subtitle": "Control welding-fume and metal-vapour exposure at source.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Reduce acute and long-term health risks from inhalation of metal fumes, gases and particulates generated during welding.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Welding fumes can contain extremely fine particles and different metal oxides that may not always be clearly visible.",
      "Stainless steel, galvanised metal and coated surfaces may create additional and more serious exposure hazards.",
      "The most effective control is local exhaust ventilation that captures fumes at source together with adequate general ventilation."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A welder worked for an extended period in a restricted area with poor ventilation.",
      "No local exhaust ventilation was used and fumes accumulated around the welder's breathing zone.",
      "Effective LEV, adequate air exchange and suitable respiratory protection would have significantly reduced the exposure."
],
    "remember_title": "REMEMBER",
    "remember": "The absence of visible welding fumes does not mean the air is safe.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Inhalation of metal fumes.",
      "Stainless-steel welding fumes.",
      "Zinc oxide from galvanised materials.",
      "Toxic fumes from painted surfaces.",
      "Fume accumulation in restricted areas.",
      "Inadequate ventilation.",
      "Incorrect respiratory-protection selection.",
      "Long-term chronic exposure."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify the base metal and coatings.",
      "Safely remove unsuitable coatings before welding.",
      "Use local exhaust ventilation.",
      "Provide adequate general ventilation.",
      "Keep the welder's head outside the fume plume.",
      "Use suitable respiratory protection where required.",
      "Verify fit testing and filter suitability.",
      "Monitor atmosphere in confined or restricted areas.",
      "Confirm LEV operation before starting.",
      "Stop work if exposure controls are ineffective."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, welding fumes will not be controlled by PPE alone. We will first provide effective LEV and ventilation. We will confirm the material and coating and use suitable respiratory protection where required.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What metal are we welding today?",
      "Is the surface painted or coated?",
      "Is the LEV operating correctly?",
      "Where is the welder's breathing zone?",
      "If a respirator is required, is the correct filter selected?",
      "What will we do if ventilation fails?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Material identified",
      "Coating checked",
      "LEV operating",
      "Ventilation adequate",
      "Welder position suitable",
      "Respirator need assessed",
      "Filter suitable",
      "Fit test valid",
      "Atmosphere acceptable",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "heat-stress",
  "tr": {
    "title": "ISI STRESİ TOOLBOX TALK",
      "application_subtitle": "Hidrasyon, dinlenme, gölge ve çalışan takibi.",
      "subtitle": "Sıcak ortamda vücut ısısı, sıvı kaybı ve aşırı yorgunluğu kontrol edin.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Yüksek sıcaklık, güneş, ağır fiziksel çalışma ve KKD kullanımından kaynaklanan ısı stresi, sıcak bitkinliği ve sıcak çarpması risklerini önlemektir.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Isı stresi yalnızca hava sıcaklığına bağlı değildir; nem, güneş, iş yükü, KKD ve çalışanın alışkanlığı da riski etkiler.",
      "Baş ağrısı, aşırı terleme, baş dönmesi, bulantı ve kas krampları erken belirtiler olabilir.",
      "Bilinç değişikliği, koordinasyon kaybı veya çok yüksek vücut sıcaklığı acil durum kabul edilmelidir."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Yeni başlayan bir çalışan sıcak öğleden sonra ağır iş yapmaya devam etti ve düzenli su molası vermedi.",
      "Bir süre sonra baş dönmesi, bulantı ve dengesizlik gelişti.",
      "Kademeli aklimatizasyon, planlı su-dinlenme molaları ve buddy kontrolü olayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Bilinç değişikliği veya koordinasyon kaybı görülen çalışanı sıcak ortamda bırakmayın; acil yardım çağırın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yüksek hava sıcaklığı.",
      "Doğrudan güneş maruziyeti.",
      "Yüksek nem.",
      "Ağır fiziksel iş yükü.",
      "Yoğun veya geçirimsiz KKD.",
      "Yetersiz sıvı alımı.",
      "Aklimatize olmayan çalışanlar.",
      "Isı hastalığı belirtilerinin geç fark edilmesi."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Isı riskini vardiya öncesi değerlendirin.",
      "İçilebilir serin suyu erişilebilir tutun.",
      "Planlı su ve dinlenme molaları uygulayın.",
      "Gölgelik veya serin dinlenme alanı sağlayın.",
      "Ağır işleri mümkünse serin saatlere planlayın.",
      "Yeni çalışanlarda kademeli aklimatizasyon uygulayın.",
      "Buddy sistemiyle çalışanları gözlemleyin.",
      "Uygun hafif iş kıyafeti ve KKD seçin.",
      "Belirti gösteren çalışanı derhal sıcak ortamdan çıkarın.",
      "Acil durumda tıbbi yardım prosedürünü uygulayın."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün sıcaklık yüksekse hızımızı ve mola düzenimizi buna göre ayarlayacağız. Susamayı beklemeden su içeceğiz ve birbirimizin belirtilerini izleyeceğiz. Baş dönmesi veya bulantıyı gizlemeyin.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü ısı riski ne seviyede?",
      "Su ve gölge alanı nerede?",
      "Mola sıklığı nedir?",
      "Kimler yeni veya aklimatize değil?",
      "Isı bitkinliği belirtileri nelerdir?",
      "Acil durumda ne yapacağız?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Isı riski değerlendirildi",
      "Su hazır",
      "Gölge alanı hazır",
      "Mola planı belli",
      "Ağır işler planlandı",
      "Aklimatizasyon değerlendirildi",
      "Buddy sistemi aktif",
      "KKD uygun",
      "Acil iletişim belli",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "HEAT STRESS TOOLBOX TALK",
      "application_subtitle": "Hydration, rest, shade and worker monitoring.",
      "subtitle": "Control body heat, dehydration and excessive fatigue in hot environments.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent heat stress, heat exhaustion and heat stroke caused by high temperatures, direct sun, heavy physical work and PPE.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Heat stress is affected not only by air temperature but also humidity, sunlight, workload, PPE and acclimatisation.",
      "Headache, heavy sweating, dizziness, nausea and muscle cramps can be early warning signs.",
      "Confusion, loss of coordination or very high body temperature must be treated as a medical emergency."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A new worker continued heavy work during a hot afternoon without regular hydration breaks.",
      "The worker later developed dizziness, nausea and poor coordination.",
      "Gradual acclimatisation, planned water-rest breaks and buddy monitoring would have prevented escalation."
],
    "remember_title": "REMEMBER",
    "remember": "If a worker becomes confused or loses coordination, remove them from heat and obtain emergency medical assistance.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "High air temperature.",
      "Direct sunlight.",
      "High humidity.",
      "Heavy physical workload.",
      "Heavy or impermeable PPE.",
      "Inadequate fluid intake.",
      "Workers not acclimatised.",
      "Delayed recognition of heat illness."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Assess heat risk before the shift.",
      "Provide accessible cool drinking water.",
      "Schedule regular hydration and rest breaks.",
      "Provide shaded or cooled rest areas.",
      "Plan heavy work for cooler periods where possible.",
      "Use gradual acclimatisation for new workers.",
      "Use a buddy system to monitor symptoms.",
      "Select suitable lightweight clothing and PPE.",
      "Remove symptomatic workers from the hot area immediately.",
      "Follow emergency medical-response procedures."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, if temperatures are high today we will adjust work pace and rest periods. Drink water before you feel thirsty and watch each other for symptoms. Do not hide dizziness or nausea.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What is today's heat-risk level?",
      "Where are water and shaded rest areas?",
      "What is the planned break frequency?",
      "Who is new or not yet acclimatised?",
      "What are the signs of heat exhaustion?",
      "What is our emergency response?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Heat risk assessed",
      "Water available",
      "Shade available",
      "Break plan confirmed",
      "Heavy work scheduled",
      "Acclimatisation assessed",
      "Buddy system active",
      "PPE suitable",
      "Emergency contact confirmed",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "cold-stress",
  "tr": {
    "title": "SOĞUK STRESİ TOOLBOX TALK",
      "application_subtitle": "Katmanlı giyim, ısınma molaları ve çalışan takibi.",
      "subtitle": "Soğuk, rüzgâr ve ıslak koşullarda hipotermi ve donma risklerini kontrol edin.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Düşük sıcaklık, rüzgâr, ıslak kıyafet ve uzun süreli açık hava çalışmasından kaynaklanan hipotermi, donma ve el becerisi kaybı risklerini önlemektir.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Rüzgâr ve ıslaklık hissedilen sıcaklığı önemli ölçüde düşürerek soğuk stresini artırabilir.",
      "Titreme, uyuşma, koordinasyon kaybı ve yavaş konuşma hipoterminin erken veya ilerleyen belirtileri olabilir.",
      "Soğuk eller kavrama gücünü ve ince motor kontrolü azaltarak ikincil iş kazası riskini de yükseltir."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan yağmurlu ve rüzgârlı havada ıslak eldivenlerle çalışmaya devam etti.",
      "Parmaklarında uyuşma başladı ancak işi bitirmek için durumu bildirmedi.",
      "Kuru yedek eldiven, düzenli ısınma molası ve erken belirti bildirimi daha ciddi soğuk yaralanmasını önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Kontrol edilemeyen titreme, bilinç değişikliği veya koordinasyon kaybı ciddi soğuk stresinin belirtisi olabilir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Düşük hava sıcaklığı.",
      "Yüksek rüzgâr hızı.",
      "Islak kıyafet.",
      "Uzun süre açık havada çalışma.",
      "Metal yüzeylere çıplak temas.",
      "El becerisi ve kavrama kaybı.",
      "Hipotermi.",
      "Donma ve doku hasarı."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Hava ve rüzgâr koşullarını vardiya öncesi değerlendirin.",
      "Katmanlı ve kuru iş kıyafeti kullanın.",
      "Islak kıyafetleri derhal değiştirin.",
      "Yalıtımlı eldiven ve uygun ayakkabı kullanın.",
      "Planlı sıcak ortam molaları sağlayın.",
      "Çalışanları buddy sistemiyle takip edin.",
      "Çıplak cildin soğuk metale temasını önleyin.",
      "Uzun süreli açık hava işlerini rotasyonla yönetin.",
      "Soğuk stres belirtilerini ekibe açıklayın.",
      "Belirti gösteren çalışanı sıcak alana alın ve gerektiğinde tıbbi yardım çağırın."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün soğuk ve rüzgâr varsa yalnız sıcaklığa değil ıslaklık ve rüzgâra da dikkat edeceğiz. Islak eldiven veya kıyafetle çalışmaya devam etmeyeceğiz. Uyuşma ve kontrolsüz titremeyi hemen bildirin.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü rüzgâr ve sıcaklık koşulları nedir?",
      "Isınma alanı nerede?",
      "Yedek kuru eldiven ve kıyafet var mı?",
      "Kimler uzun süre dışarıda çalışacak?",
      "Hipotermi belirtileri nelerdir?",
      "Belirti görülürse ne yapacağız?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Hava koşulları değerlendirildi",
      "Rüzgâr dikkate alındı",
      "Kıyafet uygun",
      "Yedek kuru kıyafet hazır",
      "Eldiven uygun",
      "Isınma alanı hazır",
      "Mola planı belli",
      "Buddy sistemi aktif",
      "Acil yardım yöntemi belli",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "COLD STRESS TOOLBOX TALK",
      "application_subtitle": "Layered clothing, warming breaks and worker monitoring.",
      "subtitle": "Control hypothermia and frostbite risks in cold, windy and wet conditions.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent hypothermia, frostbite and loss of manual dexterity caused by low temperatures, wind, wet clothing and prolonged outdoor work.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Wind and wet conditions can significantly increase cold stress by reducing effective body temperature.",
      "Shivering, numbness, loss of coordination and slowed speech may indicate developing hypothermia.",
      "Cold hands also reduce grip strength and fine motor control, increasing the likelihood of secondary incidents."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker continued outdoor work in windy rain while wearing wet gloves.",
      "Numbness developed in the fingers but the worker did not report it because the task was nearly complete.",
      "Dry replacement gloves, regular warming breaks and early reporting would have prevented further cold injury."
],
    "remember_title": "REMEMBER",
    "remember": "Uncontrolled shivering, confusion or loss of coordination can indicate serious cold stress.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Low air temperature.",
      "High wind speed.",
      "Wet clothing.",
      "Prolonged outdoor exposure.",
      "Bare-skin contact with cold metal.",
      "Loss of dexterity and grip strength.",
      "Hypothermia.",
      "Frostbite and tissue damage."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Assess temperature and wind conditions before the shift.",
      "Use layered and dry work clothing.",
      "Replace wet clothing immediately.",
      "Use insulated gloves and suitable footwear.",
      "Provide scheduled warming breaks.",
      "Monitor workers using a buddy system.",
      "Prevent bare-skin contact with cold metal.",
      "Rotate prolonged outdoor tasks.",
      "Brief the crew on cold-stress symptoms.",
      "Move symptomatic workers to warmth and obtain medical help where required."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, if conditions are cold and windy today we will consider wind and wetness as well as temperature. Do not continue working in wet gloves or clothing. Report numbness or uncontrolled shivering immediately.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What are today's temperature and wind conditions?",
      "Where is the warming area?",
      "Are dry replacement gloves and clothing available?",
      "Who will work outside for extended periods?",
      "What are the signs of hypothermia?",
      "What will we do if symptoms appear?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Weather assessed",
      "Wind considered",
      "Clothing suitable",
      "Dry replacements ready",
      "Gloves suitable",
      "Warming area ready",
      "Break plan confirmed",
      "Buddy system active",
      "Emergency method confirmed",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "noise-hearing-protection",
  "tr": {
    "title": "GÜRÜLTÜ VE İŞİTME KORUMA TOOLBOX TALK",
      "application_subtitle": "Gürültü kaynakları, maruziyet süresi ve işitme koruması doğrulaması.",
      "subtitle": "Yüksek gürültü maruziyetini kaynağında azaltın ve işitmenizi koruyun.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Yüksek gürültüye maruziyet sonucu oluşabilecek geçici veya kalıcı işitme kaybı, iletişim güçlüğü ve ikincil kaza risklerini azaltmaktır.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Gürültüye bağlı işitme kaybı çoğu zaman yavaş gelişir ve çalışan zarar oluşana kadar fark etmeyebilir.",
      "Taşlama, darbeli işler, kompresörler, jeneratörler ve ağır ekipman yüksek gürültü kaynaklarıdır.",
      "Kontrol öncelikle kaynağı azaltmak, mesafeyi artırmak ve maruziyet süresini sınırlandırmak olmalıdır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan gün boyunca taşlama yapılan alanda kulak koruması kullanmadan çalıştı.",
      "Vardiya sonunda kulak çınlaması ve geçici işitme kaybı yaşadı.",
      "Alan gürültü değerlendirmesi, uygun kulaklık veya tıkaç ve maruziyet süresinin sınırlandırılması olayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Vardiya sonrası kulak çınlaması gürültü maruziyetinin önemli bir uyarı işaretidir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Uzun süre yüksek gürültüye maruz kalmak.",
      "Taşlama ve darbeli işler.",
      "Kompresör ve jeneratörler.",
      "Mobil ekipman ve motor gürültüsü.",
      "İletişim ve alarm seslerini duyamamak.",
      "Yanlış veya yetersiz işitme koruması.",
      "Koruyucunun uygunsuz takılması.",
      "Maruziyet süresinin kontrol edilmemesi."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Gürültü kaynağını mümkün olduğunca azaltın.",
      "Gürültülü ekipmanı izole edin veya bariyerleyin.",
      "Çalışan ile kaynak arasındaki mesafeyi artırın.",
      "Maruziyet süresini sınırlandırın.",
      "Uygun SNR/NRR değerine sahip koruyucu seçin.",
      "Kulak tıkacını doğru şekilde takın.",
      "Çift koruma gerekiyorsa kulaklık ve tıkaç birlikte kullanın.",
      "Gürültü alanlarını işaretleyin.",
      "Alarm ve iletişim sistemlerinin duyulabilirliğini kontrol edin.",
      "İşitme korumasında hasar veya uygunsuzluk varsa değiştirin."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün yüksek gürültülü işlerde işitme koruması zorunlu olacak. Ancak sadece KKD'ye güvenmeyeceğiz; kaynağı, mesafeyi ve maruziyet süresini de kontrol edeceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü ana gürültü kaynakları hangileri?",
      "Hangi alanlarda işitme koruması zorunlu?",
      "Kullanılan koruyucunun seviyesi uygun mu?",
      "Alarm sesleri duyulabiliyor mu?",
      "Maruziyet süresi nasıl sınırlandırılacak?",
      "Kulak çınlaması olursa ne yapılacak?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Gürültü kaynağı belirlendi",
      "Alan işaretlendi",
      "Koruyucu uygun",
      "Tıkaç doğru takıldı",
      "Kulaklık sağlam",
      "Çift koruma değerlendirildi",
      "Maruziyet süresi kontrol edildi",
      "Alarm duyulabilir",
      "İletişim yöntemi uygun",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "NOISE AND HEARING PROTECTION TOOLBOX TALK",
      "application_subtitle": "Noise sources, exposure duration and hearing-protection verification.",
      "subtitle": "Reduce high-noise exposure at source and protect hearing.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Reduce temporary or permanent hearing loss, communication difficulty and secondary incident risks caused by excessive noise exposure.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Noise-induced hearing loss often develops gradually and workers may not notice the damage until it becomes permanent.",
      "Grinding, impact work, compressors, generators and heavy equipment are common high-noise sources.",
      "Controls should first reduce noise at source, increase distance and limit exposure duration."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker spent most of the shift near grinding activities without hearing protection.",
      "At the end of the shift the worker experienced ringing in the ears and temporary hearing reduction.",
      "Noise assessment, suitable plugs or earmuffs and controlled exposure duration would have prevented the event."
],
    "remember_title": "REMEMBER",
    "remember": "Ringing in the ears after work is an important warning sign of excessive noise exposure.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Prolonged high-noise exposure.",
      "Grinding and impact work.",
      "Compressors and generators.",
      "Mobile equipment and engines.",
      "Failure to hear alarms or communication.",
      "Incorrect hearing-protection selection.",
      "Improper fitting of protection.",
      "Uncontrolled exposure duration."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Reduce noise at source where practicable.",
      "Isolate or barrier noisy equipment.",
      "Increase distance from the source.",
      "Limit exposure duration.",
      "Select suitable SNR/NRR protection.",
      "Fit earplugs correctly.",
      "Use dual protection where required.",
      "Mark designated hearing-protection areas.",
      "Confirm alarms and communication remain audible.",
      "Replace damaged or unsuitable hearing protection."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, hearing protection will be required in high-noise areas today. We will not rely on PPE alone; we will also control the source, distance and exposure duration.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What are today's main noise sources?",
      "Where is hearing protection mandatory?",
      "Is the selected protection rating suitable?",
      "Can alarms still be heard?",
      "How will exposure duration be limited?",
      "What should be done if ringing in the ears occurs?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Noise source identified",
      "Area marked",
      "Protection suitable",
      "Earplugs fitted correctly",
      "Earmuffs intact",
      "Dual protection assessed",
      "Exposure duration controlled",
      "Alarms audible",
      "Communication suitable",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "respiratory-protection",
  "tr": {
    "title": "SOLUNUM KORUMA TOOLBOX TALK",
      "application_subtitle": "Kirletici türü, filtre seçimi ve fit test doğrulaması.",
      "subtitle": "Solunum tehlikelerini doğru respiratör, filtre ve fit ile kontrol edin.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Toz, duman, gaz, buhar ve diğer havadaki kirleticilerin solunmasından kaynaklanan sağlık risklerini azaltmak için doğru solunum korumasının seçilmesini ve kullanılmasını sağlamaktır.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Her respiratör her tehlikeye karşı koruma sağlamaz. Filtre seçimi kirleticinin türüne göre yapılmalıdır.",
      "Sakal, yanlış takma veya hasarlı yüz contası respiratörün koruyuculuğunu önemli ölçüde azaltabilir.",
      "Respiratör kullanımı mühendislik kontrollerinin yerine geçmez; havalandırma ve kaynak kontrolü önceliklidir."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan tozlu alanda yanlış tip partikül filtresi ve gevşek maskeyle çalıştı.",
      "Maskenin yüz contası sakal nedeniyle düzgün oturmadı ve çalışan yüksek maruziyet yaşadı.",
      "Tehlike değerlendirmesi, doğru filtre seçimi, fit test ve temiz tıraşlı yüz şartı maruziyeti önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Fit düzgün değilse respiratör doğru koruma sağlamaz.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yanlış respiratör seçimi.",
      "Yanlış filtre veya kartuş kullanımı.",
      "Fit test yapılmaması.",
      "Sakal veya yüz kılları.",
      "Hasarlı yüz contası.",
      "Doymuş veya süresi geçmiş filtre.",
      "Yetersiz havalandırma.",
      "Oksijen yetersiz ortamda uygunsuz respiratör kullanımı."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Kirleticinin türünü belirleyin.",
      "Uygun respiratör ve filtreyi seçin.",
      "Fit test geçerliliğini doğrulayın.",
      "Yüz contası bölgesinde sakal bulunmamasını sağlayın.",
      "Kullanım öncesi seal check yapın.",
      "Filtre değişim programına uyun.",
      "Respiratörü temiz ve uygun şekilde saklayın.",
      "Hasarlı ekipmanı kullanımdan çıkarın.",
      "Yeterli havalandırma sağlayın.",
      "Oksijen yetersiz ortamda uygun bağımsız hava sistemi olmadan çalışmayın."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün respiratör kullanacaksak önce tehlikeyi ve doğru filtreyi belirleyeceğiz. Fit test geçerli olacak, yüz contasında sakal olmayacak ve kullanım öncesi seal check yapılacak.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü solunum tehlikesi nedir?",
      "Hangi filtre veya kartuş gerekli?",
      "Fit test geçerli mi?",
      "Yüz contasında sakal var mı?",
      "Filtre ne zaman değiştirilecek?",
      "Havalandırma yeterli mi?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Kirletici belirlendi",
      "Respiratör uygun",
      "Filtre uygun",
      "Fit test geçerli",
      "Yüz contası temiz",
      "Seal check yapıldı",
      "Filtre süresi uygun",
      "Respiratör sağlam",
      "Havalandırma yeterli",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "RESPIRATORY PROTECTION TOOLBOX TALK",
      "application_subtitle": "Contaminant type, filter selection and fit-test verification.",
      "subtitle": "Control airborne hazards with the correct respirator, filter and fit.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Ensure correct respiratory protection is selected and used to reduce health risks from dusts, fumes, gases, vapours and other airborne contaminants.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "No respirator protects against every hazard. Filter selection must match the contaminant.",
      "Facial hair, poor fitting or damaged seals can significantly reduce protection.",
      "Respiratory protection does not replace engineering controls; ventilation and source control remain priorities."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker entered a dusty area using the wrong particulate filter and a poorly fitted mask.",
      "Facial hair interfered with the seal and the worker received significant exposure.",
      "Hazard identification, correct filter selection, fit testing and a clean-shaven seal area would have prevented the exposure."
],
    "remember_title": "REMEMBER",
    "remember": "If the fit is poor, the respirator cannot provide the intended protection.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Incorrect respirator selection.",
      "Incorrect filter or cartridge.",
      "No valid fit test.",
      "Facial hair at the seal.",
      "Damaged face seal.",
      "Saturated or expired filters.",
      "Inadequate ventilation.",
      "Use in oxygen-deficient atmospheres."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify the airborne contaminant.",
      "Select the correct respirator and filter.",
      "Confirm fit-test validity.",
      "Keep the seal area free from facial hair.",
      "Perform a user seal check before use.",
      "Follow the filter change schedule.",
      "Clean and store respirators correctly.",
      "Remove damaged equipment from service.",
      "Provide adequate ventilation.",
      "Do not enter oxygen-deficient atmospheres without suitable supplied-air protection."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, if respiratory protection is required today, we will first identify the hazard and correct filter. Fit testing must be valid, the seal area must be clean-shaven and a user seal check will be completed before use.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What is today's respiratory hazard?",
      "Which filter or cartridge is required?",
      "Is the fit test valid?",
      "Is facial hair affecting the seal?",
      "When will the filter be changed?",
      "Is ventilation adequate?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Contaminant identified",
      "Respirator suitable",
      "Filter suitable",
      "Fit test valid",
      "Seal area clear",
      "Seal check completed",
      "Filter life suitable",
      "Respirator intact",
      "Ventilation adequate",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "eye-face-protection",
  "tr": {
    "title": "GÖZ VE YÜZ KORUMA TOOLBOX TALK",
      "application_subtitle": "Tehlike değerlendirmesi, doğru KKD seçimi ve günlük iş öncesi saha doğrulaması.",
      "subtitle": "Fırlayan parçacık, kimyasal sıçrama, kıvılcım, toz ve optik radyasyon risklerine karşı doğru göz ve yüz korumasını kullanın.",
    "duration": "8–10 DAKİKA",
    "objective_title": "AMAÇ",
    "objective": "Taşlama, kesme, kaynak, kimyasal çalışma, basınçlı sistem müdahalesi ve tozlu işlerde göz ve yüz yaralanmasına neden olabilecek parçacık, sıçrama, kıvılcım, radyasyon ve basınçlı akışkan tehlikelerini değerlendirmek; işe başlamadan önce yapılacak işe uygun gözlük, kapalı tip gözlük, yüz siperi veya kaynak başlığının seçildiğini ve çevredeki çalışanların da korunduğunu doğrulamaktır.",
    "explanation_title": "KONU ANLATIMI",
    "explanation": [
      "Göz yaralanmaları çoğu zaman saniyeler içinde meydana gelir ve küçük bir metal çapak, taşlama parçacığı veya kimyasal damla dahi kalıcı görme kaybına neden olabilir. Bu nedenle göz koruması yalnızca genel saha KKD'si olarak değil, yapılan işin gerçek tehlikesine göre seçilmelidir.",
      "Standart yan korumalı iş gözlüğü birçok genel mekanik tehlike için uygundur; ancak taşlama, kesme ve benzeri yüksek enerjili parçacık işlerinde gözlükle birlikte yüz siperi gerekebilir. Kimyasal sıçrama riski bulunan işlerde ise açık tip gözlük yerine yüze oturan chemical splash goggles kullanılmalıdır.",
      "Kaynak ve sıcak işlerde ultraviyole ve kızılötesi radyasyon ciddi göz hasarına neden olabilir. Kullanılan lens shade seviyesi yapılan kaynak yöntemine uygun olmalı; kaynak arkına maruz kalabilecek yakındaki çalışanlar da kaynak perdesi veya uygun göz korumasıyla korunmalıdır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan metal yüzeyde taşlama yaparken yalnızca standart yan korumalı iş gözlüğü kullandı. Yüz siperi takılmamıştı ve çalışma alanı çevredeki diğer çalışanlardan yeterince ayrılmamıştı.",
      "Diskten kopan küçük ve keskin bir metal parçacığı yüksek hızla fırlayarak gözlüğün alt kenarından geçti ve çalışanın göz çevresine çarptı. Olay sırasında yakındaki başka bir çalışan da kıvılcım ve parçacıklara maruz kaldı.",
      "Olay; işe özel risk değerlendirmesi, gözlük ve yüz siperi kombinasyonu, ekipmanın doğru konumlandırılması, çalışma alanının bariyerlenmesi ve yakındaki personelin korunmasıyla önlenebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Yüz siperi çoğu durumda tek başına göz koruması değildir. Taşlama, kesme ve parçacık riski bulunan işlerde uygun güvenlik gözlüğüyle birlikte kullanılmalıdır. Kullanılan koruyucu ekipman tehlikeye uygun değilse işe başlamayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Taşlama, kesme, delme veya çekiçleme sırasında yüksek hızla fırlayan metal, taş veya diğer sert parçacıkların göze çarpması.",
      "Asit, alkali, solvent, temizlik ürünü veya proses kimyasalının sıçraması sonucu göz ve yüzde kimyasal yanık oluşması.",
      "Basınçlı hortum, bağlantı, fitting veya proses hattının açılması sırasında sıvı ya da parçacığın yüksek basınçla yüze püskürmesi.",
      "Kaynak arkından yayılan ultraviyole ve kızılötesi radyasyon nedeniyle gözde ark yanığı ve uzun süreli hasar oluşması.",
      "Taşlama ve sıcak iş kıvılcımlarının göz, yüz veya cilde temas etmesi.",
      "Toz, çapak ve ince partiküllerin göz içine girerek tahriş, çizilme veya enfeksiyona neden olması.",
      "Çizilmiş, kirli, buğulanmış veya hasarlı göz korumasının görüşü azaltarak ikinci bir kazaya neden olması.",
      "Yanlış lens tipi, yanlış shade değeri veya tehlikeye uygun olmayan gözlüğün yeterli koruma sağlamaması."
],
    "controls_title": "KONTROL ÖNLEMLERİ",
    "controls": [
      "İşe başlamadan önce mekanik parçacık, kimyasal sıçrama, toz, radyasyon ve basınçlı akışkan tehlikelerini ayrı ayrı değerlendirin.",
      "Genel mekanik işler için uygun darbe dayanımlı ve yan korumalı güvenlik gözlüğü kullanın.",
      "Taşlama, kesme ve yüksek enerjili parçacık işlerinde güvenlik gözlüğüne ek olarak uygun yüz siperi kullanın.",
      "Kimyasal sıçrama riski bulunan işlerde yüze tam oturan chemical splash goggles ve gerekiyorsa kimyasala dayanıklı yüz siperi kullanın.",
      "Kaynak işlerinde yapılan kaynak türüne uygun lens shade seviyesine sahip kaynak başlığı veya uygun kaynak gözlüğü kullanın.",
      "Yakındaki çalışanları kaynak perdesi, bariyer veya uygun mesafe ile ark radyasyonu ve parçacıklardan koruyun.",
      "Gözlük, lens ve yüz siperini her kullanımdan önce çatlak, çizik, gevşek parça, kir ve görüş bozukluğu açısından kontrol edin.",
      "Hasarlı veya görüşü azaltan göz ve yüz korumasını kullanmayın; uygun yenisiyle değiştirin.",
      "Kimyasal çalışma alanlarında göz duşu ve gerekiyorsa acil duşun engelsiz, erişilebilir ve çalışır durumda olduğunu doğrulayın.",
      "İş alanını bariyerleyin ve kıvılcım, parçacık veya sıçrama hattında bulunan diğer çalışanların uygun koruma kullanmasını sağlayın."
],
    "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
    "supervisor_script": "Arkadaşlar, bugün göz ve yüz korumasını yalnızca 'gözlük takılı mı?' diye kontrol etmeyeceğiz. Önce işin hangi tehlikeyi oluşturduğunu belirleyeceğiz. Taşlama ve kesmede standart gözlüğe ek olarak yüz siperi kullanılacak. Kimyasal sıçrama riski varsa kapalı tip chemical goggles seçilecek. Kaynakta doğru shade seviyesi doğrulanacak ve çevredeki çalışanlar kaynak perdesiyle korunacak. Çizik, kırık veya görüşü azaltan ekipman kullanılmayacak. Kimyasal işlerde göz duşunun yolu açık tutulacak. Korumanın işe uygun olduğundan emin değilsek işi başlatmayacağız.",
    "questions_title": "EKİBE SORULACAK SORULAR",
    "questions": [
      "Bugünkü iş sırasında göze veya yüze ulaşabilecek temel tehlike nedir: parçacık, sıçrama, toz, radyasyon veya basınçlı akışkan?",
      "Standart yan korumalı gözlük bu iş için yeterli mi, yoksa yüz siperi veya kapalı tip gözlük de gerekiyor mu?",
      "Taşlama veya kesme yapılıyorsa diskten çıkabilecek parçacık ve kıvılcımların yönü neresi?",
      "Kaynak yapılıyorsa kullanılan lens shade değeri yapılan kaynak yöntemine uygun mu?",
      "Kimyasal sıçrama ihtimali varsa göz duşu ve acil duş nerede ve erişim yolu açık mı?",
      "Çalışma alanındaki diğer personel parçacık, kıvılcım, sıçrama veya kaynak arkından nasıl korunacak?"
],
    "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
    "verification": [
      "Göz ve yüz tehlikesi belirlendi",
      "Güvenlik gözlüğü işe uygun",
      "Yüz siperi gerekliliği değerlendirildi",
      "Chemical goggles gerekliliği değerlendirildi",
      "Lens ve ekipman hasarsız",
      "Kaynak shade seviyesi uygun",
      "Göz duşu erişilebilir",
      "Çalışma alanı bariyerli",
      "Yakındaki çalışanlar korunuyor",
      "Ekip kullanılacak KKD konusunda bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Konuşmayı yapan",
      "Çalışma alanı"
],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
],
    "notes_title": "Süpervizör notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource — İşe özel risk değerlendirmesi, kimyasal SDS bilgileri, sıcak iş gereklilikleri ve saha KKD kuralları önceliklidir."
  },
  "en": {
    "title": "EYE AND FACE PROTECTION TOOLBOX TALK",
      "application_subtitle": "Hazard assessment, correct PPE selection and daily pre-work field verification.",
      "subtitle": "Use the correct eye and face protection against flying particles, chemical splash, sparks, dust and optical radiation.",
    "duration": "8–10 MINUTES",
    "objective_title": "OBJECTIVE",
    "objective": "Review flying-particle, chemical-splash, spark, radiation and pressurised-fluid hazards that can cause eye and facial injuries during grinding, cutting, welding, chemical handling, pressurised-system intervention and dusty work, and verify that suitable safety glasses, goggles, face shields or welding protection have been selected before the task begins.",
    "explanation_title": "TOPIC EXPLANATION",
    "explanation": [
      "Eye injuries can occur in seconds, and even a small metal burr, grinding fragment or chemical droplet can cause permanent vision damage. Eye protection must therefore be selected for the actual task hazard rather than treated as generic site PPE.",
      "Standard safety glasses with side protection are suitable for many general mechanical hazards, but grinding, cutting and other high-energy particle work may require a face shield in addition to safety glasses. Chemical splash hazards require properly fitting chemical splash goggles rather than open spectacles.",
      "Welding and hot work can expose workers to ultraviolet and infrared radiation capable of causing serious eye injury. The lens shade must suit the welding process, and nearby workers exposed to the arc must also be protected by welding screens or suitable eye protection."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker was grinding a metal surface while wearing only standard side-shield safety glasses. No face shield was being used and the work area had not been effectively separated from nearby personnel.",
      "A small sharp metal fragment was ejected at high speed, passed beneath the lower edge of the glasses and struck the worker around the eye. Another worker nearby was also exposed to sparks and flying material.",
      "The incident could have been prevented through task-specific risk assessment, combined use of safety glasses and a face shield, correct tool positioning, effective barricading and protection of nearby personnel."
],
    "remember_title": "REMEMBER",
    "remember": "A face shield is usually not a substitute for primary eye protection. During grinding, cutting and other flying-particle work, use it together with suitable safety glasses. Do not start if the protection is not appropriate for the hazard.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "High-velocity metal, stone or other hard particles striking the eyes during grinding, cutting, drilling or hammering.",
      "Chemical burns to the eyes or face caused by splashes of acids, alkalis, solvents, cleaning products or process chemicals.",
      "High-pressure release of liquid or debris from hoses, fittings or process connections during intervention.",
      "Ultraviolet and infrared radiation from welding arcs causing arc eye and longer-term eye damage.",
      "Grinding and hot-work sparks contacting the eyes, face or exposed skin.",
      "Dust, burrs and fine particulates entering the eye and causing irritation, abrasion or infection.",
      "Dirty, scratched, fogged or damaged eyewear reducing visibility and contributing to a secondary incident.",
      "Incorrect lens type, shade level or unsuitable protective equipment failing to provide adequate protection."
],
    "controls_title": "CONTROL MEASURES",
    "controls": [
      "Assess mechanical-particle, chemical-splash, dust, radiation and pressurised-fluid hazards separately before starting.",
      "Use suitable impact-rated safety glasses with side protection for general mechanical work.",
      "Use a suitable face shield in addition to safety glasses for grinding, cutting and other high-energy particle work.",
      "Use properly fitting chemical splash goggles and, where required, a chemical-resistant face shield for splash hazards.",
      "Use welding protection with the correct lens shade for the specific welding process.",
      "Protect nearby workers from welding radiation and flying material using welding screens, barriers or suitable separation.",
      "Inspect glasses, lenses and face shields before use for cracks, scratches, loose components, contamination and restricted visibility.",
      "Remove damaged or vision-restricting eye and face protection from service and replace it.",
      "Ensure eyewash and, where required, emergency showers are unobstructed, accessible and operational during chemical work.",
      "Barricade the work area and ensure everyone exposed to particles, sparks, splash or radiation uses appropriate protection."
],
    "supervisor_title": "SUPERVISOR TALKING SCRIPT",
    "supervisor_script": "Team, today we are not simply checking whether everyone is wearing glasses. We will first identify the actual eye and face hazard. Grinding and cutting will require a face shield in addition to suitable safety glasses. Chemical splash work will require correctly fitting splash goggles. Welding protection must have the correct shade, and nearby personnel will be protected by welding screens. Scratched, broken or vision-restricting equipment will not be used. Eyewash access will remain clear during chemical work. If we are not certain the protection matches the hazard, the task will not start.",
    "questions_title": "DISCUSSION QUESTIONS",
    "questions": [
      "What can reach the eyes or face during today's task: particles, splash, dust, radiation or pressurised fluid?",
      "Are standard side-shield safety glasses sufficient, or are goggles or a face shield also required?",
      "During grinding or cutting, where will sparks and high-speed particles travel?",
      "If welding is planned, is the selected lens shade suitable for the welding process?",
      "If chemical splash is possible, where are the eyewash and emergency shower and is access clear?",
      "How will nearby personnel be protected from flying particles, sparks, chemical splash or welding radiation?"
],
    "verification_title": "VERIFY BEFORE STARTING TODAY",
    "verification": [
      "Eye and face hazards identified",
      "Safety glasses suitable for the task",
      "Face-shield requirement assessed",
      "Chemical-goggle requirement assessed",
      "Lenses and equipment undamaged",
      "Welding shade suitable",
      "Eyewash accessible",
      "Work area barricaded",
      "Nearby workers protected",
      "Crew briefed on required PPE"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource — Task risk assessments, chemical SDS requirements, hot-work controls and site PPE rules take priority."
  }
},
{
  "slug": "hand-injury-prevention",
  "tr": {
    "title": "EL YARALANMALARINI ÖNLEME TOOLBOX TALK",
      "application_subtitle": "El konumu, uygun eldiven ve güvenli iş yöntemi doğrulaması.",
      "subtitle": "Elleri kesilme, ezilme, sıkışma ve sıcak yüzeylerden koruyun.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Keskin kenarlar, sıkışma noktaları, hareketli parçalar, sıcak yüzeyler ve uygunsuz el aleti kullanımından kaynaklanan el ve parmak yaralanmalarını önlemektir.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "El yaralanmalarının çoğu çalışanın elini tehlike bölgesine yerleştirmesiyle oluşur.",
      "Eldiven önemli bir kontroldür ancak sıkışma, dönen ekipman veya yüksek enerjili kesme riskini tek başına ortadan kaldırmaz.",
      "En güvenli yöntem elleri tehlikeden uzak tutan araç ve ekipman kullanmaktır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan metal parçayı elle tutarak kesmeye çalıştı.",
      "Parça aniden kaydı ve kesici alet çalışanın eline temas etti.",
      "İş parçasının mengeneyle sabitlenmesi ve ellerin kesme hattından uzak tutulması yaralanmayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Ellerinizi tehlikeye yaklaştırmak yerine işi sabitleyin ve uygun araç kullanın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Keskin metal kenarlar.",
      "Sıkışma noktaları.",
      "Dönen ekipman.",
      "Kesici el aletleri.",
      "Sıcak yüzeyler.",
      "Çapak ve tel parçaları.",
      "Uygunsuz eldiven seçimi.",
      "Elle tutulan sabitlenmemiş iş parçaları."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "İş parçasını sabitleyin.",
      "Eller yerine uygun araç kullanın.",
      "Keskin kenarları kontrol edin.",
      "Uygun kesilmeye dayanıklı eldiven seçin.",
      "Dönen ekipmanda gevşek eldiven kullanımını değerlendirin.",
      "Kesme hattından elleri uzak tutun.",
      "Sıcak yüzeylerde ısıya dayanıklı eldiven kullanın.",
      "Hasarlı el aletlerini kullanmayın.",
      "İyi aydınlatma sağlayın.",
      "İş yöntemi değişirse tekrar risk değerlendirmesi yapın."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün ellerimizi işin içine değil güvenli konuma koyacağız. İş parçası sabitlenecek, uygun alet kullanılacak ve kesme veya sıkışma hattına el sokulmayacak.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü el yaralanması riskleri nerede?",
      "İş parçası nasıl sabitlenecek?",
      "Hangi eldiven kullanılacak?",
      "Kesme hattı nerede?",
      "Dönen ekipmanda eldiven kullanımı uygun mu?",
      "İş yöntemi değişirse ne yapacağız?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "El tehlikeleri belirlendi",
      "İş parçası sabit",
      "Alet uygun",
      "Eldiven uygun",
      "Kesme hattı belli",
      "Sıkışma noktaları belli",
      "Sıcak yüzeyler kontrol edildi",
      "Aletler sağlam",
      "Aydınlatma yeterli",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "HAND INJURY PREVENTION TOOLBOX TALK",
      "application_subtitle": "Hand positioning, glove selection and safe-work verification.",
      "subtitle": "Protect hands from cuts, crushing, pinch points and hot surfaces.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent hand and finger injuries caused by sharp edges, pinch points, moving parts, hot surfaces and unsafe hand-tool use.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Many hand injuries occur when a worker places a hand directly into the hazard zone.",
      "Gloves are important but do not eliminate pinch, rotating-equipment or high-energy cutting hazards.",
      "The safest method is to use tools and equipment that keep hands away from the hazard."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker held a metal component by hand while attempting to cut it.",
      "The component shifted unexpectedly and the cutting tool contacted the worker's hand.",
      "Securing the workpiece in a vice and keeping hands outside the cutting line would have prevented the injury."
],
    "remember_title": "REMEMBER",
    "remember": "Secure the work and use the correct tool instead of moving your hands closer to the hazard.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Sharp metal edges.",
      "Pinch points.",
      "Rotating equipment.",
      "Cutting hand tools.",
      "Hot surfaces.",
      "Burrs and wire fragments.",
      "Incorrect glove selection.",
      "Unsecured hand-held workpieces."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Secure the workpiece.",
      "Use suitable tools instead of hands.",
      "Control sharp edges.",
      "Select suitable cut-resistant gloves.",
      "Assess glove use around rotating equipment.",
      "Keep hands outside the cutting line.",
      "Use heat-resistant gloves for hot surfaces.",
      "Do not use damaged hand tools.",
      "Provide adequate lighting.",
      "Reassess risk if the work method changes."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, today our hands will remain in safe positions. Workpieces will be secured, suitable tools used and no one will place hands in cutting or pinch zones.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Where are today's hand-injury hazards?",
      "How will the workpiece be secured?",
      "Which gloves are required?",
      "Where is the cutting line?",
      "Are gloves suitable around rotating equipment?",
      "What will we do if the work method changes?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Hand hazards identified",
      "Workpiece secured",
      "Tool suitable",
      "Gloves suitable",
      "Cutting line identified",
      "Pinch points identified",
      "Hot surfaces controlled",
      "Tools intact",
      "Lighting adequate",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "temporary-electrical-installations",
  "tr": {
    "title": "GEÇİCİ ELEKTRİK TESİSATI TOOLBOX TALK",
      "application_subtitle": "Panolar, RCD, kablo güzergâhı ve saha doğrulaması.",
      "subtitle": "Geçici elektrik sistemlerinde çarpılma, yangın ve kablo hasarı risklerini kontrol edin.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Şantiye tipi geçici elektrik dağıtımında kablo hasarı, uygunsuz pano, eksik topraklama, kaçak akım ve aşırı yüklenmeden kaynaklanan elektrik çarpması ve yangın risklerini önlemektir.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Geçici elektrik tesisatları sık taşındığı ve saha şartlarına maruz kaldığı için hasar riski yüksektir.",
      "Kablolar araç yolları, su, keskin kenar ve fiziksel darbelere karşı korunmalıdır.",
      "Panolar uygun IP korumasına, topraklamaya, RCD/GFCI sistemine ve yetkisiz erişime karşı korumaya sahip olmalıdır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Geçici uzatma kablosu araç geçiş yolundan korumasız şekilde geçirildi.",
      "Bir araç kablo üzerinden geçti ve izolasyonu hasarladı.",
      "Uygun kablo köprüsü, doğru güzergâh ve kullanım öncesi kontrol elektrik çarpması riskini önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Geçici olması, elektrik sisteminin daha düşük güvenlik standardıyla kurulabileceği anlamına gelmez.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Hasarlı uzatma kabloları.",
      "Islak ortamda elektrik kullanımı.",
      "Eksik RCD/GFCI koruması.",
      "Uygunsuz topraklama.",
      "Açık veya hasarlı panolar.",
      "Aşırı yüklenen priz ve uzatma kabloları.",
      "Araç geçişinde ezilen kablolar.",
      "Yetkisiz elektrik müdahalesi."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Kabloları kullanımdan önce kontrol edin.",
      "Hasarlı kabloyu derhal kullanımdan çıkarın.",
      "RCD/GFCI korumasını doğrulayın.",
      "Topraklama sistemini kontrol edin.",
      "Panoları kapalı ve kilitli tutun.",
      "Kabloları su ve keskin kenarlardan koruyun.",
      "Araç yollarında kablo köprüsü kullanın.",
      "Uzatma kablolarını aşırı yüklemeyin.",
      "Yalnız yetkili elektrik personelinin müdahale etmesini sağlayın.",
      "Geçici tesisatı düzenli olarak yeniden denetleyin."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, geçici elektrik sistemini kalıcı sistem kadar ciddi kontrol edeceğiz. Hasarlı kablo, açık pano veya uygunsuz bağlantı görürsek kullanmayacağız ve yetkili elektrikçiye bildireceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Kablolar kontrol edildi mi?",
      "RCD/GFCI mevcut ve çalışıyor mu?",
      "Topraklama uygun mu?",
      "Kablolar araçlardan korunuyor mu?",
      "Panolar kapalı mı?",
      "Elektrik müdahalesini kim yapacak?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Kablolar sağlam",
      "Fişler sağlam",
      "RCD/GFCI aktif",
      "Topraklama uygun",
      "Panolar kapalı",
      "Panolar kilitli",
      "Kablo güzergâhı güvenli",
      "Araç geçişi korumalı",
      "Aşırı yük yok",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "TEMPORARY ELECTRICAL INSTALLATIONS TOOLBOX TALK",
      "application_subtitle": "Panels, RCD protection, cable routing and field verification.",
      "subtitle": "Control shock, fire and cable-damage hazards in temporary electrical systems.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent electric shock and fire caused by damaged cables, unsuitable panels, poor earthing, residual-current faults and overloading in temporary site power systems.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Temporary electrical systems are frequently moved and exposed to harsh site conditions, increasing damage risk.",
      "Cables must be protected from vehicles, water, sharp edges and physical impact.",
      "Distribution panels require suitable enclosure protection, earthing, RCD/GFCI protection and controlled access."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A temporary extension cable was routed unprotected across a vehicle access road.",
      "A vehicle drove over the cable and damaged the insulation.",
      "Correct cable routing, a cable bridge and pre-use inspection would have prevented the electrical hazard."
],
    "remember_title": "REMEMBER",
    "remember": "Temporary does not mean that a lower electrical safety standard is acceptable.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Damaged extension cables.",
      "Electrical use in wet conditions.",
      "Missing RCD/GFCI protection.",
      "Poor earthing.",
      "Open or damaged panels.",
      "Overloaded sockets and leads.",
      "Cables crushed by vehicles.",
      "Unauthorised electrical intervention."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Inspect cables before use.",
      "Remove damaged cables from service.",
      "Verify RCD/GFCI protection.",
      "Confirm earthing arrangements.",
      "Keep panels closed and locked.",
      "Protect cables from water and sharp edges.",
      "Use cable bridges at vehicle crossings.",
      "Do not overload extension leads.",
      "Allow only authorised electricians to intervene.",
      "Reinspect temporary installations regularly."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, temporary electrical systems will be treated with the same seriousness as permanent systems. Damaged cables, open panels or unsafe connections will not be used and will be reported to authorised electrical personnel.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Have cables been inspected?",
      "Is RCD/GFCI protection installed and working?",
      "Is earthing suitable?",
      "Are cables protected from vehicles?",
      "Are panels closed?",
      "Who may carry out electrical intervention?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Cables intact",
      "Plugs intact",
      "RCD/GFCI active",
      "Earthing suitable",
      "Panels closed",
      "Panels locked",
      "Cable routing safe",
      "Vehicle crossings protected",
      "No overload present",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "battery-charging",
  "tr": {
    "title": "AKÜ ŞARJ GÜVENLİĞİ TOOLBOX TALK",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Akü şarj işlemlerinde hidrojen gazı, elektrik enerjisi, asit sıçraması, kısa devre ve yangın kaynaklı yaralanmaları önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Şarj sırasında bazı aküler yanıcı hidrojen gazı açığa çıkarabilir ve yetersiz havalandırmada patlayıcı atmosfer oluşabilir.",
      "Akü terminallerindeki kısa devre çok yüksek akım, ark, yanık ve yangına neden olabilir.",
      "Elektrolit içeren akülerde asit sıçraması ciddi göz ve cilt yaralanmalarına yol açabilir."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan kapalı bir alanda aküyü şarja bağladı ve alanın havalandırmasını kontrol etmedi.",
      "Yakındaki kıvılcım kaynağı şarj sırasında biriken gazı tutuşturabilecek durumdaydı.",
      "Uygun havalandırma, ateşleme kaynaklarının kaldırılması ve şarj öncesi saha kontrolü olayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Akü şarj alanında havalandırma ve ateşleme kaynaklarının kontrolü şarj başlamadan önce doğrulanmalıdır.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Hidrojen gazı birikmesi.",
      "Kıvılcım ve açık alev.",
      "Akü terminallerinde kısa devre.",
      "Elektrik çarpması veya ark.",
      "Asit ve elektrolit sıçraması.",
      "Yanlış kutup bağlantısı.",
      "Hasarlı şarj cihazı veya kablo.",
      "Akünün aşırı ısınması."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Şarj alanında yeterli havalandırma sağlayın.",
      "Açık alev, sigara ve kıvılcım kaynaklarını uzaklaştırın.",
      "Şarj cihazının akü tipine uygun olduğunu doğrulayın.",
      "Kablo, fiş ve bağlantıları kullanımdan önce kontrol edin.",
      "Doğru kutup bağlantısını doğrulayın.",
      "Metal takı ve iletken cisimleri terminallerden uzak tutun.",
      "Uygun göz ve el koruması kullanın.",
      "Göz duşu ve acil yıkama imkanını erişilebilir tutun.",
      "Şişmiş, çatlamış veya aşırı ısınan aküyü kullanmayın.",
      "Şarj alanını düzenli, kuru ve yetkisiz erişime karşı kontrollü tutun."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, akü şarjına başlamadan önce havalandırmayı, şarj cihazını ve bağlantıları kontrol edeceğiz. Kıvılcım ve açık alev olmayacak; hasarlı veya aşırı ısınan aküler kullanılmayacak.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Şarj alanının havalandırması yeterli mi?",
      "Yakında ateşleme kaynağı var mı?",
      "Şarj cihazı doğru akü için mi?",
      "Kutuplar doğru bağlandı mı?",
      "Göz duşu nerede?",
      "Akü aşırı ısınırsa ne yapacağız?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Havalandırma yeterli",
      "Ateşleme kaynakları kaldırıldı",
      "Şarj cihazı uygun",
      "Kablolar sağlam",
      "Kutuplar doğru",
      "Terminaller korunuyor",
      "KKD uygun",
      "Göz duşu erişilebilir",
      "Akü fiziksel olarak sağlam",
      "Ekip bilgilendirildi"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "BATTERY CHARGING SAFETY TOOLBOX TALK",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent injuries during battery charging caused by hydrogen gas, electrical energy, acid splash, short circuits and fire.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Some batteries can release flammable hydrogen during charging, creating an explosive atmosphere where ventilation is inadequate.",
      "A short circuit across battery terminals can produce extremely high current, arcing, burns and fire.",
      "Batteries containing electrolyte can cause serious eye and skin injuries if acid is released."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker connected a battery charger inside an enclosed area without checking ventilation.",
      "A nearby ignition source could have ignited gas accumulating during charging.",
      "Adequate ventilation, removal of ignition sources and a pre-charge area inspection would have prevented the situation."
],
    "remember_title": "REMEMBER",
    "remember": "Ventilation and ignition-source control must be confirmed before battery charging begins.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Hydrogen gas accumulation.",
      "Sparks and open flames.",
      "Short circuit across terminals.",
      "Electrical shock or arcing.",
      "Acid and electrolyte splash.",
      "Incorrect polarity.",
      "Damaged charger or cables.",
      "Battery overheating."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Provide adequate ventilation in the charging area.",
      "Remove flames, smoking and spark sources.",
      "Confirm the charger is suitable for the battery.",
      "Inspect cables, plugs and connections before use.",
      "Verify correct polarity before connection.",
      "Keep jewellery and conductive objects away from terminals.",
      "Use suitable eye and hand protection.",
      "Keep eyewash and emergency washing facilities accessible.",
      "Do not use swollen, cracked or overheating batteries.",
      "Keep the charging area clean, dry and access-controlled."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, before charging any battery we will check ventilation, the charger and all connections. There will be no ignition sources, and damaged or overheating batteries will not be used.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is ventilation adequate?",
      "Are any ignition sources nearby?",
      "Is the charger suitable for this battery?",
      "Is polarity correct?",
      "Where is the eyewash?",
      "What will we do if the battery overheats?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Ventilation adequate",
      "Ignition sources removed",
      "Charger suitable",
      "Cables intact",
      "Polarity correct",
      "Terminals protected",
      "PPE suitable",
      "Eyewash accessible",
      "Battery physically sound",
      "Crew briefed"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "gas-testing-atmospheric-monitoring",
  "tr": {
    "title": "GAZ ÖLÇÜMÜ VE ATMOSFER İZLEME TOOLBOX TALK",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Yanıcı, toksik veya oksijen açısından uygunsuz atmosferlerin işe başlamadan önce ve çalışma sırasında güvenilir şekilde tespit edilmesini sağlamak.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Atmosfer normal görünse veya kokusuz olsa bile oksijen yetersizliği, toksik gaz veya yanıcı buhar bulunabilir.",
      "Gaz ölçüm cihazının doğru sensörlere sahip olması, bump test ve kalibrasyon durumunun geçerli olması gerekir.",
      "Atmosfer değişebilecek işlerde yalnız başlangıç ölçümü yeterli değildir; sürekli veya periyodik izleme gerekebilir."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekip işe başlamadan önce gaz ölçümü yaptı ancak çalışma sırasında proses koşulları değişti.",
      "Yeni bir gaz salımı oluşmasına rağmen ölçüm tekrarlanmadı.",
      "Sürekli atmosfer izleme ve değişen koşullarda işi durdurma kuralı maruziyeti önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Koşullar değiştiğinde eski gaz ölçümü mevcut atmosferi temsil etmeyebilir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Oksijen yetersizliği.",
      "Oksijen zenginleşmesi.",
      "Yanıcı gaz veya buhar.",
      "Toksik gaz maruziyeti.",
      "Yanlış sensör kullanımı.",
      "Kalibrasyonu geçmiş cihaz.",
      "Yanlış ölçüm noktası.",
      "Atmosfer değişirken izleme yapılmaması."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Beklenen gaz tehlikelerini iş öncesinde belirleyin.",
      "Cihazın gerekli sensörlere sahip olduğunu doğrulayın.",
      "Kalibrasyon tarihini kontrol edin.",
      "Gerekli bump testi tamamlayın.",
      "Temiz havada cihazı doğru şekilde başlatın.",
      "Uygun nokta ve seviyelerden ölçüm yapın.",
      "Sonuçları izin veya kayıt sistemine işleyin.",
      "Atmosfer değişebiliyorsa sürekli izleme kullanın.",
      "Alarm limitlerini değiştirmeyin veya devre dışı bırakmayın.",
      "Alarm oluşursa işi durdurun, alanı terk edin ve yeniden değerlendirin."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, gaz dedektörü sadece taşınan bir cihaz değildir; doğru sensör, geçerli kalibrasyon ve doğru ölçüm noktası şarttır. Alarm alırsak işi durdurup güvenli alana çıkacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugün hangi gazları ölçüyoruz?",
      "Cihazın kalibrasyonu geçerli mi?",
      "Bump test yapıldı mı?",
      "Ölçüm hangi noktalardan yapılacak?",
      "Sürekli izleme gerekiyor mu?",
      "Dedektör alarm verirse ne yapacağız?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Gaz tehlikeleri belirlendi",
      "Sensörler uygun",
      "Kalibrasyon geçerli",
      "Bump test tamam",
      "Cihaz doğru başlatıldı",
      "Ölçüm noktaları uygun",
      "Sonuçlar kaydedildi",
      "Sürekli izleme değerlendirildi",
      "Alarm limitleri uygun",
      "Ekip alarm aksiyonunu biliyor"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "GAS TESTING AND ATMOSPHERIC MONITORING TOOLBOX TALK",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Ensure flammable, toxic or oxygen-deficient atmospheres are reliably detected before work and throughout the task where required.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "An atmosphere may appear normal and have no obvious smell while still containing oxygen deficiency, toxic gas or flammable vapour.",
      "The detector must contain the correct sensors and have valid bump-test and calibration status.",
      "Where atmospheric conditions can change, an initial test alone is not sufficient and continuous or periodic monitoring may be required."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A crew tested the atmosphere before starting work, but process conditions changed during the task.",
      "A new gas release developed and the atmosphere was not tested again.",
      "Continuous monitoring and a stop-work requirement for changing conditions would have prevented exposure."
],
    "remember_title": "REMEMBER",
    "remember": "When conditions change, an earlier gas reading may no longer represent the current atmosphere.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Oxygen deficiency.",
      "Oxygen enrichment.",
      "Flammable gas or vapour.",
      "Toxic gas exposure.",
      "Incorrect sensor selection.",
      "Detector outside calibration.",
      "Incorrect sampling location.",
      "No monitoring while conditions change."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify expected atmospheric hazards before work.",
      "Confirm the detector has the required sensors.",
      "Check calibration status.",
      "Complete the required bump test.",
      "Start the detector correctly in clean air.",
      "Test at appropriate locations and elevations.",
      "Record readings in the permit or required record.",
      "Use continuous monitoring where conditions may change.",
      "Do not alter or disable alarm limits.",
      "Stop work, leave the area and reassess if an alarm occurs."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, carrying a gas detector is not enough. We need the correct sensors, valid calibration and correct sampling locations. If the detector alarms, work stops and we move to a safe area.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Which gases are we testing today?",
      "Is calibration valid?",
      "Has the bump test been completed?",
      "Where will samples be taken?",
      "Is continuous monitoring required?",
      "What will we do if the detector alarms?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Gas hazards identified",
      "Sensors suitable",
      "Calibration valid",
      "Bump test complete",
      "Detector started correctly",
      "Sampling points suitable",
      "Readings recorded",
      "Continuous monitoring assessed",
      "Alarm limits suitable",
      "Crew understands alarm response"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "permit-to-work",
  "tr": {
    "title": "ÇALIŞMA İZNİ / PERMIT TO WORK TOOLBOX TALK",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Yüksek riskli işlerin kapsam, tehlike, izolasyon, eşzamanlı işler ve gerekli kontroller doğrulanmadan başlamasını önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Çalışma izni yalnızca bir imza belgesi değildir; işi sahadaki gerçek koşullarla ilişkilendiren kritik bir kontrol sistemidir.",
      "İzin üzerindeki kapsam, ekipman, lokasyon ve kontroller gerçek yapılan işle uyuşmalıdır.",
      "Koşullar veya iş kapsamı değişirse mevcut izin geçerliliğini kaybedebilir ve iş yeniden değerlendirilmelidir."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekip geçerli izin aldıktan sonra çalışma kapsamını sahada değiştirdi.",
      "Yeni iş, izin üzerinde değerlendirilmemiş farklı bir enerji ve ekipman tehlikesi oluşturdu.",
      "İşin durdurulması ve izin kapsamının yeniden değerlendirilmesi kontrolsüz çalışmayı önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "İzin işe uymuyorsa işi izne uydurmayın; işi durdurup izni yeniden değerlendirin.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yanlış iş kapsamı.",
      "Yanlış ekipman veya lokasyon.",
      "Eksik izolasyon.",
      "Eksik gaz ölçümü.",
      "Çakışan eşzamanlı işler.",
      "Süresi geçmiş izin.",
      "Koşullar değişmesine rağmen işe devam edilmesi.",
      "İzin kontrollerinin sahada uygulanmaması."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "İş kapsamını izinle karşılaştırın.",
      "Ekipman ve lokasyonu sahada doğrulayın.",
      "Gerekli izolasyonları doğrulayın.",
      "Gerekliyse gaz ölçümünü kontrol edin.",
      "Eşzamanlı işleri değerlendirin.",
      "İzin geçerlilik süresini doğrulayın.",
      "Gerekli sertifika ve ekleri kontrol edin.",
      "Ekip ile izin şartlarını toolbox sırasında paylaşın.",
      "Koşullar değişirse işi durdurun.",
      "İş bitiminde alanı kontrol edip izni doğru şekilde kapatın."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, izin sadece imza için değil. İşin kapsamını, izolasyonları, gaz ölçümünü ve sahadaki koşulları birlikte doğrulayacağız. Kapsam değişirse çalışma duracak.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "İzin bugünkü gerçek işi kapsıyor mu?",
      "Doğru ekipman ve lokasyon yazıyor mu?",
      "İzolasyonlar doğrulandı mı?",
      "Gaz testi gerekiyor mu?",
      "Yakında çakışan başka işler var mı?",
      "Koşullar değişirse ne yapacağız?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "İş kapsamı doğru",
      "Lokasyon doğru",
      "Ekipman doğru",
      "İzolasyonlar doğrulandı",
      "Gaz testi uygun",
      "SIMOPS değerlendirildi",
      "İzin süresi geçerli",
      "Ek sertifikalar mevcut",
      "Ekip izin şartlarını biliyor",
      "Kapatma yöntemi belli"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "PERMIT TO WORK TOOLBOX TALK",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent high-risk work from starting until scope, hazards, isolations, simultaneous operations and required controls have been verified.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "A permit to work is not simply a signature document; it is a critical control system linking the task to actual field conditions.",
      "The scope, equipment, location and controls stated on the permit must match the work being performed.",
      "If conditions or work scope change, the existing permit may no longer be valid and the task must be reassessed."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A crew obtained a valid permit and later changed the work scope in the field.",
      "The new task introduced an energy and equipment hazard that had not been assessed on the permit.",
      "Stopping work and reassessing the permit scope would have prevented uncontrolled work."
],
    "remember_title": "REMEMBER",
    "remember": "If the permit no longer matches the job, do not make the job fit the permit; stop and reassess.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Incorrect work scope.",
      "Incorrect equipment or location.",
      "Incomplete isolation.",
      "Missing gas testing.",
      "Conflicting simultaneous operations.",
      "Expired permit.",
      "Continuing after conditions change.",
      "Permit controls not implemented in the field."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Compare the actual task with the permit scope.",
      "Verify equipment and location in the field.",
      "Confirm required isolations.",
      "Check gas testing where required.",
      "Assess simultaneous operations.",
      "Verify permit validity period.",
      "Check required certificates and attachments.",
      "Brief the crew on permit conditions.",
      "Stop work if conditions change.",
      "Inspect the area and close the permit correctly after completion."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, the permit is not just a signature. We will verify the scope, isolations, gas testing and actual field conditions together. If the scope changes, work stops.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Does the permit cover today's actual work?",
      "Are the equipment and location correct?",
      "Have isolations been verified?",
      "Is gas testing required?",
      "Are conflicting activities nearby?",
      "What happens if conditions change?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Scope correct",
      "Location correct",
      "Equipment correct",
      "Isolations verified",
      "Gas testing suitable",
      "SIMOPS assessed",
      "Permit valid",
      "Certificates available",
      "Crew understands conditions",
      "Close-out method clear"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "simultaneous-operations",
  "tr": {
    "title": "EŞ ZAMANLI OPERASYONLAR / SIMOPS TOOLBOX TALK",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Aynı alanda yürütülen farklı işlerin birbirine yeni tehlike oluşturmasını önlemek ve işler arası koordinasyonu sağlamak.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Tek başına güvenli olan iki iş aynı anda ve aynı bölgede yapıldığında kabul edilemez birleşik risk oluşturabilir.",
      "Sıcak iş, kaldırma, gaz testi, kapalı alan, araç hareketi ve proses işleri birbirini doğrudan etkileyebilir.",
      "SIMOPS kontrolünün temeli ortak saha değerlendirmesi, sorumlulukların belirlenmesi ve etkili iletişimdir."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekip alt seviyede bakım yaparken üst seviyede kaldırma operasyonu başlatıldı.",
      "Askıdaki yükün güzergâhı alt ekip tarafından bilinmiyordu ve çalışma alanları çakıştı.",
      "Ortak SIMOPS değerlendirmesi, bariyerleme ve işlerin zaman açısından ayrılması tehlikeyi önleyebilirdi."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Her iş ayrı ayrı güvenli olabilir; asıl risk işlerin birbirini nasıl etkilediğidir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Çakışan çalışma alanları.",
      "Askıdaki yük altında başka iş.",
      "Sıcak iş yakınında yanıcı faaliyet.",
      "Gaz veya kimyasal salımının diğer ekibi etkilemesi.",
      "Araç ve yaya faaliyetlerinin çakışması.",
      "Ortak izolasyonların etkilenmesi.",
      "Bir işin diğer işin acil kaçışını engellemesi.",
      "Ekipler arasında yetersiz iletişim."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Aynı alandaki tüm aktif işleri belirleyin.",
      "İşler arasındaki etkileşimi değerlendirin.",
      "Ortak SIMOPS koordinatörü veya sorumlusu belirleyin.",
      "Çakışan işleri zaman veya alan açısından ayırın.",
      "Gerekli bariyer ve exclusion zone oluşturun.",
      "Ortak izolasyonları doğrulayın.",
      "Acil durum ve kaçış yollarını açık tutun.",
      "İzin sahipleri arasında doğrudan iletişim sağlayın.",
      "Yeni iş başladığında SIMOPS değerlendirmesini güncelleyin.",
      "Kontrol sağlanamıyorsa işlerden birini durdurun."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün yalnız kendi işimize bakmayacağız. Çevremizdeki kaldırma, sıcak iş, araç hareketi ve diğer faaliyetlerin bizim işimizi nasıl etkilediğini birlikte kontrol edeceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Yakınımızda hangi işler yapılıyor?",
      "Bu işler bizim alanımızı nasıl etkiliyor?",
      "Exclusion zone gerekiyor mu?",
      "Ortak izolasyon var mı?",
      "Acil kaçış yolu açık mı?",
      "Yeni bir iş başlarsa kim bilgilendirilecek?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Aktif işler belirlendi",
      "Etkileşimler değerlendirildi",
      "SIMOPS sorumlusu belli",
      "Alanlar ayrıldı",
      "Bariyerler uygun",
      "İzolasyonlar doğrulandı",
      "Kaçış yolları açık",
      "İzin sahipleri koordineli",
      "İletişim yöntemi belli",
      "Stop-work kriteri belli"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "SIMULTANEOUS OPERATIONS SIMOPS TOOLBOX TALK",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent different activities in the same area from creating additional hazards for one another and ensure effective coordination.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Two activities that are safe individually can create an unacceptable combined risk when performed simultaneously in the same area.",
      "Hot work, lifting, gas testing, confined-space work, vehicle movement and process activities can directly affect each other.",
      "Effective SIMOPS control depends on joint field assessment, clear responsibilities and communication."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A maintenance crew was working at a lower level while a lifting operation began above them.",
      "The suspended-load route was not known to the lower crew and the work zones overlapped.",
      "A joint SIMOPS assessment, exclusion zone and separation of the activities would have prevented the exposure."
],
    "remember_title": "REMEMBER",
    "remember": "Each task may be safe on its own; the key risk is how the activities interact.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Overlapping work areas.",
      "Work below suspended loads.",
      "Hot work near flammable activities.",
      "Gas or chemical releases affecting another crew.",
      "Vehicle and pedestrian conflicts.",
      "Shared isolations being affected.",
      "One activity blocking another crew's escape route.",
      "Poor communication between crews."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify all active work in the area.",
      "Assess interactions between activities.",
      "Assign a SIMOPS coordinator or responsible person.",
      "Separate conflicting work by time or location.",
      "Establish required barriers and exclusion zones.",
      "Verify shared isolations.",
      "Keep emergency and escape routes clear.",
      "Maintain direct communication between permit holders.",
      "Update the SIMOPS assessment when new work begins.",
      "Stop one activity where interaction cannot be controlled."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, today we will not look only at our own task. We will check how nearby lifting, hot work, vehicle movements and other activities can affect us.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What other work is taking place nearby?",
      "How can those activities affect us?",
      "Is an exclusion zone required?",
      "Are any isolations shared?",
      "Is the emergency escape route clear?",
      "Who must be informed if new work begins?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Active work identified",
      "Interactions assessed",
      "SIMOPS owner identified",
      "Work zones separated",
      "Barriers suitable",
      "Isolations verified",
      "Escape routes clear",
      "Permit holders coordinated",
      "Communication method clear",
      "Stop-work criteria clear"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "stop-work-authority",
  "tr": {
    "title": "İŞİ DURDURMA YETKİSİ TOOLBOX TALK",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Her çalışanın ciddi veya kontrolsüz bir tehlike gördüğünde işi gecikmeden durdurabilmesini ve güvenli şekilde yeniden başlatılmasını sağlamak.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Stop Work Authority yalnız HSE personeline veya yöneticilere ait değildir; tehlikeyi gören herkes tarafından kullanılmalıdır.",
      "İşi durdurmak suçlama veya ceza mekanizması değil, kontrol kaybını kazaya dönüşmeden yakalama yöntemidir.",
      "İş ancak tehlike değerlendirildikten, kontroller uygulandıktan ve ilgili kişiler yeniden bilgilendirildikten sonra başlamalıdır."
],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan kaldırma operasyonunda kişinin askıdaki yük güzergâhına girdiğini fark etti.",
      "Operasyon devam ettiği için çalışan işi durdurdu ve yük güvenli konuma alındı.",
      "Alan yeniden bariyerlendikten ve ekip bilgilendirildikten sonra çalışma güvenli şekilde yeniden başladı."
],
    "remember_title": "UNUTMAYIN",
    "remember": "Bir şeyin ciddi şekilde yanlış olduğunu düşünüyorsanız işi durdurmak için kazanın gerçekleşmesini beklemeyin.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Kontrolsüz enerji.",
      "İnsanların tehlike bölgesine girmesi.",
      "İş koşullarının değişmesi.",
      "İzin veya prosedürden sapma.",
      "Hasarlı güvenlik ekipmanı.",
      "Yetersiz bariyerleme.",
      "Anlaşılmayan talimat veya iletişim.",
      "Üretim baskısı nedeniyle riskli işe devam edilmesi."
],
    "controls_title": "KONTROLLER",
    "controls": [
      "Her çalışanın işi durdurma yetkisini açıkça destekleyin.",
      "Stop Work çağrısında işi güvenli şekilde durdurun.",
      "Enerjiyi veya ekipmanı güvenli duruma getirin.",
      "Tehlike alanını kontrol altına alın.",
      "İlgili supervisor ve ekipleri bilgilendirin.",
      "Tehlikeyi yeniden değerlendirin.",
      "Gerekli kontrolleri uygulayın.",
      "İzin veya risk değerlendirmesini gerekiyorsa güncelleyin.",
      "Ekip ile yeniden toolbox/briefing yapın.",
      "Yalnız güvenli koşullar doğrulandıktan sonra işe yeniden başlayın."
],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, burada herkesin işi durdurma yetkisi var. Ciddi veya kontrolsüz bir tehlike görürseniz durdurun. Kimse güvenlik nedeniyle Stop Work kullandığı için suçlanmayacak.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Kim Stop Work kullanabilir?",
      "Hangi durumda işi durdurmalıyız?",
      "İşi durdurduktan sonra ilk adım nedir?",
      "Supervisor nasıl bilgilendirilecek?",
      "İşe yeniden başlamaya kim karar verecek?",
      "Üretim baskısı güvenlik kontrolünü geçersiz kılabilir mi?"
],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "SWA yetkisi açıklandı",
      "Ekip yetkisini anlıyor",
      "Stop yöntemi belli",
      "Enerji güvenli hale getirilebilir",
      "Supervisor iletişimi belli",
      "Yeniden değerlendirme yöntemi belli",
      "Kontrol uygulama süreci belli",
      "İzin güncellemesi değerlendirilecek",
      "Restart onayı belli",
      "Misilleme olmayacağı açıklandı"
],
    "attendance_title": "KATILIM VE ONAY",
    "fields": [
      "Proje / Saha",
      "Tarih",
      "Anlatan",
      "Çalışma alanı"
    ],
    "table_headers": [
      "No",
      "Ad Soyad",
      "Firma / Görev",
      "İmza"
    ],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "STOP WORK AUTHORITY TOOLBOX TALK",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Ensure every worker can immediately stop work when a serious or uncontrolled hazard is identified and that work restarts safely.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Stop Work Authority is not limited to HSE personnel or managers; anyone who identifies the hazard should be able to use it.",
      "Stopping work is not a blame or punishment mechanism. It is a way to prevent loss of control from becoming an incident.",
      "Work should restart only after the hazard is reassessed, controls are implemented and affected personnel are briefed."
],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker noticed a person entering the suspended-load route during a lifting operation.",
      "The worker stopped the operation and the load was placed in a safe position.",
      "After the area was re-barricaded and the crew briefed, the operation restarted safely."
],
    "remember_title": "REMEMBER",
    "remember": "If you believe something is seriously wrong, do not wait for an incident before stopping the work.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Uncontrolled energy.",
      "People entering danger zones.",
      "Changing work conditions.",
      "Deviation from permits or procedures.",
      "Damaged safety equipment.",
      "Inadequate barricading.",
      "Unclear instructions or communication.",
      "Continuing unsafe work because of production pressure."
],
    "controls_title": "CONTROLS",
    "controls": [
      "Clearly support every worker's authority to stop work.",
      "Stop the task safely when Stop Work is called.",
      "Place energy or equipment in a safe condition.",
      "Control the hazard area.",
      "Inform the relevant supervisor and crews.",
      "Reassess the hazard.",
      "Implement required controls.",
      "Update permits or risk assessments where necessary.",
      "Rebrief the crew before restart.",
      "Restart only after safe conditions are verified."
],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, everyone here has the authority to stop work. If you see a serious or uncontrolled hazard, stop the task. No one will be blamed for using Stop Work for a genuine safety concern.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Who can use Stop Work Authority?",
      "When should work be stopped?",
      "What is the first action after stopping?",
      "How will the supervisor be informed?",
      "Who authorises restart?",
      "Can production pressure override a safety control?"
],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "SWA authority explained",
      "Crew understands authority",
      "Stop method clear",
      "Energy can be made safe",
      "Supervisor communication clear",
      "Reassessment method clear",
      "Control process clear",
      "Permit update considered",
      "Restart approval clear",
      "No-retaliation expectation explained"
],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": [
      "Project / Site",
      "Date",
      "Presented by",
      "Work area"
    ],
    "table_headers": [
      "No",
      "Full Name",
      "Company / Role",
      "Signature"
    ],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
}
,
{
  "slug": "barricading-exclusion-zones",
  "tr": {
    "title": "BARİYERLEME VE YASAKLI ALANLAR TOOLBOX TALK",
    "application_subtitle": "Tehlikeli alanların doğru sınırlandırılması ve yetkisiz girişlerin önlenmesi.",
    "subtitle": "Bariyer yalnız görünür olmak için değil, insanları gerçek tehlikeden uzak tutmak için kurulur.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Düşen cisim, kaldırma operasyonu, açık kazı, basınçlı test, sıcak çalışma ve hareketli ekipman gibi tehlikeler sırasında kişilerin riskli alanlara girmesini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Yetersiz veya yanlış konumlandırılmış bariyerler çalışanlarda sahte güven hissi oluşturabilir.",
      "Bariyerleme alanı yalnız tehlikenin merkezini değil, olası düşme, savrulma, sıçrama ve ekipman hareket mesafesini de kapsamalıdır.",
      "Bariyerin anlamı, sorumlusu ve giriş şartları ekip tarafından anlaşılmıyorsa kontrol etkili değildir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir vinç operasyonunda bariyer yalnız yükün bulunduğu noktanın çevresine çekildi.",
      "Yük salınım yaptığında çalışanlardan biri bariyer dışında olduğunu düşünerek yükün hareket alanına girdi.",
      "Kaldırma yarıçapı ve olası yük salınımı dikkate alınarak daha geniş exclusion zone kurulması olayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Bariyer tehlikenin sınırına değil, tehlikenin ulaşabileceği sınırın dışına kurulmalıdır.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yükün veya ekipmanın hareket alanına kontrolsüz personel girişi.",
      "Düşen veya savrulan cisimlerin bariyer dışındaki çalışanlara ulaşması.",
      "Açık kazı, menhol veya seviye farklarına yetkisiz yaklaşım.",
      "Basınçlı test sırasında hortum veya bağlantı parçasının kontrolsüz hareketi.",
      "Araç ve yaya yollarının birbirine karışması.",
      "Gece veya düşük görüş koşullarında bariyerlerin fark edilmemesi.",
      "Hasarlı, kopmuş veya eksik bariyerleme nedeniyle alan bütünlüğünün kaybolması.",
      "Bariyer üzerindeki uyarı bilgilerinin eksik veya anlaşılmaz olması."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Tehlikenin erişebileceği maksimum alanı belirleyin ve bariyeri bu sınırın dışına kurun.",
      "Sarı-siyah, kırmızı-beyaz veya saha standardına uygun bariyer sistemini doğru amaçla kullanın.",
      "Bariyer üzerine tehlikenin türünü ve giriş kısıtlamasını açıkça belirtin.",
      "Gerekliyse kontrollü giriş noktası ve yetkili gözcü belirleyin.",
      "Yaya yollarının tehlikeli alanın içinden geçmediğini doğrulayın.",
      "Gece çalışmalarında reflektif bariyer veya ilave aydınlatma kullanın.",
      "Kaldırma ve basınçlı testlerde exclusion zone mesafesini risk değerlendirmesine göre belirleyin.",
      "Bariyerleri vardiya boyunca düzenli olarak kontrol edin ve hasarlı parçaları değiştirin.",
      "İş bittiğinde bariyeri yalnız alan güvenli hale getirildikten sonra kaldırın.",
      "Ekip değişimi veya saha koşulu değiştiğinde bariyer alanını yeniden değerlendirin."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bariyerin dışında olmak her zaman güvende olduğumuz anlamına gelmez. Bugün bariyer mesafesini gerçek tehlike alanına göre belirleyecek, girişleri kontrol edecek ve bariyer bütünlüğünü iş boyunca koruyacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü işte exclusion zone gerektiren ana tehlike nedir?",
      "Bariyerin doğru mesafesi nasıl belirlendi?",
      "Yetkisiz giriş nasıl önlenecek?",
      "Bariyer gece yeterince görünür mü?",
      "Kontrollü giriş gerekiyorsa kim sorumlu?",
      "İş koşulları değişirse bariyeri kim yeniden değerlendirecek?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Tehlike alanı belirlendi",
      "Bariyer mesafesi uygun",
      "Giriş noktaları kontrollü",
      "Uyarı bilgileri mevcut",
      "Bariyer sağlam",
      "Yaya yolu güvenli",
      "Aydınlatma yeterli",
      "Gözcü ihtiyacı değerlendirildi",
      "Ekip bilgilendirildi",
      "Kaldırma kriteri belirlendi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "BARRICADING AND EXCLUSION ZONES TOOLBOX TALK",
    "application_subtitle": "Correct isolation of hazardous areas and prevention of unauthorised access.",
    "subtitle": "Barricades must keep people outside the true reach of the hazard.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent personnel from entering hazardous areas during lifting, excavation, pressure testing, hot work, falling-object exposure and mobile-equipment operations.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Poorly positioned barricades can create a false sense of security.",
      "The exclusion zone must consider swing radius, falling objects, pressure release and equipment movement, not only the immediate work point.",
      "Barricading is ineffective when workers do not understand the hazard, access restriction or responsible person."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "During a crane lift, barricades were placed only around the load landing area.",
      "The suspended load swung outside that boundary while a worker believed he was standing in a safe area.",
      "A wider exclusion zone based on crane radius and possible load movement would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Place the barricade beyond the maximum reach of the hazard, not simply around the work point.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Uncontrolled entry into equipment or suspended-load movement areas.",
      "Falling or projected objects travelling beyond an inadequate barricade.",
      "Unauthorised approach to excavations, openings or level changes.",
      "Whipping hoses or failed fittings during pressure testing.",
      "Interaction between pedestrian and vehicle routes.",
      "Poor barricade visibility during night or low-light work.",
      "Damaged or missing barricades allowing uncontrolled access.",
      "Missing or unclear warning information at restricted areas."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify the maximum hazard reach and place barricades beyond that boundary.",
      "Use the correct barricade type and colour coding required by site rules.",
      "Clearly display the hazard and access restriction.",
      "Establish controlled entry points and attendants where required.",
      "Confirm pedestrian routes do not pass through the restricted area.",
      "Use reflective barricades or additional lighting for night work.",
      "Define pressure-test and lifting exclusion distances through risk assessment.",
      "Inspect barricade integrity throughout the shift.",
      "Remove barricades only after the area has been confirmed safe.",
      "Reassess the exclusion zone whenever the task or site conditions change."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, simply standing outside a tape line does not guarantee safety. Today we will position barricades according to the real hazard radius, control access and maintain the exclusion zone throughout the job.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What hazard requires an exclusion zone today?",
      "How was the barricade distance determined?",
      "How will unauthorised entry be prevented?",
      "Is the barricade visible at night?",
      "Who controls entry where access is required?",
      "Who will reassess the area if conditions change?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Hazard area identified",
      "Barricade distance suitable",
      "Entry points controlled",
      "Warnings displayed",
      "Barricade intact",
      "Pedestrian route safe",
      "Lighting adequate",
      "Attendant requirement assessed",
      "Crew briefed",
      "Removal criteria defined"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "overhead-power-lines",
  "tr": {
    "title": "HAVAİ ENERJİ HATLARI TOOLBOX TALK",
    "application_subtitle": "Vinç, manlift, iskele ve uzun ekipmanların enerji hatlarından güvenli uzaklığının kontrolü.",
    "subtitle": "Elektrik hattına temas gerekmez; tehlikeli yaklaşma bile ark oluşmasına neden olabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Vinç bomu, manlift, iskele, boru, merdiven ve diğer iletken ekipmanların havai enerji hatlarına tehlikeli yaklaşmasını önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Yüksek gerilim elektriği fiziksel temas olmadan hava boşluğundan ark yapabilir.",
      "Operatörün görüşü, bom yüksekliği veya zeminin eğimi değiştiğinde başlangıçta güvenli görünen mesafe hızla azalabilir.",
      "Hat gerilimi bilinmeden minimum yaklaşma mesafesi tahmin edilmemelidir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir mobil vinç bomunu havai hatta paralel olarak kaldırırken zemindeki eğim nedeniyle bom hattın yönüne yaklaştı.",
      "Operatör kabinden gerçek mesafeyi doğru değerlendiremedi.",
      "Önceden belirlenmiş yaklaşma limiti, dedicated spotter ve mekanik limit kullanılması riski ortadan kaldırabilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Enerji hattını enerjisiz olduğu doğrulanmadıkça her zaman canlı kabul edin.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Vinç veya manlift bomunun enerji hattına yaklaşması.",
      "Uzun metal boru, merdiven veya profil taşınırken hatta temas edilmesi.",
      "Elektrik arkının ekipman üzerinden toprağa geçmesi.",
      "Lastik tekerlekli ekipmanın elektrik tehlikesine karşı güvenli sanılması.",
      "Operatörün kör noktalar nedeniyle hat mesafesini yanlış değerlendirmesi.",
      "Yağmur ve nemli koşullar nedeniyle elektriksel riskin artması.",
      "Hat yüksekliğinin veya gerilim seviyesinin bilinmemesi.",
      "Ekipmana temas eden yerdeki kişilerin adım gerilimine maruz kalması."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Hat gerilimini ve saha tarafından belirlenen minimum yaklaşma mesafesini doğrulayın.",
      "Mümkünse çalışma başlamadan hattın enerjisinin kesilmesini ve kilitlenmesini sağlayın.",
      "Enerji kesilemiyorsa fiziksel yükseklik bariyeri veya goalpost sistemi kurun.",
      "Vinç ve manlift hareketleri için dedicated spotter görevlendirin.",
      "Bom limitlerini ve hareket kısıtlarını ekipman üzerinde ayarlayın.",
      "Uzun iletken malzemeleri enerji hatlarının altında dikey konumda taşımayın.",
      "Çalışma alanını ve yaklaşma limitini görünür şekilde işaretleyin.",
      "Gece çalışmalarında hat ve bariyerleri yeterli şekilde aydınlatın.",
      "Ekipman elektrik hattına temas ederse operatörün kabinde kalma acil durum yöntemini ekibe anlatın.",
      "İş planı veya ekipman konumu değişirse yaklaşma mesafesini yeniden değerlendirin."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bu hatlara temas etmek zorunda değiliz; yüksek gerilim ark yapabilir. Hattı canlı kabul edeceğiz, güvenli yaklaşma mesafesini koruyacağız ve hareketli ekipmanı gözcü olmadan hatta yaklaştırmayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Hat gerilimi biliniyor mu?",
      "Minimum yaklaşma mesafemiz nedir?",
      "Gözcü kim?",
      "Bom hareket limiti ayarlandı mı?",
      "Uzun malzemeler hangi güzergahtan taşınacak?",
      "Temas halinde operatör ne yapacak?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Hat tanımlandı",
      "Gerilim doğrulandı",
      "Yaklaşma mesafesi belirlendi",
      "Gözcü atandı",
      "Bariyer mevcut",
      "Bom limiti kontrol edildi",
      "Taşıma rotası güvenli",
      "Aydınlatma yeterli",
      "Acil durum anlatıldı",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "OVERHEAD POWER LINES TOOLBOX TALK",
    "application_subtitle": "Safe clearance for cranes, MEWPs, scaffolds and long conductive materials.",
    "subtitle": "Electrical contact is not always required; high voltage can arc across an air gap.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent cranes, MEWPs, scaffolds, pipes, ladders and other conductive equipment from approaching overhead electrical lines dangerously.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "High voltage can arc through air without direct physical contact.",
      "Changing boom angle, ground slope or visibility can quickly reduce an initially safe clearance.",
      "Minimum approach distance must never be guessed when the line voltage is unknown."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A mobile crane raised its boom parallel to an overhead line while positioned on sloping ground.",
      "The operator could not accurately judge the clearance from the cab.",
      "A defined approach limit, dedicated spotter and movement restriction would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Treat every overhead line as energised until isolation has been formally confirmed.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Crane or MEWP boom approaching an energised conductor.",
      "Long metal pipes, ladders or sections contacting overhead lines.",
      "Electrical arcing through equipment to ground.",
      "Incorrect assumption that rubber tyres provide complete protection.",
      "Operator blind spots causing incorrect distance judgement.",
      "Wet weather increasing electrical exposure.",
      "Unknown line height or voltage.",
      "Step-potential exposure around energised equipment."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Confirm line voltage and required minimum approach distance.",
      "Where possible arrange de-energisation and isolation before work.",
      "Install physical height restriction goalposts when isolation is not possible.",
      "Use a dedicated spotter for crane and MEWP movements.",
      "Set boom or movement limiting devices where available.",
      "Do not carry long conductive materials upright beneath overhead lines.",
      "Clearly mark the approach boundary.",
      "Provide sufficient lighting for night operations.",
      "Brief the operator to remain in the cab if equipment contacts a live line unless immediate danger requires evacuation.",
      "Reassess clearances whenever equipment position or work method changes."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, high voltage can arc without direct contact. We will treat the line as live, maintain the approved clearance and never move lifting or access equipment close to it without a spotter.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Do we know the line voltage?",
      "What is our minimum approach distance?",
      "Who is the dedicated spotter?",
      "Are boom limits configured?",
      "What route will long materials use?",
      "What must the operator do after electrical contact?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Line identified",
      "Voltage confirmed",
      "Clearance defined",
      "Spotter assigned",
      "Barrier installed",
      "Boom limit checked",
      "Material route safe",
      "Lighting adequate",
      "Emergency response briefed",
      "Crew informed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "underground-services",
  "tr": {
    "title": "YERALTI HATLARI VE SERVİSLER TOOLBOX TALK",
    "application_subtitle": "Kazı öncesi elektrik, gaz, su, proses ve iletişim hatlarının doğrulanması.",
    "subtitle": "Çizimde görünen hat ile sahadaki gerçek konum her zaman aynı olmayabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Kazı, sondaj, kırma ve zemin penetrasyonu sırasında gömülü elektrik, gaz, su, proses ve iletişim hatlarının hasar görmesini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Eski çizimler ve saha revizyonları nedeniyle yeraltı hatlarının gerçek konumu kayıtlardan farklı olabilir.",
      "Elektrik veya hidrokarbon hattına temas ciddi yaralanma, yangın, patlama ve tesis duruşuna neden olabilir.",
      "Hat tespiti tek yöntemle değil; çizim, dedektör, işaretleme ve kontrollü kazı birlikte kullanılarak yapılmalıdır."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekip mevcut çizimde servis görünmeyen bölgede mekanik kazıya başladı.",
      "Yaklaşık yarım metre derinlikte eski bir elektrik kablosu kepçe tarafından hasar gördü.",
      "Permit, tarama ve elle kontrollü trial pit uygulaması bu teması önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Yeraltında hat olmadığını varsaymayın; güvenli olduğunu sahada doğrulayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Canlı elektrik kablosuna kazı ekipmanı ile temas.",
      "Gaz veya hidrokarbon hattının delinmesi.",
      "Basınçlı su veya proses hattının kontrolsüz açılması.",
      "İletişim veya kontrol kablolarının hasar görmesi.",
      "Yanlış veya güncel olmayan yeraltı çizimleri.",
      "Hat tespit cihazının yanlış kullanılması.",
      "Mekanik kazının hatta çok yakın yapılması.",
      "İşaretlenmiş hat güzergahının saha faaliyetleri sırasında kaybolması."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Güncel utility çizimlerini ve kazı iznini kontrol edin.",
      "Yetkin kişi tarafından uygun hat tespit cihazı ile alanı tarayın.",
      "Tespit edilen hat güzergahını zeminde kalıcı ve görünür şekilde işaretleyin.",
      "Şüpheli bölgelerde trial pit veya elle kontrollü kazı uygulayın.",
      "Mekanik kazı için saha prosedüründeki minimum güvenli mesafeyi uygulayın.",
      "Gaz veya proses hattı yakınında acil durum müdahale planını hazır tutun.",
      "Hat konumu açığa çıktığında destek ve mekanik koruma sağlayın.",
      "Kazı derinliği ilerledikçe taramayı gerektiğinde tekrarlayın.",
      "Çizim ile saha bulgusu uyuşmazsa işi durdurun ve teknik birime bildirin.",
      "Kazı tamamlandıktan sonra yeni bulunan servisleri kayıt altına alın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, çizim temiz görünse bile yeraltının gerçekten temiz olduğunu doğrulamadan kazıya başlamıyoruz. Tarama, işaretleme ve kontrollü kazı tamamlanmadan kepçe çalışmayacak.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Güncel utility çizimi mevcut mu?",
      "Alan kim tarafından tarandı?",
      "Hat güzergahları zeminde işaretli mi?",
      "Mekanik kazı ne zaman başlayabilir?",
      "Çizim ve saha uyuşmazsa ne yapacağız?",
      "Acil durumda hangi hattı nasıl izole edeceğiz?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Kazı izni mevcut",
      "Çizimler kontrol edildi",
      "Alan tarandı",
      "Hatlar işaretlendi",
      "Trial pit değerlendirildi",
      "Güvenli mesafe belirlendi",
      "Operatör bilgilendirildi",
      "Acil durum planı hazır",
      "Saha uyuşmazlığı kontrol edildi",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "UNDERGROUND SERVICES TOOLBOX TALK",
    "application_subtitle": "Verification of buried electrical, gas, water, process and communication services before excavation.",
    "subtitle": "The actual position of buried services may differ from drawings.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent damage to buried electrical, gas, water, process and communication services during excavation, drilling, breaking and ground penetration.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Old drawings and undocumented modifications can make actual service locations different from records.",
      "Striking electrical or hydrocarbon services can cause fatal injury, fire, explosion and major plant disruption.",
      "Safe identification requires drawings, detection, marking and controlled excavation rather than reliance on one method."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A crew began mechanical excavation where the available drawing showed no buried service.",
      "An old electrical cable was struck approximately half a metre below ground.",
      "A permit, utility scan and hand-dug trial pit would have identified the cable."
    ],
    "remember_title": "REMEMBER",
    "remember": "Never assume the ground is clear; verify it before penetration.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Mechanical equipment striking live electrical cables.",
      "Damage to gas or hydrocarbon lines.",
      "Uncontrolled release from pressurised water or process lines.",
      "Damage to communication or control cables.",
      "Incorrect or outdated underground drawings.",
      "Incorrect use of locating equipment.",
      "Mechanical excavation too close to identified services.",
      "Loss of surface markings during ongoing site activities."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Review current utility drawings and excavation permits.",
      "Have the area scanned by a competent person using suitable detection equipment.",
      "Mark identified service routes clearly on the ground.",
      "Use trial pits or controlled hand excavation in uncertain areas.",
      "Maintain the site's required safe distance for mechanical excavation.",
      "Prepare emergency response for nearby gas or process services.",
      "Support and mechanically protect exposed services.",
      "Repeat scanning as excavation depth progresses where necessary.",
      "Stop work when drawings and field findings do not agree.",
      "Record newly discovered services after completion."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, a clear drawing does not prove clear ground. No excavator will start until scanning, marking and controlled verification have been completed.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Do we have current utility drawings?",
      "Who scanned the area?",
      "Are detected services marked?",
      "When may mechanical excavation begin?",
      "What do we do if drawings and field conditions differ?",
      "How will nearby services be isolated in an emergency?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Excavation permit available",
      "Drawings reviewed",
      "Area scanned",
      "Services marked",
      "Trial pit assessed",
      "Safe distance defined",
      "Operator briefed",
      "Emergency plan ready",
      "Field discrepancy checked",
      "Crew informed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "line-breaking-process-opening",
  "tr": {
    "title": "HAT AÇMA / PROSES AÇMA TOOLBOX TALK",
    "application_subtitle": "Boru, ekipman ve proses sistemlerinin kontrollü ve doğrulanmış şekilde açılması.",
    "subtitle": "Boş görünen bir hat içinde basınç, kimyasal veya sıcak akışkan kalmış olabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Boru, flanş, vana, filtre veya proses ekipmanı açılırken artık basınç, kimyasal, gaz ve sıcak akışkan maruziyetini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "İzolasyon uygulanmış olsa bile kapalı hacimlerde trapped pressure veya ürün kalıntısı bulunabilir.",
      "Yanlış vana dizilimi veya kaçıran vana çalışanın tehlikeli maddeye doğrudan maruz kalmasına neden olabilir.",
      "İlk bağlantının açılması proses açmanın en kritik aşamalarından biridir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekip izole edildiği bildirilen hatta kör flanşı sökmeye başladı.",
      "İlk civata gevşetildiğinde hat içinde kalmış sıcak sıvı flanş aralığından püskürdü.",
      "Drenaj, vent, sıfır enerji doğrulaması ve kontrollü ilk açma yöntemi yaralanmayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "İzolasyon belgesi sıfır enerji garantisi değildir; hattı açmadan önce fiziksel olarak doğrulayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Hat içinde kalan artık basınç.",
      "Sıcak sıvı veya buhar çıkışı.",
      "Korozif veya toksik kimyasal maruziyeti.",
      "Yanıcı gaz veya hidrokarbon salımı.",
      "Kaçıran izolasyon vanası.",
      "Yanlış ekipman veya yanlış hat üzerinde çalışma.",
      "Flanş civatalarının kontrolsüz gevşetilmesi.",
      "Uygunsuz PPE nedeniyle yüz ve vücut maruziyeti."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Doğru hat ve ekipmanı saha üzerinde fiziksel olarak doğrulayın.",
      "İzolasyon planı, LOTO ve gerekli körleme durumunu kontrol edin.",
      "Hattı uygun drenaj ve vent noktalarından basınçsız hale getirin.",
      "Basınç göstergesinin sıfır olduğunu tek başına yeterli kanıt olarak kabul etmeyin.",
      "Kimyasal veya hidrokarbon servisinde uygun gaz testi uygulayın.",
      "İlk açmayı vücudu olası çıkış hattından uzak tutarak kontrollü yapın.",
      "Flanşı önce kendinizden uzak tarafta gevşeterek kalmış basıncı güvenli yönde kontrol edin.",
      "Kimyasala uygun eldiven, gözlük, yüz siperi ve koruyucu kıyafet kullanın.",
      "Dökülme kontrol ekipmanını ve acil duş/göz duşunu hazır bulundurun.",
      "Beklenmeyen basınç veya ürün görülürse işi hemen durdurun."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, hat izole edilmiş olsa bile sıfır enerji durumunu kendimiz doğrulamadan açmayacağız. İlk civata en kritik adımdır; vücudumuzu çıkış hattından uzak tutacak ve kontrollü açacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Doğru hat fiziksel olarak doğrulandı mı?",
      "Drenaj ve vent noktaları nerede?",
      "Körleme gerekiyor mu?",
      "İlk açmayı kim yapacak?",
      "Hangi PPE gerekli?",
      "Beklenmeyen ürün çıkarsa ne yapacağız?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Doğru hat doğrulandı",
      "İzolasyon tamamlandı",
      "LOTO kontrol edildi",
      "Drenaj yapıldı",
      "Vent açıldı",
      "Sıfır enerji doğrulandı",
      "Gaz testi değerlendirildi",
      "PPE uygun",
      "Dökülme ekipmanı hazır",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "LINE BREAKING / PROCESS OPENING TOOLBOX TALK",
    "application_subtitle": "Controlled opening of piping, equipment and process systems.",
    "subtitle": "A line that appears empty may still contain pressure, heat or hazardous material.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent exposure to residual pressure, chemicals, gases and hot fluids while opening piping, flanges, valves, filters or process equipment.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Trapped pressure or product residue can remain even after isolation.",
      "Incorrect valve alignment or leaking isolation can expose workers directly to hazardous material.",
      "The first break in containment is often the highest-risk step."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A crew began removing a blind flange from a line reported as isolated.",
      "When the first bolt was loosened, trapped hot liquid sprayed through the flange gap.",
      "Draining, venting, zero-energy verification and controlled first-break technique would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "An isolation certificate does not replace physical verification of zero energy.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Residual pressure trapped inside piping.",
      "Release of hot liquid or steam.",
      "Exposure to corrosive or toxic chemicals.",
      "Release of flammable gas or hydrocarbons.",
      "Passing isolation valves.",
      "Work on the wrong line or equipment.",
      "Uncontrolled flange-bolt loosening.",
      "Inadequate PPE for potential splash exposure."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Physically verify the correct line and equipment.",
      "Confirm isolation plan, LOTO and required positive isolation.",
      "Drain and vent the system through suitable points.",
      "Do not rely solely on a pressure gauge reading zero.",
      "Perform gas testing where chemical or hydrocarbon service requires it.",
      "Make the first break while keeping the body away from the potential release path.",
      "Loosen the far side first where the approved procedure requires controlled flange opening.",
      "Use chemical-compatible gloves, goggles, face shield and protective clothing.",
      "Keep spill response equipment and emergency washing facilities ready.",
      "Stop immediately if unexpected pressure or product is detected."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, isolation alone is not proof of zero energy. We will verify the line, drain and vent it, and control the first break while keeping ourselves out of the release path.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Has the correct line been physically verified?",
      "Where are the drain and vent points?",
      "Is positive isolation required?",
      "Who will make the first break?",
      "What PPE is required?",
      "What will we do if unexpected product appears?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Correct line verified",
      "Isolation completed",
      "LOTO checked",
      "Line drained",
      "Vent opened",
      "Zero energy verified",
      "Gas test assessed",
      "PPE suitable",
      "Spill equipment ready",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "nitrogen-inert-gas-safety",
  "tr": {
    "title": "AZOT VE İNERT GAZ GÜVENLİĞİ TOOLBOX TALK",
    "application_subtitle": "Oksijen yetersizliği ve görünmez boğulma riskinin kontrolü.",
    "subtitle": "Azot zehirli değildir; ancak oksijeni uzaklaştırdığı için saniyeler içinde ölümcül olabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Azot ve diğer inert gazların kapalı, yarı kapalı ve düşük havalandırmalı alanlarda oluşturabileceği oksijen yetersizliği riskini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Azot renksiz, kokusuz ve tatsız olduğu için çalışan tehlikeyi fark edemeyebilir.",
      "Oksijen seviyesi düştüğünde bilinç kaybı belirgin bir uyarı olmadan gerçekleşebilir.",
      "Tank, vessel, pit, çadır veya havalandırması zayıf alanlar inert gaz kullanımında özellikle kritiktir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekipman azotla purge edildikten sonra yakınındaki düşük kotlu alanda çalışma devam etti.",
      "Azot birikmesi nedeniyle oksijen seviyesi düştü ancak çalışanlar bunu koku veya görüntüyle fark edemedi.",
      "Sürekli oksijen ölçümü, havalandırma ve exclusion zone uygulanması maruziyeti önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Azot bulunan alana gaz ölçümü yapılmadan güvenli gözüyle bakmayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Oksijen seviyesinin fark edilmeden tehlikeli düzeye düşmesi.",
      "Kapalı alanda hızlı bilinç kaybı.",
      "Purging sırasında azotun komşu çalışma alanlarına yayılması.",
      "Hortum veya bağlantı kaçaklarının lokal oksijen düşüşü oluşturması.",
      "Düşük kotlarda inert gaz birikmesi.",
      "Gaz ölçüm cihazının yalnız yanıcı gaz için kullanılması ve O2'nin izlenmemesi.",
      "Kurtarma amacıyla korumasız şekilde tehlikeli alana girilmesi.",
      "Vent çıkışlarının personel çalışma alanına yönlendirilmesi."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Azot kullanılan alanları risk değerlendirmesinde açıkça tanımlayın.",
      "Oksijen seviyesini uygun ve kalibre edilmiş gaz ölçüm cihazıyla kontrol edin.",
      "Gerekli durumlarda sürekli O2 monitoring uygulayın.",
      "Purging ve vent çıkışlarını güvenli açık alana yönlendirin.",
      "Kapalı alanlarda etkili mekanik havalandırma sağlayın.",
      "Azot hortumlarını ve bağlantılarını kaçak açısından kontrol edin.",
      "Tehlikeli alanları bariyerleyin ve oksijen yetersizliği uyarısı asın.",
      "Kurtarma planı ve uygun solunum ekipmanı olmadan oksijensiz alana girmeyin.",
      "Tüp ve manifold sistemlerinde vanaları yetkisiz müdahaleye karşı kontrol edin.",
      "İş bittikten sonra normal atmosfer doğrulanmadan alanı serbest bırakmayın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, azotun kokusu yok ve bize uyarı vermez. Oksijen seviyesini cihazla doğrulamadan hiçbir alanı güvenli kabul etmeyeceğiz ve azotla ilgili bir acil durumda kontrolsüz kurtarma girişimi yapmayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugün azot nerede kullanılıyor?",
      "O2 ölçümü nerelerde yapılacak?",
      "Vent çıkışı nereye yönlendirildi?",
      "Sürekli ölçüm gerekiyor mu?",
      "Düşük kotlu alan var mı?",
      "Acil durumda kurtarma yöntemi nedir?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Azot kaynağı tanımlandı",
      "O2 cihazı kalibre",
      "Atmosfer test edildi",
      "Vent güvenli noktada",
      "Havalandırma yeterli",
      "Bağlantılar kontrol edildi",
      "Alan bariyerli",
      "Uyarı levhası mevcut",
      "Kurtarma planı hazır",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "NITROGEN AND INERT GAS SAFETY TOOLBOX TALK",
    "application_subtitle": "Control of oxygen-deficiency and invisible asphyxiation hazards.",
    "subtitle": "Nitrogen is not toxic, but it can become fatal by displacing oxygen.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent oxygen-deficient atmospheres created by nitrogen and other inert gases in enclosed, semi-enclosed and poorly ventilated areas.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Nitrogen is colourless, odourless and tasteless, so workers may receive no warning of exposure.",
      "Low oxygen can cause rapid loss of consciousness without obvious symptoms.",
      "Vessels, pits, temporary enclosures and poorly ventilated areas are particularly vulnerable."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "Equipment was purged with nitrogen while nearby work continued at a lower elevation.",
      "Nitrogen accumulated and reduced the oxygen concentration without any smell or visible warning.",
      "Continuous oxygen monitoring, ventilation and an exclusion zone would have prevented exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Never assume an area exposed to nitrogen is safe without atmospheric testing.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Undetected reduction of oxygen concentration.",
      "Rapid unconsciousness inside enclosed spaces.",
      "Nitrogen migration into adjacent work areas.",
      "Local oxygen displacement from leaking hoses or fittings.",
      "Accumulation of inert gas in low areas.",
      "Monitoring only flammable gas while failing to measure oxygen.",
      "Unprotected rescue attempts into oxygen-deficient atmospheres.",
      "Vent discharge directed toward occupied work areas."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify all nitrogen-use areas in the risk assessment.",
      "Measure oxygen with suitable calibrated gas-detection equipment.",
      "Use continuous oxygen monitoring where conditions require it.",
      "Discharge purge and vent gases to a safe open location.",
      "Provide effective mechanical ventilation in enclosed areas.",
      "Inspect nitrogen hoses and connections for leaks.",
      "Barricade affected areas and display oxygen-deficiency warnings.",
      "Never enter an oxygen-deficient area for rescue without appropriate breathing equipment and a rescue plan.",
      "Control valves and manifolds against unauthorised operation.",
      "Do not release the area until normal atmosphere has been verified."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, nitrogen gives no smell or visible warning. We will verify oxygen with instruments and nobody will attempt an uncontrolled rescue in an oxygen-deficient area.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Where is nitrogen being used today?",
      "Where will oxygen be measured?",
      "Where does the vent discharge?",
      "Is continuous monitoring required?",
      "Are there low-lying areas nearby?",
      "What is the emergency rescue method?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Nitrogen source identified",
      "O2 monitor calibrated",
      "Atmosphere tested",
      "Vent location safe",
      "Ventilation adequate",
      "Connections inspected",
      "Area barricaded",
      "Warning displayed",
      "Rescue plan ready",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "steam-hot-surfaces",
  "tr": {
    "title": "BUHAR VE SICAK YÜZEYLER TOOLBOX TALK",
    "application_subtitle": "Buhar hatları, sıcak proses ekipmanları ve termal yanık risklerinin kontrolü.",
    "subtitle": "Buhar çoğu zaman görünmezdir ve küçük bir kaçak dahi ciddi yanığa neden olabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Buhar, kondens, sıcak boru ve ekipman yüzeylerinden kaynaklanan termal yanık ve basınçlı salım risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Yüksek sıcaklıktaki buhar çok kısa temas süresinde ciddi yanık oluşturabilir.",
      "İnce basınçlı buhar kaçakları çıplak gözle zor fark edilebilir ve elle kaçak aramak son derece tehlikelidir.",
      "İzolasyonu sökülmüş sıcak borular normal çalışma alanlarında beklenmedik temas riski yaratabilir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan buhar hattındaki küçük kaçağın yerini eliyle kontrol etmeye çalıştı.",
      "Görünmeyen yüksek basınçlı buhar jeti elinde ciddi yanık oluşturdu.",
      "Güvenli kaçak tespit yöntemi, bariyerleme ve uygun termal PPE yaralanmayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Buhar kaçağını elinizle aramayın; uygun tespit yöntemi kullanın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yüksek sıcaklıklı buharla doğrudan temas.",
      "Görünmeyen ince buhar jetleri.",
      "Sıcak kondens boşalması.",
      "İzolasyonu sökülmüş boru ve ekipman yüzeyleri.",
      "Buhar hattında trapped pressure.",
      "Yanlış veya erken vana açılması.",
      "Nemli zeminde kayma riski.",
      "Sıcak yüzeye uygun olmayan eldiven veya kıyafet kullanımı."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Sıcak hatları ve ekipman yüzeylerini önceden tanımlayın.",
      "Eksik izolasyon bölgelerini bariyerleyin veya fiziksel koruma sağlayın.",
      "Buhar kaçağını elle değil uygun ekipmanla kontrol edin.",
      "Hat açmadan önce basıncı ve sıcaklığı doğrulayın.",
      "Kondens drenajlarını güvenli noktaya yönlendirin.",
      "Vana açma işlemini yavaş ve kontrollü gerçekleştirin.",
      "Sıcak işe uygun eldiven, yüz siperi ve koruyucu kıyafet kullanın.",
      "Buhar kaçağı görülen alanı hemen izole edin.",
      "Islak ve sıcak kondens bulunan zemini temizleyip kayma riskini giderin.",
      "Bakım sonrası izolasyon ve koruyucu kaplamaları yeniden takın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, buhar kaçağının küçük görünmesi riskin küçük olduğu anlamına gelmez. Kaçağı elimizle kontrol etmeyecek, sıcak yüzeyleri işaretleyecek ve hat açmadan önce basınç ile sıcaklığı doğrulayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Sıcak yüzeyler nerede?",
      "Eksik izolasyon var mı?",
      "Buhar kaçağı nasıl kontrol edilecek?",
      "Hat basınçsız mı?",
      "Kondens nereye boşalıyor?",
      "Hangi termal PPE gerekli?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Sıcak hatlar tanımlandı",
      "İzolasyon kontrol edildi",
      "Kaçak yöntemi uygun",
      "Basınç doğrulandı",
      "Sıcaklık doğrulandı",
      "Drenaj güvenli",
      "Vana yöntemi açık",
      "PPE uygun",
      "Alan bariyerli",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "STEAM AND HOT SURFACES TOOLBOX TALK",
    "application_subtitle": "Control of steam lines, hot process equipment and thermal-burn hazards.",
    "subtitle": "Steam can be difficult to see, and even a small leak can cause severe burns.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent thermal burns and pressurised releases from steam, condensate, hot piping and process equipment.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "High-temperature steam can cause severe burns within seconds.",
      "Fine pressurised steam leaks may be difficult to see and must never be located by hand.",
      "Uninsulated hot piping can create unexpected contact hazards in normal work areas."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker attempted to locate a small steam leak using his hand.",
      "An almost invisible high-pressure steam jet caused a serious hand burn.",
      "A safe leak-detection method, barricading and thermal PPE would have prevented the injury."
    ],
    "remember_title": "REMEMBER",
    "remember": "Never search for a steam leak with your hand.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Direct contact with high-temperature steam.",
      "Fine and difficult-to-see steam jets.",
      "Discharge of hot condensate.",
      "Uninsulated piping and equipment.",
      "Trapped pressure inside steam lines.",
      "Incorrect or premature valve operation.",
      "Slip hazards from wet surfaces.",
      "Inadequate gloves or clothing for thermal exposure."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify hot piping and equipment before work.",
      "Barricade or guard areas with missing insulation.",
      "Use an approved method rather than hands to detect steam leaks.",
      "Verify pressure and temperature before opening systems.",
      "Route condensate drains to a safe location.",
      "Open steam valves slowly and under control.",
      "Wear suitable thermal gloves, face protection and clothing.",
      "Immediately isolate areas containing steam leaks.",
      "Remove slip hazards created by condensate.",
      "Restore insulation and protective coverings after maintenance."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, a small steam leak can still cause a major injury. We will not use our hands to locate leaks, and we will verify pressure, temperature and insulation before starting work.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Where are the hot surfaces?",
      "Is any insulation missing?",
      "How will steam leaks be checked?",
      "Is the line depressurised?",
      "Where is condensate discharged?",
      "What thermal PPE is required?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Hot lines identified",
      "Insulation checked",
      "Leak method suitable",
      "Pressure verified",
      "Temperature verified",
      "Drainage safe",
      "Valve method understood",
      "PPE suitable",
      "Area barricaded",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "hose-coupling-safety",
  "tr": {
    "title": "HORTUM VE KAPLİN GÜVENLİĞİ TOOLBOX TALK",
    "application_subtitle": "Basınçlı hortumların, kaplinlerin ve bağlantı sistemlerinin güvenli kullanımı.",
    "subtitle": "Basınç altındaki hortum arızası birkaç saniye içinde kontrolsüz enerji açığa çıkarabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Basınçlı hava, su, kimyasal ve proses hortumlarında kopma, whipping, bağlantı ayrılması ve kaçak risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Basınçlı hortum koparsa depolanmış enerji hortumu kontrolsüz şekilde savurabilir.",
      "Yanlış kaplin, hasarlı conta veya eksik emniyet pimi bağlantının basınç altında ayrılmasına neden olabilir.",
      "Hortum dış yüzeyinde küçük görünen hasar iç yapıda ciddi zayıflık göstergesi olabilir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Basınçlı hava hortumu uygun emniyet bağlantısı olmadan kompresöre bağlandı.",
      "Kaplin basınç yükseldiğinde ayrıldı ve hortum çevrede kontrolsüz şekilde savruldu.",
      "Whip-check, doğru kaplin ve ön kullanım kontrolü olayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Basınçlı hortumu bağlantısından ayırmadan önce basıncı tamamen boşaltın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Hortum kopması sonucu whipping hareketi.",
      "Kaplinin basınç altında ayrılması.",
      "Kimyasal veya sıcak akışkan kaçağı.",
      "Aşınmış, kesilmiş veya ezilmiş hortum gövdesi.",
      "Yanlış basınç sınıfında hortum kullanımı.",
      "Eksik whip-check veya safety pin.",
      "Hortumun araç yolu veya keskin kenar üzerinden geçirilmesi.",
      "Basınç boşaltılmadan bağlantının sökülmesi."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Hortumun basınç ve akışkan sınıfının işe uygun olduğunu doğrulayın.",
      "Her kullanımdan önce hortum gövdesini ve kaplinleri kontrol edin.",
      "Basınçlı hava bağlantılarında uygun whip-check kullanın.",
      "Kaplin emniyet pimlerini ve kilitleme sistemlerini takın.",
      "Hortumları keskin kenar, sıcak yüzey ve araç trafiğinden koruyun.",
      "Uzun hortumları takılma riski yaratmayacak şekilde güzergahlandırın.",
      "Kaçak kontrolünü el ile değil güvenli yöntemle yapın.",
      "Bağlantı sökmeden önce sistemi izole edin ve basıncı boşaltın.",
      "Hasarlı hortumu geçici bant veya uygunsuz tamirle kullanmaya devam etmeyin.",
      "Basınç testi veya yüksek enerjili kullanımda exclusion zone oluşturun."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, hortum basit bir ekipman gibi görünse de içinde ciddi enerji taşır. Kaplinleri, whip-checkleri ve hortum durumunu kontrol etmeden basınç vermeyeceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Hortum doğru basınç sınıfında mı?",
      "Whip-check gerekli mi?",
      "Kaplin kilidi mevcut mu?",
      "Hortum güzergahı güvenli mi?",
      "Hasar veya aşınma var mı?",
      "Sökmeden önce basınç nasıl boşaltılacak?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Basınç sınıfı uygun",
      "Hortum sağlam",
      "Kaplin uygun",
      "Whip-check takılı",
      "Safety pin mevcut",
      "Güzergah güvenli",
      "Kaçak yok",
      "Keskin kenar korumalı",
      "İzolasyon yöntemi açık",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "HOSE AND COUPLING SAFETY TOOLBOX TALK",
    "application_subtitle": "Safe use of pressurised hoses, couplings and connection systems.",
    "subtitle": "A pressurised hose failure can release uncontrolled energy within seconds.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent hose whipping, coupling separation, leaks and failures involving compressed air, water, chemicals and process fluids.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "A failed pressurised hose can release stored energy and move violently.",
      "Incorrect couplings, damaged seals or missing locking devices can allow connections to separate under pressure.",
      "Minor external hose damage may indicate serious internal deterioration."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A compressed-air hose was connected without an appropriate safety restraint.",
      "The coupling separated as pressure increased and the hose whipped uncontrollably.",
      "A whip-check, correct coupling and pre-use inspection would have prevented the event."
    ],
    "remember_title": "REMEMBER",
    "remember": "Fully depressurise the hose before disconnecting it.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Hose whipping after rupture.",
      "Coupling separation under pressure.",
      "Chemical or hot-fluid leakage.",
      "Cut, crushed or abraded hose bodies.",
      "Use of hoses with incorrect pressure rating.",
      "Missing whip-checks or locking pins.",
      "Hoses routed through traffic or across sharp edges.",
      "Disconnecting fittings before pressure is released."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Confirm hose pressure and fluid compatibility.",
      "Inspect hose bodies and couplings before every use.",
      "Use suitable whip-checks on compressed-air connections.",
      "Install locking pins and coupling restraints.",
      "Protect hoses from sharp edges, hot surfaces and vehicle traffic.",
      "Route long hoses to minimise trip hazards.",
      "Use a safe leak-detection method rather than hands.",
      "Isolate and depressurise before disconnecting.",
      "Do not continue using damaged hoses with temporary tape repairs.",
      "Establish an exclusion zone for pressure testing or high-energy service."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, hoses may look simple but they can contain significant stored energy. We will inspect the hose, coupling and restraints before applying pressure.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the hose correctly rated?",
      "Is a whip-check required?",
      "Is the coupling locked?",
      "Is the hose route safe?",
      "Is there visible damage?",
      "How will pressure be released before disconnection?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Pressure rating suitable",
      "Hose undamaged",
      "Coupling suitable",
      "Whip-check installed",
      "Safety pin installed",
      "Routing safe",
      "No leaks",
      "Sharp edges protected",
      "Isolation method clear",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "abrasive-blasting-safety",
  "tr": {
    "title": "KUMLAMA / ABRASİF BLASTING TOOLBOX TALK",
    "application_subtitle": "Yüksek hızlı aşındırıcı malzeme, toz, gürültü ve basınçlı ekipman risklerinin kontrolü.",
    "subtitle": "Blasting sırasında hem operatör hem de çevredeki çalışanlar yüksek enerjili maruziyet altındadır.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Abrasive blasting sırasında yüksek hızlı partikül, solunabilir toz, gürültü, basınçlı hortum ve görüş kaybı risklerini kontrol etmek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Aşındırıcı partiküller yüksek hızla yüzeye çarptığı için cilt ve göz yaralanmalarına neden olabilir.",
      "Blasting tozu solunum sistemine zarar verebilir ve çevredeki çalışanları da etkileyebilir.",
      "Uzun basınçlı hortumlarda bağlantı arızası ciddi whipping tehlikesi yaratır."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Blasting kabini dışında çalışan bir kişi exclusion zone içine kısa süreliğine girdi.",
      "Operatör görüşü sınırlı olduğu için kişiyi fark etmedi ve blasting devam etti.",
      "Fiziksel bariyer, kontrollü giriş ve iletişim sistemi maruziyeti önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Blasting alanına yetkisiz kişinin girmesi işi derhal durdurma sebebidir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yüksek hızlı abrasive partiküllerin vücuda çarpması.",
      "Yoğun toz ve solunabilir partikül maruziyeti.",
      "Çok yüksek gürültü seviyesi.",
      "Basınçlı blasting hortumunun kopması veya savrulması.",
      "Operatörün kısıtlı görüşü.",
      "Uygun olmayan solunum koruması.",
      "Elektriksel veya statik yük birikimi.",
      "Yetkisiz personelin blasting alanına girmesi."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Blasting alanını tam olarak bariyerleyin ve girişleri kontrol edin.",
      "Operatör için uygun blasting hood ve hava beslemeli solunum sistemi kullanın.",
      "Kullanılan abrasive malzemenin sağlık risklerini doğrulayın.",
      "Hortum, nozzle, deadman control ve kaplinleri kullanım öncesi kontrol edin.",
      "Basınçlı bağlantılarda uygun güvenlik kilitlerini ve restraints kullanın.",
      "Toz yayılımını enclosure, havalandırma veya uygun yöntemlerle kontrol edin.",
      "Gürültü alanını işaretleyin ve işitme koruması sağlayın.",
      "Operatör ile gözcü arasında güvenilir iletişim yöntemi kurun.",
      "Deadman control sistemini devre dışı bırakmayın veya bağlamayın.",
      "İş bitiminde basıncı tamamen boşaltmadan ekipmana müdahale etmeyin."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, blasting sırasında operatörün görüşü sınırlıdır ve yüksek enerji sürekli vardır. Alanı tamamen kontrol edeceğiz, deadman sistemine müdahale etmeyeceğiz ve uygun solunum koruması olmadan blasting alanına girmeyeceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Blasting alanı tamamen izole mi?",
      "Solunum sistemi uygun mu?",
      "Deadman control çalışıyor mu?",
      "Hortum ve kaplinler kontrol edildi mi?",
      "Gürültü alanı belirlendi mi?",
      "Operatör ile iletişim nasıl sağlanacak?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Alan bariyerli",
      "Giriş kontrollü",
      "Blasting hood uygun",
      "Solunum havası uygun",
      "Hortum sağlam",
      "Kaplinler kilitli",
      "Deadman çalışıyor",
      "Toz kontrolü mevcut",
      "İşitme koruması mevcut",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "ABRASIVE BLASTING SAFETY TOOLBOX TALK",
    "application_subtitle": "Control of high-velocity abrasive, dust, noise and pressurised-equipment hazards.",
    "subtitle": "Both operators and nearby workers can be exposed to significant energy during blasting.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Control high-velocity particles, respirable dust, noise, pressurised hoses and restricted visibility during abrasive blasting.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Abrasive particles strike surfaces at high velocity and can severely injure exposed skin and eyes.",
      "Blasting dust can harm the respiratory system and affect people outside the immediate work area.",
      "Pressurised blasting hoses can whip violently after connection failure."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker briefly entered the exclusion zone outside a blasting enclosure.",
      "The blasting operator had restricted visibility and did not see the person.",
      "Physical barricades, controlled access and communication would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Unauthorised entry into the blasting zone is an immediate stop-work condition.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "High-velocity abrasive striking the body.",
      "Heavy dust and respirable-particle exposure.",
      "Very high noise levels.",
      "Pressurised blasting hose rupture or whipping.",
      "Restricted operator visibility.",
      "Inadequate respiratory protection.",
      "Static or electrical accumulation.",
      "Unauthorised entry into the blasting zone."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Fully barricade the blasting area and control entry.",
      "Provide an appropriate blasting hood and supplied-air respiratory system.",
      "Confirm health hazards associated with the abrasive media.",
      "Inspect hose, nozzle, deadman control and couplings before use.",
      "Install suitable safety locks and restraints on pressurised connections.",
      "Control dust using enclosure, ventilation or other approved methods.",
      "Mark noise zones and provide hearing protection.",
      "Provide reliable communication between operator and attendant.",
      "Never bypass or tie down the deadman control.",
      "Fully depressurise equipment before intervention."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, blasting involves continuous high energy and limited operator visibility. We will fully control the area, keep the deadman system functional and use the required respiratory protection.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the blasting area fully isolated?",
      "Is respiratory protection suitable?",
      "Does the deadman control work?",
      "Have hoses and couplings been inspected?",
      "Is the noise zone identified?",
      "How will communication with the operator be maintained?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Area barricaded",
      "Access controlled",
      "Blasting hood suitable",
      "Breathing air suitable",
      "Hose undamaged",
      "Couplings secured",
      "Deadman functional",
      "Dust control provided",
      "Hearing protection provided",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "painting-coating-safety",
  "tr": {
    "title": "BOYA VE KAPLAMA GÜVENLİĞİ TOOLBOX TALK",
    "application_subtitle": "Solvent buharı, kimyasal temas, yangın ve kapalı alan risklerinin kontrolü.",
    "subtitle": "Boya işi yalnız yüzey işlemi değildir; kimyasal, yangın ve solunum riski birlikte yönetilmelidir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Boya, solvent, thinner, epoksi ve kaplama malzemelerinin kullanımı sırasında solunum, cilt teması, yangın ve patlama risklerini kontrol etmek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Birçok kaplama ürünü yanıcı solvent içerir ve yetersiz havalandırılan alanlarda buhar birikebilir.",
      "İzosiyanat, solvent ve sertleştirici gibi maddeler ciddi solunum ve cilt etkilerine neden olabilir.",
      "Kapalı veya yarı kapalı alanlarda küçük miktardaki ürün dahi atmosferi hızla değiştirebilir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekip yarı kapalı alanda solvent bazlı boya uygulamaya başladı.",
      "Mekanik havalandırma yetersizdi ve solvent buharı çalışma alanında birikti.",
      "SDS değerlendirmesi, VOC kontrolü, uygun RPE ve havalandırma uygulaması maruziyeti önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Boya kokusu yalnız rahatsızlık değildir; tehlikeli buhar maruziyetinin işareti olabilir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Solvent ve VOC buharlarının solunması.",
      "Yanıcı buharların tutuşturucu kaynakla temas etmesi.",
      "Epoksi veya sertleştiricinin ciltle temas etmesi.",
      "Püskürtme boyada aerosol maruziyeti.",
      "Kapalı alanda oksijen ve atmosfer koşullarının değişmesi.",
      "Uygunsuz respirator filtresi kullanımı.",
      "Boya ve solvent kaplarının açık bırakılması.",
      "Dökülme sonucu çevresel ve kayma riski."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Ürünün SDS'ini ve kimyasal tehlikelerini işe başlamadan inceleyin.",
      "Kapalı veya yarı kapalı alanda yeterli havalandırma sağlayın.",
      "Gerekliyse VOC veya atmosfer ölçümü uygulayın.",
      "Ürüne uygun respirator ve filtre tipini seçin.",
      "Kimyasala dayanıklı eldiven, gözlük ve koruyucu kıyafet kullanın.",
      "Açık alev, kıvılcım ve sigara kaynaklarını çalışma alanından uzaklaştırın.",
      "Boya ve solvent kaplarını kullanılmadığında kapalı tutun.",
      "Yanıcı malzemeleri uygun depolama kabinlerinde saklayın.",
      "Dökülme kitini hazır tutun ve atıkları kontrollü şekilde bertaraf edin.",
      "Spray painting sırasında çevredeki çalışanları overspray alanından uzak tutun."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, boya işinde sadece maske takmak yeterli değildir. Ürünün SDS'ini bilecek, havalandırmayı sağlayacak, tutuşturucu kaynakları kaldıracak ve doğru filtreyi kullanacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Kullandığımız ürünün ana tehlikesi nedir?",
      "SDS mevcut mu?",
      "Havalandırma yeterli mi?",
      "Doğru respirator filtresi kullanılıyor mu?",
      "Yakında tutuşturucu kaynak var mı?",
      "Dökülme halinde ne yapacağız?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "SDS mevcut",
      "Ürün tanımlandı",
      "Havalandırma yeterli",
      "RPE uygun",
      "Eldiven uygun",
      "Göz koruması uygun",
      "Tutuşturucu kaynak yok",
      "Kaplar kapalı",
      "Spill kit mevcut",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "PAINTING AND COATING SAFETY TOOLBOX TALK",
    "application_subtitle": "Control of solvent vapours, chemical contact, fire and enclosed-area hazards.",
    "subtitle": "Painting involves chemical, respiratory and fire hazards that must be managed together.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Control respiratory, skin-contact, fire and explosion risks during the use of paints, solvents, thinners, epoxies and coating products.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Many coatings contain flammable solvents that can accumulate in poorly ventilated areas.",
      "Isocyanates, solvents and hardeners can cause serious respiratory and skin effects.",
      "Even small quantities can rapidly change the atmosphere inside enclosed or semi-enclosed work areas."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A crew began applying solvent-based coating inside a semi-enclosed area.",
      "Mechanical ventilation was inadequate and solvent vapours accumulated.",
      "SDS review, VOC control, suitable RPE and ventilation would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Paint odour may indicate hazardous vapour exposure, not simply discomfort.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Inhalation of solvent and VOC vapours.",
      "Ignition of flammable vapours.",
      "Skin contact with epoxy or hardener.",
      "Aerosol exposure during spray painting.",
      "Atmospheric changes inside enclosed areas.",
      "Incorrect respirator cartridge selection.",
      "Open paint and solvent containers.",
      "Spills creating environmental and slip hazards."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Review the product SDS before starting work.",
      "Provide sufficient ventilation in enclosed and semi-enclosed areas.",
      "Perform VOC or atmospheric monitoring where required.",
      "Select the correct respirator and cartridge for the product.",
      "Wear chemical-resistant gloves, eye protection and protective clothing.",
      "Remove flames, sparks and smoking from the work area.",
      "Keep paint and solvent containers closed when not in use.",
      "Store flammable products in approved storage facilities.",
      "Keep spill-response equipment available and control waste disposal.",
      "Keep nearby workers outside spray and overspray zones."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, simply wearing a mask is not enough. We will understand the SDS, provide ventilation, remove ignition sources and use the correct respiratory filters.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What is the main hazard of today's product?",
      "Is the SDS available?",
      "Is ventilation adequate?",
      "Are we using the correct respirator cartridge?",
      "Are there ignition sources nearby?",
      "What will we do if a spill occurs?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "SDS available",
      "Product identified",
      "Ventilation adequate",
      "RPE suitable",
      "Gloves suitable",
      "Eye protection suitable",
      "No ignition source",
      "Containers closed",
      "Spill kit available",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "lightning-severe-weather",
  "tr": {
    "title": "YILDIRIM VE ŞİDDETLİ HAVA KOŞULLARI TOOLBOX TALK",
    "application_subtitle": "Yıldırım, kuvvetli rüzgar, yoğun yağış ve ani hava değişimlerinde işin güvenli yönetimi.",
    "subtitle": "Hava koşulları değiştiğinde aynı iş planı artık güvenli olmayabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Yıldırım, yüksek rüzgar, yoğun yağış ve görüş kaybı sırasında açık alan, yüksekte çalışma ve kaldırma operasyonlarından kaynaklanan riskleri önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Yıldırım riski açık alanlarda, yüksek yapılarda ve metal ekipman çevresinde ciddi ölümcül tehlike oluşturur.",
      "Rüzgar hızı kaldırma operasyonlarında yük kontrolünü ve yüksekte çalışanların dengesini doğrudan etkiler.",
      "Yoğun yağış yüzeyleri kayganlaştırabilir, görüşü azaltabilir ve elektriksel tehlikeleri artırabilir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Vinç operasyonu sırasında rüzgar hızlandı ancak yük kaldırma devam etti.",
      "Geniş yüzeyli yük rüzgar etkisiyle dönmeye başladı ve tag line ile kontrol zorlaştı.",
      "Rüzgar limiti takibi ve önceden belirlenmiş stop-work kriteri operasyonu güvenli şekilde durdurabilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Hava koşulları işi kontrol etmeye başladığında işi durdurma zamanı gelmiştir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Açık alanda yıldırım çarpması.",
      "Kuvvetli rüzgarda askıdaki yükün kontrolünü kaybetmesi.",
      "Yüksekte çalışan kişinin dengesini kaybetmesi.",
      "Yağmur nedeniyle kaygan platform ve merdivenler.",
      "Şiddetli yağışta görüş mesafesinin düşmesi.",
      "Su birikmesi nedeniyle elektriksel tehlikenin artması.",
      "Geçici yapı, branda veya malzemelerin rüzgarla savrulması.",
      "Hava koşullarındaki ani değişimin geç fark edilmesi."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "İş başlamadan hava tahminini ve saha koşullarını kontrol edin.",
      "Kaldırma ekipmanının üretici rüzgar limitlerini doğrulayın.",
      "Yüksekte çalışma için saha stop-work rüzgar kriterlerini uygulayın.",
      "Yıldırım için site alarm ve sığınma prosedürünü ekibe anlatın.",
      "Fırtına yaklaşırken vinç, manlift ve yüksekte çalışmayı güvenli şekilde durdurun.",
      "Gevşek malzeme, branda ve geçici ekipmanları sabitleyin.",
      "Yağış sonrası platform, scaffold ve erişim yollarını tekrar kontrol edin.",
      "Su birikintileri çevresindeki elektrik ekipmanını değerlendirin.",
      "Gece veya kötü görüşte ilave aydınlatma sağlayın.",
      "Koşullar güvenli seviyeye dönmeden işi yeniden başlatmayın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, üretim hedefi hava koşullarından daha önemli değildir. Rüzgar, yıldırım veya yağış belirlenen sınırı geçtiğinde işi durduracağız ve güvenli koşullar geri gelmeden yeniden başlamayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü hava tahmini nedir?",
      "Rüzgar limitimiz nedir?",
      "Yıldırım alarmında nereye gideceğiz?",
      "Hangi işler ilk durdurulacak?",
      "Gevşek malzemeler sabit mi?",
      "Yeniden başlama kararını kim verecek?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Hava tahmini kontrol edildi",
      "Rüzgar ölçümü mevcut",
      "Limitler biliniyor",
      "Sığınma alanı belli",
      "Stop-work kriteri açık",
      "Malzemeler sabit",
      "Erişim yolları güvenli",
      "Elektrik riski kontrol edildi",
      "Yeniden başlama kriteri açık",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "LIGHTNING AND SEVERE WEATHER TOOLBOX TALK",
    "application_subtitle": "Safe management of lightning, high winds, heavy rain and sudden weather changes.",
    "subtitle": "When weather changes, the original work plan may no longer be safe.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent hazards during lightning, high winds, heavy rain and poor visibility affecting outdoor work, lifting and work at height.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Lightning presents a potentially fatal hazard around open areas, elevated structures and metal equipment.",
      "Wind directly affects suspended-load control and worker stability at height.",
      "Heavy rain creates slippery surfaces, reduces visibility and can increase electrical risk."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "Wind speed increased during a crane operation but lifting continued.",
      "A large surface-area load began rotating and became difficult to control with tag lines.",
      "Wind-limit monitoring and a predetermined stop-work criterion would have safely stopped the operation."
    ],
    "remember_title": "REMEMBER",
    "remember": "When weather begins controlling the job, it is time to stop the job.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Lightning strike during outdoor work.",
      "Loss of suspended-load control in strong wind.",
      "Workers losing balance at height.",
      "Wet and slippery platforms or ladders.",
      "Reduced visibility during heavy rain.",
      "Increased electrical exposure around standing water.",
      "Temporary structures or loose materials becoming airborne.",
      "Sudden weather deterioration not recognised in time."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Check weather forecasts and site conditions before work.",
      "Confirm manufacturer wind limits for lifting equipment.",
      "Apply site wind stop-work criteria for work at height.",
      "Brief crews on lightning alarms and shelter locations.",
      "Safely stop cranes, MEWPs and elevated work when storms approach.",
      "Secure loose materials, sheeting and temporary equipment.",
      "Reinspect platforms, scaffolds and access routes after rain.",
      "Assess electrical equipment around standing water.",
      "Provide additional lighting during reduced visibility.",
      "Do not restart until conditions return to acceptable limits."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, production is never more important than severe weather. We will stop when wind, lightning or rain exceeds our limits and restart only after conditions are confirmed safe.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What is today's weather forecast?",
      "What is our wind limit?",
      "Where is the lightning shelter?",
      "Which activities stop first?",
      "Are loose materials secured?",
      "Who authorises restart?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Forecast checked",
      "Wind monitoring available",
      "Limits understood",
      "Shelter identified",
      "Stop-work criteria clear",
      "Materials secured",
      "Access routes safe",
      "Electrical risk checked",
      "Restart criteria clear",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
}

,
{
  "slug": "dropped-object-prevention-zones",
  "tr": {
    "title": "DÜŞEN CİSİM ÖNLEME ALANLARI TOOLBOX TALK",
    "application_subtitle": "Yüksekte çalışma sırasında düşen cisim riskinin saha sınırlarıyla kontrolü.",
    "subtitle": "Bir cisim küçük olabilir; ancak yükseklik arttıkça etkisi ölümcül olabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Yüksekte çalışma, iskele, platform ve üst kot faaliyetlerinde düşen cisimlerin alt seviyedeki çalışanlara ulaşmasını önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Alet, bağlantı elemanı veya küçük metal parçası bile yükseklikten düştüğünde ciddi yaralanmaya neden olabilir.",
      "Düşen cisim riski yalnız çalışma noktasının tam altında değil, sekme ve savrulma alanlarında da bulunur.",
      "Exclusion zone, toe-board, tool tether ve housekeeping birlikte uygulanmadıkça kontrol tam değildir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Üst platformda çalışan ekip küçük bir anahtarı platform kenarında bıraktı.",
      "Anahtar titreşim nedeniyle düştü ve alt seviyedeki yaya yoluna ulaştı.",
      "Tool tether, toe-board ve alt alan bariyerlemesi yaralanmayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Yukarıdaki işi değil, aşağıdaki insanı da koruyun.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "El aletlerinin platformdan düşmesi.",
      "Somun, cıvata ve küçük parçaların seviye değiştirerek düşmesi.",
      "Malzemelerin rüzgarla sürüklenmesi.",
      "Toe-board olmayan platform kenarları.",
      "Açık ızgara ve boşluklardan malzeme geçişi.",
      "Alt kotta çalışanların tehlike alanına girmesi.",
      "Yetersiz housekeeping nedeniyle gevşek malzeme birikmesi.",
      "Düşen cismin sekerek bariyer dışına çıkması."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Yüksekte kullanılan el aletlerinde uygun tool tether kullanın.",
      "Platformlarda toe-board ve kenar korumasını doğrulayın.",
      "Açık ızgara veya boşlukları geçici olarak kapatın.",
      "Alt kotta uygun exclusion zone oluşturun.",
      "Malzemeleri sabitlenmiş kutu veya kaplarda tutun.",
      "Gevşek parçaları platform kenarlarından uzaklaştırın.",
      "Rüzgarlı koşullarda hafif malzemeleri sabitleyin.",
      "İş bitiminde üst kot housekeeping kontrolü yapın.",
      "Alt alanda yaya ve çalışma güzergahlarını yeniden yönlendirin.",
      "Düşen cisim olayı veya near miss sonrası alanı yeniden değerlendirin."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bugün yukarıda yaptığımız her iş aşağıdaki kişileri de etkiliyor. Aletlerimizi bağlayacak, alt alanı kontrol edecek ve platformda gevşek malzeme bırakmayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugün hangi ekipman veya malzeme düşebilir?",
      "Tool tether gereken aletler hangileri?",
      "Alt exclusion zone yeterli mi?",
      "Toe-board mevcut mu?",
      "Gevşek malzeme var mı?",
      "Rüzgar riski değerlendirildi mi?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Tool tether hazır",
      "Toe-board mevcut",
      "Kenar koruması uygun",
      "Açık boşluklar kapalı",
      "Alt alan bariyerli",
      "Malzemeler sabit",
      "Housekeeping uygun",
      "Yaya yolu güvenli",
      "Rüzgar kontrol edildi",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "DROPPED OBJECT PREVENTION ZONES TOOLBOX TALK",
    "application_subtitle": "Field control of falling-object hazards during elevated work.",
    "subtitle": "Even small objects can become fatal when dropped from height.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent tools, materials and small components from falling onto people below during elevated work, scaffolding and platform activities.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Small tools and hardware can cause severe injury when dropped from height.",
      "The exposure area is not limited to directly below the work point because objects can bounce or deflect.",
      "Effective prevention requires tool tethering, toe boards, housekeeping and exclusion zones together."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker left a small spanner near the edge of an elevated platform.",
      "Vibration caused the tool to fall into a pedestrian route below.",
      "Tool tethering, toe boards and a properly barricaded drop zone would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Protect the people below as carefully as the people working above.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Hand tools falling from platforms.",
      "Nuts, bolts and small components dropping through levels.",
      "Materials displaced by wind.",
      "Platform edges without toe boards.",
      "Open grating and floor penetrations.",
      "People entering drop zones below.",
      "Loose materials caused by poor housekeeping.",
      "Dropped objects bouncing beyond barricades."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Use suitable tool tethers for elevated work.",
      "Verify toe boards and edge protection.",
      "Cover open grating and penetrations where possible.",
      "Establish suitable exclusion zones below.",
      "Store small items in secured containers.",
      "Keep loose materials away from edges.",
      "Secure lightweight materials in windy conditions.",
      "Complete elevated housekeeping checks after work.",
      "Reroute pedestrians away from drop zones.",
      "Reassess the area after any dropped-object event or near miss."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, everything we use at height can affect the people below. We will tether tools, control the area beneath us and keep all loose materials away from edges.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What could fall during today's task?",
      "Which tools require tethering?",
      "Is the exclusion zone large enough?",
      "Are toe boards installed?",
      "Is loose material present?",
      "Has wind been considered?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Tool tethers ready",
      "Toe boards installed",
      "Edge protection suitable",
      "Openings covered",
      "Area below barricaded",
      "Materials secured",
      "Housekeeping acceptable",
      "Pedestrian route safe",
      "Wind checked",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "temporary-work-platforms",
  "tr": {
    "title": "GEÇİCİ ÇALIŞMA PLATFORMLARI TOOLBOX TALK",
    "application_subtitle": "Geçici platformların taşıma kapasitesi, erişim ve kenar korumasının doğrulanması.",
    "subtitle": "Geçici olması, daha düşük standartta olabileceği anlamına gelmez.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Geçici çalışma platformlarında çökme, düşme, erişim ve malzeme yükleme risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Geçici platformlar kısa süreli kurulduğu için kontrol dışı değişikliklere daha açık olabilir.",
      "Platform taşıma kapasitesi aşıldığında lokal çökme veya dengesizlik meydana gelebilir.",
      "Kenar koruması ve güvenli erişim eksikliği ciddi düşme riskine neden olur."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir geçici platform üzerine planlanandan fazla ekipman ve malzeme bırakıldı.",
      "Platform bir noktada sehim yaptı ve çalışanlar dengesini kaybetti.",
      "Yük kapasitesinin işaretlenmesi ve malzeme kontrolü olayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Geçici platformlar da tasarlanmış ve kontrol edilmiş sistemler olmalıdır.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Platform taşıma kapasitesinin aşılması.",
      "Eksik korkuluk veya toe-board.",
      "Gevşek veya hasarlı döşeme elemanları.",
      "Uygunsuz erişim merdiveni.",
      "Platform üzerinde düzensiz yük dağılımı.",
      "Yetkisiz platform değişikliği.",
      "Kaygan veya kirli platform yüzeyi.",
      "Platform altında çalışanların maruziyeti."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Platformun onaylı tasarım veya saha standardına uygun olduğunu doğrulayın.",
      "Maksimum taşıma kapasitesini görünür şekilde belirtin.",
      "Korkuluk, ara korkuluk ve toe-boardları kontrol edin.",
      "Döşeme elemanlarının sabit ve hasarsız olduğunu doğrulayın.",
      "Güvenli erişim merdiveni veya merdiven kulesi sağlayın.",
      "Malzemeleri dengeli ve kontrollü şekilde yerleştirin.",
      "Yetkisiz modifikasyonları yasaklayın.",
      "Platform yüzeyini temiz ve kaymaz durumda tutun.",
      "Platformu vardiya öncesi görsel olarak kontrol edin.",
      "Hasar veya değişiklik sonrası yetkili kişi onayı almadan kullanmayın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, bu platform geçici olabilir ama güvenlik şartları geçici değil. Taşıma kapasitesini aşmayacak, korkuluk ve erişim kontrollerini yapmadan kullanmayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Platform kapasitesi nedir?",
      "Korkuluklar tam mı?",
      "Döşeme sağlam mı?",
      "Erişim güvenli mi?",
      "Yetkisiz değişiklik var mı?",
      "Platform üzerinde fazla yük var mı?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Platform onaylı",
      "Kapasite belirtilmiş",
      "Korkuluk mevcut",
      "Toe-board mevcut",
      "Döşeme sağlam",
      "Erişim güvenli",
      "Yük dengeli",
      "Yüzey temiz",
      "Modifikasyon yok",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "TEMPORARY WORK PLATFORMS TOOLBOX TALK",
    "application_subtitle": "Verification of load capacity, access and edge protection on temporary work platforms.",
    "subtitle": "Temporary does not mean lower safety standards.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent collapse, falls, access problems and overloading on temporary work platforms.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Temporary platforms are more vulnerable to uncontrolled changes because of their short-term use.",
      "Overloading can cause local collapse or instability.",
      "Missing edge protection and unsafe access can lead to serious falls."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "More tools and materials than planned were stored on a temporary platform.",
      "The deck deflected and workers lost their balance.",
      "Marked load capacity and material control would have prevented the event."
    ],
    "remember_title": "REMEMBER",
    "remember": "Temporary platforms still require proper design, inspection and control.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Platform overload.",
      "Missing guardrails or toe boards.",
      "Loose or damaged decking.",
      "Unsafe access ladders.",
      "Uneven load distribution.",
      "Unauthorised platform modification.",
      "Slippery or contaminated surfaces.",
      "Exposure to people working below."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Confirm the platform complies with approved design or site standards.",
      "Display maximum load capacity clearly.",
      "Inspect guardrails, midrails and toe boards.",
      "Confirm decking is secure and undamaged.",
      "Provide safe ladder or stair access.",
      "Distribute materials evenly.",
      "Prohibit unauthorised modifications.",
      "Keep platform surfaces clean and slip resistant.",
      "Perform a visual check before each shift.",
      "Require competent approval after damage or modification."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, this platform may be temporary but our safety standards are not. We will respect load limits and verify access and edge protection before use.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What is the platform load limit?",
      "Are guardrails complete?",
      "Is the deck secure?",
      "Is access safe?",
      "Has anyone modified the platform?",
      "Is the platform overloaded?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Platform approved",
      "Capacity displayed",
      "Guardrails installed",
      "Toe boards installed",
      "Decking secure",
      "Access safe",
      "Load distributed",
      "Surface clean",
      "No modification",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "working-near-open-edges",
  "tr": {
    "title": "AÇIK KENARLARDA ÇALIŞMA TOOLBOX TALK",
    "application_subtitle": "Korumasız kenarlar, açıklıklar ve düşme mesafelerinin kontrolü.",
    "subtitle": "Açık kenar riski birkaç adımda ölümcül düşmeye dönüşebilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Korumasız kenarlar, platform açıklıkları ve geçici korkuluk eksikliklerinden kaynaklanan düşme risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Çalışanlar rutin hareket sırasında açık kenara fark etmeden yaklaşabilir.",
      "Kenar korumasının kısa süreli kaldırılması dahi ciddi düşme riski yaratır.",
      "Kişisel düşüş durdurma ekipmanı kolektif korumanın yerine geçmemelidir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Malzeme geçişi için korkuluğun bir bölümü geçici olarak söküldü.",
      "İş tamamlandıktan sonra korkuluk yeniden takılmadı.",
      "Bir çalışan geri adım atarken açık kenara yaklaştı.",
      "Geçici bariyer ve reinstatement kontrolü riski önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Kenar koruması kaldırılıyorsa yerine eşdeğer kontrol kurulmalıdır.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Korumasız açık kenarlar.",
      "Geçici olarak sökülmüş korkuluklar.",
      "Zemin veya platform açıklıkları.",
      "Geriye doğru çalışma ve görüş kaybı.",
      "Kötü aydınlatma.",
      "Kaygan çalışma yüzeyi.",
      "Uygun olmayan ankraj.",
      "Malzeme taşıma sırasında kenara yaklaşma."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Açık kenarları sabit korkuluk sistemiyle koruyun.",
      "Korkuluk kaldırılıyorsa geçici eşdeğer bariyer kurun.",
      "Açıklıkları kapakla kapatın ve sabitleyin.",
      "Kenar yakınındaki çalışma alanını işaretleyin.",
      "Gerekliyse tam vücut kemeri ve uygun ankraj kullanın.",
      "Yürüme güzergahını açık kenardan uzak tutun.",
      "Yeterli aydınlatma sağlayın.",
      "Kaygan yüzeyleri temizleyin.",
      "Malzeme geçişlerini planlı ve kontrollü yapın.",
      "Korkuluk reinstatement kontrolü tamamlanmadan alanı serbest bırakmayın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, açık kenar gördüğümüzde bunu normal bir çalışma alanı gibi kabul etmeyeceğiz. Korkuluk yoksa ya yeniden kuracağız ya da eşdeğer koruma sağlayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bugünkü açık kenarlar nerede?",
      "Korkuluklar eksiksiz mi?",
      "Geçici kaldırılan korkuluk var mı?",
      "Ankraj gerekiyor mu?",
      "Aydınlatma yeterli mi?",
      "Reinstatement kim tarafından kontrol edilecek?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Açık kenarlar tanımlandı",
      "Korkuluklar sağlam",
      "Geçici bariyer mevcut",
      "Açıklıklar kapalı",
      "Ankraj uygun",
      "Yürüme yolu güvenli",
      "Aydınlatma yeterli",
      "Yüzey temiz",
      "Malzeme geçişi kontrollü",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "WORKING NEAR OPEN EDGES TOOLBOX TALK",
    "application_subtitle": "Control of unprotected edges, openings and fall distances.",
    "subtitle": "An unprotected edge can turn one small step into a fatal fall.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent falls from unprotected edges, platform openings and temporary guardrail removal.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Workers can approach open edges unintentionally during routine movement.",
      "Even temporary guardrail removal creates a serious fall hazard.",
      "Personal fall arrest should not replace collective protection where guardrails can be installed."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A section of guardrail was removed temporarily for material transfer.",
      "It was not reinstated after the task was completed.",
      "A worker stepping backwards approached the open edge.",
      "Temporary barriers and reinstatement control would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "If edge protection is removed, equivalent protection must immediately replace it.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Unprotected edges.",
      "Temporarily removed guardrails.",
      "Floor and platform openings.",
      "Backward movement and poor visibility.",
      "Poor lighting.",
      "Slippery surfaces.",
      "Unsuitable anchorage.",
      "Material handling near edges."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Protect open edges with fixed guardrails.",
      "Install equivalent temporary barriers when guardrails are removed.",
      "Secure covers over openings.",
      "Mark work zones near edges.",
      "Use full-body harnesses and suitable anchorage where required.",
      "Keep walking routes away from open edges.",
      "Provide sufficient lighting.",
      "Remove slip hazards.",
      "Plan material transfer activities.",
      "Do not release the area until edge protection is reinstated."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, open edges are never normal work areas. If guardrails are missing, we will restore them or provide equivalent protection before work continues.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Where are today's open edges?",
      "Are guardrails complete?",
      "Has any guardrail been removed?",
      "Is anchorage required?",
      "Is lighting adequate?",
      "Who verifies reinstatement?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Open edges identified",
      "Guardrails secure",
      "Temporary barriers installed",
      "Openings covered",
      "Anchorage suitable",
      "Walking route safe",
      "Lighting adequate",
      "Surface clean",
      "Material transfer controlled",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "scaffold-modification-control",
  "tr": {
    "title": "İSKELE MODİFİKASYON KONTROLÜ TOOLBOX TALK",
    "application_subtitle": "Yetkisiz iskele değişikliklerinin ve eksik bileşenlerin önlenmesi.",
    "subtitle": "Tek bir sökülmüş eleman bile bütün iskelenin güvenliğini etkileyebilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "İskelelerin yetkisiz değiştirilmesi, korkuluk veya çapraz elemanların sökülmesi ve etiket sisteminin geçersiz hale gelmesini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "İskele elemanları sistemin bir parçasıdır ve rastgele sökülemez.",
      "Bir korkuluk, çapraz bağlantı veya platform elemanının kaldırılması yapısal ve düşme riskini artırabilir.",
      "Modifikasyon sonrası iskele yeniden kontrol edilmeden kullanılmamalıdır."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan boru geçirmek için iskele korkuluğunu söktü.",
      "İş bittikten sonra korkuluk yerine takılmadı ve etiket durumu değiştirilmedi.",
      "Yetkili scaffold ekibi ve reinspection süreci riski önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "İskeleyi yalnız yetkili scaffold personeli değiştirebilir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yetkisiz korkuluk sökümü.",
      "Çapraz bağlantıların çıkarılması.",
      "Platform tahtalarının yer değiştirmesi.",
      "Etiket durumunun güncel olmaması.",
      "Konsol veya ek platform eklenmesi.",
      "Dengesiz yük dağılımı.",
      "Geçiş için uygunsuz boşluk oluşturulması.",
      "Modifikasyon sonrası kontrol yapılmaması."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "İskele modifikasyonunu yalnız yetkili scaffold ekibine yaptırın.",
      "Modifikasyon öncesi işi ve ihtiyacı tanımlayın.",
      "Sökülen her elemanı kontrollü şekilde kayıt altına alın.",
      "Korkuluk veya çapraz eleman söküldüğünde alanı kullanıma kapatın.",
      "Modifikasyon tamamlandıktan sonra yetkili inspection yaptırın.",
      "Etiketi güncel durumuna göre değiştirin.",
      "Geçici erişim ve düşme risklerini kontrol edin.",
      "Ek platform veya konsol yükünü tasarım açısından değerlendirin.",
      "Malzeme aktarımı için iskeleyi rastgele değiştirmeyin.",
      "Kullanıcıları değişiklikler konusunda bilgilendirin."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, iskele bizim ekipmanımız değil; sistematik bir yapıdır. Bir parçayı sökmek gerekiyorsa işi durdurup scaffold ekibini çağıracağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "İskelede sonradan değişiklik var mı?",
      "Etiket güncel mi?",
      "Korkuluk eksik mi?",
      "Çapraz elemanlar tam mı?",
      "Modifikasyonu kim yaptı?",
      "Reinspection tamamlandı mı?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Modifikasyon kontrol edildi",
      "Yetkili ekip doğrulandı",
      "Korkuluklar tam",
      "Çaprazlar tam",
      "Platform sağlam",
      "Etiket güncel",
      "Erişim güvenli",
      "Yük değerlendirilmiş",
      "Inspection tamamlandı",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "SCAFFOLD MODIFICATION CONTROL TOOLBOX TALK",
    "application_subtitle": "Prevention of unauthorised scaffold alterations and missing components.",
    "subtitle": "Removing one component can affect the safety of the entire scaffold.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent unauthorised scaffold modifications, removal of guardrails or braces and use of scaffolds after their inspection status has changed.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Scaffold components form part of a designed system and must not be removed casually.",
      "Removing a guardrail, brace or platform component can create structural and fall hazards.",
      "Modified scaffolds must be reinspected before use."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker removed a scaffold guardrail to pass pipework through.",
      "The guardrail was not reinstated and the scaffold tag remained unchanged.",
      "Using authorised scaffold personnel and reinspection would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Only authorised scaffold personnel may modify a scaffold.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Unauthorised guardrail removal.",
      "Removal of structural braces.",
      "Displaced platform boards.",
      "Outdated scaffold tag status.",
      "Added cantilevers or platforms.",
      "Uneven loading.",
      "Unsafe openings created for access.",
      "No reinspection after modification."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Allow only authorised scaffold personnel to modify scaffolds.",
      "Define the work need before modification.",
      "Control every removed component.",
      "Close the scaffold when guardrails or braces are removed.",
      "Require competent reinspection after modification.",
      "Update scaffold tags to current status.",
      "Control temporary access and fall hazards.",
      "Assess added platform or cantilever loads.",
      "Do not alter scaffolds informally for material transfer.",
      "Brief scaffold users on changes."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, scaffolds are engineered systems. If a component needs to be removed, we will stop and call the scaffold team rather than modifying it ourselves.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Has the scaffold been modified?",
      "Is the tag current?",
      "Are guardrails complete?",
      "Are braces complete?",
      "Who performed the modification?",
      "Has reinspection been completed?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Modification checked",
      "Authorised team confirmed",
      "Guardrails complete",
      "Braces complete",
      "Platform secure",
      "Tag current",
      "Access safe",
      "Load assessed",
      "Inspection completed",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "man-basket-personnel-lifting",
  "tr": {
    "title": "MAN BASKET / PERSONEL KALDIRMA TOOLBOX TALK",
    "application_subtitle": "Vinç ile personel kaldırmada ekipman, iletişim ve kurtarma kontrolleri.",
    "subtitle": "Personel kaldırma sıradan bir yük kaldırma değildir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Vinç ve personel sepeti kullanılarak yapılan kaldırmalarda düşme, sıkışma, ekipman arızası ve iletişim risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Personel kaldırma operasyonunda ekipman arızasının sonucu doğrudan insan hayatını etkiler.",
      "Sepet, vinç, sapan ve bağlantı elemanları personel kaldırmaya uygun ve sertifikalı olmalıdır.",
      "Operasyon öncesi rescue plan ve iletişim sistemi hazır olmalıdır."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir personel sepeti operasyonunda iletişim yalnız el işaretlerine bırakıldı.",
      "Sepet yapı arkasına geçtiğinde operatör ile iletişim kesildi.",
      "Radyo iletişimi ve dedicated banksman kullanılması riski önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Personel kaldırmada plan, ekipman ve iletişim yük kaldırmadan daha sıkı kontrol edilmelidir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Sepetin ani hareketi.",
      "Vinç veya rigging arızası.",
      "Kişinin sepet içinde düşmesi.",
      "Yapı ile sepet arasında sıkışma.",
      "İletişim kaybı.",
      "Uygunsuz ankraj veya harness bağlantısı.",
      "Rüzgar etkisi.",
      "Acil durumda tahliye yapılamaması."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Personel kaldırma için onaylı lift plan hazırlayın.",
      "Sepetin personel kaldırmaya uygun sertifikasını doğrulayın.",
      "Vinç, hook block ve rigging ekipmanını kontrol edin.",
      "Sepet içinde uygun ankraj ve tam vücut kemeri kullanın.",
      "Dedicated banksman ve güvenilir iletişim sağlayın.",
      "Trial lift yaparak hareket alanını doğrulayın.",
      "Sepet ile yapı arasındaki sıkışma noktalarını belirleyin.",
      "Rüzgar limitlerini kontrol edin.",
      "Acil kurtarma ve indirme planını hazır tutun.",
      "Operasyon sırasında vinç operatörünün başka görev yapmasına izin vermeyin."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, personel kaldırma yüksek riskli özel bir operasyondur. Plan, trial lift, iletişim ve rescue hazırlığı tamamlanmadan sepet hareket etmeyecek.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Lift plan onaylı mı?",
      "Sepet sertifikalı mı?",
      "Banksman kim?",
      "İletişim nasıl sağlanacak?",
      "Rescue plan hazır mı?",
      "Rüzgar limiti uygun mu?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Lift plan onaylı",
      "Sepet sertifikalı",
      "Vinç uygun",
      "Rigging uygun",
      "Harness bağlı",
      "Banksman hazır",
      "İletişim test edildi",
      "Trial lift yapıldı",
      "Rescue plan hazır",
      "Rüzgar uygun"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "MAN BASKET / PERSONNEL LIFTING TOOLBOX TALK",
    "application_subtitle": "Equipment, communication and rescue controls for crane-suspended personnel lifting.",
    "subtitle": "Personnel lifting is not a routine load lift.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent falls, crushing, equipment failure and communication loss during crane-suspended personnel basket operations.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Equipment failure during personnel lifting directly threatens human life.",
      "The basket, crane and rigging must be approved for personnel lifting.",
      "Rescue and communication arrangements must be ready before the lift."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A personnel basket operation relied only on hand signals.",
      "Communication was lost when the basket moved behind a structure.",
      "Radio communication and a dedicated banksman would have prevented the issue."
    ],
    "remember_title": "REMEMBER",
    "remember": "Personnel lifting requires stricter planning, equipment and communication controls than normal lifting.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Sudden basket movement.",
      "Crane or rigging failure.",
      "Fall inside the basket.",
      "Crushing between basket and structure.",
      "Loss of communication.",
      "Unsuitable anchorage or harness connection.",
      "Wind effects.",
      "Inability to evacuate during emergency."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Prepare an approved personnel-lifting plan.",
      "Verify personnel basket certification.",
      "Inspect crane, hook block and rigging.",
      "Use full-body harnesses connected to approved basket anchors.",
      "Provide a dedicated banksman and reliable communication.",
      "Perform a trial lift.",
      "Identify basket-to-structure pinch points.",
      "Check wind limits.",
      "Prepare emergency lowering and rescue arrangements.",
      "Keep the crane operator dedicated to the lifting operation."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, personnel lifting is a special high-risk operation. The basket will not move until planning, trial lift, communication and rescue preparations are complete.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the lift plan approved?",
      "Is the basket certified?",
      "Who is the banksman?",
      "How will communication be maintained?",
      "Is the rescue plan ready?",
      "Are wind conditions acceptable?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Lift plan approved",
      "Basket certified",
      "Crane suitable",
      "Rigging suitable",
      "Harness connected",
      "Banksman ready",
      "Communication tested",
      "Trial lift completed",
      "Rescue plan ready",
      "Wind acceptable"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "crane-outrigger-setup",
  "tr": {
    "title": "VİNÇ OUTRIGGER KURULUMU TOOLBOX TALK",
    "application_subtitle": "Zemin kapasitesi, outrigger konumu ve vinç stabilitesinin doğrulanması.",
    "subtitle": "Vinç kapasitesi kadar zeminin taşıma kapasitesi de kritiktir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Mobil vinçlerde outrigger çökmesi, zemin oturması ve dengesiz kurulum nedeniyle devrilme riskini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Outrigger reaksiyon kuvveti küçük bir alana yüksek yük aktarabilir.",
      "Dolgulu, yumuşak veya yeraltı boşluğu bulunan zeminler vinç stabilitesini bozabilir.",
      "Uygunsuz outrigger mat veya kısmi açılım kapasiteyi ciddi şekilde etkileyebilir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Vinç asfalt kenarında kuruldu ve bir outrigger yumuşak dolgu bölgesine denk geldi.",
      "Yük alındığında outrigger zemine gömülmeye başladı.",
      "Zemin kontrolü ve uygun mat kullanımı devrilme riskini önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Outrigger sağlam değilse vinç sağlam değildir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Zemin çökmesi.",
      "Outrigger ayağının kayması.",
      "Kanal veya boşluk üzerinde kurulum.",
      "Yetersiz outrigger mat.",
      "Kısmi outrigger açılımı.",
      "Eğimli zeminde kurulum.",
      "Araç trafiğinin vinç stabilitesini etkilemesi.",
      "Yağmur sonrası zemin dayanımının düşmesi."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Kurulum öncesi zemin koşullarını değerlendirin.",
      "Yeraltı hatları, kanal ve boşlukları kontrol edin.",
      "Uygun boyutta outrigger mat kullanın.",
      "Vinç seviyesini üretici limitleri içinde tutun.",
      "Outrigger açılımını load chart ile uyumlu doğrulayın.",
      "Ayakların mat merkezine düzgün oturduğunu kontrol edin.",
      "Kurulum alanını araç trafiğinden koruyun.",
      "Yükleme sırasında outrigger oturmasını gözlemleyin.",
      "Yağmur veya zemin değişimi sonrası yeniden değerlendirme yapın.",
      "Şüpheli zeminde mühendislik veya yetkili onayı alın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, vinç ne kadar güçlü olursa olsun zemin taşımazsa güvenli değildir. Outrigger konumunu ve zemini yük almadan önce doğrulayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Zemin uygun mu?",
      "Yeraltı boşluğu var mı?",
      "Mat boyutu yeterli mi?",
      "Outrigger tam açıldı mı?",
      "Vinç seviyede mi?",
      "Yağmur sonrası yeniden kontrol gerekiyor mu?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Zemin değerlendirildi",
      "Yeraltı kontrol edildi",
      "Mat uygun",
      "Outrigger konumu doğru",
      "Açılım uygun",
      "Vinç seviyede",
      "Trafik kontrolü mevcut",
      "Ayaklar merkezli",
      "Zemin kuru/stabil",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "CRANE OUTRIGGER SETUP TOOLBOX TALK",
    "application_subtitle": "Verification of ground capacity, outrigger position and crane stability.",
    "subtitle": "Ground capacity is as important as crane capacity.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent crane overturning caused by outrigger settlement, ground failure and unstable setup.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Outrigger reactions can transfer very high loads into a small ground area.",
      "Fill, soft ground and underground voids can undermine crane stability.",
      "Incorrect mats or partial outrigger extension can significantly reduce lifting capacity."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A mobile crane was set up near the edge of an asphalt area with one outrigger over soft fill.",
      "The outrigger began sinking when the load was taken.",
      "Ground assessment and suitable mats would have prevented the condition."
    ],
    "remember_title": "REMEMBER",
    "remember": "If the outrigger support is not stable, the crane is not stable.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Ground settlement.",
      "Outrigger pad sliding.",
      "Setup over drains or voids.",
      "Undersized outrigger mats.",
      "Partial outrigger extension.",
      "Setup on sloping ground.",
      "Vehicle traffic affecting stability.",
      "Reduced ground strength after rain."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Assess ground conditions before setup.",
      "Check underground services, drains and voids.",
      "Use correctly sized outrigger mats.",
      "Level the crane within manufacturer limits.",
      "Verify outrigger extension against the load chart.",
      "Centre outrigger pads on mats.",
      "Protect the setup area from traffic.",
      "Monitor outrigger settlement during lifting.",
      "Reassess after rain or ground changes.",
      "Seek engineering or competent approval when ground conditions are uncertain."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, crane capacity means nothing if the ground cannot support it. We will verify ground conditions and outrigger support before taking any load.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the ground suitable?",
      "Are underground voids present?",
      "Are mats correctly sized?",
      "Are outriggers correctly extended?",
      "Is the crane level?",
      "Is reassessment needed after rain?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Ground assessed",
      "Underground checked",
      "Mat suitable",
      "Outrigger position correct",
      "Extension correct",
      "Crane level",
      "Traffic controlled",
      "Pads centred",
      "Ground stable",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "rigging-inspection",
  "tr": {
    "title": "RIGGING EKİPMANI KONTROLÜ TOOLBOX TALK",
    "application_subtitle": "Sapan, mapa, şakıl ve kaldırma aksesuarlarının kullanım öncesi kontrolü.",
    "subtitle": "Hasarlı rigging ekipmanı küçük görünür; sonuçları büyük olabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Kaldırma aksesuarlarında aşınma, deformasyon, yanlış kapasite ve eksik sertifika kaynaklı yük düşmesi riskini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Rigging ekipmanı yükün tamamını taşır ve arıza doğrudan yük düşmesine neden olabilir.",
      "Tel halat, polyester sapan, şakıl ve mapa farklı hasar kriterlerine sahiptir.",
      "Etiketsiz veya kapasitesi bilinmeyen ekipman kullanılmamalıdır."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir polyester sapanın koruyucu kılıfında kesik görüldü ancak kullanılmaya devam edildi.",
      "Yük alındığında iç lifler hasar gördüğü için sapan koptu.",
      "Pre-use inspection ve ekipmanı karantinaya alma olayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Şüpheli rigging ekipmanı kullanmayın; karantinaya alın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Kesilmiş veya aşınmış sapan.",
      "Deforme şakıl veya mapa.",
      "Etiketsiz kaldırma aksesuarı.",
      "Yanlış WLL seçimi.",
      "Keskin kenarda korumasız sapan.",
      "Korozyon ve tel kırığı.",
      "Yanlış rigging konfigürasyonu.",
      "Sertifikası geçersiz ekipman."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Her kullanım öncesi rigging ekipmanını görsel kontrol edin.",
      "WLL etiketinin okunabilir olduğunu doğrulayın.",
      "Sapan türüne özel hasar kriterlerini uygulayın.",
      "Keskin kenarlarda koruyucu kullanın.",
      "Şakıl pimlerini doğru şekilde takın.",
      "Deforme veya çatlak ekipmanı karantinaya alın.",
      "Rigging açısını kapasite hesabında dikkate alın.",
      "Kimyasal veya ısı hasarı olan sapanları kullanmayın.",
      "Sertifika ve periyodik kontrol durumunu doğrulayın.",
      "Ekipmanı düzgün şekilde depolayın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, yükün güvenliği rigging ekipmanıyla başlar. Etiketi okunmayan, hasarlı veya şüpheli ekipman kaldırmada kullanılmayacak.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Sapan etiketi okunuyor mu?",
      "WLL yeterli mi?",
      "Keskin kenar var mı?",
      "Şakıllar sağlam mı?",
      "Hasarlı ekipman nasıl karantinaya alınacak?",
      "Sertifika geçerli mi?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Sapan kontrol edildi",
      "WLL uygun",
      "Etiket okunabilir",
      "Şakıllar sağlam",
      "Mapalar uygun",
      "Kenar koruması hazır",
      "Rigging açısı uygun",
      "Hasar yok",
      "Sertifika geçerli",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "RIGGING INSPECTION TOOLBOX TALK",
    "application_subtitle": "Pre-use inspection of slings, shackles, lifting points and lifting accessories.",
    "subtitle": "Small rigging defects can lead to major lifting failures.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent dropped loads caused by wear, deformation, incorrect capacity and invalid certification of lifting accessories.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Rigging equipment carries the entire load and failure can immediately drop the load.",
      "Wire rope, synthetic slings, shackles and lifting points have different rejection criteria.",
      "Unmarked or unidentified lifting accessories must not be used."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A synthetic sling showed a cut in its protective cover but was still used.",
      "Damaged internal fibres failed when the load was applied.",
      "Pre-use inspection and quarantine would have prevented the event."
    ],
    "remember_title": "REMEMBER",
    "remember": "Never use questionable rigging equipment; quarantine it.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Cut or abraded slings.",
      "Deformed shackles or lifting points.",
      "Missing identification tags.",
      "Incorrect WLL selection.",
      "Unprotected slings over sharp edges.",
      "Corrosion and broken wires.",
      "Incorrect rigging configuration.",
      "Expired or invalid certification."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Inspect all rigging equipment before use.",
      "Confirm WLL identification is readable.",
      "Apply rejection criteria specific to each sling type.",
      "Use edge protection where required.",
      "Install shackle pins correctly.",
      "Quarantine cracked or deformed equipment.",
      "Consider sling angle in capacity calculations.",
      "Reject slings damaged by heat or chemicals.",
      "Verify certification and periodic inspection.",
      "Store rigging equipment correctly."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, lifting safety starts with rigging condition. Any item with unreadable identification, visible damage or questionable condition will not be used.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the sling tag readable?",
      "Is the WLL sufficient?",
      "Are sharp edges present?",
      "Are shackles in good condition?",
      "How will damaged equipment be quarantined?",
      "Is certification valid?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Slings inspected",
      "WLL suitable",
      "Tags readable",
      "Shackles sound",
      "Lifting points suitable",
      "Edge protection ready",
      "Rigging angle acceptable",
      "No damage",
      "Certification valid",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "tag-line-safety",
  "tr": {
    "title": "TAG LINE GÜVENLİĞİ TOOLBOX TALK",
    "application_subtitle": "Askıdaki yükün uzaktan ve güvenli konumdan yönlendirilmesi.",
    "subtitle": "Tag line yükü kontrol etmek içindir; çalışanı yükün altına çekmek için değil.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Askıdaki yüklerin tag line ile yönlendirilmesi sırasında sıkışma, çekilme ve line-of-fire risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Tag line yanlış tutulduğunda çalışanı hareket eden yükün yönüne çekebilir.",
      "İpin ele veya vücuda sarılması ani yük hareketinde ciddi yaralanma yaratır.",
      "Tag line operatörün görüş veya iletişim eksikliğini telafi etmez."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan tag line'ı bileğine dolayarak yükü yönlendirdi.",
      "Yük rüzgarla ani hareket etti ve çalışan dengesini kaybetti.",
      "Tag line'ın serbest tutulması ve güvenli pozisyon yaralanmayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Tag line'ı asla elinize, bileğinize veya vücudunuza dolamayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "İpin ele veya bileğe dolanması.",
      "Yükün kişiyi çekmesi.",
      "Askıdaki yük ile yapı arasında sıkışma.",
      "Yük altına girme.",
      "Yetersiz uzunlukta tag line.",
      "Rüzgar etkisi.",
      "Tag line'ın ekipmana takılması.",
      "İletişim kaybı."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Uygun uzunlukta tag line kullanın.",
      "Tag line'ı vücuda dolamayın.",
      "Yükün hareket hattının dışında durun.",
      "Askıdaki yükün altına girmeyin.",
      "Sıkışma noktalarından uzak durun.",
      "Tag line'ın ekipmana takılmayacağını kontrol edin.",
      "Rüzgarlı koşullarda operasyonu yeniden değerlendirin.",
      "Banksman talimatlarına uyun.",
      "Yük kontrolsüz hareket ederse tag line'ı bırakın.",
      "Gerekli değilse tag line kullanmayın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, tag line bizi yükten uzak tutmak içindir. İpi vücudumuza dolamayacak, yükün hareket hattına girmeyecek ve kontrol kaybolursa ipi bırakacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Tag line gerçekten gerekli mi?",
      "Uzunluğu uygun mu?",
      "Nerede duracağız?",
      "Sıkışma noktası var mı?",
      "Rüzgar etkisi var mı?",
      "Yük kontrolsüz hareket ederse ne yapacağız?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Tag line uygun",
      "Uzunluk yeterli",
      "Pozisyon güvenli",
      "Line-of-fire dışında",
      "Sıkışma noktaları biliniyor",
      "Yük altına giriş yok",
      "Rüzgar uygun",
      "Banksman hazır",
      "İletişim açık",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "TAG LINE SAFETY TOOLBOX TALK",
    "application_subtitle": "Control of suspended loads from a safe distance.",
    "subtitle": "A tag line controls the load; it should never pull the worker into danger.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent entanglement, pulling and line-of-fire exposure while controlling suspended loads with tag lines.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Incorrect tag-line handling can pull a worker toward a moving load.",
      "Wrapping rope around the hand or body can cause serious injury during sudden movement.",
      "A tag line does not compensate for poor communication or operator visibility."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker wrapped the tag line around his wrist while guiding a load.",
      "The load moved suddenly in the wind and pulled him off balance.",
      "Keeping the line free and maintaining safe position would have prevented the incident."
    ],
    "remember_title": "REMEMBER",
    "remember": "Never wrap a tag line around your hand, wrist or body.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Rope wrapped around hand or wrist.",
      "Load pulling the worker.",
      "Crushing between load and structure.",
      "Standing beneath suspended loads.",
      "Tag line too short.",
      "Wind effects.",
      "Tag line snagging on equipment.",
      "Communication loss."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Use a tag line of suitable length.",
      "Never wrap the line around the body.",
      "Stand outside the load movement path.",
      "Never stand beneath suspended loads.",
      "Stay clear of pinch points.",
      "Ensure the line cannot snag on equipment.",
      "Reassess lifting during strong wind.",
      "Follow banksman instructions.",
      "Release the tag line if the load becomes uncontrolled.",
      "Do not use tag lines where they are not required."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, tag lines are designed to keep us away from the load. We will not wrap them around ourselves and we will release them if load control is lost.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is a tag line required?",
      "Is the length suitable?",
      "Where will we stand?",
      "Are pinch points present?",
      "Will wind affect the load?",
      "What do we do if the load becomes uncontrolled?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Tag line suitable",
      "Length adequate",
      "Position safe",
      "Outside line of fire",
      "Pinch points understood",
      "No access under load",
      "Wind acceptable",
      "Banksman ready",
      "Communication clear",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "load-stability-center-of-gravity",
  "tr": {
    "title": "YÜK STABİLİTESİ VE AĞIRLIK MERKEZİ TOOLBOX TALK",
    "application_subtitle": "Ağırlık merkezi, rigging noktaları ve yük davranışının değerlendirilmesi.",
    "subtitle": "Yük dengeli görünse bile ağırlık merkezi beklenmedik yerde olabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Kaldırma sırasında ağırlık merkezi hatası, yük dönmesi, kayması ve dengesiz yükleme risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Ağırlık merkezi hook altında değilse yük kaldırıldığında dönebilir veya eğilebilir.",
      "Asimetrik ekipman ve içindeki sıvılar yük davranışını değiştirebilir.",
      "Trial lift ağırlık merkezini doğrulamanın en önemli yöntemlerinden biridir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Asimetrik bir ekipman nominal merkezinden rig edildi.",
      "Yük yerden kesildiğinde bir taraf hızla aşağı indi.",
      "Ağırlık merkezi değerlendirmesi ve düşük seviyeli trial lift olayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Yük yerden kesilmeden önce ağırlık merkezini düşünün; yerden kesildikten sonra gözlemleyin.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yanlış ağırlık merkezi.",
      "Asimetrik yük dağılımı.",
      "Yükün ani dönmesi.",
      "Rigging kayması.",
      "İç sıvının hareketi.",
      "Yanlış kaldırma noktası.",
      "Yetersiz trial lift.",
      "Yük altında personel bulunması."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Yük ağırlığını ve ağırlık merkezini belirleyin.",
      "Onaylı lifting point kullanın.",
      "Rigging konfigürasyonunu ağırlık merkezine göre ayarlayın.",
      "Düşük yükseklikte trial lift yapın.",
      "Yük davranışını trial lift sırasında gözlemleyin.",
      "Asimetrik yüklerde ek rigging kontrolü yapın.",
      "Sıvı içeren ekipmanlarda içerik hareketini değerlendirin.",
      "Tag line kullanımı gerekiyorsa güvenli şekilde planlayın.",
      "Yük dengeli değilse kaldırmaya devam etmeyin.",
      "Askıdaki yük altında kimse bulunmasın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, yükü sadece ağırlığına göre değil ağırlık merkezine göre kaldıracağız. Trial lift sırasında yük dengesizse durup riggingi yeniden ayarlayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Ağırlık merkezi nerede?",
      "Lifting point uygun mu?",
      "Yük asimetrik mi?",
      "Trial lift yapılacak mı?",
      "İçinde sıvı var mı?",
      "Yük dengesiz çıkarsa ne yapacağız?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Yük ağırlığı biliniyor",
      "Ağırlık merkezi değerlendirildi",
      "Lifting point uygun",
      "Rigging doğru",
      "Trial lift planlı",
      "Yük davranışı gözlenecek",
      "Asimetri değerlendirildi",
      "Sıvı hareketi değerlendirildi",
      "Alt alan boş",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "LOAD STABILITY AND CENTER OF GRAVITY TOOLBOX TALK",
    "application_subtitle": "Assessment of center of gravity, lifting points and load behaviour.",
    "subtitle": "A load may appear balanced while its center of gravity is somewhere unexpected.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent rotation, shifting and instability caused by incorrect center-of-gravity assessment during lifting.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "If the center of gravity is not beneath the hook, the load can tilt or rotate when lifted.",
      "Asymmetrical equipment and internal liquids can change load behaviour.",
      "A trial lift is one of the most effective methods for verifying stability."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "An asymmetrical item was rigged from its geometric centre.",
      "One side dropped rapidly as the load cleared the ground.",
      "Center-of-gravity assessment and a low trial lift would have prevented the condition."
    ],
    "remember_title": "REMEMBER",
    "remember": "Think about the center of gravity before lifting and observe it during the trial lift.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Incorrect center of gravity.",
      "Uneven load distribution.",
      "Sudden load rotation.",
      "Rigging slippage.",
      "Movement of internal liquids.",
      "Incorrect lifting points.",
      "Inadequate trial lift.",
      "People beneath the load."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Determine load weight and center of gravity.",
      "Use approved lifting points.",
      "Configure rigging around the center of gravity.",
      "Perform a low-height trial lift.",
      "Observe load behaviour during the trial lift.",
      "Apply additional rigging control for asymmetrical loads.",
      "Assess movement of liquids inside equipment.",
      "Plan safe tag-line use where required.",
      "Stop lifting if the load is unstable.",
      "Keep all personnel clear of suspended loads."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, we will lift according to both load weight and center of gravity. If the load is unstable during the trial lift, we will stop and re-rig.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Where is the center of gravity?",
      "Are lifting points suitable?",
      "Is the load asymmetrical?",
      "Will a trial lift be performed?",
      "Does the load contain liquid?",
      "What will we do if the load is unstable?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Load weight known",
      "Center of gravity assessed",
      "Lifting points suitable",
      "Rigging correct",
      "Trial lift planned",
      "Load behaviour monitored",
      "Asymmetry assessed",
      "Liquid movement assessed",
      "Area below clear",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "forklift-loading-unloading",
  "tr": {
    "title": "FORKLİFT YÜKLEME VE BOŞALTMA TOOLBOX TALK",
    "application_subtitle": "Yük dengesi, rampa, araç hareketi ve yaya ayrımının kontrolü.",
    "subtitle": "Yükleme alanı forklift, araç ve yaya hareketlerinin kesiştiği yüksek riskli bölgedir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Forklift ile yükleme ve boşaltma sırasında devrilme, yük düşmesi, araç hareketi ve yaya çarpması risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Forklift dengesi yük ağırlığına, yük merkezine ve mast konumuna bağlıdır.",
      "Kamyon veya treyler hareket ederse forklift ile araç arasında ciddi çökme veya düşme riski oluşabilir.",
      "Yaya ve forklift yollarının ayrılmaması çarpışma riskini artırır."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Forklift treyler içine girdiği sırada sürücü aracın hazır olduğunu düşündü.",
      "Treyler hareket etmeye başladı ve forklift rampa kenarında kaldı.",
      "Wheel chock, sürücü iletişimi ve loading lock sistemi olayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Araç sabitlenmeden forklift yükleme alanına girmemelidir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Forklift devrilmesi.",
      "Yükün çataldan düşmesi.",
      "Kamyon veya treylerin hareket etmesi.",
      "Dock plate veya rampanın kayması.",
      "Yaya ile forklift çarpışması.",
      "Görüşü kapatan yüksek yük.",
      "Aşırı veya dengesiz yük.",
      "Islak veya hasarlı yükleme zemini."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Yük ağırlığını ve forklift kapasitesini doğrulayın.",
      "Yük merkezini çatallara düzgün yerleştirin.",
      "Kamyon veya treyleri wheel chock veya uygun sistemle sabitleyin.",
      "Dock plate kapasitesini kontrol edin.",
      "Yaya ve forklift yollarını ayırın.",
      "Görüşü engelleyen yüklerde geri sürüş veya spotter kullanın.",
      "Çatalları mümkün olduğunca alçakta tutun.",
      "Rampalarda ani dönüş yapmayın.",
      "Yükleme zemininin sağlam ve temiz olduğunu doğrulayın.",
      "Sürücü ile yükleme tamamlanmadan araç hareket etmeme kuralını netleştirin."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, yükleme alanında forklift kadar kamyonun hareketi de kontrol edilmelidir. Araç sabit değilse yükleme başlamayacak.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Yük forklift kapasitesine uygun mu?",
      "Araç sabitlendi mi?",
      "Dock plate uygun mu?",
      "Yaya yolu ayrılmış mı?",
      "Görüş yeterli mi?",
      "Sürücü ile iletişim kuruldu mu?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Forklift kapasitesi uygun",
      "Yük dengeli",
      "Araç sabit",
      "Wheel chock mevcut",
      "Dock plate uygun",
      "Yaya yolu ayrılmış",
      "Görüş yeterli",
      "Zemin sağlam",
      "Sürücü bilgilendirildi",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "FORKLIFT LOADING AND UNLOADING TOOLBOX TALK",
    "application_subtitle": "Control of load stability, docks, vehicle movement and pedestrian separation.",
    "subtitle": "Loading areas combine forklift, vehicle and pedestrian movement in one high-risk zone.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent overturning, dropped loads, vehicle movement and pedestrian impact during forklift loading and unloading.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Forklift stability depends on load weight, load centre and mast position.",
      "Trailer movement can create severe fall or collapse hazards while a forklift is inside.",
      "Failure to separate pedestrians and forklifts increases collision risk."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A forklift entered a trailer while the driver believed loading was complete.",
      "The trailer began moving with the forklift still at the dock edge.",
      "Wheel chocks, driver communication and a loading-lock system would have prevented the event."
    ],
    "remember_title": "REMEMBER",
    "remember": "Do not enter a loading vehicle until it has been secured against movement.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Forklift overturning.",
      "Loads falling from forks.",
      "Truck or trailer movement.",
      "Dock plate movement.",
      "Pedestrian collision.",
      "Loads blocking visibility.",
      "Overloaded or unstable loads.",
      "Wet or damaged loading surfaces."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Verify load weight against forklift capacity.",
      "Position the load centre correctly on the forks.",
      "Secure trucks or trailers with wheel chocks or approved systems.",
      "Check dock-plate capacity.",
      "Separate pedestrian and forklift routes.",
      "Use reverse travel or a spotter when visibility is restricted.",
      "Keep forks as low as practical during travel.",
      "Avoid sudden turns on ramps.",
      "Confirm loading surfaces are clean and structurally sound.",
      "Ensure drivers understand not to move until loading is formally complete."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, loading safety depends on controlling both the forklift and the vehicle. If the truck or trailer is not secured, loading will not begin.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the load within forklift capacity?",
      "Is the vehicle secured?",
      "Is the dock plate suitable?",
      "Are pedestrian routes separated?",
      "Is visibility adequate?",
      "Has the driver been briefed?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Forklift capacity suitable",
      "Load stable",
      "Vehicle secured",
      "Wheel chocks installed",
      "Dock plate suitable",
      "Pedestrian routes separated",
      "Visibility adequate",
      "Surface sound",
      "Driver briefed",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
}

,
{
  "slug": "stored-energy-hydraulic-systems",
  "tr": {
    "title": "DEPOLANMIŞ ENERJİ VE HİDROLİK SİSTEMLER TOOLBOX TALK",
    "application_subtitle": "Hidrolik basınç, akümülatör ve hareketli ekipmanlarda kalan enerjinin kontrolü.",
    "subtitle": "Ekipman durmuş olabilir; sistem içindeki enerji hâlâ tehlikeli olabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Hidrolik sistemlerde kalan basınç, akümülatör enerjisi ve kontrolsüz ekipman hareketlerinden kaynaklanan yaralanmaları önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Hidrolik sistemlerde pompa durmuş olsa bile hortum, manifold, silindir ve akümülatör içinde tehlikeli seviyede basınç kalabilir.",
      "Silindir veya askıda tutulan ekipman, hidrolik basınç kaybolduğunda yerçekimi nedeniyle ani hareket edebilir ve çalışanı sıkıştırabilir.",
      "Akümülatörler sistemi kapattıktan sonra bile enerji depolamaya devam edebilir; bu nedenle yalnız ana şalteri kapatmak yeterli değildir.",
      "Basınçlı yağ kaçağı çok ince bir jet halinde olabilir ve cildi delerek ciddi enjeksiyon yaralanmasına neden olabilir.",
      "Bakım öncesinde tüm enerji kaynaklarının tanımlanması, basıncın boşaltılması ve mekanik destek kurulması zorunludur."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bakım ekibi bir hidrolik silindir hattını makine durdurulduktan sonra sökmeye başladı.",
      "Operatör pompayı kapattığı için sistemde enerji kalmadığını düşündü.",
      "Bağlantı gevşetildiğinde trapped pressure nedeniyle yağ yüksek hızla dışarı çıktı ve yakın çalışanın eline yöneldi.",
      "Akümülatör izolasyonu, kontrollü basınç boşaltma ve zero-energy verification uygulanmış olsaydı maruziyet önlenebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Makinenin kapalı olması sıfır enerji anlamına gelmez.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Hidrolik hat içinde kalan basınç.",
      "Akümülatörde depolanmış enerji.",
      "Silindirin ani hareketi.",
      "Yükün kontrolsüz düşmesi.",
      "Basınçlı yağ enjeksiyon yaralanması.",
      "Hortum veya fitting ayrılması.",
      "Yanlış izolasyon.",
      "Enerji boşaltılmadan bakım yapılması."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Enerji kaynaklarını tanımlayın.",
      "LOTO uygulayın.",
      "Hidrolik basıncı güvenli şekilde boşaltın.",
      "Akümülatörleri üretici prosedürüne göre izole edin.",
      "Yükleri mekanik olarak destekleyin.",
      "Basınç göstergesini sıfır enerji için tek kanıt olarak kabul etmeyin.",
      "Hortum ve fittingleri açmadan önce enerji durumunu doğrulayın.",
      "Basınçlı kaçakları elle kontrol etmeyin.",
      "Bakım sonrası koruyucuları ve sistem bütünlüğünü kontrol edin.",
      "Restart öncesi ekipte kimse olmadığını doğrulayın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, makine durmuş olsa bile hidrolik sistem enerji tutabilir. Bugün bakım öncesi yalnız ana enerjiyi kesmekle yetinmeyeceğiz; akümülatörü, silindiri ve hattaki trapped pressure durumunu kontrol edecek, yükleri mekanik olarak destekleyecek ve sıfır enerjiyi fiziksel olarak doğrulayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Sistemde hangi enerji kaynakları var?",
      "Akümülatör mevcut mu?",
      "Basınç nasıl boşaltılacak?",
      "Yük mekanik olarak destekli mi?",
      "LOTO tamamlandı mı?",
      "Restart yetkisini kim verecek?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Enerji kaynakları tanımlandı",
      "LOTO tamamlandı",
      "Basınç boşaltıldı",
      "Akümülatör izole",
      "Yük destekli",
      "Hortumlar güvenli",
      "Kaçak kontrol yöntemi uygun",
      "Sıfır enerji doğrulandı",
      "Koruyucular hazır",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "STORED ENERGY AND HYDRAULIC SYSTEMS TOOLBOX TALK",
    "application_subtitle": "Control of residual hydraulic pressure, accumulators and stored mechanical energy.",
    "subtitle": "The machine may be stopped while dangerous energy remains in the system.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent injury from residual hydraulic pressure, accumulator energy and unexpected equipment movement.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Hydraulic systems can retain hazardous pressure in hoses, manifolds, cylinders and accumulators even after the pump has stopped.",
      "Suspended or supported equipment can move suddenly when hydraulic pressure is lost, creating serious crush hazards.",
      "Accumulators can retain stored energy after shutdown, so isolating only the main power source is not sufficient.",
      "High-pressure hydraulic leaks can form a fine jet capable of penetrating skin and causing severe injection injuries.",
      "Before maintenance, all energy sources must be identified, pressure released and moving loads mechanically secured."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A maintenance team began disconnecting a hydraulic cylinder line after the machine had been shut down.",
      "The operator assumed the system was safe because the hydraulic pump was no longer running.",
      "When the fitting was loosened, trapped pressure released oil at high velocity toward a worker's hand.",
      "Accumulator isolation, controlled pressure release and zero-energy verification would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Machine shutdown does not automatically mean zero energy.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Residual hydraulic pressure.",
      "Stored accumulator energy.",
      "Unexpected cylinder movement.",
      "Uncontrolled load descent.",
      "Hydraulic injection injury.",
      "Hose or fitting separation.",
      "Incorrect isolation.",
      "Maintenance before energy release."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify all energy sources.",
      "Apply LOTO.",
      "Release hydraulic pressure safely.",
      "Isolate accumulators according to procedure.",
      "Mechanically support suspended loads.",
      "Do not rely solely on pressure gauges.",
      "Verify energy status before opening hoses.",
      "Never check high-pressure leaks by hand.",
      "Verify system integrity after maintenance.",
      "Confirm personnel are clear before restart."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, shutdown does not guarantee zero hydraulic energy. Before maintenance we will identify accumulators, trapped pressure and moving loads, mechanically secure equipment and physically verify that all stored energy has been released.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What energy sources are present?",
      "Is an accumulator installed?",
      "How will pressure be released?",
      "Is the load mechanically supported?",
      "Is LOTO complete?",
      "Who authorises restart?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Energy sources identified",
      "LOTO complete",
      "Pressure released",
      "Accumulator isolated",
      "Load supported",
      "Hoses safe",
      "Leak method suitable",
      "Zero energy verified",
      "Guards ready",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "high-pressure-water-jetting",
  "tr": {
    "title": "YÜKSEK BASINÇLI SU JETİ TOOLBOX TALK",
    "application_subtitle": "Water jetting ekipmanlarında kesilme, enjeksiyon ve hortum hareketi risklerinin kontrolü.",
    "subtitle": "Yüksek basınçlı su, metal kesebilecek kadar enerji taşıyabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Yüksek basınçlı su jeti çalışmalarında ciddi kesilme, enjeksiyon yaralanması, hortum savrulması ve kontrol kaybını önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Yüksek basınçlı su jetleri deri ve dokuyu kesebilecek, hatta kemiğe kadar ilerleyebilecek enerji seviyelerine ulaşabilir.",
      "Hortum, nozzle veya bağlantı arızası meydana geldiğinde stored energy ekipmanın kontrolsüz şekilde hareket etmesine neden olabilir.",
      "Operatörün dengesini kaybetmesi veya tetik kontrolünü yitirmesi jetin çalışanlara veya ekipmana yönelmesine yol açabilir.",
      "Su enjeksiyon yaralanmaları dışarıdan küçük görünse bile doku altında ciddi hasar oluşturabilir ve acil tıbbi değerlendirme gerektirir.",
      "Alan kontrolü, deadman sistemi, uygun PPE ve güvenli nozzle pozisyonu birlikte uygulanmalıdır."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Operatör dar bir alanda nozzle yönünü değiştirirken ayağının altındaki ıslak yüzeyde dengesini kaybetti.",
      "Refleks olarak elini hareket ettirdi ve jet birkaç saniye boyunca kontrolsüz yönde kaldı.",
      "Deadman sistemi devreye girmesine rağmen çevredeki çalışanlar exclusion zone sınırına çok yakındı.",
      "Daha geniş bariyerleme, kaymaz çalışma alanı ve önceden belirlenmiş body position maruziyeti azaltabilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Basınçlı jet hiçbir zaman insan vücuduna yöneltilmemelidir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Jet ile kesilme.",
      "Enjeksiyon yaralanması.",
      "Hortum whipping.",
      "Nozzle kontrol kaybı.",
      "Kaygan çalışma zemini.",
      "Yüksek gürültü.",
      "Uygunsuz PPE.",
      "Yetkisiz kişilerin çalışma alanına girmesi."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Alanı bariyerleyin.",
      "Deadman control sistemini test edin.",
      "Hortum ve bağlantıları kontrol edin.",
      "Uygun basınç sınıfı kullanın.",
      "Jet hattından vücudu uzak tutun.",
      "Uygun yüz, el, ayak ve vücut koruması kullanın.",
      "Kaygan yüzeyleri kontrol altında tutun.",
      "Gürültü koruması sağlayın.",
      "Basınç boşaltılmadan ekipmana müdahale etmeyin.",
      "Enjeksiyon şüphesinde acil tıbbi yardım alın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, yüksek basınçlı suyu normal temizlik ekipmanı gibi görmeyeceğiz. Jet hattını insanlardan uzak tutacak, deadman kontrolünü devre dışı bırakmayacak, hortum ve bağlantıları basınç vermeden önce kontrol edecek ve alanı tamamen izole edeceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Çalışma basıncı nedir?",
      "Deadman çalışıyor mu?",
      "Hortumlar sağlam mı?",
      "Alan bariyerli mi?",
      "PPE uygun mu?",
      "Enjeksiyon yaralanmasında ne yapacağız?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Alan bariyerli",
      "Deadman test edildi",
      "Hortum sağlam",
      "Bağlantılar güvenli",
      "Basınç uygun",
      "PPE uygun",
      "Gürültü koruması mevcut",
      "Zemin güvenli",
      "Basınç boşaltma yöntemi açık",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "HIGH-PRESSURE WATER JETTING TOOLBOX TALK",
    "application_subtitle": "Control of cutting, injection and hose hazards during high-pressure water jetting.",
    "subtitle": "High-pressure water can carry enough energy to cut metal and tissue.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent severe cutting, injection injury, hose whipping and loss of control during high-pressure water jetting.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "High-pressure water jets can reach energy levels capable of cutting skin, soft tissue and potentially reaching bone.",
      "Hose, nozzle or fitting failure can release stored energy and cause uncontrolled equipment movement.",
      "Loss of footing or trigger control can direct the jet toward people, structures or equipment.",
      "Water-injection injuries may appear minor externally while causing severe internal tissue damage requiring urgent medical treatment.",
      "Effective control requires barricading, functional deadman controls, suitable PPE and safe nozzle positioning."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "An operator repositioned a nozzle inside a restricted area and slipped on a wet surface.",
      "The sudden movement caused the jet to remain uncontrolled for several seconds.",
      "The deadman control stopped the pressure, but nearby workers had been standing close to the exclusion-zone boundary.",
      "A larger exclusion zone, slip control and planned operator positioning would have reduced the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Never direct a pressurised jet toward any part of the body.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Jet cutting injuries.",
      "Injection injuries.",
      "Hose whipping.",
      "Loss of nozzle control.",
      "Slippery surfaces.",
      "High noise.",
      "Inadequate PPE.",
      "Unauthorised access."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Barricade the work area.",
      "Test deadman controls.",
      "Inspect hoses and fittings.",
      "Use correctly rated equipment.",
      "Keep the body outside the jet path.",
      "Wear suitable face, hand, foot and body protection.",
      "Control slippery surfaces.",
      "Provide hearing protection.",
      "Depressurise before intervention.",
      "Seek urgent medical attention for suspected injection injuries."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, high-pressure water jetting is a high-energy activity, not routine cleaning. We will maintain full area control, test deadman systems, inspect hoses and keep every person outside the jet path before pressure is applied.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What pressure are we using?",
      "Does the deadman control work?",
      "Are hoses in good condition?",
      "Is the area barricaded?",
      "Is PPE suitable?",
      "What happens after a suspected injection injury?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Area barricaded",
      "Deadman tested",
      "Hose sound",
      "Connections secure",
      "Pressure suitable",
      "PPE suitable",
      "Hearing protection available",
      "Surface safe",
      "Depressurisation method clear",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "flange-joint-integrity",
  "tr": {
    "title": "FLANŞ VE BAĞLANTI BÜTÜNLÜĞÜ TOOLBOX TALK",
    "application_subtitle": "Flanş, conta ve cıvatalı bağlantıların doğru montaj ve sıkma kontrolü.",
    "subtitle": "Küçük bir bağlantı hatası büyük bir proses kaçağına dönüşebilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Flanşlı ve cıvatalı bağlantılarda yanlış conta, uygunsuz tork ve hizasız montaj nedeniyle oluşabilecek proses kaçaklarını önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Flanş bütünlüğü yalnız cıvataların sıkı olmasına değil; conta seçimi, yüzey kondisyonu, hizalama ve doğru tightening sequence uygulanmasına bağlıdır.",
      "Hizasız flanşı cıvatalarla zorlayarak kapatmak boru sisteminde sürekli mekanik stres ve erken kaçak riski yaratabilir.",
      "Yanlış bolt grade veya uygunsuz lubrication gerçek sıkma kuvvetinin hesaplanandan farklı olmasına neden olabilir.",
      "Flange face üzerindeki çizik, korozyon veya eski conta kalıntısı yeni contanın düzgün oturmasını engelleyebilir.",
      "İlk basınçlandırma sırasında çalışanlar potansiyel kaçak hattından uzak tutulmalı ve bağlantı kontrollü şekilde izlenmelidir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bakım sonrası flanş bağlantısı hızlı şekilde kapatıldı ve ekip vardiya değişimine yetişmeye çalıştı.",
      "Cıvatalar cross-pattern yerine sırayla sıkıldı ve iki tarafta farklı preload oluştu.",
      "Hat basınca alındığında flanşın bir tarafında sızıntı başladı.",
      "Doğru gasket verification, calibrated torque tool ve onaylı tightening sequence ile olay önlenebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Flanşı cıvatalarla hizaya zorlamayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Yanlış conta kullanımı.",
      "Hasarlı flange face.",
      "Hizasız bağlantı.",
      "Yanlış bolt grade.",
      "Uygunsuz tork.",
      "Düzensiz sıkma.",
      "Eksik veya hasarlı cıvata.",
      "Basınç altında kaçak."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Doğru conta tipini doğrulayın.",
      "Flange face yüzeyini kontrol edin.",
      "Hizalamayı bağlantı öncesi doğrulayın.",
      "Doğru cıvata ve somun sınıfı kullanın.",
      "Kalibre edilmiş tork anahtarı kullanın.",
      "Onaylı sıkma sırasını uygulayın.",
      "Gerekli lubrication şartlarını uygulayın.",
      "Tork kayıtlarını tutun.",
      "Basınçlandırma öncesi final inspection yapın.",
      "İlk basınçlandırmayı kontrollü ve exclusion zone ile yapın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, flanş işi cıvataları sıkıp bitirmek değildir. Conta tipini, flange face durumunu, hizalamayı, bolt grade'i ve tork sırasını kontrol edeceğiz; final inspection tamamlanmadan hattı basınca vermeyeceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Conta doğru mu?",
      "Flange face sağlam mı?",
      "Hizalama uygun mu?",
      "Tork değeri nedir?",
      "Tork anahtarı kalibre mi?",
      "Final inspection kim yapacak?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Conta doğru",
      "Flange face sağlam",
      "Hizalama uygun",
      "Bolt grade doğru",
      "Cıvatalar sağlam",
      "Tork anahtarı kalibre",
      "Sıkma sırası doğru",
      "Tork kaydı mevcut",
      "Final inspection tamam",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "FLANGE AND JOINT INTEGRITY TOOLBOX TALK",
    "application_subtitle": "Correct assembly and tightening of flanges, gaskets and bolted joints.",
    "subtitle": "A small joint error can become a major process leak.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent process leaks caused by incorrect gaskets, misalignment, unsuitable bolts and incorrect tightening.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Flange integrity depends on gasket selection, flange-face condition, alignment and the correct tightening sequence, not simply on bolts feeling tight.",
      "Using bolts to pull misaligned flanges together can create permanent mechanical stress and increase leakage risk.",
      "Incorrect bolt grade or lubrication can produce a clamping force very different from the intended torque value.",
      "Scratches, corrosion or old gasket residue on flange faces can prevent the new gasket from sealing correctly.",
      "During first pressurisation, personnel must remain clear of the potential leak path while the joint is monitored."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A flange was reassembled quickly after maintenance to meet a shift-change deadline.",
      "Bolts were tightened sequentially rather than using the approved cross-pattern, creating uneven preload.",
      "When the line was pressurised, leakage developed on one side of the joint.",
      "Correct gasket verification, calibrated torque tools and an approved tightening sequence would have prevented the leak."
    ],
    "remember_title": "REMEMBER",
    "remember": "Never force flange alignment using the bolts.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Incorrect gasket.",
      "Damaged flange faces.",
      "Misalignment.",
      "Incorrect bolt grade.",
      "Incorrect torque.",
      "Uneven tightening.",
      "Missing or damaged bolts.",
      "Leakage under pressure."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Verify the correct gasket.",
      "Inspect flange faces.",
      "Confirm alignment before assembly.",
      "Use correct bolt and nut grades.",
      "Use calibrated torque tools.",
      "Follow the approved tightening sequence.",
      "Apply required lubrication conditions.",
      "Record torque values.",
      "Perform final inspection before pressure.",
      "Control first pressurisation with an exclusion zone."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, flange integrity is more than tightening bolts. We will verify the gasket, flange faces, alignment, bolt grade and tightening sequence, and the system will not be pressurised until final inspection is complete.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the gasket correct?",
      "Are flange faces sound?",
      "Is alignment acceptable?",
      "What is the torque value?",
      "Is the torque tool calibrated?",
      "Who performs final inspection?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Gasket correct",
      "Flange faces sound",
      "Alignment acceptable",
      "Bolt grade correct",
      "Bolts sound",
      "Torque tool calibrated",
      "Sequence correct",
      "Torque record available",
      "Final inspection complete",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "chemical-transfer-decanting",
  "tr": {
    "title": "KİMYASAL TRANSFER VE AKTARMA TOOLBOX TALK",
    "application_subtitle": "Kimyasalların kaplar arasında güvenli aktarımı ve dökülme kontrolü.",
    "subtitle": "Yanlış kaba aktarılan kimyasal hem maruziyet hem reaksiyon riski yaratabilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Kimyasal transfer sırasında sıçrama, yanlış kap kullanımı, reaksiyon, dökülme ve yanlış etiketleme risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Kimyasal transfer sırasında sistem açık hale geldiği için sıçrama, buhar ve doğrudan temas riski normal depolamaya göre artar.",
      "Yanlış transfer pompası, hortum veya kap malzemesi kimyasal ile reaksiyona girebilir ya da kısa sürede hasar görebilir.",
      "Yanıcı sıvılarda statik elektrik kontrol edilmezse transfer sırasında tutuşturucu kıvılcım oluşabilir.",
      "İkincil kaplara aktarılan kimyasallar ürün adı ve tehlike bilgisi olmadan bırakılırsa sonraki kullanıcı yanlış kimyasala maruz kalabilir.",
      "Transfer alanında spill containment, uygun PPE ve acil göz/yüz yıkama imkanları hazır olmalıdır."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Operatör büyük varildeki kimyasalı daha küçük bir çalışma kabına aktardı.",
      "Yeni kap uygun görünmesine rağmen üzerinde ürün etiketi yoktu ve önceki kullanım geçmişi bilinmiyordu.",
      "Bir sonraki vardiyada çalışan kabı başka bir ürün sanarak farklı proseste kullanmaya hazırlandı.",
      "Önceden etiketlenmiş uyumlu kap ve kontrollü transfer prosedürü yanlış kullanımı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Etiketsiz kimyasal kabı kullanılmamalıdır.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Kimyasal sıçrama.",
      "Buhar solunması.",
      "Uyumsuz kimyasal reaksiyonu.",
      "Yanlış kap kullanımı.",
      "Etiketsiz ikincil kap.",
      "Statik elektrik.",
      "Dökülme.",
      "Uygunsuz PPE."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "SDS'i kontrol edin.",
      "Kimyasal uyumluluğunu doğrulayın.",
      "Uygun transfer ekipmanı kullanın.",
      "İkincil kabı önceden etiketleyin.",
      "Gerekliyse bonding/grounding uygulayın.",
      "Sıçrama koruması sağlayın.",
      "Uygun eldiven, gözlük ve yüz siperi kullanın.",
      "Spill kit hazır bulundurun.",
      "Transfer sonrası kapları kapatın.",
      "Atıkları uygun şekilde yönetin."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, kimyasal transferde ürünün kimliğini hiçbir aşamada kaybetmeyeceğiz. Uygun kap ve transfer ekipmanı kullanacak, gerekiyorsa bonding/grounding sağlayacak, ikincil kabı önceden etiketleyecek ve dökülmeye hazır olacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "SDS mevcut mu?",
      "Kimyasallar uyumlu mu?",
      "Kap uygun mu?",
      "Etiket hazır mı?",
      "Spill kit nerede?",
      "Hangi PPE gerekli?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "SDS mevcut",
      "Uyumluluk kontrol edildi",
      "Transfer ekipmanı uygun",
      "Kap uygun",
      "Etiket mevcut",
      "Bonding değerlendirildi",
      "PPE uygun",
      "Spill kit hazır",
      "Alan havalandırılmış",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "CHEMICAL TRANSFER AND DECANTING TOOLBOX TALK",
    "application_subtitle": "Safe transfer of chemicals between containers and control of spills.",
    "subtitle": "Chemical transfer can create exposure, reaction and identification hazards.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent splashes, incompatible reactions, spills, incorrect containers and missing labels during chemical transfer.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Chemical transfer creates an open handling step, increasing the potential for splashes, vapour release and direct contact.",
      "Incorrect pumps, hoses or container materials may react with the chemical or deteriorate during use.",
      "Flammable-liquid transfer can generate static electricity and ignition if bonding and grounding controls are not applied.",
      "Secondary containers without product identification can expose later users to the wrong chemical.",
      "Spill containment, suitable PPE and emergency washing facilities should be ready before transfer begins."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "An operator transferred chemical from a large drum into a smaller work container.",
      "The secondary container appeared suitable but had no label and its previous use was unknown.",
      "During the next shift, another worker prepared to use the container believing it held a different product.",
      "Using a pre-labelled compatible container and controlled transfer process would have prevented the error."
    ],
    "remember_title": "REMEMBER",
    "remember": "Never use an unlabelled chemical container.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Chemical splash.",
      "Vapour inhalation.",
      "Incompatible reactions.",
      "Incorrect container use.",
      "Unlabelled secondary containers.",
      "Static electricity.",
      "Spills.",
      "Inadequate PPE."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Review the SDS.",
      "Confirm chemical compatibility.",
      "Use suitable transfer equipment.",
      "Label secondary containers before use.",
      "Apply bonding and grounding where required.",
      "Provide splash protection.",
      "Wear suitable gloves, goggles and face protection.",
      "Keep spill kits ready.",
      "Close containers after transfer.",
      "Manage waste correctly."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, chemical identity must be maintained throughout the transfer. We will use compatible equipment, apply bonding or grounding where required, label secondary containers before filling and keep spill controls ready.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the SDS available?",
      "Are the chemicals compatible?",
      "Is the container suitable?",
      "Is the label ready?",
      "Where is the spill kit?",
      "What PPE is required?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "SDS available",
      "Compatibility checked",
      "Transfer equipment suitable",
      "Container suitable",
      "Label applied",
      "Bonding assessed",
      "PPE suitable",
      "Spill kit ready",
      "Ventilation adequate",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "spill-response",
  "tr": {
    "title": "DÖKÜLME MÜDAHALESİ TOOLBOX TALK",
    "application_subtitle": "Kimyasal ve hidrokarbon dökülmelerinde güvenli ilk müdahale.",
    "subtitle": "Dökülmeyi hızlı kontrol etmek önemlidir; ancak güvenli olmayan müdahale ikinci bir olaya dönüşebilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Kimyasal ve hidrokarbon dökülmelerinde çalışan maruziyetini ve çevresel yayılımı güvenli şekilde kontrol etmek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Dökülmeye müdahale etmeden önce ürünün ne olduğu ve hangi sağlık, yangın veya çevre tehlikesini taşıdığı anlaşılmalıdır.",
      "Kaynağı güvenle durdurmak mümkünse ilk hedef yayılımı kesmektir; ancak çalışan kendini tehlikeye atmamalıdır.",
      "Drenaj, toprak veya su sistemine ulaşan kimyasal küçük bir saha dökülmesini ciddi çevresel olaya dönüştürebilir.",
      "Yanıcı ürünlerde buhar bulutu oluşabileceği için kıvılcım, sıcak yüzey ve araç hareketleri kontrol edilmelidir.",
      "Kullanılan absorbent ve kontamine malzemeler de tehlikeli atık olarak uygun şekilde toplanmalı ve etiketlenmelidir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir transfer hortumunun bağlantısından hidrokarbon sızıntısı başladı.",
      "Çalışan ilk olarak bağlantıyı elle sıkmaya çalıştı ancak ürün eldivenine temas etti ve dökülme drenaja doğru yayılmaya devam etti.",
      "Yakındaki ekip spill kit getirirken bölgedeki araç trafiği durdurulmamıştı.",
      "Kaynağın uzaktan izolasyonu, drain cover, doğru PPE ve alan kontrolü müdahaleyi daha güvenli hale getirebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Ürünü tanımıyorsanız dökülmeye çıplak elle müdahale etmeyin.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Kimyasal temas.",
      "Yanıcı buhar.",
      "Kaygan zemin.",
      "Drenaja yayılım.",
      "Yanlış absorbent kullanımı.",
      "Tutuşturucu kaynaklar.",
      "Toksik buhar.",
      "Kontrolsüz müdahale."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Ürünü tanımlayın.",
      "Kaynağı güvenliyse durdurun.",
      "Alanı bariyerleyin.",
      "Uygun PPE kullanın.",
      "Drenajları koruyun.",
      "Doğru absorbent kullanın.",
      "Tutuşturucu kaynakları uzaklaştırın.",
      "Büyük dökülmelerde acil durum ekibini çağırın.",
      "Kontamine atıkları uygun kaba alın.",
      "Olayı raporlayın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, dökülmede hız önemli ama kontrolsüz müdahale istemiyoruz. Önce ürünü tanıyacak, kendi güvenliğimizi sağlayacak, kaynağı mümkünse izole edecek ve özellikle drenajlara yayılımı engelleyeceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Ürün nedir?",
      "Kaynağı güvenle durdurabilir miyiz?",
      "Spill kit nerede?",
      "Drenaj nerede?",
      "Hangi PPE gerekli?",
      "Ne zaman acil durum ekibi çağrılır?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Ürün tanımlandı",
      "Kaynak kontrol yöntemi belli",
      "Spill kit hazır",
      "PPE uygun",
      "Drenaj koruması hazır",
      "Absorbent uygun",
      "Tutuşturucu kaynak kontrolü",
      "Acil iletişim açık",
      "Atık kabı hazır",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "SPILL RESPONSE TOOLBOX TALK",
    "application_subtitle": "Safe initial response to chemical and hydrocarbon spills.",
    "subtitle": "Fast response matters, but unsafe response can create a second incident.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Control worker exposure and environmental spread during chemical and hydrocarbon spills.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Before responding to a spill, workers must understand the product and its health, fire and environmental hazards.",
      "If the source can be stopped safely, controlling the release is the first priority, but workers must not place themselves in danger.",
      "A spill entering drains, soil or water systems can turn a small site event into a significant environmental incident.",
      "Flammable products may create vapour hazards, requiring control of sparks, hot surfaces and vehicle movement.",
      "Used absorbents and contaminated materials must be collected and managed as hazardous waste where applicable."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A hydrocarbon leak developed at a transfer-hose connection.",
      "A worker initially tried to tighten the connection by hand while the product continued spreading toward a nearby drain.",
      "Other workers brought spill equipment, but vehicle movement through the area had not yet been stopped.",
      "Remote isolation, drain protection, correct PPE and better area control would have made the response safer."
    ],
    "remember_title": "REMEMBER",
    "remember": "Do not handle an unknown spill with bare hands.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Chemical contact.",
      "Flammable vapours.",
      "Slippery surfaces.",
      "Drain contamination.",
      "Incorrect absorbent.",
      "Ignition sources.",
      "Toxic vapours.",
      "Uncontrolled response."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Identify the product.",
      "Stop the source if safe.",
      "Barricade the area.",
      "Wear suitable PPE.",
      "Protect drains.",
      "Use correct absorbents.",
      "Remove ignition sources.",
      "Call emergency response for major spills.",
      "Containerise contaminated waste.",
      "Report the incident."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, speed matters during a spill, but uncontrolled response creates additional risk. We will identify the product, protect ourselves, isolate the source where safe and prevent the release from reaching drains or the environment.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What product is involved?",
      "Can we stop the source safely?",
      "Where is the spill kit?",
      "Where are the drains?",
      "What PPE is required?",
      "When do we call emergency response?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Product identified",
      "Source control method clear",
      "Spill kit ready",
      "PPE suitable",
      "Drain protection ready",
      "Absorbent suitable",
      "Ignition control checked",
      "Emergency contact clear",
      "Waste container ready",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "hazardous-waste-handling",
  "tr": {
    "title": "TEHLİKELİ ATIK YÖNETİMİ TOOLBOX TALK",
    "application_subtitle": "Kimyasal, yağlı ve kontamine atıkların güvenli ayrılması ve taşınması.",
    "subtitle": "Atık olması tehlikesinin ortadan kalktığı anlamına gelmez.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Tehlikeli atıkların yanlış karıştırılması, uygunsuz depolanması ve çalışan maruziyetini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Atık haline gelen malzeme yanıcı, toksik, korozif veya reaktif özelliğini kaybetmez; bu nedenle normal çöpten ayrı yönetilmelidir.",
      "Uyumsuz kimyasal atıkların aynı kaba konması ısı, basınç, toksik gaz veya yangın oluşumuna neden olabilir.",
      "Kap üzerinde doğru atık tanımı yoksa taşıyan veya bertaraf eden personel gerçek riski bilemez.",
      "Sızıntı yapan atık kapları hem çalışan maruziyetine hem de toprak ve drenaj kirliliğine yol açabilir.",
      "Geçici atık alanları düzenli, bariyerli, sekonder containment bulunan ve yetkisiz girişten korunmuş olmalıdır."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "İki farklı bakım ekibi vardiya boyunca farklı kimyasal atıkları aynı geçici varile bıraktı.",
      "Kap dışarıdan normal görünüyordu ancak içinde uyumsuz ürünler karışmaya başladı.",
      "Bir süre sonra kap ısındı ve basınç oluştuğu fark edildi.",
      "Atık akışlarının ayrı tutulması, doğru etiketleme ve kontrollü waste station kullanımı reaksiyonu önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Tehlikeli atıkları yalnız onaylı ve etiketli kaplarda depolayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Uyumsuz atıkların karışması.",
      "Kimyasal temas.",
      "Yanıcı atık.",
      "Kesici kontamine malzeme.",
      "Etiketsiz kap.",
      "Açık atık kabı.",
      "Dökülme.",
      "Yanlış bertaraf."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Atıkları türüne göre ayırın.",
      "Onaylı kap kullanın.",
      "Kapları etiketleyin.",
      "Uyumsuz atıkları ayrı tutun.",
      "Kapları kapalı tutun.",
      "Sekonder containment sağlayın.",
      "Uygun PPE kullanın.",
      "Kesici atıkları delinmeye dayanıklı kapta tutun.",
      "Geçici depolama alanını düzenli kontrol edin.",
      "Atık transfer kayıtlarını tutun."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, tehlikeli atık işi bitmiş malzeme değildir; hâlâ tehlike taşır. Her atığı doğru sınıfta ayıracak, kapları etiketli ve kapalı tutacak, uyumsuz atıkları kesinlikle karıştırmayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Bu atık hangi sınıfta?",
      "Doğru kap hangisi?",
      "Etiket mevcut mu?",
      "Uyumsuz atık var mı?",
      "Sekonder containment var mı?",
      "Kim teslim alacak?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Atık sınıfı belli",
      "Kap uygun",
      "Etiket mevcut",
      "Uyumluluk kontrol edildi",
      "Kap kapalı",
      "Sekonder containment mevcut",
      "PPE uygun",
      "Depolama alanı düzenli",
      "Transfer yöntemi belli",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "HAZARDOUS WASTE HANDLING TOOLBOX TALK",
    "application_subtitle": "Safe segregation, storage and transfer of chemical and contaminated waste.",
    "subtitle": "A material does not stop being hazardous simply because it has become waste.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent incompatible mixing, poor storage and worker exposure during hazardous waste handling.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Waste materials can remain flammable, toxic, corrosive or reactive and must be managed separately from general waste.",
      "Mixing incompatible chemical wastes can generate heat, pressure, toxic gases or fire.",
      "Without correct waste identification, handlers and disposal personnel cannot understand the true hazard.",
      "Leaking waste containers can expose workers and contaminate drains or soil.",
      "Temporary hazardous-waste areas should be controlled, orderly, provided with secondary containment and protected against unauthorised access."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "Two maintenance crews placed different chemical wastes into the same temporary drum during a shift.",
      "The container appeared normal externally, but incompatible materials began reacting inside.",
      "After some time the drum became warm and signs of internal pressure were noticed.",
      "Separate waste streams, correct labelling and controlled storage would have prevented the reaction."
    ],
    "remember_title": "REMEMBER",
    "remember": "Store hazardous waste only in approved and labelled containers.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Incompatible waste mixing.",
      "Chemical contact.",
      "Flammable waste.",
      "Contaminated sharps.",
      "Unlabelled containers.",
      "Open waste containers.",
      "Spills.",
      "Incorrect disposal."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Segregate waste by type.",
      "Use approved containers.",
      "Label all containers.",
      "Separate incompatible wastes.",
      "Keep containers closed.",
      "Provide secondary containment.",
      "Wear suitable PPE.",
      "Use puncture-resistant containers for sharps.",
      "Inspect temporary storage areas.",
      "Maintain waste transfer records."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, hazardous waste still carries the original hazard. We will segregate each waste stream correctly, keep containers closed and labelled, and never mix incompatible wastes.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "What waste class is this?",
      "What container is required?",
      "Is it labelled?",
      "Are incompatible wastes present?",
      "Is secondary containment available?",
      "Who receives the waste?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Waste class identified",
      "Container suitable",
      "Label present",
      "Compatibility checked",
      "Container closed",
      "Secondary containment present",
      "PPE suitable",
      "Storage area orderly",
      "Transfer method clear",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "portable-generator-safety",
  "tr": {
    "title": "PORTATİF JENERATÖR GÜVENLİĞİ TOOLBOX TALK",
    "application_subtitle": "Geçici jeneratörlerde elektrik, egzoz ve yakıt risklerinin kontrolü.",
    "subtitle": "Portatif jeneratör hem elektrik hem yanma ürünü tehlikesi oluşturur.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Portatif jeneratör kullanımında elektrik çarpması, karbon monoksit, yangın ve yakıt kaynaklı riskleri önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Portatif jeneratörler elektrik üretirken aynı zamanda karbon monoksit, sıcak yüzey, gürültü ve yanıcı yakıt riski oluşturur.",
      "Egzoz gazı açık kapı veya pencere yakınından içeri girebilir ve çalışanlar kokusuz karbon monoksite fark etmeden maruz kalabilir.",
      "Hasarlı kablo, uygunsuz topraklama veya RCD eksikliği elektrik çarpması riskini ciddi şekilde artırır.",
      "Jeneratör çalışırken veya henüz sıcakken yakıt eklenmesi dökülen yakıtın sıcak yüzeyde tutuşmasına neden olabilir.",
      "Jeneratörün konumu egzoz yönü, havalandırma, yağmurdan korunma ve yaya/araç trafiği birlikte değerlendirilerek seçilmelidir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Geçici iş için portatif jeneratör yarı kapalı bir konteyner girişine yerleştirildi.",
      "Operatör jeneratörün dışarıda olduğunu düşündü ancak egzoz gazı rüzgarla içeri taşındı.",
      "İçeride çalışan ekip baş ağrısı ve rahatsızlık hissetmeye başladı.",
      "Jeneratörün açık alanda, kapı ve hava girişlerinden uzak konumlandırılması ve CO riskinin değerlendirilmesi maruziyeti önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Jeneratörü kapalı veya yetersiz havalandırılan alanda çalıştırmayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Elektrik çarpması.",
      "Karbon monoksit.",
      "Yakıt yangını.",
      "Sıcak yüzey.",
      "Hasarlı kablo.",
      "Uygunsuz topraklama.",
      "Yağmur ve su teması.",
      "Gürültü."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Jeneratörü açık ve havalandırılmış alana yerleştirin.",
      "Topraklama şartlarını doğrulayın.",
      "RCD/GFCI koruması kullanın.",
      "Kabloları kontrol edin.",
      "Islak ortamdan koruyun.",
      "Yakıt eklemeden önce motoru durdurun ve soğutun.",
      "Yakıtı uygun kapta saklayın.",
      "Yangın söndürücü bulundurun.",
      "Egzozu çalışanlardan uzağa yönlendirin.",
      "Gürültü koruması uygulayın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, jeneratörü yalnız elektrik kaynağı gibi düşünmeyeceğiz. Konumunu egzoz ve CO riskine göre seçecek, RCD ve kablo durumunu kontrol edecek, sıcak motora yakıt eklemeyecek ve çalışma alanından güvenli mesafede tutacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Jeneratör nerede kurulacak?",
      "Topraklama uygun mu?",
      "RCD var mı?",
      "Egzoz nereye yöneliyor?",
      "Yakıt nasıl eklenecek?",
      "Yangın söndürücü mevcut mu?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Konum uygun",
      "Havalandırma yeterli",
      "Topraklama uygun",
      "RCD mevcut",
      "Kablolar sağlam",
      "Su riski kontrol edildi",
      "Yakıt güvenli",
      "Söndürücü mevcut",
      "Egzoz güvenli",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "PORTABLE GENERATOR SAFETY TOOLBOX TALK",
    "application_subtitle": "Control of electrical, exhaust and fuel hazards from temporary generators.",
    "subtitle": "Portable generators create both electrical and combustion hazards.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent electric shock, carbon monoxide exposure, fire and fuel hazards during portable generator use.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Portable generators create electrical power but also introduce carbon monoxide, hot-surface, noise and flammable-fuel hazards.",
      "Exhaust can travel through nearby doors or openings, exposing workers to odourless carbon monoxide without warning.",
      "Damaged leads, poor grounding or missing RCD/GFCI protection significantly increase electric-shock risk.",
      "Refuelling while the engine is running or still hot can ignite spilled fuel on hot surfaces.",
      "Generator location must consider exhaust direction, ventilation, weather protection and interaction with pedestrians or vehicles."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A portable generator was positioned near the entrance of a semi-enclosed container for temporary work.",
      "The operator considered the unit to be outdoors, but wind carried exhaust back inside.",
      "Workers inside began experiencing headache and discomfort.",
      "Locating the generator in open air away from doors and air intakes, together with CO-risk assessment, would have prevented the exposure."
    ],
    "remember_title": "REMEMBER",
    "remember": "Never operate a generator inside an enclosed or poorly ventilated area.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Electric shock.",
      "Carbon monoxide.",
      "Fuel fire.",
      "Hot surfaces.",
      "Damaged cables.",
      "Incorrect grounding.",
      "Water exposure.",
      "Noise."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Position generators outdoors with ventilation.",
      "Verify grounding requirements.",
      "Use RCD/GFCI protection.",
      "Inspect electrical leads.",
      "Protect equipment from water.",
      "Stop and cool the engine before refuelling.",
      "Store fuel in approved containers.",
      "Provide fire extinguishers.",
      "Direct exhaust away from workers.",
      "Apply hearing protection."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, a generator is not just a power source. We will control exhaust and carbon-monoxide exposure, verify electrical protection, keep fuel away from hot equipment and position the unit safely away from occupied areas.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Where will the generator be located?",
      "Is grounding suitable?",
      "Is RCD protection installed?",
      "Where is exhaust directed?",
      "How will refuelling be done?",
      "Is a fire extinguisher available?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Location suitable",
      "Ventilation adequate",
      "Grounding suitable",
      "RCD installed",
      "Cables sound",
      "Water controlled",
      "Fuel safe",
      "Extinguisher available",
      "Exhaust safe",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "extension-leads-cable-management",
  "tr": {
    "title": "UZATMA KABLOLARI VE KABLO YÖNETİMİ TOOLBOX TALK",
    "application_subtitle": "Geçici elektrik kablolarında hasar, takılma ve aşırı yük risklerinin kontrolü.",
    "subtitle": "Geçici kablo düzeni kalıcı bir tehlikeye dönüşmemelidir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Uzatma kablolarının yanlış kullanımı, mekanik hasar, aşırı yük ve geçiş yollarındaki kablo risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Geçici elektrik kabloları sahada araç, yaya, keskin kenar, su ve ağır ekipman nedeniyle kısa sürede hasar görebilir.",
      "Ezilmiş veya kesilmiş izolasyon iletkeni açığa çıkararak elektrik çarpması ve kısa devre riskine neden olabilir.",
      "Kablo makaraları yüksek akım altında sarılı bırakıldığında yeterli ısı dağılımı yapamaz ve aşırı ısınabilir.",
      "Geçiş yolundan geçirilen kablolar hem takılma tehlikesi oluşturur hem de mekanik hasara daha fazla maruz kalır.",
      "Geçici bant tamiri, uygunsuz çoklayıcı ve seri uzatma bağlantıları kabul edilebilir kalıcı çözüm değildir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir uzatma kablosu kaynak alanına ulaşmak için araç geçiş yolundan geçirildi.",
      "Kablo köprüsü olmadığı için gün içinde birkaç araç kablonun üzerinden geçti.",
      "Akşam kontrolünde dış izolasyonun ezildiği ve iletkenin yüzeye çok yaklaştığı fark edildi.",
      "Güvenli kablo güzergahı, cable ramp ve vardiya öncesi inspection elektrik olayını önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Elektrik kablosunu kapı, yol veya keskin kenarda korumasız bırakmayın.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Hasarlı izolasyon.",
      "Ezilmiş kablo.",
      "Aşırı yük.",
      "Isınan kablo makarası.",
      "Takılma riski.",
      "Su teması.",
      "Uygunsuz ek bağlantı.",
      "Hasarlı fiş."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Kabloları kullanım öncesi kontrol edin.",
      "RCD koruması kullanın.",
      "Araç yollarında kablo köprüsü kullanın.",
      "Keskin kenarlardan koruyun.",
      "Kablo makarasını yüksek yükte tamamen açın.",
      "Kabloları geçiş yollarından uzaklaştırın.",
      "Uygunsuz bantlı tamir kullanmayın.",
      "Su ve ıslak zeminden uzak tutun.",
      "Doğru kapasitede kablo kullanın.",
      "Hasarlı ekipmanı kullanımdan kaldırın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, geçici kablo demek kontrolsüz kablo demek değildir. Her kablonun güzergahını, fiziksel durumunu, kapasitesini ve RCD korumasını kontrol edeceğiz; hasarlı veya geçici tamirli kabloları kullanmayacağız.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Kablo sağlam mı?",
      "RCD mevcut mu?",
      "Araç yolu geçiliyor mu?",
      "Makara tamamen açık mı?",
      "Su riski var mı?",
      "Kablo kapasitesi yeterli mi?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Kablo sağlam",
      "Fiş sağlam",
      "RCD mevcut",
      "Kablo köprüsü mevcut",
      "Güzergah güvenli",
      "Makara açık",
      "Su riski kontrol edildi",
      "Kapasite uygun",
      "Geçici tamir yok",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "EXTENSION LEADS AND CABLE MANAGEMENT TOOLBOX TALK",
    "application_subtitle": "Control of damage, overloading and trip hazards from temporary electrical leads.",
    "subtitle": "Temporary cable arrangements must not become permanent hazards.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent electrical damage, overload, trip hazards and unsafe routing of extension leads.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Temporary electrical leads can be damaged quickly by vehicles, pedestrians, sharp edges, water and heavy equipment.",
      "Crushed or cut insulation can expose conductors and create electric-shock or short-circuit hazards.",
      "Cable reels left coiled under high electrical load may overheat because heat cannot dissipate effectively.",
      "Cables routed through access ways create trip hazards and are more vulnerable to mechanical damage.",
      "Tape repairs, unsuitable multi-plugs and multiple daisy-chained extension leads are not acceptable permanent solutions."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "An extension lead was routed across a vehicle crossing to supply a welding area.",
      "No cable ramp was installed and several vehicles drove over the lead during the shift.",
      "An evening inspection found crushed insulation with the conductor close to exposure.",
      "Safe routing, cable protection and pre-shift inspection would have prevented the electrical hazard."
    ],
    "remember_title": "REMEMBER",
    "remember": "Do not leave electrical leads unprotected across doors, roads or sharp edges.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Damaged insulation.",
      "Crushed cables.",
      "Overloading.",
      "Overheated cable reels.",
      "Trip hazards.",
      "Water exposure.",
      "Improvised connections.",
      "Damaged plugs."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Inspect leads before use.",
      "Use RCD protection.",
      "Use cable ramps at vehicle crossings.",
      "Protect against sharp edges.",
      "Fully unwind reels under high load.",
      "Keep cables away from access routes.",
      "Do not use taped temporary repairs.",
      "Keep electrical leads dry.",
      "Use correctly rated cables.",
      "Remove damaged equipment from service."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, temporary leads still require full electrical control. We will inspect cable condition, routing, rating and RCD protection, and any damaged or makeshift-repaired lead will be removed from service.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the cable undamaged?",
      "Is RCD protection provided?",
      "Does it cross vehicle routes?",
      "Is the reel fully unwound?",
      "Is water exposure possible?",
      "Is cable capacity sufficient?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Cable sound",
      "Plug sound",
      "RCD installed",
      "Cable ramp available",
      "Routing safe",
      "Reel unwound",
      "Water controlled",
      "Capacity suitable",
      "No temporary repair",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "demolition-dismantling",
  "tr": {
    "title": "SÖKÜM VE DEMONTAJ TOOLBOX TALK",
    "application_subtitle": "Kontrollü söküm sırasında yapısal stabilite ve düşen parça risklerinin yönetimi.",
    "subtitle": "Bir parçayı sökmek, taşıdığı diğer parçaların davranışını değiştirebilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Söküm ve demontaj sırasında beklenmeyen çökme, düşen parça, enerji açığa çıkması ve line-of-fire risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Söküm sırasında bir elemanın kaldırılması yapının veya ekipmanın yük yolunu değiştirerek diğer parçaların beklenmedik hareketine neden olabilir.",
      "Eski sistemlerde güncel çizimlerde görünmeyen bağlantılar, trapped energy, proses kalıntısı veya gizli destek elemanları bulunabilir.",
      "Kesilecek parçanın gerçek ağırlığı ve ağırlık merkezi bilinmiyorsa kaldırma sırasında dönme veya ani düşme meydana gelebilir.",
      "Kontrollü söküm sırası değiştirilirse önceki risk değerlendirmesi geçerliliğini kaybedebilir.",
      "Söküm alanının altında ve çevresinde çalışanların exclusion zone dışında tutulması kritik öneme sahiptir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir ekip çelik konstrüksiyonda söküm yaparken erişimi kolaylaştırmak için plan dışı bir desteği önce kesmeye karar verdi.",
      "Destek kaldırıldığında bağlı bölümün yük dağılımı değişti ve parça beklenmedik yönde hareket etti.",
      "Alt alanda çalışan bulunmaması sayesinde yaralanma olmadı ancak parça ekipmana çarptı.",
      "Onaylı dismantling sequence, temporary support ve değişiklik öncesi reassessment olayı önleyebilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Söküm sırası değişirse risk değerlendirmesi de değişir.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Kontrolsüz yapısal hareket.",
      "Düşen parçalar.",
      "Gizli enerji kaynakları.",
      "Keskin kenarlar.",
      "Yüksekte çalışma.",
      "Ağır parçaların dengesizliği.",
      "Yanlış söküm sırası.",
      "Yetkisiz alan girişi."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Söküm sırasını önceden planlayın.",
      "Enerji kaynaklarını izole edin.",
      "Geçici destek ihtiyacını değerlendirin.",
      "Exclusion zone oluşturun.",
      "Parça ağırlıklarını belirleyin.",
      "Kaldırma yöntemini planlayın.",
      "Kesim öncesi bağlı elemanları kontrol edin.",
      "Keskin kenar koruması uygulayın.",
      "Yüksekte çalışma kontrollerini sağlayın.",
      "Plan değişirse işi durdurup yeniden değerlendirin."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, söküm sırasında hiçbir parçayı bağımsız kabul etmeyeceğiz. Ne taşıdığını, neye bağlı olduğunu ve çıkarıldığında sistemin nasıl davranacağını anlamadan kesim yapmayacağız; sıra değişirse işi durdurup yeniden değerlendireceğiz.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Söküm sırası belli mi?",
      "Enerji izole mi?",
      "Geçici destek gerekiyor mu?",
      "Parça ağırlıkları biliniyor mu?",
      "Alt alan kontrollü mü?",
      "Plan değişirse ne yapacağız?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Söküm sırası onaylı",
      "Enerji izole",
      "Destek ihtiyacı değerlendirildi",
      "Alan bariyerli",
      "Parça ağırlığı biliniyor",
      "Kaldırma planı hazır",
      "Bağlı elemanlar kontrol edildi",
      "Keskin kenarlar kontrol edildi",
      "WAH kontrolü mevcut",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "DEMOLITION AND DISMANTLING TOOLBOX TALK",
    "application_subtitle": "Management of structural stability and falling parts during controlled dismantling.",
    "subtitle": "Removing one component can change the behaviour of everything connected to it.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent unexpected collapse, falling objects, stored-energy release and line-of-fire exposure during demolition and dismantling.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "Removing one component during dismantling can change load paths and cause unexpected movement of connected structures or equipment.",
      "Older systems may contain undocumented connections, trapped energy, process residues or hidden supports.",
      "If actual weight and center of gravity are unknown, components may rotate or drop unexpectedly during lifting.",
      "Changing the dismantling sequence can invalidate the original risk assessment.",
      "Workers below and around the dismantling area must remain outside the exclusion zone."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A crew dismantling steelwork decided to cut a support earlier than planned to improve access.",
      "Once the support was removed, the connected section changed load path and moved unexpectedly.",
      "No worker was beneath the area, but the component struck nearby equipment.",
      "Following the approved dismantling sequence, installing temporary support and reassessing changes would have prevented the event."
    ],
    "remember_title": "REMEMBER",
    "remember": "If the dismantling sequence changes, the risk assessment must change too.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Uncontrolled structural movement.",
      "Falling components.",
      "Hidden energy sources.",
      "Sharp edges.",
      "Work at height.",
      "Unstable heavy components.",
      "Incorrect dismantling sequence.",
      "Unauthorised access."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Plan the dismantling sequence.",
      "Isolate energy sources.",
      "Assess temporary-support requirements.",
      "Establish exclusion zones.",
      "Determine component weights.",
      "Plan lifting methods.",
      "Check connected members before cutting.",
      "Control sharp edges.",
      "Apply work-at-height controls.",
      "Stop and reassess if the plan changes."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, no dismantling component will be treated as independent. Before cutting we must understand what it supports, what it is connected to and how the system will react; any sequence change requires stop-work and reassessment.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is the dismantling sequence defined?",
      "Is energy isolated?",
      "Is temporary support required?",
      "Are component weights known?",
      "Is the area below controlled?",
      "What happens if the plan changes?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Sequence approved",
      "Energy isolated",
      "Support assessed",
      "Area barricaded",
      "Component weight known",
      "Lift plan ready",
      "Connections checked",
      "Sharp edges controlled",
      "WAH controls in place",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
},
{
  "slug": "working-over-water",
  "tr": {
    "title": "SU ÜZERİNDE ÇALIŞMA TOOLBOX TALK",
    "application_subtitle": "Suya düşme, boğulma ve kurtarma hazırlığının kontrolü.",
    "subtitle": "Suya düşme olayı saniyeler içinde kurtarma operasyonuna dönüşebilir.",
    "duration": "8–10 dakika",
    "objective_title": "AMAÇ",
    "objective": "Su kenarı, iskele, ponton ve su üzerindeki çalışmalarda suya düşme ve boğulma risklerini önlemek.",
    "explanation_title": "NEDEN ÖNEMLİ?",
    "explanation": [
      "Suya düşen çalışan ağır iş kıyafeti, ayakkabı ve ekipman nedeniyle yüzme kabiliyetini hızla kaybedebilir.",
      "Soğuk suya ani temas nefes kontrolünün kaybolmasına ve cold shock etkisine neden olabilir.",
      "Akıntı, dalga ve rüzgar kişiyi çalışma noktasından kısa sürede uzaklaştırabilir ve kurtarmayı zorlaştırabilir.",
      "Can yeleği riski azaltır ancak tek başına yeterli değildir; hızlı ve uygulanabilir rescue plan gerekir.",
      "Gece veya düşük görüş koşullarında suya düşen kişinin tespiti ve kurtarılması çok daha zor hale gelir."
    ],
    "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
    "scenario": [
      "Bir çalışan ponton kenarında ekipman taşırken kaygan yüzeyde dengesini kaybetti ve suya düştü.",
      "Can yeleği kişiyi yüzeyde tuttu ancak akıntı nedeniyle birkaç metre hızla uzaklaştı.",
      "Kurtarma halkası çalışma noktasından uzakta olduğu için ilk müdahale gecikti.",
      "Kenar koruması, erişilebilir rescue line ve önceden görevlendirilmiş kurtarma ekibi müdahaleyi hızlandırabilirdi."
    ],
    "remember_title": "UNUTMAYIN",
    "remember": "Su üzerinde çalışmada kurtarma ekipmanı işe başlamadan önce hazır olmalıdır.",
    "hazards_title": "TEMEL TEHLİKELER",
    "hazards": [
      "Suya düşme.",
      "Boğulma.",
      "Soğuk su şoku.",
      "Akıntı.",
      "Kaygan yüzey.",
      "Yetersiz aydınlatma.",
      "Uygunsuz can yeleği.",
      "Gecikmiş kurtarma."
    ],
    "controls_title": "KONTROLLER",
    "controls": [
      "Kenar koruması sağlayın.",
      "Uygun can yeleği kullanın.",
      "Kurtarma halkası ve ip hazır bulundurun.",
      "Rescue boat ihtiyacını değerlendirin.",
      "Kaygan yüzeyleri kontrol edin.",
      "Yeterli aydınlatma sağlayın.",
      "Tek başına çalışmayı önleyin.",
      "Hava ve su koşullarını kontrol edin.",
      "Acil iletişim yöntemini belirleyin.",
      "Kurtarma planını ekiple paylaşın."
    ],
    "supervisor_title": "AMİRİN MESAJI",
    "supervisor_script": "Arkadaşlar, suya düşme halinde dakikalar değil saniyeler önemlidir. Can yeleklerini doğru kullanacak, rescue ring ve ipi çalışma noktasında hazır tutacak, hava ve su koşullarını kontrol edecek ve herkes kurtarma planını bilecek.",
    "questions_title": "EKİBE SORULAR",
    "questions": [
      "Kenar koruması yeterli mi?",
      "Can yeleği uygun mu?",
      "Kurtarma halkası nerede?",
      "Rescue boat gerekiyor mu?",
      "Su koşulları nasıl?",
      "Acil durumda kim müdahale edecek?"
    ],
    "verification_title": "SAHA DOĞRULAMASI",
    "verification": [
      "Kenar koruması uygun",
      "Can yelekleri hazır",
      "Kurtarma halkası mevcut",
      "İp hazır",
      "Rescue boat değerlendirildi",
      "Yüzey güvenli",
      "Aydınlatma yeterli",
      "Hava/su kontrol edildi",
      "İletişim açık",
      "Ekip bilgilendirildi"
    ],
    "attendance_title": "KATILIM VE ONAY",
    "fields": ["Proje / Saha", "Tarih", "Anlatan", "Çalışma alanı"],
    "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
    "notes_title": "Amir notları / ek saha talimatları",
    "footer": "SERNEM HSE Resource – İzin şartları, risk değerlendirmeleri ve saha prosedürleri önceliklidir."
  },
  "en": {
    "title": "WORKING OVER WATER TOOLBOX TALK",
    "application_subtitle": "Control of fall-to-water, drowning and rescue-preparedness hazards.",
    "subtitle": "A fall into water can become a rescue emergency within seconds.",
    "duration": "8–10 minutes",
    "objective_title": "OBJECTIVE",
    "objective": "Prevent falls into water and drowning during work near water, on jetties, pontoons and floating structures.",
    "explanation_title": "WHY IT MATTERS",
    "explanation": [
      "A worker entering the water may quickly lose swimming ability because of heavy work clothing, footwear and equipment.",
      "Sudden immersion in cold water can cause cold shock and immediate loss of breathing control.",
      "Current, waves and wind can move a person rapidly away from the work location and complicate rescue.",
      "Life jackets reduce risk but do not replace a practical and immediate rescue plan.",
      "Night work and poor visibility make locating and recovering a person from the water significantly more difficult."
    ],
    "scenario_title": "REALISTIC SITE SCENARIO",
    "scenario": [
      "A worker lost balance on a slippery pontoon while carrying equipment and fell into the water.",
      "The life jacket kept the worker afloat, but the current quickly moved him away from the work position.",
      "The nearest lifebuoy was too far from the work point and initial response was delayed.",
      "Edge protection, immediately accessible rescue lines and a designated rescue team would have improved the response."
    ],
    "remember_title": "REMEMBER",
    "remember": "Rescue equipment must be ready before work over water begins.",
    "hazards_title": "KEY HAZARDS",
    "hazards": [
      "Falling into water.",
      "Drowning.",
      "Cold-water shock.",
      "Current.",
      "Slippery surfaces.",
      "Poor lighting.",
      "Incorrect life jackets.",
      "Delayed rescue."
    ],
    "controls_title": "CONTROLS",
    "controls": [
      "Provide edge protection.",
      "Wear suitable life jackets.",
      "Provide lifebuoys and rescue lines.",
      "Assess rescue-boat requirements.",
      "Control slippery surfaces.",
      "Provide sufficient lighting.",
      "Avoid lone working.",
      "Monitor weather and water conditions.",
      "Define emergency communication.",
      "Brief the rescue plan."
    ],
    "supervisor_title": "SUPERVISOR MESSAGE",
    "supervisor_script": "Team, after a fall into water every second matters. Life jackets, lifebuoys and rescue lines must be ready at the work point, conditions must be monitored and everyone must understand the rescue plan before work begins.",
    "questions_title": "TEAM QUESTIONS",
    "questions": [
      "Is edge protection adequate?",
      "Are life jackets suitable?",
      "Where is the lifebuoy?",
      "Is a rescue boat required?",
      "What are water conditions?",
      "Who responds during an emergency?"
    ],
    "verification_title": "FIELD VERIFICATION",
    "verification": [
      "Edge protection suitable",
      "Life jackets ready",
      "Lifebuoy available",
      "Rescue line ready",
      "Rescue boat assessed",
      "Surface safe",
      "Lighting adequate",
      "Weather/water checked",
      "Communication clear",
      "Crew briefed"
    ],
    "attendance_title": "ATTENDANCE AND APPROVAL",
    "fields": ["Project / Site", "Date", "Presented by", "Work area"],
    "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
    "notes_title": "Supervisor notes / additional site instructions",
    "footer": "SERNEM HSE Resource – Permit conditions, risk assessments and site procedures take priority."
  }
}

] as ToolboxRecord[];

export function getToolboxBySlug(slug: string) {
  return toolboxData.find((item) => item.slug === slug);
}
