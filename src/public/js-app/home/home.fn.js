function cargarProductos(){
	$.get( "/productos/listar").done(function( data ) {
    console.log(data);
        PRODUCTOS=data;
        autocomplete(document.getElementById("pro-nombre"), data);
    }).fail(function(e) {
      try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
       }catch(e){  mostrarMensaje(_CONST.ERROR_CARGAR_AJAX+" los productos, vuelva a cargar la página", "danger"); }
    }).always(function() { setTimeout(function(){ cerrarMensaje()},18000)    });
}


function agrearAtabla(p){
  util_verificarSesionServer();

  var pos=buscarEnLista(p.id);
  if(pos===-1){
      items++;
      $('#factura tr:last').after('<tr id="fila-'+p.id+'">'+
        '<td>'+items+'</td> '+
        '<td>'+p.nombre+' - '+p.detalle+'</td> '+
        '<td style="text-align: center;"> <input type="number" value="1" id="cant-'+p.id+'" style=" width: 80px; " /></td>  '+
        '<td style="text-align: right;" id="pvu-'+p.id+'">'+parseFloat(p.precio_venta).toFixed(2)+'</td> '+
        '<td style="text-align: right;" id="pvp-'+p.id+'">'+parseFloat(p.precio_venta).toFixed(2) +'</td> '+
        '<td style="text-align: center; width: 40px;" > <button title="Quitar producto" onclick="quitarProducto('+p.id+')"> <i class="fa fa-close" />  </button></td> '+
      '</tr>');
      
      $("#cant-"+p.id).focus();
      $("#cant-"+p.id).focusout(function(){
        if($("#cant-"+p.id).val()===""){
          $("#cant-"+p.id).val("1");
          $("#pvp-"+p.id).text($("#pvu-"+p.id).text() );
        }
          
      });

      $("#cant-"+p.id).keyup(function(event) {
        if($("#cant-"+p.id).val()!=""){
          if(parseInt($("#cant-"+p.id).val())>0){
            var pvp=parseFloat( parseInt($("#cant-"+p.id).val()) * parseFloat($("#pvu-"+p.id).text() )).toFixed(2) 
            $("#pvp-"+p.id).text(pvp ); 
            modoficarCantidadEnLista( p.id,  parseInt($("#cant-"+p.id).val()), pvp);
          }else{
            $("#cant-"+p.id).val("1");
            $("#pvp-"+p.id).text($("#pvu-"+p.id).text() );
          }
        }
      });

      $("#cant-"+p.id).change(function() {
        if(parseInt($("#cant-"+p.id).val())>0){
          var pvp=parseFloat( parseInt($("#cant-"+p.id).val()) * parseFloat($("#pvu-"+p.id).text() )).toFixed(2) ;
          $("#pvp-"+p.id).text(pvp ); 
          modoficarCantidadEnLista( p.id,  parseInt($("#cant-"+p.id).val()), pvp);
        }else{
          $("#cant-"+p.id).val("1");
          $("#pvp-"+p.id).text($("#pvu-"+p.id).text() );
        }
      });
      productoSelecionados.push({
        id_producto:p.id, nombre:p.nombre,  detalle:p.detalle,  cantidad:1, valor_unitario:parseFloat(p.precio_venta).toFixed(2), valor_venta:parseFloat(p.precio_venta).toFixed(2), iva:parseFloat(p.valor_iva).toFixed(2), precio_sin_iva:parseFloat(p.precio_sin_iva).toFixed(2)
      });
      sumatoriaFactura();
      $("#clienteForm").show();

      $("#cant-"+p.id).keypress(function(event) {
          atajosTeclado(event.keyCode);
      });

  }else{

    $("#cant-"+productoSelecionados[pos].id_producto).val((productoSelecionados[pos].cantidad +1));
    var pvp=parseFloat( (productoSelecionados[pos].cantidad +1 ) * parseFloat($("#pvu-"+productoSelecionados[pos].id_producto).text() )).toFixed(2) ;
    $("#pvp-"+productoSelecionados[pos].id_producto).text(pvp ); 
    modoficarCantidadEnLista( productoSelecionados[pos].id_producto,  parseInt($("#cant-"+productoSelecionados[pos].id_producto).val()), pvp);
  }
      
}
function atajosTeclado(keyCode){
  console.log(keyCode);
  if(keyCode==UTIL_ENTERKEYCODE){
      $("#pro-nombre").focus();
  }if(keyCode==UTIL_CONTROL_ENTER_VENDER){
      pre_guardarVentaConsumidorFinal();
  }
}

