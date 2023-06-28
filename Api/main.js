const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const csv = require("csv-parser");
const fs = require("fs");
var cors = require("cors");
let db = new sqlite3.Database("./Flixbus.db", (err) => {
	if (err) {
		console.error(err.message);
	}
	console.log("Connected to the Flixbus database.");

	db.serialize(() => {
		db.run(`
        CREATE TABLE IF NOT EXISTS Customer (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            lastName TEXT,
            email TEXT
        );
        `);

		db.run(`
        CREATE TABLE IF NOT EXISTS Station (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            longitude REAL,
            latitude REAL,
            address TEXT,
            country TEXT,
            zip TEXT,
            city TEXT
        );
        `);

		db.run(`
        CREATE TABLE IF NOT EXISTS Tour (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            startStationId INTEGER,
            endStationId INTEGER,
            customerId INTEGER,
            FOREIGN KEY (startStationId) REFERENCES Station(id),
            FOREIGN KEY (endStationId) REFERENCES Station(id),
            FOREIGN KEY (customerId) REFERENCES Customer(id)
        );
        `);
	});

	fs.createReadStream("./db/stations.csv")
		.pipe(csv())
		.on("data", (row) => {
			let insertQuery = `INSERT INTO Station(name, longitude, latitude, address, country, zip, city) SELECT '${row.name}', ${row.longitude}, ${row.latitude}, '${row.address}', '${row.country}', '${row.zip}', '${row.city}' WHERE NOT EXISTS (SELECT 1 FROM Station WHERE name='${row.name}')`;

			db.run(insertQuery, function (err) {
				if (err) {
					console.log(err);
				}
			});
		})
		.on("end", () => {
			console.log("CSV file successfully processed");
		});
});

// app.use(cors());
app.use(cors());

app.post("/createStation", function (req, res) {
	let insertQuery = `INSERT INTO Station(name, longitude, latitude, address, country, zip, city) VALUES(?, ?, ?, ?, ?, ?, ?)`;

	db.run(
		insertQuery,
		[
			req.body.name,
			req.body.longitude,
			req.body.latitude,
			req.body.address,
			req.body.country,
			req.body.zip,
			req.body.city,
		],
		function (err) {
			if (err) {
				console.log(err);
				res.status(500).send(err);
			} else {
				res.status(200).send({
					message: "Station created successfully.",
				});
			}
		}
	);
});

app.post("/createTour", function (req, res) {
	let insertCustomerQuery = `INSERT INTO Customer(firstName, lastName, email) VALUES(?, ?, ?)`;

	db.run(
		insertCustomerQuery,
		[req.body.firstName, req.body.lastName, req.body.email],
		function (err) {
			if (err) {
				console.log(err);
				res.status(500).send(err);
			} else {
				let customerId = this.lastID;
				let insertTourQuery = `INSERT INTO Tour(startStationId, endStationId, customerId) VALUES(?, ?, ?)`;

				db.run(
					insertTourQuery,
					[
						req.body.startStationId,
						req.body.endStationId,
						customerId,
					],
					function (err) {
						if (err) {
							console.log(err);
							res.status(500).send(err);
						} else {
							res.status(200).send({
								message: "Tour created successfully.",
							});
						}
					}
				);
			}
		}
	);
});

app.get("/tours", function (req, res) {
	let selectQuery = `SELECT Tour.*, startStation.name as startStation, endStation.name as endStation FROM Tour JOIN Station as startStation ON Tour.startStationId = startStation.id JOIN Station as endStation ON Tour.endStationId = endStation.id`;

	db.all(selectQuery, function (err, rows) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.status(200).send(rows);
		}
	});
});

app.get("/tours/:email", function (req, res) {
	let selectQuery = `SELECT Tour.*, startStation.name as startStation, endStation.name as endStation FROM Tour JOIN Station as startStation ON Tour.startStationId = startStation.id JOIN Station as endStation ON Tour.endStationId = endStation.id JOIN Customer ON Tour.customerId = Customer.id WHERE Customer.email = ?`;

	db.all(selectQuery, [req.params.email], function (err, rows) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.status(200).send(rows);
		}
	});
});

app.get("/stations", function (req, res) {
	let selectQuery = `SELECT * FROM Station`;

	db.all(selectQuery, function (err, rows) {
		if (err) {
			console.log(err);
			res.status(500).send(err);
		} else {
			res.status(200).send(rows);
		}
	});
});

app.listen(1221, function () {
	console.log("Server is running on port 1221..");
});
