var express = require('express'),
	app = express(),
	port = process.env.PORT || 5000;

app.get('/', function(req, res){
  var body = 'Hello World';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

app.listen(port);
console.log("App listening on port: " + port);

