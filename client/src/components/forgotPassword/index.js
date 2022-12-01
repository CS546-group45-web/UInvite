import React from "react";
import { Divider, Link, TextField } from "@mui/material";
import { emailValidation } from "../../utils/helper";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";
import SVGComponent from "../common/Logo";

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
    <div className="flex min-h-full justify-center items-center py-8 lg:py-6 md:py-5 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-4">
        <div className="flex items-center flex-col">
          <div className="w-40">
            <SVGComponent />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Forgot password
          </h2>
        </div>
        <div className="space-y-4">
          <div className="-space-y-px rounded-md p-4">
            <div className="text-lg mb-4">
              Enter the email address you used while creating account
            </div>
            <TextField
              className="my-2"
              id="forgotpassword-email"
              label="Email"
              variant="outlined"
              required
              type="text"
              fullWidth
              margin="dense"
              placeholder="johndoe@example.com"
              name="email"
              error={error}
              value={email}
              helperText={
                error ? (
                  <span className="text-base flex items-center">
                    <CloseIcon fontSize="small" />
                    Please enter a valid email
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
            <div className="flex items-center pt-4">
              <button
                className="btn_default"
                onClick={validateData}
                disabled={error}
              >
                Submit
              </button>
            </div>
          </div>

          <div>
            <Divider />
            <Link
              href="/login"
              underline="hover"
              className="flex items-center"
              color="#393e46"
            >
              {/* <KeyboardBackspaceIcon color="primary" /> */}
              <div className="text-xl ml-1"> back to login</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
