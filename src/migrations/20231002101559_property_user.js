export const up = function (knex) {
  return knex.schema.createTable("property_user", function (table) {
    table.integer("property").unsigned();
    table.integer("user").unsigned();
    
    table.primary(["property", "user"]);

    table
      .foreign("property")
      .references("id")
      .inTable("properties")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .foreign("user")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("property_user");
};
