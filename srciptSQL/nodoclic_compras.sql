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
-- Table structure for table `compras`
--

DROP TABLE IF EXISTS `compras`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `compras` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `fecha_compra` date DEFAULT NULL,
  `referencia` varchar(45) DEFAULT NULL,
  `id_compania` int(11) DEFAULT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_compras_producto_idx` (`id_producto`),
  KEY `fk_compras_compania_idx` (`id_compania`),
  CONSTRAINT `fk_compras_compania` FOREIGN KEY (`id_compania`) REFERENCES `compania` (`id`),
  CONSTRAINT `fk_compras_producto` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `compras`
--

LOCK TABLES `compras` WRITE;
/*!40000 ALTER TABLE `compras` DISABLE KEYS */;
INSERT INTO `compras` VALUES (1,1,12,12.5,'2018-06-27','Fac0025',NULL,0),(3,14,12,10.05,'2018-06-30','Fccc22',NULL,0),(4,15,12,6.33,'2018-06-30','Fcdcdc4',NULL,0),(5,21,12,41.5,'2018-06-03','fact554',1,0),(23,39,12,16,'2018-06-04','Fac#005',1,0),(24,40,12,14,'2018-06-04','wss',1,0),(25,41,12,18,'2018-06-04','',1,0),(26,42,12,12,'2018-07-04','5.33',1,0),(27,43,12,1,'2018-07-04','',1,0),(28,44,12,60,'2018-07-17','888',1,0),(29,46,12,98,'2018-08-04','',1,0),(30,47,12,24,'2018-08-04','',1,0),(31,49,12,28,'2018-08-11','',1,0),(32,16,12,12,'2018-08-10','',1,0),(33,17,12,12,'2018-08-10',NULL,1,0),(34,18,12,15,'2018-08-10',NULL,1,0),(35,19,12,15,'2018-08-10',NULL,1,0),(36,20,12,18,'2018-08-10',NULL,1,0),(37,22,12,36,'2018-09-11',NULL,1,0),(38,23,12,24,'2018-09-11',NULL,1,0),(39,24,12,12,'2018-09-11',NULL,1,0),(40,25,12,12,'2018-09-11',NULL,1,0),(41,26,12,12,'2018-09-11',NULL,1,0),(42,27,12,12,'2018-09-11',NULL,1,0),(43,28,12,12,'2018-09-11',NULL,1,0),(44,29,12,12,'2018-09-11',NULL,1,0),(45,30,12,12,'2018-09-11',NULL,1,0),(46,31,12,12,'2018-10-11',NULL,1,0),(47,32,12,12,'2018-10-11',NULL,1,0),(48,33,12,12,'2018-10-11',NULL,1,0),(49,34,12,12,'2018-10-11',NULL,1,0),(50,35,12,2.4,'2018-10-11',NULL,1,0),(51,36,12,15.48,'2018-10-11',NULL,1,0),(52,37,12,5.28,'2018-10-11',NULL,1,0),(53,38,12,6,'2018-10-11',NULL,1,0);
/*!40000 ALTER TABLE `compras` ENABLE KEYS */;
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