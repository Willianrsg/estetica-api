/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("client", function (table) {
        table.increments("id").primary()
        table.string("name").notNullable()
        table.string("phone").notNullable()
        table.string("cpf_cnpj").unique().notNullable()
        table.string("zip_code")
        table.string("street")
        table.string("number")
        table.string("city")
        table.string("state")
        table.text("observation")

        table.timestamps(true, true)
        table.datetime("deleted_at").defaultTo(null)
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("client")
}
