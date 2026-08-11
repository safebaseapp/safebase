from pathlib import Path
import re
import shutil
from datetime import datetime

FILES = {
    "pack-01.ts": Path("lib/risk-library/pack-01.ts"),
    "pack-05.ts": Path("lib/risk-library/pack-05.ts"),
}

TARGET_FILE = {
    "roof-work": "pack-01.ts",
    "mewP": "pack-01.ts",
    "open-edge-work": "pack-05.ts",
    "mechanical-material-handling": "pack-05.ts",
    "pipe-handling": "pack-05.ts",
}

DATA = {

"roof-work": [
(
"Çatı erişim noktasında kayma veya düşme",
"Slip or fall at roof access point",
"Ciddi yaralanma veya yüksekten düşme",
"Serious injury or fall from height",
"Çatı erişim noktasını temiz, sabit ve uygun korkuluk veya düşüş koruması ile güvenli hale getir",
"Keep the roof access point clean and stable and provide suitable guardrails or fall protection"
),
(
"Çatı üzerinde gevşek malzeme bulunması",
"Loose materials on roof",
"Takılma veya alt seviyeye malzeme düşmesi",
"Trip or materials falling to a lower level",
"Çatı üzerindeki alet ve malzemeleri sabitle ve yürüyüş yollarını açık tut",
"Secure tools and materials on the roof and keep walking routes clear"
),
(
"Çatı çalışması sırasında yıldırım riski",
"Lightning risk during roof work",
"Elektrik etkisi, ciddi yaralanma veya ölüm",
"Electrical effects, serious injury or fatality",
"Yıldırım riski bulunan hava koşullarında çatı çalışmasını durdur",
"Stop roof work when lightning risk is present"
),
],

"mewP": [
(
"MEWP platform kapasitesinin aşılması",
"MEWP platform overloaded",
"Stabilite kaybı veya devrilme",
"Loss of stability or overturn",
"Personel, ekipman ve malzeme toplam yükünü üretici kapasitesi içinde tut",
"Keep personnel, equipment and materials within the manufacturer's platform capacity"
),
(
"MEWP'nin eğimli veya bozuk zeminde kullanılması",
"MEWP operated on sloped or uneven ground",
"Devrilme veya kontrol kaybı",
"Overturn or loss of control",
"Zemin eğimi ve taşıma kapasitesini kullanım öncesi doğrula",
"Verify ground slope and bearing capacity before use"
),
(
"MEWP platform kapısının açık bırakılması",
"MEWP platform gate left open",
"Platformdan düşme",
"Fall from platform",
"Platform hareketinden önce giriş kapısının kapalı ve güvenli olduğunu doğrula",
"Verify the platform gate is closed and secure before movement"
),
],

"open-edge-work": [
(
"Açık kenarda yetersiz toplu koruma",
"Inadequate collective protection at open edge",
"Yüksekten düşme sonucu ciddi yaralanma veya ölüm",
"Serious injury or fatality from fall from height",
"Açık kenarda uygun üst korkuluk, ara korkuluk ve gerekli yerlerde toe-board sağla",
"Provide suitable top rails, mid rails and toe boards where required"
),
(
"Açık kenara yakın malzeme bırakılması",
"Materials placed close to open edge",
"Malzeme düşmesi veya çalışanın dengesini kaybetmesi",
"Dropped material or worker losing balance",
"Malzemeleri açık kenardan güvenli mesafede ve sabit şekilde depola",
"Store materials securely at a safe distance from the open edge"
),
(
"Açık kenar yakınında yetersiz aydınlatma",
"Insufficient lighting near open edge",
"Yanlış adım veya yüksekten düşme",
"Misstep or fall from height",
"Çalışma ve erişim alanlarında yeterli aydınlatma sağla",
"Provide adequate lighting in work and access areas"
),
],

"mechanical-material-handling": [
(
"Taşınan yükün taşıma ekipmanından kayması",
"Load slipping from handling equipment",
"Yük düşmesi veya personele çarpması",
"Dropped load or personnel being struck",
"Yükü uygun attachment veya restraint sistemiyle emniyete al",
"Secure the load using a suitable attachment or restraint system"
),
(
"Mekanik taşıma ekipmanının kapasitesinin aşılması",
"Mechanical handling equipment overloaded",
"Ekipman arızası veya yük düşmesi",
"Equipment failure or dropped load",
"Yük ağırlığını ve ekipmanın SWL/WLL kapasitesini işlem öncesi doğrula",
"Verify load weight and equipment SWL/WLL before handling"
),
(
"Yük hareket alanına personel girmesi",
"Personnel entering the load movement area",
"Sıkışma, ezilme veya çarpma",
"Entrapment, crushing or struck-by injury",
"Yük hareket güzergahını bariyerle ve personeli line-of-fire alanından uzak tut",
"Barricade the load travel path and keep personnel outside the line of fire"
),
],

"pipe-handling": [
(
"Borunun kontrolsüz yuvarlanması",
"Uncontrolled rolling of pipe",
"Ezilme veya sıkışma",
"Crushing or entrapment",
"Boruları takoz veya uygun rack ile yuvarlanmaya karşı sabitle",
"Secure pipes against rolling using chocks or suitable racks"
),
(
"Uzun borunun kaldırma sırasında salınım yapması",
"Long pipe swinging during lifting",
"Çarpma veya sıkışma yaralanması",
"Impact or entrapment injury",
"Uzun boruların yönlendirilmesinde uygun tag line kullan",
"Use suitable tag lines to control long pipes during lifting"
),
(
"Borular arasında el veya parmak sıkışması",
"Hands or fingers trapped between pipes",
"El veya parmak ezilmesi",
"Hand or finger crushing injury",
"Boruları elle yönlendirmek yerine uygun yardımcı ekipman kullan ve elleri pinch pointlerden uzak tut",
"Use suitable handling aids instead of manual positioning and keep hands clear of pinch points"
),
],
}


