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
    },
    {
      name: 'Clientes',
      route: '/client',
      order: 8
    },
    {
      name: 'Veiculos',
      route: '/vehicles',
      order: 9
    },
    {
      name: 'Serviços',
      route: '/service',
      order: 10
    },
    {
      name: 'Estoque',
      route: '/stock',
      order: 11
    },
    {
      name: 'Agenda',
      route: '/scheduling',
      order: 12
    },
  ])
}
