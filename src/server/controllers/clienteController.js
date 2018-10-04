import clienteService_ from "../services/clienteService";
let clienteService = new clienteService_(); 

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('cliente/cliente', {
        isAuthenticated : req.isAuthenticated(),
        user : req.user
    }); 
});

router.get('/list', function(req, res, next) {
	var item=clienteService.getClientes(req.user.id_compania);
	item.then(function(rows){
		res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.post('/crear', function(req, res, next) {
	var item=clienteService.crearCliente(req.body,req.user.id_compania);
	item.then(function(prov){
		return res.json( {
	        result : true,
	        idProveedor:prov
		});
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.post('/actualizar', function(req, res, next) {
	var item=clienteService.updateCliente(req.body);
	item.then(function(prov){
		return res.json( {
	        result : true,
	        idProveedor:prov
		});
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});


router.post('/eliminar/:id', function(req, res, next) {
	var item=clienteService.deleteCliente(req.params.id);
	item.then(function(prov){
		return res.json( {
	        result : true,
	        idProveedor:prov
		});
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});


router.get('/listci/:ci', function(req, res, next) {
	var item=clienteService.getClienteByCi(req.params.ci);
	item.then(function(rows){
		res.json(rows[0]);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

module.exports = router;