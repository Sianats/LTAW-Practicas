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
  let cookie1 = "Carrito=";
  let nombre = "";

  //-- Leer la Cookie recibida
  const cookie = req.headers.cookie;

  //-- Hay cookie
  if (cookie) {
    
    //-- Obtener un array con todos los pares nombre-valor
    let pares = cookie.split(";");

    //-- Recorrer todos los pares nombre-valor
    pares.forEach((element, index) => {

      //-- Obtener los nombres y valores por separado
      let [ok, valor] = element.split('=');

      //-- Leer el usuario
      //-- Solo si el nombre es 'User'
      if (ok.trim() === 'User') {
        nombre = valor;
      } else if(ok.trim() === 'Carrito') {
        cookie1 = element;
      }
    });
  }

  //Se llama a la página principal por defecto
  if(myURL.pathname == '/procesar'){
   nombre=  myURL.searchParams.get('nombre');
   if( nombre == productos["Usuario"][0]["User"] || nombre == productos["Usuario"][1]["User"]){
      res.setHeader('Set-Cookie', 'User=' + nombre);
      page = "calor.html";
      succesful = true;
   }
  }else if(myURL.pathname == '/poner-freidora'){
    if(nombre){
      cookie1 += "freidora-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-frytop'){
    if(nombre){
      cookie1 += "frytop-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-conveccion'){
    if(nombre){
      cookie1 += "conveccion-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-pizza'){
    if(nombre){
      cookie1 += "pizza-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-mixto'){
    if(nombre){
      cookie1 += "mixto-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-cuecepasta'){
    if(nombre){
      cookie1 += "cuecepasta-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }
  else if(myURL.pathname == '/'){
      page = 'calor.html';
  } else {
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