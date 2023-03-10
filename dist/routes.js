"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
const runtime_1 = require("@tsoa/runtime");
const TestController_1 = require("./controllers/TestController");
const UnitController_1 = require("./controllers/UnitController");
const models = {
    "UserAdminStatus": {
        "dataType": "refEnum",
        "enums": [0, 1, 2, 3],
    },
    "ObjectId": {
        "dataType": "refAlias",
        "type": { "dataType": "string", "validators": {} },
    },
    "User": {
        "dataType": "refObject",
        "properties": {
            "discordName": { "dataType": "string", "required": true },
            "discordId": { "dataType": "string", "required": true },
            "status": { "ref": "UserAdminStatus", "required": true },
            "unitHistory": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "id": { "ref": "ObjectId" },
            "dateAdded": { "dataType": "datetime", "required": true },
        },
        "additionalProperties": false,
    },
    "Pick_User.discordName-or-status-or-discordId-or-unitHistory_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "discordName": { "dataType": "string", "required": true }, "status": { "ref": "UserAdminStatus", "required": true }, "discordId": { "dataType": "string", "required": true }, "unitHistory": { "dataType": "array", "array": { "dataType": "string" }, "required": true } }, "validators": {} },
    },
    "UserCreationParams": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_User.discordName-or-status-or-discordId-or-unitHistory_", "validators": {} },
    },
    "Unit": {
        "dataType": "refObject",
        "properties": {
            "id": { "ref": "ObjectId" },
            "unitLeader": { "dataType": "string", "required": true },
            "discordInvite": { "dataType": "string", "required": true },
            "shorthandName": { "dataType": "string", "required": true },
            "unitDescriptionTag": { "dataType": "string", "required": true },
            "unitDescription": { "dataType": "string", "required": true },
            "availableRoles": { "dataType": "string", "required": true },
            "missionTimes": { "dataType": "array", "array": { "dataType": "string" }, "required": true },
            "addedDate": { "dataType": "datetime", "required": true },
            "lastUpdated": { "dataType": "datetime", "required": true },
            "unitColor": { "dataType": "string" },
            "editors": { "dataType": "array", "array": { "dataType": "string" } },
        },
        "additionalProperties": false,
    },
    "Pick_Unit.availableRoles-or-discordInvite-or-lastUpdated-or-missionTimes-or-unitColor-or-shorthandName-or-unitDescription-or-unitDescriptionTag-or-unitLeader_": {
        "dataType": "refAlias",
        "type": { "dataType": "nestedObjectLiteral", "nestedProperties": { "availableRoles": { "dataType": "string", "required": true }, "discordInvite": { "dataType": "string", "required": true }, "lastUpdated": { "dataType": "datetime", "required": true }, "missionTimes": { "dataType": "array", "array": { "dataType": "string" }, "required": true }, "unitColor": { "dataType": "string" }, "shorthandName": { "dataType": "string", "required": true }, "unitDescription": { "dataType": "string", "required": true }, "unitDescriptionTag": { "dataType": "string", "required": true }, "unitLeader": { "dataType": "string", "required": true } }, "validators": {} },
    },
    "UnitCreationParams": {
        "dataType": "refAlias",
        "type": { "ref": "Pick_Unit.availableRoles-or-discordInvite-or-lastUpdated-or-missionTimes-or-unitColor-or-shorthandName-or-unitDescription-or-unitDescriptionTag-or-unitLeader_", "validators": {} },
    },
};
const validationService = new runtime_1.ValidationService(models);
function RegisterRoutes(app) {
    app.get('/user/:id', ...((0, runtime_1.fetchMiddlewares)(TestController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(TestController_1.UserController.prototype.getUser)), function UserController_getUser(request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new TestController_1.UserController();
            const promise = controller.getUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, undefined, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.get('/user', ...((0, runtime_1.fetchMiddlewares)(TestController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(TestController_1.UserController.prototype.getAllUsers)), function UserController_getAllUsers(request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new TestController_1.UserController();
            const promise = controller.getAllUsers.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.post('/user', ...((0, runtime_1.fetchMiddlewares)(TestController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(TestController_1.UserController.prototype.createUser)), function UserController_createUser(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "UserCreationParams" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new TestController_1.UserController();
            const promise = controller.createUser.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.put('/user/updateAdmin', ...((0, runtime_1.fetchMiddlewares)(TestController_1.UserController)), ...((0, runtime_1.fetchMiddlewares)(TestController_1.UserController.prototype.updateUserAdmin)), function UserController_updateUserAdmin(request, response, next) {
        const args = {
            id: { "in": "query", "name": "id", "required": true, "dataType": "string" },
            status: { "in": "query", "name": "status", "required": true, "ref": "UserAdminStatus" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new TestController_1.UserController();
            const promise = controller.updateUserAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.get('/unit', ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController)), ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController.prototype.getAllUnits)), function UnitController_getAllUnits(request, response, next) {
        const args = {};
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new UnitController_1.UnitController();
            const promise = controller.getAllUnits.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.get('/unit/:id', ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController)), ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController.prototype.searchUserAdmin)), function UnitController_searchUserAdmin(request, response, next) {
        const args = {
            id: { "in": "path", "name": "id", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new UnitController_1.UnitController();
            const promise = controller.searchUserAdmin.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.get('/unit/search/:shorthand', ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController)), ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController.prototype.searchShorthand)), function UnitController_searchShorthand(request, response, next) {
        const args = {
            shorthand: { "in": "path", "name": "shorthand", "required": true, "dataType": "string" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new UnitController_1.UnitController();
            const promise = controller.searchShorthand.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.put('/unit/update/editor', ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController)), ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController.prototype.updateUserEditor)), function UnitController_updateUserEditor(request, response, next) {
        const args = {
            adminId: { "in": "query", "name": "adminId", "required": true, "dataType": "string" },
            addId: { "in": "query", "name": "addId", "required": true, "dataType": "string" },
            status: { "in": "query", "name": "status", "required": true, "dataType": "boolean" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new UnitController_1.UnitController();
            const promise = controller.updateUserEditor.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.put('/unit/update/adminEditor', ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController)), ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController.prototype.adminUpdateUserEditor)), function UnitController_adminUpdateUserEditor(request, response, next) {
        const args = {
            groupName: { "in": "query", "name": "groupName", "required": true, "dataType": "string" },
            addId: { "in": "query", "name": "addId", "required": true, "dataType": "string" },
            status: { "in": "query", "name": "status", "required": true, "dataType": "boolean" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new UnitController_1.UnitController();
            const promise = controller.adminUpdateUserEditor.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    app.post('/unit/:requestBody', ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController)), ...((0, runtime_1.fetchMiddlewares)(UnitController_1.UnitController.prototype.createUnit)), function UnitController_createUnit(request, response, next) {
        const args = {
            requestBody: { "in": "body", "name": "requestBody", "required": true, "ref": "UnitCreationParams" },
        };
        let validatedArgs = [];
        try {
            validatedArgs = getValidatedArgs(args, request, response);
            const controller = new UnitController_1.UnitController();
            const promise = controller.createUnit.apply(controller, validatedArgs);
            promiseHandler(controller, promise, response, 201, next);
        }
        catch (err) {
            return next(err);
        }
    });
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, response, successStatus, next) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            returnHandler(response, statusCode, data, headers);
        })
            .catch((error) => next(error));
    }
    function returnHandler(response, statusCode, data, headers = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        }
        else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        }
        else {
            response.status(statusCode || 204).end();
        }
    }
    function responder(response) {
        return function (status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    }
    ;
    function getValidatedArgs(args, request, response) {
        const fieldErrors = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', { "noImplicitAdditionalProperties": "throw-on-extras" });
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                    else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, { "noImplicitAdditionalProperties": "throw-on-extras" });
                    }
                case 'res':
                    return responder(response);
            }
        });
        if (Object.keys(fieldErrors).length > 0) {
            throw new runtime_1.ValidateError(fieldErrors, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
