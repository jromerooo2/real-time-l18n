

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


var marker, circle;
var sockets = {};

//array solution
var markersarr = [];
var circlesarr = []

        socket.on('send-coordinates', (id , position)=>{

            if (!(id in sockets)) {
                        sockets[id] = position;

                        //clear all markers
                        markersarr.forEach(marker => map.removeLayer(marker));
                        circlesarr.forEach(circle => map.removeLayer(circle));


                        for(var socket in sockets){

                            var lat = sockets[socket][0];
                            var long = sockets[socket][1];
                            var accur = sockets[socket][3];
                                
                            marker = L.marker([lat, long], {icon:busicon})
                            circle = L.circle([lat,long], {radius: accur || 420})
                            
                            //add new markers to the array
                            circlesarr.push(circle)
                            markersarr.push(marker)

                            L.featureGroup([marker, circle]).addTo(map);
                           
                        }
            }else{

                //clear all markers
                markersarr.forEach(marker => map.removeLayer(marker));
                circlesarr.forEach(circle => map.removeLayer(circle));

                for(var socket in sockets){
                        var lat = sockets[socket][0];
                        var long = sockets[socket][1];
                        var accur = sockets[socket][3];
                            
                        marker = L.marker([lat, long], {icon:busicon})
                        circle = L.circle([lat,long], {radius: accur || 420})  

                        //add new markers to the arrays
                        circlesarr.push(circle)
                        markersarr.push(marker)


                         L.featureGroup([marker, circle]).addTo(map);   
                        
                    }
            }
              
        })

        socket.on('delete-bus', (id)=>{
            console.log('bus to eliminate' + id)
            delete sockets[id]
            console.log(sockets)
        })

