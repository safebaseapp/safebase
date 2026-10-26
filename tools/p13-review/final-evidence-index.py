import pathlib,json
p=pathlib.Path('docs/p13-review/final-revision');colors=json.loads((p/'color-results.json').read_text())['results'];fonts={r['file']:r for r in json.loads((p/'after-fonts.json').read_text())['results']};lines=['# 60 gerçek PDF: önce/sonra renk ve font kanıtları','', 'Başlangıç `4186391a31ae4fbcb455df56f1b4aa16d9526a8d`. Rasterler gerçek 170 dpi PDF çıktısından lossless WebP olarak saklanır; A4 ve A3 ayrı üretilir. Doygunluk: HSV S>100/255 ve V>65/255. Bu oran tek başına kalite kabulü değildir.','', '| PDF | Önce | Sonra | Doygun alan önce → sonra | Gövde / kritik pt |','|---|---|---|---:|---:|']
for r in colors:
 stem=r['file'][:-4];f=fonts[r['file']];lines.append(f"| {r['file']} | [Görsel](before-{stem}.webp) | [Görsel](after-{stem}.webp) | %{r['beforeSaturatedPercent']:.2f} → %{r['afterSaturatedPercent']:.2f} | {f['bodyMinimumPt']:.3f} / {f['criticalMinimumPt']:.3f} |")
(p/'EVIDENCE-INDEX.md').write_text('\n'.join(lines)+'\n')
