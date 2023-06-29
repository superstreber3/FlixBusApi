IF NOT EXISTS (
    SELECT name FROM sys.databases WHERE name = 'Flixbus'
)
CREATE DATABASE Flixbus;
GO

USE Flixbus;
GO

IF NOT EXISTS (
    SELECT * FROM sys.tables WHERE name = 'Customer' AND type = 'U'
)
CREATE TABLE Customer (
    id INT IDENTITY(1,1) PRIMARY KEY,
    firstName NVARCHAR(50),
    lastName NVARCHAR(50),
    email NVARCHAR(50)
);
GO

IF NOT EXISTS (
    SELECT * FROM sys.tables WHERE name = 'Station' AND type = 'U'
)
CREATE TABLE Station (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(50) NOT NULL,
    longitude FLOAT,
    latitude FLOAT,
    address NVARCHAR(255),
    country NVARCHAR(50),
    zip NVARCHAR(10),
    city NVARCHAR(100)
);
GO

IF NOT EXISTS (
    SELECT * FROM sys.tables WHERE name = 'Tour' AND type = 'U'
)
CREATE TABLE Tour (
    id INT IDENTITY(1,1) PRIMARY KEY,
    startStationId INT,
    endStationId INT,
    customerId INT,
    FOREIGN KEY (startStationId) REFERENCES Station(id),
    FOREIGN KEY (endStationId) REFERENCES Station(id),
    FOREIGN KEY (customerId) REFERENCES Customer(id)
);
GO