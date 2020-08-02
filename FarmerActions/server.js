require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
// const cron = require("node-cron");
// const { agnes } = require("ml-hclust");
const User = require("./models/user");
// const scheduling = require("./scheduling");

// Importing all models
const Schedule = require("./models/schedule");
const Truck = require("./models/trucks");
const Cluster = require("./models/cluster");

const app = express();
// const port = 5000

app.use(bodyParser.json()); // support json encoded bodies
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
); // support encoded bodies

console.log(process.env.PORT);

mongoose.connect(
	process.env.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	},
	(err) => {
		if (err) console.log("err :", err);
		else console.log("Connected");
	}
);

function getDistance(lat1, lon1, lat2, lon2) {
	if (lat1 == lat2 && lon1 == lon2) {
		return 0;
	} else {
		var radlat1 = (Math.PI * lat1) / 180;
		var radlat2 = (Math.PI * lat2) / 180;
		var theta = lon1 - lon2;
		var radtheta = (Math.PI * theta) / 180;

		var dist =
			Math.sin(radlat1) * Math.sin(radlat2) +
			Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}

		dist = Math.acos(dist);
		dist = (dist * 180) / Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;

		return dist;
	}
}

const sendNotifFromUserId = async (idArray, message) => {
	const users = await User.find({ _id: { $in: idArray } });
	const emailsArray = [],
		phonenosArray = [];
	console.log(users);
	users.forEach((user) => {
		emailsArray.push(user.email);
		phonenosArray.push(user.phone);
	});
	let emails = emailsArray.join(";");
	let phonenos = phonenosArray.join(",");

	console.log(emails, phonenos);

	await axios.post(`${process.env.NOTIF_URI}/api/notif/bulk`, {
		emails,
		phonenos,
		message,
	});
};

// cron.schedule("* * * * *", function () {
// 	console.log("---------------------");
// 	console.log("Running Cron Job");

// 	var t = new Date();
// 	var curr_time = t.toISOString();
// 	// Bids.find({}).then(results=>{
// 	//     var query = {};
// 	//results.filter(result => {result.end_time < curr_time}).map(
// 	//    Bids.deleteMany()
// 	//)
// 	//     Bids.deleteMany()
// 	// })

// 	Truck.deleteMany({ end_time: { $lt: curr_time } }).then((res) => {
// 		console.log("Deleted");
// 	});
// });

app.get("/api/", (req, res) => res.send("Hello World!"));

// app.post("/api/getnear", async (req, res) => {
// 	try {
// 		const lat = req.body.latitude;
// 		const lng = req.body.longitude;
// 		const dst = req.body.distance;
// 		console.log("LAT:" + lat);

// 		// axios.get('http://localhost:3000/farmers')
// 		// .then((response) => {
// 		//     let answer = []
// 		//     response.data.forEach((farmer) => {
// 		//         if(getDistance(farmer.latitude, farmer.longitude, lat, lng) <= dst){
// 		//             answer.push(farmer)
// 		//         }
// 		//     })
// 		//     res.send({data: answer})
// 		// })
// 		// .catch((err) => console.log(err))
// 		console.log("Before");

// 		User.find({
// 			usertype: "farmer",
// 		}).then((currUsers) => {
// 			//console.log("Users:",currUsers)
// 			let farmers = [];
// 			currUsers.forEach((element) => {
// 				let dist = getDistance(lat, lng, element.latitude, element.longitude);
// 				console.log(dist);
// 				if (dist <= dst) {
// 					farmers.push(element);
// 				}
// 				//console.log(element);
// 			});
// 			console.log("After");
// 			console.log(farmers);
// 			let phonenos = "";
// 			let emails = "";
// 			let message = "The nearby farmer has started harvesting!!!";
// 			for (let i = 0; i < farmers.length - 1; i++) {
// 				phonenos += farmers[i].phone + ",";
// 			}
// 			phoneno += farmers[farmers.length - 1].phone;
// 			console.log(phoneno);
// 			for (let i = 0; i < farmers.length - 1; i++) {
// 				emails += farmers[i].email + ";";
// 			}
// 			emails += farmers[farmers.length - 1].email;
// 			console.log(emails);

// 			axios.post(`${process.env.NOTIF_URI}/api/notif/bulk`, {
// 				emails,
// 				phonenos,
// 				message,
// 			});
// 			// send mail, msg
// 			// phoneno - phone nos string, emails - emails string, message - message
// 		});
// 	} catch (exception) {
// 		console.error(exception);
// 	}
// });

// app.get("/api/getschedule/:id", async (req, res) => {
// 	var user_id = req.params.id;
// 	Schedule.findOne({
// 		farmer_id: user_id,
// 	})
// 		.then((result) => {
// 			res.json(result.toJSON());
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

