/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("schedule", function (table) {
        table.increments("id").primary()
        table.dateTime('date')
        table.string('hour')
        table.string('observation')
        
        table.integer("id_client").unsigned().notNullable()
        table.foreign("id_client").references("client.id")      
        table.integer("id_vehicles").unsigned().notNullable()
        table.foreign("id_vehicles").references("vehicles.id")      
        table.integer("id_service").unsigned().notNullable()
        table.foreign("id_service").references("service.id")      
  
        table.timestamps(true, true)
        table.datetime("deleted_at").defaultTo(null)
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("schedule")
  }
  