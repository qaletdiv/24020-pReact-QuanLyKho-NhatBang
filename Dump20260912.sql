-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: warehouse_management
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('427f4957-6e37-4616-87e8-ec84650823d4','7bfa561210e3bb339cdb3ebd9948659eea00ee17c9f76a5d42edf24fa03fd599',NULL,'20260626075426_init_new_db','A migration failed to apply. New migrations cannot be applied before the error is recovered from. Read more about how to resolve migration issues in a production database: https://pris.ly/d/migrate-resolve\n\nMigration name: 20260626075426_init_new_db\n\nDatabase error code: 1067\n\nDatabase error:\nInvalid default value for \'issue_date\'\n\nPlease check the query number 6 from the migration file.\n\n   0: sql_schema_connector::apply_migration::apply_script\n           with migration_name=\"20260626075426_init_new_db\"\n             at schema-engine\\connectors\\sql-schema-connector\\src\\apply_migration.rs:106\n   1: schema_core::commands::apply_migrations::Applying migration\n           with migration_name=\"20260626075426_init_new_db\"\n             at schema-engine\\core\\src\\commands\\apply_migrations.rs:91\n   2: schema_core::state::ApplyMigrations\n             at schema-engine\\core\\src\\state.rs:201',NULL,'2026-06-26 07:54:26.773',0);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '0',
  `committed_quantity` int NOT NULL DEFAULT '0',
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`product_id`),
  CONSTRAINT `inventory_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (1,10,0,'2026-08-16 14:33:48.969'),(2,1,0,'2026-08-23 15:10:42.079'),(5,15,0,'2026-08-24 07:22:35.207'),(6,40,0,'2026-08-24 07:22:16.075'),(7,60,0,'2026-08-24 07:22:16.075'),(8,1,0,'2026-08-25 13:07:35.275'),(14,1,0,'2026-09-08 13:05:47.441');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_transactions`
--

DROP TABLE IF EXISTS `inventory_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `order_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  `transaction_type` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity_changed` int NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `inventory_transactions_product_id_fkey` (`product_id`),
  KEY `inventory_transactions_order_id_fkey` (`order_id`),
  KEY `inventory_transactions_user_id_fkey` (`user_id`),
  CONSTRAINT `inventory_transactions_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `inventory_transactions_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `inventory_transactions_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_transactions`
--

LOCK TABLES `inventory_transactions` WRITE;
/*!40000 ALTER TABLE `inventory_transactions` DISABLE KEYS */;
INSERT INTO `inventory_transactions` VALUES (1,1,2,1,'IN',10,'2026-08-16 14:33:48.969'),(2,2,8,1,'IN',1,'2026-08-23 15:10:42.079'),(3,6,7,1,'IN',40,'2026-08-24 07:22:16.075'),(4,7,7,1,'IN',60,'2026-08-24 07:22:16.075'),(5,5,6,1,'IN',15,'2026-08-24 07:22:35.207'),(6,8,11,1,'IN',1,'2026-08-25 13:07:35.275'),(7,14,17,4,'IN',1,'2026-09-08 13:05:47.441');
/*!40000 ALTER TABLE `inventory_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_sizes`
--

DROP TABLE IF EXISTS `product_sizes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_sizes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `size_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_sizes`
--

