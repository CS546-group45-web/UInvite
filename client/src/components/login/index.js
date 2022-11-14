import React from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Link,
  TextField,
} from "@mui/material";

function Login() {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
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
        <div className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
              fullWidth
              margin="normal"
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              required
              fullWidth
              margin="normal"
            />
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
            <Button variant="contained">Sign in</Button>
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
