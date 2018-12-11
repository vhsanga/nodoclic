/**
 * 
 * @class rolService
*/
'use strict'

var models = require('../../models/index');


class rolService {


    getRolesOfUserByUserID(user_id) { 
        return models.sequelize.query(
            'select ru.id_rol, r.nombre, r.descripcion from rol_usuario ru inner join rol r on ru.id_rol=r.id  where ru.id_usuario='+user_id,            
            {type: models.sequelize.QueryTypes.SELECT});    
    };


}
    
export default rolService;
