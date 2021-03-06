//-- Ejemplo 3.  MODULO HTTP
//-- Ejemplo de programacion asíncrona
//-- El orden de escrititura de los mensajes en la consola
//-- no es el habitual

const http = require('http');

const PUERTO = 8080;

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

  console.log("\nMENSAJE A")

  req.on('data', (cuerpo) => {
    console.log("MENSAJE B")
  });

  req.on('end', ()=> {
    console.log("MENSAJE C");

    //-- Hayppy server. Generar respuesta
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el happy server\n");
    res.end()
  });

  console.log("MENSAJE D");

});

console.log("MENSAJE E");
server.listen(PUERTO);
console.log("MENSAJE F");

//----Situación 1: Mensaje sin cuerpo
//----Arranca servidor
//--Mensaje E
//--Mensaje F
//----Llega una solicitud (tipo 1)
//--Mensaje A
//--Mensaje D
//----Llegará el evento end
//--Mensaje B


//----Situación 2: Mensaje con cuerpo 
//----Arranca servidor
//--Mensaje E
//--Mensaje F
//----Llega una solicitud (tipo 2)
//--Mensaje A
//--Mensaje D
//----Llegará el evento data
//--Mensaje B
//----Llega el evento end
//--Mensaje C