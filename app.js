var express = require( 'express' );
var app = express(); // creates an instance of an express application

app.get('/', function(req, res){
    res.send('Welcome to our amazing app!');
});

app.listen(3000);