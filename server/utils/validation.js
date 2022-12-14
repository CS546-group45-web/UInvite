const { ObjectId } = require("mongodb");
const xss = require("xss");

const checkInputString = (input, name) => {
  if (!input) {
    throw `You must provide a ${name}`;
  }
  if (typeof input !== "string") {
    throw `${name} must be a string`;
  }
  input = input.trim();
  if (input.length === 0) {
    throw `${name} must not be empty`;
  }
  input = xss(input);
  return input;
};
const checkInputNumber = (input, name) => {
  if (isNaN(Number(input))) throw `${name} should be a number`;
};

const checkNames = (input, name) => {
  input = checkInputString(input, name);
  if (!/^[a-zA-Z ]+$/.test(input)) {
    throw `${name} must only contain letters`;
  }
  if (input.length < 4) throw `${name} should be of length 4 or greater`;
  return input;
};

const checkTitle = (input, name) => {
  input = checkInputString(input);
  if (!/^[a-zA-Z0-9 ]+$/.test(input)) {
    throw `${name} must only contain letters or numbers`;
  }
  if (input.length < 4) throw `${name} should be of length 4 or greater`; //added extra validation
  return input;
};

const checkEmail = (input) => {
  input = checkInputString(input, "email");
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input)) {
    throw "Email must be a valid email address";
  }
  input = input.toLowerCase();
  return input;
};

const checkPassword = (input) => {
  if (!input)
    throw "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
  if (input === "")
    throw "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
  if (input.length < 8)
    // return "Password must contain more than 8 and less than 20 characters!";
    throw "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";

  if (!/[0-9]/g.test(input))
    throw "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
  // return "Password must contain atleast one number!";
  if (!/[A-Z]/g.test(input))
    throw "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
  // return "Password must contain atleast one uppercase letter!";
  if (!/[a-z]/g.test(input))
    throw "Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number";
  // return "Password must contain atleast one lowercase letter!";
  return input;
};

const checkPhone = (input) => {
  input = checkInputString(input, "phone");
  if (!/^[0-9]{10}$/.test(input)) {
    throw "Phone number must be 10 digits";
  }
  return input;
};

const checkDate = (input) => {
  input = checkInputString(input, "date");
  if (!/^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/.test(input)) {
    throw "Date must be in the format MM/DD/YYYY";
  }
  return input;
};

const checkGender = (input) => {
  input = checkInputString(input, "Gender");
  input = input.toLowerCase();
  if (!/^(male|female|other)$/.test(input)) {
    throw "Gender should be male/female or others";
  }
  return input;
};

const checkObjectId = (input, name = "object id") => {
  //console.log("Inside checkObject");
  checkInputString(input, name);
  if (!ObjectId.isValid(input)) {
    throw `${name} must be a valid ObjectId`;
  }
  return input;
};

const checkAdress = (input, name = "address") => {
  if (typeof input !== "object") throw `${name} should be an object`;
  if (Object.keys(input).length !== 4)
    throw `${name} should have atleast 4 keys`;
  for (i of Object.keys(input)) {
    if (!["City", "State", "Country", "Zipcode"].includes(i))
      throw `${name} should have a City,State,Country,Zipcode`;
  }
  checkNames(input["City"]);
  checkNames(input["State"]);
  checkNames(input["Country"]);
  if (input["Zipcode"].length !== 5) throw "Zipcode should be a 5 digit number";
  if (isNaN(Number(input["Zipcode"])))
    throw `${input["Zipcode"]} should be a Number`;
  return input;
};

const checkEventDate = (input, name = "start date") => {
  checkInputString(input, name);
  const dateParsed = new Date(Date.parse(input));
  if (dateParsed.toISOString() != input) throw "Date format should be in ISO";
  return input;
};

const checkRsvpCount = (input, name = "rsvp") => {
  checkInputString(input, name);
  checkInputNumber(input, name);
  return input;
};

const checkEventType = (input, name = "event type") => {
  checkInputString(input, name);
  return input;
};

const checkArrayObjectId = (input, name = "countRsvp") => {
  if (!Array.isArray(input)) throw `${name} should be an array`;
  return input;
};

const checkTags = (input, name = "tags") => {
  if (!Array.isArray(input)) throw `${name} should be an array`;
  input.forEach((elem) => checkInputString(elem, name));
  return input;
};

const checkEventURl = (input, name = "eventUrl") => {
  try {
    let checkURL = new URL(input);
  } catch (e) {
    throw `${name} should be valid Url`;
  }
  return input;
};

const checkComments = (input, name = "comments") => {
  if (typeof input !== "object") throw `${name} should be of type object `;
  Object.keys(input).forEach((elem) => checkInputString(elem));
  if (
    !Object.keys(input).forEach((elem) =>
      ["user_id", "Name", "Comment", "Date"].includes(elem)
    )
  )
    throw `${name} should be user_id,Name,Comment,Date `;
  checkObjectId(input["user_id"]);
  checkNames(input["Name"]);
  checkInputString(input["Comment"]);
  checkDate(input["Date"]);
  return input;
};

const checkReviews = (input, name = "Reviews") => {
  if (typeof input !== "object") throw `${name} should be of type object `;
  Object.keys(input).forEach((elem) => checkInputString(elem));
  if (
    !Object.keys(input).forEach((elem) =>
      ["user_id", "Name", "Review", "Date", "Rating"].includes(elem)
    )
  )
    throw `${name} should be user_id,Name,Comment,Date `;
  checkObjectId(input["user_id"]);
  checkNames(input["Name"]);
  checkInputString(input["Review"]);
  checkDate(input["Date"]);
  checkInputNumber(input["Rating"]);
  if (Number(input["Rating"]) < 0) return "Rating cannot be less than 0";
  if (Number(input["Rating"]) > 5) return "Rating cannot be greater than 5";
  return input;
};

const checkUsername = (input) => {
  input = checkInputString(input, "username");
  if (!/^[a-zA-Z0-9]+$/.test(input)) {
    throw "Username must contain only letters and numbers";
  }
  return input;
};
const checkBool = (input, permission) => {
  if(!input || typeof input !== "boolean"){
    throw `${permission} not a boolean`;
  }
  return input;
}

module.exports = {
  checkInputString,
  checkNames,
  checkEmail,
  checkPassword,
  checkPhone,
  checkDate,
  checkGender,
  checkObjectId,
  checkUsername,
  checkTitle,
  checkAdress,
  checkEventDate,
  checkRsvpCount,
  checkEventType,
  checkArrayObjectId,
  checkTags,
  checkEventURl,
  checkComments,
  checkReviews,
  checkBool,
};
