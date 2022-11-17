// this method will return true if email is valid and false if not.
export const emailValidation = (email) => {
  const regex = /^\w+([.-]?\w+)*@[a-zA-Z]+([.-]?[a-zA-Z]+)*(\.[a-zA-Z]{2,3})+$/;
  return regex.test(email);
};

// this function will return true if password is correct or else will return an error
// NOTE: Think about more cases to make password strong
export const passwordValidation = (password) => {
  password = password.trim();
  if (password.length < 8 || password.length > 20)
    return "Password must contain more than 8 and less than 20 characters!";
  if (!/[0-9]/g.test(password))
    return "Password must contain atleast one digit!";
  if (!/[A-Z]/g.test(password))
    return "Password must contain atleast one uppercase letter!";
  if (!/[a-z]/g.test(password))
    return "Password must contain atleast one lowercase letter!";

  return "valid";
};

export const nameValidation = (name) => {
  const regex = /^[a-zA-Z]{2,20}$/;
  return regex.test(name);
};

export const phoneNumber = () => {};

export const formatPhoneNumber = (value) => {
  if (value.length === 1) return "+1 (" + value;
  if (value.length === 7) return value + ") ";
  if (value.length === 12) return value + " - ";
  if (value.length > 13) return value;
};
