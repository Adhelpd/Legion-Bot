"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tslib_1 = require("tslib");
const TestRepository_1 = require("../repositories/TestRepository");
const typescript_ioc_1 = require("typescript-ioc");
let UserService = class UserService {
    UserFilter(filter = {}) {
        return filter;
    }
    ;
    async QueryUser(filter = {}) {
        return await TestRepository_1.Collections.users?.find(filter).toArray();
    }
    ;
    async get(discordID) {
        var user = [];
        try {
            user = await this.QueryUser({
                "discordId": discordID
            });
        }
        catch (error) {
            console.log(error);
        }
        return user[0];
    }
    ;
    async getAllUser() {
        const user = TestRepository_1.Collections.users?.find({}).toArray();
        return user;
    }
    ;
    async updateAdminStatus(id, status) {
        const isupdate = (await TestRepository_1.Collections.users.updateOne(this.UserFilter({ "discordId": id }), { $set: this.UserFilter({ 'status': status }) }, { 'upsert': true })).acknowledged;
        console.log(isupdate);
    }
    ;
    async create(UserCreationParams) {
        const today = new Date();
        const user = {
            ...UserCreationParams,
            dateAdded: today
        };
        TestRepository_1.Collections.users.insertOne(user);
        return user;
    }
    ;
};
UserService = tslib_1.__decorate([
    typescript_ioc_1.Singleton
], UserService);
exports.UserService = UserService;
;
