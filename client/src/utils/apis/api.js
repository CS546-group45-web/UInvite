import axios from "axios";
// const baseUrl = "http://localhost:4000/";
const baseUrl = process.env.REACT_APP_BASE_URL;

const jwtToken = localStorage.getItem("token") ?? null;
const errosStatusCodes = [500, 409, 404, 400];
export const makeApiCall = async (endpoint, method, body, headers = null) => {
  let results = {};
  try {
    await axios({
      url: baseUrl + endpoint,
      method,
      data: body,
      headers: jwtToken
        ? {
            ...headers,
            Authorization: `Bearer ${jwtToken}`,
          }
        : headers,
    }).then((res) => {
      const { data, status } = res;
      results.data = data;
      results.status = status;
    });
    return results;
  } catch (err) {
    const { response } = err;
    if (errosStatusCodes.includes(response?.status)) {
      let error = {};
      error.data = response?.data;
      error.status = response?.status;
      return error;
    }
    if (response?.status === 401) {
      localStorage.removeItem("auth");
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }
    return "Something went wrong!";
  }
};
