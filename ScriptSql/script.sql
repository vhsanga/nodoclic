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



CREATE TABLE `nodoclic`.`rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
COMMENT = 'roles de los usuarios de nodoclic';


CREATE TABLE `nodoclic`.`rol_usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_rol` INT NULL,
  `id_usuario` INT NULL,
  `hora_desde` TIME NULL,
  `hora_hasta` TIME NULL,
  `observacion` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rol_usuario_rol_idx` (`id_rol` ASC),
  INDEX `fk_rolusuario_usuario_idx` (`id_usuario` ASC),
  UNIQUE INDEX `idx_unico_rolusuario` (`id_rol` ASC, `id_usuario` ASC),
  CONSTRAINT `fk_rolusuario_rol`
    FOREIGN KEY (`id_rol`)
    REFERENCES `nodoclic`.`rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_rolusuario_usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `nodoclic`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

