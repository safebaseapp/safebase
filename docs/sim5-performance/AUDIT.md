# Issue #121 — SIM 5.0 performans denetimi

## Karar

**Draft incelemeye hazır; canlı yayın için NO-GO.** Navigasyonun gereksiz mesh raycast yükü azaltıldı. Kullanıcının bildirdiği ciddi kaynak-alanı çıkış kasması gerçek donanımda yeniden üretilemedi; tamamen giderildiği iddia edilmiyor. Donanım hızlandırmalı masaüstü ve gerçek telefonlarda aynı güzergâhın önce/sonra FPS doğrulaması yayın öncesi gereklidir. Tam proje ESLint de mevcut kapsam dışı hatalar nedeniyle yeşil değildir.

Başlangıç/geri dönüş: `063a93d36c10262a7103c73a56fd6b2f7a98af79` (güncel main). Dal: `codex/sim5-demo-navigation-performance`. Issue tamamı okundu; yalnızca izin verilen `SiteNavigation.ts` uygulama dosyası değiştirildi. Main/production üzerinde yazma, merge veya dağıtım yapılmadı.

## Doğrulanan maliyet ve en küçük düzeltme

Eski `floor()` her çağrıda tüm zemin mesh listesini Three raycast'e gönderiyordu. Gerçek fabrika/tank/kaynak/vinç geometrisinde aynı 1.318 çift eksenli adım denemesi başına **843.884 mesh raycast çağrısı** ölçüldü. Görüş ve gövde çarpışmaları, merdiven uygunluk ölçütleri ve adım mesafeleri değiştirilmedi.

Yeni kod, mesh'in dünya sınır kutusuyla kısa dikey zemin ışınının kesişemeyeceği adayları eliyor; kalan adaylarda aynı Three üçgen raycast ve sıralama çalışıyor. Hareket eden mesh'in matrisi değişince sınırlar yenileniyor; skinned/morph geometriler eski kesin sorgu yolunda kalıyor. Kenarlar için kapsayıcı 0,00001 m tolerans var. Büyük fabrika/tank mesh'leri uygun noktalarda listede kalır. Yeni RAF, dinleyici, uzaktan izleme veya kullanıcı arayüzü eklenmedi. Kaynak vektörü ve aday tamponu tekrar kullanılıyor. Karmaşık hücre ızgarası yerine bu küçük broad-phase yeterli ölçülen kazancı sağladı.

**RealModels.tsx, GLB'ler, malzemeler, gölgeler, çözünürlük, kamera ve animasyon kodları aynen korundu.** Çizim yükünü azaltan bir kalite değişikliği yapılmadı. İncelenen sahne yaklaşık 2,63 milyon üçgen ve 1.021+ çizim çağrısı içeriyor; ilk render sayaçları yükleme/animasyon anına bağlıdır. GPU'nun gerçek kullanıcı cihazındaki darboğaz olduğu doğrulanamadı.

## Ölçümler

Chromium + ANGLE Vulkan SwiftShader; 1280×900, DPR 1. Gerçek bileşen ve GLB'ler, izole inceleme derlemesi. Zemin sorgusunu GPU'dan ayırmak için mevcut test renderer'ı istek üzerine çiziyor. Bu nedenle aşağıdaki **CPU süreleri FPS/kare süresi değildir**. Son karşılaştırma tarayıcıları sırayla çalıştırıldı; başka inceleme tarayıcısı çalışmıyordu. Paylaşılan bulut makinesinde saat çözünürlüğü ve sistem gürültüsü sınırları sürer.

| Ölçüt | Önce | Sonra |
|---|---:|---:|
| Her tur çift eksenli adım denemesi | 1.318 | 1.318 |
| Tur başına mesh raycast çağrısı | 843.884 | 13.837 |
| Beş turun toplam CPU süresi medyanı | 87,3 ms | 49,3 ms |
| İlk tur toplam CPU | 125,0 ms | 82,7 ms |
| İkinci tur CPU p95 / p99 | 0,2 / 0,2 ms | 0,1 / 0,2 ms |
| >50 ms CPU adım örneği (tüm turlar) | 0 | 0 |

Raycast çağrıları **%98,36** azaldı. Beş tur medyan toplam CPU yaklaşık %43,5 düştü; bunun bütün oyunda aynı oranda FPS artışı anlamına gelmediği özellikle belirtilir. Ölçüm çözünürlüğünde görülen `0 ms` gerçek sıfır maliyet anlamına gelmez.

