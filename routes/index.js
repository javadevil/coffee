var router = require('express').Router();

router.all("/",function(req,res){
	res.render("index",{"test":"Mocca"});
});
module.exports = router;