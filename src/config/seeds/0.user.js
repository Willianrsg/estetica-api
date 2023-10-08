exports.seed = async function (knex) {
  await knex('user').insert([
    // {
    //   name: 'Admin',
    //   email: 'admin@email.com',
    //   password: '$2b$10$3qWOYbAMTaDodeXgl2UWVu5GC11i/0j7BCwD0gWixwMeNWZFdzFdW'
    // },
    {
      name: 'Willian',
      email: 'willian.garcia@softwaresul.com.br',
      password: '$2b$10$3qWOYbAMTaDodeXgl2UWVu5GC11i/0j7BCwD0gWixwMeNWZFdzFdW'
    }
  ])
}
