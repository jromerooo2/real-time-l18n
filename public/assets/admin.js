

var socket = io();


var map = L.map('map').setView([13.7942, -88.8965], 13);


//custom marker:)
var busicon = L.icon({
    iconUrl: 'L_S.png',

    iconSize:     [78, 125], // size of the icon
    iconAnchor:   [72, 124], // point of the icon which will correspond to marker's location
});


var osm =  L.tileLayer('https://api.mapbox.com/styles/v1/jromerooo2/cku5okz0z2sie17quh8e698ff/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoianJvbWVyb29vMiIsImEiOiJja3U0bjZhdXcxem9kMnBvN3FtNGIwZHNyIn0.7kMOLmyCFYDK9wlDLusOpw', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//array solution
var markers = {};


        socket.on('send-coordinates', (id , position)=>{

            var latLng = [position[0],position[1]]

            if (!markers[id]) {
                markers[id] = L.marker(latLng, {icon:busicon}).addTo(map);

            }else{
                markers[id].setLatLng(latLng);

            }
              
        })

        socket.on('delete-bus', (id)=>{
            console.log('bus to eliminate' + id)
            map.removeLayer(markers[id])
        })

