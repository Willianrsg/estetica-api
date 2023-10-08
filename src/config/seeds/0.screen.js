exports.seed = async function (knex) {
  await knex('screen').insert([
    {
      name: 'Login',
      route: '/login',
      order: 1
    },
    {
      name: 'Home',
      route: '/',
      order: 2
    },
    {
      name: 'Grupos',
      route: '/group',
      order: 3
    },
    {
      name: 'Programas',
      route: '/acl',
      order: 4
    },
    {
      name: 'Usuarios',
      route: '/user',
      order: 5
    },
    {
      name: 'Grupos de Usuarios',
      route: '/userGroup',
      order: 6
    },
    {
      name: 'Me',
      route: '/me',
      order: 7
    }
  ])
}
