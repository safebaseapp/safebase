from pathlib import Path
import re
import shutil
from datetime import datetime

FILE = Path("lib/risk-library/pack-04.ts")

DATA = {
"solvent-cleaning": [
(
"Solvent buharının yetersiz havalandırılan alanda birikmesi",
"Solvent vapour accumulating in a poorly ventilated area",
"Solunum yolu maruziyeti veya bilinç kaybı",
"Respiratory exposure or loss of consciousness",
"Yeterli havalandırma sağla ve gerekli durumlarda atmosfer ölçümü yap",
"Provide adequate ventilation and conduct atmospheric monitoring where required"
),
(
"Solventin sıcak yüzey veya ateşleme kaynağıyla temas etmesi",
"Solvent contacting a hot surface or ignition source",
"Yangın veya parlama",
"Fire or flash ignition",
"Ateşleme kaynaklarını uzaklaştır ve solventin güvenli kullanım şartlarını uygula",
"Remove ignition sources and follow safe solvent-handling requirements"
),
(
"Solventin uygunsuz kaba aktarılması",
"Solvent transferred into an unsuitable container",
"Dökülme, yanlış kullanım veya kimyasal maruziyet",
"Spill, misuse or chemical exposure",
"Uyumlu ve etiketli kap kullan ve kapları kullanım dışında kapalı tut",
"Use compatible labelled containers and keep them closed when not in use"
),
],

"leak-testing": [
(
"Kaçak testi sırasında bağlantı noktasına yakın durulması",
"Personnel standing close to a connection during leak testing",
"Bağlantı arızasında basınçlı akışkana maruz kalma",
"Exposure to pressurized fluid following connection failure",
"Test sırasında bağlantı noktaları çevresinde güvenli mesafe oluştur",
"Maintain a safe distance around connections during testing"
),
(
"Kaçak kontrolü için açık alev kullanılması",
"Open flame used for leak detection",
"Yangın, patlama veya yanık",
"Fire, explosion or burn injury",
"Kaçak tespiti için onaylı test yöntemi ve uygun dedektör kullan",
"Use an approved leak-detection method and suitable detector"
),
(
"Test sonrası sistem basıncının kontrollü boşaltılmaması",
"Test pressure not released in a controlled manner",
"Ani basınç boşalması veya hortum hareketi",
"Sudden pressure release or hose movement",
"Test sonrası basıncı belirlenmiş güvenli noktadan kontrollü olarak boşalt",
"Release test pressure in a controlled manner through the designated safe point"
),
],

"steam-blowing": [
(
"Steam blowing dışlama alanına yetkisiz giriş",
"Unauthorized entry into the steam-blowing exclusion zone",
"Yüksek sıcaklık, gürültü veya fırlayan parçacıklara maruziyet",
"Exposure to high temperature, noise or projected particles",
"Dışlama alanını fiziksel bariyer ve kontrollü giriş sistemiyle koru",
"Protect the exclusion zone with physical barricades and controlled access"
),
(
"Geçici borulama veya susturucu bağlantısının yetersiz sabitlenmesi",
"Inadequate securing of temporary piping or silencer",
"Ekipman hareketi veya bağlantı arızası",
"Equipment movement or connection failure",
"Steam blowing öncesi geçici sistemin destek ve bağlantılarını doğrula",
"Verify temporary-system supports and connections before steam blowing"
),
(
"Steam blowing sırasında aşırı gürültü maruziyeti",
"Excessive noise exposure during steam blowing",
"İşitme hasarı",
"Hearing damage",
"Gürültü bölgesini belirle ve gerekli işitme korumasını zorunlu tut",
"Define the noise zone and enforce required hearing protection"
),
],

"emergency-response": [
(
"Acil müdahale ekibinin güncel proses tehlikesi hakkında bilgi sahibi olmaması",
"Emergency team unaware of the current process hazard",
"Yanlış müdahale ve ek maruziyet",
"Incorrect response and additional exposure",
"Müdahale öncesi olay türü, kimyasal ve proses durumu hakkında briefing yap",
"Brief responders on the incident type, chemical and process status before intervention"
),
(
"Acil müdahale araçlarının erişim yolunun kapanması",
"Emergency-response vehicle access obstructed",
"Müdahalenin gecikmesi",
"Delayed emergency response",
"Acil araç güzergahlarını sürekli açık ve işaretli tut",
"Keep emergency-vehicle routes continuously clear and marked"
),
(
"Olay sırasında yetersiz saha iletişimi",
"Inadequate site communication during an emergency",
"Koordinasyon kaybı veya yanlış yönlendirme",
"Loss of coordination or incorrect instructions",
"Belirlenmiş acil durum iletişim kanalı ve komuta zincirini kullan",
"Use the designated emergency communication channel and command structure"
),
],

"lone-working": [
(
"Yalnız çalışanın planlanan check-in çağrısını yapmaması",
"Lone worker missing a scheduled check-in",
"Acil durumun geç fark edilmesi",
"Delayed recognition of an emergency",
"Check-in periyodu belirle ve cevapsız durumda escalation prosedürü uygula",
"Set check-in intervals and apply an escalation procedure for missed contact"
),
(
"Yalnız çalışma alanında iletişim sinyalinin yetersiz olması",
"Inadequate communication signal in a lone-working area",
"Acil yardım çağrısının yapılamaması",
"Inability to request emergency assistance",
"Çalışma öncesi iletişim kapsamasını doğrula ve alternatif haberleşme sağla",
"Verify communication coverage before work and provide an alternative communication method"
),
(
"Yüksek riskli işin tek kişi tarafından yapılması",
"High-risk task performed by a lone worker",
"Olay durumunda anında yardım sağlanamaması",
"No immediate assistance available following an incident",
"Yüksek riskli faaliyetlerde yalnız çalışmaya izin verme ve buddy sistemi uygula",
"Prohibit lone working for high-risk activities and implement a buddy system"
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


text = FILE.read_text(encoding="utf-8")

backup = FILE.with_name(
    FILE.name + ".backup-safe-batch-" +
    datetime.now().strftime("%Y%m%d-%H%M%S")
)
shutil.copy2(FILE, backup)

print("BACKUP:", backup)
print()

added = 0

for activity_id, additions in DATA.items():

    result = find_object(text, activity_id)

    if result is None:
        print(f"⚠️ SKIP {activity_id}: bulunamadı")
        continue

    start, end = result
    block = text[start:end]

    hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        block
    )

    print(f"{activity_id}: mevcut {len(hazards)} risk")

    if len(hazards) != 6:
        print(f"⚠️ SKIP {activity_id}: 6 risk değil")
        continue

    # mevcut bloğun kendi içinde duplicate kontrolü
    if len(hazards) != len(set(hazards)):
        print(f"⚠️ SKIP {activity_id}: mevcut duplicate var")
        continue

    new_hazards = [x[0] for x in additions]

    if set(hazards) & set(new_hazards):
        print(f"⚠️ SKIP {activity_id}: yeni risk duplicate")
        continue

    arr_end = block.rfind("]")

    if arr_end < 0:
        print(f"⚠️ SKIP {activity_id}: array kapanışı bulunamadı")
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

    # önce geçici metinde kontrol
    candidate = text[:start] + new_block + text[end:]

    new_result = find_object(candidate, activity_id)

    if new_result is None:
        print(f"⚠️ SKIP {activity_id}: final object kontrolü başarısız")
        continue

    ns, ne = new_result
    final_block = candidate[ns:ne]

    final_hazards = re.findall(
        r'hazard:\s*\{\s*tr:\s*"([^"]+)"',
        final_block
    )

    if len(final_hazards) != 9:
        print(
            f"⚠️ SKIP {activity_id}: final risk sayısı "
            f"{len(final_hazards)}"
        )
        continue

    if len(final_hazards) != len(set(final_hazards)):
        print(f"⚠️ SKIP {activity_id}: final duplicate")
        continue

    text = candidate
    added += 3

    print(f"✅ {activity_id}: 6 → 9")


FILE.write_text(text, encoding="utf-8")

print()
print("================================")
print("EKLENEN RISK:", added)
print("================================")
