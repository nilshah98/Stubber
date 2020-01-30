import { Request, Response, NextFunction } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
	console.log(`Host: ${req.headers["x-forwarded-host"] || req.hostname}\tRemote Address: ${req.headers["x-forwarded-for"] || req.connection.remoteAddress}\tMethod: ${req.method}\tPath: ${req.path}\tBody: ${JSON.stringify(req.body)}\tQuery-Params: ${JSON.stringify(req.query)}`);
	next();
}

export const MongooseErrorHandler = (error: Error | any, request: Request, response: Response, next: NextFunction): any => {
	// console.error("@@@", error);

	if (error.name === "CastError" && error.kind === "ObjectId") {
		return response.status(400).send({
			error: "malformatted id"
		});
	} else if (error.name === "ValidationError") {
		return response.status(400).json({
			error: error._message || error.message
		});
	} else if (error.name === "MongoError") {
		return response.status(500).json({
			error: error._message || error.message
		})
	} else if (error.name === "UnknownError") {
		return response.status(error.statusCode).json({
			error: error._message || error.message
		});
	}

	next(error);
};

export const unknownEndpoint = (request: Request, response: Response) => {
	response.status(404).send({
		error: `unknown endpoint ${request.path}`
	});
};