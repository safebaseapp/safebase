/** Reject empty/non-finite values; decimal comma accepted, grouping separators not guessed. */
export function numberInput(value:string):number {
 if(!/^\d+(?:[.,]\d+)?$/.test(value.trim()))return NaN;
 return Number(value.trim().replace(',','.'));
}
export function validCount(n:number){return Number.isSafeInteger(n)&&n>=0;}
export function sling(load:number,angle:number,unit:'kg'|'kN') {
 if(!Number.isFinite(load)||load<=0||!Number.isFinite(angle)||angle<=0||angle>90)return null;
 const loadKN=unit==='kg'?load*9.80665/1000:load;
 const tensionKN=loadKN/(2*Math.sin(angle*Math.PI/180));
 const tensionKgf=tensionKN*1000/9.80665;
 if(!Number.isFinite(tensionKN)||tensionKN<=0||!Number.isFinite(tensionKgf))return null;
 return {loadKN,tensionKN,tensionKgf};
}
export type NoiseRow={level:number;minutes:number};
export function noise(rows:NoiseRow[]) {
 // NIOSH continuous-noise range, no lower threshold truncation. Impulse noise excluded.
 if(!rows.length||rows.some(r=>!Number.isFinite(r.level)||r.level<0||r.level>115||!Number.isFinite(r.minutes)||r.minutes<0))return null;
 const minutes=rows.reduce((n,r)=>n+r.minutes,0);if(minutes<=0||minutes>1440)return null;
 const dose=100*rows.reduce((n,r)=>n+r.minutes/(480*2**((85-r.level)/3)),0);
 const twa=85+10*Math.log10(dose/100); // NIOSH Eq. C-4: 10 log10(D/100)+85; 3 dB exchange is rounded.
 if(!Number.isFinite(dose)||dose<=0||!Number.isFinite(twa))return null;
 return {dose,twa,minutes,allowedMinutes:rows.map(r=>480*2**((85-r.level)/3))};
}
export type HoursRow={people:number;days:number;shift:number;overtime:number;breaks:number;absence:number};
export function manHours(rows:HoursRow[]){
 if(!rows.length||rows.some(r=>!validCount(r.people)||r.people===0||!Number.isFinite(r.days)||r.days<=0||!Number.isFinite(r.shift)||r.shift<=0||!Number.isFinite(r.overtime)||r.overtime<0||!Number.isFinite(r.breaks)||r.breaks<0||r.breaks>r.shift+r.overtime||r.shift+r.overtime>24||!Number.isFinite(r.absence)||r.absence<0))return null;
 const subtotals=rows.map(r=>r.people*r.days*(r.shift+r.overtime-r.breaks)-r.absence);
 if(subtotals.some(n=>!Number.isFinite(n)||n<0))return null;
 const total=subtotals.reduce((a,b)=>a+b,0);return Number.isFinite(total)&&total>0&&total<=Number.MAX_SAFE_INTEGER?{total,subtotals}:null;
}
export function adjustedWBGT(measured:number,clothing:number){
 if(!Number.isFinite(measured)||measured<0||measured>60||![0,3,11].includes(clothing))return null;
 return measured+clothing;
}
