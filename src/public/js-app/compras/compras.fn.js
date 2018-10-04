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
  
  let validado=validarFormCompra()
  if(!validado){    
    return false;
    console.log("retornando con false");
  }

 console.log(".... cont");
  var dataSend={
    id_proveedor:$("#ProveedorPd").val(),
    nombre:$("#nombrePd").val(),
    detalle:$("#detallePd").val(),
    stock:$("#cantidadPd").val(),
    precio_compra_total:$("#precioConpraPd").val(),
    precio_compra:$("#puc").text(),
    precio_venta:$("#pvu").val(),
    ganancia:$("#porcentajeGanancia").val(),
    fecha_compra:$("#fechaCompraPd").val(),
    referencia:$("#referenciaPd").val(),
  }

  $.post( "/compras/crear",dataSend).done(function( dataRes ) {
    callback(dataSend,dataRes);

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
        $("#porcentajeGanancia_").val(data.ganancia);
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




function validarFormCompra(){
  var elemento="";
  var res=true;
  var msj="";
  
  if($("#fechaCompraPd").val()===""){
    elemento="fechaCompraPd";
    res=false;
    msj=_CONST.VALID_FECHA_COMPRA;
  }
   if($("#precioConpraPd").val()===""){
    elemento="precioConpraPd";
    res=false;
    msj=_CONST.VALID_PRECIO_COMPRA;
  }
  if($("#cantidadPd").val()===""){
    elemento="cantidadPd";
    res=false;
    msj=_CONST.VALID_CANTIDAD;
  }
  if($("#nombrePd").val()===""){
    elemento="nombrePd";
    res=false;
    msj=_CONST.VALID_NOMBRE_PRODUCTO;
  }

  if($("#ProveedorPd").val()==="0"){
    elemento="ProveedorPd";
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