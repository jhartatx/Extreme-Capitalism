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
connection.connect();
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
  socket.on('roll', function(newPos, x, y){
    io.emit('roll', newPos, x, y);
  });
});


http.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
//socket stuff
