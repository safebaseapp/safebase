from pathlib import Path
import re
import shutil
from datetime import datetime

FILE = Path("lib/risk-library/pack-05.ts")

DATA = {
    "surface-grinding": [
        (
            "Taşlama diskinden parçacık fırlaması",
            "Fragments ejected from grinding disc",
            "Göz veya yüz yaralanması",
            "Eye or facial injury",
            "Uygun disk, koruyucu muhafaza, gözlük ve yüz siperi kullan",
            "Use a suitable disc, guard, safety glasses and face shield"
        ),
        (
            "Taşlama sırasında kıvılcımların yanıcı malzemeye ulaşması",
            "Grinding sparks reaching combustible materials",
            "Yangın veya yanık",
            "Fire or burn injury",
            "Yanıcı malzemeleri uzaklaştır ve kıvılcım yönünü kontrol et",
            "Remove combustible materials and control the direction of sparks"
        ),
        (
            "Taşlama ekipmanında aşırı titreşim",
            "Excessive vibration from grinding equipment",
            "Kontrol kaybı veya el-kol yaralanması",
            "Loss of control or hand-arm injury",
            "Hasarlı veya dengesiz ekipmanı kullanma ve titreşimli ekipman maruziyetini sınırla",
            "Do not use damaged or unbalanced equipment and limit exposure to vibrating tools"
        ),
    ],

    "leak-repair": [
        (
            "Kaçağın basınç tamamen düşürülmeden onarılması",
            "Leak repair attempted before complete depressurization",
            "Basınçlı akışkanın ani boşalması sonucu ciddi yaralanma",
            "Serious injury from sudden release of pressurized fluid",
            "Onarım öncesi sistemi izole et, basıncı sıfırla ve sıfır enerji durumunu doğrula",
            "Isolate the system, depressurize it and verify zero-energy state before repair"
        ),
        (
            "Kaçak yapan kimyasalla doğrudan temas",
            "Direct contact with leaking chemical",
            "Kimyasal yanık, zehirlenme veya cilt maruziyeti",
            "Chemical burn, poisoning or skin exposure",
            "SDS bilgisine göre uygun kimyasal KKD ve müdahale yöntemini kullan",
            "Use chemical PPE and response methods appropriate to the SDS"
        ),
        (
            "Kaçak çevresinde kaygan zemin oluşması",
            "Slippery surface around leak location",
            "Kayma ve düşme sonucu yaralanma",
            "Slip-and-fall injury",
            "Alanı bariyerle, döküntüyü kontrol altına al ve zemini güvenli hale getir",
            "Barricade the area, contain the release and restore a safe walking surface"
        ),
    ],

    "general-maintenance": [
        (
            "Bakım sırasında beklenmeyen ekipman hareketi",
            "Unexpected equipment movement during maintenance",
            "Sıkışma, ezilme veya ciddi yaralanma",
            "Trapping, crushing or serious injury",
            "Bakım öncesi tüm enerji kaynaklarını izole et ve LOTO uygula",
            "Isolate all energy sources and apply LOTO before maintenance"
        ),
        (
            "Bakım alanında sökülen parçaların düzensiz bırakılması",
            "Removed components left unsecured in maintenance area",
            "Takılma, düşme veya parçaların personele çarpması",
            "Trip, fall or personnel being struck by components",
            "Sökülen parçalar için belirlenmiş güvenli depolama alanı kullan",
            "Use a designated safe storage area for removed components"
        ),
        (
            "Bakım sonrası koruyucuların yeniden takılmaması",
            "Machine guards not reinstalled after maintenance",
            "Hareketli parçalara temas sonucu ciddi yaralanma",
            "Serious injury from contact with moving parts",
            "Ekipmanı devreye almadan önce tüm koruyucuların doğru şekilde takıldığını doğrula",
            "Verify that all guards are correctly reinstalled before returning equipment to service"
        ),
    ],

    "valve-removal": [
        (
            "Vana sökümü sırasında hatta artık basınç bulunması",
            "Residual pressure present during valve removal",
            "Basınçlı akışkanın ani boşalması",
            "Sudden release of pressurized fluid",
            "Söküm öncesi hattı izole et, boşalt ve basıncın sıfır olduğunu doğrula",
            "Isolate and drain the line and verify zero pressure before removal"
        ),
        (
            "Ağır vananın söküm sırasında kontrolsüz hareket etmesi",
            "Uncontrolled movement of heavy valve during removal",
            "Ezilme, sıkışma veya düşen cisim yaralanması",
            "Crushing, trapping or dropped-object injury",
            "Vana ağırlığını doğrula ve söküm öncesi uygun kaldırma ekipmanıyla destekle",
            "Verify valve weight and support it with suitable lifting equipment before removal"
        ),
        (
            "Vana sökümünde tehlikeli proses kalıntısına maruz kalma",
            "Exposure to hazardous process residue during valve removal",
            "Kimyasal maruziyet, yanık veya solunum etkisi",
            "Chemical exposure, burn or respiratory effects",
            "Hattı uygun şekilde temizle ve proses maddesine göre gerekli KKD'yi kullan",
            "Properly clean the line and use PPE appropriate to the process substance"
        ),
    ],

    "pump-alignment": [
        (
            "Pompa alignment sırasında kaplin bölgesinde sıkışma",
            "Pinch point at coupling during pump alignment",
            "El veya parmak ezilmesi",
            "Hand or finger crushing injury",
            "Elleri kaplin ve hareketli parçaların sıkışma noktalarından uzak tut",
            "Keep hands clear of coupling and moving-component pinch points"
        ),
        (
            "Alignment sırasında pompanın beklenmedik çalışması",
            "Unexpected pump startup during alignment",
            "Hareketli parçalarla temas sonucu ciddi yaralanma",
            "Serious injury from contact with moving parts",
            "Alignment öncesi elektriksel ve mekanik enerji izolasyonunu doğrula",
            "Verify electrical and mechanical energy isolation before alignment"
        ),
        (
            "Alignment ekipmanının veya ölçüm aparatının gevşek sabitlenmesi",
            "Alignment equipment or measuring device inadequately secured",
            "Aparatın düşmesi, fırlaması veya yanlış ölçüm",
            "Dropped or ejected device or incorrect measurement",
            "Ölçüm aparatlarını üretici talimatına uygun ve güvenli şekilde sabitle",
            "Secure measuring devices safely in accordance with manufacturer instructions"
        ),
    ],
}


