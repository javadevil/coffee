var express = require('express');
var https = require('https');
var fs = require('fs');
var app	= express();


//Application Setting
app.set('port',process.env.PORT || 3000);

//Template Engine setup
app.engine("html" , require('consolidate').swig);
app.set("view engine" , "html");
app.set("views" , __dirname + "/views");

//Routes setup
app.use(require('./routes'));

//Static serve
app.use(require('serve-static')(__dirname+"/public"));

//Json body parser

app.use(require('body-parser').json());

app.listen(app.get('port'),function(){
	console.log('Coffee Express serve at http://localhost:%s/',app.get('port'));
});

var options = {
  key: fs.readFileSync('./coffee-key.pem'),
  cert: fs.readFileSync('./coffee-cert.pem')
};

https.createServer(options,app).listen(3001);