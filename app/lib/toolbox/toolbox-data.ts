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
      "footer": "SafeBase HSE Resource — SDS, kimyasal risk değerlendirmesi ve saha prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Safety Data Sheets, chemical risk assessments and site procedures take priority."
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
      "footer": "SafeBase HSE Resource — Kapalı alan giriş izni, gaz ölçümü, izolasyon ve saha kurtarma prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Entry permits, gas testing, isolation and site rescue procedures take priority."
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
      "footer": "SafeBase HSE Resource — Kaldırma planı, işaretleşme kuralları ve saha vinç prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Lifting plans, signalling rules and site crane procedures take priority."
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
      "footer": "SafeBase HSE Resource — Düşen cisim kontrol planı, yüksekte çalışma kuralları ve saha prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Dropped-object controls, work-at-height requirements and site procedures take priority."
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
      "footer": "SafeBase HSE Resource — Elektrik izolasyonu, LOTO ve saha elektrik prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Electrical isolation, LOTO and site electrical procedures take priority."
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
      "footer": "SafeBase HSE Resource — Excavation Safety"
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
      "footer": "SafeBase HSE Resource — Excavation Safety"
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
      "footer": "SafeBase HSE Resource — Fire Safety"
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
      "footer": "SafeBase HSE Resource — Fire Safety"
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
      "footer": "SafeBase HSE Resource — Forklift Safety"
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
      "footer": "SafeBase HSE Resource — Forklift Safety"
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
      "footer": "SafeBase HSE Resource — Üretici talimatları, ekipman kontrolleri ve saha prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Manufacturer instructions, equipment inspection requirements and site procedures take priority."
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
      "footer": "SafeBase HSE Resource — Çalışma izni, risk değerlendirmesi ve saha prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Permit conditions, risk assessments and site procedures take priority."
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
      "footer": "SafeBase HSE Resource — Atık yönetimi, yangın güvenliği ve saha prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Waste management, fire safety and site procedures take priority."
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
      "footer": "SafeBase HSE Resource — Ladder Safety"
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
      "footer": "SafeBase HSE Resource — Ladder Safety"
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
      "footer": "SafeBase HSE Resource — Kaldırma planı, ekipman sertifikaları ve saha kaldırma prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Lifting plans, equipment certification and site lifting procedures take priority."
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
      "footer": "SafeBase HSE Resource — İzolasyon planı, çalışma izni ve saha LOTO prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Isolation plans, permits and site LOTO procedures take priority."
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
      "footer": "SafeBase HSE Resource — Trafik yönetim planı, üretici talimatları ve saha mobil ekipman prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Traffic-management plans, manufacturer instructions and site mobile-equipment procedures take priority."
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
      "footer": "SafeBase HSE Resource — Risk değerlendirmesi, üretici talimatları ve saha KKD prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Risk assessments, manufacturer instructions and site PPE procedures take priority."
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
      "footer": "SafeBase HSE Resource — Üretici talimatları, risk değerlendirmesi ve saha prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Manufacturer instructions, risk assessments and site procedures take priority."
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
      "footer": "SafeBase HSE Resource — İskele etiketi, risk değerlendirmesi ve saha prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Scaffold tags, risk assessments and site procedures take priority."
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
      "footer": "SafeBase HSE Resource — Çalışma izni, risk değerlendirmesi ve saha prosedürleri önceliklidir."
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
      "footer": "SafeBase HSE Resource — Permit conditions, risk assessments and site procedures take priority."
    }
  }
] as ToolboxRecord[];

export function getToolboxBySlug(slug: string) {
  return toolboxData.find((item) => item.slug === slug);
}
