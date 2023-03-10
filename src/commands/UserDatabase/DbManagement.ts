import { ApplicationCommandOptionData, BaseCommandInteraction, Client, CommandInteractionOption, Message, User } from "discord.js";
import { Command, MessageCommand } from "../../models/Command";
import { defaultStrings } from "../../common/strings";
import { UserAdminStatus, User as UserModel } from "../../models/TestModel";

import { UserController } from "../../controllers/TestController";
import { UnitController } from "../../controllers/UnitController";
import { BulletListBuilder, pingableUser } from "../../common/stringActions";

const UnitDb: ApplicationCommandOptionData[] = [{
    name: defaultStrings.Common.CommandNames.Edit,
    description: defaultStrings.UserDb.CommandDescriptions.CommandGroup,
    type: "SUB_COMMAND_GROUP",
    options: [
        {
            name: defaultStrings.UserDb.CommandNames.EditorGroup,
            description: defaultStrings.UserDb.CommandDescriptions.EditorCommandGroup,
            type: 'SUB_COMMAND',
            options: [
                {
                    name: defaultStrings.Common.CommandNames.User,
                    description: defaultStrings.Common.CommandDescriptions.User,
                    type: 'MENTIONABLE',
                    required: true
                },
                {
                    name: defaultStrings.Common.CommandNames.Status,
                    description: defaultStrings.UserDb.CommandDescriptions.UserStatus,
                    type: 'BOOLEAN',
                    required: true,
                },
                {
                    name: defaultStrings.UserDb.CommandNames.Shorthand,
                    description: defaultStrings.UserDb.CommandDescriptions.Shorthand,
                    type: 'STRING',
                    required: false
                }
            ]
        },
        {
            name: defaultStrings.UserDb.CommandNames.AdminGroup,
            description: defaultStrings.UserDb.CommandDescriptions.AdminCommandGroup,
            type: 'SUB_COMMAND',
            options: [
                {
                    name: defaultStrings.Common.CommandNames.User,
                    description: defaultStrings.Common.CommandDescriptions.User,
                    type: 'MENTIONABLE',
                    required: true
                },
                {
                    name: defaultStrings.Common.CommandNames.Status,
                    description: defaultStrings.UserDb.CommandDescriptions.UserStatus,
                    type: 'INTEGER',
                    required: false
                }
            ]
        },
    ]
}];

export const DBManagement: Command = {
    name: defaultStrings.UserDb.CommandNames.App,
    description: defaultStrings.UserDb.CommandDescriptions.AppCommand,
    type: 'CHAT_INPUT',
    options: UnitDb,

    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const userController = new UserController();
        const unitController = new UnitController();
        await interaction.deferReply();
        // Check user
        const user = await userController.getUser(interaction.user.id);
        const unitAdmin = (await unitController.searchUserAdmin(interaction.user.id)).length > 0;
        // check admin status
        var queryCanEdit = unitAdmin || user.status <= UserAdminStatus.GlobalAdmin;
        if (user.status == UserAdminStatus.isBanned) {
            interaction.editReply(defaultStrings.UserDb.CommandResponses.banned);
            return;
        };
        if (!queryCanEdit) {
            interaction.editReply(defaultStrings.UserDb.CommandResponses.NoPerms);
            return;
        };
        // Check if the user attempting to be added has been banned from using the database
        const UserEditId = interaction.options.get(defaultStrings.Common.CommandNames.User)?.value as string;
        const editUser = await userController.getUser(UserEditId);
        if (editUser?.status == UserAdminStatus.isBanned) {
            interaction.editReply(defaultStrings.UserDb.CommandResponses.editBanned);
            return;
        };

        // Search commands
        var CommandName = '';
        interaction.options.data.map((d) => {
            d.options?.map(option => {
                CommandName = option.name;
            });
        });
        switch (CommandName) {
            case defaultStrings.UserDb.CommandNames.AdminGroup:
                AdminEdit(interaction, user, editUser);
                break;
            case defaultStrings.UserDb.CommandNames.EditorGroup:
                EditorUpdate(interaction, user, editUser);
                // var user
                // var status =interaction.options.get(DbManagementSubVerified.status)?.value;
                // var 
                // // console.log("user: ", interaction.options.get(DbManagementSubVerified.user)?.value);
                // console.log("test: ", interaction.options.get(DbManagementSubVerified.status)?.value);
                break;

            default:
                interaction.editReply("Something went wrong");
                break;
        };
    }
};

