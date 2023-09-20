export const up = function (knex) {
  return knex.schema.createTable("role_permissions ", function (table) {
    table.primary(["role", "permission"]);

    table.integer("role").unsigned().notNullable();
    table.integer("permission").unsigned().notNullable();

    table.foreign("role").references("id").inTable("roles");
    table.foreign("permission").references("id").inTable("permissions");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("role_permissions");
};
