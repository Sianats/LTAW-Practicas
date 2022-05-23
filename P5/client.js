//Establezco constantes que, gracias a su identificador, podré usar en mi archivo html
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const electron = require('electron');
const ip = require('ip');

const node = document.getElementById("node");
const chrome = document.getElementById("chrome");
const electron1 = document.getElementById("electron1");
const url1 = document.getElementById("url");
const info1 = document.getElementById("info1");
const info2 = document.getElementById("info2");
const info3 = document.getElementById("info3");
const numus = document.getElementById("numus");
const btn_test = document.getElementById("btn_test");

//Declaro que el usuario se llamará 'Anónimo' siempre que no establezca otro nombre
let port;
// Pongo la notificación de escribiendo en falso, por defecto.
const socket = io();
// Declaro el audio que voy a usar de tono de notificación
let notif = new Audio('notificacion.mp3');

node.textContent = process.versions.node;
chrome.textContent = process.versions.chrome;
electron1.textContent = process.versions.electron;
info1.textContent = process.arch;
info2.textContent = process.platform;
info3.textContent = process.cwd();

//Creo esta función que servirá para la estructura de los mensajes y que se vean en pantalla
socket.on("message", (msg)=>{
  //Declaro que si el mensaje no incluye ese texto específico, la estructura sea así
  display.innerHTML += '<p class="mess mess-r" style="text-align: right";>' + msg + '</p>'; 
  electron.ipcRenderer.on('message', (event, msg) => {
    display.innerHTML += '<p class="mess mess-r" style="text-align: right";>' + msg + '</p>';
  })
});

// Al apretar el botón enter, se envía un mensaje al servidor 
// y aparece en nuestro display
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(msg_entry.value);
  //-- Borrar el mensaje actual
  msg_entry.value = "";
  // Suena el sonido de notifiación
  notif.play();

}

btn_test.onclick = () => {
  // Enviar mensaje al proceso principal
  electron.ipcRenderer.invoke('test', "Este es un mensaje de prueba... ¡Funciona!");
}

electron.ipcRenderer.on('users', (event, msg) => {
  numus.textContent = msg;
})

electron.ipcRenderer.on('port', (event, msg) => {
  port = msg;
  // Cadena para construir la url del cliente
  let url = "http://" + ip.address() + ":" + port + 'public/chat.html';
  url1.textContent = url;
})