
//-- Elementos del interfaz
const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const usuario = document.getElementById("nick");
const x = document.getElementById("us");
const cambio = document.getElementById("cambio");
const notificacion = document.getElementById("notificacion");

//-- Este sera el identificador del ususario por defecto 
let User = "Anónimo";
const socket = io();


socket.on("message", (msg)=>{
  display.innerHTML += '<p class="mess mess-r" style="text-align: right">' + msg + '</p>';
  notificacion.play();
});


//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(User + ": <br>" + msg_entry.value);
  //-- Borrar el mensaje actual
  msg_entry.value = "";
}

usuario.onchange = () => {
    if (usuario.value )
    User = usuario.value;
    console.log("nombre usuario"+ usuario.value);
    document.getElementById("nick").style.display = "none";
    document.getElementById("us").style.display = "none";
    cambio.innerHTML = "Nombre de usuario:"+ ' ' + User;
}