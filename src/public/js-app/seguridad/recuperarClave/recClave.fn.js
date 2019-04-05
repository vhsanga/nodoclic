function generarClaveTemporal(){
	if($("#usuarioRecupera").val()==='' && $("#correoRecupera").val()===''){
		mostrarMensaje(_CONST.CAMPO_USER_CORREO_VACIO, "warning");
		return false;
	}
	var dataSend={
		usuario: $("#usuarioRecupera").val(),
		correo: $("#correoRecupera").val(),
	}
	mostrarMensaje(_CONST.PROCESS, "process");	
	$.post("/generarClaveTemporal",dataSend).done(function(data){
		console.log(data);
		if(data.result){
			mostrarMensaje(_CONST.ENVIO_PASS_TEMP, "success");
		}else {
			mostrarMensaje(data.msj, "danger");
		}
	}).fail(function(err){
		try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
	}).always(function(){ setTimeout(function(){ cerrarMensaje()},18000)   })
}




	
