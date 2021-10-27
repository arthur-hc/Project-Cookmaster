const recipesService = require('../services/recipesService');
const { 
  badRequest,
  created,
} = require('../helpers/httpStatus');

const create = async (req, res) => {
  const { _id } = req.userData;
  const { name, ingredients, preparation } = req.body;
  const response = await recipesService.create(name, ingredients, preparation, _id);
  
  const { err } = response;

  if (err) {
    return res.status(badRequest).json(err);
  }
  return res.status(created).send(response);
};

module.exports = {
  create,
};
