/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('roles').del()
  await knex('roles').insert([
    { name: 'John Doe',description: 'Software Engineer'},
    { name: 'Foo Bar',description: 'Database Administrator'},
    { name: 'Jane Doe',description: 'Data Science'},
  ]);
};
