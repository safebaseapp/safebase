# SERNEM — Issue #127 | Canlı Site Kalite Paketi

**Tarih:** 28.10.2026 (Europe/Budapest)  
**Başlangıç / production SHA:** `80a1a0e3e95931a5058a2fe45e6f00e7604a8382`  
**Geliştirme dalı:** `codex/sernem-live-site-quality-consolidated`  
**Rollback:** production ve main değiştirilmedi. Bu PR reddedilerek mevcut `main` ve Vercel production korunur.  
**Yayın kararı:** **NO-GO** — HTTP/Preview ve build kontrolleri olumlu; gerçek Premium/expired yetki, tarayıcı yazdırması, mobil E2E ve bağımsız HSE kabulü eksik.

## Bu turda doğrudan yapılan değişiklikler

| Alan | Değişiklik | Kapsam |
|---|---|---|
| Poster kartları | TR/EN A4-A3 düğmeleri gerçek işlemi tarif ediyor: Görüntüle/Preview. Yanıltıcı 'Download A4/A3', 'PDF Included' etiketleri kaldırıldı | `PosterLibraryClient.tsx` |
| Yazdır/PDF | Yazdırma arayüzünde tarayıcıdan PDF'ye kaydetme açıkça anlatıldı; hazırlık durumu, başarısız görsel/logo kontrolü ve hata bildirimi eklendi | `PosterFormatToolbar.tsx` |
| Ölçüm | `window.print()` sonrası PDF gerçekten indirildi iddiasında bulunan `resource_download|Poster|PDF` kaydı kaldırıldı; yalnızca tanımlayıcı içermeyen `poster_print_requested` GA4 niyet olayı eklendi. Gerçek dosya kaydını tarayıcıdan doğrulayamayız | `PosterFormatToolbar.tsx` |
| SEO | Poster, Downloads, Toolbox, Checklists, Safety Signs, Labs ve Upgrade sayfalarına TR/EN özgün title, description, OpenGraph, canonical/hreflang eklendi | 7 landing page |
| Tarama gizliliği | Giriş ve kayıt sayfalarına `robots: noindex, nofollow` eklendi | 2 sayfa |
| Listeleme | Downloads başlangıçta 20 kart gösteriyor, filtre tüm kaynakları kapsıyor. Tüm bağlantılı kaynakların SSR dizini eklendi. | `DownloadsClient.tsx` |
| Checklist performansı | 24 kartın tamamı korunarak tam denetim dokümanları yerine küçük kart özetleri gönderiliyor; tüm slug bağlantıları SSR dizininde tutuluyor | `checklists/page.tsx`, `InspectionLibraryClient.tsx` |
| Regresyon | Kaynak düzeyindeki etiket/olay/SEO/listeleme/QR sabitlerini denetleyen script eklendi, mevcut `prebuild` zincirine bağlandı | `scripts/qa-live-quality-pack.mjs`, `package.json` |

## Değiştirilmemiş güvenlik/ödeme sınırları

**Dokunulmadı:** Lemon Squeezy, abonelik/entitlement, checkout, webhook, Supabase tabloları/RLS/migrations, auth akışı, SIM 5.0 WebGL/XP ve gerçek kullanıcı verileri. #126 poster metinleri ve QR görselleri değişmedi. Vercel domain/redirect ayarlarına dokunulmadı.

**SECURITY BLOCKER — doğrulama gerekli:** Poster markalama denetimleri istemci tarafında `profiles.plan/role/status` ve `isAdminUser` verileriyle karar veriyor. Süresi dolmuş/askıdaki Premium için abonelik yaşam döngüsü, storage RLS ve signed URL davranışı gerçekçi sentetik yetkili ortamda test edilmedi. Bu inceleme geçerli Premium erişimini doğrulamaz. Mevcut P11 PR #115 / #114 bağlantılarıyla çakışmamak için ödeme/auth kaynak kodu değiştirilmedi.

## Doğrulanmış Preview ve regresyon kanıtı — 28.10.2026

