import React from "react";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  TextField,
} from "@mui/material";
import { emailValidation, passwordValidation } from "../../utils/helper";

import CloseIcon from "@mui/icons-material/Close";
import SVGComponent from "../common/Logo";

function Login() {
  const [data, setData] = React.useState({ email: "", password: "" });
  // const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const [errors, setErrors] = React.useState({ email: false, password: false });

  const setError = (name) => {
    setErrors({ ...errors, [name]: true });
  };

  const removeError = (name) => {
    const errorsObj = errors;
    delete errorsObj[name];
    setErrors(errorsObj);
  };

  const setValues = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const validateData = (e) => {
    e.preventDefault();
    const { email, password } = data;

    let errorObj = {};
    if (!emailValidation(email)) errorObj.email = true;

    if (passwordValidation(password) !== "valid") errorObj.password = true;

    setErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      // TODO: configure the post login procedure
      localStorage.setItem("auth", true);

      window.location.href = "/";
      // FIXME: fix the redirect issue
    } // redirect("/");
    // navigate("/");
  };

  // const handleClickShowPassword = () => {
  //   setPasswordVisibility(!passwordVisibility);
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();

  //   setPasswordVisibility(!passwordVisibility);
  // };

  React.useEffect(() => {}, []);

  return (
    <div className="flex min-h-full justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div className="flex items-center flex-col">
          <div className="w-40">
            <SVGComponent />
          </div>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="space-y-4 p-4">
          <div className="-space-y-px rounded-md">
            <div>
              <TextField
                className="my-2"
                id="email"
                label="Email"
                variant="outlined"
                required
                type="text"
                fullWidth
                placeholder="johndoe@example.com"
                margin="dense"
                name="email"
                error={errors?.email}
                helperText={
                  errors?.email ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Please enter a valid email
                    </span>
                  ) : (
                    false
                  )
                }
                value={data?.email}
                onChange={(e) => {
                  // TODO: confirm if the error should be displayed as soon as the user starts to enter the email or after clicking on submit
                  let { name, value } = e.target;
                  value = value.trim();
                  if (value === "") setError(name);
                  if (!emailValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
            <div>
              {/* TODO: add eye button to toggle for password */}
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                required
                fullWidth
                type="password"
                // type={passwordVisibility ? "text" : "password"}
                margin="dense"
                name="password"
                placeholder="********"
                error={errors?.password}
                value={data?.password}
                helperText={
                  errors?.password ? (
                    <span className="text-base flex items-center">
                      <CloseIcon fontSize="small" />
                      Password cannot be less than 8 characters
                    </span>
                  ) : (
                    false
                  )
                }
                onChange={(e) => {
                  // password will come here
                  let { name, value } = e.target;
                  value = value.trim();
                  if (value === "") setError(name);
                  if (!passwordValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-logoBlue">
            <div className="flex items-center">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
            </div>

            <div className="text-lg">
              <Link href="/forgot-password" underline="hover" color="#393e46">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              className="btn_default"
              onClick={validateData}
              disabled={errors?.password || errors?.email}
            >
              Sign in
            </button>
          </div>
        </div>
        <div>
          <Divider />
          <div className="text-xl text-black">
            New user?&nbsp;
            <Link href="/signup" underline="hover" color="#393e46">
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
