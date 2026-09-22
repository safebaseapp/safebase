import { generatePremiumToolboxPdf } from "@/lib/pdf/premium-toolbox-pdf";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, rgb } from "pdf-lib";
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getToolboxBySlug } from "@/lib/toolbox/toolbox-data";
import { premiumMasterSlugSet } from "@/lib/toolbox/premium-master-slugs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

const BUCKET_NAME = "company-assets";



function getSafeLocale(request: Request) {
  const url = new URL(request.url);
  return url.searchParams.get("locale") === "tr" ? "tr" : "en";
}

function createSafeUrl(request: Request, pathname: string) {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const requestHost = request.headers.get("host");
  const forwardedProto = request.headers.get("x-forwarded-proto");

  let host = forwardedHost || requestHost || "localhost:3000";
  const protocol = forwardedProto || "http";

  if (
    host.startsWith("0.0.0.0") ||
    host.startsWith("[::]") ||
    host.startsWith("::")
  ) {
    const port = host.includes(":")
      ? host.split(":").pop()
      : "3000";

    host = `localhost:${port}`;
  }

  return new URL(pathname, `${protocol}://${host}`);
}

function createDownloadName(slug: string, locale: "tr" | "en") {
  return `${slug}-toolbox-talk-${locale}-branded.pdf`;
}

