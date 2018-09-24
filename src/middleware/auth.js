module.exports = {

	isLogged : function(req, res, next){
		if(req.isAuthenticated()){
			next(); //Si esta autenticado pasa a la siguiente petición
		}else{ //caso contrario lo redirecciona al formulario de inicio de sesión
			res.redirect('/login/inicio');
                        //res.redirect('/login/validar');
		}
	}

}