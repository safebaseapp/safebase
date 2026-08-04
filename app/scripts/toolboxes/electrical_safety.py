"""SafeBase Electrical Safety Toolbox Talk content."""

ELECTRICAL_SAFETY = {
    "base": "electrical-safety-toolbox-talk",

    "tr": {
        "title": "ELEKTRİK GÜVENLİĞİ TOOLBOX TALK",
        "subtitle": "Elektrik çarpması, ark parlaması ve yangın risklerini kontrol edin.",
        "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
        "duration": "8–10 DAKİKA",

        "objective_title": "AMAÇ",
        "objective": (
            "Elektrikli ekipman, geçici enerji dağıtımı, kablo, priz, pano ve enerji kaynaklarından "
            "kaynaklanan elektrik çarpması, ark parlaması, yanık, yangın ve beklenmeyen enerjilenme "
            "risklerini değerlendirmek ve işe başlamadan önce gerekli kontrolleri doğrulamaktır."
        ),

        "explanation_title": "KONU ANLATIMI",
        "explanation": [
            (
                "Elektrik görünmez bir tehlikedir. Hasarlı bir kablo, gevşek bağlantı, açık pano, "
                "uygunsuz topraklama veya ıslak ortam çalışanı ölümcül elektrik akımına maruz bırakabilir."
            ),
            (
                "Elektrikli ekipman yalnızca yetkili kişiler tarafından kurulmalı, onarılmalı ve "
                "müdahale edilmelidir. Koruyucu kapakların açılması, sigortaların değiştirilmesi veya "
                "enerjili devre üzerinde kontrol yapılması yetkisiz personel tarafından yapılmamalıdır."
            ),
            (
                "Enerjisiz çalışma esas olmalıdır. Müdahale öncesinde enerji kesilmeli, LOTO uygulanmalı, "
                "gerilim yokluğu uygun test cihazıyla doğrulanmalı ve yeniden enerjilenme önlenmelidir."
            ),
        ],

        "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
        "scenario": [
            (
                "Bir çalışan taşınabilir elektrikli el aletini kullanmadan önce kabloyu kontrol etmedi. "
                "Kablonun dış izolasyonu kesilmiş ve iletken kısmı görünür hale gelmişti."
            ),
            (
                "Ekipman nemli bir alanda kullanılırken çalışan hasarlı bölüme temas etti ve elektrik "
                "çarpmasına maruz kaldı. Devrede uygun kaçak akım koruması da bulunmuyordu."
            ),
            (
                "Olay; kullanım öncesi kontrol, hasarlı ekipmanın karantinaya alınması, uygun RCD/GFCI "
                "koruması ve kuru çalışma koşullarıyla tamamen önlenebilirdi."
            ),
        ],

        "remember_title": "UNUTMAYIN",
        "remember": (
            "Elektrikli ekipmanda hasar, açık iletken, yanık kokusu veya anormal ısınma görürseniz "
            "kullanmayın. Enerjiyi kesin, ekipmanı etiketleyin ve yetkili kişiye bildirin."
        ),

        "hazards_title": "TEMEL TEHLİKELER",
        "hazards": [
            "Hasarlı kablo, fiş, priz veya ekipman gövdesi.",
            "Açık veya kilitsiz elektrik panoları.",
            "Islak ortamda uygunsuz elektrikli ekipman kullanımı.",
            "Uygunsuz topraklama veya kaçak akım koruması eksikliği.",
            "Aşırı yüklenmiş uzatma kabloları ve çoklu prizler.",
            "Enerjili devrelerde yetkisiz çalışma.",
            "Ark parlaması, kısa devre ve sıcak yüzeyler.",
            "Kabloların geçiş yollarında hasar görmesi veya takılma riski.",
        ],

        "controls_title": "KONTROL ÖNLEMLERİ",
        "controls": [
            "Ekipmanı, kabloyu, fişi ve prizi kullanımdan önce kontrol edin.",
            "Hasarlı ekipmanı kullanımdan kaldırın ve karantinaya alın.",
            "Uygun topraklama ve kaçak akım korumasını doğrulayın.",
            "Elektrik panolarını kapalı, kilitli ve erişilebilir tutun.",
            "Kabloları su, keskin kenar ve araç yollarından koruyun.",
            "Uzatma kablolarını aşırı yüklemeyin veya seri bağlamayın.",
            "Enerjisiz çalışma ve LOTO uygulamasını önceliklendirin.",
            "Gerilim yokluğunu uygun test cihazıyla doğrulayın.",
            "Yalnızca yetkili elektrik personelinin müdahale etmesini sağlayın.",
            "Yangın veya elektrik arızasında enerjiyi güvenli şekilde kesin.",
        ],

        "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
        "supervisor_script": (
            "Arkadaşlar, bugün kullanacağımız kablo, priz ve elektrikli ekipmanları işe başlamadan "
            "kontrol edeceğiz. Hasarlı, ıslak, açık iletkenli veya anormal ısınan hiçbir ekipmanı "
            "kullanmayacağız. Elektrik panolarına yalnızca yetkili personel müdahale edecek. Müdahale "
            "öncesinde enerji kesilecek, LOTO uygulanacak ve gerilim yokluğu doğrulanacak."
        ),

        "questions_title": "EKİBE SORULACAK SORULAR",
        "questions": [
            "Kullanılacak kablo ve ekipmanlar kontrol edildi mi?",
            "Kaçak akım koruması ve topraklama uygun mu?",
            "Kablolar su, keskin kenar ve araçlardan korunuyor mu?",
            "Elektrik panoları kapalı ve kilitli mi?",
            "Hasarlı ekipman görülürse ne yapılacak?",
            "Enerji izolasyonunu ve testini kim yapacak?",
        ],

        "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
        "verification": [
            "Kablolar sağlam",
            "Fişler sağlam",
            "Prizler uygun",
            "Topraklama mevcut",
            "RCD/GFCI koruması aktif",
            "Panolar kapalı",
            "Alan kuru",
            "Kablolar korumalı",
            "LOTO hazır",
            "Yetkili personel belli",
        ],

        "attendance_title": "KATILIM VE ONAY",
        "fields": ["Proje / Saha", "Tarih", "Konuşmayı yapan", "Çalışma alanı"],
        "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
        "notes_title": "Süpervizör notları / ek saha talimatları",
        "footer": (
            "SafeBase HSE Resource — Elektrik izolasyonu, LOTO ve "
            "saha elektrik prosedürleri önceliklidir."
        ),
    },

    "en": {
        "title": "ELECTRICAL SAFETY TOOLBOX TALK",
        "subtitle": "Control electric shock, arc-flash and fire hazards.",
        "application_subtitle": "Hazards, control measures and daily pre-work verification.",
        "duration": "8–10 MINUTES",

        "objective_title": "OBJECTIVE",
        "objective": (
            "Review electric-shock, arc-flash, burn, fire and unexpected-energisation hazards "
            "associated with electrical equipment, temporary power, cables, sockets, panels and "
            "energy sources, and verify the required controls before work begins."
        ),

        "explanation_title": "TOPIC EXPLANATION",
        "explanation": [
            (
                "Electricity is an invisible hazard. A damaged cable, loose connection, open panel, "
                "poor earthing or wet environment can expose a worker to a fatal electric current."
            ),
            (
                "Electrical equipment must only be installed, repaired or opened by authorised personnel. "
                "Unauthorised workers must not remove covers, replace protective devices or work on "
                "energised circuits."
            ),
            (
                "De-energised work must be the normal approach. Before intervention, power must be isolated, "
                "LOTO applied, absence of voltage verified with a suitable tester and re-energisation prevented."
            ),
        ],

        "scenario_title": "REALISTIC SITE SCENARIO",
        "scenario": [
            (
                "A worker used a portable electric tool without inspecting the supply cable. The outer "
                "insulation had been cut and the conductor was exposed."
            ),
            (
                "The tool was used in a damp area and the worker contacted the damaged section, receiving "
                "an electric shock. Suitable residual-current protection was not installed."
            ),
            (
                "The incident could have been prevented through pre-use inspection, quarantine of damaged "
                "equipment, suitable RCD/GFCI protection and dry working conditions."
            ),
        ],

        "remember_title": "REMEMBER",
        "remember": (
            "Do not use electrical equipment showing damage, exposed conductors, burning smell or abnormal "
            "heat. Isolate the supply, tag the equipment and report it to an authorised person."
        ),

        "hazards_title": "KEY HAZARDS",
        "hazards": [
            "Damaged cables, plugs, sockets or equipment enclosures.",
            "Open or unlocked electrical panels.",
            "Unsuitable equipment used in wet conditions.",
            "Poor earthing or missing residual-current protection.",
            "Overloaded extension leads and multiple adapters.",
            "Unauthorised work on energised circuits.",
            "Arc flash, short circuits and hot surfaces.",
            "Cables damaged in access routes or creating trip hazards.",
        ],

        "controls_title": "CONTROL MEASURES",
        "controls": [
            "Inspect equipment, cables, plugs and sockets before use.",
            "Remove damaged equipment from service and quarantine it.",
            "Verify suitable earthing and residual-current protection.",
            "Keep electrical panels closed, locked and accessible.",
            "Protect cables from water, sharp edges and vehicle routes.",
            "Do not overload or daisy-chain extension leads.",
            "Prioritise de-energised work and apply LOTO.",
            "Verify absence of voltage with a suitable tester.",
            "Allow only authorised electrical personnel to intervene.",
            "Safely isolate power during electrical faults or fires.",
        ],

        "supervisor_title": "SUPERVISOR TALKING SCRIPT",
        "supervisor_script": (
            "Team, before starting today, we will inspect all cables, sockets and electrical equipment. "
            "We will not use anything damaged, wet, showing exposed conductors or abnormal heat. Only "
            "authorised personnel may access electrical panels. Before intervention, power will be isolated, "
            "LOTO applied and absence of voltage verified."
        ),

        "questions_title": "DISCUSSION QUESTIONS",
        "questions": [
            "Have all cables and electrical tools been inspected?",
            "Are earthing and residual-current protection suitable?",
            "Are cables protected from water, edges and vehicles?",
            "Are electrical panels closed and locked?",
            "What action will be taken if damaged equipment is found?",
            "Who will complete the isolation and electrical testing?",
        ],

        "verification_title": "VERIFY BEFORE STARTING TODAY",
        "verification": [
            "Cables intact",
            "Plugs intact",
            "Sockets suitable",
            "Earthing available",
            "RCD/GFCI active",
            "Panels closed",
            "Area dry",
            "Cables protected",
            "LOTO ready",
            "Authorised person identified",
        ],

        "attendance_title": "ATTENDANCE AND APPROVAL",
        "fields": ["Project / Site", "Date", "Presented by", "Work area"],
        "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
        "notes_title": "Supervisor notes / additional site instructions",
        "footer": (
            "SafeBase HSE Resource — Electrical isolation, LOTO and "
            "site electrical procedures take priority."
        ),
    },
}
