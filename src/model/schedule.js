const Joi = require("joi")

const object = Joi.object().keys({
    idClient: Joi.number().required().label("Cliente"),
    idVehicles: Joi.number().required().label("Veículo"),
    idService: Joi.number().required().label("Serviço"),
    date: Joi.date().required().label("Data"),
    hour: Joi.string().required().label("Hora"),
    observation: Joi.string().allow(null).label('Observação'),
})

module.exports = { object }
