> **Güncel toplu revizyon:** [FINAL-REVISION.md](FINAL-REVISION.md), renk ve teknik kalite talimatları 6416069898 / 6416174058 için son kayıttır. Önceki logolu fixture sonucu yeni başlık/dil/PDF kontrolleriyle değiştirilmiştir; bu dosya tarihsel kanıttır.

> **Son revizyon:** [READABILITY.md](READABILITY.md) ve `readability/` kanıtları, yorum 6414234906 kapsamındaki ikon, etiket ve gerçek A4/A3 punto sonuçları için güncel kaynaktır. Bu dosya tarihsel rapor olarak korunur.

> **Son teknik kabul güncellemesi:** [ACCEPTANCE.md](ACCEPTANCE.md) bu tarihsel audit’in kaldırılan sayısal limitler ve son test/Preview durumuna ilişkin bölümlerini günceller. OSHA asgarileri kapsam ve alternatifleriyle geri eklenmiştir; kaynak erişimi doğrulanmış sayılmaz.

# SERNEM Paket 13 — Poster Teknik Bütünlük ve Yayın Kalitesi

## Yönetici kararı

**GO: Draft PR incelemesi. NO-GO: production yayını.** 15 posterin TR/EN içeriği ve aktif şablonu denetlendi; doğrulanmış yanlış varsayılan eşleştirmeler, iki baskı yerleşim sorunu ve somut terminoloji/anlam hataları düzeltildi. Resmî kaynakların güncel tam metni ağ tünelinde 403 nedeniyle alınamadı. Bu çalışma mevzuat onayı, sertifikasyon veya uzman imzası değildir. Sayısal gereklilikleri yayımlamadan önce yetkin HSE incelemesi ve yerel uygulanabilirlik doğrulaması gerekir.

## Güvenli başlangıç ve rollback

- Başlangıç main HEAD, fetch ve `ls-remote` ile doğrulandı: **`ef556c9517ee8b732e7013f306351219aedfc1a0`**.
- Bağımsız dal: `codex/sernem-p13-hse-poster-quality`.
- Yerel rollback dalı: `backup/sernem-p13-main-20261026`.
- Tam geçmişli bundle: `/tmp/sernem-p13-main-20261026.bundle`; `git bundle verify` PASS. Hash ve 82 korunan modül: [baseline.json](baseline.json).
- Paket 11 PR #115'ten commit/kod taşınmadı. Main'de zaten yayımlanmış #120/#125 yeniden oluşturulmadı. Aktif yol `posters/[slug] → PosterBrandingCanvas → posters-v4/PosterMasterV4`; kullanılmayan eski Master/backup dosyaları değiştirilmedi.
- Ödeme, auth, Premium yetki kodu, Supabase/schema/RLS, SIM/XP, canlı veri ve deployment ayarları değişmedi. Toolbar, branding canvas, erişim yardımcıları, QR dosyaları, ikon çizimleri ve sayfa print ölçüleri korundu. Normal build'in tekrar ürettiği 280 toolbox PDF değişikliği PR'a alınmadı.

## Doğrulanmış kök nedenler ve düzeltmeler

