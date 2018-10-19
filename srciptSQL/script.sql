
ALTER TABLE `nodoclic`.`producto` 
ADD COLUMN `precio_sin_iva` FLOAT NULL AFTER `id_compania`,
ADD COLUMN `incluye_iva` TINYINT NULL DEFAULT 0 AFTER `precio_sin_iva`;

ALTER TABLE `nodoclic`.`producto` 
CHANGE COLUMN `id_proveedor` `id_proveedor` INT(11) NULL DEFAULT NULL AFTER `id`,
CHANGE COLUMN `precio_sin_iva` `precio_sin_iva` FLOAT NULL DEFAULT NULL AFTER `precio_venta`,
CHANGE COLUMN `procentaje_ganancia` `procentaje_ganancia` INT(11) NULL DEFAULT NULL AFTER `precio_sin_iva`,
CHANGE COLUMN `incluye_iva` `incluye_iva` TINYINT(4) NULL DEFAULT '0' AFTER `procentaje_ganancia`;

ALTER TABLE `nodoclic`.`producto` 
ADD COLUMN `valor_iva` FLOAT NULL AFTER `precio_sin_iva`,
CHANGE COLUMN `incluye_iva` `incluye_iva` TINYINT(4) NULL DEFAULT '0' AFTER `precio_venta`;


**************************************
SELECT v.id, v.id_cliente, v.valor_total, v.valor_recibido, v.valor_vuelto, v.fecha, 
concat(c.nombres,' ',c.apellidos) as nombre_cliente, c.ci as ci_cliente, c.direccion as direccion_cliente, c.telefono as telefono_cliente, c.email as email_cliente,
co.nombre as compania, co.direccion as direccion_compania, co.teléfono as telefono_compania
FROM ventas v
inner join cliente c on v.id_cliente=c.id
inner join compania co on v.id_compania=co.id
where v.id=22


select d.id_producto, concat(p.nombre,' ',p.detalle) as producto, d.cantidad, d.valor_unitario, d.valor_total 
from ventas_detalle  d
inner join producto p on d.id_producto=p.id
where id_venta=22