const http = require('http');
const fs = require('fs');
const url = require('url');

const PUERTO = 9090;

let

const server = http.createServer((req, res) => {
    statusCode = 200;
    contentType =  {'Content-Type': 'text/html'};
    fs.readFile("tienda.html", (err, data) => {
       if(err){
         throw err;
       }
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.write(data);
       res.end();
    });
});
server.listen(PUERTO);

console.log("Escuchando en puerto: " + PUERTO);