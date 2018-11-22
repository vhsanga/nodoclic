

$(function() {
	mostrarVentasResumeMeses();
	mostrarVentasResumeEstaSemana();
	initElement();
});

function initElement(){
	$("#btnReimprimir").click(function(){
		imprimirDiv("cuerpoFactura","- Reimpreso");
	});
}