import React from 'react';
import {createRoot} from 'react-dom/client';
import RealModels from '../../app/app/[locale]/labs/sim5/RealModels';
createRoot(document.getElementById('root')).render(<RealModels tr={new URLSearchParams(location.search).get('lang')==='tr'}/>);
