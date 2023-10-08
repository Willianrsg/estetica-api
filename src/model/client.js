const Joi = require("joi")

const object = Joi.object().keys({
    name: Joi.string().allow(null).label("Nome"),
    phone: Joi.string().required().label("Telefone"),
    cpfCnpj: Joi.string().required().label("CPF"),
    zipCode: Joi.string().allow(null).label("CEP"),
    street: Joi.string().allow(null).label("Endereço"),
    number: Joi.string().allow(null).label("Número"),
    city: Joi.string().allow(null).label("Cidade"),
    state: Joi.string().allow(null).label("Estado"),
    observation: Joi.string().allow(null).label('Observação'),
})

module.exports = { object }
