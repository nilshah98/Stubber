import { Schema, model } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

enum PaymentMethods {
	"NEFT", "neft",
	"RTGS", "rtgs",
	"IMPS", "imps"
}

const ReconciledPayments: Schema = new Schema({
	amount: {
		type: Number,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	method: {
		type: PaymentMethods,
		required: true
	},
	utr: {
		type: String,
		required: true,
		unique: true
	},
	payer_ifsc: {
		type: String,
		required: true
	},
	payer_accno: {
		type: String,
		required: true
	},
	payer_name: {
		type: String,
		required: true
	}
}).plugin(uniqueValidator)
	.set("toJSON", {
		transform: (doc: any, returnedDocument: any) => {
			returnedDocument.id = returnedDocument._id.toString();
			let tempLength = returnedDocument.payer_accno.length;
			returnedDocument.payer_accno = returnedDocument.payer_accno.slice(tempLength - 4, tempLength);
			for (let i = 0; i < tempLength - 4; i++) {
				returnedDocument.payer_accno = "*" + returnedDocument.payer_accno
			}
			delete returnedDocument._id;
			delete returnedDocument.__v;
		}
	});

export default model("ReconciledPayment", ReconciledPayments);