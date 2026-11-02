export type FieldLocale = "tr" | "en";
export type BiText = Record<FieldLocale, string>;

export type FormField = {
  id: string;
  label: BiText;
  multiline?: boolean;
};

export type FieldForm = {
  slug: string;
  title: BiText;
  description: BiText;
  summary: BiText;
  steps: Record<FieldLocale, string[]>;
  example: BiText;
  sections: { title: BiText; fields: FormField[] }[];
  table: { title: BiText; columns: BiText[]; rows: number };
  note: BiText;
  faq: { question: BiText; answer: BiText }[];
  related: { path: string; label: BiText }[];
  references: { label: string; url: string }[];
};

const txt = (tr: string, en: string): BiText => ({ tr, en });
const fld = (id: string, tr: string, en: string, multiline = false): FormField => ({
  id, label: txt(tr, en), multiline,
});

export const fieldForms: FieldForm[] = [
  {
    slug: "job-safety-analysis",
    title: txt("İş Güvenliği Analizi (JSA/JHA) Formu", "Job Safety Analysis (JSA/JHA) Form"),
    description: txt(
      "Ücretsiz, yazdırılabilir JSA/JHA şablonu: iş adımları, tehlikeler, olası sonuçlar, kontrol önlemleri ve sorumlular için düzenlenebilir saha formu.",
      "Free printable JSA/JHA worksheet with editable job steps, hazards, credible outcomes, controls, responsible persons and review fields."
    ),
    summary: txt(
      "İşi adımlara bölün, her adımın riskini ekiple değerlendirin ve başlamadan önce uygulanacak kontrolleri belgelendirin. Örnek uygulama ve düzenlenebilir form aşağıdadır.",
      "Break a task into steps, assess hazards with the people doing the work, and document controls before starting. Use the practical example and editable worksheet below."
    ),
    steps: {
      tr: [
        "İşi, ekipmanı, çalışma yerini ve kimlerin etkileneceğini belirleyin.",
        "Gerçek saha uygulamasını çalışanlarla birlikte gözlemleyip işi mantıklı adımlara ayırın.",
        "Her adımda beklenmeyen enerji, düşme, sıkışma ve eşzamanlı işler dâhil olası tehlikeleri yazın.",
        "Kontrolleri öncelikle tehlikeyi ortadan kaldırma, ikame ve mühendislik önlemlerinden seçin; gerekli izinleri ayrıca doğrulayın.",
        "Sorumluları atayın, ekiple paylaşın; koşul veya yöntem değiştiğinde analizi yeniden değerlendirin."
      ],
      en: [
        "Define the task, equipment, work location and people who may be exposed.",
        "Observe the actual job with workers and break it into meaningful steps.",
        "Record credible hazards at each step, including stored energy, falls, pinch points and simultaneous operations.",
        "Prioritise elimination, substitution and engineering controls; verify permits and other authorisations separately.",
        "Assign owners, brief the team and reassess the analysis if conditions or methods change."
      ],
    },
    example: txt(
      "Örnek — Boru flanşı açma: Adım: Hattı izole et. Tehlike: İçeride kalan basınç veya ürünün kontrolsüz çıkışı. Önlem: Onaylı izolasyon planı, LOTO, drenaj/boşaltma ve sıfır enerji doğrulaması; kontrol tamamlanmadan açma işlemi yapılmaz.",
      "Worked example — Opening a pipe flange: Step: Isolate the line. Hazard: Residual pressure or process fluid release. Control: Approved isolation plan, LOTO, draining and verified zero-energy state; do not open the joint until checks are complete."
    ),
    sections: [
      { title: txt("İş bilgileri", "Job details"), fields: [
        fld("task", "İşin tanımı", "Task description"),
        fld("site", "Saha / ekipman", "Location / equipment"),
        fld("date", "Tarih / vardiya", "Date / shift"),
        fld("team", "Ekip / alt yüklenici", "Team / contractor"),
        fld("permit", "PTW / iş izin numarası", "Permit-to-work reference"),
      ] },
      { title: txt("Onay ve değişiklik kontrolü", "Review and change control"), fields: [
        fld("reviewed", "Analizi gözden geçiren / görevi", "Reviewed by / role"),
        fld("briefed", "Bilgilendirilen ekip ve tarih", "Team briefed and date"),
        fld("stop", "İşi durdurmayı gerektiren değişiklikler", "Conditions requiring stop and reassessment", true),
      ] },
    ],
    table: { title: txt("Adım adım risk ve kontroller", "Task steps, hazards and controls"),
      columns: [
        txt("İş adımı", "Job step"),
        txt("Tehlike ve olası sonuç", "Hazard and credible consequence"),
        txt("Uygulanacak kontrol", "Required control"),
        txt("Sorumlu / kontrol", "Owner / verification"),
      ], rows: 5 },
    note: txt(
      "Bu şablon bir saha çalışma yardımcısıdır. Onaylı risk değerlendirmesi, PTW, LOTO, yetkin gözetim veya ilgili yerel yasal yükümlülüklerin yerine geçmez.",
      "This worksheet supports field planning. It does not replace an approved risk assessment, PTW, LOTO, competent supervision or applicable local legal requirements."
    ),
    faq: [
      { question: txt("JSA ve JHA aynı şey mi?", "Are JSA and JHA the same?"), answer: txt(
        "Sahada sıkça birbirinin yerine kullanılırlar. Her ikisi de iş adımlarını, tehlikeleri ve önlemleri analiz eder; şirketinizin terminolojisini kullanın.",
        "The terms are often used interchangeably in practice. Both examine task steps, hazards and controls; use your organisation's terminology."
      ) },
      { question: txt("JSA ne zaman yenilenmeli?", "When should a JSA be reviewed?"), answer: txt(
        "İş yöntemi, ekipman, çalışanlar, eşzamanlı faaliyetler veya saha koşulları değiştiğinde; ayrıca olay, ramak kala ya da kontrol eksikliği sonrasında.",
        "When the work method, equipment, people, simultaneous activities or conditions change, and following incidents, near misses or failed controls."
      ) },
    ],
    related: [
      { path: "/knowledge-base/job-safety-analysis", label: txt("JSA teknik rehberi", "JSA technical guide") },
      { path: "/tools/quick-risk-assessment", label: txt("Risk değerlendirme aracı", "Risk assessment tool") },
      { path: "/tools/method-statement", label: txt("Metot beyanı aracı", "Method statement tool") },
    ],
    references: [
      { label: "OSHA — Job Safety Analysis (JSA) Process", url: "https://www.osha.gov/etools/oil-and-gas/jsa-process/" },
      { label: "OSHA — Hazard Prevention and Control", url: "https://www.osha.gov/safety-management/hazard-prevention" },
    ],
  },
  {
    slug: "near-miss-report",
    title: txt("Ramak Kala Bildirim Formu", "Near Miss Report Form"),
    description: txt(
      "Ücretsiz ramak kala olay bildirim formu: olay anlatımı, gerçekleşmeyen ama olası sonuç, acil önlem, kök neden, aksiyon sorumlusu ve doğrulama alanları.",
      "Free printable near miss reporting template: event description, potential harm, immediate controls, contributing factors, action owners and verification."
    ),
    summary: txt(
      "Yaralanma yaşanmadan önce tehlikeli olaylardan ders çıkarın. Olayı suçlayıcı bir dille değil, neyin gerçekleştiğini ve hangi sistem kontrollerinin işlemediğini açıklayarak kaydedin.",
      "Capture learning before someone is hurt. Describe what happened and which controls failed or were missing, rather than framing the report around individual blame."
    ),
    steps: {
      tr: [
        "Önce sahayı güvenli hâle getirin; tehlike sürüyorsa işi durdurup sorumluları bilgilendirin.",
        "Tarih, yer, ilgili faaliyet, olay sırası ve olayı gözlemleyenleri nesnel biçimde kaydedin.",
        "Gerçek sonuçla, koşullar az farklı olsaydı yaşanabilecek ciddi sonucu birbirinden ayırın.",
        "Görgü tanıkları ve ekiple tekrarı mümkün kılan teknik ve organizasyonel nedenleri araştırın.",
        "Düzeltici önleme sorumlu ve tarih atayın, uygulandığını ve etkili olduğunu ayrıca doğrulayın."
      ],
      en: [
        "Make the area safe first; stop the work and notify responsible persons if the hazard remains.",
        "Record the date, place, work activity, event sequence and witnesses objectively.",
        "Separate the actual outcome from the credible harm that might have occurred.",
        "Identify technical and organisational contributing factors with the workers involved.",
        "Assign corrective-action owners and dates, then verify both completion and effectiveness."
      ],
    },
    example: txt(
      "Örnek — Yürüyüş yoluna bir el aleti düşüyor, kimse yaralanmıyor. Gerçek sonuç: Yaralanma yok. Olası sonuç: Baş yaralanması. İlk önlem: Alanı kapat, yüksekteki çalışmayı durdur. Kalıcı önlem: Alet sabitleme, alt bölge bariyeri ve vardiya öncesi kontrol.",
      "Worked example — A hand tool falls onto a walkway without striking anyone. Actual outcome: No injury. Potential outcome: Head injury. Immediate action: Isolate the walkway and stop overhead work. Prevention: Tool tethering, exclusion zone and pre-shift verification."
    ),
    sections: [
      { title: txt("Olay kimliği", "Event details"), fields: [
        fld("date", "Tarih / saat", "Date / time"),
        fld("location", "Yer / saha", "Location / site"),
        fld("activity", "Yapılan iş", "Activity underway"),
        fld("reporter", "Bildirimi yapan (isteğe bağlı)", "Reporter (optional)"),
      ] },
      { title: txt("Olayın anlatımı", "Event description"), fields: [
        fld("what", "Ne oldu? Olay sırasını yazın", "What happened? Describe the sequence", true),
        fld("actual", "Gerçek sonuç / yaralanma var mı?", "Actual outcome / any injury?"),
        fld("potential", "Makul olarak mümkün en ciddi sonuç", "Credible worst-case consequence", true),
        fld("immediate", "İlk güvenlik önlemleri", "Immediate safety actions", true),
      ] },
      { title: txt("Öğrenme ve takip", "Learning and follow-up"), fields: [
        fld("factors", "Teknik ve organizasyonel katkı nedenleri", "Technical and organisational contributing factors", true),
        fld("lesson", "Ekiple paylaşılacak öğrenim", "Learning to share with the team", true),
        fld("closed", "Kapatma ve etkinlik kontrolünü yapan", "Closure and effectiveness verified by"),
      ] },
    ],
    table: { title: txt("Düzeltici ve önleyici faaliyetler", "Corrective and preventive actions"),
      columns: [
        txt("Faaliyet", "Action"),
        txt("Sorumlu", "Owner"),
        txt("Hedef tarih", "Due date"),
        txt("Durum / etkinlik kontrolü", "Status / effectiveness check"),
      ], rows: 3 },
    note: txt(
      "Acil müdahale ve yerel/kurumsal bildirim süreçlerini izleyin. Bu form resmî kaza bildiriminin veya yasal raporlama yükümlülüklerinin yerine geçmez.",
      "Follow emergency and local/organisational reporting procedures. This form does not replace mandatory incident notification or statutory reporting."
    ),
    faq: [
      { question: txt("Ramak kala olay nedir?", "What is a near miss?"), answer: txt(
        "Bir olayın ciddi zarar verme potansiyeli taşıdığı ancak olayın gerçekleşen sonucunda yaralanma veya zarar oluşmadığı durumdur.",
        "An unplanned event that could credibly have caused injury or damage but did not do so in its actual outcome."
      ) },
      { question: txt("Kişi ismi yazmak zorunlu mu?", "Must the reporter be identified?"), answer: txt(
        "Şirket prosedürüne ve yerel kurallara bağlıdır. Gereksiz kişisel bilgileri toplamadan, sahayı ve tehlikeyi tarif eden olguları önceliklendirin.",
        "It depends on company policy and local requirements. Focus on the facts needed to control the risk without collecting unnecessary personal information."
      ) },
    ],
    related: [
      { path: "/knowledge-base/near-miss-reporting", label: txt("Ramak kala teknik rehberi", "Near-miss guide") },
      { path: "/knowledge-base/incident-reporting", label: txt("Olay bildirim rehberi", "Incident reporting guide") },
      { path: "/checklists", label: txt("Saha kontrol listeleri", "Inspection checklists") },
    ],
    references: [
      { label: "OSHA — Hazard Identification and Assessment", url: "https://www.osha.gov/safety-management/hazard-identification" },
      { label: "HSE UK — Learning Organisations", url: "https://www.hse.gov.uk/humanfactors/topics/learning.htm" },
    ],
  },
  {
    slug: "incident-investigation",
    title: txt("İSG Olay Araştırma ve Kök Neden Formu", "Incident Investigation & Root Cause Form"),
    description: txt(
      "Ücretsiz olay araştırma şablonu: zaman çizelgesi, deliller, temel ve sistemik nedenler, düzeltici faaliyet planı ve etkinlik doğrulaması için düzenlenebilir form.",
      "Free printable incident investigation worksheet covering timeline, evidence, immediate and systemic causes, corrective actions and effectiveness verification."
    ),
    summary: txt(
      "Olayı tek bir çalışan hatasıyla açıklamak yerine işin tasarımını, ekipmanı, eğitimi, denetimi ve çalışma koşullarını birlikte araştırın. Aksiyonları yalnızca tamamlamakla kalmayıp sonuçlarını doğrulayın.",
      "Look beyond a single operator error to work design, equipment, training, supervision and site conditions. Check whether corrective actions actually reduce the risk."
    ),
    steps: {
      tr: [
        "Önce acil yardım, alan güvenliği, devam eden tehlikelerin kontrolü ve gerekli bildirimleri sağlayın.",
        "Olayın zaman sırasını oluşturun; tanık anlatımlarını ve fiziksel kanıtları ayrı ayrı kaydedin.",
        "Doğrudan olay etkenlerini ve bunlara imkân veren temel sistem eksiklerini birbirinden ayırın.",
        "Sorumlu ve tarih içeren, mümkün olduğunca güçlü tehlike kontrolü sağlayan faaliyetler belirleyin.",
        "Faaliyetlerden sonra sahayı tekrar kontrol edin; öğrenimleri paylaşın ve yeniden oluşma riskini izleyin."
      ],
      en: [
        "Arrange emergency care, make the area safe, control continuing hazards and meet applicable notification duties.",
        "Establish a factual timeline; distinguish witness accounts from physical evidence.",
        "Separate immediate event factors from the underlying system weaknesses that allowed them.",
        "Assign dated corrective actions, prioritising stronger hazard controls wherever feasible.",
        "Recheck the worksite, communicate lessons and monitor whether the risk remains controlled."
      ],
    },
    example: txt(
      "Örnek — İşçi geçici elektrik kablosuna takılıyor. Doğrudan etken: Kablo geçiş yolunda. Temel neden: Kablo güzergâhı planı, bariyer ve düzenli saha denetimi yok. Kalıcı faaliyet: Kabloları geçişten ayıran fiziksel yönlendirme ve kontrol sisteminin uygulanması.",
      "Worked example — A worker trips over a temporary power cable. Immediate factor: Cable across a walkway. Underlying causes: No routing plan, physical protection or inspection ownership. Stronger action: Segregated cable routing and verified recurring site checks."
    ),
    sections: [
      { title: txt("İlk kayıt", "Initial record"), fields: [
        fld("date", "Olay tarihi / saati", "Incident date / time"),
        fld("site", "İş yeri / konum", "Site / location"),
        fld("activity", "Faaliyet ve etkilenen iş grubu", "Activity and affected work group"),
        fld("team", "Araştırma ekibi", "Investigation team"),
        fld("notifications", "Acil müdahale / gerekli bildirimler", "Emergency response / required notifications", true),
      ] },
      { title: txt("Kanıt ve neden analizi", "Evidence and causal analysis"), fields: [
        fld("timeline", "Olay öncesi, olay anı ve sonrası kronoloji", "Timeline before, during and after", true),
        fld("evidence", "Fiziksel kanıt ve ifade kaynakları", "Physical evidence and statement sources", true),
        fld("immediate", "Doğrudan etkenler", "Immediate event factors", true),
        fld("underlying", "Sistemik / organizasyonel temel nedenler", "Underlying system / organisational causes", true),
        fld("controls", "Hangi kontrol vardı, hangisi eksikti veya işlemedi?", "Which controls existed, were absent or failed?", true),
      ] },
      { title: txt("Tamamlama", "Close-out"), fields: [
        fld("lessons", "Paylaşılan öğrenimler / etkilenen birimler", "Lessons communicated / affected groups", true),
        fld("verification", "Faaliyet etkinliğini kim, ne zaman ve nasıl doğruladı?", "Who verified effectiveness, when and how?", true),
      ] },
    ],
    table: { title: txt("Önlem ve doğrulama takip tablosu", "Corrective action and verification log"),
      columns: [
        txt("Kök nedenle ilişkili faaliyet", "Action linked to root cause"),
        txt("Sorumlu", "Owner"),
        txt("Hedef tarih", "Due date"),
        txt("Kanıt / etkinlik", "Evidence / effectiveness"),
      ], rows: 4 },
    note: txt(
      "Önce insan güvenliği, acil yardım ve gerekli yasal bildirimler gelir. Bu genel şablon hukuki soruşturma, kaza bildirim sistemi veya yetkili uzman incelemesinin yerine geçmez.",
      "People's safety, emergency care and required legal notifications come first. This general worksheet does not replace statutory reporting, formal investigations or competent specialist review."
    ),
    faq: [
      { question: txt("Kök neden, doğrudan nedenden nasıl farklıdır?", "How does a root cause differ from an immediate factor?"), answer: txt(
        "Doğrudan etken olayın hemen öncesindeki koşuldur. Temel neden ise o koşulun neden oluşabildiğini açıklayan yönetim, tasarım veya kontrol sistemi eksikliğidir.",
        "An immediate factor is a condition directly involved in the event. An underlying cause explains why the system permitted that condition to exist."
      ) },
      { question: txt("Faaliyet ne zaman kapanmış sayılır?", "When should an action be considered closed?"), answer: txt(
        "Yalnızca tamamlandı bilgisi yeterli değildir. Sorumlu kişi uygulama kanıtını ve seçilen önlemin etkili kaldığını kontrol etmelidir.",
        "Completion alone is insufficient. An accountable person should verify implementation and that the selected control works effectively."
      ) },
    ],
    related: [
      { path: "/knowledge-base/incident-reporting", label: txt("Olay bildirimi rehberi", "Incident reporting guide") },
      { path: "/knowledge-base/near-miss-reporting", label: txt("Ramak kala rehberi", "Near miss guide") },
      { path: "/tools/trir", label: txt("TRIR hesaplayıcı", "TRIR calculator") },
    ],
    references: [
      { label: "OSHA — Hazard Identification and Assessment", url: "https://www.osha.gov/safety-management/hazard-identification" },
      { label: "OSHA — Incident Investigation", url: "https://obis.osha.gov/dcsp/products/topics/incidentinvestigation/" },
    ],
  },
];

export function getFieldForm(slug: string) {
  return fieldForms.find((form) => form.slug === slug);
}
