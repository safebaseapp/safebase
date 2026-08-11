from pathlib import Path
import re
import shutil
from datetime import datetime

FILE = Path("lib/risk-library/pack-04.ts")

DATA = {

"telehandler-operation": [
(
"Telehandler ataşmanının yanlış seçilmesi",
"Incorrect telehandler attachment selected",
"Yük düşmesi veya ekipman stabilitesinin bozulması",
"Dropped load or equipment instability",
"Yük tipine ve üretici gerekliliklerine uygun ataşman kullan",
"Use an attachment suitable for the load and approved by the manufacturer"
),
(
"Boom kaldırılmış halde seyir yapılması",
"Travelling with telehandler boom raised",
"Devrilme veya çevredeki ekipmanla çarpışma",
"Overturn or collision with nearby equipment",
"Seyir sırasında boomu üreticinin belirttiği güvenli taşıma pozisyonunda tut",
"Keep the boom in the manufacturer-specified safe travel position"
),
(
"Asılı yükün kontrolsüz salınımı",
"Uncontrolled swing of suspended load",
"Yükün personele veya ekipmana çarpması",
"Load striking personnel or equipment",
"Asılı yüklerde uygun tag line ve kontrollü yönlendirme kullan",
"Use suitable tag lines and controlled guidance for suspended loads"
),
],

"vehicle-reversing": [
(
"Geri manevra güzergahında sabit engel bulunması",
"Fixed obstruction in reversing route",
"Araç çarpışması veya sıkışma",
"Vehicle collision or entrapment",
"Manevra başlamadan geri güzergahını fiziksel olarak kontrol et",
"Physically inspect the reversing route before movement"
),
(
"Banksman ile sürücü iletişiminin kesilmesi",
"Loss of communication between driver and banksman",
"Kontrolsüz manevra veya çarpışma",
"Uncontrolled maneuver or collision",
"İletişim kesildiğinde sürücünün aracı derhal durdurmasını sağla",
"Require the driver to stop immediately if communication is lost"
),
(
"Geri manevra alanında yetersiz aydınlatma",
"Insufficient lighting in reversing area",
"Yaya veya engelin fark edilmemesi",
"Failure to detect pedestrians or obstacles",
"Manevra alanına yeterli geçici veya sabit aydınlatma sağla",
"Provide adequate temporary or permanent lighting in the maneuvering area"
),
],

"loading-unloading": [
(
"Araç kasasından personel düşmesi",
"Personnel falling from vehicle bed",
"Ciddi yaralanma",
"Serious injury",
"Araç kasasına güvenli erişim sağla ve yüksekten atlamayı engelle",
"Provide safe access to the vehicle bed and prevent jumping from height"
),
(
"Yük bağlarının kontrolsüz açılması",
"Uncontrolled release of load restraints",
"Yükün ani hareketi veya personele çarpması",
"Sudden load movement or impact on personnel",
"Bağları çözmeden önce yük stabilitesini ve hareket yönünü değerlendir",
"Assess load stability and potential movement before releasing restraints"
),
(
"Yükleme rampasında boşluk veya seviye farkı",
"Gap or level difference at loading ramp",
"Forklift veya personelin düşmesi",
"Forklift or personnel fall",
"Rampanın pozisyonunu, kapasitesini ve sabitlenmesini yükleme öncesi doğrula",
"Verify ramp position, capacity and securing before loading"
),
],

"material-storage": [
(
"Raf taşıyıcı elemanının hasarlı olması",
"Damaged structural member on storage rack",
"Raf çökmesi veya malzeme düşmesi",
"Rack collapse or falling material",
"Hasarlı raf bölümlerini karantinaya al ve onarım yapılmadan kullanma",
"Quarantine damaged rack sections until repaired"
),
(
"Yuvarlanabilir malzemenin sabitlenmemesi",
"Round materials stored without restraint",
"Malzemenin yuvarlanması ve ezilme",
"Rolling material and crushing",
"Boru ve silindirik malzemeleri takoz veya uygun rack ile sabitle",
"Secure pipes and cylindrical materials using chocks or suitable racks"
),
(
"Ağır malzemenin yüksek seviyede depolanması",
"Heavy material stored at excessive height",
"Malzeme düşmesi veya istif stabilitesinin kaybı",
"Falling material or loss of stack stability",
"Ağır malzemeleri mümkün olan en düşük güvenli seviyede depola",
"Store heavy materials at the lowest practicable safe level"
),
],

"steel-plate-handling": [
(
"Çelik plakaların arasında el sıkışması",
"Hand entrapment between steel plates",
"El veya parmak ezilmesi",
"Hand or finger crushing",
"Plakaları ayırmak için uygun mekanik ayırıcı veya handling tool kullan",
"Use suitable mechanical separators or handling tools between plates"
),
(
"Uzun plakanın kontrolsüz salınımı",
"Uncontrolled swing of long steel plate",
"Çarpma veya sıkışma yaralanması",
"Impact or entrapment injury",
"Uzun plakaları uygun tag line ile kontrollü yönlendir",
"Control long plates using suitable tag lines"
),
(
"Plate lifting aparatının yanlış konumlandırılması",
"Incorrect positioning of plate lifting device",
"Plakanın düşmesi veya ani hareket etmesi",
"Dropped plate or sudden movement",
"Lifting aparatının doğru kavrama noktasında olduğunu kaldırma öncesi doğrula",
"Verify the lifting device is positioned at the correct gripping point before lifting"
),
],

"cylinder-loading-unloading": [
(
"Tüp yükleme sırasında parmak sıkışması",
"Finger entrapment during cylinder loading",
"El veya parmak yaralanması",
"Hand or finger injury",
"Tüp, araç ve rack arasındaki pinch pointlerden elleri uzak tut",
"Keep hands clear of pinch points between cylinders, vehicles and racks"
),
(
"Hasarlı tüpün taşımaya kabul edilmesi",
"Damaged cylinder accepted for transport",
"Gaz kaçağı veya basınçlı salım",
"Gas leak or pressurized release",
"Hasarlı, korozyonlu veya sızıntı şüphesi bulunan tüpleri karantinaya al",
"Quarantine damaged, corroded or suspected leaking cylinders"
),
(
"Tüp trolleyinin kontrolsüz hareketi",
"Uncontrolled movement of cylinder trolley",
"Tüpün devrilmesi veya personele çarpması",
"Cylinder overturn or impact on personnel",
"Trolleyi eğimli yüzeylerde kontrol altında tut ve park halinde sabitle",
"Control the trolley on slopes and secure it while parked"
),
],

"core-drilling": [
(
"Karot sırasında suyun elektrik bağlantılarına ulaşması",
"Water reaching electrical connections during core drilling",
"Elektrik çarpması veya kısa devre",
"Electric shock or short circuit",
"Su akışını kontrol et ve elektrik bağlantılarını ıslak alandan koru",
"Control water flow and protect electrical connections from wet areas"
),
(
"Karot sehpasının yetersiz sabitlenmesi",
"Inadequate anchoring of core-drill stand",
"Makinenin hareket etmesi veya operatörün yaralanması",
"Machine movement or operator injury",
"Stand ankrajını ve bağlantılarını delme başlamadan doğrula",
"Verify stand anchorage and connections before drilling"
),
(
"Karot delme sırasında yüksek gürültü",
"High noise during core drilling",
"İşitme hasarı",
"Hearing damage",
"Gürültü seviyesine uygun işitme koruması kullan",
"Use hearing protection suitable for the noise level"
),
],

"concrete-cutting": [
(
"Islak kesimde su beslemesinin kesilmesi",
"Loss of water supply during wet cutting",
"Silika tozu maruziyetinin artması",
"Increased silica-dust exposure",
"Islak kesim sırasında sürekli yeterli su akışını doğrula",
"Maintain adequate water flow during wet cutting"
),
(
"Kesme kablosu veya zincirinin kopması",
"Wire or chain failure during concrete cutting",
"Yüksek enerjili parça çarpması",
"High-energy projectile impact",
"Kesme hattını dışlama alanı olarak belirle ve ekipmanı kullanım öncesi kontrol et",
"Establish an exclusion zone around the cutting line and inspect equipment before use"
),
(
"Kesim nedeniyle yapısal bütünlüğün bozulması",
"Structural integrity affected by concrete cutting",
"Kontrolsüz yapı hareketi veya çökme",
"Uncontrolled structural movement or collapse",
"Taşıyıcı elemanlarda kesim öncesi mühendislik onayı al",
"Obtain engineering approval before cutting structural elements"
),
],

"wall-floor-penetration": [
(
"Penetrasyon kapağının taşıma kapasitesinin yetersiz olması",
"Insufficient load capacity of penetration cover",
"Kapak kırılması ve açıklıktan düşme",
"Cover failure and fall through opening",
"Kapakların beklenen yüke dayanıklı olduğunu doğrula",
"Verify covers are capable of supporting expected loads"
),
(
"Penetrasyon kenarında keskin yüzey bulunması",
"Sharp edge around penetration",
"Kesik veya ekipman hasarı",
"Laceration or equipment damage",
"Keskin kenarları koru veya uygun şekilde çapaklarını temizle",
"Protect or appropriately deburr sharp edges"
),
(
"Penetrasyonun yanlış veya yetersiz işaretlenmesi",
"Incorrect or inadequate penetration identification",
"Yanlış kullanım veya güvenlik kontrolünün kaybı",
"Incorrect use or loss of safety control",
"Tüm penetrasyonları açık ve görünür şekilde işaretle",
"Clearly identify all penetrations"
),
],

"surface-preparation": [
(
"Yüzey hazırlama ekipmanında aşırı titreşim",
"Excessive vibration from surface-preparation equipment",
"El-kol titreşim maruziyeti",
"Hand-arm vibration exposure",
"Titreşim maruziyet süresini sınırla ve uygun düşük titreşimli ekipman kullan",
"Limit vibration exposure and use suitable low-vibration equipment"
),
(
"Yüzey hazırlığında yanıcı toz oluşması",
"Combustible dust generated during surface preparation",
"Yangın veya patlama",
"Fire or explosion",
"Toz birikimini kontrol et ve ateşleme kaynaklarını uzaklaştır",
"Control dust accumulation and remove ignition sources"
),
(
"Yakındaki hassas ekipmanın hazırlık sırasında hasar görmesi",
"Nearby sensitive equipment damaged during surface preparation",
"Proses kaçağı veya ikincil tehlike",
"Process leak or secondary hazard",
"Hassas ekipmanı perde veya fiziksel koruma ile izole et",
"Protect sensitive nearby equipment using screens or physical protection"
),
],
}


