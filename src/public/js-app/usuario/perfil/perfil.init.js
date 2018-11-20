$(function() {  
  console.log("iniciando perfl");
  $("#btnGuardarInfoPerifl").click(function(){
  		guardarInfoPerfil();
  });
  $("#btnCambiarContrasenia").click(function(){
  	if($("#pass1Us").val()===$("#pass2Us").val()){
  		cambiarContrasenia();
  	}else{
  		mostrarMensaje(_CONST.PASS_NUEVA_NO_COINCIDE,"warning");
  		pintarElemento("pass1Us");
  		pintarElemento("pass2Us");
  	}
  });
    
});