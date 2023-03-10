"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulletListBuilder = exports.pingableUser = void 0;
function pingableUser(userid) {
    return "<@!" + userid + ">";
}
exports.pingableUser = pingableUser;
function BulletListBuilder(list) {
    var formattedList = "";
    list.forEach(entry => {
        formattedList += ("\u2022 " + entry + "\u000a");
    });
    return formattedList;
}
exports.BulletListBuilder = BulletListBuilder;
;
