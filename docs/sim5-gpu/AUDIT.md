# GPU follow-up — Issue #123 / Draft PR #122

## Türkçe karar

**NO-GO: gerçek kullanıcı cihazında akıcılık henüz onaylanmadı.** Kullanıcının CPU düzeltmeli `87fd75d3` READY Preview'da kasmanın devam ettiği bildirimi kabul edildi. Bu paket GPU çizim yükünü gerçekten azaltır; yazılımsal test sonucu kullanıcı gözlemini geçersiz kılmaz. Main/production, ödeme, Premium/auth, Supabase, XP ve görev sistemleri değiştirilmedi. PR #122 aynı dalda Draft kalır; #121/#123 otomatik kapatılmaz.

Başlangıç `87fd75d302471ba1f03340fe7ba93b28b5cbf405`; dal `codex/sim5-demo-navigation-performance`. CPU/navigasyon optimizasyonu aynen korunur. Uygulama değişikliği yalnız `RealModels.tsx` ve SIM'e özel `RenderPerformance.ts`.

## Ölçülen GPU yükü

İlk ayrıştırma eski SHA kaynaklarını gerçek Three/GLB sahnesinde rasterize etti: kaynak/yol/kaldırma/dönüş, aynı 1280×900 viewport, cihaz DPR 2 ve renderer DPR 1,8. Gölge geçişi **886–908 çizim ve yaklaşık 2,627 milyon üçgeni her karede tekrar işliyordu**. Gölge haritasını yeniden kullanma ablation'ında bu geçiş sıfıra indi. DPR 1 ve 0,75 koşulları da ölçüldü; paylaşılan makine/ısınma etkisi nedeniyle zamanlar tekdüze ölçeklenmedi. [ablation.json](ablation.json)

GLB'ler ayrıca sayıldı: kaynak insanı 1.301.272 üçgen / 387 mesh; fabrika 280.705 üçgen / 45 mesh; tanklar 9.811 üçgen / 43 mesh. İnsan geometrisinin kaynak/gözcü kullanımındaki tekrarı hâlâ ana görünümde önemli maliyet. Geometriyi sadeleştirmek, insanı/ekipmanı kaldırmak, collision mesh'lerini gizlemek veya GLB değiştirmek bu küçük düzeltmeye dahil edilmedi.

### Uygulanan optimizasyon

- Sabit güneşin **2048² PCFSoft gölge haritası** her kare yeniden çizilmiyor. Gölge üreten mesh veya üst grubunun görünürlüğü, dünya matrisi veya pozisyon attribute sürümü değişince tekrar hesaplanıyor. Skinned/morph caster varsa her kare yenileniyor. Böylece HSE kontrolünün gizlediği/hareket ettirdiği ekipmanların gölgesi eski konumda kalmıyor; başlangıçta mutlaka harita üretiliyor.
- Yalnız emissive `weld-arc`, `weld-arc-halo`, milimetrelik `contact-spark` ve küçük düşen sızıntı damlalarının **solar shadow casting** özelliği kapatıldı. Bütün mesh'ler, malzemeler, renkler, ışık/ark/damla animasyonları ve görünürlükleri korunuyor. Bu parçacıklar güneş haritasını sürekli geçersiz kılmıyor. Kaynak insanı, eldiven/maske, yangın gözcüsü, kablolar, vinç/sapan/boru, tank, merdiven/korkuluk ve HSE işaretlerinin anlamlı gölgeleri korunuyor. Büyük GLB'lerin gölgeleri toptan kapatılmadı.
- Varsayılan `auto` başlangıcı DPR `min(native,1.5)`. Ölçülen p95 >28 ms iki 4 saniyelik pencerede sürerse DPR 0,15 azalır; >60 ms daha hızlı tetikler. Alt sınır `min(native,.85)`. Sürekli iyi p95 <19 ms sekiz pencere boyunca sürerse 0,1 artar; üst sınır eski `min(native,1.8)`. Gizli sekme/resize zamanlamayı sıfırlar; raporun kasıtlı düşük render frekansı kaliteyi düşürmez. Cihaz türüne göre karar verilmez; sürekli flip-flop yok.
- `high` eski DPR 1,8 tavanını korur; `balanced` 1,25, `low` 0,85. Antialias, tone mapping, gölge boyutu/filtrelemesi, oyun kameraları, hız, animasyon saati ve bütün görev davranışları aynı.

