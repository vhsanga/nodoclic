function cargarProveedores(callback ){

	$.get( "/proveedor/list").done(function( data ) {
        console.log(data);   
             
        if(data.length===0){
          mostrarMensaje("Todavia no tiene proveedores, ingrese un proveedor", "warning");
        }else{          
          $("#ProveedorPd").empty();
          $("#ProveedorPd").append('<option value=0> -- Seleccione un proveedor --</option>');
          for (var i in data){
            $("#ProveedorPd").append('<option value='+data[i].id+'> '+data[i].nombre+' </option>');        
          } 
          $("#ProveedorPd").append('<option value=-1 >   ** (Crear Nuevo Proveedor) **</option>');
        }
        if(typeof callback === 'function'){
        	callback();
        }

    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+" los proveedores, vuelva a cargar la página", "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}



function guardarProveedor(){
	
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
		console.log(data.idProveedor.values());
		if(data.result){
        	mostrarMensaje(_CONST.EXITO_CREAR_PROVEEDOR, "success");
        	cargarProveedores(function(){
        		$("#ProveedorPd").val(data.idProveedor[0]);
        	});
        	$('#modalCrearProveedor').modal('hide') ; 
        	
        	
		}

    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}

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