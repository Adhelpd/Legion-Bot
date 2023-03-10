import { BaseCommandInteraction, Client } from "discord.js";
import { Command } from "../models/Command";

export const Challenge: Command = {
    name: "master",
    description: "Test your mom",
    type: "CHAT_INPUT",
    run: async (client: Client, interaction: BaseCommandInteraction) => {
        const content = "Test!";

        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
}; 