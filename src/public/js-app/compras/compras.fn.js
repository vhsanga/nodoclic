function cargarProveedores(callback ){

	$.get( "/proveedor/list").done(function( data ) {
        console.log(data);   
             
        if(data.length===0){
          mostrarMensaje("Todavia no tiene proveedores, ingrese un proveedor", "warning");
        }else{          
          $("#ProveedorPd").empty();
          $("#ProveedorPd").append('<option value=0> -- Seleccione un proveedor --</option>');
          for (var i in data){
            $("#ProveedorPd").append('<option value='+data[i].id+'> '+data[i].nombre+' </option>');        
          } 
          $("#ProveedorPd").append('<option value=-1 >   ** (Crear Nuevo Proveedor) **</option>');
          $("#ProveedorPd_").empty();
          $("#ProveedorPd_").append('<option value=0> -- Seleccione un proveedor --</option>');
          for (var i in data){
            $("#ProveedorPd_").append('<option value='+data[i].id+'> '+data[i].nombre+' </option>');        
          } 
          $("#ProveedorPd").append('<option value=-1 >   ** (Crear Nuevo Proveedor) **</option>');
        
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
  guardarProveedor(function(data){ // esta funcion se encuentra en /proveedor/proeedor.fn.js
    if(data.result){
          mostrarMensaje(_CONST.EXITO_CREAR_PROVEEDOR, "success");
          cargarProveedores(function(){
            $("#ProveedorPd").val(data.idProveedor[0]);
          });
          $('#modalCrearProveedor').modal('hide') ; 
    }
  });
}


function guardarCompraProducto(){
  console.log("llmando a guardar");
  guardarCompra(function(dataSend,data){ // esta funcion se encuentra en /proveedor/proeedor.fn.js
    console.log(data);
    if(data){
      loadTablacompras()
      document.getElementById("fomrCrearCompra").reset();
      $('#modalCrearCompra').modal('hide'); 
      $('#productoCD').text(data.nombre+' - '+data.detalle); 
       $("#divCD").barcode(data.codigo_barra, "codabar"); 
      $('#modalGenerarCodigoBarra').modal({backdrop: 'static', keyboard: false})  
      
    }
  });
}



function guardarCompra(callback){
  let validado=validarFormCompra("")
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposCompra("");
  $.post( "/compras/crear",dataSend).done(function( dataRes ) {
    callback(dataSend,dataRes);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}


function editarCompra(){
  let validado=validarFormCompra("_");
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposCompra("_");
  dataSend["id"]=idCompraSelecionada;
  $.post( "/compras/editar",dataSend).done(function( dataRes ) {
        loadTablacompras()
        document.getElementById("fomrEditarCompra").reset();
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}


function mostrarCompra(id){
  mostrarMensaje(_CONST.CARGANDO, "process");
  $.get( "/compras/list/"+id).done(function( data ) {
        console.log(data);
        $("#ProveedorPd_").val(data.id_proveedor);
        $("#nombrePd_").val(data.nombre);
        $("#detallePd_").val(data.detalle);
        $("#cantidadPd_").val(data.cantidad);
        $("#precioConpraPd_").val(data.precio);
        $("#puc_").text(data.precio_compra);
        $("#pvu_").val(data.precio_venta);
        $("#porcentajeGanancia_").val(data.procentaje_ganancia);
        $("#fechaCompraPd_").val(data.fecha_compra);
        $("#referenciaPd_").val(data.referencia);
        $('#modalEditarCompra').modal({backdrop: 'static', keyboard: false})    
        cerrarMensaje();
    }).fail(function(e) {
      try{
            mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}


function obtenerCamposCompra(char){
  return {
    id_proveedor:$("#ProveedorPd"+char).val(),
    nombre:$("#nombrePd"+char).val(),
    detalle:$("#detallePd"+char).val(),
    stock:$("#cantidadPd"+char).val(),
    precio_compra_total:$("#precioConpraPd"+char).val(),
    precio_compra:$("#puc"+char).text(),
    precio_venta:$("#pvu"+char).val(),
    ganancia:$("#porcentajeGanancia"+char).val(),
    fecha_compra:$("#fechaCompraPd"+char).val(),
    referencia:$("#referenciaPd"+char).val(),
  }
}


function calcularPUC(){
  if ($("#precioConpraPd").val()!=="" && $("#cantidadPd").val()!==""){
    var ptc=parseFloat($("#precioConpraPd").val()).toFixed(2);
    var can=parseFloat($("#cantidadPd").val()).toFixed(2);
    console.log(ptc/can);
    $("#puc").text(parseFloat(ptc/can).toFixed(2));
  }else{
    $("#puc").text("");
  }
}


function calcularPorcentaje(){
  if ($("#pvu").val()!=="" && $("#puc").text()!==""){
    console.log("calculadp");
    var pvu=parseFloat($("#pvu").val()).toFixed(2);
    var puc=parseFloat($("#puc").text()).toFixed(2);
    var differencia=pvu-puc;
    var porcentaje=(differencia*100)/puc;
    console.log(porcentaje);
    $("#porcentajeGanancia").val(parseFloat(porcentaje).toFixed(2));
  }else{
    $("#porcentajeGanancia").val("");
  }
}

function calcularPrecioVentaUnit(){
  if ($("#porcentajeGanancia").val()!=="" && $("#puc").text()!==""){
    console.log("calculadp");
    var pganancia=parseFloat($("#porcentajeGanancia").val()).toFixed(2);
    var puc=parseFloat($("#puc").text()).toFixed(2);
    var pvu=parseFloat((pganancia * puc)/100) + parseFloat(puc) ;
    $("#pvu").val(parseFloat(pvu).toFixed(2));
  }else{
    $("#pvu").val("");
  }
}




function validarFormCompra(char){
  var elemento="";
  var res=true;
  var msj="";
  
  if($("#fechaCompraPd"+char).val()===""){
    elemento="fechaCompraPd"+char;
    res=false;
    msj=_CONST.VALID_FECHA_COMPRA;
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
  }

  if(!res){
    mostrarMensaje(msj, "warning");
    pintarElemento(elemento);
  }
  
  
  console.log(res);
  return res;
}