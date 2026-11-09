# Preview doğrulaması / deployment blocker

GPU uygulama commit'leri aynı PR #122 dalına push edildi:

- `88a97967a4cb127d2105372fa746001926693db0`: render optimizasyonu + opt-in panel.
- `e3fedf94eca18d101e00a5647f4a52e0bc173553`: ölçüm pencerelerinin resize/profil değişimi/raporda sıfırlanması.

**Yeni GPU SHA için READY doğrulanamadı.** GitHub commit status `pending`, status listesi boş; bu SHA'lara ait GitHub deployment kaydı dönmedi. Eski `87fd75d3` için tek doğrulanmış READY `https://safebase-fljh4u8ea-safebaseapps-projects.vercel.app`. O URL CPU-only sürümdür ve GPU paketi için yeni Preview olarak sunulmaz.

Vercel botunun PR'da verdiği sabit dal alias'ı:

- [TR + panel](https://safebase-git-codex-sim5-demo-navig-cf6272-safebaseapps-projects.vercel.app/tr/labs/sim5/demo?sim5Perf=1)
- [EN + panel](https://safebase-git-codex-sim5-demo-navig-cf6272-safebaseapps-projects.vercel.app/en/labs/sim5/demo?sim5Perf=1)

Bu alias'ın yeni SHA'yı sunduğu **doğrulanmadı**. Normal sandbox ve yükseltilmiş ağ izniyle yapılan iki tarayıcı denemesinde `net::ERR_TUNNEL_CONNECTION_FAILED`; TR/EN Preview panel testi **NOT VERIFIED**. [preview-browser.json](preview-browser.json). Üretim ortamı veya Vercel config/env değişikliği yapılmadı; manuel deploy tetiklenmedi.

Owner testinden önce PR #122 Vercel deployment'ının GPU commit'ini içerdiğini ve READY olduğunu kontrol edin. Ardından `?sim5Perf=1` ile panelin açılması gerekir; Preview system environment gate yoksa güvenli şekilde kapalı kalır ve bu da yayın engelidir. Yerel development render entegrasyonunda panel, mobil genişlik ve anonim clipboard geçti; bu sonuç erişilemeyen Preview testinin yerine geçmez.

**NO-GO:** yeni Preview READY + Preview'da panel gate + gerçek donanım rota FPS/p95/p99 doğrulaması beklenir. Merge/production dağıtımı için yetki yoktur.

English: application commits are pushed to the existing Draft PR. No READY deployment for the GPU SHA was returned. The old READY URL is CPU-only. Both ordinary and elevated browser attempts to the branch alias failed with a proxy tunnel error, so on-Preview diagnostics remain NOT VERIFIED. Do not treat the alias as a verified new build or local software-GPU results as hardware acceptance. No manual deploy or configuration changes were made.
