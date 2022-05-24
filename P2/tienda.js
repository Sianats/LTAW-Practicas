const http = require('http');
const fs = require('fs');

const PUERTO = 9090;

const PRODUCTOS_JSON = fs.readFileSync('productos.json');

//-- Obtener el array de productos
let productos = JSON.parse(PRODUCTOS_JSON);

// Se crea el servidor
const server = http.createServer((req, res) => {
  let myURL = new URL (req.url, 'http://' + req.headers['host']);

  let page = "";
  let succesful = false;

  //Se llama a la página principal por defecto
  if(myURL.pathname == '/procesar'){
   var nombre=  myURL.searchParams.get('nombre');
   
   if( nombre == productos["Usuario"][0]["User"] || nombre == productos["Usuario"][1]["User"]){
      res.setHeader('Set-Cookie', 'User=' + nombre);
      page = "calor.html";
      succesful = true;
   }
  }else if(myURL.pathname == '/'){
      page = 'calor.html';
  }else {
    page = myURL.pathname.slice(1);
  }

  fs.readFile(page, function(err, data) {

    if (err) {
      // Si se pide un recurso que no existe, salta la página de error
      res.writeHead(404, {'Content-Type': 'text/html'});
      return fs.createReadStream('error.html').pipe(res)
    }

    if(page.includes('.html')){
        res.setHeader('Content-Type', 'text/html');
    } else if(page.includes('.css')){
      res.setHeader('Content-Type', 'text/css');
    } else if(page.includes('.js')){
      res.setHeader('Content-Type', 'application/js');
    } else if(page.includes('.json')){
      res.setHeader('Content-Type', 'application/json');
    } else if(page.includes('.jpg')){
      res.setHeader('Content-Type', 'image/jpg');
    } else if(page.includes('.png')){
      res.setHeader('Content-Type', 'image/png');
    } else if(page.includes('.gif')){
      res.setHeader('Content-Type', 'image/gif');
    }
if (succesful == true){
          data = data.toString().replace('<a href="login.html"><img src="fotos/usuario.png" alt="" width="30px" ;=""></a>', nombre);
    } 
    res.write(data);
    res.end();
  });


});

server.listen(PUERTO);

console.log("Escuchando en puerto: " + PUERTO);