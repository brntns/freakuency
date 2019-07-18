const express = require('express');
const server = express();
var http = require('http').Server(server);
 var io = require('socket.io')(http);
var App = require('./app.js')
var Client = require('./client.js')
server.use(express.static('public'));
server.use('/assets', express.static('public'));


var app = new App();
var client = new Client(app);
	client.create(io);

server.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

http.listen(3000, function(){

	console.log('listening on *:3000');
});

