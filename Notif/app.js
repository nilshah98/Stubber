const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/user");
const axios = require("axios");
require("dotenv").config();
// const app = express()

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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/notif/bulk", (req, res) => {
	console.log(req.body);
	const { emails, phonenos, message } = req.body;
	const headers = {
		authorization:
			"q6fAdIhu1L8EzCoRs2ywjKFB34cMTZntlmVJY5D9PxXUvSQNkiSl3GdnCsjZDocfuW0VN5aiKq64J97E",
		"Content-Type": "application/x-www-form-urlencoded",
		"Cache-Control": "no-cache",
	};
	const payload = `sender_id=FSTSMS&message=${message}&language=english&route=p&numbers=${phonenos}`;
	sendMail(emails, "A message from stubber support", message, (err, info) => {
		console.log(err, info);
		axios
			.post("https://www.fast2sms.com/dev/bulk", payload, {
				headers,
			})
			.then((result) =>
				res.status(200).json({
					mail: err || info,
					sms: result.data,
				})
			)
			.catch((error) => {
				console.log(error);
				res.status(500).json({
					mail: err || info,
					sms: error,
				});
			});
	});
});

app.post("/api/notif/:id", (req, res) => {
	userid = req.params.id;
	const message = req.body.message;
	const headers = {
		authorization:
			"q6fAdIhu1L8EzCoRs2ywjKFB34cMTZntlmVJY5D9PxXUvSQNkiSl3GdnCsjZDocfuW0VN5aiKq64J97E",
		"Content-Type": "application/x-www-form-urlencoded",
		"Cache-Control": "no-cache",
	};
	User.findById(req.params.id, function (err, user) {
		if (err) {
			console.log(err);
		} else {
			email = user.email;
			name = user.name;
			phone = user.phone;
			const payload = `sender_id=FSTSMS&message=${message}&language=english&route=p&numbers=${phone}`;
			sendMail(email, "Important Notice", message, (err, info) => {
				axios
					.post("https://www.fast2sms.com/dev/bulk", payload, {
						headers,
					})
					.then((result) =>
						res.status(200).json({
							mail: err || info,
							sms: result.data,
						})
					)
					.catch((error) =>
						res.status(500).json({
							mail: err || info,
							sms: error,
						})
					);
			});
		}
	});
});

let sendMail = function (to, subject, html, next) {
	let transporter = nodemailer.createTransport({
			service: "gmail",
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "cleanngreen111@gmail.com",
				pass: "CleanNgreen1!",
			},
		}),
		mailOptions = {
			from: "Stubber Support<cleanngreen111@gmail.com>", //Edit this to match OAuth2
			subject,
		};

	to ? (mailOptions["to"] = to) : (to = "");
	// (cc)?mailOptions['cc'] = cc:cc = '';
	// (bcc)?mailOptions['bcc'] = bcc:bcc = '';
	html ? (mailOptions["html"] = html) : (html = "");

	transporter.sendMail(mailOptions, function (error, info) {
		// console.log(transporter,mailOptions);
		next(error, info);
	});

	transporter.close();
};

// sendMail("Ruchi Thosar<chirag.shetty@somaiya.edu>;Chirag Shetty<ruchi.thosar@somaiya.edu>","dhruvil.s@somaiya.edu",undefined,"Test mail",console.log);
app.listen(process.env.PORT, () =>
	console.log(`Example app listening on port ${process.env.PORT}!`)
);
