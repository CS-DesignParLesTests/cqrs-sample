CREATE DATABASE IF NOT EXISTS demonestjs;
CREATE USER 'nestjs'@'%' IDENTIFIED BY 'nestjs';
GRANT ALL ON demonestjs.* TO 'nestjs'@'%';
FLUSH PRIVILEGES;