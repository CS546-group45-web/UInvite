const { ObjectId } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const tokens = mongoCollections.tokens;

const createToken = async (user_id, token) => {
  const token_collection = await tokens();
  const newToken = {
    user_id: user_id,
    token: token,
  };
  const insertInfo = await token_collection.insertOne(newToken);
  if (insertInfo.insertedCount === 0) throw 'Could not add token';
  const newId = insertInfo.insertedId;
  return newId;
};

const getTokenByToken = async (token) => {
  const token_collection = await tokens();
  const tokenObj = await token_collection.findOne({ token: token });

  if (!tokenObj) throw 'Token not found';
  tokenObj._id = tokenObj._id.toString();
  return tokenObj;
};

const deleteToken = async (token) => {
  const token_collection = await tokens();
  const deleteInfo = await token_collection.deleteOne({
    token: token,
  });
  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete token with token ${token}`;
  }
  return true;
};

module.exports = {
  createToken,
  deleteToken,
  getTokenByToken,
};
