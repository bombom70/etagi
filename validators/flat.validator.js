const Joi = require('joi');
const { idParamSchema } = require('../shared/validation-schemas');
const {validate } = require('../middlewares/validate.middleware');

const positiveNumberSchema = Joi.number().min(0);
const areaSchema = Joi.string().max(100);
const getFlatsQueryParamsSchema = Joi.object().keys({
  page: Joi.number().min(0).max(1000).default(0),
  sortParams: Joi.string().allow('').max(100),
  perPage: Joi.number().min(1).max(100).default(8),
  floor: positiveNumberSchema,
  price: positiveNumberSchema,
  rooms: positiveNumberSchema,
  area_kitchen: areaSchema,
  area_total: areaSchema,
  area_live: areaSchema,
})

class FlatValidator {
  validateGetFlatsParams = validate({ schema: getFlatsQueryParamsSchema, source: 'query' });
  validateGetFlatById = validate({ schema: idParamSchema, source: 'params' });
}

module.exports = new FlatValidator();