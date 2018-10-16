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
-- Table structure for table `ventas_detalle`
--

DROP TABLE IF EXISTS `ventas_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ventas_detalle` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) DEFAULT NULL,
  `id_venta` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `valor_unitario` float DEFAULT NULL,
  `valor_total` float DEFAULT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  `id_compania` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_venta_producto_idx` (`id_producto`),
  KEY `fk_venta_compania_idx` (`id_compania`),
  KEY `fk_venta_detalle_venta_idx` (`id_venta`),
  CONSTRAINT `fk_venta_compania` FOREIGN KEY (`id_compania`) REFERENCES `compania` (`id`),
  CONSTRAINT `fk_venta_detalle_venta` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id`),
  CONSTRAINT `fk_venta_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_detalle`
--

LOCK TABLES `ventas_detalle` WRITE;
/*!40000 ALTER TABLE `ventas_detalle` DISABLE KEYS */;
INSERT INTO `ventas_detalle` VALUES (16,16,15,2,3.1,6.2,0,1),(17,16,16,3,4.65,13.95,0,1),(18,41,17,1,3,3,0,1),(19,16,18,3,4.65,13.95,0,1),(20,19,19,1,1.95,1.95,0,1),(21,42,20,1,2.5,2.5,0,1),(22,44,21,1,8,8,0,1),(23,46,21,1,16,16,0,1),(24,40,21,2,6,12,0,1),(25,19,22,1,1.95,1.95,0,1),(26,41,22,1,3,3,0,1),(27,35,22,2,1,2,0,1),(28,39,23,1,4.3,4.3,0,1),(29,41,23,1,3,3,0,1),(30,41,24,1,3,3,0,1),(31,18,24,2,4.2,8.4,0,1),(32,29,25,1,1.5,1.5,0,1),(33,32,25,1,1.5,1.5,0,1),(34,40,26,1,3,3,0,1),(35,19,27,10,19.5,195,0,1),(36,39,28,1,4.3,4.3,0,1),(37,19,29,1,1.95,1.95,0,1),(38,20,30,3,6,18,0,1),(39,35,31,1,0.5,0.5,0,1),(40,36,32,3,4.08,12.24,0,1),(41,37,33,2,2,4,0,1),(42,22,34,2,9,18,0,1),(43,19,35,1,1.95,1.95,0,1),(44,28,36,2,3,6,0,1),(45,33,37,7,10.5,73.5,0,1),(46,29,38,9,13.5,121.5,0,1),(47,39,39,1,4.3,4.3,0,1),(48,19,40,1,1.95,1.95,0,1),(49,39,40,1,4.3,4.3,0,1),(50,20,40,1,2,2,0,1),(51,33,40,1,1.5,1.5,0,1),(52,28,41,1,1.5,1.5,0,1),(53,29,41,1,1.5,1.5,0,1),(54,16,42,2,3.1,6.2,0,1),(55,29,42,2,3,6,0,1),(56,41,42,1,3,3,0,1),(57,16,43,2,3.1,6.2,0,1),(58,28,43,2,3,6,0,1),(59,41,43,1,3,3,0,1),(60,16,44,2,1.55,3.1,0,1),(61,28,44,2,1.5,3,0,1),(62,41,44,1,3,3,0,1),(63,31,45,1,1.5,1.5,0,1),(64,20,45,1,2,2,0,1),(65,36,45,1,1.36,1.36,0,1),(66,46,45,1,16,16,0,1);
/*!40000 ALTER TABLE `ventas_detalle` ENABLE KEYS */;
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
