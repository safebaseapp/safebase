# Ana sayfa hero video ve metin onarımı

9 Kasım 2026. Başlangıç main: `9d0d7c2a61d0ddf6e0276e85681aad982b146ddb` (#151). Dal: `codex/home-hero-video-copy-repair`; önceki çalışma dosyaları korunarak ayrı worktree açıldı.

## Kök neden — gerçek medya ve geçmiş

- Orijinal MP4: H.264, 1280×720, 15,233 saniye. FFmpeg ile saniyelik kareler ve son kare incelendi: **videoda gömülü başlık yok**. [Kare dizisi](evidence/video-frames.jpg).
- `sernem-hero-refinery.png` ise SERNEM, “GLOBAL HSE KNOWLEDGE PLATFORM” ve İngilizce açıklamayı **piksel olarak içeriyor**. Poster yükleme/oynatılmama durumunda HTML başlığıyla çakışıyordu. Bu görsel bir HTML katmanı değildir.
- #149 (`faa31a8c`) hero scrim'i neredeyse opaklaştırarak eski poster metnini gizlemeye çalıştı; LABS değişiklikleri de içeriyordu. #150 (`7ae840be`) CSS/LABS görünümünü geri aldı. #151 (`9d0d7c2a`) yorumda filmde metin olduğunu varsayıp görünen HTML başlık/açıklamayı kaldırdı, h1'i sr-only yaptı ve CTA'ları alttaki şeride taşıdı. [Scrim geçmişi](evidence/history.json).
- Tüm ana sayfa geri alınmadı. Eski PNG/MP4 değiştirilmedi. MP4'ün ilk karesinden **yazısız WebP yükleme posteri** çıkarıldı; hero bu yeni URL'yi kullanıyor. Böylece eski PNG önbelleği de yeni poster URL'siyle karışmaz. Bu bir yeni tasarım veya üretilmiş rafineri resmi değildir.

## Dar düzeltme

Uygulamada yalnız iki dosya:

1. `app/app/[locale]/components/CinematicHome.tsx`: istenen TR/EN h1 ve açıklamalar, önceki mevcut heroContent/heroScrim düzeniyle geri getirildi. Araçlar, Risk Analizi ve Premium bağlantıları hero'da korunur. `premium_home_cta_click` ve fiyat metni aynıdır. #151'in ayrı CTA şeridi tekrar edilmez.
2. `app/public/images/sernem-refinery-hero-poster.webp`: orijinal filmden alınmış ilk kare, 77 KB. Kaynak komut:
   `ffmpeg -ss 0 -i app/public/videos/sernem-refinery-hero.mp4 -frames:v 1 -c:v libwebp -quality 85 app/public/images/sernem-refinery-hero-poster.webp`

HomepageMotion, homepage.module.css, page.tsx, navigasyon, SIM/LABS ve logo, Premium/hesap/analitik sistemleri değiştirilmedi. Video autoPlay/muted/loop/playsInline ve mevcut görünürlük/duraklatma/azaltılmış hareket mantığı aynı. `CinematicHome` içinde `<Sim5Showcase` başlangıcından dosya sonuna kadar içerik byte olarak aynıdır. [Hash ve kapsam kanıtı](evidence/scope.json).

## Yerel gerçek testler

[Tarayıcı sonuçları](evidence/browser.json): **26 PASS / 0 FAIL**, TR/EN × 320/390/768/1440 px ve iki yavaş-video/başlangıç azaltılmış-hareket senaryosu.

- currentTime artışı ölçüldü; autoplay niteliği tek başına kanıt sayılmadı. TR 390px örneği: **1,670 → 2,782 sn**.
- Gerçek video sona yakın konuma seek edilip normal hızda sona ulaştırıldı: süre **15,233 sn**, döngü sonrası **0,538 sn**, ended=false, paused=false. Sentetik medya olayı tetiklenmedi.
- Duraklatma: **0,570165 → 0,570165 sn** sabit; devam: **1,280272 sn**. Sekiz dil/genişlik kombinasyonunda geçti.
- Azaltılmış hareket tercihiyle video durur; yavaş yüklemede poster + görünür tek HTML başlık/açıklama gösterilir. Yeni poster üzerinde gömülü metin yoktur. [Yükleme/reduced-motion ekranı](evidence/en-390-loading-reduced.png).
- Başlık/açıklama tam metin, tek h1, üç CTA href'i, içerik kutularının çakışmaması ve yatay taşma kontrol edildi. Görsel inceleme masaüstü ve mobilde okunabilirliği doğruladı; fotometrik/WCAG sertifikasyonu iddia edilmez.
- Gerçek PremiumGrowthLink tıklaması yerel bellek spy'ında **bir** `premium_home_cta_click` / `{funnel:"premium"}` olayı verdi. GA4'e gerçek test olayı gönderilmedi. Testte navigasyon engellenip href ayrıca doğrulandı; ücretli abonelik/checkout E2E yapılmadı.
- SIM vitrini/LABS için ayrı TR/EN sunum smoke'u ve aynı kaynak hash'leri. Bu, SIM/WebGL oyun E2E testi değildir. Sonuç: [sections.json](evidence/sections.json).

Görseller: [TR mobil](evidence/tr-390-playing.png), [EN masaüstü](evidence/en-1440-playing.png); diğer genişlik/dil ekranları evidence/ altında. Firefox/Safari, fiziksel iOS/Android ve gerçek kullanıcı autoplay politikası **NOT TESTED**.

## Derleme kapıları ve yayın kararı

| Kontrol | Sonuç |
|---|---|
| TypeScript | PASS; npx tsc --noEmit ve yerel fixture build TypeScript aşaması |
| Değişen TSX için ESLint | PASS, 0 hata / 1 önceden mevcut kullanılmayan ArrowRight uyarısı |
| Normal npm run build | BLOCKED/FAIL: Google Fonts Geist/Geist Mono ağ erişimi. İlk sandbox çalışma ilerlemediği için kesilip izinli normal tekrar yapıldı; tekrar font hatası verdi |
| Yerel production-mode Webpack/font fixture build | PASS; gerçek Next paketindeki Geist fontları yalnız test komutunun response fixture'ında kullanıldı. Uygulama/env/deployment ayarı değiştirilmedi. Normal build yerine PASS sayılmaz |
| Preview E2E / son SHA READY | NOT VERIFIED; uzak teslim durumu DELIVERY.md içinde |
| www.sernem.com/TR-EN production testi | NOT TESTED; salt okunur /tr isteği CONNECT 403. Uzak erişim kaydı evidence/live-access.log |
| Main merge / production dağıtımı | YAPILMADI; gerekli Preview/normal build/uzak kabul koşulları sağlanmadan ilerlenmez |

**Yerel hero düzeltmesi testlerden geçti; yayın kararı NO-GO / bloke.** Kullanıcının koşullu merge/yayın talebi geçerlidir; fakat doğrulanamayan kapılar başarılı sayılmadığı için merge veya production deploy yapılmaz. PR/son commit/uzak durum DELIVERY.md içinde açıkça belirtilir.

Tekrar: kurulu app ve tools/sim5-review Playwright bağımlılıklarıyla `node tools/hero-repair/browser.mjs`; BASE varsayılanı loopback 4270, HERO_PLAYWRIGHT_MODULE ile kurulu modül yolu seçilebilir. `sections.mjs` sunum smoke'u, `scope.mjs` kaynak koruması. Yerel fixture Supabase bağlantısı yalnız 127.0.0.1:54530'da GET, yazma yok; canlı kullanıcı verisi kullanılmadı.
