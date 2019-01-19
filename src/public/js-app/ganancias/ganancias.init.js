
$(function() {  


    
});



function mostrarValorComprasVentasFechaRango(){
  var startOfPeriod = moment(),
  begin = moment(startOfPeriod).isoWeekday(1);
  var fecha_i=begin.startOf('isoWeek').format('YYYY-MM-DD') + " 00:00:00";
  var fecha_f=moment().format('YYYY-MM-DD')+ " 23:59:59";
  $("#tituloReporteSemana").text("Desde "+begin.startOf('isoWeek').format('dddd[/]DD MMM')+ "   Hasta "+moment().format('dddd[/]DD MMM'));
  $.get( "/ganancias/getValorVentasDentroDeRagoFecha/"+fecha_i+"/"+fecha_f).done(function( data ) {
        loadChartVentasRangoFecha(data);
    }).fail(function(e) {
      try{
            mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}