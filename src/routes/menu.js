const route = '/menu'
const api = require('../api/menu')

module.exports = router => {
  router.route(route).get(api.get)
}
