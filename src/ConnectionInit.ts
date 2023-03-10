import bodyParser from 'body-parser';
import express, { NextFunction, Request, Response, Router } from 'express';
import swaggerUi from "swagger-ui-express";
import { ConnectToDatabase } from './repositories/TestRepository';
import { RegisterRoutes } from "./routes";
import { ValidateError } from 'tsoa';

export default (app: express.Application): void => {

    app.use((_req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept"
        )
        next()
    })

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static('public'))

    const router = Router()

    // const test = new UserService;
    // router.get('/test');
    // router.get('/test', test.get)
    // router.post('/hello', hello.Post)

    app.use("/", router);

    // Supercharging our developer experience with SwaggerUI
    // https://tsoa-community.github.io/docs/live-reloading.html#supercharging-our-developer-experience-with-swaggerui
    app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
        return res.send(
            swaggerUi.generateHTML(await import("./swagger.json"))
        )
    })
    RegisterRoutes(app)

    app.use(function notFoundHandler(req, res: Response){
        res.status(404).send({
            message: "Not found",
        });
    });

    app.use(function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction): Response | void {
        if (err instanceof ValidateError) {
            console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
            return res.status(422).json({
                message: "Validation Failed",
                details: err.fields,
            });
        }
        if (err instanceof Error) {
            return res.status(500).json({
                message: "Internal Server Error",
            });
        }
        next()
    });

    app.listen(process.env.API_PORT || 3000, () => {
        ConnectToDatabase();
    });
}
