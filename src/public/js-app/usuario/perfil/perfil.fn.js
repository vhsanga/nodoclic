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
	var dataSend={
		id: $("#idUs").val(),
		nombreUsuario: $("#userUs").val(),
		passAnterior: $("#passUs").val(),
		passNuevo: $("#pass1Us").val(),
	}
	$.post("/usuario/editarPass",dataSend).done(function(data){
		console.log(data);
		mostrarMensaje(_CONST.PASS_CAMBIADO, "success")
		$("#userUs").val("");
		$("#passUs").val("");
		$("#pass1Us").val("");
	}).fail(function(err){
		try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
	}).always(function(){ setTimeout(function(){ cerrarMensaje()},18000)   })
}
