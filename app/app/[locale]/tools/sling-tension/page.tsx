import {calculatorMetadata,calculatorPage} from '../_shared/page';
type Props={params:Promise<{locale:string}>};
export const generateMetadata=({params}:Props)=>calculatorMetadata('sling-tension',params);
export default function Page({params}:Props){return calculatorPage('sling-tension',params)}
