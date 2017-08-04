var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require("path");
var port = 3000;

server.listen(port);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/static/html/login_new.html');
});
app.get('/index', function(req, res) {
	res.sendfile(__dirname + '/static/html/index.html');
});
app.get('/rooms/1010', function(req, res) {
	res.sendfile(__dirname + '/static/html/room.html');
});
app.get('/rank', function(req, res) {
	res.sendfile(__dirname + '/static/html/rank.html');
});