// imprimir el formulario

const http = require('http');
const fs = require ('fs');
const PUERTO = 8082;

// Cargar la página 
const formulario = fs.readFileSync('formulario1.html','utf-8');

// La pagina de respuesta en un html
const respuesta = fs.readFileSync('respuesta2.html','utf-8');

// creo un bucle servidor para los clientes

const server = http.createServer((req, res)=> {
    // hago un objeto url con la de la solicitud
    const miURL = new URL(req.url, 'http://' + req.headers['host']);
    //-- Leer los parámetros
    let nombre = miURL.searchParams.get('nombre');
    let apellidos = miURL.searchParams.get('apellidos');
    console.log("Nombre: " + nombre);
    console.log("Apellidos: " + apellidos);

    // Entregar formulario por defecto
    let content_type = "text/html";
    let content = formulario;

    if(miURL.pathname == "/procesar") {
        content_type = "text/html";

        // Reemplazar las palabras claves por sus valores en la plantilla HTML
        content = respuesta.replace("NOMBRE", nombre);
        content = content.replace("APELLIDOS", apellidos);

        // Si el usuario es X se añade HTML extra
        let extra = "";
        if (nombre=="Anais" && apellidos=="Torres") {
            extra = "<h2>Anaïs Torres ya está registrada</h2>";
        }
        content = content.replace("HTML_EXTRA", extra);
    }

    // Enviar la respuesta
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end()
    
});

server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);