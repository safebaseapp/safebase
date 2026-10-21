# Issue #119 — güvenli P11 mobil/PDF ayrıştırması

21 Ekim 2026, Europe/Budapest. **Dar UI/PDF kapsamı manuel incelemeye hazır. Yayın/merge yapılmadı; kullanıcı onayı bekleniyor.** Ek JavaScript-kapalı kontrolde kalan 1 mevcut sorun aşağıda açıkça FAIL; main'in ödeme güvenliğine ilişkin bir GO verilmez.

## Kaynak ve sınır

- Main başlangıç/rollback: **`892ebcec9d5098880e7f5d2cab392332666a2b95`**, onaylı P12 #117 dahil. Branch `codex/p11-safe-ui-pdf-closeout` doğrudan current `origin/main` üzerinden açıldı.
- P11 source: **`1f48f44a2d620e15ab8dffe6dc7e6bf0c47c137f`**, Draft PR #115; Issue #114, audit/release/followup ve freeze/kapanış yorumları okundu. Sadece seçilmiş üç dosyanın main→P11 diff'i `git apply` ile uygulandı; merge/cherry-pick veya bütün dosya overwrite yok. Üç delta main'de mevcut değildi; aynı işi yeniden yapan başka kaynak kopyalanmadı.
- Yalnız **3 application dosyası, 6 ekleme / 6 silme**. Değişiklik checkpoint'i `9d9b3890`. [Tam seçilmiş patch](results/safe-deltas.patch).
- Ödeme/Lemon/Premium/trial/webhook/auth/üyelik/Supabase/API/brand/logo/private gate/SIM/XP dosyası veya prod/env değişikliği yok. Kod davranışı ve access handler'ları aynı; P12 application dosyalarıyla **0 kesişim**. [Koruma](results/protection.json).

| Dosya | Taşınan tek değişiklik | Bağımsızlık |
|---|---|---|
| DownloadsClient.tsx | mobile grid-cols-1, article min-w-0, title break-words | Sınıf string'leri hariç main ile birebir aynı; href/data/action/access değişmedi |
| Method Statement page.tsx | yalnız print CTA sizing/padding class'ı | onClick ve bütün diğer kod main ile birebir aynı; JS-aktif baseline CTA zaten sınır içindeydi; yeni width constraints doğrudan istenen P11 sunum deltası |
| MethodStatementPrint.tsx | yalnız `#method-statement-print .ms-document-header { display: grid !important; }` specificity | Global print `header` gizleme kuralını hedefli ezer; doküman içeriği, props, tablo/pagination/PDF mantığı değişmedi |

## Önce → sonra

