'use client';

import {useEffect, useState} from 'react';
import {createPortal} from 'react-dom';

type Props={src:string;alt:string;locale:'tr'|'en';code:string;className?:string};
export default function PPEImageZoom({src,alt,locale,code,className='absolute inset-0 z-10'}:Props){
 const [open,setOpen]=useState(false);
 useEffect(()=>{
  if(!open)return;
  const onKey=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false)};
  document.addEventListener('keydown',onKey);
  const previous=document.body.style.overflow;
  document.body.style.overflow='hidden';
  return()=>{document.removeEventListener('keydown',onKey);document.body.style.overflow=previous};
 },[open]);
 return <>
  <button type="button" className={className} onClick={()=>setOpen(true)}
   aria-label={locale==='tr'?code+' görselini büyüt': 'Enlarge '+code+' image'}
   title={locale==='tr'?'Görseli büyüt':'Enlarge image'}>
   <span className="sr-only">{locale==='tr'?'Görseli büyüt':'Enlarge image'}</span>
  </button>
  {open&&createPortal(<div role="dialog" aria-modal="true" aria-label={locale==='tr'?'KKD görseli':'PPE image'}
   className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/95 p-3 sm:p-8"
   onMouseDown={e=>{if(e.target===e.currentTarget)setOpen(false)}}>
   <button type="button" onClick={()=>setOpen(false)} autoFocus
    className="absolute right-4 top-4 z-20 rounded-full border border-white/30 bg-slate-900 px-4 py-2 text-sm font-bold text-white hover:bg-slate-700"
    aria-label={locale==='tr'?'Kapat':'Close'}>{locale==='tr'?'✕ Kapat':'✕ Close'}</button>
   <figure className="relative flex max-h-[90vh] w-full max-w-6xl flex-col items-center overflow-hidden rounded-2xl border border-white/20 bg-slate-900">
    <div className="relative flex min-h-0 w-full items-center justify-center bg-black">
     <img src={src} alt={alt} className="max-h-[75vh] w-full object-contain"/>
     <div className="pointer-events-none absolute bottom-3 right-3 rounded-xl border border-white/30 bg-slate-950/80 px-3 py-2 text-right text-white shadow-lg backdrop-blur">
      <div className="text-sm font-black tracking-[.18em]">SERNEM</div>
      <div className="text-[10px] font-bold tracking-widest text-cyan-300">LABS · HSE LIBRARY</div>
     </div>
    </div>
    <figcaption className="w-full px-4 py-3 text-sm text-slate-200"><strong className="mr-2 text-white">{code}</strong>{alt}</figcaption>
   </figure>
  </div>,document.body)}
 </>;
}
