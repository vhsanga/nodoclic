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
            strValues=strValues+ "("+ventas[x].id_producto+", "+id_venta+", "+ventas[x].cantidad+", "+ventas[x].valor_unitario+", "+ventas[x].valor_venta+", "+data.iva+",  "+data.precio_sin_iva+",   '0', "+id_compania+"),"
        }
        strValues=strValues.slice(0,-1);
        console.log(strValues);
        return models.sequelize.query(
            "INSERT INTO `ventas_detalle` (`id_producto`,  `id_venta`, `cantidad`, `valor_unitario`, `valor_total`, `iva`, `valor_sin_iva`, `eliminado`, `id_compania`) VALUES "+
            strValues,
            {type: models.sequelize.QueryTypes.INSERT});    
    };

    crearVenta(data,  id_compania, id_usuario) {         
        return models.sequelize.query(
            "INSERT INTO `nodoclic`.`ventas` (`id_cliente`, `valor_total`, `valor_recibido`, `valor_vuelto`,  `total_iva`, `total_sin_iva`,`id_compania`,`id_usuario`) "+
            " VALUES ("+data.id_cliente+", "+data.valor_venta+", "+data.valor_recibido+","+data.valor_vuelto+", "+data.iva+",  "+data.precio_sin_iva+", "+id_compania+", "+id_usuario+");",
            {type: models.sequelize.QueryTypes.INSERT});    
    };


    getVentasByFecha(fecha, id_compania) { 
        return models.sequelize.query(
            "SELECT v.id as id_venta, v.id_cliente, CONCAT(c.nombres,' ',c.apellidos) as nombres, c.ci, v.fecha, v.valor_total "+
            " FROM ventas v  "+
            "left join cliente c on v.id_cliente=c.id "+
            "where v.fecha like '%"+fecha+"%' and v.id_compania="+id_compania,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };
    getResumeVentasByFecha(fecha, id_compania) { 
        return models.sequelize.query(
            "SELECT count(id), sum(valor_total) FROM nodoclic.ventas "+
            "where fecha like '%"+fecha+"%' and id_compania=" +id_compania,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

	getResumeTotalVentas(id_compania) { 
        return models.sequelize.query(
            "SELECT YEAR(fecha) as anio, month(fecha) as mes,  count(id) as num_ventas, sum(valor_total) as valor FROM nodoclic.ventas "+
            "where id_compania="+id_compania + 
            " GROUP BY YEAR(fecha),month(fecha)",            
            {type: models.sequelize.QueryTypes.SELECT});    
    };



    getVentaById(id) {  //representa el encabezado de una factura
        return models.sequelize.query(
        "SELECT v.id, v.id_cliente, v.valor_total, v.valor_recibido, v.valor_vuelto, v.total_iva, v.total_sin_iva, v.fecha, "+
        "concat(c.nombres,' ',c.apellidos) as nombre_cliente, c.ci as ci_cliente, c.direccion as direccion_cliente, c.telefono as telefono_cliente, c.email as email_cliente, "+
        "co.nombre as compania, co.direccion as direccion_compania, co.telefono as telefono_compania "+
        "FROM ventas v "+
        "left join cliente c on v.id_cliente=c.id "+
        "inner join compania co on v.id_compania=co.id "+
        "where v.id="+id,            
        {type: models.sequelize.QueryTypes.SELECT});
    };

    getDetalleVentaByIdVenta(idVenta) {  //representa items de una facura        
        return models.sequelize.query(
        "select d.id_producto, concat(p.nombre,' ',p.detalle) as producto, d.cantidad, d.valor_unitario, d.valor_total  "+
        "from ventas_detalle  d "+
        "inner join producto p on d.id_producto=p.id "+
        "where id_venta="+idVenta,            
        {type: models.sequelize.QueryTypes.SELECT});
    };

    getResumeVentasDentroDeRagoFecha(id_compania, fecha_incial, fecha_final) {  //consulta de ventas por dias dentro de un rango de dos fechas       
        return models.sequelize.query(
        "select count(id) as num_ventas, fecha, sum(valor_total) as valor_total from ventas "+
        "where  id_compania="+id_compania+" and  fecha between '"+fecha_incial+"' and '"+fecha_final+"'   "+ 
        "GROUP BY YEAR(fecha),month(fecha),day(fecha)",            
        {type: models.sequelize.QueryTypes.SELECT});
    };
    
    getResumeVentasAcliente(id_cliente, id_compania) {  //resumen de ventas realizadas a un cliente        
        if(id_cliente ==="null" ){
            return models.sequelize.query(
            "select id, valor_total, fecha, valor_recibido, valor_vuelto from ventas "+
            "where id_cliente is null and id_compania="+id_compania,            
            {type: models.sequelize.QueryTypes.SELECT});
        } else{
            return models.sequelize.query(
            "select id, valor_total, fecha, valor_recibido, valor_vuelto from ventas "+
            "where id_cliente="+id_cliente,            
            {type: models.sequelize.QueryTypes.SELECT});
        }        
    };

    getValorVentasDentroDeRagoFecha(id_compania, fecha_incial, fecha_final) {  //consulta de ventas por dias dentro de un rango de dos fechas       
        return models.sequelize.query(
        "select sum(valor_total) valor_venta from ventas where id_compania="+id_compania+" and (fecha between '"+fecha_incial+"' and '"+fecha_final+"') ",            
        {type: models.sequelize.QueryTypes.SELECT});
    };

}
    
export default ventaService;
