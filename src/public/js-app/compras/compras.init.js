$(function() {
  console.log("iniciando");
  loadTablacompras();
  initElementos();
});


function loadTablacompras(){
  $('#tablaCompras').dataTable( {

    "ajax": {
        url: "/compras/list",
        dataSrc:''
      } ,
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