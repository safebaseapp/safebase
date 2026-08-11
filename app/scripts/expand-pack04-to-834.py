from pathlib import Path
from datetime import datetime
import re
import shutil

FILE = Path("lib/risk-library/pack-04.ts")

DATA = {
"roof-maintenance": [
("Çatı kaplamasının bakım sırasında hasar görmesi","Roof covering damaged during maintenance","Düşme veya yapısal zayıflama","Fall or structural weakening","Çatı bakım çalışanları","Roof maintenance workers","Çatı yüzeyi ve erişim kontrolü","Roof surface and access inspection","Çalışma öncesi zayıf ve hasarlı bölgeleri belirle ve işaretle","Identify and mark weak or damaged areas before work"),
("Çatıdaki ekipman veya parçanın aşağı düşmesi","Equipment or components falling from roof","Aşağıdaki personelin ciddi yaralanması","Serious injury to personnel below","Alt seviyedeki çalışanlar","Personnel below","Exclusion zone ve malzeme sabitleme","Exclusion zone and material securing","Aletleri bağla ve çatı altındaki alanı fiziksel olarak izole et","Tether tools and physically isolate the area below"),
("Bakım sırasında hava koşullarının kötüleşmesi","Deteriorating weather during roof maintenance","Denge kaybı veya yüksekten düşme","Loss of balance or fall from height","Çatı çalışanları","Roof workers","Hava durumu takibi ve çalışma limiti","Weather monitoring and work limits","Kuvvetli rüzgar, yağış veya yıldırım koşullarında işi durdur","Stop work during strong winds, precipitation or lightning"),
],

"mewp-inspection": [
("Acil indirme sisteminin çalışmaması","Failure of emergency lowering system","Platformdaki personelin mahsur kalması","Personnel becoming stranded on platform","MEWP kullanıcıları","MEWP users","Pre-use inspection ve function test","Pre-use inspection and function test","Acil indirme sistemini kullanımdan önce fonksiyonel olarak test et","Function-test the emergency lowering system before use"),
("Lastik veya tekerlek hasarının fark edilmemesi","Undetected tire or wheel damage","Denge kaybı veya MEWP devrilmesi","Loss of stability or MEWP overturn","MEWP kullanıcıları","MEWP users","Görsel günlük kontrol","Daily visual inspection","Lastik, jant ve bağlantıları günlük kontrol listesine dahil et","Include tires, wheels and fasteners in the daily checklist"),
("Limit switch veya alarm arızası","Limit switch or alarm malfunction","Güvensiz hareket veya çarpışma","Unsafe movement or collision","MEWP operatörü ve çevredeki çalışanlar","MEWP operator and nearby workers","Functional safety-device test","Functional safety-device test","Alarm, interlock ve limit switchleri kullanımdan önce test et","Test alarms, interlocks and limit switches before use"),
],

"mobile-equipment-inspection": [
("Fren sistemindeki arızanın fark edilmemesi","Undetected braking-system defect","Kontrol kaybı veya çarpışma","Loss of control or collision","Operatörler ve saha çalışanları","Operators and site personnel","Pre-use inspection","Pre-use inspection","Servis ve park frenlerini vardiya başlangıcında fonksiyonel test et","Function-test service and parking brakes at the start of the shift"),
("Geri görüş sisteminin çalışmaması","Failure of reversing visibility system","Yaya veya ekipmanla çarpışma","Collision with pedestrians or equipment","Operatörler ve yayalar","Operators and pedestrians","Camera, mirror and alarm checks","Camera, mirror and alarm checks","Kamera, ayna ve geri vites alarmını kullanımdan önce doğrula","Verify cameras, mirrors and reversing alarms before use"),
("Hidrolik sistemde kaçak","Hydraulic-system leakage","Kontrol kaybı, kayma veya çevresel kirlilik","Loss of control, slip hazard or environmental contamination","Operatörler ve bakım personeli","Operators and maintenance personnel","Visual leak inspection","Visual leak inspection","Hortum, fitting ve silindirleri kaçak açısından kontrol et","Inspect hoses, fittings and cylinders for leakage"),
],

"excavator-operation": [
("Ekskavatörün kazı kenarına fazla yaklaşması","Excavator operating too close to excavation edge","Zemin çökmesi veya ekipmanın devrilmesi","Ground collapse or equipment overturn","Operatör ve kazı çalışanları","Operator and excavation workers","Safe stand-off distance","Safe stand-off distance","Kazı kenarından güvenli ekipman mesafesini saha koşullarına göre belirle","Establish a safe equipment stand-off distance based on site conditions"),
("Ataşmanın personel üzerinden geçirilmesi","Excavator attachment passing over personnel","Ezilme veya ölüm","Crushing or fatality","Saha çalışanları","Site personnel","Swing-radius exclusion zone","Swing-radius exclusion zone","Personelin bucket veya kaldırılan yük altında bulunmasını engelle","Prevent personnel from standing beneath the bucket or suspended load"),
("Yeraltı hizmet hattına temas","Contact with underground utility","Elektrik çarpması, gaz kaçağı veya flooding","Electric shock, gas release or flooding","Operatör ve saha çalışanları","Operator and site personnel","Permit, utility survey and markings","Permit, utility survey and markings","Kazı öncesi yeraltı hatlarının konumunu doğrula ve işaretle","Verify and mark underground utilities before excavation"),
],

"loader-operation": [
("Loader bucket ile görüş alanının kapanması","Loader bucket obstructing operator visibility","Araç veya yaya çarpışması","Vehicle or pedestrian collision","Operatörler ve yayalar","Operators and pedestrians","Travel-position requirement","Travel-position requirement","Seyir sırasında bucketı güvenli düşük pozisyonda tut","Keep the bucket in a safe low position while travelling"),
("Eğimli zeminde loader devrilmesi","Loader overturn on sloped ground","Ezilme veya ciddi yaralanma","Crushing or serious injury","Loader operatörü","Loader operator","Slope limits and seat belt","Slope limits and seat belt","Üretici eğim limitlerini aşma ve emniyet kemeri kullan","Do not exceed manufacturer slope limits and use the seat belt"),
("Bucket altında bakım yapılması","Maintenance beneath raised bucket","Bucket düşmesi sonucu ezilme","Crushing due to bucket descent","Bakım çalışanları","Maintenance workers","Mechanical support and isolation","Mechanical support and isolation","Kaldırılmış bucket altında çalışmadan önce mekanik olarak sabitle","Mechanically secure the raised bucket before working beneath it"),
],

"telehandler-operation": [
("Yük uzatıldığında kapasitenin aşılması","Exceeding capacity with boom extended","Telehandler devrilmesi","Telehandler overturn","Operatör ve çevredeki çalışanlar","Operator and nearby workers","Load chart and rated capacity","Load chart and rated capacity","Yük ağırlığı ve boom konumunu load chart ile doğrula","Verify load weight and boom position against the load chart"),
("Fork üzerindeki yükün sabitlenmemesi","Unsecured load on telehandler forks","Yükün düşmesi","Dropped load","Saha çalışanları","Site personnel","Load stability assessment","Load stability assessment","Düzensiz yükleri uygun attachment veya restraint ile sabitle","Secure irregular loads with suitable attachments or restraints"),
("Boom ile enerji hattına yaklaşılması","Telehandler boom approaching overhead power lines","Elektrik çarpması veya ölüm","Electric shock or fatality","Operatör ve saha çalışanları","Operator and site personnel","Clearance and spotter control","Clearance and spotter control","Enerji hatlarından gerekli güvenli yaklaşma mesafesini koru","Maintain the required safe clearance from overhead power lines"),
],

"vehicle-reversing": [
("Banksman'ın sürücünün kör noktasında kalması","Banksman entering driver's blind spot","Banksman'a araç çarpması","Vehicle striking the banksman","Banksman ve sürücü","Banksman and driver","Defined signaling position","Defined signaling position","Banksman'ı sürücünün sürekli görebileceği güvenli konumda tut","Keep the banksman in a safe position continuously visible to the driver"),
("Geri manevra alanına yaya girmesi","Pedestrian entering reversing area","Araç-yaya çarpışması","Vehicle-pedestrian collision","Yayalar","Pedestrians","Restricted reversing zone","Restricted reversing zone","Manevra başlamadan alanı temizle ve yetkisiz girişi engelle","Clear the area before reversing and prevent unauthorized entry"),
("Geri vites alarmının ortam gürültüsünde duyulmaması","Reversing alarm masked by ambient noise","Yaklaşan aracın fark edilmemesi","Failure to detect approaching vehicle","Saha çalışanları","Site personnel","Visual and audible warning systems","Visual and audible warning systems","Yüksek gürültülü alanlarda ek görsel ikaz veya banksman kullan","Use additional visual warnings or a banksman in high-noise areas"),
],

"loading-unloading": [
("Araç yükleme sırasında hareket etmesi","Vehicle movement during loading or unloading","Düşme, sıkışma veya ekipman çarpışması","Fall, entrapment or equipment collision","Yükleme ekibi","Loading crew","Parking brake and wheel chocks","Parking brake and wheel chocks","Yükleme başlamadan aracı immobilize et","Immobilize the vehicle before loading begins"),
("Dengesiz yükün araçtan düşmesi","Unstable load falling from vehicle","Ezilme veya ciddi yaralanma","Crushing or serious injury","Yükleme personeli","Loading personnel","Load securing and controlled release","Load securing and controlled release","Bağları çözmeden önce yük stabilitesini değerlendir","Assess load stability before releasing restraints"),
("Yükleme ekipmanı ile personel arasında sıkışma","Entrapment between loading equipment and personnel","Ezilme yaralanması","Crushing injury","Saha çalışanları","Site personnel","Exclusion zone and communication","Exclusion zone and communication","Forklift veya crane çalışma alanında yayaları ayır","Segregate pedestrians from forklift or crane operating areas"),
],

"material-storage": [
("Malzemelerin düzensiz ve stabil olmayan şekilde istiflenmesi","Materials stacked in an unstable arrangement","Malzeme düşmesi veya ezilme","Falling materials or crushing","Depo ve saha çalışanları","Storage and site personnel","İstifleme kuralları ve düzenli saha kontrolü","Stacking rules and routine area inspection","Malzemeleri stabil taban üzerinde güvenli yükseklikte istifle","Stack materials on a stable base within a safe height"),
("Depolama alanında acil erişimin engellenmesi","Emergency access obstructed by stored materials","Tahliye veya acil müdahalenin gecikmesi","Delayed evacuation or emergency response","Tüm saha personeli","All site personnel","İşaretlenmiş erişim ve kaçış yolları","Marked access and escape routes","Acil çıkış, yangın ekipmanı ve geçiş yollarını sürekli açık tut","Keep emergency exits, firefighting equipment and access routes continuously clear"),
("Depolama rafının veya alanının kapasitesinin aşılması","Exceeding storage rack or area capacity","Raf çökmesi, malzeme düşmesi veya ezilme","Rack collapse, falling materials or crushing","Depo çalışanları ve yakın saha personeli","Storage personnel and nearby site workers","Raf kapasite etiketi ve düzenli depolama kontrolü","Rack capacity labeling and routine storage inspection","Raf ve depolama alanlarının belirtilen yük kapasitesini aşma","Do not exceed the specified load capacity of racks and storage areas"),
],

"steel-plate-handling": [
("Çelik plakanın keskin kenarına temas","Contact with sharp steel-plate edge","Kesik veya el yaralanması","Laceration or hand injury","Malzeme elleçleyen çalışanlar","Material handlers","Cut-resistant gloves and handling tools","Cut-resistant gloves and handling tools","Keskin kenarları belirle ve elle doğrudan kavramayı önle","Identify sharp edges and avoid direct manual gripping"),
("Plakanın dik konumda devrilmesi","Steel plate tipping from vertical position","Ezilme veya ölüm","Crushing or fatality","Saha çalışanları","Site personnel","Plate rack and restraint","Plate rack and restraint","Dik plakaları uygun rack içinde sabitle","Secure vertical plates in a suitable storage rack"),
("Plate clamp'ın yanlış bağlanması","Incorrect attachment of plate clamp","Plakanın kaldırma sırasında düşmesi","Dropped plate during lifting","Rigging ve saha personeli","Rigging and site personnel","Certified clamp and inspection","Certified clamp and inspection","Clamp kapasitesi, yönü ve kilitlenmesini kaldırma öncesi doğrula","Verify clamp capacity, orientation and locking before lifting"),
],

"cylinder-loading-unloading": [
("Tüp yükleme sırasında el veya parmak sıkışması","Hand or finger entrapment during cylinder loading",
 "El veya parmak yaralanması","Hand or finger injury",
 "Tüp yükleme ve boşaltma personeli","Cylinder loading and unloading personnel",
 "Kontrollü elleçleme ve uygun taşıma ekipmanı","Controlled handling and suitable transport equipment",
 "Tüp ile araç, rack veya diğer tüpler arasındaki sıkışma noktalarından elleri uzak tut","Keep hands clear of pinch points between cylinders, vehicles, racks and other cylinders"),

("Hasarlı veya korozyona uğramış tüpün yüklenmesi","Loading a damaged or corroded cylinder",
 "Gaz kaçağı, basınçlı salım veya ciddi yaralanma","Gas leak, pressurized release or serious injury",
 "Yükleme personeli ve çevredeki çalışanlar","Loading personnel and nearby workers",
 "Görsel tüp kontrolü ve kabul kriterleri","Visual cylinder inspection and acceptance criteria",
 "Hasarlı, ciddi korozyonlu veya sızıntı şüphesi bulunan tüpleri karantinaya al","Quarantine cylinders that are damaged, severely corroded or suspected of leaking"),

("Yükleme alanında tüp trolley veya rampasının kontrolsüz hareketi","Uncontrolled movement of cylinder trolley or loading ramp",
 "Tüpün devrilmesi, sıkışma veya çarpma yaralanması","Cylinder overturn, entrapment or impact injury",
 "Yükleme ve boşaltma çalışanları","Loading and unloading personnel",
 "Uygun trolley, stabil rampa ve kontrollü çalışma alanı","Suitable trolley, stable ramp and controlled work area",
 "Trolley ve rampayı kullanmadan önce sabitle, eğim ve yüzey koşullarını kontrol et","Secure the trolley and ramp before use and verify slope and surface conditions"),
],

"core-drilling": [
("Karot ucunun gizli elektrik hattına temas etmesi","Core drill contacting concealed electrical service","Elektrik çarpması veya ark","Electric shock or arc","Delme çalışanları","Drilling workers","Service scan and permit","Service scan and permit","Delme noktasını başlamadan uygun detection yöntemiyle tara","Scan the drilling location using a suitable detection method before work"),
("Karot parçasının alt seviyeye düşmesi","Core section falling to lower level","Aşağıdaki personelin yaralanması","Injury to personnel below","Alt seviyedeki çalışanlar","Personnel below","Catch system and exclusion zone","Catch system and exclusion zone","Delme alanının altını izole et ve core parçasını kontrollü tut","Isolate the area below and retain the core section under control"),
("Karot makinesinin sıkışarak dönmesi","Core drill binding and rotating unexpectedly","El, kol veya vücut yaralanması","Hand, arm or bodily injury","Delme operatörü","Drill operator","Machine anchoring and torque control","Machine anchoring and torque control","Makineyi uygun şekilde sabitle ve üretici torque kontrolünü kullan","Secure the machine correctly and use manufacturer torque controls"),
],

"concrete-cutting": [
("Kesme diskinin parçalanması","Cutting blade failure","Yüksek hızlı parça çarpması","High-velocity fragment impact","Kesme çalışanları","Cutting workers","Correct blade and guard","Correct blade and guard","Disk tipini, hız limitini ve fiziksel durumunu kullanımdan önce doğrula","Verify blade type, speed rating and condition before use"),
("Beton kesiminde silika tozu oluşması","Silica dust generated during concrete cutting","Solunum sistemi maruziyeti","Respiratory exposure","Kesme çalışanları ve yakındaki personel","Cutting workers and nearby personnel","Wet cutting or local extraction","Wet cutting or local extraction","Uygun ıslak kesim veya toz emiş sistemi kullan","Use suitable wet-cutting or dust-extraction controls"),
("Kesilen beton bölümünün kontrolsüz düşmesi","Uncontrolled fall of cut concrete section","Ezilme veya yapısal hasar","Crushing or structural damage","Saha çalışanları","Site personnel","Temporary support and lifting plan","Temporary support and lifting plan","Kesim tamamlanmadan parçayı destekle ve kontrollü kaldırma planla","Support the section before completing the cut and plan controlled removal"),
],

"wall-floor-penetration": [
("Açılan penetrasyonun korumasız bırakılması","New penetration left unprotected","Personel veya malzemenin açıklıktan düşmesi","Personnel or materials falling through opening","Saha çalışanları","Site personnel","Cover or guardrail","Cover or guardrail","Penetrasyonu oluşturulduğu anda dayanıklı kapak veya bariyerle koru","Protect the penetration immediately with a secure cover or barrier"),
("Duvar içinde gizli hizmet hattına temas","Contact with concealed service in wall","Elektrik, gaz veya su hattı hasarı","Damage to electrical, gas or water service","Çalışanlar","Workers","Service detection and drawings","Service detection and drawings","Kesme veya delme öncesi gizli servisleri doğrula","Verify concealed services before cutting or drilling"),
("Penetrasyon çevresinde yapısal zayıflama","Structural weakening around penetration","Duvar veya döşeme hasarı","Wall or floor damage","Saha çalışanları","Site personnel","Engineering approval","Engineering approval","Kritik penetrasyonları yapısal onay olmadan büyütme veya değiştirme","Do not enlarge or modify critical penetrations without structural approval"),
],

"surface-preparation": [
("Yüzey hazırlığında uçuşan parçacıklar","Flying particles during surface preparation","Göz veya yüz yaralanması","Eye or facial injury","Yüzey hazırlama çalışanları","Surface-preparation workers","Eye and face protection","Eye and face protection","İşlem tipine uygun gözlük ve yüz siperi kullan","Use eye protection and face shield suitable for the task"),
("Kaplama altında tehlikeli eski boya bulunması","Hazardous legacy coating beneath surface","Tehlikeli toz veya kimyasal maruziyet","Hazardous dust or chemical exposure","Çalışanlar","Workers","Coating assessment","Coating assessment","Eski kaplamanın içeriğini işlem öncesi değerlendir","Assess the existing coating composition before disturbance"),
("Taşlama ekipmanının kontrolsüz geri tepmesi","Surface-preparation tool kickback","Kesik veya darbe yaralanması","Laceration or impact injury","Operatör","Operator","Correct tool, guard and grip","Correct tool, guard and grip","Ekipman koruyucusunu çıkarma ve iki elle kontrollü kullan","Do not remove the tool guard and maintain controlled two-handed operation"),
],

"solvent-cleaning": [
("Solvent buharının kapalı bölgede birikmesi","Solvent vapor accumulation in enclosed area","Zehirlenme, yangın veya patlama","Poisoning, fire or explosion","Temizlik çalışanları","Cleaning workers","Ventilation and ignition control","Ventilation and ignition control","Yeterli havalandırma sağla ve ateşleme kaynaklarını uzaklaştır","Provide adequate ventilation and remove ignition sources"),
("Solventin ciltle uzun süreli teması","Prolonged skin contact with solvent","Dermatit veya kimyasal tahriş","Dermatitis or chemical irritation","Temizlik personeli","Cleaning personnel","Chemical-resistant gloves","Chemical-resistant gloves","SDS'ye uygun eldiven ve koruyucu giysi kullan","Use gloves and protective clothing compatible with the SDS"),
("Solventli bezlerin uygunsuz atılması","Improper disposal of solvent-soaked rags","Kendiliğinden ısınma veya yangın","Self-heating or fire","Saha çalışanları","Site personnel","Closed waste container","Closed waste container","Solventli bezleri kapaklı ve uygun atık kabında topla","Collect solvent-soaked rags in a suitable closed waste container"),
],

"leak-testing": [
("Test sırasında bağlantının ayrılması","Connection failure during leak testing","Basınçlı akışkan salımı veya parça fırlaması","Pressurized release or projectile","Test ekibi","Test crew","Rated fittings and exclusion zone","Rated fittings and exclusion zone","Tüm bağlantıların test basıncına uygunluğunu doğrula","Verify all connections are rated for the test pressure"),
("Kaçak kontrolünün elle yapılması","Manual checking for leaks by hand","Yüksek basınçlı injection yaralanması","High-pressure injection injury","Test personeli","Test personnel","Remote or approved leak detection","Remote or approved leak detection","Basınçlı kaçakları el ile arama; uygun detection yöntemi kullan","Never search for pressurized leaks by hand; use an approved detection method"),
("Test medyasının tehlikeli bölgede boşaltılması","Test medium discharged into unsafe area","Çarpma, maruziyet veya çevresel etki","Impact, exposure or environmental impact","Saha çalışanları","Site personnel","Controlled depressurization","Controlled depressurization","Test medyasını belirlenmiş güvenli noktaya kontrollü boşalt","Discharge test medium in a controlled manner to a designated safe location"),
],

"steam-blowing": [
("Steam blowing çıkış hattına yaklaşılması","Approaching steam-blowing discharge area","Yüksek sıcaklık ve basınç nedeniyle ölümcül yaralanma","Fatal injury from high temperature and pressure","Saha çalışanları","Site personnel","Large exclusion zone and barricading","Large exclusion zone and barricading","Discharge alanını fiziksel olarak izole et ve yetkisiz girişi engelle","Physically isolate the discharge area and prevent unauthorized access"),
("Geçici borulamanın titreşim nedeniyle arızalanması","Temporary piping failure due to vibration","Boru kırılması veya yüksek enerjili salım","Pipe failure or high-energy release","Steam blowing ekibi","Steam-blowing crew","Engineering design and supports","Engineering design and supports","Geçici hat, support ve restraint sistemini operasyon öncesi doğrula","Verify temporary piping, supports and restraints before operation"),
("Steam blowing sırasında aşırı gürültü","Extreme noise during steam blowing","İşitme hasarı","Hearing damage","Saha çalışanları","Site personnel","Exclusion distance and hearing protection","Exclusion distance and hearing protection","Gürültü alanını belirle ve gerekli hearing protection seviyesini uygula","Define the noise zone and enforce required hearing protection"),
],

"emergency-response": [
("Acil durumda görevlerin belirsiz olması","Unclear responsibilities during emergency","Müdahalenin gecikmesi veya koordinasyon kaybı","Delayed response or loss of coordination","Tüm saha personeli","All site personnel","Emergency plan and assigned roles","Emergency plan and assigned roles","Acil durum görevlerini vardiya ve ekip bazında açıkça tanımla","Clearly define emergency roles by shift and team"),
("Acil erişim yolunun kapalı olması","Emergency access route obstructed","Kurtarma veya itfaiye müdahalesinin gecikmesi","Delayed rescue or firefighting response","Tüm çalışanlar","All personnel","Access-route inspections","Access-route inspections","Acil araç ve kurtarma güzergahlarını sürekli açık tut","Keep emergency vehicle and rescue routes continuously clear"),
("Yanlış veya eksik acil durum iletişimi","Incorrect or incomplete emergency communication","Personelin yanlış bölgeye yönelmesi","Personnel directed to an unsafe location","Saha personeli","Site personnel","Emergency communication protocol","Emergency communication protocol","Alarm, telsiz ve toplanma bilgilerini tatbikatlarla doğrula","Verify alarms, radio communication and muster information through drills"),
],

"lone-working": [
("Yalnız çalışanın yaralanmasının fark edilmemesi","Injury to lone worker going unnoticed","Tıbbi müdahalenin gecikmesi","Delayed medical response","Yalnız çalışan personel","Lone workers","Check-in system","Check-in system","Risk seviyesine göre düzenli iletişim ve check-in periyodu belirle","Set regular communication and check-in intervals according to risk level"),
("Yalnız çalışanın iletişim kapsaması dışında kalması","Lone worker outside communication coverage","Acil yardım çağrısının yapılamaması","Inability to call for emergency assistance","Yalnız çalışanlar","Lone workers","Communication coverage assessment","Communication coverage assessment","İşe başlamadan telefon veya telsiz kapsamasını doğrula","Verify phone or radio coverage before work starts"),
("Yüksek riskli işin tek başına yapılması","High-risk task performed alone","Kontrol veya kurtarma desteğinin olmaması","Lack of control or rescue support","Yalnız çalışan","Lone worker","Lone-working restrictions","Lone-working restrictions","Kapalı alan, yüksek riskli enerji ve benzeri işleri yalnız çalışmaya kapat","Prohibit lone working for confined-space, high-energy and similar high-risk tasks"),
],
}


