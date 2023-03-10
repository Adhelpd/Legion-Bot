"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitController = void 0;
const tslib_1 = require("tslib");
const UnitService_1 = require("../services/UnitService");
const tsoa_1 = require("tsoa");
const typescript_ioc_1 = require("typescript-ioc");
let UnitController = class UnitController extends tsoa_1.Controller {
    unitService;
    constructor() {
        super();
        this.unitService = new UnitService_1.UnitService();
    }
    async getAllUnits() {
        return await this.unitService.getAllUnit();
    }
    ;
    async searchUserAdmin(id) {
        return await this.unitService.searchUnitAdmin(id);
    }
    async searchShorthand(shorthand) {
        return await this.unitService.searchUnitShorthand(shorthand);
    }
    ;
    async updateUserEditor(adminId, addId, status) {
        this.unitService.updateUserEditor(adminId, addId, status);
    }
    ;
    async adminUpdateUserEditor(groupName, addId, status) {
        this.unitService.adminUpdateUserEditor(groupName, addId, status);
    }
    async createUnit(requestBody) {
        this.setStatus(201);
        return await this.unitService.create(requestBody).catch(error => {
            console.log("error createUnit", error);
            return null;
        });
    }
    ;
};
tslib_1.__decorate([
    typescript_ioc_1.Inject
], UnitController.prototype, "unitService", void 0);
tslib_1.__decorate([
    (0, tsoa_1.Get)(),
    (0, tsoa_1.SuccessResponse)("201", "Successful Search")
], UnitController.prototype, "getAllUnits", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)("{id}"),
    (0, tsoa_1.SuccessResponse)("201", "Retrieved User")
], UnitController.prototype, "searchUserAdmin", null);
tslib_1.__decorate([
    (0, tsoa_1.Get)('search/{shorthand}'),
    (0, tsoa_1.SuccessResponse)("201", "Searched units")
], UnitController.prototype, "searchShorthand", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)('update/editor/'),
    (0, tsoa_1.SuccessResponse)("201", "Sucessfully updated"),
    tslib_1.__param(0, (0, tsoa_1.Query)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__param(2, (0, tsoa_1.Query)())
], UnitController.prototype, "updateUserEditor", null);
tslib_1.__decorate([
    (0, tsoa_1.Put)('update/adminEditor/'),
    (0, tsoa_1.SuccessResponse)("201", "Successfully updated"),
    tslib_1.__param(0, (0, tsoa_1.Query)()),
    tslib_1.__param(1, (0, tsoa_1.Query)()),
    tslib_1.__param(2, (0, tsoa_1.Query)())
], UnitController.prototype, "adminUpdateUserEditor", null);
tslib_1.__decorate([
    (0, tsoa_1.SuccessResponse)("201", "Created"),
    (0, tsoa_1.Post)("{requestBody}"),
    tslib_1.__param(0, (0, tsoa_1.Body)())
], UnitController.prototype, "createUnit", null);
UnitController = tslib_1.__decorate([
    (0, tsoa_1.Route)("unit")
], UnitController);
exports.UnitController = UnitController;
;
