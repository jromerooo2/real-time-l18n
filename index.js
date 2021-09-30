const  express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;


app.use(express.static(__dirname + '/public/assets'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/indexAdmin.html');
});


var allClients = [];

io.on('connection', (socket) => {
  allClients.push(socket.id);

  socket.on('coordinates', (msg) => {
    socket.broadcast.emit('send-coordinates', socket.id,msg);
  });

  socket.on('delete-bus', () => {
    socket.broadcast.emit('delete-bus', socket.id);
 });
 
  socket.on('disconnect', ()=>{
    console.log('Got disconnect!');

    var i = allClients.indexOf(socket.id);

    allClients.splice(i, 1);
  })
 
});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
