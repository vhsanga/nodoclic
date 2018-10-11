function getClienteByCi(ci, callback){
	$.get( "/clientes/listci/"+ci).done(function( data ) {
        callback(data);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+" los productos, vuelva a cargar la página", "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}

function guardarCliente(callback){
  mostrarMensaje(_CONST.PROCESS, "process");
  let validado=validarFormCliente("")
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposCliente("");
	$.post( "/clientes/crear/",dataSend).done(function( data ) {
		mostrarMensaje(_CONST.EXITO_CREAR_AJAX, "success");
        callback(data);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}



function obtenerCamposCliente(char){
  return {
    nombres:$("#nombreCl"+char).val(),
    apellidos:$("#apellidoCli"+char).val(),
    ci:$("#ciCl"+char).val(),
    direccion:$("#direccionCL"+char).val(),
    telefono:$("#telefonoCl"+char).val(),
    email:$("#emailCl"+char).val()
  }
}


function validarFormCliente(char){
  console.log(char);
  console.log("#ProveedorPd"+char);
  var elemento="";
  var res=true;
  var msj="";
  
  
  if($("#apellidoCli"+char).val()===""){
    elemento="apellidoCli"+char;
    res=false;
    msj=_CONST.VALID_APELLIDO_CLIENTE;
  }
  if($("#ciCl"+char).val()===""){
    elemento="ciCl"+char;
    res=false;
    msj=_CONST.VALID_CI_CLIENTE;
  }
  if($("#nombreCl"+char).val()===""){
    elemento="nombreCl"+char;
    res=false;
    msj=_CONST.VALID_NOMBRE_CLIENTE;
  }
  if($("#apellidoCli"+char).val()===""){
    elemento="apellidoCli"+char;
    res=false;
    msj=_CONST.VALID_APELLIDO_CLIENTE;
  }


  if(!res){
    mostrarMensaje(msj, "warning");
    pintarElemento(elemento);
  }
  
  return res;
}