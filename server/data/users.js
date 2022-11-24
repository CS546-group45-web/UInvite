const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const validation = require('../utils/validation');

const createUser = async (
  first_name,
  last_name,
  email,
  password,
  phone,
  dob,
  gender
) => {
  first_name = validation.checkNames(first_name, 'first_name');
  last_name = validation.checkNames(last_name, 'last_name');
  email = validation.checkEmail(email);
  dob = validation.checkDate(dob);
  phone = validation.checkPhone(phone);
  password = validation.checkPassword(password);
  gender = validation.checkGender(gender);

  const user_collection = await users();
  hashed_password = await bcrypt.hash(password, 10);

  const newuUser = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    dob: dob,
    phone: phone,
    hashed_password: hashed_password,
    gender: gender,
    rsvped_events: [],
    profile_photo_url: '',
    events_created: [],
  };

  const insertInfo = await user_collection.insertOne(newuUser);
  if (insertInfo.insertedCount === 0) throw 'Could not add user';
  const newId = insertInfo.insertedId;
  return newId;
};

const getAllUsers = async () => {
  const user_collection = await users();
  const user_list = await user_collection.find({}).toArray();
  return user_list;
};

const getUserById = async (id) => {
  validation.checkObjectId(id);
  const user_collection = await users();
  const user = await user_collection.findOne({ _id: ObjectId(id) });
  if (!user) throw 'User not found';
  user._id = user._id.toString();
  return user;
};

const getUserByEmail = async (email) => {
  email = validation.checkEmail(email);
  const user_collection = await users();
  const user = await user_collection.findOne({ email });
  if (!user) throw 'User not found';
  user._id = user._id.toString();
  return user;
};

const updateUser = async (
  id,
  first_name,
  last_name,
  email,
  phone,
  dob,
  gender
) => {
  validation.checkObjectId(id);
  const user_collection = await users();
  first_name = validation.checkNames(first_name, 'first_name');
  last_name = validation.checkNames(last_name, 'last_name');
  email = validation.checkEmail(email);
  dob = validation.checkDate(dob);
  phone = validation.checkPhone(phone);
  gender = validation.checkGender(gender);

  const updatedUser = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    dob: dob,
    phone: phone,
    gender: gender,
  };

  const updatedInfo = await user_collection.updateOne(
    { _id: ObjectId(id) },
    { $set: updatedUser }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update user successfully';
  }

  return await getUserById(id);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
};
