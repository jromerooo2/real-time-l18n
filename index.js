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



io.on('connection', (socket) => {
  socket.on('coordinates', (msg) => {
    console.log(msg)
    socket.broadcast.emit('send-coordinates', msg);
  });
});


http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