| Kontrol | Current main önce | Bu branch sonra |
|---|---|---|
| TR/EN × 320/360/390/1440; Downloads + Method Statement; JS aktif | **12 PASS / 4 FAIL** (Downloads TR/EN 320/360) | **16/16 PASS** |
| Aynı matris, JavaScript kapalı ilk HTML | **11 PASS / 5 FAIL** | **15 PASS / 1 FAIL** (mevcut EN 320 print-table taşması) |
| TR/EN × 320/1440 native A4 PDF | **4 FAIL**: header display none, başlık/doc control eksik; A4/body/proje verisi mevcut | **4/4 PASS**: header grid, TR/EN title + SRN-MS-001, çalışma içeriği ve test proje verisi, Türkçe glyphs |
| PDF pagination | Her örnek 2 sayfa | Her örnek yine 2 sayfa, A4 ölçüleri korunuyor |
| TypeScript | — | **PASS** |
| Etkilenen üç dosyada ESLint | — | **PASS: 0 error / 1 mevcut warning** (`PrintButton` unused import, main'de de var) |
| Normal build / normal prebuild | İlk font request 503 → izinli ağ tekrarında PASS | **PASS**, prebuild/PDF QA/download QA değiştirilmedi/atlanmadı |
| Kaynak koruma | — | **PASS**, yalnız allowlist ve saf presentation/specificity; access/API/P12 değişikliği yok |

[JS önce](results/before-browser.json) / [sonra](results/after-browser.json); [JS kapalı önce](results/before-ssr-browser.json) / [sonra](results/after-ssr-browser.json); [PDF önce](results/before-pdf.json) / [sonra](results/after-pdf.json). [TypeScript](results/tsc.log), [ESLint](results/eslint.log), [build](results/build-after.log), [koruma](results/protection.log). Native PDF renderer gerçekten PDF dosyası üretir; parse, sayfa/ölçü/metin ve görsel örnek incelendi.

### Kalan 1 FAIL — gizlenmedi

JavaScript kapalı EN 320'de `.ms-method-table` 328px genişliğinde ve document genişliğini 328px yapıyor; print CTA sınır içinde (sonrasında x=45, width=230). Tablo aynı biçimde baseline'da da var. Bu, onaylı print-button sizing ile çözülen bir buton hatası değildir. Onay yalnız print-header specificity olduğundan screen/SSR print-table kuralları değiştirilmedi. Normal JS-aktif görünüm 320px'de PASS; physical device testi yapılmadı. [Önce](evidence/before-ssr-en-320-method.png) / [sonra](evidence/after-ssr-en-320-method.png). Ayrıca [REMAINDER.md](REMAINDER.md) P2 olarak kaydedildi. “Tüm mobil testler geçti” denmiyor.

## PDF ve görünüm kanıtları

- TR Method [önce PDF](evidence/before-method-tr.pdf) / [sonra](evidence/after-method-tr.pdf), [önce sayfa](evidence/before-method-tr.png) / [sonra](evidence/after-method-tr.png).
- EN Method [önce PDF](evidence/before-method-en.pdf) / [sonra](evidence/after-method-en.pdf), [önce sayfa](evidence/before-method-en.png) / [sonra](evidence/after-method-en.png).
- Downloads 320 [TR önce](evidence/before-tr-320-downloads.png) / [sonra](evidence/after-tr-320-downloads.png), [EN önce](evidence/before-en-320-downloads.png) / [sonra](evidence/after-en-320-downloads.png).

Baskıda iki sayfa, gerçek A4 yaklaşık 595×842pt, template Working at Height/Yüksekte Çalışma ve yalnız sentetik `P119 — İ ı Ş ş Ğ ğ Ç ç Ö ö Ü ü` proje metni kullanıldı. Başlık eklenince content flow değişebilir; PDF byte/raster'ının aynı olduğu iddia edilmiyor. Sayfa sayısı, metin/glyphs ve A4 korunuyor. Dört gerçek önce/sonra PDF üzerinde önceki bütün metin kelimelerinin sonrasında da bulunduğu ayrıca kontrol edildi: [metin koruma](results/pdf-content.json). Bu kontrol tek başına layout doğrulaması değildir; görsel ve kaynak koruma kontrolleriyle birlikte kullanılır. Baseline body karşılaştırmasındaki case normalizasyonu aynı gerçek PDF artifact'larından düzeltildi; eksik header sonucu FAIL kaldı.

## Test izolasyonu / doğrulanmayanlar

Fake `http://127.0.0.1:54519` public Supabase URL/key, read-only loopback fixture; gerçek Supabase'a forwarding yok, GET/HEAD dışı 405. Browser dış ağ istekleri bloke edilir. Yeni test hesabı/session/cookie veya ödeme testi oluşturulmadı. Full UI üzerinde template yükleme ve sentetik proje girme, ardından Chromium native print PDF kullanıldı; auth kapısı değiştirilmedi veya kullanıcı oturumu varmış gibi raporlanmadı.

**Gerçek login/download authorization, ödeme/Premium expiry, provider E2E, Auth/Storage RLS, customer kayıtları, printer driver ve fiziksel telefon: NOT TESTED/kapsam dışı.** Hiçbiri bu UI/PDF PASS'lerinden çıkarılamaz. Export mantığının birebir aynı olması ve normal download QA geçmesi source-level regresyon kanıtıdır; gerçek ücretli/Free API erişim testi yerine geçmez. API dosyalarına hiç dokunulmadı.

İlk normal build dış Google fontuna 503 aldı; root layout/font/config değiştirilmedi. İzinli ağ tekrarında baseline normal build, sonra düzeltmeli normal build başarıyla tamamlandı. İlk başarısız build sonrası erken browser başlangıcı bağlantı kuramadı; final matrisler tamamlanmış build'lerde çalıştı. Prebuild'in ürettiği 280 incidental download PDF farkı geri alındı; gerçek kullanıcı dosyası değiştirilmedi. Build scriptleri/package lock/dependency değişikliği yok.

## Kapanış ve kabul önerisi

**Üç UI/print farkı inceleme için GO; koşulsuz production GO yok.** Onaylı dar farklar işlev/erişim kodu taşımadan ayrıldı; 1 ek SSR-only FAIL ayrı ertelenmiş durumda. Kapsam dışı expired entitlement dahil güvenlik bulguları [REMAINDER.md](REMAINDER.md) içinde **deferred**, main “kanıtlanmış güvenli” sayılmıyor. Bu PR ancak kullanıcı inceleme/onayıyla yayımlanabilir; rollback başlangıç main SHA'sıdır.

#115 Draft/open ve aynı head/history ile korunur. Bu yeni PR ayrıca onaylanıp yayımlandıktan ve stabil doğrulandıktan sonra #115'i **superseded/unmerged** kapatma kararı açıkça kullanıcıya getirilmeli; bu görevde kapatılmaz. Eski branch silinmez. Kullanıcı yeniden Lemon paneline veya kapanmış trial testlerini kurmaya yönlendirilmez.

## Yeniden çalıştırma

`node tools/p11-safe-closeout/fixture.mjs`; app'i açık fake URL/key ile normal build/start edin. `P119_URL=http://127.0.0.1:<port> P119_PHASE=before|after node tools/p11-safe-closeout/browser.mjs`; SSR için `P119_NO_JS=1` ve phase `before-ssr|after-ssr`. `node tools/p11-safe-closeout/protection.mjs` strict allowlist, P11 exact safe result ve main/P12 sınırını kontrol eder. Başlangıç ve bitiş server'ları farklı portlarda, tamamlanmış build'lerle çalıştırılmalı; build sırasında test yapılmamalı. Fixture/env değerleri deploy'a eklenmez.
