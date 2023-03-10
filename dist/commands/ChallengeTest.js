"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Challenge = void 0;
exports.Challenge = {
    name: "master",
    description: "Test your mom",
    type: "CHAT_INPUT",
    run: async (client, interaction) => {
        const content = "Test!";
        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};
