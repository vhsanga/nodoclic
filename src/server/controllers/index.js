import serviceEmail_ from "../Utilidades/Email";
import serviceUsuario_ from "../services/seguridades/usuarioService";
let serviceUsuario = new serviceUsuario_(); 
let serviceEmail = new serviceEmail_(); 
var bcrypt=require('bcryptjs');
var express = require('express');
var router = express.Router();
const URL_PASS_RECOVER="/recuperarContrasenia/"
const RANGO_TOKEN=20;

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("estado: ************: "+req.isAuthenticated());
	if(req.isAuthenticated()){
		console.log("USUARIO O O O O O ");
		console.log(req.user);
		res.render('home', {
			isAuthenticated : req.isAuthenticated(),
			user : req.user
		}); 
	}else{
		res.render('index', {
			message: req.flash('info')
		});
	}	 
});


/* Verificar si esta logeado. */
router.get('/verificarSesion', function(req, res, next) {
	if(req.isAuthenticated()){
		res.json(true);
		
	}else{
		res.render('index', {
			message: req.flash('info')
		});
	}	
});

/**paginas externas*/
router.get('/informacion', function(req, res, next) {
	res.render('external/informacion', {}); 
});

router.get(URL_PASS_RECOVER+':id', function(req, res, next) {
	//		req.params.id
	res.render('external/recuperarContrasenia', {}); 
});





router.post('/generarClaveTemporal', function(req, res, next) {	
	var item=serviceUsuario.getUsuarioByUsername(req.body.usuario);
	item.then(function(usr){
		if(usr.length!=0){
			cambiarCalveTemporal(usr[0], req, function(estado, respuestaEnvio){
				return res.json( {  result : estado, msj:respuestaEnvio });			 		
			});
		}else{
			item=serviceUsuario.getUsuarioByEmail(req.body.correo);
			item.then(function(usrCorreo){
				if(usr.length!=0){
					cambiarCalveTemporal(usrCorreo[0], req, function(estado, respuestaEnvio){
						return res.json( {  result : estado, msj:respuestaEnvio });
					});
				}else{
					return res.json( { result : false , msj:"No se ha encontrado al usuario en nuestro sistema. Ingrese los datos corretos"});
				}

			});
		}

	});
});

function cambiarCalveTemporal(usuario, req, callback){
	var fullUrl = req.protocol + '://' + req.get('host'); 
	usuario["urlPass"]=fullUrl+URL_PASS_RECOVER+generarString(RANGO_TOKEN);
	console.log(usuario);
	var item=serviceUsuario.setUrlPass(usuario);
	item.then(function(usr){
		serviceEmail.enviarEmailSeguridad(usuario.email, usuario.urlPass, function(error, info){
			if (error) {
				callback(false, error.response);;                
			}else{
				callback(true, info.response);
			} 
		});
	}).catch(function(err){ throw err; });
}


function generarString(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-";
	for (var i = 0; i < length; i++)
		text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}


module.exports = router;
