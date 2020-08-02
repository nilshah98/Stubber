const router = require("express").Router();
const Stubble = require("./models/stubble");
const utils = require("./utils");

router.post("/add", async (req, res) => {
	const { stubbleType, number, weight } = req.body;
	const stubble = await Stubble.findOne({ stubbleType });
	if (stubble) {
		stubble.farmers.push({ number, weight });
		const result = await Stubble.findOneAndUpdate({ stubbleType }, stubble);
		res.json(result);
	} else {
		const new_stubble = new Stubble({
			stubbleType,
			farmers: [{ number, weight }],
		});
		await new_stubble.save();
		res.json(new_stubble.toJSON());
	}
});

router.post("/calculate", async (req, res) => {
	const { total_cost, convinience_charge, stubbleType } = req.body;
	const stubble = await Stubble.findOne({ stubbleType });
	const shares = utils.calculate_share(
		total_cost,
		convinience_charge,
		stubble.farmers
	);
	utils.send_sms(shares);
	res.send("success");
});

router.get("/getStubbles", async (req, res) => {
	const stubbles = await Stubble.find({bidFlag: false});
	let allStubbles = [];
	stubbles.forEach((stubble) => {
		const totalWeight = stubble.farmers.reduce((accum, farmer) => {
			return accum + parseInt(farmer.weight);
		}, 0);
		console.log(totalWeight)
		allStubbles.push(
			{ stubbleType: stubble.stubbleType,
			totalWeight, 
			stubbleID: stubble._id }
			)
	});
	console.log(allStubbles)
	res.status(200).json(allStubbles);
});

module.exports = router;
