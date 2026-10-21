import {cookie} from './fixture-server.mjs';
for(const role of ['guest','free','expired','paid','admin','suspended']){const c=role==='guest'?null:cookie(role),headers=c?{cookie:c.name+'='+c.value}:{};const r=await fetch('http://127.0.0.1:3121/api/safety-signs/download-access',{headers,redirect:'manual'});console.log(role,r.status,await r.text())}
