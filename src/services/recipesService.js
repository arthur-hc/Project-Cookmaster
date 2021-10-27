const recipesModel = require('../model/recipesModel');
const { containsAllParams, isAdmin, isSameId } = require('../validations/index');
const {
  invalidEntries,
  recipeNotFound,
  onlyCreatorEdit,
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

const editRecipeById = async (userData, recipeId, recipeData) => {
  const { role, _id } = userData;
  const userId = _id;

  const recipeToEdit = await recipesModel.getRecipeById(recipeId);
  const madeBy = recipeToEdit.userId;
  
  if (!isSameId(userId, madeBy) && !isAdmin(role)) {
    return { err: { message: onlyCreatorEdit } };
  }

  await recipesModel.editRecipeById(recipeId, recipeData);

  return { ...recipeToEdit, ...recipeData };
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
};
