/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../../models/index');


class usuarioService {
    createUsuario(data){
        return models.sequelize.query(
            'insert into usuario(usuario, pass, nombres, email, telefono, eliminado) '+
            'values ("'+data.usuario+'", "'+data.pass+'", "'+data.nombres+'", "'+data.email+'", "'+data.telefono+'", FALSE); ',            
            {type: models.sequelize.QueryTypes.INSERT});  
    }

    getUsuarioByUsername(username) { 
        return models.sequelize.query(
            'SELECT  u.id, u.usuario, u.email, u.pass, u.nombres, u.id_compania, c.nombre  '+
            ' FROM usuario u INNER JOIN  compania c ON u.id_compania=c.id  '+
            ' WHERE u.usuario="'+username+'" AND u.eliminado=FALSE; ',            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getUsuarioByEmail(user_email) { 
        return models.sequelize.query(
            'SELECT  u.id, u.usuario, u.pass, u.nombres, u.id_compania, c.nombre  '+
            ' FROM usuario u INNER JOIN  compania c ON u.id_compania=c.id  '+
            ' WHERE u.email="'+user_email+'" AND u.eliminado=FALSE; ',            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getUsuarioById(id) { 
        return models.sequelize.query(
            "SELECT u.id, u.usuario, u.pass, u.nombres, u.email, u.telefono, u.direccion, u.id_compania, c.nombre as nombre_comp, c. direccion as direccion_comp, c.telefono as telefono_comp, c.representante as representante_comp "+
            "FROM usuario u left join compania c on u.id_compania=c.id "+
            "WHERE  u.id="+id,             
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    updateUsuario(data){
        return models.sequelize.query(
            "update usuario set nombres='"+data.nombres+"', email='"+data.email+"', telefono='"+data.telefono+"', direccion='"+data.direccion+"' "+
            "where id="+data.id,             
            {type: models.sequelize.QueryTypes.UPDATE}); 
    }

    setUrlPass(data){
        return models.sequelize.query(
            "update usuario set urlPass='"+data.urlPass+"'  "+
            "where id="+data.id,             
            {type: models.sequelize.QueryTypes.UPDATE}); 
    }


}
    
export default usuarioService;
