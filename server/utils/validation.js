const { ObjectId } = require('mongodb');

const checkInputString = (input, name) => {
  if (!input) {
    throw `You must provide a ${name}`;
  }
  if (typeof input !== 'string') {
    throw `${name} must be a string`;
  }
  input = input.trim();
  if (input.length === 0) {
    throw `${name} must not be empty`;
  }
  return input;
};

const checkNames = (input, name) => {
  input = checkInputString(input, name);
  if (!/^[a-zA-Z ]+$/.test(input)) {
    throw `${name} must only contain letters`;
  }
  return input;
};

const checkEmail = (input) => {
  input = checkInputString(input, 'email');
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)) {
    throw 'Email must be a valid email address';
  }
  return input;
};

const checkPassword = (input) => {
  input = checkInputString(input, 'password');
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(input)) {
    throw 'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number';
  }
  return input;
};

const checkPhone = (input) => {
  input = checkInputString(input, 'phone');
  if (!/^\d{3}-\d{3}-\d{4}$/.test(input)) {
    throw 'Phone must be in the format XXX-XXX-XXXX';
  }
  return input;
};

const checkDate = (input) => {
  input = checkInputString(input, 'date');
  if (!/^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/.test(input)) {
    throw 'Date must be in the format MM/DD/YYYY';
  }
  return input;
};

const checkGender = (input) => {
  input = checkInputString(input, 'Gender');
  input = input.toLowerCase();
  if (!/^(male|female|other)$/.test(input)) {
    throw 'Gender should be male/female or others';
  }
  return input;
};

const checkObjectId = (input, name = 'object id') => {
  checkInputString(input, name);
  if (!ObjectId.isValid(input)) {
    throw `${name} must be a valid ObjectId`;
  }
};

module.exports = {
  checkInputString,
  checkNames,
  checkEmail,
  checkPassword,
  checkPhone,
  checkDate,
  checkGender,
  checkObjectId,
};
