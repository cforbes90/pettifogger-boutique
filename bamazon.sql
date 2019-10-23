DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INTEGER(11) NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100),
  departmnet_name VARCHAR(45),
  price DECIMAL (10,2),
  quantity INTEGER(10) NULL,
  PRIMARY KEY (id)
);
SELECT*FROM products;