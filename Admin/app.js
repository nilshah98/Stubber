const express = require("express");
const app = express();
const cors = require("cors");
const Bids = require("./models/bids");
const User = require("./models/user");
const mongoose = require("mongoose");
const cron = require("node-cron");
const axios = require("axios");
const stubble = require("./stubble");

app.use(cors());
app.use(
	express.urlencoded({
		extended: true,
	})
);
app.use(express.json());
app.use("/api/stubble", stubble);

cron.schedule("* * * * *", function () {
	console.log("---------------------");
	console.log("Running Cron Job");

	let t = new Date();
	let curr_time = t.toISOString();

	Bids.deleteMany({
		end_time: {
			$lt: curr_time,
		},
	}).then((res) => {
		const paymentDetails = `Congratulations your bid has been selected. Pay the amount `;
		// {
		//     "rtgs/neft": {
		//         "ifsc": "RAZR0000001",
		//         "account_number": "1112220041365613",
		//         "name": "Acme group",
		//     }
		// };
		// axios.post(`${process.env.NOTIF_URI}/api/notif/bulk`, paymentDetails);
		console.log("Deleted");
	});
});

app.get("/api/bids", (request, response) => {
	Bids.find({}).then((result) => {
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

app.post("/api/bids/addBid", (request, response, next) => {
	console.log("Posssttteeedd");
	body = request.body;

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

	const min_cost = body.x + body.y + body.z;

	const bid = new Bids({
		stubble_id: body.stubble_id,
		end_time: body.end_time,
		current_cost: min_cost,
	});

	bid
		.save()
		.then((result) => result.toJSON())
		.then((result) => {
			response.json(result);
		})
		.catch((error) => next(error));
});

app.put("/api/bids/:id", async (request, response, next) => {
	const body = request.body;

	console.log("body", body);

	const bid = await Bids.findbyId(request.params.id);

	const user = await User.findById(body.current_bidder); //Doubt

	if (user.usertype != "consumer") {
		return res.status(404).end();
	} else {
		if (bid.current_cost <= body.current_cost) {
			return res
				.status(401)
				.json({ error: "Your bid must be higher than the previous one." });
		}

		bid.current_cost = body.current_cost;
		bid.current_bidder = body.current_bidder;

		await bid.save();
	}

	// body should contain ---> cost
	// get consumer id from token

	const bid1 = {
		current_cost: body.current_cost,
		current_bidder: body.current_bidder,
	};

	Bids.findByIdAndUpdate(request.params.id, bid1, {
		new: true,
	})
		.then((updatedContact) => {
			response.json(updatedContact.toJSON());
		})
		.catch((error) => next(error));
});

module.exports = app;
