import {calculatorMetadata,calculatorPage} from '../_shared/page';
type Props={params:Promise<{locale:string}>};
export const generateMetadata=({params}:Props)=>calculatorMetadata('heat-stress',params);
export default function Page({params}:Props){return calculatorPage('heat-stress',params)}
