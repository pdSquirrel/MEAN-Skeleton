var express = require('express'),
    stylus  = require('stylus'),
    logger  = require('morgan'),
    bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3030;

var app = express();

function compile(str, path){
  return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

/* render line breaks from jade templates when in dev */
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
      src: __dirname + '/public',
      compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

app.get('/partials/:partialPath', function(req, res){
  res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
  res.render('index');
});

app.listen(port, function(){
  console.log("Server started on http://localhost:3030");
});