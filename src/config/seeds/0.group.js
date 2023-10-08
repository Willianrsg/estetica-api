exports.seed = async function (knex) {
  await knex('group').insert([
    {
      name: 'Administradores'
    },
    // {
    //   name: 'Super'
    // }
  ])
}
