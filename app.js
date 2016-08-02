var express = require('express');
var swig = require('swig');
var app = express(); // creates an instance of an express application
var socketio = require('socket.io');

var routes = require('./routes/');

var server = app.listen(3000);
var io = socketio.listen(server);

app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    next();
});

app.use(express.static('./public'));

app.use('/', routes(io));

swig.setDefaults({cache: false});

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

