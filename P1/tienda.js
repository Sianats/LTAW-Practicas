const http = require('http');
const fs = require('fs');

const PUERTO = 9090;

const server = http.createServer((req, res) => {
  let myURL = new URL (req.url, 'http://' + req.headers['host']);

  let page = "";

   if (myURL.pathname != "/"){
       page += "."+ myURL.pathname
     } else{
         page += "tienda.html"
     }

  fs.readFile(page, function(err, data) {

    if (err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return fs.createReadStream('error.html').pipe(res)
    } 

    res.write(data);
    res.end();
  });


});

server.listen(PUERTO);

console.log("Escuchando en puerto: " + PUERTO);