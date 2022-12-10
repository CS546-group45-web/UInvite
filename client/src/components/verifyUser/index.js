import React from "react";
import { Divider, Link } from "@mui/material";
import "./styles.css";
import SVGComponent from "../common/Logo";
import { useParams } from "react-router-dom";
import { verifyUser } from "../../utils/apis/auth";

function VerifyUser() {
  //   const [userVerified, setUserVerified] = React.useState(false);
  const [msg, setMsg] = React.useState("Verifying user...");
  const params = useParams();

  React.useEffect(() => {
    verifyUser(params.token)
      .then((res) => {
        if (res.status !== 200) {
          setMsg(res?.data?.error);
        } else {
          window.location.href = "/login";
          setMsg(res?.data?.message);
        }
      })
      .catch((error) => console.log({ error }));
  }, [params]);

  return (
    <div className="flex min-h-full justify-center py-8 lg:py-6 md:py-5 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-4">
        <div className="flex items-center flex-col">
          <div className="w-40">
            <SVGComponent />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            User Verification
          </h2>
        </div>

        <div>{msg}</div>

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
  );
}

export default VerifyUser;
