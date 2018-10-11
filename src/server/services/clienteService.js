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

    updateCliente(data) { 
        return models.sequelize.query(
            "UPDATE cliente SET "+
            " nombres = '"+data.nombres+"', apellidos = '"+data.apellidos+"', ci = '"+data.ci+"', direccion = '"+data.direccion+"', telefono = '"+data.telefono+"'  "+
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
            "SELECT id,nombres,apellidos,ci,direccion, telefono FROM cliente " +
			"WHERE eliminado=false and ci="+ci,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

   



}
    
export default clienteService;
