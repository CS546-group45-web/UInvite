import React from "react";
import { storeGoogletoken } from "../../utils/apis/auth";
import { useNavigate, useParams } from "react-router";

function GoogleCalendarToken() {
  const params = useParams();
  const navigate = useNavigate();
  React.useEffect(() => {
    const { accessToken, refreshToken } = params;
    storeGoogletoken(accessToken, refreshToken)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => navigate("/"));
  }, [params, navigate]);

  return <div>Storing calendar token...</div>;
}

export default GoogleCalendarToken;
