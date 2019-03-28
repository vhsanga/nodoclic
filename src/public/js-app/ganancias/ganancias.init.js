
$(function() {  
  var fecha_i=moment().startOf('month').format('YYYY-MM-DD') + " 00:00:00";
  var fecha_f=moment().format('YYYY-MM-DD')+ " 23:59:59";  
  mostrarValorComprasVentasFechaRango(fecha_i, fecha_f,"");
  initElement();
    
});

function initElement(){
  var today=moment().format('YYYY-MM-DD');
  $("#desdeMesActual").text(" "+moment().startOf('month').format('LLLL'));
  $("#hastaMesActual").text(" Hoy "+moment().format('LLLL'));
  $( "#desdeMesOtro" ).datepicker({
      showButtonPanel: false,
      onSelect: function(dateText) {
        $( "#hastaMesOtro" ).val(today);
      }
  });
  $( "#hastaMesOtro" ).datepicker({
      showButtonPanel: false,
  });
  $( "#btnConsultarMesOtro" ).click(function(){
        var fecha_i=$("#desdeMesOtro").val();
        var fecha_f=$("#hastaMesOtro").val();
        mostrarValorComprasVentasFechaRango(fecha_i, fecha_f,"_");
  });

}

function mostrarValorComprasVentasFechaRango(fecha_i, fecha_f, char){
  $.get( "/ganancias/getValorVentasDentroDeRagoFecha/"+fecha_i+"/"+fecha_f).done(function( data ) {
       
        let v_venta=data.valor_venta==null ? 0.00 : parseFloat(data.valor_venta).toFixed(2);
        let v_compra=data.valor_compra==null ? 0.00 : parseFloat(data.valor_compra).toFixed(2);
        $("#ventasMesActual"+char).text( v_venta);
        $("#comprasMesActual"+char).text(v_compra);
        var gananciaB=v_venta - v_compra;
        $("#gananciabMesActual"+char).text(parseFloat(gananciaB).toFixed(2));        
        graficarGananciasMesActual( v_compra, v_venta, char);
    }).fail(function(e) {
      try{
            mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_VALORES, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
} 