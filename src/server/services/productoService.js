/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class productoService {
 

    crearProducto(data, id_compania) { 
        return models.sequelize.query(
            "INSERT INTO `nodoclic`.`producto` (`nombre`, `detalle`, `precio_compra`, `precio_venta`, `stock`, `procentaje_ganancia`, `eliminado`, `id_proveedor`, `id_compania`) "+
            " VALUE ('"+data.nombre+"', '"+data.detalle+"', '"+data.precio_compra+"', '"+data.precio_venta+"', '"+data.stock+"', '"+data.ganancia+"', '0', "+data.id_proveedor+", "+id_compania+");",            
            {type: models.sequelize.QueryTypes.INSERT});    
    };

    setCodigoBarra(codbar,id_producto) { 
        return models.sequelize.query(
            "UPDATE `nodoclic`.`producto` SET `codigo_barra` = '"+codbar+"' WHERE (`id` = "+id_producto+");",            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };
    
    updateProducto(data,id) { 
        return models.sequelize.query(
            "UPDATE `nodoclic`.`producto` SET `nombre` = '"+data.nombre+"', `detalle` = '"+data.detalle+"', `precio_compra` = '"+data.precio_compra+"', `precio_venta` = '"+data.precio_venta+"', `stock` = '"+data.stock+"', `procentaje_ganancia`= '"+data.ganancia+"', `id_proveedor` = "+data.id_proveedor+" "+
            " WHERE (`id` = '"+id+"');",            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };

    deleteProducto(id_producto) { 
        return models.sequelize.query(
            "UPDATE `nodoclic`.`producto` SET   `eliminado` = '1' "+
            " WHERE (`id` = '"+id_producto+"');",            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };
   



}
    
export default productoService;
