import React from "react";
import { Divider, Link, TextField } from "@mui/material";
import { passwordValidation } from "../../utils/helper";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SVGComponent from "../common/Logo";
import { toast } from "react-toastify";
import Loading from "../common/Loading";
import "./styles.css";
import { useParams } from "react-router";
import { resetPassword } from "../../utils/apis/auth";

function ResetPassword() {
  const [resetData, setResetData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [passwordVisibility, setPasswordVisibility] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [resetStatus, setResetStatus] = React.useState(true);

  const params = useParams();

  const setValues = (name, value) => {
    setResetData({ ...resetData, [name]: value });
  };

  const setError = (name) => {
    setErrors({ ...errors, [name]: true });
  };

  const removeError = (name) => {
    const errorObj = errors;
    delete errorObj[name];
    setErrors(errorObj);
  };

  const validateData = async () => {
    if (Object.keys(resetData).length === 0) {
      return setErrors({
        password: true,
        cpassword: true,
      });
    }

    const errorObj = {};
    if (!resetData?.password) errorObj.password = true;
    if (!resetData?.cpassword) errorObj.cpassword = true;

    if (Object.keys(errorObj).length !== 0) return setErrors(errorObj);
    else setErrors({});

    setLoading(true);

    const resetInfo = await resetPassword(params.token, {
      password: resetData.password,
    });

    const { data, status } = resetInfo;
    if (status !== 200) toast.error(data?.error);
    else setResetStatus(true);
    setLoading(false);
  };

  const handleClickShowPassword = () =>
    setPasswordVisibility(!passwordVisibility);
  return (
    <div className="flex min-h-full justify-center py-8 lg:py-6 md:py-5 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl space-y-4">
        <div className="flex items-center flex-col">
          <div className="w-40">
            <SVGComponent />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Reset Password
          </h2>
        </div>
        {resetStatus ? (
          <div className="text-xl text-black">
            Password has changed. Please go to&nbsp;
            <Link href="/forgot-password" underline="hover" color="#393e46">
              login page
            </Link>
            &nbsp;to login to your account
          </div>
        ) : (
          <div className="rounded-md px-4">
            <div className="my-1 relative">
              <TextField
                size="small"
                id="password"
                label="Password"
                variant="outlined"
                required
                fullWidth
                // type="password"
                type={passwordVisibility ? "text" : "password"}
                margin="dense"
                name="password"
                placeholder="********"
                value={resetData?.password ?? ""}
                error={errors?.password}
                onChange={(e) => {
                  let { name, value } = e.target;
                  if (value === "") setError(name);
                  if (!passwordValidation(value)) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />

              <div
                className="show_pass_btn__reset"
                onClick={handleClickShowPassword}
              >
                {passwordVisibility ? (
                  <VisibilityIcon fontSize="medium" />
                ) : (
                  <VisibilityOffIcon fontSize="medium" />
                )}
              </div>

              <div className="flex flex-col text-base">
                <span
                  className={`${
                    !resetData?.password
                      ? "password__blank"
                      : !/[a-z]/g.test(resetData.password)
                      ? "password__error"
                      : "password__correct"
                  }`}
                >
                  {!resetData?.password ? null : !/[a-z]/g.test(
                      resetData.password
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
                    !resetData?.password
                      ? "password__blank"
                      : !/[A-Z]/g.test(resetData.password)
                      ? "password__error"
                      : "password__correct"
                  }`}
                >
                  {!resetData?.password ? null : !/[A-Z]/g.test(
                      resetData.password
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
                    !resetData?.password
                      ? "password__blank"
                      : !/[0-9]/g.test(resetData.password)
                      ? "password__error"
                      : "password__correct"
                  }`}
                >
                  {!resetData?.password ? null : !/[0-9]/g.test(
                      resetData.password
                    ) ? (
                    <CloseIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  Password must contain atleast one number e.g. 1,2,3...
                </span>
                <span
                  className={`${
                    !resetData?.password
                      ? "password__blank"
                      : resetData?.password?.length < 8 ||
                        resetData?.password?.length > 20
                      ? "password__error"
                      : "password__correct"
                  }`}
                >
                  {!resetData?.password ? null : resetData?.password?.length <
                      8 || resetData?.password?.length > 20 ? (
                    <CloseIcon />
                  ) : (
                    <CheckIcon />
                  )}
                  Password must contain atleast 8 or more characters and less
                  than 20 characters
                </span>
              </div>
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
                value={resetData?.cpassword ?? ""}
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
                  if (resetData?.password !== value) setError(name);
                  else removeError(name);
                  setValues(name, value);
                }}
              />
            </div>

            <div className="flex">
              <button
                onClick={validateData}
                className="btn_default flex items-center"
                disabled={loading}
              >
                <Loading loading={loading} width={18} />
                Reset password
              </button>
            </div>
            <div className="mt-3">
              <Divider />
              <div className="text-xl text-black">
                Link expired? &nbsp;
                <Link href="/forgot-password" underline="hover" color="#393e46">
                  Request a new link
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
