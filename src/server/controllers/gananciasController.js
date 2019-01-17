
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('estadistica/margenGanancias', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
    }); 
});


module.exports = router;