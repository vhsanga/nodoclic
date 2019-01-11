import proveedorService_ from "../services/proveedorService";
import compraService_ from "../services/compraService";
let proveedorService = new proveedorService_(); 
let compraService = new compraService_(); 

var express = require('express');
var router = express.Router();

/* GET home page.  Proveedor*/
router.get('/', function(req, res, next) {
	res.render('proveedor/proveedor', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
    }); 
});

router.get('/list', function(req, res, next) {
	var item=proveedorService.getListaProveedores(req.user.id_compania);
	item.then(function(rows){
		return res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.get('/listProveedoresValor', function(req, res, next) {
	var item=proveedorService.getListaProveedoresComprasValor(req.user.id_compania);
	item.then(function(rows){
		return res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.get('/list/:idProveedor', function(req, res, next) {
	var item=proveedorService.getProveedoresById(req.params.idProveedor);
	item.then(function(rows){
		return res.json(rows[0]);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.post('/crear', function(req, res, next) {
	var item=proveedorService.crearProveedor(req.body,req.user.id_compania);
	item.then(function(prov){
		return res.json( {
	        result : true,
	        idProveedor:prov
		});
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.post('/editar', function(req, res, next) {
	var item=proveedorService.getUpdateProveedor(req.body);
	item.then(function(prov){
		return res.json( {
	        result : true
		});
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

/**obtener  las compras realizadas a un proveedor*/
router.get('/compras/:idProveedor', function(req, res, next) {
	var item=compraService.getComprasHistoricasBydProveedor(req.params.idProveedor);
	item.then(function(compras){
		return res.json(compras);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});



module.exports = router;
