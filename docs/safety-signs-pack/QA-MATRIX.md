# Safety Signs — QA matrisi

Yerel testler 29 Ekim 2026; teslim kontrolü 30 Ekim 2026. PASS yalnız belirtilen yerel kapsama aittir.

| Kontrol | Sonuç | Kanıt / sınır |
|---|---|---|
| 36 mevcut slug ve sembol benzersizliği | PASS | evidence/catalog-audit.json; veri değişikliği yalnız P004 TR/EN anlam düzeltmesi |
| Sembol geometrileri ve korunan dosyalar | PASS | 36 SVG main ile aynı SHA; 547 korunan kaynak aynı; API ve Premium resolver aynı |
| 24 yeni işaret / 60 hedefi | BLOCKED | CANDIDATES.json; sıfır yeni işaret yayımlandı. ISO/Commons resmi kaynak ve tekil sanat eseri lisansı doğrulanamadı |
| 72 işarete/dile özel QR | PASS | evidence/qr-assets.json, gerçek ReportLab kodlama + Zbar çözme |
| 72 TR/EN detay HTTP200 + metadata/asset/related | PASS | evidence/browser.json; yerel production-mode build |
| Geçersiz slug 404 | PASS | TR/EN, 2 kontrol |
| Arama/kategori/klavye | PASS | TR/EN; ISO dosya kodu araması, boş sonuç ve altı kategori |
| Mobil/masaüstü | PASS | 320/360/390/768/1440 px × TR/EN × kütüphane/uzun başlık; taşma, başlık sınırı, ayrı footer |
| Toplam browser matrisi | PASS | 98 kontrol; 72 route + 2 invalid + 2 filtre + 20 responsive + sitemap + browser errors |
| Sitemap/canonical/hreflang | PASS | Mevcut 866 URL ve 72 işaret URL; sitemap dosyası değişmedi, phantom aday sayfası yok |
| Gerçek A4/A3 PDF ve PNG üretimi | PASS | 432 dosya = 36 × TR/EN × standard/clean × 3; gerçek Buttons + jsPDF, auth/aktivite yalnız fixture |
| PDF sayfa sayısı/boyut, PNG piksel | PASS | 288 PDF tek sayfa, A4/A3; 144 PNG 2480×3508; evidence/artifacts.json |
| Dosyadan QR okuma | PASS | Her PDF tam sayfa 100/170 DPI, PNG native; toplam 720 kontrol, standartta doğru URL, clean'de sıfır QR |
| Tüm çıktı başlık/font sınırları | PASS | 144 canvas yerleşimi; A4 eşdeğeri en küçük font 8,64 pt; başlık sınır dışına taşmıyor |
| Çift tıklama ve aktivite | PASS | Her çıktı için iki senkron tıklamada tek dosya/tek bellek aktivitesi; mevcut event şeması korundu |
| Anonymous, bozuk SVG/QR, suspended fixture | PASS (dar kapsam) | 8 negatif browser testi. Anonim login + exact return; eksik varlıkta sıfır dosya/kayıt; suspended clean reddedilir, standart mevcut politika gereği açık |
| Gerçek API sentetik profil matrisi | 6 PASS / 1 FAIL | evidence/access-audit.json. Expired + stale active premium profile clean erişim alıyor: SECURITY BLOCKER. API değiştirilmedi |
| TypeScript | PASS | npx tsc --noEmit, fixture build TypeScript aşaması da geçti |
| İlgili ESLint | PASS | 0 hata / 2 mevcut img uyarısı; evidence/eslint.json |
| Normal npm run build | BLOCKED / FAIL | Google Fonts Geist/Geist Mono erişimi. İzinli tekrar da başarısız. Son tekrar komutu çalışmadan iptal oldu; PASS değildir |
| Yerel üretim modu Webpack/font fixture build | PASS | evidence/local-font-fixture-build.log. Normal build ile eşdeğer kabul edilmez; uygulama/env/deployment ayarı değiştirilmedi |
| Premium gerçek ödeme/hesap/Storage E2E | NOT TESTED | Canlı veri kullanılmadı; auth, billing, RLS değişmedi |
| Telefonla fiziksel QR/yazıcı/renk ölçümü | NOT TESTED | Bağımsız dosya çözme mevcut; fiziksel cihaz başarısı iddia edilmez |
| Safari/Firefox/gerçek mobil cihaz/screen reader | NOT TESTED | Chromium viewport emülasyonu kullanıldı |
| Vercel Preview / uzak QR hedefleri | NOT VERIFIED | Yerel hedefler 200; uzak/production doğrulaması bunun yerine geçmez. Teslim bölümü güncel durumu içerir |

## Yakalanan ve düzeltilen sorunlar

- İlk related testi tek yangın işaretinde boş liste yakaladı: acil durum levhaları fallback'i eklendi; son 98 kontrol geçti. İlk kanıt browser-first-attempt.json.
- İlk 432 dosya taramasında 24 dosya 100 DPI QR çözmede başarısızdı. QR ayrı footer içinde 320→440 px büyütüldü; tüm standart çıktılar tekrar üretildi; son 432 dosya / 720 kontrol geçti. İlk sonuç artifacts-before-qr-enlargement.json.
- İlk negatif test, daha önce çözülmüş QR'ın bellek önbelleğini hatalı biçimde 404 sanıyordu. Yeni izole context'te QR ilk yüklemeden engellendi; 8 gerçek negatif kontrol geçti. İlk dosya üretim kanıtı exports-first-attempt.json, son tam üretim exports.json.
- Test sunucusuna sandbox port engeli nedeniyle ilk bağlanılamadı. Sunucu izinli loopback portta başlatılıp aynı matris yeniden çalıştırıldı; bu ortam hatası ürün PASS'i sayılmadı.

## Tekrar çalıştırma

App bağımlılıkları ve tools/sim5-review/package.json test bağımlılıkları kurulu olmalıdır. Python tarafında ReportLab/Pillow (QR üretimi), PyMuPDF/Pillow/libzbar (artifact QA) gerekir. Browser araçları Chromium kullanır. Gerçek Supabase/GA4 bağlantısı açılmadan yerel fixture çalıştırılmalıdır.

- node tools/safety-signs-pack/catalog-audit.mjs
- node tools/safety-signs-pack/access-audit.mjs (beklenen expired güvenlik FAIL'i nedeniyle nonzero)
- BASE=http://127.0.0.1:4251 node tools/safety-signs-pack/browser.mjs
- BASE=http://127.0.0.1:4251 node tools/safety-signs-pack/exports.mjs
- BASE=http://127.0.0.1:4251 node tools/safety-signs-pack/negative.mjs
- BASE=http://127.0.0.1:4251 node tools/safety-signs-pack/layout.mjs
- python3 tools/safety-signs-pack/artifacts.py

Yüzlerce gerçek test dosyası /tmp/signs-exports altında üretildi; her dosyanın SHA'sı artifacts.json içinde, seçilmiş gerçek PDF renderları ve contact sheet'ler evidence/ altında. Ham PDF/PNG dosyalarının tamamı git'e eklenmedi.
