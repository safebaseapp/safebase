# SERNEM SIM 5.0 — kaynak operasyonu geliştirme paketi

Çalışma tabanı: `feature/sernem-sim5-professional-site-package2-20261017`,
`ff123e1f4010aa6a726239f70d66c40f642f2428`. Uzak dal fetch edilerek doğrulandı.
Önceki `layout.tsx` / `globals.css` font düzeltmesi bu pakete dahil değildir;
ayrı patch `/workspace/scratch/sim5-review/font-fallback.patch` içinde korundu.
Production'a erişilmedi; push, merge veya deploy yapılmadı.

## Geometri incelemesi

Kaynak: `app/public/sim5/SERNEM_Welder_06_under25MB.glb`.
SHA-256: `147b7b18d9121c77b08ab3137e2f8678174806b470ad82a9ecf6a7184fd245c7`.
772 düğüm, 387 mesh, 27 materyal; skin/iskelet ve animasyon yok.
Aşağıdaki ölçümler bütün üst düğüm dönüşümleri uygulanmış **orijinal GLB
koordinatlarıdır**; site ofsetleri veya tüm ekipmanın merkezi değildir.

| Parça | Mesh | Ölçüm (metre) |
| --- | --- | --- |
| İnsan | İnsan materyallerinin birleşimi | Yükseklik 1,78192; üst Y 1,79110 |
| Yüz | Object_6 | X −0,10424…0,07624; Y 1,46998…1,75951; Z −0,13758…0,08549 |
| Göz merkezi | Object_8 | (−0,01400; 1,63566; −0,10281) |
| Eldivenler | Object_10 | X −0,15629…0,14025; Y 1,31678…1,49894; Z −0,53162…−0,18763 |
| Torç tutamağı | Object_709 | X −0,00346…0,02878; Y 1,35360…1,49947; Z −0,56279…−0,41465 |
| Nozul uç halkası | Object_711 | Merkez (0,01266; 1,49981; −0,75205) |
| Nozul ekseni | Object_711, PCA | (0,00137; −0,26985; −0,96290) |
| Siper gövdesi / penceresi | Object_771 / Object_763 | Orijinal GLB içinde mevcut |
| Makine çıkışı | Object_225 | (−0,06691; 0,50970; 1,79274) |

Göz/yüz verisi ileri yönün **−Z** olduğunu gösteriyor. Önceki kod, bütün makine
ve kablo grubunun merkezini kullanıp masayı +X yönünde kuruyordu; ek elektrot,
yeni maske kutusu ve kablo gerçek el/nozul geometrisine bağlı değildi.
GLB'nin sıkıştırılmış Int8 normallerini küçük yüzey alanlarıyla yeniden
hesaplamak sıfır normal ve siyah model üretiyor: poz sonrası Float32 normal
özniteliği oluşturulması bu nedenle gereklidir.

## Uygulanan düzeltme

`WeldingOperation.ts`, aynı GLB'nin mesh'lerini kopyalar ve düğüm dönüşümlerini
geometriye uygular; özgün GLB dosyasını değiştirmez. Alt bacakları sabit tutan
22° yumuşak kalça eğimi uygulanır. El, eldiven ve **tutamağı dahil bütün torç**
aynı dönüşümü izler. Başın ek eğimi göz–temas geometrisinden hesaplanır
(inceleme modelinde yaklaşık 11,86°). Bu statik bir çalışma pozudur; iskelet
animasyonu veya hareketli kaynak dikişi iddiası yoktur.

Mevcut siperin penceresi gerçek göz seviyesine getirilir; siper yüze
7 cm yaklaştırılır ve başla birlikte döndürülür. Koyu filtre ve kısa yan
bağlantılar kullanılır. İkinci bir maske üretilmez. Gözden temas noktasına
ışın testi pencereden geçer.

