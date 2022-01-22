  
import express from 'express' 
import { Login } from './utils/mysql'
import md5 from 'md5';

//initialize express and socket.io 
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3001;


//middlewarexd
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.post('/', (req, res)=>{
  let username = req.body.username;
  let password = req.body.password;
  let num;

  Login(username, password).then(function(rows) {
    //avoiding sendStatus err
    num = rows;
    res.send(num.toString());
  }).catch((err) => setImmediate(() => { throw err; }));
  

})


app.use(express.static(__dirname + '/public/assets'));




//Main Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/indexAdmin.html');
});

app.get('/conductor', (req, res) => {
  res.sendFile(__dirname + '/public/indexCli.html');
})



//socket.io config
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
