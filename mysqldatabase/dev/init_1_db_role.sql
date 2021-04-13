CREATE DATABASE IF NOT EXISTS demonestjs;
-- MySQL bug forces to drop user before creating it
DROP USER IF EXISTS 'nestjs'@'%';
FLUSH PRIVILEGES;
CREATE USER 'nestjs'@'%' IDENTIFIED BY 'nestjs';
GRANT ALL ON demonestjs.* TO 'nestjs'@'%';
FLUSH PRIVILEGES;
