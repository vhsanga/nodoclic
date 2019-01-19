import compraService_ from "../services/compraService";
import ventaService_ from "../services/ventaService";
let ventaService = new ventaService_(); 
let compraService = new compraService_(); 

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('estadistica/margenGanancias', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
    }); 
});


/* obtener valor de compra y venta de un rango */
router.get('/getValorVentasDentroDeRagoFecha/:fecha_i/:fecha_f', function(req, res, next) {
	var item=ventaService.getValorVentasDentroDeRagoFecha(req.user.id_compania, req.params.fecha_i,req.params.fecha_f);
	item.then(function(valor_venta){
		item=compraService.getValorComprasDentroDeRagoFecha(req.user.id_compania, req.params.fecha_i,req.params.fecha_f);
		item.then(function(valor_compra){
			res.json({
				valor_venta:valor_venta,
				valor_compra:valor_compra
			});
		}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});


module.exports = router;