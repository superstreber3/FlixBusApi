const express = require("express");
const sql = require("mssql");
const app = express();
const csv = require("csv-parser");
const fs = require("fs");
const cors = require("cors");

app.use(cors());
// Connection string parameters.
var config = {
  user: "Flixbus",
  password: "Flixbus",
  server: "DESKTOP-UHENNU8",
  database: "Flixbus",
  options: {
    encrypt: false,
  },
};

sql.connect(config, function (err) {
  if (err) console.log(err);

  let request = new sql.Request();

  fs.createReadStream("./db/stations.csv")
    .pipe(csv())
    .on("data", (row) => {
      let insertQuery = `IF NOT EXISTS (SELECT * FROM Station WHERE name='${row.name}') INSERT INTO Station(name, longitude, latitude, address, country, zip, city) VALUES('${row.name}', ${row.longitude}, ${row.latitude}, '${row.address}', '${row.country}', '${row.zip}', '${row.city}')`;

      request.query(insertQuery, function (err, result) {
        if (err) {
          console.log(err);
        }
      });
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
});

app.use(express.json());

app.post("/createStation", function (req, res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);

    let request = new sql.Request();

    let insertQuery = `INSERT INTO Station(name, longitude, latitude, address, country, zip, city) VALUES('${req.body.name}', ${req.body.longitude}, ${req.body.latitude}, '${req.body.address}', '${req.body.country}', '${req.body.zip}', '${req.body.city}')`;

    request.query(insertQuery, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send({ message: "Station created successfully." });
      }
    });
  });
});

app.post("/createTour", function (req, res) {
  sql.connect(config, function (err) {
    //   if (err) console.log(err);
    console.log("sjdfksdkfskfksdkfjskfskfskfksdfjksjdfk");

    let request = new sql.Request();

    let insertCustomerQuery = `INSERT INTO Customer(firstName, lastName, email) OUTPUT INSERTED.ID VALUES('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}')`;
    request.query(insertCustomerQuery, function (err, customerResult) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        let insertTourQuery = `INSERT INTO Tour(startStationId, endStationId, customerId) VALUES('${req.body.startDestination}', '${req.body.endDestination}', '${customerResult.recordset[0].ID}')`;

        request.query(insertTourQuery, function (err, tourResult) {
          if (err) {
            console.log(err);
            res.status(500).send(err);
          } else {
            res.status(200).send({ message: "Tour created successfully." });
          }
        });
      }
    });
  });
});

app.get("/tours", function (req, res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);

    let request = new sql.Request();

    let selectQuery = `
        SELECT
          Tour.*,
          startStation.name AS startStation,
          endStation.name AS endStation,
          Customer.firstName AS customerFirstName,
          Customer.lastName AS customerLastName,
          Customer.email AS customerEmail
        FROM Tour
        JOIN Station AS startStation ON Tour.startStationId = startStation.id
        JOIN Station AS endStation ON Tour.endStationId = endStation.id
        JOIN Customer ON Tour.customerId = Customer.id
      `;

    request.query(selectQuery, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result.recordset);
      }
    });
  });
});

app.get("/tours/:email", function (req, res) {
    console.log(req.params.email);
    sql.connect(config, function (err) {
      if (err) console.log(err);
  
      let request = new sql.Request();
  
      let selectQuery = `SELECT Tour.*, startStation.name as startStation, endStation.name as endStation, Customer.firstName, Customer.lastName, Customer.email FROM Tour JOIN Station as startStation ON Tour.startStationId = startStation.id JOIN Station as endStation ON Tour.endStationId = endStation.id JOIN Customer ON Tour.customerId = Customer.id WHERE Customer.email = '${req.params.email.replace(
        ":",
        ""
      )}'`;
  
      request.query(selectQuery, function (err, result) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send(result.recordset);
        }
      });
    });
  });
  

app.get("/stations", function (req, res) {
  sql.connect(config, function (err) {
    if (err) console.log(err);

    let request = new sql.Request();

    let selectQuery = `SELECT * FROM Station`;

    request.query(selectQuery, function (err, result) {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result.recordset);
      }
    });
  });
});

app.listen(1221, function () {
  console.log("Server is running on port 1221..");
});
