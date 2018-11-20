/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class companiaService {
    createUsuario(data){
        return models.sequelize.query(
            'INSERT INTO compania (nombre, direccion, telefono, representante) '+
            'values ("'+data.nombreCompania+'", "'+data.direccionCompania+'", "'+data.telefonoCompania+'", "'+data.representanteCompania+'"); ',            
            {type: models.sequelize.QueryTypes.INSERT});  
    }

    editUsuario(data){
        return models.sequelize.query(
            'UPDATE compania SET  nombre = "'+data.nombreCompania+'", direccion = "'+data.direccionCompania+'", telefono = "'+data.telefonoCompania+'", representante = "'+data.representanteCompania+'" '+
            'WHERE id = '+data.idCompania,            
            {type: models.sequelize.QueryTypes.UPDATE});  
    }

    



}
    
export default companiaService;
