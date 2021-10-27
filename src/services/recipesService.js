const recipesModel = require('../model/recipesModel');
const { containsAllParams } = require('../validations/index');
const {
  invalidEntries,
  recipeNotFound,
} = require('../helpers/errors');

const create = async (name, ingredients, preparation, _id) => {
  if (!containsAllParams([name, ingredients, preparation, _id])) {
    return { err: { message: invalidEntries } };
  }
  const response = await recipesModel
  .create({ name, ingredients, preparation, userId: _id, image: '' });
  
  return response;
};

const getAllRecipes = async () => {
  const response = await recipesModel.getAllRecipes();
  return response;
};

const getRecipeById = async (id) => {
  const response = await recipesModel.getRecipeById(id);

  if (!response) {
    return { err: { message: recipeNotFound } };
  }
  return response;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
};
