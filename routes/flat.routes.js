const Router = require('express');
const router = new Router();
const flatController = require('../controller/flat.controller');
const flatValidator = require('../validators/flat.validator');

router.get('/available-filters', flatController.getAvailableFlatFilters);
router.get('/', flatValidator.validateGetFlatsParams, flatController.getFlats);
router.get('/:id', flatValidator.validateGetFlatById, flatController.getFlatById);

module.exports = router