$(function() {
  console.log("iniciando");
  loadTablacompras();
  initElementos();
  cargarProveedores();
});


function loadTablacompras(){
  var table=$('#tablaCompras').DataTable( {

    "ajax": {
        url: "/compras/list",
        dataSrc:''
      } ,
    "columns": [
        { "data": null },
        { "data": "nombre" },
        { "data": "detalle" },
        { "data": "cantidad" },
        { "data": "precio" },
        { "data": "fecha_compra" },
        { "data": "referencia" },
        { "data": "proveedor" }
      ],
      "language":idiomaEspaniol()
  });

    table.on( 'order.dt search.dt', function () {
        table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } );

           
}



function initElementos(){
  var today=moment().format('YYYY-MM-DD');
  $("#openModal").click(function(e){
      $('#modalCrearCompra').modal({backdrop: 'static', keyboard: false})  
  })
  $("#open-crear-prov").click(function(e){
    abrirModalCrearProveedor();
  });
  $("#ProveedorPd").change(function(e){
    var prove = $(this).children(":selected").attr("value");
    if(prove==="-1"){
      abrirModalCrearProveedor();
    }
  })
  
  $( "#fechaCompraPd" ).datepicker({
      showButtonPanel: false,
      defaultDate: today
  });
  $( "#fechaCompraPd" ).val("hoy, " +today);

  $("#btnGuardarProveedor").click(function(){
      guardarProveedor_compra();
  });
  


}

function abrirModalCrearProveedor(){
    $('#modalCrearProveedor').modal({backdrop: 'static', keyboard: false}) 
}
function calcularPUC(){
    $('#modalCrearProveedor').modal({backdrop: 'static', keyboard: false}) 
}