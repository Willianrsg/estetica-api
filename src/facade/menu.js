const dbo = require('../dbo/base')
const tableName = 'userGroup'

const get = async (object, cookies) => {
  const { page, order, direction } = object

  const filters = [{ column: 'idUser', operator: '=', value: cookies }]

  const joins = [
    {
      joinType: 'leftJoin',
      tableJoin: 'group',
      paramTo: 'group.id',
      paramFrom: 'user_group.id_group',
    },
    {
      joinType: 'leftJoin',
      tableJoin: 'acl',
      paramTo: 'acl.id_group',
      paramFrom: 'group.id',
    },
    {
      joinType: 'leftJoin',
      tableJoin: 'screen',
      paramTo: 'screen.id',
      paramFrom: 'acl.id_screen',
    },
  ]

  const fields = [`screen.name`]

  return await dbo.get(tableName, filters, 'Infinity', page, order, direction, fields, joins)
}

module.exports = {
  get,
}
