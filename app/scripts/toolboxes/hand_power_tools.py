"""SERNEM Hand and Power Tools Toolbox Talk content."""

HAND_POWER_TOOLS = {
    "base": "hand-power-tools-toolbox-talk",

    "tr": {
        "title": "EL ALETLERİ VE ELEKTRİKLİ EL ALETLERİ TOOLBOX TALK",
        "subtitle": "Kesilme, sıkışma, elektrik çarpması ve fırlayan parça risklerini kontrol edin.",
        "application_subtitle": "Tehlikeler, doğru kullanım ve günlük iş öncesi doğrulama.",
        "duration": "8–10 DAKİKA",

        "objective_title": "AMAÇ",
        "objective": (
            "El aletleri ve elektrikli el aletlerinin seçimi, kontrolü ve kullanımı sırasında oluşabilecek "
            "kesilme, ezilme, sıkışma, elektrik çarpması, disk veya uç kırılması ve fırlayan parça risklerini "
            "değerlendirmek; işe başlamadan önce ekipman, koruyucu ve KKD kontrollerini doğrulamaktır."
        ),

        "explanation_title": "KONU ANLATIMI",
        "explanation": [
            (
                "Her alet yalnızca tasarlandığı iş için kullanılmalıdır. Tornavidayı keski, anahtarı çekiç "
                "veya uygun olmayan diski taşlama makinesinde kullanmak kontrol kaybına ve ekipman arızasına neden olabilir."
            ),
            (
                "Elektrikli el aletlerinde kablo, fiş, gövde, tetik, koruyucu ve aksesuarlar kullanım öncesi "
                "kontrol edilmelidir. Hasarlı ekipman kullanılmamalı, işaretlenmeli ve karantinaya alınmalıdır."
            ),
            (
                "Disk, uç veya aksesuar değişimi öncesinde enerji tamamen kesilmelidir. Koruyucular sökülmemeli, "
                "aksesuarın çapı ve maksimum devri makineyle uyumlu olmalıdır."
            ),
        ],

        "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
        "scenario": [
            (
                "Bir çalışan taşlama makinesinde uygun olmayan çapta ve düşük devir kapasiteli bir disk kullandı. "
                "Koruyucu da çalışmayı kolaylaştırmak amacıyla çıkarılmıştı."
            ),
            (
                "Makine çalışırken disk parçalandı ve yüksek hızla fırlayan parçalar çalışanın yüzüne ve yakındaki "
                "bir personele yöneldi."
            ),
            (
                "Olay; doğru disk seçimi, maksimum devir kontrolü, koruyucunun yerinde tutulması, yüz siperi kullanımı "
                "ve işe başlamadan önce ekipman kontrolüyle tamamen önlenebilirdi."
            ),
        ],

        "remember_title": "UNUTMAYIN",
        "remember": (
            "Hasarlı, koruyucusuz veya uygunsuz aksesuar takılmış bir aleti kullanmayın. İşi durdurun ve ekipmanı karantinaya alın."
        ),

        "hazards_title": "TEMEL TEHLİKELER",
        "hazards": [
            "Hasarlı kablo, fiş, gövde veya tetik.",
            "Koruyucusu çıkarılmış veya değiştirilmiş ekipman.",
            "Uygun olmayan disk, uç veya aksesuar kullanımı.",
            "Disk veya aksesuar maksimum devrinin aşılması.",
            "Kesilme, ezilme, sıkışma ve geri tepme.",
            "Elektrik çarpması ve kısa devre.",
            "Fırlayan parça, kıvılcım ve toz maruziyeti.",
            "Kablo ve hortumların geçiş yollarında bırakılması.",
        ],

        "controls_title": "KONTROL ÖNLEMLERİ",
        "controls": [
            "Aleti ve aksesuarlarını kullanımdan önce kontrol edin.",
            "Yalnızca işe uygun ve onaylı ekipman kullanın.",
            "Koruyucuları yerinde ve çalışır durumda tutun.",
            "Disk çapı ve maksimum devir uyumunu doğrulayın.",
            "Uç veya disk değişiminden önce enerjiyi kesin.",
            "İşi sabitleyin ve doğru çalışma pozisyonunu koruyun.",
            "Kablo ve hortumları güvenli güzergâhlardan geçirin.",
            "Uygun gözlük, yüz siperi, eldiven ve işitme koruması kullanın.",
            "Hasarlı ekipmanı karantinaya alın ve bildirin.",
            "Yetkisiz tamir veya değişiklik yapmayın.",
        ],

        "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
        "supervisor_script": (
            "Arkadaşlar, bugün kullanacağımız bütün el aletlerini ve elektrikli ekipmanları işe başlamadan "
            "kontrol edeceğiz. Koruyucusu olmayan, kablosu hasarlı veya uygunsuz aksesuar takılmış ekipmanı "
            "kullanmayacağız. Disk ve uç değişiminde enerjiyi keseceğiz. İş parçasını sabitleyecek, doğru KKD'yi "
            "kullanacak ve hasarlı ekipmanı hemen karantinaya alacağız."
        ),

        "questions_title": "EKİBE SORULACAK SORULAR",
        "questions": [
            "Kullanılacak alet ve aksesuarlar kontrol edildi mi?",
            "Koruyucular yerinde ve çalışır durumda mı?",
            "Disk veya ucun kapasitesi makineyle uyumlu mu?",
            "Enerji kesmeden aksesuar değiştirilecek mi?",
            "Kablo ve hortumlar güvenli şekilde yönlendirildi mi?",
            "Hasarlı ekipman görülürse ne yapılacak?",
        ],

        "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
        "verification": [
            "Alet sağlam",
            "Kablo ve fiş sağlam",
            "Koruyucu yerinde",
            "Aksesuar uygun",
            "Devir uyumu doğrulandı",
            "İş parçası sabit",
            "Kablo güzergâhı güvenli",
            "KKD uygun",
            "Alan bariyerli",
            "Hasarlı ekipman ayrıldı",
        ],

        "attendance_title": "KATILIM VE ONAY",
        "fields": ["Proje / Saha", "Tarih", "Konuşmayı yapan", "Çalışma alanı"],
        "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
        "notes_title": "Süpervizör notları / ek saha talimatları",
        "footer": (
            "SERNEM HSE Resource — Üretici talimatları, ekipman kontrolleri ve "
            "saha prosedürleri önceliklidir."
        ),
    },

    "en": {
        "title": "HAND AND POWER TOOLS TOOLBOX TALK",
        "subtitle": "Control cutting, crushing, electric-shock and flying-particle hazards.",
        "application_subtitle": "Hazards, correct use and daily pre-work verification.",
        "duration": "8–10 MINUTES",

        "objective_title": "OBJECTIVE",
        "objective": (
            "Review cutting, crushing, entanglement, electric-shock, accessory failure and flying-particle "
            "hazards during the selection, inspection and use of hand and power tools, and verify equipment, "
            "guarding and PPE controls before work begins."
        ),

        "explanation_title": "TOPIC EXPLANATION",
        "explanation": [
            (
                "Every tool must be used only for its intended purpose. Using a screwdriver as a chisel, a wrench "
                "as a hammer or an unsuitable disc on a grinder can lead to loss of control and equipment failure."
            ),
            (
                "Power tools must be inspected before use, including cables, plugs, housings, triggers, guards "
                "and accessories. Damaged equipment must be removed from service, tagged and quarantined."
            ),
            (
                "Power must be isolated before changing discs, bits or accessories. Guards must not be removed, "
                "and accessory size and maximum speed must be compatible with the tool."
            ),
        ],

        "scenario_title": "REALISTIC SITE SCENARIO",
        "scenario": [
            (
                "A worker fitted an oversized grinding disc with an insufficient speed rating. The guard had also "
                "been removed to make the task easier."
            ),
            (
                "The disc shattered during operation, sending high-speed fragments toward the worker and another "
                "person nearby."
            ),
            (
                "The incident could have been prevented through correct disc selection, speed verification, use of "
                "the guard, face protection and a pre-use inspection."
            ),
        ],

        "remember_title": "REMEMBER",
        "remember": (
            "Do not use damaged, unguarded equipment or tools fitted with unsuitable accessories. Stop work and quarantine the tool."
        ),

        "hazards_title": "KEY HAZARDS",
        "hazards": [
            "Damaged cables, plugs, housings or triggers.",
            "Removed or modified guards.",
            "Incorrect discs, bits or accessories.",
            "Accessory speed rating lower than tool speed.",
            "Cuts, crushing, entanglement and kickback.",
            "Electric shock and short circuits.",
            "Flying particles, sparks and dust exposure.",
            "Cables and hoses creating trip or damage hazards.",
        ],

        "controls_title": "CONTROL MEASURES",
        "controls": [
            "Inspect the tool and accessories before use.",
            "Use only approved equipment suitable for the task.",
            "Keep guards fitted and functional.",
            "Verify disc size and maximum speed compatibility.",
            "Isolate power before changing accessories.",
            "Secure the workpiece and maintain a stable position.",
            "Route cables and hoses safely.",
            "Use suitable eye, face, hand and hearing protection.",
            "Quarantine and report damaged equipment.",
            "Do not complete unauthorised repairs or modifications.",
        ],

        "supervisor_title": "SUPERVISOR TALKING SCRIPT",
        "supervisor_script": (
            "Team, before starting today, we will inspect every hand tool and power tool. We will not use equipment "
            "with damaged cables, missing guards or unsuitable accessories. Power will be isolated before changing "
            "discs or bits. We will secure the workpiece, use the correct PPE and quarantine damaged tools immediately."
        ),

        "questions_title": "DISCUSSION QUESTIONS",
        "questions": [
            "Have the tools and accessories been inspected?",
            "Are all guards fitted and functional?",
            "Is the disc or bit compatible with the tool?",
            "Will power be isolated before changing accessories?",
            "Are cables and hoses routed safely?",
            "What action will be taken if damaged equipment is found?",
        ],

        "verification_title": "VERIFY BEFORE STARTING TODAY",
        "verification": [
            "Tool intact",
            "Cable and plug intact",
            "Guard fitted",
            "Accessory suitable",
            "Speed compatibility verified",
            "Workpiece secured",
            "Cable route safe",
            "PPE suitable",
            "Area controlled",
            "Damaged tools removed",
        ],

        "attendance_title": "ATTENDANCE AND APPROVAL",
        "fields": ["Project / Site", "Date", "Presented by", "Work area"],
        "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
        "notes_title": "Supervisor notes / additional site instructions",
        "footer": (
            "SERNEM HSE Resource — Manufacturer instructions, equipment inspection requirements and "
            "site procedures take priority."
        ),
    },
}
