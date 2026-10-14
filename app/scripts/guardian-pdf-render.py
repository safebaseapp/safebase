#!/usr/bin/env python3
"""SERNEM Guardian Basic: render every shipped Toolbox PDF without paid services.

This is a rendering/structure smoke test, not a substitute for human visual
review or technical translation approval.
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PDF_DIR = ROOT / "public" / "downloads"
SLUG_FILE = ROOT / "lib" / "toolbox" / "premium-master-slugs.ts"
OUTPUT_DIR = Path(os.environ.get("GUARDIAN_REPORT_DIR", str(ROOT / "guardian-reports")))
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

text = SLUG_FILE.read_text(encoding="utf-8")
match = re.search(r"premiumMasterSlugs\s*=\s*\[([\s\S]*?)\]\s*as const", text)
if match is None:
    sys.exit("FAIL: Cannot find premiumMasterSlugs in source")
slugs = re.findall(r'"([^"]+)"', match.group(1))
if len(slugs) != 70:
    sys.exit(f"FAIL: Expected 70 Toolbox topics; found {len(slugs)}")

errors: list[str] = []
warnings: list[str] = []
checked = 0
rendered = 0
previews = 0
preview_slugs = {"scaffold-safety", "confined-space", "working-at-height", "hot-work"}

for slug in slugs:
    for locale in ("tr", "en"):
        for branded, suffix in ((False, ""), (True, "-branded-base")):
            filename = f"{slug}-toolbox-talk-{locale}{suffix}.pdf"
            pdf_path = PDF_DIR / filename
            if not pdf_path.is_file():
                errors.append(f"Missing: {filename}")
                continue
            try:
                with fitz.open(pdf_path) as document:
                    if document.needs_pass or document.page_count < 1:
                        errors.append(f"Unreadable or empty: {filename}")
                        continue
                    if branded and document.page_count != 4:
                        errors.append(f"Expected four branded pages: {filename}")
                    checked += 1
                    # Render every page (small scale keeps the free daily job fast).
                    for page_index, page in enumerate(document):
                        pixmap = page.get_pixmap(matrix=fitz.Matrix(0.5, 0.5), alpha=False)
                        rendered += 1
                        if pixmap.width < 20 or pixmap.height < 20:
                            errors.append(f"Invalid render size: {filename}, page {page_index + 1}")
                        ratio, color = pixmap.color_topusage()
                        # A fully white page is probably an export failure.
                        if ratio > 0.99999 and all(channel >= 245 for channel in color[:3]):
                            errors.append(f"Visually blank: {filename}, page {page_index + 1}")
                        extracted_text = page.get_text("text")
                        if "\ufffd" in extracted_text:
                            warnings.append(f"Replacement glyph in extracted text: {filename}, page {page_index + 1}")
                        for word in page.get_text("words"):
                            x0, y0, x1, y1 = word[:4]
                            if x1 < -2 or y1 < -2 or x0 > page.rect.width + 2 or y0 > page.rect.height + 2:
                                warnings.append(f"Off-page text: {filename}, page {page_index + 1}")
                                break
                        if branded and slug in preview_slugs and page_index in (0, 1, 3):
                            name = f"{slug}-{locale}-page-{page_index+1}.png"
                            pixmap.save(OUTPUT_DIR / name)
                            previews += 1
            except Exception as exc:
                errors.append(f"Could not render {filename}: {type(exc).__name__}: {exc}")

report = {
    "expected_pdfs": len(slugs) * 2 * 2,
    "checked_pdfs": checked,
    "rendered_pages": rendered,
    "saved_previews": previews,
    "errors": errors,
    "warnings": warnings,
}
(OUTPUT_DIR / "report.json").write_text(
    json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8"
)
summary = [
    "## Guardian PDF rendering audit",
    "",
    f"- Documents opened: **{checked}/{len(slugs)*4}**",
    f"- Pages actually rendered: **{rendered}**",
    f"- PNG sample previews: **{previews}**",
    f"- Errors: **{len(errors)}**",
    f"- Warnings requiring review: **{len(warnings)}**",
    "",
    "This automated smoke test detects rendering failures and blank pages; it does not certify text layout, translations, or branding accuracy.",
]
if errors:
    summary.extend(["", "### Failures", *[f"- {error}" for error in errors[:30]]])
if warnings:
    summary.extend(["", "### Warnings (first 20)", *[f"- {warning}" for warning in warnings[:20]]])
result = "\n".join(summary) + "\n"
print(result)
if os.environ.get("GITHUB_STEP_SUMMARY"):
    with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as stream:
        stream.write(result)
sys.exit(1 if errors else 0)
