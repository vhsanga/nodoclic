-- MySQL dump 10.13  Distrib 8.0.12, for Win64 (x86_64)
--
-- Host: localhost    Database: nodoclic
-- ------------------------------------------------------
-- Server version	8.0.12

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `producto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(90) DEFAULT NULL,
  `detalle` varchar(125) DEFAULT NULL,
  `precio_compra` float DEFAULT NULL,
  `precio_venta` float DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `codigo_barra` varchar(45) DEFAULT NULL,
  `procentaje_ganancia` int(11) DEFAULT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  `id_proveedor` int(11) DEFAULT NULL,
  `id_compania` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_prod_provee_idx` (`id_proveedor`),
  KEY `fk_prod_compania_idx` (`id_compania`),
  CONSTRAINT `fk_prod_compania` FOREIGN KEY (`id_compania`) REFERENCES `compania` (`id`),
  CONSTRAINT `fk_prod_provee` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8 COMMENT='						';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Console dsiplia','Color verder marca rolandf',1.04,2,12,'001',92,0,1,NULL),(14,'Pelotas BCK','Micasa, color verde',0.84,1.5,12,'0014',79,0,2,NULL),(15,'Limpia Vidrio olimpia','Mora Azul',0.53,1.25,12,'0015',136,0,2,NULL),(16,'Palo de Selfie','SSNN',1,1.55,-3,'0016',55,0,11,1),(17,'Tina de Baño','color celesta marca bebe sw',1,1,12,NULL,NULL,0,1,1),(18,'Canasta de ropa','Pika',1.25,2.1,2,NULL,NULL,0,11,1),(19,'Silla de plastico niño','Pika rojo',1.25,1.95,0,NULL,NULL,0,5,1),(20,'Florero FL','Marca FK color tierra',1.5,2,-2,NULL,NULL,0,11,1),(21,'Carro Control Remoto','Race grande color rojo',3.46,4.5,12,'0021',30,0,13,1),(22,'Carro Control Remoto','Race Mediano color verde',3,4.5,10,NULL,NULL,0,5,1),(23,'Carro control Remoto','Raace Mediano color Plata',2,3.25,12,'23',NULL,0,6,1),(24,'Carro control Remoto','Race  Pequeño color Rojo',1,1.5,12,'24',NULL,0,7,1),(25,'Carro control Remoto','Race Pequeño color verde',1,1.5,12,'25',NULL,0,7,1),(26,'Carro control Remoto','Race pequeño color azul',1,1.5,12,'26',NULL,0,7,1),(27,'Carro control Remoto','Race pequeño spiderman',1,1.5,12,'27',NULL,0,NULL,1),(28,'Muñeca Bary','Toys ',1,1.5,-3,'28',NULL,0,7,1),(29,'Muñeco Spiderman','Toys',1,1.5,-1,'29',NULL,0,7,1),(30,'Muñeco Buzz','Toys',1,1.5,12,'30',NULL,0,7,1),(31,'Muñeco Iron Man','Toys',1,1.5,11,'31',NULL,0,7,1),(32,'Muñeco de Hulk','Toys',1,1.5,11,'32',NULL,0,7,1),(33,'Muñeco Thor','Toys',1,1.5,4,'33',NULL,0,7,1),(34,'Muñeco Avenger','Toys',1,1.5,12,'34',NULL,0,7,1),(35,'Maquillaje Mate','Esika Blanco',0.2,0.5,9,'35',NULL,0,3,1),(36,'MAquillaje Mate','Esika Canela',1.29,1.36,8,'0036',NULL,0,8,1),(37,'LAbial rojo','romelia ',0.44,1,10,'0037',NULL,0,3,1),(38,'Rimel Negro','Esika',0.5,1.5,12,'0038',NULL,0,1,1),(39,'ambiental ','Glade Canela',1.33,4.3,8,'0039',223,0,NULL,1),(40,'Ambiental ','Galde Limon Pequeño',1.17,3,9,'0040',156,0,NULL,1),(41,'Porta Maletas ','Nike Rojo Grande',1.5,3,-1,'0041',100,0,NULL,1),(42,'Juego de armadores','Pikka Plastico Negro',1,2.5,11,'0042',150,0,5,1),(43,'Juego de 6 vinchas','Rosada pika',0.08,0.15,12,'0043',88,0,NULL,1),(44,'Juevo de 6 Vasos','Pika verde',5,8,11,'0044',60,0,NULL,1),(45,'Maleta de viaje','cafe sin marca',11,54,12,NULL,391,0,1,1),(46,'Mochila ','adidas azul grande',8.17,16,10,'0046',96,0,1,1),(47,'Caja de muñecas','Barbie con accesorios',2,4,12,'0047',100,0,1,1),(48,'Pelota anti estres','BBB negra',1,1.03,12,NULL,3,0,6,1),(49,'Linterna Led ','Energy 12 volt',2.33,3.5,12,'0049',50,0,6,1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-16 18:41:23
