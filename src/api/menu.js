const get = async (req, res) => {
  const object = req.query
  const cookies = req.cookies.cookieID

  const facade = require('../facade/menu')

  const result = await facade.get(object, cookies)
  if (result) {
    return res.status(200).send(result)
  }
  return res.sendStatus(404)
}
  
module.exports = {
  get
}
  