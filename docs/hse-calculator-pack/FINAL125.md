# Paket 125 FINAL — KPI kayıt seçeneği ve ortak hesaplayıcı tasarımı

Çalışma aynı `codex/hse-calculators-hub-kpi-pack` dalında ve **Draft PR #125** üzerindedir. Başlangıç HEAD: `43379928c9b32fa1694d01ad88b4ee3322a999aa`. Uygulama commit'i: `e5a5b2ff02c9058468941dc9cc5611c4c9a7772f`. Sonraki kanıt commit'i yalnız test/rapor dosyalarını içerir.

## KPI kaydı ve taslak: iki ayrı kullanıcı kararı

PR'nin son inceleme yorumu ve main'deki eski `saveToHsePerformance` fonksiyonları incelendi. Önceki pakette kaldırılmış olan TRIR/LTIFR/Severity Rate **isteğe bağlı aylık KPI kaydı** yeniden sağlandı; aynı yol DART için ortak bileşene taşındı. İlk araştırmada aylık toplam kaydı ile tekil olay kaydı ayrımı fazla geniş yorumlanmıştı; mevcut yol doğrulandıktan sonra bu değerlendirme düzeltildi. Güvenli altyapı yok gerekçesiyle kayıt kapatılmadı.

- **Taslak incele:** mevcut `sessionStorage` akışı aynen korunur, ağ yazması yapmaz, kayıt sonrası da ayrı taslak korunur.
- **Aylık KPI sistemine kaydet:** TRIR/LTIFR/Severity sayfalarında mevcut dönem/proje alanlarının yanında; DART sonucunda ve dört göstergenin KPI taslak panelinde bulunur. DART için dönem/proje özellikle kullanıcıdan istenir; güncel dönem tahmin edilip sessizce yazılmaz.
- Önce `getUser` ile mevcut oturum ve kullanıcıya ait tam `user_id + period_month + project_name` kaydı okunur. Boş/geçersiz dönem/proje ve DB'nin tam sayı vaka/gün kolonuna uygun olmayan girdiler reddedilir. Hesaplama formülleri değişmez; kesirli şiddet hesabı hâlâ hesaplanabilir, fakat tam sayı DB gün kolonuna yuvarlanarak yazılmaz.
- **Kontrol et** düğmesi yalnız okur. Eski/yeni gösterge toplamı ve ortak saatler gösterilir. Kullanıcı onay kutusunu seçmeden **Onayla ve kaydet** etkinleşmez. Mevcut kayıt olmasa da açık onay gerekir.
- Yalnız ilgili `recordable_cases` / `lti` / `lost_days` / `dart_cases` alanı ve ortak `worked_hours` değiştirilir. Diğer vaka alanları, leading göstergeler ve tekil kaza/olay kayıtları değiştirilmez. Saat değişikliğinin bütün oranları etkileyeceği görünür şekilde açıklanır.
- Var olan `hse_incident_metrics` tablosu, Supabase client, auth ve RLS yolu kullanılır. Yeni API, tablo, migration, RLS veya auth kuralı yok. Kaydetmeden hemen önce aynı kullanıcı tekrar doğrulanır.
- Mevcut kayıtta id/kullanıcı/dönem/proje + okunan saat/vaka alanları + `updated_at` ile **compare-and-swap** uygulanır. Arada değişiklik varsa sıfır satır güncellenir ve çakışma bildirilir; yeniden inceleme gerekir. Yeni kayıtta mevcut unique constraint çakışması overwrite/upsert yapılmadan hata verir.
- Dönem/proje veya hesap girdisi değişince önceki onay geçersizdir. Bekleyen işlemlerde düğmeler ve tekrar tıklamalar kilitlenir. Başarı yalnız sunucu yazmayı onaylayınca gösterilir; RLS/ağ hatasında başarı iddiası yok.
- Operasyonel beş araç bu kayıt bileşenini almaz; tahmini adam-saat hiçbir zaman kaza oranı saatlerine yazılmaz.

## Dokuz hesaplayıcının görsel kapsamı

Risk Matrix, TRIR, LTIFR, Severity Rate, DART, Noise Exposure, Sling Angle/Tension, Man-Hours, Heat Stress/WBGT.

