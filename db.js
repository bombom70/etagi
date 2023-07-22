const Pool = require('pg').Pool

const pool = new Pool({
  user: 'test_user',
  host: 'localhost',
  database: 'etagi',
  password: '123123',
  port: 5432,
});

// CREATE TABLE flats(id integer NOT NULL, floor integer, pos_on_floor integer, price numeric, rooms integer, area_total varchar(255), area_kitchen varchar(255), area_live varchar(255), layout_image varchar(255));

module.exports = pool;
