CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
    item_id INTEGER(100) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER(100) NOT NULL,
    stock_quantity INTEGER(100) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Mouse', 'Electronics', 12, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Keyboard', 'Electronics', 15, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('XboxOne', 'Electronics', 200, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Dominion', 'Board Games', 40, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Munchkin', 'Board Games', 30, 75);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Pandemic', 'Board Games', 40, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Lord of the Rings', 'Books', 35, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Harry Potter', 'Books', 55, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Thrawn Trilogy', 'Books', 20, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ('Above and Below', 'Board Games', 35, 40);
