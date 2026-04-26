/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('owners', function(table) {
        table.bigIncrements('id').primary();
        table.string('type_document', 100);
        table.string('number_document', 100);
        table.string('full_name', 150).notNullable();
        table.string('last_name', 150);
        table.string('email', 150);
        table.string('phone', 50);
        table.boolean('status').defaultTo(true);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('owners');
};
