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

	/*bcrypt.genSalt(10, function(err, salt) {
		 bcrypt.hash("admin", salt, function(err, hash) {
	        var data={usuario:"admin", pass:hash, nombres:"jose miraflores", email: "email@email.com", telefono:"97963696"};
			var item= serviceUsuario.createUsuario(data);
			item.then(function (row){
				res.render('index', { title: 'Express' });
			});
	    });
    });*/
    
});

module.exports = router;
