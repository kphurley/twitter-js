var express = require('express');
var app = express(); // creates an instance of an express application

app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.url);
    next();
});
app.get('/', function (req, res) {
    res.send('Welcome to our amazing app!');
});
app.get('/news', function (req, res) {
    res.send('News page');
})
app.listen(3000);