import React from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  // IconButton,
  // InputAdornment,
  Link,
  TextField,
  // OutlinedInput,
} from "@mui/material";
import { emailValidation, passwordValidation } from "../../utils/helper";
import { redirect, useNavigate } from "react-router-dom";
// import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const navigate = useNavigate();
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
    // TODO: configure the post login procedure
    localStorage.setItem("auth", true);

    window.location.href = "/";
    // FIXME: fix the redirect issue
    // redirect("/");
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
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com"
            alt="UInvite Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="space-y-4">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <TextField
                className="my-2"
                id="email"
                label="Email"
                variant="outlined"
                required
                type="text"
                fullWidth
                margin="dense"
                name="email"
                error={errors?.email}
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
              {/* <OutlinedInput */}
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
                error={errors?.password}
                value={data?.password}
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
                // endAdornment={
                //   <InputAdornment position="end">
                //     <IconButton
                //       aria-label="toggle password visibility"
                //       onClick={handleClickShowPassword}
                //       onMouseDown={handleMouseDownPassword}
                //       edge="end"
                //     >
                //       {passwordVisibility ? <VisibilityOff /> : <Visibility />}
                //     </IconButton>
                //   </InputAdornment>
                // }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
              />
            </div>

            <div className="text-md">
              <Link href="/forgetPassword" underline="hover">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              variant="contained"
              onClick={validateData}
              disabled={errors?.password || errors?.email}
            >
              Sign in
            </Button>
          </div>
        </div>
        <div>
          <Divider light />
          <div className="text-xl">
            New user?&nbsp;
            <Link href="/signup" underline="hover">
              Create new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