// //Adding Schedules

// const updateSchedule = (desc, newEvent, schedule_id) => {
// 	let t = new Date();
// 	let curr_date = t.toISOString();
// 	if (desc == "") {
// 		findByIdAndDelete(schedule_id)
// 			.then((result) => {
// 				response.status(204).end();
// 			})
// 			.catch((error) => next(error));
// 	} else {
// 		event = {
// 			description: desc,
// 			event_date: curr_date, //WONT WORK
// 		};

// 		newEvent.push(event);
// 	}
// 	const schedule = {
// 		events: newEvent,
// 	};

// 	Schedule.findByIdAndUpdate(schedule_id, schedule, { new: true }).then(
// 		(schedule) => {
// 			return schedule.toJSON();
// 		}
// 	);
// };

// app.post("/api/addschedule/:id", async (req, res) => {
// 	var user_id = req.params.id;
// 	let events = null;
// 	let schedule_id = null;
// 	let t = new Date();
// 	let curr_date = t.toISOString();

// 	Schedule.findOne({ farmer_id: user_id })
// 		.then((result) => {
// 			if (result === undefined) {
// 				const schedule = new Schedule({
// 					farmer_id: user_id,
// 					events: [
// 						{
// 							description: "Pick Up Requested",
// 							event_date: curr_date,
// 						},
// 					],
// 				});
// 			} else {
// 				events = result.events;
// 				schedule_id = result._id;
// 				switch (result.events.length) {
// 					case 1:
// 						updateSchedule("Pick Up Scheduled", events, schedule_id);
// 						break;
// 					case 2:
// 						updateSchedule("Stubble Collected", events, schedule_id);
// 						break;
// 					case 3:
// 						updateSchedule("Bidding Completed", events, schedule_id);
// 						break;
// 					case 4:
// 						updateSchedule("Delivered", events, schedule_id);
// 						break;
// 					case 5:
// 						events = null;
// 						updateSchedule("", events, schedule_id);
// 				}
// 			}
// 		})
// 		.catch((err) => {
// 			console.log(err);
// 		});
// });

// app.use("/api/schedule", scheduling);
// app.get('/getcluster', (_req,res) => {
//     axios.get('http://localhost:3000/farmers')
//         .then((response) => {
//             const locs = response.data.map((item) => [item.latitude, item.longitude])
//             const clusters = agnes(locs).cut(100)
//             const indices = clusters.map((c) => c.indices())
//             res.send({data: indices})
//         })
//         .catch((err) => console.log(err))
// })

app.post("/api/scheduleTruck", async (req, res) => {
	const {
		datePickup,
		driverContact,
		clusterId,
		numberPlate,
		capacity,
	} = req.body;

	let truck = await Truck.findOne({ driverContact: driverContact });
	if (truck === null) {
		let schedule = await new Schedule({
			datePickup: new Date(datePickup),
			events: [{ status: "ASSIGNED" }],
		}).save();
		truck = await new Truck({
			numberPlate,
			capacity: parseInt(capacity),
			driverContact,
			schedule: schedule._id,
		}).save();
	}

	const cluster = await Cluster.findById(clusterId);

	if (cluster === null) {
		res.status(404).json({
			error: `Couldn't find a cluster with id '${clusterId}'`,
		});
	}

	cluster.truck = truck._id;

	await cluster.save();

	// send notif here
	const message = `A truck has assigned to pick up delivery from you. Truck Number Plate ${numberPlate} and will collect it from you by ${new Date(
		datePickup
	).toDateString()}`;

	sendNotifFromUserId(cluster.farmer, message);

	res.status(201).end();
});

app.post("/api/update-status/:id", async (req, res) => {
	const { status } = req.body;
	const scheduleId = req.params.id;

	const schedule = await Schedule.findOne(scheduleId);

	const truck = await Truck.findOne({ schedule: scheduleId });

	const cluster = await Cluster.findOne({ truck: truck._id });

	if (status === "DISPATCHED") {
		sendNotifFromUserId(
			cluster.farmer,
			`Truck has left to collect the stubble from you. Truck Number Plate is ${truck.numberPlate} and contact information is ${truck.driverContact}.`
		);
	} else if (status === "COLLECTED") {
		await sendNotifFromUserId(
			cluster.farmer,
			"Your stubble has been received. You will soon receive your reward"
		);

		await Promise.all([
			schedule.deleteOne(),
			truck.deleteOne(),
			cluster.deleteOne(),
		]);
		return res.status(201).end();
	}
	res.status(404).json({
		error: `Invalid status '${status}'`,
	});
});

