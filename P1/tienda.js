// El fichero de mi tienda
//
//
//
//
//
//
//
//
//
//
//
//
// Localizar el recurso que nos piden
// (sacarlo por la consola)
// OBTENER el nombre del fichero válida
//
// LECTURA ASINCRONA del fichero
// Función de retrollamada de lectura
//
// Imprimir en la consola el nombre del fichero
// que estoy leyendo
//
// Si hay error, generar página html de error
//
// Si no hay error
    // Devolver el contenido como respuesta
    // La respuesta depende del tipo de fichero
    // HTML: Cabecera: 'content-Type', 'text/html'
    // IMAGEN: 'image/jpg', 'image/png'
    // CSS: 'text/css'
    //
    // ¿cómo saber que tipo de fichero?
    // por la extensión del fichero
    // Nombre fichero: "index.html", "hola.jpg"
    // A partir del nombre fichero, obtener su
    // extensión
    // "html", "jpg", "png", "css"

    console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const daltvila = document.getElementById('daltvila');
const esvedra = document.getElementById('esvedra');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
const R_deslizador = document.getElementById('R_deslizador');
const G_deslizador = document.getElementById('G_deslizador');
const B_deslizador = document.getElementById('B_deslizador');
const trans_deslizador = document.getElementById('trans_deslizador');
const escalagrises = document.getElementById('escalagrises');
const aparecer = document.getElementById('aparecer');
const transparencia = document.getElementById('transparencia');
const trans = document.getElementById('transparente');
const negativo = document.getElementById('negativo');
const ruido = document.getElementById('ruido');
const colores = document.getElementById('colores');
const sepia = document.getElementById('sepia');
const mirror = document.getElementById('mirror');
const flip = document.getElementById('flip');
const restart = document.getElementById('reset');
const botones = document.getElementsByClassName('filtros');
const manipulada = document.getElementById('manipulada');
const mensaje = document.getElementById('inicio');

//-- Valor del deslizador
const R_value = document.getElementById('R_value');
const G_value = document.getElementById('G_value');
const B_value = document.getElementById('B_value');
const trans_value = document.getElementById('trans_value');
var reves = false;
var reflejo = false;

daltvila.onclick = () => {
  document.getElementById('filtros').style.display = 'block';
  document.getElementById('reset').style.display = 'block';
  document.getElementById('inicio').style.display = 'none';
  document.getElementById('manipulada').style.display = 'block';
  img = daltvila;
  canvas.width = img.width;
  canvas.height =  img.height;
  ctx.drawImage(img, 0,0);
}