Güzergâh hedefleri: kaynak yaklaşımı `(-18,-2)` → fabrika çıkışı `(-17,20)` → kaldırma dışı `(-17,47)` → yol `(0,47)` → `(0,0)` → kapı `(-14,0)` → kaynak. CPU testinde hareket denemeleri reddedilebilir; bu bir uçtan uca yürüyüş başarı iddiası değildir. Gerçek kontrol girdileriyle yürüyüş ayrı entegrasyon testinde doğrulandı. Ham zamanlar, konumlar ve kararlar [before.json](before.json), [after.json](after.json) içinde.

### FPS ve gerçek kare süresi sınırı

12 karelik ayakta yazılımsal GPU keşif denemesi: önce ortalama **0,429 FPS**, medyan **2.733,2 ms**, p95/p99 **3.899,9 ms**; sonra **0,401 FPS**, medyan **2.666,6 ms**, p95/p99 **5.283,1 ms**; iki tarafta da 11 değerlendirilen aralıktan 9'u >50 ms. Bunlar [software-render-before.json](software-render-before.json) ve [software-render-after.json](software-render-after.json) içinde açıkça **kabul karşılaştırmasından çıkarıldı**: keşif koşuları başka inceleme süreçleriyle örtüştü, SwiftShader kullanıldı, test renderer'ı `gl.finish()` zorluyor ve bu ayakta duruş örneği gerçek yürüyüş rotası değil. FPS kazanımı kanıtlamıyor; donanım/gerçek mobil FPS **TEST EDİLMEDİ**. CPU kazancından sahte FPS hesaplanmadı.

Tarayıcı CPU profili/heap/GC izi ve gerçek cihaz GPU shader ısınma profili alınmadı. Yeni asset yüklemesi gözlenmediği yönünde kapsamlı ağ-profili iddiası yok; kaynakta GLB yüklemeleri navigasyon kurulmadan önce bekleniyor. Kullanıcı kasmasının nihai kök nedeni açık kalıyor.

## Regresyon ve görsel kanıtlar

- **90/90 DEMO kontrolü:** TR/EN; 1280×1000, 320×568, 390×844, 844×390. Native touch/klavye hareketi, iki görevli sonuç raporu, kapalı diğer bulgular, yeniden başlatma, yatay taşma olmaması, guest persistence ve yazma isteği olmaması. [demo-results.json](demo-results.json)
- **52/52 saha kontrolü:** EN masaüstü, TR mobil dikey, EN mobil yatay. Gerçek WASD/dokunmatik yürüyüş, kaynak/kaldırma/diğer HSE etkileşimleri, dışlama alanı, tank duvarı, üst merdiven ve bağlantı, köprü korkuluğu, aynı merdivenden iniş, takılı kalmayan tuş bırakma, altı görevli bileşenin sonuç ve replay davranışı. Mobil merdiven başlangıcına yalnızca XZ fixture yerleşimi var, Y ataması yok. Kimlikli Premium servisi veya canlı veri kullanılmadı. [height-results.json](height-results.json)
- **13.180 gerçek saha + 12.000 sentetik adım:** önce/sonra kabul-ret, ayak yüksekliği ve konumlar aynı. Sentetik zemin, duvar, alçak tavan, basamak ve hareketli destek kontrolü; mevcut ek 5 baş açıklığı testi de geçti. [differential.json](differential.json), [navigation-results.json](navigation-results.json)
- **6/6 WebGL hata dayanıklılığı:** erişilebilir yerelleştirilmiş fallback ve bozuk sahnede başlatmanın engellenmesi. [webgl-failure-results.json](webgl-failure-results.json)
- Kaynak/yol/kaldırma aynı test kameralarında önce/sonra PNG'ler eklendi. 10 kanal değerinden büyük fark görülen piksel oranı kaynak %0, yol %0,02167, kaldırma %0. Animasyon/zaman ve yazılımsal çizim farkları nedeniyle byte eşitliği iddia edilmez. [image-comparison.json](image-comparison.json). Kaynak görüntüleri görsel olarak da incelendi. Kameralar yalnızca inceleme wrapper'ında; oyunun kamerası aynı.
- TypeScript **PASS**; değişen dosya ESLint **PASS**; tam proje ESLint **FAIL: 183 hata, 114 uyarı**. Bütün bulgular bu değişen dosyanın dışında, kaynaklar başlangıçla aynı; kapsam dışı hatalar düzeltilmedi. [checks.json](checks.json), [eslint.log](eslint.log)
- Normal `npm run build` **PASS**; PDF polish/QA ve download/auth QA prebuild adımları atlanmadı. Üretilen PDF farkları geri alındı. Bunlar Supabase/ödeme bağlantı testi değildir. [build.log](build.log)
- Yasak alanlar, RealModels ve asset dosyaları başlangıçla byte aynı; [protection.json](protection.json). Canlı Supabase/ödeme/Premium/XP testleri **ÇALIŞTIRILMADI**, canlı müşteri verisine erişilmedi. Simülasyon raporu yerel bileşen testidir; sunucu XP entegrasyonu değildir.

