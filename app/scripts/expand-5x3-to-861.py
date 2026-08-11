from pathlib import Path
import re
import shutil
from datetime import datetime

FILE = Path("lib/risk-library/pack-05.ts")

DATA = {
    "compressor-startup": [
        (
            "Start-up sırasında yağlama yetersizliği",
            "Insufficient lubrication during compressor startup",
            "Ekipman hasarı veya aşırı ısınma",
            "Equipment damage or overheating",
            "Start-up öncesi yağ seviyesi, yağ basıncı ve lubrication sistemini doğrula",
            "Verify oil level, oil pressure and the lubrication system before startup"
        ),
        (
            "Discharge valve'ın yanlış pozisyonda olması",
            "Incorrect discharge-valve position",
            "Basınç sapması veya ekipman hasarı",
            "Pressure deviation or equipment damage",
            "Start-up checklist ile kritik valve pozisyonlarını doğrula",
            "Verify critical valve positions using the startup checklist"
        ),
        (
            "Start-up tehlike bölgesinde personel bulunması",
            "Personnel present in compressor startup hazard zone",
            "Ekipman arızasında çarpma veya proses maruziyeti",
            "Impact or process exposure during equipment failure",
            "İlk start sırasında kompresör çevresine erişimi sınırla",
            "Restrict access around the compressor during initial startup"
        ),
    ],

    "barricading": [
        (
            "Bariyerin tehlike alanına çok yakın kurulması",
            "Barricade positioned too close to the hazard",
            "Personelin tehlikeli etki alanına maruz kalması",
            "Personnel exposure to the hazard impact zone",
            "Bariyer mesafesini tehlikenin türü ve etki alanına göre belirle",
            "Set barricade distance according to the hazard type and impact zone"
        ),
        (
            "Bariyer üzerinde tehlike bilgisinin bulunmaması",
            "Barricade without hazard information",
            "Personelin riskin türünü anlamaması",
            "Personnel unaware of the hazard type",
            "Bariyer üzerine tehlike türü ve giriş şartlarını açıkça belirt",
            "Clearly identify the hazard type and access requirements on the barricade"
        ),
        (
            "Gece bariyerinin görünür olmaması",
            "Barricade not visible at night",
            "Bariyere çarpma veya tehlikeli alana giriş",
            "Collision with barricade or entry into the hazard zone",
            "Düşük ışıkta reflektif veya aydınlatılmış bariyer kullan",
            "Use reflective or illuminated barricades in low-light conditions"
        ),
    ],

    "dropped-object-prevention": [
        (
            "Yüksekte gevşek küçük parçalar bulunması",
            "Loose small components at height",
            "Düşen cisim yaralanması",
            "Dropped-object injury",
            "Gevşek parçaları sabitle veya kapalı bir konteynerde tut",
            "Secure loose components or keep them in a closed container"
        ),
        (
            "Tool lanyard bağlantısının uygunsuz olması",
            "Incorrect tool-lanyard attachment",
            "Aletin aşağı düşmesi",
            "Dropped tool",
            "Tool tether bağlantısını alet ve ankraj kapasitesine uygun seç",
            "Select a tool-tether attachment suitable for the tool and anchorage capacity"
        ),
        (
            "Düşen cisim dışlama alanının yetersiz olması",
            "Inadequate dropped-object exclusion zone",
            "Alt seviyedeki personelin yaralanması",
            "Injury to personnel below",
            "Dışlama alanını çalışma yüksekliği ve düşme potansiyeline göre belirle",
            "Set the exclusion zone according to work height and drop potential"
        ),
    ],

    "cold-weather-work": [
        (
            "Buzlu yürüyüş yüzeyi",
            "Icy walking surface",
            "Kayma ve düşme",
            "Slip and fall",
            "Buzlanmayı gider ve yüksek riskli geçişlerde kaymaz yüzey sağla",
            "Remove ice and provide anti-slip treatment on high-risk routes"
        ),
        (
            "Soğukta el becerisinin azalması",
            "Reduced manual dexterity in cold conditions",
            "Alet kontrol kaybı veya el yaralanması",
            "Loss of tool control or hand injury",
            "Uygun termal eldiven kullan ve periyodik ısınma molaları uygula",
            "Use suitable thermal gloves and provide periodic warm-up breaks"
        ),
        (
            "Soğukta hortum veya ekipman malzemesinin kırılganlaşması",
            "Hose or equipment embrittlement in cold conditions",
            "Ekipman arızası veya proses salımı",
            "Equipment failure or process release",
            "Ekipmanın minimum çalışma sıcaklığına uygunluğunu doğrula",
            "Verify equipment suitability for the minimum operating temperature"
        ),
    ],

    "emergency-evacuation": [
        (
            "Tahliye güzergahı değişikliğinin personele bildirilmemesi",
            "Evacuation-route change not communicated",
            "Yanlış güzergah kullanımı veya tahliye gecikmesi",
            "Use of wrong route or delayed evacuation",
            "Geçici güzergah değişikliklerini tüm personele bildir ve açıkça işaretle",
            "Communicate and clearly mark all temporary evacuation-route changes"
        ),
        (
            "Toplanma noktasının ikincil tehlikeye maruz kalması",
            "Muster point exposed to a secondary hazard",
            "Tahliye edilen personelin yeniden tehlikeye maruz kalması",
            "Evacuated personnel exposed to another hazard",
            "Toplanma noktasını rüzgar yönü ve proses tehlikelerine göre değerlendir",
            "Assess the muster point against wind direction and process hazards"
        ),
        (
            "Hareket kabiliyeti kısıtlı personele tahliye desteği olmaması",
            "No evacuation assistance for personnel with limited mobility",
            "Tahliyenin gecikmesi veya yaralanma",
            "Delayed evacuation or injury",
            "Destek ihtiyacı olan kişiler için buddy veya yardım planı oluştur",
            "Establish a buddy or assistance plan for personnel requiring support"
        ),
    ],
}


