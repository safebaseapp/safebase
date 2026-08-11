from pathlib import Path
import re
import shutil
from datetime import datetime

FILE = Path("lib/risk-library/pack-05.ts")

DATA = {

"surface-grinding": [
(
"Taşlama diskinin iş parçasına sıkışması",
"Grinding disc binding in the workpiece",
"Aletin geri tepmesi ve ciddi yaralanma",
"Tool kickback and serious injury",
"Uygun disk kullan, ekipmanı iki elle kontrol et ve aşırı baskı uygulama",
"Use the correct disc, maintain two-handed control and avoid excessive pressure"
),
(
"Taşlama kıvılcımlarının yanıcı malzemeye ulaşması",
"Grinding sparks reaching combustible material",
"Yangın veya yanık",
"Fire or burn injury",
"Yanıcı malzemeleri uzaklaştır ve kıvılcım yönünü güvenli alana yönlendir",
"Remove combustible materials and direct sparks toward a safe area"
),
(
"Taşlama sırasında aşırı titreşim",
"Excessive vibration during grinding",
"El-kol yaralanması veya ekipman kontrolünün kaybı",
"Hand-arm injury or loss of equipment control",
"Hasarlı veya dengesiz diskleri kullanma ve titreşim maruziyetini sınırla",
"Do not use damaged or unbalanced discs and limit vibration exposure"
),
],

"leak-repair": [
(
"Kaçak onarımına sistemde basınç varken başlanması",
"Leak repair started while system remains pressurized",
"Basınçlı akışkanın ani boşalması ve ciddi yaralanma",
"Sudden pressurized release and serious injury",
"Sistemi izole et, basıncı boşalt ve sıfır enerji durumunu doğrula",
"Isolate the system, depressurize it and verify zero-energy state"
),
(
"Kaçak yapan kimyasala doğrudan temas",
"Direct contact with leaking chemical",
"Kimyasal yanık, zehirlenme veya cilt maruziyeti",
"Chemical burn, poisoning or skin exposure",
"SDS'ye uygun kimyasal KKD ve müdahale ekipmanı kullan",
"Use chemical PPE and response equipment appropriate to the SDS"
),
(
"Kaçak çevresinde kaygan zemin oluşması",
"Slippery surface around leak location",
"Kayma ve düşme yaralanması",
"Slip-and-fall injury",
"Alanı bariyerle, döküntüyü kontrol altına al ve zemini temizle",
"Barricade the area, contain the release and clean the walking surface"
),
],

"valve-removal": [
(
"Vana sökümünde hatta artık basınç bulunması",
"Residual pressure in line during valve removal",
"Basınçlı akışkanın ani boşalması",
"Sudden release of pressurized fluid",
"Hattı izole et, drain et ve söküm öncesi sıfır basıncı doğrula",
"Isolate and drain the line and verify zero pressure before removal"
),
(
"Ağır vananın söküm sırasında kontrolsüz hareket etmesi",
"Uncontrolled movement of heavy valve during removal",
"Ezilme, sıkışma veya düşen cisim yaralanması",
"Crushing, entrapment or dropped-object injury",
"Son bağlantıyı sökmeden vanayı uygun kaldırma ekipmanı ile destekle",
"Support the valve with suitable lifting equipment before removing final connections"
),
(
"Vana içinde tehlikeli proses kalıntısı bulunması",
"Hazardous process residue remaining inside valve",
"Kimyasal veya termal maruziyet",
"Chemical or thermal exposure",
"Söküm öncesi hattın drain, flush ve izolasyon durumunu doğrula",
"Verify draining, flushing and isolation before valve removal"
),
],

"pump-alignment": [
(
"Kaplin bölgesinde el veya parmak sıkışması",
"Hand or finger entrapment at coupling",
"El veya parmak ezilmesi",
"Hand or finger crushing injury",
"Kaplinler arasında elle hizalama yapma ve uygun alignment ekipmanı kullan",
"Do not align couplings by hand and use suitable alignment equipment"
),
(
"Alignment sırasında pompanın beklenmedik çalışması",
"Unexpected pump startup during alignment",
"Hareketli parçalarla temas sonucu ciddi yaralanma",
"Serious injury from contact with moving parts",
"Alignment öncesi elektriksel ve mekanik izolasyonu doğrula",
"Verify electrical and mechanical isolation before alignment"
),
(
"Alignment ölçüm ekipmanının gevşek sabitlenmesi",
"Alignment measuring equipment inadequately secured",
"Aparatın düşmesi, fırlaması veya yanlış ölçüm",
"Dropped or ejected device or incorrect measurement",
"Ölçüm aparatlarını üretici talimatına uygun şekilde güvenli sabitle",
"Secure measuring devices in accordance with manufacturer instructions"
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

# PRECHECK
for activity_id, additions in DATA.items():

    start, end = find_object(text, activity_id)
    block = text[start:end]

    existing_tr = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    existing_en = re.findall(
        r'hazard:\s*\{\s*tr:\s*"[^"]+"\s*,\s*en:\s*"([^"]+)"',
        block
    )

    print(f"{activity_id}: mevcut {len(existing_tr)} risk")

    if len(existing_tr) != 6:
        raise RuntimeError(
            f"{activity_id}: 6 RISK DEĞİL. DOSYA YAZILMADI."
        )

    new_tr = [x[0] for x in additions]
    new_en = [x[1] for x in additions]

    dup_tr = set(existing_tr) & set(new_tr)
    dup_en = set(existing_en) & set(new_en)

    if dup_tr or dup_en:
        raise RuntimeError(
            f"{activity_id}: DUPLICATE TR={dup_tr} EN={dup_en}. DOSYA YAZILMADI."
        )

    print(f"✅ {activity_id}: 6 → 9 hazır")


backup = FILE.with_name(
    FILE.name + ".backup-before-849b-" +
    datetime.now().strftime("%Y%m%d-%H%M%S")
)
shutil.copy2(FILE, backup)

print("BACKUP:", backup)


# MODIFY IN MEMORY
for activity_id, additions in DATA.items():

    start, end = find_object(text, activity_id)
    block = text[start:end]

    arr_end = block.rfind("]")

    if arr_end < 0:
        raise RuntimeError(
            f"{activity_id}: ITEMS KAPANIŞI BULUNAMADI"
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


# FINAL CHECK
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

    if len(hazards) != len(set(hazards)):
        raise RuntimeError(
            f"{activity_id}: FINAL DUPLICATE. DOSYA YAZILMADI."
        )


FILE.write_text(text, encoding="utf-8")

print()
print("🔥 5 × 3 BAŞARIYLA EKLENDİ")
