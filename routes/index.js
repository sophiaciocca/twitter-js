const express = require('express');
const router = express.Router();
const tweetBank = require('../tweetBank');

router.get('/', function(req, res) {
    let tweets = tweetBank.list();
    res.render('index', {tweets: tweets } );
});

//router to get user page
router.get('/users/:name', function(req, res, next) {
    var name = req.params.name;
    var tweets = tweetBank.find({name: name});
    res.render('index', {tweets: tweets});
    console.log(tweets);
});

// router.get('/stylesheets/style.css', function(req, res, next) {
//     res.sendFile('/public/stylesheets/style.css');
// })

module.exports = router;