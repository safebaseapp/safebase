# SERNEM — Issue #127 | Canlı Site Kalite Paketi

**Tarih:** 28.10.2026 (Europe/Budapest)  
**Başlangıç / production SHA:** `80a1a0e3e95931a5058a2fe45e6f00e7604a8382`  
**Geliştirme dalı:** `codex/sernem-live-site-quality-consolidated`  
**Rollback:** production ve main değiştirilmedi. Bu PR reddedilerek mevcut `main` ve Vercel production korunur.  
**Yayın kararı:** **NO-GO** — gerçek Premium/anonim erişim, yazdırma, Preview ve performans kapıları bağımsız doğrulanmadan merge veya yayın yok.

## Bu turda doğrudan yapılan değişiklikler

| Alan | Değişiklik | Kapsam |
|---|---|---|
| Poster kartları | TR/EN A4-A3 düğmeleri gerçek işlemi tarif ediyor: Görüntüle/Preview. Yanıltıcı 'Download A4/A3', 'PDF Included' etiketleri kaldırıldı | `PosterLibraryClient.tsx` |
| Yazdır/PDF | Yazdırma arayüzünde tarayıcıdan PDF'ye kaydetme açıkça anlatıldı; hazırlık durumu, başarısız görsel/logo kontrolü ve hata bildirimi eklendi | `PosterFormatToolbar.tsx` |
| Ölçüm | `window.print()` sonrası PDF gerçekten indirildi iddiasında bulunan `resource_download|Poster|PDF` kaydı kaldırıldı; yalnızca tanımlayıcı içermeyen `poster_print_requested` GA4 niyet olayı eklendi. Gerçek dosya kaydını tarayıcıdan doğrulayamayız | `PosterFormatToolbar.tsx` |
| SEO | Poster, Downloads, Toolbox, Checklists, Safety Signs, Labs ve Upgrade sayfalarına TR/EN özgün title, description, OpenGraph, canonical/hreflang eklendi | 7 landing page |
| Tarama gizliliği | Giriş ve kayıt sayfalarına `robots: noindex, nofollow` eklendi | 2 sayfa |
| Listeleme | Downloads başlangıçta 20 kart gösteriyor, kategoriler/arama tüm veri kümesi üzerinde çalışıyor, kullanıcı Daha Fazla Göster ile tüm sonuçlara ulaşıyor | `DownloadsClient.tsx` |
| Regresyon | Kaynak düzeyindeki etiket/olay/SEO/listeleme/QR sabitlerini denetleyen script eklendi, mevcut `prebuild` zincirine bağlandı | `scripts/qa-live-quality-pack.mjs`, `package.json` |

## Değiştirilmemiş güvenlik/ödeme sınırları

**Dokunulmadı:** Lemon Squeezy, abonelik/entitlement, checkout, webhook, Supabase tabloları/RLS/migrations, auth akışı, SIM 5.0 WebGL/XP ve gerçek kullanıcı verileri. #126 poster metinleri ve QR görselleri değişmedi. Vercel domain/redirect ayarlarına dokunulmadı.

**SECURITY BLOCKER — doğrulama gerekli:** Poster markalama denetimleri istemci tarafında `profiles.plan/role/status` ve `isAdminUser` verileriyle karar veriyor. Süresi dolmuş/askıdaki Premium için abonelik yaşam döngüsü, storage RLS ve signed URL davranışı gerçekçi sentetik yetkili ortamda test edilmedi. Bu inceleme geçerli Premium erişimini doğrulamaz. Mevcut P11 PR #115 / #114 bağlantılarıyla çakışmamak için ödeme/auth kaynak kodu değiştirilmedi.

## Kanıt seviyesi / testi yapılmayanlar

- **Kod değişiklikleri:** GitHub dalında kayıtlı. Lokal `npm run build`, TypeScript, ESLint, yeni `qa:live-quality` ve mevcut PDF/QR regresyonları bu rapor yazılırken henüz tamamlanmış olarak doğrulanmadı. Sadece kaynak incelemesi yapılmış testler PASS değildir.
- **Vercel Preview:** Son committe **READY ve erişilebilirlik ayrı doğrulanmalıdır**. Önceki Codex çalışmasındaki Google Fonts erişim sorunu ve yetkilendirme negatif testleri bu paketin çözülmüş kanıtı değildir.
- **Poster PDF:** A4/A3 fiziki yazıcı, Chromium print PDF, 15 poster × 2 dil çıktıları, QR kamera/okuyucu ve şirket logoları bu turda yeniden ölçülmedi. Önceki #126 kanıtları korunur, bu turun yeniden testi değildir.
- **Üyelik:** Anonim → login → poster geri dönüşü, Free, Premium, expired/suspended ve logo eksikliği gerçek tarayıcıda **NOT TESTED**.
- **Analytics:** GA4 canlı hesabına yazma veya gerçek olay analizi yapılmadı. Yeni olay istemci kodunda tanımlandı; GA4'e ulaştığı doğrulanmadı.
- **Performans:** Downloads kartlarının başlangıç DOM üretimi kodda sınırlandı; 476 KB / 712 KB tarihsel ham HTML değerleri bu turda yeniden ölçülmedi. Gerçek kullanıcı LCP/INP/CLS, cihaz testleri ve Lighthouse **NOT TESTED**.
- **SEO:** 866 URL'lik tarihsel sitemap envanteri, GSC sıralama ve gerçek indeks kazanımı yeniden doğrulanmadı. `lastmod` için güvenilir gerçek sayfa güncelleme kaynağı saptanmadığı için sahte tarih eklenmedi.
- **HSE teknik denetim:** Bu turda bağımsız yerel mevzuat/edition ve yetkin HSE uzman kabulü yapılmadı; teknik içerikler topluca değiştirilmedi.

## Devam etmeden önceki kabul kapısı

1. En son SHA için Vercel Preview READY, normal build/prebuild, TypeScript ve CI sonuçlarını doğrula.
2. Anonim, Free ve Premium kullanıcılar için TR/EN A4/A3 akışları, login geri dönüşü, PDF çıktısı ve branding için sentetik E2E yap.
3. Expired/suspended Premium ve logo/storage yetkisini fail-closed olarak yetkili test ortamında kanıtla. Başarısız olan testler için ayrı değişiklik onayı al.
4. Güncel mobil/desktop ölçümlerle perf, yönlendirme, 404, erişilebilirlik ve GA4 event niyetini doğrula.
5. Sadece bütün kapılar tamamlandıktan ve sahibin **ayrı yayın onayı** alındıktan sonra merge/production kararı ver.

**Rapor kategorisi:** Doğrudan uygulanan fakat tam entegrasyon kabulü yapılmamış kısmi kalite paketi. Kanıtsız herhangi bir alan PASS olarak raporlanmaz.
