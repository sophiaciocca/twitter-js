//load in express
const express = require('express');
const app = express();

//load in nunjucks
const nunjucks = require('nunjucks');

var locals = {
  title: 'Our Awesome Title',
  people: [
    {name: 'Gandalf'},
    {name: 'Frodo'},
    {name: 'Betty'}
  ]
};

nunjucks.render('index.html', locals, function(err, output) {
  console.log(output, "this is output");
});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjuck.configure('views');

app.use('*', function(req, res, next){
  console.log(req.method + ' ' + req.baseUrl);
  next();
});

app.listen(3000, () => {
  console.log('Server listening!');
});

app.get('/', function(req, res, next){
  res.send('<h1>HELLO THERE</h1>');
});

app.get('/news', function(req, res, next){
  res.send('This is the news page');
});

