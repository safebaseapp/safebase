from pathlib import Path
from datetime import datetime
import re
import shutil

FILES = {
    "pack-01.ts": Path("lib/risk-library/pack-01.ts"),
    "pack-04.ts": Path("lib/risk-library/pack-04.ts"),
    "pack-05.ts": Path("lib/risk-library/pack-05.ts"),
}

# Her kayıt:
# (hazard_tr, hazard_en, consequence_tr, consequence_en, additional_tr, additional_en)

DATA = {

# ============================================================
# PACK 01
# ============================================================

"roof-work": [
("Çatı erişim noktasında düşme riski", "Fall hazard at roof access point",
 "Ciddi yaralanma veya ölüm", "Serious injury or fatality",
 "Çatı erişimini korkuluk, kapak veya uygun düşüş koruması ile güvenli hale getir",
 "Secure roof access with guardrails, covers or suitable fall protection"),

("Çatı üzerinde gevşek ekipman bulunması", "Loose equipment on roof",
 "Takılma, düşme veya düşen cisim yaralanması", "Trip, fall or dropped-object injury",
 "Alet ve malzemeleri sabitle ve çalışma alanındaki geçiş yollarını açık tut",
 "Secure tools and materials and keep roof access routes clear"),

("Çatı üzerinde yıldırım riski", "Lightning exposure during roof work",
 "Elektrik etkisi, ciddi yaralanma veya ölüm", "Electrical effects, serious injury or fatality",
 "Yıldırım riski bulunan hava koşullarında çatı çalışmasını durdur",
 "Stop roof work when lightning risk is present"),
],

"mewP": [
("MEWP platformunda kapasite aşımı", "MEWP platform overload",
 "Stabilite kaybı veya devrilme", "Loss of stability or overturn",
 "Platformdaki toplam personel, alet ve malzeme yükünü üretici kapasitesi içinde tut",
 "Keep personnel, tools and materials within the manufacturer's platform capacity"),

("MEWP ile eğimli veya bozuk zeminde çalışma", "MEWP operation on sloped or uneven ground",
 "Devrilme veya kontrol kaybı", "Overturn or loss of control",
 "Zemin eğimini ve taşıma kapasitesini kullanımdan önce doğrula",
 "Verify ground slope and bearing capacity before use"),

("MEWP platform kapısının açık bırakılması", "MEWP platform gate left open",
 "Platformdan düşme", "Fall from platform",
 "Platform hareketinden önce giriş kapısının kapalı ve kilitli olduğunu doğrula",
 "Verify the platform gate is closed and secured before movement"),
],

# ============================================================
# PACK 04
# ============================================================

"roof-maintenance": [
("Çatı üzerinde kırılgan yüzeye basılması", "Stepping onto fragile roof surface",
 "Yüzeyin kırılması ve yüksekten düşme", "Surface failure and fall from height",
 "Kırılgan yüzeyleri işaretle ve uygun yürüyüş yolu veya çalışma platformu kullan",
 "Mark fragile surfaces and use suitable walkways or working platforms"),

("Çatı drenaj bölgesinde kaygan yüzey", "Slippery surface near roof drainage",
 "Kayma ve yüksekten düşme", "Slip and fall from height",
 "Su, yağ ve diğer kaygan kirleticileri çalışmadan önce temizle",
 "Remove water, oil and other slippery contamination before work"),

("Bakım malzemelerinin çatı kenarına yakın bırakılması", "Maintenance materials stored near roof edge",
 "Malzeme düşmesi veya personelin dengesini kaybetmesi", "Dropped material or loss of balance",
 "Malzemeleri çatı kenarından güvenli mesafede ve sabit şekilde depola",
 "Store materials securely at a safe distance from roof edges"),
],

"mewp-inspection": [
("Platform kontrol kutusunda hasar", "Damage to platform control console",
 "Kontrol kaybı veya istenmeyen hareket", "Loss of control or unintended movement",
 "Kontrol paneli ve joystick fonksiyonlarını kullanımdan önce test et",
 "Test the control panel and joystick functions before use"),

("MEWP acil stop butonunun çalışmaması", "MEWP emergency-stop failure",
 "Tehlikeli hareketin durdurulamaması", "Failure to stop hazardous movement",
 "Yer ve platform acil stop fonksiyonlarını günlük kontrolde doğrula",
 "Verify ground and platform emergency-stop functions during daily inspection"),

("MEWP yapısında çatlak veya deformasyon", "Crack or deformation in MEWP structure",
 "Yapısal arıza veya devrilme", "Structural failure or overturn",
 "Boom, platform ve şasi üzerindeki çatlak ve deformasyonları kontrol et",
 "Inspect the boom, platform and chassis for cracks and deformation"),
],

"mobile-equipment-inspection": [
("Emniyet kemerinin hasarlı olması", "Damaged operator seat belt",
 "Çarpışma veya devrilmede ciddi yaralanma", "Serious injury during collision or overturn",
 "Emniyet kemerini vardiya öncesi kontrol et ve hasarlıysa ekipmanı kullanma",
 "Inspect the seat belt before the shift and remove equipment from service if defective"),

("Korna veya uyarı ışığının çalışmaması", "Horn or warning beacon failure",
 "Yaya veya ekipmanın yaklaşan aracı fark etmemesi", "Pedestrians or equipment failing to detect approaching vehicle",
 "Korna ve ikaz ışıklarını günlük kontrolde fonksiyonel olarak test et",
 "Function-test horn and warning beacons during daily inspection"),

("Direksiyon sisteminde anormallik", "Steering-system abnormality",
 "Kontrol kaybı veya çarpışma", "Loss of control or collision",
 "Direksiyon boşluğu ve tepki davranışını çalışma öncesi kontrol et",
 "Check steering play and response before operation"),
],

"excavator-operation": [
("Ekskavatör swing alanında personel bulunması", "Personnel inside excavator swing radius",
 "Ezilme veya ölüm", "Crushing or fatality",
 "Swing radius alanını fiziksel olarak ayır ve personel girişini engelle",
 "Physically segregate the swing radius and prevent personnel entry"),

("Bucket ile kaldırılan uygunsuz yük", "Improper load lifted with excavator bucket",
 "Yük düşmesi veya ekipman devrilmesi", "Dropped load or equipment overturn",
 "Ekskavatörü yalnızca üreticinin izin verdiği kaldırma konfigürasyonunda kullan",
 "Use the excavator for lifting only in manufacturer-approved configurations"),

("Kazı sırasında zemin çökmesi", "Ground failure during excavation operation",
 "Ekskavatörün dengesini kaybetmesi", "Excavator instability",
 "Çalışma zemininin stabilitesini ve boşluk riskini önceden değerlendir",
 "Assess ground stability and void risk before operation"),
],

"loader-operation": [
("Loader ile yüksek hızda dönüş yapılması", "High-speed turning with loader",
 "Devrilme veya kontrol kaybı", "Overturn or loss of control",
 "Dönüşlerde hızı düşür ve ani yön değişikliklerinden kaçın",
 "Reduce speed when turning and avoid sudden directional changes"),

("Loader bucketının aşırı doldurulması", "Loader bucket overloaded",
 "Yük düşmesi veya ekipman stabilitesinin kaybı", "Dropped material or loss of equipment stability",
 "Bucket kapasitesini ve malzeme yoğunluğunu dikkate al",
 "Consider bucket capacity and material density"),

("Loader ile geri manevrada kör nokta", "Blind spot during loader reversing",
 "Araç-yaya çarpışması", "Vehicle-pedestrian collision",
 "Görüş yetersizse banksman kullan ve geri manevra alanını temizle",
 "Use a banksman when visibility is restricted and clear the reversing area"),
],

"telehandler-operation": [
("Telehandler ataşmanının yanlış seçilmesi", "Incorrect telehandler attachment selected",
 "Yük düşmesi veya ekipman stabilitesinin bozulması", "Dropped load or equipment instability",
 "Ataşmanı yük tipi ve üretici onayına göre seç",
 "Select attachments according to load type and manufacturer approval"),

("Boom kaldırılmış halde seyir", "Travelling with telehandler boom raised",
 "Devrilme veya çarpışma", "Overturn or collision",
 "Seyir sırasında boomu üreticinin belirttiği güvenli taşıma pozisyonunda tut",
 "Keep the boom in the manufacturer-specified travel position"),

("Telehandler ile asılı yükün kontrolsüz salınımı", "Uncontrolled suspended-load swing on telehandler",
 "Çarpma veya yük düşmesi", "Impact or dropped load",
 "Asılı yüklerde uygun attachment ve kontrollü yönlendirme kullan",
 "Use suitable attachments and controlled guidance for suspended loads"),
],

"vehicle-reversing": [
("Geri manevra güzergahında sabit engel", "Fixed obstruction in reversing route",
 "Araç çarpışması veya sıkışma", "Vehicle collision or entrapment",
 "Manevra başlamadan geri güzergahını fiziksel olarak kontrol et",
 "Physically check the reversing route before movement"),

("Banksman ile sürücü iletişiminin kesilmesi", "Loss of communication between driver and banksman",
 "Kontrolsüz manevra veya çarpışma", "Uncontrolled maneuver or collision",
 "Görsel veya telsiz iletişimi kesildiğinde aracı derhal durdur",
 "Stop the vehicle immediately if visual or radio communication is lost"),

("Geri manevrada yetersiz aydınlatma", "Poor lighting during reversing",
 "Yaya veya engelin fark edilmemesi", "Failure to detect pedestrians or obstacles",
 "Manevra alanına yeterli geçici veya sabit aydınlatma sağla",
 "Provide adequate temporary or permanent lighting in the maneuvering area"),
],

"loading-unloading": [
("Araç kasasından personel düşmesi", "Personnel falling from vehicle bed",
 "Ciddi yaralanma", "Serious injury",
 "Araç kasasına güvenli erişim sağla ve yüksekten atlamayı engelle",
 "Provide safe access to the vehicle bed and prevent jumping from height"),

("Yük bağlarının kontrolsüz açılması", "Uncontrolled release of load restraints",
 "Yükün ani hareketi veya personele çarpması", "Sudden load movement or impact on personnel",
 "Bağları çözmeden önce yükün hareket yönünü ve stabilitesini değerlendir",
 "Assess load stability and potential movement before releasing restraints"),

("Yükleme rampasında boşluk veya seviye farkı", "Gap or level difference at loading ramp",
 "Forklift veya personel düşmesi", "Forklift or personnel fall",
 "Rampanın konumunu, kapasitesini ve sabitlenmesini yükleme öncesi doğrula",
 "Verify ramp position, capacity and securing before loading"),
],

"material-storage": [
("Raf üzerinde hasarlı taşıyıcı eleman", "Damaged structural member on storage rack",
 "Raf çökmesi veya malzeme düşmesi", "Rack collapse or falling material",
 "Hasarlı raf bölümlerini karantinaya al ve onarım yapılmadan kullanma",
 "Quarantine damaged rack sections until repaired"),

("Yuvarlanabilir malzemenin sabitlenmemesi", "Round materials stored without restraint",
 "Malzemenin yuvarlanması ve ezilme", "Rolling material and crushing",
 "Boru ve silindirik malzemeleri takoz veya uygun rack ile sabitle",
 "Restrain pipes and cylindrical materials with chocks or suitable racks"),

("Ağır malzemenin yüksek rafta depolanması", "Heavy materials stored at excessive height",
 "Malzeme düşmesi veya istif stabilitesinin kaybı", "Falling material or loss of stack stability",
 "Ağır malzemeleri mümkün olan en düşük güvenli seviyede depola",
 "Store heavy materials at the lowest practicable safe level"),
],

"steel-plate-handling": [
("Çelik plakanın vakum kaldırıcıdan ayrılması", "Steel plate detaching from vacuum lifter",
 "Plakanın düşmesi veya ezilme", "Dropped plate or crushing",
 "Vakum seviyesini ve lifting pad yüzeyini kaldırma öncesi doğrula",
 "Verify vacuum level and lifting-pad surface before lifting"),

("Plakaların arasında el sıkışması", "Hand entrapment between steel plates",
 "El veya parmak ezilmesi", "Hand or finger crushing",
 "Plakaları ayırmak için uygun mekanik ayırıcı kullan",
 "Use suitable mechanical separators to separate plates"),

("Uzun plakanın kontrolsüz salınımı", "Uncontrolled swing of long steel plate",
 "Çarpma veya sıkışma", "Impact or entrapment",
 "Uzun plakaların yönlendirilmesinde uygun tag line kullan",
 "Use suitable tag lines to control long plates"),
],

"cylinder-loading-unloading": [
("Tüp yükleme sırasında parmak sıkışması", "Finger entrapment during cylinder loading",
 "El veya parmak yaralanması", "Hand or finger injury",
 "Tüp, araç ve rack arasındaki sıkışma noktalarından elleri uzak tut",
 "Keep hands clear of pinch points between cylinders, vehicles and racks"),

("Hasarlı tüpün taşımaya alınması", "Damaged cylinder accepted for transport",
 "Gaz kaçağı veya basınçlı salım", "Gas leak or pressurized release",
 "Hasarlı, korozyonlu veya sızıntı şüphesi olan tüpleri karantinaya al",
 "Quarantine damaged, corroded or suspected leaking cylinders"),

("Tüp trolleyinin kontrolsüz hareketi", "Uncontrolled movement of cylinder trolley",
 "Tüpün devrilmesi veya çarpma", "Cylinder overturn or impact",
 "Trolleyi eğimli yüzeylerde kontrol altında tut ve park halinde sabitle",
 "Control the trolley on slopes and secure it while parked"),
],

"core-drilling": [
("Karot makinesinde suyun elektrik ekipmanına ulaşması", "Water reaching electrical equipment during core drilling",
 "Elektrik çarpması", "Electric shock",
 "Su akışını kontrol et ve elektrik bağlantılarını ıslak alandan koru",
 "Control water flow and protect electrical connections from wet areas"),

("Karot sehpasının yüzeye yetersiz sabitlenmesi", "Inadequate anchoring of core-drill stand",
 "Makinenin hareket etmesi veya operatörün yaralanması", "Machine movement or operator injury",
 "Stand ankrajını ve bağlantılarını delme öncesi doğrula",
 "Verify stand anchorage and connections before drilling"),

("Karot delme sırasında yüksek gürültü", "High noise during core drilling",
 "İşitme hasarı", "Hearing damage",
 "Gürültü seviyesine uygun işitme koruması kullan",
 "Use hearing protection suitable for the noise level"),
],

"concrete-cutting": [
("Kesme makinesinde su beslemesinin kesilmesi", "Loss of water supply during concrete cutting",
 "Silika tozu maruziyetinin artması", "Increased silica-dust exposure",
 "Islak kesim yönteminde sürekli yeterli su akışını doğrula",
 "Maintain adequate water flow during wet cutting"),

("Kesme kablosu veya zincirinin kopması", "Wire or chain failure during concrete cutting",
 "Yüksek enerjili parça çarpması", "High-energy projectile impact",
 "Kesme hattını dışlama alanı olarak belirle ve ekipmanı kullanımdan önce kontrol et",
 "Establish an exclusion zone around the cutting line and inspect equipment before use"),

("Kesim sonucu yapısal bütünlüğün bozulması", "Structural integrity affected by concrete cutting",
 "Kontrolsüz yapı hareketi veya çökme", "Uncontrolled structural movement or collapse",
 "Taşıyıcı elemanlarda kesim öncesi mühendislik onayı al",
 "Obtain engineering approval before cutting structural elements"),
],

"wall-floor-penetration": [
("Penetrasyon kapağının yetersiz taşıma kapasitesi", "Insufficient load capacity of penetration cover",
 "Kapak kırılması ve açıklıktan düşme", "Cover failure and fall through opening",
 "Kapakların beklenen yüke dayanıklı olduğunu doğrula",
 "Verify covers are capable of supporting expected loads"),

("Penetrasyon kenarında keskin yüzey", "Sharp edge around penetration",
 "Kesik veya ekipman hasarı", "Laceration or equipment damage",
 "Keskin kenarları koru veya uygun şekilde çapaklarını temizle",
 "Protect or appropriately deburr sharp edges"),

("Penetrasyonun yanlış etiketlenmesi", "Incorrect identification of penetration",
 "Yanlış kullanım veya güvenlik kontrolünün kaybı", "Incorrect use or loss of safety control",
 "Tüm açık penetrasyonları belirgin şekilde işaretle",
 "Clearly identify all open penetrations"),
],

"surface-preparation": [
("Yüzey hazırlama ekipmanında aşırı titreşim", "Excessive vibration from surface-preparation equipment",
 "El-kol titreşim maruziyeti", "Hand-arm vibration exposure",
 "Titreşim süresini sınırla ve düşük titreşimli uygun ekipman kullan",
 "Limit vibration exposure and use suitable low-vibration equipment"),

("Yüzey hazırlığında yanıcı toz oluşması", "Combustible dust generated during surface preparation",
 "Yangın veya patlama", "Fire or explosion",
 "Toz birikimini kontrol et ve ateşleme kaynaklarını uzaklaştır",
 "Control dust accumulation and remove ignition sources"),

("Yüzey hazırlığında yakındaki ekipmanın hasar görmesi", "Nearby equipment damaged during surface preparation",
 "Proses kaçağı veya ikincil tehlike", "Process leak or secondary hazard",
 "Yakındaki hassas ekipmanı perde veya fiziksel koruma ile izole et",
 "Protect nearby sensitive equipment using screens or physical protection"),
],

"solvent-cleaning": [
("Solvent kabının etiketsiz olması", "Unlabeled solvent container",
 "Yanlış kullanım veya kimyasal maruziyet", "Incorrect use or chemical exposure",
 "Tüm solvent kaplarını içerik ve tehlike bilgisiyle etiketle",
 "Label all solvent containers with contents and hazard information"),

("Uyumsuz solventlerin karıştırılması", "Mixing incompatible solvents",
 "Kimyasal reaksiyon, ısı veya toksik gaz", "Chemical reaction, heat or toxic gas",
 "Kimyasalları SDS uyumluluğuna göre ayrı tut",
 "Segregate chemicals according to SDS compatibility"),

("Solventin sıcak yüzeye dökülmesi", "Solvent spilled onto hot surface",
 "Yangın veya yanıcı buhar oluşumu", "Fire or flammable-vapor generation",
 "Temizlik alanındaki sıcak yüzey ve ateşleme kaynaklarını kontrol et",
 "Control hot surfaces and ignition sources in the cleaning area"),
],

"leak-testing": [
("Test göstergesinin kalibrasyon dışı olması", "Leak-test gauge out of calibration",
 "Yanlış basınç değerlendirmesi veya ekipman hasarı", "Incorrect pressure assessment or equipment damage",
 "Basınç göstergesinin geçerli kalibrasyon durumunu doğrula",
 "Verify valid calibration status of the pressure gauge"),

("Test sisteminde hapsolmuş basınç", "Trapped pressure in leak-test system",
 "Beklenmeyen basınç salımı", "Unexpected pressure release",
 "Bağlantıları sökmeden önce sıfır basıncı doğrula",
 "Verify zero pressure before disconnecting equipment"),

("Kaçak testinde uygunsuz kimyasal kullanımı", "Unsuitable leak-detection chemical",
 "Malzeme hasarı veya kimyasal maruziyet", "Material damage or chemical exposure",
 "Test sıvısının ekipman malzemesiyle uyumluluğunu doğrula",
 "Verify compatibility of leak-detection fluid with equipment materials"),
],

"steam-blowing": [
("Steam blowing sırasında kondens birikmesi", "Condensate accumulation during steam blowing",
 "Water hammer veya boru hasarı", "Water hammer or piping damage",
 "Steam blowing öncesi drenaj noktalarının açık ve fonksiyonel olduğunu doğrula",
 "Verify drain points are open and functional before steam blowing"),

("Discharge susturucusunun arızalanması", "Steam-blowing silencer failure",
 "Aşırı gürültü veya ekipman hasarı", "Extreme noise or equipment damage",
 "Susturucu ve geçici discharge ekipmanını operasyon öncesi kontrol et",
 "Inspect silencer and temporary discharge equipment before operation"),

("Steam blowing çevresinde sıcak yüzey", "Hot surfaces around steam-blowing system",
 "Termal yanık", "Thermal burn",
 "Sıcak yüzeyleri bariyerle ve uyarı işaretleriyle kontrol et",
 "Control hot surfaces using barriers and warning signs"),
],

"emergency-response": [
("Toplanma alanında personel sayımının yapılamaması", "Failure to account for personnel at muster point",
 "Eksik kişinin fark edilmemesi", "Missing person not identified",
 "Güncel personel sayım ve muster sistemini uygula",
 "Maintain an up-to-date personnel accounting and muster system"),

("Acil durum ekipmanının erişilemez olması", "Emergency equipment inaccessible",
 "Müdahalenin gecikmesi", "Delayed emergency response",
 "Acil ekipman önlerini sürekli açık ve işaretli tut",
 "Keep emergency equipment accessible and clearly marked"),

("Kurtarma ekibinin uygun PPE olmadan müdahalesi", "Rescue team responding without suitable PPE",
 "İkincil yaralanma veya maruziyet", "Secondary injury or exposure",
 "Müdahale türüne uygun kurtarma PPE ve ekipmanını önceden hazırla",
 "Pre-position rescue PPE and equipment suitable for the emergency"),
],

"lone-working": [
("Yalnız çalışanda tıbbi acil durum", "Medical emergency during lone working",
 "Yardımın gecikmesi", "Delayed assistance",
 "Yalnız çalışanlar için periyodik durum kontrol sistemi uygula",
 "Implement periodic welfare checks for lone workers"),

("Yalnız çalışma alanında kaçış yolunun engellenmesi", "Blocked escape route in lone-working area",
 "Acil durumda tahliyenin gecikmesi", "Delayed evacuation during emergency",
 "İşe başlamadan erişim ve kaçış güzergahını doğrula",
 "Verify access and escape routes before lone work starts"),

("Yalnız çalışanın konumunun bilinmemesi", "Unknown location of lone worker",
 "Acil müdahalenin gecikmesi", "Delayed emergency response",
 "Çalışanın konumunu ve görev süresini supervisor ile kayıt altına al",
 "Record the worker's location and task duration with the supervisor"),
],

# ============================================================
# PACK 05
# ============================================================

"hand-power-tools": [
("El aletinde yanlış aksesuar kullanılması", "Incorrect accessory fitted to hand power tool",
 "Disk veya aksesuar arızası ve yaralanma", "Accessory failure and injury",
 "Aksesuar tipini, çapını ve hız limitini alet ile uyumlu seç",
 "Select accessories compatible with tool type, diameter and speed rating"),

("Elektrikli el aletinin kablosunun keskin kenara temas etmesi", "Power-tool cable contacting sharp edge",
 "Elektrik çarpması veya kısa devre", "Electric shock or short circuit",
 "Kabloları keskin kenarlardan ve hareketli ekipmandan koru",
 "Protect cables from sharp edges and moving equipment"),

("El aletinin yanlış çalışma pozisyonunda kullanılması", "Hand tool used in unstable working position",
 "Kontrol kaybı veya düşme", "Loss of control or fall",
 "Aleti kullanmadan önce dengeli ve güvenli çalışma pozisyonu oluştur",
 "Establish a stable working position before operating the tool"),
],

"drilling": [
("Matkap ucunun iş parçasında sıkışması", "Drill bit binding in workpiece",
 "Aletin geri tepmesi veya el-kol yaralanması", "Tool kickback or hand-arm injury",
 "İş parçasını sabitle ve uygun hız ile matkap ucu kullan",
 "Secure the workpiece and use suitable drill speed and bit"),

("Delme sırasında uçuşan metal talaşı", "Flying metal swarf during drilling",
 "Göz veya yüz yaralanması", "Eye or facial injury",
 "Uygun göz ve yüz koruması kullan",
 "Use suitable eye and face protection"),

("Uzun matkap ucunun kırılması", "Long drill bit failure",
 "Parça fırlaması veya kesik", "Projectile or laceration",
 "Uygun bit boyu kullan ve aşırı yan yük uygulama",
 "Use an appropriate bit length and avoid excessive lateral loading"),
],

"roofing": [
("Çatı kaplama malzemesinin rüzgarda savrulması", "Roofing material displaced by wind",
 "Düşen cisim veya dengenin kaybedilmesi", "Dropped object or loss of balance",
 "Kaplama malzemelerini rüzgara karşı sabitle",
 "Secure roofing materials against wind"),

("Sıcak uygulamalı çatı kaplamasında yanık", "Burn during hot-applied roofing work",
 "Termal yanık veya yangın", "Thermal burn or fire",
 "Sıcak malzeme ve ekipmanı kontrollü alanda kullan",
 "Use hot materials and equipment in a controlled area"),

("Çatı membranı üzerinde kaygan yüzey", "Slippery roofing membrane",
 "Kayma ve yüksekten düşme", "Slip and fall from height",
 "Temiz ve kuru yürüyüş güzergahı oluştur",
 "Maintain a clean and dry walking route"),
],

"temporary-platform": [
("Geçici platformun aşırı yüklenmesi", "Temporary platform overloaded",
 "Platform arızası veya çökme", "Platform failure or collapse",
 "Platform yük kapasitesini belirle ve aşılmasını engelle",
 "Define and enforce the platform load capacity"),

("Geçici platformda eksik toe-board", "Missing toe board on temporary platform",
 "Malzeme veya alet düşmesi", "Dropped tools or materials",
 "Platform kenarlarında uygun toe-board kullan",
 "Provide suitable toe boards at platform edges"),

("Geçici platform erişiminin uygunsuz olması", "Unsafe access to temporary platform",
 "Takılma veya yüksekten düşme", "Trip or fall from height",
 "Platforma uygun merdiven veya erişim sistemi sağla",
 "Provide a suitable ladder or access system"),
],

"suspended-basket": [
("Askılı sepet bağlantı sisteminde dengesizlik", "Imbalance in suspended-basket suspension system",
 "Sepetin eğilmesi veya düşmesi", "Basket tilting or falling",
 "Askı noktalarını ve yük dağılımını operasyon öncesi doğrula",
 "Verify suspension points and load distribution before operation"),

("Askılı sepette acil kurtarma planı bulunmaması", "No emergency rescue plan for suspended basket",
 "Personelin yüksekte mahsur kalması", "Personnel stranded at height",
 "Operasyon öncesi özel kurtarma planı ve ekipmanı hazırla",
 "Prepare a task-specific rescue plan and equipment before operation"),

("Askılı sepetin yapıya çarpması", "Suspended basket striking structure",
 "Personelin yaralanması veya sepet hasarı", "Personnel injury or basket damage",
 "Sepetin hareketini tag line veya uygun kontrol yöntemiyle sınırla",
 "Control basket movement using tag lines or another suitable method"),
],

"open-edge-work": [
("Açık kenarda malzeme depolanması", "Materials stored near open edge",
 "Malzeme veya personel düşmesi", "Material or personnel fall",
 "Malzemeleri açık kenardan güvenli mesafede tut",
 "Keep materials at a safe distance from open edges"),

("Açık kenar bariyerinin geçici olarak kaldırılması", "Temporary removal of open-edge barrier",
 "Korumasız kenardan düşme", "Fall from unprotected edge",
 "Bariyer kaldırıldığında alternatif düşüş koruması uygula",
 "Provide alternative fall protection whenever the barrier is removed"),

("Açık kenarda yetersiz gece aydınlatması", "Poor night lighting near open edge",
 "Yanlış adım ve düşme", "Misstep and fall",
 "Açık kenar ve erişim yollarına yeterli aydınlatma sağla",
 "Provide adequate lighting at open edges and access routes"),
],

"mechanical-material-handling": [
("Mekanik taşıma ekipmanının kapasitesinin aşılması", "Mechanical-handling equipment overloaded",
 "Ekipman arızası veya yük düşmesi", "Equipment failure or dropped load",
 "Yük ağırlığını ve ekipman kapasitesini işlem öncesi doğrula",
 "Verify load weight and equipment capacity before handling"),

("Yükün kaldırma noktasından kayması", "Load slipping from lifting point",
 "Yük düşmesi veya çarpma", "Dropped load or impact",
 "Uygun lifting point ve bağlantı ekipmanı kullan",
 "Use suitable lifting points and connection equipment"),

("Malzeme taşıma güzergahında engel", "Obstruction in material-handling route",
 "Çarpışma veya kontrol kaybı", "Collision or loss of control",
 "Taşıma başlamadan güzergahı temizle ve planla",
 "Clear and plan the handling route before movement"),
],

"pipe-handling": [
("Borunun yuvarlanması", "Pipe rolling unexpectedly",
 "Ezilme veya sıkışma", "Crushing or entrapment",
 "Boruları takoz veya uygun rack ile sabitle",
 "Secure pipes using chocks or suitable racks"),

("Uzun borunun kontrolsüz salınımı", "Uncontrolled swing of long pipe",
 "Çarpma veya sıkışma", "Impact or entrapment",
 "Uzun borularda tag line ve kontrollü yönlendirme kullan",
 "Use tag lines and controlled guidance for long pipes"),

("Boru demetinin stabil olmaması", "Unstable pipe bundle",
 "Demetin dağılması veya malzeme düşmesi", "Bundle collapse or falling material",
 "Boru demetlerini uygun restraint ile sabitle",
 "Secure pipe bundles with suitable restraints"),
],

"fuel-storage": [
("Yakıt tankında aşırı dolum", "Fuel tank overfill",
 "Yakıt taşması, yangın veya çevresel etki", "Fuel spill, fire or environmental impact",
 "Tank seviye kontrolü ve maksimum dolum limitini uygula",
 "Control tank level and enforce maximum fill limits"),

("Yakıt depolama alanında statik elektrik", "Static electricity in fuel-storage area",
 "Yanıcı buharın tutuşması", "Ignition of flammable vapor",
 "Transfer noktalarında bonding ve grounding uygula",
 "Provide bonding and grounding at transfer points"),

("Yakıt tankında hasarlı containment", "Damaged secondary containment at fuel storage",
 "Dökülmenin çevreye yayılması", "Spread of spill to environment",
 "Bund ve secondary containment bütünlüğünü düzenli kontrol et",
 "Regularly inspect bund and secondary-containment integrity"),
],

"chemical-storage": [
("Kimyasal kabın etiketsiz olması", "Unlabeled chemical container",
 "Yanlış kullanım veya kimyasal maruziyet", "Incorrect use or chemical exposure",
 "Tüm kapları içerik ve tehlike bilgileriyle açıkça etiketle",
 "Clearly label all containers with contents and hazard information"),

("Kimyasal depolama alanında yetersiz spill containment", "Inadequate spill containment in chemical storage",
 "Dökülmenin yayılması veya çevresel etki", "Spread of spill or environmental impact",
 "Uygun bund, drip tray veya secondary containment sağla",
 "Provide suitable bunds, drip trays or secondary containment"),

("Kimyasal kapların doğrudan güneş veya ısıya maruz kalması", "Chemical containers exposed to excessive heat or sunlight",
 "Basınç artışı, bozunma veya sızıntı", "Pressure increase, degradation or leakage",
 "Kimyasalları SDS'de belirtilen sıcaklık koşullarında depola",
 "Store chemicals within the temperature conditions specified by the SDS"),
],

"surface-grinding": [
("Taşlama diskinde yanlış RPM sınıfı", "Incorrect RPM rating of grinding disc",
 "Disk parçalanması", "Disc failure",
 "Disk maksimum hızını makine hızıyla uyumlu doğrula",
 "Verify disc maximum speed is compatible with machine speed"),

("Taşlama sırasında kıvılcımların kabloya ulaşması", "Grinding sparks contacting electrical cables",
 "Kablo hasarı veya yangın", "Cable damage or fire",
 "Elektrik kablolarını kıvılcım alanından uzaklaştır veya koru",
 "Remove or protect electrical cables from the spark path"),

("Taşlama operatörünün uygun olmayan duruşu", "Unstable posture during grinding",
 "Kontrol kaybı veya kas-iskelet yaralanması", "Loss of control or musculoskeletal injury",
 "İşe başlamadan stabil çalışma pozisyonu oluştur",
 "Establish a stable working position before grinding"),
],

"leak-repair": [
("Kaçak kaynağının yanlış belirlenmesi", "Incorrect identification of leak source",
 "Beklenmeyen proses salımı", "Unexpected process release",
 "Onarım öncesi kaçak noktası ve proses hattını doğrula",
 "Verify the leak location and process line before repair"),

("Onarım sırasında geçici clamp arızası", "Temporary repair clamp failure",
 "Basınçlı salım veya parça fırlaması", "Pressurized release or projectile",
 "Clamp kapasitesini servis basıncı ve sıcaklığına göre doğrula",
 "Verify clamp suitability for service pressure and temperature"),

("Kaçak onarımında kimyasal maruziyet", "Chemical exposure during leak repair",
 "Cilt, göz veya solunum yaralanması", "Skin, eye or respiratory injury",
 "Proses kimyasalına uygun PPE ve acil müdahale ekipmanı kullan",
 "Use PPE and emergency equipment suitable for the process chemical"),
],

"general-maintenance": [
("Bakım alanında kullanılan geçici ekipmanın uygunsuz yerleşimi", "Poor placement of temporary maintenance equipment",
 "Takılma veya erişim engeli", "Trip or blocked access",
 "Kablo, hortum ve ekipmanı güvenli güzergahlarda düzenle",
 "Arrange cables, hoses and equipment along safe routes"),

("Bakım sonrası alet veya malzemenin sistem içinde unutulması", "Tools or materials left inside equipment after maintenance",
 "Ekipman hasarı veya startup arızası", "Equipment damage or startup failure",
 "Bakım sonrası tool-accountability ve final inspection uygula",
 "Perform tool accountability and final inspection after maintenance"),

("Bakım alanının erken devreye verilmesi", "Maintenance area released prematurely",
 "Personelin tehlikeye maruz kalması", "Personnel exposure to hazards",
 "Permit closure ve area handover tamamlanmadan ekipmanı devreye alma",
 "Do not return equipment to service before permit closure and area handover"),
],

"valve-removal": [
("Valve sökümünde boru gerilimi", "Pipe strain during valve removal",
 "Borunun ani hareketi veya sıkışma", "Sudden pipe movement or entrapment",
 "Valve bağlantısını ayırmadan boru support ve strain durumunu kontrol et",
 "Check pipe support and strain before separating the valve"),

("Ağır valve'ın yetersiz desteklenmesi", "Heavy valve inadequately supported",
 "Valve düşmesi veya ezilme", "Dropped valve or crushing",
 "Son bağlantıyı sökmeden valve'ı uygun lifting ekipmanıyla destekle",
 "Support the valve with suitable lifting equipment before removing final connections"),

("Valve içinde proses kalıntısı", "Residual process material inside valve",
 "Kimyasal veya termal maruziyet", "Chemical or thermal exposure",
 "Söküm öncesi valve ve bağlı hattın drain/flush durumunu doğrula",
 "Verify draining and flushing of the valve and connected line before removal"),
],

"pump-alignment": [
("Kaplin arasında parmak sıkışması", "Finger entrapment between couplings",
 "El veya parmak yaralanması", "Hand or finger injury",
 "Kaplinler arasında elle hizalama yapma; uygun alignment tool kullan",
 "Do not manually align between couplings; use suitable alignment tools"),

("Pump alignment sırasında equipment movement", "Equipment movement during pump alignment",
 "Sıkışma veya hizalama kaybı", "Entrapment or loss of alignment",
 "Motor ve pumpı hizalama sırasında mekanik olarak sabitle",
 "Mechanically secure motor and pump during alignment"),

("Lazer alignment cihazının yanlış kurulması", "Incorrect setup of laser alignment equipment",
 "Yanlış hizalama ve ekipman hasarı", "Incorrect alignment and equipment damage",
 "Alignment cihazını üretici talimatına göre kalibre ve monte et",
 "Set up and calibrate alignment equipment according to manufacturer instructions"),
],

"compressor-startup": [
("Start-up sırasında yağlama yetersizliği", "Insufficient lubrication during compressor startup",
 "Ekipman hasarı veya aşırı ısınma", "Equipment damage or overheating",
 "Startup öncesi yağ seviyesi ve lubrication sistemini doğrula",
 "Verify oil level and lubrication system before startup"),

("Compressor startup sırasında discharge valve yanlış konumda", "Incorrect discharge-valve position during compressor startup",
 "Basınç sapması veya ekipman hasarı", "Pressure deviation or equipment damage",
 "Startup checklist ile kritik valve pozisyonlarını doğrula",
 "Verify critical valve positions using the startup checklist"),

("Compressor startup alanında personel bulunması", "Personnel present in compressor startup hazard zone",
 "Ekipman arızasında çarpma veya proses maruziyeti", "Impact or process exposure during equipment failure",
 "İlk startup sırasında kritik ekipman çevresini kontrollü alan yap",
 "Control access around critical equipment during initial startup"),
],

"barricading": [
("Bariyerin çalışma tehlikesine çok yakın kurulması", "Barricade positioned too close to hazard",
 "Personelin tehlikeli alana maruz kalması", "Personnel exposure to hazardous area",
 "Bariyer mesafesini tehlikenin enerji ve etki alanına göre belirle",
 "Set barricade distance according to hazard energy and impact zone"),

("Bariyer üzerinde tehlike bilgisinin bulunmaması", "Barricade without hazard information",
 "Personelin riskin türünü anlamaması", "Personnel unaware of hazard type",
 "Bariyer üzerine tehlike türü ve erişim şartlarını açıkça yaz",
 "Clearly identify hazard type and access requirements on the barricade"),

("Bariyerin gece görünür olmaması", "Barricade not visible at night",
 "Bariyere çarpma veya tehlikeli alana giriş", "Collision with barricade or entry into hazard zone",
 "Düşük ışıkta reflektif veya aydınlatılmış bariyer kullan",
 "Use reflective or illuminated barricades in low-light conditions"),
],

"dropped-object-prevention": [
("Yüksekte gevşek küçük parçalar", "Loose small components at height",
 "Düşen cisim yaralanması", "Dropped-object injury",
 "Gevşek parça ve bağlantıları sabitle veya kapalı konteynerde tut",
 "Secure loose components or store them in closed containers"),

("Alet lanyardının uygunsuz bağlantısı", "Incorrect tool-lanyard attachment",
 "Aletin düşmesi", "Dropped tool",
 "Tool tether bağlantısını alet ve ankraj kapasitesine uygun seç",
 "Select tool-tether attachment suitable for tool and anchorage capacity"),

("Düşen cisim dışlama alanının yetersiz olması", "Inadequate dropped-object exclusion zone",
 "Alt seviyedeki personelin yaralanması", "Injury to personnel below",
 "Dışlama alanını çalışma yüksekliği ve düşme potansiyeline göre belirle",
 "Set the exclusion zone according to work height and drop potential"),
],

"cold-weather-work": [
("Buzlu yürüyüş yüzeyi", "Icy walking surface",
 "Kayma ve düşme", "Slip and fall",
 "Buzlanmayı gider ve yüksek riskli geçişlerde kaymaz yüzey sağla",
 "Remove ice and provide anti-slip treatment on high-risk routes"),

("Soğukta el becerisinin azalması", "Reduced manual dexterity in cold conditions",
 "Alet kontrol kaybı veya el yaralanması", "Loss of tool control or hand injury",
 "Uygun termal eldiven kullan ve periyodik ısınma molaları uygula",
 "Use suitable thermal gloves and periodic warm-up breaks"),

("Soğukta ekipman veya hortum malzemesinin kırılganlaşması", "Equipment or hose embrittlement in cold conditions",
 "Ekipman arızası veya proses salımı", "Equipment failure or process release",
 "Ekipmanın minimum çalışma sıcaklığına uygunluğunu doğrula",
 "Verify equipment is suitable for the minimum operating temperature"),
],

"emergency-evacuation": [
("Tahliye güzergahının değişikliğinin personele bildirilmemesi", "Evacuation-route change not communicated",
 "Yanlış güzergah veya tahliye gecikmesi", "Wrong route or delayed evacuation",
 "Geçici güzergah değişikliklerini tüm personele bildir ve işaretle",
 "Communicate and clearly mark temporary evacuation-route changes"),

("Toplanma noktasının tehlikeye maruz kalması", "Muster point exposed to emergency hazard",
 "Tahliye edilen personelin ikincil tehlikeye maruz kalması", "Evacuated personnel exposed to secondary hazard",
 "Toplanma noktasını hâkim rüzgar ve proses tehlikelerine göre değerlendir",
 "Assess muster-point location against prevailing wind and process hazards"),

("Tahliye sırasında hareket kabiliyeti kısıtlı kişiye destek olmaması", "No assistance for person with limited mobility during evacuation",
 "Tahliyenin gecikmesi veya yaralanma", "Delayed evacuation or injury",
 "Özel yardım ihtiyacı olan kişiler için buddy veya destek planı oluştur",
 "Establish a buddy or assistance plan for persons requiring support"),
],
}

