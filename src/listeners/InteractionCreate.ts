import { BaseCommandInteraction, ButtonInteraction, Client, Interaction, ModalSubmitInteraction } from "discord.js";
import { ButtonReplies, Commands, ModalReplies } from "../Commands";

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            await handleSlashCommand(client, interaction);
        };
        if (interaction.isModalSubmit()) {
            await handleModalSubmit(client, interaction);
        };
        if(interaction.isButton()){
            await handleButtonSubmit(client, interaction);
        }

    });
};

const handleSlashCommand = async (client: Client, interaction: BaseCommandInteraction): Promise<void> => {
    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    slashCommand.run(client, interaction);
};

const handleModalSubmit = async (client: Client, interaction: ModalSubmitInteraction): Promise<void> => {
    const modalReply = ModalReplies.find(m => m.name === interaction.customId);
    if (!modalReply) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    };

    modalReply.run(client, interaction);
};

const handleButtonSubmit = async (client: Client, interaction: ButtonInteraction): Promise<void> => {
    const buttonReply = ButtonReplies.find(b => b.name === interaction.customId);
    if (!buttonReply) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    buttonReply.run(client, interaction);
};