def find_object(src, activity_id):
    pos = src.find(f'id: "{activity_id}"')
    if pos == -1:
        raise RuntimeError(f"{activity_id}: bulunamadı")

    start = src.rfind("{", 0, pos)
    depth = 0
    quote = False
    escape = False

    for i in range(start, len(src)):
        c = src[i]

        if quote:
            if escape:
                escape = False
            elif c == "\\":
                escape = True
            elif c == '"':
                quote = False
            continue

        if c == '"':
            quote = True
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return start, i + 1

    raise RuntimeError(f"{activity_id}: blok kapanışı bulunamadı")


def make_item(v):
    htr, hen, ctr, cen, ptr, pen, etr, een, atr, aen = v

    return f'''      {{
        hazard: {{ tr: "{htr}", en: "{hen}" }},
        consequence: {{ tr: "{ctr}", en: "{cen}" }},
        personsAtRisk: {{ tr: "{ptr}", en: "{pen}" }},
        existingControls: {{ tr: "{etr}", en: "{een}" }},
        additionalControls: {{ tr: "{atr}", en: "{aen}" }},
      }}'''


text = FILE.read_text(encoding="utf-8")

backup = FILE.with_name(
    FILE.name + ".backup-before-834-" + datetime.now().strftime("%Y%m%d-%H%M%S")
)
shutil.copy2(FILE, backup)