LOCK TABLES `product_sizes` WRITE;
/*!40000 ALTER TABLE `product_sizes` DISABLE KEYS */;
INSERT INTO `product_sizes` VALUES (1,'202V'),(2,'1,8L'),(3,'Thùng 18L'),(4,'Thùng 15L'),(5,'Thùng 17L'),(6,'Thùng 20L'),(7,'Lon 800ml');
/*!40000 ALTER TABLE `product_sizes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `size_id` int DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_code_key` (`code`),
  KEY `products_size_id_fkey` (`size_id`),
  CONSTRAINT `products_size_id_fkey` FOREIGN KEY (`size_id`) REFERENCES `product_sizes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Áo Nam Cotton','SP-001','Chất liệu thoáng mát',150000.00,NULL,'','2026-08-11 07:34:22.279','2026-08-11 07:34:22.279'),(2,'Quần Jeans Nam Dáng Côn','SP-002','Chất liệu denim co giãn nhẹ, độ bền cao',350000.00,NULL,'','2026-08-11 09:41:45.585','2026-08-11 09:41:45.585'),(3,'Màn Hình Dell UltraSharp 27 Inch 4K','SP-003','Độ phân giải 4K IPS, chuẩn màu đồ họa 99% sRGB',9800000.00,NULL,'','2026-08-11 09:41:54.247','2026-08-11 09:41:54.247'),(4,'Bàn Phím Cơ Không Dây Keychron K2','SP-004','Kết nối Bluetooth/Type-C, Switch Gateron Brown',1850000.00,NULL,'','2026-08-11 09:42:01.274','2026-08-11 09:42:01.274'),(5,'Chuột Không Dây Logitech MX Master 3S','SP-005','Cảm biến 8000 DPI, cuộn vô cực MagSpeed',2450000.00,NULL,'','2026-08-11 09:42:10.473','2026-08-11 09:42:10.473'),(6,'Ổ Cứng SSD NVMe Kingston 1TB','SP-006','Tốc độ đọc/ghi 3500MB/s, chuẩn PCIe Gen 4x4',1650000.00,NULL,'','2026-08-11 09:42:16.953','2026-08-11 09:42:16.953'),(7,'RAM Laptop DDR4 Crucial 16GB 3200MHz','SP-007','Tương thích tốt với các dòng Laptop Intel & AMD',890000.00,NULL,'','2026-08-11 09:42:23.296','2026-08-11 09:42:23.296'),(8,'Nồi Cơm Điện Cao Tần Sunhouse 1.8L','SP-008','Lòng nồi chống dính 5 lớp, công nghệ nấu IH',1250000.00,2,'aaa','2026-08-11 09:42:30.461','2026-09-05 17:02:22.474'),(9,'Sơn Dulux Weathershield Ngoại Thất','SP001','Chống bám bẩn, chống thấm',1450000.00,3,'','2026-09-06 13:54:45.629','2026-09-06 13:54:45.629'),(10,'Sơn Dulux EasyClean Nội Thấ','SP002','Lau chùi vết bẩn vượt trội',820000.00,3,'','2026-09-06 13:55:14.851','2026-09-06 13:55:14.851'),(11,'Sơn Lót Chống Kiềm Dulux','SP003','Kháng muối kiềm cao',980000.00,3,'','2026-09-06 13:55:40.121','2026-09-06 13:55:40.121'),(12,'Sơn Jotun Jotashield Bền Màu','SP004','Kháng tia cực tím tối đa',1520000.00,4,'','2026-09-06 13:56:05.992','2026-09-06 13:56:05.992'),(13,'Sơn Jotun Essence Dễ Lau Chùi','SP005','Mùi nhẹ, màng sơn mịn',690000.00,5,'','2026-09-06 13:56:41.968','2026-09-06 13:56:41.968'),(14,'Sơn Chống Thấm Kova CT-11A','SP006','Chống thấm sàn & tường xi măng',890000.00,6,'','2026-09-06 13:57:15.304','2026-09-06 13:57:15.304'),(15,'Sơn Dầu Bạch Tuyết Trắng .','SP007','Dùng cho kim loại và gỗ',125000.00,7,'','2026-09-06 13:57:57.009','2026-09-07 14:47:52.701'),(16,'aaa','SP00110','a',111111111.00,1,'','2026-09-08 13:11:46.462','2026-09-08 13:11:46.462');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_order_details`
--

DROP TABLE IF EXISTS `purchase_order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(15,2) NOT NULL,
  `subtotal` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `purchase_order_details_order_id_product_id_key` (`order_id`,`product_id`),
  KEY `purchase_order_details_product_id_fkey` (`product_id`),
  CONSTRAINT `purchase_order_details_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `purchase_orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `purchase_order_details_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_order_details`
--

LOCK TABLES `purchase_order_details` WRITE;
/*!40000 ALTER TABLE `purchase_order_details` DISABLE KEYS */;
INSERT INTO `purchase_order_details` VALUES (1,2,1,10,150000.00,1500000.00),(2,3,1,10,150000.00,1500000.00),(3,4,1,30,150000.00,4500000.00),(4,5,3,10,9800000.00,98000000.00),(5,5,4,20,1850000.00,37000000.00),(6,6,5,15,2450000.00,36750000.00),(7,7,6,40,1650000.00,66000000.00),(8,7,7,60,890000.00,53400000.00),(9,8,2,1,350000.00,350000.00),(10,9,4,3,1850000.00,5550000.00),(11,9,7,2,890000.00,1780000.00),(12,10,7,1,890000.00,890000.00),(13,11,8,1,1250000.00,1250000.00),(14,12,8,1,1250000.00,1250000.00),(15,13,7,1,890000.00,890000.00),(16,14,7,1,890000.00,890000.00),(17,15,10,10,820000.00,8200000.00),(18,15,9,20,1450000.00,29000000.00),(19,16,4,1,1850000.00,1850000.00),(20,17,14,1,890000.00,890000.00),(21,18,16,1,111111111.00,111111111.00),(22,19,16,1,111111111.00,111111111.00);
/*!40000 ALTER TABLE `purchase_order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_orders`
--

DROP TABLE IF EXISTS `purchase_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `supplier_id` int NOT NULL,
  `created_by` int NOT NULL,
  `issue_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `note` text COLLATE utf8mb4_unicode_ci,
  `total_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Draft',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `purchase_orders_code_key` (`code`),
  KEY `purchase_orders_supplier_id_fkey` (`supplier_id`),
  KEY `purchase_orders_created_by_fkey` (`created_by`),
  CONSTRAINT `purchase_orders_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `purchase_orders_supplier_id_fkey` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_orders`
--

LOCK TABLES `purchase_orders` WRITE;
/*!40000 ALTER TABLE `purchase_orders` DISABLE KEYS */;
INSERT INTO `purchase_orders` VALUES (2,'PO-1786434048789',1,1,'2026-08-11 00:40:49','Nhập hàng đợt 1 tháng 8',1500000.00,'Imported','2026-08-11 07:40:48.791','2026-08-16 14:33:48.969'),(3,'PO-1786440999496',1,1,'2026-08-11 02:36:39','Nhập hàng đợt 2 tháng 8',1500000.00,'Draft','2026-08-11 09:36:39.497','2026-08-11 09:36:39.497'),(4,'PO-1786441019144',1,1,'2026-08-11 02:36:59','Nhập hàng đợt 2 tháng 8',4500000.00,'Draft','2026-08-11 09:36:59.146','2026-08-11 09:36:59.146'),(5,'PO-1786441429555',2,1,'2026-08-11 02:43:50','Nhập kho linh kiện máy tính - Màn hình Dell & Bàn phím',135000000.00,'Draft','2026-08-11 09:43:49.556','2026-08-11 09:43:49.556'),(6,'PO-1786441445032',4,1,'2026-08-11 02:44:05','Bổ sung tồn kho thiết bị văn phòng ngoại vi',36750000.00,'Imported','2026-08-11 09:44:05.033','2026-08-24 07:22:35.207'),(7,'PO-1786441453029',5,1,'2026-08-11 02:44:13','Nhập lô RAM & SSD phục vụ lắp ráp máy bộ',119400000.00,'Imported','2026-08-11 09:44:13.030','2026-08-24 07:22:16.075'),(8,'PO-1787497824137',1,1,'2026-08-23 08:10:24','',350000.00,'Imported','2026-08-23 15:10:24.154','2026-08-23 15:10:42.079'),(9,'PO-1787660684360',2,1,'2026-08-25 05:24:44','helo',7330000.00,'Confirmed','2026-08-25 12:24:44.372','2026-08-25 12:24:55.288'),(10,'PO-1787661124430',5,1,'2026-08-25 05:32:04','',890000.00,'Draft','2026-08-25 12:32:04.432','2026-08-25 12:32:04.432'),(11,'PO-1787663222622',2,1,'2026-08-25 06:07:03','aaaaaaa',1250000.00,'Imported','2026-08-25 13:07:02.624','2026-08-25 13:07:35.275'),(12,'PO-1787663343991',5,1,'2026-08-25 06:09:04','aaa',1250000.00,'Draft','2026-08-25 13:09:03.993','2026-08-25 13:09:03.993'),(13,'PO-1788099560277',5,1,'2026-08-30 07:19:20','',890000.00,'Draft','2026-08-30 14:19:20.283','2026-08-30 14:19:20.283'),(14,'PO-1788100122666',5,1,'2026-08-30 07:28:43','',890000.00,'Draft','2026-08-30 14:28:42.668','2026-08-30 14:28:42.668'),(15,'PO-1788703169173',6,1,'2026-09-06 06:59:29','Đơn đặt hàng nhập tháng 9 - Đang đợi duyệt giá',37200000.00,'Confirmed','2026-09-06 13:59:29.180','2026-09-06 13:59:51.001'),(16,'PO-1788793723414',12,3,'2026-09-07 08:08:43','aaa',1850000.00,'Draft','2026-09-07 15:08:43.418','2026-09-07 15:08:43.418'),(17,'PO-1788872729991',10,4,'2026-09-08 06:05:30','aaaaa',890000.00,'Imported','2026-09-08 13:05:30.005','2026-09-08 13:05:47.441'),(18,'PO-1788873234162',14,1,'2026-09-08 06:13:54','',111111111.00,'Draft','2026-09-08 13:13:54.164','2026-09-08 13:13:54.164'),(19,'PO-1788918249137',14,1,'2026-09-08 18:44:09','a',111111111.00,'Draft','2026-09-09 01:44:09.150','2026-09-09 01:44:09.150');
/*!40000 ALTER TABLE `purchase_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `suppliers_code_key` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Công Ty May Mặc Việt Tiến (Chi nhánh 2)','NCC-001','0988776655','cskh@viettien.com.vn','456 Đường CMT8, Quận 3, TP. Hồ Chí Minh',NULL,'2026-08-11 07:40:44.005','2026-08-23 14:10:28.680'),(2,'Công Ty TNHH Linh Kiện Điện Tử Asus Việt Nam','NCC-002','02838221100','support@asus.com.vn','Quận 1, TP. Hồ Chí Minh',NULL,'2026-08-11 09:38:14.319','2026-08-11 09:38:14.319'),(3,'Tập Đoàn Dệt May Phong Phú','NCC-003','0918273645','sales@phongphu.com.vn','TP. Thủ Đức, TP. Hồ Chí Minh',NULL,'2026-08-11 09:38:23.005','2026-08-11 09:38:23.005'),(4,'Nhà Phân Phối Thiết Bị Văn Phòng Phong Vũ','NCC-004','0971122334','kydoanh@phongvu.vn','Quận 10, TP. Hồ Chí Minh',NULL,'2026-08-11 09:38:30.467','2026-08-11 09:38:30.467'),(5,'Công Ty Cổ Phần Bao Bì Bình Minh','NCC-005','02743789999','info@bmppack.com','KCN Sóng Thần, Bình Dương',NULL,'2026-08-11 09:38:37.449','2026-08-11 09:38:37.449'),(6,'Công ty TNHH Sơn Dulux Việt Nam','NCC001','02838221144','contact@dulux.vn','KCN Biên Hòa 2, Đồng Nai',NULL,'2026-09-06 13:50:02.346','2026-09-06 13:50:02.346'),(9,'Tập đoàn Sơn Kova','NCC003','02437648900','sales@kova.vn','Cầu Giấy, Hà Nội',NULL,'2026-09-06 13:52:17.149','2026-09-06 13:52:17.149'),(10,'Sơn Nippon Paint Việt Nam','NCC004','02513835789','support@nipponpaint.com','KCN Biên Hòa 1, Đồng Nai',NULL,'2026-09-06 13:52:39.202','2026-09-06 13:52:39.202'),(12,'SƠN MYKOLOR - 4 ORANGES','NCC006','02723779900','service@4oranges.com','KCN Đức Hòa 1, Long An',NULL,'2026-09-06 13:53:39.512','2026-09-07 15:19:32.639'),(13,'bang ne','NNC24112003','0886176793','nnb24.112003@gmail.com','aaaaaaa','aaa','2026-09-07 15:16:47.602','2026-09-07 15:19:19.735'),(14,'aaaa','NCC-24','1234567899','nnn24.112003@gmail.com','aaa','aaaa','2026-09-08 13:10:31.974','2026-09-08 13:10:31.974');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_key` (`username`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Bang','nnb24.112003@gmail.com','$2b$10$glwgW2WHbW.el6goZlcFqunq3bpLdNATPiFNhqaIAfhuUmdiwhRKu','Staff','2026-06-26 08:07:54.634','2026-06-26 08:07:54.634'),(2,'Admin','admin@gmail.com','$2b$10$ySSZoWt5nqOVUJLKiYvhV.eZsTltVLfEg2ryfa7klmMITHk6kOWZi','Admin','2026-06-26 08:09:04.597','2026-06-26 08:09:04.597'),(3,'abc','abc123@gmail.com','$2b$10$YFor2jpakPJ2/0QNg4CsXeQMJryUeyHJHiY9PJI./aSD02Nl9TABu','Staff','2026-09-07 14:46:10.259','2026-09-07 14:46:10.259'),(4,'Adminne','Adminne@gmail.com','$2b$10$pq/MwzCszAHZkx9UJ2oJ3eWNgz0Vi/6XGJ7LcY1/iiJ3vCiKz4nZS','Admin','2026-09-07 15:05:21.417','2026-09-07 15:05:21.417');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-12 23:08:52