def find_object(src, activity_id):
    pos = src.find(f'id: "{activity_id}"')
    if pos < 0:
        return None

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

    return None


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

stamp = datetime.now().strftime("%Y%m%d-%H%M%S")

for name, path in FILES.items():
    shutil.copy2(
        path,
        path.with_name(path.name + f".backup-safe-{stamp}")
    )

added = 0

for activity_id, additions in DATA.items():

    filename = TARGET_FILE[activity_id]
    src = texts[filename]

    result = find_object(src, activity_id)

    if result is None:
        print(f"⚠️ SKIP {activity_id}: bulunamadı")
        continue

    start, end = result
    block = src[start:end]

    hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    print(f"{activity_id}: mevcut {len(hazards)} risk")

    if len(hazards) != 6:
        print(f"⚠️ SKIP {activity_id}: 6 risk değil")
        continue

    if len(hazards) != len(set(hazards)):
        print(f"⚠️ SKIP {activity_id}: mevcut duplicate var")
        continue

    new_titles = [x[0] for x in additions]

    if set(hazards) & set(new_titles):
        print(f"⚠️ SKIP {activity_id}: yeni risk duplicate")
        continue

    arr_end = block.rfind("]")

    if arr_end < 0:
        print(f"⚠️ SKIP {activity_id}: items kapanışı yok")
        continue

    before = block[:arr_end].rstrip()

    if not before.endswith(","):
        before += ","

    insertion = (
        "\n"
        + ",\n".join(make_item(v) for v in additions)
        + "\n    "
    )

    new_block = before + insertion + block[arr_end:]
    candidate = src[:start] + new_block + src[end:]

    verify = find_object(candidate, activity_id)

    if verify is None:
        print(f"⚠️ SKIP {activity_id}: final kontrol başarısız")
        continue

    vs, ve = verify
    final_block = candidate[vs:ve]

    final_hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        final_block
    )

    if len(final_hazards) != 9:
        print(f"⚠️ SKIP {activity_id}: final {len(final_hazards)} risk")
        continue

    texts[filename] = candidate
    added += 3

    print(f"✅ {activity_id}: 6 → 9")


for filename, src in texts.items():
    FILES[filename].write_text(src, encoding="utf-8")

print()
print("EKLENEN RISK:", added)
