"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importStar(require("express"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const TestRepository_1 = require("./repositories/TestRepository");
const routes_1 = require("./routes");
const tsoa_1 = require("tsoa");
exports.default = (app) => {
    app.use((_req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.static('public'));
    const router = (0, express_1.Router)();
    app.use("/", router);
    app.use("/docs", swagger_ui_express_1.default.serve, async (_req, res) => {
        return res.send(swagger_ui_express_1.default.generateHTML(await Promise.resolve().then(() => tslib_1.__importStar(require("./swagger.json")))));
    });
    (0, routes_1.RegisterRoutes)(app);
    app.use(function notFoundHandler(req, res) {
        res.status(404).send({
            message: "Not found",
        });
    });
    app.use(function errorHandler(err, req, res, next) {
        if (err instanceof tsoa_1.ValidateError) {
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
        next();
    });
    app.listen(process.env.API_PORT || 3000, () => {
        (0, TestRepository_1.ConnectToDatabase)();
    });
};
