const Joi = require('joi')

const cartSchema = Joi.array().items(
  Joi.object({
    sku: Joi.string().required(),
    qty: Joi.number().required(),
  })
)

module.exports = cartSchema
