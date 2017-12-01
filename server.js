var mysql = require("mysql");
var bodyParser = require("body-parser");
var path = require("path");
var exphbs = require("express-handlebars");

 var express = require("express");
// var app = express();

var app = require('express')();

var http = require ('http').Server(app);
var io = require("socket.io")(http);

var connection ;
//new
var session = require("express-session");
var passport = require("./app/config/passport.js");
var db = require("./app/models");


//CONNECTION TO DATABASE
if(process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
}
else {
  connection = mysql.createConnection({
    host:"localhost",
    port:3307,
    user:"root",
    password:"",
    database:"c6mw1yoy0se23py8"
  });
}
// connection.connect();
module.exports = connection;


//HANDLEBARS
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


//CONNECTION TO SERVER

var PORT = process.env.PORT || 8081;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("./app/public"));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//ROUTING
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);


//SOCKET


//socket listens for a user to connect
io.on('connection', function(socket){
  // console.log('user connected');
  // console.log("________________CONNECTED_______________________");
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    //   console.log("___________DISCONNECTED____________________________");
    // console.log('user disconnected');
  });
  socket.on('newPlayer', function(activePlayer){
    io.emit('newPlayer', activePlayer);
  });
  socket.on('roll', function(newPos, x, y, systemMessage, imgPosition){
    io.emit('roll', newPos, x, y, systemMessage, imgPosition);
  });
  socket.on('players', function(p1Info, p2Info, p3Info, p4Info){
    io.emit('players', p1Info, p2Info, p3Info, p4Info);
  });
  socket.on('announcement', function(text){
    io.emit('announcement', text);
  });
  socket.on('activeGreen', function(active, previous){
    io.emit('activeGreen', active, previous);
  });
});

//----------------------needs to be final line of server.js
db.sequelize.sync().then(function() {
	  http.listen(PORT, function(err){
      if(err) throw err;
	    console.log('Express server listening on port ' + PORT);
	});
});


// http.listen(PORT, function() {
//   console.log("App listening on PORT: " + PORT);
// });
//socket stuff
