var productoSelecionados=[];
var PRODUCTOS=[];
var items=0;
var _cliente=null;
$(function(){
	cargarProductos();
	initElements();
	util_verificarSesionServer();
});

function initElements(){
	
	$("#cli-ci").keyup(function(event){
		if( event.keyCode === UTIL_ENTERKEYCODE ){
			buscarCedula($("#cli-ci").val());
		}
	});
	$("#pro-codigo-barra").keyup(function(event){
		if( event.keyCode === UTIL_ENTERKEYCODE ){
			getProductoByCodigoBarra($("#pro-codigo-barra").val());
		}		
	});
	$("#btn-buscar-cli").click(function(){
		buscarCedula($("#cli-ci").val());
	});
	$("#btnGuardarCliente").click(function(){
		guardarClienteVenta();
	});	
	$("#addToFactura").click(function(){
		pre_guardarVentaConsumidorFinal();
	});

	$("#btnGuardarVenta").click(function(){
		util_verificarSesionServer(function(){
			guardarVenta();
		})		
	});

	$("#caja-resume-ventas-hoy").click(function(){
		loadTablaVentaFecha(moment().format('YYYY-MM-DD'),'LL');	
		$('#modalMostrarVentaFecha').modal({backdrop: 'static', keyboard: false}); 	
	});
	$("#btn-open-corregir-cli").click(function(){
		mostrarClienteEditar(_cliente);		 
	});
	$("#btnEditarCliente__").click(function(){
		editarClienteDesdeVenta(_cliente.id, function (cliente){
			$('#modalEditarCliente__').modal('hide'); 
			pre_guardarVenta(cliente);	

		});
		
	});

	$("#btn-crear-aux").click(function(){	
		$('#modalCrearCompra').modal({backdrop: 'static', keyboard: false}); 	
	});

	$('#btnGuardarCompra').off('click');
	$("#btnGuardarCompra").click(function(){ 
		guardarCompra(function(dataSend, data){ //esta funcinon esta en: js-app/compras/compras.fn.js
			addProductoNuevo(dataSend,data);
			$('#modalCrearCompra').modal('hide');
			$("#btn-crear-aux").hide();
		})	
	});
	$("#btnReimprimir").click(function(){
		imprimirDiv("cuerpoFactura","");
	});

	$("#pro-nombre").focus();
}



function buscarCedula(ci){
	if(ci.length===10){
		getClienteByCi(ci, function(cliente){
			if(cliente){
				pre_guardarVenta(cliente);
				_cliente=cliente;
			}else{
				mostrarMensaje(_CONST.NO_EXISTE_CLIENTE.toString().replace("_ci_",ci),  "warning");
				$("#cli-id").val("0");
				$('#modalCrearCliente').modal({backdrop: 'static', keyboard: false});  
				$("#ciCl").val(ci);
				$("#nombreCl").focus();
			}
		});
	}else{
		mostrarMensaje(_CONST.MSJ_CEDULA_DIGITOS,"warning");
	}
}

function guardarClienteVenta(){
	guardarCliente(function(cliente){
		$('#modalCrearCliente').modal('hide');  
		pre_guardarVenta(cliente);
		_cliente=cliente;		
	});
}

function pre_guardarVenta(cliente){
	$("#cli-id").val(cliente.id);
	$("#cli-ced").text(cliente.ci);
	$("#cli-email").text(cliente.email);
	$("#cli-nombre").text(cliente.nombres + " "+ cliente.apellidos);
	$("#cli-direccion").text(cliente.direccion);
	$("#cli-telefono").text(cliente.telefono);
	$('#conf_valor').text($('#sumaTotal').text());
	$('#modalPreventa').modal({backdrop: 'static', keyboard: false});		
	setTimeout(function(){  $('#conf_valor_recibido').focus(); 	},1000);
};


function pre_guardarVentaConsumidorFinal(){
	$("#cli-id").val("0");
	$("#cli-ced").text("S/N");
	$("#cli-email").text("S/N");
	$("#cli-nombre").text(_CONST.CLIENTE_DEFAULT);
	$("#cli-direccion").text("S/N");
	$("#cli-telefono").text("S/N");
	$('#conf_valor').text($('#sumaTotal').text());
	$('#modalPreventa').modal({backdrop: 'static', keyboard: false});
	setTimeout(function(){  $('#conf_valor_recibido').focus(); 	},1000);
	
};

function mostrarClienteEditar(cliente){
	$("#ciCl__").val(cliente.ci);
	$("#nombreCl__").val(cliente.nombres);
	$("#apellidoCli__").val(cliente.apellidos);
	$("#direccionCL__").val(cliente.direccion);
	$("#telefonoCl__").val(cliente.telefono);
	$("#emailCl__").val(cliente.email);
	$('#modalEditarCliente__').modal({backdrop: 'static', keyboard: false});
}

function addProductoNuevo(dataSend,data){
	var p={codigo_barra: data.codigo_barra,
		detalle:data.detalle,
		id:data.id_producto,
		incluye_iva:dataSend.incluye_iva,
		nombre:data.nombre,
		precio_compra:data.precio_compra,
		precio_sin_iva:dataSend.precio_sin_iva,
		precio_venta:data.precio_venta,
		stock:dataSend.stock,
		valor_iva:dataSend.valor_iva,
	};
	PRODUCTOS.push(p);
	agrearAtabla(p);
}