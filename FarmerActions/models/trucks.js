const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Truck = new mongoose.Schema({
	numberPlate: String,
	capacity: Number,
	driverContact: {
		type: String,
		unique: true,
	},
	datePickup: Date,
})
	.plugin(uniqueValidator)
	.set("toJSON", {
		transform: (doc, returnedDocument) => {
			returnedDocument.id = returnedDocument._id.toString();
			delete returnedDocument._id;
			delete returnedDocument.__v;
		},
	});

module.exports = mongoose.model("Truck", Truck);
