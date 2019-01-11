/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class proveedorService {
 
    crearProveedor(data, id_compania) { 
        return models.sequelize.query(
            "INSERT INTO proveedor (nombre, direccion, telefono, representante, id_compania) "+
            "VALUE ('"+data.nombre+"', '"+data.direccion+"', '"+data.telefono+"', '"+data.representante+"', "+id_compania+");",            
            {type: models.sequelize.QueryTypes.INSERT});    
    };

    getListaProveedores(id_compania) { 
        return models.sequelize.query(
            'SELECT id,nombre, direccion, telefono, representante FROM proveedor where eliminado=FALSE AND id_compania='+id_compania,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getListaProveedoresComprasValor(id_compania) { //listar los proveedores y los valores comprados a cada uno 
        return models.sequelize.query(
            'select pv.id, pv.nombre, pv.direccion, pv.telefono, pv.representante, sum(ch.precio) as valor '+
            '   from proveedor as pv   '+
            '   left join producto p on pv.id=p.id_proveedor  '+
            '   left join compras_historico ch on ch.id_producto=p.id  '+
            ' where pv.eliminado=false and pv.id_compania='+id_compania +
            ' group by pv.id  '+
            ' order by sum(ch.precio); ',
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getProveedoresById(idProveedor) { 
        return models.sequelize.query(
            'SELECT id, nombre, direccion, telefono, representante FROM proveedor '+
            'WHERE eliminado=FALSE AND id='+idProveedor,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getUpdateProveedor(proveedor) { 
        return models.sequelize.query(
            "UPDATE proveedor SET  nombre='"+proveedor.nombre+"', direccion='"+proveedor.direccion+"', telefono='"+proveedor.telefono+"', representante='"+proveedor.representante+"'  "+
            "WHERE id="+proveedor.id,            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };
    
    



   



}
    
export default proveedorService;
