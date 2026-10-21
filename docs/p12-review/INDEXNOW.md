# IndexNow — yapılandırılana kadar gönderim yok

Repo'da IndexNow entegrasyonu veya Bing doğrulama meta etiketi bulunmadı. Bu, DNS üzerinden veya hesapta doğrulama yapılmadığı anlamına gelmez: Bing Webmaster/GSC hesap erişimi **NOT TESTED**. Google dizinleme IndexNow'dan ayrıdır.

`tools/p12-review/indexnow.mjs` bağımsız, elle çalıştırılan bir araçtır; uygulama/API/cron'a bağlanmadı. Yeni paket bağımlılığı yok; mevcut geliştirme esbuild'i kullanır. Varsayılan **offline dry run**:

```sh
node tools/p12-review/indexnow.mjs docs/p12-review/indexnow-example.json
node tools/p12-review/indexnow-test.mjs
```

Bu görevde yalnız bunlar çalıştırıldı: **hiçbir gerçek bildirim veya sahiplik dosyası yayımlanmadı**, env değişmedi. Örnek manifest P12 editoryal farkını belgeler; henüz yayımlanmamış URL değişiklikleri için gerçek gönderim yapılmamalı.

Gelecekte sahibi onaylarsa: gerçek owned-domain anahtarı oluşturulur ve `https://www.sernem.com/<key>.txt` sahiplik dosyası ayrı onaylı yayınla erişilir hale getirilir. Araç exact-origin dosya içeriğini doğrular; redirect kabul etmez. `INDEXNOW_ENABLED=true`, `INDEXNOW_KEY` ve açık `--submit --owner-approved` birlikte gerekir. Hiçbiri bu görevde etkinleştirilmedi. Anahtar/response body/URL listesi loglanmaz. Key IndexNow'nun kamuya açık sahiplik anahtarıdır; billing/service-role secret'ıyla karıştırılmaz.

Manifest her değişiklik için gerçek `created|updated|deleted`, `changedAt` ve incelenebilir `evidence` gerektirir. Created/updated URL mevcut public sitemap'te olmalı. Deleted için `--previous-sitemap reviewed-old-urls.json` ile daha önce kamuya açık olan URL'lerin gözden geçirilmiş JSON string dizisi gerekir; aksi halde reddedilir. Araç değişikliğin gerçekten yayımlandığını kanıtlayamaz: sahibi manifesti diff/gerçek yayınla doğrulamalı. Sitemap'te var olmak tek başına yeni gönderim nedeni değildir.

Özel/auth/API/Premium yolları, query/hash, başka origin, bilinmeyen URL reddedilir; canonical host `www.sernem.com` sabittir. Dedupe, en çok 100 girdi/batch, tek workspace lock ve **24 saatte tek yerel deneme** uygulanır. Her fetch 5 saniye; 429/5xx/network için en fazla üç gönderim denemesi. Kalıcı 4xx tekrar edilmez. Durum yereldir: farklı makineler için küresel rate limiter değildir. Başarısız gönderim de kotayı tüketir; otomatik sonsuz retry yok. Disk state'i key içermez; runtime dosyaları ignore edilir. Bu küçük manuel kullanım kapsamı dışında otomasyon önerilmez.

HTTP 200/202 yalnız kabul yanıtıdır; indekslenme, Google görünürlüğü veya AI atfı garantisi değildir. Testler yalnız mock fetch ile ownership/202/503/limit yollarını doğruladı; gerçek servis entegrasyonu **NOT TESTED**.
