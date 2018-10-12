/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class ventaService {
 

    crearVentaDetalle(data, id_venta, id_compania) { 
        var ventas=data.ventas;
        var strValues="";
        console.log(ventas);
        console.log(data);
        for (var x in ventas){
            strValues=strValues+ "("+ventas[x].id_producto+", "+id_venta+", "+ventas[x].cantidad+", "+ventas[x].valor_venta+", "+(ventas[x].valor_venta*ventas[x].cantidad)+", '0', "+id_compania+"),"
        }
        strValues=strValues.slice(0,-1);
        console.log(strValues);
        return models.sequelize.query(
            "INSERT INTO `ventas_detalle` (`id_producto`,  `id_venta`, `cantidad`, `valor_unitario`, `valor_total`, `eliminado`, `id_compania`) VALUES "+
            strValues,
            {type: models.sequelize.QueryTypes.INSERT});    
    };

    crearVenta(data,  id_compania) {         
        return models.sequelize.query(
            "INSERT INTO `nodoclic`.`ventas` (`id_cliente`, `valor_total`, `valor_recibido`, `valor_vuelto`) "+
            " VALUES ("+data.id_cliente+", "+data.valor_venta+", "+data.valor_recibido+","+data.valor_vuelto+" );",
            {type: models.sequelize.QueryTypes.INSERT});    
    };


	getVentas(id_compania) { 
        return models.sequelize.query(
            "SELECT id,nombres,apellidos,ci,direccion, telefono FROM cliente " +
			"WHERE eliminado=false AND id_compania="+id_compania,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };



    getVentaById(id) { 
        return models.sequelize.query(
            "SELECT id,nombres,apellidos,ci,direccion, telefono FROM cliente " +
			"WHERE eliminado=false and ci="+ci,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

   



}
    
export default ventaService;
