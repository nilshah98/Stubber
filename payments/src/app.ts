import express, { Application, Request, Response, NextFunction } from "express";
import { Document } from "mongoose";
import { requestLogger, MongooseErrorHandler, unknownEndpoint } from "./utils/middleware";

import Accounts from "./models/Account";
import User from "./models/User";
import ReconciledPayments from "./models/Reconciled";

import config from "./utils/config";

import axios from "axios";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);

app.get("/api/payments", (req: Request, res: Response) => {
	res.status(200).send("Hello from payments");
});

app.get("/api/payments/details", (req: Request, res: Response) => {
	const paymentMethods: any = {
		"rtgs/neft": {
			"ifsc": "RAZR0000001",
			"account_number": "1112220041365613",
			"name": "Acme group",
		}
	}

	if (req.query.amount) {
		if (!req.query.currency) {
			res.status(400).json({
				"error": "Missing currency. Only amount given without currency"
			});
			return;
		}
		paymentMethods["rtgs/neft"]["amount"] = parseInt(req.query.amount);
		paymentMethods["rtgs/neft"]["currency"] = req.query.currency;
	} else if (req.query.currency && !req.query.amount) {
		res.status(400).json({
			"error": "Missing amount. Only currency given without amount"
		});
		return;
	}

	res.status(200).json(paymentMethods);
});

app.get("/api/payments/account/:userid", async (req: Request, res: Response, next: NextFunction) => {
	const userid: String = req.params.userid;
	try {
		const userAccount = await Accounts.findOne({ user: userid }).populate("users", {
			name: 1
		});
		if (userAccount !== null) {
			res.status(200).json(userAccount.toJSON());
		} else {
			res.status(404).json({
				"error": `No such user with id '${userid}' exists`
			});
		}
	} catch (err) {
		next(err);
	}
});

// WEBHOOK FOR PAYMENTS
app.post("/api/payments/razorpay/webhook/rtgs__neft", async (req: Request, res: Response, next: NextFunction) => {

	try {
		const payload: any = req.body["payload"];
		let user: Document | null = await User.findOne({ bank_accno: payload["bank_transfer"]["entity"]["payer_bank_account"]["account_number"], bank_ifsc: payload["bank_transfer"]["entity"]["payer_bank_account"]["ifsc"] });
		if (user === null) {
			// return;
			user = await new User({
				name: "Dhruvil Shah",
				usertype: "consumer",
				bank_accno: payload["bank_transfer"]["entity"]["payer_bank_account"]["account_number"],//"1112220049337562",
				bank_ifsc: payload["bank_transfer"]["entity"]["payer_bank_account"]["ifsc"],//"RAZR0000001",
				bank_name: "RAZORPAY"
			}).save();
		}

		console.log("User dets: ", user.toJSON());

		let reconcilation: Document | null = await ReconciledPayments.findOne({
			utr: payload["bank_transfer"]["entity"]["bank_reference"]
		});

		if (reconcilation !== null) {
			return;
		}

		const tempRObj: any = {
			amount: parseInt(payload["payment"]["entity"]["amount"]) / 100,
			currency: payload["payment"]["entity"]["currency"],
			method: payload["bank_transfer"]["entity"]["mode"],
			utr: payload["bank_transfer"]["entity"]["bank_reference"],
			payer_ifsc: payload["bank_transfer"]["entity"]["payer_bank_account"]["ifsc"],
			payer_accno: payload["bank_transfer"]["entity"]["payer_bank_account"]["account_number"],
			payer_name: payload["bank_transfer"]["entity"]["payer_bank_account"]["name"]
		};
		console.log("##", tempRObj, payload);
		reconcilation = await new ReconciledPayments(tempRObj).save();

		console.log("reconciled:", reconcilation.toJSON());

		let account: Document | null = await Accounts.findOne({ user: user._id });
		if (account === null) {
			// return;
			account = await new Accounts({
				user: user._id,
				history: [{
					transactionType: "db",
					reconcilation: reconcilation._id,
					razorPayTransactionId: payload["payment"]["entity"]["id"]
				}],
				balance: -(parseInt(payload["payment"]["entity"]["amount"]) / 100)
			}).save();

		} else {
			const newAccount = { ...account.toJSON() };
			newAccount.history.push({
				transactionType: "db",
				reconcilation: reconcilation._id,
				razorPayTransactionId: payload["payment"]["entity"]["id"]
			});

			newAccount.balance -= (parseInt(payload["payment"]["entity"]["amount"]) / 100);

			await account.updateOne(newAccount);
		}

		console.log("account: ", account.toJSON());

		res.status(200).send("good");
	} catch (e) {
		console.log("Error in reconilation:", e);
		next(e);
	}

});

// THIS IS TO BE EXPOSED TO THE NETWORK
app.post("/api/payments/razorpay/directTransfer/:userid", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: Document | null = await User.findById(req.params.userid);
		if (user === null) {
			const err: Error = new Error(`userid "${req.params.userid}" does not exist.`);
			err.name = "UnknownError";
			throw err;
		}
		const userJson: JSON | any = user.toJSON();
		if (userJson.razorpayLinkedAccount === null || userJson.razorpayLinkedAccount === undefined) {
			const err: Error = new Error(`userid "${req.params.userid}" does not have razorpay account linked. Please link the account first`);
			err.name = "UnknownError";
			throw err;
		}
		const reqBody: any = {
			account: userJson.razorpayLinkedAccount,
			amount: parseInt(req.body.amount) * 100,
			currency: "INR"
		}
		const rzpRes = await axios.post(`https://${config.RZP_KEY}:${config.RZP_SECRET}@api.razorpay.com/v1/transfers/`, reqBody);
		let account = await Accounts.findOne({ user: user._id });
		if (account === null) {
			account = await new Accounts({
				user: user._id,
				history: [{
					transactionType: "cr",
					razorPayTransactionId: rzpRes.data.id
				}],
				balance: parseInt(req.body.amount)
			}).save();
		} else {
			const newAccount = { ...account.toJSON() }
			newAccount.history.push({
				transactionType: "cr",
				razorPayTransactionId: rzpRes.data.id
			});
			newAccount.balance += parseInt(req.body.amount);

			await account.updateOne(newAccount);
		}
		// await account.update(newAccount);

		res.status(200).json({
			id: rzpRes.data.id,
			success: "true"
		});

	} catch (e) {
		console.error("!!", e);
		next(e);
	}
});

app.put("/api/payments/razorpay/:userid", async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { razorpayLinkedAccount } = req.body;

		const user: Document | null = await User.findById(req.params.userid);
		if (user === null) {
			const err: Error = new Error(`userid "${req.params.userid}" does not exist.`);
			err.name = "UnknownError";
			throw err;
		}
		await user.updateOne({
			...(user.toJSON()),
			razorpayLinkedAccount
		});

		console.log(user.toJSON());

		res.status(200).json({ ...user.toJSON(), razorpayLinkedAccount });
	} catch (e) {
		next(e);
	}
});

app.use(MongooseErrorHandler);
app.use(unknownEndpoint);

export default app;