TARGET_FILE = {
    "roof-work": "pack-01.ts",
    "mewP": "pack-01.ts",

    "roof-maintenance": "pack-04.ts",
    "mewp-inspection": "pack-04.ts",
    "mobile-equipment-inspection": "pack-04.ts",
    "excavator-operation": "pack-04.ts",
    "loader-operation": "pack-04.ts",
    "telehandler-operation": "pack-04.ts",
    "vehicle-reversing": "pack-04.ts",
    "loading-unloading": "pack-04.ts",
    "material-storage": "pack-04.ts",
    "steel-plate-handling": "pack-04.ts",
    "cylinder-loading-unloading": "pack-04.ts",
    "core-drilling": "pack-04.ts",
    "concrete-cutting": "pack-04.ts",
    "wall-floor-penetration": "pack-04.ts",
    "surface-preparation": "pack-04.ts",
    "solvent-cleaning": "pack-04.ts",
    "leak-testing": "pack-04.ts",
    "steam-blowing": "pack-04.ts",
    "emergency-response": "pack-04.ts",
    "lone-working": "pack-04.ts",

    "hand-power-tools": "pack-05.ts",
    "drilling": "pack-05.ts",
    "roofing": "pack-05.ts",
    "temporary-platform": "pack-05.ts",
    "suspended-basket": "pack-05.ts",
    "open-edge-work": "pack-05.ts",
    "mechanical-material-handling": "pack-05.ts",
    "pipe-handling": "pack-05.ts",
    "fuel-storage": "pack-05.ts",
    "chemical-storage": "pack-05.ts",
    "surface-grinding": "pack-05.ts",
    "leak-repair": "pack-05.ts",
    "general-maintenance": "pack-05.ts",
    "valve-removal": "pack-05.ts",
    "pump-alignment": "pack-05.ts",
    "compressor-startup": "pack-05.ts",
    "barricading": "pack-05.ts",
    "dropped-object-prevention": "pack-05.ts",
    "cold-weather-work": "pack-05.ts",
    "emergency-evacuation": "pack-05.ts",
}


