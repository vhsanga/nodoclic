function getVentasByFecha(fecha, callback){
	$.get( "/ventas/listar_resume/"+fecha).done(function( data ) {
       callback(data);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+", vuelva a cargar la página", "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}



function loadTablaVentaFecha(fecha){
	console.log("tabla");
	console.log(fecha);
  var dtVentasFecha=$('#tablaVentaFecha').DataTable( {

    "ajax": {
        url: "/ventas/listar/"+fecha,
        dataSrc:''
      } ,
    "columns": [
        { "data": null },
        { "data": "nombres" , render: function(data, type, row){
                                return  data==null ? "<span>Consumidor Final</span>" : data;
                            }
        },
        { "data": "ci" , render: function(data, type, row){
                               return  data==null ? "S/N": data;
                            }
        },
        { "data": "fecha" , render: function(data, type, row){
                                return  moment(data).calendar();
                            }
        },
        { "data": "valor_total" , render: function(data, type, row){
                                return  parseInt(data).toFixed(2);
                            }
        }
      ],
      "language":idiomaEspaniol(),
      
      rowId:'id_venta',
      columnDefs: [
        {
            targets: 4,
            className: 'dt-body-right'
        }
      ],

  });

   dtVentasFecha.on( 'order.dt search.dt', function () {
    	console.log("dentro de la tabla")
        dtVentasFecha.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } ).draw();
   
}