export const up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.primary(["id", "email"]);
    table.increments("id");
    table.string("email", 255).unique().notNullable();
    table.string("name", 255);
    table.string("password", 255).notNullable();
    table.string("telephone_number", 255);
    table.string("id_number", 255).unique().notNullable();
    table.integer("role").unsigned().notNullable();

    table.foreign("role").references("id").inTable("roles");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("users");
};

//npx knex migrate:latest
