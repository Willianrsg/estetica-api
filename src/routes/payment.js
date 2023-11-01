const route = '/payment'
const api = require('../api/payment')
const auth = require('../api/auth')

module.exports = (router) => {
    router.route(`${route}/:id`).all(auth.validate).get(api.get)
}