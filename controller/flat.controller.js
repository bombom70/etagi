const db = require('../db');

class FlatController {
  async getFlats(req, res) {
    const { skip, sortParams, ...filterParams } = req.query;
    const isEmpty = Object.keys(filterParams).length < 1;
    const offset = skip * 8;
    const orderByParam = sortParams ? sortParams : "id";

    if (!isEmpty) {
      const resultQuery = [];
      for (let key in filterParams) {
        if (typeof filterParams[key] === 'object') {
          const a = filterParams[key].map(v => key.split('_').length > 1 ? `${key} LIKE '${v}'` :`${key}=${v}`).join(" OR ");
          resultQuery.push(a);
        } else {
          const value = key.split('_').length > 1 ? `${key} LIKE '${filterParams[key]}'` :`${key}=${filterParams[key]}`;
          resultQuery.push(value);
        }
      }
      const finalyResultQuery = resultQuery.length > 0 ? `WHERE ${resultQuery.join(" AND ")}` : "";
      const filteredFlats = await db.query(`SELECT * FROM flats ${finalyResultQuery} ORDER BY ${orderByParam} LIMIT ${8} OFFSET ${offset}`);
      res.json(filteredFlats.rows);
      return;
    }

    const flats = await db.query(`SELECT * FROM flats ORDER BY ${orderByParam} LIMIT ${8} OFFSET ${offset}`);
    res.json(flats.rows);
  }

  async getCurrentFlat(req, res) {
    try {
      const id = Number(req.params.id);
      const flat = await db.query('SELECT * FROM flats WHERE id=$1', [id]);
      res.json(flat.rows[0]);
    } catch(e) {
      res.status(400).send("Такой квартиры не найдено");
    }
  }

  async getFilterParams(req, res) {
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
    res.json(resultParams)
  }
}

module.exports = new FlatController();
