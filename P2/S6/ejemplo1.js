// imprimir el formulario

const http = require('http');
const fs = require ('fs');
const PUERTO = 8080;

// Cargar la página 
const formulario = fs.readFileSync('formulario1.html','utf-8');

// La pagina de respuesta en un html
const respuesta = fs.readFileSync('respuesta1.html','utf-8');

// creo un bucle servidor para los clientes

const server = http.createServer((req, res)=> {
    const miURL = new URL(req.url, 'http://' + req.headers['host']);
    console.log("");
    console.log("Método: " + req.method);
    console.log("Recurso: " + req.url);
    console.log("Ruta: " + miURL.pathname);
    console.log("Parámetros: " + miURL.searchParams);

    // Entregar formulario por defecto
    let content_type = "text/html";
    let content = formulario;

    if(miURL.pathname == "/procesar") {
        content_type = "text/html";
        content = respuesta;
    }

    // se imprimen los datos del cuerpo (si hay)
    req.on('data', (cuerpo) => {
        // los datos han de ser caracteres
        req.setEncoding('utf8');
        console.log(`Cuerpo (${cuerpo.lenght} bytes)`)
        console,log(` ${cuerpo}`);
    });

    //Al final del mensaje de solicitud, se imprime esto:
    req.on('end', ()=> {
        // Generar respuesta
        res.setHeader('Content-Type', content_type);
        res.write(content);
        res.end()
    });


});

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);