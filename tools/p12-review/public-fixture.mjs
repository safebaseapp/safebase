// Local read-only protocol fixture, never forwards to Supabase or writes accounts/data.
import http from 'node:http';
http.createServer((req,res)=>{
 res.setHeader('Access-Control-Allow-Origin','*');res.setHeader('Content-Type','application/json');
 if(req.method==='OPTIONS'){res.writeHead(204);return res.end()}
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);return res.end('{}')}
 if(req.url.startsWith('/auth/')){res.writeHead(401);return res.end('{"message":"No synthetic session"}')}
 res.end('[]');
}).listen(54512,'127.0.0.1',()=>console.log('P12 read-only local fixture 54512; no external forwarding'));
