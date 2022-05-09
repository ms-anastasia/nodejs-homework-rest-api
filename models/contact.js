const {Schema, model} = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
})

const contactsScheme = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(3).max(10).pattern(/^[0-9]+$/).required(),
  favorite: Joi.bool(),
})

const joiStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});


const Contact = model("contact", contactSchema);

module.exports = {Contact, contactsScheme, joiStatusSchema};