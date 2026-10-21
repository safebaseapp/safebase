# Paket 11 — hedefli takip kapanışı

21 Ekim 2026, Europe/Budapest. Talimat: [PR #115 son takip yorumu](https://github.com/safebaseapp/safebase/pull/115#issuecomment-6311901741). İncelenen PR ucu: `de6a5ef809ce54ef69ba1322cedddf46e7c23ce4`. **Son karar: NO-GO.** Bu inceleme önceki genel denetimi veya trial kurulumunu tekrarlamaz.

## Önceden kanıtlanmış — already covered

| Kanıt | Tarih / ortam / kaynak | Bu takipte kullanım |
|---|---|---|
| Kullanıcının trial aktivasyonu ve 24 saat sonunda Free'ye dönüş gözlemi | 13–15 Ekim manuel kayıtları, 21 Ekim takip yorumunda kullanıcı tarafından teyit. Tam deployment SHA/provider response ekli değil. | Önceki çalışan sistem kanıtı olarak kabul edildi; P11 webhook E2E PASS diye sunulmadı. Tekrarlanmadı. |
| Test Product `1436559`, test trial Variant `2243177` | `88808c9`, test/live ayrımı `86cd0f0` (13 Ekim), guard `b0dbbad` (13 Ekim), production explicit flag `762c27e` (14 Ekim); mevcut `app/lib/premium-trial-config.ts` | **Yalnız trial** kimliği. Normal Premium ID olarak kullanılmadı. Trial guard/süre/fiyat değişmedi. |
| 16 webhook fixture, 21 trial assertion, 70 erişim, 240 responsive, 134 PDF/PNG; auth ve checkout kontrolleri | Önceki P11 kaynak/yerel fixture çalışmaları; [release logları](results/release), uygulama kodu `5540909`, kanıt ucu `de6a5ef` | Already covered; bu takipte bu paketler çalıştırılmadı/kopyalanıp yeni PASS üretilmedi. |
| TypeScript/etkilenen ESLint/build önceki PASS | Aynı P11 release kanıtları; ESLint 0 hata/14 uyarı | Geçmiş build kanıtı korunuyor. Yeni helper değişikliği için yalnız TypeScript + helper ESLint yenilendi. Build/PDF prebuild bu takipte yeniden çalıştırılmadı. |
| Preview READY | `de6a5ef`, deployment `7221147066`, GitHub/Vercel `success`, “Deployment has completed”; https://safebase-2lopq1wej-safebaseapps-projects.vercel.app | Salt okunur metadata tekrar doğrulandı. Yeni commit'lerin Preview durumunun ayrı olduğu unutulmamalı. |
| Auth/Storage RLS | Önceki auth protokol fixture'ları ve route own-user testleri var. Trial kullanıcı gözlemi Auth signup/recovery veya Storage RLS kanıtı değildir. Repo'da gerçek Auth/Storage sandbox'ını tarih+ortam+commit ile bağlayan doğrulama kaydı bulunamadı. | Eski testi baştan istemek yerine yalnız P11 callback/branding delta'sı için eksik sandbox kanıtı kaldı; **NOT TESTED**. XP SQL RLS testleri Storage RLS yerine kullanılmadı. |

## P11'de bu takipte doğrulanan ve giderilen risk

**P1 — geçmiş trial kaydı yeni, doğrulanmış ücretli erişimi veto ediyordu.** Yeni normal ücretli abonelik/renewal webhook'u profile `active` + Premium + subscription binding yazsa bile, eski trial reservation `expired`/eski `cancelled` kaldığında ortak helper erişimi reddediyordu. Normal checkout'un trial reservation custom metadata'sı taşıması gerekmemesi nedeniyle bu tutarsızlık mümkündü. Allowlist'in doğru olması tek başına bu erişim engelini çözmüyordu.

Yeni ve yalnız bu riske odaklanan [test](../../tools/p11-review/paid-access-followup-test.mjs), gerçek helper kodunu sentetik DB cevaplarıyla çalıştırır. Önce **3 FAIL**, düzeltmeden sonra **8 PASS**: yeni ücretli binding + eski expired trial; aynı binding renewal + eski cancelled trial; gelecekte bitecek ücretli iptal; geçmiş iptal; bindingsiz active; Free plan; unpaid; profil doğrulama hatası. [Önce](results/followup/before.log) / [sonra](results/followup/after.log).

Minimum düzeltme: sunucu `profiles` sorgusu mevcut subscription ID'yi de okur. Premium plan + bağlı ve `active` ücretli durum (veya zaten sonlu gelecek bitişi doğrulanmış `cancelled`) varsa, geçmiş reservation bu ücretli erişimi veto etmez. Trial-only süre hesabı, manual/legacy plan kuralı ve veri modeli değişmedi. Query hataları fail-closed kalır. Trial reservation sorgu hatası için de mevcut fail-closed davranış korunur. Profil/billing alanlarının istemciden değiştirilememesi gerçek RLS sandbox kapısında ayrıca kanıtlanmalıdır; bu test onu doğrulamaz.

Yeni çalışma: **8 hedefli assertion PASS**, **TypeScript PASS**, **yalnız değişen helper ESLint PASS**. [TypeScript](results/followup/tsc.log), [ESLint](results/followup/eslint.log). Üçüncü taraf çağrısı, ödeme, mail, checkout, trial başlatma veya gerçek hesap yok. Eski 16/21/70/240/134 sayıları bu sekiz yeni kontrolün parçası değildir.

## Hâlâ blokaj — gerçek kaynak ve sandbox

| Kalan en küçük adım | Durum / neden | Kim / ne açabilir? |
|---|---|---|
| Normal ücretli numeric variant'i yetkili test-mode provider yanıtı veya doğrulanmış konfigürasyonla eşleştir | **BLOCKED.** Normal checkout UUID `e6363311-0a93-433f-ba14-d2507c4a683f` numeric variant değildir. Oturumda provider key/normal variant allowlist/test Supabase bağlantı değişkenleri tanımlı değil; repo'da env dosyası bulunmadı. Provider yanıtı okunmadı, ID tahmin edilmedi. Trial ID normal listeye eklenmedi. | Billing sahibi: gerçek test-mode normal ürün/variant eşleşmesinin doğrulanmış kaynağını ve güvenli sandbox yetkisini sağlar; secret PR'a/log'a yazılmaz. |
| Yalnız P11 webhook delta'sının gerçek test-mode çalışması | **NOT TESTED.** Yeni normal paid aktivasyon + yanlış variant; mevcut bağlı legacy abonelik; cancellation/expiry; renewal; eski farklı binding ile resubscribe; replay/out-of-order. Önceki fixture'lar already covered. Reconciliation ve binding CAS tek başına gerçek eşzamanlı event ordering garantisi değildir; provider snapshot'ları arasında yarış ve kısmi trial/profile yazımı gerçek DB'de kanıtlanmadı. | Billing + sandbox Supabase sorumlusu: var olan sentetik hesap/abonelik ve test event'leriyle yalnız bu yolları çalıştırır. Yeni keyfi hesap/ürün oluşturulmaz. |
| Eski farklı binding varken yeniden satın alma | **Açık erişim riski:** koruyucu 409 devam eder; meşru yeni abonelik eski kaydı otomatik ezmez. | Aynı sahipler sandbox'ta resubscribe geçmişini doğrular ve güvenli binding mutabakatı belirler; doğrulanmamış provider varsayımıyla kod gevşetilmez. |
| Yeni Premium helper ve branding route için gerçek scope | **NOT TESTED.** Sentetik olumlu paid erişimi ve expired/cross-user olumsuz scope; billing alanlarına istemci yazma reddi ve doğrudan Storage RLS. Önceki Auth/Storage doğrulaması sağlanırsa ortam/commit/policy farkına göre tekrar azaltılır. | Supabase sandbox sahibi: ayrı test proje yetkisi ve önceki Auth/Storage kanıtının tarih/ortam/commit'i. Mevcut canlı politikalar değiştirilmez. |
| Preview TR/EN login→Free PDF→Premium karar smoke | **BLOCKED.** Önceki HEAD/elevated denemelerinin 403 CONNECT proxy kanıtı korunuyor. Uygulama 403'ü diye yorumlanmadı; talimat gereği tekrar tekrar istek gönderilmedi. READY metadata, HTML smoke yerine geçmez. | Ortam/ağ sorumlusu: Preview origin erişimini açar; ardından mevcut sentetik sandbox oturumuyla yalnız smoke yapılır. |

Yeni helper düzeltmesi fixture düzeyinde giderildi; gerçek DB/provider mutabakatı hâlâ doğrulanmış değildir. Trial'ın daha önce çalışmış olması bu P11 delta'sına GO vermez. Mevcut **normal variant / provider sandbox / yeni Premium scope** engelleri nedeniyle yayın **NO-GO**; kullanıcı onayı ve hedefli kanıtlar beklenir. Main/production/canlı Supabase/SIM/XP değişikliği, merge/deploy/migration yok. Aynı PR #115 devam eder.
