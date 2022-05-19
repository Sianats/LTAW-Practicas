const display = document.getElementById("display");
const msg_entry = document.getElementById("msg_entry");
const usuario = document.getElementById("nick");
const x = document.getElementById("us");
const userestablecido = document.getElementById("userestablecido");
const notificacion = document.getElementById("notificacion");

//-- Este sera el identificador del ususario por defecto 
let User = "Anónimo";
let escribiendo = false;
const socket = io();
let notif = new Audio('notificacion.mp3');


socket.on("message", (msg)=>{
  if(!msg.includes(' se ha unido</h5>')){
  display.innerHTML += '<p class="mess mess-r" style="text-align: right";>' + msg + '</p>';
  } else{
    display.innerHTML += '<p>' + msg + '</p>';
  }
});

// Te avisa de que otro está escribiendo
msg_entry.oninput = () => {
  if(!escribiendo){
    escribiendo = true;
    socket.send(User + ' esta escribiendo...');
  };
};

//-- Al apretar el botón se envía un mensaje al servidor
msg_entry.onchange = () => {
  if (msg_entry.value)
    socket.send(User + ": <br>" + msg_entry.value);
    escribiendo = false;
  //-- Borrar el mensaje actual
  msg_entry.value = "";
  notif.play();
}

usuario.onchange = () => {
    if (usuario.value )
    User = usuario.value;
    console.log("nombre usuario"+ usuario.value);
    document.getElementById("nick").style.display = "none";
    document.getElementById("us").style.display = "none";
    userestablecido.innerHTML = "Nombre de usuario:"+ ' ' + User; 
    socket.send('<h5 style="text-align: center">' + User + ' se ha unido</h5>');
}