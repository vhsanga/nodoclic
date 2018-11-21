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