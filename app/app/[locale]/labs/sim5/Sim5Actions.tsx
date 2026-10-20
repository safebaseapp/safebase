"use client";
import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
export function Sim5GateEvent({tr}:{tr:boolean}) {
 const fired=useRef(false);
 useEffect(()=>{if(!fired.current){fired.current=true;trackEvent("sim5_premium_gate_view",{locale:tr?"tr":"en",mode:"full"});}},[tr]);
 return null;
}
export function Sim5UnlockLink({href,tr,children}:{href:string;tr:boolean;children:React.ReactNode}) {
 return <a className="inline-flex min-h-12 items-center rounded-lg border px-5" href={href} onClick={()=>trackEvent("sim5_upgrade_click",{locale:tr?"tr":"en",mode:"full"})}>{children}</a>;
}
