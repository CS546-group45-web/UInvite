import axios from "axios";
const baseUrl = "http://localhost:4000/";
export const makeApiCall = async (endpoint, method, body, headers = null) => {
  let results = {};
  try {
    await axios({
      url: baseUrl + endpoint,
      method,
      data: body,
      headers,
    }).then((res) => {
      const { data, status } = res;

      results.data = data;
      results.status = status;
    });
    return results;
  } catch (err) {
    const { response } = err;
    if (response?.status === 500 || response?.status === 404) {
      let error = {};
      error.data = response?.data;
      error.status = response?.status;

      return error;
    } else return "Something went wrong!";
  }
};