const AdminEdit = async (interaction: BaseCommandInteraction, user: UserModel, queryUser: UserModel) => {
    const userController = new UserController();
    if (user.status > UserAdminStatus.GlobalAdmin) {
        interaction.editReply(defaultStrings.UserDb.CommandResponses.noAdminPerms);
        return;
    };
    if (queryUser === undefined) {
        // If user doesn't exist in the database yet, create new user.
        var newUser = interaction.options.get(defaultStrings.Common.CommandNames.User) as unknown as CommandInteractionOption;
        const res = await userController.createUser({
            discordId: newUser.user?.id!,
            discordName: newUser.user?.username!,
            unitHistory: [],
            status: UserAdminStatus.GlobalAdmin
        });
        interaction.editReply(defaultStrings.UserDb.CommandResponses.newGlobalAdmin.replace("{user}", "<@!" + newUser.user?.id + ">"));
    } else {
        const updateStatus: UserAdminStatus = interaction.options.get(defaultStrings.Common.CommandNames.Status)?.value as UserAdminStatus;
        // If users attempt to promote to higher auth than themselves
        if (updateStatus < user.status) {
            interaction.editReply(defaultStrings.UserDb.CommandResponses.notEnoughAuth);
            return;
        };
        // If user query status is unchanged
        if (updateStatus == queryUser.status) {
            interaction.editReply(defaultStrings.UserDb.CommandResponses.unchangedAdmin);
            return;
        };
        await userController.updateUserAdmin(queryUser.discordId, updateStatus);
        var statusDirection = queryUser.status < updateStatus;

        var reply = "";
        if (!statusDirection) {
            reply = defaultStrings.UserDb.CommandResponses.newGlobalAdmin.replace("{user}", pingableUser(queryUser.discordId));
        } else {
            reply = defaultStrings.UserDb.CommandResponses.removeAdmin.replace("{user}", pingableUser(queryUser.discordId));
        }

        interaction.editReply(reply);
    }
};

const EditorUpdate = async (interaction: BaseCommandInteraction, user: UserModel, queryUser: UserModel) => {
    const userController = new UserController();
    const unitController = new UnitController();
    const shorthand = interaction.options.get(defaultStrings.UserDb.CommandNames.Shorthand)?.value as string;
    const status = interaction.options.get(defaultStrings.Common.CommandNames.Status)?.value as boolean;
    var userId = queryUser == undefined ? (interaction.options.get(defaultStrings.Common.CommandNames.User) as unknown as CommandInteractionOption).user?.id : queryUser.discordId;

    if (user.status <= UserAdminStatus.GlobalAdmin) {
        // Global admin attempts to add new user without shorthand
        if (shorthand == undefined) {
            interaction.editReply(defaultStrings.UserDb.CommandResponses.globalAdminNoShorthand);
            return;
        };

        const units = await unitController.searchShorthand(shorthand);
        // Global admin searches/attempts to add user with incorrect shorthand
        // or with shorthand that returns more than one value
        if (units.length == 0) {
            interaction.editReply(defaultStrings.UserDb.CommandResponses.globalAdminNoUnits);
            return;
        }
        if (units.length !== 1) {
            var unitNames: string[] = [];
            units.forEach(entry => {
                unitNames.push(entry.shorthandName);
            });
            var reply = defaultStrings.UserDb.CommandResponses.globalAdminWrongShorthand + BulletListBuilder(unitNames);
            interaction.editReply(reply);
            return;
        };
        if (queryUser == undefined) {
            // return if user you're trying to remove admin powers from a user who doesn't exist
            if (status == false) {
                interaction.editReply("Trying to remove edit perms from user who does not exist");
                return;
            };
            // Create UnitAdmin
            var newUser = (interaction.options.get(defaultStrings.Common.CommandNames.User) as unknown as CommandInteractionOption).user;
            const res = await userController.createUser({
                discordId: newUser?.id!,
                discordName: newUser?.username!,
                unitHistory: [units[0].shorthandName],
                status: UserAdminStatus.User
            });
            await unitController.adminUpdateUserEditor(units[0].shorthandName, newUser?.id!, status);
        } else {
            // Update Users;
            await userController.updateUserAdmin(queryUser.discordId, UserAdminStatus.User);
            await unitController.adminUpdateUserEditor(units[0].shorthandName, userId!, status);
        };
        var editReply = status ? defaultStrings.UserDb.CommandResponses.newEditor : defaultStrings.UserDb.CommandResponses.removeEditor;

        interaction.editReply(editReply.replace("{user}", pingableUser(userId!)).replace("{unit}", units[0].shorthandName));
        return
    };
    // User admin attempts to add update editor/create new editor
    if (user.status == UserAdminStatus.User) {
        // search relationally useradmin unit
        const units = await unitController.searchUserAdmin(user.discordId);

        if (queryUser == undefined) {
            if (status == false) {
                interaction.editReply("Trying to remove edit perms from user who does not exist");
                return;
            };
            // Create UnitAdmin
            var newUser = (interaction.options.get(defaultStrings.Common.CommandNames.User) as unknown as CommandInteractionOption).user;
            const res = await userController.createUser({
                discordId: newUser?.id!,
                discordName: newUser?.username!,
                unitHistory: [units[0].shorthandName],
                status: UserAdminStatus.User
            });
            await unitController.updateUserEditor(user.discordId, userId!, status);

        } else {
            await userController.updateUserAdmin(queryUser.discordId, UserAdminStatus.User);
            await unitController.updateUserEditor(user.discordId, userId!, status);
        };

        var editReply = status ? defaultStrings.UserDb.CommandResponses.newEditor : defaultStrings.UserDb.CommandResponses.removeEditor;

        interaction.editReply(editReply.replace("{user}", pingableUser(userId!)).replace("{unit}", units[0].shorthandName));
        return

    };

};
