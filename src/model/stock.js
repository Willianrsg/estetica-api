const Joi = require("joi")

const object = Joi.object().keys({
    product: Joi.string().required().label("Produto"),
    brand: Joi.string().required().label("Marca"),
    quantity: Joi.number().required().label("Quantidade"),
    price: Joi.number().required().label("Preço"),
    observation: Joi.string().allow(null).label('Observação'),
})

module.exports = { object }
