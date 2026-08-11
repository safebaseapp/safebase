from pathlib import Path
import re
import shutil
from datetime import datetime

FILE = Path("lib/risk-library/pack-05.ts")

DATA = {

"open-edge-work": [
(
"Çalışma alanındaki açık kenarın yetersiz korunması",
"Inadequately protected open edge",
"Açık kenardan düşme sonucu ciddi yaralanma veya ölüm",
"Serious injury or fatality from falling over an open edge",
"Açık kenarlarda uygun korkuluk sistemi veya eşdeğer toplu koruma sağla",
"Provide a suitable guardrail system or equivalent collective protection at open edges"
),
(
"Açık kenar yakınında malzeme veya alet bırakılması",
"Tools or materials left near an open edge",
"Malzeme veya aletlerin alt seviyeye düşerek personele çarpması",
"Tools or materials falling to a lower level and striking personnel",
"Alet ve malzemeleri kenardan uzak tut, sabitle ve alt bölgeyi gerektiğinde bariyerle",
"Keep tools and materials away from the edge, secure them and barricade the area below where required"
),
(
"Açık kenara kontrolsüz yaklaşılması",
"Uncontrolled access to an open edge",
"Çalışanın dengesini kaybederek yüksekten düşmesi",
"Worker losing balance and falling from height",
"Açık kenara erişimi sınırla ve gerekli durumlarda uygun düşüş durdurma sistemi kullan",
"Restrict access to the open edge and use a suitable fall-arrest system where required"
),
],

"mechanical-material-handling": [
(
"Taşınan yükün ekipmandan kayması",
"Load slipping from mechanical handling equipment",
"Yükün düşmesi veya personele çarpması",
"Dropped load or personnel being struck",
"Yükün şekline ve ağırlığına uygun taşıma ekipmanı kullan ve yükü hareket öncesi emniyete al",
"Use handling equipment suitable for the load shape and weight and secure the load before movement"
),
(
"Mekanik taşıma ekipmanının kapasitesinin aşılması",
"Mechanical handling equipment overloaded",
"Ekipman arızası, devrilme veya yükün düşmesi",
"Equipment failure, overturning or dropped load",
"Ekipmanın güvenli çalışma kapasitesini doğrula ve kapasiteyi aşma",
"Verify the safe working capacity of the equipment and do not exceed it"
),
(
"Yük hareket alanına personel girmesi",
"Personnel entering the load movement area",
"Hareketli yük ile sıkışma veya çarpma",
"Crushing or struck-by injury from the moving load",
"Yük hareket güzergahını bariyerle ve personeli tehlike bölgesinden uzak tut",
"Barricade the load travel path and keep personnel outside the danger zone"
),
],

"pipe-handling": [
(
"Borunun kontrolsüz yuvarlanması",
"Uncontrolled rolling of pipe",
"Çarpma, sıkışma veya ezilme yaralanması",
"Struck-by, trapping or crushing injury",
"Boruları takoz veya uygun mekanik yöntemle yuvarlanmaya karşı sabitle",
"Secure pipes against rolling using chocks or a suitable mechanical method"
),
(
"Borunun kaldırma sırasında dengesiz hale gelmesi",
"Pipe becoming unstable during lifting",
"Borunun salınım yapması veya düşmesi",
"Pipe swinging or falling",
"Borunun ağırlık merkezini değerlendir ve uygun kaldırma noktaları ile sapan düzeni kullan",
"Assess the pipe centre of gravity and use suitable lifting points and sling configuration"
),
(
"Borular arasında el veya parmak sıkışması",
"Hands or fingers trapped between pipes",
"El veya parmaklarda ezilme yaralanması",
"Crushing injury to hands or fingers",
"Boruları elle yönlendirmek yerine uygun yardımcı ekipman kullan ve elleri sıkışma noktalarından uzak tut",
"Use suitable handling aids instead of manually positioning pipes and keep hands clear of pinch points"
),
],

"fuel-storage": [
(
"Yakıt depolama alanında tutuşturucu kaynak bulunması",
"Ignition source within fuel storage area",
"Yangın veya patlama",
"Fire or explosion",
"Sigara, açık alev, sıcak çalışma ve diğer tutuşturucu kaynakları yakıt depolama alanından uzak tut",
"Keep smoking, open flames, hot work and other ignition sources away from the fuel storage area"
),
(
"Yakıt kabının veya tankının sızdırması",
"Fuel container or tank leaking",
"Yanıcı sıvı yayılması, yangın veya çevresel kirlilik",
"Flammable liquid release, fire or environmental contamination",
"Kapları düzenli kontrol et ve uygun ikincil sızdırmazlık veya bund sistemi sağla",
"Inspect containers routinely and provide suitable secondary containment or bunding"
),
(
"Yakıt depolama alanında yetersiz havalandırma",
"Inadequate ventilation in fuel storage area",
"Yanıcı buhar birikmesi ve tutuşma riski",
"Accumulation and ignition of flammable vapours",
"Yanıcı buharların birikmesini önleyecek yeterli doğal veya mekanik havalandırma sağla",
"Provide adequate natural or mechanical ventilation to prevent accumulation of flammable vapours"
),
],

"chemical-storage": [
(
"Kimyasal kapların etiketsiz veya yanlış etiketli olması",
"Unlabelled or incorrectly labelled chemical containers",
"Yanlış kimyasal kullanımı veya tehlikeli maruziyet",
"Incorrect chemical use or hazardous exposure",
"Tüm kimyasal kaplarda okunabilir ve doğru tehlike etiketlerinin bulunmasını sağla",
"Ensure all chemical containers have legible and correct hazard labels"
),
(
"Uyumsuz kimyasalların birlikte depolanması",
"Incompatible chemicals stored together",
"Tehlikeli reaksiyon, yangın veya toksik gaz oluşumu",
"Hazardous reaction, fire or toxic gas generation",
"Kimyasalları SDS ve uyumluluk bilgilerine göre ayırarak depola",
"Segregate chemicals according to SDS information and chemical compatibility"
),
(
"Kimyasal depolama alanında yetersiz dökülme kontrolü",
"Inadequate spill containment in chemical storage area",
"Kimyasal yayılması, personel maruziyeti veya çevresel kirlilik",
"Chemical release, personnel exposure or environmental contamination",
"Uygun ikincil sızdırmazlık ve kimyasala uygun dökülme müdahale ekipmanı bulundur",
"Provide suitable secondary containment and chemical-compatible spill-response equipment"
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

# Önce 5 faaliyetin gerçekten 6 risk olduğunu doğrula.
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

    if len(existing_tr) != 6:
        raise RuntimeError(
            f"{activity_id}: 6 risk bekleniyordu, {len(existing_tr)} bulundu. DOSYA YAZILMADI."
        )

    new_tr = [x[0] for x in additions]
    new_en = [x[1] for x in additions]

    dup_tr = set(existing_tr) & set(new_tr)
    dup_en = set(existing_en) & set(new_en)

    if dup_tr or dup_en:
        raise RuntimeError(
            f"{activity_id}: DUPLICATE bulundu. TR={dup_tr} EN={dup_en}. DOSYA YAZILMADI."
        )

    print(f"✅ {activity_id}: 6 → 9 hazır")


backup = FILE.with_name(
    FILE.name + ".backup-before-849-" +
    datetime.now().strftime("%Y%m%d-%H%M%S")
)

shutil.copy2(FILE, backup)
print("BACKUP:", backup)


# Ekleme
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


# Yazmadan önce final kontrol
for activity_id in DATA:

    start, end = find_object(text, activity_id)
    block = text[start:end]

    hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    if len(hazards) != 9:
        raise RuntimeError(
            f"{activity_id}: final risk={len(hazards)}, beklenen 9. DOSYA YAZILMADI."
        )

    if len(hazards) != len(set(hazards)):
        raise RuntimeError(
            f"{activity_id}: final duplicate bulundu. DOSYA YAZILMADI."
        )


FILE.write_text(text, encoding="utf-8")

print()
print("🔥 5 FAALIYET × +3 EKLENDİ")
