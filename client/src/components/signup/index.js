import React from "react";
import { Button, Divider, Link, MenuItem, TextField } from "@mui/material";
import { genderOptions } from "../../constants";

function SignUp() {
  const [gender, setGender] = React.useState("Male");
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
            Create your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <div className="space-y rounded-md shadow-sm">
            <div className="flex justify-between">
              <div className="mr-2">
                <TextField
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  required
                  margin="normal"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </div>
              <div className="ml-2">
                <TextField
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  required
                  margin="normal"
                />
              </div>
            </div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              required
              fullWidth
              margin="dense"
            />
            <div className="my-3">
              <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                required
                fullWidth
                margin="dense"
              />
            </div>

            <div className="my-3">
              <TextField
                id="outlined-basic"
                label="Date of birth"
                variant="outlined"
                required
                fullWidth
                margin="dense"
              />
            </div>
            <div className="my-3">
              <TextField
                id="outlined-select-gender"
                select
                label="Select gender"
                fullWidth
                required
                value={gender}
                //   onChange={handleChange}
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
                    id="outlined-basic"
                    label="Password"
                    variant="outlined"
                    required
                    fullWidth
                    margin="dense"
                  />
                </div>
                <div className="ml-2">
                  <TextField
                    id="outlined-basic"
                    label="Comfirm Password"
                    variant="outlined"
                    required
                    fullWidth
                    margin="dense"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <Button variant="contained">Sign up</Button>
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
