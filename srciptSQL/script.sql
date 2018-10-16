ALTER TABLE `nodoclic`.`producto` 
ADD COLUMN `procentaje_ganancia` INT NULL AFTER `codigo_barra`;



CREATE TABLE `nodoclic`.`ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NULL,
  `id_producto` INT NULL,
  `cantidad` INT NULL,
  `valor_venta` FLOAT NULL,
  `fecha` DATE NULL,
  `eliminado` TINYINT NULL DEFAULT 0,
  `id_compania` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_venta_cliente_idx` (`id_cliente` ASC) VISIBLE,
  INDEX `fk_venta_producto_idx` (`id_producto` ASC) VISIBLE,
  INDEX `fk_venta_compania_idx` (`id_compania` ASC) VISIBLE,
  CONSTRAINT `fk_venta_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `nodoclic`.`cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venta_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `nodoclic`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venta_compania`
    FOREIGN KEY (`id_compania`)
    REFERENCES `nodoclic`.`compania` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



ALTER TABLE `nodoclic`.`cliente` 
ADD COLUMN `email` VARCHAR(125) NULL AFTER `telefono`;

---------------- 12 octubre

ALTER TABLE `nodoclic`.`ventas` 
ADD COLUMN `valor_recibido` FLOAT NULL AFTER `valor_venta`,
ADD COLUMN `valor_vuelto` FLOAT NULL AFTER `valor_recibido`;


ALTER TABLE `nodoclic`.`ventas` 
CHANGE COLUMN `fecha` `fecha` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ;


ALTER TABLE `nodoclic`.`ventas` 
DROP FOREIGN KEY `fk_venta_cliente`;
ALTER TABLE `nodoclic`.`ventas` 
DROP COLUMN `fecha`,
DROP COLUMN `valor_vuelto`,
DROP COLUMN `valor_recibido`,
DROP COLUMN `id_cliente`,
DROP INDEX `fk_venta_cliente_idx` ;
;


ALTER TABLE `nodoclic`.`ventas` 
RENAME TO  `nodoclic`.`ventas_detalle` ;


CREATE TABLE `nodoclic`.`ventas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NULL,
  `id_venta_detalle` INT NULL,
  `valor_total` FLOAT NULL DEFAULT 0,
  `valor_recibido` FLOAT NULL DEFAULT 0,
  `valor_vuelto` FLOAT NULL DEFAULT 0,
  `fecha` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_venta_cliente_idx` (`id_cliente` ASC) VISIBLE,
  INDEX `fk_venta_venta_detalle_idx` (`id_venta_detalle` ASC) VISIBLE,
  CONSTRAINT `fk_venta_cliente`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `nodoclic`.`cliente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venta_venta_detalle`
    FOREIGN KEY (`id_venta_detalle`)
    REFERENCES `nodoclic`.`ventas_detalle` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


ALTER TABLE `nodoclic`.`ventas_detalle` 
ADD COLUMN `valor_unitario` FLOAT NULL AFTER `cantidad`,
CHANGE COLUMN `valor_venta` `valor_total` FLOAT NULL DEFAULT NULL ;


ALTER TABLE `nodoclic`.`ventas` 
DROP FOREIGN KEY `fk_venta_venta_detalle`;
ALTER TABLE `nodoclic`.`ventas` 
DROP COLUMN `id_venta_detalle`,
DROP INDEX `fk_venta_venta_detalle_idx` ;
;


ALTER TABLE `nodoclic`.`ventas_detalle` 
ADD COLUMN `id_venta` INT NULL AFTER `id_producto`,
ADD INDEX `fk_venta_detalle_venta_idx` (`id_venta` ASC) VISIBLE;
;
ALTER TABLE `nodoclic`.`ventas_detalle` 
ADD CONSTRAINT `fk_venta_detalle_venta`
  FOREIGN KEY (`id_venta`)
  REFERENCES `nodoclic`.`ventas` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;


CREATE DEFINER = CURRENT_USER TRIGGER `actualizar_stock_producto` 
AFTER INSERT ON `nodoclic`.`ventas_detalle`  FOR EACH ROW
Update `producto` 
set `producto`.`stock` = `producto`.`stock` - NEW.cantidad
where `producto`.`stock` = NEW.id_producto;


ALTER TABLE `nodoclic`.`ventas` 
ADD COLUMN `id_compania` INT NULL AFTER `fecha`,
ADD INDEX `fk_venta_compania_idx` (`id_compania` ASC) VISIBLE;
;
ALTER TABLE `nodoclic`.`ventas` 
ADD CONSTRAINT `fk_venta_compania`
  FOREIGN KEY (`id_compania`)
  REFERENCES `nodoclic`.`compania` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;





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