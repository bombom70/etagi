const Router = require('express');
const router = new Router();
const flatController = require('../controller/flat.controller');

router.get('/flats', flatController.getFlats);
router.get('/flats/get-filter-params', flatController.getFilterParams);
router.get('/flats/:id', flatController.getCurrentFlat);

module.exports = router