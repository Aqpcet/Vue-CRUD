# SpringBoot的启动自动执行sql脚本，创建数据库时的url为：jdbc:mysql://localhost:3306/
# 然后连接的url是：jdbc:mysql://localhost:3306/vue

-- 创建数据库vue
CREATE DATABASE IF NOT EXISTS `vue`;
#CREATE DATABASE vue;

-- 使用vue数据库
USE vue;

-- 创建表
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `gender` char(2) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;