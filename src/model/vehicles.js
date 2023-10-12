const Joi = require('joi')

const object = Joi.object().keys({
    idClient: Joi.number().required().label('Cliente'),
    manufacturer: Joi.string().allow(null).label('Fabricante'),
    model: Joi.string().required().label('modelo'),
    licensePlate: Joi.string().required().label('Placa'),
    color: Joi.string().allow(null).label('Cor'),
    fleet: Joi.string().allow(null).label('Frota'),
})

module.exports = { object }
