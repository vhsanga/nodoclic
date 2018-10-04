import compraService_ from "../services/compraService";
import productoService_ from "../services/productoService";
let compraService = new compraService_(); 
let productoService = new productoService_(); 

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('compras/misCompras', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
    }); 
});

router.get('/list/:id', function(req, res, next) {
	var item=compraService.getCompraById(req.params.id);
	item.then(function(rows){
		res.json(rows[0]);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.get('/list', function(req, res, next) {
	var item=compraService.getListaCompras();
	item.then(function(rows){
		res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.post('/crear', function(req, res, next) {
	if(req.body.id_proveedor==='null'){
			req.body.id_proveedor=null;
	}
	var item=productoService.crearProducto(req.body, req.user.id_compania);
	item.then(function(id_prod){
		req.body["id_producto"]=id_prod[0];
		item=compraService.crearCompra(req.body, req.user.id_compania);
		item.then(function(id_compra){
			item=productoService.setCodigoBarra("00"+id_prod[0],id_prod[0]);
			item.then(function(udt){
				console.log("compra:"+ id_compra[0]);
				item=compraService.getCompraById(id_compra[0]);
				item.then(function(compra){
					
					res.json(compra[0]);
					
				}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
				
			}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });

		}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
			
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});


router.post('/editar', function(req, res, next) {
	if(req.body.id_proveedor==='null'){
			req.body.id_proveedor=null;
	}
	var item=productoService.updateProducto(req.body, req.body.id_producto);
	item.then(function(id_prod){
		item=compraService.updateCompra(req.body, req.body.id);
		item.then(function(id_compra){
			item=compraService.getCompraById(req.body.id);
			item.then(function(compra){
				
				res.json(compra[0]);
				
			}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
				
		}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
			
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

module.exports = router;
