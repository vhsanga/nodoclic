ALTER TABLE `nodoclic`.`ventas` 
ADD COLUMN `id_usuario` INT NULL COMMENT 'ID del Usuario que ha realizado la venta' AFTER `id_compania`,
ADD INDEX `fk_venta_usuario_idx` (`id_usuario` ASC) VISIBLE;
;
ALTER TABLE `nodoclic`.`ventas` 
ADD CONSTRAINT `fk_venta_usuario`
  FOREIGN KEY (`id_usuario`)
  REFERENCES `nodoclic`.`usuario` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

----------------------------------------------------------------


ALTER TABLE `nodoclic`.`compras` 
DROP COLUMN `referencia`;

-----------------------------------------------

CREATE TABLE `nodoclic`.`compras_historico` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_producto` INT NULL,
  `cantidad` INT NULL,
  `precio` FLOAT NULL,
  `precio_unitario_compra` FLOAT NULL,
  `fecha_compra` DATE NULL,
  `referencia` VARCHAR(45) NULL,
  `id_compania` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_compras_historico_producto_idx` (`id_producto` ASC) VISIBLE,
  INDEX `fk_compras_historico_producto_idx1` (`id_compania` ASC) VISIBLE,
  CONSTRAINT `fk_compras_historico_producto`
    FOREIGN KEY (`id_producto`)
    REFERENCES `nodoclic`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_compras_historico_compania`
    FOREIGN KEY (`id_compania`)
    REFERENCES `nodoclic`.`compania` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

-----------------------------------------------

SELECT @@GLOBAL.sql_mode;
 //STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION


 SELECT @@SESSION.sql_mode;
 //STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION


SET GLOBAL sql_mode = 'modes';
SET SESSION sql_mode = 'modes';