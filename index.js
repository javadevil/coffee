var express = require('express');

var app	= express();

//Application Setting
app.set('port',process.env.PORT || 3000);

app.get('/',function(req,res){
	res.send('Coffee at Work!');
});

app.listen(app.get('port'),function(){
	console.log('Coffee server @port:%s',app.get('port'));
});