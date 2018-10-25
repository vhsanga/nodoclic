/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class clienteService {
 

    crearCliente(data, id_compania) { 
        return models.sequelize.query(
            "INSERT INTO cliente (nombres, apellidos, ci, direccion, telefono, email, eliminado, id_compania) "+
            "VALUES ('"+data.nombres+"', '"+data.apellidos+"', '"+data.ci+"', '"+data.direccion+"', '"+data.telefono+"', '"+data.email+"','0', "+id_compania+");",            
            {type: models.sequelize.QueryTypes.INSERT});    
    };

    getClientes(id_compania) { 
        return models.sequelize.query(
            "SELECT id,nombres,apellidos,ci,direccion, telefono FROM cliente " +
            "WHERE eliminado=false AND id_compania="+id_compania,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getClientesVentasResumen(id_compania) {  //obtiene el listado de clientes con los totales que se les ha vendido 
        return models.sequelize.query( //la consultaestructurada simula ser un outer full join, para traer a todos los cleintes que hayan comprado o no y tambien las compras quo no tengas clientes (null)
            "select id, valor_total, nombres, apellidos, ci, direccion, telefono, email from  "+
            "(SELECT c.id, c.nombres, c.apellidos, c.ci, c.direccion, c.telefono, c.email, v.valor_total,v.id_cliente  "+
            "FROM cliente c  left join (select  id_cliente, sum(valor_total) as valor_total from ventas   "+
            "where id_compania="+id_compania+"   "+
            "group by id_cliente) as v  on v.id_cliente=c.id  "+
            "WHERE c.eliminado=false AND c.id_compania="+id_compania+"   "+
            "union   "+
            "select c.id, c.nombres, c.apellidos, c.ci, c.direccion, c.telefono, c.email, v.valor_total,v.id_cliente   "+
            "from (select  id_cliente, sum(valor_total) as valor_total from ventas   "+
            "where id_compania="+id_compania+"  "+
            "group by id_cliente) as v left join cliente c  on v.id_cliente=c.id) as res  "+
            "order by valor_total desc",            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    updateCliente(data) { 
        return models.sequelize.query(
            "UPDATE cliente SET "+
            " nombres = '"+data.nombres+"', apellidos = '"+data.apellidos+"', ci = '"+data.ci+"', direccion = '"+data.direccion+"', telefono = '"+data.telefono+"', email='"+data.email+"' "+
            "  WHERE (`id` = "+data.id+");",            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };

    deleteCliente(id_cliente) { 
        return models.sequelize.query(
            "UPDATE cliente SET "+
            "  eliminado = 1  "+
            "  WHERE (id = "+id_cliente+");",            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };

    getClienteByCi(ci) { 
        return models.sequelize.query(
            "SELECT id,nombres,apellidos,ci,direccion, email, telefono FROM cliente " +
			"WHERE eliminado=false and ci="+ci,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getClienteById(id) { 
        return models.sequelize.query(
            "SELECT id,nombres,apellidos,ci,direccion, email, telefono FROM cliente " +
            "WHERE eliminado=false and id="+id,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };


   



}
    
export default clienteService;