def find_object(src, activity_id):
    pos = src.find(f'id: "{activity_id}"')
    if pos == -1:
        raise RuntimeError(f"{activity_id}: BULUNAMADI")

    start = src.rfind("{", 0, pos)
    depth = 0
    inside = False
    escape = False

    for i in range(start, len(src)):
        c = src[i]

        if inside:
            if escape:
                escape = False
            elif c == "\\":
                escape = True
            elif c == '"':
                inside = False
            continue

        if c == '"':
            inside = True
        elif c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return start, i + 1

    raise RuntimeError(f"{activity_id}: OBJE KAPANIŞI BULUNAMADI")


def item(data):
    htr, hen, ctr, cen, atr, aen = data
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

# ÖN KONTROL
for activity_id, additions in DATA.items():
    s, e = find_object(text, activity_id)
    block = text[s:e]

    existing = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    print(f"{activity_id}: mevcut {len(existing)} risk")

    if len(existing) != 6:
        raise RuntimeError(
            f"{activity_id}: 6 RISK DEĞİL. HİÇBİR ŞEY YAZILMADI."
        )

    new_hazards = [x[0] for x in additions]

    duplicates = set(existing) & set(new_hazards)

    if duplicates:
        raise RuntimeError(
            f"{activity_id}: DUPLICATE {duplicates}. HİÇBİR ŞEY YAZILMADI."
        )

print("✅ 5 FAALİYETİN TAMAMI 6 RİSK — EKLEMEYE HAZIR")

# BACKUP
backup = FILE.with_name(
    FILE.name +
    ".backup-before-next5-" +
    datetime.now().strftime("%Y%m%d-%H%M%S")
)

shutil.copy2(FILE, backup)
print("BACKUP:", backup)

# EKLE
for activity_id, additions in DATA.items():
    s, e = find_object(text, activity_id)
    block = text[s:e]

    arr_end = block.rfind("]")

    if arr_end == -1:
        raise RuntimeError(f"{activity_id}: ITEMS ARRAY BULUNAMADI")

    before = block[:arr_end].rstrip()

    if not before.endswith(","):
        before += ","

    insertion = "\n" + ",\n".join(item(x) for x in additions) + "\n    "

    new_block = before + insertion + block[arr_end:]

    text = text[:s] + new_block + text[e:]

# YAZMADAN ÖNCE 9-RISK KONTROL
for activity_id in DATA:
    s, e = find_object(text, activity_id)
    block = text[s:e]

    hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    if len(hazards) != 9:
        raise RuntimeError(
            f"{activity_id}: FINAL {len(hazards)} RISK. DOSYA YAZILMADI."
        )

    if len(set(hazards)) != 9:
        raise RuntimeError(
            f"{activity_id}: DUPLICATE OLUŞTU. DOSYA YAZILMADI."
        )

FILE.write_text(text, encoding="utf-8")

print("🔥 5 × 3 BAŞARIYLA EKLENDİ")
