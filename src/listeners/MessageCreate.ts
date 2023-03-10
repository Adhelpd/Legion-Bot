import { Client, Message } from "discord.js";
import { config } from "../config";
import { MessageCommands } from "../Commands";
import { returnUnitEmbed } from "../commands/UnitsInfo";
// import { PREFIX } from "../config/config";

export default (client: Client): void => {
    client.on("messageCreate", async (message: Message) => {
        if (message.author.bot) return;
        if (!message.content.startsWith(config.PREFIX)) return;
        await handleMessage(client, message);

    })
};

const handleMessage = async (client: Client, message: Message): Promise<void> => {
    const prefixSlice = message.content.slice(config.PREFIX.length);

    const userCommand = MessageCommands.find(m => prefixSlice.includes(m.name));
    if(!userCommand) {
        message.reply("I'm sorry, That has not been programmed yet.")
    };
    const content = prefixSlice.slice(userCommand?.name.length).trim();

    userCommand?.run(client, message, content);
}