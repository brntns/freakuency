// var io = require('socket.io')(http);
var _ = require('lodash');
// var App = require('./app.js')
var map = [];

function Client(app) {
	console.log(app);
	this.App = app;
};

var clientBase = {
	create: function(io){
	io.on('connection', function(socket){
	// console.log('a user connected');
	socket.emit('connected', 'connected');
	socket.on('frame', (data) =>{
		// map.push(data);
		this.App.addFrame(data);
	});
	socket.on('stop', function(){
		this.setMap(map);
	});
	socket.on('render', function(){
		console.log('rendering');
		this.App.build();
	});
	socket.on('reset', function(){
		console.log('reseting');
		map = [];
	});
});
	},
	setMap : function(map){
		console.log('setting map',map<yy);
		var genMap = JSON.stringify(map);
		fs.writeFile('map.json', genMap, function (err) {
			if (err) return console.log(err);
		});
	},
	addFrame:function(frame){
		map.push(frame);
	},
};


var clients = {};
_.extend(clients, clientBase);

Client.prototype = clients;
module.exports = Client;
