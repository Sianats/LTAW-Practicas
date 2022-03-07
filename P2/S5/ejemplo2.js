// crear una cadena

const tienda = [
    {
        nombre: "Taza estándar",
        descripcion: "Taza clásica con capacidad 250ml",
        stock: 20
    },
    {
        nombre: "Pack vajilla",
        stock: 10
    }
];

//-- Crear la estructura tienda a partir de la cadena en json
const tienda_ceramica = JSON.parse(tienda);

//-- Mostrar info sobre la variable
console.log("Productos en la tienda: " + tienda_ceramica.length);

//-- Recorrer el array de productos
tienda_ceramica.forEach((element, index)=>{
  console.log("Producto " + (index + 1) + ": " + element["nombre"]);
});