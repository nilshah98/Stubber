const app = require("./app");
const http = require("http");
const mongoose = require("mongoose");

require("dotenv").config();

const server = http.createServer(app);

server.listen(process.env.PORT, (err) => {
	if (err) console.error(err);
	else {
		console.log("Server started");
		mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: true,
			useCreateIndex: true
		}, error => {
			if (error) console.error(`Failed to connect to mongodb: ${process.env.MONGODB_URI}`, error);
			else console.log(`Connected to mongodb : ${process.env.MONGODB_URI}`);
		});
	}
});