export const up = function (knex) {
  return knex.schema.createTable("property_types", function (table) {
    table.increments("id");
    table.string("name").notNullable();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("property_types");
};
