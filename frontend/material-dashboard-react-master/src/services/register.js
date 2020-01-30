import axios from "axios";

import config from "../env";
const baseUrl = config.BACKEND_API;

const register = async data => {
  const response = await axios.post(baseUrl + "/signup", data);
  return response.data;
};

export default register;
