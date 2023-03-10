import { BaseApplicationCommandData, Message, BaseCommandInteraction, ButtonInteraction, ChatInputApplicationCommandData, Client, Interaction, MessageApplicationCommandData, ModalSubmitInteraction } from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    run: (client: Client, interaction: BaseCommandInteraction) => void;
};

export interface ButtonSubmitReply extends MessageApplicationCommandData {
    run: (client: Client, interaction: ButtonInteraction) => void;
}

export interface MessageCommand extends MessageApplicationCommandData {
    run: (client: Client, message: Message, content: string) => void;
};

export interface ModalSubmitReply extends BaseApplicationCommandData {
    run: (client: Client, interaction: ModalSubmitInteraction) => void;
};