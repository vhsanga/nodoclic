import serviceUsuario_ from "../services/seguridades/usuarioService";
let serviceUsuario = new serviceUsuario_(); 
var bcrypt=require('bcryptjs');
var express = require('express');
var router = express.Router();

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

module.exports = router;
