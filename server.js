var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.get('*', function(req, res){
  res.render('index');
});

app.listen(3030, function(){
  console.log("Server started on http://localhost:3030");
});