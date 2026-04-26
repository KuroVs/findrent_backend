/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('property_amenities', function(table) {

        table.integer('property_id')
            .unsigned()
            .references('id')
            .inTable('properties')
            .onDelete('CASCADE');

        table.integer('amenity_id')
            .unsigned()
            .references('id')
            .inTable('amenities')
            .onDelete('CASCADE');

        table.primary(['property_id', 'amenity_id']);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('property_amenities');
};
