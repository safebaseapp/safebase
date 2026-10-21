import type { Metadata } from "next";
import { headers } from "next/headers";
import { getGuideBySlug } from "./data/guides/all-guides";
// Fourteen dedicated guide routes do not inherit [slug]/page metadata.
// This public fallback uses the pathname header already set by the existing proxy.
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata> {
  const {locale}=await params;
  if(locale!=="tr"&&locale!=="en")return {};
  const requestHeaders=await headers();
  const slug=requestHeaders.get("x-sernem-pathname")?.match(/^\/(?:tr|en)\/knowledge-base\/([^/]+)\/?$/)?.[1];
  const guide=slug?getGuideBySlug(slug):null;
  if(!guide)return {};
  const en=`https://www.sernem.com/en/knowledge-base/${guide.slug}`;
  const tr=`https://www.sernem.com/tr/knowledge-base/${guide.slug}`;
  const canonical=locale==="tr"?tr:en;
  return {title:guide.title[locale],description:guide.description[locale],
    alternates:{canonical,languages:{en,tr,"x-default":en}},
    openGraph:{title:guide.title[locale],description:guide.description[locale],url:canonical,type:"article",locale:locale==="tr"?"tr_TR":"en_US"},
  };
}
export default function KnowledgePublicMetadataLayout({children}:{children:React.ReactNode}){return children;}
