//load in express
const express = require('express');
const app = express();

//load in nunjucks
const nunjucks = require('nunjucks');

//load in routes
const routes = require('./routes');
app.use('/', routes);

// nunjucks.render('index.html', locals, function(err, output) {
//   console.log(output, "this is output");
// });

app.listen(3000, () => {
  console.log('Server listening!');
});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {autoescape: true, express: app, noCache: true});

app.use('*', function(req, res, next){
  console.log(req.method + ' ' + req.baseUrl);
  next();
});

//serving up static files
app.use(express.static('public'));

// app.get('/nunjucks', function(req, res, next){
//   res.render('index.html', {
//   title: 'Our Awesome Title',
//   people: [
//     {name: 'Gandalf'},
//     {name: 'Frodo'},
//     {name: 'Betty'}
//   ],
//   activities: [
//     'biking',
//     'coding',
//     'sleeping'
//   ]
// });
// });

// app.get('/', function(req, res, next){
//   res.send('<h1>HELLO THERE</h1>');
// });

// app.get('/news', function(req, res, next){
//   res.send('This is the news page');
// });

