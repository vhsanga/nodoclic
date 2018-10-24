var dtClientes=null;
$(function() {  
  loadTablaClientes();
  initElements();
    
});

function initElements(){
  $("#openModalCliente").click(function(){
    $('#modalCrearCliente').modal({backdrop: 'static', keyboard: false}); 
  })
  $("#btnGuardarCliente").click(function(){
		guardarCliente(function(cliente){
       console.log(cliente);
       agregarFilaATabla(cliente, dtClientes);
       $('#modalCrearCliente').modal('hide'); 
    });
	})

  
}

function loadTablaClientes(){
  dtClientes=$('#tablaClientes').DataTable( {

    "ajax": {
        url: "/clientes/listResumeVentas",
        dataSrc:''
      } ,
    "columns": [
        { "data": null },
        { "data": "nombres" , render: function(data, type, row){

                var nombres = row.nombres == null ? '<span style="font-style: italic; background: #ececec; font-weight: bold;">'+_CONST.CLIENTE_DEFAULT+'</span>' :  row.apellidos +" "+row.nombres;
                return nombres;
              }
        },
        { "data": "ci" },
        { "data": "direccion" },
        { "data": "telefono"  },
        { "data": "valor_total" , render: function(data, type, row){
        				var valor = data==null ? 0: data;
                        return  parseFloat(valor).toFixed(2);
                    }
        }
      ],
      "language":idiomaEspaniol(),
      destroy:true,
      rowId:'id_cliente',
      columnDefs: [
        {
            targets: 5,
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
            mostrarCliente(dtClientes.row( this ).data());
          }
            
        }
    } );
           
}