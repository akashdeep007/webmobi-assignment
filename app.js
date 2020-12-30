var express = require('express');
var app = express();
const mongoose = require("mongoose");
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const path = require("path");
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")));
//welcome page of '/' route
app.get('/', function (req, res,next) {
   res.render("welcome");
})

//users list page on /users route
app.get('/users', function (req, res,next) {
   res.render("users");
})

//rendering chat scrren after post call
app.post('/create-user', function (req, res,next) {
  console.log(req.body.name_field +" user created");
   res.render("chat");
});

//io on coonection broadcasting message to all connected clients
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
app.set("view engine", "ejs");
app.set("views", "views");


    http.listen(3000, () => {
  console.log('listening on *:3000');
});
