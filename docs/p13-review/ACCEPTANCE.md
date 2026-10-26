> **Son revizyon:** [READABILITY.md](READABILITY.md) ve `readability/` kanıtları, yorum 6414234906 kapsamındaki ikon, etiket ve gerçek A4/A3 punto sonuçları için güncel kaynaktır. Bu dosya tarihsel rapor olarak korunur.

# Paket 13 — Son teknik kabul kontrolü

**Aynı Draft PR #126, aynı dal.** Başlangıç HEAD `12c369032f8a35e0c38f72c4ad2742e77bb8e6eb`. Önceki audit'in sayısal limitlerin kaldırılmasını anlatan bölümleri bu ekle güncellenir; tarihsel rapor silinmez. Önceki düzeltmede yanlış genellemeleri kaldırırken uygulanabilir OSHA asgarilerini de görünmez yapmak fazla geniş bir müdahaleydi. Bu ek, asgarileri ve alternatif/istisna koşullarını birlikte geri getirir.

## Kabul kararı ve kaynak dürüstlüğü

**Draft inceleme için GO; production teknik kabulü için NO-GO.** İçerik düzeltmesi ile güncel mevzuatı bağımsız kaynaktan doğrulama ayrı işlerdir. Aşağıdaki hükümler posterlerde kapsam/koşullarıyla işlendi; ancak bu oturumda OSHA, eCFR, GovInfo ve Cornell istekleri ağ tünelinde 403 verdi. Yükseltilmiş OSHA tekrarı da 403 verdi. Güncel resmî tam metin alınmış veya hukuk/HSE uzmanı tarafından onaylanmış gibi raporlanmaz. [Erişim kanıtı](acceptance/source-access.json).

Bu nedenle `verification: not-verified-in-session`, `site-validation-required` ve görünür saha doğrulaması etiketleri korunur. Görev kapsamı koşullu mevzuat içeriğini düzeltmektir; bu sayfalar çalışma izni, ekipman tasarımı veya sertifika yerine geçmez. Tarih, uzman adı veya doğrulanmış inceleme rozeti üretilmedi.

## 1. Sıcak çalışma — 1910.252(a)(2)(iii)(A)-(B)

[OSHA 1910.252](https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.252).

- ABD OSHA kapsamındaki kaynak/kesmede yangın gözcüsü gereken koşullar için iş bittikten sonra **en az yarım saat / 30 dakika** yangın gözetimi açıkça geri kondu. Yalnız “izin prosedüründeki süre” demek bu asgariyi görünmez bırakıyordu.
- Gözcü gerektiren koşullar ile süre ayrıldı. **35 ft (10,7 m)** yakınındaki önemli yanıcı malzeme bir ölçüttür; daha uzaktaki kıvılcımla tutuşabilecek malzeme, açıklıklar/komşu alanlar veya iletilen ısı riski de değerlendirilir. Bu sayı temizlenirse dışının otomatik güvenli olduğu anlamına gelmez.
- Yerel mevzuat, izin, kurumsal prosedür veya risk daha uzun gözetim gerektiriyorsa uzatılır. OSHA uygulanıyorsa yerel prosedür 30 dakikalık asgariyi kısaltmak için gerekçe olamaz. ABD dışındaki bütün sıcak işler için tek evrensel süre olduğu iddia edilmez.
- Gizli boşluklar ve için için yanma kontrolü, tehlike sürerken gözetimi bitirmeme korunur. Gözcünün eğitim/söndürme/alarm hazırlığı mevcut kurallarda kalır.

## 2. Ankraj — 1926.502(d)(15)

[OSHA 1926.502](https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.502).

Kişisel düşüş durdurma ekipmanı için şu ayrım TR/EN metin ve PDF'de görünür:

1. Ankraj, platformu taşımak veya asmak için kullanılan ankrajdan **bağımsız** olmalıdır.
2. **Bağlı çalışan başına en az 5.000 lb (22,2 kN)** kapasite yolu; **VEYA** aşağıdaki alternatif.
3. Alternatif, **güvenlik katsayısı en az 2** olan **tam kişisel düşüş durdurma sisteminin** parçası olarak **nitelikli kişi gözetiminde tasarlanmalı, kurulmalı ve kullanılmalıdır** — (d)(15)(i)-(ii).

