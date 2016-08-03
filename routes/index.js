var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
//module.exports = router;
module.exports = function (io) {
    router.get('/', function (req, res) {
        var tweets = tweetBank.list();
        res.render('index', {
            tweets: tweets,
            showForm: true,
            prePopulate: ''
        });
    });
    router.get('/users/:type', function (req, res) {
        var type = req.params.type;
        var list;
        if (isNaN(parseInt(type))) {
            list = tweetBank.find({
                name: type
            });
            res.render('index', {
                tweets: list,
                showForm: true,
                prePopulate: type
            });
        }
        else {
            list = tweetBank.find({
                id: parseInt(type)
            });
            res.render('index', {
                tweets: list,
                showForm: false
            });
        }
    });
    
    router.get('/retweet/:id', function (req, res) {
        var id = req.params.id;
        var tweet = tweetBank.find({id: parseInt(id)});
        var content = '@' + tweet[0].name + ': ' + tweet[0].content;
        res.render('index', {
            tweets: tweetBank.list(),
            showForm: true,
            retweet: content
        });
    });
    
    router.post('/tweets', urlencodedParser, function (req, res) {
        var name = req.body.name;
        var text = req.body.text;
        var img_url = req.body.img_url;
        tweetBank.add(name, text, img_url);
        var tweet = tweetBank.find({name: name, content: text});
        console.log(tweet);
        io.sockets.emit('newTweet', tweet[0]);
        res.redirect('/');
    });
    return router;
};