const { ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const validation = require('../utils/validation');

const createUser = async (
  firstName,
  lastName,
  email,
  username,
  password,
  phone,
  dob,
  gender
) => {
  firstName = validation.checkNames(firstName, 'firstName');
  lastName = validation.checkNames(lastName, 'lastName');
  email = validation.checkEmail(email);
  username = validation.checkUsername(username);
  dob = validation.checkDate(dob);
  phone = validation.checkPhone(phone);
  password = validation.checkPassword(password);
  gender = validation.checkGender(gender);

  const user_collection = await users();
  hashed_password = await bcrypt.hash(password, 10);

  const newuUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    dob: dob,
    phone: phone,
    hashed_password: hashed_password,
    gender: gender,
    is_verified: false,
    rsvped_events: [],
    profile_photo_url: '',
    events_created: [],
    followers: [],
    following: [],
  };

  const insertInfo = await user_collection.insertOne(newuUser);
  if (insertInfo.insertedCount === 0) throw 'Could not add user';
  const newId = insertInfo.insertedId;
  return newId;
};

const getUserById = async (id) => {
  const user_collection = await users();
  const user = await user_collection.findOne({ _id: ObjectId(id) });
  if (!user) throw 'User not found';
  user._id = user._id.toString();
  delete user.hashed_password;
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
  firstName,
  lastName,
  email,
  username,
  phone,
  dob,
  gender
) => {
  validation.checkObjectId(id);
  const user_collection = await users();
  firstName = validation.checkNames(firstName, 'firstName');
  lastName = validation.checkNames(lastName, 'lastName');
  email = validation.checkEmail(email);
  username = validation.checkUsername(username);
  dob = validation.checkDate(dob);
  phone = validation.checkPhone(phone);
  gender = validation.checkGender(gender);

  const updatedUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    dob: dob,
    phone: phone,
    gender: gender,
  };

  const updatedInfo = await user_collection.updateOne(
    { _id: ObjectId(id) },
    { $set: updatedUser }
  );
  if (updatedInfo.modifiedCount === 0 && updatedInfo.matchedCount !== 0) {
    throw 'No changes are made';
  } else {
    throw 'Could not update user';
  }

  return await getUserById(id);
};

const verifyUser = async (id) => {
  const user_collection = await users();
  const updatedInfo = await user_collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { is_verified: true } }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update user successfully';
  }
  return await getUserById(id);
};

const updateUserPassword = async (id, password) => {
  const user_collection = await users();
  password = validation.checkPassword(password);
  hashed_password = await bcrypt.hash(password, 10);
  const updatedInfo = await user_collection.updateOne(
    { _id: ObjectId(id) },
    { $set: { hashed_password: hashed_password } }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update user successfully';
  }
  return await getUserById(id);
};

const getUserByUsername = async (username) => {
  const user_collection = await users();
  const user = await user_collection.findOne({
    username: username,
  });
  if (!user) throw 'User not found';
  user._id = user._id.toString();
  delete user.hashed_password;
  return user;
};

const addFollower = async (userId, followerId) => {
  const user_collection = await users();
  const updatedInfo = await user_collection.updateOne(
    { _id: ObjectId(followerId) },
    { $addToSet: { followers: userId } }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update user successfully';
  }

  const updatedInfo2 = await user_collection.updateOne(
    { _id: ObjectId(userId) },
    { $addToSet: { following: followerId } }
  );
  if (updatedInfo2.modifiedCount === 0) {
    throw 'could not update user successfully';
  }
  return await getUserById(userId);
};

const unfollowUser = async (userId, followerId) => {
  const user_collection = await users();
  const updatedInfo = await user_collection.updateOne(
    { _id: ObjectId(followerId) },
    { $pull: { followers: userId } }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw 'could not update user successfully';
  }
  const updatedInfo2 = await user_collection.updateOne(
    { _id: ObjectId(userId) },
    { $pull: { following: followerId } }
  );
  if (updatedInfo2.modifiedCount === 0) {
    throw 'could not update user successfully';
  }
  return await getUserById(userId);
};

const updateImageURL = async (userId, imageURL) => {
  const user_collection = await users();
  const updatedInfo = await user_collection.updateOne(
    { _id: ObjectId(userId) },
    { $set: { profile_photo_url: imageURL } }
  );
  return await getUserById(userId);
};

const getFollowersInformation = async (userId) => {
  const user_collection = await users();
  const user = await user_collection.findOne({ _id: ObjectId(userId) });
  if (!user) throw 'User not found';
  const followers = [];
  for (let i = 0; i < user.followers.length; i++) {
    const follower = await getUserById(user.followers[i]);
    followers.push(follower);
  }
  return followers;
};

const getFollowingInformation = async (userId) => {
  const user_collection = await users();
  const user = await user_collection.findOne({ _id: ObjectId(userId) });
  if (!user) throw 'User not found';
  const following = [];
  for (let i = 0; i < user.following.length; i++) {
    const follower = await getUserById(user.following[i]);
    following.push(follower);
  }
  return following;
};
module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  updateUser,
  verifyUser,
  updateUserPassword,
  getUserByUsername,
  addFollower,
  unfollowUser,
  updateImageURL,
  getFollowersInformation,
  getFollowingInformation,
};
