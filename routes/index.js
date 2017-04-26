//loading in express and making it a router
const express = require('express');
const router = express.Router(); //creating a standalone router

//loading in our tweetBank page
const tweetBank = require('../tweetBank');

//loading in bodyParser (will be used for POSTing tweets, to get the actual post from it)
var bodyParser = require('body-parser');

//exporting all the routes
module.exports = function (io) {

    //enabling bodyParser within router
    router.use(bodyParser.urlencoded({ extend: false })); //for HTML form submits
    router.use(bodyParser.json()); //for AJAX (jSON) requests - just have it in here just in case form ever got something encoded that way

    //route to get root (homepage)
    router.get('/', function (req, res, next) {
        var name = 'YourName';
        let allTweets = tweetBank.list();
        res.render('index', { tweets: allTweets, showForm: true, name: name }); //this puts our vars into the boilerplate, rendering the page
    });

    //route to get user page (using ":___" Express parameter)
    router.get('/users/:name', function (req, res, next) {
        var name = req.params.name; //when we define a ":___", it makes the actual ___ available to us under req.params!
        var tweetsForName = tweetBank.find({ name: name });
        res.render('index', { tweets: tweetsForName, showForm: true, name: name });
        console.log(tweets);
    });

    //route to get single tweet (id) page
    router.get('/tweets/:id', function (req, res, next) {
        var id = Number(req.params.id); //id is a string, so must coerce into number
        var tweetsOfId = tweetBank.find({ id: id });
        res.render('index', { id: id, tweets: tweetsOfId });
    });

    //route to POST tweets
    router.post('/tweets', function (req, res, next) {
        var name = req.body.name;
        var text = req.body.text;
        tweetBank.add(name, text);
        io.sockets.emit('newTweet', { text });
        res.redirect('/');
    });

    return router;
};
