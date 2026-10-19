# SIM 5.0 — yön ve mobil giriş güvenilirliği

Taban: `feature/sim5-mobile-controls-direction-fix-20261019`, `4f9ddde`.
Çalışma dalı: `codex/sim5-mobile-input-reliability`.

## Bulgular ve düzeltmeler

Taban dal sağ vektörünü `forward × worldUp` ile düzeltmişti, fakat sol/sağ oklar
hâlâ yaw değiştiriyordu. Oklar artık A/D ile aynı ekrana göre strafe davranışını
kullanır. Kamera dönüşü sahneyi sürükleyerek yapılır. Sağ/sol hareket dört farklı
yaw açısında gerçek kameranın ekran-sağ vektörüne projeksiyonla test edildi;
yalnızca bir başlangıç açısının dünya koordinatları kontrol edilmedi.

Klavye ve her pointer ayrı kaydedilir; aktif hareket girdisi bunların birleşimidir.
Bir parmağı veya fareyi bırakmak aynı yöndeki diğer girdiyi iptal etmez.
Reset, mode switch, blur, görünürlük kaybı ve viewport resize girişleri temizler.
Reset sonrası eski fiziksel tuşun auto-repeat olayları yeni basış sayılmaz.
Kamera drag'i kendi pointer kimliğini takip eder; hareket parmağını kaldırmak
ikinci parmağın kamera drag'ini bitirmez. Pointer up, cancel ve capture loss
hem kontrol elemanında hem pencere seviyesinde karşılanır.

Chromium mobilde kamera drag'inden hemen sonraki dokunuşta pointer up üretip
compatibility click'i atlayabiliyor. İnceleme butonları geçerli touch/pen bırakma
olayında çalışır; sürükleme/cancel eylem sayılmaz. Dokunma sonrası compatibility
click tekrar işlenmez. Fare tıklaması ve klavye/erişilebilirlik click'i korunur.

Dört yönlü D-pad korunur. Dar ekranlarda inceleme butonu üst sağda, D-pad alt
soldadır. Buton kutuları sınırlarıyla birlikte ölçülür ve en az 44 CSS px'tir.
Mobilde klavye metni yerine basılı tutma ve sürükleme yönergesi gösterilir.
Aşağıdaki inceleme butonu erişilebilir fallback olarak korunur.

## Mobil kalite

Desktop ve üç mobil boyutta aynı modeller, mesh ve verteks sayıları, kaynakçı
materyalleri, antialiasing, tone mapping/exposure ve 2048² shadow map kullanıldı.
DPR 2 cihazlarda iki tarafta da mevcut 1,8 pixel-ratio tavanı korunur. Yeni bir
mobil LOD, model çıkarma, texture azaltma veya gölge kapatma yoktur.
Portre/yatay canvas yüksekliği responsive; yatay scroll ve kontrol çakışması
ölçümlerinde hata yoktur. Görüş oranı cihazın canvas oranına doğal olarak uyar.

`WeldingOperation.ts`, `LiftingOperation.ts`, üç GLB, uygulama bağımlılıkları ve
HSE soruları değiştirilmedi. Kaynak teması, siper, kablolar, söndürücü, renkler,
vinç/sapan/boru ve bariyerler regresyon paketinde yeniden çalıştırılır.

## Doğrulama

- [80 kontrol testi ve mobil kalite ölçümleri](controls-results.json).
- [Lint taban karşılaştırması](lint-comparison.json): yeni tanı yok; mevcut
  16 `no-explicit-any` hatası sürüyor, uyarı sayısı 4'ten 3'e düştü. Dosyanın
  ESLint komutu bu eski hatalar nedeniyle hâlâ nonzero döner; lint temiz
  gösterilmedi veya kurallar kapatılmadı.
- TypeScript `--noEmit` ve yerel `next build` kontrolü.
- Kaynak/tesis/HSE ve renk/kaldırma regresyonları ayrıca çalıştırılır.

Tekrarlama:

```sh
npm ci --prefix tools/sim5-review
npm --prefix tools/sim5-review run test:controls
npm --prefix tools/sim5-review run test:all
cd app
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/next build
```

Build doğrudan Next ile çalıştırılır; `npm run build` prebuild adımı PDF
varlıklarını yeniden yazdığı için bu UI doğrulamasında kullanılmadı.

## Gerçek render kanıtları

- [Masaüstü](controls-desktop.png)
- [320×568 küçük portre, TR](controls-small-portrait.png)
- [390×844 portre, EN](controls-portrait.png)
- [844×390 yatay, TR](controls-landscape.png)

## Kalan sınırlar

Mobil doğrulama Chromium/SwiftShader emülasyonudur; fiziksel Android/iOS cihazı,
Safari ve düşük donanım FPS/pil tüketimi ölçülmedi. Auth içeren tam Next sayfası
Supabase üzerinden E2E test edilmedi; fixture gerçek `RealModels` bileşenini ve
sayfanın yatay padding sınırını kullanır. Kamera/giriş güncellemesi gerçek
uygulama döngüsünde çalışır; test renderer'ı GPU maliyeti için yalnızca istenen
kareleri çizer. Production'da render döngüsüne test kısıtlaması eklenmedi.
Production'a deploy veya merge yapılmadı.


Sonuç: **80 giriş/mobil kontrolü + 75 kaynak, kaldırma, materyal ve HSE regresyon
kontrolü geçti**. İki regresyon raporu:
[kaynak/tesis 28 kontrol](welding-regression-results.json),
[renk/kaldırma 47 kontrol](lifting-color-results.json).
[Komut durumları ve değişmeyen varlıklar](validation.json) kayıt altındadır.
`next build` exit 0 ile tamamlandı; mevcut admin/content → next.config NFT izleme
uyarısı sürüyor. Uygulama operasyon modülleri ve GLB'ler taban commit ile SHA-256
üzerinden karşılaştırılarak değişmediği doğrulandı.
