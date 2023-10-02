export const up = function (knex) {
  return knex.schema.createTable("properties", function (table) {
    table.increments("id").primary();
    table.integer("property_type").unsigned();
    table.integer("location").unsigned();
    table.string("title").notNullable();
    table.text("description");
    table.decimal("price", 10, 2); 
    table.integer("bedrooms");
    table.integer("bathrooms");
    table.integer("livingroom");
    table.integer("kitchen");
    table.decimal("square_feet", 10, 2);
    table.integer("year_built");
    table.boolean("is_for_sale");
    table.boolean("is_for_rent");
    table.enum('usage_type', ['residential', 'commercial', 'both']).notNullable();
    table.enum('rent_type', ['long term', 'short term', 'both']).nullable();
   
    table.foreign("property_type").references("id").inTable("property_types");
    table.foreign("location").references("id").inTable("locations");
  });
};

export const down = function (knex) {
  return knex.schema.dropTable("properties");
};
