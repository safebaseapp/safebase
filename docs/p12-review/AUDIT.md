# SERNEM Paket 12 — Türkçe denetim ve yönetim raporu

21 Ekim 2026, Europe/Budapest. Issue [#116](https://github.com/safebaseapp/safebase/issues/116) bütünüyle okundu. Tek branch: `codex/sernem-ai-visibility-authority-pack12`. **Manuel Draft PR incelemesine hazır; production yayını NO-GO / onay bekliyor.** AI atfı, trafik veya sıralama garantisi verilmez.

## İzolasyon ve geri dönüş

Güncel remote main/rollback: **`e25c7c11eb6902f4ecefe096fee4a8e1b959bc11`**. Branch doğrudan `origin/main` üzerinden açıldı; P11'den merge/rebase/cherry-pick yapılmadı. Uygulama checkpoint'leri `e23038f` ve `8844a5d`. PR #115 açık Draft olarak bırakıldı; [owner billing freeze](https://github.com/safebaseapp/safebase/pull/115#issuecomment-6313077143) okundu ve değiştirilmedi.

**Koruma PASS:** billing/Lemon/checkout/Premium/trial/webhook/credential/auth/download authorization/admin/private API/Supabase/migration/RLS/SIM/XP dosyalarında değişiklik **yok**; P11 dosya kesişimi **yok**. [Tam changed-files ve koruma kanıtı](results/protection.json). Mevcut risk-matrix activity event'i korunuyor; yeni bağımlılık yok. Prod env veya sağlayıcı ayarı değiştirilmedi, ödeme/hesap testi yok. Main'e yazma/merge, manuel production deploy, anahtar yayımı, arama bildirimi veya sosyal yayın yapılmadı. Branch push/PR için mevcut GitHub/Vercel otomasyonu kapatılmadı/değiştirilmedi; bu yayın izni veya canlı test değildir. Preview'nun gerçek ortamına müşteri/ödeme isteği gönderilmedi.

Geri alma: bu Draft PR'ı merge etmeyin; main rollback noktasında kalır. Mevcut P11 branch'i resetlenmedi/silinmedi. P11'den kalan yalnız yerel runtime artifact'ları kaybolmadan `/tmp/sernem-p11-runtime-retained-20261021` altında korundu, P12'ye commit edilmedi. Normal prebuild'in yeniden ürettiği 280 PDF geri alındı; onaylı dosyalara incidental artifact değişikliği eklenmedi.

## Önce çalışanlar / doğrulanan eksikler

[Başlangıç envanteri](INITIAL.md), [önce](results/seo-before.json), [sonra](results/seo-after.json).

| Alan | Durum / bulgu | Yapılan veya ertelenen |
|---|---|---|
| Ortak `*` + `OAI-SearchBot` robots grubu | VERIFIED IMPLEMENTED; özel yolların slash'lı çocukları korunuyordu | Aynı grup ve public Allow korundu; dedicated bot override veya GPTBot-specific izin eklenmedi. Training politikası değiştirilmedi. |
| Robots exact private URL | DEFECTIVE: `/tr/login` gibi slash'sız yollar ve auth/register eksik; baseline bot matrisi 45 private-path FAIL | Prefix disallow'lar slash'sız hale getirildi, auth/register eklendi. Beş bot için aynı özel sınır korundu. Robots erişim güvenliği değildir; auth aynen kaldı. |
| Bilingual sitemap/canonical | VERIFIED IMPLEMENTED: 824 URL, TR/EN ve x-default, sahte lastmod yok | Mevcut 824 kayıt korundu; sadece 15 mevcut public poster × 2 dil = 30 kayıt. Toplam **854**, kopya yok. |
| Public poster metadata | MISSING: detail sitemap yok; başlık genel parent'tan geliyordu | Salt SEO layout + mevcut poster başlık/sloganlarını kullanan registry. Rendering, branding, PDF/print/export ve access dosyaları değiştirilmedi. 30 actual HTTP detail kontrolü PASS. |
| Risk library / risk matrix x-default | DEFECTIVE: sayfa metadata'sı parent map'i override edip x-default'ı kaybediyordu | Yalnız bu iki public sayfanın metadata'sına İngilizce default eklendi. |
| Organization / WebSite | VERIFIED IMPLEMENTED | Root layout değişmedi; org/site kimliği korundu. |
| TechArticle / BreadcrumbList | VERIFIED IMPLEMENTED on 86 generated guides, **MISSING on 14 dedicated core guide routes** | JSON-LD ortak public GuideTemplate'e taşındı; duplicate dynamic script kaldırıldı. Core metadata için public layout fallback eklendi. 100 mevcut rehber × 2 dil şema testinde PASS; yeni toplu sayfa yok. |
| Citation/source markup | Eksik görünür-ref eşleşmesi | Var olan görünür referanslar citation'a aktarıldı; bilinen OSHA provision/subpart URL resolver'ı tekleştirildi. Bilinmeyen kaynaklara uydurma URL verilmedi. |
| Public calculator schema | MISSING | Mevcut risk matrix için WebApplication; rating, review, sertifika, ücret veya sahte author yok. Calculator behavior/event korundu. SIM dosyasına şema için dahi dokunulmadı. |
| FAQPage / nonstandard schema | NOT RECOMMENDED | Görünür cevap bileşeni zaten var. Google rich-result uygunluğu veya sıralama iddiası yok; MedicalCondition/OccupationalHealth/SafetyProcedure eklenmedi. |
| llms.txt / answer panels | VERIFIED IMPLEMENTED | Mevcut içerik korundu; yalnız çalışan public poster ve temel rehber/HIRARC yolları eklendi. llms.txt ranking mekanizması olarak sunulmadı. |
| Bing doğrulaması / IndexNow | NOT TESTABLE account state; code integration MISSING | DNS/account kanıtı yok. Disabled-by-default, offline-first sahip aracı; gerçek key/submission yok. [IndexNow kapsamı](INDEXNOW.md). |
| Live crawl / CDN / index / AI mention | BLOCKED / NOT TESTED | Proxy CONNECT 403; uygulama 403 sonucu değil. Canlı sitemap/robots/CDN protection/index/AI citation hakkında sonuç üretilmedi. |

SIM full route'u sitemap'ten körlemesine silinmedi: kaynak ve yerel HTML'de public tanıtım/DEMO bağlantısı var, gated oyun ayrı koşullu render ediliyor. Public tanıtım ≠ Premium göreve erişim. Private gate/scene değiştirilmedi. 100 risk activity ve 900 item ayrı 1000 URL yapılmadı.

## HSE içerik doğruluğu ve sınırlar

Öncelikli 10 alan incelendi: Working at Height, Scaffolding, Confined Space/attendant, Hot Work, LOTO, Lifting/crane, Electrical, Excavation, Risk Assessment/HIRARC ve PPE. Mevcut açıklamalar/tehlike/kontrol/referanslar yeniden üretilmedi. Şunlar eklendi/düzeltildi:

- 9 temel rehber ve public HIRARC kütüphanesine **kısa, HTML-readable kaynak kapsamı / saha yorumu**. Örnek: gözcü rolünün plansız kurtarmaya izin olmadığı; stop düğmesinin izolasyon olmadığı; sapan işaretinin tüm kaldırmayı onaylamadığı; matrisin mevzuata uygunluk veya kaza tahmini kanıtı olmadığı. Mevcut kontrol ilkelerinin sınırlı açıklaması; yeni izin prosedürü/ürün değil.
- Genel `OSHA` rozetinin bağımsız rehber rozetiyle değiştirilmesi; ABD inşaat/genel endüstri ve yerel mevzuat kapsamının ayırılması. Kurum onayı izlenimi verilmez.
- Kazı rehberindeki tüm malzeme/ekipmana tek `0.6 m` mesafeyi yeterli gösteren ifade kaldırıldı. Falling/rolling material, equipment surcharge, ground stability ve yetkin kişi değerlendirmesi ayrıldı; mevcut OSHA 1926.651 referansına `(j)(2)` kapsamı açıklandı. Yeni sayısal eşik eklenmedi; bir mesafenin ağır makine konumunu güvenli yapmadığı belirtildi. [Önce/sonra](results/editorial-diff.txt).
- PPE'de EN/EN ISO işareti ile task suitability/declaration/edition/compatibility ayrıldı. Mevcut EN/ISO baskıları canlı katalogla doğrulanamadığından **değiştirilmedi veya güncel diye onaylanmadı**.

Resmî OSHA referans URL yapısı ve mevcut içerikle eşleşmesi yerelde doğrulandı; **canlı OSHA erişimi engelli**. Kaynak metinlerinin güncel erişilebilirliği veya standart baskılarının doğruluğu bu görevde bağımsız sertifikasyon/uzman incelemesi olarak sunulmaz. [Dış erişim sınırları](results/live-limitations.json). Bu nedenle yayın öncesi yetkin insan kaynak/kapsam kontrolü gerekir. Uzun telifli standart metni aktarılmadı. Sahte author/reviewer/credential/dateModified/review date eklenmedi; buradaki tarih kod denetim tarihidir.

## Test sonuçları — gerçek kapsam

| Kontrol | Sonuç | Kanıt / sınır |
|---|---|---|
| `cd app && npx tsc --noEmit` | **PASS** | [log](results/tsc-complete.log) |
| Etkilenen app TS/TSX ESLint | **PASS** | [log](results/eslint-complete.log), hata/warning çıktısı yok; config/rule değişmedi |
| Gerçek `npm run build` | **PASS** | [log](results/build-complete.log); normal prebuild + 140 standard/140 branded PDF QA + download QA, TypeScript/prerender; hiçbir adım atlanmadı |
| Robots/sitemap source QA | **86/86 PASS** | [log](results/seo-complete.log), [matris](results/seo-after.json); başlangıç 70 check'te 47 FAIL (45 exact-private + 2 poster) |
| Guide schema | **200 localized PASS** | [log](results/guide-schema.log); JSON serialize/parse, article/citation/breadcrumb, sahte metadata yok |
| Yerel HTTP | **48 PASS** | [matris](results/http-seo.json): 5 robots UA + 5 public text UA + XML + 30 poster + 6 schema page + llms |
| TR/EN public browser, 360/390/1440 | **76 PASS / 8 FAIL** | [matris](results/public-browser.json), [log](results/public-browser-complete.log). Bingbot UA + JavaScript kapalı, actual server HTML; gerçek Bing crawler testi değil |
| IndexNow | **PASS (mock/offline only)** | [test](results/indexnow-complete.log), [dry run](results/indexnow-dry.log); gerçek submission/ownership/key yayını NOT TESTED |
| Koruma / P11 overlap | **PASS** | [kanıt](results/protection.json), [log](results/protection-complete.log) |
| Google Rich Results / Schema validator | **NOT TESTED** | Ağ engelli. Yerel JSON/schema assertion'ları resmî validator PASS yerine kullanılmadı |
| GSC/Bing verification/canonical selection | **NOT TESTED** | Hesap erişimi yok; source meta yokluğu DNS doğrulaması yapılmadığını kanıtlamaz |
| Gerçek Google/Bing/ChatGPT/Perplexity | **NOT TESTED** | 20 query × 4 servis için UNKNOWN kayıt; gözlenmiş mention/citation yokmuş gibi davranılmadı |
| Production / gerçek hesap/Premium/ödemeler/Supabase | **NOT TESTED; kapsam dışı** | Koruma freeze'i gereği hiçbir müşteri testi veya yazma yapılmadı |

Yerel Next build açıkça sahte Supabase public URL/key ile çalıştırıldı; yalnız `127.0.0.1:54512` read-only protokol fixture'ı, gerçek proje yok. Auth/admin/service-role secret yok, fixture GET/HEAD dışında 405 verir ve dışarı proxy yapmaz. Browser dış ağ trafiği engellenir; gerçek analytics gönderimi yok. Browser'da CSP bypass yapılmadı. Root/locale/auth layout'ları ve proxy değiştirilmedi.

Next 16 streaming metadata nedeniyle default JS-kapalı Chrome gözlemi gerçek bot davranışı sayılmadı; desteklenen HTML-limited `bingbot` UA ile tekrar edildi. Native HTTP'de beş UA için teknik içerik literal HTML'de, canonical link de response'da bulundu. Google'ın JS render'ı veya AI servislerinin parser davranışı gerçek servis erişimi olmadan doğrulanmış sayılmaz. Global htmlLimitedBots override/next config değişikliği yapılmadı. İlk tarayıcı koşusunda ortam/resource/harness sorunu ve eksik x-default bulguları vardı; final sonuç yalnız son build'den taze server 3133'ün kaydıdır.

### Açık kalan 8 mobil FAIL

TR/EN × 360/390 px × iki mevcut sayfa: **poster detail** ve **risk matrix** yatay taşıyor. 1440 px aynı sayfalar PASS. Kaynakta önceden bulunan poster 794/1123px baskı frame'i ve calculator 620px min-width paneli değişmedi; baseline için ayrı gerçek browser build'i yeniden koşulmadı, mevcut kaynak ve git diff korunuyor. Bunlar “düzeltildi” veya PASS sayılmadı. Baskı/export/component tasarımı SEO metadata düzeltmesiyle karıştırılmadı; owner'ın ayrı dar kapsam onayına bırakıldı. [TR poster](evidence/failure-tr-posters-working-at-height-rules.png), [EN matrix](evidence/failure-en-tools-risk-matrix.png). Tüm diğer 76 public kombinasyonun metadata, dil, schema ve görünür HTML kontrolleri PASS.

## Görünürlük, otorite ve veri fizibilitesi

- [20-sorgu CSV](visibility-baseline.csv) / [ölçüm protokolü](MEASUREMENT.md): gerçek baz ölçümü henüz yok; 80 NOT TESTED/UNKNOWN satır, bölge/tarih/atıf/rakip uydurulmadı.
- [Düşük maliyetli bağımsız otorite planı ve açık veri fizibilitesi](AUTHORITY-AND-DATA.md): yayın yok, satın alınan backlink yok, Wikipedia/Wikidata tanıtım maddesi yok. İzin/lisansı temizlenmiş gerçek dataset olmadığından Dataset şeması/CSV ürünü yayımlanmadı.
- İzlenecek ölçüler: doğrulanmış index/canonical/sitemap hataları, sorgu gösterimleri, gerçek AI kaynak URL'si/mention ayrımı, doğal bağımsız referring domains, teknik hata/geri bildirim. Bugünkü NOT TESTED tablosu büyüme hedefiyle karıştırılmaz.

## Son karar / gerekli onaylar

**Manuel inceleme GO; production yayın NO-GO.** İçerik/kamuya açık SEO deltası gözden geçirilebilir ve korunan sistemlerle dosya çakışması yok. Yayından önce: (1) yetkin HSE incelemesiyle resmî kaynak/kapsam teyidi, (2) erişilebilir preview/live crawl ve sitemap/canonical doğrulaması, (3) 8 mobil başarısızlığın owner tarafından değerlendirilmesi, (4) sahibin açık merge/yayın onayı. Billing freeze kaldırılmaz veya P11 otomatik dahil edilmez.

## Tekrar çalıştırma

Repo kökünden `node tools/p12-review/{seo-test,guide-schema-test,indexnow-test,protection-test}.mjs` dosyalarını ayrı çalıştırın. `P12_BASELINE=1 node tools/p12-review/seo-test.mjs` main kaynaklarını git show ile yükler, branch resetlemez. Protection testi P11 dosya listesini `/tmp/p12-p11-files.txt` olarak bekler; yeniden üretmek için `gh pr diff 115 --repo safebaseapp/safebase --name-only > /tmp/p12-p11-files.txt` (salt okunur).

`node tools/p12-review/public-fixture.mjs`; ardından app'i `NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54512 NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=p12-public-fixture` ile normal build/start edin. Test URL'sini `P12_URL` ile verip `http-seo.mjs` ve `public-browser.mjs` çalıştırın. Fake değerler deploy/env'e eklenmez. Build sonrası ilk halinde temiz olan generated `app/public/downloads` farklarını kontrol ederek geri alın; gerçek kullanıcı değişikliği varsa üzerine yazmayın. App source değişince eski server yerine tamamlanmış build'den yeni port kullanın. Runtime artifact'ları ignore edilir, yalnız seçilmiş kanıtlar commit edilir.
