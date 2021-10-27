const mongoConnection = require('./connection');

const findUserByEmail = async (email) => {
  const db = await mongoConnection.getConnection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

const signin = async (newUserData) => {
  const db = await mongoConnection.getConnection();
  const { name, email, role } = newUserData;
  const response = await db.collection('users').insertOne(newUserData);
  return { user: { name, email, role, _id: response.insertedId } };
};

module.exports = {
  findUserByEmail,
  signin,
};
