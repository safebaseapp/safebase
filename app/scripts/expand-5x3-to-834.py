from pathlib import Path
import re
import shutil
from datetime import datetime

FILE = Path("lib/risk-library/pack-05.ts")

DATA = {

"hand-power-tools": [
(
"El aletinde koruyucunun çıkarılması",
"Removal of hand-tool guard",
"Dönen veya kesici parçaya temas sonucu ciddi yaralanma",
"Serious injury from contact with rotating or cutting parts",
"Koruyucusu çıkarılmış veya hasarlı ekipmanın kullanılmasını engelle",
"Prevent use of equipment with removed or damaged guards"
),
(
"Elektrikli el aletinin ıslak ortamda kullanılması",
"Use of electric hand tool in wet conditions",
"Elektrik çarpması veya kısa devre",
"Electric shock or short circuit",
"Elektrikli el aletlerini kuru koşullarda ve uygun RCD koruması ile kullan",
"Use electric hand tools in dry conditions with suitable RCD protection"
),
(
"El aletinin kontrolsüz şekilde çalışma alanında bırakılması",
"Hand tool left unsecured in the work area",
"Takılma, düşme veya ekipmanın istemsiz çalışması",
"Trip, fall or unintended tool operation",
"Kullanılmayan el aletlerini enerjiden ayır ve güvenli şekilde depola",
"Disconnect unused tools from energy sources and store them safely"
),
],

"drilling": [
(
"Delme noktasında gizli tesisat bulunması",
"Concealed utility at drilling location",
"Elektrik çarpması, proses kaçağı veya tesisat hasarı",
"Electric shock, process release or utility damage",
"Delme öncesi çizim, dedektör veya uygun tarama yöntemiyle gizli tesisatları doğrula",
"Verify concealed utilities using drawings, detection equipment or suitable scanning before drilling"
),
(
"İş parçasının delme sırasında dönmesi",
"Workpiece rotating during drilling",
"El veya kol yaralanması",
"Hand or arm injury",
"İş parçasını mengene veya uygun mekanik sabitleme yöntemiyle tut",
"Secure the workpiece using a vice or suitable mechanical restraint"
),
(
"Delme sırasında aşırı toz oluşması",
"Excessive dust generation during drilling",
"Solunum maruziyeti veya görüş kaybı",
"Respiratory exposure or reduced visibility",
"Uygun lokal emiş, ıslak yöntem veya solunum koruması kullan",
"Use suitable local extraction, wet methods or respiratory protection"
),
],

"roofing": [
(
"Çatı kaplama malzemelerinin kenara yakın depolanması",
"Roofing materials stored near roof edge",
"Malzeme düşmesi veya çalışan dengesinin bozulması",
"Dropped material or loss of worker balance",
"Malzemeleri çatı kenarından güvenli mesafede ve sabit şekilde depola",
"Store materials securely at a safe distance from roof edges"
),
(
"Çatı kaplama sırasında açık penetrasyon bulunması",
"Open penetration during roofing work",
"Açıklıktan düşme sonucu ciddi yaralanma veya ölüm",
"Serious injury or fatality from falling through an opening",
"Açıklıkları dayanıklı kapak veya uygun korkuluk sistemiyle koru",
"Protect openings using secure covers or suitable guardrail systems"
),
(
"Çatı kaplama çalışmasında kuvvetli rüzgar",
"Strong wind during roofing work",
"Denge kaybı veya malzemenin savrulması",
"Loss of balance or materials becoming airborne",
"Rüzgar koşullarını takip et ve güvenli çalışma limiti aşıldığında işi durdur",
"Monitor wind conditions and stop work when safe operating limits are exceeded"
),
],

"temporary-platform": [
(
"Geçici platform taşıyıcı elemanının hasarlı olması",
"Damaged structural member of temporary platform",
"Platform çökmesi veya yüksekten düşme",
"Platform collapse or fall from height",
"Platform elemanlarını kullanım öncesi yetkin kişi tarafından kontrol ettir",
"Have platform components inspected by a competent person before use"
),
(
"Platform üzerinde malzeme birikmesi",
"Material accumulation on temporary platform",
"Takılma, düşme veya platformun aşırı yüklenmesi",
"Trip, fall or platform overloading",
"Platform üzerinde sadece iş için gerekli malzemeyi bulundur ve düzenli housekeeping yap",
"Keep only necessary materials on the platform and maintain good housekeeping"
),
(
"Geçici platform korkuluğunun yetersiz olması",
"Inadequate guardrail on temporary platform",
"Platformdan düşme",
"Fall from platform",
"Üst korkuluk, ara korkuluk ve gerekli yerlerde toe-board bütünlüğünü doğrula",
"Verify the integrity of top rails, mid rails and toe boards where required"
),
],

"suspended-basket": [
(
"Askılı sepet yük kapasitesinin aşılması",
"Suspended basket overloaded",
"Askı sisteminin arızalanması veya sepetin düşmesi",
"Suspension-system failure or basket fall",
"Personel, ekipman ve malzeme toplam yükünü sepet kapasitesi içinde tut",
"Keep the combined load of personnel, equipment and materials within basket capacity"
),
(
"Askılı sepet çalışma alanında enerji hattı bulunması",
"Overhead power line near suspended-basket operation",
"Elektrik çarpması veya ölüm",
"Electric shock or fatality",
"Sepetin tüm hareket güzergahında gerekli elektriksel yaklaşma mesafesini koru",
"Maintain required electrical clearance throughout the basket movement path"
),
(
"Askılı sepet bağlantılarının kullanım öncesi kontrol edilmemesi",
"Suspended-basket connections not inspected before use",
"Bağlantı arızası, sepet dengesizliği veya düşme",
"Connection failure, basket instability or fall",
"Askı noktaları, bağlantılar, halatlar ve güvenlik sistemlerini her kullanım öncesi kontrol et",
"Inspect suspension points, connections, ropes and safety systems before each use"
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

# Ön kontrol
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
    duplicates = set(existing) & set(new_titles)

    if duplicates:
        raise RuntimeError(
            f"{activity_id}: DUPLICATE {duplicates}. DOSYA YAZILMADI."
        )

    print(f"✅ {activity_id}: 6 → 9 hazır")


backup = FILE.with_name(
    FILE.name + ".backup-before-834-" +
    datetime.now().strftime("%Y%m%d-%H%M%S")
)

shutil.copy2(FILE, backup)

print("BACKUP:", backup)


# Bellekte ekle
for activity_id, additions in DATA.items():

    start, end = find_object(text, activity_id)
    block = text[start:end]

    arr_end = block.rfind("]")

    if arr_end < 0:
        raise RuntimeError(f"{activity_id}: items kapanışı bulunamadı")

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


# Final kontrol
for activity_id in DATA:

    start, end = find_object(text, activity_id)
    block = text[start:end]

    hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    if len(hazards) != 9:
        raise RuntimeError(
            f"{activity_id}: final {len(hazards)}, beklenen 9. DOSYA YAZILMADI."
        )


FILE.write_text(text, encoding="utf-8")

print()
print("🔥 5 FAALIYET × +3 TAMAMLANDI")
