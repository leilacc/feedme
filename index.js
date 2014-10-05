//1
var http = require('http'),
    express = require('express'),
    path = require('path');
 
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('css', path.join(__dirname, 'css'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public'))); // use html files in test subdir

// Routing
app.get('/', function (req, res) {
  res.send('<html><body><h1>Hello World</h1></body></html>');
});

app.get('/feedme', function (req, res) {
  res.render('index');
});

// 404
app.use(function (req,res) { //1
    res.render('404', {url:req.url}); //2
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
