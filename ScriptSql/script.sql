

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