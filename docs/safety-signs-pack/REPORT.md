# SERNEM Safety Signs — Türkçe teslim raporu

30 Ekim 2026. **Yayın kararı: NO-GO.** QR ve mevcut kütüphane iyileştirmeleri yerel testlerden geçti; ancak 60 işaret hedefi karşılanmadı. Doğrulanamayan 24 aday yayımlanmadı. Süresi dolmuş Premium profilinde mevcut erişim riski, normal build ağ engeli ve uzak Preview doğrulaması yayın engelleridir.

## Başlangıç ve kapsam

Main `80a1a0e3e95931a5058a2fe45e6f00e7604a8382` fetch ile doğrulandı. Dal `codex/safety-signs-library-qr-expansion`, ayrı worktree `/workspace/safety-signs`. Önceki görevdeki kaydedilmemiş değişiklikler korunur. [Başlangıç/rollback ve PR koordinasyonu](START.md), [547 korunan kaynağın manifesti](evidence/baseline.json).

PR #128'in `safety-signs/page.tsx` metadata değişikliğine dokunulmadı; bu paketin scoped metadata'sı layout'ta, sayfa metadata'sı birleşince öncelik kazanır. PR #129'un field-form ve sitemap eklemeleri korunur: bu pakette sitemap dosyası değişmedi. İki PR'ın head SHA ve dosya listeleri evidence/ altında. Hiçbir açık PR değiştirilmedi/cherry-pick yapılmadı. Poster Library/posters-v2, SIM, XP, ödeme/webhook, auth, Supabase, RLS ve deployment kaynakları değiştirilmedi.

## Gerçek düzeltmeler

- 36 mevcut işaretin her biri için ayrı TR/EN QR: **72 farklı PNG**, doğru `https://www.sernem.com/{locale}/safety-signs/{slug}` hedefi. QR, standart önizleme ve ücretsiz PDF/PNG'de **ayrı beyaz SERNEM alt bilgisinde**; piktogram veya güvenlik mesajının üzerinde değil.
- Premium temiz dosyalar QR ve SERNEM markası içermez. Mevcut entitlement API, Premium resolver ve giriş kontrolü korunur. İndirme öncesi aynı API kullanılır; API hata verirse temiz sürüme geçilmez.
- Export kompozisyonu ortak bir modüle ayrıldı. Gerçek mevcut SVG aynı geometri ve renklerle çizilir. Uzun TR/EN başlıklar okunabilir satırlara bölünür; küçük tek satıra sıkıştırılmaz. Çift tıklama kilidi ve eksik görsel hatası kontrol edilir. Analytics/aktivite şeması aynıdır; dosya oluşturma sonrası kayıt korunur, OS'nin kaydı tamamladığı iddia edilmez.
- Sessiz W001 fallback'i kaldırıldı. Bilinmeyen sembol, başka anlamda bir uyarı simgesine dönüşmez; kayıt/render hatası verir. Yayındaki 36 eşleşme açık allowlist ile denetlenir.
- P004 mevcut sembolü, upstream açıklamasında “No thoroughfare”, fakat TR/EN başlıkta yetkisiz giriş gibi sunuluyordu. **“Geçiş Yasaktır / No Thoroughfare”** ve yetkili kişi istisnası çıkarılmaması açıklaması eklendi. Kırık bağlantı üretmemek için eski `no-unauthorized-entry` slug'ı korunur. SRN ürün kodları ISO kayıt kodu/uygunluk sertifikası gibi sunulmaz.
- Kütüphanede mevcut arama ve kategori düzeni geliştirildi: ISO dosya koduyla arama, gerçek label, aria-pressed, sonuç sayısı, boş sonuç açıklaması, responsive oranlı küçük resimler ve daha koyu CTA. Detay sayfaları responsive, ilgili işaretler ve kaynak/yerel uygulama notları içerir. Tek yangın kaydı için ilgili acil durum bağlantıları sağlanır.
- Kütüphane metadata'sı, TR/EN canonical/hreflang ve OG eklendi; detay metadata'sı korunur. Mevcut **866 sitemap URL / 72 işaret detay URL** doğrulandı. Yeni yayımlanmış işaret olmadığı için sitemap'e aday URL eklenmedi; sahte tarih ve düşük değerli kopya sayfa yok.

