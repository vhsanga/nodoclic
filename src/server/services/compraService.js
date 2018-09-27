/**
 * Servicio que ejecuta los sql para consulta, creación, edición y eliminación  de usuario.
 * @class usuarioService
*/
'use strict'

var models = require('../models/index');


class compraService {
 

    getListaCompras() { 
        return models.sequelize.query(
            'SELECT c.id, c.id_producto, pr.id_proveedor, pr.nombre, pr.detalle, c.cantidad, c.precio, c.fecha_compra, c.referencia, pv.nombre as proveedor '+
            ' FROM compras c '+
            ' inner join producto pr  on c.id_producto=pr.id '+
            ' inner join proveedor pv on pr.id_proveedor=pv.id ',            
            {type: models.sequelize.QueryTypes.SELECT});    
    };

   



}
    
export default compraService;
