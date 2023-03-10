import { Client, ModalSubmitInteraction, Guild, GuildPreview, Message, MessageAttachment, Options, MessageEmbed, ApplicationCommandOptionData, BaseCommandInteraction, MessageActionRow, MessageOptions, MessagePayload, ButtonInteraction, HexColorString, ColorResolvable, Interaction, UserManager, User, MessageActionRowComponent, MessageActionRowComponentOptions, ModalActionRowComponent, Modal } from "discord.js";
import { FACTION, Prereqs, Unit } from "../models/UnitModel";
import { ButtonSubmitReply, Command, ModalSubmitReply } from "../models/Command";
import { UnitService } from "../services/UnitService";
import { ConvertDateToUnix, NextMissionDate } from "../common/TimeStamp";
import { UnitController } from "../controllers/UnitController";
import { defaultStrings } from "../common/strings";

/**
 * Button Component: Return to Main Menu
 */
const UnitCancelButton: MessageActionRowComponentOptions = {
    type: "BUTTON",
    label: defaultStrings.Common.Labels.Cancel,
    customId: defaultStrings.UnitDb.CommandIds.buttonCancel,
    style: "DANGER"
};

/**
 * Button Component: Advanced Search Options
 */
const UnitSearchButton: MessageActionRowComponentOptions = {
    type: 'BUTTON',
    label: "Search",
    customId: 'button_SearchUnitDb',
    style: 'PRIMARY'
};

/**
 * Button Component: Update Existing unit
 */
const UnitUpdateExistingButton: MessageActionRowComponentOptions = {
    type: 'BUTTON',
    label: defaultStrings.UnitDb.CommandLabels.editExisting,
    customId: defaultStrings.UnitDb.CommandIds.button_unitUpdateDb,
    style: "PRIMARY"
};

/**
 * Button Component: Create new Unit Entry
 */
const UnitCreateNewEntryButton: MessageActionRowComponentOptions = {
    type: "BUTTON",
    label: defaultStrings.UnitDb.CommandLabels.createNew,
    customId: defaultStrings.UnitDb.CommandIds.button_unitCreateInit,
    style: "SECONDARY"
};

/**
 * Button Component: Unit Create 'Got it' (Set 1)
 */
const UnitCreateGotItButton: MessageActionRowComponentOptions = {
    type: "BUTTON",
    label: defaultStrings.UnitDb.CommandLabels.gotIt,
    customId: defaultStrings.UnitDb.CommandIds.button_unitCreateDb,
    style: "SUCCESS"
}

/**
 * Options Set: Main Menu
 */
const UnitHandlerOptions = new MessageActionRow().addComponents(
    UnitSearchButton,
    UnitUpdateExistingButton,
    UnitCreateNewEntryButton
);

/**
 * Options Set: Create Unit 1
 */
const UnitCreateInitOk = new MessageActionRow().addComponents(
    UnitCreateGotItButton,
    UnitCancelButton
);

/**
 * Options Set: Create Unit 2
 */
const UnitCreateInitAgree = new MessageActionRow().addComponents({
    type: "BUTTON",
    label: defaultStrings.UnitDb.CommandLabels.unitAgree,
    customId: defaultStrings.UnitDb.CommandIds.button_createDbAgree,
    style: "SUCCESS"
},
    UnitCancelButton);

/**
 * Options Set: Create Unit 3
 */
const UnitSubmitToDb = new MessageActionRow().addComponents({
    type: "BUTTON",
    label: defaultStrings.UnitDb.CommandLabels.submitToDob,
    customId: defaultStrings.UnitDb.CommandIds.button_unitSubmitDb,
    style: "SUCCESS",
}, {
    type: "BUTTON",
    label: defaultStrings.UnitDb.CommandLabels.editSubmit,
    customId: defaultStrings.UnitDb.CommandIds.button_createDbAgree,
    style: 'PRIMARY'
},
    UnitCancelButton);

/**
 * Initial entry into the unit database
 */
