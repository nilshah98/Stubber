import axios from "axios";

const ConsumerServices = (token) => ({
	GetBids: () => {
		return axios.get("/api/bids")
			.then((res) => {
				console.log(res);
				return res.data
			}).catch((err) => {
				console.error(err);
				throw err;
			});
	},
	makeBid: (bidId) => {
		return axios.put(`/api/bids/${bidId}`, {
			headers: {
				Authorization: `bearer ${token}`
			}
		}).then((res) => {
			return res.data
		}).catch((err) => {
			throw err;
		});
	}
});

export default ConsumerServices;