def find_object(src, activity_id):
    marker = f'id: "{activity_id}"'
    p = src.find(marker)

    if p < 0:
        raise RuntimeError(f"{activity_id}: ID bulunamadı")

    start = src.rfind("{", 0, p)

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

    raise RuntimeError(f"{activity_id}: object kapanışı bulunamadı")


def make_item(v):
    htr, hen, ctr, cen, atr, aen = v

    return f'''      {{
        hazard: {{ tr: "{htr}", en: "{hen}" }},
        consequence: {{ tr: "{ctr}", en: "{cen}" }},
        personsAtRisk: {{
          tr: "Faaliyeti gerçekleştiren çalışanlar ve yakın personel",
          en: "Workers performing the activity and nearby personnel"
        }},
        existingControls: {{
          tr: "Yetkili personel, iş öncesi kontrol, uygun ekipman ve saha prosedürleri",
          en: "Authorized personnel, pre-work checks, suitable equipment and site procedures"
        }},
        additionalControls: {{ tr: "{atr}", en: "{aen}" }},
      }}'''


texts = {
    name: path.read_text(encoding="utf-8")
    for name, path in FILES.items()
}

# ============================================================
# PRECHECK
# ============================================================

global_before = 0

for path in Path("lib/risk-library").glob("pack-*.ts"):
    global_before += len(
        re.findall(
            r'hazard:\s*\{\s*tr:',
            path.read_text(encoding="utf-8")
        )
    )

