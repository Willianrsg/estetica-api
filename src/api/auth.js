const facade = require('../facade/validateAcl')

const validate = async (req, res, next) => {
  // if (req.cookies.cookieID) {
    
  //   const url = req.originalUrl.split('/')[1].split('?')[0];

  //   result = await facade.validateAcl(req.cookies.cookieID, `/${url}`)

  //   if (result === true) {
  //     return next()
  //   } else {
  //     return res.sendStatus(401)
  //   }
  // } else {
  //   return res.sendStatus(401)
  // }
  if (req.cookies.cookieID) {
    return next()
  } else {
    return res.sendStatus(401)
  }
}

module.exports = { validate }
