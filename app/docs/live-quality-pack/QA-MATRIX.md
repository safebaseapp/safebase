# Issue #127 — QA Matrisi / 28 Ekim 2026

Durum sözlüğü: **KODDA UYGULANDI** = değişiklik yazıldı, canlı doğrulanmadı; **NOT TESTED** = bu turda çalıştırılmadı; **BLOCKED** = yetkili test ortamı veya erişim eksik; **PASS** yalnız bu turda gözlenen sonuç.

| ID | Kontrol | Kapsam | Durum | Kanıt / sınır |
|---|---|---|---|---|
| P-01 | Poster kütüphanesi A4/A3 doğrudan indirme izlenimi vermiyor | TR+EN | KODDA UYGULANDI | `PosterLibraryClient.tsx` önizleme düğmeleri |
| P-02 | Yazdır/PDF'ye kaydetme yönlendirmesi | TR+EN | KODDA UYGULANDI | `PosterFormatToolbar.tsx` yönerge |
| P-03 | Font/logo/görsel beklenmesi ve boş PDF koruması | TR+EN | KODDA UYGULANDI | `waitForPosterAssets`, naturalWidth; gerçek çıktı NOT TESTED |
| P-04 | Anonim → login → geri dönüş | TR+EN | NOT TESTED | `require-print-auth.ts` korundu |
| P-05 | Free standart PDF akışı | TR+EN | NOT TESTED | Browser + oturum gerekli |
| P-06 | Premium logolu PDF | TR+EN | BLOCKED | Signed URL/storage ve gerçek logo testleri gerekli |
| P-07 | Expired/suspended Premium fail-closed | TR+EN | BLOCKED | Profile+entitlement/RLS doğrulaması olmadan PASS değil |
| P-08 | A4/A3 baskı ölçüleri ve QR dekodlama | 15×2×2 | NOT TESTED | #126 önceki sonuçları bu turun testi değil |
| T-01 | Poster kartlarında yerel metinler | TR+EN | KODDA UYGULANDI | A4/A3, açıklamalar, PDF yardım |
| T-02 | Tüm navigasyon ve ürün sayfaları TR/EN | TR+EN | NOT TESTED | Sınırlı dosyalara müdahale |
| S-01 | Poster, Downloads, Toolbox metadata | TR+EN | KODDA UYGULANDI | title, description, OG, alternate |
| S-02 | Checklists, Signs, Labs, Upgrade metadata | TR+EN | KODDA UYGULANDI | title, description, OG, alternate |
| S-03 | Login/register noindex | TR+EN | PASS (HTTP SSR) | `robots.index=false, follow=false` |
| S-04 | 866 sitemap rotası, robots, llms | TR+EN | PASS (HTTP) | 866 benzersiz URL; 30 poster, 48 checklist, 24 calculator; robots/llms 200 |
| S-05 | Gerçek lastmod tarihleri | TR+EN | NOT TESTED | Kanıtsız tarih eklenmedi |
| F-01 | Downloads ilk DOM kart sayısı | TR+EN | KODDA UYGULANDI | 20 kart, göster-daha-fazla |
| F-02 | Filtre ve arama ile tüm kaynaklar bulunur | TR+EN | NOT TESTED | Kodda filtre tüm veri kümesini kapsıyor |
| F-03 | Lighthouse / gerçek Web Vitals | Mobil+desktop | NOT TESTED | Güncel baseline yok |
| F-04 | WCAG klavye, screen reader, responsive | 320–1440 | NOT TESTED | İlgili poster kontrollerine aria ekleri |
| A-01 | Print işlemi 'downloaded' olarak sayılmıyor | TR+EN | KODDA UYGULANDI | Yanlış DB event kaldırıldı |
| A-02 | Print niyet olayı hassas veri taşımıyor | TR+EN | KODDA UYGULANDI | `poster_print_requested`: locale/size/mode |
| A-03 | GA4 canlı olay teslimi | TR+EN | NOT TESTED | Doğrulanmış gtag delivery yok |
| H-01 | HSE güncel standart ve yerel uygunluk | Seçilmiş örnekler | NOT TESTED | Yeni teknik onay iddiası yok |
| Q-01 | Statik kaynak regresyon scripti | Repo | PASS (Vercel prebuild) | `npm run qa:live-quality`, prebuild zinciri |
| Q-02 | Normal build, tsc, ESLint | Repo | KISMİ PASS | Vercel Next.js + TypeScript PASS; bağımsız global ESLint NOT TESTED |
| Q-03 | En son SHA Preview READY ve smoke | Repo | KISMİ PASS | 1192fcaa Preview READY; son docs commit için ayrı READY gerekli; tarayıcı E2E NOT TESTED |
| P-09 | 30 poster TR+EN URL ve canonical | 30 sayfa | PASS (HTTP SSR) | 30/30 HTTP 200; 30/30 print-area + canonical, gerçek baskı NOT TESTED |
| P-10 | Anonim şirket logosu ve PDF endpoint | 1 temsilî TR örneği | PASS (anonim SSR) | `brand=1` logo=false; API login HTML; expired Premium NOT TESTED |
| F-05 | Checklist SSR tam doküman payload'ını önleme | TR+EN | PASS (HTTP SSR) | TR 712.270→89.443 karakter; EN 89.090; TR/EN her biri 24 detay linki |
| F-06 | Downloads HTML boyutu | TR | KISMİ PASS | Production 475.669→ara Preview 94.901 karakter; tam link dizini sonrası yeniden ölçüm gerekli |
| S-06 | QR görüntü dosyaları | TR+EN | PASS (HTTP) | İki PNG HTTP 200; QR decode/telefon NOT TESTED |
| R-01 | Main/production, ödeme, auth, RLS, SIM korunuyor | Repo | KODDA KORUNDU | Yalnız kısıtlı UI/SEO/perf/QA dosyaları değiştirildi |

## Kontrol edilmiş somut örnekler

- **TR posteri:** `/tr/posters` → A4 Görüntüle → `?size=a4` → Yazdır / PDF olarak kaydet. Görüntüleme PDF indirme değildir.
- **EN poster:** `/en/posters` → Preview A3 → `?size=a3` → Print / Save as PDF.
- **TR indirme:** `/tr/downloads` ilk 20 kart. Arama/kategori kalan veri kümesine uygulanır; Daha Fazla Göster ile genişletilir.
- **EN indirme:** `/en/downloads` Show More, arama/filtre.
- **Metadata:** TR/EN poster ve Toolbox sayfalarında konuya özgü başlık ve açıklama; login/register arama dizini dışında.

Bu belge **test planı + fiilî kod kapsamı matrisi**dir. Saha kabulü, otomatik test veya gerçek kullanıcılı test sonucu gibi değerlendirilmemelidir.
