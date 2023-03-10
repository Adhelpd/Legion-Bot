"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitDbHandler = void 0;
const UnitCommands = {
    createAdmin: "createAdmin",
};
exports.UnitDbHandler = {
    name: "unit-db",
    type: 'MESSAGE',
    run: async (client, message, content) => {
        switch (content) {
            case UnitCommands.createAdmin:
                CreateAdminUser.run(client, message, content);
                break;
            default:
                message.reply(`Invalid modify unit database command: ${content}`);
                break;
        }
    }
};
const CreateAdminUser = {
    name: UnitCommands.createAdmin,
    type: 'MESSAGE',
    run: async (client, message, content) => {
    }
};
