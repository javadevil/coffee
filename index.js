var express = require('express');
var MongoClient = require('mongodb');
var https = require('https');
var fs = require('fs');

MongoClient.connect("mongodb://localhost/",{db:"coffee"},function(err,db){
	var app	= express();
	//Application Setting
	app.set('port',process.env.PORT || 3000);

	var ssl_options = {
	  key: fs.readFileSync('./coffee-key.pem'),
	  cert: fs.readFileSync('./coffee-cert.pem')
	};

	//Template Engine setup
	app.engine("html" , require('consolidate').swig);
	app.set("view engine" , "html");
	app.set("views" , __dirname + "/views");

	//JSON body parser,CSRF-Token
	app.use(require('cookie-parser')());
	app.use(require('body-parser').json());
	app.use(require('csurf')({cookie:true,key:"XSRF-TOKEN"}));
	app.use(function(req,res,next){
		res.cookie('XSRF-TOKEN',req.csrfToken());
		next();
	});
	//Routes setup
	app.use(require('./routes'));

	//Static serve
	app.use(require('serve-static')(__dirname+"/public"));

	//Running server.
	https.createServer(ssl_options,app).listen(app.get('port'),function(){
		console.log('Secure CoffeeExpress runnning at https://localhost:%s',app.get('port'));
	});
});
