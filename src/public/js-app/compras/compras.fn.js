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


function guardarCompra(callback){
  
  let validar=validarFormProveedor()
  if(!validar.correcto){
    mostrarMensaje(validar.msj, "warning")
    return false;
  }

 

  if($("#fechaCompraPd").val()===""){
    pintarElemento("fechaCompraPd");
    res.correcto=false;
    res.msj=_CONST.VALID_FECHA_COMPRA;
  }

  var dataSend={
    id_proveedor:$("#ProveedorPd").val(),
    nombre_producto:$("#nombrePd").val(),
    detalle_producto:$("#detallePd").val(),
    cantidad:$("#cantidadPd").val(),
    precio_compra:$("#precioConpraPd").val(),
    precio_compra:$("#precioConpraPd").val(),
    precio_compra:$("#precioConpraPd").val(),
    precio_compra:$("#precioConpraPd").val(),
  }

  $.post( "/compra/crear",dataSend).done(function( data ) {
    callback(data);

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
  var res={
    correcto:true,
    msj:""
  };

  if($("#ProveedorPd").val()==="0"){
    pintarElemento("ProveedorPd");
    res.correcto=false;
    res.msj=_CONST.SELECIONE_PROVEEDOR;
  }
  if($("#nombrePd").val()===""){
    pintarElemento("nombrePd");
    res.correcto=false;
    res.msj=_CONST.VALID_NOMBRE_PRODUCTO;
  }
  if($("#cantidadPd").val()===""){
    pintarElemento("cantidadPd");
    res.correcto=false;
    res.msj=_CONST.VALID_CANTIDAD;
  }
  if($("#precioConpraPd").val()===""){
    pintarElemento("precioConpraPd");
    res.correcto=false;
    res.msj=_CONST.VALID_PRECIO_COMPRA;
  }
  if($("#fechaCompraPd").val()===""){
    pintarElemento("fechaCompraPd");
    res.correcto=false;
    res.msj=_CONST.VALID_FECHA_COMPRA;
  }
  console.log(res);
  return res
}