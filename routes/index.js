const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');
var bodyParser = require('body-parser');

module.exports = function(io){

  router.use(bodyParser.urlencoded({ extend: false}));
router.use(bodyParser.json());

router.get('/', function(req, res) {
    var name = 'YourName';
    let tweets = tweetBank.list();
    res.render('index', {tweets: tweets, showForm: true, name: name } );
});

router.post('/tweets', function(req, res){
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  io.sockets.emit('newTweet', {text});
  res.redirect('/');
});

//router to get user page
router.get('/users/:name', function(req, res, next) {
    var name = req.params.name;
    var tweets = tweetBank.find({name: name});
    res.render('index', {tweets: tweets, showForm: true, name: name });
    console.log(tweets);
});

//route to single tweet page
router.get('/tweets/:id', function(req, res, next) {
    var id = Number(req.params.id);
    /*var tweet = tweetBank.find({id: id});*/
    var tweets = tweetBank.find({id: id});
    res.render('index', {id: id, tweets: tweets});
});

  return router;
};
