function getVentasByFecha(fecha, callback){
  util_verificarSesionServer(function(){
    	$.get( "/ventas/listar_resume/"+fecha).done(function( data ) {
           callback(data);
        }).fail(function(e) {
          try{
               mostrarMensaje(e.responseJSON.error.message, "danger");
           }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+", vuelva a cargar la página", "danger"); }
        }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
  });
}



function loadTablaVentaFecha(fecha, formato){  
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
        dtVentasFecha.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } );

   dtVentasFecha.on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
          if(dtVentasFecha.row( this ).data() != null){
            dtVentasFecha.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            idVentaSelecionada=dtVentasFecha.row( this ).data().id_venta;
            
            mostrarVenta(idVentaSelecionada);
          }
            
        }
    } );

   $('#tituloMostrarVentaFecha').text("Ventas de: "+moment(fecha).format(formato)); 
   $('#modalMostrarVentaFecha').modal({backdrop: 'static', keyboard: false}); 
}


function mostrarVentasResumeMeses(){
  util_verificarSesionServer();
  $.get( "/ventas/listar_resume").done(function( data ) {
        var sum=0;
        var formatoFecha="MMMM [del] YYYY"; 
        $("#areaVentasMeses").empty();
        var colores=["bg-aqua","bg-olive", "bg-orange", "bg-maroon", "bg-purple", "bg-aqua","bg-olive", "bg-orange", "bg-maroon", "bg-purple", "bg-aqua","bg-olive"];
        for ( var i in data){
            var mes_= zeroFill( data[i].mes, 2 );
             $("#areaVentasMeses").append('<div class="progress-group"  onclick="loadTablaVentaFecha(\''+data[i].anio+'-'+mes_+'\',\''+formatoFecha+'\')" > '+
                                          '  <span class="progress-text">' +MESES[data[i].mes -1 ]+ '</span>'+
                                          '  <span id="prc-'+i+'"></span>'+
                                          '  <span class="progress-number">'+parseFloat(data[i].valor).toFixed(2)+'</span>'+
                                          '  <div class="progress sm">'+
                                          '    <div id="prgss-'+i+'" class="progress-bar progress-bar-yellow" style="width: 80%"></div>'+
                                          '  </div>'+
                                          '</div>');



             sum=sum+data[i].valor;
             
        }
        
        if(data.length!=0){
          $("#tituloReporteMes").text("Desde "+MESES[data[0].mes -1 ]+"/"+data[i].anio+"   Hasta "+MESES[data[data.length-1].mes -1 ]+"/"+data[data.length-1].anio);        
        }      
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

function mostrarVenta(id){  
  mostrarMensaje("Cargando espere...", "process");
  var dtVentas=$('#tablaVenta').DataTable( {
    "ajax": {
        url: "/ventas/getInfoVentaDetalle/"+id,
        dataSrc:'',
        complete: function() {
                   $('#modalMostrarVenta').modal({backdrop: 'static', keyboard: false});
                   cargarEncabezadoVenta(id);
                 },
        error: function (xhr, error, thrown) {
                  mostrarMensaje("Ha surgido un error al cargar los datos.\n"+thrown,"danger" );
            }
      } ,
    "columns": [
        
        { "data": "producto" },
        { "data": "cantidad"},
        { "data": "valor_unitario" , render: function(data, type, row){
                                return  parseFloat(data).toFixed(2);
                            }
        },
        { "data": "valor_total" , render: function(data, type, row){
                                return  parseFloat(data).toFixed(2);
                            }
        }
      ],
      "language":idiomaEspaniol(),
      "searching": false,
      destroy:true,
      rowId:'id_producto',
      columnDefs: [
        { targets: [2,3],  className: 'dt-body-right' },
      ],
      select: false,
      paging: false,
      info: false,
      ordering: false,
  });   

}

function cargarEncabezadoVenta(id_venta){
  $.get( "/ventas/getInfoVenta/"+id_venta).done(function( data ) {
    console.log(data);
      $("#nombre_comp").text(data.compania);
      $("#direccion_comp").text(data.direccion_compania);
      $("#telefono_comp").text(data.telefono_compania);

      $("#num_venta").text(zeroFill(data.id,4));
      $("#fecha_venta").text(moment(data.fecha).format('ll') ) ;
      $("#nom_cliente_venta").text(data.nombre_cliente==null ? "Consumidor Final": data.nombre_cliente );
      $("#ci_cliente_venta").text(data.ci_cliente);
      $("#dir_cliente_venta").text(data.direccion_cliente);
      $("#telf_cliente_venta").text(data.telefono_cliente);

      $("#sub_total_venta").text( parseFloat(data.total_sin_iva).toFixed(2) );
      $("#iva_venta").text( parseFloat(data.total_iva).toFixed(2)  );
      $("#total_final_venta").text( parseFloat(data.valor_total).toFixed(2)  );

      cerrarMensaje();
    }).fail(function(e) {
      try{
            mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  }); 
}

function mostrarVentasResumeEstaSemana(){
  var startOfPeriod = moment(),
  begin = moment(startOfPeriod).isoWeekday(1);
  var fecha_i=begin.startOf('isoWeek').format('YYYY-MM-DD') + " 00:00:00";
  var fecha_f=moment().format('YYYY-MM-DD')+ " 23:59:59";
  $("#tituloReporteSemana").text("Desde "+begin.startOf('isoWeek').format('dddd[/]DD MMM')+ "   Hasta "+moment().format('dddd[/]DD MMM'));
  $.get( "/ventas/getResumeVentasDentroDeRagoFecha/"+fecha_i+"/"+fecha_f).done(function( data ) {
        loadChartVentasRangoFecha(data);
    }).fail(function(e) {
      try{
            mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}