### Aynı cihaz/kalite A/B — ikinci geçiş

Aynı sahne ve yüksek DPR 1,8; **main + shadow** toplamı. Eski rapordaki otomatik resetlenen renderer sayaçlarıyla bire bir aynı sayaç tanımı değildir; bu tabloda shadow dahil açıkça sayılır. Zaman sütunu `gl.finish()` ile tamamlanan sentetik tek kare, **FPS veya gerçek donanım GPU zamanı değildir**.

| Bölge | Calls baseline → high | Üçgen baseline → high | Shadow calls | Tamamlanmış çizim ms |
|---|---:|---:|---:|---:|
| Kaynak | 1414 → 502 | 4201703 → 1574576 | 908 → 0 | 9,8 → 6,5 |
| Yol | 1220 → 316 | 3822048 → 1195161 | 904 → 0 | 9,2 → 2,6 |
| Kaldırma | 1134 → 248 | 2772767 → 146696 | 886 → 0 | 10,1 → 1,7 |
| Kaynağa dönüş | 1406 → 502 | 4201463 → 1574576 | 904 → 0 | 10,0 → 2,6 |

Kaynakta toplam çizim çağrısı yaklaşık **%64,5**, kaldırmada **%78,1** azalır; gölgeler yeniden gerektiğinde bir karelik shadow yükü geri gelir. İlk/ikinci geçiş ve bütün profillerin ham sonuçları [runtime-results.json](runtime-results.json), özet [measurement-summary.json](measurement-summary.json). Düşük DPR'nin belirli donanımda kaç FPS kazandıracağı bu ortamdan çıkarılamaz.

### Gerçek rasterize edilen RAF örnekleri

800×700, DPR 1, SwiftShader; `baseline` ve `high` için kaynak → yol → kaldırma → kaynak hedefleri iki kez, ayakta ve gerçek W girdisiyle hareketli bloklar olarak ölçüldü. Bölgeler arasında XZ fixture yerleşimi var; kesintisiz oyuncu yürüyüş rotası değildir. Her blokta sadece dört RAF aralığı; özellikle p95/p99 düşük örnek sayısıyla sağlam kabul istatistiği değildir. Diğer entegrasyon süreçleriyle örtüşme/paylaşılan bulut yükü nedeniyle **diagnostik**, yayın kabul testi değildir. `gl.finish()` bu RAF testinde kullanılmadı.

| İkinci geçiş, hareketli | FPS önce → sonra | p50 ms önce → sonra | p95=p99 ms önce → sonra | >50 ms / >100 ms (4 örnek) |
|---|---:|---:|---:|---:|
| Kaynak | 0,33 → 0,83 | 3016,6 → 1183,3 | 4133,2 → 1249,9 | 4/4 → 4/4 |
| Yol | 0,88 → 1,28 | 1116,7 → 783,2 | 1216,6 → 850,0 | 4/4 → 4/4 |
| Kaldırma | 3,20 → 11,43 | 316,6 → 83,3 | 316,7 → 100,0 | 4/4 → 4/0 |
| Dönüş | 0,49 → 0,84 | 1849,9 → 1200,0 | 2716,6 → 1216,6 | 4/4 → 4/4 |

Bu düşük yazılımsal FPS değerleri **oyuncu bilgisayarında akıcılık sağlandı** demek değildir. İlk/ikinci tur ve ayakta/hareketli ham kare aralıkları [raf-results.json](raf-results.json). Varsayılan Chromium da zorlayıcı GPU bayrağı olmadan SwiftShader döndürdü; donanım sürücüsü ve GPU timer query yok: [hardware-probe.json](hardware-probe.json). Gerçek donanım FPS, GPU timer query ve GC profili **NOT TESTED**.

## Cihazınızda panel ve A/B

Yalnız development veya `NEXT_PUBLIC_VERCEL_ENV=preview` derlemesinde **`?sim5Perf=1`** ile açılır. Production veya deployment kimliği eksik derleme kapalı kalır; hostname tahminiyle production gate aşılmaz. Parametre olmadan UI ve long-task observer yok. Preview üzerinde bu gate'in gerçekten açılması ayrı dağıtım kontrolü gerektirir; deployment kanıtı [PREVIEW.md](PREVIEW.md).

