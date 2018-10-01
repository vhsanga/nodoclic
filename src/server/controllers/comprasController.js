import compraService_ from "../services/compraService";
let compraService = new compraService_(); 

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('compras/misCompras', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
    }); 
});

router.get('/list', function(req, res, next) {
	var item=compraService.getListaCompras();
	item.then(function(rows){
		res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
	
});

module.exports = router;