Ortak `CalculatorExperience` bileşeni ve yalnız bu dokuz rotaya uygulanan CSS module; lacivert/mavi/turkuaz kimlik, araçlara özel simge/model başlığı, güçlü başlık hiyerarşisi ve erişilebilir odak halkaları sağlar. Mevcut üç oran aracının ve Risk Matrix'in özel sonuç/grafik/matrisleri korunur. Beş yeni araçta dengeli giriş/sonuç sütunları, mobilde tek sütun ve ayrı yöntem/kaynak kartı vardır. Gerçek fiziksel büyüklükleri temsil etmeyen yeni “güvenli” gösterge veya uydurma grafik eklenmedi. Görsel premium nitelik ücretli erişim değişikliği anlamına gelmez; bütün mevcut erişim kuralları aynı.

Ortak banner yazdırmada gizlenir; yeni dekorasyon kuralları `@media screen` içindedir. Mevcut jsPDF fonksiyonları değiştirilmedi. Risk/matematik/KPI motorları aynıdır.

## Test kanıtları

- Önceki 51 hesaplama/koruma kontrolü tekrar geçti; eski PDF fonksiyonları byte aynı ve 82 korunan modülün SHA256 değerleri aynı. Tarihsel [unit-results.json](unit-results.json) korunur; yeni kayıt testleri ayrı dosyadadır.
- **49 yeni aylık kayıt testi PASS:** dört gösterge için salt okunur hazırlık, açık insert/update, diğer alanların korunması, eşzamanlı edit/insert, oturum yok/değişti, okuma/yazma hatası, dönem/proje ve DB tamsayı sınırları. [monthly-kpi-results.json](final125/monthly-kpi-results.json). **Yalnız bellek içi sentetik istemci; gerçek Supabase/RLS testi değildir.**
- **132 mevcut tarayıcı kontrolü PASS:** değişen dokuz araç TR/EN 320/390/768/1440/1920, örnek hesaplar, geçersiz girdiler, menü/SEO ve taslak akışları. [browser-results.json](final125/browser-results.json).
- **36 yeni arayüz/rapor ve ayrı taslak/kayıt testi PASS:** [final-results.json](final125/final-results.json). Gerçek bileşen ayrı DOM'da sentetik istemciyle monte edilir; guest kayıt reddi, onaysız yazma olmaması, açık onayla tek yazma, dönem/proje değişince onayın iptali ve taslağın korunması kontrol edilir. Uygulama auth'u aşılmaz, gerçek müşteri kimliği kullanılmaz.
- Değişen **9 TypeScript/TSX dosyasında ESLint: 0 hata, 2 eski Severity Rate unused uyarısı**. Önceki paket kapsamındaki incidents/Simops hatalarının düzeltildiği iddia edilmez; bu dosyalara dokunulmadı.
- TypeScript ve normal production build (prebuild PDF polish, PDF QA ve download QA dahil): ayrıntılı son durum `final125/verification.json`. Build'in ürettiği 280 eski indirme PDF değişikliği geri alınır, PR'a eklenmez.
- **18 PDF/yazdırma kontrolü PASS:** 10 yeni araç çıktısı, 6 mevcut TRIR/LTIFR/Risk Matrix indirmesi ve 2 Severity tarayıcı çıktısı; hepsi TR/EN A4, metin sınırları içinde. Severity mevcut sayfası 4 sayfa, Adam-Saat 2 sayfadır; tek sayfa olduğu iddia edilmez. PDF metin/boyut/taşma sonuçları aynı verification dosyasında. Örnekler: [EN DART](final125/sample-en-dart.pdf), [TR Risk Matrix](final125/sample-tr-risk-matrix.pdf). İlk ek denemede `.next` yeniden üretilirken çalışan sunucu kullanıldığı için kanıt kabul edilmedi. Sonraki Risk Matrix testinde simgeli düğmenin tam erişilebilir adını eşleştirmeyen test seçicisi düzeltildi; PDF motoru değiştirilmedi. Son 36 test tamamlanmış build üzerinde ayrı 4192 sunucusunda geçti.

### Önce / sonra

“Önce” mevcut PR'nin `43379928` build'inden gerçek ekran görüntüsüdür; “sonra” bu final uygulamasıdır. Aynı locale, genişlik ve boş girdi durumu kullanılır.

