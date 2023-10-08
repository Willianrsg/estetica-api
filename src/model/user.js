const Joi = require("joi")

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/

const object = Joi.object().keys({
  name: Joi.string().required().label("Nome"),
  email: Joi.string().required().label("E-mail"),
  password: Joi.string().regex(passwordRegex, "password").label("Senha"),
  status: Joi.number().label("Status"),
})

module.exports = { object }
