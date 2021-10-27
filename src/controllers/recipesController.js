const recipesService = require('../services/recipesService');
const { 
  badRequest,
  created,
  ok,
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

const getAllRecipes = async (_req, res) => {
  const response = await recipesService.getAllRecipes();
  return res.status(ok).json(response);
};

module.exports = {
  create,
  getAllRecipes,
};
