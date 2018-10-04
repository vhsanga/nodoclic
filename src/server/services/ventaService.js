/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class ventaService {
 

    crearVenta(data, id_compania) { 
        return models.sequelize.query(
            "INSERT INTO `nodoclic`.`ventas` (`id_cliente`, `id_producto`, `cantidad`, `valor_venta`, `fecha`, `id_compania`) "+
            "VALUES ("+data.id_cliente+", "+data.id_producto+", "+data.cantidad+", "+data.valor_venta+"', '"+data.fecha+"', "+data.id_compania+");",            
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
