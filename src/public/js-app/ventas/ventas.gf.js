    "use strict";

  // AREA CHART
function loadChartVentas(data){
  $("#revenue-chart").empty();
  var d=[];
  for (var i in data){
    d.push({y: MESES[data[i].mes -1 ] +"/"+data[i].anio, valor: parseFloat(data[i].valor).toFixed(2) });
  }
 console.log(data);

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
          loadTablaVentaFecha(data[i].anio+'-'+zeroFill( data[i].mes, 2 ));
         // mostrarCompraMes(data[i].anio, data[i].mes);          
    });
}
