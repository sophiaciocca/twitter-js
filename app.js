const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('Server listening!');
});

app.get('/', function(req, res, next){
  res.send('<h1>HELLO THERE</h1>');
});
