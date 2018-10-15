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
                                return  parseFloat(data).toFixed(2);
                            }
        }
      ],
      "language":idiomaEspaniol(),
      destroy:true,
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
   $('#tituloMostrarVentaFecha').text("Ventas de: "+moment(fecha).format('MMMM [del] YYYY')); 
   $('#modalMostrarVentaFecha').modal({backdrop: 'static', keyboard: false}); 
}


function mostrarVentasResumeMeses(){
  $.get( "/ventas/listar_resume").done(function( data ) {
        var sum=0;
        console.log(data);
        $("#areaVentasMeses").empty();
        var colores=["bg-aqua","bg-olive", "bg-orange", "bg-maroon", "bg-purple", "bg-aqua","bg-olive", "bg-orange", "bg-maroon", "bg-purple", "bg-aqua","bg-olive"];
        for ( var i in data){
            var mes_= zeroFill( data[i].mes, 2 );
             $("#areaVentasMeses").append('<div class="progress-group"  onclick=loadTablaVentaFecha("'+data[i].anio+'-'+mes_+'")> '+
                                          '  <span class="progress-text">' +MESES[data[i].mes -1 ]+ '</span>'+
                                          '  <span id="prc-'+i+'"></span>'+
                                          '  <span class="progress-number">'+parseFloat(data[i].valor).toFixed(2)+'</span>'+
                                          '  <div class="progress sm">'+
                                          '    <div id="prgss-'+i+'" class="progress-bar progress-bar-yellow" style="width: 80%"></div>'+
                                          '  </div>'+
                                          '</div>');



             sum=sum+data[i].valor;
             
        }
        console.log(sum);
        //$(".totalCompras").text("$ "+parseFloat(sum).toFixed(2));
        for ( var i in data){
             var porcen= (data[i].valor *100) / sum; 
             $("#prc-"+i).text("  ("+parseFloat(porcen).toFixed(2)+"%)");
             $("#prgss-"+i).css("width",porcen+"%");
        }
        loadChartVentas(data);
        
    }).fail(function(e) {
      try{
            mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}