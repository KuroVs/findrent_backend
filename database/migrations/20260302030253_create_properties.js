/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('properties', function(table) {
        table.increments('id').primary();

        table.integer('owner_id')
            .unsigned()
            .references('id')
            .inTable('owners')
            .onDelete('CASCADE');

        table.string('title').notNullable();
        table.text('description');
        table.decimal('price', 12, 2).notNullable();

        table.string('city').notNullable();
        table.string('address');

        table.integer('bedrooms').notNullable();
        table.integer('bathrooms').notNullable();
        table.decimal('area_m2', 8, 2);

        table.boolean('is_active').defaultTo(true);

        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('properties');
};
