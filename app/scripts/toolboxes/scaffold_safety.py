"""SafeBase Scaffold Safety Toolbox Talk content."""

SCAFFOLD_SAFETY = {
    "base": "scaffold-safety-toolbox-talk",

    "tr": {
        "title": "İSKELE GÜVENLİĞİ TOOLBOX TALK",
        "subtitle": "Etiket, erişim, platform ve korkulukları kullanımdan önce doğrulayın.",
        "application_subtitle": "Tehlikeler, kontrol önlemleri ve günlük iş öncesi doğrulama.",
        "duration": "8–10 DAKİKA",

        "objective_title": "AMAÇ",
        "objective": (
            "İskele kullanımında düşme, düşen cisim, uygunsuz erişim, eksik platform, "
            "aşırı yükleme ve yetkisiz değişiklik risklerini değerlendirmek; iskeleyi "
            "kullanmadan önce etiket, kontrol tarihi ve fiziksel durumunu doğrulamaktır."
        ),

        "explanation_title": "KONU ANLATIMI",
        "explanation": [
            (
                "İskele; platform, korkuluk, ara korkuluk, topuk levhası, merdiven, trapdoor, "
                "çapraz bağlantılar ve ankrajlardan oluşan bütüncül bir sistemdir. Tek bir "
                "parçanın eksikliği dahi düşme veya çökme riskini artırabilir."
            ),
            (
                "İskele yalnızca yetkili iskele personeli tarafından kurulmalı, değiştirilmeli "
                "ve sökülmelidir. Kullanıcılar platform, korkuluk, merdiven veya bağlantı "
                "elemanlarını kendi ihtiyaçlarına göre sökmemeli ya da değiştirmemelidir."
            ),
            (
                "Etiket uygun olsa bile kullanıcı her kullanım öncesinde görsel kontrol yapmalıdır. "
                "Kırmızı veya etiketsiz iskele kullanılmamalı; sarı etikette belirtilen özel "
                "koşullar anlaşılmadan iskeleye erişilmemelidir."
            ),
        ],

        "scenario_title": "GERÇEKÇİ SAHA SENARYOSU",
        "scenario": [
            (
                "Bir ekip, boru bağlantısına ulaşmak için yeşil etiketli bir iskele kullandı. "
                "Çalışma sırasında malzeme geçirmek amacıyla ara korkuluk yerinden çıkarıldı."
            ),
            (
                "Korkuluk geri takılmadan vardiya değişti. Yeni ekip eksikliği fark etmeden "
                "çalışmaya başladı ve bir çalışan açık kenarda dengesini kaybetti."
            ),
            (
                "Olay; kullanıcıların iskele parçalarını değiştirmemesi, eksikliğin derhal "
                "bildirilmesi, iskelenin kapatılması ve yetkili ekip tarafından yeniden "
                "kontrol edilmesiyle önlenebilirdi."
            ),
        ],

        "remember_title": "UNUTMAYIN",
        "remember": (
            "Etiket tek başına yeterli değildir. Eksik, gevşek, hasarlı veya değiştirilmiş "
            "bir parça görürseniz iskeleyi kullanmayın ve durumu hemen bildirin."
        ),

        "hazards_title": "TEMEL TEHLİKELER",
        "hazards": [
            "Etiketsiz, kırmızı etiketli veya kontrol süresi geçmiş iskele.",
            "Eksik üst korkuluk, ara korkuluk veya topuk levhası.",
            "Tam döşenmemiş, gevşek veya hasarlı platformlar.",
            "Açık bırakılan trapdoor ve erişim açıklıkları.",
            "Uygunsuz merdiven kullanımı veya dışarıdan tırmanma.",
            "Yetkisiz parça sökme veya iskele değişikliği.",
            "Aşırı yükleme ve uygunsuz malzeme istifleme.",
            "Alt seviyeye düşen alet ve malzemeler.",
        ],

        "controls_title": "KONTROL ÖNLEMLERİ",
        "controls": [
            "İskele etiketini ve kontrol tarihini doğrulayın.",
            "Her kullanımdan önce görsel kontrol yapın.",
            "Korkuluk, ara korkuluk ve topuk levhalarını kontrol edin.",
            "Platformların tam, sabit ve hasarsız olduğunu doğrulayın.",
            "Trapdoorları kullanım dışında kapalı tutun.",
            "Yalnızca belirlenmiş güvenli erişim yolunu kullanın.",
            "İskele parçalarını yetkisiz şekilde değiştirmeyin.",
            "İzin verilen yük kapasitesini aşmayın.",
            "Aletleri sabitleyin ve alt alanı bariyerleyin.",
            "Uygunsuzlukta kullanımı durdurup yetkili kişiye bildirin.",
        ],

        "supervisor_title": "SÜPERVİZÖR KONUŞMA METNİ",
        "supervisor_script": (
            "Arkadaşlar, bugün iskeleye çıkmadan önce etiketi, kontrol tarihini, erişimi, "
            "platformları, korkulukları ve trapdoorları birlikte kontrol edeceğiz. Etiket "
            "yoksa, kırmızıysa veya herhangi bir parça eksikse iskeleyi kullanmayacağız. "
            "Hiç kimse korkuluk, platform veya bağlantı parçasını kendi başına sökmeyecek. "
            "Bir uygunsuzluk görürsek alanı kapatıp yetkili iskele ekibine bildireceğiz."
        ),

        "questions_title": "EKİBE SORULACAK SORULAR",
        "questions": [
            "İskele etiketi hangi renkte ve kontrol tarihi geçerli mi?",
            "Platformlar tam, sabit ve hasarsız mı?",
            "Korkuluklar ve topuk levhaları tamam mı?",
            "Trapdoorlar kullanım dışında kapalı mı?",
            "Güvenli erişim merdiveni mevcut mu?",
            "Uygunsuzluk görülürse kime bildirilecek?",
        ],

        "verification_title": "BUGÜN İŞE BAŞLAMADAN ÖNCE DOĞRULAYIN",
        "verification": [
            "Etiket uygun",
            "Kontrol tarihi geçerli",
            "Platformlar tam",
            "Korkuluklar tamam",
            "Topuk levhaları mevcut",
            "Trapdoorlar çalışıyor",
            "Erişim güvenli",
            "Yetkisiz değişiklik yok",
            "Alt alan korumalı",
            "Yük kapasitesi uygun",
        ],

        "attendance_title": "KATILIM VE ONAY",
        "fields": ["Proje / Saha", "Tarih", "Konuşmayı yapan", "Çalışma alanı"],
        "table_headers": ["No", "Ad Soyad", "Firma / Görev", "İmza"],
        "notes_title": "Süpervizör notları / ek saha talimatları",
        "footer": (
            "SafeBase HSE Resource — İskele etiketi, risk değerlendirmesi ve "
            "saha prosedürleri önceliklidir."
        ),
    },

    "en": {
        "title": "SCAFFOLD SAFETY TOOLBOX TALK",
        "subtitle": "Verify the tag, access, platforms and guardrails before use.",
        "application_subtitle": "Hazards, control measures and daily pre-work verification.",
        "duration": "8–10 MINUTES",

        "objective_title": "OBJECTIVE",
        "objective": (
            "Review fall, falling-object, unsafe-access, incomplete-platform, overloading "
            "and unauthorised-alteration hazards, and verify the scaffold tag, inspection "
            "date and physical condition before use."
        ),

        "explanation_title": "TOPIC EXPLANATION",
        "explanation": [
            (
                "A scaffold is a complete system consisting of platforms, top rails, mid-rails, "
                "toe boards, ladders, trapdoors, braces and ties. A single missing component "
                "can increase the risk of a fall or structural failure."
            ),
            (
                "Scaffolds must only be erected, altered and dismantled by authorised scaffold "
                "personnel. Users must not remove or reposition platforms, rails, ladders or "
                "structural components for convenience."
            ),
            (
                "Even when the tag is acceptable, the user must complete a visual inspection "
                "before every use. Untagged or red-tagged scaffolds must not be used, and yellow-tag "
                "conditions must be understood before access."
            ),
        ],

        "scenario_title": "REALISTIC SITE SCENARIO",
        "scenario": [
            (
                "A team used a green-tagged scaffold to reach a pipe connection. During the task, "
                "a mid-rail was removed to pass material through the platform."
            ),
            (
                "The rail was not replaced before the shift changed. The next team began work "
                "without noticing the missing component, and a worker lost balance near the open edge."
            ),
            (
                "The event could have been prevented by prohibiting unauthorised alterations, "
                "reporting the defect immediately, closing the scaffold and arranging reinspection "
                "by the authorised scaffold team."
            ),
        ],

        "remember_title": "REMEMBER",
        "remember": (
            "A valid tag is not enough. Do not use a scaffold with missing, loose, damaged or "
            "altered components; report the condition immediately."
        ),

        "hazards_title": "KEY HAZARDS",
        "hazards": [
            "Untagged, red-tagged or overdue scaffold inspection.",
            "Missing top rails, mid-rails or toe boards.",
            "Incomplete, loose or damaged working platforms.",
            "Open trapdoors and access openings.",
            "Unsafe ladders or climbing outside the scaffold.",
            "Unauthorised removal or alteration of components.",
            "Overloading and unsafe material storage.",
            "Tools and materials falling to lower levels.",
        ],

        "controls_title": "CONTROL MEASURES",
        "controls": [
            "Verify the scaffold tag and inspection date.",
            "Complete a visual inspection before every use.",
            "Check top rails, mid-rails and toe boards.",
            "Confirm platforms are complete, secured and undamaged.",
            "Keep trapdoors closed when not in use.",
            "Use only the designated safe access route.",
            "Never alter scaffold components without authorisation.",
            "Do not exceed the permitted load capacity.",
            "Secure tools and barricade the area below.",
            "Stop use and report defects immediately.",
        ],

        "supervisor_title": "SUPERVISOR TALKING SCRIPT",
        "supervisor_script": (
            "Team, before accessing the scaffold today, we will check the tag, inspection date, "
            "access, platforms, guardrails and trapdoors. We will not use the scaffold if the tag "
            "is missing, red or if any component is incomplete. No one may remove rails, decks or "
            "structural parts. Any defect must be reported and the scaffold kept out of use until "
            "checked by the authorised scaffold team."
        ),

        "questions_title": "DISCUSSION QUESTIONS",
        "questions": [
            "What colour is the scaffold tag and is the inspection date valid?",
            "Are the platforms complete, secured and undamaged?",
            "Are guardrails and toe boards complete?",
            "Are trapdoors closed when not in use?",
            "Is a safe access ladder available?",
            "Who must be contacted if a defect is identified?",
        ],

        "verification_title": "VERIFY BEFORE STARTING TODAY",
        "verification": [
            "Tag acceptable",
            "Inspection date valid",
            "Platforms complete",
            "Guardrails complete",
            "Toe boards fitted",
            "Trapdoors functional",
            "Access safe",
            "No unauthorised changes",
            "Lower area protected",
            "Load capacity suitable",
        ],

        "attendance_title": "ATTENDANCE AND APPROVAL",
        "fields": ["Project / Site", "Date", "Presented by", "Work area"],
        "table_headers": ["No", "Full Name", "Company / Role", "Signature"],
        "notes_title": "Supervisor notes / additional site instructions",
        "footer": (
            "SafeBase HSE Resource — Scaffold tags, risk assessments and "
            "site procedures take priority."
        ),
    },
}
