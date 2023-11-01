const dbo = require('../dbo/payment')
const tableName = "schedule"

const get = async object => {
  const { limit, page } = object

  const filters = {
    id: { column: "id", operator: "=" },
    idClient: { column: "id_client", operator: "=" },
    idVehicles: { column: "id_vehicles", operator: "=" },
    idService: { column: "id_service", operator: "=" },
    date: { column: "date", operator: "like" },
    hour: { column: "hour", operator: "like" },
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
  
    return await dbo.get(tableName, limit, page, object)
}

module.exports = {
  get
}
