import axios from "axios";
// const baseUrl = "http://localhost:4000/";
const baseUrl = process.env.REACT_APP_BASE_URL;

const jwtToken = localStorage.getItem("token") ?? null;

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
      // console.log({ res });
      const { data, status } = res;
      results.data = data;
      results.status = status;
    });
    return results;
  } catch (err) {
    // console.log({ err });
    const { response } = err;
    if (
      response?.status === 500 ||
      response?.status === 409 ||
      response?.status === 404 ||
      response?.status === 400
    ) {
      let error = {};
      error.data = response?.data;
      error.status = response?.status;

      return error;
    } else return "Something went wrong!";
  }
};
