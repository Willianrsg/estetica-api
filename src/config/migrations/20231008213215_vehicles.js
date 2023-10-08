/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("vehicles", function (table) {
        table.increments("id").primary()
        table.string("model")
        table.string("manufacturer")
        table.string("license_plate").unique().notNullable()
        table.string("color")
        table.integer("fleet")
        
        table.integer("id_client").unsigned().notNullable()
        table.foreign("id_client").references("client.id")      
  
        table.timestamps(true, true)
        table.datetime("deleted_at").defaultTo(null)
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("vehicles")
  }
  