Nozulun gerçek vertekslerinden PCA ekseni ve uç halka merkezi hesaplanır.
12 mm dışarı çıkan tüketilen tel, T birleşiminin iki yüzeyinin kesişiminde
sonlanır. Masa, plakalar, ark ve parçacık kaynağı aynı temas referansını
kullanır. Makinenin gerçek çıkışından tutamağın gerçek kablo soketine tek bir
kablo; masanın kıskacına ayrı iş dönüş kablosu vardır. Eğrilerin yalnızca
kontrol noktaları değil, tamamı zemin üzerinde sınırlandırılır.

6 kg ABC söndürücü, bombeli gövde, taban, tetik, pim, yeşil bölge/ibreli
manometre, hortum, nozul ve TR/EN etiketle oluşturuldu. Tabana oturma sayısal
olarak kontrol edildi. Fabrika/tank GLB'leri, diğer simülasyonlar ve HSE
soruları değiştirilmedi; sıcak çalışma seçimi istasyonun mesh'leriyle bağlıdır.

## Doğrulama ve sınırlar

Tekrarlanabilir komutlar: [izole test aracı](../../tools/sim5-review/README.md).
Gerçek WebGL render'ları Chromium/SwiftShader üzerinden alındı; yapay görsel
üretimi kullanılmadı. Üç genel açı ve torç/siper/söndürücü yakın planları
incelendi. Tam `RealModels` bileşeni, iki tesis modeli ve TR/EN HSE akışları da
Supabase gerektirmeyen izole ortamda çalıştırıldı.

TypeScript kontrolü ve yeni `WeldingOperation.ts` ESLint kontrolü geçti.
İzole tarayıcı testinde **28 kontrol geçti**, tarayıcı hatası ve harici ağ isteği
sayısı sıfırdı. Göz–pencere doğrultusu ile kaynak doğrultusu arasındaki açı
1,08°; kablonun bağlantı uçlarındaki boşluk sayısal hassasiyet düzeyinde sıfır.
Her iki dilde sıcak çalışma, sızıntı ve engelli geçiş kararları 3/3 tamamlandı.
Makine tarafından okunabilir kanıtlar: [test sonuçları](results.json),
[tam mesh, materyal, düğüm ve dönüşüm dökümü](asset-inspection.json).
`RealModels.tsx` mevcut lint borcu içeriyor; tüm depo lint kontrolünün geçtiği
iddia edilmiyor. Auth gerektiren Next site akışı eksik Supabase ayarları
nedeniyle bu paket kapsamında doğrulanmadı. Tüm sitenin production build'i
bu paketin testi değildir; ayrı tutulan Google Fonts değişikliği uygulanmadı.
Production üzerinde test veya yayın yapılmadı.

## Gerçek render kanıtları

- [Önden görünüm](01-front.png)
- [Operatörün yanından](02-operator-side.png)
- [Arka görünüm ve makine bağlantıları](03-rear-connections.png)
- [Torç–tel–iş parçası teması](04-torch-contact.png)
- [Yüz siperi](05-face-shield.png)
- [Söndürücü](06-extinguisher.png)
- [Tesis içinde TR ve HSE kararı](site-tr.png)

## Lisans ve atıf

**009_Male_Worker_Welder_06**, **grewe.juergen**
([yazar](https://sketchfab.com/grewe.juergen),
[orijinal model](https://sketchfab.com/3d-models/009-male-worker-welder-06-d91b45d3009440319f0b62f86ed3c249)).
Lisans: [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/).
Değişiklikler: çalışma anında poz/normal düzeltmesi, siper hizası ve filtre
materyali; iki kablo bölümünün yerine yeni bağlantılar. Kaynak GLB ve içindeki
lisans metadatası korunmuştur. Masa, iş parçası ve söndürücü projede prosedürel
üretilir; dışarıdan yeni model eklenmedi. Mevcut tesis yazarları ve CC BY atıfları
arayüzde korunmuştur.
