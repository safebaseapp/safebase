# Paket 11 — Son kalite ve yayın güvenliği: NO-GO

**Güncel hedefli kapanış:** [FOLLOWUP.md](FOLLOWUP.md). Son takip yorumuna göre önceki testler **already covered**; yeniden çalıştırılmadı. Yalnız eski trial kaydının ücretli binding erişimini veto etmesi giderildi: 8 yeni hedefli assertion, TypeScript ve değişen helper ESLint PASS. Normal variant/provider sandbox ve yeni scope doğrulaması hâlâ blokaj. Aşağıdaki geniş test tablosu önceki incelemenin kanıtıdır.

21 Ekim 2026, Europe/Budapest. Mevcut PR: [#115](https://github.com/safebaseapp/safebase/pull/115). Yeni PR açılmadı. İncelenen önceki uç commit `c97e2b8`; son uygulama değişikliği `5540909bd969658801db70af41573a382d5adc7a`.

**Karar: Production için NO-GO.** Yerel kalite kontrolleri geçti; gerçek normal Premium variant eşleştirmesi, yetkili sandbox entegrasyonu ve erişilebilir Preview akışları doğrulanamadı. READY deployment bu eksik doğrulamaların yerine geçmez. Merge/deploy yapılmadı; yazılı kullanıcı onayı bekleniyor.

## Preview durumu ve erişim sınırı

- Önceki PR ucu `c97e2b8` deployment `7219930563`: `success`, “Deployment has completed”.
- Düzeltmeleri içeren `5540909` deployment `7220979441`: **success / completed (READY karşılığı)**. Preview: https://safebase-d63onrnz9-safebaseapps-projects.vercel.app . [Makine tarafından alınan durum](results/release/preview.json).
- `/en/login` salt okunur HEAD isteği ortamın ağ proxy'sinde **403 CONNECT tunnel failed**, curl exit 56 verdi. Ağ izniyle tekrar deneme de aynı sonucu verdi; önceki Preview adresi de engelliydi. Uygulamadan HTML alınamadığından bu durum bir uygulama 403 yetki hatası olarak sınıflandırılmadı.
- **Preview kullanıcı akışları NOT TESTED.** Login/şifre reset/checkout formu canlı ortamda gönderilmedi. Yerel build üzerinde yapılan aşağıdaki testler Preview veya gerçek Supabase testleri olarak sunulmuyor. Preview erişim engeli kaldırıldıktan sonra TR/EN guest→login→Free çıktı ve sandbox Premium dönüşümü tekrar test edilmeli.
- Doküman/test kanıtı commit'lerinin ayrı Preview durumu PR'ın güncel check listesinden ayrıca izlenmelidir; yukarıdaki READY kanıtı uygulama kodu commit'ine aittir.

## Küçük düzeltmeler ve regresyon kanıtı

### Dört ESLint hatası: giderildi

Quick Risk Assessment'ta başlangıç satırı için deterministik yerel kimlik kullanılıyor; yeni satır kimlikleri yalnız kullanıcı olayı sırasında üretiliyor. Premium CTA `router.push` kullanıyor. Filtre sonucu mevcut seçimi geçersiz kılarsa bağımlı seçim koşullu render ayarlamasıyla güncelleniyor; effect kaynaklı ek commit kaldırıldı. Risk verileri/persist formatı ve belge içerikleri değişmedi; mevcut kayıtlar dönüştürülmedi.

Etkilenen bütün TS/TSX dosyalarında ESLint **PASS: 0 hata, 14 uyarı**. Kural kapatılmadı, config değiştirilmedi. Uyarılar mevcut unused/hook/image konuları; sıfır uyarı iddiası yok. [Log](results/release/p11-release-eslint.log).

Yeni TR/EN 390px gerçek Chromium testi boş filtre→seçimin temizlenmesi→filtreyi sıfırlama→geçerli seçimin geri gelmesi, satır ekleme, iki satırın bağımsız düzenlenmesi ve eklenen satırın silinmesini doğrular. Kaydetme çağrısı yapmaz. İlk test denemesinde select'in erişilebilir adını tam eşleyen locator zaman aşımına uğradı; test label içindeki select'i hedefleyecek şekilde düzeltildi. Ürün koduna test locator'ı için değişiklik yapılmadı. [Sonuç](results/release/p11-release-risk-editor.log).

### Premium üyeyi etkileyen iki ek webhook hatası: giderildi

Yeni testlerde **3 başarısız senaryo** üretildi: bağlı abonelikte hesap/ödeme e-postası farklılaşması; iptal edilmiş aboneliğin gelecekteki bitişinin kaydedilmemesi; geçmiş bitişli iptalin geri alınmaması. [Önce](results/release/p11-release-webhook-before.log) → [sonra](results/release/p11-release-webhook-after.log).

Doğrulanmış provider subscription ID'sine bağlı profil önce bulunur. Bu mevcut bağ e-posta farklılaşmasında korunur; event başka kullanıcıyı işaret ediyorsa reddedilir. Yeni bağlarda provider ve hesap e-postası anlaşması gerekir; Auth fallback'i de aynı doğrulamayı uygular. İptal durumu/bitişi senkronize edilir: sonlu gelecekteki bitişe kadar Premium, süre dolmuş/geçersiz bitişte Free. Paused provider durumu da Free olarak kaydedilir. Bunlar yalnız kod/fixture değişikliğidir; canlı abonelik veya veritabanı değiştirilmedi.

Webhook testleri **16 PASS**: imza, unpaid/order, eski yabancı bağ, provider'dan güncel durum, unknown variant, idempotent tekrar, legacy bağlı variant, e-posta farklılaşması, açıkça yapılandırılmış sentetik normal variant, yapılandırılmamış normal variant, yeni hesap e-posta uyuşmazlığı iki iptal bitiş senaryosu, çakışan custom kullanıcı kimliği ve paused erişim reddi. Sentetik variant etiketleri gerçek ID değildir. Gerçek provider/API/DB entegrasyonu test edilmedi.

## Normal Premium variant ve erişim riskleri

| Durum | Kod/fixture kanıtı | Yayın etkisi |
|---|---|---|
| Normal checkout | Upgrade sayfası `checkout/buy/e6363311-0a93-433f-ba14-d2507c4a683f` kullanıyor. Bu bir checkout UUID'si; numeric variant ID kanıtı değildir. | UUID'den veya trial ID'lerinden normal Premium ID türetilmedi. |
| Yeni ücretli abonelik | Yeni binding yalnız mevcut trial variant veya `LEMONSQUEEZY_PREMIUM_VARIANT_IDS` allowlist'iyle kabul ediliyor. Sentetik configured normal variant PASS; unconfigured normal variant 400/no writes. | **P1 yayın engeli:** gerçek normal variant doğrulanmazsa ödeme yapmış yeni üyeye erişim verilemeyebilir. |
| Mevcut aynı subscription'a bağlı üye | Provider ile doğrulanan aynı binding legacy variant'i allowlist'te olmasa da kabul eder; bağımsız fixture PASS. Read gate'te trial reservation olmayan manuel/legacy Premium korunur. | Mevcut bağlı üyelerin sırf allowlist boş diye düşürülmesi önleniyor; gerçek kayıt durumu bilinmiyor. |
| E-posta değişmiş bağlı üye | Mevcut subscription binding önceliklendirildi; fixture PASS. | Eski e-posta eşitliği hatası giderildi; başka kullanıcıya bağ aktarma yapılmaz. |
| Eski subscription ID'si hâlâ bağlıyken yeni satın alma | Farklı subscription için 409 güvenlik koruması devam ediyor. | **Açık entegrasyon riski:** gerçek resubscribe/upgrade senaryosu sandbox'ta doğrulanmalı; eski bağın güvenli mutabakat politikası olmadan otomatik üzerine yazılmaz. |
| İptal/expiry | İptal bitişi artık kaydediliyor ve erişim anında kontrol ediliyor. | Fixture PASS; gerçek provider cancellation/renewal/expiry teslimi henüz doğrulanmadı. |
| Provider/DB erişim sorunu | Provider doğrulaması ve service-role entitlement sorgusu zorunlu, başarısızlıkta kapalı davranış var. | Yetkisiz grant önlenir; API key/service role/RLS eksikliği geçerli üyeyi de bloke edebilir. Yetkili sandbox'ta olumlu ve olumsuz yollar test edilmeli. |

Repo içindeki test/live trial product/variant sabitleri **yalnız trial yapılandırmasının kanıtıdır**; normal Premium eşleştirmesi değildir. Gerçek ID okumak için canlı billing API'sine gidilmedi. Mevcut abonelik, pending entitlement ve eski kayıt dağılımı incelenmedi/değiştirilmedi.

## Önceki incelemede tekrarlanan testler — bu takipte already covered

Hepsi yalnız yerel derleme ve sentetik protokol/provider fixtürleri üzerindedir. Browser dış ağ istekleri engellidir; fixture CSP istisnası gerçek CSP doğrulaması değildir.

| Kontrol | Sonuç | Kanıt |
|---|---|---|
| `npx tsc --noEmit` | PASS | [log](results/release/p11-release-tsc.log) |
| Etkilenen dosyalarda ESLint | PASS, 0 hata / 14 uyarı | [log](results/release/p11-release-eslint.log) |
| `npm run qa:toolbox-pdfs` | PASS, 140 standart + 140 branded-base | [log](results/release/p11-release-toolbox-qa.log) |
| `npm run qa:download-flows` | PASS, kaynak kontrolleri | [log](results/release/p11-release-download-qa.log) |
| `npm run build` | PASS, prebuild dahil | [log](results/release/p11-release-build.log) |
| Callback / form transport / trial | PASS; TR/EN güvenli return, PKCE, başarısızlık; trial 21 assertion | [callback](results/release/p11-release-callback-test.log), [auth](results/release/p11-release-auth-browser.log), [trial](results/release/p11-release-trial-test.log) |
| Şifre kurtarma/reset ve SDK yaşam döngüsü | 14 PASS, TR/EN | [log](results/release/p11-release-auth-lifecycle.log) |
| Premium ve PDF doğrudan endpoint yetkisi | 70/70 PASS, 7 rol × TR/EN | [matris](results/release/access-matrix.json) |
| Gerçek üretilen PDF/PNG ve başlık | 134/134 + TR/EN başlık PASS | [PDF](results/release/p11-release-pdf-qa.log), [başlık](results/release/p11-release-pdf-header-test.log) |
| Guest→Free→Premium karar yolu | 20 PASS, ödeme penceresi intercept | [log](results/release/p11-release-journey-browser.log) |
| Expired/paid logo ve checkout duplicate | PASS | [logo](results/release/p11-release-branding-browser.log), [checkout](results/release/p11-release-checkout-browser.log) |
| Mobil/desktop altı genişlik, TR/EN | 240/240 PASS | [matris](results/release/mobile-matrix.json) |
| Risk editor filtre/satır davranışı | TR/EN PASS | [log](results/release/p11-release-risk-editor.log) |
| Billing / global entitlement / resource / erken tık | PASS | `results/release/p11-release-*-test.log` ve loading-gate log'u |

Prebuild'in ürettiği 280 download dosyası geri alındı; test için script atlanmadı/değiştirilmedi. SIM 5.0/XP/SQL/model dosyalarında yeni diff yok; bu son incelemede GPU/XP DB testi yeniden çalıştırılmadı. Önceki izolasyon kanıtları AUDIT içinde tarihsel olarak korunuyor.

## Sandbox için gerekenler ve erişim engelleri

| Alan | Gereken yetkili, production'dan ayrı kurulum | Doğrulanması gereken |
|---|---|---|
| Preview | Bu çalışma ortamından Vercel Preview origin'ine izin; varsa Vercel Authentication için yetkili erişim | Gerçek HTML ve TR/EN guest akışları; mevcut 403 proxy engelinden sonra deployment protection durumu ayrıca anlaşılabilir. Kimlik doğrulama engeli atlatılmadı. |
| Supabase Auth | Ayrı test projesi; test public URL/key ve yalnız sunucuda test service-role; sentetik hesaplar; uygun Auth redirect allowlist | `/auth/callback?locale=...&next=...` ve `/tr|en/reset-password` redirect'leri, PKCE cookie/domain, doğrulama ve recovery mail şablonları, süre aşımı/yeniden kullanım/çıkış. Posta sink veya kontrollü test inbox; gerçek kullanıcıya mail yok. |
| Billing | Lemon test-mode store/API key/signing secret, test ürününün belgelenmiş normal ve trial variant ID'leri, sandbox webhook endpoint | İmzalı gerçek test event'i → provider reconciliation → yalnız doğru sentetik profil; yeni satın alma, renewal, cancel/end, replay/out-of-order, resubscribe eski bağ, hatalı imza/variant. Tahsilat veya live secret kullanılmaz. |
| Variant allowlist | Test store'dan doğrulanmış normal variant ID'leri ve ürün/mod eşleşmesi; sadece sandbox env'e allowlist | Repo checkout UUID'si sayısal ID yerine kullanılmaz. Live rollout için ayrı doğrulanmış live mapping ve kullanıcı onayı gerekir; bu görevde production env değişmez. |
| Trial feature guard | `premiumTrialEnabled()` şu an Preview'da yalnız `feature/premium-24h-trial` ref'ini kabul eder. P11 branch'inde flag tek başına yeterli değildir. | Bu davranış değiştirilmedi; kontrollü sandbox trial testi için mevcut ref guard'ını kapsayan ayrıca incelenmiş test kurulumu gerekir. Fixture'daki enabled stub gerçek Preview aktivasyonu kanıtı değildir. |
| Storage/RLS | Aynı ayrı test projesinde sentetik `company-assets`, document profile/logo dosyaları, billing/trial tabloları ve mevcut politika şeması | Free/expired/suspended ve çapraz kullanıcı direct storage list/read/sign/download reddi; Premium/admin izinleri; yeni branding API'de own-user scope ve private/no-store/60s URL. Gerçek bucket/RLS okunmadı/değiştirilmedi. |
| Servis erişimi | Test DB/provider erişim hata senaryoları ve doğru minimum yetkiler | Fail-closed güvenliği kadar geçerli ücretli üyeyi yanlış engellememe; service-role gizliliği ve browser'a sızmaması. |

Bu yetkili sandbox proje/secret/ürün eşleşmesi mevcut oturumda sağlanmış/doğrulanmış değil. Secret değerleri log'a veya PR'a konmamalı; repo dosyasına eklenmemeli. Canlı müşteri verisi sandbox'a kopyalanmamalı. Eksik sandbox testleri PASS değildir.

## GO için kalan kapılar

1. Doğru normal Premium variant'inin belgelenmesi ve sandbox'ta gerçek test-mode ücretli aktivasyonun erişim vermesi.
2. Ayrı Supabase/Auth/Storage sandbox'ında olumlu ve olumsuz erişim, mail callback/reset ve RLS kanıtları; resubscribe/eski bağ mutabakatı.
3. READY Preview'ya erişim ve gerçek erişilebilen akışların smoke testi.
4. Bu sonuçların incelenmesi ve kullanıcının yazılı yayın onayı.

**Yerel kod kalite kapısı GO; production yayını NO-GO.** Main ve production değiştirilmedi; canlı Supabase, müşteri, ödeme, SIM 5.0 ve XP kayıtlarına dokunulmadı. PR Draft olarak bırakılır.
