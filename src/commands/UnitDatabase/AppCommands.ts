import { Client, ModalSubmitInteraction, Guild, GuildPreview, Message, MessageAttachment, Options, MessageEmbed, ApplicationCommandOptionData, BaseCommandInteraction, MessageActionRow, MessageOptions, MessagePayload, ButtonInteraction, HexColorString, ColorResolvable, Interaction, UserManager, User, MessageActionRowComponent, MessageActionRowComponentOptions, ModalActionRowComponent, Modal } from "discord.js";
import { Command } from "../../models/Command";
import { defaultStrings } from "../../common/strings";

const UnitHandlerOptions = new MessageActionRow().addComponents(
    {
        type: "BUTTON",
        label: "Search",
        style: "PRIMARY",
        customId: "button_SearchUnitDb"
    },
    {
        type: "BUTTON",
        label: "Edit Existing Unit",
        style: "PRIMARY",
        customId: "button_UpdateUnitDb",

    },
    {
        type: "BUTTON",
        label: "Create New Unit",
        style: "SECONDARY",
        customId: "button_CreateUnitDbInit"
    },
);

/**
 * Initial entry into the unit database
 */
export const UnitHandler: Command = {
    name: defaultStrings.UnitDb.CommandNames.App,
    description: defaultStrings.UnitDb.CommandDescriptions.AppCommand,
    type: "CHAT_INPUT",
    options: [],

    run: async (client: Client, interaction: BaseCommandInteraction) => {
        await interaction.deferReply();

        const Options: MessageOptions = {
            content: defaultStrings.UnitDb.CommandResponses.entry,
            components: [UnitHandlerOptions]
        };
        const content = new MessagePayload(interaction, Options);
        interaction.editReply(content)
        // interaction.
    }
};