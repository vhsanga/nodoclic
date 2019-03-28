function cargarProveedores(callback ){

	$.get( "/proveedor/list").done(function( data ) {
        console.log(data);   
             
        if(data.length===0){
          mostrarMensaje("Todavia no tiene proveedores, ingrese un proveedor", "warning");
        }else{          
          $("#ProveedorPd").empty();
          $("#ProveedorPd").append('<option value=0> -- Seleccione un proveedor --</option>');
          $("#ProveedorPd").append('<option value=null> Sin Proveedor </option>');
          for (var i in data){
            $("#ProveedorPd").append('<option value='+data[i].id+'> '+data[i].nombre+' </option>');        
          } 
          $("#ProveedorPd").append('<option value=-1 >   ** (Crear Nuevo Proveedor) **</option>');

          $("#ProveedorPd_").empty();
          $("#ProveedorPd_").append('<option value=0> -- Seleccione un proveedor --</option>');
          $("#ProveedorPd_").append('<option value=null> Sin Proveedor </option>');
          for (var i in data){
            $("#ProveedorPd_").append('<option value='+data[i].id+'> '+data[i].nombre+' </option>');        
          } 
          $("#ProveedorPd_").append('<option value=-1 >   ** (Crear Nuevo Proveedor) **</option>');
        
        }
        if(typeof callback === 'function'){
        	callback();
        }

    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+" los proveedores, vuelva a cargar la página", "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}


function guardarProveedor_compra(){
  guardarProveedor(function(dataSend, dataRes){ // esta funcion se encuentra en /proveedor/proeedor.fn.js
    if(dataRes.result){
          mostrarMensaje(_CONST.EXITO_CREAR_PROVEEDOR, "success");
          cargarProveedores(function(){
            $("#ProveedorPd").val(dataRes.idProveedor[0]);
            $("#ProveedorPd_").val(dataRes.idProveedor[0]);
          });
          $('#modalCrearProveedor').modal('hide') ; 
    }
  });
}


function guardarCompraProducto(){
  guardarCompra(function(dataSend,data){ 
    if(data){
      loadTablacompras()      
      $('#modalCrearCompra').modal('hide'); 
      $('#productoCD').text(data.nombre+' - '+data.detalle); 
      $("#divCD").barcode(data.codigo_barra, "codabar"); 
      $('#modalGenerarCodigoBarra').modal({backdrop: 'static', keyboard: false})  
      mostrarMensaje(_CONST.EXITO_CREAR_AJAX,"success");
      mostrarComprasResumeMeses();
    }
  });
}



function guardarCompra(callback){
  let validado=validarFormCompra("")
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposCompra("");
  mostrarMensaje(_CONST.PROCESS,"process");
  $.post( "/compras/crear",dataSend).done(function( dataRes ) {
        callback(dataSend,dataRes);
  }).fail(function(e) {
        try{
             console.log(e);
             mostrarMensaje(e.responseJSON.error.message, "danger");
         }catch(e){ console.log(e); mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
  }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}


function editarCompra(){
  let validado=validarFormCompra("_");
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposCompra("_");
  dataSend["id"]=idCompraSelecionada;
  console.log(dataSend);
  $.post( "/compras/editar",dataSend).done(function( dataRes ) {        
        loadTablacompras()
        document.getElementById("fomEditarCompra").reset();
        mostrarMensaje(_CONST.EXITO_CREAR_AJAX,"success");
        $('#modalEditarCompra').modal('hide');
        mostrarComprasResumeMeses();
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}


function mostrarCompra(id){
  document.getElementById("fomEditarCompra").reset();
  $("#noCodBar_").hide();
  $("#divCD_").hide();
  mostrarMensaje(_CONST.CARGANDO, "process");
  $.get( "/compras/list/"+id).done(function( data ) {
        util_verificarSesionLocal(data);
        console.log(data);
        $("#ProveedorPd_").val(data.id_proveedor);
        if(data.id_proveedor===null){
          $("#ProveedorPd_").val("null");
        }
        $("#idPd_").val(data.id_producto),
        $("#idCp_").val(data.id),
        $("#nombrePd_").val(data.nombre);
        $("#detallePd_").val(data.detalle);
        $("#cantidadPd_").val(data.cantidad);
        $("#precioConpraPd_").val(parseFloat(data.precio).toFixed(2));
        $("#puc_").val(parseFloat(data.precio_compra).toFixed(2));
        $("#pvu_").val(parseFloat(data.precio_venta).toFixed(2));
        $("#porcentajeGanancia_").val(parseFloat(data.procentaje_ganancia).toFixed(2));
        $("#fechaCompraPd_").val(data.fecha_compra);
        $("#referenciaPd_").val(data.referencia);
        if(data.codigo_barra!=null && data.codigo_barra!=="" ){
          $("#divCD_").barcode(data.codigo_barra, "codabar"); 
          $("#noCodBar_").hide();
          $("#divCD_").show();
        }else{
          $("#noCodBar_").show();
        }
        if(data.incluye_iva==1){
          $("#incluyeIvaPd_").attr("checked","");
          $("#incluyeIvaPd_").prop('checked',true)
        }else{
          $("#incluyeIvaPd_").attr("checked","");
          $("#incluyeIvaPd_").prop('checked',false)
        }
        $('#modalEditarCompra').modal({backdrop: 'static', keyboard: false})    
        cerrarMensaje();
    }).fail(function(e) {
      try{
            mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}

function mostrarComprasResumeMeses(){
  $.get( "/compras/getResumeMeses").done(function( data ) {
        var sum=0;
        console.log(data);
        $("#areaVentasMeses").empty();
        var colores=["bg-aqua","bg-olive", "bg-orange", "bg-maroon", "bg-purple", "bg-aqua","bg-olive", "bg-orange", "bg-maroon", "bg-purple", "bg-aqua","bg-olive"];
        for ( var i in data){

             $("#areaVentasMeses").append('<div class="col-md-3 col-sm-6 col-xs-12" onclick="mostrarCompraMes('+data[i].anio+','+data[i].mes+')"> '+
                                          '  <div class="info-box '+colores[data[i].mes]+'"> '+
                                          '     <span class="info-box-icon"><i class="fa fa-bookmark-o"></i></span> '+
                                          '     <div class="info-box-content"> '+
                                          '       <span class="info-box-text">' +MESES[data[i].mes -1 ]+ '</span> '+
                                          '       <span class="info-box-number">'+parseFloat(data[i].precio).toFixed(2)+'</span> '+
                                          '       <div class="progress"> '+
                                          '         <div class="progress-bar"id="prgss-'+i+'" style="width: 70%"></div> '+
                                          '       </div> '+
                                          '       <span class="progress-description">  Representa el  <span id="prc-'+i+'"> 0 </span> %  </span> '+
                                          '       <span class="progress-description">  '+data[i].num_compras+' Compras realizadas  </span> '+
                                          '     </div> '+
                                          '  </div> '+
                                          '</div>');
             sum=sum+data[i].precio;
             
        }
        $(".totalCompras").text("$ "+parseFloat(sum).toFixed(2));
        for ( var i in data){
             var porcen= (data[i].precio *100) / sum; 
             $("#prc-"+i).text(parseFloat(porcen).toFixed(2));
             $("#prgss-"+i).css("width",porcen);
        }
         
        loadChart(data);
    }).fail(function(e) {
      try{
            mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}

function mostrarCompraMes(anio, mes){
   util_verificarSesionServer();
   var f=anio+'-'+zeroFill(mes,2);
   loadTablaComprasMes(f);
   $('#tituloMostrarCompra').text("Compras de "+MESES[mes-1]+" del "+anio); 
   $('#modalMostrarCompra').modal({backdrop: 'static', keyboard: false}) ;

}

function setCodigoBarra(){
  if(compraSelecionada!=null){
    console.log(compraSelecionada.id_producto);
    $.post( "/productos/setCodigoBar/"+compraSelecionada.id_producto).done(function( data ) {
       console.log(data);
       $("#divCD_").hide("slow");
       $("#divCD_").barcode(data, "codabar");
       $("#noCodBar_").hide();
       $("#divCD_").show("slow");
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
  }
}

function obtenerCamposCompra(char){
  var precio_sin_iva=0.00;
  var valor_iva=0.00;
  if(document.getElementById("incluyeIvaPd"+char).checked){
      valor_iva= parseFloat((parseFloat($("#puc"+char).val()) * IVA ) /100).toFixed(2);
      precio_sin_iva=parseFloat( parseFloat($("#pvu"+char).val()) - valor_iva ).toFixed(2);
  }else{
      precio_sin_iva=parseFloat($("#pvu"+char).val());
  }
  return {
    id_proveedor:$("#ProveedorPd"+char).val(),
    id_producto:$("#idPd"+char).val(),
    id_compra:$("#idCp"+char).val(),
    nombre:$("#nombrePd"+char).val(),
    detalle:$("#detallePd"+char).val(),
    stock:$("#cantidadPd"+char).val(),
    precio_compra_total:$("#precioConpraPd"+char).val(),
    precio_compra:$("#puc"+char).val(),
    precio_venta:$("#pvu"+char).val(),
    ganancia:$("#porcentajeGanancia"+char).val(),
    fecha_compra:$("#fechaCompraPd"+char).val(),
    referencia:$("#referenciaPd"+char).val(),
    incluye_iva:document.getElementById("incluyeIvaPd"+char).checked,
    valor_iva:valor_iva,
    precio_sin_iva:precio_sin_iva
  }
}


function calcularPUC(char){
  if ($("#precioConpraPd"+char).val()!=="" && $("#cantidadPd"+char).val()!==""){
    var ptc=parseFloat($("#precioConpraPd"+char).val()).toFixed(2);
    var can=parseFloat($("#cantidadPd"+char).val()).toFixed(2);
    $("#puc"+char).val(parseFloat(ptc/can).toFixed(2));
  }else{
    $("#puc"+char).val("");
  }
  calcularPorcentaje(char);
}


function calcularPTC(char){
  console.log("llamando a PTC");
  if ($("#puc"+char).val()!=="" && $("#cantidadPd"+char).val()!==""){
    var puc=parseFloat($("#puc"+char).val()).toFixed(2);
    var can=parseFloat($("#cantidadPd"+char).val()).toFixed(2);
    $("#precioConpraPd"+char).val(parseFloat(puc*can).toFixed(2));
  }else{
    $("#precioConpraPd"+char).val("");
  }
  calcularPorcentaje(char);
}

function calcularPorcentaje(char){
  if ($("#pvu"+char).val()!=="" && $("#puc"+char).val()!==""){
    var pvu=parseFloat($("#pvu"+char).val()).toFixed(2);
    var puc=parseFloat($("#puc"+char).val()).toFixed(2);
    var differencia=pvu-puc;
    var porcentaje=(differencia*100)/puc;
    console.log(porcentaje);
    $("#porcentajeGanancia"+char).val(parseFloat(porcentaje).toFixed(2));
  }else{
    $("#porcentajeGanancia"+char).val("");
  }
}

function calcularPrecioVentaUnit(char){
  if ($("#porcentajeGanancia"+char).val()!=="" && $("#puc"+char).val()!==""){
    var pganancia=parseFloat($("#porcentajeGanancia"+char).val()).toFixed(2);
    var puc=parseFloat($("#puc"+char).val()).toFixed(2);
    var pvu=parseFloat((pganancia * puc)/100) + parseFloat(puc) ;
    $("#pvu"+char).val(parseFloat(pvu).toFixed(2));
  }else{
    $("#pvu"+char).val("");
  }
}


function imprimirBarCode(char){
    $("#cbarsearea").empty();
    if(document.getElementById("divCD"+char).style.display!="none"){
      $('#cbarsearea').append("<h4>PRODUCTO: "+$("#nombrePd"+char).val()+"</h4>"); 
      for (var i = 0; i < $("#cantidadPd"+char).val(); i++) {
        var div=document.createElement("div");
        div.innerHTML=$("#divCD"+char).html()
        div.id="bar-"+i;
        div.style.width=document.getElementById("divCD"+char).style.width;
        div.style.float="left";
        
        $('#cbarsearea').append( div); 
      }

      var ventana = window.open('', 'PRINT', 'height=600,width=840');
      ventana.document.write($("#cbarsearea")[0].innerHTML);
      ventana.document.close();
      ventana.focus();
      ventana.print();
      ventana.close();
      return true;
    }else{
      mostrarMensaje(_CONST.NO_PUEDE_IMPRIMIR_BAR_CODE,"warning")
    }
}


function validarFormCompra(char){
  console.log(char);
  console.log("#ProveedorPd"+char);
  var elemento="";
  var res=true;
  var msj="";
  
  if($("#fechaCompraPd"+char).val()===""){
    elemento="fechaCompraPd"+char;
    res=false;
    msj=_CONST.VALID_FECHA_COMPRA;
  }
  if($("#porcentajeGanancia"+char).val()===""){
    elemento="porcentajeGanancia"+char;
    res=false;
    msj=_CONST.VALID_GANANCIA_COMPRA;
  }
   if($("#precioConpraPd"+char).val()===""){
    elemento="precioConpraPd"+char;
    res=false;
    msj=_CONST.VALID_PRECIO_COMPRA;
  }
  if($("#cantidadPd"+char).val()===""){
    elemento="cantidadPd"+char;
    res=false;
    msj=_CONST.VALID_CANTIDAD;
  }
  if($("#nombrePd"+char).val()===""){
    elemento="nombrePd"+char;
    res=false;
    msj=_CONST.VALID_NOMBRE_PRODUCTO;
  }

  if($("#ProveedorPd"+char).val()==="0"){
    elemento="ProveedorPd"+char;
    res=false;
    msj=_CONST.SELECIONE_PROVEEDOR;
    console.log($("#ProveedorPd"+char).val());
  }

  if(!res){
    mostrarMensaje(msj, "warning");
    pintarElemento(elemento);
  }
  
  
  console.log(res);
  return res;
}


function mostrarProdcutosXterminar(){
  var compras=dtCompras.rows().data();
  console.log(compras);
  var xTerminar=[];
  var li="";
  $("#ulProductorXterminar").empty();
  for(var i=0; i<compras.length; i++){
    if(compras[i].stock<MINIMO_STOCK){
      li=li+'<li class="list-group-item d-flex justify-content-between align-items-center"> '+ 
                                        compras[i].nombre+". "+compras[i].detalle+
                                      ' <span class="badge badge-primary badge-pill">'+compras[i].stock+'</span> '+
                                      '</li>';
    }
  }
  $("#ulProductorXterminar").html(li);
  $('#modalProductoXterminar').modal({backdrop: 'static', keyboard: false}); 
}

function anadirStock(idProducto){
  var prod={};
  var compras=dtCompras.rows().data();
  for(var i=0; i<compras.length; i++){
    if(compras[i].id_producto===idProducto){
        prod=compras[i];
    }
  }
  idCompraSelecionada=prod.id
  console.log(prod);
  $('#modalAddStocks').modal({backdrop: 'static', keyboard: false})  
  $('#productoAddStocks').text(prod.nombre + ". "+prod.detalle);  
  $('#stockActualAddStocks').text(prod.stock)  
  $('#pvu_a').val(prod.precio_venta)  
  $('#idPd_a').val(prod.id_producto)  
  $('#idCp_a').val(prod.id)  
}


function addStocks(){
  let validado=validarFormCompra("_a");
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposCompra("_a");
  dataSend["id"]=idCompraSelecionada;
  $.post( "/compras/actualizarStock",dataSend).done(function( dataRes ) {
        loadTablacompras()
        document.getElementById("formAddStocks").reset();
        mostrarMensaje(_CONST.EXITO_CREAR_AJAX,"success");
        $('#modalAddStocks').modal('hide');
        mostrarProductosAterminar();
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
  }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}
