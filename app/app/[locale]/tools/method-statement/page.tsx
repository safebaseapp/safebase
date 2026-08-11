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


  const loadHotWorkTemplate = () => {
    setActivity(isTurkish ? "Sıcak Çalışma" : "Hot Work");
    setDocumentNo("SB-MS-002");

    setScope(
      isTurkish
        ? "Bu Method Statement; kaynak, kesme, taşlama, lehimleme ve alev, kıvılcım veya yüksek sıcaklık oluşturan diğer sıcak çalışma faaliyetlerinin güvenli şekilde planlanması ve yürütülmesi için uygulanacak yöntemi tanımlar. Çalışma alanının hazırlanması, yanıcı maddelerin kontrolü, gerekli izinlerin alınması, yangın önleme tedbirleri, uygun PPE kullanımı, çalışma sırasında gözetim ve iş tamamlandıktan sonraki yangın kontrollerini kapsar."
        : "This Method Statement defines the safe method for planning and carrying out welding, cutting, grinding, brazing and other hot-work activities that generate flame, sparks or high temperatures. It covers preparation of the work area, control of combustible materials, required permits, fire-prevention measures, suitable PPE, monitoring during the work and post-work fire checks."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: Çalışmayı planlar, sıcak çalışma alanını kontrol eder, izin şartlarının sağlandığını doğrular ve uygulamayı gözetir.\nHSE Personeli: Risk değerlendirmesi, saha kontrolleri ve sıcak çalışma güvenlik gerekliliklerinin uygulanmasını destekler.\nYangın Gözcüsü: Çalışma sırasında ve saha prosedürünün gerektirdiği süre boyunca çalışma sonrasında yangın riskini izler ve uygun yangın söndürme ekipmanını hazır bulundurur.\nÇalışanlar: Onaylı çalışma yöntemine uyar, ekipmanı kullanım öncesi kontrol eder ve tehlikeli veya değişen koşulları bildirir."
        : "Site Supervisor: Plans the work, verifies the hot-work area, confirms permit requirements are satisfied and supervises implementation.\nHSE Personnel: Supports risk assessment, field verification and implementation of hot-work safety requirements.\nFire Watch: Monitors for fire during the work and for the period required by site procedures after completion, keeping suitable firefighting equipment immediately available.\nWorkers: Follow the approved work method, inspect equipment before use and report unsafe or changing conditions."
    );

    setCompetency(
      isTurkish
        ? "Sıcak çalışmayı gerçekleştiren personel yaptığı işe uygun eğitim, bilgi ve deneyime sahip olmalıdır. Kaynakçı veya ilgili operatör, kullanılan ekipmanı güvenli şekilde kullanabilecek yetkinlikte olmalıdır. Yangın gözcüsü yangın risklerini, alarm yöntemini ve mevcut yangın söndürme ekipmanının güvenli kullanımını bilmelidir."
        : "Personnel carrying out hot work shall have suitable training, knowledge and experience for the task. Welders or other operators shall be competent to use the relevant equipment safely. The fire watch shall understand fire hazards, alarm arrangements and the safe use of the available firefighting equipment."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• Isıya ve yapılan işe uygun eldiven\n• Aleve dayanıklı / uygun iş kıyafeti\n• Kaynak maskesi veya yapılan işe uygun yüz ve göz koruması\n• Gerektiğinde işitme koruması\n• Risk değerlendirmesine göre uygun solunum koruması"
        : "• Safety helmet\n• Safety footwear\n• Heat-resistant/task-appropriate gloves\n• Flame-resistant / suitable work clothing\n• Welding helmet or task-appropriate face and eye protection\n• Hearing protection where required\n• Suitable respiratory protection where required by the risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Kaynak / kesme / taşlama ekipmanı\n• Uygun ve kontrol edilmiş elektrik kabloları ve bağlantıları\n• Gaz tüpleri, regülatörler, hortumlar ve geri tepme emniyet tertibatları gerektiğinde\n• Kaynak perdeleri / kıvılcım bariyerleri\n• Uygun yangın söndürücü ekipman\n• Yanmaz örtü veya kıvılcım tutucu malzemeler\n• Bariyer ve uyarı levhaları\n• Gerektiğinde uygun gaz ölçüm cihazı"
        : "• Welding / cutting / grinding equipment\n• Suitable inspected electrical cables and connections\n• Gas cylinders, regulators, hoses and flashback protection where applicable\n• Welding screens / spark barriers\n• Suitable firefighting equipment\n• Fire-resistant blankets or spark-containment materials\n• Barricades and warning signs\n• Suitable gas-detection equipment where required"
    );

    setPermits(
      isTurkish
        ? "Geçerli Sıcak Çalışma İzni (Hot Work Permit) işe başlamadan önce alınmalı ve çalışma alanında doğrulanmalıdır. Risk değerlendirmesi, eş zamanlı işler, yangın riski ve saha prosedürüne göre gerekli gaz ölçümleri kontrol edilmelidir. İzin koşulları değişirse çalışma durdurulmalı ve izin yeniden değerlendirilmelidir."
        : "A valid Hot Work Permit shall be obtained and verified at the work area before work starts. The risk assessment, simultaneous activities, fire hazards and any atmospheric testing required by site procedures shall be reviewed. Work shall stop and the permit shall be reassessed if conditions change."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve Sıcak Çalışma İznini kontrol et.\n• Çalışma alanındaki yanıcı ve parlayıcı malzemeleri belirle ve mümkünse uzaklaştır.\n• Uzaklaştırılamayan yanıcı malzemeleri uygun yanmaz örtü veya bariyerle koru.\n• Kıvılcım ve sıcak parçacıkların alt seviyelere, açıklıklara veya bitişik alanlara ulaşma ihtimalini kontrol et.\n• Uygun yangın söndürme ekipmanını hazır bulundur.\n• Yangın gözcüsünü belirle ve görevlerini doğrula.\n• Kaynak, kesme veya taşlama ekipmanını kullanım öncesi kontrol et.\n• Gaz tüplerinin doğru konumlandırıldığını, sabitlendiğini ve bağlantıların uygun olduğunu doğrula.\n• Gerekliyse çalışma öncesi atmosfer / gaz ölçümünü gerçekleştir ve sonuçları izin şartlarına göre doğrula.\n• Yakındaki personeli ark ışını, kıvılcım, duman ve sıcak yüzeylerden korumak için alanı bariyerle."
        : "• Review the task-specific risk assessment and Hot Work Permit.\n• Identify combustible and flammable materials in the work area and remove them where reasonably practicable.\n• Protect combustible materials that cannot be removed using suitable fire-resistant covers or barriers.\n• Check whether sparks or hot particles could reach lower levels, openings or adjacent areas.\n• Provide suitable firefighting equipment.\n• Assign a fire watch and confirm their responsibilities.\n• Inspect welding, cutting or grinding equipment before use.\n• Verify gas cylinders are correctly positioned, secured and properly connected.\n• Where required, perform atmospheric / gas testing and verify results against permit requirements.\n• Barricade or screen the area to protect nearby personnel from arc radiation, sparks, fumes and hot surfaces."
    );

    setMethodSteps([
      {
        id: `hot-1-${Date.now()}`,
        step: isTurkish
          ? "Çalışmayı planla ve sıcak çalışma iznini doğrula."
          : "Plan the work and verify the Hot Work Permit.",
        hazards: isTurkish
          ? "Yetersiz planlama, izin şartlarının eksik olması, eş zamanlı işler."
          : "Inadequate planning, incomplete permit conditions and simultaneous activities.",
        controls: isTurkish
          ? "Risk değerlendirmesini ve izin şartlarını gözden geçir. İş kapsamını, çalışma yerini ve çevredeki faaliyetleri doğrula. Şartlar uygun değilse işe başlama."
          : "Review the risk assessment and permit conditions. Verify the work scope, location and surrounding activities. Do not start until conditions are acceptable.",
        responsible: isTurkish
          ? "Saha Süpervizörü / HSE"
          : "Site Supervisor / HSE",
      },
      {
        id: `hot-2-${Date.now()}`,
        step: isTurkish
          ? "Çalışma alanını hazırla ve yangın yükünü kontrol et."
          : "Prepare the work area and control the fire load.",
        hazards: isTurkish
          ? "Yanıcı maddelerin tutuşması, kıvılcımın çevre veya alt seviyelere yayılması."
          : "Ignition of combustible materials and spread of sparks to adjacent or lower areas.",
        controls: isTurkish
          ? "Yanıcı maddeleri uzaklaştır veya uygun şekilde koru. Açıklıkları ve kıvılcım geçiş yollarını kontrol et. Gerektiğinde yanmaz örtü ve kaynak perdesi kullan."
          : "Remove or adequately protect combustible materials. Control openings and potential spark paths. Use fire-resistant blankets and welding screens where required.",
        responsible: isTurkish
          ? "Süpervizör / Yangın Gözcüsü"
          : "Supervisor / Fire Watch",
      },
      {
        id: `hot-3-${Date.now()}`,
        step: isTurkish
          ? "Ekipmanı, enerji bağlantılarını ve gaz sistemlerini kontrol et."
          : "Inspect equipment, energy connections and gas systems.",
        hazards: isTurkish
          ? "Elektrik çarpması, ekipman arızası, gaz kaçağı, hortum veya regülatör arızası."
          : "Electric shock, equipment failure, gas leakage or hose/regulator failure.",
        controls: isTurkish
          ? "Ekipmanı kullanım öncesi kontrol et. Hasarlı kablo, hortum, regülatör veya ekipmanı kullanma. Gaz tüplerini dik ve sabit tut; uygun bağlantı ve geri tepme korumasını doğrula."
          : "Inspect equipment before use. Do not use damaged cables, hoses, regulators or equipment. Keep gas cylinders upright and secured and verify suitable connections and flashback protection.",
        responsible: isTurkish
          ? "Yetkin Operatör / Süpervizör"
          : "Competent Operator / Supervisor",
      },
      {
        id: `hot-4-${Date.now()}`,
        step: isTurkish
          ? "Yangın önleme düzenlemelerini ve gerekiyorsa gaz ölçümünü tamamla."
          : "Establish fire-prevention arrangements and atmospheric testing where required.",
        hazards: isTurkish
          ? "Yangın, patlama, yanıcı atmosfer veya yetersiz oksijen koşulları."
          : "Fire, explosion, flammable atmosphere or oxygen-deficient conditions.",
        controls: isTurkish
          ? "Uygun yangın söndürücüyü erişilebilir konuma yerleştir ve yangın gözcüsünü hazır bulundur. Saha prosedürü veya risk değerlendirmesi gerektiriyorsa yetkin kişi tarafından gaz ölçümü yap ve kabul kriterlerini doğrula."
          : "Position suitable firefighting equipment for immediate access and provide a fire watch. Where required by site procedure or risk assessment, conduct atmospheric testing by a competent person and verify acceptance criteria.",
        responsible: isTurkish
          ? "HSE / Yangın Gözcüsü / Yetkin Kişi"
          : "HSE / Fire Watch / Competent Person",
      },
      {
        id: `hot-5-${Date.now()}`,
        step: isTurkish
          ? "Sıcak çalışmayı kontrollü şekilde gerçekleştir."
          : "Perform the hot work under controlled conditions.",
        hazards: isTurkish
          ? "Kıvılcım, sıcak metal, ark ışını, yanık, duman, gürültü ve yangın."
          : "Sparks, hot metal, arc radiation, burns, fumes, noise and fire.",
        controls: isTurkish
          ? "Uygun PPE kullan. Kaynak perdelerini ve bariyerleri koru. Kıvılcım yönünü kontrol et. Havalandırmayı sürdür ve yangın gözcüsünün alanı sürekli izlemesini sağla."
          : "Use suitable PPE. Maintain welding screens and barriers. Control the direction of sparks. Maintain ventilation and ensure the fire watch continuously monitors the area.",
        responsible: isTurkish
          ? "Operatör / Yangın Gözcüsü"
          : "Operator / Fire Watch",
      },
      {
        id: `hot-6-${Date.now()}`,
        step: isTurkish
          ? "Çalışma koşullarındaki değişiklikleri izle ve gerektiğinde işi durdur."
          : "Monitor changing conditions and stop work where necessary.",
        hazards: isTurkish
          ? "Yeni yanıcı maddeler, gaz birikmesi, havalandırma kaybı, izin şartlarının değişmesi."
          : "New combustible materials, gas accumulation, loss of ventilation or changed permit conditions.",
        controls: isTurkish
          ? "Alan ve çevre koşullarını izlemeye devam et. İzin şartları geçersiz hale gelirse veya yeni tehlike oluşursa sıcak çalışmayı derhal durdur ve yeniden değerlendir."
          : "Continue monitoring the work area and surrounding conditions. Stop hot work immediately and reassess if permit conditions become invalid or new hazards arise.",
        responsible: isTurkish
          ? "Tüm Çalışanlar / Süpervizör"
          : "All Workers / Supervisor",
      },
      {
        id: `hot-7-${Date.now()}`,
        step: isTurkish
          ? "İş tamamlandıktan sonra ekipmanı güvenli şekilde kapat."
          : "Shut down equipment safely after completion.",
        hazards: isTurkish
          ? "Sıcak yüzeyler, basınçlı gaz, enerji bırakılması ve kontrolsüz ekipman."
          : "Hot surfaces, pressurised gas, residual energy and uncontrolled equipment.",
        controls: isTurkish
          ? "Ekipmanı kapat ve enerjisini güvenli şekilde kes. Gaz tüplerinin vanalarını kapat. Sıcak parçaları belirle ve güvenli soğuma alanında tut."
          : "Shut down and safely isolate equipment. Close gas-cylinder valves. Identify hot components and place them in a safe cooling area.",
        responsible: isTurkish
          ? "Operatör / Süpervizör"
          : "Operator / Supervisor",
      },
      {
        id: `hot-8-${Date.now()}`,
        step: isTurkish
          ? "Çalışma sonrası yangın kontrolünü gerçekleştir ve alanı teslim et."
          : "Conduct the post-work fire check and close out the area.",
        hazards: isTurkish
          ? "Gizli kor, gecikmeli tutuşma, sıcak metal veya fark edilmeyen yangın başlangıcı."
          : "Hidden embers, delayed ignition, hot metal or undetected fire development.",
        controls: isTurkish
          ? "Çalışma alanını, alt seviyeleri ve kıvılcım ulaşabilecek bitişik bölgeleri kontrol et. Yangın gözcülüğünü saha prosedürü ve izin şartlarında belirtilen süre boyunca sürdür. Alan güvenli doğrulanmadan izlemeyi sonlandırma."
          : "Inspect the work area, lower levels and adjacent locations that may have received sparks. Continue fire-watch monitoring for the period specified by site procedures and permit conditions. Do not close the monitoring period until the area is confirmed safe.",
        responsible: isTurkish
          ? "Yangın Gözcüsü / Süpervizör"
          : "Fire Watch / Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Yangın veya kontrolsüz tutuşma halinde sıcak çalışma derhal durdurulmalı, enerji ve gaz kaynakları güvenli ise izole edilmeli ve saha alarm / acil durum prosedürü uygulanmalıdır. Eğitimli personel yalnızca güvenli olması halinde uygun yangın söndürücü ile ilk müdahaleyi gerçekleştirmelidir. Alan tahliye yolları ve acil durum erişimi çalışma boyunca açık tutulmalıdır."
        : "In the event of fire or uncontrolled ignition, hot work shall stop immediately, energy and gas sources shall be isolated where safe to do so, and the site alarm / emergency procedure shall be activated. Trained personnel may use suitable firefighting equipment for initial response only where it is safe to do so. Evacuation routes and emergency access shall remain clear throughout the work."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Kaynak çubukları, taşlama diskleri, metal parçaları ve diğer atıkları belirlenen atık sistemine göre topla. Kaynak dumanı ve diğer emisyonları uygun havalandırma ile kontrol et. Yağ, yakıt, kimyasal veya diğer maddelerin zemine ve drenaja kontrolsüz bırakılmasını önle. Çalışma sonunda alanı temiz ve güvenli bırak."
        : "Collect welding consumables, grinding discs, metal debris and other waste in accordance with the designated waste-management system. Control welding fumes and other emissions using suitable ventilation. Prevent uncontrolled release of oils, fuels, chemicals or other substances to ground or drainage systems. Leave the area clean and safe after completion."
    );

    setReferences(
      isTurkish
        ? "• SafeBase görev bazlı risk değerlendirmesi\n• OSHA – Welding, Cutting, and Brazing (29 CFR 1910 Subpart Q)\n• OSHA – Fire Prevention and Protection requirements\n• Proje / saha Sıcak Çalışma ve PTW prosedürleri\n• Kullanılan ekipmanın üretici talimatları"
        : "• SafeBase task-specific risk assessment\n• OSHA – Welding, Cutting, and Brazing (29 CFR 1910 Subpart Q)\n• OSHA – Fire Prevention and Protection requirements\n• Project / site Hot Work and PTW procedures\n• Manufacturer instructions for equipment used"
    );
  };


  const loadConfinedSpaceTemplate = () => {
    setActivity(
      isTurkish ? "Kapalı Alana Giriş" : "Confined Space Entry"
    );

    setDocumentNo("SB-MS-003");

    setScope(
      isTurkish
        ? "Bu Method Statement; tank, vessel, pit, manhole, kanal, silo ve benzeri kapalı veya kısıtlı alanlara güvenli giriş yapılması, çalışma süresince güvenli koşulların korunması ve alanın kontrollü şekilde terk edilmesi için uygulanacak yöntemi tanımlar. Çalışma; giriş izni, enerji izolasyonu, atmosfer testi, havalandırma, giriş gözetimi, iletişim, kurtarma hazırlığı ve çalışma sonrası kapatma faaliyetlerini kapsar."
        : "This Method Statement defines the safe method for entry into tanks, vessels, pits, manholes, ducts, silos and similar confined or restricted spaces, maintaining safe conditions during the work and completing the entry under controlled conditions. It covers entry permitting, energy isolation, atmospheric testing, ventilation, entry monitoring, communication, rescue preparedness and post-work closeout."
    );

    setResponsibilities(
      isTurkish
        ? "Giriş Süpervizörü: Giriş koşullarını, izolasyonları, izin şartlarını, atmosfer testlerini ve kurtarma hazırlığını doğrular; girişe izin verir ve gerektiğinde girişi sonlandırır.\nGözcü / Attendant: Kapalı alan dışında görev yapar, içerideki personeli takip eder, iletişimi sürdürür, koşulları izler ve gerekli durumda tahliyeyi başlatır. Yetkisi yoksa kurtarma amacıyla alana girmez.\nYetkili Giriş Yapan Personel: Alanın tehlikelerini bilir, gerekli PPE ve ekipmanı kullanır, gözcü ile iletişimi sürdürür ve alarm veya tehlike halinde alanı terk eder.\nHSE Personeli: Risk değerlendirmesi, gaz ölçümü, saha kontrolü ve prosedür gerekliliklerinin uygulanmasını destekler."
        : "Entry Supervisor: Verifies entry conditions, isolations, permit requirements, atmospheric testing and rescue preparedness; authorizes entry and terminates entry when required.\nAttendant: Remains outside the confined space, tracks entrants, maintains communication, monitors conditions and initiates evacuation where required. The attendant shall not enter for rescue unless specifically trained, equipped and authorized.\nAuthorized Entrants: Understand the hazards, use required PPE and equipment, maintain communication with the attendant and exit when alarms or unsafe conditions occur.\nHSE Personnel: Supports risk assessment, atmospheric testing, field verification and implementation of procedural requirements."
    );

    setCompetency(
      isTurkish
        ? "Kapalı alana girişte görev alan giriş süpervizörü, gözcü, yetkili giriş yapan personel ve gerektiğinde kurtarma ekibi görevlerine uygun eğitim, bilgi ve yetkinliğe sahip olmalıdır. Personel kapalı alan tehlikelerini, atmosfer testi sonuçlarının anlamını, izolasyon gerekliliklerini, iletişim yöntemlerini ve acil durumda yapılacakları bilmelidir."
        : "The entry supervisor, attendant, authorized entrants and rescue personnel where applicable shall have training, knowledge and competency appropriate to their assigned duties. Personnel shall understand confined-space hazards, atmospheric test results, isolation requirements, communication arrangements and emergency actions."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Uygun iş kıyafeti\n• Göreve uygun göz / yüz koruması\n• Risk değerlendirmesine göre uygun solunum koruması\n• Gerekliyse tam vücut emniyet kemeri ve kurtarma bağlantı sistemi\n• Kimyasal veya proses maruziyetine göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• Suitable work clothing\n• Task-appropriate eye / face protection\n• Suitable respiratory protection where required by the risk assessment\n• Full-body harness and retrieval connection where required\n• Additional PPE based on chemical or process exposure"
    );

    setToolsEquipment(
      isTurkish
        ? "• Kalibre edilmiş uygun çoklu gaz ölçüm cihazı\n• Mekanik havalandırma / hava üfleme ekipmanı\n• Uygun iletişim ekipmanı\n• Tripod, retrieval winch veya uygun kurtarma sistemi gerektiğinde\n• Tam vücut emniyet kemeri gerektiğinde\n• Bariyer ve uyarı levhaları\n• Ex-proof / intrinsically safe ekipman gerektiğinde\n• Uygun aydınlatma\n• LOTO / izolasyon ekipmanı\n• Kurtarma ve ilk yardım ekipmanı"
        : "• Suitable calibrated multi-gas detector\n• Mechanical ventilation / air-moving equipment\n• Suitable communication equipment\n• Tripod, retrieval winch or suitable rescue system where required\n• Full-body harness where required\n• Barricades and warning signs\n• Explosion-protected / intrinsically safe equipment where required\n• Suitable lighting\n• LOTO / isolation equipment\n• Rescue and first-aid equipment"
    );

    setPermits(
      isTurkish
        ? "Geçerli Kapalı Alana Giriş İzni işe başlamadan önce hazırlanmalı ve giriş süpervizörü tarafından onaylanmalıdır. İzin üzerinde giriş yapılacak alan, çalışma amacı, izin süresi, yetkili giriş yapan personel, gözcü, izolasyonlar, atmosfer testi sonuçları, gerekli PPE, iletişim ve kurtarma düzenlemeleri doğrulanmalıdır. Çalışma koşulları değişirse veya izin süresi sona ererse giriş durdurulmalı ve izin yeniden değerlendirilmelidir."
        : "A valid Confined Space Entry Permit shall be prepared before entry and authorized by the entry supervisor. The permit shall verify the space to be entered, purpose of entry, permit duration, authorized entrants, attendant, isolations, atmospheric test results, required PPE, communication and rescue arrangements. Entry shall stop and the permit shall be reassessed if conditions change or the permit expires."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Kapalı alanı ve potansiyel tehlikeleri belirle.\n• Göreve özel risk değerlendirmesini ve giriş iznini kontrol et.\n• Prosese bağlı tüm enerji ve malzeme kaynaklarını güvenli şekilde izole et ve LOTO uygula.\n• Gerekli boru hatlarını blank/blind veya uygun izolasyon yöntemiyle güvenli hale getir.\n• Alanın giriş ve çıkış yollarını kontrol et.\n• Atmosferi uygun ve kalibre edilmiş gaz ölçüm cihazıyla test et.\n• Oksijen, yanıcı gaz/buhar ve potansiyel toksik maddeleri değerlendir.\n• Gerekiyorsa mekanik havalandırmayı kur ve yeterliliğini doğrula.\n• Yetkili giriş yapan personeli ve gözcüyü belirle.\n• İçerideki personelin takip yöntemini ve iletişim sistemini doğrula.\n• Kurtarma yöntemini, kurtarma ekipmanını ve görevli personeli girişten önce hazırla.\n• Çevredeki eş zamanlı işleri ve giriş alanına yetkisiz erişimi kontrol et."
        : "• Identify the confined space and potential hazards.\n• Review the task-specific risk assessment and entry permit.\n• Safely isolate all process energy and material sources and apply LOTO.\n• Secure connected lines using blanking/blinding or another suitable isolation method where required.\n• Inspect entry and exit routes.\n• Test the atmosphere using a suitable calibrated gas detector.\n• Evaluate oxygen, flammable gases/vapours and potential toxic contaminants.\n• Establish mechanical ventilation where required and verify its effectiveness.\n• Assign authorized entrants and an attendant.\n• Verify entrant tracking and communication arrangements.\n• Prepare the rescue method, rescue equipment and responsible personnel before entry.\n• Control simultaneous activities and unauthorized access around the entry point."
    );

    setMethodSteps([
      {
        id: `cs-1-${Date.now()}`,
        step: isTurkish
          ? "Kapalı alanı değerlendir ve giriş gerekliliğini doğrula."
          : "Evaluate the confined space and confirm the need for entry.",
        hazards: isTurkish
          ? "Tanımlanmamış kapalı alan tehlikeleri, gereksiz giriş, yetersiz planlama."
          : "Unidentified confined-space hazards, unnecessary entry and inadequate planning.",
        controls: isTurkish
          ? "Mümkünse işi alana girmeden gerçekleştir. Giriş gerekiyorsa kapalı alanın özelliklerini, geçmiş prosesini ve potansiyel tehlikelerini risk değerlendirmesinde belirle."
          : "Perform the task without entry where reasonably practicable. Where entry is required, identify the space characteristics, previous process conditions and potential hazards in the risk assessment.",
        responsible: isTurkish
          ? "Giriş Süpervizörü / HSE"
          : "Entry Supervisor / HSE",
      },
      {
        id: `cs-2-${Date.now()}`,
        step: isTurkish
          ? "Enerji ve proses kaynaklarını izole et."
          : "Isolate energy and process sources.",
        hazards: isTurkish
          ? "Beklenmeyen enerji, sıvı/gaz girişi, hareketli ekipman, basınç veya engulfment."
          : "Unexpected energy, liquid/gas ingress, moving equipment, pressure or engulfment.",
        controls: isTurkish
          ? "LOTO uygula. Elektrik, mekanik, hidrolik, pnömatik ve proses kaynaklarını izole et. Gerekli boru ve hatlarda uygun blank/blind veya pozitif izolasyon kullan. İzolasyonları giriş öncesi doğrula."
          : "Apply LOTO. Isolate electrical, mechanical, hydraulic, pneumatic and process sources. Use suitable blanking/blinding or positive isolation on connected lines where required. Verify isolations before entry.",
        responsible: isTurkish
          ? "Yetkin Kişi / Giriş Süpervizörü"
          : "Competent Person / Entry Supervisor",
      },
      {
        id: `cs-3-${Date.now()}`,
        step: isTurkish
          ? "Atmosfer testi gerçekleştir."
          : "Conduct atmospheric testing.",
        hazards: isTurkish
          ? "Oksijen yetersizliği veya zenginliği, yanıcı atmosfer, toksik gaz veya buhar."
          : "Oxygen deficiency/enrichment, flammable atmosphere, toxic gases or vapours.",
        controls: isTurkish
          ? "Kalibre edilmiş uygun cihazla giriş öncesi atmosfer testi yap. Alanın farklı seviyelerini ve gerekli bölgelerini ölç. Kabul kriterleri sağlanmadan girişe izin verme."
          : "Conduct pre-entry atmospheric testing using suitable calibrated equipment. Test relevant levels and locations within the space. Do not authorize entry until acceptable conditions are confirmed.",
        responsible: isTurkish
          ? "Yetkin Gaz Ölçüm Personeli / HSE"
          : "Competent Gas Tester / HSE",
      },
      {
        id: `cs-4-${Date.now()}`,
        step: isTurkish
          ? "Havalandırma ve giriş düzenlemelerini kur."
          : "Establish ventilation and entry arrangements.",
        hazards: isTurkish
          ? "Atmosferin bozulması, yetersiz hava değişimi, uygunsuz erişim veya çıkış."
          : "Atmospheric deterioration, inadequate air exchange or unsafe access/egress.",
        controls: isTurkish
          ? "Gerekiyorsa mekanik havalandırma sağla. Hava girişini temiz bir kaynaktan al. Giriş ve çıkış yolunu açık tut; ekipmanın tahliyeyi engellemesini önle."
          : "Provide mechanical ventilation where required. Draw ventilation air from a clean source. Keep entry and exit routes clear and prevent equipment from obstructing evacuation.",
        responsible: isTurkish
          ? "Giriş Süpervizörü"
          : "Entry Supervisor",
      },
      {
        id: `cs-5-${Date.now()}`,
        step: isTurkish
          ? "Gözcü, iletişim ve kurtarma hazırlığını doğrula."
          : "Verify attendant, communication and rescue readiness.",
        hazards: isTurkish
          ? "İçerideki personelin takip edilememesi, iletişim kaybı, gecikmiş kurtarma."
          : "Loss of entrant tracking, communication failure or delayed rescue.",
        controls: isTurkish
          ? "Gözcüyü giriş noktasında görevlendir. İçerideki personeli sürekli takip et. İletişim yöntemini test et. Kurtarma planı ve ekipmanının hazır olduğunu doğrula."
          : "Assign an attendant at the entry point. Continuously track entrants. Test the communication method. Confirm the rescue plan and rescue equipment are ready.",
        responsible: isTurkish
          ? "Giriş Süpervizörü / Gözcü"
          : "Entry Supervisor / Attendant",
      },
      {
        id: `cs-6-${Date.now()}`,
        step: isTurkish
          ? "Kapalı alana kontrollü giriş yap ve çalışmayı gerçekleştir."
          : "Enter the confined space under controlled conditions and perform the work.",
        hazards: isTurkish
          ? "Atmosferik maruziyet, fiziksel tehlikeler, sıcaklık stresi, ekipman veya proses tehlikeleri."
          : "Atmospheric exposure, physical hazards, heat stress, equipment or process hazards.",
        controls: isTurkish
          ? "Sadece izin üzerinde yetkilendirilmiş personelin girişine izin ver. Gerekli PPE ve ekipmanı kullan. Gözcü ile iletişimi sürdür. Atmosferi ve çalışma koşullarını izin şartlarına göre izlemeye devam et."
          : "Allow entry only by personnel authorized on the permit. Use required PPE and equipment. Maintain communication with the attendant. Continue monitoring atmosphere and work conditions as required by the permit.",
        responsible: isTurkish
          ? "Yetkili Giriş Yapan Personel / Gözcü"
          : "Authorized Entrants / Attendant",
      },
      {
        id: `cs-7-${Date.now()}`,
        step: isTurkish
          ? "Tehlikeli veya değişen koşullarda tahliyeyi başlat."
          : "Initiate evacuation when unsafe or changing conditions occur.",
        hazards: isTurkish
          ? "Gaz alarmı, havalandırma kaybı, proses değişikliği, çalışan rahatsızlığı veya iletişim kaybı."
          : "Gas alarm, ventilation failure, process change, worker distress or communication loss.",
        controls: isTurkish
          ? "Alarm, yasak koşul, personelde maruziyet belirtisi veya gözcü/giriş süpervizörü talimatı halinde personel alanı derhal terk etmelidir. Giriş şartları yeniden doğrulanmadan yeniden giriş yapılmamalıdır."
          : "Entrants shall exit immediately following an alarm, prohibited condition, signs of exposure or instruction from the attendant or entry supervisor. Re-entry shall not occur until entry conditions are re-established.",
        responsible: isTurkish
          ? "Tüm Giriş Personeli / Gözcü"
          : "All Entrants / Attendant",
      },
      {
        id: `cs-8-${Date.now()}`,
        step: isTurkish
          ? "Çalışmayı tamamla, personeli say ve giriş iznini kapat."
          : "Complete the work, account for personnel and close the entry permit.",
        hazards: isTurkish
          ? "İçeride personel veya ekipman kalması, izolasyonların erken kaldırılması, kontrolsüz yeniden devreye alma."
          : "Personnel or equipment remaining inside, premature removal of isolations or uncontrolled recommissioning.",
        controls: isTurkish
          ? "Tüm personelin alanı terk ettiğini doğrula. Alet, ekipman ve atıkları çıkar. Giriş süpervizörü izni kapatsın. İzolasyonlar yalnızca uygun yetkilendirme ve kontrollü devreye alma prosedürüyle kaldırılsın."
          : "Confirm all personnel have exited. Remove tools, equipment and waste. The entry supervisor shall close the permit. Remove isolations only under proper authorization and controlled recommissioning procedures.",
        responsible: isTurkish
          ? "Giriş Süpervizörü"
          : "Entry Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Kapalı alana giriş başlamadan önce göreve uygun bir kurtarma yöntemi belirlenmeli ve kurtarma ekipmanı hazır olmalıdır. Mümkün olduğunda giriş yapmadan kurtarma yöntemleri tercih edilmelidir. Gözcü yetkisi, eğitimi ve ekipmanı bulunmadıkça kurtarma amacıyla alana girmemelidir. Acil durumda giriş durdurulmalı, alarm verilerek saha acil durum prosedürü uygulanmalı ve kurtarma ekibi devreye alınmalıdır."
        : "A task-appropriate rescue method shall be established and rescue equipment made ready before confined-space entry begins. Non-entry rescue methods should be used where feasible. The attendant shall not enter the space for rescue unless trained, equipped and specifically authorized. In an emergency, entry shall stop, the alarm shall be raised, the site emergency procedure implemented and the rescue team activated."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Kapalı alan içindeki atık, sludge, kimyasal kalıntı veya diğer maddeler proje atık yönetim sistemine göre kontrol edilmelidir. Havalandırma çıkışının diğer çalışanları tehlikeli gaz veya buhara maruz bırakmaması sağlanmalıdır. Dökülme veya drenaja kontrolsüz boşaltım önlenmeli ve çalışma sonunda alan temiz bırakılmalıdır."
        : "Waste, sludge, chemical residues and other materials within the confined space shall be managed in accordance with the project waste-management system. Ventilation exhaust shall not expose other personnel to hazardous gases or vapours. Uncontrolled spills or discharge to drainage shall be prevented and the area left clean after completion."
    );

    setReferences(
      isTurkish
        ? "• SafeBase görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1910.146 – Permit-Required Confined Spaces\n• OSHA 29 CFR 1926 Subpart AA – Confined Spaces in Construction\n• Proje / saha Kapalı Alana Giriş ve LOTO prosedürleri\n• Gaz ölçüm cihazı ve kullanılan ekipmanların üretici talimatları"
        : "• SafeBase task-specific risk assessment\n• OSHA 29 CFR 1910.146 – Permit-Required Confined Spaces\n• OSHA 29 CFR 1926 Subpart AA – Confined Spaces in Construction\n• Project / site Confined Space Entry and LOTO procedures\n• Manufacturer instructions for gas detectors and equipment used"
    );
  };


  const loadLotoTemplate = () => {
    setActivity(isTurkish ? "LOTO / Enerji İzolasyonu" : "LOTO / Energy Isolation");
    setDocumentNo("SB-MS-004");

    setScope(
      isTurkish
        ? "Bu Method Statement; bakım, onarım, temizlik, ayar veya müdahale öncesinde tehlikeli enerji kaynaklarının belirlenmesi, izole edilmesi, kilitlenmesi ve etiketlenmesi, sıfır enerji durumunun doğrulanması ve çalışma tamamlandıktan sonra kontrollü yeniden devreye alma yöntemini tanımlar."
        : "This Method Statement defines the safe method for identifying hazardous energy sources, isolating, locking and tagging them, verifying zero-energy condition and controlled recommissioning before maintenance, repair, cleaning, adjustment or intervention."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: İzolasyon kapsamını doğrular ve çalışmayı koordine eder.\nYetkili LOTO Personeli: Enerji kaynaklarını belirler, izolasyonu uygular, kilit ve etiketleri takar ve sıfır enerji durumunu doğrular.\nHSE Personeli: Risk değerlendirmesi ve saha kontrollerini destekler.\nÇalışanlar: İzolasyon sınırlarına uyar ve başkasının kilit veya etiketini kaldırmaz."
        : "Site Supervisor: Confirms the isolation scope and coordinates the work.\nAuthorized LOTO Personnel: Identify energy sources, apply isolations, install locks and tags and verify zero-energy condition.\nHSE Personnel: Support risk assessment and field verification.\nWorkers: Respect isolation boundaries and shall not remove another person's lock or tag."
    );

    setCompetency(
      isTurkish
        ? "LOTO uygulayan personel enerji izolasyonu, kilitleme/etiketleme, depolanmış enerji ve sıfır enerji doğrulama konusunda eğitimli ve yetkili olmalıdır."
        : "Personnel applying LOTO shall be trained and authorized in energy isolation, lockout/tagout, stored energy and zero-energy verification."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Uygun iş kıyafeti\n• Göreve uygun göz / yüz koruması\n• Elektrik riski varsa uygun elektrik / arc-rated PPE"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• Suitable work clothing\n• Task-appropriate eye / face protection\n• Suitable electrical / arc-rated PPE where required"
    );

    setToolsEquipment(
      isTurkish
        ? "• Onaylı kişisel LOTO kilitleri\n• LOTO etiketleri\n• Hasplar / lock box\n• Uygun izolasyon ekipmanı\n• Gerilim test cihazı gerektiğinde\n• Bariyer ve uyarı levhaları"
        : "• Approved personal LOTO locks\n• LOTO tags\n• Hasps / lock box\n• Suitable isolation equipment\n• Voltage tester where required\n• Barricades and warning signs"
    );

    setPermits(
      isTurkish
        ? "İlgili LOTO / enerji izolasyon prosedürü uygulanmalı ve gerekiyorsa çalışma izniyle ilişkilendirilmelidir. Tüm enerji kaynakları ve izolasyon noktaları işe başlamadan önce doğrulanmalıdır."
        : "The applicable LOTO / energy-isolation procedure shall be implemented and linked to the work permit where required. All energy sources and isolation points shall be verified before work begins."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Tüm enerji kaynaklarını belirle.\n• Elektrik, mekanik, hidrolik, pnömatik, termal ve proses enerjilerini değerlendir.\n• Doğru izolasyon noktalarını belirle.\n• Ekipmanı kontrollü şekilde durdur.\n• Enerji kaynaklarını izole et.\n• Kilit ve etiketleri uygula.\n• Depolanmış / artık enerjiyi boşalt veya güvenli hale getir.\n• Sıfır enerji durumunu doğrula."
        : "• Identify all energy sources.\n• Evaluate electrical, mechanical, hydraulic, pneumatic, thermal and process energy.\n• Identify correct isolation points.\n• Shut down equipment in a controlled manner.\n• Isolate energy sources.\n• Apply locks and tags.\n• Release or secure stored / residual energy.\n• Verify zero-energy condition."
    );

    setMethodSteps([
      {
        id: `loto-1-${Date.now()}`,
        step: isTurkish ? "İzolasyon kapsamını ve enerji kaynaklarını belirle." : "Identify the isolation scope and energy sources.",
        hazards: isTurkish ? "Tanımlanmamış enerji kaynağı veya eksik izolasyon." : "Unidentified energy source or incomplete isolation.",
        controls: isTurkish ? "Ekipman ve proses üzerindeki tüm enerji kaynaklarını belirle ve izolasyon planını doğrula." : "Identify all energy sources associated with the equipment/process and verify the isolation plan.",
        responsible: isTurkish ? "Süpervizör / Yetkili LOTO Personeli" : "Supervisor / Authorized LOTO Person",
      },
      {
        id: `loto-2-${Date.now()}`,
        step: isTurkish ? "Ekipmanı kontrollü şekilde durdur." : "Shut down the equipment in a controlled manner.",
        hazards: isTurkish ? "Beklenmeyen hareket veya proses etkisi." : "Unexpected movement or process effect.",
        controls: isTurkish ? "Normal durdurma prosedürünü uygula ve etkilenen personeli bilgilendir." : "Apply the normal shutdown procedure and inform affected personnel.",
        responsible: isTurkish ? "Operatör / Süpervizör" : "Operator / Supervisor",
      },
      {
        id: `loto-3-${Date.now()}`,
        step: isTurkish ? "Enerji kaynaklarını izole et." : "Isolate energy sources.",
        hazards: isTurkish ? "Elektrik, basınç, hidrolik, pnömatik, mekanik veya proses enerjisi." : "Electrical, pressure, hydraulic, pneumatic, mechanical or process energy.",
        controls: isTurkish ? "Tüm enerji kaynaklarını uygun izolasyon noktalarından ayır ve güvenli konuma getir." : "Isolate all energy sources at appropriate isolation points and place them in a safe state.",
        responsible: isTurkish ? "Yetkili LOTO Personeli" : "Authorized LOTO Person",
      },
      {
        id: `loto-4-${Date.now()}`,
        step: isTurkish ? "Kilit ve etiketleri uygula." : "Apply locks and tags.",
        hazards: isTurkish ? "İzolasyonun yetkisiz kaldırılması." : "Unauthorized removal of isolation.",
        controls: isTurkish ? "Her yetkili çalışan kendi kişisel kilit ve etiketini prosedüre göre uygulasın." : "Each authorized worker shall apply their personal lock and tag in accordance with the procedure.",
        responsible: isTurkish ? "Yetkili LOTO Personeli" : "Authorized LOTO Person",
      },
      {
        id: `loto-5-${Date.now()}`,
        step: isTurkish ? "Depolanmış enerjiyi güvenli hale getir." : "Control stored energy.",
        hazards: isTurkish ? "Basınç, yay, yerçekimi, kondansatör veya sıcaklık enerjisi." : "Pressure, springs, gravity, capacitors or thermal energy.",
        controls: isTurkish ? "Depolanmış enerjiyi boşalt, bloke et, sabitle veya güvenli seviyeye indir." : "Release, block, secure or otherwise reduce stored energy to a safe condition.",
        responsible: isTurkish ? "Yetkili Personel" : "Authorized Person",
      },
      {
        id: `loto-6-${Date.now()}`,
        step: isTurkish ? "Sıfır enerji durumunu doğrula." : "Verify zero-energy condition.",
        hazards: isTurkish ? "İzolasyonun başarısız olması veya artık enerji." : "Isolation failure or residual energy.",
        controls: isTurkish ? "Uygun test ve doğrulama yöntemiyle ekipmanın enerjisiz olduğunu doğrula. Elektrik için uygun test-before-touch yöntemi uygula." : "Verify de-energization using an appropriate test method. For electrical systems apply suitable test-before-touch verification.",
        responsible: isTurkish ? "Yetkili LOTO Personeli" : "Authorized LOTO Person",
      },
      {
        id: `loto-7-${Date.now()}`,
        step: isTurkish ? "Çalışmayı izolasyon altında gerçekleştir." : "Perform the work under isolation.",
        hazards: isTurkish ? "İzolasyonun değiştirilmesi, yeni enerji kaynağı veya saha koşulu." : "Isolation alteration, new energy source or changing conditions.",
        controls: isTurkish ? "LOTO sınırlarını koru. İzolasyon değişirse işi durdur ve yeniden değerlendir." : "Maintain LOTO boundaries. Stop work and reassess if the isolation changes.",
        responsible: isTurkish ? "Tüm Çalışanlar / Süpervizör" : "All Workers / Supervisor",
      },
      {
        id: `loto-8-${Date.now()}`,
        step: isTurkish ? "Kontrollü yeniden devreye alma yap." : "Perform controlled recommissioning.",
        hazards: isTurkish ? "Personel veya ekipman hazır değilken enerji verilmesi." : "Re-energization while personnel or equipment are not ready.",
        controls: isTurkish ? "Alanı kontrol et, personeli bilgilendir, kişisel kilitlerin yetkili kişilerce kaldırıldığını doğrula ve enerjiyi kontrollü şekilde geri ver." : "Inspect the area, notify personnel, verify personal locks are removed by authorized persons and restore energy in a controlled manner.",
        responsible: isTurkish ? "Süpervizör / Yetkili LOTO Personeli" : "Supervisor / Authorized LOTO Person",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Beklenmeyen enerji verme, ekipman hareketi veya proses salımı halinde çalışma derhal durdurulmalı, alan güvenli hale getirilmeli ve ilgili acil durum prosedürü uygulanmalıdır."
        : "In the event of unexpected energization, equipment movement or process release, work shall stop immediately, the area shall be made safe and the applicable emergency procedure implemented."
    );

    setEnvironmentalControls(
      isTurkish
        ? "İzolasyon sırasında oluşabilecek proses sıvıları, yağ veya kimyasallar kontrollü şekilde toplanmalı; dökülme ve drenaja kontrolsüz boşaltım önlenmelidir."
        : "Process liquids, oils or chemicals released during isolation shall be collected in a controlled manner and uncontrolled spills or discharge to drainage prevented."
    );

    setReferences(
      isTurkish
        ? "• SafeBase görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1910.147 – Control of Hazardous Energy (Lockout/Tagout)\n• Proje / saha LOTO prosedürü\n• Kullanılan ekipmanın üretici talimatları"
        : "• SafeBase task-specific risk assessment\n• OSHA 29 CFR 1910.147 – Control of Hazardous Energy (Lockout/Tagout)\n• Project / site LOTO procedure\n• Manufacturer instructions for equipment used"
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
              <p className="text-3xl font-black text-emerald-300">4</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                {isTurkish ? "Hazır Şablon" : "Ready Template"}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
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
            
            <button
              type="button"
              onClick={loadHotWorkTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-orange-500/50 hover:bg-orange-500/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
                    🔥
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish ? "Sıcak Çalışma" : "Hot Work"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Kaynak, kesme ve taşlama için PTW, yangın önleme, gaz kontrolü, yangın gözcüsü ve 8 iş adımı."
                        : "PTW, fire prevention, gas controls, fire watch and 8 work steps for welding, cutting and grinding."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-orange-400">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={loadConfinedSpaceTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-cyan-500/50 hover:bg-cyan-500/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-2xl">
                    🕳️
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "Kapalı Alana Giriş"
                        : "Confined Space Entry"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Giriş izni, LOTO, gaz ölçümü, havalandırma, gözcü, kurtarma düzenlemeleri ve 8 iş adımı."
                        : "Entry permit, LOTO, gas testing, ventilation, attendant, rescue arrangements and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-cyan-400">
                  {isTurkish
                    ? "Şablonu Yükle"
                    : "Load Template"}
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={loadLotoTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-emerald-500/50 hover:bg-emerald-500/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-2xl">
                    🔒
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish ? "LOTO / Enerji İzolasyonu" : "LOTO / Energy Isolation"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Enerji kaynakları, kilit/etiket, depolanmış enerji, sıfır enerji doğrulama ve yeniden devreye alma."
                        : "Energy sources, lock/tag, stored energy, zero-energy verification and controlled recommissioning."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-black text-slate-950">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
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
