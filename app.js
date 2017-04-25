//load in express
const express = require('express');
const app = express();

//'app' will now be a handler function, handling the HTTP under the hood.
//app.use, app.get, etc. are ways of CUSTOMIZING the app handler, what it's
//going to do with requests, how it's going to respond, etc.

//load in sockets
var socketio = require('socket.io');

//load in nunjucks
const nunjucks = require('nunjucks');

//load in routes folder (contains index.js, which it assumes is what you're looking for if you don't specify)
const routes = require('./routes');

//setting up our overall server
var server = app.listen(3000, () => {
  console.log('Server listening!');
});

//setting up Sockets server
var io = socketio.listen(server);

//telling app: "for any incoming requests, plug them into our standalone router". we also pass in 'io' as an argument, for Sockets
app.use('/', routes(io));

//setting up express to use nunjucks
app.set('view engine', 'html'); //what file extension do our templates have?
app.engine('html', nunjucks.render); //how to render html templates?
nunjucks.configure('views', {autoescape: true, express: app, noCache: true}); //where to find the views, caching off


//console.logging requests to the server. here: just c-logging 'GET /url'
//(this is a piece of "middleware", made just so we can just see what's going on.)
app.use('*', function(req, res, next){
  console.log('requested: ' + req.method + ' ' + req.baseUrl); //instead of .baseUrl, we could also have used 'req.path'
  next();
});

//console.logging the server's responses
app.use(function(req, res, next) {
  console.log('response: ', res.statusCode);
});
  
//serving up static files (instead of loading in the stylesheets, etc, through the server individually)
//basically, "when i get a request, check if it matches one of the files on my system; if so, just show the static page from my file"
app.use(express.static('public'));
