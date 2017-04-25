//load in express
const express = require('express');
const app = express();

//load in sockets
var socketio = require('socket.io');

//load in nunjucks
const nunjucks = require('nunjucks');

//load in routes folder (contains index.js)
const routes = require('./routes');

//setting up our overall server
var server = app.listen(3000, () => {
  console.log('Server listening!');
});

//setting up Sockets server
var io = socketio.listen(server);
app.use('/', routes(io));

//setting up express to use nunjucks
app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {autoescape: true, express: app, noCache: true});

//just for our own knowledge, showing 'GET /url'
app.use('*', function(req, res, next){
  console.log(req.method + ' ' + req.baseUrl);
  next();
});

//serving up static files
app.use(express.static('public'));
