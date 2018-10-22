
$(function() {  
  loadTablaClientes();
  initElements();
    
});

function initElements(){
	$("#openModalCliente").click(function(){
		$('#modalCrearCliente').modal({backdrop: 'static', keyboard: false}); 
	})
}

function loadTablaClientes(){
var dtClientes=$('#tablaClientes').DataTable( {

    "ajax": {
        url: "/clientes/listResumeVentas",
        dataSrc:''
      } ,
    "columns": [
        { "data": null },
        { "data": "nombres" },
        { "data": "apellidos" },
        { "data": "ci" },
        { "data": "direccion" },
        { "data": "email" },
        { "data": "telefono"  },
        { "data": "valor_total" , render: function(data, type, row){
        				var valor = data==null ? 0: data;
                        return  parseInt(valor).toFixed(2);
                    }
        }
      ],
      "language":idiomaEspaniol(),
      destroy:true,
      rowId:'id',
      columnDefs: [
        {
            targets: 6,
            className: 'dt-body-right'
        }
      ],
  });

    dtClientes.on( 'order.dt search.dt', function () {
        dtClientes.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
        } );
    } );
    dtClientes.on( 'click', 'tr', function () {
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
          if(dtClientes.row( this ).data() != null){
            dtClientes.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
            console.log(dtClientes.row( this ).data());
            idCompraSelecionada=dtClientes.row( this ).data().id;
            compraSelecionada=dtClientes.row( this ).data();
            mostrarCompra(idCompraSelecionada);
          }
            
        }
    } );
           
}