import React from "react";
import { Checkbox, Divider, MenuItem, TextField } from "@mui/material";
import { genderOptions } from "../../constants";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
  usernameValidation,
} from "../../utils/helper";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SVGComponent from "../common/Logo";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import "./styles.css";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { toast } from "react-toastify";
import { signup } from "../../utils/apis/auth";
import Loading from "../common/Loading";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [signupData, setSignupData] = React.useState({
    dob: dayjs(new Date(+new Date() - (410200000000 + 86400000))),
  });
  const [errors, setErrors] = React.useState({});
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const validateData = async () => {
    if (Object.keys(signupData).length === 0) {
      return setErrors({
        firstName: true,
        lastName: true,
        username: true,
        phone: true,
        dob: true,
        gender: true,
        email: true,
        password: true,
        cpassword: true,
        agreedTerms: true,
      });
    }

    const errorObj = {};
    if (!signupData?.firstName) errorObj.firstName = true;
    if (!signupData?.agreedTerms) errorObj.agreedTerms = true;
    if (!signupData?.username) errorObj.username = true;
    if (!signupData?.lastName) errorObj.lastName = true;
    if (!signupData?.email) errorObj.email = true;
    if (!signupData?.phone) errorObj.phone = true;
    if (!signupData?.dob) errorObj.dob = true;
    if (!signupData?.gender) errorObj.gender = true;
    if (!signupData?.password) errorObj.password = true;
    if (
      !signupData?.cpassword ||
      signupData?.password !== signupData?.cpassword
    )
      errorObj.cpassword = true;

    if (Object.keys(errorObj).length !== 0) return setErrors(errorObj);
    else setErrors({});

    setLoading(true);
    const {
      firstName,
      lastName,
      username,
      email,
      phone,
      dob,
      gender,
      password,
    } = signupData;

    const today = new Date(dob);
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = mm + "/" + dd + "/" + yyyy;
    const apiBody = {
      firstName,
      lastName,
      username,
      email,
      password,
      phone,
      dob: formattedToday,
      gender,
    };

    const singupInfo = await signup(apiBody);

    const { data, status } = singupInfo;
    if (status !== 201) toast.error(data?.error);
    else {
      toast.success(
        "User registered successfully. Please check your inbox to verify your account."
      );
      setTimeout(() => navigate("/"), 4000);
    }
    setLoading(false);
  };

  const setValues = (name, value) => {
    setSignupData({ ...signupData, [name]: value });
  };

  const setError = (name) => {
    setErrors({ ...errors, [name]: true });
  };

  const removeError = (name) => {
    const errorObj = errors;
    delete errorObj[name];
    setErrors(errorObj);
  };

  const handleClickShowPassword = () =>
    setPasswordVisibility(!passwordVisibility);

  return (
    <div className="min-h-full py-8 lg:py-2 md:py-5 px-4 sm:px-6 lg:px-8">
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
                size="small"
                id="firstName"
                label="First Name"
                variant="outlined"
                error={errors?.firstName}
                required
                fullWidth
                type="text"
                value={signupData?.firstName}
                name="firstName"
                margin="dense"
                placeholder="John"
                helperText={
                  errors?.firstName ? (
                    <span className=" flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid first name
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
                size="small"
                id="lastName"
                label="Last Name"
                name="lastName"
                error={errors?.lastName}
                variant="outlined"
                required
                fullWidth
                type="text"
                margin="dense"
                value={signupData?.lastName}
                placeholder="Doe"
                helperText={
                  errors?.lastName ? (
                    <span className=" flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid last name
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

          <div className="flex justify-between">
            <div className="mr-1 w-6/12">
              <TextField
                size="small"
                id="email"
                label="Email"
                variant="outlined"
                required
                type="email"
                fullWidth
                margin="dense"
                value={signupData?.email ?? ""}
                name="email"
                placeholder="johndoe@example.com"
                helperText={
                  errors?.email ? (
                    <span className=" flex items-center">
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
            <div className="ml-1 w-6/12">
              <TextField
                size="small"
                id="username"
                label="Username"
                variant="outlined"
                error={errors?.username}
                required
                fullWidth
                type="text"
                value={signupData?.username}
                name="username"
                margin="dense"
                placeholder="johndoe"
                helperText={
                  errors?.username ? (
                    <span className=" flex items-center">
                      <CloseIcon fontSize="small" />
                      Enter a valid username
                    </span>
                  ) : (
                    false
                  )
                }
                onChange={(e) => {
                  let { name, value } = e.target;
                  if (value === "") setError(name);
                  if (!usernameValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
          </div>
          <div className="my-1">
            <div className="flex justify-between">
              <div className="mr-1 w-6/12">
                <TextField
                  size="small"
                  id="phone"
                  label="Phone"
                  variant="outlined"
                  required
                  fullWidth
                  type="phone"
                  margin="dense"
                  name="phone"
                  error={errors?.phone}
                  placeholder="1234567899"
                  value={signupData?.phone ?? ""}
                  helperText={
                    errors?.phone ? (
                      <span className=" flex items-center">
                        <CloseIcon fontSize="small" />
                        Enter a valid phone number
                      </span>
                    ) : (
                      false
                    )
                  }
                  onChange={(e) => {
                    let { name, value } = e.target;
                    if (value === "") setError(name);
                    if (value.length < 10 || value.length > 10) setError(name);
                    else removeError(name);
                    setValues(name, value);
                  }}
                />
              </div>
              <div className="ml-1 w-6/12">
                <div className="mt-2">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Date of birth"
                      disableFuture
                      inputFormat="MM/DD/YYYY"
                      value={signupData?.dob ?? null}
                      renderInput={(params) => (
                        <TextField
                          size="small"
                          required
                          onKeyDown={(e) => e.preventDefault()}
                          error={errors?.dob}
                          helperText={
                            errors?.dob ? (
                              <span className="helperText__dob  flex items-center">
                                <CloseIcon fontSize="small" />
                                Enter a valid date
                              </span>
                            ) : (
                              false
                            )
                          }
                          {...params}
                        />
                      )}
                      onChange={(e) => {
                        if (e === null) removeError("dob");
                        setValues("dob", e);
                      }}
                      onError={(e, f) => {
                        if (e === "invalidDate") setError("dob");
                        if (e === null) removeError("dob");
                      }}
                      maxDate={dayjs(
                        new Date(+new Date() - 410200000000 - 86400000)
                      )}
                      minDate={dayjs(new Date(+new Date() - 3156000000000))}
                      openTo={"day"}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          </div>

          <div className="my-1">
            <TextField
              size="small"
              id="gender"
              select
              label="Select gender"
              fullWidth
              required
              margin="dense"
              value={signupData?.gender ?? ""}
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
              <span className="helperText__gender flex items-center ">
                <CloseIcon fontSize="small" />
                Choose a gender
              </span>
            )}
          </div>

          <div className="my-1 relative">
            <TextField
              size="small"
              id="password"
              label="Password"
              variant="outlined"
              required
              fullWidth
              type={passwordVisibility ? "text" : "password"}
              margin="dense"
              name="password"
              placeholder="********"
              value={signupData?.password ?? ""}
              error={errors?.password}
              helperText={
                errors?.cpassword ? (
                  <span className=" flex items-center">
                    <CloseIcon fontSize="small" />
                    Password cannot be empty
                  </span>
                ) : (
                  false
                )
              }
              onChange={(e) => {
                let { name, value } = e.target;
                if (value === "") {
                  setError(name);
                  setValues(name, value);
                }
                if (!passwordValidation(value)) {
                  setError(name);
                  setValues(name, value);
                } else removeError(name);
                if (
                  signupData?.cpassword &&
                  signupData?.cpassword !== "" &&
                  value !== signupData?.cpassword
                )
                  setError("cpassword");
                else removeError("cpassword");
                setValues(name, value);
              }}
            />

            <div
              className="show_pass_btn__signup"
              onClick={handleClickShowPassword}
            >
              {passwordVisibility ? (
                <VisibilityIcon fontSize="medium" />
              ) : (
                <VisibilityOffIcon fontSize="medium" />
              )}
            </div>

            {signupData?.password && (
              <div className="flex flex-col">
                <span
                  className={`${
                    !signupData?.password
                      ? "password__blank"
                      : !/[a-z]/g.test(signupData.password)
                      ? "password__error"
                      : "password__correct"
                  }`}
                >
                  {!signupData?.password ? null : !/[a-z]/g.test(
                      signupData.password
                    ) ? (
                    <CloseIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  Password must contain atleast one lowercase letter e.g.
                  a,b,c..
                </span>
                <span
                  className={`${
                    !signupData?.password
                      ? "password__blank"
                      : !/[A-Z]/g.test(signupData.password)
                      ? "password__error"
                      : "password__correct"
                  }`}
                >
                  {!signupData?.password ? null : !/[A-Z]/g.test(
                      signupData.password
                    ) ? (
                    <CloseIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  Password must contain atleast one uppercase letter e.g.
                  A,B,C..
                </span>
                <span
                  className={`${
                    !signupData?.password
                      ? "password__blank"
                      : !/[0-9]/g.test(signupData.password)
                      ? "password__error"
                      : "password__correct"
                  }`}
                >
                  {!signupData?.password ? null : !/[0-9]/g.test(
                      signupData.password
                    ) ? (
                    <CloseIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  Password must contain atleast one number e.g. 1,2,3...
                </span>
                <span
                  className={`${
                    !signupData?.password
                      ? "password__blank"
                      : signupData?.password?.length < 8 ||
                        signupData?.password?.length > 20
                      ? "password__error"
                      : "password__correct"
                  }`}
                >
                  {!signupData?.password ? null : signupData?.password?.length <
                      8 || signupData?.password?.length > 20 ? (
                    <CloseIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  Password must contain atleast 8 or more characters and less
                  than 20 characters
                </span>
              </div>
            )}
          </div>

          <div className="my-1">
            <TextField
              size="small"
              id="cpassword"
              label="Confirm Password"
              variant="outlined"
              required
              fullWidth
              margin="dense"
              type="password"
              name="cpassword"
              value={signupData?.cpassword ?? ""}
              error={errors?.cpassword}
              placeholder="********"
              helperText={
                errors?.cpassword ? (
                  <span className=" flex items-center">
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
                if (signupData?.password !== value) setError(name);
                else removeError(name);
                setValues(name, value);
              }}
            />
          </div>

          <div className="flex items-center">
            <Checkbox
              checked={signupData?.agreedTerms}
              onChange={(e) => {
                setValues("agreedTerms", e.target.checked);
                removeError("agreedTerms");
              }}
            />
            <div
              className={`text-lg${
                errors.agreedTerms ? " text-[#d32f2f]" : ""
              }`}
            >
              I have read and agreed to the{" "}
              <Link to="/privacy-policy" target="_blank">
                <span className="underline text-logoBlue">
                  terms and privacy policy
                </span>
              </Link>
              .
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={validateData}
              className="btn_default flex items-center"
              disabled={loading}
            >
              <Loading loading={loading} width={18} />
              Sign up
            </button>
          </div>
          <div className="mt-3">
            <Divider />
            <div className="text-xl text-black flex">
              Have a account? &nbsp;
              <div
                onClick={() => navigate("/login")}
                className="text-[#393e46] cursor-pointer hover:underline"
              >
                Sign in
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