Panel: son 240 render RAF aralığından FPS/p50/p95/p99, >50/>100 ms sayıları ve örnek sayısı; ana + gölge çizim çağrısı/üçgen, shadow-pass çağrısı, DPR, 2048 gölge durumu, GPU adı varsa, bölge/mode ve JS long-task sayısı. GPU adı/long-task desteği yoksa açıkça unavailable/unsupported. `renderSubmitMs` CPU gönderimidir, GPU süresi diye sunulmaz. GC erişilebilir değil; JSON'da bu belirtilir. Bölge, yeni bir görev/konum yetkisi değil kamera XZ'sinden tanı etiketidir.

Profil seçicisinde `baseline` eski DPR/gölge ayarını ve parçacık shadow casting'ini geri getirir; `high` aynı DPR'de optimize gölge haritası kullanır. `auto/balanced/low` çözünürlük etkisini ayrıca karşılaştırır. Seçim/resize/sekme dönüşünde örnek pencereleri sıfırlanır. Panel dokunmatik/klavye kontrollerini yakalamaz; sadece kendi seçici ve kopyala düğmesi pointer alır. Kopyalama **yalnız anonim ölçümler**, izin verilen GPU bilgisi ve viewport içerir. Ağ, analytics, storage, hesap/oturum/API/XP verisi kullanılmaz.

Aynı cihaz, viewport ve güç profilinde önce `baseline`, sonra `high` seçip aynı köşe ve kesintisiz kaynak → yol → kaldırma → kaynak rotasını yürüyün. İlk ve ikinci turu ayırın. Her turda en az 10 saniyelik ayakta ve hareketli pencere toplayıp kopyalayın. Profili değiştirince yeni pencerenin dolmasını bekleyin; default `auto` ile de tekrarlayın. Eski CPU-only READY Preview (`87fd75d3`) karşılaştırması için `https://safebase-fljh4u8ea-safebaseapps-projects.vercel.app/tr/labs/sim5/demo` saklanır; **bu eski URL GPU düzeltmesini içeriyor diye sunulmaz**.

## Regresyon / kanıt

- DEMO TR/EN, 1280×1000, 320×568, 390×844, 844×390: **90/90**. İki bulgu, sonuç/yeniden başlatma, klavye/native dokunma, taşma ve guest yazmama. [regression/demo-results.json](regression/demo-results.json)
- EN masaüstü, TR dikey mobil, EN yatay mobil: **52/52**. Tam altı senaryolu yerel bileşen, kaynak/kaldırma ve HSE etkileri, tank duvarı, merdiven/üst bağlantı/köprü korkuluğu, çıkış/iniş, tuş bırakma, sonuç/replay. Mobil merdiven başlangıcında sadece XZ yerleşimi; Y değişikliği yok. Gerçek Premium/Supabase/XP sunucusuna bağlanılmaz. [regression/height-results.json](regression/height-results.json)
- WebGL yükleme/context-loss fallback ve bozuk sahnede start kilidi: **6/6**. [regression/webgl-failure-results.json](regression/webgl-failure-results.json)
- Render entegrasyonu: **10 kontrol**; debug flag/default, dört bölgede cached shadow 0, ekipman hareket/görünürlük invalidation, TR 320px panel genişliği ve anonim clipboard. [runtime-results.json](runtime-results.json)
- Saf politika/gate/histerezis/istatistik testleri: **13/13**. Production ve kimliği eksik derleme flag ile açılamaz, Preview/development açılır. İlk gölge, transform/görünürlük yenilenmesi, yavaş DPR düşürme/uzun toparlanma, raporda kalite sabitliği. [policy-results.json](policy-results.json)
- Aynı sahne/texture/kamera yüksek kalite önce/sonra PNG'leri: `baseline-*` / `high-*`. Tanı paneli ekran görüntüsü karşılaştırmasında gizlendi. Yol ve kaldırma piksel olarak aynı; kaynakta >10 kanal farkı %0,0029, dönüşte %0,0364 (kaynak arkı/partikül zamanlaması). Mesh/material/UV değişmedi. Kaynak ve kaldırma görsel olarak da incelendi. [visual-results.json](visual-results.json)
- TypeScript, değişen iki dosya ESLint ve **normal build/prebuild PASS**. PDF QA/download QA atlanmadı; prebuild'in ürettiği PDF farkları geri alındı. Koruma kontrolü bu farkları build sırasında reddetti, geri alma sonrası geçti. [checks.json](checks.json)
- Tam proje ESLint'in önceki **183 hata / 114 uyarısı** kapsam dışı ve aynı dosyalarda kaldı; tüm projeyi düzeltme/yeniden çalıştırma yapılmadı. Bu paketteki dosyalar temiz. Önceki tam log `../sim5-performance/eslint.log`.
- Bütün diğer app/assets/config dosyaları önceki SHA ile aynı; SiteNavigation, MissionState, SiteInspections, useMission ayrıca byte karşılaştırıldı. [protection.json](protection.json)

