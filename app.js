const express = require('express');
const app = express();

app.use('*', function(req, res, next){
  //console.log(req);
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
