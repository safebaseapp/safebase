import type {ReactNode} from 'react';
/** Existing PPE categories rendered as line SVGs, avoiding platform-dependent emoji. */
export default function PpeSymbol({symbol,kind}:{symbol:string;kind?:'welding-helmet'}){
 const shapes:Record<string,ReactNode>={
  '⛑️':<><path d="M18 64h64M25 64V48a25 25 0 0150 0v16M43 25v30M57 25v30M20 74h60"/></>,
  '🥽':<><path d="M14 38h72v28H57l-7-10-7 10H14zM22 38v28M78 38v28M14 44H5M86 44h9"/></>,
  '👓':<><rect x="13" y="38" width="31" height="27" rx="8"/><rect x="56" y="38" width="31" height="27" rx="8"/><path d="M44 47h12M13 43L5 32M87 43l8-11"/></>,
  '🧤':<path d="M30 83V55L18 39c-5-8 3-13 9-6l10 10V19c0-9 12-9 12 0v25-32c0-8 12-8 12 0v32-26c0-8 12-8 12 0v28-15c0-8 12-8 12 0v32L70 83z"/>,
  '🥾':<path d="M23 13h39v42l24 13v17H15V66h8zM34 29h15M34 41h15M15 75h71"/>,
  '🦺':<path d="M35 16l15 16 15-16 18 12v57H17V28zM50 32v53M18 56h64M30 20v35M70 20v35"/>,
  '🪢':<><path d="M28 15l22 30 22-30M28 15l-7 45 13 27 16-26 16 26 13-27-7-45M26 50h48M30 65h40"/><circle cx="50" cy="47" r="7"/></>,
  '🧥':<path d="M32 15l18 13 18-13 23 26-15 14-7-9v40H31V46l-7 9L9 41zM50 28v58"/>,
  '🥼':<path d="M32 15l18 13 18-13 23 26-15 14-7-9v40H31V46l-7 9L9 41zM50 28v58M34 56h10M56 56h10"/>,
  '😷':<><path d="M28 37q22-15 44 0v28q-22 25-44 0zM28 42C7 30 5 74 28 65M72 42c21-12 23 32 0 23"/><circle cx="50" cy="56" r="13"/></>,
  '👕':<path d="M32 15q18 18 36 0l25 24-17 17-9-9v39H33V47l-9 9L7 39z"/>,
  '🛡️':<path d="M50 10l33 13v27c0 22-15 33-33 43C32 83 17 72 17 50V23zM32 49l13 14 25-31"/>,
 };
 return <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{kind==='welding-helmet'?<><path d="M25 18q25-15 50 0v53L50 91 25 71zM25 46L12 51v18l13 2"/><rect x="34" y="32" width="32" height="21" rx="3"/></>:shapes[symbol]??<path d="M30 28q20-20 40 0 8 14-20 26v13M50 80v2"/>}</svg>;
}
