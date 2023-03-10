import { Client, Message } from "discord.js";

import { UserService } from "../../services/TestService";
import { UnitService } from "src/services/UnitService";
import { MessageCommand } from "../../models/Command";

const UnitCommands = {
    createAdmin: "createAdmin",
};

export const UnitDbHandler: MessageCommand = {
    name: "unit-db",
    type: 'MESSAGE',

    run: async (client: Client, message: Message, content: string) => {
        // const result = content.slice(UnitDbHandler.name.length).trim();

        switch (content) {
            case UnitCommands.createAdmin:
                CreateAdminUser.run(client, message, content);
                break;
        
            default:
                message.reply(`Invalid modify unit database command: ${content}`)
                break;
        }
    }
};

const CreateAdminUser: MessageCommand = {
    name: UnitCommands.createAdmin,
    type: 'MESSAGE',

    run: async (client: Client, message: Message, content: string) => {
        // await new UserService().create(
        //     {
        //         status: 0,
        //         unitHistory: [''],
        //         discordId: message.author.id,
        //         discordName: message.author.username
        //     }
        // );
    }
};