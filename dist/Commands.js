"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonReplies = exports.ModalReplies = exports.MessageCommands = exports.Commands = void 0;
const CreateIssue_1 = require("./commands/CreateIssue");
const UnitInfo_1 = require("./commands/messages/UnitInfo");
const DbManagement_1 = require("./commands/UserDatabase/DbManagement");
const UnitsInfo_1 = require("./commands/UnitsInfo");
exports.Commands = [
    CreateIssue_1.GitHubIssue,
    UnitsInfo_1.UnitHandler,
    DbManagement_1.DBManagement
];
exports.MessageCommands = [
    UnitInfo_1.UnitDbHandler,
];
exports.ModalReplies = [
    CreateIssue_1.GithubModalReply,
    UnitsInfo_1.UnitModalCreate
];
exports.ButtonReplies = [
    CreateIssue_1.GithubSearchReplyYes,
    UnitsInfo_1.UnitButtonReplyCreate,
    UnitsInfo_1.UnitButtonReplySearch,
    UnitsInfo_1.UnitButtonReplyEdit,
    UnitsInfo_1.UnitButtonCancelled,
    UnitsInfo_1.UnitButtonReplyCreate1,
    UnitsInfo_1.UnitButtonReplyCreate2
];
