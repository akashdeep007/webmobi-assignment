var express = require('express');
var app = express();
const mongoose = require("mongoose");
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/', function (req, res,next) {
   res.render("welcome");
})

app.get('/users', function (req, res,next) {
   res.render("users");
})

app.post('/create-user', function (req, res,next) {
  console.log(req.body.name_field +" user created");
   res.render("chat");
});


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
