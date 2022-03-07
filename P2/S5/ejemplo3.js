// Ahora, la cadena se leerá directamente del fichero

// creo una constante con la estructura definida en un fichero JSON
const fs = require('fs');

// Le digo cuál es el fichero JSON que ha de leer
const fichero = "ejemplo3.json"

// Ahora lo lee
const tienda = fs.readFileSync(fichero);

//-- Crear la estructura tienda a partir de la cadena en json
const tienda_ceramica = JSON.parse(tienda);

//-- Mostrar info sobre la variable
console.log("Productos en la tienda: " + tienda_ceramica.length);

//-- Recorrer el array de productos
tienda_ceramica.forEach((element, index)=>{
  console.log("Producto " + (index + 1) + ": " + element["nombre"]);
});