WALK/OVERVIEW, duraklatma ve yeniden başlatma mevcut bileşen testlerinde kullanıldı; bütün tuş kombinasyonları, gerçek iOS/Android, fiziksel dokunmatik joystick ve gerçek GPU dayanıklılığı kapsamlı cihaz testi olarak onaylanmadı. TR/EN gerçek Next giriş denemeleri ilk ağ hatasından sonra yükseltilmiş ağ izniyle tekrarlandı: iki dilde HTTP 200, gerçek CDN Three/GLB sahnesinde denetim başlatma ve sıfır yakalanmamış tarayıcı hatası **PASS**. [next-smoke.json](next-smoke.json). Bu kontrol bir FPS veya tüm güzergâh testi değildir.

## Tekrar üretim

Repo kökünde (mevcut `tools/sim5-review` test bağımlılıklarıyla):

```sh
SIM5_REVIEW_BASELINE=063a93d36c10262a7103c73a56fd6b2f7a98af79 SIM5_CPU_ONLY=1 node tools/sim5-performance/measure.mjs before
SIM5_CPU_ONLY=1 node tools/sim5-performance/measure.mjs after
node tools/sim5-performance/differential.mjs
SIM5_REVIEW_OUT=docs/sim5-performance node tools/sim5-review/navigation-test.mjs
SIM5_REVIEW_OUT=docs/sim5-performance node tools/sim5-review/height-test.mjs
node tools/sim5-review/demo-browser-test.mjs
node tools/sim5-review/webgl-failure-test.mjs
node tools/sim5-performance/compare-images.mjs
node tools/sim5-performance/protection.mjs
```

Gerçek cihazda aynı tarayıcı, viewport, DPR ve güç profiliyle DEMO'yu açıp ilk ve ikinci geçişi ayrı kaydedin; kaynak → yol → kaldırma → kaynak rotasında ayakta/hareketli sabit süre pencerelerinde RAF p50/p95/p99, >50 ms kare ve FPS ölçün. Shader ısınması ve CPU çarpışma profillerini ayırın. Bu doğrulama yapılmadan “ciddi kasma çözüldü” veya canlı yayın onayı verilmemeli.

Geri alma yalnızca bu PR'daki `SiteNavigation.ts` değişikliğinin geri alınmasıdır. Main'e reset/merge veya production dağıtımı yapılmaz.

### Gerçek Next giriş denemesi — ortam engeli

Yerel normal production build sunucusunda TR/EN DEMO HTML ve başlangıç arayüzü açıldı; ancak sahne, `https://esm.sh/three@0.180.0` dinamik import isteği başarısız olduğu için başlatılamadı. İki dilde hata fallback'i görüldü. İlk denemede başlangıç düğmesinin açılması **DOĞRULANAMADI**; bu başarısız deneme korunmuştur. İlk denemenin kanıtı [next-smoke-first-attempt.json](next-smoke-first-attempt.json). Ağ kısıtı olasılığı nedeniyle yükseltilmiş izinle yeniden denendi; son sonuç [next-smoke.json](next-smoke.json): **TR ve EN PASS, HTTP 200, denetim başarıyla başladı, tarayıcı istisnası yok**. CDN modül veya GLB ikamesi yapılmadı. Gerçek Next rotasının tam yürüyüş/FPS testi yapıldığı iddia edilmez. Yerel sunucu logunda ayrıca eksik Supabase URL/key nedeniyle bazı genel isteklerde hata görüldü; bu görev için canlı anahtar eklenmedi veya auth/proxy kodu değiştirilmedi.
