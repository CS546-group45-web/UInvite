import React from "react";
import { Divider, Link, TextField } from "@mui/material";
import { emailValidation } from "../../utils/helper";
import CloseIcon from "@mui/icons-material/Close";
import "./styles.css";
import SVGComponent from "../common/Logo";
import { forgotpassword } from "../../utils/apis/auth";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import { useNavigate } from "react-router";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  // const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [resetSuccess, setResetSuccess] = React.useState(false);

  const validateData = async (e) => {
    e.preventDefault();
    if (!emailValidation(email)) return setError(true);

    if (!error) {
      setLoading(true);
      const response = await forgotpassword({ email: email });
      const { status, data } = response;
      if (status !== 200) toast.error(data?.error);
      else setResetSuccess(true);
      setLoading(false);
    }
    setLoading(false);
  };

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
          {resetSuccess ? (
            <div className="text-2xl">
              We have sent you an email with a password reset link to reset the
              password.
            </div>
          ) : (
            <div className="-space-y-px rounded-md px-4">
              <div className="text-lg mb-4">
                Enter the email address associated with your account and we'll
                send you a link to reset your password.
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
                  className="btn_default flex items-center"
                  onClick={validateData}
                  disabled={error || loading}
                >
                  <Loading loading={loading} width={18} />
                  Send me an email
                </button>
              </div>
              <div className="pt-4">
                <Divider />
                <span className="text-xl">
                  <div
                    onClick={() => navigate("/login")}
                    className="text-[#393e46] cursor-pointer hover:underline "
                  >
                    back to login
                  </div>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