Tam fiziksel telefon/iOS/Android ve gerçek GPU akıcılık, gerçek kullanıcı Premium yetkisi/XP veya canlı bağlantı güvenliği **ÇALIŞTIRILMADI**. Yürüyüş kodu/listener/RAF sayısı değiştirilmedi; mevcut cleanup'a yalnız panel/observer/debug shadow wrapper temizliği eklendi. Derleme ve yeniden yükleme/context loss kontrolleri, bütün gerçek cihaz dispose/memory-leak stres testlerinin yerine geçmez. Render görüntüsü/kontrol regresyonu veya owner FPS testi başarısızsa yayın NO-GO kalır.

## Tekrar üretim

```sh
SIM5_REVIEW_BASELINE=87fd75d302471ba1f03340fe7ba93b28b5cbf405 node tools/sim5-gpu/profile.mjs
node tools/sim5-gpu/hardware-probe.mjs
node tools/sim5-gpu/policy-test.mjs
node tools/sim5-gpu/runtime-test.mjs
node tools/sim5-gpu/visual-check.mjs
node tools/sim5-gpu/raf-profile.mjs
SIM5_REVIEW_OUT=docs/sim5-gpu/regression node tools/sim5-review/height-test.mjs
node tools/sim5-review/demo-browser-test.mjs
node tools/sim5-review/webgl-failure-test.mjs
npm --prefix app run build
# Build-generated PDFs must be restored before this strict app-path check.
node tools/sim5-gpu/protection.mjs
```

Geri alma yalnız GPU commit'lerini aynı feature dalında revert etmektir; `87fd75d3` CPU düzeltmesi korunur. Main reset/merge veya production dağıtımı yapılmaz.

## English review summary

**NO-GO until real owner hardware validates smooth movement.** The owner reproduced severe stutter on the CPU-only READY Preview; that observation remains authoritative. This follow-up keeps the same Draft PR and branch and leaves navigation, missions, access/payment, Supabase and XP unchanged.

A static-sun shadow cache removes about 900 shadow draws / 2.63M repeated triangles per warm frame, invalidating on caster transforms, visibility and geometry-position revisions. Only tiny emissive sparks/arc and droplets stop casting solar shadows; their visuals and animations remain. All equipment, tanks, stairs, rails and HSE shadows remain. Adaptive DPR starts at min(native,1.5), decreases only after measured sustained poor frame times, and recovers slowly with hysteresis; high retains the original 1.8 cap and 2048 PCFSoft shadows.

At identical high quality, second-pass total draw calls change from 1414 to 502 at welding and 1134 to 248 at lifting. These are measured software-GPU workload savings, **not evidence of hardware FPS or a complete fix**. Actual rasterized RAF diagnostics and synchronized draw times are recorded separately; shared-machine noise, four samples per block and SwiftShader prevent performance acceptance claims.

The opt-in `?sim5Perf=1` panel is gated to development/Preview builds, exports anonymous in-memory metrics only, and offers baseline/high/auto/balanced/low A/B profiles. Production and unknown environment gates fail closed. DEMO 90, traversal/upper-platform 52, WebGL failure 6, render integration 10 and policy 13 checks pass. TypeScript, changed-file ESLint and normal build/prebuild pass; the pre-existing whole-project lint failures are not fixed. New deployment readiness and on-Preview panel validation are reported separately in PREVIEW.md and must not be inferred from the old READY URL.
