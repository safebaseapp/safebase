# Paket 12 — iki mobil taşma için hedefli takip

21 Ekim 2026, Europe/Budapest. [İnceleme yorumu](https://github.com/safebaseapp/safebase/pull/117#issuecomment-6314446867). Aynı Draft PR #117; başlangıç `a6b06a3542465d50e981d9d52b300d584289ce02`, ekran düzeltmesi `ddd97ea06f9bb826dcce2eb325b677b5bd3c4aef`. Yeni PR/ürün yok.

**Mobil takip: GO. Production yayını: NO-GO / açık kullanıcı onayı, yetkin HSE kaynak incelemesi ve gerçek Preview/live crawl doğrulaması bekleniyor.** Önceki sekiz mobil başarısızlık artık açık bir engel değildir. Gerçek ödeme/auth/customer testine ihtiyaç duyulmadı ve yapılmadı.

## Önce: sekiz FAIL yeniden üretildi

Mevcut build üzerinde TR/EN × 360/390/1440 matrisinin tamamı yeniden çalıştı: **76 PASS / 8 FAIL**. [Önce matris](results/mobile-followup/before-browser.json), [log](results/mobile-followup/before-browser.log). Sekiz sonuç iki kök nedendir:

1. `posters/[slug]/page.tsx`: `#poster-print-area` ve `#poster-size-frame` A4'te 794px, A3'te 1123px; doğrudan ana içerik içinde oldukları için dar ekranın document genişliğini artırıyorlardı.
2. `components/RiskMatrix.tsx`: outer grid'in mobilde açık bir `minmax(0,1fr)` sütunu yoktu; 620px min-width matrix paneli automatic grid track'e yayılarak ilk kartı da büyütüyordu. 360px DOM ölçümünde ilk grid kartı 670px ve sağ kenarı 694px idi; min-width `auto` idi.

360px için son [önce/sonra DOM kaydı](results/mobile-followup/dom-before-after.json): poster document genişliği 814→360px (poster çerçevesi hâlâ 794px); matris document genişliği 694→360px ve grid sütunu 670→312px.

Bu iki dosya P11 dosya listesiyle kesişmiyor. Düzenlemeden önce dosya/DOM kökü ve yeni testteki gerçek FAIL kaydı doğrulandı. [Önce poster](evidence/mobile-followup/before-en-posters-working-at-height-rules.png), [önce matris](evidence/mobile-followup/before-tr-tools-risk-matrix.png).

## Minimum uygulama farkı

**Yalnız iki app dosyası:** 10 ekleme, 3 silme.

- Poster: mevcut sabit çözünürlüklü çerçevenin çevresine `max-w-full overflow-x-auto` ekran kapsayıcısı. TR/EN scroll region etiketi ve klavye focus'u var. Print'te `display: contents`; yeni kutu baskıya katılmıyor. Poster küçültülmedi, metin/tuval/brand/export/format seçimi değiştirilmedi. Tam poster parmak/klavye ile kendi bölgesinde yatay kaydırılır; sayfanın tamamı taşmaz. Bu bir viewport'a küçültülmüş poster iddiası değildir.
- Matris: outer grid'e `grid-cols-1 min-w-0`, iki doğrudan grid kartına `min-w-0`. 620px tablo mevcut iç `overflow-x-auto` alanında kalır. Hücreler ve içerik kırpılıp gizlenmedi; tüm sütunlara yatay kaydırmayla ulaşılır. Desktop `lg` sütun oranı korunur.

`@page` ve tüm poster print CSS **birebir aynı**. Risk bileşeninde static `className` string'leri çıkarıldığında dosya eski commit ile **birebir aynı**: state, skor, sınıf eşikleri, öneriler, PDF fonksiyonu ve davranış kaynak kodu değişmedi. [Kaynak koruma hash'i](results/mobile-followup/preservation.json), [test](../../tools/p12-review/display-preservation-test.mjs). Ödeme, auth, Supabase, SIM, XP veya export/authorization dosyalarına dokunulmadı.

## Sonra: yürütülen kontroller

| Kontrol | Sonuç | Kanıt |
|---|---|---|
| TR/EN public browser × 360/390/1440, 14 public route | **84/84 PASS** (önce 76/8) | [matris](results/mobile-followup/after-browser.json), [log](results/mobile-followup/after-browser.log) |
| Tam çözünürlüklü poster preview + matris iç scroll | **18 PASS** | [ölçümler](results/mobile-followup/contained-scroll.json), [log](results/mobile-followup/scroll.log) |
| TR/EN × A4/A3 × 390/1440 native print PDF | **8/8 PASS** | [önce](results/mobile-followup/before-print.json), [sonra](results/mobile-followup/after-print.json), [log](results/mobile-followup/after-print.log) |
| Gerçek risk bileşeni: skor/sınıf sınırları, residual/reduction ve PDF download | **6/6 PASS** (TR/EN × üç genişlik) | [matris](results/mobile-followup/risk-math.json), [log](results/mobile-followup/risk-math.log) |
| TypeScript `npx tsc --noEmit` | **PASS** | [log](results/mobile-followup/tsc.log) |
| Etkilenen iki TSX dosyası ESLint | **PASS** | [log](results/mobile-followup/eslint.log); rule/config suppression yok |
| Normal `npm run build`, değiştirilmemiş prebuild dahil | **PASS** | [log](results/mobile-followup/build.log); mevcut PDF QA/download QA da geçti |
| Robots/sitemap source QA | **86/86 PASS** | [log](results/mobile-followup/seo.log) |
| Local HTTP metadata/robots/sitemap/all30poster/schema/llms | **48 PASS** | [log](results/mobile-followup/http.log) |
| Localized guide schema | **200 PASS** | [log](results/mobile-followup/guide.log) |
| Freeze / zero P11 overlap / mevcut calculator event | **PASS** | [koruma](results/protection.json), [log](results/mobile-followup/protection.log) |

