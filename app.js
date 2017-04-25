//load in express
const express = require('express');
const app = express();
var socketio = require('socket.io');

//load in nunjucks
const nunjucks = require('nunjucks');

//load in routes
const routes = require('./routes');

// nunjucks.render('index.html', locals, function(err, output) {
//   console.log(output, "this is output");
// });

var server = app.listen(3000, () => {
  console.log('Server listening!');
});

var io = socketio.listen(server);
app.use('/', routes(io));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {autoescape: true, express: app, noCache: true});

//
app.use('*', function(req, res, next){
  console.log(req.method + ' ' + req.baseUrl);
  next();
});

//serving up static files
app.use(express.static('public'));
