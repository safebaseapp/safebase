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
  const [documentNo, setDocumentNo] = useState("SRN-MS-001");
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
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• HSE – Working at Height guidance\n• HSE – Assessing all work at height\n• Proje / saha HSE prosedürleri\n• Kullanılan ekipmanın üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• HSE – Working at Height guidance\n• HSE – Assessing all work at height\n• Project / site HSE procedures\n• Manufacturer instructions for equipment used"
    );
  };


  const loadHotWorkTemplate = () => {
    setActivity(isTurkish ? "Sıcak Çalışma" : "Hot Work");
    setDocumentNo("SRN-MS-002");

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
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA – Welding, Cutting, and Brazing (29 CFR 1910 Subpart Q)\n• OSHA – Fire Prevention and Protection requirements\n• Proje / saha Sıcak Çalışma ve PTW prosedürleri\n• Kullanılan ekipmanın üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA – Welding, Cutting, and Brazing (29 CFR 1910 Subpart Q)\n• OSHA – Fire Prevention and Protection requirements\n• Project / site Hot Work and PTW procedures\n• Manufacturer instructions for equipment used"
    );
  };


  const loadConfinedSpaceTemplate = () => {
    setActivity(
      isTurkish ? "Kapalı Alana Giriş" : "Confined Space Entry"
    );

    setDocumentNo("SRN-MS-003");

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
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1910.146 – Permit-Required Confined Spaces\n• OSHA 29 CFR 1926 Subpart AA – Confined Spaces in Construction\n• Proje / saha Kapalı Alana Giriş ve LOTO prosedürleri\n• Gaz ölçüm cihazı ve kullanılan ekipmanların üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1910.146 – Permit-Required Confined Spaces\n• OSHA 29 CFR 1926 Subpart AA – Confined Spaces in Construction\n• Project / site Confined Space Entry and LOTO procedures\n• Manufacturer instructions for gas detectors and equipment used"
    );
  };


  const loadLotoTemplate = () => {
    setActivity(isTurkish ? "LOTO / Enerji İzolasyonu" : "LOTO / Energy Isolation");
    setDocumentNo("SRN-MS-004");

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
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1910.147 – Control of Hazardous Energy (Lockout/Tagout)\n• Proje / saha LOTO prosedürü\n• Kullanılan ekipmanın üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1910.147 – Control of Hazardous Energy (Lockout/Tagout)\n• Project / site LOTO procedure\n• Manufacturer instructions for equipment used"
    );
  };


  const loadLiftingTemplate = () => {
    setActivity(
      isTurkish ? "Kaldırma Operasyonları" : "Lifting Operations"
    );

    setDocumentNo("SRN-MS-005");

    setScope(
      isTurkish
        ? "Bu Method Statement; mobil veya sabit vinçler ve diğer uygun kaldırma ekipmanları kullanılarak gerçekleştirilen kaldırma operasyonlarının güvenli şekilde planlanması ve yürütülmesi için uygulanacak yöntemi tanımlar. Çalışma; kaldırma planının kontrolü, yük bilgilerinin doğrulanması, ekipman ve rigging kontrolleri, zemin ve outrigger koşulları, dışlama alanı, haberleşme, yükün bağlanması, kaldırılması, taşınması, indirilmesi ve operasyon sonrası kontrolleri kapsar."
        : "This Method Statement defines the safe method for planning and carrying out lifting operations using mobile or fixed cranes and other suitable lifting equipment. It covers review of the lifting plan, verification of load information, equipment and rigging inspections, ground and outrigger conditions, exclusion zones, communication, rigging, lifting, travelling or slewing the load, landing and post-operation checks."
    );

    setResponsibilities(
      isTurkish
        ? "Kaldırma Süpervizörü: Operasyonu planlar, kaldırma planını ve saha koşullarını doğrular, ekip üyelerinin görevlerini belirler ve kaldırmayı gözetir.\nVinç Operatörü: Vinci üretici talimatları, kapasite sınırları ve yetkili banksman / signalman talimatlarına göre güvenli şekilde kullanır.\nRigger / Sapancı: Yükü ve kaldırma noktalarını değerlendirir, uygun rigging ekipmanını seçer, kontrol eder ve yükü güvenli şekilde bağlar.\nBanksman / İşaretçi: Operatörle kontrollü iletişim sağlar, yük güzergahını izler ve yalnızca üzerinde anlaşılmış işaretleri kullanır.\nHSE Personeli: Risk değerlendirmesi, saha kontrolleri ve kaldırma güvenliği gerekliliklerinin uygulanmasını destekler."
        : "Lifting Supervisor: Plans the operation, verifies the lifting plan and site conditions, assigns team responsibilities and supervises the lift.\nCrane Operator: Operates the crane safely in accordance with manufacturer instructions, rated capacity and directions from the authorized banksman / signalman.\nRigger: Assesses the load and lifting points, selects and inspects suitable rigging equipment and safely connects the load.\nBanksman / Signalman: Maintains controlled communication with the operator, monitors the load path and uses only agreed signals.\nHSE Personnel: Supports risk assessment, field verification and implementation of lifting-safety requirements."
    );

    setCompetency(
      isTurkish
        ? "Kaldırma operasyonunda görev alan kaldırma süpervizörü, vinç operatörü, rigger / sapancı ve banksman / işaretçi görevlerine uygun eğitim, yetkilendirme, bilgi ve deneyime sahip olmalıdır. Personel kaldırma ekipmanının sınırlarını, temel rigging prensiplerini, dışlama alanı gerekliliklerini ve kullanılacak iletişim yöntemlerini bilmelidir."
        : "The lifting supervisor, crane operator, rigger and banksman / signalman shall have suitable training, authorization, knowledge and experience for their assigned duties. Personnel shall understand equipment limitations, basic rigging principles, exclusion-zone requirements and the agreed communication method."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Reflektif / yüksek görünürlüklü yelek veya kıyafet\n• Uygun iş kıyafeti\n• Göreve göre gerekli göz koruması\n• Risk değerlendirmesine göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• High-visibility vest / clothing\n• Suitable work clothing\n• Eye protection where required by the task\n• Additional PPE as required by the risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun ve sertifikalı kaldırma ekipmanı / vinç\n• Sertifikalı sapanlar\n• Şakıllar / shackles\n• Kaldırma kirişleri / spreader beam gerektiğinde\n• Uygun kanca ve bağlantı ekipmanları\n• Tag line gerektiğinde\n• Outrigger mat / destek plakaları gerektiğinde\n• Bariyer ve uyarı levhaları\n• Haberleşme ekipmanı gerektiğinde\n• Onaylı kaldırma planı / gerekli kaldırma dokümanları"
        : "• Suitable certified lifting equipment / crane\n• Certified slings\n• Shackles\n• Spreader beam where required\n• Suitable hooks and connecting accessories\n• Tag lines where required\n• Outrigger mats / support pads where required\n• Barricades and warning signs\n• Communication equipment where required\n• Approved lifting plan / required lifting documentation"
    );

    setPermits(
      isTurkish
        ? "Saha veya proje prosedürlerinin gerektirdiği kaldırma izinleri ve kaldırma planı işe başlamadan önce doğrulanmalıdır. Kritik kaldırma olarak sınıflandırılan operasyonlar proje prosedürüne göre ilave mühendislik değerlendirmesi, özel kaldırma planı veya yönetim onayı gerektirebilir. Kaldırma koşulları veya ekipman değişirse operasyon durdurulmalı ve plan yeniden değerlendirilmelidir."
        : "Lifting permits and the lifting plan required by site or project procedures shall be verified before work starts. Operations classified as critical lifts may require additional engineering review, a specific lifting plan or management approval under project procedures. The lift shall stop and be reassessed if conditions or equipment change."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve kaldırma planını kontrol et.\n• Yük ağırlığını, boyutlarını ve mümkünse ağırlık merkezini doğrula.\n• Kullanılacak vinç ve kaldırma ekipmanının kapasitesinin operasyona uygun olduğunu doğrula.\n• Vinç kurulum alanını, zemin taşıma kapasitesini ve outrigger koşullarını değerlendir.\n• Rigging ekipmanının sertifikasını, WLL / SWL değerini ve fiziksel durumunu kontrol et.\n• Uygun kaldırma noktalarını belirle.\n• Yük güzergahını ve iniş alanını kontrol et.\n• Dışlama alanını oluştur ve yetkisiz erişimi engelle.\n• Vinç operatörü, rigger ve banksman / signalman görevlerini doğrula.\n• Kullanılacak el veya telsiz iletişim yöntemini belirle.\n• Yakındaki enerji hatları, yapılar, ekipmanlar ve eş zamanlı işleri değerlendir.\n• Rüzgar ve diğer hava koşullarının güvenli kaldırmaya uygun olduğunu doğrula."
        : "• Review the task-specific risk assessment and lifting plan.\n• Verify the load weight, dimensions and, where practicable, centre of gravity.\n• Confirm the crane and lifting equipment have adequate capacity for the operation.\n• Assess the crane setup area, ground bearing capacity and outrigger conditions.\n• Verify rigging certificates, WLL / SWL and physical condition.\n• Identify suitable lifting points.\n• Inspect the load path and landing area.\n• Establish an exclusion zone and prevent unauthorized access.\n• Confirm the crane operator, rigger and banksman / signalman assignments.\n• Establish the agreed hand-signal or radio communication method.\n• Assess nearby power lines, structures, equipment and simultaneous activities.\n• Confirm wind and other weather conditions are suitable for safe lifting."
    );

    setMethodSteps([
      {
        id: `lift-1-${Date.now()}`,
        step: isTurkish
          ? "Kaldırmayı planla ve yük bilgilerini doğrula."
          : "Plan the lift and verify load information.",
        hazards: isTurkish
          ? "Yanlış yük ağırlığı, bilinmeyen ağırlık merkezi, yetersiz ekipman kapasitesi veya uygunsuz kaldırma planı."
          : "Incorrect load weight, unknown centre of gravity, inadequate equipment capacity or unsuitable lifting plan.",
        controls: isTurkish
          ? "Yük ağırlığını, boyutlarını, kaldırma noktalarını, kaldırma yarıçapını ve ekipman kapasitesini doğrula. Gerekli kaldırma planı ve onaylar tamamlanmadan operasyona başlama."
          : "Verify load weight, dimensions, lifting points, lifting radius and equipment capacity. Do not begin until the required lifting plan and approvals are complete.",
        responsible: isTurkish
          ? "Kaldırma Süpervizörü / HSE"
          : "Lifting Supervisor / HSE",
      },
      {
        id: `lift-2-${Date.now()}`,
        step: isTurkish
          ? "Vinç kurulum alanını, zemin ve outrigger düzenini kontrol et."
          : "Inspect crane setup, ground and outrigger arrangements.",
        hazards: isTurkish
          ? "Zemin çökmesi, vinç stabilitesinin kaybı, devrilme veya outrigger arızası."
          : "Ground failure, loss of crane stability, overturning or outrigger failure.",
        controls: isTurkish
          ? "Zemin taşıma kapasitesini ve kurulum alanını kontrol et. Vinci üretici gerekliliklerine göre seviyelendir. Outriggerları tam ve uygun şekilde aç; gerektiğinde uygun mat veya destek plakası kullan."
          : "Assess ground bearing capacity and the setup area. Level the crane in accordance with manufacturer requirements. Fully and correctly deploy outriggers and use suitable mats or support pads where required.",
        responsible: isTurkish
          ? "Kaldırma Süpervizörü / Vinç Operatörü"
          : "Lifting Supervisor / Crane Operator",
      },
      {
        id: `lift-3-${Date.now()}`,
        step: isTurkish
          ? "Rigging ekipmanını seç, kontrol et ve yükü bağla."
          : "Select and inspect rigging equipment and connect the load.",
        hazards: isTurkish
          ? "Sapan veya aksesuar arızası, yanlış kapasite, keskin kenar hasarı veya hatalı rigging."
          : "Sling or accessory failure, incorrect capacity, sharp-edge damage or incorrect rigging.",
        controls: isTurkish
          ? "Sertifikalı ve uygun WLL / SWL değerine sahip ekipman kullan. Sapan, şakıl, kanca ve diğer aksesuarları kullanım öncesi kontrol et. Keskin kenarlarda uygun koruma kullan ve yükü onaylı kaldırma noktalarından bağla."
          : "Use certified equipment with adequate WLL / SWL. Inspect slings, shackles, hooks and accessories before use. Protect rigging from sharp edges and connect the load only at suitable lifting points.",
        responsible: isTurkish
          ? "Rigger / Sapancı"
          : "Rigger",
      },
      {
        id: `lift-4-${Date.now()}`,
        step: isTurkish
          ? "Dışlama alanını oluştur ve iletişim düzenini doğrula."
          : "Establish the exclusion zone and verify communication.",
        hazards: isTurkish
          ? "Askıdaki yük altında personel bulunması, yetkisiz erişim, yanlış veya çelişkili sinyaller."
          : "Personnel beneath suspended loads, unauthorized access or conflicting signals.",
        controls: isTurkish
          ? "Kaldırma alanını ve yük güzergahını bariyerle. Tek yetkili banksman / signalman belirle. Kullanılacak el işaretleri veya telsiz iletişimini operatörle önceden doğrula."
          : "Barricade the lifting area and load path. Assign one authorized banksman / signalman. Confirm agreed hand signals or radio communication with the operator before lifting.",
        responsible: isTurkish
          ? "Kaldırma Süpervizörü / Banksman"
          : "Lifting Supervisor / Banksman",
      },
      {
        id: `lift-5-${Date.now()}`,
        step: isTurkish
          ? "Kontrollü deneme kaldırması yap."
          : "Perform a controlled trial lift.",
        hazards: isTurkish
          ? "Yükün kayması, dengesizlik, yanlış rigging açısı veya beklenmeyen hareket."
          : "Load shift, imbalance, incorrect rigging angle or unexpected movement.",
        controls: isTurkish
          ? "Yükü zeminden kısa bir mesafe kaldır ve dengeyi, rigging bağlantılarını, frenleri ve yük kontrolünü doğrula. Uygunsuzluk varsa yükü indir ve düzeltmeden devam etme."
          : "Raise the load a short distance from the ground and verify balance, rigging connections, brakes and load control. Lower the load and correct any problem before continuing.",
        responsible: isTurkish
          ? "Vinç Operatörü / Rigger / Banksman"
          : "Crane Operator / Rigger / Banksman",
      },
      {
        id: `lift-6-${Date.now()}`,
        step: isTurkish
          ? "Yükü kontrollü şekilde kaldır ve taşı."
          : "Lift and move the load under controlled conditions.",
        hazards: isTurkish
          ? "Askıdaki yük, yük salınımı, çarpışma, personelin tehlike alanına girmesi veya ani vinç hareketi."
          : "Suspended load, load swing, collision, personnel entering the danger zone or sudden crane movement.",
        controls: isTurkish
          ? "Yük güzergahını açık tut. Personelin askıdaki yük altında veya yük ile sabit yapı arasında bulunmasına izin verme. Ani hareketlerden kaçın ve yalnızca banksman talimatları doğrultusunda hareket et. Gerektiğinde uygun tag line kullan."
          : "Keep the load path clear. Do not permit personnel beneath the suspended load or between the load and fixed objects. Avoid sudden movements and operate only in accordance with banksman instructions. Use suitable tag lines where required.",
        responsible: isTurkish
          ? "Vinç Operatörü / Banksman"
          : "Crane Operator / Banksman",
      },
      {
        id: `lift-7-${Date.now()}`,
        step: isTurkish
          ? "Yükü güvenli şekilde indir ve rigging ekipmanını çıkar."
          : "Land the load safely and remove rigging equipment.",
        hazards: isTurkish
          ? "Ezilme, sıkışma, pinch point, dengesiz yük veya rigging altında kalan enerji."
          : "Crushing, trapping, pinch points, unstable load or tension remaining in rigging.",
        controls: isTurkish
          ? "İniş alanının yükü güvenli şekilde taşıyabilecek durumda olduğunu doğrula. Elleri ve vücut parçalarını pinch pointlerden uzak tut. Yük tamamen stabil ve rigging üzerindeki gerilim kalkmadan bağlantıları sökme."
          : "Confirm the landing area can safely support the load. Keep hands and body parts clear of pinch points. Do not disconnect rigging until the load is fully stable and tension has been released.",
        responsible: isTurkish
          ? "Rigger / Banksman"
          : "Rigger / Banksman",
      },
      {
        id: `lift-8-${Date.now()}`,
        step: isTurkish
          ? "Operasyonu tamamla ve ekipman / alan son kontrolünü yap."
          : "Complete the operation and conduct final equipment / area checks.",
        hazards: isTurkish
          ? "Hasarlı rigging ekipmanının tekrar kullanılması, sahada kalan ekipman veya kontrolsüz alan teslimi."
          : "Reuse of damaged rigging, equipment left in the work area or uncontrolled closeout.",
        controls: isTurkish
          ? "Rigging ve kaldırma ekipmanını operasyon sonrası kontrol et. Hasarlı ekipmanı karantinaya al. Kullanılan malzemeleri güvenli şekilde depola ve dışlama alanını yalnızca çalışma tamamen sona erdiğinde kaldır."
          : "Inspect rigging and lifting equipment after the operation. Quarantine damaged equipment. Store equipment safely and remove the exclusion zone only after the operation is fully complete.",
        responsible: isTurkish
          ? "Kaldırma Süpervizörü / Rigger"
          : "Lifting Supervisor / Rigger",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Kontrolsüz yük hareketi, ekipman arızası, vinç stabilite kaybı, yük düşmesi veya diğer acil durumda kaldırma operasyonu derhal durdurulmalıdır. Personel yükün ve vincin tehlike alanından uzaklaştırılmalı, ekipman güvenli durumda bırakılmalı ve saha acil durum prosedürü uygulanmalıdır. Düşmüş veya kontrol dışındaki bir yüke eğitimli ve yetkili ekip tarafından güvenli yöntem belirlenmeden müdahale edilmemelidir."
        : "In the event of uncontrolled load movement, equipment failure, crane instability, dropped load or another emergency, the lifting operation shall stop immediately. Personnel shall be kept clear of the load and crane danger zone, equipment shall be left in the safest practicable condition and the site emergency procedure implemented. A dropped or uncontrolled load shall not be approached until a safe recovery method has been established by trained and authorized personnel."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Vinç ve kaldırma ekipmanından yağ, yakıt veya hidrolik sıvı sızıntısı kontrol edilmelidir. Dökülme halinde uygun spill kit kullanılmalı ve kirlenmiş malzeme proje atık sistemine göre yönetilmelidir. Kaldırma alanı operasyon sonunda malzeme, ambalaj, tag line ve diğer atıklardan temizlenmelidir."
        : "Cranes and lifting equipment shall be checked for oil, fuel or hydraulic-fluid leakage. Suitable spill-control materials shall be used where required and contaminated waste managed under the project waste system. The lifting area shall be cleared of packaging, tag lines, materials and other waste after completion."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• Proje / saha Kaldırma Operasyonları prosedürü\n• Onaylı kaldırma planı ve ekipman sertifikaları\n• Vinç ve rigging ekipmanı üretici talimatları\n• OSHA 29 CFR 1926 Subpart CC – Cranes and Derricks in Construction"
        : "• SERNEM task-specific risk assessment\n• Project / site Lifting Operations procedure\n• Approved lifting plan and equipment certificates\n• Crane and rigging-equipment manufacturer instructions\n• OSHA 29 CFR 1926 Subpart CC – Cranes and Derricks in Construction"
    );
  };


  const loadScaffoldingTemplate = () => {
    setActivity(
      isTurkish
        ? "İskele Kurulum / Söküm"
        : "Scaffold Erection / Dismantling"
    );

    setDocumentNo("SRN-MS-006");

    setScope(
      isTurkish
        ? "Bu Method Statement; çalışma iskelesinin güvenli şekilde kurulması, değiştirilmesi ve sökülmesi için uygulanacak yöntemi tanımlar. Çalışma; alanın hazırlanması, zemin ve taban koşullarının kontrolü, iskele elemanlarının kontrolü, güvenli erişim, platform ve korkulukların kurulması, ankraj ve bağlamalar, kullanım öncesi kontrol, etiketleme ve kontrollü söküm faaliyetlerini kapsar."
        : "This Method Statement defines the safe method for erection, modification and dismantling of working scaffolds. It covers work-area preparation, ground and foundation checks, inspection of scaffold components, safe access, installation of platforms and guardrails, ties and anchors, pre-use inspection, tagging and controlled dismantling."
    );

    setResponsibilities(
      isTurkish
        ? "İskele Süpervizörü / Yetkin Kişi: İskele tasarımı veya onaylı konfigürasyonu doğrular, kurulum ve söküm faaliyetlerini koordine eder ve iskeleyi kullanım öncesi kontrol eder.\nİskele Ekibi: Onaylı kurulum yöntemine uyar, ekipmanı kontrol eder ve iskeleyi yetkin kişinin talimatlarına göre kurar veya söker.\nHSE Personeli: Risk değerlendirmesi, saha kontrolleri, dışlama alanı ve yüksekte çalışma gerekliliklerinin uygulanmasını destekler.\nKullanıcılar: İskele etiketini ve erişim durumunu kontrol eder; yetkisiz değişiklik yapmaz."
        : "Scaffold Supervisor / Competent Person: Confirms the scaffold design or approved configuration, coordinates erection and dismantling and inspects the scaffold before use.\nScaffold Team: Follows the approved erection method, inspects components and erects or dismantles the scaffold under competent-person direction.\nHSE Personnel: Supports risk assessment, field verification, exclusion-zone controls and work-at-height requirements.\nUsers: Check scaffold tagging and access status and shall not make unauthorized alterations."
    );

    setCompetency(
      isTurkish
        ? "İskele kurulumu, değiştirilmesi veya sökümü yalnızca görev için eğitimli, yetkin ve yetkilendirilmiş personel tarafından gerçekleştirilmelidir. İskele ekibi düşme risklerini, güvenli kurulum sırasını, sistem bileşenlerini, ankraj ve bağlama gerekliliklerini ve malzeme elleçleme yöntemlerini bilmelidir."
        : "Scaffold erection, modification and dismantling shall be performed only by personnel who are trained, competent and authorized for the task. Scaffolders shall understand fall hazards, safe erection sequence, system components, tie and anchorage requirements and material-handling methods."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Uygun iş kıyafeti\n• Gerektiğinde göz koruması\n• Risk değerlendirmesi ve kurulum aşamasına göre tam vücut emniyet kemeri ve uygun bağlantı sistemi\n• Gerektiğinde yüksek görünürlüklü kıyafet"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• Suitable work clothing\n• Eye protection where required\n• Full-body harness and suitable connection system as required by the risk assessment and erection stage\n• High-visibility clothing where required"
    );

    setToolsEquipment(
      isTurkish
        ? "• Onaylı iskele elemanları\n• Base plate / base jack\n• Sole board gerektiğinde\n• Standart, ledger ve transom elemanları\n• Platform / deck elemanları\n• Guardrail ve midrail elemanları\n• Toe board\n• Diagonal brace\n• Uygun erişim merdiveni / stair tower\n• Ankraj ve tie elemanları\n• İskele etiketi / scaffold tag\n• Bariyer ve uyarı levhaları\n• Malzeme kaldırma ipi / uygun kaldırma ekipmanı gerektiğinde"
        : "• Approved scaffold components\n• Base plates / base jacks\n• Sole boards where required\n• Standards, ledgers and transoms\n• Platforms / decks\n• Guardrails and midrails\n• Toe boards\n• Diagonal braces\n• Suitable access ladder / stair tower\n• Anchors and ties\n• Scaffold tag\n• Barricades and warning signs\n• Material lifting rope / suitable lifting equipment where required"
    );

    setPermits(
      isTurkish
        ? "Saha veya proje prosedürlerinin gerektirdiği iskele kurulum / söküm izni ve ilgili yüksekte çalışma izinleri işe başlamadan önce doğrulanmalıdır. Standart dışı, yüksek, kompleks veya özel yük taşıyan iskelelerde onaylı tasarım / mühendislik kontrolü gerekebilir. İskele yalnızca yetkin kişi tarafından kontrol edilip uygun statü etiketi verildikten sonra kullanıma açılmalıdır."
        : "Scaffold erection / dismantling permits and any applicable work-at-height permits required by site or project procedures shall be verified before work starts. Non-standard, high, complex or specially loaded scaffolds may require approved design / engineering verification. The scaffold shall only be released for use after inspection and appropriate status tagging by a competent person."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve iskele planını / konfigürasyonunu kontrol et.\n• Zemin taşıma kapasitesini, eğimi, boşlukları ve temel koşullarını değerlendir.\n• Base plate, base jack ve gerektiğinde sole board kullanımını doğrula.\n• İskele elemanlarını eğilme, çatlak, deformasyon, aşırı korozyon veya diğer hasarlara karşı kontrol et.\n• Kurulum ve söküm alanında dışlama alanı oluştur.\n• Alt ve çevre seviyelerdeki personeli düşen cisim riskinden koru.\n• İskele ekibinin yetkinliğini doğrula.\n• Güvenli erişim yöntemini belirle.\n• Kurulum aşamasındaki düşüş riskini ve kişisel düşüş koruma yöntemini değerlendir.\n• Ankraj / tie gerekliliklerini ve bağlanacağı yapının uygunluğunu doğrula.\n• Elektrik hatları ve diğer çevresel tehlikeleri kontrol et.\n• Rüzgar ve hava koşullarının güvenli kurulum / söküme uygun olduğunu doğrula."
        : "• Review the task-specific risk assessment and scaffold plan / configuration.\n• Assess ground bearing capacity, slope, openings and foundation conditions.\n• Verify use of base plates, base jacks and sole boards where required.\n• Inspect scaffold components for bends, cracks, deformation, excessive corrosion or other damage.\n• Establish an exclusion zone around erection / dismantling activities.\n• Protect personnel at lower and adjacent levels from falling objects.\n• Verify scaffold-team competency.\n• Establish a safe access method.\n• Assess fall exposure during erection and the required personal fall-protection method.\n• Verify tie / anchorage requirements and suitability of the supporting structure.\n• Check overhead electrical lines and other surrounding hazards.\n• Confirm wind and weather conditions are suitable for safe erection / dismantling."
    );

    setMethodSteps([
      {
        id: `scaf-1-${Date.now()}`,
        step: isTurkish
          ? "Çalışma alanını ve iskele gerekliliklerini değerlendir."
          : "Assess the work area and scaffold requirements.",
        hazards: isTurkish
          ? "Uygunsuz konum, zayıf zemin, yetersiz planlama, çevresel tehlikeler."
          : "Unsuitable location, weak ground, inadequate planning or surrounding hazards.",
        controls: isTurkish
          ? "İskele yüksekliğini, uzunluğunu, çalışma yükünü, zemin koşullarını ve çevredeki faaliyetleri değerlendir. Onaylı konfigürasyon veya tasarım gerekliliklerini doğrula."
          : "Assess scaffold height, length, working load, ground conditions and surrounding activities. Confirm the approved configuration or design requirements.",
        responsible: isTurkish
          ? "İskele Süpervizörü / Yetkin Kişi"
          : "Scaffold Supervisor / Competent Person",
      },
      {
        id: `scaf-2-${Date.now()}`,
        step: isTurkish
          ? "Temel ve başlangıç elemanlarını kur."
          : "Install foundations and initial components.",
        hazards: isTurkish
          ? "Zemin çökmesi, eğim, iskele stabilite kaybı veya düzensiz başlangıç."
          : "Ground settlement, slope, scaffold instability or uneven starting level.",
        controls: isTurkish
          ? "Uygun base plate / base jack ve gerektiğinde sole board kullan. İlk seviyeyi düzgün, terazisinde ve stabil şekilde oluştur."
          : "Use suitable base plates / base jacks and sole boards where required. Establish the first level square, level and stable.",
        responsible: isTurkish
          ? "İskele Ekibi / Yetkin Kişi"
          : "Scaffold Team / Competent Person",
      },
      {
        id: `scaf-3-${Date.now()}`,
        step: isTurkish
          ? "Dikey, yatay ve çapraz elemanları kontrollü sırayla kur."
          : "Install standards, ledgers and braces in a controlled sequence.",
        hazards: isTurkish
          ? "Yapısal kararsızlık, devrilme, eleman düşmesi veya eksik bağlantı."
          : "Structural instability, overturning, falling components or incomplete connections.",
        controls: isTurkish
          ? "Üretici / sistem kurallarına uygun montaj sırası kullan. Bağlantıları tamamen kilitle ve gerekli diagonal brace elemanlarını gecikmeden kur."
          : "Follow the manufacturer / system erection sequence. Fully secure connections and install required diagonal bracing without delay.",
        responsible: isTurkish
          ? "İskele Ekibi"
          : "Scaffold Team",
      },
      {
        id: `scaf-4-${Date.now()}`,
        step: isTurkish
          ? "Platform, korkuluk ve kenar korumalarını kur."
          : "Install platforms, guardrails and edge protection.",
        hazards: isTurkish
          ? "Yüksekten düşme, açık kenar, platform boşlukları veya düşen cisim."
          : "Fall from height, open edges, platform gaps or falling objects.",
        controls: isTurkish
          ? "Platformları tam ve güvenli yerleştir. Guardrail, midrail ve toe board elemanlarını çalışma seviyesi kullanıma açılmadan önce kur."
          : "Fully deck and secure platforms. Install guardrails, midrails and toe boards before releasing the working level for use.",
        responsible: isTurkish
          ? "İskele Ekibi / Yetkin Kişi"
          : "Scaffold Team / Competent Person",
      },
      {
        id: `scaf-5-${Date.now()}`,
        step: isTurkish
          ? "Güvenli erişim sistemini kur."
          : "Install the safe access system.",
        hazards: isTurkish
          ? "Uygunsuz tırmanma, merdivenden düşme veya platforma güvensiz giriş."
          : "Unsafe climbing, ladder falls or unsafe platform access.",
        controls: isTurkish
          ? "Onaylı merdiven veya stair tower kullan. Erişim ekipmanını sabitle, uygun açıda ve güvenli geçiş sağlayacak şekilde kur."
          : "Use an approved ladder or stair tower. Secure access equipment and provide safe transition to working platforms.",
        responsible: isTurkish
          ? "İskele Ekibi"
          : "Scaffold Team",
      },
      {
        id: `scaf-6-${Date.now()}`,
        step: isTurkish
          ? "Tie / ankraj ve stabilite elemanlarını tamamla."
          : "Complete ties / anchors and stability controls.",
        hazards: isTurkish
          ? "İskele devrilmesi, yapıdan ayrılma veya yatay stabilite kaybı."
          : "Scaffold overturning, separation from the structure or loss of lateral stability.",
        controls: isTurkish
          ? "Onaylı tie pattern ve ankraj noktalarını uygula. Tie elemanlarını yetkisiz şekilde kaldırma veya değiştirme."
          : "Install the approved tie pattern and anchorage points. Do not remove or alter ties without authorization.",
        responsible: isTurkish
          ? "İskele Ekibi / Yetkin Kişi"
          : "Scaffold Team / Competent Person",
      },
      {
        id: `scaf-7-${Date.now()}`,
        step: isTurkish
          ? "İskeleyi kontrol et, etiketle ve kullanıma teslim et."
          : "Inspect, tag and release the scaffold for use.",
        hazards: isTurkish
          ? "Eksik eleman, uygunsuz platform, güvenli olmayan erişim veya erken kullanım."
          : "Missing components, unsafe platform, unsuitable access or premature use.",
        controls: isTurkish
          ? "Yetkin kişi tamamlanmış iskeleyi kontrol etsin. Uygun durum etiketi uygulanmadan kullanıcıların iskeleye erişmesine izin verme."
          : "A competent person shall inspect the completed scaffold. Do not permit use until the appropriate status tag has been applied.",
        responsible: isTurkish
          ? "Yetkin Kişi / İskele Süpervizörü"
          : "Competent Person / Scaffold Supervisor",
      },
      {
        id: `scaf-8-${Date.now()}`,
        step: isTurkish
          ? "İskeleyi kontrollü şekilde sök ve alanı güvenli bırak."
          : "Dismantle the scaffold in a controlled sequence and leave the area safe.",
        hazards: isTurkish
          ? "Yüksekten düşme, eleman düşmesi, erken tie sökümü veya yapısal kararsızlık."
          : "Fall from height, falling components, premature tie removal or structural instability.",
        controls: isTurkish
          ? "Kurulum sırasının kontrollü tersini uygula. Guardrail, brace ve tie elemanlarını stabiliteyi bozacak şekilde erken sökme. Malzemeleri aşağı atma; kontrollü indir ve güvenli depola."
          : "Follow a controlled reverse erection sequence. Do not prematurely remove guardrails, braces or ties where this would affect stability. Do not throw components; lower them under control and store safely.",
        responsible: isTurkish
          ? "İskele Ekibi / İskele Süpervizörü"
          : "Scaffold Team / Scaffold Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "İskele stabilite kaybı, eleman düşmesi, personel düşmesi veya diğer acil durumda çalışma derhal durdurulmalıdır. Alan boşaltılmalı ve dışlama bölgesi genişletilmelidir. Düşüş sonrası kurtarma gerekiyorsa önceden belirlenmiş kurtarma yöntemi uygulanmalı ve saha acil durum prosedürü devreye alınmalıdır. Hasarlı veya stabilitesi şüpheli iskeleye yetkin kişi değerlendirmesi olmadan yaklaşılmamalıdır."
        : "In the event of scaffold instability, falling components, a worker fall or another emergency, work shall stop immediately. The area shall be evacuated and the exclusion zone extended. Where fall rescue is required, the pre-planned rescue method shall be implemented and the site emergency procedure activated. Damaged or potentially unstable scaffolds shall not be approached until assessed by a competent person."
    );

    setEnvironmentalControls(
      isTurkish
        ? "İskele ambalajları, tel, plastik, hasarlı elemanlar ve diğer atıklar çalışma alanında bırakılmamalıdır. Malzemeler belirlenen depolama alanına düzenli şekilde taşınmalı, drenaj ve erişim yolları açık tutulmalıdır. Yağ veya kimyasal bulaşmış malzemeler proje atık yönetim sistemine göre ayrılmalıdır."
        : "Scaffold packaging, wire, plastic, damaged components and other waste shall not be left in the work area. Materials shall be transferred in an orderly manner to designated storage areas and drainage and access routes kept clear. Oil- or chemical-contaminated materials shall be segregated in accordance with the project waste-management system."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1926 Subpart L – Scaffolds\n• Proje / saha İskele prosedürü\n• Onaylı iskele tasarımı / sistem konfigürasyonu gerektiğinde\n• İskele sistemi üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1926 Subpart L – Scaffolds\n• Project / site Scaffold procedure\n• Approved scaffold design / system configuration where required\n• Scaffold-system manufacturer instructions"
    );
  };


  const loadExcavationTemplate = () => {
    setActivity(
      isTurkish ? "Kazı Çalışmaları" : "Excavation Work"
    );

    setDocumentNo("SRN-MS-007");

    setScope(
      isTurkish
        ? "Bu Method Statement; hendek, temel, kanal ve benzeri kazı çalışmalarının güvenli şekilde planlanması, açılması, kontrol edilmesi ve kapatılması için uygulanacak yöntemi tanımlar. Çalışma; yeraltı servislerinin tespiti, kazı izni, alan izolasyonu, zemin koşullarının değerlendirilmesi, şevlendirme veya iksa, güvenli erişim, kazı malzemesinin yönetimi, atmosfer ve su kontrolü, günlük kontrol ve geri dolgu faaliyetlerini kapsar."
        : "This Method Statement defines the safe method for planning, opening, controlling and closing trenches, foundations, channels and similar excavations. It covers underground-service identification, excavation permits, area isolation, soil-condition assessment, sloping or shoring, safe access, spoil management, atmosphere and water control, daily inspection and backfilling."
    );

    setResponsibilities(
      isTurkish
        ? "Kazı Süpervizörü: Kazı kapsamını, izinleri, yeraltı servis bilgilerini ve saha koşullarını doğrular; çalışmayı koordine eder.\nYetkin Kişi: Zemin ve kazı stabilitesini değerlendirir, uygun koruyucu sistemi belirler ve kazıyı düzenli olarak kontrol eder.\nMakine Operatörü: Ekskavatör veya diğer kazı ekipmanını yetkisi dahilinde ve belirlenen güvenli çalışma alanında kullanır.\nHSE Personeli: Risk değerlendirmesi, bariyerleme, erişim, atmosfer ve saha kontrollerini destekler.\nÇalışanlar: Yetkisiz şekilde kazıya girmez, iksa veya bariyerleri değiştirmez ve talimatlara uyar."
        : "Excavation Supervisor: Confirms excavation scope, permits, underground-service information and site conditions and coordinates the work.\nCompetent Person: Assesses soil and excavation stability, determines the required protective system and performs regular inspections.\nEquipment Operator: Operates excavators or other excavation equipment within authorization and the defined safe working area.\nHSE Personnel: Supports risk assessment, barricading, access, atmosphere and field verification.\nWorkers: Shall not enter excavations without authorization, alter protective systems or barricades, and shall follow instructions."
    );

    setCompetency(
      isTurkish
        ? "Kazı süpervizörü, yetkin kişi, makine operatörü ve kazıda görev alan personel görevlerine uygun eğitim, bilgi ve yetkiye sahip olmalıdır. Yetkin kişi zemin sınıflandırması, göçük riskleri, iksa / şevlendirme sistemleri, su girişi, yeraltı servisleri ve güvenli erişim gerekliliklerini bilmelidir."
        : "The excavation supervisor, competent person, equipment operator and personnel working in or around excavations shall have suitable training, knowledge and authorization for their duties. The competent person shall understand soil classification, cave-in hazards, shoring / sloping systems, water ingress, underground services and safe-access requirements."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Yüksek görünürlüklü yelek / kıyafet\n• Uygun iş kıyafeti\n• Gerektiğinde göz koruması\n• Toz veya diğer maruziyetlere göre uygun solunum koruması\n• Risk değerlendirmesine göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• High-visibility vest / clothing\n• Suitable work clothing\n• Eye protection where required\n• Suitable respiratory protection where required for dust or other exposures\n• Additional PPE as required by the risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun ekskavatör / kazı ekipmanı\n• Yeraltı servis tespit cihazı gerektiğinde\n• Onaylı iksa / trench box sistemi gerektiğinde\n• Uygun merdiven veya erişim sistemi\n• Bariyer ve uyarı levhaları\n• Gaz ölçüm cihazı gerektiğinde\n• Su tahliye pompası gerektiğinde\n• Aydınlatma ekipmanı gerektiğinde\n• Trafik kontrol ekipmanı gerektiğinde\n• Acil durum / kurtarma ekipmanı risk değerlendirmesine göre"
        : "• Suitable excavator / excavation equipment\n• Underground-service detection equipment where required\n• Approved shoring / trench-box system where required\n• Suitable ladder or access system\n• Barricades and warning signs\n• Gas detector where required\n• Dewatering pump where required\n• Lighting equipment where required\n• Traffic-control equipment where required\n• Emergency / rescue equipment as required by the risk assessment"
    );

    setPermits(
      isTurkish
        ? "Kazı başlamadan önce geçerli kazı izni alınmalı ve yeraltı servis çizimleri / saha tespitleri doğrulanmalıdır. Elektrik, gaz, su, drenaj, iletişim ve diğer servislerin konumu belirlenmeden mekanik kazıya başlanmamalıdır. Derin, kompleks veya özel koşullardaki kazılar proje prosedürüne göre ilave mühendislik veya yetkin kişi değerlendirmesi gerektirebilir."
        : "A valid excavation permit shall be obtained before work starts and underground-service drawings / field verification confirmed. Mechanical excavation shall not begin until electrical, gas, water, drainage, communication and other services have been located. Deep, complex or unusual excavations may require additional engineering or competent-person assessment under project procedures."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve kazı iznini kontrol et.\n• Yeraltı servis çizimlerini ve saha tespitini doğrula.\n• Gerekli durumlarda servis tespit cihazı ve kontrollü elle kazı yöntemi kullan.\n• Zemin tipini, kazı derinliğini ve göçük riskini değerlendir.\n• Şevlendirme, benching, iksa veya trench box ihtiyacını belirle.\n• Kazı kenarlarını bariyerle ve düşme riskini kontrol et.\n• Güvenli giriş / çıkış yöntemini oluştur.\n• Kazı malzemesi ve ekipmanı kazı kenarından güvenli mesafede tut.\n• Yağmur, yeraltı suyu ve su giriş riskini değerlendir.\n• Gerekirse atmosfer ölçümü planla.\n• Yakındaki araç, mobil ekipman ve trafik riskini kontrol et.\n• Acil durum ve kurtarma düzenlemelerini doğrula."
        : "• Review the task-specific risk assessment and excavation permit.\n• Verify underground-service drawings and field detection.\n• Use service-detection equipment and controlled hand digging where required.\n• Assess soil type, excavation depth and cave-in risk.\n• Determine the need for sloping, benching, shoring or a trench box.\n• Barricade excavation edges and control fall hazards.\n• Establish safe entry / exit.\n• Keep spoil and equipment a safe distance from the excavation edge.\n• Assess rain, groundwater and water-ingress risks.\n• Plan atmospheric testing where required.\n• Control nearby vehicle, mobile-equipment and traffic hazards.\n• Confirm emergency and rescue arrangements."
    );

    setMethodSteps([
      {
        id: `exc-1-${Date.now()}`,
        step: isTurkish
          ? "Kazı iznini ve yeraltı servislerini doğrula."
          : "Verify the excavation permit and underground services.",
        hazards: isTurkish
          ? "Elektrik, gaz, su veya diğer gömülü servislere temas."
          : "Contact with electrical, gas, water or other buried services.",
        controls: isTurkish
          ? "Güncel çizimleri ve saha tespitlerini kontrol et. Servis güzergahlarını işaretle. Kritik bölgelerde kontrollü elle kazı veya uygun doğrulama yöntemi kullan."
          : "Review current drawings and field detection results. Mark service routes. Use controlled hand digging or another suitable verification method in critical areas.",
        responsible: isTurkish
          ? "Kazı Süpervizörü / Yetkin Kişi"
          : "Excavation Supervisor / Competent Person",
      },
      {
        id: `exc-2-${Date.now()}`,
        step: isTurkish
          ? "Alanı bariyerle ve kazı ekipmanını konumlandır."
          : "Barricade the area and position excavation equipment.",
        hazards: isTurkish
          ? "Araç çarpması, ekipman dönüş alanına giriş, kazı kenarından düşme."
          : "Vehicle impact, entry into equipment swing radius or falls into the excavation.",
        controls: isTurkish
          ? "Dışlama alanı oluştur, ekipman swing radius alanını kontrol et ve gerektiğinde banksman kullan. Kazı kenarlarını görünür bariyerlerle koru."
          : "Establish an exclusion zone, control the equipment swing radius and use a banksman where required. Protect excavation edges with visible barricades.",
        responsible: isTurkish
          ? "Kazı Süpervizörü / Operatör"
          : "Excavation Supervisor / Operator",
      },
      {
        id: `exc-3-${Date.now()}`,
        step: isTurkish
          ? "Kazıyı kontrollü şekilde gerçekleştir."
          : "Excavate under controlled conditions.",
        hazards: isTurkish
          ? "Göçük, servis hasarı, ekipman teması veya malzeme düşmesi."
          : "Cave-in, service damage, equipment contact or falling material.",
        controls: isTurkish
          ? "Kazıyı belirlenen sınırlar içinde ve servis bölgelerinde kontrollü yöntemle yap. Kazı duvarlarının ve çevre zeminin davranışını sürekli izle."
          : "Excavate within defined limits and use controlled methods around services. Continuously observe excavation walls and surrounding ground conditions.",
        responsible: isTurkish
          ? "Operatör / Kazı Süpervizörü"
          : "Operator / Excavation Supervisor",
      },
      {
        id: `exc-4-${Date.now()}`,
        step: isTurkish
          ? "Koruyucu sistemi uygula."
          : "Install the required protective system.",
        hazards: isTurkish
          ? "Kazı duvarı göçmesi veya toprak altında kalma."
          : "Excavation wall collapse or burial.",
        controls: isTurkish
          ? "Yetkin kişi değerlendirmesine göre uygun şevlendirme, benching, iksa veya trench box sistemi uygula. Koruyucu sistem tamamlanmadan personel girişine izin verme."
          : "Apply suitable sloping, benching, shoring or trench-box protection as determined by the competent person. Do not permit entry until protection is complete.",
        responsible: isTurkish
          ? "Yetkin Kişi / Kazı Ekibi"
          : "Competent Person / Excavation Team",
      },
      {
        id: `exc-5-${Date.now()}`,
        step: isTurkish
          ? "Güvenli erişim ve kazı çevresi düzenini oluştur."
          : "Establish safe access and excavation-edge controls.",
        hazards: isTurkish
          ? "Kazıya düşme, uygunsuz merdiven kullanımı veya kazı malzemesinin içeri düşmesi."
          : "Falls into excavation, unsafe ladder access or spoil falling into the excavation.",
        controls: isTurkish
          ? "Uygun merdiven / erişim noktası sağla. Kazı malzemesini ve ekipmanı kenardan güvenli uzaklıkta tut. Kenar bariyerlerini çalışma boyunca koru."
          : "Provide suitable ladder / access points. Keep spoil and equipment a safe distance from the edge and maintain edge protection throughout the work.",
        responsible: isTurkish
          ? "Kazı Süpervizörü / HSE"
          : "Excavation Supervisor / HSE",
      },
      {
        id: `exc-6-${Date.now()}`,
        step: isTurkish
          ? "Kazı içindeki koşulları kontrol et."
          : "Monitor conditions within the excavation.",
        hazards: isTurkish
          ? "Su girişi, tehlikeli atmosfer, zemin hareketi veya oksijen yetersizliği."
          : "Water ingress, hazardous atmosphere, ground movement or oxygen deficiency.",
        controls: isTurkish
          ? "Su birikimini önle veya kontrollü şekilde tahliye et. Gerekli durumlarda atmosfer ölçümü ve havalandırma uygula. Çatlak, kabarma veya zemin hareketi görülürse personeli çıkar."
          : "Prevent or control water accumulation. Carry out atmospheric testing and ventilation where required. Evacuate personnel if cracks, heaving or ground movement are observed.",
        responsible: isTurkish
          ? "Yetkin Kişi / HSE"
          : "Competent Person / HSE",
      },
      {
        id: `exc-7-${Date.now()}`,
        step: isTurkish
          ? "Çalışma süresince kazıyı düzenli olarak kontrol et."
          : "Inspect the excavation throughout the work.",
        hazards: isTurkish
          ? "Koşul değişikliği, yağmur sonrası göçük riski veya koruyucu sistem hasarı."
          : "Changing conditions, cave-in risk after rain or damage to protective systems.",
        controls: isTurkish
          ? "Yetkin kişi vardiya öncesi ve koşullar değiştiğinde kazıyı yeniden kontrol etsin. Yağmur, titreşim veya ekipman hareketi sonrası ilave kontrol yap."
          : "The competent person shall reinspect before shifts and when conditions change. Perform additional checks after rain, vibration or equipment movement.",
        responsible: isTurkish
          ? "Yetkin Kişi"
          : "Competent Person",
      },
      {
        id: `exc-8-${Date.now()}`,
        step: isTurkish
          ? "Çalışmayı tamamla, geri dolgu yap ve alanı teslim et."
          : "Complete the work, backfill and hand over the area.",
        hazards: isTurkish
          ? "Kontrolsüz geri dolgu, ekipman çarpması, boşluk veya açık kazının bırakılması."
          : "Uncontrolled backfilling, equipment impact, voids or excavation left open.",
        controls: isTurkish
          ? "Personelin tehlike alanından çıktığını doğrula. Koruyucu sistemleri kontrollü sırayla kaldır. Geri dolguyu uygun yöntemle yap, zemini güvenli hale getir ve bariyerleri yalnız tehlike tamamen ortadan kalktığında kaldır."
          : "Confirm personnel are clear of the danger zone. Remove protective systems in a controlled sequence. Backfill using a suitable method, make the ground safe and remove barricades only when the hazard has been fully eliminated.",
        responsible: isTurkish
          ? "Kazı Süpervizörü / Operatör"
          : "Excavation Supervisor / Operator",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Göçük, toprak hareketi, yeraltı servis hasarı, su girişi, tehlikeli atmosfer veya personel yaralanması halinde çalışma derhal durdurulmalıdır. Kazı içindeki personel güvenli şekilde tahliye edilmeli ve alan izole edilmelidir. Göçük altında kalan personele kontrolsüz şekilde girilmemeli; saha kurtarma ve acil durum prosedürü devreye alınmalıdır. Hasarlı enerji veya gaz hattı varsa ilgili acil durum prosedürü uygulanmalıdır."
        : "In the event of cave-in, ground movement, underground-service damage, water ingress, hazardous atmosphere or injury, work shall stop immediately. Personnel shall evacuate the excavation safely and the area shall be isolated. Uncontrolled entry shall not be made to rescue a buried person; the site rescue and emergency procedure shall be activated. Where energy or gas services are damaged, the applicable emergency procedure shall be followed."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Kazıdan çıkan toprak, kirlenmiş malzeme ve atıklar proje atık yönetim sistemine göre kontrol edilmelidir. Yağ, yakıt veya hidrolik sıvı sızıntıları önlenmeli ve dökülme halinde spill kit kullanılmalıdır. Kazı suyunun drenaja veya çevreye kontrolsüz boşaltılması önlenmeli; gerektiğinde uygun sediment veya kirlilik kontrolü uygulanmalıdır."
        : "Excavated soil, contaminated material and waste shall be managed in accordance with the project waste-management system. Oil, fuel and hydraulic-fluid leaks shall be prevented and spill kits used where required. Excavation water shall not be discharged uncontrolled to drains or the environment; suitable sediment or contamination controls shall be used where necessary."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1926 Subpart P – Excavations\n• Proje / saha Kazı ve Toprak İşleri prosedürü\n• Yeraltı servis çizimleri / izin kayıtları\n• Kullanılan iksa ve ekipman üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1926 Subpart P – Excavations\n• Project / site Excavation and Earthworks procedure\n• Underground-service drawings / permit records\n• Manufacturer instructions for protective systems and equipment used"
    );
  };


  const loadElectricalTemplate = () => {
    setActivity(
      isTurkish ? "Elektrik Çalışmaları" : "Electrical Work"
    );

    setDocumentNo("SRN-MS-008");

    setScope(
      isTurkish
        ? "Bu Method Statement; elektrik ekipmanı, panolar, kablolar, devreler ve bağlantılar üzerinde yapılacak bakım, montaj, test, arıza giderme ve benzeri elektrik çalışmalarının güvenli şekilde gerçekleştirilmesi için uygulanacak yöntemi tanımlar. Çalışma; enerji durumunun belirlenmesi, izolasyon ve LOTO, gerilim yokluğunun doğrulanması, çalışma alanının kontrolü, uygun test ekipmanı ve PPE kullanımı, kontrollü çalışma ve güvenli yeniden enerjilendirme faaliyetlerini kapsar."
        : "This Method Statement defines the safe method for maintenance, installation, testing, troubleshooting and similar work on electrical equipment, panels, cables, circuits and connections. It covers determination of energy status, isolation and LOTO, verification of absence of voltage, work-area control, use of suitable test equipment and PPE, controlled work and safe re-energization."
    );

    setResponsibilities(
      isTurkish
        ? "Elektrik Süpervizörü: İş kapsamını, enerji durumunu, izolasyon gerekliliklerini ve çalışma yöntemini doğrular ve çalışmayı koordine eder.\nYetkili Elektrik Personeli: Elektrik izolasyonunu uygular, LOTO yapar, gerilim yokluğunu doğrular ve elektrik işini yetkisi dahilinde gerçekleştirir.\nHSE Personeli: Risk değerlendirmesi, saha kontrolleri, bariyerleme ve elektrik güvenliği gerekliliklerinin uygulanmasını destekler.\nÇalışanlar: Elektrik panolarına, izolasyon noktalarına veya enerjili bölgelere yetkisiz müdahalede bulunmaz."
        : "Electrical Supervisor: Confirms the scope, energy status, isolation requirements and safe work method and coordinates the activity.\nAuthorized Electrical Personnel: Apply electrical isolation and LOTO, verify absence of voltage and perform electrical work within their authorization.\nHSE Personnel: Support risk assessment, field verification, barricading and implementation of electrical-safety requirements.\nWorkers: Shall not interfere with electrical panels, isolation points or energized areas without authorization."
    );

    setCompetency(
      isTurkish
        ? "Elektrik işi yalnızca görev için uygun eğitim, bilgi, deneyim ve yetkiye sahip elektrik personeli tarafından gerçekleştirilmelidir. Personel elektrik çarpması, ark flaşı, LOTO, gerilim testi, uygun test ekipmanı, elektrik PPE'si ve acil durum gerekliliklerini bilmelidir."
        : "Electrical work shall be performed only by personnel with suitable training, knowledge, experience and authorization for the task. Personnel shall understand electric-shock hazards, arc-flash hazards, LOTO, voltage testing, suitable test equipment, electrical PPE and emergency requirements."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• Uygun iş kıyafeti\n• Göreve uygun göz / yüz koruması\n• Gerektiğinde elektrik yalıtımlı eldiven\n• Risk değerlendirmesine göre arc-rated / flame-resistant PPE\n• Gerektiğinde işitme koruması\n• Göreve özel diğer elektrik PPE'si"
        : "• Safety helmet\n• Safety footwear\n• Suitable work clothing\n• Task-appropriate eye / face protection\n• Electrical insulating gloves where required\n• Arc-rated / flame-resistant PPE as required by the risk assessment\n• Hearing protection where required\n• Other task-specific electrical PPE"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun ve kalibre edilmiş gerilim test cihazı\n• Onaylı LOTO kilit ve etiketleri\n• Yalıtımlı el aletleri gerektiğinde\n• Uygun ölçüm cihazları\n• Bariyer ve uyarı levhaları\n• Uygun geçici aydınlatma gerektiğinde\n• İzolasyon ekipmanı\n• Elektrik şemaları / tek hat diyagramı gerektiğinde\n• Acil durum ekipmanı proje prosedürüne göre"
        : "• Suitable calibrated voltage tester\n• Approved LOTO locks and tags\n• Insulated hand tools where required\n• Suitable electrical measuring instruments\n• Barricades and warning signs\n• Suitable temporary lighting where required\n• Isolation equipment\n• Electrical drawings / single-line diagram where required\n• Emergency equipment in accordance with project procedures"
    );

    setPermits(
      isTurkish
        ? "Elektrik çalışması başlamadan önce saha / proje prosedürlerinin gerektirdiği çalışma izni ve elektrik izolasyon / LOTO işlemleri tamamlanmalıdır. Mümkün olan tüm durumlarda çalışma enerjisiz durumda yapılmalıdır. Enerjili çalışma yalnızca proje prosedürlerinin izin verdiği ve gerekli özel değerlendirme, yetkilendirme ve kontrol önlemlerinin sağlandığı durumlarda gerçekleştirilmelidir."
        : "Before electrical work begins, the work permit and electrical isolation / LOTO requirements specified by site or project procedures shall be completed. Work shall be performed de-energized wherever practicable. Energized work shall only be performed where permitted by project procedures and where the required specific assessment, authorization and controls are in place."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve çalışma iznini kontrol et.\n• Elektrik şemalarını ve ilgili devre / ekipman kimliğini doğrula.\n• Tüm enerji kaynaklarını belirle.\n• Devreyi uygun noktadan izole et ve LOTO uygula.\n• Depolanmış veya geri besleme ihtimali olan enerjileri değerlendir.\n• Uygun gerilim test cihazını kullanım öncesi kontrol et.\n• Gerilim yokluğunu onaylı yöntemle doğrula.\n• Çalışma alanını bariyerle ve yetkisiz erişimi önle.\n• Uygun elektrik PPE'sini ve yalıtımlı ekipmanı belirle.\n• Yakındaki diğer enerjili bölümleri değerlendir ve koru.\n• Nem, su, iletken yüzey ve çevresel koşulları kontrol et.\n• Yeniden enerjilendirme öncesi iletişim ve izin düzenini doğrula."
        : "• Review the task-specific risk assessment and work permit.\n• Verify electrical drawings and correct circuit / equipment identification.\n• Identify all energy sources.\n• Isolate the circuit at suitable points and apply LOTO.\n• Assess stored energy and possible backfeed sources.\n• Check the suitable voltage tester before use.\n• Verify absence of voltage using an approved method.\n• Barricade the work area and prevent unauthorized access.\n• Determine the required electrical PPE and insulated equipment.\n• Assess and protect against nearby energized parts.\n• Check moisture, water, conductive surfaces and environmental conditions.\n• Confirm communication and authorization before re-energization."
    );

    setMethodSteps([
      {
        id: `elec-1-${Date.now()}`,
        step: isTurkish
          ? "İş kapsamını ve doğru elektrik devresini belirle."
          : "Confirm the work scope and correct electrical circuit.",
        hazards: isTurkish
          ? "Yanlış devrede çalışma, beklenmeyen enerji veya yanlış ekipman tanımlaması."
          : "Work on the wrong circuit, unexpected energy or incorrect equipment identification.",
        controls: isTurkish
          ? "Etiketleri, şemaları ve ekipman kimliğini doğrula. Çalışılacak devre ve enerji kaynaklarını açıkça belirle."
          : "Verify labels, drawings and equipment identity. Clearly identify the circuit and all energy sources involved.",
        responsible: isTurkish
          ? "Elektrik Süpervizörü / Yetkili Elektrikçi"
          : "Electrical Supervisor / Authorized Electrician",
      },
      {
        id: `elec-2-${Date.now()}`,
        step: isTurkish
          ? "Enerjiyi kes, izole et ve LOTO uygula."
          : "De-energize, isolate and apply LOTO.",
        hazards: isTurkish
          ? "Elektrik çarpması, beklenmeyen enerjilenme veya yanlış izolasyon."
          : "Electric shock, unexpected energization or incorrect isolation.",
        controls: isTurkish
          ? "Tüm ilgili enerji kaynaklarını izole et. Yetkili personel kişisel kilit ve etiketlerini uygulasın. Geri besleme kaynaklarını da kontrol et."
          : "Isolate all relevant energy sources. Authorized personnel shall apply personal locks and tags. Check for possible backfeed sources.",
        responsible: isTurkish
          ? "Yetkili Elektrikçi"
          : "Authorized Electrician",
      },
      {
        id: `elec-3-${Date.now()}`,
        step: isTurkish
          ? "Gerilim yokluğunu doğrula."
          : "Verify absence of voltage.",
        hazards: isTurkish
          ? "Devrenin hala enerjili olması, test cihazı arızası veya yanlış ölçüm."
          : "Circuit remaining energized, test-instrument failure or incorrect measurement.",
        controls: isTurkish
          ? "Uygun ve çalışır durumda olduğu doğrulanmış test cihazıyla tüm ilgili iletkenlerde gerilim yokluğunu kontrol et. Test cihazının fonksiyonunu doğrulama öncesi ve sonrası kontrol et."
          : "Verify absence of voltage on all relevant conductors using a suitable functioning test instrument. Confirm instrument operation before and after the verification."
        ,
        responsible: isTurkish
          ? "Yetkili Elektrikçi"
          : "Authorized Electrician",
      },
      {
        id: `elec-4-${Date.now()}`,
        step: isTurkish
          ? "Çalışma alanını güvenli hale getir."
          : "Secure the work area.",
        hazards: isTurkish
          ? "Yetkisiz erişim, yakın enerjili parçalar, ark veya temas riski."
          : "Unauthorized access, nearby energized parts, arc or contact hazards.",
        controls: isTurkish
          ? "Alanı bariyerle, gerekli uyarıları yerleştir ve yakın enerjili bölümleri uygun yöntemle koru. Çalışma mesafelerini ve erişimi kontrol et."
          : "Barricade the area, place required warnings and protect nearby energized parts by suitable means. Control approach and access."
        ,
        responsible: isTurkish
          ? "Elektrik Süpervizörü / HSE"
          : "Electrical Supervisor / HSE",
      },
      {
        id: `elec-5-${Date.now()}`,
        step: isTurkish
          ? "Elektrik işini kontrollü şekilde gerçekleştir."
          : "Perform the electrical work under controlled conditions.",
        hazards: isTurkish
          ? "Elektrik çarpması, ark flaşı, kısa devre, el aleti veya ekipman hatası."
          : "Electric shock, arc flash, short circuit, tool or equipment failure.",
        controls: isTurkish
          ? "Göreve uygun PPE, yalıtımlı ekipman ve doğru çalışma yöntemini kullan. Gereksiz metal eşya veya iletken malzemeleri çalışma alanından uzak tut."
          : "Use task-appropriate PPE, insulated equipment and the correct work method. Keep unnecessary metallic or conductive materials clear of the work area."
        ,
        responsible: isTurkish
          ? "Yetkili Elektrikçi"
          : "Authorized Electrician",
      },
      {
        id: `elec-6-${Date.now()}`,
        step: isTurkish
          ? "Bağlantıları ve tamamlanan işi kontrol et."
          : "Inspect connections and completed work.",
        hazards: isTurkish
          ? "Gevşek bağlantı, yanlış bağlantı, izolasyon hasarı veya kısa devre."
          : "Loose connection, incorrect wiring, damaged insulation or short circuit.",
        controls: isTurkish
          ? "Bağlantıları, kablo yönlendirmesini, kapakları, koruyucu elemanları ve ekipman bütünlüğünü kontrol et. Alet ve yabancı cisim bırakılmadığını doğrula."
          : "Inspect connections, cable routing, covers, protective devices and equipment integrity. Confirm no tools or foreign objects remain."
        ,
        responsible: isTurkish
          ? "Yetkili Elektrikçi / Elektrik Süpervizörü"
          : "Authorized Electrician / Electrical Supervisor",
      },
      {
        id: `elec-7-${Date.now()}`,
        step: isTurkish
          ? "LOTO kaldırma ve yeniden enerjilendirme hazırlığını yap."
          : "Prepare for LOTO removal and re-energization.",
        hazards: isTurkish
          ? "Personel çalışma alanındayken enerjilendirme veya kontrolsüz devreye alma."
          : "Energization while personnel remain exposed or uncontrolled startup.",
        controls: isTurkish
          ? "Tüm personelin tehlike alanından çıktığını ve koruyucuların yerine takıldığını doğrula. LOTO yalnızca prosedüre uygun yetkili kişiler tarafından kaldırılsın."
          : "Confirm all personnel are clear and guards / covers are restored. LOTO shall only be removed by authorized persons in accordance with procedure."
        ,
        responsible: isTurkish
          ? "Elektrik Süpervizörü / Yetkili Elektrikçi"
          : "Electrical Supervisor / Authorized Electrician",
      },
      {
        id: `elec-8-${Date.now()}`,
        step: isTurkish
          ? "Kontrollü şekilde enerjilendir ve fonksiyon kontrolü yap."
          : "Re-energize under control and perform functional checks.",
        hazards: isTurkish
          ? "Ark, ekipman arızası, beklenmeyen hareket veya elektriksel hata."
          : "Arc event, equipment failure, unexpected movement or electrical fault.",
        controls: isTurkish
          ? "Etkilenen personeli bilgilendir. Güvenli konumdan kontrollü şekilde enerjilendir ve ekipmanı gözlemle. Anormal durum görülürse enerjiyi tekrar kes ve sistemi güvenli hale getir."
          : "Inform affected personnel. Re-energize from a safe position under controlled conditions and observe equipment. If an abnormal condition occurs, de-energize again and make the system safe."
        ,
        responsible: isTurkish
          ? "Elektrik Süpervizörü / Yetkili Elektrikçi"
          : "Electrical Supervisor / Authorized Electrician",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Elektrik çarpması, ark olayı, yangın veya ekipman arızası halinde çalışma derhal durdurulmalı ve mümkünse enerji güvenli şekilde izole edilmelidir. Elektrik enerjisi kesilmeden yaralı kişiye doğrudan temas edilmemelidir. Saha alarm ve acil durum prosedürü uygulanmalı, eğitimli ilk yardımcı ve acil müdahale ekibi çağrılmalıdır. Elektrik yangınında yalnızca uygun söndürme ekipmanı kullanılmalıdır."
        : "In the event of electric shock, arc event, fire or equipment failure, work shall stop immediately and the energy shall be safely isolated where practicable. An injured person shall not be touched directly until electrical energy has been removed. The site alarm and emergency procedure shall be activated and trained first aid / emergency response personnel called. Only suitable firefighting equipment shall be used for electrical fires."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Hasarlı kablo, elektrik komponenti, pil / batarya ve diğer elektriksel atıklar proje atık yönetim sistemine göre ayrılmalı ve uygun şekilde bertaraf edilmelidir. Yağ veya kimyasal içeren elektrik ekipmanlarında sızıntı kontrolü yapılmalı ve dökülmeler kontrol altına alınmalıdır. Çalışma sonunda alan temiz, kuru ve güvenli bırakılmalıdır."
        : "Damaged cables, electrical components, cells / batteries and other electrical waste shall be segregated and disposed of in accordance with the project waste-management system. Electrical equipment containing oils or chemicals shall be checked for leakage and spills controlled. The area shall be left clean, dry and safe after completion."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1926 Subpart K – Electrical\n• OSHA 29 CFR 1926.416 – General Requirements\n• OSHA 29 CFR 1926.417 – Lockout and Tagging of Circuits\n• Proje / saha Elektrik Güvenliği ve LOTO prosedürleri\n• Kullanılan ekipman ve test cihazlarının üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1926 Subpart K – Electrical\n• OSHA 29 CFR 1926.416 – General Requirements\n• OSHA 29 CFR 1926.417 – Lockout and Tagging of Circuits\n• Project / site Electrical Safety and LOTO procedures\n• Manufacturer instructions for equipment and test instruments used"
    );
  };


  const loadGrindingCuttingTemplate = () => {
    setActivity(
      isTurkish
        ? "Taşlama ve Kesme Çalışmaları"
        : "Grinding & Cutting Work"
    );

    setDocumentNo("SRN-MS-009");

    setScope(
      isTurkish
        ? "Bu Method Statement; portatif taşlama makineleri, kesme makineleri ve benzeri döner ekipmanlarla gerçekleştirilen metal taşlama, kesme ve yüzey hazırlama çalışmalarının güvenli şekilde yapılması için uygulanacak yöntemi tanımlar. Çalışma; ekipman ve disk seçimi, kullanım öncesi kontrol, çalışma alanının hazırlanması, yangın ve kıvılcım kontrolü, doğru PPE kullanımı, güvenli çalışma tekniği ve çalışma sonrası kontrolleri kapsar."
        : "This Method Statement defines the safe method for metal grinding, cutting and surface-preparation activities using portable grinders, cutting machines and similar rotating equipment. It covers equipment and disc selection, pre-use inspection, work-area preparation, fire and spark control, correct PPE, safe operating techniques and post-work checks."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: Çalışma alanını, izin gerekliliklerini ve çalışma yöntemini doğrular ve işi koordine eder.\nOperatör / Çalışan: Taşlama veya kesme ekipmanını kullanım öncesi kontrol eder, doğru disk ve koruyucu ekipmanı kullanır ve güvenli çalışma yöntemine uyar.\nYangın Gözcüsü: Gerektiğinde kıvılcım ve sıcak parçacıkların çevreyi etkilemesini izler ve uygun yangın söndürme ekipmanını hazır bulundurur.\nHSE Personeli: Risk değerlendirmesi, saha kontrolleri, PPE ve yangın önleme gerekliliklerinin uygulanmasını destekler."
        : "Site Supervisor: Verifies the work area, permit requirements and safe work method and coordinates the activity.\nOperator / Worker: Inspects grinding or cutting equipment before use, uses the correct disc and guards and follows the safe operating method.\nFire Watch: Where required, monitors sparks and hot particles and keeps suitable firefighting equipment available.\nHSE Personnel: Supports risk assessment, field verification, PPE and fire-prevention requirements."
    );

    setCompetency(
      isTurkish
        ? "Taşlama ve kesme ekipmanını kullanan personel ekipmanın güvenli kullanımı, disk seçimi, RPM uyumluluğu, koruyucu muhafaza kullanımı, kickback riski, kıvılcım kontrolü ve gerekli PPE konusunda eğitimli ve yetkin olmalıdır."
        : "Personnel using grinding and cutting equipment shall be trained and competent in safe equipment use, disc selection, RPM compatibility, guard use, kickback hazards, spark control and required PPE."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Koruyucu gözlük\n• Tam yüz siperi\n• Uygun iş kıyafeti\n• Gerektiğinde işitme koruması\n• Toz oluşumuna göre uygun solunum koruması\n• Sıcak çalışma koşullarına göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• Safety glasses\n• Full face shield\n• Suitable work clothing\n• Hearing protection where required\n• Suitable respiratory protection where dust is generated\n• Additional PPE according to hot-work conditions"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun taşlama / kesme makinesi\n• İşe uygun ve doğru çapta disk\n• Ekipmana uygun koruyucu muhafaza\n• Yan tutma kolu\n• Uygun uzatma kablosu gerektiğinde\n• RCD / elektrik koruması gerektiğinde\n• Kelepçe / mengene gerektiğinde\n• Bariyer ve uyarı levhaları\n• Uygun yangın söndürücü\n• Kıvılcım perdesi / yangın battaniyesi gerektiğinde"
        : "• Suitable grinder / cutting machine\n• Correct type and diameter of disc\n• Suitable machine guard\n• Side handle\n• Suitable extension lead where required\n• RCD / electrical protection where required\n• Clamp / vice where required\n• Barricades and warning signs\n• Suitable fire extinguisher\n• Spark screen / fire blanket where required"
    );

    setPermits(
      isTurkish
        ? "Taşlama veya kesme faaliyetinin kıvılcım, sıcak parçacık veya ateşleme riski oluşturduğu durumlarda proje / saha prosedürüne göre Sıcak Çalışma İzni uygulanmalıdır. Çalışma alanındaki yanıcı ve parlayıcı malzemeler kontrol edilmeli, gerekirse gaz ölçümü ve yangın gözcüsü sağlanmalıdır."
        : "Where grinding or cutting generates sparks, hot particles or an ignition hazard, a Hot Work Permit shall be applied in accordance with project / site procedures. Combustible and flammable materials shall be controlled and gas testing and a fire watch provided where required."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve gerekli çalışma iznini kontrol et.\n• Kullanılacak makinenin ve kablonun fiziksel durumunu kontrol et.\n• Disk tipinin yapılacak işe uygun olduğunu doğrula.\n• Disk maksimum RPM değerinin makine RPM değerinden düşük olmadığını doğrula.\n• Diskte çatlak, kırık, nem veya deformasyon olmadığını kontrol et.\n• Koruyucu muhafaza ve yan tutma kolunun takılı olduğunu doğrula.\n• Çalışılacak parçayı sabitle.\n• Kıvılcım yönünü belirle ve yanıcı malzemeleri kaldır veya koru.\n• Çevredeki personeli kıvılcım ve parçacıklardan koru.\n• Yangın söndürücü ve gerektiğinde yangın gözcüsünü hazırla.\n• Elektrik kablosunu kesme / taşlama hattından uzak tut.\n• PPE'yi kontrol et."
        : "• Review the task-specific risk assessment and required work permit.\n• Inspect the physical condition of the machine and cable.\n• Confirm the disc type is suitable for the task.\n• Verify the disc maximum RPM is not lower than the machine RPM.\n• Check the disc for cracks, damage, moisture or deformation.\n• Confirm the guard and side handle are correctly fitted.\n• Secure the workpiece.\n• Determine spark direction and remove or protect combustible materials.\n• Protect surrounding personnel from sparks and particles.\n• Provide a fire extinguisher and fire watch where required.\n• Keep electrical cables clear of the cutting / grinding path.\n• Verify required PPE."
    );

    setMethodSteps([
      {
        id: `gc-1-${Date.now()}`,
        step: isTurkish
          ? "Ekipmanı ve doğru diski seç."
          : "Select the equipment and correct disc.",
        hazards: isTurkish
          ? "Yanlış disk, kapasite veya RPM uyumsuzluğu."
          : "Incorrect disc, capacity or RPM incompatibility.",
        controls: isTurkish
          ? "Diskin malzeme ve iş tipine uygun olduğunu ve maksimum RPM değerinin makine hızına uygun olduğunu doğrula."
          : "Confirm the disc is suitable for the material and task and that its maximum RPM rating is compatible with machine speed.",
        responsible: isTurkish ? "Operatör / Süpervizör" : "Operator / Supervisor",
      },
      {
        id: `gc-2-${Date.now()}`,
        step: isTurkish
          ? "Makine ve diski kullanım öncesi kontrol et."
          : "Inspect the machine and disc before use.",
        hazards: isTurkish
          ? "Disk patlaması, elektrik arızası veya koruyucu muhafaza eksikliği."
          : "Disc burst, electrical failure or missing guard.",
        controls: isTurkish
          ? "Disk, muhafaza, yan kol, anahtar, kablo ve fişi kontrol et. Hasarlı ekipmanı kullanma."
          : "Inspect the disc, guard, side handle, switch, cable and plug. Do not use damaged equipment.",
        responsible: isTurkish ? "Operatör" : "Operator",
      },
      {
        id: `gc-3-${Date.now()}`,
        step: isTurkish
          ? "Çalışma alanını hazırla."
          : "Prepare the work area.",
        hazards: isTurkish
          ? "Kıvılcım, yangın, çevredeki personele parçacık sıçraması."
          : "Sparks, fire or particles striking surrounding personnel.",
        controls: isTurkish
          ? "Yanıcı malzemeleri uzaklaştır, kıvılcım yönünü güvenli alana çevir ve gerekiyorsa kıvılcım perdesi ile dışlama alanı oluştur."
          : "Remove combustible materials, direct sparks toward a safe area and establish spark screens and exclusion zones where required.",
        responsible: isTurkish ? "Süpervizör / HSE" : "Supervisor / HSE",
      },
      {
        id: `gc-4-${Date.now()}`,
        step: isTurkish
          ? "İş parçasını güvenli şekilde sabitle."
          : "Secure the workpiece.",
        hazards: isTurkish
          ? "Parçanın hareket etmesi, sıkışma veya kickback."
          : "Workpiece movement, trapping or kickback.",
        controls: isTurkish
          ? "Parçayı uygun mengene, kelepçe veya destek sistemiyle sabitle. Elde tutulan gevşek parça üzerinde kontrolsüz kesim yapma."
          : "Secure the workpiece using a suitable vice, clamp or support. Do not perform uncontrolled cutting on loose hand-held material.",
        responsible: isTurkish ? "Operatör" : "Operator",
      },
      {
        id: `gc-5-${Date.now()}`,
        step: isTurkish
          ? "Makineyi güvenli pozisyonda çalıştır."
          : "Operate the machine from a safe position.",
        hazards: isTurkish
          ? "Kickback, kontrol kaybı, kesilme veya disk teması."
          : "Kickback, loss of control, cuts or disc contact.",
        controls: isTurkish
          ? "Makineyi iki elle ve yan kol kullanarak kontrol et. Vücudu disk hattından uzak tut ve makineye aşırı baskı uygulama."
          : "Control the machine with both hands using the side handle. Keep the body clear of the disc line and do not apply excessive pressure.",
        responsible: isTurkish ? "Operatör" : "Operator",
      },
      {
        id: `gc-6-${Date.now()}`,
        step: isTurkish
          ? "Taşlama / kesmeyi kontrollü şekilde gerçekleştir."
          : "Perform grinding / cutting under control.",
        hazards: isTurkish
          ? "Sıcak parçacık, gürültü, titreşim, toz ve disk kırılması."
          : "Hot particles, noise, vibration, dust and disc failure.",
        controls: isTurkish
          ? "Doğru kesme / taşlama açısını koru. Disk sıkışmasına neden olacak hareketlerden kaçın. Uzun süreli kullanımda titreşim ve maruziyet sürelerini kontrol et."
          : "Maintain the correct cutting / grinding angle. Avoid movements that can bind the disc. Control vibration and exposure duration during prolonged use.",
        responsible: isTurkish ? "Operatör" : "Operator",
      },
      {
        id: `gc-7-${Date.now()}`,
        step: isTurkish
          ? "Makineyi durdur ve güvenli şekilde bırak."
          : "Stop and place the machine safely.",
        hazards: isTurkish
          ? "Dönen diske temas veya makinenin kontrolsüz hareketi."
          : "Contact with a rotating disc or uncontrolled machine movement.",
        controls: isTurkish
          ? "Makineyi bırakmadan önce diskin tamamen durmasını bekle. Disk dönerken makineyi zemine veya çalışma yüzeyine bırakma."
          : "Wait until the disc has completely stopped before putting the machine down. Do not place the machine on a surface while the disc is rotating.",
        responsible: isTurkish ? "Operatör" : "Operator",
      },
      {
        id: `gc-8-${Date.now()}`,
        step: isTurkish
          ? "Çalışma sonrası alan ve yangın kontrolünü tamamla."
          : "Complete post-work area and fire checks.",
        hazards: isTurkish
          ? "Gizli yangın, sıcak metal, atık disk veya düzensiz alan."
          : "Hidden fire, hot metal, discarded discs or poor housekeeping.",
        controls: isTurkish
          ? "Sıcak parçaları güvenli hale getir. Alanı yangın veya duman açısından kontrol et. Kullanılmış disk ve metal atıklarını uygun şekilde topla."
          : "Make hot materials safe. Inspect the area for fire or smoke and correctly collect used discs and metal waste.",
        responsible: isTurkish
          ? "Operatör / Yangın Gözcüsü / Süpervizör"
          : "Operator / Fire Watch / Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Disk kırılması, ciddi kesik, göz yaralanması, yangın veya elektrik arızası halinde çalışma derhal durdurulmalı ve ekipmanın enerjisi kesilmelidir. Yaralanan personele uygun ilk yardım uygulanmalı ve saha acil durum prosedürü devreye alınmalıdır. Yangında yalnızca eğitimli personel güvenli olması halinde uygun yangın söndürücüyle ilk müdahaleyi gerçekleştirmelidir."
        : "In the event of disc failure, serious cut, eye injury, fire or electrical fault, work shall stop immediately and the equipment shall be isolated from its energy source. Appropriate first aid shall be provided and the site emergency procedure activated. Only trained personnel shall attempt initial firefighting with suitable equipment where safe to do so."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Kullanılmış taşlama / kesme diskleri, metal çapakları ve diğer atıklar belirlenen atık sistemine göre toplanmalıdır. Toz oluşumu mümkün olduğunda kaynağında kontrol edilmeli ve çalışma sonunda alan temiz bırakılmalıdır. Kıvılcım ve sıcak metal parçalarının çevredeki ekipmana veya yanıcı maddelere zarar vermesi önlenmelidir."
        : "Used grinding / cutting discs, metal debris and other waste shall be collected in accordance with the designated waste-management system. Dust shall be controlled at source where practicable and the area left clean after work. Sparks and hot metal particles shall be prevented from damaging surrounding equipment or combustible materials."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1926 Subpart I – Tools, Hand and Power\n• OSHA 29 CFR 1926.300 – General Requirements\n• OSHA 29 CFR 1926.303 – Abrasive Wheels and Tools\n• Proje / saha Sıcak Çalışma prosedürü\n• Taşlama / kesme ekipmanı ve disk üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1926 Subpart I – Tools, Hand and Power\n• OSHA 29 CFR 1926.300 – General Requirements\n• OSHA 29 CFR 1926.303 – Abrasive Wheels and Tools\n• Project / site Hot Work procedure\n• Grinder / cutting equipment and disc manufacturer instructions"
    );
  };


  const loadPipingTemplate = () => {
    setActivity(
      isTurkish ? "Borulama Çalışmaları" : "Piping Works"
    );

    setDocumentNo("SRN-MS-010");

    setScope(
      isTurkish
        ? "Bu Method Statement; boru, spool, fitting, flange ve benzeri borulama elemanlarının saha içerisinde taşınması, hizalanması, montajı, bağlantısı, desteklenmesi ve gerekli durumlarda sökülmesi için uygulanacak güvenli çalışma yöntemini tanımlar. Çalışma; malzeme elleçleme, kaldırma, flange hizalama, boru destekleri, sıcak çalışma, hat açma, artık basınç kontrolü, keskin kenarlar ve çalışma alanı düzenini kapsar."
        : "This Method Statement defines the safe method for handling, aligning, installing, connecting, supporting and, where required, dismantling pipes, spools, fittings, flanges and similar piping components. It covers material handling, lifting, flange alignment, pipe supports, hot work, line opening, residual pressure, sharp edges and work-area control."
    );

    setResponsibilities(
      isTurkish
        ? "Borulama Süpervizörü: İş kapsamını, çizimleri, malzeme ve saha koşullarını doğrular ve çalışmayı koordine eder.\nPipe Fitter / Mekanik Personel: Boru ve spool montajını, hizalamayı ve bağlantıları onaylı yöntem ve çizimlere göre gerçekleştirir.\nRigger / Kaldırma Ekibi: Spool ve ağır boru elemanlarının güvenli kaldırma ve yerleştirme faaliyetlerini gerçekleştirir.\nHSE Personeli: Risk değerlendirmesi, kaldırma, sıcak çalışma, line opening ve saha kontrol gerekliliklerinin uygulanmasını destekler."
        : "Piping Supervisor: Confirms the scope, drawings, materials and site conditions and coordinates the work.\nPipe Fitter / Mechanical Personnel: Perform pipe and spool installation, alignment and connections in accordance with approved methods and drawings.\nRigger / Lifting Team: Carry out safe lifting and positioning of spools and heavy piping components.\nHSE Personnel: Support risk assessment, lifting, hot-work, line-opening and field-control requirements."
    );

    setCompetency(
      isTurkish
        ? "Borulama çalışmalarında görev alan personel boru montajı, flange hizalama, elleçleme, kaldırma, pinch point, line-of-fire ve gerektiğinde sıcak çalışma / line opening riskleri konusunda eğitimli ve yetkin olmalıdır."
        : "Personnel involved in piping work shall be trained and competent in pipe installation, flange alignment, handling, lifting, pinch-point and line-of-fire hazards and, where applicable, hot-work / line-opening risks."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Uygun iş kıyafeti\n• Göz koruması\n• Keskin kenar riskine göre uygun eldiven\n• Sıcak çalışma varsa uygun yüz / göz koruması ve ilave PPE\n• Gürültü ve diğer maruziyetlere göre gerekli PPE"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• Suitable work clothing\n• Eye protection\n• Suitable gloves for sharp-edge hazards\n• Face / eye protection and additional PPE where hot work is performed\n• Additional PPE as required for noise and other exposures"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun el aletleri\n• Tork anahtarı gerektiğinde\n• Flange alignment tools gerektiğinde\n• Uygun kaldırma ve rigging ekipmanı\n• Chain block / lever hoist gerektiğinde\n• Boru sehpası / pipe stand\n• Geçici destek ekipmanı gerektiğinde\n• Taşlama / kesme ekipmanı gerektiğinde\n• Kaynak ekipmanı gerektiğinde\n• Bariyer ve uyarı levhaları"
        : "• Suitable hand tools\n• Torque wrench where required\n• Flange-alignment tools where required\n• Suitable lifting and rigging equipment\n• Chain block / lever hoist where required\n• Pipe stands\n• Temporary support equipment where required\n• Grinding / cutting equipment where required\n• Welding equipment where required\n• Barricades and warning signs"
    );

    setPermits(
      isTurkish
        ? "İş kapsamına göre Mekanik Çalışma, Sıcak Çalışma, Kaldırma veya Line Opening izinleri uygulanmalıdır. Proses hattı üzerinde çalışma yapılacaksa hat durumu, izolasyon, LOTO, drenaj ve artık basınç kontrolü işe başlamadan önce doğrulanmalıdır."
        : "Mechanical Work, Hot Work, Lifting or Line Opening permits shall be applied as required by the work scope. Where process piping is involved, line status, isolation, LOTO, draining and residual-pressure controls shall be verified before work begins."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve gerekli izinleri kontrol et.\n• Güncel çizim, isometric ve spool bilgilerini doğrula.\n• Boru / spool ağırlığını ve elleçleme yöntemini belirle.\n• Gerekirse kaldırma planını ve rigging ekipmanını kontrol et.\n• Boru sehpası ve geçici desteklerin uygunluğunu doğrula.\n• Flange ve bağlantı noktalarında pinch point risklerini belirle.\n• Proses hattıysa izolasyon, LOTO, drenaj ve basınçsızlığı doğrula.\n• Hat içinde kimyasal veya proses kalıntısı riskini değerlendir.\n• Sıcak çalışma gerekiyorsa ilgili kontrolleri uygula.\n• Keskin kenar ve çapakları kontrol et.\n• Çalışma alanını bariyerle ve housekeeping düzenini sağla.\n• Eş zamanlı işleri değerlendir."
        : "• Review the task-specific risk assessment and required permits.\n• Verify current drawings, isometrics and spool information.\n• Determine pipe / spool weight and handling method.\n• Check the lifting plan and rigging equipment where required.\n• Verify pipe stands and temporary supports.\n• Identify pinch-point risks at flanges and connections.\n• For process lines, verify isolation, LOTO, draining and zero pressure.\n• Assess chemical or process residues inside the line.\n• Apply hot-work controls where required.\n• Check sharp edges and burrs.\n• Barricade the work area and maintain good housekeeping.\n• Assess simultaneous operations."
    );

    setMethodSteps([
      {
        id: `pipe-1-${Date.now()}`,
        step: isTurkish
          ? "Çizim ve iş kapsamını doğrula."
          : "Verify drawings and work scope.",
        hazards: isTurkish
          ? "Yanlış spool, yanlış bağlantı veya hatalı montaj."
          : "Incorrect spool, wrong connection or incorrect installation.",
        controls: isTurkish
          ? "Güncel isometric, spool numarası ve bağlantı noktalarını kontrol et. Montaj yapılacak hattı ve yönü doğrula."
          : "Check current isometrics, spool identification and connection points. Confirm the correct line and installation orientation.",
        responsible: isTurkish ? "Borulama Süpervizörü" : "Piping Supervisor",
      },
      {
        id: `pipe-2-${Date.now()}`,
        step: isTurkish
          ? "Boru / spoolu güvenli şekilde taşı ve konumlandır."
          : "Handle and position the pipe / spool safely.",
        hazards: isTurkish
          ? "Ağır yük, ezilme, sıkışma veya yük düşmesi."
          : "Heavy load, crushing, trapping or dropped load.",
        controls: isTurkish
          ? "Ağırlığa uygun mekanik kaldırma yöntemi kullan. Elle kaldırma limitlerini aşma. Rigging ekipmanını ve kaldırma noktalarını doğrula."
          : "Use a suitable mechanical handling method for the weight. Do not exceed manual-handling limits. Verify rigging and lifting points.",
        responsible: isTurkish ? "Rigger / Pipe Fitter" : "Rigger / Pipe Fitter",
      },
      {
        id: `pipe-3-${Date.now()}`,
        step: isTurkish
          ? "Boruyu uygun desteklere yerleştir."
          : "Place the pipe on suitable supports.",
        hazards: isTurkish
          ? "Boru yuvarlanması, destek çökmesi veya sıkışma."
          : "Pipe rolling, support failure or trapping.",
        controls: isTurkish
          ? "Uygun pipe stand veya kalıcı / geçici destek kullan. Boruyu yuvarlanmaya karşı sabitle ve elleri pinch pointlerden uzak tut."
          : "Use suitable pipe stands or permanent / temporary supports. Secure the pipe against rolling and keep hands clear of pinch points.",
        responsible: isTurkish ? "Pipe Fitter / Süpervizör" : "Pipe Fitter / Supervisor",
      },
      {
        id: `pipe-4-${Date.now()}`,
        step: isTurkish
          ? "Flange ve bağlantıları kontrollü şekilde hizala."
          : "Align flanges and connections under control.",
        hazards: isTurkish
          ? "Pinch point, el yaralanması, ekipman veya flange hareketi."
          : "Pinch points, hand injury or flange / equipment movement.",
        controls: isTurkish
          ? "Ellerini flange aralığına sokma. Uygun alignment tool veya kontrollü mekanik yöntem kullan. Flange deliklerini parmakla hizalama."
          : "Do not place hands between flange faces. Use suitable alignment tools or controlled mechanical methods. Do not align bolt holes using fingers.",
        responsible: isTurkish ? "Pipe Fitter" : "Pipe Fitter",
      },
      {
        id: `pipe-5-${Date.now()}`,
        step: isTurkish
          ? "Bağlantı ve montaj işlemlerini tamamla."
          : "Complete connections and installation.",
        hazards: isTurkish
          ? "Keskin kenar, yanlış bolt / gasket, gevşek bağlantı veya düşen malzeme."
          : "Sharp edges, incorrect bolts / gasket, loose connection or falling material.",
        controls: isTurkish
          ? "Doğru gasket, bolt ve bağlantı elemanlarını kullan. Gerekli tork değerlerini uygula. Çapak ve keskin kenarları kontrol et."
          : "Use the correct gasket, bolts and connection components. Apply required torque values and control burrs and sharp edges.",
        responsible: isTurkish ? "Pipe Fitter / Süpervizör" : "Pipe Fitter / Supervisor",
      },
      {
        id: `pipe-6-${Date.now()}`,
        step: isTurkish
          ? "Gerekli sıcak çalışma / kesme işlemlerini kontrollü yap."
          : "Perform required hot work / cutting under control.",
        hazards: isTurkish
          ? "Yangın, kıvılcım, duman veya sıcak metal."
          : "Fire, sparks, fumes or hot metal.",
        controls: isTurkish
          ? "Geçerli sıcak çalışma izni ve yangın kontrollerini uygula. Yanıcı malzemeleri uzaklaştır ve gerekli PPE'yi kullan."
          : "Apply a valid hot-work permit and fire controls. Remove combustible materials and use required PPE.",
        responsible: isTurkish ? "Süpervizör / Yetkili Personel" : "Supervisor / Authorized Personnel",
      },
      {
        id: `pipe-7-${Date.now()}`,
        step: isTurkish
          ? "Montajı ve destekleri son kez kontrol et."
          : "Perform final inspection of installation and supports.",
        hazards: isTurkish
          ? "Eksik destek, gevşek bağlantı, yanlış hizalama veya düşen parça."
          : "Missing support, loose connection, misalignment or falling component.",
        controls: isTurkish
          ? "Tüm bağlantıları, destekleri, boltları, flange durumunu ve montaj hizasını kontrol et. Geçici ekipmanı kontrollü kaldır."
          : "Inspect all connections, supports, bolts, flange condition and installation alignment. Remove temporary equipment under control.",
        responsible: isTurkish ? "Borulama Süpervizörü" : "Piping Supervisor",
      },
      {
        id: `pipe-8-${Date.now()}`,
        step: isTurkish
          ? "Alanı temizle ve işi teslim et."
          : "Clean the area and hand over the work.",
        hazards: isTurkish
          ? "Takılma, keskin metal atığı, kalan ekipman veya kontrolsüz alan."
          : "Trips, sharp metal waste, leftover equipment or uncontrolled area.",
        controls: isTurkish
          ? "Metal çapakları, elektrot, disk ve diğer atıkları topla. Alet ve kaldırma ekipmanını kaldır. Alanı güvenli ve temiz şekilde teslim et."
          : "Collect metal debris, electrodes, discs and other waste. Remove tools and lifting equipment and hand over the area clean and safe.",
        responsible: isTurkish ? "Tüm Ekip / Süpervizör" : "All Crew / Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Boru / spool düşmesi, ciddi sıkışma, hat açılması sırasında proses maddesi çıkışı, yangın veya diğer acil durumda çalışma derhal durdurulmalıdır. Alan izole edilmeli ve personel tehlike bölgesinden uzaklaştırılmalıdır. Proses hattı kaynaklı sızıntı veya basınç varsa saha acil durum ve izolasyon prosedürü uygulanmalıdır."
        : "In the event of a dropped pipe / spool, serious trapping injury, process release during line opening, fire or another emergency, work shall stop immediately. The area shall be isolated and personnel kept clear of the danger zone. For process releases or pressure hazards, the site emergency and isolation procedures shall be implemented."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Metal çapakları, kesme parçaları, elektrotlar, diskler, gasket kalıntıları ve diğer atıklar proje atık sistemine göre ayrılmalıdır. Proses hattı açılması halinde sıvı veya kimyasalların zemine ve drenaja kontrolsüz boşaltılması önlenmelidir."
        : "Metal debris, offcuts, electrodes, discs, gasket residues and other waste shall be segregated under the project waste-management system. Where process lines are opened, uncontrolled release of liquids or chemicals to the ground or drainage shall be prevented."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1926 Subpart H – Materials Handling, Storage, Use, and Disposal\n• OSHA 29 CFR 1926 Subpart I – Tools, Hand and Power\n• OSHA 29 CFR 1926 Subpart R / ilgili kaldırma gereklilikleri proje kapsamına göre\n• Proje / saha Piping, Lifting, Hot Work ve Line Opening prosedürleri\n• Kullanılan ekipman ve üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1926 Subpart H – Materials Handling, Storage, Use, and Disposal\n• OSHA 29 CFR 1926 Subpart I – Tools, Hand and Power\n• Applicable lifting requirements according to project scope\n• Project / site Piping, Lifting, Hot Work and Line Opening procedures\n• Manufacturer instructions for equipment used"
    );
  };


  const loadHydrotestTemplate = () => {
    setActivity(
      isTurkish
        ? "Hidrostatik Basınç Testi"
        : "Hydrostatic Pressure Testing"
    );

    setDocumentNo("SRN-MS-011");

    setScope(
      isTurkish
        ? "Bu Method Statement; boru hattı, ekipman, spool, vessel veya benzeri sistemlerin su kullanılarak hidrostatik basınç testine tabi tutulması için uygulanacak güvenli çalışma yöntemini tanımlar. Çalışma; test sınırlarının doğrulanması, izolasyon, test ekipmanlarının kurulması, su doldurma, hava tahliyesi, kontrollü basınçlandırma, test basıncında bekleme, kaçak kontrolü, kontrollü basınç düşürme ve test suyunun güvenli şekilde tahliyesini kapsar."
        : "This Method Statement defines the safe method for hydrostatic pressure testing of piping, equipment, spools, vessels or similar systems using water. It covers confirmation of test boundaries, isolation, installation of test equipment, filling, venting air, controlled pressurization, holding at test pressure, leak inspection, controlled depressurization and safe discharge of test water."
    );

    setResponsibilities(
      isTurkish
        ? "Test Süpervizörü: Test kapsamını, test basıncını, sınırları, ekipmanı ve test prosedürünü doğrular ve çalışmayı koordine eder.\nYetkili Test Personeli: Pompa, manometre, relief sistemi ve bağlantıları kurar; test basıncını kontrollü şekilde uygular ve izler.\nMekanik Ekip: Test sınırlarının, blind / flange bağlantılarının ve mekanik bütünlüğün hazır olduğunu doğrular.\nHSE Personeli: Dışlama alanı, line-of-fire, basınçlı sistem ve tahliye kontrollerini destekler."
        : "Test Supervisor: Confirms the test scope, pressure, boundaries, equipment and procedure and coordinates the activity.\nAuthorized Test Personnel: Install the pump, gauges, relief system and connections and apply and monitor test pressure under controlled conditions.\nMechanical Team: Confirm test boundaries, blinds / flange connections and mechanical integrity are ready.\nHSE Personnel: Support exclusion-zone, line-of-fire, pressurized-system and discharge controls."
    );

    setCompetency(
      isTurkish
        ? "Hidrostatik testte görev alan personel basınçlı sistem tehlikeleri, stored energy, test basıncı, manometre kullanımı, relief sistemleri, line-of-fire, güvenli basınçlandırma / basınç düşürme ve acil durum prosedürleri konusunda eğitimli ve yetkin olmalıdır."
        : "Personnel involved in hydrostatic testing shall be trained and competent in pressurized-system hazards, stored energy, test pressure, pressure-gauge use, relief systems, line-of-fire hazards, safe pressurization / depressurization and emergency procedures."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Uygun iş kıyafeti\n• Koruyucu gözlük\n• Gerektiğinde yüz siperi\n• Islak çalışma koşullarına göre uygun PPE\n• Risk değerlendirmesine göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• Suitable work clothing\n• Safety glasses\n• Face shield where required\n• Suitable PPE for wet working conditions\n• Additional PPE as required by the risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun hydrotest pompası\n• Kalibre edilmiş basınç manometresi / manometreleri\n• Uygun relief valve / basınç tahliye sistemi\n• Test manifold ve bağlantıları\n• Uygun hortumlar ve fittings\n• Blind / test flange / test plug gerektiğinde\n• Hava tahliye / vent noktaları\n• Drenaj / tahliye hattı\n• Bariyer ve uyarı levhaları\n• Haberleşme ekipmanı gerektiğinde"
        : "• Suitable hydrotest pump\n• Calibrated pressure gauge(s)\n• Suitable relief valve / pressure-relief system\n• Test manifold and connections\n• Suitable hoses and fittings\n• Blinds / test flanges / test plugs where required\n• Air vents\n• Drain / discharge line\n• Barricades and warning signs\n• Communication equipment where required"
    );

    setPermits(
      isTurkish
        ? "Hidrostatik test başlamadan önce proje / saha prosedürlerinin gerektirdiği test izni veya çalışma izni tamamlanmalıdır. Test paketi, test basıncı, test sınırları, izolasyonlar, blind listesi ve ilgili onaylar doğrulanmalıdır. Test alanı yetkisiz erişime karşı kontrol edilmelidir."
        : "Before hydrostatic testing begins, the required test permit or work permit under project / site procedures shall be completed. The test package, test pressure, boundaries, isolations, blind list and required approvals shall be verified. The test area shall be controlled against unauthorized access."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Onaylı test paketini ve test basıncını doğrula.\n• Test sınırlarını, blind / flange noktalarını ve izolasyonları kontrol et.\n• Test edilen sistemin mekanik olarak tamamlandığını doğrula.\n• Manometrelerin kalibrasyon durumunu kontrol et.\n• Test pompası, manifold, hortum ve bağlantıların basınç kapasitesini doğrula.\n• Relief valve / basınç tahliye sistemini kontrol et.\n• Hava tahliye noktalarını belirle.\n• Dışlama alanını ve line-of-fire bölgelerini oluştur.\n• Personelin test bağlantıları ve blindların önünde durmasını önle.\n• Test suyunun kaynağını ve tahliye yöntemini belirle.\n• Donma, çevre sıcaklığı ve diğer saha koşullarını değerlendir.\n• İletişim yöntemini ve acil durdurma düzenini doğrula."
        : "• Verify the approved test package and test pressure.\n• Check test boundaries, blind / flange points and isolations.\n• Confirm the system is mechanically complete for testing.\n• Check pressure-gauge calibration status.\n• Verify pressure ratings of the test pump, manifold, hoses and connections.\n• Check the relief valve / pressure-relief system.\n• Identify air-vent points.\n• Establish the exclusion zone and line-of-fire areas.\n• Prevent personnel from standing in front of test connections and blinds.\n• Determine the test-water source and discharge method.\n• Assess freezing, ambient temperature and other site conditions.\n• Confirm communication and emergency-stop arrangements."
    );

    setMethodSteps([
      {
        id: `hydro-1-${Date.now()}`,
        step: isTurkish
          ? "Test sınırlarını ve mekanik hazırlığı doğrula."
          : "Verify test boundaries and mechanical readiness.",
        hazards: isTurkish
          ? "Yanlış test sınırı, eksik blind veya zayıf bağlantı."
          : "Incorrect test boundary, missing blind or weak connection.",
        controls: isTurkish
          ? "Test paketi, blind listesi, flange bağlantıları ve izolasyonları kontrol et. Sistem mekanik olarak hazır olmadan test başlatma."
          : "Check the test package, blind list, flange connections and isolations. Do not begin testing until the system is mechanically ready.",
        responsible: isTurkish ? "Test Süpervizörü / Mekanik Ekip" : "Test Supervisor / Mechanical Team",
      },
      {
        id: `hydro-2-${Date.now()}`,
        step: isTurkish
          ? "Test ekipmanını kur ve kontrol et."
          : "Install and inspect test equipment.",
        hazards: isTurkish
          ? "Hortum, manifold, gauge veya bağlantı arızası."
          : "Hose, manifold, gauge or connection failure.",
        controls: isTurkish
          ? "Tüm test ekipmanının uygun basınç sınıfında olduğunu doğrula. Kalibre edilmiş manometre ve uygun relief sistemi kullan."
          : "Verify all test equipment is rated for the required pressure. Use calibrated gauges and a suitable relief system.",
        responsible: isTurkish ? "Yetkili Test Personeli" : "Authorized Test Personnel",
      },
      {
        id: `hydro-3-${Date.now()}`,
        step: isTurkish
          ? "Sistemi suyla doldur ve havayı tahliye et."
          : "Fill the system with water and vent trapped air.",
        hazards: isTurkish
          ? "Sistemde sıkışmış hava, kontrolsüz su çıkışı veya taşma."
          : "Trapped air, uncontrolled water release or overflow.",
        controls: isTurkish
          ? "Düşük noktadan doldur ve yüksek noktalardaki ventleri kontrollü aç. Sistemde sıkışmış hava kalmadığını doğrula."
          : "Fill from a low point and vent high points under control. Confirm trapped air has been removed.",
        responsible: isTurkish ? "Test Ekibi" : "Test Team",
      },
      {
        id: `hydro-4-${Date.now()}`,
        step: isTurkish
          ? "Dışlama alanını aktif hale getir."
          : "Activate the exclusion zone.",
        hazards: isTurkish
          ? "Stored energy, blind / fitting fırlaması veya line-of-fire maruziyeti."
          : "Stored energy, ejected blind / fitting or line-of-fire exposure.",
        controls: isTurkish
          ? "Basınçlandırma başlamadan önce tüm yetkisiz personeli alandan çıkar. Blind, flange, test plug, hose ve fittinglerin önünde personel bulunmasına izin verme."
          : "Remove unauthorized personnel before pressurization. Do not allow personnel in front of blinds, flanges, test plugs, hoses or fittings.",
        responsible: isTurkish ? "Test Süpervizörü / HSE" : "Test Supervisor / HSE",
      },
      {
        id: `hydro-5-${Date.now()}`,
        step: isTurkish
          ? "Basıncı kontrollü kademelerle artır."
          : "Increase pressure in controlled stages.",
        hazards: isTurkish
          ? "Aşırı basınç, ani ekipman arızası veya stored energy."
          : "Overpressure, sudden equipment failure or stored energy.",
        controls: isTurkish
          ? "Basıncı kontrollü ve kademeli artır. Her aşamada sistemi gözlemle. Onaylı test basıncını aşma ve relief sistemini devrede tut."
          : "Increase pressure gradually and under control. Observe the system at each stage. Do not exceed the approved test pressure and keep the relief system functional.",
        responsible: isTurkish ? "Yetkili Test Personeli" : "Authorized Test Personnel",
      },
      {
        id: `hydro-6-${Date.now()}`,
        step: isTurkish
          ? "Test basıncında bekle ve kontrollü kaçak kontrolü yap."
          : "Hold test pressure and perform controlled leak inspection.",
        hazards: isTurkish
          ? "Basınçlı bağlantıya yaklaşma, kaçak jetine maruziyet veya fitting arızası."
          : "Approaching pressurized connections, exposure to leak jets or fitting failure.",
        controls: isTurkish
          ? "Kaçak kontrolünü güvenli mesafeden yap. Basınçlı bağlantıları elle sıkma veya düzeltme. Kaçak varsa önce basıncı güvenli şekilde düşür."
          : "Inspect for leaks from a safe position. Do not tighten or adjust pressurized connections. If leakage is found, safely depressurize first.",
        responsible: isTurkish ? "Test Süpervizörü / Test Ekibi" : "Test Supervisor / Test Team",
      },
      {
        id: `hydro-7-${Date.now()}`,
        step: isTurkish
          ? "Basıncı kontrollü şekilde düşür."
          : "Depressurize the system under control.",
        hazards: isTurkish
          ? "Ani basınç boşalması, hose movement veya su püskürmesi."
          : "Sudden pressure release, hose movement or water discharge.",
        controls: isTurkish
          ? "Basıncı kontrollü tahliye noktasından yavaşça düşür. Manometrede sıfır basıncı doğrulamadan test bağlantılarını açma."
          : "Release pressure slowly through a controlled discharge point. Do not open test connections until zero pressure is confirmed on the gauge.",
        responsible: isTurkish ? "Yetkili Test Personeli" : "Authorized Test Personnel",
      },
      {
        id: `hydro-8-${Date.now()}`,
        step: isTurkish
          ? "Test suyunu tahliye et ve sistemi teslim et."
          : "Drain test water and hand over the system.",
        hazards: isTurkish
          ? "Kontrolsüz su tahliyesi, kayma, çevresel kirlilik veya kalan basınç."
          : "Uncontrolled water discharge, slips, environmental contamination or residual pressure.",
        controls: isTurkish
          ? "Sıfır basıncı doğrula. Test suyunu onaylı noktaya kontrollü tahliye et. Alanı kuru ve güvenli bırak ve test ekipmanını kontrollü sök."
          : "Confirm zero pressure. Discharge test water to an approved location under control. Leave the area dry and safe and dismantle test equipment under control.",
        responsible: isTurkish ? "Test Ekibi / Süpervizör" : "Test Team / Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Hortum, blind, flange, fitting veya test ekipmanı arızası; ani basınç kaybı; yaralanma veya kontrolsüz su çıkışı halinde basınçlandırma derhal durdurulmalı ve mümkünse sistem güvenli şekilde basınçsız hale getirilmelidir. Personel line-of-fire bölgesinden uzaklaştırılmalı ve saha acil durum prosedürü uygulanmalıdır. Basınçlı sistem üzerinde onarım veya müdahale yapılmamalıdır."
        : "In the event of hose, blind, flange, fitting or test-equipment failure, sudden pressure loss, injury or uncontrolled water release, pressurization shall stop immediately and the system safely depressurized where practicable. Personnel shall be kept clear of line-of-fire areas and the site emergency procedure implemented. No repair or intervention shall be carried out on a pressurized system."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Test suyu drenaja, toprağa veya çevreye kontrolsüz şekilde boşaltılmamalıdır. Test suyunun kimyasal veya proses kalıntısı içerme ihtimali varsa uygun toplama ve bertaraf yöntemi uygulanmalıdır. Su nedeniyle kayma riski oluşması önlenmeli ve alan test sonunda kuru ve temiz bırakılmalıdır."
        : "Test water shall not be discharged uncontrolled to drains, ground or the environment. Where test water may contain chemicals or process residues, suitable collection and disposal methods shall be applied. Slip hazards from water shall be prevented and the area left dry and clean after testing."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• Proje / saha Hydrotest prosedürü ve onaylı test paketi\n• ASME / proje spesifikasyonları uygulanabildiği ölçüde\n• Test ekipmanı üretici talimatları\n• Basınçlı sistemler için proje izolasyon ve PTW gereklilikleri"
        : "• SERNEM task-specific risk assessment\n• Project / site Hydrotest procedure and approved test package\n• Applicable ASME / project specifications\n• Test-equipment manufacturer instructions\n• Project isolation and PTW requirements for pressurized systems"
    );
  };


  const loadAirBlowingTemplate = () => {
    setActivity(
      isTurkish ? "Hava Üfleme" : "Air Blowing"
    );

    setDocumentNo("SRN-MS-012");

    setScope(
      isTurkish
        ? "Bu Method Statement; boru hatları, spoollar ve ekipmanların basınçlı hava kullanılarak temizlenmesi veya içindeki yabancı maddelerin uzaklaştırılması için uygulanacak güvenli çalışma yöntemini tanımlar. Çalışma; hat sınırlarının doğrulanması, geçici bağlantıların kurulması, kompresör ve hortum kontrolleri, dışlama alanının oluşturulması, kontrollü basınçlandırma, hava tahliyesi, discharge zone kontrolü, gürültü ve uçan parçacık riskleri ile kontrollü basınç düşürmeyi kapsar."
        : "This Method Statement defines the safe method for cleaning piping, spools and equipment using compressed air to remove foreign material. It covers confirmation of line boundaries, installation of temporary connections, compressor and hose checks, establishment of exclusion zones, controlled pressurization, air discharge, discharge-zone control, noise and flying-particle hazards and controlled depressurization."
    );

    setResponsibilities(
      isTurkish
        ? "Air Blowing Süpervizörü: Hat kapsamını, basınç limitlerini, geçici bağlantıları, dışlama alanını ve çalışma yöntemini doğrular ve işi koordine eder.\nYetkili Operatör: Kompresör, manifold ve basınç kontrol ekipmanını güvenli şekilde kullanır.\nMekanik Ekip: Hat sınırlarını, blind / flange bağlantılarını ve geçici hose / fitting bağlantılarını kontrol eder.\nHSE Personeli: Dışlama alanı, line-of-fire, gürültü, uçan parçacık ve basınçlı hava tehlikelerinin kontrolünü destekler."
        : "Air Blowing Supervisor: Confirms line scope, pressure limits, temporary connections, exclusion zone and work method and coordinates the activity.\nAuthorized Operator: Operates the compressor, manifold and pressure-control equipment safely.\nMechanical Team: Checks line boundaries, blind / flange connections and temporary hose / fitting connections.\nHSE Personnel: Supports control of exclusion zones, line-of-fire, noise, flying particles and compressed-air hazards."
    );

    setCompetency(
      isTurkish
        ? "Hava üfleme faaliyetinde görev alan personel basınçlı hava, stored energy, hose/fitting failure, line-of-fire, discharge zone, yüksek gürültü ve kontrollü basınçlandırma / basınç düşürme konularında eğitimli ve yetkin olmalıdır."
        : "Personnel involved in air blowing shall be trained and competent in compressed-air hazards, stored energy, hose / fitting failure, line-of-fire, discharge-zone control, high noise and controlled pressurization / depressurization."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Uygun iş kıyafeti\n• Koruyucu gözlük\n• Yüz siperi gerektiğinde\n• İşitme koruması\n• Uçan parçacık riskine göre ilave PPE\n• Risk değerlendirmesine göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• Suitable work clothing\n• Safety glasses\n• Face shield where required\n• Hearing protection\n• Additional PPE for flying-particle hazards\n• Additional PPE as required by the risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun kompresör / basınçlı hava kaynağı\n• Uygun basınç sınıfında hortum ve fittings\n• Whip check / hose restraint gerektiğinde\n• Basınç regülatörü\n• Kalibre edilmiş basınç göstergesi\n• Relief valve / tahliye sistemi\n• Geçici spool / manifold gerektiğinde\n• Blind / flange / test plug gerektiğinde\n• Bariyer ve uyarı levhaları\n• Haberleşme ekipmanı\n• Gürültü kontrol ekipmanı gerektiğinde"
        : "• Suitable compressor / compressed-air source\n• Hoses and fittings with suitable pressure rating\n• Whip checks / hose restraints where required\n• Pressure regulator\n• Calibrated pressure gauge\n• Relief valve / pressure-relief system\n• Temporary spool / manifold where required\n• Blinds / flanges / test plugs where required\n• Barricades and warning signs\n• Communication equipment\n• Noise-control equipment where required"
    );

    setPermits(
      isTurkish
        ? "Hava üfleme başlamadan önce proje / saha prosedürlerine göre gerekli çalışma izni ve onaylı air blowing planı / prosedürü doğrulanmalıdır. Hat sınırları, izolasyonlar, geçici bağlantılar, discharge point ve dışlama alanı işe başlamadan önce kontrol edilmelidir."
        : "Before air blowing begins, the required work permit and approved air-blowing plan / procedure shall be verified in accordance with project / site requirements. Line boundaries, isolations, temporary connections, discharge point and exclusion zone shall be checked before starting."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve air blowing prosedürünü kontrol et.\n• Hat sınırlarını, blindları ve izolasyonları doğrula.\n• Kompresör, hortum, fitting ve manifold basınç kapasitesini kontrol et.\n• Hortum bağlantılarında uygun restraint / whip check kullan.\n• Basınç regülatörü ve relief sistemini kontrol et.\n• Kalibre edilmiş manometre kullan.\n• Discharge point yönünü ve güvenli alanı doğrula.\n• Discharge zone içinde personel veya ekipman bulunmasını önle.\n• Dışlama alanını oluştur ve bariyerle.\n• Uçan parçacık ve yabancı madde riskini değerlendir.\n• Gürültü maruziyetini değerlendir ve işitme koruması uygula.\n• Haberleşme ve acil durdurma yöntemini doğrula."
        : "• Review the task-specific risk assessment and air-blowing procedure.\n• Verify line boundaries, blinds and isolations.\n• Check pressure ratings of compressor, hoses, fittings and manifold.\n• Use suitable hose restraints / whip checks.\n• Check the pressure regulator and relief system.\n• Use a calibrated pressure gauge.\n• Verify the discharge-point direction and safe area.\n• Prevent personnel or equipment from entering the discharge zone.\n• Establish and barricade the exclusion zone.\n• Assess flying-particle and foreign-material hazards.\n• Assess noise exposure and provide hearing protection.\n• Confirm communication and emergency-stop methods."
    );

    setMethodSteps([
      {
        id: `air-1-${Date.now()}`,
        step: isTurkish ? "Hat sınırlarını ve bağlantıları doğrula." : "Verify line boundaries and connections.",
        hazards: isTurkish ? "Yanlış hat, eksik blind veya zayıf geçici bağlantı." : "Wrong line, missing blind or weak temporary connection.",
        controls: isTurkish
          ? "Onaylı plan, hat sınırları, blind listesi ve geçici bağlantıları kontrol et."
          : "Check the approved plan, line boundaries, blind list and temporary connections.",
        responsible: isTurkish ? "Air Blowing Süpervizörü / Mekanik Ekip" : "Air Blowing Supervisor / Mechanical Team",
      },
      {
        id: `air-2-${Date.now()}`,
        step: isTurkish ? "Kompresör ve basınçlı hava ekipmanını kur." : "Set up compressor and compressed-air equipment.",
        hazards: isTurkish ? "Hortum / fitting arızası, basınç kaçağı veya whip." : "Hose / fitting failure, pressure leak or hose whip.",
        controls: isTurkish
          ? "Uygun basınç sınıfında hortum ve fittings kullan. Bağlantıları kontrol et ve gerekli restraint / whip check uygula."
          : "Use hoses and fittings with suitable pressure ratings. Inspect connections and apply hose restraints / whip checks where required.",
        responsible: isTurkish ? "Yetkili Operatör / Mekanik Ekip" : "Authorized Operator / Mechanical Team",
      },
      {
        id: `air-3-${Date.now()}`,
        step: isTurkish ? "Discharge zone ve dışlama alanını oluştur." : "Establish discharge zone and exclusion area.",
        hazards: isTurkish ? "Uçan parçacık, yüksek hızlı hava akışı veya line-of-fire." : "Flying particles, high-velocity air or line-of-fire exposure.",
        controls: isTurkish
          ? "Discharge point güvenli yöne çevrilmeli, alan bariyerlenmeli ve personel discharge zone dışında tutulmalıdır."
          : "The discharge point shall be directed toward a safe area, barricaded and personnel kept outside the discharge zone.",
        responsible: isTurkish ? "Süpervizör / HSE" : "Supervisor / HSE",
      },
      {
        id: `air-4-${Date.now()}`,
        step: isTurkish ? "Basıncı kontrollü olarak uygula." : "Apply pressure under control.",
        hazards: isTurkish ? "Stored energy, aşırı basınç veya ani bağlantı arızası." : "Stored energy, overpressure or sudden connection failure.",
        controls: isTurkish
          ? "Basıncı kademeli artır, manometreyi izle ve onaylı limitleri aşma. Relief sistemi çalışır durumda olmalıdır."
          : "Increase pressure gradually, monitor the gauge and do not exceed approved limits. The relief system shall remain functional.",
        responsible: isTurkish ? "Yetkili Operatör" : "Authorized Operator",
      },
      {
        id: `air-5-${Date.now()}`,
        step: isTurkish ? "Hava üfleme işlemini gerçekleştir." : "Perform air blowing.",
        hazards: isTurkish ? "Yüksek hızda parçacık, gürültü ve kontrolsüz discharge." : "High-velocity particles, noise and uncontrolled discharge.",
        controls: isTurkish
          ? "Dışlama alanını koru, discharge pointi sürekli izle ve uygun işitme / göz koruması kullan."
          : "Maintain the exclusion zone, continuously monitor the discharge point and use suitable hearing / eye protection.",
        responsible: isTurkish ? "Air Blowing Ekibi" : "Air Blowing Team",
      },
      {
        id: `air-6-${Date.now()}`,
        step: isTurkish ? "Sistem ve bağlantıları kontrol et." : "Monitor the system and connections.",
        hazards: isTurkish ? "Hortum hareketi, fitting gevşemesi veya kaçak." : "Hose movement, loose fitting or leakage.",
        controls: isTurkish
          ? "Basınçlı bağlantılara yaklaşmadan güvenli mesafeden gözlem yap. Anormal durum görülürse basınçlandırmayı durdur."
          : "Observe pressurized connections from a safe distance. Stop pressurization if any abnormal condition is observed.",
        responsible: isTurkish ? "Süpervizör / Operatör" : "Supervisor / Operator",
      },
      {
        id: `air-7-${Date.now()}`,
        step: isTurkish ? "Basıncı kontrollü şekilde düşür." : "Depressurize under control.",
        hazards: isTurkish ? "Ani hava tahliyesi veya hose movement." : "Sudden air release or hose movement.",
        controls: isTurkish
          ? "Basıncı güvenli tahliye noktasından kontrollü şekilde düşür. Sıfır basıncı doğrulamadan bağlantıları açma."
          : "Release pressure through a safe discharge point under control. Do not open connections until zero pressure is confirmed.",
        responsible: isTurkish ? "Yetkili Operatör" : "Authorized Operator",
      },
      {
        id: `air-8-${Date.now()}`,
        step: isTurkish ? "Ekipmanı sök ve alanı teslim et." : "Dismantle equipment and hand over the area.",
        hazards: isTurkish ? "Kalan basınç, gevşek hortum veya yabancı madde." : "Residual pressure, loose hose or foreign material.",
        controls: isTurkish
          ? "Sıfır basıncı doğrula, geçici ekipmanı kontrollü sök ve alanı temiz / güvenli bırak."
          : "Confirm zero pressure, dismantle temporary equipment under control and leave the area clean and safe.",
        responsible: isTurkish ? "Air Blowing Ekibi / Süpervizör" : "Air Blowing Team / Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Hortum / fitting arızası, kontrolsüz hava çıkışı, ciddi gürültü olayı, yaralanma veya discharge zone ihlali halinde hava beslemesi derhal kesilmeli ve sistem güvenli şekilde basınçsız hale getirilmelidir. Personel line-of-fire bölgesinden uzaklaştırılmalı ve saha acil durum prosedürü uygulanmalıdır."
        : "In the event of hose / fitting failure, uncontrolled air discharge, serious noise incident, injury or breach of the discharge zone, the air supply shall be stopped immediately and the system safely depressurized. Personnel shall be kept clear of line-of-fire areas and the site emergency procedure implemented."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Air blowing sırasında çıkan toz, partikül, pas veya diğer yabancı maddeler çevreye kontrolsüz yayılmamalıdır. Discharge point uygun şekilde yönlendirilmeli ve gerekirse partikül tutma / bariyer sistemi kullanılmalıdır. Çalışma sonunda alan temizlenmelidir."
        : "Dust, particles, rust or other foreign material discharged during air blowing shall not be released uncontrolled to the environment. The discharge point shall be suitably directed and particle-control / barrier systems used where required. The area shall be cleaned after completion."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• Proje / saha Air Blowing prosedürü\n• Onaylı test / blowing planı\n• Kompresör ve basınçlı hava ekipmanı üretici talimatları\n• Proje PTW ve basınçlı sistem gereklilikleri"
        : "• SERNEM task-specific risk assessment\n• Project / site Air Blowing procedure\n• Approved test / blowing plan\n• Compressor and compressed-air equipment manufacturer instructions\n• Project PTW and pressurized-system requirements"
    );
  };


  const loadPaintingCoatingTemplate = () => {
    setActivity(
      isTurkish
        ? "Boya ve Kaplama Çalışmaları"
        : "Painting & Coating Works"
    );

    setDocumentNo("SRN-MS-013");

    setScope(
      isTurkish
        ? "Bu Method Statement; endüstriyel yüzeylerde boya, astar, kaplama ve benzeri kimyasal ürünlerin hazırlanması ve uygulanması için kullanılacak güvenli çalışma yöntemini tanımlar. Çalışma; ürün ve SDS kontrolü, yüzey hazırlığı, boya karışımı, elle veya sprey uygulama, havalandırma, VOC / solvent maruziyetinin kontrolü, yangın ve ateşleme kaynaklarının yönetimi, basınçlı boya ekipmanları, PPE ve atık yönetimini kapsar."
        : "This Method Statement defines the safe method for preparation and application of paints, primers, coatings and similar chemical products on industrial surfaces. It covers product and SDS verification, surface preparation, paint mixing, brush / roller or spray application, ventilation, VOC / solvent exposure control, management of fire and ignition sources, pressurized painting equipment, PPE and waste management."
    );

    setResponsibilities(
      isTurkish
        ? "Boya Süpervizörü: İş kapsamını, kullanılacak ürünleri, SDS gerekliliklerini, uygulama yöntemini ve saha koşullarını doğrular ve çalışmayı koordine eder.\nBoya Personeli: Boya / kaplama ürünlerini üretici talimatı ve SDS'ye göre hazırlar ve uygular, uygun PPE kullanır ve güvenli çalışma yöntemine uyar.\nYangın Gözcüsü: Yanıcılık veya ateşleme riski bulunan durumlarda çalışma alanını izler ve gerekli yangın ekipmanını hazır bulundurur.\nHSE Personeli: Kimyasal maruziyet, havalandırma, VOC, yangın, PPE ve atık kontrollerinin uygulanmasını destekler."
        : "Painting Supervisor: Confirms the scope, products, SDS requirements, application method and site conditions and coordinates the work.\nPainting Personnel: Prepare and apply paint / coating products in accordance with manufacturer instructions and SDS requirements, use suitable PPE and follow the safe work method.\nFire Watch: Where flammability or ignition hazards exist, monitors the area and keeps required firefighting equipment available.\nHSE Personnel: Supports implementation of chemical-exposure, ventilation, VOC, fire, PPE and waste controls."
    );

    setCompetency(
      isTurkish
        ? "Boya ve kaplama çalışmalarında görev alan personel kullanılan kimyasalların tehlikeleri, SDS bilgileri, VOC / solvent maruziyeti, solunum koruması, yangın riski, sprey ekipmanı ve basınçlı hose kullanımı konusunda eğitimli ve yetkin olmalıdır."
        : "Personnel involved in painting and coating shall be trained and competent in chemical hazards, SDS information, VOC / solvent exposure, respiratory protection, fire hazards, spray equipment and pressurized hose use."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• Kimyasala uygun eldiven\n• Koruyucu gözlük\n• Sıçrama riskine göre yüz siperi\n• Uygun iş kıyafeti / koruyucu tulum\n• SDS ve risk değerlendirmesine uygun solunum koruması\n• Sprey uygulamada gerekli ilave PPE\n• Gerektiğinde işitme koruması"
        : "• Safety helmet\n• Safety footwear\n• Chemical-resistant gloves\n• Safety glasses\n• Face shield where splash hazards exist\n• Suitable work clothing / protective coveralls\n• Respiratory protection suitable for the SDS and risk assessment\n• Additional PPE required for spray application\n• Hearing protection where required"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun boya / kaplama malzemeleri\n• Fırça / rulo / sprey ekipmanı\n• Airless spray pump gerektiğinde\n• Uygun basınçlı hose ve fittings\n• Karıştırma ekipmanı\n• Uygun ölçüm / karışım kapları\n• Havalandırma ekipmanı gerektiğinde\n• VOC / gaz ölçüm cihazı gerektiğinde\n• Topraklama / bonding ekipmanı gerektiğinde\n• Bariyer ve uyarı levhaları\n• Spill kit\n• Uygun yangın söndürücü"
        : "• Suitable paint / coating materials\n• Brush / roller / spray equipment\n• Airless spray pump where required\n• Suitable pressurized hoses and fittings\n• Mixing equipment\n• Suitable measuring / mixing containers\n• Ventilation equipment where required\n• VOC / gas detector where required\n• Grounding / bonding equipment where required\n• Barricades and warning signs\n• Spill kit\n• Suitable fire extinguisher"
    );

    setPermits(
      isTurkish
        ? "Boya / kaplama işi başlamadan önce proje veya saha prosedürlerinin gerektirdiği çalışma izinleri kontrol edilmelidir. Yanıcı solvent kullanılan, kapalı veya yetersiz havalandırılan alanlarda ilave izin, gaz ölçümü, havalandırma veya ateşleme kaynağı kontrolü gerekebilir. Kullanılacak tüm ürünlerin güncel SDS dokümanları çalışma alanında erişilebilir olmalıdır."
        : "Before painting / coating begins, permits required by project or site procedures shall be verified. Where flammable solvents are used or work takes place in enclosed or poorly ventilated areas, additional permits, gas testing, ventilation or ignition-source controls may be required. Current SDS documentation for all products shall be available at the work area."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve izin gerekliliklerini kontrol et.\n• Kullanılacak ürünlerin SDS'lerini incele.\n• Yanıcılık, toksisite, VOC ve cilt / göz temas risklerini belirle.\n• Çalışma alanında yeterli havalandırmayı doğrula.\n• Gerekliyse VOC / gaz ölçümü planla.\n• Ateşleme kaynaklarını belirle ve kontrol et.\n• Sigara, açık alev, kıvılcım ve uygunsuz elektrik ekipmanını alandan uzaklaştır.\n• Boya / solvent depolama alanını kontrol et.\n• Sprey ekipmanı, hose ve fittingsleri kullanım öncesi kontrol et.\n• Gerekliyse bonding / grounding uygula.\n• Uygun PPE ve respirator seçimini doğrula.\n• Spill kit ve yangın söndürücüyü hazır bulundur."
        : "• Review the task-specific risk assessment and permit requirements.\n• Review SDS information for all products used.\n• Identify flammability, toxicity, VOC and skin / eye contact hazards.\n• Confirm adequate ventilation in the work area.\n• Plan VOC / gas testing where required.\n• Identify and control ignition sources.\n• Remove smoking, open flames, sparks and unsuitable electrical equipment from the area.\n• Check paint / solvent storage arrangements.\n• Inspect spray equipment, hoses and fittings before use.\n• Apply bonding / grounding where required.\n• Confirm suitable PPE and respirator selection.\n• Provide spill-control materials and suitable firefighting equipment."
    );

    setMethodSteps([
      {
        id: `paint-1-${Date.now()}`,
        step: isTurkish
          ? "Ürünleri, SDS'leri ve çalışma alanını doğrula."
          : "Verify products, SDS information and work area.",
        hazards: isTurkish
          ? "Yanlış ürün kullanımı, bilinmeyen kimyasal tehlike veya uygunsuz saha koşulları."
          : "Incorrect product use, unidentified chemical hazards or unsuitable site conditions.",
        controls: isTurkish
          ? "Ürün etiketlerini, SDS'leri ve üretici talimatlarını kontrol et. Kullanılacak kimyasal ve çalışma alanının uygulamaya uygun olduğunu doğrula."
          : "Check product labels, SDS information and manufacturer instructions. Confirm chemicals and work-area conditions are suitable for the application.",
        responsible: isTurkish ? "Boya Süpervizörü / HSE" : "Painting Supervisor / HSE",
      },
      {
        id: `paint-2-${Date.now()}`,
        step: isTurkish
          ? "Çalışma alanını izole et ve havalandırmayı kur."
          : "Isolate the work area and establish ventilation.",
        hazards: isTurkish
          ? "VOC birikimi, solvent buharı, yetkisiz erişim veya yetersiz havalandırma."
          : "VOC accumulation, solvent vapour, unauthorized access or inadequate ventilation.",
        controls: isTurkish
          ? "Alanı bariyerle, gerekli uyarıları yerleştir ve yeterli doğal / mekanik havalandırma sağla. Gerekirse atmosfer ölçümü yap."
          : "Barricade the area, display required warnings and provide adequate natural / mechanical ventilation. Perform atmosphere testing where required.",
        responsible: isTurkish ? "Süpervizör / HSE" : "Supervisor / HSE",
      },
      {
        id: `paint-3-${Date.now()}`,
        step: isTurkish
          ? "Boya / kaplama malzemesini kontrollü şekilde hazırla."
          : "Prepare paint / coating materials under control.",
        hazards: isTurkish
          ? "Kimyasal sıçrama, yanlış karışım, solvent dökülmesi veya buhar maruziyeti."
          : "Chemical splash, incorrect mixing, solvent spill or vapour exposure.",
        controls: isTurkish
          ? "Ürünleri üretici oranlarına göre karıştır. Uygun kap ve karıştırma ekipmanı kullan. Kimyasalları kontrollü aç ve dökülmeyi önle."
          : "Mix products according to manufacturer ratios. Use suitable containers and mixing equipment. Open chemicals under control and prevent spills.",
        responsible: isTurkish ? "Boya Personeli" : "Painting Personnel",
      },
      {
        id: `paint-4-${Date.now()}`,
        step: isTurkish
          ? "Sprey / uygulama ekipmanını kontrol et."
          : "Inspect spray / application equipment.",
        hazards: isTurkish
          ? "Hose arızası, yüksek basınçlı boya enjeksiyonu veya ekipman kaçağı."
          : "Hose failure, high-pressure paint injection or equipment leakage.",
        controls: isTurkish
          ? "Pump, hose, nozzle ve fittingsleri kontrol et. Hasarlı ekipman kullanma. Basınçlı spray tipini personele veya vücuda yöneltme."
          : "Inspect pump, hose, nozzle and fittings. Do not use damaged equipment. Never direct a pressurized spray tip toward personnel or the body.",
        responsible: isTurkish ? "Boya Personeli / Süpervizör" : "Painting Personnel / Supervisor",
      },
      {
        id: `paint-5-${Date.now()}`,
        step: isTurkish
          ? "Boya / kaplamayı güvenli şekilde uygula."
          : "Apply paint / coating safely.",
        hazards: isTurkish
          ? "Solvent buharı, kimyasal temas, overspray veya göz / cilt maruziyeti."
          : "Solvent vapour, chemical contact, overspray or eye / skin exposure.",
        controls: isTurkish
          ? "Doğru PPE ve respirator kullan. Sprey yönünü kontrol et, havalandırmayı sürdür ve gereksiz personeli alandan uzak tut."
          : "Use suitable PPE and respiratory protection. Control spray direction, maintain ventilation and keep unnecessary personnel clear.",
        responsible: isTurkish ? "Boya Personeli" : "Painting Personnel",
      },
      {
        id: `paint-6-${Date.now()}`,
        step: isTurkish
          ? "Yangın ve ateşleme kaynaklarını sürekli kontrol et."
          : "Continuously control fire and ignition sources.",
        hazards: isTurkish
          ? "Solvent buharının tutuşması, yangın veya patlama."
          : "Ignition of solvent vapours, fire or explosion.",
        controls: isTurkish
          ? "Sigara, açık alev, kıvılcım ve sıcak çalışma faaliyetlerini kontrol et. Yanıcı buhar oluşabilecek alanlarda uygun ekipman kullan ve gerekiyorsa yangın gözcüsü görevlendir."
          : "Control smoking, open flames, sparks and hot-work activities. Use suitable equipment in areas where flammable vapours may form and assign a fire watch where required.",
        responsible: isTurkish ? "Süpervizör / Yangın Gözcüsü" : "Supervisor / Fire Watch",
      },
      {
        id: `paint-7-${Date.now()}`,
        step: isTurkish
          ? "Ekipmanı güvenli şekilde kapat ve temizle."
          : "Shut down and clean equipment safely.",
        hazards: isTurkish
          ? "Kalan basınç, solvent sıçraması veya kontrolsüz kimyasal boşaltımı."
          : "Residual pressure, solvent splash or uncontrolled chemical discharge.",
        controls: isTurkish
          ? "Sprey ekipmanındaki basıncı kontrollü düşür. Temizlik kimyasallarını SDS'ye uygun kullan ve solventleri kontrolsüz boşaltma."
          : "Release pressure from spray equipment under control. Use cleaning chemicals in accordance with SDS requirements and do not discharge solvents uncontrolled.",
        responsible: isTurkish ? "Boya Personeli" : "Painting Personnel",
      },
      {
        id: `paint-8-${Date.now()}`,
        step: isTurkish
          ? "Atıkları topla ve alanı güvenli şekilde teslim et."
          : "Collect waste and hand over the area safely.",
        hazards: isTurkish
          ? "Yanıcı bez, boya atığı, solvent kabı, dökülme veya çevresel kirlilik."
          : "Flammable rags, paint waste, solvent containers, spills or environmental contamination.",
        controls: isTurkish
          ? "Kirli bez, boş boya / solvent kapları ve kimyasal atıkları uygun kaplarda ayrı topla. Alanı temizle ve havalandırmayı güvenli seviyeye kadar devam ettir."
          : "Segregate contaminated rags, empty paint / solvent containers and chemical waste into suitable containers. Clean the area and maintain ventilation until conditions are safe.",
        responsible: isTurkish ? "Boya Ekibi / Süpervizör" : "Painting Team / Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Kimyasal sıçrama, solunum maruziyeti, yüksek basınçlı boya enjeksiyon yaralanması, yangın, dökülme veya diğer acil durumda çalışma derhal durdurulmalıdır. Etkilenen personel güvenli alana çıkarılmalı ve SDS ilk yardım talimatları uygulanmalıdır. Göz veya cilt temasında uygun acil duş / göz yıkama kullanılmalı, yangın veya büyük dökülmede saha acil durum prosedürü devreye alınmalıdır."
        : "In the event of chemical splash, inhalation exposure, high-pressure paint injection injury, fire, spill or another emergency, work shall stop immediately. Affected personnel shall be moved to a safe area and SDS first-aid instructions followed. Suitable emergency shower / eyewash facilities shall be used for eye or skin contact, and site emergency procedures activated for fire or major spills."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Boya, solvent, thinner, kirli bezler, filtreler ve boş kimyasal kaplar proje atık yönetim sistemine göre ayrı toplanmalıdır. Kimyasallar drenaja veya zemine dökülmemeli, tüm dökülmeler spill kit ile kontrol edilmelidir. Kullanılmayan ürünler kapalı ve etiketli kaplarda uygun depolama alanına alınmalıdır."
        : "Paint, solvent, thinner, contaminated rags, filters and empty chemical containers shall be segregated in accordance with the project waste-management system. Chemicals shall not be discharged to drains or ground and spills shall be controlled using suitable spill kits. Unused products shall be stored in closed, labelled containers in designated storage areas."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• Kullanılan boya / kaplama ürünlerinin güncel SDS dokümanları\n• Proje / saha Painting & Coating prosedürü\n• Proje kimyasal yönetimi, yangın güvenliği ve PTW prosedürleri\n• Boya / sprey ekipmanı üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• Current SDS documentation for paint / coating products used\n• Project / site Painting & Coating procedure\n• Project chemical-management, fire-safety and PTW procedures\n• Painting / spray-equipment manufacturer instructions"
    );
  };


  const loadInsulationTemplate = () => {
    setActivity(
      isTurkish
        ? "İzolasyon Çalışmaları"
        : "Insulation Works"
    );

    setDocumentNo("SRN-MS-014");

    setScope(
      isTurkish
        ? "Bu Method Statement; boru, ekipman, tank, kanal ve benzeri yüzeylerde ısı veya soğuk izolasyon malzemelerinin taşınması, kesilmesi, hazırlanması, uygulanması, sabitlenmesi ve metal kaplama ile tamamlanması için güvenli çalışma yöntemini tanımlar. Çalışma; izolasyon malzemelerinin elle taşınması, mineral yün ve benzeri lifli malzemelerle çalışma, kesici el aletleri, sac kaplama, keskin kenarlar, sıcak yüzeyler, yüksekte çalışma, toz ve lif maruziyeti, PPE, housekeeping ve atık yönetimini kapsar."
        : "This Method Statement defines the safe method for transporting, cutting, preparing, installing and securing thermal or cold insulation materials on piping, equipment, tanks, ducts and similar surfaces, including completion with metal cladding. The work covers manual handling, mineral wool and similar fibrous materials, cutting tools, sheet-metal cladding, sharp edges, hot surfaces, work at height, dust and fibre exposure, PPE, housekeeping and waste management."
    );

    setResponsibilities(
      isTurkish
        ? "İzolasyon Süpervizörü: İş kapsamını, çalışma alanını, kullanılacak izolasyon malzemelerini ve uygulama yöntemini doğrular ve çalışmayı koordine eder.\nİzolasyon Personeli: Malzemeleri güvenli şekilde taşır, ölçer, keser, monte eder ve kaplama işlemlerini onaylı yönteme göre gerçekleştirir.\nİskele / Erişim Yetkilisi: Kullanılacak erişim sisteminin uygun ve güvenli olduğunu doğrular.\nHSE Personeli: Lif / toz maruziyeti, PPE, yüksekte çalışma, housekeeping ve saha kontrollerinin uygulanmasını destekler."
        : "Insulation Supervisor: Verifies the work scope, work area, insulation materials and installation method and coordinates the activity.\nInsulation Personnel: Safely handle, measure, cut and install materials and complete cladding activities in accordance with the approved method.\nScaffold / Access Competent Person: Confirms that the required access system is suitable and safe.\nHSE Personnel: Supports fibre / dust exposure, PPE, work-at-height, housekeeping and field controls."
    );

    setCompetency(
      isTurkish
        ? "İzolasyon çalışmalarında görev alan personel kullanılan izolasyon malzemeleri, lif ve toz maruziyeti, kesici alet kullanımı, keskin sac kenarları, manuel taşıma, sıcak yüzeyler ve gerektiğinde yüksekte çalışma konusunda eğitimli ve yetkin olmalıdır."
        : "Personnel involved in insulation work shall be trained and competent in insulation-material hazards, fibre and dust exposure, cutting-tool use, sharp sheet-metal edges, manual handling, hot surfaces and work at height where applicable."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• Uygun iş eldiveni / kesilmeye dayanıklı eldiven\n• Koruyucu gözlük\n• Lif / toz riskine uygun solunum koruması gerektiğinde\n• Uzun kollu uygun iş kıyafeti\n• Gerektiğinde tek kullanımlık koruyucu tulum\n• Sac kesme çalışmalarında uygun yüz / göz koruması\n• Yüksekte çalışma gerektiğinde uygun düşüş koruma PPE'si\n• Risk değerlendirmesine göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Suitable work gloves / cut-resistant gloves\n• Safety glasses\n• Respiratory protection suitable for fibre / dust exposure where required\n• Suitable long-sleeved work clothing\n• Disposable protective coveralls where required\n• Suitable face / eye protection for sheet-metal cutting\n• Suitable fall-protection PPE where work at height is required\n• Additional PPE according to the risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Onaylı izolasyon malzemeleri\n• Mineral wool / insulation sections gerektiğinde\n• Uygun izolasyon kesme bıçağı / el aletleri\n• Ölçüm ekipmanı\n• Sac / cladding malzemeleri\n• Uygun sac kesme ekipmanı\n• Banding / fastening ekipmanı\n• Güvenli çalışma platformu / iskele gerektiğinde\n• Malzeme taşıma ekipmanı gerektiğinde\n• Atık torbaları / kapları\n• Bariyer ve uyarı levhaları\n• Endüstriyel vakum veya uygun temizlik ekipmanı gerektiğinde"
        : "• Approved insulation materials\n• Mineral wool / insulation sections where required\n• Suitable insulation knives / hand tools\n• Measuring equipment\n• Sheet-metal / cladding materials\n• Suitable sheet-metal cutting equipment\n• Banding / fastening equipment\n• Safe working platform / scaffold where required\n• Material-handling equipment where required\n• Waste bags / containers\n• Barricades and warning signs\n• Industrial vacuum or suitable cleaning equipment where required"
    );

    setPermits(
      isTurkish
        ? "İzolasyon çalışması başlamadan önce proje / saha prosedürlerinin gerektirdiği çalışma izinleri doğrulanmalıdır. Yüksekte çalışma, iskele kullanımı, sıcak yüzey yakınında çalışma veya özel alanlarda çalışma için ilgili ek izin ve kontroller uygulanmalıdır. Kullanılan izolasyon ve kimyasal ürünlere ait SDS / üretici bilgileri gerektiğinde erişilebilir olmalıdır."
        : "Before insulation work begins, permits required by project / site procedures shall be verified. Relevant additional permits and controls shall be applied for work at height, scaffold use, work near hot surfaces or work in special areas. SDS / manufacturer information for insulation and chemical products shall be available where applicable."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve gerekli izinleri kontrol et.\n• İzole edilecek boru / ekipmanın kimliğini ve çalışma kapsamını doğrula.\n• Yüzey sıcaklığını ve proses durumunu kontrol et.\n• İzolasyon malzemesini ve üretici talimatlarını doğrula.\n• Güvenli erişim ve çalışma platformunu kontrol et.\n• Yüksekte çalışma varsa düşüş koruma gerekliliklerini uygula.\n• Lif / toz maruziyetini değerlendir ve uygun PPE seç.\n• Kesici aletleri ve sac kesme ekipmanını kontrol et.\n• Keskin kenar risklerini değerlendir.\n• Malzeme taşıma yöntemini planla.\n• Alt seviyeleri düşen malzemelere karşı koru.\n• Çalışma alanını bariyerle ve housekeeping düzenini oluştur."
        : "• Review the task-specific risk assessment and required permits.\n• Verify the identity of the pipe / equipment and the work scope.\n• Check surface temperature and process condition.\n• Verify insulation materials and manufacturer instructions.\n• Inspect safe access and working platforms.\n• Apply fall-protection requirements where work at height is involved.\n• Assess fibre / dust exposure and select suitable PPE.\n• Inspect cutting tools and sheet-metal cutting equipment.\n• Assess sharp-edge hazards.\n• Plan material handling.\n• Protect lower levels against falling materials.\n• Barricade the work area and establish housekeeping arrangements."
    );

    setMethodSteps([
      {
        id: `ins-1-${Date.now()}`,
        step: isTurkish
          ? "İş kapsamını ve izole edilecek ekipmanı doğrula."
          : "Verify the work scope and equipment to be insulated.",
        hazards: isTurkish
          ? "Yanlış ekipmanda çalışma, sıcak yüzey veya bilinmeyen proses durumu."
          : "Work on incorrect equipment, hot surfaces or unidentified process conditions.",
        controls: isTurkish
          ? "Ekipman / hat kimliğini çizim ve saha bilgileriyle doğrula. Yüzey sıcaklığını ve çalışma koşullarını kontrol et."
          : "Verify equipment / line identity against drawings and field information. Check surface temperature and operating conditions.",
        responsible: isTurkish ? "İzolasyon Süpervizörü" : "Insulation Supervisor",
      },
      {
        id: `ins-2-${Date.now()}`,
        step: isTurkish
          ? "Çalışma alanını ve güvenli erişimi hazırla."
          : "Prepare the work area and safe access.",
        hazards: isTurkish
          ? "Düşme, düşen malzeme, uygunsuz platform veya yetkisiz erişim."
          : "Falls, falling materials, unsuitable platforms or unauthorized access.",
        controls: isTurkish
          ? "Onaylı erişim sistemi kullan. Alanı bariyerle, alt seviyeleri koru ve çalışma platformunun uygunluğunu doğrula."
          : "Use an approved access system. Barricade the area, protect lower levels and verify the working platform is suitable.",
        responsible: isTurkish ? "Süpervizör / Yetkin Kişi" : "Supervisor / Competent Person",
      },
      {
        id: `ins-3-${Date.now()}`,
        step: isTurkish
          ? "İzolasyon malzemelerini güvenli şekilde taşı ve hazırla."
          : "Handle and prepare insulation materials safely.",
        hazards: isTurkish
          ? "Manuel taşıma, lif / toz maruziyeti veya malzeme düşmesi."
          : "Manual handling, fibre / dust exposure or dropped materials.",
        controls: isTurkish
          ? "Uygun taşıma tekniği kullan. Büyük / ağır malzemelerde yardım veya mekanik taşıma kullan. Malzemeyi kontrollü alanda hazırla."
          : "Use suitable handling techniques. Use assistance or mechanical handling for large / heavy materials. Prepare materials in a controlled area.",
        responsible: isTurkish ? "İzolasyon Ekibi" : "Insulation Team",
      },
      {
        id: `ins-4-${Date.now()}`,
        step: isTurkish
          ? "İzolasyon malzemesini ölç ve kes."
          : "Measure and cut insulation material.",
        hazards: isTurkish
          ? "Kesici alet yaralanması, lif / toz veya göz teması."
          : "Cutting-tool injuries, fibre / dust or eye exposure.",
        controls: isTurkish
          ? "Uygun ve sağlam kesici alet kullan. Kesimi vücuttan uzağa doğru yap. Göz, el ve gerektiğinde solunum koruması kullan."
          : "Use suitable serviceable cutting tools. Cut away from the body. Use eye, hand and respiratory protection where required.",
        responsible: isTurkish ? "İzolasyon Personeli" : "Insulation Personnel",
      },
      {
        id: `ins-5-${Date.now()}`,
        step: isTurkish
          ? "İzolasyonu yüzeye monte et ve sabitle."
          : "Install and secure insulation to the surface.",
        hazards: isTurkish
          ? "Sıcak yüzey, sıkışma, uygunsuz sabitleme veya yüksekte çalışma."
          : "Hot surfaces, pinch points, inadequate securing or work at height.",
        controls: isTurkish
          ? "Yüzey koşullarını doğrula. İzolasyonu üretici / proje gerekliliklerine göre yerleştir ve güvenli şekilde sabitle."
          : "Verify surface conditions. Install insulation in accordance with manufacturer / project requirements and secure it safely.",
        responsible: isTurkish ? "İzolasyon Personeli" : "Insulation Personnel",
      },
      {
        id: `ins-6-${Date.now()}`,
        step: isTurkish
          ? "Metal kaplama / cladding malzemesini hazırla ve monte et."
          : "Prepare and install metal cladding.",
        hazards: isTurkish
          ? "Keskin sac kenarı, kesilme, el yaralanması veya düşen parça."
          : "Sharp sheet-metal edges, cuts, hand injuries or falling components.",
        controls: isTurkish
          ? "Kesilmeye dayanıklı eldiven kullan. Keskin kenarları kontrollü tut. Sac parçalarını güvenli şekilde taşı ve sabitle."
          : "Use cut-resistant gloves. Control sharp edges. Handle and secure sheet-metal components safely.",
        responsible: isTurkish ? "İzolasyon Personeli" : "Insulation Personnel",
      },
      {
        id: `ins-7-${Date.now()}`,
        step: isTurkish
          ? "Montajı ve izolasyon bütünlüğünü kontrol et."
          : "Inspect installation and insulation integrity.",
        hazards: isTurkish
          ? "Gevşek kaplama, açık keskin kenar veya eksik sabitleme."
          : "Loose cladding, exposed sharp edges or incomplete fastening.",
        controls: isTurkish
          ? "İzolasyon, banding, bağlantılar ve kaplama bütünlüğünü kontrol et. Keskin / gevşek parçaları düzelt."
          : "Inspect insulation, banding, connections and cladding integrity. Correct sharp or loose components.",
        responsible: isTurkish ? "Süpervizör / İzolasyon Ekibi" : "Supervisor / Insulation Team",
      },
      {
        id: `ins-8-${Date.now()}`,
        step: isTurkish
          ? "Atıkları temizle ve alanı güvenli şekilde teslim et."
          : "Remove waste and hand over the area safely.",
        hazards: isTurkish
          ? "Lif / toz, keskin sac artıkları, takılma veya çevresel kirlilik."
          : "Fibres / dust, sharp metal offcuts, trip hazards or environmental contamination.",
        controls: isTurkish
          ? "İzolasyon artıklarını ve keskin sac parçalarını uygun kaplarda topla. Kuru süpürmeyle toz yaymaktan kaçın ve alanı temiz bırak."
          : "Collect insulation waste and sharp metal offcuts in suitable containers. Avoid spreading dust by dry sweeping and leave the area clean.",
        responsible: isTurkish ? "İzolasyon Ekibi / Süpervizör" : "Insulation Team / Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Kesik, göz / ciltte lif teması, solunum maruziyeti, düşme, sıcak yüzey teması veya diğer acil durumda çalışma durdurulmalıdır. Yaralanan personel güvenli alana alınmalı ve uygun ilk yardım uygulanmalıdır. Göz temasında göz yıkama kullanılmalı; ciddi kesik, düşme veya solunum problemi durumunda saha acil durum prosedürü devreye alınmalıdır."
        : "In the event of cuts, fibre contact with eyes / skin, inhalation exposure, falls, hot-surface contact or another emergency, work shall stop. Injured personnel shall be moved to a safe area and appropriate first aid provided. Eyewash shall be used for eye exposure and site emergency procedures activated for serious cuts, falls or respiratory problems."
    );

    setEnvironmentalControls(
      isTurkish
        ? "İzolasyon artıkları, mineral yün, ambalaj malzemeleri, tel / banding ve metal kaplama artıkları proje atık yönetim sistemine göre ayrı toplanmalıdır. Lif ve tozun çevreye yayılması önlenmeli; atıklar uygun torba veya kaplarda tutulmalıdır. Keskin metal artıkları açıkta bırakılmamalıdır."
        : "Insulation waste, mineral wool, packaging, wire / banding and metal-cladding offcuts shall be segregated according to the project waste-management system. Fibre and dust dispersion shall be prevented and waste kept in suitable bags or containers. Sharp metal waste shall not be left exposed."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• Proje / saha izolasyon prosedürü ve spesifikasyonları\n• Kullanılan izolasyon malzemesi üretici bilgileri / SDS\n• OSHA 29 CFR 1926 Subpart E – Personal Protective and Life Saving Equipment\n• OSHA 29 CFR 1926 Subpart L – Scaffolds, uygulanabildiği ölçüde\n• Kullanılan el aletleri ve ekipman üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• Project / site insulation procedures and specifications\n• Manufacturer information / SDS for insulation materials used\n• OSHA 29 CFR 1926 Subpart E – Personal Protective and Life Saving Equipment\n• OSHA 29 CFR 1926 Subpart L – Scaffolds, where applicable\n• Manufacturer instructions for tools and equipment used"
    );
  };



  const loadMobileEquipmentTemplate = () => {
    setActivity(
      isTurkish
        ? "Ağır / Mobil Ekipman Çalışmaları"
        : "Heavy & Mobile Equipment Operations"
    );

    setDocumentNo("SRN-MS-015");

    setScope(
      isTurkish
        ? "Bu Method Statement; forklift, telehandler, mobil vinç, manlift, loader, ekskavatör ve benzeri ağır veya mobil ekipmanların saha içerisinde güvenli kullanımı, hareketi, manevrası, park edilmesi ve gerektiğinde yük taşıma faaliyetleri için uygulanacak çalışma yöntemini tanımlar. Çalışma; ekipman uygunluğu, operatör yetkinliği, trafik planı, yaya ayrımı, kör nokta kontrolü, banksman kullanımı, zemin stabilitesi, günlük kontroller ve güvenli park düzenlemelerini kapsar."
        : "This Method Statement defines the safe working method for the operation, movement, manoeuvring, parking and where applicable load handling of forklifts, telehandlers, mobile cranes, MEWPs, loaders, excavators and similar heavy or mobile equipment. The work includes equipment suitability, operator competence, traffic planning, pedestrian segregation, blind-spot control, banksman arrangements, ground stability, daily inspections and safe parking."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: Çalışma alanını, trafik düzenini ve ekipman faaliyetlerini koordine eder.\nYetkili Operatör: Ekipmanı yalnızca yetkisi dahilinde, üretici talimatlarına ve saha kurallarına uygun kullanır.\nBanksman / İşaretçi: Araç hareketlerini güvenli konumdan yönlendirir ve operatörle belirlenmiş iletişim yöntemini kullanır.\nHSE Personeli: Yaya-araç ayrımı, dışlama alanları, saha koşulları ve güvenli çalışma kontrollerini destekler."
        : "Site Supervisor: Coordinates the work area, traffic arrangements and equipment activities.\nAuthorized Operator: Operates equipment only within their authorization and in accordance with manufacturer instructions and site rules.\nBanksman / Signaller: Directs vehicle movements from a safe position using the agreed communication method.\nHSE Personnel: Supports pedestrian-vehicle segregation, exclusion zones, field-condition and safe-work controls."
    );

    setCompetency(
      isTurkish
        ? "Mobil ekipman operatörleri kullanılan ekipman için eğitimli, yetkin ve gerektiğinde yetkilendirilmiş olmalıdır. Banksman / işaretçiler görevleri konusunda eğitimli olmalı; personel kör nokta, line-of-fire, geri manevra, devrilme, sıkışma ve yaya-araç etkileşimi risklerini bilmelidir."
        : "Mobile-equipment operators shall be trained, competent and where required authorized for the equipment used. Banksmen / signallers shall be trained for their duties, and personnel shall understand blind-spot, line-of-fire, reversing, overturning, crushing and pedestrian-vehicle interaction hazards."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• Yüksek görünürlüklü yelek / kıyafet\n• İş eldiveni\n• Koruyucu gözlük\n• Gürültü seviyesine göre işitme koruması\n• Göreve ve risk değerlendirmesine göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• High-visibility vest / clothing\n• Work gloves\n• Safety glasses\n• Hearing protection according to noise level\n• Additional PPE according to task and risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun ve onaylı mobil ekipman\n• Emniyet kemeri / operatör restraint sistemi\n• Çalışır geri vites alarmı ve ikaz sistemleri\n• Ayna / kamera sistemleri mevcutsa\n• Döner beacon / ikaz lambaları\n• Teker takozları gerektiğinde\n• Bariyer ve uyarı levhaları\n• Haberleşme ekipmanı\n• Yangın söndürücü\n• Günlük ekipman kontrol formu"
        : "• Suitable approved mobile equipment\n• Seat belt / operator restraint system\n• Functional reversing alarm and warning systems\n• Mirrors / camera systems where fitted\n• Rotating beacon / warning lights\n• Wheel chocks where required\n• Barriers and warning signs\n• Communication equipment\n• Fire extinguisher\n• Daily equipment inspection form"
    );

    setPermits(
      isTurkish
        ? "Mobil ekipman çalışması başlamadan önce proje / saha trafik kuralları, çalışma alanı kısıtlamaları ve gerekli izinler doğrulanmalıdır. Kaldırma, yüksekte çalışma veya özel alan faaliyetleri söz konusuysa ilgili ek izin ve prosedürler ayrıca uygulanmalıdır."
        : "Before mobile-equipment work starts, project / site traffic rules, work-area restrictions and required permits shall be verified. Where lifting, work at height or special-area activities are involved, the relevant additional permits and procedures shall also apply."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini ve çalışma alanını kontrol et.\n• Operatör yetkinliğini doğrula.\n• Günlük ekipman kontrolünü tamamla.\n• Fren, direksiyon, lastik, ışık, alarm ve emniyet sistemlerini kontrol et.\n• Zemin stabilitesini, eğimi ve taşıma kapasitesini değerlendir.\n• Yaya ve araç yollarını mümkün olduğunca ayır.\n• Kör noktaları ve görüş kısıtlarını değerlendir.\n• Geri manevrada gerektiğinde banksman kullan.\n• Dışlama alanlarını ve bariyerleri oluştur.\n• Ekipmanın çalışma yarıçapında personel bulunmasını önle.\n• Haberleşme yöntemini belirle.\n• Güvenli park ve acil durum düzenlemelerini doğrula."
        : "• Review the task-specific risk assessment and work area.\n• Verify operator competence.\n• Complete the daily equipment inspection.\n• Check brakes, steering, tyres, lights, alarms and safety systems.\n• Assess ground stability, slope and bearing capacity.\n• Segregate pedestrian and vehicle routes where practicable.\n• Assess blind spots and visibility restrictions.\n• Use a banksman for reversing where required.\n• Establish exclusion zones and barriers.\n• Prevent personnel entering the equipment operating radius.\n• Establish the communication method.\n• Verify safe parking and emergency arrangements."
    );

    setMethodSteps([
      {
        id: `mob-1-${Date.now()}`,
        step: isTurkish
          ? "Çalışma alanını ve ekipman görevini doğrula."
          : "Verify the work area and equipment task.",
        hazards: isTurkish
          ? "Uygunsuz çalışma alanı, trafik çakışması veya yanlış ekipman seçimi."
          : "Unsuitable work area, traffic conflict or incorrect equipment selection.",
        controls: isTurkish
          ? "Görev için doğru ekipmanı seç. Trafik planını, çalışma alanını, yaya yollarını ve çevredeki faaliyetleri kontrol et."
          : "Select the correct equipment for the task. Review the traffic plan, work area, pedestrian routes and surrounding activities.",
        responsible: isTurkish
          ? "Saha Süpervizörü / HSE"
          : "Site Supervisor / HSE",
      },
      {
        id: `mob-2-${Date.now()}`,
        step: isTurkish
          ? "Operatör yetkinliğini ve günlük ekipman kontrolünü doğrula."
          : "Verify operator competence and daily equipment inspection.",
        hazards: isTurkish
          ? "Yetkisiz kullanım veya mekanik ekipman arızası."
          : "Unauthorized operation or mechanical equipment failure.",
        controls: isTurkish
          ? "Operatör yetkinliğini doğrula. Fren, direksiyon, lastik, alarm, ışık, emniyet kemeri ve güvenlik sistemlerini kontrol et."
          : "Verify operator competence. Inspect brakes, steering, tyres, alarms, lights, seat belt and safety systems.",
        responsible: isTurkish
          ? "Operatör / Süpervizör"
          : "Operator / Supervisor",
      },
      {
        id: `mob-3-${Date.now()}`,
        step: isTurkish
          ? "Zemin ve güzergâh koşullarını kontrol et."
          : "Inspect ground and travel-route conditions.",
        hazards: isTurkish
          ? "Devrilme, zemine batma, eğim veya engel."
          : "Overturning, ground failure, slope or obstruction.",
        controls: isTurkish
          ? "Zemin stabilitesini, taşıma kapasitesini, eğimi, açıklıkları ve güzergâhtaki engelleri değerlendir."
          : "Assess ground stability, bearing capacity, slopes, openings and obstacles along the travel route.",
        responsible: isTurkish
          ? "Süpervizör / Operatör"
          : "Supervisor / Operator",
      },
      {
        id: `mob-4-${Date.now()}`,
        step: isTurkish
          ? "Yaya ve araç trafiğini ayır."
          : "Segregate pedestrian and vehicle traffic.",
        hazards: isTurkish
          ? "Araç-personel çarpışması veya çalışma alanına yetkisiz giriş."
          : "Vehicle-person collision or unauthorized entry into the operating area.",
        controls: isTurkish
          ? "Bariyer, yaya yolu ve dışlama alanlarını oluştur. Gereksiz personeli ekipman çalışma alanından uzak tut."
          : "Establish barriers, pedestrian routes and exclusion zones. Keep unnecessary personnel clear of the equipment operating area.",
        responsible: isTurkish
          ? "Süpervizör / HSE"
          : "Supervisor / HSE",
      },
      {
        id: `mob-5-${Date.now()}`,
        step: isTurkish
          ? "Banksman ve haberleşme yöntemini belirle."
          : "Assign a banksman and communication method.",
        hazards: isTurkish
          ? "Kör nokta, geri manevra veya iletişim hatası."
          : "Blind spots, reversing or communication failure.",
        controls: isTurkish
          ? "Görüşün kısıtlı olduğu manevralarda eğitimli banksman kullan. Operatör ve banksman arasında anlaşılmış işaret / telsiz yöntemini uygula."
          : "Use a trained banksman where visibility is restricted. Apply an agreed hand-signal / radio communication method between operator and banksman.",
        responsible: isTurkish
          ? "Banksman / Operatör"
          : "Banksman / Operator",
      },
      {
        id: `mob-6-${Date.now()}`,
        step: isTurkish
          ? "Ekipmanı kontrollü şekilde hareket ettir ve çalıştır."
          : "Move and operate the equipment under control.",
        hazards: isTurkish
          ? "Çarpışma, devrilme, sıkışma veya line-of-fire."
          : "Collision, overturning, crushing or line-of-fire exposure.",
        controls: isTurkish
          ? "Saha hız limitlerine uy. Emniyet kemerini kullan. Ani manevralardan kaçın ve personeli ekipman çalışma yarıçapından uzak tut."
          : "Follow site speed limits. Use the seat belt. Avoid sudden manoeuvres and keep personnel clear of the equipment operating radius.",
        responsible: isTurkish
          ? "Yetkili Operatör"
          : "Authorized Operator",
      },
      {
        id: `mob-7-${Date.now()}`,
        step: isTurkish
          ? "Çalışma boyunca ekipman ve çevre koşullarını izle."
          : "Monitor equipment and surrounding conditions during work.",
        hazards: isTurkish
          ? "Değişen zemin koşulları, yaya girişi, ekipman arızası veya görüş kaybı."
          : "Changing ground conditions, pedestrian entry, equipment failure or loss of visibility.",
        controls: isTurkish
          ? "Çalışma alanını sürekli gözlemle. Anormal ekipman davranışı, güvenlik sistemi arızası veya kontrolsüz personel girişi halinde işi durdur."
          : "Continuously monitor the work area. Stop work for abnormal equipment behaviour, safety-system failure or uncontrolled personnel entry.",
        responsible: isTurkish
          ? "Operatör / Süpervizör"
          : "Operator / Supervisor",
      },
      {
        id: `mob-8-${Date.now()}`,
        step: isTurkish
          ? "Ekipmanı güvenli şekilde park et ve izole et."
          : "Park and isolate the equipment safely.",
        hazards: isTurkish
          ? "Kontrolsüz hareket, yetkisiz kullanım veya park alanında çarpışma."
          : "Uncontrolled movement, unauthorized use or collision in the parking area.",
        controls: isTurkish
          ? "Belirlenmiş alana park et. Ataşmanları yere indir, park frenini uygula, motoru kapat ve gerektiğinde teker takozu / izolasyon uygula."
          : "Park in the designated area. Lower attachments, apply the parking brake, shut down the engine and use wheel chocks / isolation where required.",
        responsible: isTurkish
          ? "Yetkili Operatör"
          : "Authorized Operator",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Araç-personel çarpışması, ekipman devrilmesi, kontrol kaybı, mekanik arıza, yük düşmesi, yangın veya diğer acil durumda çalışma derhal durdurulmalıdır. Ekipman mümkünse güvenli hale getirilmeli, alan izole edilmeli ve saha acil durum prosedürü uygulanmalıdır. Yaralı personele yetkili ekip tarafından müdahale edilmelidir."
        : "In the event of vehicle-person collision, equipment overturning, loss of control, mechanical failure, dropped load, fire or other emergency, work shall stop immediately. The equipment shall be made safe where possible, the area isolated and the site emergency procedure implemented. Injured personnel shall be attended by authorized responders."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Yakıt, yağ veya hidrolik sıvı sızıntıları kontrol edilmeli; dökülmeler uygun spill kit ile müdahale edilerek proje atık sistemine göre yönetilmelidir. Gereksiz rölanti, aşırı gürültü ve toz oluşumu azaltılmalı; ekipman belirlenmiş alanlarda park edilmelidir."
        : "Fuel, oil and hydraulic-fluid leaks shall be controlled; spills shall be managed using suitable spill kits and the project waste system. Unnecessary idling, excessive noise and dust generation shall be minimized, and equipment shall be parked in designated areas."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• Proje / saha trafik yönetim planı\n• OSHA 29 CFR 1926 Subpart O – Motor Vehicles, Mechanized Equipment, and Marine Operations\n• OSHA 29 CFR 1926.601 – Motor Vehicles\n• OSHA 29 CFR 1926.602 – Material Handling Equipment\n• Kullanılan ekipmanın üretici kullanım talimatları"
        : "• SERNEM task-specific risk assessment\n• Project / site traffic management plan\n• OSHA 29 CFR 1926 Subpart O – Motor Vehicles, Mechanized Equipment, and Marine Operations\n• OSHA 29 CFR 1926.601 – Motor Vehicles\n• OSHA 29 CFR 1926.602 – Material Handling Equipment\n• Equipment manufacturer operating instructions"
    );
  };

  const loadLadderUseTemplate = () => {
    setActivity(
      isTurkish ? "Merdiven Kullanımı" : "Ladder Use"
    );

    setDocumentNo("SRN-MS-016");

    setScope(
      isTurkish
        ? "Bu Method Statement; taşınabilir seyyar merdivenlerin kısa süreli erişim ve hafif işlerde güvenli şekilde seçilmesi, kontrol edilmesi, kurulması, kullanılması ve kaldırılması için uygulanacak yöntemi tanımlar. Çalışma; doğru merdiven seçimi, kullanım öncesi kontrol, zemin ve açı, sabitleme, üç nokta temas, aşırı uzanmanın önlenmesi, düşen malzeme, elektrik tehlikeleri ve güvenli erişimi kapsar."
        : "This Method Statement defines the safe method for selecting, inspecting, setting up, using and removing portable ladders for short-duration access and light work. It covers correct ladder selection, pre-use inspection, ground condition and angle, securing, three-point contact, prevention of overreaching, falling-object hazards, electrical hazards and safe access."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: Merdiven kullanımının görev için uygun olduğunu doğrular ve çalışma alanını kontrol eder.\nKullanıcı: Merdiveni kullanım öncesi kontrol eder, güvenli şekilde kurar ve kurallara uygun kullanır.\nHSE Personeli: Merdiven seçimi, erişim, düşme ve saha kontrollerini destekler.\nÇalışanlar: Hasarlı veya uygunsuz merdiven kullanmaz ve merdivende güvenli davranış kurallarına uyar."
        : "Site Supervisor: Confirms ladder use is suitable for the task and controls the work area.\nUser: Inspects the ladder before use, sets it up safely and uses it in accordance with requirements.\nHSE Personnel: Support ladder selection, access, fall and field controls.\nWorkers: Shall not use damaged or unsuitable ladders and shall follow safe ladder-use rules."
    );

    setCompetency(
      isTurkish
        ? "Merdiven kullanan personel doğru merdiven seçimi, kullanım öncesi kontrol, doğru kurulum, üç nokta temas, aşırı uzanma, güvenli taşıma ve elektrik hattı yakınındaki riskler konusunda eğitimli olmalıdır."
        : "Personnel using ladders shall be trained in correct ladder selection, pre-use inspection, proper setup, three-point contact, overreaching hazards, safe handling and electrical hazards near power sources."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• Uygun iş kıyafeti\n• İş eldiveni gerektiğinde\n• Göz koruması iş kapsamına göre\n• Risk değerlendirmesine göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Suitable work clothing\n• Work gloves where required\n• Eye protection according to the task\n• Additional PPE according to the risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun tip ve boyda onaylı merdiven\n• Kaymaz ayaklar\n• Sabitleme ekipmanı gerektiğinde\n• Bariyer ve uyarı levhaları\n• El aleti taşıma çantası / kemeri gerektiğinde\n• Alternatif erişim ekipmanı gerektiğinde"
        : "• Approved ladder of suitable type and length\n• Non-slip feet\n• Securing equipment where required\n• Barriers and warning signs\n• Tool bag / belt where required\n• Alternative access equipment where required"
    );

    setPermits(
      isTurkish
        ? "Merdiven kullanımı başlamadan önce proje / saha prosedürlerinin gerektirdiği çalışma izni ve yüksekte çalışma gereklilikleri kontrol edilmelidir. Uzun süreli, ağır iş, iki elin sürekli kullanıldığı faaliyetler veya daha yüksek riskli çalışmalar için merdiven yerine uygun çalışma platformu tercih edilmelidir."
        : "Before ladder use begins, applicable project / site permit and work-at-height requirements shall be checked. For prolonged work, heavy tasks, activities requiring continuous two-hand use or higher-risk work, a suitable working platform shall be used instead of a ladder."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini kontrol et.\n• Merdivenin görev için uygun tip ve boyda olduğunu doğrula.\n• Basamak, yan ray, ayak ve bağlantıları kontrol et.\n• Hasarlı, çatlak veya modifiye merdiveni kullanma.\n• Zeminin sağlam, düz ve kaymaz olduğunu doğrula.\n• Trafik, kapı, geçiş yolu ve eş zamanlı faaliyetleri değerlendir.\n• Merdiveni gerektiğinde sabitle.\n• Elektrik hatları ve enerjili ekipman yakınlığını kontrol et.\n• Alt alanı düşen cisim riskine karşı kontrol et.\n• Kullanıcı için güvenli iniş / çıkış alanı sağla.\n• El aletlerinin güvenli taşınmasını planla.\n• Merdiven yerine platform gerekip gerekmediğini değerlendir."
        : "• Review the task-specific risk assessment.\n• Confirm the ladder is the correct type and length for the task.\n• Inspect rungs, side rails, feet and connections.\n• Do not use damaged, cracked or modified ladders.\n• Confirm the ground is firm, level and non-slip.\n• Assess traffic, doors, access routes and simultaneous activities.\n• Secure the ladder where required.\n• Check proximity to electrical lines and energized equipment.\n• Control lower areas for falling-object hazards.\n• Provide safe access and egress for the user.\n• Plan safe transport of hand tools.\n• Assess whether a working platform is more suitable than a ladder."
    );

    setMethodSteps([
      {
        id: `lad-1-${Date.now()}`,
        step: isTurkish ? "Görev için doğru merdiveni seç." : "Select the correct ladder for the task.",
        hazards: isTurkish ? "Yanlış tip, yetersiz uzunluk veya uygunsuz kapasite." : "Incorrect type, insufficient length or unsuitable capacity.",
        controls: isTurkish
          ? "Göreve uygun tip, uzunluk ve kapasitede onaylı merdiven kullan."
          : "Use an approved ladder of suitable type, length and capacity.",
        responsible: isTurkish ? "Süpervizör / Kullanıcı" : "Supervisor / User",
      },
      {
        id: `lad-2-${Date.now()}`,
        step: isTurkish ? "Merdiveni kullanım öncesi kontrol et." : "Inspect the ladder before use.",
        hazards: isTurkish ? "Kırık basamak, hasarlı yan ray veya kaymaz ayak arızası." : "Broken rung, damaged side rail or defective non-slip feet.",
        controls: isTurkish
          ? "Basamak, ray, ayak, bağlantı ve kilitleri kontrol et. Hasarlı merdiveni etiketle ve kullanım dışı bırak."
          : "Inspect rungs, rails, feet, connections and locking devices. Tag and remove damaged ladders from service.",
        responsible: isTurkish ? "Kullanıcı" : "User",
      },
      {
        id: `lad-3-${Date.now()}`,
        step: isTurkish ? "Merdiveni güvenli zemine kur." : "Set up the ladder on safe ground.",
        hazards: isTurkish ? "Kayma, devrilme veya zemine gömülme." : "Slipping, overturning or ground settlement.",
        controls: isTurkish
          ? "Merdiveni sağlam, düz ve kaymaz zemine kur. Gerekirse tabanı sabitle ve uygunsuz yükseltme yapma."
          : "Set the ladder on firm, level and non-slip ground. Secure the base where required and do not improvise height adjustments.",
        responsible: isTurkish ? "Kullanıcı / Süpervizör" : "User / Supervisor",
      },
      {
        id: `lad-4-${Date.now()}`,
        step: isTurkish ? "Doğru açı ve sabitlemeyi sağla." : "Establish correct angle and securing.",
        hazards: isTurkish ? "Merdivenin kayması veya geriye devrilmesi." : "Ladder slipping or overturning backward.",
        controls: isTurkish
          ? "Dayamalı merdivende uygun açı kullan ve üst / alt noktayı gerektiğinde sabitle."
          : "Use the correct angle for leaning ladders and secure the top / bottom where required.",
        responsible: isTurkish ? "Kullanıcı" : "User",
      },
      {
        id: `lad-5-${Date.now()}`,
        step: isTurkish ? "Üç nokta temasla çık ve in." : "Climb and descend using three-point contact.",
        hazards: isTurkish ? "Denge kaybı veya düşme." : "Loss of balance or fall.",
        controls: isTurkish
          ? "Merdivene yüzün dönük olmalı ve iki el bir ayak veya iki ayak bir el şeklinde üç nokta teması korunmalı."
          : "Face the ladder and maintain three points of contact using two hands and one foot or two feet and one hand.",
        responsible: isTurkish ? "Kullanıcı" : "User",
      },
      {
        id: `lad-6-${Date.now()}`,
        step: isTurkish ? "Çalışma sırasında güvenli pozisyonu koru." : "Maintain a safe working position.",
        hazards: isTurkish ? "Aşırı uzanma, yana eğilme veya merdivenin dengesinin bozulması." : "Overreaching, leaning sideways or destabilizing the ladder.",
        controls: isTurkish
          ? "Kemer tokası / gövdeyi yan raylar arasında tut. Uzak noktaya erişmek için merdiveni yeniden konumlandır."
          : "Keep the body between the side rails. Reposition the ladder instead of overreaching.",
        responsible: isTurkish ? "Kullanıcı" : "User",
      },
      {
        id: `lad-7-${Date.now()}`,
        step: isTurkish ? "Alet ve çevre risklerini kontrol et." : "Control tools and surrounding hazards.",
        hazards: isTurkish ? "Düşen alet, elektrik teması veya araç çarpması." : "Dropped tools, electrical contact or vehicle impact.",
        controls: isTurkish
          ? "Aletleri uygun çanta / kemerle taşı. Alt alanı kontrol et ve elektrik / trafik tehlikelerinden güvenli mesafe koru."
          : "Carry tools using a suitable bag / belt. Control the lower area and maintain safe clearance from electrical / traffic hazards.",
        responsible: isTurkish ? "Kullanıcı / Süpervizör" : "User / Supervisor",
      },
      {
        id: `lad-8-${Date.now()}`,
        step: isTurkish ? "Çalışmayı tamamla ve merdiveni kaldır." : "Complete the task and remove the ladder.",
        hazards: isTurkish ? "Taşıma sırasında çarpma, düşen ekipman veya uygunsuz depolama." : "Impact during handling, dropped equipment or unsafe storage.",
        controls: isTurkish
          ? "Merdiveni kontrollü indir ve taşı. Geçiş yollarını kapatmadan uygun depolama alanına yerleştir."
          : "Lower and carry the ladder under control. Store it in a designated area without obstructing access routes.",
        responsible: isTurkish ? "Kullanıcı" : "User",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Merdivenden düşme, ciddi yaralanma, elektrik teması veya diğer acil durumda çalışma derhal durdurulmalıdır. Yaralı personel gereksiz şekilde hareket ettirilmemeli ve saha acil durum prosedürü uygulanmalıdır. Elektrik teması varsa enerji güvenli şekilde kesilmeden kişiye doğrudan temas edilmemelidir."
        : "In the event of a fall from a ladder, serious injury, electrical contact or another emergency, work shall stop immediately. Injured personnel shall not be moved unnecessarily and the site emergency procedure shall be activated. In case of electrical contact, the person shall not be touched until the energy source has been safely isolated."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Merdivenler geçiş yolları, acil çıkışlar veya drenaj alanlarını kapatmayacak şekilde depolanmalıdır. Hasarlı ekipman ve ambalaj malzemeleri proje atık sistemine göre yönetilmeli; çalışma alanı temiz ve düzenli bırakılmalıdır."
        : "Ladders shall be stored without obstructing access routes, emergency exits or drainage areas. Damaged equipment and packaging shall be managed under the project waste system and the work area left clean and orderly."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1926 Subpart X – Stairways and Ladders\n• OSHA 29 CFR 1926.1053 – Ladders\n• Proje / saha yüksekte çalışma ve merdiven prosedürleri\n• Merdiven üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1926 Subpart X – Stairways and Ladders\n• OSHA 29 CFR 1926.1053 – Ladders\n• Project / site work-at-height and ladder procedures\n• Ladder manufacturer instructions"
    );
  };


  const loadMewpTemplate = () => {
    setActivity(
      isTurkish ? "Manlift / MEWP Çalışmaları" : "MEWP Operations"
    );

    setDocumentNo("SRN-MS-017");

    setScope(
      isTurkish
        ? "Bu Method Statement; manlift, boom lift, scissor lift ve benzeri mobil yükseltilebilir çalışma platformlarının güvenli şekilde seçilmesi, kontrol edilmesi, konumlandırılması, kullanılması ve park edilmesi için uygulanacak yöntemi tanımlar. Çalışma; operatör yetkinliği, günlük ekipman kontrolü, zemin stabilitesi, dışlama alanı, düşme koruması, ezilme / sıkışma, elektrik hattı yakınlığı, hava koşulları, acil indirme ve güvenli park işlemlerini kapsar."
        : "This Method Statement defines the safe method for selecting, inspecting, positioning, operating and parking mobile elevating work platforms such as boom lifts and scissor lifts. It covers operator competence, daily inspection, ground stability, exclusion zones, fall protection, crushing / trapping hazards, proximity to electrical lines, weather conditions, emergency lowering and safe parking."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: Görev için uygun MEWP seçimini, çalışma alanını ve saha koşullarını doğrular ve çalışmayı koordine eder.\nYetkili Operatör: Ekipmanı günlük kontrol eder ve yalnızca yetkisi dahilinde üretici talimatlarına göre kullanır.\nGözcü / Banksman: Gerektiğinde ekipman hareketini ve çevresel tehlikeleri güvenli konumdan izler ve operatörle iletişim kurar.\nHSE Personeli: Düşme, ezilme, dışlama alanı, zemin ve hava koşulları kontrollerini destekler."
        : "Site Supervisor: Confirms suitable MEWP selection, work area and site conditions and coordinates the activity.\nAuthorized Operator: Performs the daily inspection and operates the equipment only within authorization and manufacturer instructions.\nSpotter / Banksman: Where required, observes equipment movement and surrounding hazards from a safe position and communicates with the operator.\nHSE Personnel: Supports fall, crushing, exclusion-zone, ground and weather-condition controls."
    );

    setCompetency(
      isTurkish
        ? "MEWP operatörleri kullanılan ekipman tipi için eğitimli, yetkin ve yetkilendirilmiş olmalıdır. Personel düşme, ezilme / sıkışma, devrilme, zemin stabilitesi, elektrik hattı yakınlığı, rüzgâr limitleri, acil indirme ve kurtarma prosedürlerini bilmelidir."
        : "MEWP operators shall be trained, competent and authorized for the equipment type used. Personnel shall understand fall, crushing / trapping, overturning, ground-stability, electrical-line proximity, wind-limit, emergency-lowering and rescue requirements."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• Yüksek görünürlüklü kıyafet\n• İş eldiveni\n• Koruyucu gözlük\n• Boom tipi MEWP için uygun tam vücut emniyet kemeri ve uygun bağlantı sistemi\n• Göreve göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• High-visibility clothing\n• Work gloves\n• Safety glasses\n• Suitable full-body harness and attachment system for boom-type MEWPs\n• Additional PPE according to the task"
    );

    setToolsEquipment(
      isTurkish
        ? "• Uygun ve onaylı MEWP\n• Emniyet kemeri / lanyard gerektiğinde\n• Onaylı ankraj noktası\n• Bariyer ve uyarı levhaları\n• Haberleşme ekipmanı\n• Günlük ekipman kontrol formu\n• Acil indirme sistemi\n• Teker takozları gerektiğinde"
        : "• Suitable approved MEWP\n• Harness / lanyard where required\n• Approved anchor point\n• Barriers and warning signs\n• Communication equipment\n• Daily equipment inspection form\n• Emergency lowering system\n• Wheel chocks where required"
    );

    setPermits(
      isTurkish
        ? "MEWP çalışması başlamadan önce proje / saha yüksekte çalışma ve mobil ekipman gereklilikleri doğrulanmalıdır. Elektrik hattı yakınlığı, kapalı alan, trafik veya diğer özel koşullar varsa ilgili ek izin ve kontroller uygulanmalıdır."
        : "Before MEWP work begins, applicable project / site work-at-height and mobile-equipment requirements shall be verified. Where electrical-line proximity, confined areas, traffic or other special conditions exist, additional permits and controls shall be applied."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini kontrol et.\n• MEWP tipinin görev ve çalışma yüksekliği için uygun olduğunu doğrula.\n• Operatör yetkinliğini kontrol et.\n• Günlük ekipman kontrolünü tamamla.\n• Lastik, fren, alarm, limit switch, guardrail ve acil indirme sistemlerini kontrol et.\n• Zemin stabilitesi, eğim ve taşıma kapasitesini değerlendir.\n• Çukur, açıklık ve engelleri belirle.\n• Dışlama alanını ve yaya kontrolünü oluştur.\n• Elektrik hatları ve enerjili ekipmanlara güvenli mesafeyi doğrula.\n• Rüzgâr ve hava koşullarını üretici limitlerine göre değerlendir.\n• Platformdaki malzeme ve aletleri kontrol et.\n• Acil indirme ve kurtarma düzenini doğrula."
        : "• Review the task-specific risk assessment.\n• Confirm the MEWP type is suitable for the task and working height.\n• Verify operator competence.\n• Complete the daily equipment inspection.\n• Check tyres, brakes, alarms, limit switches, guardrails and emergency lowering systems.\n• Assess ground stability, slope and bearing capacity.\n• Identify holes, openings and obstructions.\n• Establish exclusion zones and pedestrian controls.\n• Verify safe clearance from electrical lines and energized equipment.\n• Assess wind and weather conditions against manufacturer limits.\n• Control materials and tools in the platform.\n• Confirm emergency-lowering and rescue arrangements."
    );

    setMethodSteps([
      {
        id: `mewp-1-${Date.now()}`,
        step: isTurkish ? "Görev için uygun MEWP'yi seç." : "Select the correct MEWP for the task.",
        hazards: isTurkish ? "Yanlış ekipman tipi, yetersiz erişim veya aşırı yük." : "Incorrect equipment type, insufficient reach or overload.",
        controls: isTurkish
          ? "Çalışma yüksekliği, erişim, platform kapasitesi ve saha koşullarına uygun MEWP seç."
          : "Select a MEWP suitable for working height, reach, platform capacity and site conditions.",
        responsible: isTurkish ? "Süpervizör / Operatör" : "Supervisor / Operator",
      },
      {
        id: `mewp-2-${Date.now()}`,
        step: isTurkish ? "Günlük ekipman kontrolünü tamamla." : "Complete the daily equipment inspection.",
        hazards: isTurkish ? "Mekanik arıza veya güvenlik sistemi hatası." : "Mechanical failure or safety-system defect.",
        controls: isTurkish
          ? "Fren, lastik, alarm, guardrail, kontrol sistemi ve acil indirme fonksiyonlarını kontrol et."
          : "Inspect brakes, tyres, alarms, guardrails, controls and emergency-lowering functions.",
        responsible: isTurkish ? "Yetkili Operatör" : "Authorized Operator",
      },
      {
        id: `mewp-3-${Date.now()}`,
        step: isTurkish ? "Zemin ve çalışma alanını kontrol et." : "Inspect ground and work area.",
        hazards: isTurkish ? "Devrilme, çukur, zemin çökmesi veya eğim." : "Overturning, holes, ground failure or slope.",
        controls: isTurkish
          ? "Zemin stabilitesini, eğimi, açıklıkları ve engelleri değerlendir. Üretici limitleri dışında ekipmanı kullanma."
          : "Assess ground stability, slope, openings and obstructions. Do not operate outside manufacturer limits.",
        responsible: isTurkish ? "Operatör / Süpervizör" : "Operator / Supervisor",
      },
      {
        id: `mewp-4-${Date.now()}`,
        step: isTurkish ? "Dışlama alanını ve erişimi kontrol et." : "Control exclusion zone and access.",
        hazards: isTurkish ? "Araç-personel çarpışması veya düşen cisim." : "Vehicle-person collision or falling objects.",
        controls: isTurkish
          ? "Alt alanı bariyerle, yaya erişimini kontrol et ve platformdan malzeme düşmesini önle."
          : "Barricade the lower area, control pedestrian access and prevent materials falling from the platform.",
        responsible: isTurkish ? "Süpervizör / HSE" : "Supervisor / HSE",
      },
      {
        id: `mewp-5-${Date.now()}`,
        step: isTurkish ? "Platforma güvenli şekilde çık ve düşüş korumasını uygula." : "Enter the platform safely and apply fall protection.",
        hazards: isTurkish ? "Platformdan düşme veya uygun olmayan bağlantı." : "Fall from platform or incorrect attachment.",
        controls: isTurkish
          ? "Kapıyı kapalı tut, guardrail üzerine çıkma ve gerektiğinde emniyet kemerini yalnızca onaylı ankraj noktasına bağla."
          : "Keep the gate closed, do not climb on guardrails and attach fall protection only to approved anchor points where required.",
        responsible: isTurkish ? "Yetkili Operatör" : "Authorized Operator",
      },
      {
        id: `mewp-6-${Date.now()}`,
        step: isTurkish ? "Platformu kontrollü şekilde yükselt ve konumlandır." : "Raise and position the platform under control.",
        hazards: isTurkish ? "Ezilme, sıkışma, yapı teması veya elektrik hattına yaklaşma." : "Crushing, trapping, structural contact or approach to electrical lines.",
        controls: isTurkish
          ? "Üst ve yan açıklıkları sürekli izle. Sıkışma bölgelerinden ve elektrik tehlikelerinden güvenli mesafe koru."
          : "Continuously monitor overhead and side clearances. Maintain safe distance from crushing zones and electrical hazards.",
        responsible: isTurkish ? "Yetkili Operatör" : "Authorized Operator",
      },
      {
        id: `mewp-7-${Date.now()}`,
        step: isTurkish ? "Çalışma boyunca yük, rüzgâr ve çevre koşullarını izle." : "Monitor load, wind and surrounding conditions during work.",
        hazards: isTurkish ? "Aşırı yük, yüksek rüzgâr, devrilme veya çevresel değişiklik." : "Overload, high wind, overturning or changing surrounding conditions.",
        controls: isTurkish
          ? "Platform kapasitesini aşma. Hava koşulları üretici limitlerini aşarsa çalışmayı durdur ve platformu güvenli şekilde indir."
          : "Do not exceed platform capacity. Stop work and lower the platform safely if weather conditions exceed manufacturer limits.",
        responsible: isTurkish ? "Operatör / Süpervizör" : "Operator / Supervisor",
      },
      {
        id: `mewp-8-${Date.now()}`,
        step: isTurkish ? "Platformu indir, park et ve ekipmanı güvenli hale getir." : "Lower, park and secure the equipment.",
        hazards: isTurkish ? "Kontrolsüz hareket, yetkisiz kullanım veya sıkışma." : "Uncontrolled movement, unauthorized use or trapping.",
        controls: isTurkish
          ? "Platformu tamamen indir, belirlenmiş alana park et, park frenini uygula ve ekipmanı kapat / izole et."
          : "Fully lower the platform, park in the designated area, apply the parking brake and shut down / isolate the equipment.",
        responsible: isTurkish ? "Yetkili Operatör" : "Authorized Operator",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Ekipman arızası, platformda sıkışma, operatörün rahatsızlanması, devrilme riski, elektrik teması veya diğer acil durumda çalışma durdurulmalıdır. Acil indirme sistemi yalnızca eğitimli personel tarafından kullanılmalı ve proje kurtarma / acil durum prosedürü uygulanmalıdır. Kurtarma planı olmadan doğaçlama müdahale yapılmamalıdır."
        : "In the event of equipment failure, platform entrapment, operator illness, overturning risk, electrical contact or another emergency, work shall stop. Emergency lowering shall only be performed by trained personnel and the project rescue / emergency procedure implemented. Improvised rescue shall not be attempted."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Yakıt, yağ ve hidrolik sızıntıları kontrol edilmeli ve dökülmeler spill kit ile yönetilmelidir. Ekipman belirlenen alanlarda park edilmeli, gereksiz rölanti ve gürültü azaltılmalı ve çalışma sonunda alan temiz bırakılmalıdır."
        : "Fuel, oil and hydraulic leaks shall be controlled and spills managed using suitable spill kits. Equipment shall be parked in designated areas, unnecessary idling and noise minimized and the area left clean after work."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• Proje / saha MEWP ve yüksekte çalışma prosedürleri\n• OSHA 29 CFR 1926 Subpart L – Scaffolds, uygulanabildiği ölçüde\n• OSHA 29 CFR 1926 Subpart M – Fall Protection, uygulanabildiği ölçüde\n• Kullanılan MEWP üretici kullanım talimatları"
        : "• SERNEM task-specific risk assessment\n• Project / site MEWP and work-at-height procedures\n• OSHA 29 CFR 1926 Subpart L – Scaffolds, where applicable\n• OSHA 29 CFR 1926 Subpart M – Fall Protection, where applicable\n• MEWP manufacturer operating instructions"
    );
  };


  const loadManualHandlingTemplate = () => {
    setActivity(
      isTurkish ? "Elle Taşıma" : "Manual Handling"
    );

    setDocumentNo("SRN-MS-018");

    setScope(
      isTurkish
        ? "Bu Method Statement; malzeme, ekipman, kutu, boru, parça ve benzeri yüklerin elle kaldırılması, indirilmesi, taşınması, itilmesi veya çekilmesi sırasında uygulanacak güvenli çalışma yöntemini tanımlar. Çalışma; yükün ağırlık ve boyutunun değerlendirilmesi, taşıma rotasının kontrolü, doğru kaldırma tekniği, ekip kaldırması, mekanik yardım kullanımı, kavrama, pinch point ve tekrarlı hareket risklerinin kontrolünü kapsar."
        : "This Method Statement defines the safe method for manually lifting, lowering, carrying, pushing or pulling materials, equipment, boxes, pipes, components and similar loads. It covers assessment of load weight and size, travel-route control, correct lifting technique, team lifting, use of mechanical assistance, grip, pinch-point and repetitive-motion hazards."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: Elle taşıma gereksinimini değerlendirir, uygun taşıma yöntemini belirler ve mekanik yardım gerekip gerekmediğini doğrular.\nÇalışanlar: Yükü kaldırmadan önce değerlendirir, güvenli kaldırma tekniğini uygular ve kapasitesini aşan yükleri tek başına taşımaz.\nHSE Personeli: Manuel taşıma, ergonomi, taşıma rotası ve saha kontrollerinin uygulanmasını destekler."
        : "Site Supervisor: Assesses the manual-handling requirement, determines the suitable handling method and confirms whether mechanical assistance is required.\nWorkers: Assess the load before lifting, apply safe lifting techniques and shall not attempt loads beyond their capability alone.\nHSE Personnel: Support manual-handling, ergonomic, travel-route and field controls."
    );

    setCompetency(
      isTurkish
        ? "Elle taşıma yapan personel doğru kaldırma tekniği, yük değerlendirmesi, ekip kaldırması, mekanik yardım kullanımı, pinch point, tekrarlı hareket ve ergonomi riskleri konusunda bilgilendirilmiş olmalıdır."
        : "Personnel performing manual handling shall be instructed in correct lifting technique, load assessment, team lifting, use of mechanical assistance, pinch-point, repetitive-motion and ergonomic hazards."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• Uygun iş eldiveni\n• Yüksek görünürlüklü kıyafet gerektiğinde\n• Keskin kenar riskine göre uygun eldiven\n• Göreve göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Suitable work gloves\n• High-visibility clothing where required\n• Suitable gloves for sharp-edge hazards\n• Additional PPE according to the task"
    );

    setToolsEquipment(
      isTurkish
        ? "• El arabası / trolley gerektiğinde\n• Palet arabası gerektiğinde\n• Uygun kaldırma aparatı gerektiğinde\n• Taşıma kayışı / handle gerektiğinde\n• Bariyer ve uyarı levhaları\n• Mekanik kaldırma ekipmanı gerektiğinde"
        : "• Hand trolley where required\n• Pallet truck where required\n• Suitable lifting aid where required\n• Carrying strap / handle where required\n• Barriers and warning signs\n• Mechanical lifting equipment where required"
    );

    setPermits(
      isTurkish
        ? "Standart elle taşıma faaliyetleri için ayrı çalışma izni gerekmeyebilir; ancak proje / saha prosedürleri, kaldırma alanı, trafik, yüksekte çalışma veya özel malzeme koşulları varsa ilgili izin ve kontroller uygulanmalıdır. Ağır, hacimli veya kontrol edilmesi zor yüklerde mekanik taşıma tercih edilmelidir."
        : "A separate permit may not be required for routine manual handling; however, applicable project / site procedures and controls shall be followed where lifting areas, traffic, work at height or special materials are involved. Mechanical handling shall be preferred for heavy, bulky or difficult-to-control loads."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini kontrol et.\n• Yükün ağırlığını, boyutunu ve ağırlık merkezini değerlendir.\n• Yükün tek kişi tarafından güvenle taşınıp taşınamayacağını belirle.\n• Keskin kenar, sıcak yüzey veya kimyasal bulaşma risklerini kontrol et.\n• Taşıma rotasını ve varış noktasını kontrol et.\n• Zemin, basamak, engel, kapı ve görüş kısıtlarını belirle.\n• Uygun kavrama noktalarını doğrula.\n• Gerekiyorsa ekip kaldırması veya mekanik yardım planla.\n• Ekip kaldırmasında bir kişi komut vermelidir.\n• Yükün altına el veya ayak sokulmasını önle.\n• Tekrarlı taşıma varsa iş rotasyonu / dinlenme ihtiyacını değerlendir.\n• Taşıma alanında gereksiz personeli uzak tut."
        : "• Review the task-specific risk assessment.\n• Assess the load weight, size and centre of gravity.\n• Determine whether the load can be safely handled by one person.\n• Check sharp edges, hot surfaces or chemical contamination hazards.\n• Inspect the travel route and destination.\n• Identify ground, steps, obstacles, doors and visibility restrictions.\n• Confirm suitable grip points.\n• Plan team lifting or mechanical assistance where required.\n• For team lifting, one person shall give commands.\n• Prevent hands or feet being placed beneath the load.\n• Assess job rotation / rest needs for repetitive handling.\n• Keep unnecessary personnel clear of the handling area."
    );

    setMethodSteps([
      {
        id: `mh-1-${Date.now()}`,
        step: isTurkish ? "Yükü kaldırmadan önce değerlendir." : "Assess the load before handling.",
        hazards: isTurkish ? "Aşırı ağırlık, dengesiz yük veya bilinmeyen ağırlık merkezi." : "Excessive weight, unstable load or unknown centre of gravity.",
        controls: isTurkish
          ? "Yükün ağırlık, boyut ve ağırlık merkezini değerlendir. Şüphe varsa tek başına kaldırma."
          : "Assess the load weight, size and centre of gravity. Do not lift alone where there is doubt.",
        responsible: isTurkish ? "Çalışan / Süpervizör" : "Worker / Supervisor",
      },
      {
        id: `mh-2-${Date.now()}`,
        step: isTurkish ? "Taşıma rotasını hazırla." : "Prepare the travel route.",
        hazards: isTurkish ? "Takılma, kayma, düşme veya görüş kısıtı." : "Trips, slips, falls or restricted visibility.",
        controls: isTurkish
          ? "Rotadaki engelleri kaldır, zemini kontrol et ve varış noktasını önceden hazırla."
          : "Remove obstacles from the route, inspect the ground and prepare the destination in advance.",
        responsible: isTurkish ? "Çalışan / Süpervizör" : "Worker / Supervisor",
      },
      {
        id: `mh-3-${Date.now()}`,
        step: isTurkish ? "Doğru taşıma yöntemini belirle." : "Determine the correct handling method.",
        hazards: isTurkish ? "Kapasite aşımı, kas zorlanması veya kontrol kaybı." : "Exceeding capability, muscular strain or loss of control.",
        controls: isTurkish
          ? "Gerekirse ekip kaldırması, trolley veya mekanik kaldırma ekipmanı kullan."
          : "Use team lifting, a trolley or mechanical lifting equipment where required.",
        responsible: isTurkish ? "Süpervizör / Çalışan" : "Supervisor / Worker",
      },
      {
        id: `mh-4-${Date.now()}`,
        step: isTurkish ? "Yükü güvenli pozisyondan kavra." : "Grip the load from a safe position.",
        hazards: isTurkish ? "El yaralanması, kötü kavrama veya pinch point." : "Hand injury, poor grip or pinch point.",
        controls: isTurkish
          ? "Sağlam kavrama noktaları kullan. Ellerini keskin kenar ve sıkışma bölgelerinden uzak tut."
          : "Use secure grip points. Keep hands clear of sharp edges and trapping zones.",
        responsible: isTurkish ? "Çalışan" : "Worker",
      },
      {
        id: `mh-5-${Date.now()}`,
        step: isTurkish ? "Yükü doğru teknikle kaldır." : "Lift using the correct technique.",
        hazards: isTurkish ? "Bel / sırt zorlanması, ani hareket veya denge kaybı." : "Back strain, sudden movement or loss of balance.",
        controls: isTurkish
          ? "Yüke yakın dur, ayakları dengeli konumlandır, dizleri bük ve yükü kontrollü kaldır. Ani dönme hareketlerinden kaçın."
          : "Stand close to the load, position feet securely, bend the knees and lift under control. Avoid sudden twisting.",
        responsible: isTurkish ? "Çalışan" : "Worker",
      },
      {
        id: `mh-6-${Date.now()}`,
        step: isTurkish ? "Yükü kontrollü şekilde taşı." : "Carry the load under control.",
        hazards: isTurkish ? "Görüş kaybı, çarpışma, düşürme veya yorgunluk." : "Restricted vision, collision, dropping the load or fatigue.",
        controls: isTurkish
          ? "Görüşünü kapatan yükleri tek başına taşıma. Kontrollü hızda ilerle ve gerekirse yardım al."
          : "Do not carry loads alone where vision is obstructed. Move at a controlled pace and obtain assistance where required.",
        responsible: isTurkish ? "Çalışan / Ekip" : "Worker / Team",
      },
      {
        id: `mh-7-${Date.now()}`,
        step: isTurkish ? "Yükü kontrollü şekilde indir ve yerleştir." : "Lower and place the load under control.",
        hazards: isTurkish ? "El / ayak sıkışması, yükün devrilmesi veya düşmesi." : "Hand / foot trapping, load overturning or dropping.",
        controls: isTurkish
          ? "Varış noktasını önceden hazırla. Elleri ve ayakları yükün altından uzak tutarak kontrollü şekilde indir."
          : "Prepare the destination beforehand. Lower the load under control while keeping hands and feet clear underneath.",
        responsible: isTurkish ? "Çalışan / Ekip" : "Worker / Team",
      },
      {
        id: `mh-8-${Date.now()}`,
        step: isTurkish ? "Çalışmayı tamamla ve alanı düzenle." : "Complete the task and restore the area.",
        hazards: isTurkish ? "Tekrarlı yüklenme, düzensiz istif veya takılma." : "Repetitive strain, unstable stacking or trip hazards.",
        controls: isTurkish
          ? "Malzemeyi güvenli istifle, taşıma ekipmanını kaldır ve tekrarlı işlerde gerekli dinlenme / rotasyonu uygula."
          : "Stack materials safely, remove handling aids and apply required rest / rotation for repetitive tasks.",
        responsible: isTurkish ? "Çalışan / Süpervizör" : "Worker / Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Kas-iskelet yaralanması, yük düşmesi, el / ayak sıkışması veya diğer acil durumda çalışma durdurulmalıdır. Yaralanan personel güvenli alana alınmalı ve uygun ilk yardım uygulanmalıdır. Ciddi bel / boyun ağrısı, kırık şüphesi veya ciddi ezilme halinde personel gereksiz yere hareket ettirilmemeli ve saha acil durum prosedürü uygulanmalıdır."
        : "In the event of musculoskeletal injury, dropped load, hand / foot trapping or another emergency, work shall stop. Injured personnel shall be moved to a safe area where appropriate and first aid provided. For severe back / neck pain, suspected fracture or serious crushing injury, personnel shall not be moved unnecessarily and the site emergency procedure shall be activated."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Taşıma rotaları temiz tutulmalı, ambalaj ve bağlama malzemeleri çalışma alanında bırakılmamalıdır. Kullanılmayan palet, kutu ve diğer malzemeler belirlenmiş alanlarda güvenli şekilde depolanmalı ve atıklar proje atık sistemine göre yönetilmelidir."
        : "Handling routes shall be kept clear and packaging or securing materials shall not be left in work areas. Unused pallets, boxes and other materials shall be safely stored in designated areas and waste managed under the project waste system."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1926 Subpart H – Materials Handling, Storage, Use, and Disposal\n• Proje / saha manuel taşıma ve ergonomi prosedürleri\n• Kullanılan yardımcı taşıma ekipmanı üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1926 Subpart H – Materials Handling, Storage, Use, and Disposal\n• Project / site manual-handling and ergonomic procedures\n• Manufacturer instructions for handling aids used"
    );
  };


  const loadChemicalHandlingTemplate = () => {
    setActivity(
      isTurkish
        ? "Kimyasal Kullanım ve Elleçleme"
        : "Chemical Handling"
    );

    setDocumentNo("SRN-MS-019");

    setScope(
      isTurkish
        ? "Bu Method Statement; saha içerisinde kullanılan kimyasal maddelerin teslim alınması, tanımlanması, taşınması, depolanması, hazırlanması, aktarılması, kullanılması ve atıklarının yönetilmesi sırasında uygulanacak güvenli çalışma yöntemini tanımlar. Çalışma; SDS kontrolü, etiketleme, kimyasal uyumluluk, cilt ve göz teması, inhalasyon, havalandırma, dökülme kontrolü, uygun PPE, depolama ve acil müdahale düzenlemelerini kapsar."
        : "This Method Statement defines the safe method for receiving, identifying, transporting, storing, preparing, transferring, using and disposing of chemicals used on site. It covers SDS verification, labelling, chemical compatibility, skin and eye contact, inhalation, ventilation, spill control, suitable PPE, storage and emergency-response arrangements."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: Kullanılacak kimyasalları, çalışma alanını, SDS gerekliliklerini ve uygulama yöntemini doğrular ve çalışmayı koordine eder.\nYetkili Kullanıcı / Çalışan: Kimyasalları yalnızca etiket, SDS ve üretici talimatlarına uygun şekilde kullanır ve gerekli PPE'yi uygular.\nDepo / Malzeme Personeli: Kimyasalların uygun etiketli, kapalı ve uyumlu depolama koşullarında tutulmasını sağlar.\nHSE Personeli: Kimyasal risk değerlendirmesi, SDS, havalandırma, spill response, PPE ve atık kontrollerini destekler."
        : "Site Supervisor: Confirms chemicals to be used, work area, SDS requirements and application method and coordinates the work.\nAuthorized User / Worker: Uses chemicals only in accordance with labels, SDS information and manufacturer instructions and applies the required PPE.\nWarehouse / Material Personnel: Ensure chemicals are stored closed, labelled and under compatible storage conditions.\nHSE Personnel: Support chemical risk assessment, SDS, ventilation, spill response, PPE and waste controls."
    );

    setCompetency(
      isTurkish
        ? "Kimyasallarla çalışan personel etiket ve SDS okuma, kimyasal tehlikeler, uyumsuz maddeler, cilt / göz teması, inhalasyon, dökülme müdahalesi, uygun PPE ve acil durum prosedürleri konusunda bilgilendirilmiş ve görev için yetkin olmalıdır."
        : "Personnel working with chemicals shall be instructed and competent in reading labels and SDS information, chemical hazards, incompatible substances, skin / eye exposure, inhalation, spill response, suitable PPE and emergency procedures."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• Kimyasala uygun koruyucu eldiven\n• Koruyucu gözlük\n• Sıçrama riskinde yüz siperi\n• Kimyasala uygun koruyucu kıyafet / önlük / tulum gerektiğinde\n• SDS ve risk değerlendirmesine uygun solunum koruması gerektiğinde\n• Göreve göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Chemical-resistant gloves\n• Safety glasses\n• Face shield where splash risk exists\n• Chemical-resistant protective clothing / apron / coveralls where required\n• Respiratory protection suitable for the SDS and risk assessment where required\n• Additional PPE according to the task"
    );

    setToolsEquipment(
      isTurkish
        ? "• Orijinal veya onaylı etiketli kimyasal kapları\n• Uygun transfer / dozaj ekipmanı\n• Kimyasala dayanıklı ikincil kap / secondary containment\n• Spill kit\n• Absorban malzemeler\n• Acil göz yıkama / duş erişimi gerektiğinde\n• Havalandırma ekipmanı gerektiğinde\n• Gaz / VOC ölçüm cihazı gerektiğinde\n• Uygun atık kapları\n• Bariyer ve uyarı levhaları\n• Yangın söndürücü kimyasalın özelliğine göre"
        : "• Original or approved labelled chemical containers\n• Suitable transfer / dosing equipment\n• Chemical-resistant secondary containment\n• Spill kit\n• Absorbent materials\n• Emergency eyewash / shower access where required\n• Ventilation equipment where required\n• Gas / VOC monitoring equipment where required\n• Suitable waste containers\n• Barriers and warning signs\n• Fire extinguisher suitable for the chemical hazard"
    );

    setPermits(
      isTurkish
        ? "Kimyasal kullanımından önce proje / saha prosedürlerinin gerektirdiği izinler kontrol edilmelidir. Yanıcı, toksik, korozif veya özel tehlikeli kimyasalların kullanıldığı alanlarda ilave kontrol, havalandırma, atmosfer ölçümü veya özel çalışma izni gerekebilir. Kullanılacak her ürün için güncel SDS çalışma alanında erişilebilir olmalıdır."
        : "Before chemical use, permits required by project / site procedures shall be checked. Additional controls, ventilation, atmosphere monitoring or special work permits may be required where flammable, toxic, corrosive or other hazardous chemicals are used. A current SDS for each product shall be accessible at the work area."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesini kontrol et.\n• Kimyasalın doğru ürün ve doğru etiketli olduğunu doğrula.\n• Güncel SDS'yi incele.\n• Tehlike sınıfı ve maruziyet yollarını belirle.\n• Kimyasal uyumluluğu ve birlikte depolama risklerini kontrol et.\n• Çalışma alanında yeterli havalandırmayı doğrula.\n• Gerekli PPE'yi SDS ve risk değerlendirmesine göre seç.\n• Kap ve transfer ekipmanının fiziksel durumunu kontrol et.\n• Secondary containment / damlama tepsisi kullan.\n• Spill kit ve acil müdahale ekipmanını hazırla.\n• Göz yıkama / acil duş erişimini doğrula gerektiğinde.\n• Atık ve boş kap yönetimini çalışma başlamadan planla."
        : "• Review the task-specific risk assessment.\n• Confirm the chemical is the correct product and correctly labelled.\n• Review the current SDS.\n• Identify hazard classification and exposure routes.\n• Check chemical compatibility and co-storage hazards.\n• Confirm adequate ventilation in the work area.\n• Select PPE according to the SDS and risk assessment.\n• Inspect containers and transfer equipment.\n• Use secondary containment / drip trays.\n• Provide spill kits and emergency-response equipment.\n• Confirm eyewash / emergency shower access where required.\n• Plan waste and empty-container management before work starts."
    );

    setMethodSteps([
      {
        id: `chem-1-${Date.now()}`,
        step: isTurkish
          ? "Kimyasalı, etiketi ve SDS'yi doğrula."
          : "Verify the chemical, label and SDS.",
        hazards: isTurkish
          ? "Yanlış ürün, eksik etiket veya bilinmeyen tehlike."
          : "Incorrect product, missing label or unidentified hazard.",
        controls: isTurkish
          ? "Ürün adı, etiket ve SDS bilgilerini eşleştir. Etiketsiz veya tanımlanamayan kimyasalı kullanma."
          : "Match the product name, label and SDS information. Do not use unlabelled or unidentified chemicals.",
        responsible: isTurkish ? "Süpervizör / Kullanıcı" : "Supervisor / User",
      },
      {
        id: `chem-2-${Date.now()}`,
        step: isTurkish
          ? "Çalışma alanını ve havalandırmayı hazırla."
          : "Prepare the work area and ventilation.",
        hazards: isTurkish
          ? "Buhar / gaz birikimi veya yetkisiz erişim."
          : "Vapour / gas accumulation or unauthorized access.",
        controls: isTurkish
          ? "Alanı gerektiğinde bariyerle, doğal veya mekanik havalandırmayı sağla ve gerekli atmosfer ölçümlerini uygula."
          : "Barricade the area where required, provide natural or mechanical ventilation and perform required atmosphere monitoring.",
        responsible: isTurkish ? "Süpervizör / HSE" : "Supervisor / HSE",
      },
      {
        id: `chem-3-${Date.now()}`,
        step: isTurkish
          ? "Kimyasal kabını güvenli şekilde taşı ve konumlandır."
          : "Transport and position the chemical container safely.",
        hazards: isTurkish
          ? "Kap düşmesi, kırılması, sızıntı veya manuel taşıma."
          : "Dropped container, breakage, leakage or manual-handling injury.",
        controls: isTurkish
          ? "Kabın kapalı olduğunu doğrula. Uygun taşıma ekipmanı ve secondary containment kullan."
          : "Confirm the container is closed. Use suitable handling equipment and secondary containment.",
        responsible: isTurkish ? "Kullanıcı / Depo Personeli" : "User / Warehouse Personnel",
      },
      {
        id: `chem-4-${Date.now()}`,
        step: isTurkish
          ? "Kimyasalı kontrollü şekilde aç ve hazırla."
          : "Open and prepare the chemical under control.",
        hazards: isTurkish
          ? "Sıçrama, buhar maruziyeti veya ani basınç çıkışı."
          : "Splash, vapour exposure or sudden pressure release.",
        controls: isTurkish
          ? "Kabı vücuttan uzağa ve kontrollü şekilde aç. Uygun göz, yüz, el ve solunum korumasını kullan."
          : "Open the container slowly and away from the body. Use suitable eye, face, hand and respiratory protection.",
        responsible: isTurkish ? "Yetkili Kullanıcı" : "Authorized User",
      },
      {
        id: `chem-5-${Date.now()}`,
        step: isTurkish
          ? "Aktarma / karıştırma işlemini güvenli şekilde gerçekleştir."
          : "Perform transfer / mixing safely.",
        hazards: isTurkish
          ? "Dökülme, sıçrama, yanlış karışım veya kimyasal reaksiyon."
          : "Spill, splash, incorrect mixing or chemical reaction.",
        controls: isTurkish
          ? "Yalnızca uyumlu kimyasalları üretici / SDS talimatına göre karıştır. Uygun transfer ekipmanı ve ikincil containment kullan."
          : "Mix only compatible chemicals according to manufacturer / SDS instructions. Use suitable transfer equipment and secondary containment.",
        responsible: isTurkish ? "Yetkili Kullanıcı" : "Authorized User",
      },
      {
        id: `chem-6-${Date.now()}`,
        step: isTurkish
          ? "Kimyasalı kontrollü şekilde kullan."
          : "Use the chemical under controlled conditions.",
        hazards: isTurkish
          ? "Soluma, cilt teması, göz teması veya yanıcı buhar."
          : "Inhalation, skin contact, eye contact or flammable vapour.",
        controls: isTurkish
          ? "SDS'ye uygun PPE kullan, havalandırmayı sürdür ve ateşleme kaynaklarını kimyasalın özelliğine göre kontrol et."
          : "Use PPE according to the SDS, maintain ventilation and control ignition sources according to the chemical hazard.",
        responsible: isTurkish ? "Yetkili Kullanıcı" : "Authorized User",
      },
      {
        id: `chem-7-${Date.now()}`,
        step: isTurkish
          ? "Kullanım sonrası kabı kapat ve uygun şekilde depola."
          : "Close and store the container correctly after use.",
        hazards: isTurkish
          ? "Sızıntı, yanlış depolama veya uyumsuz kimyasalların teması."
          : "Leakage, incorrect storage or contact between incompatible chemicals.",
        controls: isTurkish
          ? "Kabı kapalı ve etiketli tut. Kimyasalı uyumluluk gerekliliklerine ve SDS depolama koşullarına göre yerleştir."
          : "Keep the container closed and labelled. Store the chemical according to compatibility requirements and SDS storage conditions.",
        responsible: isTurkish ? "Kullanıcı / Depo Personeli" : "User / Warehouse Personnel",
      },
      {
        id: `chem-8-${Date.now()}`,
        step: isTurkish
          ? "Atıkları yönet ve alanı güvenli şekilde teslim et."
          : "Manage waste and hand over the area safely.",
        hazards: isTurkish
          ? "Kimyasal atık, kirli absorbent, boş kap veya çevresel kirlilik."
          : "Chemical waste, contaminated absorbent, empty containers or environmental contamination.",
        controls: isTurkish
          ? "Kimyasal atıkları uygun etiketli kaplarda topla. Drenaja veya toprağa boşaltma yapma ve alanı temiz bırak."
          : "Collect chemical waste in suitable labelled containers. Do not discharge chemicals to drains or ground and leave the area clean.",
        responsible: isTurkish ? "Kullanıcı / Süpervizör" : "User / Supervisor",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Kimyasal sıçrama, soluma maruziyeti, dökülme, reaksiyon, yangın veya diğer acil durumda çalışma derhal durdurulmalıdır. Etkilenen personel güvenli alana alınmalı ve SDS ilk yardım talimatları uygulanmalıdır. Göz veya cilt temasında uygun göz yıkama / acil duş kullanılmalı; büyük dökülme veya tehlikeli buhar oluşumunda alan izole edilerek saha acil durum prosedürü uygulanmalıdır."
        : "In the event of chemical splash, inhalation exposure, spill, reaction, fire or another emergency, work shall stop immediately. Affected personnel shall be moved to a safe area and SDS first-aid instructions followed. Suitable eyewash / emergency shower facilities shall be used for eye or skin exposure, and for major spills or hazardous vapour release the area shall be isolated and the site emergency procedure implemented."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Kimyasallar drenaja, toprağa veya çevreye kontrolsüz boşaltılmamalıdır. Dökülmeler uygun spill kit ile sınırlandırılmalı ve kirli absorbent / PPE / boş kaplar proje atık yönetim sistemine göre ayrı toplanmalıdır. Kimyasal depolama alanlarında secondary containment ve uygun etiketleme korunmalıdır."
        : "Chemicals shall not be discharged uncontrolled to drains, ground or the environment. Spills shall be contained using suitable spill kits and contaminated absorbents / PPE / empty containers segregated under the project waste-management system. Secondary containment and suitable labelling shall be maintained in chemical storage areas."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• Kullanılan kimyasalların güncel SDS dokümanları\n• OSHA 29 CFR 1926.59 – Hazard Communication\n• OSHA 29 CFR 1926.55 – Gases, Vapors, Fumes, Dusts, and Mists\n• Proje / saha kimyasal yönetimi ve spill response prosedürleri\n• Kimyasal ürün üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• Current SDS documentation for chemicals used\n• OSHA 29 CFR 1926.59 – Hazard Communication\n• OSHA 29 CFR 1926.55 – Gases, Vapors, Fumes, Dusts, and Mists\n• Project / site chemical-management and spill-response procedures\n• Chemical manufacturer instructions"
    );
  };


  const loadCompressedGasTemplate = () => {
    setActivity(
      isTurkish
        ? "Basınçlı Gaz Tüpleri"
        : "Compressed Gas Cylinder Handling"
    );

    setDocumentNo("SRN-MS-020");

    setScope(
      isTurkish
        ? "Bu Method Statement; basınçlı gaz tüplerinin saha içerisinde teslim alınması, tanımlanması, taşınması, depolanması, sabitlenmesi, regülatör ve hortum bağlantılarının yapılması, kullanılması ve çalışma sonrası güvenli şekilde kapatılması için uygulanacak çalışma yöntemini tanımlar. Çalışma; yüksek basınç, tüp devrilmesi, valf hasarı, gaz sızıntısı, yanlış gaz kullanımı, oksijen ve yanıcı gazların ayrılması, ateşleme kaynakları, taşıma, depolama ve acil durum kontrollerini kapsar."
        : "This Method Statement defines the safe method for receiving, identifying, transporting, storing, securing, connecting regulators and hoses, using and safely shutting down compressed gas cylinders on site. It covers high pressure, cylinder overturning, valve damage, gas leakage, incorrect gas selection, segregation of oxygen and fuel gases, ignition sources, transportation, storage and emergency controls."
    );

    setResponsibilities(
      isTurkish
        ? "Saha Süpervizörü: Gaz tüpü kullanımını, çalışma alanını, depolama koşullarını ve gerekli izinleri doğrular ve çalışmayı koordine eder.\nYetkili Kullanıcı: Tüp kimliğini kontrol eder, tüpü güvenli şekilde sabitler ve uygun regülatör / bağlantı ekipmanını kullanır.\nDepo / Malzeme Personeli: Tüplerin dik, sabitlenmiş, kapaklı ve uygun şekilde ayrılmış depolama alanlarında tutulmasını sağlar.\nHSE Personeli: Basınçlı gaz, yangın, depolama, taşıma, sızıntı ve acil durum kontrollerinin uygulanmasını destekler."
        : "Site Supervisor: Verifies cylinder use, work area, storage conditions and required permits and coordinates the work.\nAuthorized User: Confirms cylinder identity, secures the cylinder and uses suitable regulators and connection equipment.\nWarehouse / Material Personnel: Ensure cylinders are stored upright, secured, capped and correctly segregated.\nHSE Personnel: Support compressed-gas, fire, storage, transportation, leakage and emergency controls."
    );

    setCompetency(
      isTurkish
        ? "Basınçlı gaz tüpleriyle çalışan personel gaz tanımlama, tüp etiketi, yüksek basınç tehlikesi, güvenli taşıma, tüp sabitleme, valf ve regülatör kullanımı, gaz uyumluluğu, sızıntı kontrolü, yangın ve acil durum prosedürleri konusunda eğitimli ve görev için yetkin olmalıdır."
        : "Personnel working with compressed gas cylinders shall be trained and competent in gas identification, cylinder labelling, high-pressure hazards, safe transportation, cylinder securing, valve and regulator use, gas compatibility, leak checking, fire hazards and emergency procedures."
    );

    setPpe(
      isTurkish
        ? "• Baret\n• Emniyet ayakkabısı\n• İş eldiveni\n• Koruyucu gözlük\n• Göreve uygun iş kıyafeti\n• Gazın ve işin özelliğine göre yüz koruması gerektiğinde\n• Sıcak çalışma varsa uygun sıcak çalışma PPE'si\n• Risk değerlendirmesine göre ilave PPE"
        : "• Safety helmet\n• Safety footwear\n• Work gloves\n• Safety glasses\n• Suitable work clothing\n• Face protection where required by the gas or task\n• Suitable hot-work PPE where hot work is involved\n• Additional PPE according to the risk assessment"
    );

    setToolsEquipment(
      isTurkish
        ? "• Onaylı ve doğru etiketli gaz tüpleri\n• Uygun tüp taşıma arabası\n• Tüp zinciri / kayışı / sabitleme sistemi\n• Valf koruma kapağı\n• Gaza özel uygun regülatör\n• Uygun hortum ve bağlantı elemanları\n• Flashback arrestor / non-return valve gerektiğinde\n• Onaylı kaçak kontrol solüsyonu\n• Bariyer ve uyarı levhaları\n• Uygun yangın söndürücü\n• Tüp depolama kafesi / alanı"
        : "• Approved and correctly labelled gas cylinders\n• Suitable cylinder trolley\n• Cylinder chain / strap / securing system\n• Valve protection cap\n• Gas-specific suitable regulator\n• Suitable hoses and connections\n• Flashback arrestor / non-return valve where required\n• Approved leak-detection solution\n• Barriers and warning signs\n• Suitable fire extinguisher\n• Cylinder storage cage / area"
    );

    setPermits(
      isTurkish
        ? "Basınçlı gaz tüpü kullanımı başlamadan önce proje / saha prosedürlerinin gerektirdiği çalışma izinları kontrol edilmelidir. Tüpler sıcak çalışma için kullanılacaksa geçerli sıcak çalışma izni ve yangın kontrolleri uygulanmalıdır. Kapalı alan veya özel proses alanlarında gaz kullanımı için ilave izin, gaz ölçümü ve havalandırma gereklilikleri uygulanabilir."
        : "Before compressed gas cylinder use begins, permits required by project / site procedures shall be verified. Where cylinders are used for hot work, a valid hot-work permit and fire controls shall be applied. Additional permits, gas monitoring and ventilation requirements may apply in confined spaces or special process areas."
    );

    setPreWorkRequirements(
      isTurkish
        ? "• Göreve özel risk değerlendirmesi ve gerekli izinleri kontrol et.\n• Tüp etiketi ve gaz cinsini doğrula; yalnızca renk koduna güvenme.\n• Tüp gövdesi, valf ve koruma kapağını kontrol et.\n• Tüpün test / muayene durumunu saha gerekliliklerine göre doğrula.\n• Uygun tüp taşıma arabasını hazırla.\n• Tüpü kullanım ve depolama sırasında dik ve sabit tut.\n• Gaz tipine uygun regülatör, hortum ve bağlantıları seç.\n• Oksijen ekipmanını yağ ve gresten uzak tut.\n• Oksijen ve yanıcı gazların depolama ayrımını doğrula.\n• Ateşleme ve ısı kaynaklarını kontrol et.\n• Hortum ve bağlantılarda kaçak kontrolü planla.\n• Acil kapatma ve yangın düzenlemelerini doğrula."
        : "• Review the task-specific risk assessment and required permits.\n• Verify the cylinder label and gas identity; never rely only on colour coding.\n• Inspect the cylinder body, valve and protective cap.\n• Verify cylinder inspection / test status according to site requirements.\n• Provide a suitable cylinder trolley.\n• Keep cylinders upright and secured during use and storage.\n• Select regulators, hoses and connections suitable for the gas service.\n• Keep oxygen equipment free from oil and grease.\n• Verify segregation of oxygen and fuel-gas cylinders.\n• Control ignition and heat sources.\n• Plan leak checks for hoses and connections.\n• Confirm emergency shutdown and firefighting arrangements."
    );

    setMethodSteps([
      {
        id: `gas-1-${Date.now()}`,
        step: isTurkish
          ? "Tüpün gaz cinsini ve etiketini doğrula."
          : "Verify the cylinder gas type and label.",
        hazards: isTurkish
          ? "Yanlış gaz kullanımı veya tanımlanamayan tüp."
          : "Incorrect gas use or unidentified cylinder.",
        controls: isTurkish
          ? "Tüp üzerindeki etiketi ve işaretleri kontrol et. Yalnızca tüp rengine göre gaz tanımlaması yapma."
          : "Check the cylinder label and markings. Do not identify gas solely by cylinder colour.",
        responsible: isTurkish ? "Yetkili Kullanıcı / Süpervizör" : "Authorized User / Supervisor",
      },
      {
        id: `gas-2-${Date.now()}`,
        step: isTurkish
          ? "Tüpün fiziksel durumunu kontrol et."
          : "Inspect the physical condition of the cylinder.",
        hazards: isTurkish
          ? "Valf hasarı, korozyon, darbe veya uygunsuz tüp."
          : "Valve damage, corrosion, impact damage or unsuitable cylinder.",
        controls: isTurkish
          ? "Tüp gövdesi, valf, kapak ve işaretlemeleri kontrol et. Hasarlı veya şüpheli tüpü kullanma."
          : "Inspect the cylinder body, valve, cap and markings. Do not use damaged or suspect cylinders.",
        responsible: isTurkish ? "Yetkili Kullanıcı" : "Authorized User",
      },
      {
        id: `gas-3-${Date.now()}`,
        step: isTurkish
          ? "Tüpü uygun taşıma arabasıyla çalışma alanına taşı."
          : "Transport the cylinder using a suitable trolley.",
        hazards: isTurkish
          ? "Tüp düşmesi, devrilmesi, ezilme veya valf kırılması."
          : "Cylinder drop, overturning, crushing or valve breakage.",
        controls: isTurkish
          ? "Valf koruma kapağını tak, tüpü arabaya sabitle ve tüpü sürükleme, yuvarlama veya valfinden kaldırma."
          : "Fit the valve protection cap, secure the cylinder to the trolley and do not drag, roll or lift it by the valve.",
        responsible: isTurkish ? "Kullanıcı / Depo Personeli" : "User / Warehouse Personnel",
      },
      {
        id: `gas-4-${Date.now()}`,
        step: isTurkish
          ? "Tüpü dik konumda güvenli şekilde sabitle."
          : "Secure the cylinder upright.",
        hazards: isTurkish
          ? "Devrilme, valf hasarı veya kontrolsüz hareket."
          : "Overturning, valve damage or uncontrolled movement.",
        controls: isTurkish
          ? "Tüpü sağlam bir noktaya zincir veya uygun kayışla sabitle. Geçiş ve kaçış yollarını kapatma."
          : "Secure the cylinder to a sound point using a chain or suitable strap. Do not obstruct access or escape routes.",
        responsible: isTurkish ? "Yetkili Kullanıcı" : "Authorized User",
      },
      {
        id: `gas-5-${Date.now()}`,
        step: isTurkish
          ? "Regülatör, hortum ve güvenlik ekipmanını bağla."
          : "Connect the regulator, hose and safety equipment.",
        hazards: isTurkish
          ? "Yanlış regülatör, hasarlı bağlantı, yüksek basınç veya geri tepme."
          : "Incorrect regulator, damaged connection, high pressure or flashback.",
        controls: isTurkish
          ? "Yalnızca gaz tipine uygun ve sağlam ekipman kullan. Gerektiğinde flashback arrestor / non-return valve uygula."
          : "Use only serviceable equipment suitable for the gas. Install flashback arrestors / non-return valves where required.",
        responsible: isTurkish ? "Yetkili Kullanıcı" : "Authorized User",
      },
      {
        id: `gas-6-${Date.now()}`,
        step: isTurkish
          ? "Valfi kontrollü aç ve kaçak kontrolü yap."
          : "Open the valve under control and perform a leak check.",
        hazards: isTurkish
          ? "Ani basınç, gaz kaçağı, yangın veya oksijen zenginleşmesi."
          : "Sudden pressure, gas leakage, fire or oxygen enrichment.",
        controls: isTurkish
          ? "Valfi yavaş aç ve uygun kaçak kontrol yöntemi kullan. Kaçak kontrolünde açık alev kullanma."
          : "Open the valve slowly and use an approved leak-detection method. Never use an open flame for leak checking.",
        responsible: isTurkish ? "Yetkili Kullanıcı" : "Authorized User",
      },
      {
        id: `gas-7-${Date.now()}`,
        step: isTurkish
          ? "Tüpü çalışma boyunca kontrollü kullan."
          : "Use the cylinder under controlled conditions.",
        hazards: isTurkish
          ? "Gaz kaçağı, hortum hasarı, ateşleme veya tüpün ısınması."
          : "Gas leakage, hose damage, ignition or cylinder heating.",
        controls: isTurkish
          ? "Tüpü sabit tut, hortumları fiziksel hasardan koru ve tüpü ısı, kıvılcım ve uygunsuz ateşleme kaynaklarından uzak tut."
          : "Keep the cylinder secured, protect hoses from physical damage and keep the cylinder away from heat, sparks and unsuitable ignition sources.",
        responsible: isTurkish ? "Yetkili Kullanıcı / Süpervizör" : "Authorized User / Supervisor",
      },
      {
        id: `gas-8-${Date.now()}`,
        step: isTurkish
          ? "Çalışmayı tamamla, tüpü kapat ve güvenli depola."
          : "Complete the work, close the cylinder and store it safely.",
        hazards: isTurkish
          ? "Basınçlı hat bırakılması, açık valf veya uygunsuz depolama."
          : "Pressurized line left in service, open valve or incorrect storage.",
        controls: isTurkish
          ? "Tüp valfini kapat, sistem basıncını güvenli şekilde tahliye et, kapağı tak ve tüpü uygun depolama alanına taşı."
          : "Close the cylinder valve, safely relieve system pressure, fit the protective cap and return the cylinder to the designated storage area.",
        responsible: isTurkish ? "Yetkili Kullanıcı" : "Authorized User",
      },
    ]);

    setEmergencyArrangements(
      isTurkish
        ? "Gaz kaçağı, yangın, tüp devrilmesi, valf hasarı, kontrolsüz gaz çıkışı veya diğer acil durumda çalışma derhal durdurulmalıdır. Güvenli ise gaz beslemesi kesilmeli, ateşleme kaynakları uzaklaştırılmalı ve alan izole edilmelidir. Hasarlı veya kaçak yapan tüpe yetkisiz müdahale edilmemeli; personel güvenli alana alınmalı ve saha acil durum prosedürü uygulanmalıdır."
        : "In the event of a gas leak, fire, cylinder overturning, valve damage, uncontrolled gas release or another emergency, work shall stop immediately. Where safe to do so, isolate the gas supply, remove ignition sources and secure the area. Unauthorized personnel shall not interfere with damaged or leaking cylinders; personnel shall move to a safe area and the site emergency procedure shall be implemented."
    );

    setEnvironmentalControls(
      isTurkish
        ? "Gaz tüpleri belirlenmiş, havalandırılmış ve korunan alanlarda depolanmalıdır. Boş ve dolu tüpler saha prosedürüne göre ayrılmalı ve tüpler kontrolsüz şekilde atmosfere boşaltılmamalıdır. Hasarlı tüpler karantinaya alınmalı ve onaylı tedarikçi / atık yönetim sistemi üzerinden yönetilmelidir."
        : "Gas cylinders shall be stored in designated, ventilated and protected areas. Full and empty cylinders shall be segregated according to site procedures and cylinders shall not be intentionally vented uncontrolled to atmosphere. Damaged cylinders shall be quarantined and managed through the approved supplier / waste-management system."
    );

    setReferences(
      isTurkish
        ? "• SERNEM görev bazlı risk değerlendirmesi\n• OSHA 29 CFR 1926 Subpart J – Welding and Cutting\n• OSHA 29 CFR 1926.350 – Gas Welding and Cutting\n• OSHA 29 CFR 1910.253 – Oxygen-Fuel Gas Welding and Cutting, uygulanabildiği ölçüde\n• Proje / saha basınçlı gaz ve sıcak çalışma prosedürleri\n• Gaz tedarikçisi ve ekipman üretici talimatları"
        : "• SERNEM task-specific risk assessment\n• OSHA 29 CFR 1926 Subpart J – Welding and Cutting\n• OSHA 29 CFR 1926.350 – Gas Welding and Cutting\n• OSHA 29 CFR 1910.253 – Oxygen-Fuel Gas Welding and Cutting, where applicable\n• Project / site compressed-gas and hot-work procedures\n• Gas supplier and equipment manufacturer instructions"
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
                SERNEM Method Statement
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

        {/* SERNEM_METHOD_LIBRARY_START */}
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
              <p className="text-3xl font-black text-emerald-300">20</p>
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


            <button
              type="button"
              onClick={loadLiftingTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-amber-500/50 hover:bg-amber-500/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-2xl">
                    🏗️
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "Kaldırma Operasyonları"
                        : "Lifting Operations"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Kaldırma planı, rigging, zemin/outrigger, dışlama alanı, banksman ve 8 iş adımı."
                        : "Lifting plan, rigging, ground/outrigger conditions, exclusion zone, banksman and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-amber-400">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadScaffoldingTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-yellow-500/50 hover:bg-yellow-500/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-2xl">
                    🏗️
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "İskele Kurulum / Söküm"
                        : "Scaffold Erection / Dismantling"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Zemin, platform, korkuluk, tie/ankraj, erişim, etiketleme ve 8 iş adımı."
                        : "Ground, platforms, guardrails, ties/anchors, access, tagging and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-amber-400 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-amber-300">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadExcavationTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-orange-500/50 hover:bg-orange-500/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-2xl">
                    🚧
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish ? "Kazı Çalışmaları" : "Excavation Work"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Yeraltı servisleri, göçük, iksa, erişim, su kontrolü ve 8 iş adımı."
                        : "Underground services, cave-in prevention, shoring, access, water control and 8 work steps."}
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
              onClick={loadElectricalTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-yellow-400/50 hover:bg-yellow-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400/10 text-2xl">
                    ⚡
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish ? "Elektrik Çalışmaları" : "Electrical Work"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "LOTO, gerilim testi, elektrik çarpması, ark flaşı, PPE ve 8 iş adımı."
                        : "LOTO, voltage testing, electric shock, arc flash, PPE and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-yellow-400 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-yellow-300">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadGrindingCuttingTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-red-500/50 hover:bg-red-500/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-2xl">
                    ⚙️
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "Taşlama ve Kesme Çalışmaları"
                        : "Grinding & Cutting Work"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Disk güvenliği, kıvılcım, kickback, yangın, PPE ve 8 iş adımı."
                        : "Disc safety, sparks, kickback, fire, PPE and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-black text-white transition group-hover:bg-red-400">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadPipingTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-sky-500/50 hover:bg-sky-500/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-2xl">
                    🔧
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish ? "Borulama Çalışmaları" : "Piping Works"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Spool taşıma, flange hizalama, destekler, line opening ve 8 iş adımı."
                        : "Spool handling, flange alignment, supports, line opening and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-sky-500 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-sky-400">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadHydrotestTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-blue-400/50 hover:bg-blue-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-400/10 text-2xl">
                    💧
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "Hidrostatik Basınç Testi"
                        : "Hydrostatic Pressure Testing"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Stored energy, test basıncı, manometre, dışlama alanı ve 8 iş adımı."
                        : "Stored energy, test pressure, gauges, exclusion zone and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-blue-400 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-blue-300">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadAirBlowingTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-cyan-400/50 hover:bg-cyan-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-2xl">
                    💨
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish ? "Hava Üfleme" : "Air Blowing"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Basınçlı hava, discharge zone, hose failure, gürültü ve 8 iş adımı."
                        : "Compressed air, discharge zone, hose failure, noise and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-cyan-300 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-cyan-200">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadPaintingCoatingTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-violet-400/50 hover:bg-violet-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-400/10 text-2xl">
                    🎨
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "Boya ve Kaplama Çalışmaları"
                        : "Painting & Coating Works"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "VOC, solvent, yangın, sprey ekipmanı, PPE ve 8 iş adımı."
                        : "VOC, solvents, fire, spray equipment, PPE and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-violet-400 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-violet-300">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadInsulationTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-sky-400/50 hover:bg-sky-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-400/10 text-2xl">
                    🧱
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "İzolasyon Çalışmaları"
                        : "Insulation Works"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Mineral yün, lif/toz, keskin sac, sıcak yüzey, erişim ve 8 iş adımı."
                        : "Mineral wool, fibres/dust, sharp metal, hot surfaces, access and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-sky-300 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-sky-200">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadMobileEquipmentTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-amber-400/50 hover:bg-amber-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-2xl">
                    🚜
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "Ağır / Mobil Ekipman Çalışmaları"
                        : "Heavy & Mobile Equipment Operations"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Kör nokta, geri manevra, devrilme, banksman ve 8 iş adımı."
                        : "Blind spots, reversing, overturning, banksman and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-amber-200">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadLadderUseTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-lime-400/50 hover:bg-lime-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-lime-400/10 text-2xl">
                    🪜
                  </span>
                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish ? "Merdiven Kullanımı" : "Ladder Use"}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Doğru seçim, kontrol, açı, 3 nokta temas ve 8 iş adımı."
                        : "Correct selection, inspection, angle, three-point contact and 8 work steps."}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-xl bg-lime-300 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-lime-200">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadMewpTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-fuchsia-400/50 hover:bg-fuchsia-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-fuchsia-400/10 text-2xl">
                    🏗️
                  </span>
                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish ? "Manlift / MEWP Çalışmaları" : "MEWP Operations"}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Düşme, ezilme, devrilme, rüzgâr, acil indirme ve 8 iş adımı."
                        : "Falls, crushing, overturning, wind, emergency lowering and 8 work steps."}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-xl bg-fuchsia-300 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-fuchsia-200">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadManualHandlingTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-orange-400/50 hover:bg-orange-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-400/10 text-2xl">
                    📦
                  </span>
                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish ? "Elle Taşıma" : "Manual Handling"}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Kaldırma tekniği, aşırı yük, pinch point, ekip kaldırması ve 8 iş adımı."
                        : "Lifting technique, overload, pinch points, team lifting and 8 work steps."}
                    </p>
                  </div>
                </div>
                <span className="shrink-0 rounded-xl bg-orange-300 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-orange-200">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadChemicalHandlingTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-emerald-400/50 hover:bg-emerald-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 text-2xl">
                    🧪
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "Kimyasal Kullanım ve Elleçleme"
                        : "Chemical Handling"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "SDS, temas, inhalasyon, dökülme, depolama ve 8 iş adımı."
                        : "SDS, exposure, inhalation, spills, storage and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-emerald-300 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-emerald-200">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>


            <button
              type="button"
              onClick={loadCompressedGasTemplate}
              className="group w-full rounded-2xl border border-slate-700 bg-slate-950/70 p-5 text-left transition hover:border-rose-400/50 hover:bg-rose-400/[0.07]"
            >
              <div className="flex h-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-400/10 text-2xl">
                    🧯
                  </span>

                  <div>
                    <h3 className="font-black text-white">
                      {isTurkish
                        ? "Basınçlı Gaz Tüpleri"
                        : "Compressed Gas Cylinders"}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {isTurkish
                        ? "Yüksek basınç, valf, regülatör, sızıntı, taşıma, depolama ve 8 iş adımı."
                        : "High pressure, valves, regulators, leaks, transport, storage and 8 work steps."}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded-xl bg-rose-300 px-4 py-2.5 text-sm font-black text-slate-950 transition group-hover:bg-rose-200">
                  {isTurkish ? "Şablonu Yükle" : "Load Template"}
                </span>
              </div>
            </button>



          </div>
        </section>
        {/* SERNEM_METHOD_LIBRARY_END */}

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