print("===== SAFEBASE FINAL 900 =====")
print("MEVCUT TOPLAM:", global_before)

if global_before != 774:
    raise RuntimeError(
        f"Başlangıç toplamı 774 olmalıydı, mevcut {global_before}. DOSYA YAZILMADI."
    )

print()
print("===== 42 FAALIYET PRECHECK =====")

for activity_id, additions in DATA.items():
    filename = TARGET_FILE[activity_id]
    src = texts[filename]

    start, end = find_object(src, activity_id)
    block = src[start:end]

    existing = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    if len(existing) != 6:
        raise RuntimeError(
            f"{activity_id}: 6 risk bekleniyordu, {len(existing)} bulundu. DOSYA YAZILMADI."
        )

    new_titles = [x[0] for x in additions]

    exact_duplicates = set(existing) & set(new_titles)

    if exact_duplicates:
        raise RuntimeError(
            f"{activity_id}: EXACT DUPLICATE {exact_duplicates}. DOSYA YAZILMADI."
        )

    if len(set(new_titles)) != 3:
        raise RuntimeError(
            f"{activity_id}: yeni üçlü kendi içinde duplicate. DOSYA YAZILMADI."
        )

    print(f"✅ {filename:<10} {activity_id:<34} 6 → 9")


# ============================================================
# BACKUPS
# ============================================================

