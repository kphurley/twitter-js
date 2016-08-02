var express = require('express');
var swig = require('swig');
var app = express(); // creates an instance of an express application

var routes = require('./routes/');

app.use(express.static('./public'));

app.use('/', routes);

swig.setDefaults({cache: false});

app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    next();
});


app.listen(3000);