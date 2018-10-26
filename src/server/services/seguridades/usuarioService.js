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
            'SELECT  u.id, u.usuario, u.pass, u.nombres, u.id_compania, c.nombre  '+
            ' FROM usuario u INNER JOIN  compania c ON u.id_compania=c.id  '+
            ' WHERE u.usuario="'+username+'" AND u.eliminado=FALSE; ',            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    getUsuarioById(id) { 
        return models.sequelize.query(
            "SELECT u.id, u.usuario, u.pass, u.nombres, u.email, u.telefono, u.direccion, u.id_compania, c.nombre as nombre_comp, c. direccion as direccion_comp, c.telefono as telefono_comp, c.representante as representante_comp "+
            "FROM usuario u left join compania c on u.id_compania=c.id "+
            "WHERE  u.id="+id,             
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    /*getPerfilesUsuarioByIdUsuario(id_usuario) {
        return models.sequelize.query(
            'SELECT  up.id, up.id_perfil, p.nombre_perfil, p.detalle_perfil '+
            'FROM usuario_perfil up  '+
            'INNER JOIN perfiles p ON up.id_perfil=p.id   '+
            'WHERE up.id_usuario='+id_usuario+' AND up.eliminado=FALSE; ',            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

    setPass(pass, username) {
        return models.sequelize.query(
            'UPDATE usuarios SET pass="'+pass+'" WHERE username="'+username+'"',            
            {type: models.sequelize.QueryTypes.UPDATE});    
    };    */



}
    
export default usuarioService;
