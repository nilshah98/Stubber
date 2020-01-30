import { config } from "dotenv";
config();
export default {
	PORT: process.env.PORT || 8080,
	MONGODB_URI: process.env.MONGODB_URI || "mongodb://mongo:27017/stubber",
	RZP_KEY: process.env.RZP_KEY,
	RZP_SECRET: process.env.RZP_SECRET
};