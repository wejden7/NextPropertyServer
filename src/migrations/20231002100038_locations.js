export const up = function (knex) {
  return knex.schema.createTable("locations", function (table) {
    table.increments("id");
    table.string("address").notNullable();
    table.integer("zip_code").notNullable();
    table.float("lat").notNullable();
    table.float("lng").notNullable();
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("locations");
};