- **Normal Vercel build:** `1192fcaa4c672b9cda436c88f4ed230502e767ee` için Preview **READY**. Prebuild: 70 Toolbox × TR/EN standart ve markalı taban PDF doğrulaması **PASS**; `qa-download-flows` **PASS**; `qa-live-quality-pack` **PASS**. Next.js derleme ve TypeScript kontrolü tamamlandı. Mevcut Turbopack NFT/tracing uyarısı giderilmedi.
- **30 poster URL smoke:** 15 poster × TR/EN = **30/30 HTTP 200**. Her birinde doğru dil canonical bağlantısı ve `poster-print-area` SSR işaretlemesi gözlendi. Bu sonuç PDF'nin fiziksel çıktısının doğru olduğunu kanıtlamaz.
- **QR görselleri:** `/posters/sernem-qr-tr.png` ve `/posters/sernem-qr-en.png` **HTTP 200, image/png**. QR içeriğinin kamera ile okunması bu turda test edilmedi.
- **Erişim örnekleri:** Anonim `/tr/posters/hot-work-safety-rules?brand=1` HTTP 200, server HTML'de `data-poster-company-logo="false"`. Anonim Premium poster PDF endpoint isteği giriş HTML'sine yönlendi; gerçek PDF yanıtı verilmedi. Süresi dolmuş üyelerin yetkisi bu testle doğrulanamaz.
- **SEO:** TR login ve EN register sayfası HTML'inde `noindex, nofollow`; sitemap **866 loc, 866 benzersiz** (30 poster, 48 checklist ve 24 hesaplayıcı detay URL'si); `robots.txt`, `llms.txt`, `sitemap.xml` HTTP 200. `lastmod` kaydı **0**, kaynağı olmadan tarih uydurulmadı.
- **HTML boyutu (sıkıştırılmamış, gerçek HTTP yanıtından):** `/tr/downloads` production 475.669 karakter → Preview ara sürüm 94.901 karakter (**yaklaşık %80 daha küçük**); sonradan eklenen tüm kaynak link dizini sonrası nihai boyut yeniden ölçülmelidir. `/tr/checklists` production 712.270 karakter → optimize Preview 89.443 karakter (**yaklaşık %87 daha küçük**); `/en/checklists` Preview 89.090 karakter. Her dilde **24 farklı checklist detay bağlantısı** HTML içinde kalıyor. Karakter uzunluğu transfer byte boyutu ya da gerçek Web Vitals değildir.
- **Rota davranışı:** Geçersiz poster adresi **404**. Public poster, download, Toolbox, Labs, checklist, Safety Signs ve Upgrade örnekleri **200**.

## Doğrulanmamış / engelli kapılar

- **Gerçek tarayıcı:** Print/PDF A4/A3 sayfa sonu, mobil 320/360/390/768, klavye/screen reader, QR kamera ve logo yüklendikten sonraki çıktı: **NOT TESTED**.
- **Yetkilendirme:** Anonim kullanıcı SSR kontrolü gözlendi, fakat Free/Premium/expired/suspended ve RLS/signed URL ile gerçek sentetik kullanıcı E2E: **BLOCKED/NOT TESTED**. Kısıt gereği auth/entitlement kodu değiştirilmedi.
- **GA4:** Kaynakta yalnız `poster_print_requested` ölçülüyor. Gerçek GA4 kabul, print completion, tekrar olaylar ve hassas veri aktarımının ağ seviyesinde testi: **NOT TESTED**.
- **SEO performansı:** GSC gerçek indeks/sıralama, Lighthouse, LCP, INP, CLS ve tüm 866 rotanın tarayıcı E2E denetimi: **NOT TESTED**.
- **HSE:** Mevzuat edition/yerel uygulanabilirlik ve yetkin uzman kalite onayı bu turda yapılmadı; uydurma sertifika/tarih eklenmedi.
- **Yeni son dokümantasyon/kaynak SHA:** Her ilave commit sonrası Preview READY ve prebuild sonucu güncel SHA ile yeniden doğrulanmalıdır. GitHub source-level PASS gerçek entegrasyon testlerinin yerine geçmez.

## Devam etmeden önceki kabul kapısı

1. En son SHA için Vercel Preview READY, normal build/prebuild, TypeScript ve CI sonuçlarını doğrula.
2. Anonim, Free ve Premium kullanıcılar için TR/EN A4/A3 akışları, login geri dönüşü, PDF çıktısı ve branding için sentetik E2E yap.
3. Expired/suspended Premium ve logo/storage yetkisini fail-closed olarak yetkili test ortamında kanıtla. Başarısız olan testler için ayrı değişiklik onayı al.
4. Güncel mobil/desktop ölçümlerle perf, yönlendirme, 404, erişilebilirlik ve GA4 event niyetini doğrula.
5. Sadece bütün kapılar tamamlandıktan ve sahibin **ayrı yayın onayı** alındıktan sonra merge/production kararı ver.

**Rapor kategorisi:** Doğrudan uygulanan fakat tam entegrasyon kabulü yapılmamış kısmi kalite paketi. Kanıtsız herhangi bir alan PASS olarak raporlanmaz.
