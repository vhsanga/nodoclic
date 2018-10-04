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
  `eliminado` tinyint(4) DEFAULT '0',
  `id_proveedor` int(11) DEFAULT NULL,
  `id_compania` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_prod_provee_idx` (`id_proveedor`),
  KEY `fk_prod_compania_idx` (`id_compania`),
  CONSTRAINT `fk_prod_compania` FOREIGN KEY (`id_compania`) REFERENCES `compania` (`id`),
  CONSTRAINT `fk_prod_provee` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COMMENT='						';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Console dsiplia','Color verder marca rolandf',1.25,2.5,12,NULL,0,1,NULL),(14,'xdscs','scscs',1,1,1,NULL,0,2,NULL),(15,'limpiafksdk','Mara verde',6.33,1.25,10,NULL,0,2,NULL),(16,'primeroooo','marca, color',1,1.55,12,NULL,0,11,1),(17,'222','22',1,1,1,NULL,0,1,1),(18,'cuarto pricuto de comrpa','maksmksmfkmskmfks mksfs ',1.25,2.1,12,NULL,0,11,1),(19,'fdfdfdfd cuarto','marcadf',1.25,1.95,12,NULL,0,5,1),(20,'sssss 44444','sssss',1.5,2,10,NULL,0,11,1),(21,'scuarto finallismio','mnarca',3.46,5.2,12,NULL,0,6,1),(22,'cuarrtooo  414','maraca',3,4.5,12,NULL,0,5,1),(23,'ultimoproducto','marcaaa',2,3.25,12,'23',0,6,1),(24,'final del procyto','narca',1,1.5,6,'24',0,7,1),(25,'final del procyto','narca',1,1.5,6,'25',0,7,1),(26,'final del procyto','narca',1,1.5,6,'26',0,7,1),(27,'final del procyto','narca',1,1.5,6,'27',0,7,1),(28,'final del procyto','narca',1,1.5,6,'28',0,7,1),(29,'final del procyto','narca',1,1.5,6,'29',0,7,1),(30,'final del procyto','narca',1,1.5,6,'30',0,7,1),(31,'final del procyto','narca',1,1.5,6,'31',0,7,1),(32,'final del procyto','narca',1,1.5,6,'32',0,7,1),(33,'final del procyto','narca',1,1.5,6,'33',0,7,1),(34,'final del procyto','narca',1,1.5,6,'34',0,7,1),(35,'aaaaaa','aaa',0.2,0.5,10,'35',0,3,1),(36,'new nere ','dgdgdg',1.29,1.36,12,'0036',0,8,1),(37,'el final ','sdsdecm m m',0.44,1,12,'0037',0,3,1),(38,'gabel','sfsfsf',0.5,1.5,12,'0038',0,1,1);
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

-- Dump completed on 2018-10-03 18:59:56
