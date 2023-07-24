const Pool = require('pg').Pool
const { DB_PORT, DB_USER, DB_HOST, DB_NAME, DB_PASS } = require('./config');
const { isEmptyBD, initDB } = require('./utils');

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASS,
  port: DB_PORT,
});

// CREATE TABLE flats(id integer NOT NULL, floor integer, pos_on_floor integer, price numeric, rooms integer, area_total varchar(255), area_kitchen varchar(255), area_live varchar(255), layout_image varchar(255));

const seedDBIfEmpty = async () => {
  if(await isEmptyBD(pool)) {
    initDB();
  }
}

module.exports = {
  db: pool,
  seedDBIfEmpty,
}