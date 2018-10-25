function getClienteByCi(ci, callback){
	$.get( "/clientes/listci/"+ci).done(function( data ) {
        util_verificarSesionLocal(data); 
        callback(data);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+" los productos, vuelva a cargar la página", "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}

function guardarCliente(callback){
  mostrarMensaje(_CONST.PROCESS, "process");
  let validado=validarFormCliente("")
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposCliente("");
  $.post( "/clientes/crear/",dataSend).done(function( data ) {
        mostrarMensaje(_CONST.EXITO_CREAR_AJAX, "success");
        document.getElementById("fomrCrearCliente").reset();
        callback(data);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}

function editarCliente(id, callback){
  mostrarMensaje(_CONST.PROCESS, "process");
  let validado=validarFormCliente("_")
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposCliente("_");
  dataSend["id"]=id;
	$.post( "/clientes/actualizar/",dataSend).done(function( data ) {
		    mostrarMensaje(_CONST.EXITO_CREAR_AJAX, "success");        
        callback(dataSend);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}


function editarClienteDesdeVenta(id, callback){
  mostrarMensaje(_CONST.PROCESS, "process");
  let validado=validarFormCliente("__")
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposCliente("__");
  dataSend["id"]=id;
  $.post( "/clientes/actualizar/",dataSend).done(function( data ) {
        mostrarMensaje(_CONST.EXITO_CREAR_AJAX, "success");        
        callback(dataSend);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}


function obtenerCamposCliente(char){
  return {
    nombres:$("#nombreCl"+char).val(),
    apellidos:$("#apellidoCli"+char).val(),
    ci:$("#ciCl"+char).val(),
    direccion:$("#direccionCL"+char).val(),
    telefono:$("#telefonoCl"+char).val(),
    email:$("#emailCl"+char).val()
  }
}


function validarFormCliente(char){
  var elemento="";
  var res=true;
  var msj="";
  
  
  if($("#apellidoCli"+char).val()===""){
    elemento="apellidoCli"+char;
    res=false;
    msj=_CONST.VALID_APELLIDO_CLIENTE;
  }
  if($("#ciCl"+char).val()===""){
    elemento="ciCl"+char;
    res=false;
    msj=_CONST.VALID_CI_CLIENTE;
  }
  if($("#nombreCl"+char).val()===""){
    elemento="nombreCl"+char;
    res=false;
    msj=_CONST.VALID_NOMBRE_CLIENTE;
  }
  if($("#ciCl"+char).val()===""){
    elemento="ciCl"+char;
    res=false;
    msj=_CONST.VALID_APELLIDO_CLIENTE;
  }


  if(!res){
    mostrarMensaje(msj, "warning");
    pintarElemento(elemento);
  }
  
  return res;
}



function mostrarCliente(cliente){
  mostrarMensaje(_CONST.CARGANDO, "process");
  document.getElementById("fomrEditarCliente").reset();
  console.log(cliente);
  $("#ciCl_").val(cliente.ci);
  $("#nombreCl_").val(cliente.nombres);
  $("#apellidoCli_").val(cliente.apellidos);
  $("#direccionCL_").val(cliente.direccion);
  $("#telefonoCl_").val(cliente.telefono);
  $("#emailCl_").val(cliente.email);
  $('#modalEditarCliente').modal({backdrop: 'static', keyboard: false})
  dtClientesVentas=$('#tablaVentasClientes').DataTable( {

    "ajax": {
        url: "/ventas/getResumeVentasAcliente/"+cliente.id,
        dataSrc:''
      } ,
    "columns": [
        { "data": null },
        { "data": "fecha"   , render: function(data, type, row){
                 return  '<span>'+moment(data).format('ll')+'</span> <br /> <span style="font-style: italic;  background: #e2e2e2; border-radius: 9px;">'+moment(data).calendar()+'</span>';
                }
        },
        { "data": "valor_total" , render: function(data, type, row){
                var valor = data==null ? 0: data;
                return  parseFloat(valor).toFixed(2);
                }
        },
        { "data": "valor_recibido" , render: function(data, type, row){
                var valor = data==null ? 0: data;
                return  parseFloat(valor).toFixed(2);
                }
        },
        { "data": "valor_vuelto" , render: function(data, type, row){
                var valor = data==null ? 0: data;
                return  parseFloat(valor).toFixed(2);
                }
        },
      ],
      "language":idiomaEspaniol(),
      destroy:true,
      info: false,
      ordering: false,
      rowId:'id',
      columnDefs: [
        {
            targets: [2,3,4],
            className: 'dt-body-right'
        }
      ],
  });

    dtClientesVentas.on( 'order.dt search.dt', function () {
        dtClientesVentas.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } );
    dtClientesVentas.on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
          if(dtClientesVentas.row( this ).data() != null){
            dtClientesVentas.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');           
            mostrarVenta(dtClientesVentas.row( this ).data().id);
          }
            
        }
    } ); 
  $.get( "/ventas/getResumeVentasAcliente/"+cliente.id).done(function( data ) {
        console.log(data);
        cerrarMensaje();
    }).fail(function(e) {
      try{
            mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)  });
}