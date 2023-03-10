"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitService = void 0;
const tslib_1 = require("tslib");
const TestRepository_1 = require("../repositories/TestRepository");
const typescript_ioc_1 = require("typescript-ioc");
let UnitService = class UnitService {
    UnitFilter(filter = {}) {
        return filter;
    }
    ;
    async QueryUnit(filter = {}) {
        return TestRepository_1.Collections.units?.find(filter).toArray();
    }
    ;
    async searchUnitShorthand(shorthandName) {
        const units = await this.QueryUnit({
            "shorthandName": { $regex: shorthandName }
        });
        return units;
    }
    ;
    async searchUnitAdmin(discordId) {
        const Units = await this.QueryUnit({
            "editors": { $regex: discordId }
        });
        return Units;
    }
    ;
    async getAllUnit() {
        const user = TestRepository_1.Collections.units?.find({}).toArray();
        return user;
    }
    ;
    async updateUserEditor(adminId, addId, status) {
        var isUpdate = false;
        if (status) {
            isUpdate = (await TestRepository_1.Collections.users.updateOne(this.UnitFilter({ "editors": adminId }), { $addToSet: this.UnitFilter({ 'editors': addId }) }, { 'upsert': false })).acknowledged;
        }
        else {
            isUpdate = (await TestRepository_1.Collections.users.updateOne(this.UnitFilter({ "editors": adminId }), { $pull: this.UnitFilter({ 'editors': addId }) }, { 'upsert': false })).acknowledged;
        }
        console.log(isUpdate);
    }
    ;
    async adminUpdateUserEditor(groupName, addId, status) {
        var isUpdate = false;
        if (status) {
            isUpdate = (await TestRepository_1.Collections.users.updateOne(this.UnitFilter({ 'shorthandName': groupName }), { $addToSet: this.UnitFilter({ 'editors': addId }) }, { 'upsert': false })).acknowledged;
        }
        else {
            isUpdate = (await TestRepository_1.Collections.users.updateOne(this.UnitFilter({ 'shorthandName': groupName }), { $pull: this.UnitFilter({ 'editors': addId }) }, { 'upsert': false })).acknowledged;
        }
        console.log(isUpdate);
    }
    async create(UnitCreationParams) {
        const today = new Date();
        const unit = {
            ...UnitCreationParams,
            addedDate: today,
            lastUpdated: today
        };
        TestRepository_1.Collections.units.insertOne(unit);
        return unit;
    }
    ;
};
UnitService = tslib_1.__decorate([
    typescript_ioc_1.Singleton
], UnitService);
exports.UnitService = UnitService;
;
