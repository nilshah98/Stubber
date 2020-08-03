require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const cors = require("cors");
const User = require("./models/user");

// Importing all models
const Schedule = require("./models/schedule");
const Truck = require("./models/trucks");
const Cluster = require("./models/cluster");

const app = express();

app.use(cors());
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

app.get("/api/farmer/", (req, res) => res.send("Hello World!"));

app.post("/api/farmer/scheduleTruck", async (req, res) => {
	const {
		datePickup,
		driverContact,
		clusterId,
		numberPlate,
		capacity,
	} = req.body;

	let truck = await Truck.findOne({ driverContact: driverContact });
	if (truck === null) {
		truck = await new Truck({
			numberPlate,
			capacity: parseInt(capacity),
			driverContact,
			datePickup: new Date(datePickup),
		}).save();
	}

	const cluster = await Cluster.findById(clusterId);

	if (cluster === null) {
		res.status(404).json({
			error: `Couldn't find a cluster with id '${clusterId}'`,
		});
	}

	cluster.truck = truck._id;
	cluster.farmerAndEvents.forEach((fne) => {
		fne.events = [{ status: "ASSIGNED" }, ...fne.events];
	});

	await cluster.save();

	// send notif here
	const message = `A truck has assigned to pick up delivery from you. Truck Number Plate ${numberPlate} and will collect it from you by ${new Date(
		datePickup
	).toDateString()}`;

	sendNotifFromUserId(
		cluster.farmerAndEvents.map((fne) => fne.farmer),
		message
	);

	res.status(201).end();
});

app.post("/api/farmer/update-status/:phoneNumber", async (req, res) => {
	const { status } = req.body;
	const farmerphoneNum = req.params.phoneNumber;

	const farmer = await User.findOne({ phone: farmerphoneNum }).populate(
		"cluster_id"
	);

	const cluster = farmer.cluster_id;

	if (cluster === null) {
		return res.status(404).json({
			error: `Farmer is not harvesting.`,
		});
	}

	for (let fne of cluster.farmerAndEvents) {
		if (farmer._id.toString() === fne.farmer.toString()) {
			if (status === "COLLECTED") {
				axios.post(`${process.env.NOTIF_URI}/api/notif/${farmer._id}`, {
					message: `Hello '${farmer.name}' your stubble is collected from you.`,
				});
				fne.events = [{ status: "COLLECTED" }, ...fne.events];
				const newCluster = cluster;
				newCluster.farmerAndEvents = cluster.farmerAndEvents.map((fne1) =>
					fne1.farmer.toString() === fne.farmer.toString() ? fne : fne1
				);
				await newCluster.save();
				return res.status(201).end();
			} else if (status === "STORED") {
				await axios.post(`${process.env.NOTIF_URI}/api/notif/${farmer._id}`, {
					message: `Hello '${farmer.name}' your stubble has reached to us. Thank You`,
				});
				fne.events = [{ status: "STORED" }, ...fne.events];
				const newCluster = cluster;
				newCluster.farmerAndEvents = cluster.farmerAndEvents.map((fne1) =>
					fne1.farmer.toString() === fne.farmer.toString() ? fne : fne1
				);
				await newCluster.save();
				await Cluster.deleteOne(newCluster);
				return res.status(201).end();
			} else {
				return res.status(404).json({
					error: `Invalid status '${status}'`,
				});
			}
		}
	}

	res.status(404).json({
		error: `Cannot find farmer in cluster`,
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

app.post("/api/farmer/startHarvesting", async (req, res) => {
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
			farmerAndEvents: [
				{ farmer: farmer._id, events: [{ status: "CLUSTERED" }] },
			],
		}).save();

		farmer.cluster_id = newCluster._id;

		await farmer.save();

		console.log(newCluster);

		sendNotifFromUserId(
			newCluster.farmerAndEvents.map((fne) => fne.farmer),
			"You are now harvesting"
		);
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
			(clusterLat * nearestCluster.farmerAndEvents.length + farmerLat) /
			(nearestCluster.farmerAndEvents.length + 1);
		const newClusterMedianLong =
			(clusterLong * nearestCluster.farmerAndEvents.length + farmerLong) /
			(nearestCluster.farmerAndEvents.length + 1);

		// update nearest cluster
		nearestCluster.farmerAndEvents.push({
			farmer: farmer._id,
			events: [{ status: "CLUSTERED" }],
		});
		nearestCluster.medianLat = newClusterMedianLat;
		nearestCluster.medianLong = newClusterMedianLong;
		nearestCluster.currentCollectionWeight += parseInt(quantity);
		await nearestCluster.save();

		farmer.cluster_id = nearestCluster._id;

		await farmer.save();

		const message = `A farmer has started harvesting near you, a truck will be assigned soon!`;
		sendNotifFromUserId(
			nearestCluster.farmerAndEvents.map((fne) => fne.farmer),
			message
		);
	}

	return res.status(201).end();
});

app.get("/api/farmer/clusters/", async (req, res) => {
	const clusters = await Cluster.find({ truck: null });
	res.json(clusters.map((cluster) => cluster.toJSON()));
});

app.get("/api/farmer/schedule/", async (req, res) => {
	const farmerphoneNum = parseInt(req.query.farmerphoneNum);

	const farmer = await User.findOne({ phone: farmerphoneNum }).populate(
		"cluster_id"
	);

	const cluster = farmer.cluster_id;

	if (cluster === null) {
		return res.status(404).json({
			error: `Farmer '${farmerphoneNum}' is not in a cluster`,
		});
	}

	for (let fne of cluster.farmerAndEvents) {
		if (farmer._id.toString() === fne.farmer.toString()) {
			return res.status(200).json({
				status: fne.events[0].status,
			});
		}
	}

	res.status(404).json({
		status: "Error",
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
