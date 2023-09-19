export const up = function (knex) {
  return knex.schema.createTable("reset_token", function (table) {
    table.primary(["email",'token']);
    table.string("email", 255).notNullable();
    table.string("token", 255).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());

    table.foreign("email").references("email").inTable("users");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("reset_token");
};
