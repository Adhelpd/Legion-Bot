"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBManagement = void 0;
const strings_1 = require("../../common/strings");
const TestModel_1 = require("../../models/TestModel");
const TestController_1 = require("../../controllers/TestController");
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
        const service = new TestController_1.UserController();
        await interaction.deferReply();
        const queryUser = interaction.user.id;
        const UserEditId = interaction.options.get(strings_1.defaultStrings.Common.CommandNames.User)?.value;
        const user = await service.getUser(queryUser);
        var queryCanEdit = false;
        switch (user.status) {
            case TestModel_1.UserAdminStatus.isBanned:
                interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.banned);
                return;
            case TestModel_1.UserAdminStatus.Owner:
                queryCanEdit = true;
                break;
            case TestModel_1.UserAdminStatus.GlobalAdmin:
                queryCanEdit = true;
                break;
            default:
                interaction.editReply(strings_1.defaultStrings.UserDb.CommandResponses.NoPerms);
                return;
        }
        ;
        var CommandName = '';
        interaction.options.data.map((d) => {
            CommandName = d.name;
        });
        switch (CommandName) {
            case strings_1.defaultStrings.UserDb.CommandNames.AdminGroup:
                break;
            case strings_1.defaultStrings.UserDb.CommandNames.EditorGroup:
                break;
            default:
                interaction.editReply("Something went wrong");
                break;
        }
        ;
    }
};