“Bir kişi onayladı” veya “üreticiye bakın” ifadesi bu alternatifin yerine geçmez. Alternatif, her ankraja koşulsuz 5.000 lb zorunluluğu olduğu şeklinde de sunulmaz. Nitelikli kişi (qualified person) ile genel yetkin/yetkili çalışan rolleri aynı sayılmaz. Üretici talimatı, düşüş açıklığı, bağlantı uyumu ve kurtarma değerlendirmesi ayrıca korunur.

## 3. Diğer kaldırılmış sayılar — geri eklenen kapsam ve istisnalar

Aşağıdaki tablo içerik yorumunu ve basılan koşulları gösterir; bağımsız güncel resmî metin doğrulaması **NOT VERIFIED** olarak kalır.

| Konu / madde | Final içerik ve uygulanabilirlik |
|---|---|
| Yüksekte çalışma — 1926.501(b)(1) | ABD inşaatta alt seviyeden **≥6 ft (1,8 m)** korumasız kenarda korkuluk, ağ veya kişisel düşüş durdurma. Bu bütün iş türlerinin eşiği değildir; merdiven/iskele ayrı kurallara tabidir. Daha alçak otomatik güvenli değildir. |
| İskele — 1926.451(a)(1) | Genel tasarım şartı: kendi ağırlığı **+ en az 4× azami amaçlanan yük**; özel tip kuralları ayrıca kontrol edilir. Bu sayı kullanım kapasitesini dört katına çıkarma izni değildir. Askı halatı gibi özel bileşenlerde ayrı şartlar vardır. |
| İskele — 1926.451(b)(1) | Genel bitişik platform boşluğu **en fazla 1 in (2,5 cm)**. Maddede belirtilen istisnalar doğrulanmadan geniş açıklık kabul edilmez. Gerekli özel yerleşim istisnasının dahi kendi sınırları vardır (uygulanabilir durumda 9,5 in / 24,1 cm); poster, her açıklığı bu değere kadar serbest saymaz. Tam döşeme ve tehlikeli boşlukta kullanmama korunur. |
| İskele — 1926.451(e)(1) | Seviye farkı **>2 ft (0,6 m)** olduğunda uygun erişim gerekir; çaprazlara tırmanmak erişim yöntemi değildir. İskele düşüş korumasının 1926.451(g)(1) kapsamı ayrıca değerlendirilir; genel kenar 6 ft kuralı iskeleye kopyalanmaz. |
| Hendek — 1926.651(c)(2) | Derinlik **≥4 ft (1,22 m)**: güvenli çıkış; çıkışa yatay hareket **en fazla 25 ft (7,62 m)**. Her kazı geometrisine sadece “gerekli derinlik” demek yerine hendek kapsamı açık. |
| Kazı kenarı — 1926.651(j)(2) | Düşebilecek malzeme/ekipman kenardan **≥2 ft (0,61 m)**; **veya** yeterli tutucu düzenek; gerekirse ikisi. Bu, sürşarj/göçük riskini tek başına çözmez. |
| Göçük — 1926.652(a)(1) | Koruyucu sistem yükümlülüğü korunur. İstisna: tamamen stabil kaya; veya **<5 ft (1,52 m)** ve yetkin kişi incelemesinde potansiyel göçük belirtisi bulunmaması. “5 ft altı daima güvenli” sonucu yok. |
| Merdiven — 1926.1053(b)(5)(i)-(ii) | Genel dayamalı merdiven yerleşimi: yatay açıklık yaklaşık **çalışma uzunluğunun dörtte biri (≈4:1)**; yükseklikle karıştırılmaz. Özel tipler/üretici talimatı ayrıca doğrulanır; örneğin ekli yan kollu ahşap iş yapımı tip için (b)(5)(ii) ayrı 1/8 kuralı vardır. |
| Üst seviye erişimi — 1926.1053(b)(1) | Portatif merdiven yan kolları **≥3 ft (0,9 m)** uzanır. Merdiven uzunluğu buna izin vermiyorsa **üstten rijit desteğe sabitleme VE tutamak** birlikte gerekir; tek başına biri alternatif değildir. |
| Söndürücü — 1910.157(d)(2),(d)(5) | Yalnız dağıtım hükmünün uygulandığı ABD OSHA bağlamında A sınıfı için **≤75 ft (22,9 m)**, B sınıfı tehlike için **≤50 ft (15,2 m)** yürüme mesafesi. 1910.157(a)(2)-(3) tahliye/atanmış kullanıcı planı istisnaları ayrıca kontrol edilir. US yangın sınıfları yerel EN/TR sınıflarıyla aynı sayılmaz. |
| Söndürücü — 1910.157(e)(2)-(3),(g)(1)-(4) | **Aylık görsel kontrol**, **yıllık bakım kontrolü** ve çalışan kullanımına ilişkin **başlangıç/en az yıllık eğitim** ayrı yükümlülükler olarak gösterilir. Bunlar aynı “yıllık program” etiketiyle birleştirilmez. Eğitim/atanmış kullanıcı ve tahliye politikasının kapsamı doğrulanır. |
| Kapalı alan — 1910.146(b),(d) | Tehlikeli atmosfer tanımında O₂ **<19,5% veya >23,5%**, yanıcı gaz/buhar/sis **>10% LFL** bağlamı gösterilir. LFL tanımındaki **>** korunur; izin alarmı daha sıkı olabilir. Bu değerler tek başına giriş izni değildir: toksik sınırlar, tüm izin koşulları, izleme ve kurtarma gerekir. Belirsizlik/alarm/izin sınırında tahliye kuralları korunur. |
| LOTO — 1910.147(c)(6)(i)-(ii) | Enerji kontrol prosedürü **en az yılda bir** incelenir; prosedürü kullanan kişi(ler)den farklı **yetkili çalışan** tarafından. “Farklı” olması harici bir sertifikasyon şirketi zorunluluğu anlamına gelmez. İncelemenin belgelendirme şartları ayrıca kontrol edilir. |