| Araç | TR 390 önce / sonra | EN 1440 önce / sonra |
|---|---|---|
| DART | [Önce](final125/before-tr-dart.png) / [Sonra](final125/after-tr-dart.png) | [Before](final125/before-en-dart.png) / [After](final125/after-en-dart.png) |
| TRIR | [Önce](final125/before-tr-trir.png) / [Sonra](final125/after-tr-trir.png) | [Before](final125/before-en-trir.png) / [After](final125/after-en-trir.png) |
| Risk Matrix | [Önce](final125/before-tr-risk-matrix.png) / [Sonra](final125/after-tr-risk-matrix.png) | [Before](final125/before-en-risk-matrix.png) / [After](final125/after-en-risk-matrix.png) |

## Tekrar çalıştırma

```sh
node tools/hse-calculator-pack/monthly-kpi-test.mjs
HSE_HUB_URL=http://127.0.0.1:4192 node tools/hse-calculator-pack/final125.mjs
HSE_HUB_URL=http://127.0.0.1:4192 HSE_HUB_EVIDENCE_DIR=docs/hse-calculator-pack/final125 node tools/hse-calculator-pack/browser.mjs
npm --prefix app run build
```

Build bittikten sonra test sunucusunu başlatın; `.next` aynı anda yeniden üretilirken tarayıcı testleri çalıştırılmamalıdır. Tarayıcılar yalnız localhost GET isteklerine izin verir; üretim Supabase/ödeme istekleri engellenir. Kayıt fixture'ları ağa çıkmadan çalışır.

## Kalan engeller ve karar

**GO: Draft PR incelemesi. NO-GO: production yayını.** Gerçek Supabase oturumu, RLS'nin bu update+select/insert yoluna etkisi ve gerçek kayıt/rapor teslimi sandbox olmadan doğrulanmadı. Live müşteriyle test yapılmadı. Ayrı izole Supabase sandbox'ı, iki sentetik kullanıcı ve proje/dönem seed kayıtlarıyla owner/other-user, insert/update, stale-write ve rapora yansıma testleri gerekir; canlı schema/RLS/konfigürasyona dokunulmaz. Özellikle `.update(...).select('id')` sonucunun sandbox RLS ile uyumu doğrulanmalıdır; reddedilirse güvenli biçimde hata verir.

Önceki resmi referans revizyonu/NIOSH kapsam incelemesi ve gerçek cihaz/Preview onayı açık kalır. Formüller bu pakette değişmediği için kaynak erişim denemeleri veya tamamlanmış üyelik/ödeme testleri tekrarlanmadı. Main, production, Auth, Premium/Lemon, schema/RLS, SIM5/XP değişmedi; yeni PR/merge/manuel deploy yok.

## Preview ve SHA

Uygulama SHA `e5a5b2ff02c9058468941dc9cc5611c4c9a7772f`, GitHub deployment `7247305435`, Vercel **READY** (API success).

- [TR Preview](https://safebase-7ayssfc76-safebaseapps-projects.vercel.app/tr/tools#calculators)
- [EN Preview](https://safebase-7ayssfc76-safebaseapps-projects.vercel.app/en/tools#calculators)

Bu değişmez URL uygulama commit'ine aittir; PR HEAD'deki sonraki test/rapor commit'i ayrı belirtilir. READY dağıtım durumu, uzaktan tarayıcı E2E geçti anlamına gelmez. Önceki ortam proxy engeli nedeniyle uzaktan E2E için başarılı kanıt yok; bu final paketinde güncel Preview kullanıcı incelemesine bırakılır.

## Bu final aşamasında değişen uygulama dosyaları

- `app/app/[locale]/tools/_shared/CalculatorExperience.tsx` ve `.module.css`
- `app/app/[locale]/tools/_shared/MonthlyKpiSave.tsx` ve `monthlyKpi.ts`
- `app/app/[locale]/tools/_shared/CalculatorHandoff.tsx`, `NewCalculator.tsx`
- `app/app/[locale]/tools/layout.tsx`
- `app/app/tools/trir/page.tsx`, `ltifr/page.tsx`, `severity-rate/page.tsx`

Toplam 10 uygulama dosyası. Diğer değişiklikler QA ve kanıtlardır. Eski hesaplama/PDF motorları veya incident formu yeniden yazılmadı.
