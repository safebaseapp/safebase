from pathlib import Path
import re
import shutil
from datetime import datetime

FILE = Path("lib/risk-library/pack-04.ts")

DATA = {
    "roof-maintenance": [
        ("Çatı üzerinde kırılgan yüzeye basılması", "Stepping onto fragile roof surface"),
        ("Çatı drenaj bölgesinde kaygan yüzey", "Slippery surface near roof drainage"),
        ("Bakım malzemelerinin çatı kenarına yakın bırakılması", "Maintenance materials stored near roof edge"),
    ],
    "mewp-inspection": [
        ("Platform kontrol kutusunda hasar", "Damage to platform control console"),
        ("MEWP acil stop butonunun çalışmaması", "MEWP emergency-stop failure"),
        ("MEWP yapısında çatlak veya deformasyon", "Crack or deformation in MEWP structure"),
    ],
    "mobile-equipment-inspection": [
        ("Emniyet kemerinin hasarlı olması", "Damaged operator seat belt"),
        ("Korna veya uyarı ışığının çalışmaması", "Horn or warning beacon failure"),
        ("Direksiyon sisteminde anormallik", "Steering-system abnormality"),
    ],
    "excavator-operation": [
        ("Ekskavatör swing alanında personel bulunması", "Personnel inside excavator swing radius"),
        ("Bucket ile kaldırılan uygunsuz yük", "Improper load lifted with excavator bucket"),
        ("Kazı sırasında zemin çökmesi", "Ground failure during excavation operation"),
    ],
    "loader-operation": [
        ("Loader ile yüksek hızda dönüş yapılması", "High-speed turning with loader"),
        ("Loader bucketının aşırı doldurulması", "Loader bucket overloaded"),
        ("Loader ile geri manevrada kör nokta", "Blind spot during loader reversing"),
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

def make_item(tr, en):
    return f'''      {{
        hazard: {{ tr: "{tr}", en: "{en}" }},
        consequence: {{ tr: "Ciddi yaralanma veya ekipman hasarı", en: "Serious injury or equipment damage" }},
        personsAtRisk: {{ tr: "Çalışanlar ve yakın saha personeli", en: "Workers and nearby site personnel" }},
        existingControls: {{ tr: "Yetkili personel, iş öncesi kontrol ve saha prosedürleri", en: "Authorized personnel, pre-work checks and site procedures" }},
        additionalControls: {{ tr: "Faaliyete özel ek kontrol önlemlerini uygulayın", en: "Apply task-specific additional control measures" }},
      }}'''

text = FILE.read_text(encoding="utf-8")

# PRECHECK
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

# BACKUP
backup = FILE.with_name(
    FILE.name + ".backup-before-test5-" + datetime.now().strftime("%Y%m%d-%H%M%S")
)
shutil.copy2(FILE, backup)
print("BACKUP:", backup)

# MODIFY
for activity_id, additions in DATA.items():
    start, end = find_object(text, activity_id)
    block = text[start:end]

    arr_end = block.rfind("]")
    if arr_end < 0:
        raise RuntimeError(f"{activity_id}: items kapanışı bulunamadı")

    before = block[:arr_end].rstrip()

    if not before.endswith(","):
        before += ","

    insertion = "\n" + ",\n".join(
        make_item(tr, en) for tr, en in additions
    ) + "\n    "

    new_block = before + insertion + block[arr_end:]
    text = text[:start] + new_block + text[end:]

# FINAL CHECK BEFORE WRITE
for activity_id in DATA:
    start, end = find_object(text, activity_id)
    block = text[start:end]
    count = len(re.findall(r'hazard:\s*\{\s*tr:', block))

    if count != 9:
        raise RuntimeError(
            f"{activity_id}: final {count}, beklenen 9. DOSYA YAZILMADI."
        )

FILE.write_text(text, encoding="utf-8")
print("✅ 5 faaliyet × +3 risk eklendi")
