import { PDFDocument, rgb } from "pdf-lib";

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

    const photoBytes = new Uint8Array(await response.arrayBuffer());
    const pdf = await PDFDocument.load(pdfBytes);
    const page = pdf.getPages()[0];
    if (!page) return pdfBytes;

    const photo = await pdf.embedJpg(photoBytes);
    const x = 418;
    const y = 351;
    const width = 322;
    const height = 274;

    page.drawRectangle({
      x: x - 3,
      y: y - 3,
      width: width + 6,
      height: height + 6,
      color: rgb(1, 1, 1),
    });

    page.drawImage(photo, {
      x,
      y,
      width,
      height,
    });

    page.drawRectangle({
      x,
      y,
      width,
      height: 58,
      color: rgb(0.025, 0.082, 0.169),
      opacity: 0.92,
    });

    return pdf.save();
  } catch {
    return pdfBytes;
  }
}
