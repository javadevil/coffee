var router = require('express').Router();
router.use(function(req,res,next){
	console.log("auth");
	next();
});
router.post("/login",function(req,res){
	console.log('login');
	res.json({"message":"Login"})
})
router.all("/logout",function(req,res){
	console.log("logout");
	res.json({"message":"Logout complete"});
});

module.exports = router;