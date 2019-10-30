DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products
(
  id INT NOT NULL
  AUTO_INCREMENT,
  product_name VARCHAR
  (100) NOT NULL,
  department_name VARCHAR
  (45) NOT NULL,
  price DECIMAL
  (10,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY
  (id)
);
  INSERT INTO products
    (product_name, department_name, price, stock_quantity)
  VALUES
    ("Mascara", "Beauty", 19.99, 5),
    ("Jimmy Choo Romy 85", "Footwear", 8.99, 2),
    ("Speedo Silicon Swim Cap", "Sports", 10.99, 3),
    ("Nike School Girl Swimsuit", "Sports", 14.99, 6),
    ("Quest Doulbe Choc Cookie", "Health", 7.99, 20),
    ("Golden Retriever", "Pet", 999999, 1),
    ("Samsung Smart TV", "Appliance", 899, 1),
    ("Iphone 7 Plus", "Smartphone", 299, 9),
    ("Nespresso Pods", "Beverage", 19.99, 50),
    ("Computer Glasses", "Eyewear", 34.99, 89),
    ("Le Creuset Grill Pan", "Kitchen", 89.99, 30)
