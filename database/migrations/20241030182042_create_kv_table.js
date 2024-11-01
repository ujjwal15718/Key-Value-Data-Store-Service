exports.up = function(knex) {
    return knex.schema.createTable('kv_store', table => {
        table.increments('id').primary();
        table.string('key', 32).notNullable().unique();
        table.jsonb('data').notNullable();
        table.integer('ttl').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('kv_store');
};