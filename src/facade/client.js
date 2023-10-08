const dbo = require("../dbo/base")
const { messages } = require("joi-translation-pt-br")
const validation = require("../model/client")
const tableName = "client"

const get = async (object) => {
  const { limit, page } = object

  const filters = {
    id: { column: "id", operator: "=" },
    name: { column: "name", operator: "like" },
    phone: { column: "phone", operator: "like" },
    cpf: { column: "cpf", operator: "like" },
    zipCode: { column: "zip_code", operator: "like" },
    city: { column: "city", operator: "like" },
    state: { column: "state", operator: "like" },
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
  console.log("Insert:");
  console.log(object);
  return await dbo.insertOrUpdateClient(object, tableName)
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
