import { PDFDocument, rgb } from "pdf-lib";
import sharp from "sharp";

const TOOLBOX_FIELD_PHOTOS: Record<string, string> = {
  "excavation-safety":
    "https://images.pexels.com/photos/5579584/pexels-photo-5579584.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

export async function applyToolboxPhotoOverlay(
  pdfBytes: Uint8Array,
  slug: string,
): Promise<Uint8Array> {
  const photoUrl = TOOLBOX_FIELD_PHOTOS[slug];
  if (!photoUrl) return pdfBytes;

  try {
    const response = await fetch(photoUrl, { cache: "force-cache" });
    if (!response.ok) return pdfBytes;

    const source = Buffer.from(await response.arrayBuffer());
    const cropped = await sharp(source)
      .resize(966, 822, { fit: "cover", position: "attention" })
      .jpeg({ quality: 90 })
      .toBuffer();

    const pdf = await PDFDocument.load(pdfBytes);
    const page = pdf.getPages()[0];
    if (!page) return pdfBytes;

    const photo = await pdf.embedJpg(cropped);
    const x = 418;
    const y = 351;
    const width = 322;
    const height = 274;

    // White frame hides the legacy scenario card cleanly.
    page.drawRectangle({
      x: x - 4,
      y: y - 4,
      width: width + 8,
      height: height + 8,
      color: rgb(1, 1, 1),
    });

    page.drawImage(photo, { x, y, width, height });

    // SERNEM technical field-visual treatment.
    page.drawRectangle({
      x,
      y,
      width,
      height: 46,
      color: rgb(0.024, 0.082, 0.169),
      opacity: 0.94,
    });

    page.drawRectangle({
      x,
      y: y + height - 7,
      width,
      height: 7,
      color: rgb(0.055, 0.52, 0.95),
      opacity: 0.96,
    });

    // Numbered inspection markers: technical, language-neutral and reusable.
    const markers = [
      { n: 1, cx: x + 48, cy: y + 198, tx: x + 86, ty: y + 218 },
      { n: 2, cx: x + 246, cy: y + 194, tx: x + 278, ty: y + 222 },
      { n: 3, cx: x + 91, cy: y + 101, tx: x + 54, ty: y + 132 },
      { n: 4, cx: x + 257, cy: y + 92, tx: x + 286, ty: y + 126 },
    ];

    for (const marker of markers) {
      page.drawLine({
        start: { x: marker.cx, y: marker.cy },
        end: { x: marker.tx, y: marker.ty },
        thickness: 1.5,
        color: rgb(1, 1, 1),
        opacity: 0.9,
      });

      page.drawCircle({
        x: marker.cx,
        y: marker.cy,
        size: 10,
        color: rgb(0.055, 0.52, 0.95),
        borderColor: rgb(1, 1, 1),
        borderWidth: 1.4,
      });

      page.drawText(String(marker.n), {
        x: marker.cx - 2.8,
        y: marker.cy - 3.5,
        size: 8,
        color: rgb(1, 1, 1),
      });
    }

    // Four control chips in the dark footer. English abbreviations are deliberate:
    // compact, field-standard and safe for both TR/EN PDFs.
    const chips = ["EDGE", "ACCESS", "GROUND", "PLANT"];
    chips.forEach((label, index) => {
      const chipX = x + 10 + index * 77;
      page.drawRectangle({
        x: chipX,
        y: y + 12,
        width: 67,
        height: 22,
        color: rgb(0.075, 0.18, 0.31),
        borderColor: rgb(0.23, 0.55, 0.92),
        borderWidth: 0.7,
      });
      page.drawText(`${index + 1}  ${label}`, {
        x: chipX + 7,
        y: y + 19,
        size: 7.2,
        color: rgb(0.9, 0.95, 1),
      });
    });

    return pdf.save();
  } catch (error) {
    console.error("TOOLBOX PHOTO OVERLAY ERROR:", error);
    return pdfBytes;
  }
}
