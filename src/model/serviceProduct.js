const Joi = require("joi")

const object = Joi.object().keys({
    idProduct: Joi.number().required().label("Produto"),
    idService: Joi.number().required().label("Serviço"),
    quantity: Joi.number().required().label("Quantidade"),
    measure: Joi.string().required().label('Medida'),
    observation: Joi.string().allow(null).label('Observação'),
})

module.exports = { object }