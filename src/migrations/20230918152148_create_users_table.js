export const up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("email", 255).unique().notNullable();
    table.string("name", 255);
    table.string("password", 255).notNullable();
    table.string("telephone_number", 255).unique()
    table.string("id_number", 255).unique().notNullable();
    table.boolean("blocked").defaultTo(false);
    table.boolean("verified").defaultTo(false);
    table.integer("role").unsigned().notNullable();

    table
      .foreign("role")
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("users");
};

//npx knex migrate:latest
