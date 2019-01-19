$(function(){
	cargarResumeVentas();
	mostrarProductosAterminar();



  $( "#frm-login" ).submit(function( event ) {
    console.log("stop progaa"); 
    mostrarMensaje(_CONST.PROCESS,"process");
    setTimeout(function(){
      loginProvisional();
    },500)      
    return false
  });

  $('#modalLogin').on('hidden.bs.modal', function () {
     util_verificarSesionServer();
  })

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
		    $("#nBtnTerminar").text("("+data.length+")");
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

function loginProvisional(){
  $.post( "/loginProvisional/", $("#frm-login").serialize()).done(function( res ) {
     if(res){
       mostrarMensaje(_CONST.ACCESSO_CORRECTO,"success");
       $('#modalLogin').modal('hide');
     }else{
        mostrarMensaje(_CONST.CREDENCIALES_INCORRECTAS,"danger");
     }
  }).fail(function(e) {
    try{
         mostrarMensaje(e.responseJSON.error.message, "danger");
     }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+", vuelva a cargar la página", "danger"); }
  }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });

}
    
  
function util_verificarSesionLocal(data){ 
    data=JSON.stringify(data)
    console.log(data.toString());
    var n = data.search(_CONST.PATRON_CONTENT_INDEX);
    if(n!=-1){
        mostrarMensaje(_CONST.PROCESS,"process");
        setTimeout(function(){
            $('.modal').modal('hide');
            $('#modalLogin').modal({backdrop: 'static', keyboard: false});
            cerrarMensaje();
        },1000);
         
    }
}


function util_verificarSesionServer(callback){ 
    $.get( "/verificarSesion").done(function( data ) {
        data=JSON.stringify(data)
        console.log(data.toString());
        var n = data.search(_CONST.PATRON_CONTENT_INDEX);
        if(n!=-1){
            mostrarMensaje(_CONST.PROCESS,"process");
            setTimeout(function(){
                //$('.modal').modal('hide');
                $('#modalLogin').modal({backdrop: 'static', keyboard: false});
                cerrarMensaje();
            },1000);             
        }else{
          if(typeof callback === 'function'){
              callback();
            }
        }
    }).fail(function(e) {
      console.log(e);
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });        
}






