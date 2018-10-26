import usuarioService_ from "../services/seguridades//usuarioService";
let usuarioService = new usuarioService_(); 

var express = require('express');
var router = express.Router();

/* GET usuario page. */
router.get('/', function(req, res, next) {
	var item=usuarioService.getUsuarioById(req.user.id);
	item.then(function(us){
		res.render('usuario/perfil', {
			usuario: us[0],
	        isAuthenticated : req.isAuthenticated(),
	        user : req.user
	    }); 
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
		
});

router.get('/getUsuario', function(req, res, next) {
	var item=proveedorService.getListaProveedores();
	item.then(function(rows){
		return res.json(rows);
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

/*
router.post('/crear', function(req, res, next) {
	var item=proveedorService.crearProveedor(req.body);
	item.then(function(prov){
		return res.json( {
	        result : true,
	        idProveedor:prov
		});
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});
*/


module.exports = router;
