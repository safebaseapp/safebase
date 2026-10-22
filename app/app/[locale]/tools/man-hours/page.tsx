import {calculatorMetadata,calculatorPage} from '../_shared/page';
type Props={params:Promise<{locale:string}>};
export const generateMetadata=({params}:Props)=>calculatorMetadata('man-hours',params);
export default function Page({params}:Props){return calculatorPage('man-hours',params)}