1. **Header'da yanlış default:** Yedi özel poster dışındaki kodlar EN 361 / EN 365 / EN 795 ve genel OSHA 1926 etiketlerini alıyordu. Housekeeping, kimyasal, forklift ve elle taşıma gibi konulara düşüş koruması standardı gösteriliyordu. Artık kod başına açık kaynak/scope kaydı var; bilinmeyen kod görünür “teknik tanım eksik” durumuna düşer, yüksekte çalışma standardı devralmaz.
2. **PreJob default'u yüksekte çalışmaydı:** Housekeeping gibi konular kurtarma planı, hava koşulları ve alt alan izolasyonunu alıyordu. Her kodun yedi konuya özel TR/EN kontrol maddesi tanımlandı. Kurtarma WAH/kapalı alan, hava/zemin koşulları ilgili saha bağlamında tutulur; genel bir zorunlu liste değildir.
3. **Sahte doğrulama izlenimi:** Header `Verified 2026`, Footer `Verified • Pro Series • 2026`, genel ISO 45001 etiketi ve 30 saniye kontrol rozeti kaldırıldı. Yerine tarafsız saha doğrulaması/prosedür kontrolü ifadeleri var. Uydurma inceleyen, onay veya tarih yok.
4. **PPE eşleştirmeleri:** İndekse ve genel standarda dayalı etiketler (örneğin ladder/scaffold için varsayılan EN 361, kimyasal/solunum veya LOTO'da yanlış ürün standardı sıraları) kaldırıldı. Her posterin gerçek beş PPE satırına karşılık gelen görev/tehlike/uyumluluk notları var. Ürün standardı ve sınıfı üretici/saha değerlendirmesinde doğrulanır; genel EN/ISO sertifika listesi üretilmez. Ladder/scaffold kemerinin uygun ankraj ve tasarlanmış sistem gerektirdiği, kimyasal solunum korumasının seçim/sağlık/uyum değerlendirmesi gerektirdiği açıklanır. PPE yangın dumanına veya kapalı alana giriş izni sayılmaz.
5. **Sayısal bağlam kaybı:** Ana sorun rakamların her ülkede/her ekipmanda tek ve yeterli gereklilik gibi görünmesiydi. Güncel kaynağı alınamayan zorunlu rakamlar aşağıdaki gibi yeniden bağlandı; yerine yeni rakam uydurulmadı.
6. **TR/EN anlam farkları:** LOTO Türkçe “yayları serbest bırak” yerine güvenle sabitle/boşalt; elle taşımada “DÖNEREK BURULMA” yerine “GÖVDENİ BURMA”; forklift rampasında yalnız ani dönüş yasağı yerine dönüş yapmama ve yükü eğim yukarısında tutma; kapalı alanda gerekli ventilasyon kaybında yalnız yeniden değerlendirme yerine tahliye; housekeeping'de eğitim dışı kimyasal dökülmeye müdahale etmeme. `spill kit`, `spotter`, `tether`, `exclusion zone`, `toe board` için anlaşılır TR karşılıkları kullanıldı. Geçerli başlıklar ve sekiz kural yapısı korunur.
7. **Gerçek baskı kusurları:** Başlangıçta TR PPE'nin “Yüksek Görünürlüklü Giysi” metni A4/A3'te sağdan taşıyordu. Dar hücrede güvenli satır kırma sağlandı. Ayrıca mevcut ölçekli iç panel sağ sınırı yaklaşık 8 px aşıyordu; `PosterMasterV4` iç genişliğinde iki taraftaki 16 px boşluk ölçeğe dahil edildi. Dış A4/A3 ölçüleri ve 0.92 ölçek aynı; yeni test iki kenarı ve bütün metin sınırlarını doğrular.
8. **Tip kaçışları:** Poster tanımlarının kullandığı mevcut konu ikon aileleri `PosterRule` tipinde yoktu; 56 `as any` ile geçiliyordu. Mevcut `hsk/exc/chm/flt/mh/do/ladder` aileleri tipe eklendi ve kaçışlar kaldırıldı. Bütün ikon değerlerinin başlangıçla aynı olduğu test edildi; ikon çizimleri/dispatch'i değiştirilmedi. Eski çekirdek ikon sözlükleri ve yedek dosyalarla tip uyumu korundu.

## 15 poster × TR/EN denetim matrisi

Her satırda başlık/slogan, sekiz kural, beş stop kriteri, beş PPE satırı, yedi iş öncesi kontrol ve kaynak/scope iki dilde incelendi. Ayrıntılı envanter ve kontrol maddeleri [content-results.json](content-results.json); önceki tam tanımlar [definitions-before.json](definitions-before.json).

| Kod / konu | Somut sonuç | Kaynak hedefi ve kapsamı — güncel metin **doğrulanmadı** |
|---|---|---|
| WAH — Yüksekte çalışma / Working at height | Kurtarma/kollektif koruma korunur; koşulsuz 22,2 kN/kişi kaldırıldı, yetkin tasarım/üretici kapasitesi istenir | OSHA 1926.501/.502 — ABD inşaat |
| LAD — Merdiven / Ladder | Konuya özel kurulum/zemin/elektrik/erişim; yaklaşık 4:1 ve 0,9 m genel zorunluluk yerine üretici kurulumuna yönlendirme; kemer dipnotu ve tırmanırken üç nokta açıklığı | OSHA 1926.1053 — ABD inşaat |
| HSK — Düzen ve temizlik / Housekeeping | Yanlış düşüş referansı ve kurtarma/hava default'u kaldırıldı; çıkış, dökülme, atık, istif kontrolleri; kimyasal müdahalede eğitim sınırı | OSHA 1910.22 / 1926.25 — ABD genel endüstri/inşaat |
| EXC — Kazı / Excavation | Hat/zemin/iksa/erişim/su/atmosfer kontrolleri; sayısal derinlik/mesafe kartları koşulsuz genelleme yapmaz | OSHA 1926.651/.652 — ABD inşaat |
| CHM — Kimyasal / Chemical | SDS/uyumluluk/maruziyet odaklı; kimyasal eldiven geçirgenliği, giysi, ayakkabı ve solunum notları doğru satırlarla eşleşir | OSHA 1910.1200 — ABD genel endüstri; ek madde maruziyet standartları ayrıca doğrulanmalı |
| FLT — Forklift | Operatör/kapasite/yaya kontrolleri; rampa ve yük yönü açıklığı; yanlış harness default'u yok | OSHA 1910.178 — ABD genel endüstri |
| MH — Elle taşıma / Manual handling | Anlam hatalı TR slogan düzeltildi; mekanik yardım, rota, kavrama ve kişisel yeterlilik; keyfî kg sınırı yok | HSE Manual handling — Büyük Britanya rehberi; OSHA 1910.176 ergonomi limiti gibi sunulmaz |
| DO — Düşen cisim / Dropped objects | Alet/malzeme sabitleme, alt alan ve koordinasyon; uygunluğu belirsiz “onaylı tether” ifadesi iş/yük uyumuna bağlandı | OSHA 1926.501(c)/.502(j) — ABD inşaat |
| SCF — İskele / Scaffold | Kendi kontrol listesi ve risk bazlı PPE; 4× tasarım yükü kullanım kapasitesi gibi görünmez; platform için onaylı istisna bağlamı | OSHA 1926.451 — ABD inşaat |
| HW — Sıcak çalışma / Hot work | Gözcü/yanıcı/söndürücü kuralları korunur; iş sonrası süre izin/prosedür/risk sürmesine bağlı; EN'de “30 DK” yok | OSHA 1910.252 — ABD genel endüstri |
| CS — Kapalı alan / Confined space | Oksijen/yanıcı/toksik sınırlar doğrulanmış giriş iznine bağlı; bilinmeyen/limit alarmında tahliye; gerekli ventilasyon kaybında tahliye; alana uygun kurtarma | OSHA 1910.146 — ABD genel endüstri; inşaat kapalı alan kuralları yerine geçmez |
| EL — Elektrik / Electrical | İlgili kontrol ve uygun gerilim/ark değerlendirmesi; canlı–ölü–canlı test panelleri korunur; keyfî 0 V kartı tek güvenlik kanıtı gibi sunulmaz | OSHA 1910.333/.334 — ABD genel endüstri |
| LOTO | İzolasyon/kişisel kilit/doğrulama korunur; TR yay kontrolü düzeltilir; KKD enerji türüne bağlı | OSHA 1910.147 — ABD genel endüstri |
| FIRE — Yangın / Fire | Alarm/tahliye/yalnız yetkili başlangıç yangını yaklaşımı korunur; tüm ülkelere genellenen mesafe/eğitim/bakım kartları yok; sınıf yerine yakıt ve elektrik riski | OSHA 1910.38/.39/.157 — ABD genel endüstri; ulusal yangın sınıfları aynı sayılmaz |
| PPE — KKD / PPE | Uygun mevcut kurallar korunur; genel “her görevde zorunlu” standart izlenimi yerine risk/uyum/üretici; TR uzun PPE metni baskıda düzeltilir | OSHA 1910.132 — ABD genel endüstri |

## Henüz doğrulanmamış rakamlar ve standartlar

Doğrudan OSHA/HSE sayfalarına sekiz bağımsız istek ve OSHA ankraj sayfasına yükseltilmiş tekrar denemesi ağ tünelinde 403 verdi. Güncel tam metin/edisyon/istisna doğrulaması **NOT VERIFIED**; kaynağa link koymak doğrulandığı anlamına gelmez. Diğer hedefler için de doğrulama iddiası yok. [sources.json](sources.json).

| Eski sunum | Final yaklaşım / açık inceleme |
|---|---|
| 1,8 m düşüş eşiği; 22,2 kN/kişi; “100%” | Farklı çalışma türü ve tasarım yaklaşımına tek sınır uygulanmaz; yetkin tasarım/üretici/yerel kural doğrulaması gerekir |
| Yangın 22,9 m / 15,2 m, aylık/yıllık kartlar | Yerleşim, yakıt/yangın sınıfı ve uygulanabilir bakım/eğitim programı; ülke ve kullanım kapsamı ayrıca doğrulanır |
| Sıcak çalışma 10,7 m ve en az 30 dk | Yanıcıları uzaklaştır/koru; izin/prosedür süresi ve risk sürdükçe gözetim; güncel OSHA/NFPA/yerel politika birbirine eşit sayılmaz |
| İskele 4×, 2,5 cm ve 0,6 m | Tasarım/kullanım kapasitesi ve platform/erişim gerekliliği ayrılır; istisnalar ve güncel kaynak uzman incelemesine açık |
| Kazı 1,22 / 0,61 / 1,52 m | Toprak, tasarım, erişim ve yetkin kişi kontrolü; istisna/ölçüm bağlamı olmadan otomatik onay yok |
| Kapalı alan 19,5–23,5% O₂, <10% LEL | Bu rakamlar tek başına giriş güvenliği değildir; doğrulanmış izin, toksik sınırlar, atmosfer ölçümü ve bilinmeyende tahliye gerekir |
| Merdiven 4:1, 0,9 m / 3 ft | Üreticiye ve merdiven kullanımına uygun kurulum/üst seviyeye erişim; sayısal çeviri veya genel yasal eşdeğerlik iddiası yok |
| EN/ISO/IEC ürün standartları | Bu oturumda edisyon/koruma sınıfı/ürün uygunluğu doğrulanmadı. Kör indeks listeleri çıkarıldı; risk ve üreticiye göre seçim notları kondu. EN/ISO, OSHA veya TR mevzuatı yerine geçirilmez |

Üç nokta temas gibi sahada kullanılan kontrol yöntemleri korunur; bunlar yeni bir yasal ölçüm limiti veya sertifikasyon iddiası değildir. Türkiye için doğrulanmamış mevzuat numarası eklenmedi.

## Sürdürülebilir yapı

`app/lib/posters-v2/technical-profiles.ts` her kod için `reference`, yedi `preJob`, dört `controls`, beş `ppeSelection`/ikon, `ppeNote` ve açık `reviewStatus` taşır. Kaynak kaydında kurum, URL, yargı/kapsam ve `not-verified-in-session` durumu bulunur. Tarih veya uzman adı kendiliğinden oluşmaz. Header, PreJobStrip, BottomPanels ve Master aynı veriyi tüketir; bilinmeyen kod başka posterin standardını alamaz. İki dilde eksik alan, indeks adedi, konu kapsamı veya yeni/eksik kod CI'ye uygun içerik testinde yakalanır.

## Kalite kapısı — gerçek sonuçlar

| Kontrol | Sonuç | Kanıt ve sınır |
|---|---|---|
| TypeScript | **PASS** | Normal build'in tip adımı + bağımsız `tsc --noEmit` |
| İlgili ESLint | **PASS**, 0 hata / 2 mevcut uyarı | Başlangıç 56 `no-explicit-any` hatası / 3 uyarı; final 0 / 2. İki kalan uyarı mevcut Header `<img>` kullanımı; erişim/logo davranışı değiştirilmedi. Tüm repo lint temizliği iddiası yok |
| İçerik/kaynak kapsamı/koruma | **36 PASS** | [content-results.json](content-results.json); 30 dil kontrolü, 15 kod kapsamı, yanlış default ve sahte badge yok, bilinmeyen kodlar ve 82 korunan hash |
| Normal production build | **PASS** | Prebuild polish/PDF/download QA atlanmadı; [verification.json](verification.json) |
| Mevcut Toolbox PDF QA / download-auth QA | **PASS** | 70 konu TR/EN standard + 4 sayfalık branded-base kontrolleri ve mevcut source gate. Bu poster oturum/Premium testi yerine sayılmaz |
| Poster A4/A3 | **60 PASS** | 15 × TR/EN × A4/A3; her biri tek sayfa ve doğru boyut, bütün metinler poster içinde, iki iç kenar boşluğu doğrulanır. [after-browser.json](after-browser.json) |
| Responsive | **120 PASS** | 15 × TR/EN × 320/360/390/1440; belge yatay taşmaz, mevcut yatay kaydırmalı poster bölgesi ve kontroller korunur |
| PDF QR/metin/kodlama | **60 PASS** | Her final PDF rasterinden QR çözülür; doğru locale URL'si, başlık/Türkçe karakterler, sayfa içi metin kutuları, hash. [pdf-results.json](pdf-results.json) |
| Yetki/logo/print mantığı | **13 PASS — fixture** | Gerçek, değiştirilmemiş toolbar/canvas/auth predicate, sentetik guest/free/Premium/Admin/suspended/missing-logo; [actions-results.json](actions-results.json) |
| Gerçek hesap, Supabase storage/RLS, gerçek imzalı URL | **NOT TESTED** | Canlı müşteri veya ödeme verisi kullanılmadı; fixture gerçek yetkilendirme testi değildir |
| PNG | **Mevcut UI'de yok / NOT APPLICABLE** | Aktif toolbar zaten PDF, logolu Premium ve Yazdır sunuyor. Yeni PNG işlemi veya yeni download gate eklenmedi |
| Fiziksel yazıcı / gerçek telefon kamerası / saha uygulaması | **NOT TESTED** | Headless Chromium baskısı ve QR decode fiziksel doğrulama yerine geçmez |
| Güncel resmî kaynak metni / yerel hukuki uygunluk | **NOT VERIFIED** | Ağ engeli; uzman/kurumsal onay uydurulmadı |

Başlangıç 60 PDF boyut/sayfa testi geçti; iki TR PPE çıktısında metin taşması ayrıca kaydedildi. İlk test kodundaki CSS uppercase karşılaştırması ve izole fixture içinde Next history müdahalesi düzeltildi; geçersiz ilk harness denemeleri uygulama başarısı sayılmadı. Son sonuç dosyaları tamamlanan build üzerinde çalışan son turdur. Screenshot scroll artefaktı yerine karşılaştırma PNG'leri gerçek browser PDF'lerinden deterministik rasterdir; kaynakları başlangıç/final PDF'leridir.

### Önce / sonra ve çıktı örnekleri

| Konu | TR A4 | EN A4 |
|---|---|---|
| Housekeeping | [Önce](before-tr-housekeeping-safety-rules.png) / [Sonra](after-tr-housekeeping-safety-rules.png) | [Before](before-en-housekeeping-safety-rules.png) / [After](after-en-housekeeping-safety-rules.png) |
| Yüksekte çalışma | [Önce](before-tr-working-at-height-rules.png) / [Sonra](after-tr-working-at-height-rules.png) | [Before](before-en-working-at-height-rules.png) / [After](after-en-working-at-height-rules.png) |
| Kimyasal | [Önce](before-tr-chemical-safety-rules.png) / [Sonra](after-tr-chemical-safety-rules.png) | [Before](before-en-chemical-safety-rules.png) / [After](after-en-chemical-safety-rules.png) |

[15 TR çıktı genel görünümü](after-tr-overview.jpg) · [15 EN çıktı genel görünümü](after-en-overview.jpg). Genel görünüm yakın metin incelemesi yerine geçmez. **Test kapsamı örnek değil, 60 çıktının tamamıdır.** PR'daki örnek PDF'ler yalnız dosya boyutunu sınırlamak içindir; tüm üretilen PDF'ler `/tmp/p13-after/`, her birinin hash/QR/metin sonucu JSON'dadır.

## Çakışma ve sonraki paket

Açık PR'ların dosyaları karşılaştırıldı; [collision-results.json](collision-results.json). #122 dahil güncel açık PR'larla kesişen dosya **0**. #115 kodu taşınmadı, hiçbir eski PR kapatılmadı/değiştirilmedi. Henüz tanımlanmamış sonraki paketin çakışmayacağını garanti etmek mümkün değildir; poster şablonu, `types.ts` ve `technical-profiles.ts` sonraki poster paketleri için koordinasyon noktalarıdır.

## İnceleme sonrası gerekenler

1. Yetkin HSE kişi güncel OSHA/HSE ve uygulanabilir yerel mevzuatı kaynak metniyle doğrulasın; gerekiyorsa konuya özel sayısal sınırları kapsam/istisna/birimle birlikte onaylasın.
2. Üretici/ürün standardı edisyonu, koruma sınıfı ve gerçek görev uygunluğu kurum tarafından doğrulansın. Bu posterler çalışma izni veya eğitim yerine geçmez.
3. Ayrı sandbox sağlanırsa gerçek üye/Premium/suspended/storage ve imzalı logo erişimi doğrulansın; canlı müşteriyle test yapılmasın. Gerçek A4/A3 yazıcı ve telefon QR denemesi ayrıca yapılsın.
4. Kullanıcı içerik ve görsel kanıtları inceleyip yayın için ayrıca onay versin. Merge, production ve otomatik deploy yapılmaz; commit'lerde skip işaretleri kullanılır, deployment ayarı değiştirilmez.

## Tekrar çalıştırma

```sh
node tools/p13-review/content.mjs
P13_PHASE=after P13_URL=http://127.0.0.1:4203 node tools/p13-review/browser.mjs
P13_URL=http://127.0.0.1:4203 node tools/p13-review/actions.mjs
python3 tools/p13-review/pdf.py
npm --prefix app run build
```

Build bitmeden aynı `.next` dizinini kullanan tarayıcı sunucusunda test çalıştırmayın. Testler yalnız localhost GET ve bellek içi fixture'ları kullanır; gerçek auth/database/storage/analytics yazması yoktur. Build sonrası `app/public/downloads` üretilen farkları stage edilmez. `content.mjs` baseline lint dosyalarını git SHA'dan geçici dizine çıkarır; ayrı eski kurulum varsaymaz. PDF karşılaştırma resimleri için önceki 60 PDF bu oturumda `/tmp/p13-before/` altındadır; yeni ortamda başlangıç SHA ayrı checkout'ta build edilerek yeniden üretilebilir.

Örnek çıktı dosyaları: [TR Housekeeping A4](sample-tr-housekeeping-a4.pdf), [EN Height A3](sample-en-height-a3.pdf), [TR PPE A3](sample-tr-ppe-a3.pdf), [EN Chemical A4](sample-en-chemical-a4.pdf).

## Değişen uygulama dosyaları

- `app/components/posters-v4/BottomPanels.tsx`
- `app/components/posters-v4/Footer.tsx`
- `app/components/posters-v4/Header.tsx`
- `app/components/posters-v4/PosterMasterV4.tsx`
- `app/components/posters-v4/PreJobStrip.tsx`
- `app/lib/posters-v2/chemical-safety.ts`
- `app/lib/posters-v2/confined-space.ts`
- `app/lib/posters-v2/dropped-objects-safety.ts`
- `app/lib/posters-v2/excavation-safety.ts`
- `app/lib/posters-v2/forklift-safety.ts`
- `app/lib/posters-v2/hot-work.ts`
- `app/lib/posters-v2/housekeeping-safety.ts`
- `app/lib/posters-v2/ladder-safety.ts`
- `app/lib/posters-v2/loto.ts`
- `app/lib/posters-v2/manual-handling-safety.ts`
- `app/lib/posters-v2/scaffold.ts`
- `app/lib/posters-v2/technical-profiles.ts`
- `app/lib/posters-v2/types.ts`
- `app/lib/posters-v2/working-at-height.ts`