def find_object(src, activity_id):
    pos = src.find(f'id: "{activity_id}"')
    if pos < 0:
        raise RuntimeError(f"{activity_id}: BULUNAMADI")

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

    raise RuntimeError(f"{activity_id}: KAPANIŞ BULUNAMADI")


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

for activity_id, additions in DATA.items():
    start, end = find_object(text, activity_id)
    block = text[start:end]

    existing = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    print(f"{activity_id}: mevcut {len(existing)} risk")

    if len(existing) != 6:
        raise RuntimeError(
            f"{activity_id}: 6 RISK DEĞİL. DOSYA YAZILMADI."
        )

    new_titles = [x[0] for x in additions]
    duplicates = set(existing) & set(new_titles)

    if duplicates:
        raise RuntimeError(
            f"{activity_id}: DUPLICATE {duplicates}. DOSYA YAZILMADI."
        )

    print(f"✅ {activity_id}: 6 → 9 hazır")


backup = FILE.with_name(
    FILE.name + ".backup-before-861-" +
    datetime.now().strftime("%Y%m%d-%H%M%S")
)

shutil.copy2(FILE, backup)
print("BACKUP:", backup)


for activity_id, additions in DATA.items():
    start, end = find_object(text, activity_id)
    block = text[start:end]

    arr_end = block.rfind("]")

    if arr_end < 0:
        raise RuntimeError(f"{activity_id}: ITEMS KAPANIŞI BULUNAMADI")

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


for activity_id in DATA:
    start, end = find_object(text, activity_id)
    block = text[start:end]

    hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    if len(hazards) != 9:
        raise RuntimeError(
            f"{activity_id}: FINAL {len(hazards)} RISK. DOSYA YAZILMADI."
        )

FILE.write_text(text, encoding="utf-8")

print()
print("🔥 5 × 3 BAŞARIYLA EKLENDİ")
