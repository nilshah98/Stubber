import axios from "axios";
const baseUrl = "/api/auth-control/signup";

const postFarmer = (farmerDeets) => {
	const request = axios.post(baseUrl, farmerDeets);
	return request.then((response) => response.data);
};

export default { postFarmer };
