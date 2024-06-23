-- Cleaners
DROP DATABASE crud;
DROP TABLE users;
TRUNCATE users;

-- Create and use DB
CREATE DATABASE crud;
USE crud;

-- Create and insert tables
CREATE TABLE IF NOT EXISTS users (
  user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(100) NOT NULL,
	phone VARCHAR(15) NOT NULL
);

INSERT INTO users VALUES
(NULL, 'María', 'López', 'maria.lopez@mail.com', 1194325678),
(NULL, 'Juan', 'Fernández', 'juan.fernandez@mail.com', 1134679153),
(NULL, 'Ana', 'García', 'ana.garcia@mail.com', 1152297651),
(NULL, 'Pedro', 'Martínez', 'pedro.martinez@mail.com', 1168490142),
(NULL, 'Laura', 'Sánchez', 'laura.sanchez@mail.com', 1102453829);