
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



function idiomaEspaniol(){
    return {
    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_, de un total de (_TOTAL_) registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
}

}


  $.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '<Ant',
    nextText: 'Sig>',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'yy-mm-dd',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
  };
  $.datepicker.setDefaults($.datepicker.regional['es']);



var _CONST={
    PROCESS:"Espere, Procesando...",
    NO_HAY_PROVEEDORES:"Todavia no tiene proveedores, ingrese un proveedor",
    VALID_NOMBRE_PROVEEDOR:"Ingrese el nombre del proveedor",
    VALID_NOMBRE_PRODUCTO:"Ingrese el nombre del produuto",
    VALID_CANTIDAD:"Ingrese la cantidad comprada",
    VALID_PRECIO_COMPRA:"Ingrese el precio total de compra",
    VALID_FECHA_COMPRA:"Ingrese la fecha de compra",
    VALID_NOMBRE_CLIENTE:"Ingrese el nombre del cliente",
    VALID_APELLIDO_CLIENTE:"Ingrese el apellido del cliente",
    VALID_CI_CLIENTE:"Ingrese cedula del cliente del cliente",
    VALID_GANANCIA_COMPRA:"Ingrese el porcentaje de ganancia",
    SELECIONE_PROVEEDOR:"Selecione el proveedor",
    EXITO_CREAR_PROVEEDOR:"Se ha creado el proveedor",
    EXITO_CREAR_COMPRA:"Se ha creado la compra",
    EXITO_CREAR_CLIENTE:"Se ha creado la compra",
    ERROR_CREAR_AJAX:"Ha surgido un inconveniente, actualize la página e intente de nuevo ",
    EXITO_CREAR_AJAX:"Los datos se han guardado exitosamente ",

    ERROR_CARGAR_AJAX:"Ha surgido un inconveniente al cargar",
    CARGANDO:"Cargando Información",
    NO_PUEDE_IMPRIMIR_BAR_CODE:"No se puede imprimir el código de barra porque todavía no se ha generado",


    NO_EXISTE_CLIENTE:"El cliente con cédula _ci_ no existe, debe ingresar sus datos",
    DEBE_IMPRESAR_PRODUCTO:"Escoja al menos un producto para poder realizar la venta"

}