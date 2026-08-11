from pathlib import Path
import re
import shutil
from datetime import datetime

FILES = {
    "pack-04.ts": Path("lib/risk-library/pack-04.ts"),
    "pack-05.ts": Path("lib/risk-library/pack-05.ts"),
}

TARGET_FILE = {
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
}

DATA = {

"solvent-cleaning": [
(
"Solvent kabının etiketsiz olması",
"Unlabeled solvent container",
"Yanlış kullanım veya kimyasal maruziyet",
"Incorrect use or chemical exposure",
"Tüm solvent kaplarını içerik ve tehlike bilgileriyle etiketle",
"Label all solvent containers with contents and hazard information"
),
(
"Uyumsuz solventlerin karıştırılması",
"Mixing incompatible solvents",
"Kimyasal reaksiyon, ısı veya toksik gaz oluşumu",
"Chemical reaction, heat or toxic-gas generation",
"Solventleri SDS uyumluluk bilgisine göre ayrı tut",
"Segregate solvents according to SDS compatibility information"
),
(
"Solventin sıcak yüzeye temas etmesi",
"Solvent contacting a hot surface",
"Yangın veya yanıcı buhar oluşumu",
"Fire or flammable-vapor generation",
"Temizlik alanındaki sıcak yüzeyleri ve ateşleme kaynaklarını kontrol et",
"Control hot surfaces and ignition sources in the cleaning area"
),
],

"leak-testing": [
(
"Test göstergesinin kalibrasyon dışı olması",
"Leak-test gauge out of calibration",
"Yanlış basınç değerlendirmesi veya ekipman hasarı",
"Incorrect pressure assessment or equipment damage",
"Basınç göstergesinin geçerli kalibrasyon durumunu test öncesi doğrula",
"Verify valid calibration status of the pressure gauge before testing"
),
(
"Test sistemi içinde hapsolmuş basınç",
"Trapped pressure inside leak-test system",
"Beklenmeyen basınç salımı ve yaralanma",
"Unexpected pressure release and injury",
"Bağlantıları sökmeden önce sıfır basıncı fiziksel olarak doğrula",
"Physically verify zero pressure before disconnecting equipment"
),
(
"Kaçak testinde uygunsuz kimyasal kullanılması",
"Unsuitable chemical used for leak testing",
"Malzeme hasarı veya kimyasal maruziyet",
"Material damage or chemical exposure",
"Kaçak tespit ürününün ekipman malzemesiyle uyumluluğunu doğrula",
"Verify compatibility of the leak-detection product with equipment materials"
),
],

"steam-blowing": [
(
"Steam blowing sırasında kondens birikmesi",
"Condensate accumulation during steam blowing",
"Water hammer veya boru hasarı",
"Water hammer or piping damage",
"Operasyon öncesi drenaj noktalarının açık ve fonksiyonel olduğunu doğrula",
"Verify drain points are open and functional before operation"
),
(
"Discharge susturucusunun arızalanması",
"Steam-blowing silencer failure",
"Aşırı gürültü, titreşim veya ekipman hasarı",
"Extreme noise, vibration or equipment damage",
"Susturucu ve geçici discharge ekipmanını operasyon öncesi kontrol et",
"Inspect the silencer and temporary discharge equipment before operation"
),
(
"Steam blowing sisteminde sıcak yüzey teması",
"Contact with hot surfaces on steam-blowing system",
"Termal yanık",
"Thermal burn",
"Sıcak yüzeyleri bariyerle, izole et ve uyarı işaretleri kullan",
"Barricade or insulate hot surfaces and provide warning signs"
),
],

"emergency-response": [
(
"Toplanma alanında personel sayımının yapılamaması",
"Failure to account for personnel at muster point",
"Kayıp personelin fark edilmemesi ve kurtarmanın gecikmesi",
"Missing personnel not identified and rescue delayed",
"Güncel personel sayım ve muster sistemi uygula",
"Maintain an up-to-date personnel accountability and muster system"
),
(
"Acil durum ekipmanına erişimin engellenmesi",
"Access to emergency equipment obstructed",
"Acil müdahalenin gecikmesi",
"Delayed emergency response",
"Yangın, ilk yardım ve kurtarma ekipmanı önlerini sürekli açık tut",
"Keep access to firefighting, first-aid and rescue equipment clear"
),
(
"Kurtarma ekibinin uygun PPE olmadan müdahale etmesi",
"Rescue team responding without suitable PPE",
"İkincil yaralanma veya tehlikeli maruziyet",
"Secondary injury or hazardous exposure",
"Acil durum türüne uygun kurtarma PPE ve ekipmanını hazır bulundur",
"Keep rescue PPE and equipment suitable for the emergency readily available"
),
],

"lone-working": [
(
"Yalnız çalışan personelde tıbbi acil durum",
"Medical emergency during lone working",
"Yardımın gecikmesi veya durumun ağırlaşması",
"Delayed assistance or worsening condition",
"Risk seviyesine göre düzenli check-in ve welfare kontrol sistemi uygula",
"Implement regular check-ins and welfare checks according to risk level"
),
(
"Yalnız çalışma alanında kaçış yolunun kapanması",
"Escape route blocked in lone-working area",
"Acil durumda tahliyenin gecikmesi",
"Delayed evacuation during an emergency",
"İşe başlamadan erişim ve kaçış güzergahını doğrula",
"Verify access and escape routes before lone work begins"
),
(
"Yalnız çalışanın gerçek konumunun bilinmemesi",
"Exact location of lone worker unknown",
"Acil müdahalenin gecikmesi",
"Delayed emergency response",
"Çalışanın konumunu ve görev süresini supervisor ile kayıt altına al",
"Record the worker's location and task duration with the supervisor"
),
],

"hand-power-tools": [
(
"El aletinde yanlış aksesuar kullanılması",
"Incorrect accessory fitted to hand power tool",
"Aksesuar arızası veya ciddi yaralanma",
"Accessory failure or serious injury",
"Aksesuar tipini, çapını ve hız değerini ekipmanla uyumlu seç",
"Select accessories compatible with the tool type, diameter and speed rating"
),
(
"Elektrikli el aleti kablosunun keskin kenara temas etmesi",
"Power-tool cable contacting a sharp edge",
"Elektrik çarpması veya kısa devre",
"Electric shock or short circuit",
"Kabloları keskin kenar, sıcak yüzey ve hareketli ekipmandan koru",
"Protect cables from sharp edges, hot surfaces and moving equipment"
),
(
"El aletinin dengesiz çalışma pozisyonunda kullanılması",
"Hand power tool used from an unstable working position",
"Kontrol kaybı, kesik veya düşme",
"Loss of control, laceration or fall",
"Aleti kullanmadan önce dengeli ve güvenli çalışma pozisyonu oluştur",
"Establish a stable and safe working position before using the tool"
),
],

"drilling": [
(
"Matkap ucunun iş parçasında sıkışması",
"Drill bit binding in the workpiece",
"Aletin geri tepmesi veya el-kol yaralanması",
"Tool kickback or hand-arm injury",
"İş parçasını sabitle ve uygun hız ile doğru matkap ucu kullan",
"Secure the workpiece and use the correct drill bit and speed"
),
(
"Delme sırasında uçuşan metal talaşları",
"Flying metal swarf during drilling",
"Göz veya yüz yaralanması",
"Eye or facial injury",
"Delme sırasında uygun gözlük ve gerektiğinde yüz siperi kullan",
"Use suitable eye protection and a face shield where required"
),
(
"Uzun matkap ucunun kırılması",
"Long drill bit failure",
"Parça fırlaması veya kesik yaralanması",
"Projectile or laceration injury",
"Uygun bit uzunluğu kullan ve matkap ucuna aşırı yan yük uygulama",
"Use an appropriate bit length and avoid excessive lateral loading"
),
],

"roofing": [
(
"Çatı kaplama malzemesinin rüzgarda savrulması",
"Roofing material displaced by wind",
"Düşen cisim veya çalışan dengesinin kaybolması",
"Dropped object or worker losing balance",
"Kaplama malzemelerini rüzgara karşı sabitle ve hava koşullarını izle",
"Secure roofing materials against wind and monitor weather conditions"
),
(
"Sıcak uygulamalı çatı işinde yanık riski",
"Burn hazard during hot-applied roofing work",
"Termal yanık veya yangın",
"Thermal burn or fire",
"Sıcak malzeme ve ekipmanı kontrollü alanda ve uygun PPE ile kullan",
"Use hot materials and equipment in a controlled area with suitable PPE"
),
(
"Çatı membranı üzerinde kaygan yüzey",
"Slippery surface on roofing membrane",
"Kayma ve yüksekten düşme",
"Slip and fall from height",
"Temiz, kuru ve belirlenmiş bir çalışma ve yürüyüş güzergahı oluştur",
"Maintain a clean, dry and designated working and walking route"
),
],

"temporary-platform": [
(
"Geçici platformun kapasitesinin aşılması",
"Temporary platform overloaded",
"Platform arızası veya çökme",
"Platform failure or collapse",
"Platform yük kapasitesini belirle ve personel ile malzeme yükünü sınırla",
"Define platform capacity and limit personnel and material loads"
),
(
"Geçici platformda toe-board bulunmaması",
"Missing toe board on temporary platform",
"Alet veya malzeme düşmesi",
"Dropped tools or materials",
"Platform açık kenarlarında uygun toe-board kullan",
"Provide suitable toe boards at open platform edges"
),
(
"Geçici platforma uygunsuz erişim",
"Unsafe access to temporary platform",
"Takılma veya yüksekten düşme",
"Trip or fall from height",
"Platforma uygun sabit merdiven veya güvenli erişim sistemi sağla",
"Provide a suitable fixed ladder or safe access system to the platform"
),
],

"suspended-basket": [
(
"Askılı sepet bağlantı sisteminde dengesiz yük dağılımı",
"Unbalanced load distribution in suspended-basket system",
"Sepetin eğilmesi, stabilite kaybı veya düşmesi",
"Basket tilting, loss of stability or fall",
"Askı noktalarını ve sepet içindeki yük dağılımını kaldırma öncesi doğrula",
"Verify suspension points and basket load distribution before lifting"
),
(
"Askılı sepet için acil kurtarma planının olmaması",
"No emergency rescue plan for suspended-basket operation",
"Personelin yüksekte mahsur kalması",
"Personnel stranded at height",
"Operasyon öncesi göreve özel kurtarma planı ve ekipmanı hazırla",
"Prepare a task-specific rescue plan and equipment before operation"
),
(
"Askılı sepetin yapı veya ekipmana çarpması",
"Suspended basket striking structure or equipment",
"Personel yaralanması veya sepet hasarı",
"Personnel injury or basket damage",
"Sepet hareketini uygun tag line veya kontrollü yönlendirme ile sınırla",
"Control basket movement using suitable tag lines or controlled guidance"
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


texts = {
    filename: path.read_text(encoding="utf-8")
    for filename, path in FILES.items()
}

# --------------------------------------------
# PRECHECK
# --------------------------------------------

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

    duplicate = set(existing) & set(new_titles)

    if duplicate:
        raise RuntimeError(
            f"{activity_id}: DUPLICATE {duplicate}. DOSYA YAZILMADI."
        )

    print(f"✅ {filename:<10} {activity_id:<28} 6 → 9 hazır")


# --------------------------------------------
# BACKUP
# --------------------------------------------

stamp = datetime.now().strftime("%Y%m%d-%H%M%S")

for filename, path in FILES.items():
    backup = path.with_name(
        path.name + f".backup-before-next10-{stamp}"
    )
    shutil.copy2(path, backup)
    print("BACKUP:", backup)


# --------------------------------------------
# MODIFY IN MEMORY
# --------------------------------------------

for activity_id, additions in DATA.items():

    filename = TARGET_FILE[activity_id]
    src = texts[filename]

    start, end = find_object(src, activity_id)
    block = src[start:end]

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

    texts[filename] = src[:start] + new_block + src[end:]


# --------------------------------------------
# FINAL CHECK BEFORE WRITE
# --------------------------------------------

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
            f"{activity_id}: final {len(hazards)}, beklenen 9. DOSYA YAZILMADI."
        )

    if len(set(hazards)) != 9:
        raise RuntimeError(
            f"{activity_id}: final duplicate bulundu. DOSYA YAZILMADI."
        )


# --------------------------------------------
# WRITE
# --------------------------------------------

for filename, src in texts.items():
    FILES[filename].write_text(src, encoding="utf-8")

print()
print("🔥 10 FAALIYET × +3 TAMAMLANDI")
