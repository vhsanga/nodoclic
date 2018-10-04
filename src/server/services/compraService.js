/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class compraService {
 

    getListaCompras() { 
        return models.sequelize.query(
            'SELECT c.id, c.id_producto, pr.id_proveedor, pr.nombre, pr.detalle, pr.codigo_barra, pr.precio_compra, pr.precio_venta, pr.procentaje_ganancia, c.cantidad, c.precio, c.fecha_compra, c.referencia, pv.nombre as proveedor '+
            ' FROM compras c '+
            ' inner join producto pr  on c.id_producto=pr.id '+
            ' left join proveedor pv on pr.id_proveedor=pv.id ',            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getCompraById(id_compra) { 
        return models.sequelize.query(
            'SELECT c.id, c.id_producto, pr.id_proveedor, pr.nombre, pr.detalle, pr.codigo_barra, pr.precio_compra, pr.precio_venta, pr.procentaje_ganancia, c.cantidad, c.precio, c.fecha_compra, c.referencia, pv.nombre as proveedor '+
            ' FROM compras c '+
            ' inner join producto pr  on c.id_producto=pr.id '+
            ' left join proveedor pv on pr.id_proveedor=pv.id '+
            ' WHERE c.id='+id_compra,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    crearCompra(data, id_compania) { 
        return models.sequelize.query(
            "INSERT INTO `nodoclic`.`compras` (`id_producto`, `cantidad`, `precio`, `fecha_compra`, `referencia`, `id_compania`, `eliminado`) "+
            " VALUES ('"+data.id_producto+"', '"+data.stock+"', '"+data.precio_compra_total+"', '"+data.fecha_compra+"', '"+data.referencia+"', '"+id_compania+"', '0');",            
            {type: models.sequelize.QueryTypes.INSERT});    
    };

    updateCompra(data,id) { 
        return models.sequelize.query(
            "UPDATE `nodoclic`.`compras` SET `id_producto` = "+data.id_producto+", `cantidad` = "+data.stock+", `precio` = '"+data.precio_compra_total+"', `fecha_compra` = '"+data.fecha_compra+"', `referencia` = '"+data.referencia+"' WHERE (`id` = '"+id+"');",            
            {type: models.sequelize.QueryTypes.INSERT});    
    };

   



}
    
export default compraService;
