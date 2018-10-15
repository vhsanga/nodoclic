import productoService_ from "../services/productoService";
let productoService = new productoService_(); 

var express = require('express');
var router = express.Router();


router.get('/listar', function(req, res, next) {
	var item=productoService.getProductos(req.user.id_compania);
	item.then(function(rows){
		res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.get('/porTerminar', function(req, res, next) {
	var item=productoService.getProductosPorTerminar(req.user.id_compania);
	item.then(function(rows){
		res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});



router.post('/setCodigoBar/:id_producto', function(req, res, next) {
	var item=productoService.setCodigoBarra("00"+req.params.id_producto,req.params.id_producto);
	item.then(function(rows){
		res.json("00"+req.params.id_producto);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});



module.exports = router;
