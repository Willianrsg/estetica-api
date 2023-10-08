const dbo = require('../dbo/base')
const { messages } = require('joi-translation-pt-br')
const validation = require('../model/processor')
const tableName = 'processor'

const get = async object => {
  const { limit, page } = object

  const filters = {
    id: { column: 'id', operator: '=' },
    operation: { column: 'operation', operator: 'like' },
    priority: { column: 'priority', operator: 'like' },
    status: { column: 'status', operator: 'like' },
    idUser: { column: 'id_user', operator: 'like' },
    bodyRequest: { column: 'body_request', operator: 'like' },
    observation: { column: 'observation', operator: 'like' }
  }

  for (const key in filters) {
    if (object[key]) {
      const { column, operator } = filters[key]
      const paramValue = operator === 'like' ? `%${object[key]}%` : object[key]
      return await dbo.get(tableName, limit, page, {
        column,
        value: paramValue,
        operator
      })
    }
  }

  processor = await dbo.get(tableName, limit, page)

  if (processor && processor.data && processor.data.length > 0) {
    const updatedData = await Promise.all(
      processor.data.map(async item => {
        const user = await dbo.getById(item.idUser, 'user')

        if (user && user.name) {
          item.userName = user.name
        }

        try {
          const bodyRequestObj = JSON.parse(item.bodyRequest)
          if (bodyRequestObj.originalname) {
            item.fileName = bodyRequestObj.originalname
          }
        } catch (err) {
          console.error('Erro ao extrair dados do JSON:', err)
        }

        return item
      })
    )

    processor.data = updatedData
  }

  return processor
}

const insert = async object => {
  try {
    await validation.object.validateAsync(object, {
      abortEarly: false,
      messages: messages
    })
  } catch (error) {
    return error.details.map(el => el.message)
  }

  return await dbo.insert(object, tableName)
}

const update = async (object, id) => {
  if (!id) {
    return false
  }
  if (!object) {
    return false
  }

  return await dbo.update(object, id, tableName)
}

const remove = async id => {
  if (!id) {
    return false
  }
  return await dbo.remove(id, tableName)
}

const getPending = async () => {
  return await dbo.getPendingImporter(tableName)
}

module.exports = {
  get,
  insert,
  update,
  remove,
  getPending
}
