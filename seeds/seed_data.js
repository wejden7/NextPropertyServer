
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    {id: 1, name: 'admin'},
    {id: 2, name: 'agent'},
    {id: 3, name: 'client'},
    {id: 4, name: 'property owner'}
  ]);
};
