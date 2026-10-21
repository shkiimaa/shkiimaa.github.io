import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { root, build } from './build.mjs';

await build();
const directory=path.join(root,'dist');
const port=Number(process.env.PORT || 4173);
const contentTypes={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2','.pdf':'application/pdf','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const server=createServer(async(req,res)=>{
  try {
    const url=new URL(req.url,'http://localhost');
    const relative=decodeURIComponent(url.pathname).replace(/^\/+/, '');
    let file=path.resolve(directory,relative);
    if(file!==directory&&!file.startsWith(directory+path.sep)){res.writeHead(403);res.end('Forbidden');return;}
    const entry=await stat(file);
    if(entry.isDirectory()){
      if(!url.pathname.endsWith('/')){res.writeHead(308,{Location:url.pathname+'/'+url.search});res.end();return;}
      file=path.join(file,'index.html');
    }
    const data=await readFile(file);
    res.writeHead(200,{'Content-Type':contentTypes[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  } catch {
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(path.join(directory,'404.html')));
  }
});
server.listen(port,'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
