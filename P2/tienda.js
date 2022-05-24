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
  let carro = [];

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
        carro = valor.split('-');
        carro.pop();
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
      cookie1 += "Freidora-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-frytop'){
    if(nombre){
      cookie1 += "Frytop-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-conveccion'){
    if(nombre){
      cookie1 += "Conveccion-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-pizza'){
    if(nombre){
      cookie1 += "Pizza-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-mixto'){
    if(nombre){
      cookie1 += "Mixto-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/poner-cuecepasta'){
    if(nombre){
      cookie1 += "Cuecepasta-";
      res.setHeader('Set-Cookie',cookie1);
      page = "calor.html";
    }
  }else if(myURL.pathname == '/comprar'){
    if(nombre){
      const FICHERO_JSON_OUT = "productos.json";
      direc =  myURL.searchParams.get('direccion');
      card =  myURL.searchParams.get('tarjeta');

      // productos["Pedidos"]["User"] = nombre;
      // productos["Pedidos"]["Direccion"] = direc;
      // productos["Pedidos"]["Card"] = card;
      // productos["Pedidos"]["Producto"] = cookie1;

      var pf = {"User": nombre, "Direccion": direc, "Card": card, "Producto": cookie1};
      productos["Pedidos"].push(pf);
      //-- Convertir la variable a cadena JSON
      let myJSON = JSON.stringify(productos);

      //-- Guardarla en el fichero destino
      fs.writeFileSync(FICHERO_JSON_OUT, myJSON);
      page = "comprado.html";
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

    if(page == 'carrito.html' || page == 'comprado.html'){
      let resumen = '';
      carro.forEach((p) => {
        resumen += p + '<br>';
      })
      resumen += '';
      data = data.toString().replace('Aún no hay nada añadido al carrito :(', resumen);
    } 
    res.write(data);
    res.end();
  });


});

server.listen(PUERTO);

console.log("Escuchando en puerto: " + PUERTO);