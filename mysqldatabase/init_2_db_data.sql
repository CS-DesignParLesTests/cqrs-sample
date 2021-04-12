USE demonestjs;

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(30) NOT NULL,
  `displayName` varchar(30) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `id` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `book_ownership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book_ownership` (
  `username` varchar(255) NOT NULL,
  `bookId` varchar(255) NOT NULL,
  `isBought` tinyint(4) NOT NULL,
  `isSigned` tinyint(4) NOT NULL,
  `isLent` tinyint(4) NOT NULL,
  `dateAcquired` datetime NOT NULL,
  `dateRead` datetime NOT NULL,
  PRIMARY KEY (`username`,`bookId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('Amine','AmineI'),('Candice','Candylol17'),('Maxime','Kiaryx0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES ('0fe9fa3a-43a7-4a89-ac23-eb148b0acda2','Fate/Stay Night Heaven\'s Feel','Taskohna'),('155e6bb4-f441-4215-8b2c-2559287928d8','Dragon Ball Super','Toriyama, Akira'),('d6e697fe-3b24-49d6-9f10-7ce9109a943c','Prison School','Hiramoto, Akira');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

LOCK TABLES `book_ownership` WRITE;
/*!40000 ALTER TABLE `book_ownership` DISABLE KEYS */;
INSERT INTO `book_ownership` VALUES ('Amine','155e6bb4-f441-4215-8b2c-2559287928d8',0,0,0,'2021-04-12 12:25:38','2021-04-12 12:25:38'),('Maxime','0fe9fa3a-43a7-4a89-ac23-eb148b0acda2',0,0,0,'2021-04-12 12:25:38','2021-04-12 12:25:38'),('Maxime','155e6bb4-f441-4215-8b2c-2559287928d8',0,0,0,'2021-04-12 12:25:38','2021-04-12 12:25:38'),('Maxime','d6e697fe-3b24-49d6-9f10-7ce9109a943c',0,0,0,'2021-04-12 12:25:38','2021-04-12 12:25:38');
/*!40000 ALTER TABLE `book_ownership` ENABLE KEYS */;
UNLOCK TABLES;