function buscarEnLista(id){
  var res=-1;
  for (var i in productoSelecionados){
    if(productoSelecionados[i].id_producto===id){
      res=i;
    }
  }
  return res;
}
function modoficarCantidadEnLista(id, cantidad, valor){
	for (var i in productoSelecionados){
		if(productoSelecionados[i].id_producto===id){
			productoSelecionados[i].cantidad=cantidad;
      productoSelecionados[i].valor_venta=valor;
		}
	}
	sumatoriaFactura();
}

function getProductoByCodigoBarra(codigoBarra){
  if(PRODUCTOS.length!=0){
    var i=0;
    var encontrado=null;
    do{
      console.log(i);
      if(zeroRemove(PRODUCTOS[i].codigo_barra)===zeroRemove(codigoBarra) ){
        encontrado=PRODUCTOS[i];
        $("#pro-codigo-barra").val("");
      }
      i++;
    }while(i<PRODUCTOS.length && encontrado==null);

    if(encontrado!=null){
      agrearAtabla(encontrado);
    }else{
      mostrarMensaje(_CONST.PRODUCTO_NO_ENCONTRADO,"warning");
      //$('#modalCrearCompra').modal({backdrop: 'static', keyboard: false});
    }

  }else{
    mostrarMensaje(_CONST.SIN_PRODUCTOS, "warning");
  }

}


function sumatoriaFactura(){
	var sum=0;
	for (var i in productoSelecionados){
		sum=sum+ parseFloat(productoSelecionados[i].valor_venta);
	}
	$("#sumaTotal").text(parseFloat(sum).toFixed(2));
}


function quitarProducto(id){
	for (var i in productoSelecionados){
		if(productoSelecionados[i].id_producto===id){
			if (i > -1) {
			  productoSelecionados.splice(i, 1);
        items--;
        if(items==0){
          $("#clienteForm").hide();
        }
			}
		}
	}

	$("#fila-"+id).remove();
	sumatoriaFactura();

}


function guardarVenta(){
  let validado=validarFormVenta();
  if(!validado){    
    return false;
  }
  var dataSend=obtenerCamposVentas();
  $.ajax({
      url:"/ventas/crear",
      type:"POST",
      data:JSON.stringify(dataSend),
      contentType:"application/json; charset=utf-8",
      dataType:"json",
      success: function(id_venta){
        mostrarMensaje(_CONST.EXITO_CREAR_AJAX,"success");
        $('#modalPreventa').modal('hide');
        for(var i=0; i<productoSelecionados.length; i++){
          $('#fila-'+productoSelecionados[i].id_producto).remove();
        }
        $("#cli-id").val(0);
        $("#cli-ci").val("");
        $("#conf_valor").text("");
        $("#conf_valor_recibido").val("");
        $("#cnf_vuelto").text("");
        $('#sumaTotal').text("");
        $("#clienteForm").hide();
        items=0;
        productoSelecionados=[];
        cargarResumeVentas();
        mostrarProductosAterminar();
        mostrarVenta(id_venta);
      },
      onerror:function(e){
        try{
           mostrarMensaje(e.responseJSON.error.message, "danger");
          }catch(e){  mostrarMensaje(_CONST.ERROR_CREAR_AJAX, "danger"); }
      }
    })

}


function validarFormVenta(){
  var res=true;
  var msj="";
  
  if(productoSelecionados.length===0){
    res=false;
    msj=_CONST.DEBE_IMPRESAR_PRODUCTO;
  }
  if(parseFloat($("#cnf_vuelto").text())<0){
    res=false;
    msj=_CONST.VALID_VALOR_RECIBIDO;
  }
  if($("#conf_valor_recibido").val()===""){
    res=false;
    msj=_CONST.VALID_VALOR_RECIBIDO;
  }

  if(!res){
    mostrarMensaje(msj, "warning");
    
  }

  return res;
}

