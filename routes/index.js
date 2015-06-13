var router = require('express').Router();

router.all("/test",function(req,res){
	console.log(req.session);
	res.json({"ok":"OK"});
});

router.use("/account",require('./authenticate.js'));
module.exports = router;