export const UnitHandler: Command = {
    name: defaultStrings.UnitDb.CommandNames.App,
    description: defaultStrings.UnitDb.CommandNames.App,
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

export const UnitButtonCancelled: ButtonSubmitReply = {
    name: defaultStrings.UnitDb.CommandIds.buttonCancel,
    type: "MESSAGE",

    run: async (client: Client, interaction: ButtonInteraction) => {
        const Options: MessageOptions = {
            content: defaultStrings.UnitDb.CommandResponses.entry,
            components: [UnitHandlerOptions],
            embeds: [],
            attachments: []
        };
        Options.embeds?.pop()
        Options.attachments?.pop()
        const content = new MessagePayload(interaction, Options);
        interaction.update(content);
    }
}

/**
 * Reply to unit search option being selected
 */
export const UnitButtonReplySearch: ButtonSubmitReply = {
    name: "button_SearchUnitDb",
    type: 'MESSAGE',
    run: async (client: Client, interaction: ButtonInteraction) => {
        const search = await new UnitService().searchUnitShorthand("187");
        interaction.deferReply();
        interaction.editReply(await EmbedUnitSnapshotBuilder(client, interaction, search[0]));
    }
};

/**
 * Unit creation first text set
 */
export const UnitButtonReplyCreate: ButtonSubmitReply = {
    name: defaultStrings.UnitDb.CommandIds.button_unitCreateInit,
    type: 'MESSAGE',
    run: async (client: Client, interaction: ButtonInteraction) => {

        await interaction.update({
            content: defaultStrings.UnitDb.CommandResponses.unitCreationInit,
            components: [UnitCreateInitOk]
        });
        // interaction.update({''})//interaction.webhook
        // await interaction.webhook.send({
        //     content: 'test'
        // });
        // console.log(interaction.message.)
        // interaction.editReply()
        // console.log(interaction.message)
        // console.log(interaction.)
        // console.log(interaction);
        // console.log(interaction);
    }
};

/**
 * Unit creation second text set
 */
export const UnitButtonReplyCreate1: ButtonSubmitReply = {
    name: defaultStrings.UnitDb.CommandIds.button_unitCreateDb,
    type: "MESSAGE",
    run: async (client: Client, interaction: ButtonInteraction) => {

        await interaction.update({
            content: defaultStrings.UnitDb.CommandResponses.unitCreationInit1,
            components: [UnitCreateInitAgree]
        })
    }
}

/**
 * 
 */
export const UnitButtonReplyCreate2: ButtonSubmitReply = {
    name: defaultStrings.UnitDb.CommandIds.button_createDbAgree,
    type: 'MESSAGE',

    run: async (client: Client, interaction: ButtonInteraction) => {
        await interaction.update({
            content: defaultStrings.UnitDb.CommandResponses.unitCreationInitInstructions,
            components: []
        })
    }
}
/**
 * Unit creation modal display
 */
export const UnitButtonReplyCreate3: ButtonSubmitReply = {
    name: defaultStrings.UnitDb.CommandIds.button_unitCreateInstruction,
    type: "MESSAGE",
    run: async (client: Client, interaction: ButtonInteraction) => {
        // await interaction.deferReply();
        const firstRow = new MessageActionRow<ModalActionRowComponent>().addComponents({
            type: "TEXT_INPUT",
            label: defaultStrings.UnitDb.CommandLabels.discordInvite,
            style: "SHORT",
            required: true,
            maxLength: 30,
            placeholder: defaultStrings.UnitDb.Placeholders.discordInvite,
            customId: defaultStrings.UnitDb.CommandIds.input_unitDiscordInvite
        });
        const secondRow = new MessageActionRow<ModalActionRowComponent>().addComponents({
            type: "TEXT_INPUT",
            label: defaultStrings.UnitDb.CommandLabels.header,
            style: "SHORT",
            required: true,
            maxLength: 20,
            placeholder: defaultStrings.UnitDb.Placeholders.header,
            customId: defaultStrings.UnitDb.CommandIds.input_unitDescriptionTagline
        });
        const thirdRow = new MessageActionRow<ModalActionRowComponent>().addComponents({
            type: "TEXT_INPUT",
            label: defaultStrings.UnitDb.CommandLabels.summary,
            style: "PARAGRAPH",
            required: true,
            maxLength: 1024,
            placeholder: defaultStrings.UnitDb.Placeholders.description,
            customId: defaultStrings.UnitDb.CommandIds.input_unitDescription
        });
        const fourthRow = new MessageActionRow<ModalActionRowComponent>().addComponents({
            type: "TEXT_INPUT",
            label: defaultStrings.UnitDb.CommandLabels.availableRoles,
            style: "SHORT",
            required: true,
            placeholder: defaultStrings.UnitDb.Placeholders.availableRoles,
            customId: defaultStrings.UnitDb.CommandIds.input_unitRoles
        });
        const fifthRow = new MessageActionRow<ModalActionRowComponent>().addComponents({
            type: "TEXT_INPUT",
            label: defaultStrings.UnitDb.CommandLabels.missionTimes,
            style: "SHORT",
            required: true,
            placeholder: defaultStrings.UnitDb.Placeholders.missionTimes,
            customId: defaultStrings.UnitDb.CommandIds.input_missionTimes
        });

        const UnitCreation = new Modal()
            .setTitle(defaultStrings.UnitDb.CommandLabels.modalTitle)
            .setCustomId(defaultStrings.UnitDb.CommandIds.modal_createUnitDb)
            .setComponents(firstRow, secondRow, thirdRow, fourthRow, fifthRow)
        await interaction.showModal(UnitCreation);
        // interaction.awaitModalSubmit(interac)
    }
};

export const UnitButtonReplyEdit: ButtonSubmitReply = {
    name: defaultStrings.UnitDb.CommandIds.button_unitUpdateDb,
    type: 'MESSAGE',
    run: async (client: Client, interaction: ButtonInteraction) => {

    }
};

export const UnitModalCreate: ModalSubmitReply = {
    name: defaultStrings.UnitDb.CommandIds.modal_createUnitDb,
    run: async (client: Client, interaction: ModalSubmitInteraction) => {
        const Ids = defaultStrings.UnitDb.CommandIds;
        var invite = interaction.fields.getTextInputValue(Ids.input_unitDiscordInvite);
        var header = interaction.fields.getTextInputValue(Ids.input_unitDescriptionTagline);
        var description = interaction.fields.getTextInputValue(Ids.input_unitDescription);
        var roles = interaction.fields.getTextInputValue(Ids.input_unitRoles);
        var times = interaction.fields.getTextInputValue(Ids.input_missionTimes);
        const inviteLink = await (client.fetchInvite(invite));
        var Unit: Unit = {
            discordInvite: invite,
            unitLeader: inviteLink.inviter?.id!,
            shorthandName: inviteLink.guild?.name!,
            addedDate: new Date(),
            lastUpdated: new Date(),
            unitDescriptionTag: header,
            unitDescription: description,
            availableRoles: roles,
            missionTimes: times.split(','),
            unitColor: '#572737',
            faction: FACTION.NONE,
            preReqs: {},

        };
        const unitEmbed = await EmbedUnitSnapshotBuilder(client, interaction, Unit);
        unitEmbed.options.content = defaultStrings.UnitDb.CommandResponses.previewContent;
        unitEmbed.options.components = [UnitSubmitToDb];
        await interaction.update(unitEmbed)
    }
};


const EmbedUnitSnapshotBuilder = async (client: Client, interaction: Interaction, unit: Unit): Promise<MessagePayload> => {
    const invite = await client.fetchInvite(unit.discordInvite);
    // var test = (await (interaction.guild?.members.fetch({ user: invite.inviterId! })))?.nickname;
    // console.log(test);
    // client.users.fetch({user:unit.unitLeader})
    // const id = await client.users.resolve(unit.unitLeader);
    // console.log(id);
    const guildInfo = invite.guild;

    const attachString = guildInfo?.splashURL ? guildInfo.splashURL({ size: 512 }) as string : "";
    const icon = guildInfo?.iconURL({ dynamic: true }) as string;
    const name = guildInfo?.name as string;
    const messageAttachment = new MessageAttachment(attachString);
    var prereqs: Prereqs = {
        // "age": 15,
        // "language": "English",
        // "legalCopy": true,
        // "microphone":true,
        // "teamspeak": true,
    };
    var preReqString =
        (prereqs.age ? "\u2022 " + prereqs.age + "+\u000a" : "")
        + (prereqs.language ? "\u2022 " + "...speak " + prereqs.language + "\u000a" : "")
        + (prereqs.legalCopy ? "\u2022 " + "...have a legal copy of Arma3\u000a" : "")
        + (prereqs.microphone ? "\u2022 ...have a functioning microphone\u000a" : "")
        + (prereqs.teamspeak ? "\u2022 ...be able to install and use Teamspeak\u000a" : "");
    var opTimes = unit.missionTimes;
    var collateOps = "";
    opTimes.forEach(opTime => {
        collateOps += ("\u2022 " + opTime + "\u000a");
    });
    var collateRoles = "";
    var roleString = unit.availableRoles.split("|");
    roleString.forEach(role => {
        collateRoles += ("\u2022 " + role + "\u000a");
    });
    var color: ColorResolvable = unit.unitColor ? unit.unitColor as ColorResolvable : "DEFAULT";
    const unitEmbed = new MessageEmbed()
        .setColor(color)
        .setTitle(name)
        .setURL(unit.discordInvite)
        .setAuthor({ name: unit.unitLeader })
        .setThumbnail(icon)
        .setThumbnail(icon)
        .addFields(
            { name: unit.unitDescriptionTag, value: unit.unitDescription },
            (preReqString.length > 1 ? { name: 'Requirements', value: preReqString } : { name: '\u200b', value: '\u200b', inline: false }),
            { name: "Available Roles/Certs", value: collateRoles, inline: true },
            { name: "Next Scheduled Mission(s):", value: collateOps, inline: true },
            // {}
        )
        .setImage("")
        .setFooter({
            text: "Last updated..."
        })
        .setTimestamp(new Date(unit.lastUpdated));
    const content: MessageOptions = {
        embeds: [unitEmbed],
        files: [messageAttachment],
    }

    return new MessagePayload(interaction, content)
}


export const returnUnitEmbed = async (client: Client, message: Message): Promise<void> => {
    // new UnitService.searchUnitShorthand()
    // const test1 = new UnitController().//.searchUnitShorthand("187");
    // const
    const invite = client.fetchInvite("https://discord.gg/9KAfckA");
    const guildInfo = (await invite).guild;
    const attachString = guildInfo?.splashURL ? guildInfo.splashURL({ size: 512 }) as string : "";
    const icon = guildInfo?.iconURL({ dynamic: true }) as string;
    const name = guildInfo?.name as string;
    const description = guildInfo?.description as string;
    const unitDescription = "We are an international ARMA 3 based StarSim unit, with a focus on armored and mechanized infantry tactics. Instead of utilising mass amounts of aircraft to get into the fight, we prefer hitting objectives hard with ground based methods such as our heavy armoured vehicles, pushing the enemy lines with power and utilise our aviation more directly for support.\u000a";
    // const unitDescription1 = "We currently have four main detachments within the 187th, as our focus is armored and mechanized tactics:\u000a**Infantry** - Paladin\u000a**Airborne** - Archer\u000a**Armored** - Lancer\u000a**Aviation** - Hawkbat\u000a**ARC** - Renegade\u000aWhen it comes to ranks, we offer a simple structure with no Time in Grade restrictions, to emphasis the individuals position and responsibility. We switch out a progressive rank structure to an in-depth awards system with the ability to earn yourself customisation on your helmet! This is all to reflect lore and focus on those experiences that truly make Operations memorable, not to mention an in-depth melee system to bring Sword based units into ARMA 3.\u000a **All information, such as uniform guide and ranks are stored on a central location, the 187th Legion Website**\u000a [Check out our trailer]('https://youtu.be/zDGQd7IXJ8w')";
    const messageAttachment = new MessageAttachment(attachString);
    var prereqs: Prereqs = {
        // "age": 15,
        // "language": "English",
        // "legalCopy": true,
        // "microphone":true,
        // "teamspeak": true,
    };
    var preReqString =
        (prereqs.age ? "\u2022 " + prereqs.age + "+\u000a" : "")
        + (prereqs.language ? "\u2022 " + "...speak " + prereqs.language + "\u000a" : "")
        + (prereqs.legalCopy ? "\u2022 " + "...have a legal copy of Arma3\u000a" : "")
        + (prereqs.microphone ? "\u2022 ...have a functioning microphone\u000a" : "")
        + (prereqs.teamspeak ? "\u2022 ...be able to install and use Teamspeak\u000a" : "");
    var text = ["Monday|3:00 PM EST"]
    var opTimes = [
        "Saturday|3:00 PM EST",//ConvertDateToUnix(NextMissionDate("Saturday|3:00 PM EDT")),
        "Saturday|7:00 PM EST",//ConvertDateToUnix(NextMissionDate("Saturday|7:00 PM EST"))
    ];
    var collateOps = "";
    opTimes.forEach(opTime => {
        collateOps += ("\u2022 " + opTime + "\u000a");
    });
    var collateRoles = "";
    var roleString = "Rifleman|Medic|RTO|Team Lead|Squad Lead|Crewman|Engineer|Pilot|Deck Crew";
    var test = roleString.split('|');
    test.forEach(role => {
        collateRoles += ("\u2022 " + role + "\u000a");
    });


    const embedUnit = new MessageEmbed()
        .setColor('#8F00FF')
        .setTitle(name)
        .setURL("https://187th-legion.com/")
        .setAuthor({
            name: "Leader: " + "CC-2012 Sparrow",
        })
        .setThumbnail(icon)
        .addFields(
            { name: "Who are we?", value: unitDescription },
            (preReqString.length > 1 ? { name: 'Requirements', value: preReqString } : { name: '\u200b', value: '\u200b', inline: false }),
            { name: "Available Roles/Certs", value: collateRoles, inline: true },
            { name: "Next Scheduled Mission(s):", value: collateOps, inline: true },
            // {}
        )
        .setImage("")
        .setFooter({
            text: "Last updated..."
        })
        .setTimestamp(new Date());

    message.channel.send({ embeds: [embedUnit], files: [messageAttachment] });
};

// const SearchUserEntries = async (userId: string):Promise<boolean> => {
//     // var search = new UnitService().QueryUnit({"verifiedEditors": {""}})
// }

export const retrieveUnitInfo = async (client: Client, message: Message) => {

};

export const createUnitInfo = async (client: Client, message: Message) => {

}


