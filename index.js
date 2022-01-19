  
import express from 'express' 
import mysql from 'mysql'
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


require('dotenv').config();
console.log(process.env.MYSQL_HOST);

var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

con.connect(function(err) {
  if (err) throw err;
});



app.post('/', (req, res)=>{
  var username = req.body.username;
  var password = req.body.password;
  
  //query n shit
  con.query("SELECT * FROM tb_usuarios WHERE nombre_usuario=? AND contrasena=?",[username, password],(err,results, fields)=>{

    if (results.length > 0 && results[0].cargo_usuario === 2) {
      res.send("0")
    }else if (results.length > 0 && results[0].cargo_usuario === 1) {
      res.send("1");    
    }else{
      res.send("2")
    }
  })
})
app.use(express.static(__dirname + '/public/assets'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/public/indexAdmin.html');
});

app.get('/conductor', (req, res) => {
  res.sendFile(__dirname + '/public/indexCli.html');
})


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
