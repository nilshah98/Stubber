import app from "./app";
import config from "./utils/config";
import http from "http";
import mongoose from "mongoose";

http.createServer(app)
	.listen(config.PORT, (): void => {
		console.log(`Server started on PORT: ${config.PORT}`);
		mongoose.connect(config.MONGODB_URI, {
			useCreateIndex: true,
			useFindAndModify: true,
			useUnifiedTopology: true,
			useNewUrlParser: true,
		}, (err: Error) => {
			if (err) console.error("Cannot connect to mongodb: ", err);
			else console.log(`Connected to database URI: ${config.MONGODB_URI}`);
		});
	});