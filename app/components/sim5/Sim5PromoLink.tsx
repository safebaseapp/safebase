"use client";
import Link from "next/link";
import {trackEvent} from "@/lib/analytics";
export default function Sim5PromoLink({locale,kind,surface,className,children,onNavigate}:{locale:"tr"|"en";kind:"demo"|"premium";surface:"homepage"|"labs"|"menu";className?:string;children:React.ReactNode;onNavigate?:()=>void}) {
 return <Link href={`/${locale}/labs/sim5${kind==="demo"?"/demo":""}`} className={className} onClick={()=>{trackEvent(kind==="demo"?"sim5_demo_cta_click":"sim5_premium_cta_click",{locale,surface,mode:kind==="demo"?"demo":"full"});onNavigate?.();}}>{children}</Link>;
}
