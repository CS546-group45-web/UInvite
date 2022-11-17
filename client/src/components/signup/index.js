import React from "react";
import { Button, Divider, Link, MenuItem, TextField } from "@mui/material";
import { genderOptions } from "../../constants";
import {
  emailValidation,
  formatPhoneNumber,
  nameValidation,
  passwordValidation,
} from "../../utils/helper";

function SignUp() {
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = React.useState({});

  const validateData = () => {
    if (Object.keys(data).length === 0) {
      setErrors({
        firstName: true,
      });
    }
  };

  const setValues = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const setError = (name) => {
    setErrors({ ...errors, [name]: true });
  };
  const removeError = (name) => {
    const errorObj = errors;
    delete errorObj[name];
    setErrors(errorObj);
  };

  // FIXME: This form needs more CSS fixes

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com"
            alt="UInvite Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="space-y-4">
          <div className="space-y rounded-md shadow-sm">
            <div className="flex justify-between">
              <div className="">
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="outlined"
                  error={errors?.firstName}
                  required
                  type="text"
                  value={data?.firstName}
                  name="firstName"
                  margin="normal"
                  onChange={(e) => {
                    let { name, value } = e.target;
                    value = value.trim();
                    if (value === "") setError(name);
                    if (!nameValidation(value)) setError(name);
                    else removeError(name);
                    setValues(name, value.trim());
                  }}
                />
              </div>
              <div className="ml-2">
                <TextField
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  error={errors?.lastName}
                  variant="outlined"
                  required
                  type="text"
                  margin="normal"
                  value={data?.lastName}
                  onChange={(e) => {
                    let { name, value } = e.target;
                    value = value.trim();
                    if (value === "") setError(name);
                    if (!nameValidation(value)) setError(name);
                    else removeError(name);
                    setValues(name, value.trim());
                  }}
                />
              </div>
            </div>

            <div className="">
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                required
                type="email"
                fullWidth
                margin="normal"
                name="email"
                error={errors?.email}
                onChange={(e) => {
                  let { name, value } = e.target;
                  value = value.trim();
                  if (value === "") setError(name);
                  if (!emailValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
            <div className="my-3">
              <TextField
                id="phone"
                label="Phone"
                variant="outlined"
                required
                fullWidth
                type="text"
                margin="dense"
                name="phone"
                error={errors?.phone}
                value={data.phone}
                onChange={(e) => {
                  let { name, value } = e.target;
                  value = value.trim();
                  if (value === "") setError(name);
                  else {
                    value = formatPhoneNumber(value);
                    console.log(value);
                    setValues(name, value);
                  }
                }}
              />
            </div>

            <div className="my-3">
              <TextField
                id="dob"
                label="Date of birth"
                variant="outlined"
                required
                fullWidth
                margin="dense"
                name="dob"
                error={errors.dob}
                onChange={(e) => {}}
              />
            </div>
            <div className="my-3">
              <TextField
                id="gender"
                select
                label="Select gender"
                fullWidth
                required
                value={""}
                name="gender"
                error={errors?.gender}
                onChange={(e) => {}}
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>

            <div className="my-3">
              <div className="flex justify-between">
                <div className="mr-2">
                  <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    required
                    fullWidth
                    type="password"
                    margin="dense"
                    name="password"
                    error={errors?.password}
                    // USEFUL: can use helpertext to display errors while logging in
                    // helperText={<h1 className="mt-20">Incorrect entry</h1>}
                    onChange={(e) => {
                      // password will come here
                      let { name, value } = e.target;
                      value = value.trim();
                      if (value === "") setError(name);
                      if (passwordValidation(value) !== "valid") setError(name);
                      else removeError(name);
                      setValues(name, value);
                    }}
                  />
                </div>
                <div className="ml-2">
                  <TextField
                    id="cpassword"
                    label="Confirm Password"
                    variant="outlined"
                    required
                    fullWidth
                    margin="dense"
                    type="password"
                    name="cpassword"
                    error={errors?.cpassword}
                    // USEFUL: can use helpertext to display errors while logging in
                    // helperText={<h1 className="mt-20">Incorrect entry</h1>}
                    onChange={(e) => {
                      // password will come here
                      let { name, value } = e.target;
                      value = value.trim();
                      if (value === "") setError(name);
                      if (passwordValidation(value) !== "valid") setError(name);
                      else removeError(name);
                      setValues(name, value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <Button variant="contained" onClick={validateData}>
              Sign up
            </Button>
          </div>
        </div>
        <div>
          <Divider />
          <div className="text-xl">
            Have a account? &nbsp;
            <Link href="/login" underline="hover">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
