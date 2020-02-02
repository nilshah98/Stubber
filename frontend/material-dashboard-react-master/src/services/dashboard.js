import axios from "axios";

import config from "../env";
const baseUrl = config.BACKEND_API;

export const accountFetch = async userid => {
	try{
		const account = await axios.get(`${baseUrl}/payments/account/${userid}`);
		return account.data;
	}catch(e){
		throw e;
	}
}

export default {accountFetch};