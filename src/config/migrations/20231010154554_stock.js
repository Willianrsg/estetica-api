/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("stock", function (table) {
        table.increments("id").primary()
        table.string("product")
        table.string("brand")
        table.float('quantity')
        table.float('price')
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
    return knex.schema.dropTableIfExists("stock")
  }
  