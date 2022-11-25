import React from "react";
import { Divider, Link, MenuItem, TextField } from "@mui/material";
import { genderOptions } from "../../constants";
import {
  validateDate,
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../../utils/helper";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SVGComponent from "../common/Logo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import "./styles.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
function SignUp() {
  const [data, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validateData = () => {
    if (Object.keys(data).length === 0) {
      return setErrors({
        firstName: true,
        lastName: true,
        phone: true,
        dob: true,
        gender: true,
        email: true,
        password: true,
        cpassword: true,
      });
    }

    const errorObj = {};
    if (!data?.firstName) errorObj.firstName = true;
    if (!data?.lastName) errorObj.lastName = true;
    if (!data?.email) errorObj.email = true;
    if (!data?.phone) errorObj.phone = true;
    if (!data?.dob) errorObj.dob = true;
    if (!data?.gender) errorObj.gender = true;
    if (!data?.password) errorObj.password = true;
    if (!data?.cpassword) errorObj.cpassword = true;

    if (Object.keys(errorObj).length !== 0) setErrors(errorObj);
    else {
      setErrors({});
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
    <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center">
        <div className="flex items-center flex-col p-16">
          <div className="w-60">
            <SVGComponent />
          </div>
          <h2 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>
        <div className="rounded-md px-4">
          <div className="flex justify-between">
            <div className="mr-1 w-6/12">
              <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                error={errors?.firstName}
                required
                fullWidth
                type="text"
                value={data?.firstName}
                name="firstName"
                margin="dense"
                placeholder="John"
                helperText={
                  errors?.firstName ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid First Name
                    </span>
                  ) : (
                    false
                  )
                }
                onChange={(e) => {
                  let { name, value } = e.target;
                  if (value === "") setError(name);
                  if (!nameValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
            <div className="ml-1 w-6/12">
              <TextField
                id="lastName"
                label="Last Name"
                name="lastName"
                error={errors?.lastName}
                variant="outlined"
                required
                fullWidth
                type="text"
                margin="dense"
                value={data?.lastName}
                placeholder="Doe"
                helperText={
                  errors?.lastName ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid Last Name
                    </span>
                  ) : (
                    false
                  )
                }
                onChange={(e) => {
                  let { name, value } = e.target;
                  if (value === "") setError(name);
                  if (!nameValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
          </div>

          <div>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              required
              type="email"
              fullWidth
              margin="dense"
              value={data?.email ?? ""}
              name="email"
              placeholder="johndoe@example.com"
              helperText={
                errors?.email ? (
                  <span className="text-base flex items-center">
                    <CloseIcon fontSize="small" />
                    Enter a valid email
                  </span>
                ) : (
                  false
                )
              }
              error={errors?.email}
              onChange={(e) => {
                let { name, value } = e.target;
                if (value === "") setError(name);
                if (!emailValidation(value)) setError(name);
                else removeError(name);
                setValues(name, value);
              }}
            />
          </div>
          <div className="my-1">
            <div className="flex justify-between">
              <div className="mr-1 w-6/12">
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
                  placeholder="1234567899"
                  value={data?.phone ?? ""}
                  helperText={
                    errors?.phone ? (
                      <span className="text-base flex items-center">
                        <CloseIcon fontSize="small" />
                        Enter a valid phone number
                      </span>
                    ) : (
                      false
                    )
                  }
                  onChange={(e) => {
                    let { name, value } = e.target;
                    value = value.trim();
                    if (value === "") setError(name);
                    else {
                      if (value.length < 10 || value.length > 10)
                        setError(name);
                      else removeError(name);
                      setValues(name, value);
                    }
                  }}
                />
              </div>
              <div className="ml-1 w-6/12">
                {/* <TextField
                  // ref={ref}
                  id="dob"
                  label="Date of birth"
                  variant="outlined"
                  required
                  fullWidth
                  margin="dense"
                  name="dob"
                  placeholder="07/27/1998"
                  value={data?.dob ?? ""}
                  error={errors?.dob}
                  helperText={
                    errors?.dob ? (
                      <span className="text-base flex items-center">
                        <CloseIcon fontSize="small" />
                        Enter a valid date
                      </span>
                    ) : (
                      false
                    )
                  }
                  onChange={(e) => {
                    console.log(e);
                    let { name, value } = e.target;
                    if (value.trim() === "") setError(name);

                    if (!validateDate(value)) setError(name);
                    else removeError(name);
                    if (value.length > 2) value += "/";
                    if (value.length > 5) value += "/";
                    setValues(name, value);
                  }}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDateTimePicker inputFormat="MM/DD/YYYY" />
                </LocalizationProvider>
                {/* <input ref={ref} /> */}
              </div>
            </div>
          </div>

          <div className="my-1">
            <TextField
              id="gender"
              select
              label="Select gender"
              fullWidth
              required
              margin="dense"
              value={data?.gender ?? ""}
              name="gender"
              placeholder="select a gender"
              error={errors?.gender}
              onChange={(e) => {
                const { name, value } = e.target;
                if (value !== "") {
                  setValues(name, value);
                  removeError(name);
                } else setError(name);
              }}
            >
              {genderOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {errors?.gender && (
              <span className="helperText__gender text-base flex items-center ">
                <CloseIcon fontSize="small" />
                Choose a gender
              </span>
            )}
          </div>

          <div className="my-1">
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              required
              fullWidth
              type="password"
              margin="dense"
              name="password"
              placeholder="********"
              value={data?.password ?? ""}
              error={errors?.password}
              onChange={(e) => {
                let { name, value } = e.target;
                if (value === "") setError(name);
                if (!passwordValidation(value)) setError(name);
                else removeError(name);
                setValues(name, value);
              }}
            />
            <div className="flex flex-col text-base">
              <span
                className={`${
                  !data?.password
                    ? "password__blank"
                    : !/[a-z]/g.test(data.password)
                    ? "password__error"
                    : "password__correct"
                }`}
              >
                {!data?.password ? null : !/[a-z]/g.test(data.password) ? (
                  <CloseIcon />
                ) : (
                  <CheckIcon />
                )}
                Password must contain atleast one lowercase letter e.g. a,b,c..
              </span>
              <span
                className={`${
                  !data?.password
                    ? "password__blank"
                    : !/[A-Z]/g.test(data.password)
                    ? "password__error"
                    : "password__correct"
                }`}
              >
                {!data?.password ? null : !/[A-Z]/g.test(data.password) ? (
                  <CloseIcon />
                ) : (
                  <CheckIcon />
                )}
                Password must contain atleast one uppercase letter e.g. A,B,C..
              </span>
              <span
                className={`${
                  !data?.password
                    ? "password__blank"
                    : !/[0-9]/g.test(data.password)
                    ? "password__error"
                    : "password__correct"
                }`}
              >
                {!data?.password ? null : !/[0-9]/g.test(data.password) ? (
                  <CloseIcon />
                ) : (
                  <CheckIcon />
                )}
                Password must contain atleast one number e.g. 1,2,3...
              </span>
              <span
                className={`${
                  !data?.password
                    ? "password__blank"
                    : data?.password?.length < 8 || data?.password?.length > 20
                    ? "password__error"
                    : "password__correct"
                }`}
              >
                {!data?.password ? null : data?.password?.length < 8 ||
                  data?.password?.length > 20 ? (
                  <CloseIcon />
                ) : (
                  <CheckIcon />
                )}
                Password must contain atleast 8 or more characters and less than
                20 characters
              </span>
            </div>
          </div>

          <div className="my-1">
            <TextField
              id="cpassword"
              label="Confirm Password"
              variant="outlined"
              required
              fullWidth
              margin="dense"
              type="password"
              name="cpassword"
              value={data?.cpassword ?? ""}
              error={errors?.cpassword}
              placeholder="********"
              helperText={
                errors?.cpassword ? (
                  <span className="text-base flex items-center">
                    <CloseIcon fontSize="small" />
                    Confirm password should match the password
                  </span>
                ) : (
                  false
                )
              }
              onChange={(e) => {
                let { name, value } = e.target;
                if (value === "") setError(name);
                if (data?.password !== value) setError(name);
                else removeError(name);
                setValues(name, value);
              }}
            />
          </div>

          <div className="flex justify-center">
            <button onClick={validateData} className="btn_default">
              Sign up
            </button>
          </div>
          <div className="mt-3">
            <Divider />
            <div className="text-xl text-black">
              Have a account? &nbsp;
              <Link href="/login" underline="hover" color="#393e46">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
