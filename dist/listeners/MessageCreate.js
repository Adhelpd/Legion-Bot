"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const Commands_1 = require("../Commands");
exports.default = (client) => {
    client.on("messageCreate", async (message) => {
        if (message.author.bot)
            return;
        if (!message.content.startsWith(config_1.config.PREFIX))
            return;
        await handleMessage(client, message);
    });
};
const handleMessage = async (client, message) => {
    const prefixSlice = message.content.slice(config_1.config.PREFIX.length);
    const userCommand = Commands_1.MessageCommands.find(m => prefixSlice.includes(m.name));
    if (!userCommand) {
        message.reply("I'm sorry, That has not been programmed yet.");
    }
    ;
    const content = prefixSlice.slice(userCommand?.name.length).trim();
    userCommand?.run(client, message, content);
};
