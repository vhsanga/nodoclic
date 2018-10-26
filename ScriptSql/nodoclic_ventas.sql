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
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ventas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_cliente` int(11) DEFAULT NULL,
  `valor_total` float DEFAULT '0',
  `valor_recibido` float DEFAULT '0',
  `valor_vuelto` float DEFAULT '0',
  `total_iva` float DEFAULT NULL,
  `total_sin_iva` float DEFAULT NULL,
  `fecha` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `id_compania` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_venta_cliente_idx` (`id_cliente`),
  KEY `fk_venta_compania_idx` (`id_compania`),
  CONSTRAINT `fk_venta_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id`),
  CONSTRAINT `fk_venta_compania_` FOREIGN KEY (`id_compania`) REFERENCES `compania` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (52,1,5.6,10,4.4,0.16,5.44,'2018-10-20 18:13:25',1),(53,1,1.25,20,18.75,0.06,1.19,'2018-10-20 18:44:57',1),(54,NULL,6,6,0,1.35,16.65,'2018-10-22 22:48:17',1),(55,2,4.35,5,0.65,0.09,4.26,'2018-10-22 22:49:04',1),(56,2,19.35,20,0.65,1.99,27.36,'2018-10-24 18:19:08',1),(57,2,9,9,0,0.66,8.34,'2018-10-25 13:28:33',1),(58,NULL,3.1,3.5,0.4,0,3.1,'2018-10-25 13:29:10',1),(59,NULL,1.25,2,0.75,0.06,1.19,'2018-10-25 13:29:46',1),(60,2,1.25,2,0.75,0.09,1.16,'2018-10-25 13:50:41',1),(61,2,3.1,10,6.9,0,3.1,'2018-10-25 13:51:02',1),(62,2,2,2,0,0.15,1.85,'2018-10-25 16:38:37',1),(63,8,1.25,2,0.75,0.09,1.16,'2018-10-25 16:50:37',1),(64,9,8.25,9,0.75,0.61,7.64,'2018-10-25 16:55:00',1),(65,2,2,2,0,0.15,1.85,'2018-10-25 16:56:29',1),(66,2,5,5,0,0.64,9.36,'2018-10-25 16:58:44',1),(67,NULL,5,5,0,0.37,4.63,'2018-10-25 16:59:48',1),(68,2,2.5,3,0.5,0.36,4.64,'2018-10-25 17:22:09',1),(69,2,5.5,6,0.5,0.42,5.08,'2018-10-25 17:22:49',1),(70,2,3,3,0,0.27,2.73,'2018-10-25 17:23:10',1),(71,2,12.6,15,2.4,1.02,15.58,'2018-10-25 17:26:12',1),(72,3,2,2,0,0.15,1.85,'2018-10-25 20:43:49',1),(73,2,7.1,8,0.9,0.6,10.5,'2018-10-25 22:56:29',1);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-26 18:55:35
