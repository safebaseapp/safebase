import type { SafetyGuide } from "../../components/GuideTemplate";

export const ppeGuide: SafetyGuide = {
  slug: "ppe",

  category: {
    en: "Hazard Control",
    tr: "Tehlike Kontrolü",
  },

  title: {
    en: "Personal Protective Equipment",
    tr: "Kişisel Koruyucu Donanım",
  },

  description: {
    en: "Practical guidance for selecting, inspecting, using and maintaining personal protective equipment for workplace hazards.",
    tr: "İş yeri tehlikelerine uygun kişisel koruyucu donanımın seçimi, kontrolü, kullanımı ve bakımı için pratik rehber.",
  },

  overview: {
    en: "Personal Protective Equipment is the final layer of protection after hazards have been eliminated, substituted or controlled through engineering and administrative measures. PPE must be selected according to the hazard, fit the user correctly and remain in serviceable condition.",
    tr: "Kişisel Koruyucu Donanım, tehlikeler ortadan kaldırıldıktan, ikame edildikten veya mühendislik ve idari kontrollerle azaltıldıktan sonra kullanılan son koruma katmanıdır. KKD, tehlikeye uygun seçilmeli, kullanıcıya doğru oturmalı ve kullanılabilir durumda tutulmalıdır.",
  },

  readTime: 9,

  riskLevel: {
    en: "Essential Control",
    tr: "Temel Kontrol",
  },

  standard: "OSHA",

  hazards: {
    en: [
      "Eye and face injuries",
      "Head injuries from impact or falling objects",
      "Hearing damage from excessive noise",
      "Hand injuries from cuts, chemicals or heat",
      "Foot injuries from crushing or puncture hazards",
      "Respiratory exposure to dust, fumes, vapours or gases",
      "Skin exposure to chemicals or hot materials",
      "Incorrect PPE selection or poor fit",
    ],
    tr: [
      "Göz ve yüz yaralanmaları",
      "Darbe veya düşen cisimlerden kaynaklanan baş yaralanmaları",
      "Aşırı gürültü nedeniyle işitme kaybı",
      "Kesilme, kimyasal veya ısı kaynaklı el yaralanmaları",
      "Ezilme veya delinme tehlikesinden kaynaklanan ayak yaralanmaları",
      "Toz, duman, buhar veya gazlara solunum yoluyla maruziyet",
      "Kimyasallara veya sıcak malzemelere cilt maruziyeti",
      "Yanlış KKD seçimi veya uygun olmayan beden",
    ],
  },

  requiredPPE: {
    en: [
      "Safety helmet where head hazards exist",
      "Safety glasses or goggles",
      "Face shield for splash, impact or heat hazards",
      "Task-specific protective gloves",
      "Safety footwear",
      "Hearing protection where exposure limits may be exceeded",
      "Protective clothing suitable for the hazard",
      "Respiratory protection where required by assessment",
    ],
    tr: [
      "Baş tehlikesi bulunan alanlarda baret",
      "Güvenlik gözlüğü veya kapalı tip gözlük",
      "Sıçrama, darbe veya ısı tehlikesinde yüz siperi",
      "İşe uygun koruyucu eldiven",
      "İş ayakkabısı",
      "Maruziyet sınırlarının aşılabileceği yerlerde kulak koruyucu",
      "Tehlikeye uygun koruyucu kıyafet",
      "Değerlendirmede gerekli görülen solunum koruyucu",
    ],
  },

  controls: {
    en: [
      "Complete a hazard assessment before selecting PPE.",
      "Use engineering and administrative controls before relying on PPE.",
      "Select equipment suitable for the specific hazard and exposure level.",
      "Ensure PPE fits the worker correctly and does not create additional hazards.",
      "Inspect PPE before each use for damage, contamination or wear.",
      "Train workers on correct use, limitations, maintenance and storage.",
      "Replace damaged, expired or contaminated PPE immediately.",
      "Prevent incompatible PPE combinations from reducing protection.",
      "Maintain hygiene and avoid sharing personal equipment where contamination may occur.",
      "Review PPE requirements whenever the task or conditions change.",
    ],
    tr: [
      "KKD seçmeden önce tehlike değerlendirmesini tamamlayın.",
      "KKD'ye güvenmeden önce mühendislik ve idari kontrolleri uygulayın.",
      "Belirli tehlikeye ve maruziyet seviyesine uygun ekipman seçin.",
      "KKD'nin çalışana doğru oturduğunu ve ek tehlike oluşturmadığını doğrulayın.",
      "Her kullanımdan önce hasar, kirlenme ve aşınma kontrolü yapın.",
      "Çalışanları doğru kullanım, sınırlamalar, bakım ve depolama konusunda eğitin.",
      "Hasarlı, süresi geçmiş veya kirlenmiş KKD'yi hemen değiştirin.",
      "Uyumsuz KKD kombinasyonlarının korumayı azaltmasını önleyin.",
      "Hijyeni sağlayın ve kirlenme riski bulunan kişisel ekipmanları ortak kullanmayın.",
      "İş veya koşullar değiştiğinde KKD gereksinimlerini yeniden değerlendirin.",
    ],
  },

  commonMistakes: {
    en: [
      "Treating PPE as the first and only control",
      "Using safety glasses when sealed goggles are required",
      "Wearing damaged helmets or scratched eye protection",
      "Using the wrong glove for the chemical or task",
      "Wearing loose or poorly fitted respiratory protection",
      "Using a face shield without primary eye protection",
      "Failing to replace contaminated PPE",
      "Combining equipment that interferes with fit or protection",
    ],
    tr: [
      "KKD'yi ilk ve tek kontrol yöntemi olarak görmek",
      "Kapalı gözlük gerekirken güvenlik gözlüğü kullanmak",
      "Hasarlı baret veya çizilmiş göz koruyucu kullanmak",
      "Kimyasala veya işe uygun olmayan eldiven seçmek",
      "Gevşek veya yüze oturmayan solunum koruyucu kullanmak",
      "Birincil göz koruması olmadan yalnızca yüz siperi kullanmak",
      "Kirlenmiş KKD'yi değiştirmemek",
      "Birbirinin uyumunu veya korumasını bozan ekipmanları birlikte kullanmak",
    ],
  },

  checklist: {
    title: {
      en: "Pre-use Checklist",
      tr: "Kullanım Öncesi Kontrol Listesi",
    },

    en: [
      "The task hazards have been assessed",
      "Required PPE has been clearly identified",
      "The equipment is the correct type and rating",
      "The size and fit are suitable for the user",
      "The PPE has no visible damage or contamination",
      "Compatibility with other PPE has been checked",
      "The user understands correct use and limitations",
      "Cleaning and storage arrangements are available",
      "Replacement equipment is available where needed",
      "Respiratory equipment requirements have been verified where applicable",
    ],

    tr: [
      "İş tehlikeleri değerlendirildi",
      "Gerekli KKD açıkça belirlendi",
      "Ekipman doğru tip ve koruma sınıfında",
      "Beden ve uyum kullanıcı için uygun",
      "KKD'de görünür hasar veya kirlenme yok",
      "Diğer KKD'lerle uyumu kontrol edildi",
      "Kullanıcı doğru kullanım ve sınırlamaları biliyor",
      "Temizlik ve depolama düzeni mevcut",
      "Gerekli durumlarda yedek ekipman hazır",
      "Uygulanabilir durumlarda solunum koruması gereklilikleri doğrulandı",
    ],
  },

  emergencySection: {
    title: {
      en: "PPE Failure or Exposure",
      tr: "KKD Arızası veya Maruziyet",
    },

    content: {
      en: "Stop the task immediately if PPE fails, becomes damaged, contaminated or unsuitable for changing conditions. Leave the hazard area safely, obtain replacement equipment and report any suspected exposure or injury for assessment.",
      tr: "KKD arızalanır, hasar görür, kirlenir veya değişen koşullara uygun olmaktan çıkarsa işi derhal durdurun. Tehlikeli alandan güvenli şekilde ayrılın, uygun yedek ekipman alın ve şüpheli maruziyet veya yaralanmayı değerlendirme için bildirin.",
    },
  },

  references: [
    "OSHA 1910.132",
    "OSHA 1910.133",
    "OSHA 1910.134",
    "OSHA 1910.135",
    "OSHA 1910.136",
    "OSHA 1910.138",
  ],

  relatedGuides: [
    {
      slug: "hot-work",
      icon: "🔥",
      title: {
        en: "Hot Work Safety",
        tr: "Sıcak Çalışma Güvenliği",
      },
    },
    {
      slug: "working-at-height",
      icon: "🪜",
      title: {
        en: "Working at Height",
        tr: "Yüksekte Çalışma",
      },
    },
    {
      slug: "grinding",
      icon: "⚙️",
      title: {
        en: "Grinding Safety",
        tr: "Taşlama Güvenliği",
      },
    },
  ],

  aiText: {
    en: "Ask SafeBase AI a personal protective equipment question and receive practical guidance based on the knowledge base.",
    tr: "Kişisel koruyucu donanım konusunda SafeBase AI'a soru sor ve bilgi tabanına dayalı pratik rehberlik al.",
  },
};
