moment.locale('es')  ;
const IVA=12;
const  MINIMO_STOCK=4;
const UTIL_ENTERKEYCODE=13;  //para poner el cursor en el campo de busqueda de producto
const UTIL_CONTROL_ENTER_VENDER=10;   //atajo para realziar venta 
const UTIL_CONTROL_ESPACIO_BUSCAR_CLIENTE=0;  //atajo para busar cliente liego de haber ingresado la cedula
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

function desPintarElemento(elemento){
    $("#"+elemento).css("border", "solid 1px #d2d6de");
    
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


var MESES=["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];


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
    PATRON_CONTENT_INDEX:"<!DOCTYPE html>",
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
    VALID_VALOR_RECIBIDO:"Ingrese el valor recibido correcto",
    SELECIONE_PROVEEDOR:"Selecione el proveedor",
    EXITO_CREAR_PROVEEDOR:"Se ha creado el proveedor",
    EXITO_CREAR_COMPRA:"Se ha creado la compra",
    EXITO_CREAR_CLIENTE:"Se ha creado el cliente",
    ERROR_CREAR_AJAX:"Ha surgido un inconveniente, actualize la página e intente de nuevo ",
    EXITO_CREAR_AJAX:"Los datos se han guardado exitosamente ",

    ERROR_CARGAR_AJAX:"Ha surgido un inconveniente al cargar",
    CARGANDO:"Cargando Información",
    NO_PUEDE_IMPRIMIR_BAR_CODE:"No se puede imprimir el código de barra porque todavía no se ha generado",


    NO_EXISTE_CLIENTE:"El cliente con cédula _ci_ no existe, debe ingresar sus datos",
    DEBE_INGRESAR_PRODUCTO:"Escoja al menos un producto para poder realizar la venta",

    CLIENTE_DEFAULT:"Consumidor Final",
    MSJ_CEDULA_DIGITOS:"La cédula debe tener 10 dígitos",
    NO_CAMBIAR_CLIENTE_DEFAULT:"No se puede cambiar la informacion del Consumidor Final",
    CREDENCIALES_INCORRECTAS:"Sus credenciales son incorrectas ingrese nuevamente",
    ACCESSO_CORRECTO:"Acesso exitoso, continue trabajando.",
    SIN_PRODUCTOS:"No tiene productos en su inventario.",
    PRODUCTO_NO_ENCONTRADO:"No se ha encontrado dicho producto en el inventario",
    DATOS_USUARIO_EDITADOS:"Los datos de usuario se han editado",
    PASS_NUEVA_NO_COINCIDE:"Las contraseñas no son iguales. ",
    PASS_CAMBIADO:"Los datos de Seguridad se han cambiado. ",
    PASS_ANTERIOR_FAIL:"Su contraseña actual es incorrecta. ",
    NO_USER_FOUND:"No se ha encontrado el usuario. ",
    CAMPO_USER_VACIO:"Ingrese el nombre de usuario ",
    CAMPO_USER_CORREO_VACIO:"Ingrese el nombre de usuario  o el correo ",
    CAMPO_PASS_VACIO:"Ingrese la contraseña actual ",
    CAMPO_PASS1_VACIO:"Ingrese la nueva contraseña ",
    CAMPO_PASS2_VACIO:"Repita la contraseña nueva",
    ERROR_CARGAR_VALORES:"No se ha podido cargar los valores",
    ENVIO_PASS_TEMP:"Se ha enviado una contraseña temporal a su correo electrónico. ",

}


function zeroFill( number, width ) //aumentar ceros a la izquierda
{
  width -= number.toString().length;
  if ( width > 0 )
  {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

function zeroRemove( number ) //quitar los ceros a la izquierda
{
  number=number.toString();
  var i=0;
  var tieneCero=true;
  do{
    if(number.charAt(i)!="0"){
        tieneCero=false;
    }else{
       i++; 
    }
    
  }while(i< number.length && tieneCero )
  return number.substr(i);
}


function agregarFilaATabla(data, dtObject ){
    setTimeout(function(){
        try{
            dtObject.row.add(data).node().id=data.id;
            dtObject.draw();
        }catch(e){
            console.log(e);
        }
    },1000);
        
}

function editarFilaEnTabla(data, dtObject ){
    setTimeout(function(){
        try{
            dtObject.row('.selected').data(data);
            dtObject.draw();
        }catch(e){
            console.log(e);
        }
    },1000);       
}

function imprimirDiv(elem, aux){       
    var mywindow = window.open('', 'PRINT', 'height=600,width=840');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body style="font-family: \'Source Sans Pro\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;" >');
    mywindow.document.write('<h2>Comprobante '+aux+'</h2>' );
    mywindow.document.write(document.getElementById(elem).innerHTML);
    
    mywindow.document.write('</body></html>');
    
    mywindow.document.getElementById("tablaVenta").setAttribute("border", "1");
    mywindow.document.getElementById("tablaDatosCli").style.borderCollapse="collapse";
    mywindow.document.getElementById("tablaVenta").style.borderCollapse="collapse";
    

    mywindow.document.getElementById("tablaDatosFact").style.borderCollapse="collapse";
    mywindow.document.getElementById("tablaDatosFact").style.width="46%";
    mywindow.document.getElementById("tablaDatosFact").style.float="right";
    mywindow.document.getElementById("tablaDatosFact").style.marginTop="-75px";

    mywindow.document.getElementById("tablaSumaFact").style.borderCollapse="collapse";
    mywindow.document.getElementById("tablaSumaFact").style.width="35%";
    mywindow.document.getElementById("tablaSumaFact").style.marginRight="30px;";
    mywindow.document.getElementById("tablaSumaFact").style.float="right";


    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();
    console.log(mywindow.document);
    return true;
}

function imprimirProductosXterminar(elem){       
    var mywindow = window.open('', 'PRINT', 'height=600,width=840');
    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body style="font-family: \'Source Sans Pro\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;" >');
    mywindow.document.write('<h3>Productos por Terminar </h3>' );
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');
    spans = mywindow.document.getElementsByTagName("SPAN");
    for( var i =0; i<spans.length; i++){
        spans[i].innerHTML="["+spans[i].innerHTML+"]";
    }
    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/
    mywindow.print();
    mywindow.close();
    return true;
}

