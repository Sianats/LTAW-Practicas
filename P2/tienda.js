//-- Servidor JSON
console.log("Ejecutando JS....")

const mostrarMensaje = getElementById('mensaje');

mostrarMensaje.onclick = () => {
    var lupa = document.getElementById("mydisplay");
    lupa.classList.toggle("show");
} 

const http = require('http');
const fs = require('fs');
const PUERTO = 9090;

//-- Cargar la Página de error
const ERROR = fs.readFileSync('error.html');

//-- Cargar pagina web principal
const MAIN = fs.readFileSync('busqueda.html','utf-8');

//-- Leer fichero JSON con los productos 
const PRODUCTOS_JSON = fs.readFileSync('productos.json');

//-- Obtener el array de productos
let productos = JSON.parse(PRODUCTOS_JSON);

//-- SERVIDOR: Bucle principal de atención a clientes
const server = http.createServer((req, res) => {

    //-- Construir el objeto url con la url de la solicitud
    const myURL = new URL(req.url, 'http://' + req.headers['host']);  

    //-- Variables para el mensaje de respuesta
    let content_type = "text/html";
    let content = "";
  
    //-- Leer recurso y eliminar la / inicial
    let recurso = myURL.pathname;
    recurso = recurso.substr(1); 

    switch (recurso) {
        case '':
            console.log("Main page");
            content = MAIN;
            break;

        case 'productos':
            console.log("Peticion de Productos!")
            content_type = "application/json";

            //-- Leer los parámetros
            let param1 = myURL.searchParams.get('param1');

            param1 = param1.toUpperCase();

            console.log("  Param: " +  param1);

            let result = [];

            for (let prod of productos) {

                //-- Pasar a mayúsculas
                prodU = prod.toUpperCase();

                //-- Si el producto comienza por lo indicado en el parametro
                //-- meter este producto en el array de resultados
                if (prodU.startsWith(param1)) {
                    result.push(prod);
                }
                
            }
            console.log(result);
            content = JSON.stringify(result);
            break;

        case 'cliente.js':
            //-- Leer fichero javascript
            console.log("recurso: " + recurso);
            fs.readFile(recurso, 'utf-8', (err,data) => {
                if (err) {
                    console.log("Error: " + err)
                    return;
                } else {
                  res.setHeader('Content-Type', 'application/javascript');
                  res.write(data);
                  res.end();
                }
            });
            
            return;
            break;

            //-- Si no es ninguna de las anteriores devolver mensaje de error
        default:
            res.setHeader('Content-Type','text/html');
            res.statusCode = 404;
            res.write(ERROR);
            res.end();
            return;
    }
  
    //-- Generar respuesta
    res.setHeader('Content-Type', content_type);
    res.write(content);
    res.end()
  
  });
  
  server.listen(PUERTO);
  console.log("Escuchando en puerto: " + PUERTO);
  