const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const stubble = require("./stubble");

const Bids = require("./models/bids");
const User = require("./models/user");
const Stubble = require("./models/stubble");

app.use(cors());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());
app.use("/api/stubble", stubble);

app.get("/api/bids", (request, response) => {
	Bids.find({})
		.populate("stubble_id")
		.then((result) => {
			response.json(result.map((bids) => bids.toJSON()));
		});
});

app.get("/api/bids/:id", (request, response) => {
	const id = mongoose.Types.ObjectId(request.params.id);
	console.log(id);
	Bids.find({
		_id: id,
	}).then((result) => {
		if (result) response.json(result[0]);
		else response.status(404).end();
	});
});

app.delete("/api/bids/:id", (request, response) => {
	Bids.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).end();
		})
		.catch((error) => next(error));
});

app.post("/api/bids/addBid", async (request, response, next) => {
	try {
		console.log("Posssttteeedd");
		body = request.body;
		const endTime = body.end_time.split(":");
		// console.log(endTime)
		body.x = parseInt(body.x);
		body.y = parseInt(body.y);
		body.z = parseInt(body.z);
		body.end_time = new Date(new Date().setHours(endTime[0], endTime[1]));
		console.log(body);

		if (!body.stubble_id) {
			return response.status(400).json({
				error: "stubble id missing",
			});
		}
		if (!body.end_time) {
			return response.status(400).json({
				error: "end time missing",
			});
		}

		const newStubble = await Stubble.findById(body.stubble_id);
		newStubble.bidFlag = true;

		const stubble = await Stubble.findByIdAndUpdate(
			body.stubble_id,
			newStubble
		);

		const min_cost = body.x + body.y + body.z;

		const phonenos = stubble.farmers.reduce((accum, val) => {
			accum + "," + val.number;
		}, "");

		const emails = "";
		axios.post(`/api/notifs/bulk`, {
			phonenos,
			emails,
			message: `Hi stubber, your stubble has been put up for Auction, here are the details,\ncost to farmer:${body.x}\ntransport and infra cost:${body.y}\nconvinience charge:${body.z}\nminimum bid price:${min_cost}`,
		});

		const bid = new Bids({
			stubble_id: body.stubble_id,
			end_time: body.end_time,
			current_cost: min_cost,
		});

		await bid.save();
		response.sendStatus(201).end();

		// bid
		// 	.save()
		// 	.then((result) => result.toJSON())
		// 	.then((result) => {
		// 		response.json(result);
		// 	})
		// 	.catch((error) => next(error));
	} catch (error) {
		next(error);
	}
});

app.post("/api/bids/:id", async (request, response, next) => {
	const body = request.body;

	console.log("Received request as ->", body);

	body.current_cost = parseInt(body.current_cost);

	const bid = await Bids.findById(request.params.id);

	const user = await User.findById(body.current_bidder); //Doubt

	if (!user.usertype) {
		return response
			.status(401)
			.json({ error: "You are not a registered customer" })
			.end();
	} else if (bid.current_cost >= body.current_cost) {
		return response
			.status(401)
			.json({ error: "Your bid must be higher than the previous one." })
			.end();
	} else {
		bid.current_cost = body.current_cost;
		bid.current_bidder = body.current_bidder;

		await bid.save();
		return response.status(201).end();
	}
});

module.exports = app;
