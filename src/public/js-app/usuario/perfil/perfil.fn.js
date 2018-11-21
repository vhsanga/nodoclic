function guardarInfoPerfil(){
	var dataSend={
		id: $("#idUs").val(),
		nombres: $("#nombreUs").val(),
		email: $("#emailUs").val(),
		telefono: $("#telefonoUs").val(),
		direccion: $("#direccionUs").val(),
		idCompania: $("#idCompania").val(),
		nombreCompania:$("#nombreComp").val(),
		direccionCompania:$("#dirComp").val(),
		telefonoCompania:$("#telefonoComp").val(),
		representanteCompania:$("#representanteComp").val(),
	}
	
	$.post("/usuario/editarUsuario",dataSend).done(function(data){
		mostrarMensaje(_CONST.DATOS_USUARIO_EDITADOS, "success");
		$("#nombreUs_").hide().text(data.nombres).show('slow');
		$("#emailUs_").hide().text(data.email).show('slow');
		$("#telefonoUs_").hide().text(data.telefono).show('slow');
		$("#direccionUs_").hide().text(data.direccion).show('slow');
		$("#nombreComp_").hide().text(data.nombreCompania).show('slow');
		$("#dirComp_").hide().text(data.direccionCompania).show('slow');
		$("#telefonoComp_").hide().text(data.telefonoCompania).show('slow');
		$("#representanteComp_").hide().text(data.representanteCompania).show('slow');

	}).fail(function(err){
		try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
	}).always(function(){ setTimeout(function(){ cerrarMensaje()},18000)   })
}

function cambiarContrasenia(){
	if(!validarCamposCambiarPass()){
		return false;
	}
	var dataSend={
		id: $("#idUs").val(),
		nombreUsuario: $("#userUs").val(),
		passAnterior: $("#passUs").val(),
		passNuevo: $("#pass1Us").val(),
	}
	$.post("/usuario/editarPass",dataSend).done(function(data){
		console.log(data);
		if(data.resp){
			mostrarMensaje(_CONST.PASS_CAMBIADO, "success")
			$("#userUs").val("");
			$("#passUs").val("");
			$("#pass1Us").val("");
		}else{
			if(data.err===1){
				mostrarMensaje(_CONST.PASS_ANTERIOR_FAIL, "warning");
				pintarElemento("passUs");
			}
			if(data.err===2){
				mostrarMensaje(_CONST.NO_USER_FOUND, "warning");
			}
		}
			
	}).fail(function(err){
		try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
	}).always(function(){ setTimeout(function(){ cerrarMensaje()},18000)   })
}

function validarCamposCambiarPass(){
	var res=true;
	var msj="";
	var elemento="";
	desPintarElemento("pass1Us");
	desPintarElemento("pass2Us");
	desPintarElemento("passUs");
	desPintarElemento("userUs");
  	
  	if($("#pass1Us").val()!=$("#pass2Us").val()){
  		res=false;
  		msj=_CONST.PASS_NUEVA_NO_COINCIDE;
  		elemento="pass2Us";
  	}
  	
  	if($("#pass2Us").val()===""){
  		res=false;
  		msj=_CONST.CAMPO_PASS2_VACIO;
  		elemento="pass2Us";
  	}
  	if($("#pass1Us").val()===""){
  		res=false;
  		msj=_CONST.CAMPO_PASS1_VACIO;
  		elemento="pass1Us";
  	}
  	if($("#passUs").val()===""){
  		res=false;
  		msj=_CONST.CAMPO_PASS_VACIO;
  		elemento="passUs";
  	}
  	if($("#userUs").val()===""){
  		res=false;
  		msj=_CONST.CAMPO_USER_VACIO;
  		elemento="userUs";
  	}
  	
  	
  	if(!res){
  		mostrarMensaje(msj,"warning");
  		pintarElemento(elemento);
  	}
	return res;
}
