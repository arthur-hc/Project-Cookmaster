const recipesService = require('../services/recipesService');
const { 
  badRequest,
  created,
  ok,
  notFound,
  unauthorized,
  noContent,
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

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const response = await recipesService.getRecipeById(id);

  const { err } = response;

  if (err) {
    return res.status(notFound).json(err);
  }
  return res.status(ok).json(response);
};

const getRecipesByUserId = async (req, res) => {
  const { _id } = req.userData;
  const userId = _id;
  const response = await recipesService.getRecipesByUserId(userId);
  return res.status(ok).json(response);
};

const editRecipeById = async (req, res) => {
  const { userData } = req;
  const recipeId = req.params.id;
  const recipeData = req.body;
  const response = await recipesService.editRecipeById(userData, recipeId, recipeData);

  const { err } = response;

  if (err) {
    return res.status(unauthorized).json(err);
  }
  return res.status(ok).json(response);
};

const deleteRecipeById = async (req, res) => {
  const { userData } = req;
  const recipeId = req.params.id;
  const response = await recipesService.deleteRecipeById(userData, recipeId);

  const { err } = response;

  if (err) {
    return res.status(unauthorized).json(err);
  }
  return res.status(noContent).end();
};

const addImageById = async (req, res) => {
  const { userData } = req;
  const recipeId = req.params.id;

  const response = await recipesService.editRecipeById(userData, recipeId, { image: req.filePath });

  const { err } = response;
  
  if (err) {
    return res.status(unauthorized).json(err);
  }
  return res.status(ok).json(response);
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
  addImageById,
  getRecipesByUserId,
};
