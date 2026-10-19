import React from 'react';
import {createRoot} from 'react-dom/client';
import RealModels from '../../app/app/[locale]/labs/sim5/RealModels';
const tr=new URLSearchParams(location.search).get('lang')==='tr';
createRoot(document.getElementById('root')).render(<main style={{padding:24,boxSizing:'border-box',width:'100%'}}><RealModels tr={tr}/></main>);