function obtenerCamposVentas(){
  var iva=0;
  var precio_sin_iva=0;
  for (var i in productoSelecionados){
      productoSelecionados[i].iva=parseFloat( parseFloat(productoSelecionados[i].iva) * parseFloat(productoSelecionados[i].cantidad) ).toFixed(2);
      productoSelecionados[i].precio_sin_iva=parseFloat( parseFloat(productoSelecionados[i].precio_sin_iva) * parseFloat(productoSelecionados[i].cantidad)).toFixed(2);
      iva=parseFloat(parseFloat(iva)+ parseFloat( parseFloat(productoSelecionados[i].iva) * parseFloat(productoSelecionados[i].cantidad) )  ).toFixed(2);
      precio_sin_iva=parseFloat( parseFloat(precio_sin_iva) + parseFloat( parseFloat(productoSelecionados[i].precio_sin_iva) * parseFloat(productoSelecionados[i].cantidad))   ).toFixed(2);

  }
  return {id_cliente:parseInt($("#cli-id").val()),
          valor_venta:parseFloat($("#conf_valor").text()).toFixed(2),
          valor_recibido:parseFloat($("#conf_valor_recibido").val()).toFixed(2),
          valor_vuelto:parseFloat($("#cnf_vuelto").text()).toFixed(2),
          iva:iva,
          precio_sin_iva:precio_sin_iva,
          ventas: productoSelecionados
         }
}



function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { 
        $("#btn-crear-aux").hide();
        return false; 
      }
      
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      var existe=false;
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        //if (arr[i].nombre.includes(val.length).toUpperCase() === val.toUpperCase()) {
        var linea=arr[i].nombre.toUpperCase()+" ("+arr[i].detalle.toUpperCase()+")";
        var linea_=arr[i].nombre+" ("+arr[i].detalle+")";
         
        if(linea.includes(val.toUpperCase())){
          existe=true;
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML =  linea_.substr(0, linea.indexOf(val.toUpperCase()) );
          b.innerHTML +=   "<strong style='font-style: italic; text-decoration: underline;'>" + linea_.substr(linea.indexOf(val.toUpperCase()), val.length) + "</strong>";
          b.innerHTML += linea_.substr( (linea.indexOf(val.toUpperCase()) + val.length) ) + "<span style='float: right; color: #ffffff; background: #3c8dbc; padding: 2px; border-radius: 10px;     font-size: 12px;'>"+ parseFloat(arr[i].precio_venta).toFixed(2)+"</span>" ;

          //b.innerHTML = "<strong>" + arr[i].nombre.substr(0, val.length) + "</strong>";
          //b.innerHTML += arr[i].nombre.substr(val.length) +" ("+arr[i].detalle+")";
          /*insert a input field that will hold the current array item's value:*/
          b.innerHTML += "<input type='hidden' value='" + arr[i].id + "'>";
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              	var p=selectItemById(arr, parseInt(this.getElementsByTagName("input")[0].value) );
              	agrearAtabla(p);
              /*insert the value for the autocomplete text field:*/
                inp.value = "";
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
      if(existe){
          $("#btn-crear-aux").hide();
      }else{
          $("#btn-crear-aux").show("slow");
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {
        /*If the ENTER key is pressed, prevent the form from being submitted,*/
        e.preventDefault();
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
    inp.value = "";
});
}

function selectItemById(list, id){
	var selected=null;
	for(var i in list){
		if(list[i].id===id){
			selected=list[i];
		}
	}
	return selected;
}

function calcularVuelto(){
  var recibido=  parseFloat($("#conf_valor_recibido").val());
  var valorAcobrar=  parseFloat($("#conf_valor").text());
  $("#cnf_vuelto").text( parseFloat(recibido-valorAcobrar).toFixed(2) )
}