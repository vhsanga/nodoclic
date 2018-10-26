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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(125) DEFAULT NULL,
  `apellidos` varchar(125) DEFAULT NULL,
  `ci` varchar(12) DEFAULT NULL,
  `direccion` varchar(125) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(125) DEFAULT NULL,
  `eliminado` tinyint(4) DEFAULT '0',
  `id_compania` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cliente_compania_idx` (`id_compania`),
  CONSTRAINT `fk_cliente_compania` FOREIGN KEY (`id_compania`) REFERENCES `compania` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (1,'ss','sss','sss','ss','ss',NULL,0,1),(2,'Victor','Sanga Caranqui','0603765058','barrio la floresta','0979636583','vic_vcp@gmail.com',0,1),(3,'Marina','Gonzales','0603765051','Av de la prensa y Calicuhima esq.','032965663','amry_122001@gmail.com',0,1),(4,'Kevin ','Mantilla','0603765052','AV 10 de agosto y mijares','0949596569','k@gmail.com',0,1),(5,'Mireya Melissa','Andrade Fernandez','0706325251','Chile y Lavalle','0979636256','msa@gmail.com',0,1),(6,'Carlos Luis','Aucancela Solis','0903695621','Barrio 24 de mayo','097963656','ccll@gmail.com',0,1),(7,'Marcela Lorena','Granizo','0606369658','caliocuchima 20-10 y almagro','097963656','mmarcelagra@gmail.com',0,1),(8,'Bolivar','Granizo valdez','0603765053','chile  2010 y esmeraldas','0979636586','',0,1),(9,'Maritza','Malca','0603765054','calpi','0979636566','',0,1),(10,'angel ','urquizo','0603765057','','','angell@gmail.com',0,1),(11,'nuevo ','nuevovnueco','0603765555','nuevo','064645656','nuevo@gmail.com',0,1);
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
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