def find_object(src, activity_id):
    pos = src.find(f'id: "{activity_id}"')
    if pos < 0:
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

    raise RuntimeError(f"{activity_id}: kapanış bulunamadı")


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


text = FILE.read_text(encoding="utf-8")

# ---------- PRECHECK ----------
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

    dup = set(existing) & set(new_titles)

    if dup:
        raise RuntimeError(
            f"{activity_id}: DUPLICATE {dup}. DOSYA YAZILMADI."
        )

    print(f"✅ {activity_id}: 6 → 9 hazır")


# ---------- BACKUP ----------
backup = FILE.with_name(
    FILE.name + ".backup-before-10x3-" +
    datetime.now().strftime("%Y%m%d-%H%M%S")
)

shutil.copy2(FILE, backup)

print("BACKUP:", backup)


# ---------- MODIFY ----------
for activity_id, additions in DATA.items():

    start, end = find_object(text, activity_id)
    block = text[start:end]

    arr_end = block.rfind("]")

    if arr_end < 0:
        raise RuntimeError(
            f"{activity_id}: items kapanışı bulunamadı"
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

    text = text[:start] + new_block + text[end:]


# ---------- FINAL CHECK ----------
for activity_id in DATA:

    start, end = find_object(text, activity_id)
    block = text[start:end]

    count = len(
        re.findall(r'hazard:\s*\{\s*tr:', block)
    )

    if count != 9:
        raise RuntimeError(
            f"{activity_id}: final {count}, beklenen 9. DOSYA YAZILMADI."
        )


FILE.write_text(text, encoding="utf-8")

print()
print("🔥 10 FAALIYET × +3 TAMAMLANDI")
