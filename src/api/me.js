const facade = require("../facade/me");

const getById = async (req, res) => {
  const id = req.cookies.cookieID;
  const result = await facade.getById(id);

  if (result) {
    return res.status(200).send(result);
  }
  return res.sendStatus(404);
};

module.exports = {
  getById,
};
