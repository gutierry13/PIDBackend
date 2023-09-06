-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: backend
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `adocoes`
--

DROP TABLE IF EXISTS `adocoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `adocoes` (
  `codigo` varchar(15) NOT NULL,
  `cpfCliente` varchar(15) NOT NULL,
  `codigoAnimal` varchar(16) NOT NULL,
  `data` varchar(15) DEFAULT NULL,
  `termos` mediumtext NOT NULL,
  `status` varchar(15) DEFAULT NULL,
  `documentos` blob DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  KEY `fk_clienteCpf` (`cpfCliente`),
  KEY `fk_codigoAnimal` (`codigoAnimal`),
  CONSTRAINT `fk_clienteCpf` FOREIGN KEY (`cpfCliente`) REFERENCES `clientes` (`cpf`),
  CONSTRAINT `fk_codigoAnimal` FOREIGN KEY (`codigoAnimal`) REFERENCES `animais` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adocoes`
--

LOCK TABLES `adocoes` WRITE;
/*!40000 ALTER TABLE `adocoes` DISABLE KEYS */;
INSERT INTO `adocoes` VALUES ('2c77aa18-84b7-4','535.965.318-37','3cd7b027-8bb8-43','13/09/2003','essa por','ativa ',NULL);
/*!40000 ALTER TABLE `adocoes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-30  9:57:29