“100%” gibi bağlamsız sloganlar veya her işe uygulanan kg/gerilim/EN ürün standardı listeleri geri getirilmedi. 0 V göstergesinin tek başına güvenlik kanıtı olmadığı; enerji izolasyonu, uygun cihaz ve gerilimsizlik doğrulamasının gerektiği anlatımı korunur. Diğer posterlerin konuya uygun PPE/kontrol eşleştirmeleri değişmedi.

## Dosyalar ve kanıt yapısı

- Uygulama: `hot-work.ts`, `working-at-height.ts`, `ladder-safety.ts`, `scaffold.ts`, `excavation-safety.ts`, `fire.ts`, `technical-profiles.ts`.
- Etkilenen sekiz konu: sıcak çalışma, yüksekte çalışma, merdiven, iskele, kazı, yangın, kapalı alan, LOTO. Son ikisinde yalnız teknik profil kartları değişti.
- Kaynak kayıtlarına tam madde atıfları eklendi; güncel doğrulama durumu sahte biçimde PASS yapılmadı. Rendering, QR/logo, auth, Premium, payment, Supabase, SIM/XP veya deployment ayarları değiştirilmedi.
- Önceki kanıtlar korunur; yeni sonuçlar `acceptance/` dizinindedir. Önce resimleri önceki PR HEAD uygulamasının `/tmp/p13-after` PDF'lerinden, sonra resimleri yeni `/tmp/p13-acceptance` PDF'lerinden üretilir; önceki PDF hashleri kontrol edilir.

## Test ve Preview sonucu

Makine okunur son durum: [verification.json](acceptance/verification.json). Son Preview SHA/URL/durumu aynı PR açıklamasında güncellenir; READY dağıtım durumu uzaktan tarayıcı E2E veya mevzuat doğrulaması değildir.

- 15 × TR/EN × A4/A3 tam regresyon; değişen 8 konu × TR/EN × A4/A3 için ayrıca kritik hükümlerin PDF içinde gerçekten yer aldığı kontrol edilir.
- 320/360/390/1440 mobil/masaüstü kontrolü; eski başarılı tasarım/yetki testleri korunur.
- Kaynak erişimi **NOT VERIFIED**; fiziksel baskı/kamera ve gerçek sandbox oturumu **NOT TESTED**. Önceki 13 sentetik yetki testinin kapsamı genişletilmiş veya gerçek servis testi sayılmış değildir; yetki kodu aynı hashlerde kalır.
- Güncel kullanıcı isteği son commit'in Preview durumunu kontrol etmeyi içerir. Yalnız aynı dalın Preview'ı izlenir; main/production'a merge veya dağıtım komutu yok. Önceki otomatik Preview sapması tarihsel audit/PR kaydında korunur.

