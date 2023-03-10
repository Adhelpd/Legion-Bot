"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Commands_1 = require("../Commands");
exports.default = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        }
        ;
        if (interaction.isModalSubmit()) {
            await handleModalSubmit(client, interaction);
        }
        ;
        if (interaction.isButton()) {
            await handleButtonSubmit(client, interaction);
        }
    });
};
const handleSlashCommand = async (client, interaction) => {
    const slashCommand = Commands_1.Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }
    slashCommand.run(client, interaction);
};
const handleModalSubmit = async (client, interaction) => {
    const modalReply = Commands_1.ModalReplies.find(m => m.name === interaction.customId);
    if (!modalReply) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }
    ;
    modalReply.run(client, interaction);
};
const handleButtonSubmit = async (client, interaction) => {
    const buttonReply = Commands_1.ButtonReplies.find(b => b.name === interaction.customId);
    if (!buttonReply) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }
    buttonReply.run(client, interaction);
};
