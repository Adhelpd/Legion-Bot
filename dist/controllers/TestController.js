"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tslib_1 = require("tslib");
const tsoa_1 = require("tsoa");
const typescript_ioc_1 = require("typescript-ioc");
const TestService_1 = require("../services/TestService");
let UserController = class UserController extends tsoa_1.Controller {
    userService;
    constructor() {
        super();
        this.userService = new TestService_1.UserService();
    }
    async getUser(id) {
        return this.userService.get(id);
    }
    ;
    async getAllUsers() {
        console.log("Get all Users");
        return this.userService.getAllUser();
    }
    ;
    async createUser(requestBody) {
        this.setStatus(201);
        this.userService.create(requestBody);
        return;
    }
    ;
    async updateUserAdmin(id, status) {
        this.userService.updateAdminStatus(id, status);
        return;
    }
};
tslib_1.__decorate([
    typescript_ioc_1.Inject
], UserController.prototype, "userService", void 0);
tslib_1.__decorate([
    (0, tsoa_1.Get)("{id}"),
    tslib_1.__param(0, (0, tsoa_1.Path)())
], UserController.prototype, "getUser", null);
tslib_1.__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Retrieved user with id ${id}"),
    (0, tsoa_1.Get)()
], UserController.prototype, "getAllUsers", null);
tslib_1.__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Retrieved user array"),
    (0, tsoa_1.Post)(),
    tslib_1.__param(0, (0, tsoa_1.Body)())
], UserController.prototype, "createUser", null);
tslib_1.__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Updated User"),
    (0, tsoa_1.Put)("updateAdmin"),
    tslib_1.__param(0, (0, tsoa_1.Query)()),
    tslib_1.__param(1, (0, tsoa_1.Query)())
], UserController.prototype, "updateUserAdmin", null);
UserController = tslib_1.__decorate([
    (0, tsoa_1.Route)("user")
], UserController);
exports.UserController = UserController;
;
