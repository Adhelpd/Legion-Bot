"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManagement = void 0;
const strings_1 = require("../../common/strings");
const TestModel_1 = require("../../models/TestModel");
const TestController_1 = require("../../controllers/TestController");
const UnitController_1 = require("../../controllers/UnitController");
const stringActions_1 = require("../../common/stringActions");
const UnitDb = [{
        name: strings_1.defaultStrings.Common.CommandNames.Edit,
        description: strings_1.defaultStrings.UserDb.CommandDescriptions.CommandGroup,
        type: "SUB_COMMAND_GROUP",
        options: [
            {
                name: strings_1.defaultStrings.UserDb.CommandNames.EditorGroup,
                description: strings_1.defaultStrings.UserDb.CommandDescriptions.EditorCommandGroup,
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: strings_1.defaultStrings.Common.CommandNames.User,
                        description: strings_1.defaultStrings.Common.CommandDescriptions.User,
                        type: 'MENTIONABLE',
                        required: true
                    },
                    {
                        name: strings_1.defaultStrings.Common.CommandNames.Status,
                        description: strings_1.defaultStrings.UserDb.CommandDescriptions.UserStatus,
                        type: 'BOOLEAN',
                        required: true,
                    },
                    {
                        name: strings_1.defaultStrings.UserDb.CommandNames.Shorthand,
                        description: strings_1.defaultStrings.UserDb.CommandDescriptions.Shorthand,
                        type: 'STRING',
                        required: false
                    }
                ]
            },
            {
                name: strings_1.defaultStrings.UserDb.CommandNames.AdminGroup,
                description: strings_1.defaultStrings.UserDb.CommandDescriptions.AdminCommandGroup,
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: strings_1.defaultStrings.Common.CommandNames.User,
                        description: strings_1.defaultStrings.Common.CommandDescriptions.User,
                        type: 'MENTIONABLE',
                        required: true
                    },
                    {
                        name: strings_1.defaultStrings.Common.CommandNames.Status,
                        description: strings_1.defaultStrings.UserDb.CommandDescriptions.UserStatus,
                        type: 'INTEGER',
                        required: false
                    }
                ]
            },
        ]
    }];
exports.DBManagement = {
    name: strings_1.defaultStrings.UserDb.CommandNames.App,
    description: strings_1.defaultStrings.UserDb.CommandDescriptions.AppCommand,
    type: 'CHAT_INPUT',
    options: UnitDb,
    run: async (client, interaction) => {
        const userController = new TestController_1.UserController();
        const unitController = new UnitController_1.UnitController();
        await interaction.deferReply();
        const user = await userController.getUser(interaction.user.id);
        const unitAdmin = (await unitController.searchUserAdmin(interaction.user.id)).length > 0;
        var queryCanEdit = unitAdmin || user.status <= TestModel_1.UserAdminStatus.GlobalAdmin;
        if (user.status == TestModel_1.UserAdminStatus.isBanned) {
            interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.banned);
            return;
        }
        ;
        if (!queryCanEdit) {
            interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.NoPerms);
            return;
        }
        ;
        const UserEditId = interaction.options.get(strings_1.defaultStrings.Common.CommandNames.User)?.value;
        const editUser = await userController.getUser(UserEditId);
        if (editUser?.status == TestModel_1.UserAdminStatus.isBanned) {
            interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.editBanned);
            return;
        }
        ;
        var CommandName = '';
        interaction.options.data.map((d) => {
            d.options?.map(option => {
                CommandName = option.name;
            });
        });
        switch (CommandName) {
            case strings_1.defaultStrings.UserDb.CommandNames.AdminGroup:
                AdminEdit(interaction, user, editUser);
                break;
            case strings_1.defaultStrings.UserDb.CommandNames.EditorGroup:
                EditorUpdate(interaction, user, editUser);
                break;
            default:
                interaction.editReply("Something went wrong");
                break;
        }
        ;
    }
};
const AdminEdit = async (interaction, user, queryUser) => {
    const userController = new TestController_1.UserController();
    if (user.status > TestModel_1.UserAdminStatus.GlobalAdmin) {
        interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.noAdminPerms);
        return;
    }
    ;
    if (queryUser === undefined) {
        var newUser = interaction.options.get(strings_1.defaultStrings.Common.CommandNames.User);
        const res = await userController.createUser({
            discordId: newUser.user?.id,
            discordName: newUser.user?.username,
            unitHistory: [],
            status: TestModel_1.UserAdminStatus.GlobalAdmin
        });
        interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.newGlobalAdmin.replace("{user}", "<@!" + newUser.user?.id + ">"));
    }
    else {
        const updateStatus = interaction.options.get(strings_1.defaultStrings.Common.CommandNames.Status)?.value;
        if (updateStatus < user.status) {
            interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.notEnoughAuth);
            return;
        }
        ;
        if (updateStatus == queryUser.status) {
            interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.unchangedAdmin);
            return;
        }
        ;
        await userController.updateUserAdmin(queryUser.discordId, updateStatus);
        var statusDirection = queryUser.status < updateStatus;
        var reply = "";
        if (!statusDirection) {
            reply = strings_1.defaultStrings.UserDb.CommandResponses.newGlobalAdmin.replace("{user}", (0, stringActions_1.pingableUser)(queryUser.discordId));
        }
        else {
            reply = strings_1.defaultStrings.UserDb.CommandResponses.removeAdmin.replace("{user}", (0, stringActions_1.pingableUser)(queryUser.discordId));
        }
        interaction.editReply(reply);
    }
};
const EditorUpdate = async (interaction, user, queryUser) => {
    const userController = new TestController_1.UserController();
    const unitController = new UnitController_1.UnitController();
    const shorthand = interaction.options.get(strings_1.defaultStrings.UserDb.CommandNames.Shorthand)?.value;
    const status = interaction.options.get(strings_1.defaultStrings.Common.CommandNames.Status)?.value;
    if (user.status <= TestModel_1.UserAdminStatus.GlobalAdmin) {
        if (shorthand == undefined) {
            interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.globalAdminNoShorthand);
            return;
        }
        ;
        const units = await unitController.searchShorthand(shorthand);
        if (units.length == 0) {
            interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.globalAdminNoUnits);
            return;
        }
        if (units.length !== 1) {
            var unitNames = [];
            units.forEach(entry => {
                unitNames.push(entry.shorthandName);
            });
            var reply = strings_1.defaultStrings.UserDb.CommandResponses.globalAdminWrongShorthand + (0, stringActions_1.BulletListBuilder)(unitNames);
            interaction.editReply(reply);
            return;
        }
        ;
        unitController.adminUpdateUserEditor(user.discordId, queryUser.discordId, status);
    }
    ;
};