stamp = datetime.now().strftime("%Y%m%d-%H%M%S")

for filename, path in FILES.items():
    backup = path.with_name(
        path.name + f".backup-before-final900-{stamp}"
    )
    shutil.copy2(path, backup)
    print("BACKUP:", backup)


# ============================================================
# MODIFY IN MEMORY
# ============================================================

for activity_id, additions in DATA.items():
    filename = TARGET_FILE[activity_id]
    src = texts[filename]

    start, end = find_object(src, activity_id)
    block = src[start:end]

    arr_end = block.rfind("]")

    if arr_end < 0:
        raise RuntimeError(
            f"{activity_id}: items array kapanışı bulunamadı"
        )

    before = block[:arr_end].rstrip()

    if not before.endswith(","):
        before += ","

    insertion = (
        "\n"
        + ",\n".join(make_item(v) for v in additions)
        + "\n    "
    )

    new_block = before + insertion + block[arr_end:]

    src = src[:start] + new_block + src[end:]

    texts[filename] = src


# ============================================================
# FINAL VALIDATION BEFORE DISK WRITE
# ============================================================

print()
print("===== FINAL MEMORY CHECK =====")

for activity_id in DATA:
    filename = TARGET_FILE[activity_id]
    src = texts[filename]

    start, end = find_object(src, activity_id)
    block = src[start:end]

    hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    if len(hazards) != 9:
        raise RuntimeError(
            f"{activity_id}: final {len(hazards)} risk, 9 bekleniyordu. DOSYA YAZILMADI."
        )

    if len(set(hazards)) != 9:
        raise RuntimeError(
            f"{activity_id}: final exact duplicate bulundu. DOSYA YAZILMADI."
        )

print("✅ 42 faaliyetin tamamı memory üzerinde 9 risk")


# ============================================================
# WRITE
# ============================================================

for filename, src in texts.items():
    FILES[filename].write_text(src, encoding="utf-8")

print("✅ pack-01 / pack-04 / pack-05 yazıldı")
print("✅ +126 yeni risk eklendi")
