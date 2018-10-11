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
