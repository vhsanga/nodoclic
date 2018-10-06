var productoSelecionados=[];
var items=0;
$(function(){
	cargarProductos();
	initElements();
});

function initElements(){
	$("#addToFactura").click(function(){
		agrearAtabla();
	})

	$("#cli-ci").keyup(function(){
		if( $("#cli-ci").val().length===10 ){
			buscarCedula($("#cli-ci").val());
		}
	});
}


function buscarCedula(ci){
	getClienteByCi(ci, function(data){
		if(data.length>0){

		}else{
			mostrarMensaje(_CONST.NO_EXISTE_CLIENTE.toString().replace("_ci_",ci),  "warning")
		}
		console.log(data);
	});
}

