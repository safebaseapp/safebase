## Sorun / düzeltme

#151, gömülü yazıların videoda bulunduğunu varsayarak görünür hero başlık ve açıklamalarını kaldırdı. Gerçek MP4 karelerinde metin yok; metin eski PNG posterine gömülü. Değiştirilmemiş filmin ilk karesinden yazısız WebP poster çıkarıldı ve istenen TR/EN HTML başlık/açıklama mevcut hero düzeniyle geri getirildi. Üç CTA ve Premium tıklama olayı korundu.

Uygulama değişikliği yalnız CinematicHome.tsx + yeni 77KB poster. Video, orijinal PNG, CSS, motion mantığı ve hero sonrası SIM/LABS/diğer içerik aynı; tüm sayfa rollback edilmedi.

## Doğrulama / yayın kapısı

- 26 yerel Chromium testi PASS: iki dil × dört genişlik; gerçek currentTime ilerlemesi, gerçek end-loop, pause/resume, reduced motion, yavaş-video poster, görünür metin/link/geometri ve tek Premium olayı.
- TR/EN SIM/LABS sunum smoke'u; kaynak hash koruması.
- TypeScript PASS; ilgili ESLint 0 hata/1 mevcut uyarı.
- Normal build Google Fonts ağ engeliyle FAIL/BLOCKED. Yerel gerçek-font fixture + Webpack production-mode build PASS; normal/Vercel build yerine sunulmaz.
- Preview/live E2E NOT VERIFIED. www erişimi CONNECT 403.

Rapor ve ekranlar: docs/hero-repair/REPORT.md ve evidence/.

Draft / yayın için NO-GO: Preview ve normal build/uzak kabul doğrulanmadan merge veya production dağıtımı yapılmadı. Payment/Auth/Supabase/SIM değişikliği yok.
