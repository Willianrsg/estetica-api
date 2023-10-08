const Joi = require("joi")

const object = Joi.object().keys({
    name: Joi.string().required().label("Nome"),
    price: Joi.number().required().label("Preço"),
    observation: Joi.string().allow(null).label('Observação'),
})

module.exports = { object }