## 60 hedefi ve teknik/lisans kanıtı

**36 yayımlanmış işaret, 72 dil sayfası; 0 yeni yayımlanmış işaret; 24 BLOCKED aday.** Sayaç 60 gibi gösterilmez. [Aday listesi](CANDIDATES.json) acil telefon, AED, göz/vücut duşu, sedye, acil stop, yangın hortumu/alarmı/merdiveni, topraklama, fiş çıkarma, kaynak maskesi, bakım izolasyonu ve yeni özgün tehlikeler gibi mevcut 36'da bulunmayan konuları içerir. Adaylar uygulama verisine veya public asset'lere aktarılmadı.

Kaynak incelemesi:

- Kurulu `@iso-safety-signs/assets@1.0.1` ve `karlnorling/iso-safety-signs` upstream kaynakları okundu; scraper Wikipedia/Commons'tan alıyor. Upstream commit CANDIDATES.json içinde.
- Mevcut 36 SVG main ile byte olarak aynıdır. 34 dosya kurulu paketle de birebir eşleşir; E003 ve W035 için birebir paket kanıtı yoktur. Bu iki dosya değiştirilmedi. [Dosya bazlı kaynak/hash](evidence/source-provenance.json).
- Paket MIT lisansı, her Commons sanat eserinin lisansı değildir. Tekil yazar/lisans/atıf ve ISO resmi anlamı için ISO OBP / Commons ağ denemeleri normal ve izinli tekrarda CONNECT 403 döndürdü. Resmi URL'ler aday kaydında. **Mevcut ve aday işaretler için bağımsız ISO 7010/3864 uygunluğu, edition ve tekil artwork lisansı NOT VERIFIED.** Yeni standart ID'si, sertifika, uzman onayı veya sahte SVG üretilmedi.
- Yeni public dosyalar yalnız gerçek kodlama ile üretilen QR PNG'leridir. Standart sembolleri yeniden çizilmedi/boyanmadı. Görsel inceleme, sertifikalı renk/ISO 3864 geometrik uygunluk incelemesi değildir.

## QR ve baskı

ReportLab gerçek QR kodlayıcı, M hata düzeltme, dört modül beyaz quiet zone; matrisler 33/37 modül. [72 asset bağımsız Zbar sonucu](evidence/qr-assets.json). Export 2480×3508; QR 440×440 px, A4 toplam yaklaşık **37,3 mm**, A3 **52,7 mm**. QR'ın güvenlik alanından ayrı olması tüm responsive/yerleşim kontrollerinde doğrulanır. Temiz premium kompozisyonu footer çizmez.

İlk testte 320px QR bazı A4 dosyalarda 100 DPI'da okunamadı. Eşik korunup footer/QR büyütüldü; tüm standard çıktılar tekrar üretildi. Son **432 dosya / 720 bağımsız çözüm kontrolü PASS**: standart dosyada tam doğru dil/slug URL'si, temiz dosyada sıfır QR. PDF tek sayfa/A4-A3 boyutu, PNG 2480×3508. Gerçek telefon/yazıcı taraması **NOT TESTED**.

144 gerçek canvas yerleşiminde taşma yok; A4 eşdeğeri minimum footer fontu **8,64 pt**, temiz sürümde minimum başlık yaklaşık **30 pt**. PDF raster çıktı olduğundan seçilebilir/erişilebilir PDF metni vaadi yoktur. Font ölçümleri gerçek draw-call/glyph sınırlarından alınır; görsel inceleme temsilî PDF renderları ve sembol/contact sheet'lerle desteklenir. Her 432 dosyanın tek tek insan tarafından incelendiği iddia edilmez.

## Güvenlik bulgusu — değiştirilmedi

