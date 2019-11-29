/*
SQLyog Ultimate v12.5.1 (64 bit)
MySQL - 10.1.30-MariaDB : Database - test
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`test` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `test`;

/*Table structure for table `carrousel` */

DROP TABLE IF EXISTS `carrousel`;

CREATE TABLE `carrousel` (
  `carr_code` varchar(10) NOT NULL,
  `carr_date` datetime NOT NULL,
  PRIMARY KEY (`carr_code`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `carrousel_images` */

DROP TABLE IF EXISTS `carrousel_images`;

CREATE TABLE `carrousel_images` (
  `carr_img_id` int(11) NOT NULL AUTO_INCREMENT,
  `carr_img_carr_code` varchar(10) NOT NULL,
  `carr_img_data` text NOT NULL,
  PRIMARY KEY (`carr_img_id`),
  KEY `carr_img_carr_code` (`carr_img_carr_code`),
  CONSTRAINT `carrousel_images_ibfk_1` FOREIGN KEY (`carr_img_carr_code`) REFERENCES `carrousel` (`carr_code`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
