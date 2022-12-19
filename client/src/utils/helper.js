import moment from "moment/moment";

// this method will return true if email is valid and false if not.
export const emailValidation = (email) => {
  const regex =
    /^\w+([.-]?\w+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,3})+$/;
  return regex.test(email);
};

// this function will return true if password is correct or else will return an error
export const passwordValidation = (password) => {
  if (!password) return false;
  // password = password.trim();
  if (password === "") return false;
  if (password.length < 8 || password.length > 20)
    // return "Password must contain more than 8 and less than 20 characters!";
    return false;
  if (!/[0-9]/g.test(password)) return false;
  // return "Password must contain atleast one number!";
  if (!/[A-Z]/g.test(password)) return false;
  // return "Password must contain atleast one uppercase letter!";
  if (!/[a-z]/g.test(password)) return false;
  // return "Password must contain atleast one lowercase letter!";

  return true;
};

export const nameValidation = (name) => {
  const regex = /^[a-zA-Z ]{2,20}$/;
  return regex.test(name);
};

export const usernameValidation = (name) => {
  const regex = /^[a-zA-Z0-9]{6,20}$/;
  return regex.test(name);
};

export const phoneNumber = (phone) => {};

export const formatPhoneNumber = (value) => {
  if (value.length === 1) return "+1 (" + value;
  if (value.length === 7) return value + ") ";
  if (value.length === 12) return value + " - ";
  if (value.length > 13) return value;
};

export const validateDate = (date) => {
  if (
    date.trim().length === 0 ||
    !date.match(/^\d{2}\/\d{2}\/\d{4}$/) ||
    !new Date(date).getTime() ||
    !(
      Number(date.slice(-4)) < new Date().getFullYear() + 2 &&
      Number(date.slice(-4)) > 1900
    ) ||
    !moment(date, "MM/DD/YYYY").isValid()
  ) {
    return false;
  }
  return true;
};

export const fullNameFormatter = (first, last) =>
  first?.charAt(0).toUpperCase() +
  first?.slice(1) +
  " " +
  last?.charAt(0).toUpperCase() +
  last?.slice(1);

export const phoneNumberFormatter = (phone) =>
  "+1".concat(
    " (",
    phone?.slice(0, 3),
    ") ",
    phone?.slice(3, 6),
    "-",
    phone?.slice(6)
  );

export const capitalizeFirstLetter = (str) =>
  str?.charAt(0).toUpperCase() + str?.slice(1);

export const getAddressFormatted = (address) =>
  address?.street + ", " + address?.City + ", " + address?.Zipcode;

export const dataURLtoFile = (dataurl, filename) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename + ".png", { type: mime });
};

export const eventNameValidation = (name) => {
  const regex = /^[a-zA-Z!-@+#$&". ]{4,}$/;
  return regex.test(name);
};

export const validateUrl = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

export const validateTags = (value) => {
  const regexTags = /^[A-Za-z0-9]+((,)[ A-Za-z0-9]+)*[A-Za-z0-9]+$/g;
  return regexTags.test(value);
};

export const validateDescription = (value) => value.length > 20;
export const validateComment = (value) => value.trim().length > 0;

export const validateDateDiff = (startDate, endDate) => {
  startDate = new Date(startDate).getTime();
  endDate = new Date(endDate).getTime();
  return endDate - startDate > 3600000;
};

export const isEventFinished = (endDate) => {
  const today = new Date().getTime();
  endDate = new Date(endDate).getTime();
  return today - endDate > 0;
};
