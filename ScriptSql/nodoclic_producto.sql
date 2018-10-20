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
  `id_proveedor` int(11) DEFAULT NULL,
  `nombre` varchar(90) DEFAULT NULL,
  `detalle` varchar(125) DEFAULT NULL,
  `precio_compra` float DEFAULT NULL,
  `precio_venta` float DEFAULT NULL,
  `incluye_iva` tinyint(4) DEFAULT '0',
  `precio_sin_iva` float DEFAULT NULL,
  `valor_iva` float DEFAULT NULL,
  `procentaje_ganancia` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `codigo_barra` varchar(45) DEFAULT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  `id_compania` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_prod_provee_idx` (`id_proveedor`),
  KEY `fk_prod_compania_idx` (`id_compania`),
  CONSTRAINT `fk_prod_compania` FOREIGN KEY (`id_compania`) REFERENCES `compania` (`id`),
  CONSTRAINT `fk_prod_provee` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8 COMMENT='						';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (55,3,'Carro a control remoto','marca matell color azul grande',1.35,2.5,1,2.34,0.16,85,7,'0055',0,1),(56,4,'mamadera','babytell color rosada de medio litro',1.57,3.1,0,3.1,0,97,7,'0056',0,1),(57,3,'Pelota de plastico','Grande marca Toy Free',1.25,2,1,1.85,0.15,60,12,'0057',0,1),(58,4,'Anaquel  de juguete','Pika color rosado, niña',0.75,1.25,1,1.16,0.09,67,12,'0058',0,1),(59,12,'Cosmetico Vidalive','color mate,  redondo forma de cartera',4.17,6.5,1,6,0.5,56,6,'0059',0,1),(60,13,'Dado grande ','Blanco marca toy-store',0.5,1.25,1,1.19,0.06,150,11,'0060',0,1),(61,12,'Espada de plastico','marca Zends color blanco grande',2.21,3,1,2.73,0.27,36,6,'0061',0,1),(62,12,'Florero grande','marca homeStar color amarillo',3.1,5,1,4.63,0.37,61,3,'0062',0,1);
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

-- Dump completed on 2018-10-20 13:55:06
