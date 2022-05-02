const Joi = require("joi");

const contactsScheme = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(10).pattern(/^[0-9]+$/).required(),
  })

  module.exports = contactsScheme;