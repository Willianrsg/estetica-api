const dbo = require("../dbo/base")
const { messages } = require("joi-translation-pt-br")
const validation = require("../model/serviceProduct")
const tableName = "serviceProduct"

const get = async (object) => {
  const { limit, page } = object

  const filters = {
    id: { column: "id", operator: "=" },
    idService: { column: "id_service", operator: "=" },
    idProduct: { column: "id_product", operator: "=" },
    quantity: { column: "quantity", operator: "like" },
    measure: { column: "measure", operator: "like" },
  }

  for (const key in filters) {
    if (object[key]) {
      const { column, operator } = filters[key]
      const paramValue = operator === "like" ? `%${object[key]}%` : object[key]
      return await dbo.getProdName(tableName, limit, page, {
        column,
        value: paramValue,
        operator,
      })
    }
  }

  return await dbo.getProdName(tableName, limit, page)
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
  return await dbo.insert(object, tableName)
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
