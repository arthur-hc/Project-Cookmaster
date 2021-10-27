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

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
};