/*
A. Adding farmer to cluster =>
1. Iterate through all clusters and check distance b/w median of cluster and currFarmer
2. Store the distance in an array mapping to clusters, finally pick minimum, if minimum is lesser than the limit, else create new cluster
3. Update the median, quantity and any related quantities for nearestCluster

B. Send notifcation =>
1. Iterate through each cluster, in it iterate through each farmer
2. Get the mobile number of the farmer and send notif
*/

app.post("/api/startHarvesting", async (req, res) => {
	const { farmerphoneNum, quantity } = req.body;

	// find farmer from phone number
	const farmer = await User.findOne({
		usertype: "farmer",
		phone: parseInt(farmerphoneNum),
	});
	if (farmer === null) {
		return res.status(404).end();
	}
	console.log(farmer);
	const farmerLat = farmer.latitude;
	const farmerLong = farmer.longitude;

	// Get all clusters
	const clusters = await Cluster.find({});
	let clusterDist = new Array();

	// Iterate through each cluster and add Distance
	clusters.forEach((cluster) => {
		const clusterLat = cluster.medianLat;
		const clusterLong = cluster.medianLong;

		// Get distance between cluster and farmer
		const dist = getDistance(clusterLat, clusterLong, farmerLat, farmerLong);

		// Map for each cluster
		clusterDist.push(dist);
	});

	const minDistance = Math.min(...clusterDist);

	if (clusters.length === 0 || minDistance > 10) {
		// If distance is greater than 10 form new cluster
		const newCluster = await new Cluster({
			medianLat: farmerLat,
			medianLong: farmerLong,
			currentCollectionWeight: parseInt(quantity),
			farmer: [farmer._id],
		}).save();

		farmer.cluster_id = newCluster._id;

		await farmer.save();

		console.log(newCluster);

		sendNotifFromUserId(newCluster.farmer, "You are now harvesting");
	} else {
		// get the cluster add farmer and save
		console.log(
			minDistance,
			clusters,
			clusterDist,
			clusterDist.indexOf(minDistance)
		);
		const nearestCluster = clusters[clusterDist.indexOf(minDistance)];
		const clusterLat = nearestCluster.medianLat;
		const clusterLong = nearestCluster.medianLong;

		// recalculate median of cluster
		const newClusterMedianLat =
			(clusterLat * nearestCluster.farmer.length + farmerLat) /
			(nearestCluster.farmer.length + 1);
		const newClusterMedianLong =
			(clusterLong * nearestCluster.farmer.length + farmerLong) /
			(nearestCluster.farmer.length + 1);

		// update nearest cluster
		nearestCluster.farmer.push(farmer._id);
		nearestCluster.medianLat = newClusterMedianLat;
		nearestCluster.medianLong = newClusterMedianLong;
		nearestCluster.currentCollectionWeight += parseInt(quantity);
		await nearestCluster.save();

		farmer.cluster_id = nearestCluster._id;

		await farmer.save();

		const message = `A farmer has started harvesting near you, a truck will be assigned soon!`;
		sendNotifFromUserId(nearestCluster.farmer, message);
	}

	return res.status(201).end();
});

app.get("/api/clusters/", async (req, res) => {
	const clusters = await Cluster.find({ truck: null });
	res.json(clusters.map((cluster) => cluster.toJSON()));
});

app.get("/api/schedule/", async (req, res) => {
	const farmerphoneNum = parseInt(req.query.farmerphoneNum);

	const cluster = (
		await User.findOne({ phone: farmerphoneNum }).populate("cluster_id")
	).cluster_id;

	if (cluster === null) {
		return res.status(404).json({
			error: `Farmer '${farmerId}' is not in a cluster`,
		});
	}

	const truck = await Truck.findById(cluster.truck).populate("schedule");

	if (truck === null) {
		return res.status(200).json({
			status: "CLUSTERED",
		});
	}

	const schedule = truck.schedule;

	res.status(200).json({
		status: schedule.events[0],
	});
});

app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`)
);

// dummy user:- id: 5f254d2c5198121e4b3ae83e,name: "Dhruvil", email: "dhruvil.s@somaiya.edu", phone: 9969326535
// db.users.insert({email:"dhruvil.s@somaiya.edu",phone:9969326535,name: "Dhruvil",username: "dhruvil", latitude: 20,longitude: 20,usertype: "farmer"})
// dummy user:- id: 5f254df55198121e4b3ae83f
// db.users.insert({email:"parshva.barbhaya@somaiya.edu",phone:9322334353,name: "Parshva",username: "parshva", latitude: 20,longitude: 20,usertype: "farmer"})
// db.users.insert({email:"chirag.shetty@somaiya.edu",phone:7045185177,name: "Chirag",username: "nabda", latitude: 20,longitude: 21,usertype: "farmer"})
