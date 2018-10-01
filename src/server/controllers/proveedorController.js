import proveedorService_ from "../services/proveedorService";
let proveedorService = new proveedorService_(); 

var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
	res.render('compras/misCompras', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
    }); 
});*/

router.get('/list', function(req, res, next) {
	var item=proveedorService.getListaProveedores();
	item.then(function(rows){
		return res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.post('/crear', function(req, res, next) {
	var item=proveedorService.crearProveedor(req.body);
	item.then(function(prov){
		return res.json( {
	        result : true,
	        idProveedor:prov
		});
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});



module.exports = router;