### Baskı ve hesap kanıtının kapsamı

Eski `a6b06a3` commit'i ayrı detached geçici worktree'de normal build edildi; branch resetlenmedi, P11/main üzerine yazılmadı. Her iki sürüm açıkça fake loopback Supabase URL/key ve read-only fixture kullanır. Eski build 3135, yeni build 3134; aynı dependency sürümleri. Eski runtime artifact'ı tekrar kullanılarak sahte karşılaştırma yapılmadı.

Her sekiz poster örneği bir sayfa; gerçek PDF boyutları A4 yaklaşık 595×842 pt, A3 yaklaşık 842×1191 pt. Önce/sonra page geometry, çıkarılan metin hash'i ve **1000px sayfa raster hash'i birebir aynı**. PDF binary dosyaları creation metadata nedeniyle aynı olmak zorunda değildir; o iddia yapılmaz. Kapsayıcı ekran görünümünü sınırlar, print boyutlarını etkilemez. Örnekler: [önce EN A4](evidence/mobile-followup/before-en-a4.pdf) / [sonra](evidence/mobile-followup/after-en-a4.pdf), [önce TR A3](evidence/mobile-followup/before-tr-a3.pdf) / [sonra](evidence/mobile-followup/after-tr-a3.pdf). Diğer TR/EN A4/A3 örnekleri aynı evidence klasöründe.

Calculator browser fixture'ı doğrudan gerçek `RiskMatrix.tsx` bileşenini yükler; global auth/analytics/paywall'a bağlanmaz. 9→4 başlangıç, %56 azaltım; 1/5/10/16/25 skor sınırları ve görünür risk etiketleri; 25→1, %96 ve negatif azaltımı 0'a sınırlama kontrol edilir. Var olan `downloadPDF` fonksiyonundan gerçek `SERNEM-Risk-Matrix-25-to-1.pdf` indirilir, parse edilir, 25/96 içeriği doğrulanır. Bu UI/math/export fixture'ıdır, auth veya gerçek kullanıcı download yetkisi testi değildir. Poster PDF de izole Chromium native print renderer'ı ile alınır; giriş/ödeme kapısı aşılmış gibi raporlanmaz. Gerçek printer driver/telefon testi **NOT TESTED**.

Test hazırlığında önceki server üzerinde build devam ederken bir print koşusu tamamlanamadı; geçerli kanıt diye kullanılmadı. Baseline bağımlılık symlink/hardlink kurulumu ortam kısıtına takıldı, aynı kurulu bağımlılıklar ayrı geçici alana kopyalandı; app config değiştirilmedi. Fixture'da emoji/alan etiketi locator'ları gerçek UI adıyla eşleştirildi; bu düzeltmeler ürün hatası olarak raporlanmadı. Yukarıdaki son dosyalar tamamlanmış, birbirinden ayrı build'lerin başarılı koşusudur.

## Son ekran kanıtları

- [EN poster 390px](evidence/mobile-followup/after-en-poster-390.png)
- [TR poster 390px](evidence/mobile-followup/after-tr-poster-390.png)
- [EN matris 390px](evidence/mobile-followup/after-en-matrix-390.png)
- [TR matris 390px](evidence/mobile-followup/after-tr-matrix-390.png)

Sabit baskı/geniş tablo taşmaları artık **contained scroll**, root document overflow değildir; 18 ölçümde `document <= viewport+1`, mobilde `scrollLeft > 0` ile tam içeriğe erişim doğrulandı. A4/A3 çerçeve genişlikleri ekranda da sırasıyla 794/1123px kalır. Ayrıca 1440px görünüm aynı regresyonlardan geçti.

## Yayın kararı ve koruma

**Bu dar mobil takip GO. Production NO-GO**: önceki HSE kaynak doğruluğu/gerçek dış bot-crawl ve kullanıcı yayın onayı kapıları devam ediyor. Yerel simulated bot, gerçek Google/Bing/AI indexing veya citation kanıtı değildir. Yeni kaynak doğrulaması, ödeme/trial/üyelik veya gerçek müşteri testi yapılmadı; bu takip için gerekli değil.

P11 #115, main/production, ödeme/Premium/auth/download authorization, Supabase veri/şema/RLS, SIM/XP değiştirilmedi. Mevcut prebuild'in ürettiği 280 PDF incidental farkı geri alındı. Yeni dependency yok; yeni PR, merge, manuel production deploy veya env değişikliği yok. Aynı PR #117 Draft kalır; kullanıcı kararı beklenir.

Yeniden çalıştırma: `display-preservation-test.mjs`, `contained-scroll-followup.mjs` (`P12_URL`), `risk-math-followup.mjs`, `poster-print-followup.mjs` (`P12_PHASE=before|after`, ayrı eski/yeni build URL'leri), mevcut `public-browser.mjs`, `http-seo.mjs`, `seo-test.mjs`, `guide-schema-test.mjs`, `protection-test.mjs`. Bunların hepsi `tools/p12-review/` altında. Eski print koşusu `before-print.json` oluşturur; after aynı örneklerle hash karşılaştırır. Fiziksel çıktı test edilmediyse PASS olarak eklenmemeli.
