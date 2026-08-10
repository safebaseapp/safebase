"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MethodStatementPrint from "./MethodStatementPrint";

type Props = {
  params: Promise<{ locale: string }>;
};

type MethodStep = {
  id: string;
  step: string;
  hazards: string;
  controls: string;
  responsible: string;
};

const createMethodStep = (): MethodStep => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  step: "",
  hazards: "",
  controls: "",
  responsible: "",
});

export default function MethodStatementPage({ params }: Props) {
  const [locale, setLocale] = useState("en");

  const [projectName, setProjectName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [activity, setActivity] = useState("");
  const [documentNo, setDocumentNo] = useState("SB-MS-001");
  const [revision, setRevision] = useState("1.0");
  const [date, setDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [scope, setScope] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [competency, setCompetency] = useState("");
  const [ppe, setPpe] = useState("");
  const [toolsEquipment, setToolsEquipment] = useState("");
  const [permits, setPermits] = useState("");
  const [preWorkRequirements, setPreWorkRequirements] = useState("");
  const [emergencyArrangements, setEmergencyArrangements] = useState("");
  const [environmentalControls, setEnvironmentalControls] = useState("");
  const [references, setReferences] = useState("");

  const [preparedBy, setPreparedBy] = useState("");
  const [reviewedBy, setReviewedBy] = useState("");
  const [approvedBy, setApprovedBy] = useState("");

  const [methodSteps, setMethodSteps] = useState<MethodStep[]>([
    createMethodStep(),
  ]);

  useEffect(() => {
    params.then(({ locale: currentLocale }) => {
      setLocale(currentLocale);
    });
  }, [params]);

  const isTurkish = locale === "tr";

  const updateMethodStep = (
    id: string,
    field: keyof MethodStep,
    value: string
  ) => {
    setMethodSteps((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addMethodStep = () => {
    setMethodSteps((current) => [...current, createMethodStep()]);
  };

  const removeMethodStep = (id: string) => {
    setMethodSteps((current) => {
      if (current.length === 1) return current;
      return current.filter((item) => item.id !== id);
    });
  };

  const loadWorkingAtHeightTemplate = () => {
    setActivity(
      isTurkish ? "Yüksekte Çalışma" : "Working at Height"
    );

    setScope(
      isTurkish
        ? "Bu Method Statement; düşme sonucu yaralanma riski bulunan yüksekte çalışma faaliyetlerinin planlanması, güvenli erişim sağlanması, çalışma alanının hazırlanması, uygun düşüş önleme veya düşüş durdurma sistemlerinin kullanılması, işin kontrollü şekilde yürütülmesi ve çalışma sonrasında alanın güvenli bırakılması için uygulanacak yöntemi tanımlar."
        : "This Method Statement defines the safe method for planning work at height, providing safe access, preparing the work area, selecting appropriate fall-prevention or fall-arrest systems, performing the work under controlled conditions and leaving the area safe after completion."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: Çalışmayı planlar, alanı ve erişim yöntemini kontrol eder, personelin yetkinliğini doğrular ve uygulamayı gözetir.\nHSE Personeli: Risk değerlendirmesi, saha kontrolleri ve güvenlik gerekliliklerinin uygulanmasını destekler.\nÇalışanlar: Onaylı çalışma yöntemine uyar, ekipmanı kullanım öncesi kontrol eder ve değişen/tehlikeli koşulları derhal bildirir."
        : "Site Supervisor: Plans the work, verifies the work area and access method, confirms worker competency and supervises implementation.\nHSE Personnel: Supports risk assessment, field verification and implementation of safety requirements.\nWorkers: Follow the approved work method, inspect equipment before use and immediately report changing or unsafe conditions."
    );

    setCompetency(
      isTurkish
        ? "Yüksekte çalışma yapacak personel göreve uygun eğitim, bilgi ve deneyime sahip olmalıdır. Düşüş koruma ekipmanı kullanacak personel ekipmanın doğru kullanımı, kontrolü ve sınırlamaları konusunda bilgilendirilmiş olmalıdır. Süpervizör çalışma yöntemi ve kurtarma düzenlemelerini bilmelidir."
        : "Personnel performing work at height shall have suitable training, knowledge and experience for the task. Workers using fall-protection equipment shall understand its correct use, inspection and limitations. Supervisors shall understand the work method and rescue arrangements."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Uygun iş kıyafeti\n• Göreve uygun göz koruması\n• Risk değerlendirmesi gerektiriyorsa tam vücut emniyet kemeri ve uygun lanyard / fall-arrest bağlantı sistemi"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• Suitable work clothing\n• Task-appropriate eye protection\n• Full-body harness and suitable lanyard / fall-arrest connection where required by the risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun çalışma platformu / iskele / MEWP veya diğer güvenli erişim sistemi\n• Korkuluk ve kenar koruma sistemleri\n• Onaylı ankraj noktaları\n• Tam vücut emniyet kemeri ve uygun bağlantı ekipmanı\n• Tool lanyard / düşen cisim önleme ekipmanı\n• Bariyer ve uyarı levhaları\n• Gerekli kurtarma ekipmanı"
        : "• Suitable work platform / scaffold / MEWP or other safe access system\n• Guardrails and edge-protection systems\n• Approved anchorage points\n• Full-body harness and suitable connecting equipment\n• Tool lanyards / dropped-object prevention equipment\n• Barricades and warning signs\n• Required rescue equipment"
    );

    setPermits(
      isTurkish
        ? "Saha veya proje prosedürlerinin gerektirdiği çalışma izinleri işe başlamadan önce alınmalı ve geçerliliği doğrulanmalıdır. Risk değerlendirmesi, ilgili yüksekte çalışma izinleri ve eş zamanlı işler kontrol edilmelidir."
        : "Any permits required by site or project procedures shall be obtained and verified before work starts. The risk assessment, applicable work-at-height authorization and simultaneous activities shall be reviewed."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Yüksekte çalışmanın mümkünse tamamen ortadan kaldırılıp kaldırılamayacağını değerlendir.\n• Göreve özel risk değerlendirmesini gözden geçir.\n• Çalışma alanını, çalışma yüksekliğini, yüzey koşullarını ve erişimi kontrol et.\n• Öncelikle toplu düşüş önleme yöntemlerini değerlendir.\n• İskele, platform, MEWP veya diğer erişim ekipmanının uygunluğunu doğrula.\n• Açık kenarları, açıklıkları ve kırılgan yüzeyleri belirle.\n• Düşen cisim riskine karşı alt alanı kontrol et ve gerekiyorsa dışlama alanı oluştur.\n• Düşüş koruma ekipmanı ve ankraj noktalarını kullanım öncesi kontrol et.\n• Hava koşullarının güvenli çalışmaya uygun olduğunu doğrula.\n• Kurtarma planı ve kurtarma ekipmanının hazır olduğunu doğrula."
        : "• Determine whether work at height can reasonably be avoided.\n• Review the task-specific risk assessment.\n• Inspect the work area, work height, surface conditions and access.\n• Consider collective fall-prevention measures first.\n• Verify the suitability of scaffold, platform, MEWP or other access equipment.\n• Identify open edges, openings and fragile surfaces.\n• Control dropped-object exposure below and establish an exclusion zone where required.\n• Inspect fall-protection equipment and anchorage points before use.\n• Confirm weather conditions are suitable for safe work.\n• Verify the rescue plan and rescue equipment are ready."
    );

    setMethodSteps([
      {
        id: `wah-1-${Date.now()}`,
        step: isTurkish
          ? "İşi planla ve yüksekte çalışmanın gerekli olup olmadığını değerlendir."
          : "Plan the task and determine whether work at height is necessary.",
        hazards: isTurkish
          ? "Gereksiz yüksekte çalışma, yetersiz planlama, yanlış erişim yönteminin seçilmesi."
          : "Unnecessary work at height, inadequate planning, unsuitable access method.",
        controls: isTurkish
          ? "Mümkünse işi yer seviyesinden gerçekleştir. Yüksekte çalışma gerekiyorsa risk değerlendirmesine göre uygun erişim ve düşüş önleme sistemini seç."
          : "Perform the task from ground level where reasonably practicable. Where work at height is necessary, select suitable access and fall-prevention measures based on the risk assessment.",
        responsible: isTurkish
          ? "Saha Süpervizörü / HSE"
          : "Site Supervisor / HSE",
      },
      {
        id: `wah-2-${Date.now()}`,
        step: isTurkish
          ? "Çalışma alanını ve güvenli erişim yolunu hazırla."
          : "Prepare the work area and safe access route.",
        hazards: isTurkish
          ? "Kayma, takılma, açık kenar, zemin açıklığı, kırılgan yüzey ve uygunsuz erişim."
          : "Slip, trip, open edge, floor opening, fragile surface and unsafe access.",
        controls: isTurkish
          ? "Erişim yollarını açık tut. Açık kenar ve açıklıkları uygun korkuluk veya dayanıklı kapaklarla koru. Kırılgan yüzeyleri belirle ve erişimi kontrol et."
          : "Keep access routes clear. Protect open edges and openings using suitable guardrails or secure covers. Identify fragile surfaces and control access.",
        responsible: isTurkish
          ? "Saha Süpervizörü"
          : "Site Supervisor",
      },
      {
        id: `wah-3-${Date.now()}`,
        step: isTurkish
          ? "Çalışma platformu ve yüksekte çalışma ekipmanını kontrol et."
          : "Inspect the work platform and work-at-height equipment.",
        hazards: isTurkish
          ? "Hasarlı platform, uygunsuz iskele, ekipman arızası, stabilite kaybı."
          : "Damaged platform, unsuitable scaffold, equipment failure or loss of stability.",
        controls: isTurkish
          ? "Ekipmanın uygun tipte, stabil, çalışma koşullarına uygun ve gerekli kontrollerinin yapılmış olduğunu doğrula. Kusurlu ekipmanı kullanımdan çıkar."
          : "Confirm equipment is suitable, stable, appropriate for the working conditions and has received the required inspections. Remove defective equipment from service.",
        responsible: isTurkish
          ? "Yetkin Kişi / Süpervizör"
          : "Competent Person / Supervisor",
      },
      {
        id: `wah-4-${Date.now()}`,
        step: isTurkish
          ? "Düşüş önleme ve gerekiyorsa kişisel düşüş koruma sistemlerini kur."
          : "Establish fall-prevention and, where required, personal fall-protection systems.",
        hazards: isTurkish
          ? "Yüksekten düşme, uygunsuz ankraj, yetersiz düşüş açıklığı, swing fall."
          : "Fall from height, unsuitable anchorage, inadequate fall clearance or swing fall.",
        controls: isTurkish
          ? "Öncelikle korkuluk, güvenli platform veya diğer toplu koruma yöntemlerini kullan. Kişisel sistem gerekiyorsa uygun ankraj, tam vücut kemeri ve göreve uygun bağlantı ekipmanı kullan. Düşüş açıklığını ve swing-fall riskini değerlendir."
          : "Prioritise guardrails, safe platforms and other collective protection. Where personal protection is necessary, use suitable anchorage, full-body harness and task-appropriate connecting equipment. Assess fall clearance and swing-fall exposure.",
        responsible: isTurkish
          ? "Süpervizör / Çalışan"
          : "Supervisor / Worker",
      },
      {
        id: `wah-5-${Date.now()}`,
        step: isTurkish
          ? "Düşen cisim riskini kontrol et ve alt alanı güvenli hale getir."
          : "Control dropped-object risk and secure the area below.",
        hazards: isTurkish
          ? "Alet veya malzemelerin alt seviyeye düşmesi ve personele çarpması."
          : "Tools or materials falling to a lower level and striking personnel.",
        controls: isTurkish
          ? "Alet ve malzemeleri kenardan uzak tut ve gerektiğinde sabitle. Tool lanyard kullan. Alt seviyedeki tehlike alanını bariyerle ve eş zamanlı işleri koordine et."
          : "Keep tools and materials away from edges and secure them where required. Use tool lanyards. Barricade the danger area below and coordinate simultaneous activities.",
        responsible: isTurkish
          ? "Süpervizör / Çalışan"
          : "Supervisor / Worker",
      },
      {
        id: `wah-6-${Date.now()}`,
        step: isTurkish
          ? "Çalışmayı onaylı yöntem doğrultusunda gerçekleştir."
          : "Perform the work in accordance with the approved method.",
        hazards: isTurkish
          ? "Kontrol kaybı, uygunsuz davranış, değişen saha koşulları ve koruma sistemlerinin devre dışı kalması."
          : "Loss of control, unsafe behaviour, changing site conditions or failure of protection systems.",
        controls: isTurkish
          ? "Belirlenen çalışma alanı içinde kal. Koruyucu sistemleri kaldırma veya değiştirme. Çalışma koşulları değişirse işi durdur ve yöntemi yeniden değerlendir."
          : "Remain within the designated work area. Do not remove or alter protective systems. Stop work and reassess the method if conditions change.",
        responsible: isTurkish
          ? "Tüm Çalışanlar / Süpervizör"
          : "All Workers / Supervisor",
      },
      {
        id: `wah-7-${Date.now()}`,
        step: isTurkish
          ? "İş tamamlandıktan sonra alanı güvenli şekilde kapat."
          : "Close out the work area safely after completion.",
        hazards: isTurkish
          ? "Geride bırakılan malzeme, açık kenar, kontrolsüz erişim ve söküm sırasında düşen cisim."
          : "Materials left behind, exposed edges, uncontrolled access or dropped objects during dismantling.",
        controls: isTurkish
          ? "Alet ve malzemeleri kaldır. Geçici korumalar ancak alan kalıcı olarak güvenli hale getirildikten sonra kontrollü şekilde sökülmeli. Çalışma alanını son kez kontrol et."
          : "Remove tools and materials. Temporary protection shall only be removed in a controlled manner after the area has been left permanently safe. Conduct a final inspection.",
        responsible: isTurkish
          ? "Süpervizör"
          : "Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Düşme sonrası askıda kalan personel için önceden belirlenmiş kurtarma yöntemi bulunmalıdır. Kurtarma ekipmanı çalışma alanında erişilebilir olmalı ve kurtarmayı gerçekleştirecek personelin görevleri belirlenmelidir. Olay halinde çalışma durdurulmalı, alan güvenli hale getirilmeli ve saha acil durum prosedürü uygulanmalıdır."
        : "A pre-planned rescue method shall be available for any person suspended following a fall. Rescue equipment shall be accessible at the work area and the responsibilities of rescue personnel shall be defined. In an emergency, stop work, secure the area and follow the site emergency procedure."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Malzeme ve atıkların yüksekten düşmesini önle. Gevşek malzemeleri rüzgara karşı sabitle. Çalışma sonunda tüm atıkları belirlenen alanlara taşı. Yağ, kimyasal veya diğer maddelerin zemine veya drenaja kontrolsüz bırakılmasını önle."
        : "Prevent materials and waste from falling from height. Secure loose materials against wind. Remove waste to designated areas after work. Prevent uncontrolled release of oils, chemicals or other substances to ground or drainage systems."
    );

    setReferences(
      isTurkish
        ? "• SafeBase görev bazlı risk değerlendirmesi\n• HSE – Working at Height guidance\n• HSE – Assessing all work at height\n• Proje / saha HSE prosedürleri\n• Kullanılan ekipmanın üretici talimatları"
        : "• SafeBase task-specific risk assessment\n• HSE – Working at Height guidance\n• HSE – Assessing all work at height\n• Project / site HSE procedures\n• Manufacturer instructions for equipment used"
    );
  };


  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="mb-8">
          <Link
            href={`/${locale}/tools`}
            className="text-sm font-semibold text-blue-400 transition hover:text-blue-300"
          >
            ← {isTurkish ? "Araçlara dön" : "Back to tools"}
          </Link>

          <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-400">
                SafeBase Method Statement
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                {isTurkish
                  ? "Profesyonel Method Statement Oluşturucu"
                  : "Professional Method Statement Generator"}
              </h1>

              <p className="mt-3 max-w-3xl leading-7 text-slate-400">
                {isTurkish
                  ? "Faaliyetin kapsamını, çalışma sırasını, tehlikeleri, kontrol önlemlerini ve gerekli HSE düzenlemelerini tek dokümanda oluşturun."
                  : "Build the scope, work sequence, hazards, controls and HSE arrangements for an activity in one professional document."}
              </p>
            </div>

            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-xl border border-blue-500/40 bg-blue-500/10 px-5 py-3 text-sm font-bold text-blue-300 transition hover:bg-blue-500/20"
            >
              📄 {isTurkish ? "PDF / Yazdır" : "PDF / Print"}
            </button>
          </div>
        </div>

        {/* SAFEBASE_METHOD_LIBRARY_START */}
        <section className="mb-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-slate-900 p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-400">
                {isTurkish
                  ? "Hazır Method Statement Kütüphanesi"
                  : "Ready Method Statement Library"}
              </p>

              <h2 className="mt-2 text-2xl font-black">
                {isTurkish
                  ? "Hazır bir çalışma yöntemiyle başlayın"
                  : "Start with a ready-made work method"}
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                {isTurkish
                  ? "Hazır içerikler başlangıç taslağıdır. Proje, saha, ekipman, ekip ve çalışma koşullarına göre yetkin kişi tarafından kontrol edilmeli ve düzenlenmelidir."
                  : "Ready-made content is a starting draft. It must be reviewed and adapted by a competent person for the project, site, equipment, workforce and actual working conditions."}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-slate-950/70 px-5 py-4 text-center">
              <p className="text-3xl font-black text-emerald-300">1</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                {isTurkish ? "Hazır Şablon" : "Ready Template"}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={loadWorkingAtHeightTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-emerald-500/50 hover:bg-emerald-500/[0.07]"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
                    🪜
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "Yüksekte Çalışma"
                        : "Working at Height"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Kapsam, PPE, PTW, ön kontroller, 7 iş adımı, tehlikeler, kontroller ve kurtarma düzenlemeleri."
                        : "Scope, PPE, PTW, pre-work controls, 7 work steps, hazards, controls and rescue arrangements."}
                    </p>
                  </div>
                </div>

                <span className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-emerald-400">
                  {isTurkish
                    ? "Şablonu Yükle"
                    : "Load Template"}
                </span>
              </div>
            </button>
          </div>
        </section>
        {/* SAFEBASE_METHOD_LIBRARY_END */}

        <section className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-bold">
            {isTurkish ? "Doküman Bilgileri" : "Document Information"}
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              ["project", isTurkish ? "Proje" : "Project", projectName, setProjectName],
              ["company", isTurkish ? "Şirket" : "Company", companyName, setCompanyName],
              ["location", isTurkish ? "Lokasyon" : "Location", location, setLocation],
              ["activity", isTurkish ? "Faaliyet" : "Activity", activity, setActivity],
              ["document", isTurkish ? "Doküman No" : "Document No", documentNo, setDocumentNo],
              ["revision", isTurkish ? "Revizyon" : "Revision", revision, setRevision],
              ["date", isTurkish ? "Tarih" : "Date", date, setDate],
            ].map(([key, label, value, setter]) => (
              <label key={key as string} className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  {label as string}
                </span>

                <input
                  type={key === "date" ? "date" : "text"}
                  value={value as string}
                  onChange={(event) =>
                    (setter as (value: string) => void)(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                />
              </label>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-2">
          {[
            ["scope", isTurkish ? "İşin Kapsamı" : "Scope of Work", scope, setScope],
            ["responsibilities", isTurkish ? "Görev ve Sorumluluklar" : "Responsibilities", responsibilities, setResponsibilities],
            ["competency", isTurkish ? "Yetkinlik ve Eğitim" : "Competency & Training", competency, setCompetency],
            ["ppe", "PPE", ppe, setPpe],
            ["tools", isTurkish ? "Araç ve Ekipmanlar" : "Tools & Equipment", toolsEquipment, setToolsEquipment],
            ["permits", isTurkish ? "İzinler / PTW" : "Permits / PTW", permits, setPermits],
            ["prework", isTurkish ? "İşe Başlamadan Önce" : "Pre-Work Requirements", preWorkRequirements, setPreWorkRequirements],
          ].map(([key, label, value, setter]) => (
            <article
              key={key as string}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <h3 className="font-bold">{label as string}</h3>

              <textarea
                value={value as string}
                onChange={(event) =>
                  (setter as (value: string) => void)(event.target.value)
                }
                rows={5}
                className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500"
              />
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-emerald-500/20 bg-slate-900/70 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold">
                {isTurkish
                  ? "Çalışma Metodu / İş Sırası"
                  : "Method / Sequence of Work"}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                {isTurkish
                  ? "İşi uygulanacağı sırayla adımlara ayırın."
                  : "Break the work into the sequence in which it will be performed."}
              </p>
            </div>

            <button
              type="button"
              onClick={addMethodStep}
              className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-400"
            >
              + {isTurkish ? "İş Adımı Ekle" : "Add Work Step"}
            </button>
          </div>

          <div className="mt-6 space-y-5">
            {methodSteps.map((item, index) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold text-emerald-300">
                    {isTurkish ? "İş Adımı" : "Work Step"} {index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() => removeMethodStep(item.id)}
                    className="text-sm font-semibold text-red-400 hover:text-red-300"
                  >
                    {isTurkish ? "Sil" : "Delete"}
                  </button>
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                  {[
                    ["step", isTurkish ? "İşin Yapılış Adımı" : "Work Sequence", item.step],
                    ["hazards", isTurkish ? "Tehlikeler" : "Hazards", item.hazards],
                    ["controls", isTurkish ? "Kontrol Önlemleri" : "Control Measures", item.controls],
                    ["responsible", isTurkish ? "Sorumlu" : "Responsible", item.responsible],
                  ].map(([field, label, value]) => (
                    <label key={field} className="block">
                      <span className="mb-2 block text-sm font-semibold text-slate-300">
                        {label}
                      </span>

                      <textarea
                        value={value}
                        onChange={(event) =>
                          updateMethodStep(
                            item.id,
                            field as keyof MethodStep,
                            event.target.value
                          )
                        }
                        rows={4}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none transition focus:border-emerald-500"
                      />
                    </label>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-3">
          {[
            ["emergency", isTurkish ? "Acil Durum Düzenlemeleri" : "Emergency Arrangements", emergencyArrangements, setEmergencyArrangements],
            ["environment", isTurkish ? "Çevresel Kontroller" : "Environmental Controls", environmentalControls, setEnvironmentalControls],
            ["references", isTurkish ? "Referanslar" : "References", references, setReferences],
          ].map(([key, label, value, setter]) => (
            <article
              key={key as string}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5"
            >
              <h3 className="font-bold">{label as string}</h3>

              <textarea
                value={value as string}
                onChange={(event) =>
                  (setter as (value: string) => void)(event.target.value)
                }
                rows={6}
                className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 outline-none transition focus:border-blue-500"
              />
            </article>
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-xl font-bold">
            {isTurkish ? "Onay" : "Approval"}
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              [isTurkish ? "Hazırlayan" : "Prepared By", preparedBy, setPreparedBy],
              [isTurkish ? "Kontrol Eden" : "Reviewed By", reviewedBy, setReviewedBy],
              [isTurkish ? "Onaylayan" : "Approved By", approvedBy, setApprovedBy],
            ].map(([label, value, setter]) => (
              <label key={label as string}>
                <span className="mb-2 block text-sm font-semibold text-slate-300">
                  {label as string}
                </span>

                <input
                  value={value as string}
                  onChange={(event) =>
                    (setter as (value: string) => void)(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
                />
              </label>
            ))}
          </div>
        </section>
      </div>
    
      <MethodStatementPrint
        isTurkish={isTurkish}
        projectName={projectName}
        companyName={companyName}
        location={location}
        activity={activity}
        documentNo={documentNo}
        revision={revision}
        date={date}
        scope={scope}
        responsibilities={responsibilities}
        competency={competency}
        ppe={ppe}
        toolsEquipment={toolsEquipment}
        permits={permits}
        preWorkRequirements={preWorkRequirements}
        methodSteps={methodSteps}
        emergencyArrangements={emergencyArrangements}
        environmentalControls={environmentalControls}
        references={references}
        preparedBy={preparedBy}
        reviewedBy={reviewedBy}
        approvedBy={approvedBy}
      />

</main>
  );
}