Gerçek mevcut download-access API sentetik bağımlılıklarla test edildi: anonymous/free/premium/suspended/reward/missing-profile beklenen dar sonuçları veriyor. **Expired + aktif stale `plan=premium` senaryosu temiz erişim alıyor (FAIL / SECURITY BLOCKER).** Endpoint bağımsız billing/expiry denetimi yapmıyor. Profile senkronizasyonunun gerçek ortamda bu durumu önleyip önlemediği doğrulanmadı; canlı istismar veya gerçek Storage açığı iddia edilmez. API/ödeme/auth değişikliği kullanıcı sınırına aykırı olduğu için yapılmadı.

Suspended kullanıcı için temiz sürüm reddediliyor; mevcut `requirePrintAuth` yalnız oturum kontrol ettiği için standart indirme açık kalıyor. Bu dar davranış testi, bütün askıya alınmış hesap politikasının güvenli olduğu anlamına gelmez. Gerçek hesap, ödeme, abonelik ve Storage/RLS E2E **NOT TESTED**. Ayrı onay ve sandbox kabulü gerekir.

## Testler ve kanıtlar

[Tam QA matrisi](QA-MATRIX.md): 98 browser kontrolü; 432 gerçek dosya üretimi; 432 artifact kontrolü/720 decode; 144 font/yerleşim; 8 negatif browser; 547 kaynak hash koruması. TypeScript PASS; ilgili ESLint **0 hata / 2 mevcut img uyarısı**. Güvenlik matrisi **6 PASS / 1 FAIL**.

Normal `npm run build` Google Fonts Geist/Geist Mono erişim engeliyle başarısız; izinli tekrar da aynı. Son tekrar çalışmadan iptal oldu. **Normal build PASS değildir.** Yerel test build'i, yalnız komut ortamında cached gerçek Google font response fixture'ı + Webpack ve loopback katalog fixture'ıyla geçti. Son kaynak TypeScript aşaması dahil geçti; bu normal/Vercel-equivalent build yerine sunulmaz. App font/env/deployment ayarı değiştirilmedi.

Önce/sonra: [TR mobil önce](evidence/before-tr-detail-390.png), [TR mobil sonra](evidence/after-tr-detail-390.png), [EN masaüstü önce](evidence/before-en-detail-1440.png), [EN masaüstü sonra](evidence/after-en-detail-1440.png). Tüm dil/genişlik ekranları evidence/ içinde. Önce server'ındaki Safety Signs kaynakları main ile aynı hash kontrolünden geçti; çevre navbar/landing, önceki yerel çalışma sunucusudur ve tam main deployment karşılaştırması iddia edilmez.

[Sembol contact sheet](evidence/symbol-contact-sheet.png), [TR standard çıktılar](evidence/export-contact-free-tr.jpg), [EN standard çıktılar](evidence/export-contact-free-en.jpg), [TR premium çıktılar](evidence/export-contact-premium-tr.jpg), [EN premium çıktılar](evidence/export-contact-premium-en.jpg). Dosya SHA, gerçek sayfa boyutları ve QR sonuçları evidence/artifacts.json içinde. Ham 432 dosya /tmp/signs-exports altında; tamamı repo'ya eklenmedi.

## Dosyalar ve yayın kapısı

Uygulama: safety-signs layout/client/detail, üç mevcut Sign bileşeni, safety-signs data'da tek P004 açıklaması; yeni `symbols.ts`, `qr.ts`, `export.ts` ve 72 public QR. Test araçları tools/safety-signs-pack; rapor/kanıt docs/safety-signs-pack. Liste teslimde CHANGED-FILES.txt içinde.

**NO-GO:** 60 hedefi ve doğrulanmış lisans/standart kapısı tamamlanmadı; expired Premium riski çözülmedi; normal build ve uzak Preview kabulü yok. Kod incelemesi için Draft teslim uygundur; üretim onayı değildir. Main merge/production release yapılmadı. Uzak push/PR/Preview son durumları DELIVERY.md içinde; READY ancak son SHA için doğrulanırsa yazılır.