print("BACKUP:", backup)

# PRECHECK — hiçbir şey yazmadan önce hepsini kontrol et
for activity_id, additions in DATA.items():
    start, end = find_object(text, activity_id)
    block = text[start:end]

    existing = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    if len(existing) != 6:
        raise RuntimeError(
            f"{activity_id}: 6 risk bekleniyordu, {len(existing)} bulundu. DOSYA YAZILMADI."
        )

    new_titles = [x[0] for x in additions]
    duplicate = set(existing) & set(new_titles)

    if duplicate:
        raise RuntimeError(
            f"{activity_id}: DUPLICATE {duplicate}. DOSYA YAZILMADI."
        )

    print(f"✅ {activity_id}: 6 → 9 hazır")


# TÜM PRECHECK BİTTİKTEN SONRA EKLE
for activity_id, additions in DATA.items():
    start, end = find_object(text, activity_id)
    block = text[start:end]

    arr_end = block.rfind("]")
    if arr_end == -1:
        raise RuntimeError(f"{activity_id}: items kapanışı bulunamadı")

    before = block[:arr_end].rstrip()

    if not before.endswith(","):
        before += ","

    insertion = (
        "\n"
        + ",\n".join(make_item(x) for x in additions)
        + "\n    "
    )

    new_block = before + insertion + block[arr_end:]
    text = text[:start] + new_block + text[end:]


# FINAL VALIDATION — hâlâ diske yazmadık
for activity_id in DATA:
    start, end = find_object(text, activity_id)
    block = text[start:end]

    hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    if len(hazards) != 9:
        raise RuntimeError(
            f"{activity_id}: final {len(hazards)} risk, beklenen 9. DOSYA YAZILMADI."
        )

    if len(set(hazards)) != 9:
        raise RuntimeError(
            f"{activity_id}: final duplicate var. DOSYA YAZILMADI."
        )


FILE.write_text(text, encoding="utf-8")

print()
print("🔥 PACK-04 YAZILDI")
print("✅ 20 faaliyet × 9 risk")
print("✅ +60 yeni risk")