## Tekrar çalıştırma

```sh
P13_EVIDENCE_DIR=docs/p13-review/acceptance node tools/p13-review/content.mjs
P13_PHASE=after P13_URL=http://127.0.0.1:4212 P13_PDF_DIR=/tmp/p13-acceptance P13_EVIDENCE_DIR=docs/p13-review/acceptance node tools/p13-review/browser.mjs
node tools/p13-review/acceptance.mjs
P13_PDF_DIR=/tmp/p13-acceptance P13_EVIDENCE_DIR=docs/p13-review/acceptance P13_BEFORE_PDF_DIR=/tmp/p13-after python3 tools/p13-review/pdf.py
```

Build tamamlandıktan sonra test sunucusu başlatılır. Önceki PDF'lerin yeniden üretimi gerekirse `12c36903` ayrı checkout kullanılır; main'e yazılmaz. Production kabulü için güncel resmî metinlerin erişilebilir ortamda madde/istisna bazında yetkin HSE incelemesi ve kullanıcı onayı beklenir. PR Draft kalır.

## Son yerel kalite kapısı

| Kontrol | Sonuç |
|---|---|
| Tam poster baskı/mobil regresyonu | **180 PASS** — 60 A4/A3, 120 responsive |
| Kritik koşulların gerçekten PDF’de yer alması | **32 PASS** — 8 konu × TR/EN × A4/A3 |
| Bağımsız PDF/QR/başlık/metin sınırı | **60 PASS** |
| İçerik ve korunan sistemler | **36 PASS**; 82 hash aynı |
| TypeScript / normal production build | **PASS**, prebuild PDF/download QA dahil |
| İlgili ESLint | **0 hata / 2 mevcut Header img uyarısı** |
| Güncel resmî mevzuat metni | **NOT VERIFIED**, kaynak tüneli 403 |
| Gerçek hesap/storage, fiziksel baskı/kamera | **NOT TESTED**, önceki kapsam genişletilmedi |

PDF çok sütunlu olduğu için ilk metin eşleştirmesindeki geometrik satır karışması gerçek içerik eksikliği değildi. Son kontrol ham PDF metin sırasını kullanır, satır sonunda bölünen tireleri birleştirir; kuralın kelimeleri çıkarılmaz veya test sessizce atlanmaz. Görüntüler de incelendi. Önceki 60 PDF hashinin korunması doğrulandı.

### Örnek çıktılar ve önce/sonra

- [TR sıcak çalışma A4](acceptance/sample-tr-hot-work-a4.pdf) / [EN sıcak çalışma A3](acceptance/sample-en-hot-work-a3.pdf)
- [TR yüksekte çalışma A3](acceptance/sample-tr-height-a3.pdf) / [EN yüksekte çalışma A4](acceptance/sample-en-height-a4.pdf)
- Sıcak çalışma: [TR önce](acceptance/before-tr-hot-work-safety-rules.png) / [TR sonra](acceptance/after-tr-hot-work-safety-rules.png) · [EN önce](acceptance/before-en-hot-work-safety-rules.png) / [EN sonra](acceptance/after-en-hot-work-safety-rules.png)
- Ankraj: [TR önce](acceptance/before-tr-working-at-height-rules.png) / [TR sonra](acceptance/after-tr-working-at-height-rules.png) · [EN önce](acceptance/before-en-working-at-height-rules.png) / [EN sonra](acceptance/after-en-working-at-height-rules.png)
- [15 TR çıktı genel görünümü](acceptance/after-tr-overview.jpg) / [15 EN](acceptance/after-en-overview.jpg). Diğer altı değişen konunun iki dilde önce/sonra rasterleri aynı dizinde bulunur. Test kapsamı yalnız bu örneklerden ibaret değildir.
