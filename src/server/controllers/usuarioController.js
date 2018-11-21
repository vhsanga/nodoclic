import usuarioService_ from "../services/seguridades/usuarioService";
import companiaService_ from "../services/companiaService";
let usuarioService = new usuarioService_(); 
let companiaService = new companiaService_(); 

var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs');
var BCRYPT_SALT_ROUNDS = 12;


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
	let item=usuarioService.getUsuarioById(req.body.id);
    item.then(rows =>{
      if(rows.length!==0){
        if (bcrypt.compareSync(req.body.passAnterior,rows[0].pass)) {
            bcrypt.hash(req.body.passNuevo, BCRYPT_SALT_ROUNDS)
		    .then(function(hashedPass) {
		    	req.body.passNuevo=hashedPass;
		        var item=usuarioService.updateUserPass(req.body);
				item.then(function(usr){		
						return res.json( {resp:true} );
				}).catch(function(err){ console.log("1 ", err); res.json({success: false, error: err}, 400); });
		    });

        }else{
          	return res.json( {resp:false, err:1 });
        }
      }else{
        	return res.json( {resp:false, err:2 });
      }        
    }).catch(err=>{
      console.log("1 ", err); res.json({success: false, error: err}, 400); 
    });
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