export async function GET(request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const locale = getSafeLocale(request);

  const toolbox = getToolboxBySlug(slug);

  if (!toolbox) {
    return NextResponse.json(
      {
        error:
          locale === "tr"
            ? "Toolbox bulunamadı."
            : "Toolbox not found.",
      },
      { status: 404 },
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const nextPath = `${new URL(request.url).pathname}${new URL(request.url).search}`;
    const loginUrl = createSafeUrl(request, `/${locale}/login`);
    loginUrl.searchParams.set("next", nextPath);

    return NextResponse.redirect(
      loginUrl,
    );
  }

  const userId = user.id;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("plan,role,status")
    .eq("id", user.id)
    .single();

  if (
    profileError ||
    !profile ||
    profile.status === "suspended"
  ) {
    return NextResponse.redirect(
      createSafeUrl(request, `/${locale}/dashboard`),
    );
  }

  const isPremium =
    profile.plan === "premium" || profile.role === "admin";

  if (!isPremium) {
    return NextResponse.redirect(
      createSafeUrl(request, `/${locale}/upgrade`),
    );
  }


  async function trackPdfDownload(
    mode: "company" | "standard" | "branded"
  ) {
    const { error } = await supabase
      .from("user_activity_events")
      .insert({
        user_id: userId,
        event_name: "pdf_download",
        path: request.url,
        metadata: {
          resource_type: "toolbox",
          slug,
          locale,
          mode,
        },
      });

    if (error) {
      console.error("PDF activity tracking error:", error);
    }
  }

  const { data: logoFiles, error: listError } =
    await supabase.storage
      .from(BUCKET_NAME)
      .list(user.id, {
        limit: 20,
      });

  if (listError) {
    console.error("Company logo list error:", listError);

    return NextResponse.json(
      {
        error:
          locale === "tr"
            ? "Şirket logosu okunamadı."
            : "The company logo could not be read.",
      },
      { status: 500 },
    );
  }

  const logoFile = logoFiles?.find((file) =>
    /^logo\.(png|jpg|jpeg|webp)$/i.test(file.name),
  );

  let logoBlob: Blob | null = null;

  if (logoFile) {
    const logoPath = `${user.id}/${logoFile.name}`;

    const { data, error: logoDownloadError } =
      await supabase.storage
        .from(BUCKET_NAME)
        .download(logoPath);

    if (logoDownloadError || !data) {
      console.error(
        "Company logo download error:",
        logoDownloadError,
      );
    } else {
      logoBlob = data;
    }
  }

  let documentProfile: {
    projectName?: string;
    siteName?: string;
    workArea?: string;
    presentedBy?: string;
    revision?: string;
  } | null = null;

  try {
    const profilePath = `${user.id}/document-profile.json`;

    const { data: profileBlob, error: profileDownloadError } =
      await supabase.storage
        .from(BUCKET_NAME)
        .download(profilePath);

    if (!profileDownloadError && profileBlob) {
      const parsed = JSON.parse(await profileBlob.text());

      if (parsed && typeof parsed === "object") {
        documentProfile = {
          projectName:
            typeof parsed.projectName === "string"
              ? parsed.projectName
              : "",
          siteName:
            typeof parsed.siteName === "string"
              ? parsed.siteName
              : "",
          workArea:
            typeof parsed.workArea === "string"
              ? parsed.workArea
              : "",
          presentedBy:
            typeof parsed.presentedBy === "string"
              ? parsed.presentedBy
              : "",
          revision:
            typeof parsed.revision === "string"
              ? parsed.revision
              : "00",
        };
      }
    }
  } catch (error) {
    console.error("Document profile read error:", error);
  }

  /*
    PREMIUM MASTER PDFs
    -------------------
    Normal ve logolu dokumanlar ayri master tasarimlardir. Sirket logosu,
    SERNEM markasini sonradan kapatmak yerine ayrilmis ust-sol kurumsal
    alana yerlestirilir.
  */
  if (premiumMasterSlugSet.has(slug) && logoFile && logoBlob) {
    try {
      const brandedBasePath = path.join(
        process.cwd(),
        "public",
        "downloads",
        `${slug}-toolbox-talk-${locale}-branded-base.pdf`,
      );

      const brandedBaseBytes = await readFile(brandedBasePath);
      const pdfDocument = await PDFDocument.load(brandedBaseBytes);
      const firstPage = pdfDocument.getPages()[0];

      if (!firstPage) {
        throw new Error("PDF does not contain any pages.");
      }

      const logoBytes = new Uint8Array(await logoBlob.arrayBuffer());
      const extension = logoFile.name.split(".").pop()?.toLowerCase();
      const mimeType = logoBlob.type.toLowerCase();

      const isPng = mimeType === "image/png" || extension === "png";
      const isJpeg =
        mimeType === "image/jpeg" ||
        mimeType === "image/jpg" ||
        extension === "jpg" ||
        extension === "jpeg";

      const embeddedLogo = isPng
        ? await pdfDocument.embedPng(logoBytes)
        : isJpeg
          ? await pdfDocument.embedJpg(logoBytes)
          : null;

      if (!embeddedLogo) {
        return NextResponse.json(
          {
            error:
              locale === "tr"
                ? "Logolu PDF için PNG veya JPG logo yükleyin."
                : "Upload a PNG or JPG logo for branded PDFs.",
          },
          { status: 415 },
        );
      }

      const { height: pageHeight } = firstPage.getSize();
      const maxLogoWidth = 150;
      const maxLogoHeight = 40;
      const scale = Math.min(
        maxLogoWidth / embeddedLogo.width,
        maxLogoHeight / embeddedLogo.height,
        1,
      );
      const logoWidth = embeddedLogo.width * scale;
      const logoHeight = embeddedLogo.height * scale;

      firstPage.drawImage(embeddedLogo, {
        x: 45.35,
        y: pageHeight - 34 - logoHeight,
        width: logoWidth,
        height: logoHeight,
      });

      const brandedPdfBytes = await pdfDocument.save();
      await trackPdfDownload("company");

      return new NextResponse(Buffer.from(brandedPdfBytes), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition":
            `attachment; filename="${createDownloadName(slug, locale)}"`,
          "Cache-Control": "private, no-store, max-age=0",
        },
      });
    } catch (error) {
      console.error("Premium master branded PDF error:", error);

      return NextResponse.json(
        {
          error:
            locale === "tr"
              ? "Logolu PDF oluşturulamadı."
              : "The branded PDF could not be generated.",
        },
        { status: 500 },
      );
    }
  }

  /*
    TRUE PREMIUM WHITE-LABEL MODE
    --------------------------------------------------
    Şirket logosu varsa hazır SERNEM PDF modifiye edilmez.
    Toolbox verisinden tamamen yeni 3 sayfalık şirket PDF'i üretilir.
  */
  if (logoFile && logoBlob) {
    const logoBytes = new Uint8Array(
      await logoBlob.arrayBuffer(),
    );

    const extension = logoFile.name
      .split(".")
      .pop()
      ?.toLowerCase();

    const logoMime =
      logoBlob.type ||
      (extension === "webp"
        ? "image/webp"
        : extension === "jpg" || extension === "jpeg"
          ? "image/jpeg"
          : "image/png");

    const premiumPdfBytes =
      await generatePremiumToolboxPdf({
        slug,
        locale: locale as "tr" | "en",
        logoBytes,
        logoMime,
        documentProfile: documentProfile ?? undefined,
      });

    const premiumFilename =
      `${slug}-toolbox-talk-${locale}-company.pdf`;

    await trackPdfDownload("company");

    return new NextResponse(
      Buffer.from(premiumPdfBytes),
      {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition":
            `attachment; filename="${premiumFilename}"`,
          "Cache-Control":
            "private, no-store, max-age=0",
        },
      },
    );
  }

  const sourcePdfPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    `${slug}-toolbox-talk-${locale}.pdf`,
  );

  let sourcePdfBytes: Uint8Array;

  try {
    sourcePdfBytes = await readFile(sourcePdfPath);
  } catch (error) {
    console.error("Source toolbox PDF read error:", error);

    return NextResponse.json(
      {
        error:
          locale === "tr"
            ? "Kaynak toolbox PDF dosyası bulunamadı."
            : "The source toolbox PDF could not be found.",
      },
      { status: 404 },
    );
  }

  try {
    const pdfDocument = await PDFDocument.load(sourcePdfBytes);
    const firstPage = pdfDocument.getPages()[0];

    if (!firstPage) {
      throw new Error("PDF does not contain any pages.");
    }

    if (!logoFile || !logoBlob) {
      const standardFilename =
        `${slug}-toolbox-talk-${locale}.pdf`;

      await trackPdfDownload("standard");

      return new NextResponse(Buffer.from(sourcePdfBytes), {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition":
            `attachment; filename="${standardFilename}"`,
          "Cache-Control": "private, no-store, max-age=0",
        },
      });
    }

    const logoBytes = new Uint8Array(
      await logoBlob.arrayBuffer(),
    );

    const extension = logoFile.name
      .split(".")
      .pop()
      ?.toLowerCase();

    const mimeType = logoBlob.type.toLowerCase();

    const isPng =
      mimeType === "image/png" ||
      extension === "png";

    const isJpeg =
      mimeType === "image/jpeg" ||
      mimeType === "image/jpg" ||
      extension === "jpg" ||
      extension === "jpeg";

    const embeddedLogo =
      isPng
        ? await pdfDocument.embedPng(logoBytes)
        : isJpeg
          ? await pdfDocument.embedJpg(logoBytes)
          : null;

    /*
      pdf-lib doğrudan WebP yerleştiremez.
      PNG/JPEG kontrolünde MIME tipi önceliklidir;
      dosya uzantısı yalnızca fallback olarak kullanılır.
    */
    if (!embeddedLogo) {
      return NextResponse.json(
        {
          error:
            locale === "tr"
              ? "Logolu PDF için PNG veya JPG logo yükleyin."
              : "Upload a PNG or JPG logo for branded PDFs.",
        },
        { status: 415 },
      );
    }

    const pages = pdfDocument.getPages();

    /*
      PREMIUM COMPANY BRANDED MODE
      ------------------------------------------------
      Şirket logosu varsa tüm PDF şirket dokümanı görünümüne geçer.
      SERNEM header/footer branding alanları kapatılır.
    */

    const maxLogoWidth = 165;
    const maxLogoHeight = 54;

    const scale = Math.min(
      maxLogoWidth / embeddedLogo.width,
      maxLogoHeight / embeddedLogo.height,
      1,
    );

    const logoWidth = embeddedLogo.width * scale;
    const logoHeight = embeddedLogo.height * scale;

    pages.forEach((page, index) => {
      const { width: pageWidth, height: pageHeight } = page.getSize();

      // Alt SERNEM footer alanını tüm sayfalarda kapat.
      page.drawRectangle({
        x: 0,
        y: 0,
        width: pageWidth,
        height: 42,
        color: rgb(0.025, 0.075, 0.15),
      });

      // Footer yerine nötr kurumsal doküman etiketi.
      page.drawText("TOOLBOX TALK", {
        x: 42,
        y: 16,
        size: 8,
        color: rgb(0.65, 0.72, 0.82),
      });

      // İlk iki sayfada üstteki SERNEM TOOLBOX TALK alanını kapat.
      if (index === 0 || index === 1) {
        page.drawRectangle({
          x: 42,
          y: pageHeight - 50,
          width: 220,
          height: 20,
          color: rgb(0.025, 0.075, 0.15),
        });

        page.drawText("TOOLBOX TALK", {
          x: 44,
          y: pageHeight - 43,
          size: 10,
          color: rgb(0.25, 0.72, 1),
        });
      }

      // Firma logosu ilk sayfada başlığı kapatmasın.
      // Sadece 2. ve 3. sayfada göster.
      if (index > 0) {
        const logoX = pageWidth - logoWidth - 28;
        const logoY = pageHeight - logoHeight - 18;

        page.drawRectangle({
          x: logoX - 8,
          y: logoY - 6,
          width: logoWidth + 16,
          height: logoHeight + 12,
          color: rgb(1, 1, 1),
        });

        page.drawImage(embeddedLogo, {
          x: logoX,
          y: logoY,
          width: logoWidth,
          height: logoHeight,
        });
      }
    });

    const brandedPdfBytes = await pdfDocument.save();
    const filename = createDownloadName(slug, locale);

    await trackPdfDownload("branded");

    return new NextResponse(Buffer.from(brandedPdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Branded toolbox PDF generation error:", error);

    return NextResponse.json(
      {
        error:
          locale === "tr"
            ? "Logolu PDF oluşturulamadı."
            : "The branded PDF could not be generated.",
      },
      { status: 500 },
    );
  }
}
