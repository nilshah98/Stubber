const calculateShare = (total_cost, convinience_charge, stubble) => {
	gross_cost = total_cost - convinience_charge;
	total_stubble = stubble.reduce((accum, farmer) => {
		return accum + parseInt(farmer.weight);
	}, 0);
	final_share = {};
	stubble.forEach((farmer) => {
		final_share[farmer.number] = Math.floor(
			(farmer.weight / total_stubble) * gross_cost
		);
	});
	return final_share;
};

const send_sms = (number, text) => {
	const payload = `sender_id=FSTSMS&message=Hi Stubbers,${text}&language=english&route=p&numbers=${number}`;
	axios
		.post("https://www.fast2sms.com/dev/bulk", payload, {
			headers,
		})
		.then((result) => {
			console.log(result.data);
		})
		.catch((error) => {
			console.log(error);
		});
};

module.exports = { calculateShare, sendSms };
