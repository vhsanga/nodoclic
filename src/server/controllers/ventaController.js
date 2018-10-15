import ventaService_ from "../services/ventaService";
let ventaService = new ventaService_(); 

var express = require('express');
var router = express.Router();



router.get('/', function(req, res, next) {
	res.render('ventas/ventas', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
    }); 
});

router.get('/listar/:fecha', function(req, res, next) {
	var item=ventaService.getVentasByFecha(req.params.fecha,req.user.id_compania);
	item.then(function(rows){
		res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});


router.get('/listar_resume/:fecha', function(req, res, next) {
	var item=ventaService.getVentasByFecha(req.params.fecha,req.user.id_compania);
	item.then(function(rows){
		res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});


router.post('/crear', function(req, res, next) {
	console.log(req.body)
	if(req.body.id_cliente===0){
			req.body.id_cliente=null;
	}
	var item=ventaService.crearVenta(req.body, req.user.id_compania);
	item.then(function(venta){
		var item=ventaService.crearVentaDetalle(req.body, venta[0], req.user.id_compania);
		item.then(function(){
			res.json(true);
		}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.get('/listar_resume', function(req, res, next) {
	var item=ventaService.getResumeTotalVentas(req.user.id_compania);
	item.then(function(rows){
		res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});


module.exports = router;
