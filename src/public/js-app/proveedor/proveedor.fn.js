function validarFormProveedor(){
	var res={
		correcto:true,
		msj:""
	};

	if($("#nombrePv").val()===""){
		pintarElemento("nombrePv");
		res.correcto=false;
		res.msj=_CONST.VALID_NOMBRE_PROVEEDOR;
	}
	console.log(res);
	return res
}




function guardarProveedor(callback){
	
	let validar=validarFormProveedor()
	if(!validar.correcto){
		mostrarMensaje(validar.msj, "warning")
		return false;
	}

	var dataSend={
		nombre:$("#nombrePv").val(),
		direccion:$("#direccionPv").val(),
		telefono:$("#dtelefonoPv").val(),
		representante:$("#representntePv").val()
	}

	$.post( "/proveedor/crear",dataSend).done(function( data ) {
		callback(data);

    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}

