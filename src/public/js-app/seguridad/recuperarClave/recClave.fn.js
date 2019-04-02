function generarClaveTemporal(){
	if($("#usuarioRecupera").val()==='' || $("#correoRecupera").val()===''){
		mostrarMensaje(_CONST.CAMPO_USER_CORREO_VACIO, "warning");
		return false;
	}
	var dataSend={
		usuario: $("#usuarioRecupera").val(),
		correo: $("#correoRecupera").val(),
	}
}




	
