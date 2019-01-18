/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class productoService {
 

    getProductos(id_compania) { //obtener todos los productos de una compania/almaceen o negocio
        return models.sequelize.query(
            "SELECT p.id, p.nombre, p.detalle, p.precio_compra, p.precio_venta,  p.incluye_iva, p.precio_sin_iva, p.valor_iva, p.stock, p.codigo_barra "+
            " FROM nodoclic.producto p INNER JOIN compras  c ON p.id=c.id_producto"+
            " WHERE p.eliminado=false AND p.id_compania="+id_compania,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };
    crearProducto(data, id_compania) { 
        return models.sequelize.query(
            "INSERT INTO `nodoclic`.`producto` (`nombre`, `detalle`, `precio_compra`, `precio_venta`, `incluye_iva`, `precio_sin_iva`,  `valor_iva`, `stock`, `procentaje_ganancia`, `eliminado`, `id_proveedor`, `id_compania`) "+
            " VALUE ('"+data.nombre+"', '"+data.detalle+"', '"+data.precio_compra+"', '"+data.precio_venta+"',"+data.incluye_iva+", '"+data.precio_sin_iva+"', '"+data.valor_iva+"',  '"+data.stock+"', '"+data.ganancia+"', '0', "+data.id_proveedor+", "+id_compania+");",            
            {type: models.sequelize.QueryTypes.INSERT});    
    };

    setCodigoBarra(codbar,id_producto) { 
        return models.sequelize.query(
            "UPDATE `nodoclic`.`producto` SET `codigo_barra` = '"+codbar+"' WHERE (`id` = "+id_producto+");",            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };
    
    updateProducto(data,id) { 
        return models.sequelize.query(
            "UPDATE `nodoclic`.`producto` SET `nombre` = '"+data.nombre+"', `detalle` = '"+data.detalle+"', `precio_compra` = '"+data.precio_compra+"', `precio_venta` = '"+data.precio_venta+"', `procentaje_ganancia`= '"+data.ganancia+"', `id_proveedor` = "+data.id_proveedor+",  `precio_sin_iva`= '"+data.precio_sin_iva+"', `valor_iva` = '"+data.valor_iva+"', `incluye_iva`="+data.incluye_iva+"   "+
            " WHERE (`id` = '"+id+"');",            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };

    deleteProducto(id_producto) { 
        return models.sequelize.query(
            "UPDATE `nodoclic`.`producto` SET   `eliminado` = '1' "+
            " WHERE (`id` = '"+id_producto+"');",            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };

    getProductosPorTerminar(id_compania) { 
        return models.sequelize.query(
            "SELECT stock, id, nombre, detalle  " +
            " from producto WHERE id_compania="+id_compania+"  and stock < 4 and eliminado=0 " +
            " order by stock asc ;",            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    aumentarStock(id_producto,data) { //para aumentar el stock tambien se debe atualziar el precio (compra venta) del nuevo stock
        console.log(data);
        return models.sequelize.query(
            "UPDATE producto as p, (select stock from producto WHERE id="+id_producto+") as p1   set p.stock=(p1.stock+ "+data.stock+"), p.precio_compra="+data.precio_compra +", p.precio_venta="+data.precio_venta +", p.procentaje_ganancia= '"+data.ganancia+"', p.precio_sin_iva= '"+data.precio_sin_iva+"', p.valor_iva= '"+data.valor_iva+"'  "+
            " WHERE p.id="+id_producto,            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };
   
   



}
    
export default productoService;
