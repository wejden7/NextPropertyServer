export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("roles").del();
  await knex("users").del();
  await knex("property_types").del();
  await knex("roles").insert([
    { id: 1, name: "admin" },
    { id: 2, name: "agent" },
    { id: 3, name: "client" },
    { id: 4, name: "property owner" },
  ]);
  
  await knex("users").insert([
    {
      id: 1,
      email: "wejdenchneti7@gmail.com",
      name: "wejden",
      password: "$2a$12$fEMCoPQzyuaXV3lq3QQBz.Ta/zxR1x9obwskol1A/80f8kg19eH4q",
      telephone_number: "55568111",
      id_number: "wztr123",
      blocked: false,
      verified: false,
      role: 1,
    },
    {
      id: 2,
      email: "ala@gmail.com",
      name: "wejden",
      password: "$2a$12$fEMCoPQzyuaXV3lq3QQBz.Ta/zxR1x9obwskol1A/80f8kg19eH4q",
      telephone_number: "55568136",
      id_number: "wztr1234",
      blocked: false,
      verified: false,
      role: 2,
    },
    {
      id: 3,
      email: "malek@gmail.com",
      name: "wejden",
      password: "$2a$12$fEMCoPQzyuaXV3lq3QQBz.Ta/zxR1x9obwskol1A/80f8kg19eH4q",
      telephone_number: "55568135",
      id_number: "wztr12345",
      blocked: false,
      verified: false,
      role: 2,
    },
    {
      id: 4,
      email: "fethi@gmail.com",
      name: "wejden",
      password: "$2a$12$fEMCoPQzyuaXV3lq3QQBz.Ta/zxR1x9obwskol1A/80f8kg19eH4q",
      telephone_number: "55668136",
      id_number: "wztr123456",
      blocked: false,
      verified: false,
      role: 4,
    },
    {
      id: 5,
      email: "noura@gmail.com",
      name: "wejden",
      password: "$2a$12$fEMCoPQzyuaXV3lq3QQBz.Ta/zxR1x9obwskol1A/80f8kg19eH4q",
      telephone_number: "55569136",
      id_number: "wztr1234567",
      blocked: false,
      verified: false,
      role: 3,
    },
  ]);

  await knex("property_types").insert([
    { id: 1, name: "Home" },
    { id: 2, name: "Apartment" },
    { id: 3, name: "Duplex" },
    { id: 4, name: "Villa" },
    { id: 5, name: "Office Building" },
    { id: 6, name: "Retail Store" },
    { id: 7, name: "Warehouse" },
    { id: 8, name: "Industrial Facility" },
    { id: 9, name: "Hotel "},
    { id: 10, name: "Land" },
    { id: 11, name: "Farm or Ranch" },
    { id: 12, name: "Parking Space" },
  ]);


};
