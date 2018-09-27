
var tempoAlert;

function mostrarMensaje(texto, tipo,callback=function(){}){ //tipo=  warning,info,success, danger ,process
    console.log("mostrabdo");
    console.log(texto);
    console.log(tipo);
    var volatile=true;
    $("#alertMensaje").hide("500");
    $( "#alertMensaje" ).remove();
    var cat="Error. ";    
    if(tipo==="warning"){        
        cat="Alerta. ";
    }
    if(tipo==="info"){
        cat="Información. ";
    }
    if(tipo==="success"){
        cat="Correcto. ";
    }
    if(tipo==="process"){
        cat='<i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>';       
        tipo="info";
        volatile=false;
    }    
    $( "#areaMensaje" ).after( '<div id="alertMensaje" class="bs-example"  style="display:none; position: fixed; z-index: 1000000; width: 360px; right: 5px; top: 10px;">' +
                        ' <div class="alert alert-'+tipo+' ">'+
                        '   <a href="#" class="close" data-dismiss="alert">&times;</a>'+
                        '   <strong>'+cat+' </strong> <span id=textoMensaje></span>'+
                        '  </div>'+
                        '</div>');        
    $("#alertMensaje").show("500");
    $("#textoMensaje").text(texto);
    if(volatile){
        tempoAlert= setTimeout(function(){
            $("#alertMensaje").hide("500");
            clearTimeout(tempoAlert);
        },12000);
    }
    callback();
    
}

function cerrarMensaje(){
    tempoAlert=setTimeout(function(){
        $("#alertMensaje").hide("slow");
        clearTimeout(tempoAlert);
    },500);  
}

function pintarElemento(elemento){
    $("#"+elemento).css("border", "solid 1px #e62e2e");
    setTimeout(function(){
        $("#"+elemento).css("border", "solid 1px #ccc");
        setTimeout(function(){
            $("#"+elemento).css("border", "solid 1px #e62e2e");
            setTimeout(function(){
                $("#"+elemento).css("border", "solid 1px #ccc");
                setTimeout(function(){
                    $("#"+elemento).css("border", "solid 1px #e62e2e");
                },200);
            },200);
        },300);
    },300);
};



