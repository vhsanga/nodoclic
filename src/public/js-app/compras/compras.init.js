$(function() {
  console.log("iniciando");
  //loadTablacompras();
   $('#tablaCompras').DataTable()
  initElementos();
});


function loadTablacompras(){
  $('#tablaCompras').dataTable( {
    "ajax": "/compras/list",
    "columns": [
        { "data": "nombre" },
        { "data": "detalle" },
        { "data": "cantidad" },
        { "data": "precio" },
        { "data": "fecha_compra" },
        { "data": "referencia" },
        { "data": "proveedor" }
      ]
  } );
           
}



function initElementos(){
  
}