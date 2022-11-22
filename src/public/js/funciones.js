function enviarTexto(event){
  event.preventDefault();
  event.stopPropagation();

  const campo = event.target.texto;

  doSend(campo.value);
  campo.value = "";
}

function init(){
  wsConnect();
}

function wsConnect(){
  websocket = new WebSocket("ws://localhost:3000");

  //Asiganción de los callbacks

  websocket.onopen = function(event){
    onOpen(event)
  };

  websocket.onclose = function(event){
    onClose(event)
  };

  websocket.onmessage = function(event){
    onMessage(event)
  };

  websocket.onerror = function(event){
    onError(event)
  };

};

function onOpen(event){
  document.getElementById("enviar").disabled = false;
  doSend("saludo de Websocket");
};

function onClose(event){
  document.getElementById("enviar").disabled = true;
  document.getElementById("mensajes").innerHTML = "";

  setTimeout(function(){
    wsConnect();
  }, 2000)
};

function onMessage(event){
  const area =  document.getElementById("mensajes");
  area.innerHTML += event.data + "\n";
};

function onError(event){
  console.log("Error: " + event);
};

function doSend(mensaje){
  websocket.send(mensaje);
};

window.addEventListener("load", init, false);
