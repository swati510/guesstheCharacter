const http=require('http');
const server=http.createServer((req,res)=>{
    res.setHeader('Content-type','text/html');
    res.write("<html><body>Hello World!</body></html>");
})
server.listen(3000);