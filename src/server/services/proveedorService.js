/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class proveedorService {
 

    getListaProveedores() { 
        return models.sequelize.query(
            'SELECT id,nombre, direccion, telefono, representante FROM nodoclic.proveedor where eliminado=FALSE;',            
            {type: models.sequelize.QueryTypes.SELECT});    
    };
    crearProveedor(data, idCompania) { 
        return models.sequelize.query(
            "INSERT INTO proveedor (nombre, direccion, telefono, representante) "+
            "VALUES ('"+data.nombre+"', '"+data.direccion+"', '"+data.telefono+"', '"+data.representante+"');",            
            {type: models.sequelize.QueryTypes.INSERT});    
    };

   



}
    
export default proveedorService;
