const db = require('../db');
const flatService = require('../services/flat.service');

class FlatController {
  async getFlats(req, res) {
    res.json(await flatService.getFlats(req.query));
  }

  async getFlatById(req, res) {
    res.json(await flatService.getFlatById(req.params.id));
  }
  async getAvailableFlatFilters(_req, res) {
    res.json(await flatService.getAvailableFlatFilters());
  }
}

module.exports = new FlatController();
