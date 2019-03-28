var dtProveedores=null;
var dtComprasAProveedores=null;
var proveedorSelecionado=null;

$(function(){
	loadTablaProveedores();
	initElements();
});

function initElements(){
	$('#openModalProveedor').click(function(){
		document.getElementById("fromCrearProveedor").reset();
		$('#modalCrearProveedor').modal({backdrop: 'static', keyboard: false})
	});
	$('#btnEditarProveedor').click(function(){		
		editarProveedor();
	});
	$('#btnGuardarProveedor').click(function(){		
		guardarProveedor(function(dataSend, dataRes){
      console.log(dataRes);
			if(dataRes.result==true){
				dataSend["id"]=dataRes.idProveedor
				agregarFilaATabla(dataSend, dtProveedores);
        mostrarMensaje(_CONST.EXITO_CREAR_PROVEEDOR, "success");
        $('#modalCrearProveedor').modal('hide');
			}else{ mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
		});
	});
}

function loadTablaProveedores(){
  dtProveedores=$('#tablaProveedores').DataTable( {

    "ajax": {
        url: "/proveedor/listProveedoresValor",
        dataSrc:''
      } ,
    "columns": [
        { "data": null },
        { "data": "nombre" },
        { "data": "direccion" },
        { "data": "telefono" },
        { "data": "representante" },
        { "data": "valor" , render: function(data, type, row){
        						var val=data
        						if(data == null){
        							val=0;
        						}	
                                return  parseFloat(val).toFixed(2);
                            }
        },
        { "data": null, render: function(data, type, row){
        						console.log(row);
        							return '<button class="btn bg-orange" onclick="mostrarComprasAProveedor('+row.id+')" >Ver compras</button>'
        						} 
    	},
      ],
      "language":idiomaEspaniol(),
      destroy:true,
      rowId:'id',
      columnDefs: [
        {
            targets: 5,
            className: 'dt-body-right'
        }
      ],
  });

    dtProveedores.on( 'order.dt search.dt', function () {
        dtProveedores.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } );
    dtProveedores.on( 'dblclick', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
          if(dtProveedores.row( this ).data() != null){           
            dtProveedores.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            console.log(dtProveedores.row( this ).data());
            proveedorSelecionado=dtProveedores.row( this ).data();
            mostrarProveedor(proveedorSelecionado);
          }
            
        }
    } );
           
}