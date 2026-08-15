type MethodStep = {
  id: string;
  step: string;
  hazards: string;
  controls: string;
  responsible: string;
};

type Props = {
  isTurkish: boolean;
  projectName: string;
  companyName: string;
  location: string;
  activity: string;
  documentNo: string;
  revision: string;
  date: string;

  scope: string;
  responsibilities: string;
  competency: string;
  ppe: string;
  toolsEquipment: string;
  permits: string;
  preWorkRequirements: string;

  methodSteps: MethodStep[];

  emergencyArrangements: string;
  environmentalControls: string;
  references: string;

  preparedBy: string;
  reviewedBy: string;
  approvedBy: string;
};

function TextBlock({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  if (!value.trim()) return null;

  return (
    <section className="ms-print-block">
      <h2>{title}</h2>
      <div className="ms-print-text">{value}</div>
    </section>
  );
}

export default function MethodStatementPrint({
  isTurkish,
  projectName,
  companyName,
  location,
  activity,
  documentNo,
  revision,
  date,
  scope,
  responsibilities,
  competency,
  ppe,
  toolsEquipment,
  permits,
  preWorkRequirements,
  methodSteps,
  emergencyArrangements,
  environmentalControls,
  references,
  preparedBy,
  reviewedBy,
  approvedBy,
}: Props) {
  return (
    <>
      <div id="method-statement-print">
        {/* DOCUMENT HEADER */}
        <header className="ms-document-header">
          <div className="ms-brand">
            <div className="ms-logo-text">
              <strong>
                <span>SERNEM</span>
              </strong>
              <small>HEALTH &amp; SAFETY RESOURCES</small>
            </div>
          </div>

          <div className="ms-title-area">
            <div className="ms-document-type">
              {isTurkish ? "ÇALIŞMA YÖNTEMİ" : "METHOD STATEMENT"}
            </div>

            <h1>
              {activity ||
                (isTurkish
                  ? "Profesyonel Method Statement"
                  : "Professional Method Statement")}
            </h1>
          </div>

          <div className="ms-doc-control">
            <div>
              <span>{isTurkish ? "Doküman No" : "Document No"}</span>
              <strong>{documentNo || "-"}</strong>
            </div>

            <div>
              <span>{isTurishFix(isTurkish, "Revizyon", "Revision")}</span>
              <strong>{revision || "-"}</strong>
            </div>

            <div>
              <span>{isTurishFix(isTurkish, "Tarih", "Date")}</span>
              <strong>{date || "-"}</strong>
            </div>
          </div>
        </header>

        {/* PROJECT INFORMATION */}
        <table className="ms-info-table">
          <tbody>
            <tr>
              <th>{isTurkish ? "PROJE" : "PROJECT"}</th>
              <td>{projectName || "-"}</td>

              <th>{isTurkish ? "ŞİRKET" : "COMPANY"}</th>
              <td>{companyName || "-"}</td>
            </tr>

            <tr>
              <th>{isTurkish ? "LOKASYON" : "LOCATION"}</th>
              <td>{location || "-"}</td>

              <th>{isTurkish ? "FAALİYET" : "ACTIVITY"}</th>
              <td>{activity || "-"}</td>
            </tr>
          </tbody>
        </table>

        <TextBlock
          title={isTurkish ? "1. İŞİN KAPSAMI" : "1. SCOPE OF WORK"}
          value={scope}
        />

        <TextBlock
          title={isTurkish ? "2. GÖREV VE SORUMLULUKLAR" : "2. RESPONSIBILITIES"}
          value={responsibilities}
        />

        <TextBlock
          title={isTurkish ? "3. YETKİNLİK VE EĞİTİM" : "3. COMPETENCY & TRAINING"}
          value={competency}
        />

        <div className="ms-two-column">
          <TextBlock title="4. PPE" value={ppe} />

          <TextBlock
            title={isTurkish ? "5. ARAÇ VE EKİPMANLAR" : "5. TOOLS & EQUIPMENT"}
            value={toolsEquipment}
          />
        </div>

        <div className="ms-two-column">
          <TextBlock
            title={isTurkish ? "6. İZİNLER / PTW" : "6. PERMITS / PTW"}
            value={permits}
          />

          <TextBlock
            title={
              isTurkish
                ? "7. İŞE BAŞLAMADAN ÖNCE"
                : "7. PRE-WORK REQUIREMENTS"
            }
            value={preWorkRequirements}
          />
        </div>

        {/* PRE-TASK RISK CONTROLS */}
        <section className="ms-pretask-section">
          <h2>
            {isTurkish
              ? "8. İŞE BAŞLAMADAN ÖNCE RİSK KONTROLLERİ"
              : "8. PRE-TASK RISK CONTROLS"}
          </h2>

          <table className="ms-pretask-table">
            <thead>
              <tr>
                <th>{isTurkish ? "Kritik Tehlike" : "Critical Hazard"}</th>
                <th>{isTurkish ? "Gerekli Kontrol" : "Required Control"}</th>
                <th>{isTurkish ? "Doğrulama" : "Verification"}</th>
              </tr>
            </thead>

            <tbody>

              {documentNo === "SB-MS-020" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Yüksek basınç / stored energy" : "High pressure / stored energy"}</td>
                    <td>{isTurkish
                      ? "Tüp, regülatör ve bağlantıların gaz servisine uygunluğu doğrulanmalı; valf kontrollü açılmalı ve ekipman basınç sınırları aşılmamalıdır."
                      : "Cylinder, regulator and connections shall be suitable for the gas service; valves shall be opened under control and equipment pressure ratings shall not be exceeded."}</td>
                    <td>{isTurkish ? "Basınç / ekipman kontrolü" : "Pressure / equipment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Tüp devrilmesi / düşmesi" : "Cylinder overturning / falling"}</td>
                    <td>{isTurkish
                      ? "Tüpler dik konumda zincir veya uygun kayışla sağlam noktaya sabitlenmeli; kullanım ve depolama sırasında serbest bırakılmamalıdır."
                      : "Cylinders shall be kept upright and secured to a sound point by chain or suitable strap during use and storage."}</td>
                    <td>{isTurkish ? "Sabitleme kontrolü" : "Securing verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Valf hasarı" : "Valve damage"}</td>
                    <td>{isTurkish
                      ? "Taşıma sırasında koruma kapağı kullanılmalı; tüp valfinden kaldırılmamalı ve darbeye karşı korunmalıdır."
                      : "Valve protection caps shall be used during transport; cylinders shall not be lifted by the valve and shall be protected against impact."}</td>
                    <td>{isTurkish ? "Valf / kapak kontrolü" : "Valve / cap verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Gaz kaçağı" : "Gas leakage"}</td>
                    <td>{isTurkish
                      ? "Regülatör, hortum ve bağlantılar kontrol edilmeli; onaylı kaçak kontrol yöntemi kullanılmalı ve açık alevle kaçak aranması yasaklanmalıdır."
                      : "Regulators, hoses and connections shall be checked using an approved leak-detection method; open flames shall never be used for leak testing."}</td>
                    <td>{isTurkish ? "Kaçak kontrolü" : "Leak verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yanlış gaz / yanlış regülatör" : "Incorrect gas / regulator"}</td>
                    <td>{isTurkish
                      ? "Gaz cinsi tüp etiketinden doğrulanmalı ve yalnızca o gaz servisine uygun regülatör ve bağlantı ekipmanı kullanılmalıdır."
                      : "Gas identity shall be verified from the cylinder label and only regulators and connections suitable for that gas service shall be used."}</td>
                    <td>{isTurkish ? "Etiket / regülatör kontrolü" : "Label / regulator verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Oksijen / yanıcı gaz tehlikesi" : "Oxygen / fuel-gas hazard"}</td>
                    <td>{isTurkish
                      ? "Oksijen ekipmanı yağ ve gresten uzak tutulmalı; oksijen ve yanıcı gaz tüpleri proje / saha gerekliliklerine göre uygun şekilde ayrılmalıdır."
                      : "Oxygen equipment shall be kept free from oil and grease and oxygen and fuel-gas cylinders shall be suitably segregated according to project / site requirements."}</td>
                    <td>{isTurkish ? "Ayrım / saha kontrolü" : "Segregation / field verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Isı / ateşleme kaynağı" : "Heat / ignition source"}</td>
                    <td>{isTurkish
                      ? "Tüpler aşırı ısıdan, açık alevden, kıvılcımdan ve uygun olmayan elektrik / sıcak çalışma kaynaklarından korunmalıdır."
                      : "Cylinders shall be protected from excessive heat, open flames, sparks and unsuitable electrical / hot-work ignition sources."}</td>
                    <td>{isTurkish ? "Yangın / saha kontrolü" : "Fire / field verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Uygunsuz taşıma / depolama" : "Incorrect transport / storage"}</td>
                    <td>{isTurkish
                      ? "Tüpler uygun tüp arabasıyla taşınmalı; sürüklenmemeli veya kontrolsüz yuvarlanmamalı ve belirlenmiş havalandırılmış depolama alanında tutulmalıdır."
                      : "Cylinders shall be transported using a suitable cylinder trolley, shall not be dragged or uncontrolled rolled, and shall be kept in designated ventilated storage areas."}</td>
                    <td>{isTurkish ? "Taşıma / depolama kontrolü" : "Transport / storage verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-019" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Eksik / yanlış etiket veya SDS" : "Missing / incorrect label or SDS"}</td>
                    <td>{isTurkish
                      ? "Kimyasalın ürün adı, etiketi ve güncel SDS bilgileri doğrulanmalı; etiketsiz veya tanımlanamayan kimyasal kullanılmamalıdır."
                      : "The chemical name, label and current SDS information shall be verified and unlabelled or unidentified chemicals shall not be used."}</td>
                    <td>{isTurkish ? "Etiket / SDS kontrolü" : "Label / SDS verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Cilt / göz teması" : "Skin / eye contact"}</td>
                    <td>{isTurkish
                      ? "Kimyasala uygun eldiven, göz koruması ve sıçrama riskinde yüz siperi kullanılmalı; gerektiğinde göz yıkama / acil duş erişilebilir olmalıdır."
                      : "Chemical-resistant gloves, eye protection and face shield where splash risk exists shall be used, with eyewash / emergency shower available where required."}</td>
                    <td>{isTurkish ? "PPE / acil ekipman kontrolü" : "PPE / emergency-equipment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Soluma / buhar maruziyeti" : "Inhalation / vapour exposure"}</td>
                    <td>{isTurkish
                      ? "Yeterli havalandırma sağlanmalı, SDS maruziyet gereklilikleri uygulanmalı ve gerektiğinde uygun solunum koruması / atmosfer ölçümü kullanılmalıdır."
                      : "Adequate ventilation shall be provided, SDS exposure requirements applied and suitable respiratory protection / atmosphere monitoring used where required."}</td>
                    <td>{isTurkish ? "Havalandırma / maruziyet kontrolü" : "Ventilation / exposure verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Uyumsuz kimyasallar" : "Incompatible chemicals"}</td>
                    <td>{isTurkish
                      ? "Birlikte depolama ve karıştırma öncesi kimyasal uyumluluk kontrol edilmeli; üretici veya SDS onayı olmayan ürünler karıştırılmamalıdır."
                      : "Chemical compatibility shall be checked before co-storage or mixing and products shall not be mixed unless permitted by manufacturer / SDS information."}</td>
                    <td>{isTurkish ? "Uyumluluk / depolama kontrolü" : "Compatibility / storage verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Dökülme / sızıntı" : "Spill / leakage"}</td>
                    <td>{isTurkish
                      ? "Kaplar kapalı ve sağlam tutulmalı, secondary containment kullanılmalı ve uygun spill kit çalışma alanında hazır bulundurulmalıdır."
                      : "Containers shall be kept closed and serviceable, secondary containment used and a suitable spill kit kept available at the work area."}</td>
                    <td>{isTurkish ? "Spill / containment kontrolü" : "Spill / containment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yanıcı kimyasal / ateşleme" : "Flammable chemical / ignition"}</td>
                    <td>{isTurkish
                      ? "Yanıcı kimyasalların kullanıldığı alanlarda açık alev, kıvılcım ve diğer ateşleme kaynakları kontrol edilmeli ve uygun yangın ekipmanı sağlanmalıdır."
                      : "Where flammable chemicals are used, open flames, sparks and other ignition sources shall be controlled and suitable firefighting equipment provided."}</td>
                    <td>{isTurkish ? "Yangın / saha kontrolü" : "Fire / field verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Uygunsuz depolama" : "Incorrect storage"}</td>
                    <td>{isTurkish
                      ? "Kimyasallar kapalı, etiketli, uygun havalandırılmış ve uyumluluk şartlarına uygun belirlenmiş depolama alanlarında tutulmalıdır."
                      : "Chemicals shall be kept closed, labelled and stored in designated areas with suitable ventilation and compatibility controls."}</td>
                    <td>{isTurkish ? "Depolama kontrolü" : "Storage verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kimyasal atık / boş kap" : "Chemical waste / empty containers"}</td>
                    <td>{isTurkish
                      ? "Kimyasal atık, kirli absorbent, PPE ve boş kaplar uygun etiketli kaplarda ayrı toplanmalı; drenaja veya toprağa boşaltılmamalıdır."
                      : "Chemical waste, contaminated absorbents, PPE and empty containers shall be segregated into suitable labelled containers and shall not be discharged to drains or ground."}</td>
                    <td>{isTurkish ? "Atık / çevre kontrolü" : "Waste / environmental verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-018" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Aşırı yük / bel-sırt zorlanması" : "Excessive load / back strain"}</td>
                    <td>{isTurkish
                      ? "Yükün ağırlığı ve boyutu önceden değerlendirilmeli; kişinin kapasitesini aşan yüklerde ekip kaldırması veya mekanik yardım kullanılmalıdır."
                      : "Load weight and size shall be assessed beforehand and team lifting or mechanical assistance used where the load exceeds individual capability."}</td>
                    <td>{isTurkish ? "Yük / yöntem kontrolü" : "Load / method verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yanlış kaldırma tekniği" : "Incorrect lifting technique"}</td>
                    <td>{isTurkish
                      ? "Yüke yakın durulmalı, ayaklar dengeli konumlandırılmalı, dizler bükülmeli ve ani belden dönme hareketlerinden kaçınılmalıdır."
                      : "Personnel shall stand close to the load, position feet securely, bend the knees and avoid sudden twisting at the waist."}</td>
                    <td>{isTurkish ? "Saha gözlemi" : "Field observation"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Pinch point / el-ayak sıkışması" : "Pinch point / hand-foot trapping"}</td>
                    <td>{isTurkish
                      ? "Eller ve ayaklar yükün altından ve sıkışma bölgelerinden uzak tutulmalı; yük kontrollü yerleştirilmelidir."
                      : "Hands and feet shall be kept clear of the load and trapping zones and the load placed under control."}</td>
                    <td>{isTurkish ? "Yerleştirme kontrolü" : "Placement verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kötü kavrama / keskin kenar" : "Poor grip / sharp edges"}</td>
                    <td>{isTurkish
                      ? "Uygun kavrama noktaları belirlenmeli, keskin kenarlar kontrol edilmeli ve göreve uygun eldiven kullanılmalıdır."
                      : "Suitable grip points shall be identified, sharp edges controlled and task-appropriate gloves used."}</td>
                    <td>{isTurkish ? "Kavrama / PPE kontrolü" : "Grip / PPE verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Dengesiz / hacimli yük" : "Unstable / bulky load"}</td>
                    <td>{isTurkish
                      ? "Ağırlık merkezi ve yük dengesi değerlendirilmelidir. Görüşü engelleyen veya kontrolü zor yükler tek kişiyle taşınmamalıdır."
                      : "Centre of gravity and load stability shall be assessed. Loads that obstruct vision or are difficult to control shall not be carried by one person."}</td>
                    <td>{isTurkish ? "Yük dengesi kontrolü" : "Load-stability verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Taşıma rotası / takılma" : "Travel route / trip hazard"}</td>
                    <td>{isTurkish
                      ? "Taşıma rotası önceden kontrol edilmeli, engeller kaldırılmalı ve zemin / basamak / kapı koşulları değerlendirilmelidir."
                      : "The travel route shall be checked beforehand, obstacles removed and ground / step / doorway conditions assessed."}</td>
                    <td>{isTurkish ? "Rota / housekeeping kontrolü" : "Route / housekeeping verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Ekip kaldırmasında iletişim hatası" : "Team-lift communication failure"}</td>
                    <td>{isTurkish
                      ? "Ekip kaldırmasında bir kişi komut vermeli, kaldırma ve indirme hareketleri aynı anda ve kontrollü yapılmalıdır."
                      : "During team lifting, one person shall give commands and lifting / lowering movements shall be coordinated and controlled."}</td>
                    <td>{isTurkish ? "Ekip / iletişim kontrolü" : "Team / communication verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Tekrarlı hareket / yorgunluk" : "Repetitive movement / fatigue"}</td>
                    <td>{isTurkish
                      ? "Tekrarlı taşıma işleri için mola, iş rotasyonu veya mekanik yardım değerlendirilerek aşırı fiziksel yüklenme azaltılmalıdır."
                      : "For repetitive handling, breaks, job rotation or mechanical assistance shall be considered to reduce excessive physical strain."}</td>
                    <td>{isTurkish ? "Ergonomi / görev planı" : "Ergonomic / task-plan verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-017" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Platformdan düşme" : "Fall from platform"}</td>
                    <td>{isTurkish
                      ? "Platform kapısı kapalı tutulmalı, guardrail üzerine çıkılmamalı ve boom tipi MEWP'de proje / üretici gerekliliklerine uygun düşüş koruması kullanılmalıdır."
                      : "The platform gate shall remain closed, personnel shall not climb on guardrails and suitable fall protection shall be used on boom-type MEWPs in accordance with project / manufacturer requirements."}</td>
                    <td>{isTurkish ? "Platform / PPE kontrolü" : "Platform / PPE verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Ezilme / sıkışma" : "Crushing / trapping"}</td>
                    <td>{isTurkish
                      ? "Üst ve yan açıklıklar sürekli izlenmeli; operatör platform ile yapı, boru veya ekipman arasındaki sıkışma bölgelerinden uzak tutulmalıdır."
                      : "Overhead and side clearances shall be continuously monitored and the operator kept clear of trapping zones between the platform and structures, piping or equipment."}</td>
                    <td>{isTurkish ? "Saha / clearance kontrolü" : "Field / clearance verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Devrilme" : "Overturning"}</td>
                    <td>{isTurkish
                      ? "Zemin stabilitesi, eğim, taşıma kapasitesi ve çukurlar kontrol edilmeli; MEWP üretici limitleri dışında kullanılmamalıdır."
                      : "Ground stability, slope, bearing capacity and holes shall be checked and the MEWP shall not be operated outside manufacturer limits."}</td>
                    <td>{isTurkish ? "Zemin / ekipman kontrolü" : "Ground / equipment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Elektrik hattı yakınlığı" : "Electrical-line proximity"}</td>
                    <td>{isTurkish
                      ? "Enerjili hat ve ekipmanlar belirlenmeli, gerekli güvenli yaklaşma mesafeleri korunmalı ve mümkün olduğunda enerji izolasyonu uygulanmalıdır."
                      : "Energized lines and equipment shall be identified, required safe approach distances maintained and electrical isolation applied where practicable."}</td>
                    <td>{isTurkish ? "Elektrik / mesafe kontrolü" : "Electrical / clearance verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yüksek rüzgâr / hava koşulları" : "High wind / weather conditions"}</td>
                    <td>{isTurkish
                      ? "Rüzgâr ve hava koşulları çalışma öncesi ve sırasında izlenmeli; üretici limitleri aşılırsa platform güvenli şekilde indirilerek çalışma durdurulmalıdır."
                      : "Wind and weather conditions shall be monitored before and during work; if manufacturer limits are exceeded the platform shall be safely lowered and work stopped."}</td>
                    <td>{isTurkish ? "Hava / üretici limiti kontrolü" : "Weather / manufacturer-limit verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Düşen alet / malzeme" : "Falling tools / materials"}</td>
                    <td>{isTurkish
                      ? "Platformdaki malzemeler güvenli şekilde tutulmalı, alt alan bariyerlenmeli ve platform kapasitesi aşılmamalıdır."
                      : "Materials on the platform shall be secured, the lower area barricaded and platform capacity shall not be exceeded."}</td>
                    <td>{isTurkish ? "Dışlama alanı / yük kontrolü" : "Exclusion-zone / load verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Ekipman arızası / acil indirme" : "Equipment failure / emergency lowering"}</td>
                    <td>{isTurkish
                      ? "Acil indirme sistemi kullanım öncesi kontrol edilmeli ve yerdeki yetkili personel acil indirme yöntemini bilmelidir."
                      : "The emergency-lowering system shall be checked before use and authorized ground personnel shall know the emergency-lowering procedure."}</td>
                    <td>{isTurkish ? "Acil indirme kontrolü" : "Emergency-lowering verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yetkisiz kullanım / kontrolsüz hareket" : "Unauthorized use / uncontrolled movement"}</td>
                    <td>{isTurkish
                      ? "MEWP yalnızca eğitimli ve yetkili operatör tarafından kullanılmalı; iş sonunda platform indirilmeli, park freni uygulanmalı ve ekipman güvenli şekilde kapatılmalıdır."
                      : "The MEWP shall only be operated by trained and authorized personnel; after work the platform shall be lowered, parking brake applied and equipment safely shut down."}</td>
                    <td>{isTurkish ? "Operatör / park kontrolü" : "Operator / parking verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-016" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Uygunsuz merdiven seçimi" : "Incorrect ladder selection"}</td>
                    <td>{isTurkish
                      ? "Görev için uygun tip, uzunluk ve kapasitede onaylı merdiven seçilmeli; ağır veya uzun süreli işlerde platform tercih edilmelidir."
                      : "An approved ladder of suitable type, length and capacity shall be selected; platforms shall be preferred for heavy or prolonged work."}</td>
                    <td>{isTurkish ? "Görev / ekipman kontrolü" : "Task / equipment verification"}</td>
                  </tr>
                  <tr>
                    <td>{isTurkish ? "Hasarlı merdiven" : "Damaged ladder"}</td>
                    <td>{isTurkish
                      ? "Basamak, yan ray, ayak, bağlantı ve kilitler kullanım öncesi kontrol edilmeli; hasarlı merdiven kullanım dışı bırakılmalıdır."
                      : "Rungs, rails, feet, connections and locks shall be inspected before use and damaged ladders removed from service."}</td>
                    <td>{isTurkish ? "Kullanım öncesi kontrol" : "Pre-use inspection"}</td>
                  </tr>
                  <tr>
                    <td>{isTurkish ? "Kayma / devrilme" : "Slip / overturning"}</td>
                    <td>{isTurkish
                      ? "Merdiven sağlam, düz ve kaymaz zemine kurulmalı, uygun açı kullanılmalı ve gerektiğinde sabitlenmelidir."
                      : "The ladder shall be set on firm, level, non-slip ground, at the correct angle and secured where required."}</td>
                    <td>{isTurkish ? "Zemin / kurulum kontrolü" : "Ground / setup verification"}</td>
                  </tr>
                  <tr>
                    <td>{isTurkish ? "Üç nokta temas kaybı" : "Loss of three-point contact"}</td>
                    <td>{isTurkish
                      ? "Çıkış ve inişte merdivene yüz dönük olunmalı ve sürekli üç nokta temas korunmalıdır."
                      : "Users shall face the ladder and maintain three points of contact while climbing and descending."}</td>
                    <td>{isTurkish ? "Saha gözlemi" : "Field observation"}</td>
                  </tr>
                  <tr>
                    <td>{isTurkish ? "Aşırı uzanma" : "Overreaching"}</td>
                    <td>{isTurkish
                      ? "Kullanıcının gövdesi yan raylar arasında tutulmalı; uzak noktaya erişmek için merdiven yeniden konumlandırılmalıdır."
                      : "The user's body shall remain between the side rails and the ladder repositioned instead of overreaching."}</td>
                    <td>{isTurkish ? "Kullanıcı kontrolü" : "User verification"}</td>
                  </tr>
                  <tr>
                    <td>{isTurkish ? "Elektrik tehlikesi" : "Electrical hazard"}</td>
                    <td>{isTurkish
                      ? "Enerjili elektrik ekipmanı veya hatlar yakınında uygun merdiven tipi seçilmeli ve güvenli yaklaşma mesafesi korunmalıdır."
                      : "A suitable ladder type shall be selected near energized electrical equipment or lines and safe approach distances maintained."}</td>
                    <td>{isTurkish ? "Elektrik / mesafe kontrolü" : "Electrical / clearance verification"}</td>
                  </tr>
                  <tr>
                    <td>{isTurkish ? "Düşen alet / malzeme" : "Falling tools / materials"}</td>
                    <td>{isTurkish
                      ? "Aletler çanta veya kemer ile taşınmalı, alt alan kontrol edilmeli ve merdivenden kontrolsüz malzeme bırakılmamalıdır."
                      : "Tools shall be carried in a bag or belt, the lower area controlled and materials shall not be dropped from ladders."}</td>
                    <td>{isTurkish ? "Alt alan / housekeeping kontrolü" : "Lower-area / housekeeping verification"}</td>
                  </tr>
                  <tr>
                    <td>{isTurkish ? "Trafik / kapı / geçiş yolu" : "Traffic / doors / access routes"}</td>
                    <td>{isTurkish
                      ? "Merdiven araç veya yaya geçişlerinde korunmalı; kapılar kilitlenmeli veya kontrol edilmeli ve bariyer kullanılmalıdır."
                      : "Ladders located in vehicle or pedestrian routes shall be protected; doors shall be locked or controlled and barriers used."}</td>
                    <td>{isTurkish ? "Saha / bariyer kontrolü" : "Field / barrier verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-015" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Araç-personel çarpışması" : "Vehicle-person collision"}</td>
                    <td>{isTurkish
                      ? "Yaya ve araç yolları mümkün olduğunca ayrılmalı, bariyer ve dışlama alanları oluşturulmalı ve gereksiz personel ekipman çalışma alanından uzak tutulmalıdır."
                      : "Pedestrian and vehicle routes shall be segregated where practicable, barriers and exclusion zones established and unnecessary personnel kept clear of equipment operating areas."}</td>
                    <td>{isTurkish ? "Trafik / saha kontrolü" : "Traffic / field verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kör nokta / geri manevra" : "Blind spot / reversing"}</td>
                    <td>{isTurkish
                      ? "Görüşün kısıtlı olduğu manevralarda eğitimli banksman kullanılmalı; operatör ve banksman arasında anlaşılmış işaret / telsiz yöntemi uygulanmalıdır."
                      : "A trained banksman shall be used where visibility is restricted, with an agreed hand-signal / radio communication method between operator and banksman."}</td>
                    <td>{isTurkish ? "Banksman / iletişim kontrolü" : "Banksman / communication verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Devrilme" : "Overturning"}</td>
                    <td>{isTurkish
                      ? "Zemin stabilitesi, taşıma kapasitesi, eğim ve çalışma alanı koşulları doğrulanmalı; ekipman üretici limitleri dışında kullanılmamalıdır."
                      : "Ground stability, bearing capacity, slope and work-area conditions shall be verified and equipment shall not be operated outside manufacturer limits."}</td>
                    <td>{isTurkish ? "Zemin / ekipman kontrolü" : "Ground / equipment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Ekipman arızası" : "Equipment failure"}</td>
                    <td>{isTurkish
                      ? "Günlük ekipman kontrolü tamamlanmalı; fren, direksiyon, lastik, ışık, alarm, emniyet kemeri ve diğer güvenlik sistemleri çalışır durumda olmalıdır."
                      : "Daily equipment inspection shall be completed and brakes, steering, tyres, lights, alarms, seat belt and other safety systems shall be functional."}</td>
                    <td>{isTurkish ? "Günlük kontrol formu" : "Daily inspection record"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yetkisiz kullanım" : "Unauthorized operation"}</td>
                    <td>{isTurkish
                      ? "Ekipman yalnızca eğitimli ve yetkili operatör tarafından kullanılmalı; anahtar ve erişim kontrolü saha prosedürüne göre yönetilmelidir."
                      : "Equipment shall be operated only by trained and authorized operators, with key and access control managed in accordance with site procedures."}</td>
                    <td>{isTurkish ? "Operatör yetkinliği" : "Operator competence verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Line-of-fire / sıkışma" : "Line-of-fire / crushing"}</td>
                    <td>{isTurkish
                      ? "Personel ekipman dönüş yarıçapı, ataşman hareket alanı ve sabit yapı ile ekipman arasındaki sıkışma bölgelerinden uzak tutulmalıdır."
                      : "Personnel shall remain clear of equipment swing radius, attachment movement areas and crushing zones between equipment and fixed structures."}</td>
                    <td>{isTurkish ? "Dışlama alanı kontrolü" : "Exclusion-zone verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kontrolsüz park / hareket" : "Uncontrolled parking / movement"}</td>
                    <td>{isTurkish
                      ? "Ekipman belirlenmiş alana park edilmeli, ataşmanlar yere indirilmeli, park freni uygulanmalı ve gerektiğinde takoz / izolasyon kullanılmalıdır."
                      : "Equipment shall be parked in designated areas, attachments lowered, parking brake applied and wheel chocks / isolation used where required."}</td>
                    <td>{isTurkish ? "Park / izolasyon kontrolü" : "Parking / isolation verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yakıt / hidrolik sızıntı" : "Fuel / hydraulic leakage"}</td>
                    <td>{isTurkish
                      ? "Yakıt, yağ ve hidrolik sızıntıları kontrol edilmeli; hasarlı ekipman kullanılmamalı ve dökülmeler spill kit ile kontrol altına alınmalıdır."
                      : "Fuel, oil and hydraulic leaks shall be controlled, damaged equipment shall not be used and spills contained using suitable spill kits."}</td>
                    <td>{isTurkish ? "Ekipman / çevre kontrolü" : "Equipment / environmental verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-014" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Lif / toz maruziyeti" : "Fibre / dust exposure"}</td>
                    <td>{isTurkish
                      ? "Mineral yün ve benzeri malzemeler kontrollü şekilde kesilmeli; toz oluşumu azaltılmalı ve risk değerlendirmesine uygun solunum, göz ve cilt koruması kullanılmalıdır."
                      : "Mineral wool and similar materials shall be cut under controlled conditions, dust generation minimized and suitable respiratory, eye and skin protection used."}</td>
                    <td>{isTurkish ? "PPE / maruziyet kontrolü" : "PPE / exposure verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kesici alet yaralanması" : "Cutting-tool injury"}</td>
                    <td>{isTurkish
                      ? "Uygun ve sağlam kesici alet kullanılmalı, kesim vücuttan uzağa yapılmalı ve el / parmaklar kesme hattından uzak tutulmalıdır."
                      : "Suitable serviceable cutting tools shall be used, cutting performed away from the body and hands / fingers kept clear of the cutting path."}</td>
                    <td>{isTurkish ? "Alet / saha kontrolü" : "Tool / field verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Keskin sac / cladding kenarları" : "Sharp sheet-metal / cladding edges"}</td>
                    <td>{isTurkish
                      ? "Sac parçalar kontrollü taşınmalı, kesilmeye dayanıklı eldiven kullanılmalı ve keskin kenarlar açıkta bırakılmamalıdır."
                      : "Sheet-metal components shall be handled under control, cut-resistant gloves used and sharp edges not left exposed."}</td>
                    <td>{isTurkish ? "PPE / kenar kontrolü" : "PPE / edge verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Sıcak yüzey teması" : "Hot-surface contact"}</td>
                    <td>{isTurkish
                      ? "İzolasyona başlamadan önce yüzey sıcaklığı ve proses durumu doğrulanmalı; güvenli olmayan sıcaklıklarda çalışma yapılmamalıdır."
                      : "Surface temperature and process condition shall be verified before insulation work and work shall not proceed where temperatures are unsafe."}</td>
                    <td>{isTurkish ? "Yüzey / proses kontrolü" : "Surface / process verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yüksekte çalışma" : "Work at height"}</td>
                    <td>{isTurkish
                      ? "Onaylı iskele veya çalışma platformu kullanılmalı; kenar koruması ve gerektiğinde kişisel düşüş koruma sistemi uygulanmalıdır."
                      : "Approved scaffolds or work platforms shall be used, with edge protection and personal fall protection where required."}</td>
                    <td>{isTurkish ? "Erişim / iskele kontrolü" : "Access / scaffold verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Düşen malzeme / ekipman" : "Falling materials / equipment"}</td>
                    <td>{isTurkish
                      ? "Alt seviyeler bariyerlenmeli, malzeme ve aletler güvenli tutulmalı ve yüksekten kontrolsüz malzeme bırakılmamalıdır."
                      : "Lower levels shall be barricaded, materials and tools secured and materials shall not be dropped uncontrolled from height."}</td>
                    <td>{isTurkish ? "Dışlama alanı kontrolü" : "Exclusion-zone verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Manuel taşıma" : "Manual handling"}</td>
                    <td>{isTurkish
                      ? "Büyük veya hacimli izolasyon / cladding malzemeleri için ekip çalışması veya mekanik taşıma kullanılmalı; uygunsuz kaldırma ve dönme hareketlerinden kaçınılmalıdır."
                      : "Team lifting or mechanical handling shall be used for large or bulky insulation / cladding materials and unsafe lifting or twisting avoided."}</td>
                    <td>{isTurkish ? "Elleçleme kontrolü" : "Handling verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Housekeeping / izolasyon atığı" : "Housekeeping / insulation waste"}</td>
                    <td>{isTurkish
                      ? "Mineral yün, sac artıkları, banding ve ambalaj malzemeleri düzenli toplanmalı; lif / toz yayacak kuru süpürmeden kaçınılmalıdır."
                      : "Mineral wool, sheet-metal offcuts, banding and packaging shall be regularly collected and dry sweeping that spreads fibres / dust avoided."}</td>
                    <td>{isTurkish ? "Housekeeping / atık kontrolü" : "Housekeeping / waste verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-013" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "VOC / solvent buharı" : "VOC / solvent vapours"}</td>
                    <td>{isTurkish
                      ? "SDS bilgileri doğrulanmalı, yeterli havalandırma sağlanmalı ve gerektiğinde uygun solunum koruması / VOC ölçümü uygulanmalıdır."
                      : "SDS information shall be verified, adequate ventilation provided and suitable respiratory protection / VOC monitoring applied where required."}</td>
                    <td>{isTurkish ? "SDS / havalandırma kontrolü" : "SDS / ventilation verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yangın / patlama" : "Fire / explosion"}</td>
                    <td>{isTurkish
                      ? "Yanıcı solventler kullanılan alanlarda ateşleme kaynakları kontrol edilmeli, sigara ve açık alev yasaklanmalı ve uygun yangın ekipmanı hazır tutulmalıdır."
                      : "Where flammable solvents are used, ignition sources shall be controlled, smoking and open flames prohibited and suitable firefighting equipment provided."}</td>
                    <td>{isTurkish ? "Yangın / saha kontrolü" : "Fire / field verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kimyasal cilt / göz teması" : "Chemical skin / eye contact"}</td>
                    <td>{isTurkish
                      ? "Kimyasala uygun eldiven, göz koruması ve gerektiğinde yüz siperi kullanılmalı; göz yıkama / acil duş erişilebilir olmalıdır."
                      : "Chemical-resistant gloves, eye protection and face shield where required shall be used and eyewash / emergency shower facilities accessible."}</td>
                    <td>{isTurkish ? "PPE / acil ekipman kontrolü" : "PPE / emergency-equipment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yetersiz havalandırma" : "Inadequate ventilation"}</td>
                    <td>{isTurkish
                      ? "Kapalı veya düşük hava hareketli alanlarda mekanik havalandırma uygulanmalı ve gerekli durumlarda atmosfer düzenli olarak izlenmelidir."
                      : "Mechanical ventilation shall be provided in enclosed or poorly ventilated areas and the atmosphere monitored where required."}</td>
                    <td>{isTurkish ? "Havalandırma / atmosfer kontrolü" : "Ventilation / atmosphere verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Sprey hose / basınçlı ekipman" : "Spray hose / pressurized equipment"}</td>
                    <td>{isTurkish
                      ? "Pump, hose, nozzle ve fittings kullanım öncesi kontrol edilmeli, hasarlı ekipman kullanılmamalı ve sprey ucu personele yöneltilmemelidir."
                      : "Pump, hose, nozzle and fittings shall be inspected before use, damaged equipment prohibited and spray tips never directed toward personnel."}</td>
                    <td>{isTurkish ? "Ekipman kontrolü" : "Equipment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Statik / ateşleme kaynağı" : "Static / ignition source"}</td>
                    <td>{isTurkish
                      ? "Gerekli durumlarda bonding / grounding uygulanmalı ve kıvılcım oluşturabilecek ekipman veya faaliyetler çalışma alanından uzak tutulmalıdır."
                      : "Bonding / grounding shall be applied where required and spark-producing equipment or activities kept clear of the work area."}</td>
                    <td>{isTurkish ? "Bonding / saha kontrolü" : "Bonding / field verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Dökülme / kimyasal sızıntı" : "Spill / chemical leakage"}</td>
                    <td>{isTurkish
                      ? "Kimyasal kaplar kapalı tutulmalı, spill kit hazır olmalı ve dökülmeler drenaja veya zemine yayılmadan kontrol edilmelidir."
                      : "Chemical containers shall be kept closed, spill kits available and spills controlled before reaching drains or ground."}</td>
                    <td>{isTurkish ? "Spill / çevre kontrolü" : "Spill / environmental verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yanıcı boya / solvent atığı" : "Flammable paint / solvent waste"}</td>
                    <td>{isTurkish
                      ? "Kirli bezler, solvent kapları ve boya atıkları uygun kaplarda ayrı toplanmalı ve proje atık sistemine göre yönetilmelidir."
                      : "Contaminated rags, solvent containers and paint waste shall be segregated into suitable containers and managed under the project waste system."}</td>
                    <td>{isTurkish ? "Atık yönetimi kontrolü" : "Waste-management verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-012" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Stored energy / basınçlı hava" : "Stored energy / compressed air"}</td>
                    <td>{isTurkish
                      ? "Basınç kontrollü kademelerle uygulanmalı, sistem basınç kapasitesi doğrulanmalı ve onaylı limitler aşılmamalıdır."
                      : "Pressure shall be applied in controlled stages, system pressure ratings verified and approved limits not exceeded."}</td>
                    <td>{isTurkish ? "Basınç / plan kontrolü" : "Pressure / plan verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Hortum / fitting arızası" : "Hose / fitting failure"}</td>
                    <td>{isTurkish
                      ? "Hortum ve fittings uygun basınç sınıfında olmalı, bağlantılar kontrol edilmeli ve gerekli restraint / whip check kullanılmalıdır."
                      : "Hoses and fittings shall have suitable pressure ratings, connections inspected and restraints / whip checks used where required."}</td>
                    <td>{isTurkish ? "Ekipman kontrolü" : "Equipment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Uçan parçacık / yabancı madde" : "Flying particles / debris"}</td>
                    <td>{isTurkish
                      ? "Discharge point güvenli yöne çevrilmeli ve personel uçan parçacıkların ulaşabileceği alandan uzak tutulmalıdır."
                      : "The discharge point shall be directed toward a safe area and personnel kept clear of possible flying debris."}</td>
                    <td>{isTurkish ? "Discharge zone kontrolü" : "Discharge-zone verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kontrolsüz discharge" : "Uncontrolled discharge"}</td>
                    <td>{isTurkish
                      ? "Discharge zone bariyerlenmeli, yetkisiz erişim engellenmeli ve üfleme sırasında alan sürekli kontrol edilmelidir."
                      : "The discharge zone shall be barricaded, unauthorized access prevented and the area continuously controlled during blowing."}</td>
                    <td>{isTurkish ? "Dışlama alanı kontrolü" : "Exclusion-zone verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yüksek gürültü" : "High noise"}</td>
                    <td>{isTurkish
                      ? "Gürültü maruziyeti değerlendirilmeli, gerekli işitme koruması kullanılmalı ve gereksiz personel alandan uzak tutulmalıdır."
                      : "Noise exposure shall be assessed, suitable hearing protection used and unnecessary personnel kept clear."}</td>
                    <td>{isTurkish ? "PPE / maruziyet kontrolü" : "PPE / exposure verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Line-of-fire" : "Line-of-fire"}</td>
                    <td>{isTurkish
                      ? "Personel hose, fitting, blind, flange ve discharge pointin doğrudan önünde bulunmamalıdır."
                      : "Personnel shall not stand directly in front of hoses, fittings, blinds, flanges or the discharge point."}</td>
                    <td>{isTurkish ? "Saha gözlemi" : "Field observation"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Aşırı basınç" : "Overpressure"}</td>
                    <td>{isTurkish
                      ? "Kalibre manometre, uygun regülatör ve relief sistemi kullanılmalı; çalışma basıncı sürekli izlenmelidir."
                      : "A calibrated gauge, suitable regulator and relief system shall be used and operating pressure continuously monitored."}</td>
                    <td>{isTurkish ? "Gauge / relief kontrolü" : "Gauge / relief verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kontrolsüz basınç düşürme" : "Uncontrolled depressurization"}</td>
                    <td>{isTurkish
                      ? "Basınç güvenli tahliye noktasından kontrollü düşürülmeli ve bağlantılar açılmadan önce sıfır basınç doğrulanmalıdır."
                      : "Pressure shall be released through a safe discharge point under control and zero pressure confirmed before connections are opened."}</td>
                    <td>{isTurkish ? "Sıfır basınç doğrulama" : "Zero-pressure verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-011" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Stored energy / yüksek basınç" : "Stored energy / high pressure"}</td>
                    <td>{isTurkish
                      ? "Test sınırları ve ekipman basınç kapasitesi doğrulanmalı; basınç kontrollü kademelerle uygulanmalı ve test basıncı aşılmamalıdır."
                      : "Test boundaries and equipment pressure ratings shall be verified; pressure applied in controlled stages and the approved test pressure not exceeded."}</td>
                    <td>{isTurkish ? "Test paketi / basınç kontrolü" : "Test package / pressure verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Hortum / fitting arızası" : "Hose / fitting failure"}</td>
                    <td>{isTurkish
                      ? "Hortum, manifold, fitting ve bağlantılar uygun basınç sınıfında ve fiziksel olarak sağlam olmalıdır."
                      : "Hoses, manifolds, fittings and connections shall have suitable pressure ratings and be physically serviceable."}</td>
                    <td>{isTurkish ? "Ekipman kontrolü" : "Equipment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Blind / test plug fırlaması" : "Blind / test plug ejection"}</td>
                    <td>{isTurkish
                      ? "Blind, test plug ve flange bağlantıları doğrulanmalı; personel line-of-fire bölgesinde veya bağlantıların önünde bulunmamalıdır."
                      : "Blinds, test plugs and flange connections shall be verified and personnel kept clear of line-of-fire areas and directly in front of connections."}</td>
                    <td>{isTurkish ? "Blind / dışlama alanı kontrolü" : "Blind / exclusion-zone verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Aşırı basınç" : "Overpressure"}</td>
                    <td>{isTurkish
                      ? "Kalibre manometre kullanılmalı, test basıncı sürekli izlenmeli ve uygun relief valve / tahliye sistemi devrede olmalıdır."
                      : "Calibrated pressure gauges shall be used, test pressure continuously monitored and a suitable relief valve / pressure-relief system kept functional."}</td>
                    <td>{isTurkish ? "Gauge / relief kontrolü" : "Gauge / relief verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Sistemde sıkışmış hava" : "Trapped air in system"}</td>
                    <td>{isTurkish
                      ? "Sistem kontrollü şekilde suyla doldurulmalı ve yüksek noktalardan hava tamamen tahliye edilmeden test basıncına çıkılmamalıdır."
                      : "The system shall be filled with water under control and trapped air fully vented from high points before test pressure is applied."}</td>
                    <td>{isTurkish ? "Vent / dolum kontrolü" : "Vent / filling verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Basınçlı kaçak kontrolü" : "Leak inspection under pressure"}</td>
                    <td>{isTurkish
                      ? "Kaçak kontrolü güvenli mesafeden yapılmalı; basınçlı bağlantılar elle sıkılmamalı veya düzeltilmemelidir."
                      : "Leak inspection shall be performed from a safe position and pressurized connections shall not be tightened or adjusted."}</td>
                    <td>{isTurkish ? "Saha gözlemi" : "Field observation"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kontrolsüz basınç tahliyesi" : "Uncontrolled depressurization"}</td>
                    <td>{isTurkish
                      ? "Basınç uygun tahliye noktasından yavaşça düşürülmeli ve bağlantılar açılmadan önce sıfır basınç manometreden doğrulanmalıdır."
                      : "Pressure shall be released slowly through a suitable discharge point and zero pressure confirmed on the gauge before connections are opened."}</td>
                    <td>{isTurkish ? "Sıfır basınç doğrulama" : "Zero-pressure verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Test suyu tahliyesi" : "Test-water discharge"}</td>
                    <td>{isTurkish
                      ? "Test suyu onaylı tahliye noktasına kontrollü verilmelidir. Kayma, drenaj ve çevresel etkiler kontrol edilmelidir."
                      : "Test water shall be discharged under control to an approved location. Slip, drainage and environmental impacts shall be controlled."}</td>
                    <td>{isTurkish ? "Tahliye / çevre kontrolü" : "Discharge / environmental verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-010" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Ağır boru / spool elleçleme" : "Heavy pipe / spool handling"}</td>
                    <td>{isTurkish
                      ? "Ağırlık ve ağırlık merkezi belirlenmeli, uygun mekanik kaldırma yöntemi kullanılmalı ve elle taşıma limitleri aşılmamalıdır."
                      : "Weight and centre of gravity shall be determined, suitable mechanical handling used and manual-handling limits not exceeded."}</td>
                    <td>{isTurkish ? "Kaldırma / elleçleme kontrolü" : "Lifting / handling verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Pinch point / sıkışma" : "Pinch point / trapping"}</td>
                    <td>{isTurkish
                      ? "Flange, spool ve destekler arasında eller ve vücut parçaları tutulmamalı; hizalama uygun ekipmanla yapılmalıdır."
                      : "Hands and body parts shall be kept clear of flanges, spools and supports and alignment performed using suitable tools."}</td>
                    <td>{isTurkish ? "Saha gözlemi" : "Field observation"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Flange hizalama riski" : "Flange alignment hazard"}</td>
                    <td>{isTurkish
                      ? "Flange delikleri parmakla hizalanmamalı; uygun alignment tool kullanılmalı ve kontrolsüz zorlamadan kaçınılmalıdır."
                      : "Flange holes shall not be aligned using fingers; suitable alignment tools shall be used and uncontrolled forcing avoided."}</td>
                    <td>{isTurkish ? "Alignment tool kontrolü" : "Alignment-tool verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Boru / spool düşmesi" : "Dropped pipe / spool"}</td>
                    <td>{isTurkish
                      ? "Rigging ekipmanı ve kaldırma noktaları doğrulanmalı, dışlama alanı oluşturulmalı ve personel askıdaki yük altında bulunmamalıdır."
                      : "Rigging equipment and lifting points shall be verified, an exclusion zone established and personnel kept clear of suspended loads."}</td>
                    <td>{isTurkish ? "Rigging / dışlama alanı" : "Rigging / exclusion-zone check"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Artık basınç / proses maddesi" : "Residual pressure / process contents"}</td>
                    <td>{isTurkish
                      ? "Line opening öncesi izolasyon, LOTO, drenaj ve sıfır basınç doğrulanmalı; proses kalıntısı riski kontrol edilmelidir."
                      : "Before line opening, isolation, LOTO, draining and zero pressure shall be verified and residual process contents controlled."}</td>
                    <td>{isTurkish ? "LOTO / line opening doğrulama" : "LOTO / line-opening verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Geçici destek arızası" : "Temporary support failure"}</td>
                    <td>{isTurkish
                      ? "Pipe stand, chain block ve geçici desteklerin kapasitesi ve stabilitesi doğrulanmalı; uygunsuz doğaçlama destek kullanılmamalıdır."
                      : "Pipe stands, chain blocks and temporary supports shall be checked for capacity and stability and improvised supports shall not be used."}</td>
                    <td>{isTurkish ? "Destek kontrolü" : "Support verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Keskin kenar / metal çapak" : "Sharp edges / metal burrs"}</td>
                    <td>{isTurkish
                      ? "Keskin kenarlar kontrol edilmeli, uygun eldiven kullanılmalı ve çapaklar güvenli yöntemle giderilmelidir."
                      : "Sharp edges shall be controlled, suitable gloves worn and burrs removed using a safe method."}</td>
                    <td>{isTurkish ? "PPE / saha kontrolü" : "PPE / field verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Sıcak çalışma / yangın" : "Hot work / fire"}</td>
                    <td>{isTurkish
                      ? "Kaynak, taşlama veya kesme varsa sıcak çalışma izni, yangın önleme tedbirleri ve gerekli yangın gözcüsü uygulanmalıdır."
                      : "Where welding, grinding or cutting is required, hot-work permits, fire-prevention controls and a fire watch where required shall be applied."}</td>
                    <td>{isTurkish ? "PTW / yangın kontrolü" : "PTW / fire verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-009" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Disk patlaması / kırılması" : "Disc burst / failure"}</td>
                    <td>{isTurkish
                      ? "Doğru tip ve çapta disk kullanılmalı, disk fiziksel olarak kontrol edilmeli ve maksimum disk RPM değeri makine hızına uygun olmalıdır."
                      : "The correct disc type and diameter shall be used, the disc physically inspected and its maximum RPM rating compatible with the machine."}
                    </td>
                    <td>{isTurkish ? "Disk / RPM kontrolü" : "Disc / RPM verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Koruyucu muhafaza eksikliği" : "Missing / incorrect guard"}</td>
                    <td>{isTurkish
                      ? "Makine koruyucu muhafazası doğru konumda ve sağlam olmalı; muhafaza sökülmüş veya değiştirilmiş ekipman kullanılmamalıdır."
                      : "The machine guard shall be correctly positioned and serviceable. Equipment with removed or modified guards shall not be used."}
                    </td>
                    <td>{isTurkish ? "Ekipman kontrolü" : "Equipment verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kickback / kontrol kaybı" : "Kickback / loss of control"}</td>
                    <td>{isTurkish
                      ? "İş parçası sabitlenmeli, makine iki elle kontrol edilmeli ve diskin sıkışmasına neden olabilecek kesme açıları ve aşırı baskıdan kaçınılmalıdır."
                      : "The workpiece shall be secured, the machine controlled with both hands and cutting angles or excessive pressure that may bind the disc shall be avoided."}
                    </td>
                    <td>{isTurkish ? "Operatör / saha gözlemi" : "Operator / field observation"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kıvılcım / sıcak parçacık" : "Sparks / hot particles"}</td>
                    <td>{isTurkish
                      ? "Kıvılcım yönü kontrol edilmeli, çevredeki personel ve ekipman korunmalı ve yanıcı maddeler çalışma alanından uzaklaştırılmalıdır."
                      : "Spark direction shall be controlled, surrounding personnel and equipment protected and combustible materials removed from the work area."}
                    </td>
                    <td>{isTurkish ? "Çalışma alanı kontrolü" : "Work-area verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yangın / tutuşma" : "Fire / ignition"}</td>
                    <td>{isTurkish
                      ? "Gerekli sıcak çalışma kontrolleri uygulanmalı, uygun yangın söndürücü hazır tutulmalı ve risk gerektiriyorsa yangın gözcüsü görevlendirilmelidir."
                      : "Required hot-work controls shall be applied, suitable firefighting equipment provided and a fire watch assigned where required by the risk."}
                    </td>
                    <td>{isTurkish ? "PTW / yangın kontrolü" : "PTW / fire verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Göz / yüz yaralanması" : "Eye / face injury"}</td>
                    <td>{isTurkish
                      ? "Koruyucu gözlük ve tam yüz siperi kullanılmalı; çevredeki çalışanlar da uçuşan parçacıklardan korunmalıdır."
                      : "Safety glasses and a full face shield shall be worn and nearby personnel protected from flying particles."}
                    </td>
                    <td>{isTurkish ? "PPE kontrolü" : "PPE verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Gürültü / titreşim / toz" : "Noise / vibration / dust"}</td>
                    <td>{isTurkish
                      ? "Maruziyet değerlendirilerek gerekli işitme ve solunum koruması kullanılmalı, uzun süreli titreşim maruziyeti kontrol edilmelidir."
                      : "Exposure shall be assessed and required hearing and respiratory protection used, with prolonged vibration exposure controlled."}
                    </td>
                    <td>{isTurkish ? "Maruziyet / PPE kontrolü" : "Exposure / PPE verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Dönen diske temas" : "Contact with rotating disc"}</td>
                    <td>{isTurkish
                      ? "El ve vücut parçaları disk hattından uzak tutulmalı; makine bırakılmadan önce diskin tamamen durması beklenmelidir."
                      : "Hands and body parts shall remain clear of the disc line and the disc allowed to stop completely before the machine is put down."}
                    </td>
                    <td>{isTurkish ? "Operatör kontrolü" : "Operator verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-008" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Elektrik çarpması" : "Electric shock"}</td>
                    <td>
                      {isTurkish
                        ? "Çalışma mümkün olduğunda enerjisiz yapılmalı; devre uygun noktadan izole edilmeli, LOTO uygulanmalı ve gerilim yokluğu doğrulanmalıdır."
                        : "Work shall be performed de-energized wherever practicable; the circuit shall be isolated, LOTO applied and absence of voltage verified."}
                    </td>
                    <td>{isTurkish ? "LOTO / gerilim doğrulama" : "LOTO / voltage verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Ark flaşı / ark patlaması" : "Arc flash / arc blast"}</td>
                    <td>
                      {isTurkish
                        ? "Ark riski değerlendirilerek uygun çalışma yöntemi, mesafe, koruyucu bariyer ve gerekli arc-rated PPE belirlenmelidir."
                        : "Arc hazard shall be assessed and suitable work methods, approach controls, barriers and required arc-rated PPE established."}
                    </td>
                    <td>{isTurkish ? "Risk değerlendirmesi / PPE kontrolü" : "Risk assessment / PPE verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yanlış devre / yanlış izolasyon" : "Wrong circuit / incorrect isolation"}</td>
                    <td>
                      {isTurkish
                        ? "Devre, ekipman etiketi, şema ve izolasyon noktaları çalışma öncesi doğrulanmalı; geri besleme ihtimali kontrol edilmelidir."
                        : "Circuit identity, equipment labels, drawings and isolation points shall be verified before work and possible backfeed checked."}
                    </td>
                    <td>{isTurkish ? "Devre / izolasyon doğrulama" : "Circuit / isolation verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Test cihazı hatası" : "Test instrument failure"}</td>
                    <td>
                      {isTurkish
                        ? "Göreve uygun, sağlam ve gerektiğinde kalibre edilmiş test cihazı kullanılmalı; cihazın çalışması gerilim yokluğu testinden önce ve sonra doğrulanmalıdır."
                        : "A suitable, serviceable and where required calibrated test instrument shall be used, with functionality verified before and after absence-of-voltage testing."}
                    </td>
                    <td>{isTurkish ? "Test cihazı kontrolü" : "Test-instrument verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yakındaki enerjili parçalar" : "Nearby energized parts"}</td>
                    <td>
                      {isTurkish
                        ? "Yakındaki enerjili bölümler belirlenmeli; uygun izolasyon, koruyucu bariyer veya güvenli yaklaşma kontrolü uygulanmalıdır."
                        : "Nearby energized parts shall be identified and suitable insulation, guarding or safe approach controls applied."}
                    </td>
                    <td>{isTurkish ? "Saha / bariyer kontrolü" : "Field / barrier verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yetkisiz erişim" : "Unauthorized access"}</td>
                    <td>
                      {isTurkish
                        ? "Elektrik çalışma alanı bariyer ve uyarılarla kontrol edilmeli; yalnızca yetkili personelin tehlike alanına erişimine izin verilmelidir."
                        : "The electrical work area shall be controlled with barricades and warnings and access restricted to authorized personnel."}
                    </td>
                    <td>{isTurkish ? "Erişim kontrolü" : "Access verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Nem / su / iletken ortam" : "Moisture / water / conductive environment"}</td>
                    <td>
                      {isTurkish
                        ? "Islak veya iletken çalışma koşulları değerlendirilerek uygun ekipman, izolasyon ve ek koruma önlemleri uygulanmalıdır."
                        : "Wet or conductive work conditions shall be assessed and suitable equipment, insulation and additional protective controls applied."}
                    </td>
                    <td>{isTurkish ? "Çevresel saha kontrolü" : "Environmental field verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kontrolsüz yeniden enerjilendirme" : "Uncontrolled re-energization"}</td>
                    <td>
                      {isTurkish
                        ? "Tüm personel güvenli alana çıkmadan, koruyucular yerine takılmadan ve LOTO prosedürü tamamlanmadan devre yeniden enerjilendirilmemelidir."
                        : "The circuit shall not be re-energized until personnel are clear, guards are restored and the LOTO procedure has been completed."}
                    </td>
                    <td>{isTurkish ? "LOTO kapatma / süpervizör kontrolü" : "LOTO closeout / supervisor verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-007" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Göçük / toprak çökmesi" : "Cave-in / soil collapse"}</td>
                    <td>
                      {isTurkish
                        ? "Kazı derinliği, zemin tipi ve saha koşullarına göre uygun şevlendirme, benching, iksa veya trench box sistemi yetkin kişi tarafından belirlenmeli ve uygulanmalıdır."
                        : "Suitable sloping, benching, shoring or trench-box protection shall be determined and implemented by a competent person according to excavation depth, soil type and site conditions."}
                    </td>
                    <td>{isTurkish ? "Yetkin kişi kontrolü" : "Competent-person verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Yeraltı servisine temas" : "Underground service contact"}</td>
                    <td>
                      {isTurkish
                        ? "Güncel servis çizimleri ve saha tespiti doğrulanmalı, servis güzergahları işaretlenmeli ve kritik bölgelerde kontrollü elle kazı uygulanmalıdır."
                        : "Current service drawings and field detection shall be verified, service routes marked and controlled hand digging used in critical areas."}
                    </td>
                    <td>{isTurkish ? "Kazı izni / servis doğrulama" : "Excavation permit / service verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kazıya düşme" : "Fall into excavation"}</td>
                    <td>
                      {isTurkish
                        ? "Kazı kenarları uygun bariyer ve uyarı sistemiyle korunmalı, açık alanlar görünür şekilde kontrol altına alınmalıdır."
                        : "Excavation edges shall be protected with suitable barricades and warning systems and open areas visibly controlled."}
                    </td>
                    <td>{isTurkish ? "Bariyer / kenar kontrolü" : "Barricade / edge verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Mobil ekipman / araç hareketi" : "Mobile equipment / vehicle movement"}</td>
                    <td>
                      {isTurkish
                        ? "Ekskavatör swing radius ve araç hareket alanı dışlama bölgesiyle kontrol edilmeli, görüşün kısıtlı olduğu durumlarda banksman kullanılmalıdır."
                        : "Excavator swing radius and vehicle movement areas shall be controlled by an exclusion zone, with a banksman used where visibility is restricted."}
                    </td>
                    <td>{isTurkish ? "Trafik / banksman kontrolü" : "Traffic / banksman verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Kazı malzemesi / kenar yükü" : "Spoil / edge loading"}</td>
                    <td>
                      {isTurkish
                        ? "Kazı malzemesi, ekipman ve diğer yükler kazı kenarından güvenli mesafede tutulmalı ve kazı duvarına ilave yük bindirilmemelidir."
                        : "Spoil, equipment and other loads shall be maintained a safe distance from the excavation edge and shall not impose additional loading on excavation walls."}
                    </td>
                    <td>{isTurkish ? "Kenar yükü kontrolü" : "Edge-load verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Su girişi / su birikimi" : "Water ingress / accumulation"}</td>
                    <td>
                      {isTurkish
                        ? "Yağmur, yeraltı suyu ve yüzey akışı değerlendirilmelidir. Su birikimi önlenmeli veya uygun pompa / drenaj sistemiyle kontrollü şekilde tahliye edilmelidir."
                        : "Rainfall, groundwater and surface runoff shall be assessed. Water accumulation shall be prevented or controlled using suitable pumping / drainage systems."}
                    </td>
                    <td>{isTurkish ? "Su / drenaj kontrolü" : "Water / drainage verification"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Tehlikeli atmosfer" : "Hazardous atmosphere"}</td>
                    <td>
                      {isTurkish
                        ? "Risk bulunması halinde uygun gaz ölçümü yapılmalı, sonuçlar kabul edilebilir seviyede olmalı ve gerektiğinde havalandırma sağlanmalıdır."
                        : "Where a risk exists, suitable gas testing shall be performed, acceptable results confirmed and ventilation provided where required."}
                    </td>
                    <td>{isTurkish ? "Gaz ölçüm kaydı" : "Gas-test record"}</td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Güvensiz erişim / çıkış" : "Unsafe access / egress"}</td>
                    <td>
                      {isTurkish
                        ? "Kazıya uygun merdiven veya güvenli erişim sistemi sağlanmalı, erişim yolu açık tutulmalı ve acil durumda hızlı çıkış mümkün olmalıdır."
                        : "A suitable ladder or safe access system shall be provided, access kept clear and rapid emergency egress maintained."}
                    </td>
                    <td>{isTurkish ? "Erişim kontrolü" : "Access verification"}</td>
                  </tr>
                </>
              ) : (
                <>


              {documentNo === "SB-MS-005" ? (
                <>
                  <tr>
                    <td>{isTurkish ? "Yük düşmesi" : "Dropped load"}</td>
                    <td>
                      {isTurkish
                        ? "Yük ağırlığı, ağırlık merkezi, kaldırma noktaları ve rigging kapasitesi kaldırma planına göre doğrulanmalıdır. Yük güvenli şekilde bağlanmadan kaldırma yapılmamalıdır."
                        : "Load weight, centre of gravity, lifting points and rigging capacity shall be verified against the lifting plan. The load shall not be lifted until it is safely rigged."}
                    </td>
                    <td>
                      {isTurkish
                        ? "Kaldırma planı / saha kontrolü"
                        : "Lifting plan / field verification"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {isTurkish
                        ? "Vinç stabilite kaybı"
                        : "Loss of crane stability"}
                    </td>
                    <td>
                      {isTurkish
                        ? "Zemin taşıma kapasitesi, vinç seviyelendirmesi, outriggers ve gerektiğinde mat / destek plakaları işe başlamadan önce doğrulanmalıdır."
                        : "Ground bearing capacity, crane levelling, outriggers and mats / support pads where required shall be verified before lifting."}
                    </td>
                    <td>
                      {isTurkish
                        ? "Vinç kurulum kontrolü"
                        : "Crane setup verification"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {isTurkish
                        ? "Rigging ekipmanı arızası"
                        : "Rigging equipment failure"}
                    </td>
                    <td>
                      {isTurkish
                        ? "Sapan, şakıl, kanca ve diğer kaldırma aksesuarlarının sertifikası, WLL / SWL değeri ve fiziksel durumu kontrol edilmelidir. Hasarlı ekipman kullanılmamalıdır."
                        : "Slings, shackles, hooks and other lifting accessories shall be checked for certification, WLL / SWL and physical condition. Defective equipment shall not be used."}
                    </td>
                    <td>
                      {isTurkish
                        ? "Rigging sertifika / ekipman kontrolü"
                        : "Rigging certificate / equipment check"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {isTurkish
                        ? "Aşırı yük / kapasite aşımı"
                        : "Overload / capacity exceedance"}
                    </td>
                    <td>
                      {isTurkish
                        ? "Vinç kapasitesi, çalışma yarıçapı, boom konfigürasyonu ve ilgili load chart değerleri kaldırma öncesinde doğrulanmalı; üretici kapasite sınırları aşılmamalıdır."
                        : "Crane capacity, operating radius, boom configuration and applicable load-chart values shall be verified before lifting. Manufacturer capacity limits shall not be exceeded."}
                    </td>
                    <td>
                      {isTurkish
                        ? "Load chart / kaldırma planı"
                        : "Load chart / lifting plan"}
                    </td>
                  </tr>

                  <tr>
                    <td>{isTurkish ? "Askıdaki yük" : "Suspended load"}</td>
                    <td>
                      {isTurkish
                        ? "Personelin askıdaki yükün altında, yük güzergahında veya yük ile sabit bir yapı arasındaki tehlike alanında bulunmasına izin verilmemelidir. Dışlama alanı korunmalıdır."
                        : "Personnel shall not be permitted beneath suspended loads, within the load path or in danger zones between the load and fixed structures. The exclusion zone shall be maintained."}
                    </td>
                    <td>
                      {isTurkish
                        ? "Dışlama alanı kontrolü"
                        : "Exclusion-zone verification"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {isTurkish
                        ? "Ezilme / sıkışma / pinch point"
                        : "Crushing / trapping / pinch points"}
                    </td>
                    <td>
                      {isTurkish
                        ? "Personel line-of-fire ve pinch point bölgelerinden uzak tutulmalıdır. Yük elle yönlendirilecekse güvenli pozisyon korunmalı ve gerektiğinde uygun tag line kullanılmalıdır."
                        : "Personnel shall remain clear of line-of-fire and pinch-point areas. Where load guidance is required, safe positioning shall be maintained and suitable tag lines used where appropriate."}
                    </td>
                    <td>
                      {isTurkish
                        ? "Saha gözlemi / banksman kontrolü"
                        : "Field observation / banksman check"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {isTurkish
                        ? "İletişim / işaret hatası"
                        : "Communication / signalling failure"}
                    </td>
                    <td>
                      {isTurkish
                        ? "Operasyon için tek yetkili banksman / signalman belirlenmeli ve operatör ile üzerinde anlaşılmış el işaretleri veya telsiz iletişimi kullanılmalıdır. İletişim kaybolursa kaldırma durdurulmalıdır."
                        : "One authorized banksman / signalman shall be designated and agreed hand signals or radio communication used with the operator. The lift shall stop if communication is lost."}
                    </td>
                    <td>
                      {isTurkish
                        ? "Banksman / iletişim kontrolü"
                        : "Banksman / communication check"}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      {isTurkish
                        ? "Rüzgar / hava koşulları"
                        : "Wind / weather conditions"}
                    </td>
                    <td>
                      {isTurkish
                        ? "Rüzgar hızı ve diğer hava koşulları kaldırma planı, üretici talimatları ve proje kriterlerine göre değerlendirilmelidir. Limitler aşıldığında kaldırma durdurulmalıdır."
                        : "Wind speed and other weather conditions shall be assessed against the lifting plan, manufacturer instructions and project criteria. Lifting shall stop when limits are exceeded."}
                    </td>
                    <td>
                      {isTurkish
                        ? "Hava / rüzgar kontrolü"
                        : "Weather / wind verification"}
                    </td>
                  </tr>
                </>
              ) : (
                <>

              {(activity === "LOTO / Enerji İzolasyonu" || activity === "LOTO / Energy Isolation"
                ? [
                    [
                      isTurkish
                        ? "Tanımlanmamış enerji kaynağı"
                        : "Unidentified energy source",
                      isTurkish
                        ? "Elektrik, mekanik, hidrolik, pnömatik, termal, yerçekimi ve proses enerjileri dahil tüm tehlikeli enerji kaynakları işe başlamadan önce belirlenmelidir."
                        : "All hazardous energy sources, including electrical, mechanical, hydraulic, pneumatic, thermal, gravitational and process energy, shall be identified before work begins.",
                      isTurkish
                        ? "Enerji kaynağı listesi"
                        : "Energy-source verification",
                    ],
                    [
                      isTurkish
                        ? "Eksik / yanlış izolasyon"
                        : "Incomplete / incorrect isolation",
                      isTurkish
                        ? "Doğru izolasyon noktaları ekipman ve proses bilgilerine göre belirlenmeli, tüm ilgili kaynaklar güvenli şekilde izole edilmelidir."
                        : "Correct isolation points shall be identified from equipment and process information and all relevant sources safely isolated.",
                      isTurkish
                        ? "İzolasyon noktası kontrolü"
                        : "Isolation-point check",
                    ],
                    [
                      isTurkish
                        ? "Yetkisiz yeniden enerjilendirme"
                        : "Unauthorized re-energization",
                      isTurkish
                        ? "Yetkili personel prosedüre uygun kişisel kilit ve etiket uygulamalı; başkasına ait kilit/etiket yetkisiz şekilde kaldırılmamalıdır."
                        : "Authorized personnel shall apply personal locks and tags in accordance with the procedure; another person's lock/tag shall not be removed without authorization.",
                      isTurkish
                        ? "Kilit / etiket kontrolü"
                        : "Lock / tag verification",
                    ],
                    [
                      isTurkish
                        ? "Depolanmış / artık enerji"
                        : "Stored / residual energy",
                      isTurkish
                        ? "Basınç, yay, yerçekimi, kondansatör, sıcaklık ve diğer depolanmış enerjiler boşaltılmalı, bloke edilmeli veya güvenli hale getirilmelidir."
                        : "Pressure, springs, gravity, capacitors, thermal energy and other stored energy shall be released, blocked or otherwise made safe.",
                      isTurkish
                        ? "Artık enerji kontrolü"
                        : "Stored-energy check",
                    ],
                    [
                      isTurkish
                        ? "Sıfır enerji doğrulanmaması"
                        : "Failure to verify zero energy",
                      isTurkish
                        ? "İzolasyon sonrası uygun test veya try-out yöntemiyle sıfır enerji durumu doğrulanmalı; elektrik için uygun gerilim yokluğu testi yapılmalıdır."
                        : "After isolation, zero-energy condition shall be verified using a suitable test or try-out method; electrical systems shall be tested for absence of voltage.",
                      isTurkish
                        ? "Zero-energy / test sonucu"
                        : "Zero-energy / test result",
                    ],
                    [
                      isTurkish
                        ? "Çalışma sırasında izolasyon değişikliği"
                        : "Isolation change during work",
                      isTurkish
                        ? "İzolasyon noktaları ve LOTO sınırları çalışma boyunca korunmalı; herhangi bir değişiklikte iş durdurulmalı ve izolasyon yeniden doğrulanmalıdır."
                        : "Isolation points and LOTO boundaries shall be maintained throughout the work; work shall stop and isolation be reverified if any change occurs.",
                      isTurkish
                        ? "LOTO sınırı kontrolü"
                        : "LOTO-boundary verification",
                    ],
                    [
                      isTurkish
                        ? "Kontrolsüz yeniden devreye alma"
                        : "Uncontrolled recommissioning",
                      isTurkish
                        ? "Tüm personel ve ekipmanın güvenli konumda olduğu doğrulanmalı, kişisel kilitler yetkili kişilerce kaldırılmalı ve enerji kontrollü şekilde geri verilmelidir."
                        : "Confirm personnel and equipment are in a safe condition, personal locks are removed by authorized persons and energy is restored in a controlled manner.",
                      isTurkish
                        ? "Yeniden devreye alma kontrolü"
                        : "Recommissioning verification",
                    ],
                  ]
                : activity === "Kapalı Alana Giriş" || activity === "Confined Space Entry"
                ? [
                    [
                      isTurkish
                        ? "Oksijen yetersizliği / zenginliği"
                        : "Oxygen deficiency / enrichment",
                      isTurkish
                        ? "Giriş öncesinde ve gerekli olduğu sürece çalışma sırasında kalibre edilmiş uygun gaz ölçüm cihazıyla oksijen seviyesi kontrol edilmeli ve kabul kriterleri sağlanmalıdır."
                        : "Oxygen concentration shall be checked before entry and, where required, continuously during the work using suitable calibrated gas-detection equipment, and acceptance criteria shall be maintained.",
                      isTurkish
                        ? "O₂ ölçümü / kayıt"
                        : "O₂ test / record",
                    ],
                    [
                      isTurkish
                        ? "Yanıcı atmosfer"
                        : "Flammable atmosphere",
                      isTurkish
                        ? "LEL seviyesi uygun gaz ölçüm cihazıyla kontrol edilmeli, kabul sınırları aşılırsa giriş yapılmamalı veya çalışma derhal durdurulmalıdır."
                        : "LEL shall be monitored using suitable gas-detection equipment. Entry shall not proceed, or work shall stop immediately, if acceptable limits are exceeded.",
                      isTurkish
                        ? "LEL ölçümü"
                        : "LEL verification",
                    ],
                    [
                      isTurkish
                        ? "Toksik gaz / buhar"
                        : "Toxic gases / vapours",
                      isTurkish
                        ? "H₂S, CO ve prosese bağlı diğer potansiyel toksik maddeler risk değerlendirmesine göre ölçülmeli ve kabul limitleri doğrulanmalıdır."
                        : "H₂S, CO and other process-specific toxic contaminants shall be tested as required by the risk assessment and verified against acceptable limits.",
                      isTurkish
                        ? "Gaz testi sonucu"
                        : "Gas-test result",
                    ],
                    [
                      isTurkish
                        ? "Beklenmeyen enerji / proses girişi"
                        : "Unexpected energy / process ingress",
                      isTurkish
                        ? "Elektrik, mekanik, hidrolik, pnömatik ve proses kaynakları LOTO ve gerekli pozitif izolasyon yöntemleriyle güvenli şekilde izole edilmeli ve giriş öncesi doğrulanmalıdır."
                        : "Electrical, mechanical, hydraulic, pneumatic and process sources shall be safely isolated using LOTO and required positive-isolation methods and verified before entry.",
                      isTurkish
                        ? "LOTO / izolasyon doğrulama"
                        : "LOTO / isolation verification",
                    ],
                    [
                      isTurkish
                        ? "Havalandırma yetersizliği"
                        : "Inadequate ventilation",
                      isTurkish
                        ? "Gerektiğinde mekanik havalandırma kurulmalı, temiz hava kaynağı kullanılmalı ve havalandırmanın etkinliği atmosfer ölçümleriyle doğrulanmalıdır."
                        : "Mechanical ventilation shall be provided where required, using a clean air source, and its effectiveness shall be verified by atmospheric testing.",
                      isTurkish
                        ? "Havalandırma kontrolü"
                        : "Ventilation verification",
                    ],
                    [
                      isTurkish
                        ? "İletişim / gözetim kaybı"
                        : "Loss of communication / monitoring",
                      isTurkish
                        ? "Gözcü giriş noktasında sürekli görev yapmalı, içerideki personeli takip etmeli ve uygun iletişim sistemi çalışma süresince aktif tutulmalıdır."
                        : "The attendant shall remain at the entry point, continuously track entrants and maintain an effective communication system throughout the entry.",
                      isTurkish
                        ? "Gözcü / iletişim kontrolü"
                        : "Attendant / communication check",
                    ],
                    [
                      isTurkish
                        ? "Kurtarma ihtiyacı"
                        : "Rescue requirement",
                      isTurkish
                        ? "Giriş başlamadan önce göreve uygun kurtarma planı, ekipmanı ve gerekli kurtarma personeli hazır olmalıdır. Uygulanabilir olduğunda giriş yapmadan kurtarma yöntemi tercih edilmelidir."
                        : "A task-appropriate rescue plan, equipment and required rescue personnel shall be ready before entry. Non-entry rescue shall be preferred where feasible.",
                      isTurkish
                        ? "Kurtarma planı hazır"
                        : "Rescue plan confirmed",
                    ],
                  ]
                : activity === "Sıcak Çalışma" || activity === "Hot Work"
                ? [
                    [
                      isTurkish ? "Yangın / tutuşma" : "Fire / ignition",
                      isTurkish
                        ? "Yanıcı ve parlayıcı malzemeler çalışma alanından uzaklaştırılmalı veya uygun yanmaz malzeme ile korunmalıdır."
                        : "Combustible and flammable materials shall be removed from the work area or protected using suitable fire-resistant materials.",
                      isTurkish
                        ? "Alan ve yangın yükü kontrolü"
                        : "Area / fire-load inspection",
                    ],
                    [
                      isTurkish
                        ? "Kıvılcım ve sıcak metal"
                        : "Sparks and hot metal",
                      isTurkish
                        ? "Kıvılcımın alt seviyelere, açıklıklara ve bitişik alanlara ulaşması önlenmeli; gerektiğinde kaynak perdesi ve yanmaz örtü kullanılmalıdır."
                        : "Sparks shall be prevented from reaching lower levels, openings and adjacent areas; welding screens and fire-resistant blankets shall be used where required.",
                      isTurkish
                        ? "Kıvılcım yayılım kontrolü"
                        : "Spark-spread verification",
                    ],
                    [
                      isTurkish
                        ? "Yanıcı / tehlikeli atmosfer"
                        : "Flammable / hazardous atmosphere",
                      isTurkish
                        ? "Risk değerlendirmesi veya saha prosedürü gerektiriyorsa sıcak çalışma öncesinde ve gerektiğinde çalışma sırasında uygun atmosfer ölçümü yapılmalıdır."
                        : "Where required by the risk assessment or site procedure, suitable atmospheric testing shall be completed before and, where necessary, during hot work.",
                      isTurkish
                        ? "Gaz ölçümü / PTW kontrolü"
                        : "Gas test / PTW verification",
                    ],
                    [
                      isTurkish
                        ? "Gaz tüpleri ve ekipmanı"
                        : "Gas cylinders and equipment",
                      isTurkish
                        ? "Gaz tüpleri dik ve sabit tutulmalı; hortumlar, regülatörler, bağlantılar ve gerekli geri tepme emniyet tertibatları kullanım öncesi kontrol edilmelidir."
                        : "Gas cylinders shall be upright and secured; hoses, regulators, connections and required flashback protection shall be inspected before use.",
                      isTurkish
                        ? "Ekipman kontrolü"
                        : "Equipment inspection",
                    ],
                    [
                      isTurkish
                        ? "Elektrik tehlikesi"
                        : "Electrical hazard",
                      isTurkish
                        ? "Kaynak ve taşlama ekipmanının kabloları, fişleri, bağlantıları ve genel durumu kontrol edilmeli; hasarlı ekipman kullanılmamalıdır."
                        : "Cables, plugs, connections and the general condition of welding and grinding equipment shall be checked; defective equipment shall not be used.",
                      isTurkish
                        ? "Kullanım öncesi kontrol"
                        : "Pre-use inspection",
                    ],
                    [
                      isTurkish
                        ? "Kaynak dumanı / maruziyet"
                        : "Welding fumes / exposure",
                      isTurkish
                        ? "Çalışma alanında yeterli havalandırma sağlanmalı; risk değerlendirmesine göre lokal emiş veya uygun solunum koruması kullanılmalıdır."
                        : "Adequate ventilation shall be provided; local extraction or suitable respiratory protection shall be used where required by the risk assessment.",
                      isTurkish
                        ? "Havalandırma kontrolü"
                        : "Ventilation verification",
                    ],
                    [
                      isTurkish
                        ? "Yangın gözetimi"
                        : "Fire watch",
                      isTurkish
                        ? "Uygun yangın söndürme ekipmanı hazır bulundurulmalı ve yetkilendirilmiş yangın gözcüsü çalışma sırasında ve gerekli çalışma sonrası süre boyunca alanı izlemelidir."
                        : "Suitable firefighting equipment shall be immediately available and an assigned fire watch shall monitor the area during the work and for the required post-work period.",
                      isTurkish
                        ? "Yangın gözcüsü hazır"
                        : "Fire watch confirmed",
                    ],
                  ]
                : [
                    [
                      isTurkish ? "Yüksekten düşme" : "Fall from height",
                      isTurkish
                        ? "Uygun çalışma platformu, korkuluk sistemi veya risk değerlendirmesine göre onaylı kişisel düşüş koruma sistemi hazır olmalıdır."
                        : "Suitable work platform, guardrail system or approved personal fall-protection system shall be available as required by the risk assessment.",
                      isTurkish
                        ? "Süpervizör saha kontrolü"
                        : "Supervisor field verification",
                    ],
                    [
                      isTurkish ? "Düşen cisim" : "Dropped objects",
                      isTurkish
                        ? "Alt alan gerektiğinde bariyerlenmeli, gevşek malzemeler emniyete alınmalı ve uygun durumlarda tool lanyard kullanılmalıdır."
                        : "The area below shall be barricaded where required, loose materials secured and tool lanyards used where appropriate.",
                      isTurkish
                        ? "Dışlama alanı / housekeeping kontrolü"
                        : "Exclusion-zone / housekeeping check",
                    ],
                    [
                      isTurkish
                        ? "Uygunsuz erişim veya platform"
                        : "Unsafe access or platform",
                      isTurkish
                        ? "İskele, platform, MEWP veya kullanılan diğer erişim sistemi işe başlamadan önce uygunluk açısından kontrol edilmelidir."
                        : "Scaffold, platform, MEWP or other access system used for the task shall be checked for suitability before work starts.",
                      isTurkish
                        ? "Yetkin kişi / ekipman kontrolü"
                        : "Competent-person / equipment check",
                    ],
                    [
                      isTurkish
                        ? "Olumsuz hava koşulları"
                        : "Adverse weather",
                      isTurkish
                        ? "Rüzgar, yağış, görüş ve yüzey koşullarının güvenli çalışmaya uygun olduğu doğrulanmalıdır."
                        : "Wind, precipitation, visibility and surface conditions shall be confirmed suitable for safe work.",
                      isTurkish
                        ? "Çalışma öncesi saha değerlendirmesi"
                        : "Pre-work site assessment",
                    ],
                    [
                      isTurkish
                        ? "Kurtarma ihtiyacı"
                        : "Rescue requirement",
                      isTurkish
                        ? "Düşme sonrası askıda kalma ihtimali varsa uygun kurtarma yöntemi, ekipmanı ve görevli personel önceden belirlenmelidir."
                        : "Where suspension following a fall is possible, a suitable rescue method, equipment and responsible personnel shall be identified in advance.",
                      isTurkish
                        ? "Kurtarma planı hazır"
                        : "Rescue plan available",
                    ],
                  ]
              ).map(([hazard, control, verification]) => (
                <tr key={hazard}>
                  <td>{hazard}</td>
                  <td>{control}</td>
                  <td>{verification}</td>
                </tr>
              ))}
            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            
                </>
              )}

            </tbody>
          </table>
        </section>

        {/* METHOD / SEQUENCE */}
        <section className="ms-sequence-section">
          <h2>
            {isTurkish
              ? "9. ÇALIŞMA METODU / İŞ SIRASI"
              : "9. METHOD / SEQUENCE OF WORK"}
          </h2>

          <table className="ms-method-table">
            <thead>
              <tr>
                <th className="ms-number">No</th>
                <th>{isTurkish ? "İş Adımı" : "Work Sequence"}</th>
                <th>{isTurkish ? "Tehlikeler" : "Hazards"}</th>
                <th>{isTurkish ? "Kontrol Önlemleri" : "Control Measures"}</th>
                <th className="ms-responsible">
                  {isTurkish ? "Sorumlu" : "Responsible"}
                </th>
              </tr>
            </thead>

            <tbody>
              {methodSteps.map((item, index) => (
                <tr key={item.id}>
                  <td className="ms-number">{String(index + 1).padStart(2, "0")}</td>

                  <td>{item.step || "-"}</td>
                  <td>{item.hazards || "-"}</td>
                  <td>{item.controls || "-"}</td>
                  <td>{item.responsible || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <TextBlock
          title={
            isTurkish
              ? "10. ACİL DURUM DÜZENLEMELERİ"
              : "10. EMERGENCY ARRANGEMENTS"
          }
          value={emergencyArrangements}
        />

        <TextBlock
          title={
            isTurkish
              ? "11. ÇEVRESEL KONTROLLER"
              : "11. ENVIRONMENTAL CONTROLS"
          }
          value={environmentalControls}
        />

        <TextBlock
          title={isTurkish ? "12. REFERANSLAR" : "12. REFERENCES"}
          value={references}
        />

        {/* APPROVAL */}
        <section className="ms-approval">
          <h2>{isTurkish ? "13. ONAY" : "13. APPROVAL"}</h2>

          <table>
            <thead>
              <tr>
                <th>{isTurkish ? "Hazırlayan" : "Prepared By"}</th>
                <th>{isTurkish ? "Kontrol Eden" : "Reviewed By"}</th>
                <th>{isTurkish ? "Onaylayan" : "Approved By"}</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  <strong>{preparedBy || "-"}</strong>
                  <div className="ms-signature-space" />
                  <small>
                    {isTurkish ? "İmza / Tarih" : "Signature / Date"}
                  </small>
                </td>

                <td>
                  <strong>{reviewedBy || "-"}</strong>
                  <div className="ms-signature-space" />
                  <small>
                    {isTurkish ? "İmza / Tarih" : "Signature / Date"}
                  </small>
                </td>

                <td>
                  <strong>{approvedBy || "-"}</strong>
                  <div className="ms-signature-space" />
                  <small>
                    {isTurkish ? "İmza / Tarih" : "Signature / Date"}
                  </small>
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <footer className="ms-footer">
          <span>SERNEM • Professional HSE Document</span>

          <span>
            {documentNo || "SB-MS"} • Rev. {revision || "-"}
          </span>
        </footer>
      </div>

      <style jsx global>{`
        #method-statement-print {
          display: none;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 7mm;
          }

          /*
           * IMPORTANT:
           * The editor must be removed from print layout completely.
           * visibility:hidden alone still reserves its height and creates
           * blank PDF pages.
           */
          main {
            min-height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          main > div:not(#method-statement-print) {
            display: none !important;
          }

          main > section:not(#method-statement-print) {
            display: none !important;
          }

          #method-statement-print {
            position: static !important;
            inset: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            min-height: 0 !important;
          }

          html,
          body {
            background: white !important;
          }

          body * {
            visibility: hidden !important;
          }

          #method-statement-print,
          #method-statement-print * {
            visibility: visible !important;
          }

          #method-statement-print {
            display: block !important;
            position: absolute;
            inset: 0 auto auto 0;
            width: 100%;
            background: white;
            color: #0f172a;
            font-family: Arial, Helvetica, sans-serif;
            font-size: 8.6pt;
            line-height: 1.32;
          }

          .ms-document-header {
            display: grid;
            grid-template-columns: 1.1fr 2fr 1.15fr;
            border: 1.4px solid #334155;
            margin-bottom: 8px;
            page-break-inside: avoid;
          }

          .ms-brand,
          .ms-title-area,
          .ms-doc-control {
            padding: 7px;
          }

          .ms-brand {
            display: flex;
            align-items: center;
            border-right: 1px solid #94a3b8;
          }

          .ms-logo-text strong {
            display: block;
            font-size: 16pt;
            line-height: 1;
            color: #0f172a;
          }

          .ms-logo-text strong span {
            color: #10b981;
          }

          .ms-logo-text small {
            display: block;
            margin-top: 3px;
            font-size: 5.6pt;
            font-weight: 700;
            letter-spacing: 1.1px;
            color: #64748b;
          }

          .ms-title-area {
            display: flex;
            flex-direction: column;
            justify-content: center;
            border-right: 1px solid #94a3b8;
          }

          .ms-document-type {
            font-size: 7pt;
            font-weight: 800;
            letter-spacing: 1.4px;
            color: #059669;
          }

          .ms-title-area h1 {
            margin: 4px 0 0;
            font-size: 12.5pt;
            line-height: 1.1;
            text-transform: uppercase;
          }

          .ms-doc-control {
            padding: 0;
          }

          .ms-doc-control > div {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 24px;
            border-bottom: 1px solid #cbd5e1;
          }

          .ms-doc-control > div:last-child {
            border-bottom: 0;
          }

          .ms-doc-control span,
          .ms-doc-control strong {
            padding: 4px 5px;
            font-size: 6.6pt;
          }

          .ms-doc-control span {
            font-weight: 700;
            background: #f1f5f9;
          }

          .ms-info-table,
          .ms-method-table,
          .ms-approval table {
            width: 100%;
            border-collapse: collapse;
          }

          .ms-info-table {
            margin-bottom: 6px;
            page-break-inside: avoid;
          }

          .ms-info-table th,
          .ms-info-table td {
            border: 1px solid #94a3b8;
            padding: 4px 6px;
          }

          .ms-info-table th {
            width: 14%;
            background: #e2e8f0;
            font-size: 7pt;
            text-align: left;
          }

          .ms-info-table td {
            width: 36%;
            font-weight: 600;
          }

          .ms-print-block {
            margin: 0 0 5px;
            page-break-inside: avoid;
          }

          .ms-print-block h2,
          .ms-sequence-section > h2,
          .ms-approval > h2 {
            margin: 0;
            padding: 4px 6px;
            background: #0f172a;
            color: white;
            font-size: 7.4pt;
            letter-spacing: 0.35px;
          }

          .ms-print-text {
            white-space: pre-wrap;
            border: 1px solid #cbd5e1;
            border-top: 0;
            padding: 5px 6px;
          }

          .ms-two-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 5px;
            align-items: start;
          }

          .ms-sequence-section {
            margin-top: 2px;
          }

          .ms-method-table {
            table-layout: fixed;
            font-size: 6.7pt;
          }

          .ms-method-table thead {
            display: table-header-group;
          }

          .ms-method-table tr {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          .ms-method-table th,
          .ms-method-table td {
            border: 1px solid #94a3b8;
            padding: 4px 5px;
            vertical-align: top;
            white-space: pre-wrap;
            word-break: normal;
            overflow-wrap: anywhere;
          }

          .ms-method-table th {
            background: #dbeafe;
            color: #0f172a;
            text-align: left;
            font-size: 7pt;
          }

          .ms-method-table .ms-number {
            width: 5%;
            text-align: center;
            font-weight: 800;
          }

          .ms-method-table th:nth-child(2) {
            width: 22%;
          }

          .ms-method-table th:nth-child(3) {
            width: 20%;
          }

          .ms-method-table th:nth-child(4) {
            width: 38%;
          }

          .ms-method-table .ms-responsible {
            width: 15%;
          }

          .ms-approval {
            margin-top: 6px;
            page-break-inside: avoid;
          }

          .ms-approval th,
          .ms-approval td {
            border: 1px solid #94a3b8;
            width: 33.333%;
            padding: 5px;
            text-align: left;
          }

          .ms-approval th {
            background: #e2e8f0;
            font-size: 7pt;
          }

          .ms-approval td {
            height: 46px;
            vertical-align: top;
          }

          .ms-signature-space {
            height: 18px;
          }

          .ms-approval small {
            color: #64748b;
            font-size: 6.5pt;
          }


          .ms-pretask-section {
            margin-top: 4px;
            page-break-inside: auto;
            break-inside: auto;
          }

          .ms-pretask-section > h2 {
            margin: 0;
            padding: 4px 6px;
            background: #0f172a;
            color: white;
            font-size: 7.4pt;
            letter-spacing: 0.35px;
          }

          .ms-pretask-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            font-size: 6.1pt;
            line-height: 1.2;
          }

          .ms-pretask-table th,
          .ms-pretask-table td {
            border: 1px solid #94a3b8;
            padding: 2px 4px;
            vertical-align: top;
          }

          .ms-pretask-table th {
            background: #dbeafe;
            color: #0f172a;
            text-align: left;
            font-size: 6.4pt;
          }

          .ms-pretask-table th:nth-child(1) {
            width: 22%;
          }

          .ms-pretask-table th:nth-child(2) {
            width: 55%;
          }

          .ms-pretask-table th:nth-child(3) {
            width: 23%;
          }

          .ms-sequence-section {
            page-break-before: auto;
            break-before: auto;
          }

          .ms-approval {
            break-inside: avoid;
            page-break-inside: avoid;
          }

          .ms-footer {
            break-inside: avoid;
          }

          .ms-footer {
            display: flex;
            justify-content: space-between;
            margin-top: 5px;
            border-top: 1px solid #94a3b8;
            padding-top: 4px;
            font-size: 6.5pt;
            color: #64748b;
          }
        }
      `}</style>
    </>
  );
}

function isTurishFix(
  isTurkish: boolean,
  tr: string,
  en: string
) {
  return isTurkish ? tr : en;
}
