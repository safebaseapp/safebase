import type {ReactNode} from 'react';
import type {TaskIconCode} from '@/lib/posters-v2/task-icons';
const document=<><rect x="22" y="10" width="56" height="80" rx="5"/><path d="M35 10v-5h30v5M34 30h30M34 44h20M35 67l10 10 25-28"/></>;
const flame=<><path d="M67 49c2 12-11 17-11 29a14 14 0 0028 0c0-11-8-17-8-25-2 5-4 8-7 10 2-5 1-9-2-14Z"/><path d="M68 88c-8-4-5-10 1-16 0 6 7 7 5 12"/></>;
const shapes:Record<TaskIconCode,ReactNode>={
 'hw-permit':document,
 'hw-combustibles':<><path d="M14 21h35v65H14zM21 21V11h21v10M49 39l9 7v16"/>{flame}<path d="M24 46l7-10 7 10-7 10z"/></>,
 'hw-gas-test':<><rect x="25" y="10" width="49" height="80" rx="8"/><rect x="34" y="24" width="31" height="25" rx="2"/><path d="M37 62h24M49 55v14M39 81h20M75 29c13 8 13 24 0 32"/></>,
 'hw-fire-watch':<><circle cx="28" cy="22" r="10"/><path d="M13 79V59q15-25 30 0v20M38 29l17 8M54 34l-2 9M48 83h43"/>{flame}</>,
 'hw-extinguisher':<><rect x="29" y="31" width="35" height="56" rx="7"/><path d="M37 31V20h20v11M44 20V10h24l10 10M64 42h10q14 0 14 15v11M37 55h19M37 68h19"/></>,
 'hw-spark-barrier':<><path d="M10 25l34 26-11 14L5 44M48 61l12 9M51 48l14 1M46 74l6 11M75 14v75M87 14v75M75 14h12M75 89h12"/><path d="M38 54l15-12"/></>,
 'hw-cylinders':<><rect x="12" y="27" width="25" height="61" rx="10"/><path d="M19 27V16h11v11M17 16h16M37 47h13q20 0 20 20v12q0 12-12 12H46"/><rect x="60" y="20" width="24" height="43" rx="8"/><path d="M66 20V9h12v11M63 9h18M84 36h10v25"/></>,
 'hw-post-watch':<><circle cx="31" cy="36" r="25"/><path d="M31 20v18l14 8M12 80h34"/>{flame}<path d="M53 14h32M77 7l8 7-8 7"/></>,
 'wah-plan':document,
 'wah-anchor':<><rect x="16" y="12" width="68" height="28" rx="3"/><circle cx="26" cy="25" r="3"/><circle cx="74" cy="25" r="3"/><path d="M36 40v15q0 22 14 22t14-22V40M43 55h14M50 77v13"/></>,
 'wah-clearance':<><path d="M14 14h55M23 14v21M50 14v29M50 64v18M38 72h24M80 18v66M73 25l7-7 7 7M73 77l7 7 7-7M12 90h78"/><circle cx="50" cy="52" r="9"/></>,
 'wah-tools':<><path d="M14 17l14 7 5 14-10 11-14-5-5-13 12 6 10-10M25 47l28 32M61 18c-20 0-20 24 0 24s20 24 0 24M61 66v23"/><circle cx="55" cy="82" r="8"/></>,
 'wah-rescue':<><path d="M10 88L45 9l35 79M45 9v44M35 39h20M8 88h74M43 75v16M32 82h23"/><circle cx="44" cy="64" r="10"/><path d="M78 31h17M86 23v17"/></>,
 'scf-inspect':document,
 'scf-status':<><path d="M18 16h44l22 22v48H18zM62 16v22h22M30 56l12 13 27-25"/><circle cx="31" cy="30" r="4"/></>,
 'scf-foundation':<><path d="M17 84h22M61 84h22M27 20v64M73 20v64M27 27h46M27 71l46-44M27 27l46 44M12 93h76"/></>,
 'scf-platform':<><path d="M10 65h80M15 40h70v25H15zM28 40v25M43 40v25M58 40v25M73 40v25M24 65v26M76 65v26"/></>,
 'scf-load':<><path d="M10 80h80M18 80v14M82 80v14M50 8v20M40 18l10 10 10-10"/><rect x="22" y="36" width="56" height="36"/><path d="M50 36v36M22 54h56"/></>,
};
export default function TaskIcon({code}:{code:TaskIconCode}){return <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{shapes[code]}</svg>}
