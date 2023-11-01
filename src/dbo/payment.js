const db = require('../config/db')

const get = async (tableName, limit = 10, page = 1, params) => {
  const offset = (page - 1) * limit

  const baseQuery =
  params && params.column && params.value
    ? db(tableName)
        .where(`${tableName}.deleted_at`, null)
        .where('service.deleted_at', null)
        .where('client.deleted_at', null)
        .where('vehicles.deleted_at', null)
        .where(`${tableName}.${params.column}`, params.operator, params.value)
    : db(tableName).where(`${tableName}.deleted_at`, null)
      .where('service.deleted_at', null)
      .where('client.deleted_at', null)
      .where('vehicles.deleted_at', null)


  const result = await baseQuery
    .clone()
    .select(
        'schedule.*', 
        'client.id as idClient', 
        'client.name as nameClient', 
        'client.phone as phoneClient', 
        'client.cpfCnpj as cpfCnpjClient', 
        'client.street as streetClient', 
        'client.number as numberClient', 
        'client.city as cityClient', 
        'client.state as ufClient', 
        'client.zipCode as cepClient', 
        'service.id as idService', 
        'service.name as nameService', 
        'service.price as priceService',
        'vehicles.model as modelVehicles',
        'vehicles.licensePlate as licensePlateVehicles',
        'vehicles.fleet as fleetVehicles',
        'vehicles.color as colorVehicles',
      )
    .leftJoin('service', 'schedule.idService', 'service.id')
    .leftJoin('client', 'schedule.idClient', 'client.id')
    .leftJoin('vehicles', 'schedule.idVehicles', 'vehicles.id')
    .limit(limit)
    .offset(offset)
    .catch(error => {
      console.log(error.message)
      return []
    })

  const count = await baseQuery
    .clone()
    .count('schedule.id as quantity')
    .leftJoin('service', 'schedule.idService', 'service.id')
    .leftJoin('client', 'schedule.idClient', 'client.id')
    .leftJoin('vehicles', 'schedule.idVehicles', 'vehicles.id')
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



module.exports = {
  get
}
