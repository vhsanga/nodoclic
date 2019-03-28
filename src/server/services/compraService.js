/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class compraService {
 

    getListaCompras(id_compania) { 
        return models.sequelize.query(
            'SELECT c.id, c.id_producto, pr.id_proveedor, pr.nombre, pr.detalle, pr.codigo_barra, pr.precio_compra, pr.precio_venta, pr.procentaje_ganancia, pr.stock, c.cantidad, c.precio, c.fecha_compra,  pv.nombre as proveedor '+
            ' FROM compras c '+
            ' inner join producto pr  on c.id_producto=pr.id '+
            ' left join proveedor pv on pr.id_proveedor=pv.id '+
            ' WHERE c.eliminado=0 and c.id_compania='+id_compania,                        
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getListaComprasByAnioMes(anio_mes) { 
        return models.sequelize.query(
            'SELECT c.id, c.id_producto, pr.id_proveedor, pr.nombre, pr.detalle, pr.codigo_barra, pr.precio_compra, pr.precio_venta, pr.procentaje_ganancia, c.cantidad, c.precio, c.fecha_compra, pv.nombre as proveedor '+
            ' FROM compras c '+
            ' inner join producto pr  on c.id_producto=pr.id '+
            ' left join proveedor pv on pr.id_proveedor=pv.id '+
            'WHERE c.eliminado=0 and c.id_compania=1 and c.fecha_compra like "%'+anio_mes+'%" ',            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getCompraById(id_compra) { //obtener una compra dado su id
        return models.sequelize.query(
            'SELECT c.id, c.id_producto, pr.id_proveedor, pr.nombre, pr.detalle, pr.codigo_barra, pr.precio_compra, pr.precio_venta, pr.procentaje_ganancia, pr.incluye_iva, c.cantidad, c.precio, c.fecha_compra, pv.nombre as proveedor '+
            ' FROM compras c '+
            ' inner join producto pr  on c.id_producto=pr.id '+
            ' left join proveedor pv on pr.id_proveedor=pv.id '+
            ' WHERE c.id='+id_compra,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getComprasHistoricasBydProveedor(id_proveedor) {  //obtener las compras historicas realizadas a un proveedor
        return models.sequelize.query(
            'select  ch.id, ch.id_producto, pr.id_proveedor, pr.nombre, pr.detalle, pr.codigo_barra, pr.precio_compra, pr.precio_venta, pr.procentaje_ganancia, ch.cantidad, ch.precio, ch.fecha_compra, ch.referencia  '+
            'from compras_historico ch  '+
            'inner join producto pr on ch.id_producto=pr.id  '+
            'left join proveedor pv on pv.id=pr.id_proveedor '+
            'where pv.id='+id_proveedor,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };


    crearCompra(data, id_compania) { 
        var puv_historico=parseFloat( parseFloat(data.precio_compra_total) / parseInt(data.stock) ).toFixed(2);
        return models.sequelize.query(
             "INSERT INTO `nodoclic`.`compras_historico` (`id_producto`, `cantidad`, `precio`, `precio_unitario_compra`, `fecha_compra`, `referencia`, `id_compania`)"+            
             " VALUES ('"+data.id_producto+"', '"+data.stock+"', '"+data.precio_compra_total+"', '"+puv_historico+"', '"+data.fecha_compra+"', '"+data.referencia+"', '"+id_compania+"');",
             {type: models.sequelize.QueryTypes.INSERT}).then(function(row){
                return models.sequelize.query(
                    "INSERT INTO `nodoclic`.`compras` (`id_producto`, `cantidad`, `precio`, `fecha_compra`,  `id_compania`, `eliminado`) "+
                    " VALUES ('"+data.id_producto+"', '"+data.stock+"', '"+data.precio_compra_total+"', '"+data.fecha_compra+"', '"+id_compania+"', '0');",            
                    {type: models.sequelize.QueryTypes.INSERT}); 
            });  
    };

    updateCompra(data,id) {  
        return models.sequelize.query(
            "UPDATE `nodoclic`.`compras` SET `id_producto` = "+data.id_producto+", `cantidad` = "+data.stock+", `precio` = '"+data.precio_compra_total+"', `fecha_compra` = '"+data.fecha_compra+"'  WHERE (`id` = '"+id+"');",            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };

    updateCompraHistorico(data,id,id_compania) {  //actualiza una compra y manda a guardar un historico  (actualizar un stock)
        console.log("updateCompraHistorico * * * * 1 ");
        console.log(data.stock);
        return models.sequelize.query(  
            "UPDATE compras as c, (select cantidad from compras WHERE id="+id+") as c1   set c.cantidad=(c1.cantidad+ "+data.stock+")  , `precio` = '"+data.precio_compra_total+"', `fecha_compra` = '"+data.fecha_compra+"'  "+
            "WHERE (c.id = '"+id+"');",            
            {type: models.sequelize.QueryTypes.UPDATE}).then(function(update){
                console.log("updateCompraHistorico * * * * 2 ");
                var puv_historico=parseFloat( parseFloat(data.precio_compra_total) / parseInt(data.stock) ).toFixed(2);
                return models.sequelize.query(                    
                    "INSERT INTO `nodoclic`.`compras_historico` (`id_producto`, `cantidad`, `precio`, `precio_unitario_compra`, `fecha_compra`, `referencia`, `id_compania`)"+            
                    " VALUES ('"+data.id_producto+"', '"+data.stock+"', '"+data.precio_compra_total+"', '"+puv_historico+"', '"+data.fecha_compra+"', '"+data.referencia+"', '"+id_compania+"');",            
                    {type: models.sequelize.QueryTypes.INSERT}); 
            });    
    };


    getResumeComprasMeses(id_compania) { 
        return models.sequelize.query(
            "SELECT YEAR(fecha_compra) as anio, MONTH(fecha_compra) as mes, count(id) as num_compras, sum(precio) as precio"+
            " FROM nodoclic.compras "+
            " WHERE id_compania="+id_compania+" and eliminado=0 "+
            " GROUP BY YEAR(fecha_compra), MONTH(fecha_compra)"+
            " ORDER BY fecha_compra",            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getValorComprasDentroDeRagoFecha(id_compania, fecha_incial, fecha_final) {  //consulta de ventas por dias dentro de un rango de dos fechas       
        return models.sequelize.query(
        "select sum(precio) valor_compra from  compras_historico where id_compania="+id_compania+" and (fecha_compra between '"+fecha_incial+"' and '"+fecha_final+"') ",            
        {type: models.sequelize.QueryTypes.SELECT});
    };

}
    
export default compraService;
