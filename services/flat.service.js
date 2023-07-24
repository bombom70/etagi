const { db } = require('../db');
const mem = require('mem');
const ms = require('ms');

class FlatService {

  async getFlats(params) {
    const { page, sortParams, perPage: perPage_, ...filterParams } = params;
    const perPage = Number(perPage_) || 8;
    const isFilterParamsEmpty = !Object.keys(filterParams).length;

    const offset = page * perPage;
    const orderByParam = sortParams ? sortParams : "id";

    if(isFilterParamsEmpty) {
      const flats = await db.query(`SELECT * FROM flats ORDER BY ${orderByParam} LIMIT ${perPage} OFFSET ${offset}`);
      return flats.rows;
    }

    const resultQuery = [];
    for (const key in filterParams) {
      if (Array.isArray(filterParams[key])) {
        const a = filterParams[key].map(v => key.split('_').length > 1 ? `${key} LIKE '${v}'` :`${key}=${v}`).join(" OR ");
        resultQuery.push(a);
      } else {
        const value = key.split('_').length > 1 ? `${key} LIKE '${filterParams[key]}'` :`${key}=${filterParams[key]}`;
        resultQuery.push(value);
      }
    }
    const finalyResultQuery = resultQuery.length > 0 ? `WHERE ${resultQuery.join(" AND ")}` : "";
    const filteredFlats = await db.query(`SELECT * FROM flats ${finalyResultQuery} ORDER BY ${orderByParam} LIMIT ${perPage} OFFSET ${offset}`);
    return filteredFlats.rows;
  }

  async getFlatById(id) {
    const res = await db.query('SELECT * FROM flats WHERE id=$1', [id]);
    return res.rows?.[0] ?? null;
  }

  getAvailableFlatFilters = mem(async () => {
    const floorParams = await db.query('SELECT floor, COUNT(*) FROM flats GROUP BY floor ORDER BY floor ASC;');
    const priceParams = await db.query('SELECT price, COUNT(*) FROM flats GROUP BY price ORDER BY price ASC;');
    const roomsParams = await db.query('SELECT rooms, COUNT(*) FROM flats GROUP BY rooms ORDER BY rooms ASC;');
    const areaTotalParams = await db.query('SELECT area_total, COUNT(*) FROM flats GROUP BY area_total ORDER BY area_total ASC;');
    const areaKitchenParams = await db.query('SELECT area_kitchen, COUNT(*) FROM flats GROUP BY area_kitchen ORDER BY area_kitchen ASC;');
    const areaLiveParams = await db.query('SELECT area_live, COUNT(*) FROM flats GROUP BY area_live ORDER BY area_live ASC;');
    const resultParams = {
      main: {
        floor: floorParams.rows,
        price: priceParams.rows,
        rooms: roomsParams.rows,
      },
      additional: {
        "area_total": areaTotalParams.rows,
        "area_kitchen": areaKitchenParams.rows,
        "area_live": areaLiveParams.rows,
      }
    }
    return resultParams;
  }, {
    maxAge: ms('10 minutes')
  })
}

const service = new FlatService();
module.exports = service;
