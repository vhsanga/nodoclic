import usuarioService_ from "../services/seguridades/usuarioService";
import companiaService_ from "../services/companiaService";
let usuarioService = new usuarioService_(); 
let companiaService = new companiaService_(); 

var express = require('express');
var router = express.Router();

/* GET usuario page. */
router.get('/', function(req, res, next) {
	var item=usuarioService.getUsuarioById(req.user.id);
	item.then(function(us){
		console.log(us[0]);
		res.render('usuario/perfil', {
			usuario: us[0],
	        isAuthenticated : req.isAuthenticated(),
	        user : req.user
	    }); 
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
		
});



router.post('/editarUsuario', function(req, res, next) {
	var item=usuarioService.updateUsuario(req.body);
	item.then(function(usr){
		item=companiaService.editUsuario(req.body);
		item.then(function(comp){
			return res.json( req.body );
		}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
	}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
});

router.post('/editarPass', function(req, res, next) {
	var item=usuarioService.updateUserPass(req.body);
	item.then(function(usr){		
			return res.json( req.body );
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
