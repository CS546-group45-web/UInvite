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
  hashed_password = await bcrypt.hash(password, 16);

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
  const user = await this.getUserById(newId);
  return user;
};

const getAllUsers = async () => {
  const user_collection = await users();
  const user_list = await user_collection.find({}).toArray();
  return user_list;
};

module.exports = {
  createUser,
  getAllUsers,
};
