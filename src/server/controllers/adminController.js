import usuarioService_ from "../services/seguridades/usuarioService";
import companiaService_ from "../services/companiaService";
let usuarioService = new usuarioService_(); 
let companiaService = new companiaService_(); 

var express = require('express');
var router = express.Router();
var bcrypt=require('bcryptjs');
var BCRYPT_SALT_ROUNDS = 12;


/* GET admin page. */
router.get('/', function(req, res, next) {
	console.log("llamando al admin");
	if(req.isAuthenticated()){
		console.log("USUARIO ADMIN O O O O O ");
		console.log(req.user);
		res.render('homeAdmin', {
	        isAuthenticated : req.isAuthenticated(),
	        user : req.user
	    }); 
	}else{
		res.render('indexAdmin', {
	         message: req.flash('info')
	    });
	}
});





module.exports = router;
