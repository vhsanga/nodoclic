var productoSelecionados=[];
var items=0;
$(function(){
	cargarProductos();
	initElements();
});

function initElements(){
	
	$("#cli-ci").keyup(function(){
		if( $("#cli-ci").val().length===10 ){
			buscarCedula($("#cli-ci").val());
		}
	});
	$("#btnGuardarCliente").click(function(){
		guardarClienteVenta();
	});	
	$("#addToFactura").click(function(){
		pre_guardarVenta();
	});

	$("#btnGuardarVenta").click(function(){
		guardarVenta();
	});

	$("#caja-resume-ventas-hoy").click(function(){
		loadTablaVentaFecha(moment().format('YYYY-MM-DD'),'LL');	
		$('#modalMostrarVentaFecha').modal({backdrop: 'static', keyboard: false}); 	
	});

}




function buscarCedula(ci){
	getClienteByCi(ci, function(cliente){
		if(cliente){
			$("#cli-id").val(cliente.id);
			$("#cli-nombre").hide().text(cliente.nombres + " "+ cliente.apellidos).show("slow");
			$("#cli-direccion").hide().text(cliente.direccion).show("slow");
			$("#cli-telefono").hide().text(cliente.telefono).show("slow");
		}else{
			mostrarMensaje(_CONST.NO_EXISTE_CLIENTE.toString().replace("_ci_",ci),  "warning");
			$("#cli-id").val("0");
			$('#modalCrearCliente').modal({backdrop: 'static', keyboard: false});  
			$("#ciCl").val(ci);
			$("#nombreCl").focus();
		}
		console.log(cliente);
	});
}

function guardarClienteVenta(){
	guardarCliente(function(cliente){
		console.log(cliente);
		$('#modalCrearCliente').modal('hide');  
		setTimeout(function(){
			$("#cli-id").val(cliente.id);
			$("#cli-nombre").hide().text(cliente.nombres + " "+ cliente.apellidos).show();
			$("#cli-direccion").hide().text(cliente.direccion).show();
			$("#cli-telefono").hide().text(cliente.telefono).show();
		},1000);
		
	});
}

function pre_guardarVenta(){
	
	$('#conf_cliente').text($('#cli-nombre').text());
	$('#conf_valor').text($('#sumaTotal').text());
	$('#conf_valor_recibido').focus();
	$('#modalPreventa').modal({backdrop: 'static', keyboard: false});
};

