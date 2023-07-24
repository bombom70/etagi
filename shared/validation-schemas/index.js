const Joi = require('joi');

const idSchema = Joi.number().min(1);
const idParamSchema = Joi.object().keys({
  id: idSchema.required(),
});

module.exports = {
  idSchema,
  idParamSchema,
}