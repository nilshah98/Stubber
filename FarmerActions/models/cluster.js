const { Schema, model, Types } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const ClusterSchema = new Schema({
	medianLat: Number,
	medianLong: Number,
	currentCollectionWeight: Number,
	farmerAndEvents: [
		{
			farmer: {
				type: Types.ObjectId,
				ref: "User",
			},
			events: [
				{
					status: "String",
				},
			],
		},
	],
	truck: {
		type: Types.ObjectId,
		ref: "Truck",
	},
})
	.plugin(uniqueValidator)
	.set("toJSON", {
		transform: (doc, returnedDocument) => {
			returnedDocument.id = returnedDocument._id.toString();
			returnedDocument.median = {
				latitude: returnedDocument.medianLat,
				longitude: returnedDocument.medianLong,
			};
			delete returnedDocument._id;
			delete returnedDocument.__v;
		},
	});
module.exports = model("Cluster", ClusterSchema);
