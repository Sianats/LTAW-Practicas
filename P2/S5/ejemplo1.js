// crear una variable (en este caso tienda)
// que sea una estructura formada por dos 
// productos (en este caso)

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

//-- Mostrar info sobre la variable
console.log("Productos disponibles: " + tienda.length);

//-- Recorrer el array de productos
tienda.forEach((element, index)=>{
  console.log("Producto " + (index + 1) + ": " + element.nombre);
});