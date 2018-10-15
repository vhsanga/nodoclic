$(function(){
	cargarResumeVentas();
	mostrarProductosAterminar();
});


function mostrarProductosAterminar(){
  $.get( "/productos/porTerminar").done(function( data ) {
         for (var i in data){
            $("#prodAterminal").append(
                                 '   <li class="item"> '+
                                 '     <a href="#"> '+
                                 '        <i class="fa fa-angle-right" /> '+
                                 '        <span > '+
                                 '            '+data[i].nombre+' '+ data[i].detalle+
                                 '        </span> '+
                                 '        <span class="label label-warning pull-right">'+data[i].stock+'</span></a> '+
                                 '      </a> '+
                                 '    </li>');

		    }    
		    $("#numProdAterminar").text(data.length);
		    setTimeout(function(){
		      $("#numProdAterminar").css("font-size",14);
		      setTimeout(function(){
		        $("#numProdAterminar").css("font-size",18);
		        setTimeout(function(){
		          $("#numProdAterminar").css("font-size",14);
		          setTimeout(function(){
		            $("#numProdAterminar").css("font-size",18);           
		              setTimeout(function(){
		                $("#numProdAterminar").css("font-size",14);
		              },200);
		          },200);
		        },200);
		      },200);
		    },2000);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+", vuelva a cargar la página", "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
    $("#prodAterminal").empty();    
}



function cargarResumeVentas(){
  $("#resume-hoy").text("Hoy - "+moment().format('ll'));
  $.get( "/ventas/listar_resume/"+moment().format('YYYY-MM-DD')).done(function( ventas ) {
        var sumVentas=0;
	    var i=-1;
	    for(i in ventas){
	      sumVentas=sumVentas+ventas[i].valor_total;
	    }
	     $("#resume-sum-venta").text(parseFloat(sumVentas).toFixed(2));
	     $("#resume-cant-venta").text((parseInt(i)+1)+" ventas realizadas");
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+", vuelva a cargar la página", "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}
    
  





