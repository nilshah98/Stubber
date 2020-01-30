import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const User: Schema = new Schema({
	name: {
		type: String,
		required: true
	},
	usertype: String,
	bank_ifsc: {
		type: String,
	},
	bank_accno: {
		type: String,
		unique: true
	},
	bank_name: String,
	razorpayLinkedAccount: String
}).plugin(uniqueValidator)
	.set("toJSON", {
		transform: (doc: any, returnedDocument: any) => {
			returnedDocument.id = returnedDocument._id.toString();
			delete returnedDocument._id;
			delete returnedDocument.__v;
			delete returnedDocument.password;
		}
	});

export default model("User", User);