const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const status = ["ASSIGNED", "DISPATCHED", "COLLECTED"];

const ScheduleSchema = new mongoose.Schema({
	datePickup: Date,
	events: [
		{
			status: "String",
		},
	],
})
	.plugin(uniqueValidator)
	.set("toJSON", {
		transform: (doc, returnedDocument) => {
			returnedDocument.id = returnedDocument._id.toString();
			delete returnedDocument._id;
			delete returnedDocument.__v;
		},
	});

module.exports = mongoose.model("Schedule", ScheduleSchema);
