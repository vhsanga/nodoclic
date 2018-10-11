var dtCompras=null;
var idCompraSelecionada=0;
var compraSelecionada=null;
$(function() {  
  console.log("iniciando");
  loadTablacompras();
  initElementos();
  cargarProveedores();

    
});


function loadTablacompras(){
  var dtCompras=$('#tablaCompras').DataTable( {

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
      "language":idiomaEspaniol(),
      destroy:true,
      rowId:'id',

  });

    dtCompras.on( 'order.dt search.dt', function () {
        dtCompras.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } );
    dtCompras.on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
          if(dtCompras.row( this ).data() != null){
            dtCompras.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            console.log(dtCompras.row( this ).data());
            idCompraSelecionada=dtCompras.row( this ).data().id;
            compraSelecionada=dtCompras.row( this ).data();
            mostrarCompra(idCompraSelecionada);
          }
            
        }
    } );

           
}



function initElementos(){
  var today=moment().format('YYYY-MM-DD');
  $("#openModal").click(function(e){
      document.getElementById("fomrCrearCompra").reset();
      
      $('#modalCrearCompra').modal({backdrop: 'static', keyboard: false});  
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
  $( "#fechaCompraPd" ).val(today);

  $("#btnGuardarCompra").click(function(){

      guardarCompraProducto();
  });
  $("#btnEditarCompra").click(function(){
      editarCompra();
  });
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