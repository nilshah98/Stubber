import { Schema, model } from "mongoose";

import uniqueValidator from "mongoose-unique-validator";

enum CrDb {
	"cr", "db"
}

const Account: Schema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true
	},
	history: [{
		transactionType: {
			type: CrDb,
			required: true,
		},
		reconcilation: {
			type: Schema.Types.ObjectId,
			ref: "ReconciledPayment",
		},
		razorPayTransactionId: {
			type: String,
			unique: true
		}
	}],
	balance: {
		type: Number,
		required: true,
		default: 0
	}
}).set("toJSON", {
	transform: (doc: any, returnedDocument: any) => {
		returnedDocument.id = returnedDocument._id.toString();
		// returnedDocument.history = returnedDocument.history.map((h: any): JSON => h.toJSON());
		delete returnedDocument._id;
		delete returnedDocument.__v;
	}
});

export default model("Account", Account);