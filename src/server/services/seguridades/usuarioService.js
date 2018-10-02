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
    /*getUsuarioById(id_usuario) {
        return models.sequelize.query(
            'SELECT u.id, u.username, u.pass, p.nombres, p.apellidos '+
            'FROM usuarios u INNER JOIN persona p ON p.id=u.persona_id '+
            'WHERE u.id='+id_usuario+' AND u.eliminado=FALSE; ',            
            {type: models.sequelize.QueryTypes.SELECT});    
    };*/

    getUsuarioByUsername(username) { 
        return models.sequelize.query(
            'SELECT  u.id, u.usuario, u.pass, u.nombres, u.id_compania, c.nombre  '+
            ' FROM usuario u INNER JOIN  compania c ON u.id_compania=c.id  '+
            ' WHERE u.usuario="'+username+'" AND u.eliminado=FALSE; ',            
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
