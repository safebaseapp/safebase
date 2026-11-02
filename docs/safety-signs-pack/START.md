# Safety Signs — güvenli başlangıç

29 Ekim 2026. Main `80a1a0e3e95931a5058a2fe45e6f00e7604a8382` fetch ile doğrulandı. Yeni dal `codex/safety-signs-library-qr-expansion`, ayrı worktree `/workspace/safety-signs`. Önceki `codex/sernem-live-site-quality-consolidated` değişikliklerine dokunulmadı. Rollback kaydı: evidence/baseline.json ve `/tmp/safety-signs-main.bundle`.

PR #128 head `f54a77d414acc158fbea65d126ce624d40a45f3d`: safety-signs/page.tsx yalnız metadata ekliyor. Bu dosyaya dokunulmaz; bu paketin kütüphane metadata'sı layout'ta yer alır, #128 birleşince sayfa metadata'sı öncelik kazanır. Poster/Premium değişiklikleri bu pakete taşınmaz.

PR #129 head `dca1225923e976d7a7d122fb240de026b447174d`: field forms ve sitemap eklemeleri. Sitemap mevcut data.ts listesinden işaretleri zaten üretir; yeni yayımlanmış işaret olmadan bu dosyaya gerek yok. Dosya değiştirilmeyecek. Her iki PR'ın file listesi evidence/ altında; commit'ler salt okunur fetch edildi.

Mevcut 36 slug ve 36 farklı ISO dosya eşleştirmesi var. `SRN-*` ürün kodları ISO kayıt numarası değildir. Mevcut SVG geometrileri değiştirilmeyecek. Bilinmeyen ikon için W001 sessiz fallback'i kaldırıldı: tanımsız kayıt render hatası verir; yanlış tehlike işareti göstermez.

Yeni semboller için ISO OBP ve Wikimedia lisans sayfaları normal ve izinli genişletilmiş salt okunur ağ denemesinde HTTP CONNECT 403. `@iso-safety-signs/assets` MIT paket lisansı, tekil Commons sanat eserinin lisansı değildir. 60 hedefi için sahte/izin belirsiz içerik yayımlanmaz; 24 aday BLOCKED listesinde tutulur.
