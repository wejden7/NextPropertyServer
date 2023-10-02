export const up = function (knex) {
  return knex.schema.createTable("role_permissions ", function (table) {
    table.primary(["role", "permission"]);

    table.integer("role").unsigned();
    table.integer("permission").unsigned();

    table
      .foreign("role")
      .references("id")
      .inTable("roles")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .foreign("permission")
      .references("id")
      .inTable("permissions")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("role_permissions");
};
