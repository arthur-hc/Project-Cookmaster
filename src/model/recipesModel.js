const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const create = async (recipeData) => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('recipes').insertOne(recipeData);
  return { recipe: { ...recipeData, _id: response.insertedId } };
};

const getAllRecipes = async () => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('recipes').find().toArray();
  return response;
};

const getRecipeById = async (id) => {
  try {
    const db = await mongoConnection.getConnection();
    const response = await db.collection('recipes').findOne({ _id: ObjectId(id) });
    return response;
  } catch (_err) {
    return null;
  }
};

const editRecipeById = async (id, recipeData) => {
  try {
    const db = await mongoConnection.getConnection();
    const response = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: recipeData });
    return response;
  } catch (_err) {
    return null;
  }
};

const deleteRecipeById = async (id) => {
  try {
    const db = await mongoConnection.getConnection();
    const response = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
    return response;
  } catch (_err) {
    return null;
  }
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  editRecipeById,
  deleteRecipeById,
};
