const fs = require("fs");
const path = require("path");
const fastcsv = require("fast-csv");
const { db } = require('./db');

function initDB() {
  const pathToFile = path.join(__dirname, 'flats_data.csv');
  let stream = fs.createReadStream(pathToFile);
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    .on("data", function(data) {
      csvData.push(data);
    })
    .on("end", function() {
      csvData.shift();

      const query =
        "INSERT INTO flats (id, floor, pos_on_floor, price, rooms, area_total, area_kitchen, area_live, layout_image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

        db.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach(row => {
            client.query(query, row, (err, res) => {
              if (err) {
                console.log(err);
              } else {
                // console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        } finally {
          done();
        }
      });
    });

  stream.pipe(csvStream);
}

async function isEmptyBD(db) {
  const flats = await db.query('SELECT * FROM flats');
  return flats.rows.length > 0 ? false : true;
}

module.exports = { initDB, isEmptyBD };
