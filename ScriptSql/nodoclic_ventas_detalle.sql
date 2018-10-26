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
  `iva` float DEFAULT NULL,
  `valor_sin_iva` float DEFAULT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  `id_compania` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_venta_producto_idx` (`id_producto`),
  KEY `fk_venta_compania_idx` (`id_compania`),
  KEY `fk_venta_detalle_venta_idx` (`id_venta`),
  CONSTRAINT `fk_venta_compania` FOREIGN KEY (`id_compania`) REFERENCES `compania` (`id`),
  CONSTRAINT `fk_venta_detalle_venta` FOREIGN KEY (`id_venta`) REFERENCES `ventas` (`id`),
  CONSTRAINT `fk_venta_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas_detalle`
--

LOCK TABLES `ventas_detalle` WRITE;
/*!40000 ALTER TABLE `ventas_detalle` DISABLE KEYS */;
INSERT INTO `ventas_detalle` VALUES (3,56,52,1,3.1,3.1,0.16,5.44,0,1),(4,55,52,1,2.5,2.5,0.16,5.44,0,1),(5,60,53,1,1.25,1.25,0.06,1.19,0,1),(6,57,54,3,2,6,1.35,16.65,0,1),(7,58,55,1,1.25,1.25,0.09,4.26,0,1),(8,56,55,1,3.1,3.1,0.09,4.26,0,1),(9,58,56,1,1.25,1.25,1.99,27.36,0,1),(10,57,56,1,2,2,1.99,27.36,0,1),(11,56,56,1,3.1,3.1,1.99,27.36,0,1),(12,61,56,1,3,3,1.99,27.36,0,1),(13,62,56,2,5,10,1.99,27.36,0,1),(14,55,57,1,2.5,2.5,0.66,8.34,0,1),(15,59,57,1,6.5,6.5,0.66,8.34,0,1),(16,56,58,1,3.1,3.1,0,3.1,0,1),(17,60,59,1,1.25,1.25,0.06,1.19,0,1),(18,58,60,1,1.25,1.25,0.09,1.16,0,1),(19,56,61,1,3.1,3.1,0,3.1,0,1),(20,57,62,1,2,2,0.15,1.85,0,1),(21,58,63,1,1.25,1.25,0.09,1.16,0,1),(22,57,64,1,2,2,0.61,7.64,0,1),(23,58,64,1,1.25,1.25,0.61,7.64,0,1),(24,62,64,1,5,5,0.61,7.64,0,1),(25,57,65,1,2,2,0.15,1.85,0,1),(26,55,66,2,2.5,5,0.64,9.36,0,1),(27,62,67,1,5,5,0.37,4.63,0,1),(28,58,68,2,1.25,2.5,0.36,4.64,0,1),(29,58,69,1,1.25,1.25,0.42,5.08,0,1),(30,60,69,1,1.25,1.25,0.42,5.08,0,1),(31,61,69,1,3,3,0.42,5.08,0,1),(32,61,70,1,3,3,0.27,2.73,0,1),(33,56,71,1,3.1,3.1,1.02,15.58,0,1),(34,58,71,1,1.25,1.25,1.02,15.58,0,1),(35,60,71,1,1.25,1.25,1.02,15.58,0,1),(36,61,71,1,3,3,1.02,15.58,0,1),(37,57,71,2,2,4,1.02,15.58,0,1),(38,57,72,1,2,2,0.15,1.85,0,1),(39,57,73,2,2,4,0.6,10.5,0,1),(40,56,73,1,3.1,3.1,0.6,10.5,0,1);
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

-- Dump completed on 2018-10-26 18:55:34
