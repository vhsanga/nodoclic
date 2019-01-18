    "use strict";

  // AREA CHART
function loadChartVentas(data){
  $("#revenue-chart").empty();
  var d=[];
  for (var i in data){
    d.push({y: MESES[data[i].mes -1 ] +"/"+data[i].anio, valor: parseFloat(data[i].valor).toFixed(2) });
  }
  var area = new Morris.Area({
    element: 'revenue-chart',
    resize: true,
    data: d,
    xkey: 'y',
    ykeys: ['valor'],
    labels: ['Valor'],
    lineColors: ['#3c8dbc'],
    hideHover: 'auto',
    parseTime: false,

  }).on('click', function(i, row){
          loadTablaVentaFecha(data[i].anio+'-'+zeroFill( data[i].mes, 2 ),'MMMM [del] YYYY');
         // mostrarCompraMes(data[i].anio, data[i].mes);          
    });
}


function loadChartVentasRangoFecha(data){
  $("#revenue-chart-semana").empty();
  var d=[];
  for (var i in data){
    d.push({y: moment(data[i].fecha).format('dddd[/]DD MMM'), valor: parseFloat(data[i].valor_total).toFixed(2) });
  }

  var area = new Morris.Area({
    element: 'revenue-chart-semana',
    resize: true,
    data: d,
    xkey: 'y',
    ykeys: ['valor'],
    labels: ['Valor'],
    lineColors: ['#ecbf38'],
    hideHover: 'auto',
    parseTime: false,

  }).on('click', function(i, row){
        util_verificarSesionServer(function(){
          loadTablaVentaFecha( moment(data[i].fecha).format('YYYY-MM-DD'),'LL');
         // mostrarCompraMes(data[i].anio, data[i].mes);   
        });
                 
    });
}
