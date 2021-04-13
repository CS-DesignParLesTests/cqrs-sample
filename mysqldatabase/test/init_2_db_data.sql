USE demonestjs;
DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `user` (
    `username` varchar(30) NOT NULL,
    `displayName` varchar(30) NOT NULL,
    PRIMARY KEY (`username`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
/*!40101 SET character_set_client = @saved_cs_client */
;
DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `book` (
    `id` varchar(36) NOT NULL,
    `title` TEXT NOT NULL,
    `author` TEXT NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
/*!40101 SET character_set_client = @saved_cs_client */
;
DROP TABLE IF EXISTS `book_ownership`;
/*!40101 SET @saved_cs_client     = @@character_set_client */
;
/*!50503 SET character_set_client = utf8mb4 */
;
CREATE TABLE `book_ownership` (
    `username` varchar(255) NOT NULL,
    `bookId` varchar(255) NOT NULL,
    `isBought` tinyint(4) NOT NULL,
    `isSigned` tinyint(4) NOT NULL,
    `isLent` tinyint(4) NOT NULL,
    `dateAcquired` datetime NOT NULL,
    `dateRead` datetime NOT NULL,
    PRIMARY KEY (`username`, `bookId`)
) ENGINE = InnoDB DEFAULT CHARSET = latin1;
/*!40101 SET character_set_client = @saved_cs_client */
;
