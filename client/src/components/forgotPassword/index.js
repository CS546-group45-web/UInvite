import React from "react";
import { Button, Divider, Link, TextField } from "@mui/material";
import { emailValidation } from "../../utils/helper";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import "./styles.css";

function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  // const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const [error, setError] = React.useState(false);

  const validateData = (e) => {
    e.preventDefault();
    if (!emailValidation(email)) {
      setError(true);
      return;
    }
    if (!error) {
      window.location.href = "/";
    }
  };

  React.useEffect(() => {}, []);

  return (
    <div className="flex min-h-full justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com"
            alt="UInvite Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Forgot password
          </h2>
        </div>
        <div className="space-y-4">
          <div className="-space-y-px rounded-md shadow-sm">
            <h5>Enter the email address you used while creating account</h5>
            <TextField
              className="my-2"
              id="forgotpassword-email"
              label="Email"
              variant="outlined"
              required
              type="text"
              fullWidth
              margin="dense"
              name="email"
              error={error}
              value={email}
              helperText={
                error ? (
                  <span className="forgot-password-helpertext">
                    Invalid email address
                  </span>
                ) : (
                  false
                )
              }
              onChange={(e) => {
                let { value } = e.target;
                value = value.trim();
                if (value === "") setError(true);
                if (!emailValidation(value)) setError(true);
                else setError(false);
                setEmail(value);
              }}
            />
          </div>

          <div className="flex items-center">
            <Button variant="contained" onClick={validateData} disabled={error}>
              Submit
            </Button>
          </div>
          <div>
            <Divider />
            <Link href="/login" underline="hover" className="flex items-center">
              <KeyboardBackspaceIcon color="primary" />
              <div className="text-xl ml-1"> back to login</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
