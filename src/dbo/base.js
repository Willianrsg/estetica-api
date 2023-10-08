const { date } = require('joi')
const db = require('../config/db')

const get = async (tableName, limit = 10, page = 1, params) => {
  const offset = (page - 1) * limit

  const baseQuery =
    params && params.column && params.value
      ? db(tableName)
          .where('deleted_at', null)
          .where(params.column, params.operator, params.value)
      : db(tableName).where('deleted_at', null)

  const result = await baseQuery
    .clone()
    .select()
    .limit(limit)
    .offset(offset)
    .catch(error => {
      console.log(error.message)
      return []
    })

  const count = await baseQuery
    .clone()
    .count('id as quantity')
    .first()
    .catch(error => {
      console.log(error.message)
      return []
    })

  return {
    data: result,
    actualPage: page,
    total: count.quantity
  }
}

const getById = async (id, tableName) => {
  const result = await db(tableName)
    .select()
    .where('id', id)
    .where('deleted_at', null)
    .first()
    .catch(err => {
      console.log(err.message)
      return false
    })

  return result
}

const insert = async (object, tableName) => {
  const result = await db(tableName)
    .insert(object)
    .catch(err => {
      return { errors: err.message }
    })

  return result
}

const update = async (object, id, tableName) => {
  const result = await db(tableName)
    .update(object)
    .where('id', id)
    .catch(err => {
      return { errors: err.message }
    })
  return result
}

const remove = async (id, tableName) => {
  const result = await db(tableName)
    .update({ deleted_at: new Date() })
    .where('id', id)
    .catch(err => {
      console.log(err)
      return false
    })
  return result
}

const login = async (tableName, email) => {
  const result = await db(tableName)
    .select()
    .where('email', email)
    .where('deleted_at', null)
    // .where("status", 1)
    .first()
    .catch(err => {
      return false
    })
  return result
}

const getPendingImporter = async tableName => {
  const result = await db(tableName)
    .select()
    .where('status', 0)
    .andWhere('deleted_at', null)
    .orderBy('priority', 'asc')
    .first()
    .catch(err => {
      console.log(err.message)
      return []
    })

  return result
}

const validateAcl = async (idUser, path) => {
  const result = await db('user')
    .select()
    .first()

    .where('user.id', idUser)
    .where('screen.route', path)

    .where('user.deleted_at', null)
    .where('user_group.deleted_at', null)
    .where('acl.deleted_at', null)
    .where('screen.deleted_at', null)

    .leftJoin('user_group', 'user.id', 'user_group.id_user')
    .leftJoin('acl', 'user_group.id_group', 'acl.id_group')
    .leftJoin('screen', 'acl.id_screen', 'screen.id')

    .catch(err => {
      console.log(err.message)
      return []
    })

  return result
}

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
  login,
  getPendingImporter,
  validateAcl
}
