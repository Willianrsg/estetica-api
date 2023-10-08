const dbo = require("../dbo/base")
const { messages } = require("joi-translation-pt-br")
const validation = require("../model/vehicles")
const tableName = "vehicles"

const get = async (object) => {
  const { limit, page } = object

  const filters = {
    id: { column: "id", operator: "=" },
    idClient: { column: "id_client", operator: "=" },
    manufacturer: { column: "manufacturer", operator: "like" },
    model: { column: "model", operator: "like" },
    licensePlate: { column: "license_plate", operator: "like" },
    color: { column: "color", operator: "like" },
    fleet: { column: "fleet", operator: "like" },
  }

  for (const key in filters) {
    if (object[key]) {
      const { column, operator } = filters[key]
      const paramValue = operator === "like" ? `%${object[key]}%` : object[key]
      return await dbo.get(tableName, limit, page, {
        column,
        value: paramValue,
        operator,
      })
    }
  }

  return await dbo.get(tableName, limit, page)
}

const insert = async (object) => {
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    })
  } catch (error) {
    const errors = error.details.map((el) => el.message)
    return { errors }
  }

  return await dbo.insertOrUpdateVehicle(object, tableName)
}

const update = async (object, id) => {
  if (!id) {
    return false
  }
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages,
    })
  } catch (error) {
    const errors = error.details.map((el) => el.message)
    return { errors }
  }
  return await dbo.update(object, id, tableName)
}

const remove = async (id) => {
  if (!id) {
    return false
  }
  return await dbo.remove(id, tableName)
}

module.exports = {
  get,
  insert,
  update,
  remove,
}
