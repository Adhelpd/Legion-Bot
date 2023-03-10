"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAdminStatus = void 0;
;
var UserAdminStatus;
(function (UserAdminStatus) {
    UserAdminStatus[UserAdminStatus["Owner"] = 0] = "Owner";
    UserAdminStatus[UserAdminStatus["GlobalAdmin"] = 1] = "GlobalAdmin";
    UserAdminStatus[UserAdminStatus["NoRights"] = 2] = "NoRights";
    UserAdminStatus[UserAdminStatus["isBanned"] = 3] = "isBanned";
})(UserAdminStatus = exports.UserAdminStatus || (exports.UserAdminStatus = {}));
;
