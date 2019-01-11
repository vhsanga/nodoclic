var bcrypt=require('bcryptjs');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/informacion', function(req, res, next) {
	res.render('external/informacion', {}); 
});



module.exports = router;