export  const up = function (knex) {
  return knex.schema.createTable("roles", function (table) {
    table.increments("id");
    table.string("name", 255).unique().notNullable();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("roles");
};
