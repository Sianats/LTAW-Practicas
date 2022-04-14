const http = require('http');
const fs = require('fs');
const url = require('url');

const PUERTO = 9090;

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");


});

server.listen(PUERTO);

console.log("Escuchando en puerto: " + PUERTO);