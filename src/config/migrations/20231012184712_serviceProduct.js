/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("service_product", function (table) {
        table.increments("id").primary()
        table.float('quantity')
        table.string('measure') 
        
        table.integer("id_service").unsigned().notNullable()
        table.foreign("id_service").references("service.id")
        table.integer("id_product").unsigned().notNullable()
        table.foreign("id_product").references("stock.id")
        
        table.string('observation') 

        table.timestamps(true, true)
        table.datetime("deleted_at").defaultTo(null)
    })
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("service_product")
  }
  