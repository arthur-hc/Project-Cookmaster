const mongoConnection = require('./connection');

const create = async (recipeData) => {
  const db = await mongoConnection.getConnection();
  const response = await db.collection('recipes').insertOne(recipeData);
  return { recipe: { ...recipeData, _id: response.insertedId } };
};

module.exports = {
  create,
};
