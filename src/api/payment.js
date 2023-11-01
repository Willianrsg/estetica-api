const facade = require("../facade/payment");

const get = async (req, res) => {
    const object = req.params
    console.log(req.params);
    // const route = req.params.route
  
    // const facadePath = path.join(__dirname, `../facade/${route}.js`)
  
    // if (!fs.existsSync(facadePath)) {
    //   return res.sendStatus(400)
    // }
  
    // const facade = require(facadePath)
  
    const result = await facade.get(object)
    if (result) {
      return res.status(200).send(result)
    }
    return res.sendStatus(404)
  }

module.exports = {
  get,
};
