/*ejecutaros script en este orden: 
1. compania
2. usuario
3. proveedor
4. producto
5. compras
6. compras_historico
7. cliente
8. ventas
9.ventas_detalle
10.  **crear el triger de ventas_detalle


*/



ALTER TABLE compania AUTO_INCREMENT= 1;
ALTER TABLE usuario AUTO_INCREMENT = 1;
ALTER TABLE proveedor AUTO_INCREMENT  = 1;
ALTER TABLE producto AUTO_INCREMENT = 1;
ALTER TABLE compras AUTO_INCREMENT = 1;
ALTER TABLE compras_historico AUTO_INCREMENT = 1;
ALTER TABLE cliente AUTO_INCREMENT = 1;
ALTER TABLE ventas AUTO_INCREMENT = 1;
ALTER TABLE ventas_detalle AUTO_INCREMENT = 1;


SELECT @@GLOBAL.sql_mode;
 //STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION


 SELECT @@SESSION.sql_mode;
 //STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION


SET GLOBAL sql_mode = 'modes';
SET SESSION sql_mode = 'modes';



/* TRIGGERR   CADA VEZ QUE SE  VENDE UN PRODUCTO SE DEBE MENORAR SU STOCK*/    
CREATE DEFINER=`root`@`localhost` TRIGGER `actualizar_stock_producto` AFTER INSERT ON `ventas_detalle` FOR EACH ROW Update `producto` 
set `producto`.`stock` = `producto`.`stock` - NEW.cantidad
where `producto`.`id` = NEW.id_producto

/*Crear de manera provisional una compania */
INSERT INTO `nodoclic`.`compania` (`nombre`, `direccion`, `telefono`, `representante`) VALUES ('My comania', 'chile y  de agosto', '0979966365', 'Luis mancero');


/*crear el usuario administrador de la compania */
INSERT INTO `nodoclic`.`usuario` (`usuario`, `pass`, `nombres`, `email`, `telefono`, `direccion`, `eliminado`, `id_compania`) VALUES ('admin', '$2a$12$YmKDImpJEkkdZwUCqXBw1.tV.8rGFd14HDh.JZRnkpjMOj3EVVhHG', 'jose miraflores', 'admin@gmail.com', '032949654', 'av la prensa', '0', '1');
