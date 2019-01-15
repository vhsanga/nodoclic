function validarFormProveedor(char){
	var res={
		correcto:true,
		msj:""
	};

	if($("#nombrePv"+char).val()===""){
		pintarElemento("nombrePv"+char);
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
	mostrarMensaje(_CONST.PROCESS, "process");
	$.post( "/proveedor/crear",dataSend).done(function( dataRes ) {
		callback(dataSend, dataRes );

    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}

function editarProveedor(){
  let validado=validarFormProveedor("_");
  if(!validado){    
    return false;
  }
  var dataSend={
		nombre:$("#nombrePv_").val(),
		direccion:$("#direccionPv_").val(),
		telefono:$("#dtelefonoPv_").val(),
		representante:$("#representntePv_").val()
	}

  dataSend["id"]=proveedorSelecionado.id
  mostrarMensaje(_CONST.PROCESS, "process");
  $.post( "/proveedor/editar",dataSend).done(function( dataRes ) {
  	 if(dataRes.result==true){  	 	
        editarFilaEnTabla(dataSend,dtProveedores);
        document.getElementById("fromEditarProveedor").reset();
        mostrarMensaje(_CONST.EXITO_CREAR_AJAX,"success");
        $('#modalEditarProveedor').modal('hide');
      }else{ mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}



function mostrarProveedor(proveedorSelecionado){
	if(proveedorSelecionado != null){
		document.getElementById("fromEditarProveedor").reset();
		mostrarMensaje(_CONST.CARGANDO, "process");
		$.get( "/proveedor/list/"+proveedorSelecionado.id).done(function( data ) {
		    util_verificarSesionLocal(data);

		    $("#nombrePv_").val(data.nombre),
		    $("#direccionPv_").val(data.direccion),
		    $("#dtelefonoPv_").val(data.telefono);
		    $("#representntePv_").val(data.representante);
		  
		    $('#modalEditarProveedor').modal({backdrop: 'static', keyboard: false});    
		    cerrarMensaje();
		}).fail(function(e) {
		  try{
		        mostrarMensaje(e.responseJSON.error.message, "danger");
		   }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
		}).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
	}
	
}


function mostrarComprasAProveedor(id_proveedor){
	mostrarMensaje(_CONST.CARGANDO, "process");	
	dtComprasAProveedores=$('#tablaComprasAProveedores').DataTable( {
    "ajax": {
        url: "/proveedor/compras/"+id_proveedor,
        dataSrc:''
      } ,
    "columns": [
        { "data": null },
        { "data": "nombre" },
        { "data": "cantidad" },
        { "data": "precio" , render: function(data, type, row){
        						var val=data
        						if(data == null){
        							val=0;
        						}	
                                return  parseFloat(val).toFixed(2);
                            }
        },
        { "data": "fecha_compra" },
        { "data": "referencia" },
      ],
      "language":idiomaEspaniol(),
      destroy:true,
      rowId:'id',
      columnDefs: [
        {
            targets: 3,
            className: 'dt-body-right'
        }
      ],
      "initComplete": function( settings, json ) {
			var row = dtProveedores.row('#'+id_proveedor).data(); 
			console.log(row);
	      	$('#titleProveedorCompra').text(row.nombre);
	      	$('#titleProveedorvalor').text( parseFloat(row.valor).toFixed(2) );
	      	$('#titleProveedorTelefono').text(row.telefono);
	      	$('#titleProveedorTelefono').text(row.representante);
	      	$('#titleProveedorDireccion').text(row.direccion);

	      	$('#modalComprasAProveedor').modal({backdrop: 'static', keyboard: false});
		    cerrarMensaje();
	  },
  });

    dtComprasAProveedores.on( 'order.dt search.dt', function () {
        dtComprasAProveedores.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } );


}