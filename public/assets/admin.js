

var socket = io();
var map = L.map('map').setView([13.7942, -88.8965], 13);

//custom marker:)
var busicon = L.icon({
    iconUrl: 'L_S.png',

    iconSize:     [78, 125], // size of the icon
    iconAnchor:   [72, 124], // point of the icon which will correspond to marker's location
});

//https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
//mapbox://styles/jromerooo2/cku5okz0z2sie17quh8e698ff
var osm =  L.tileLayer('https://api.mapbox.com/styles/v1/jromerooo2/cku5okz0z2sie17quh8e698ff/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoianJvbWVyb29vMiIsImEiOiJja3U0bjZhdXcxem9kMnBvN3FtNGIwZHNyIn0.7kMOLmyCFYDK9wlDLusOpw', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var sockets = {};
if(!navigator.geolocation){
    alert("Por favor activa la ubicacion")
}else{        
    setInterval(()=>{
        socket.on('send-coordinates', (id , position)=>{
            if (!(id in sockets)) {
                sockets[id] = position;
            }

            for (const socket in sockets) {
                positionMarker(sockets[socket])    
            }
              
        })
    }, 3000)

}

var marker, circle;

function positionMarker(socketprops){
    if(marker){
        map.removeLayer(marker)
    }
    if(circle){
        map.removeLayer(circle)
    }

    var lat = socketprops[0];
    var long = socketprops[1];
    var accur = socketprops[3];
    

     marker = L.marker([lat, long], {icon:busicon})
     circle = L.circle([lat,long], {radius: accur || 420})

     L.featureGroup([marker, circle]).addTo(map)

    //map.fitBounds(grp.getBounds())
}
