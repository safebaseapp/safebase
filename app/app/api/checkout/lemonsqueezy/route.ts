import { NextRequest, NextResponse } from "next/server";

const API = "https://api.lemonsqueezy.com/v1";
const PRODUCT_NAME = "SERNEM Premium – Professional HSE Tools";

async function lemon(path: string, init?: RequestInit) {
  const key = process.env.LEMONSQUEEZY_API_KEY;

  if (!key) {
    throw new Error("LEMONSQUEEZY_API_KEY missing");
  }

  return fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${key}`,
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
}

export async function GET(req: NextRequest) {
  try {
    const locale = req.nextUrl.searchParams.get("locale") === "tr" ? "tr" : "en";

    const productsRes = await lemon("/products?include=variants&page[size]=100");

    if (!productsRes.ok) {
      const text = await productsRes.text();
      console.error("Lemon products error:", productsRes.status, text);
      return NextResponse.json({ error: "Products could not be loaded" }, { status: 502 });
    }

    const productsJson = await productsRes.json();

    const product = productsJson.data?.find(
      (item: any) =>
        item?.attributes?.name === PRODUCT_NAME &&
        item?.attributes?.status === "published" &&
        item?.attributes?.test_mode === false
    );

    if (!product) {
      return NextResponse.json(
        { error: "Live SERNEM Premium product not found" },
        { status: 404 }
      );
    }

    const variant = productsJson.included?.find(
      (item: any) =>
        item?.type === "variants" &&
        String(item?.relationships?.product?.data?.id) === String(product.id)
    );

    if (!variant) {
      return NextResponse.json(
        { error: "Live SERNEM Premium variant not found" },
        { status: 404 }
      );
    }

    const isTurkish = locale === "tr";

    const payload = {
      data: {
        type: "checkouts",
        attributes: {
          product_options: {
            name: isTurkish
              ? "SERNEM Premium – Profesyonel HSE Araçları"
              : "SERNEM Premium – Professional HSE Tools",
            description: isTurkish
              ? "Premium HSE araçlarının, profesyonel PDF raporlarının, risk değerlendirmelerinin, method statement araçlarının, kontrol listelerinin ve gelişmiş SERNEM özelliklerinin kilidini açın."
              : "Unlock premium HSE tools, professional PDF reports, risk assessments, method statements, checklists, and advanced SERNEM features.",
            locale,
            redirect_url: `https://www.sernem.com/${locale}/account`,
          },
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: String(product.attributes.store_id),
            },
          },
          variant: {
            data: {
              type: "variants",
              id: String(variant.id),
            },
          },
        },
      },
    };

    const checkoutRes = await lemon("/checkouts", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!checkoutRes.ok) {
      const text = await checkoutRes.text();
      console.error("Lemon checkout error:", checkoutRes.status, text);
      return NextResponse.json({ error: "Checkout could not be created" }, { status: 502 });
    }

    const checkoutJson = await checkoutRes.json();
    const url = checkoutJson?.data?.attributes?.url;

    if (!url) {
      return NextResponse.json({ error: "Checkout URL missing" }, { status: 502 });
    }

    return NextResponse.redirect(url, 303);
  } catch (error) {
    console.error("Lemon checkout route error:", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
