const start = document.getElementById("start");
const txt2 = document.getElementById("txt2");
const div = document.getElementById("animate")
const txt = document.getElementById("txt");
const stop = document.getElementById("stop");
var socket = io();
var active = 0;

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

//main functions
function success(pos) {	  
  console.log(pos)
  var coords = [pos.coords.latitude, pos.coords.longitude, pos.coords.accuracy]
  socket.emit('coordinates', coords)
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

//start interval
  start.addEventListener("click", ()=>{
      if(!navigator.geolocation){
          console.log("Por favor activa la ubicacion")
      }else{
            active = 1;

            if (active === 1) {
                div.classList.add("animate-pulse");
                txt.innerText = "Haz click en el botón para detener el viaje."
                txt.innerText = "Estamos compartiendo tu ubicación con el sistema";
                stop.style.display = "block";
                start.style.display = "none";
            }
          var interval = setInterval(()=>{
              navigator.geolocation.getCurrentPosition(success, error, options)
          }, 3000)

          stop.addEventListener("click", ()=>{
                window.clearInterval(interval)
                div.classList.remove("animate-pulse");
                txt.innerText = "Comparte tu ubicación con el sistema para mayor seguridad en tu viaje.";
                stop.style.display = "none";
                start.style.display = "block";
        })
  
      }
  })