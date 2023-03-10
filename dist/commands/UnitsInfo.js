"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUnitInfo = exports.retrieveUnitInfo = exports.returnUnitEmbed = exports.UnitModalCreate = exports.UnitButtonReplyEdit = exports.UnitButtonReplyCreate2 = exports.UnitButtonReplyCreate1 = exports.UnitButtonReplyCreate = exports.UnitButtonReplySearch = exports.UnitButtonCancelled = exports.UnitHandler = void 0;
const discord_js_1 = require("discord.js");
const UnitService_1 = require("../services/UnitService");
const strings_1 = require("../common/strings");
const UnitCancelButton = {
    type: "BUTTON",
    label: "Cancel",
    customId: "button_unitCancel",
    style: "DANGER"
};
const UnitOptions = [{
        name: "unit-database",
        description: "Unit Database Commands",
        type: "SUB_COMMAND_GROUP",
        options: [
            {
                name: "search",
                description: "Search database",
                type: "SUB_COMMAND",
                options: [{
                        name: "",
                        description: "",
                        type: "STRING",
                        required: true
                    }]
            },
            {
                name: "create",
                description: "create new unit entry",
                type: "SUB_COMMAND",
                options: [{
                        name: "test",
                        description: "",
                        type: "STRING",
                    }]
            },
            {
                name: "update",
                description: "update existing unit entry",
                type: "SUB_COMMAND",
                options: [{
                        name: "",
                        description: "",
                        type: "STRING"
                    }]
            }
        ]
    }];
const UnitHandlerOptions = new discord_js_1.MessageActionRow()
    .addComponents({
    type: "BUTTON",
    label: "Search",
    style: "PRIMARY",
    customId: "button_SearchUnitDb"
}, {
    type: "BUTTON",
    label: "Edit Existing Unit",
    style: "PRIMARY",
    customId: "button_UpdateUnitDb",
}, {
    type: "BUTTON",
    label: "Create New Unit",
    style: "SECONDARY",
    customId: "button_CreateUnitDbInit"
});
const UnitCreateInitOk = new discord_js_1.MessageActionRow().addComponents({
    type: "BUTTON",
    label: "Got it!",
    customId: "button_unitCreateDb1",
    style: "SUCCESS"
}, UnitCancelButton);
const UnitCreateInitAgree = new discord_js_1.MessageActionRow().addComponents({
    type: "BUTTON",
    label: "I agree",
    customId: "button_unitCreateDbAgree",
    style: "SUCCESS"
}, UnitCancelButton);
exports.UnitHandler = {
    name: "unit-database",
    description: "Activate the unit database!",
    type: "CHAT_INPUT",
    options: [],
    run: async (client, interaction) => {
        await interaction.deferReply();
        const Options = {
            content: strings_1.defaultStrings.UnitDb.entry,
            components: [UnitHandlerOptions]
        };
        const content = new discord_js_1.MessagePayload(interaction, Options);
        interaction.editReply(content);
    }
};
exports.UnitButtonCancelled = {
    name: "button_unitCancel",
    type: "MESSAGE",
    run: async (client, interaction) => {
        const Options = {
            content: strings_1.defaultStrings.UnitDb.entry,
            components: [UnitHandlerOptions]
        };
        const content = new discord_js_1.MessagePayload(interaction, Options);
        interaction.update(content);
    }
};
exports.UnitButtonReplySearch = {
    name: "button_SearchUnitDb",
    type: 'MESSAGE',
    run: async (client, interaction) => {
        const search = await new UnitService_1.UnitService().searchUnitShorthand("187");
        interaction.deferReply();
        interaction.editReply(await EmbedUnitSnapshotBuilder(client, interaction, search[0]));
    }
};
exports.UnitButtonReplyCreate = {
    name: "button_CreateUnitDbInit",
    type: 'MESSAGE',
    run: async (client, interaction) => {
        await interaction.update({
            content: strings_1.defaultStrings.UnitCreation.unitCreationInit,
            components: [UnitCreateInitOk]
        });
    }
};
exports.UnitButtonReplyCreate1 = {
    name: "button_unitCreateDb1",
    type: "MESSAGE",
    run: async (client, interaction) => {
        await interaction.update({
            content: strings_1.defaultStrings.UnitCreation.unitCreationInit1,
            components: [UnitCreateInitAgree]
        });
    }
};
exports.UnitButtonReplyCreate2 = {
    name: "button_unitCreateDbAgree",
    type: "MESSAGE",
    run: async (client, interaction) => {
        const firstRow = new discord_js_1.MessageActionRow().addComponents({
            type: "TEXT_INPUT",
            label: "Discord Invite",
            style: "SHORT",
            required: true,
            maxLength: 30,
            placeholder: "Please input your discord invite here...",
            customId: "input_unitDiscordInvite"
        });
        const secondRow = new discord_js_1.MessageActionRow().addComponents({
            type: "TEXT_INPUT",
            label: "Summary Header",
            style: "SHORT",
            required: true,
            maxLength: 20,
            placeholder: "Please put a header or tagline here...",
            customId: "input_unitDescriptionTagline"
        });
        const thirdRow = new discord_js_1.MessageActionRow().addComponents({
            type: "TEXT_INPUT",
            label: "Summary",
            style: "PARAGRAPH",
            required: true,
            maxLength: 1024,
            placeholder: "Unit summary",
            customId: "input_unitDescription"
        });
        const fourthRow = new discord_js_1.MessageActionRow().addComponents({
            type: "TEXT_INPUT",
            label: "Available Certs/Roles",
            style: "SHORT",
            required: true,
            placeholder: "Roles must be input like 'Rifleman|AT|ARC|etc.",
            customId: "input_unitRoles"
        });
        const fifthRow = new discord_js_1.MessageActionRow().addComponents({
            type: "TEXT_INPUT",
            label: "Recurring Mission Times",
            style: "SHORT",
            required: true,
            placeholder: "Please separate mission times (Monday|3:00 PM, )",
            customId: "input_missionTimes"
        });
        const UnitCreation = new discord_js_1.Modal()
            .setTitle("Create New Unit in Database")
            .setCustomId("modal_CreateUnitDb")
            .setComponents(firstRow, secondRow, thirdRow, fourthRow, fifthRow);
        await interaction.showModal(UnitCreation);
    }
};
exports.UnitButtonReplyEdit = {
    name: "button_UpdateUnitDb",
    type: 'MESSAGE',
    run: async (client, interaction) => {
    }
};
exports.UnitModalCreate = {
    name: "modal_CreateUnitDb",
    run: async (client, interaction) => {
        interaction.deferReply();
        var invite = interaction.fields.getTextInputValue('input_unitDiscordInvite');
        var header = interaction.fields.getTextInputValue('input_unitDescriptionTagline');
        var description = interaction.fields.getTextInputValue('input_unitDescription');
        var roles = interaction.fields.getTextInputValue('input_unitRoles');
        var times = interaction.fields.getTextInputValue('input_missionTimes');
        const inviteLink = await (client.fetchInvite(invite));
        var Unit = {
            discordInvite: invite,
            unitLeader: inviteLink.inviter?.username,
            shorthandName: inviteLink.guild?.name,
            addedDate: new Date(),
            lastUpdated: new Date(),
            unitDescriptionTag: header,
            unitDescription: description,
            availableRoles: roles,
            missionTimes: times.split(','),
            unitColor: '#572737'
        };
        const unitEmbed = await EmbedUnitSnapshotBuilder(client, interaction, Unit);
        await interaction.editReply(unitEmbed);
    }
};
const EmbedUnitSnapshotBuilder = async (client, interaction, unit) => {
    const invite = client.fetchInvite(unit.discordInvite);
    var test = await (await (interaction.guild?.members.fetch({ user: "256917006123532299" })))?.nickname;
    console.log(test);
    const guildInfo = (await invite).guild;
    const attachString = guildInfo?.splashURL ? guildInfo.splashURL({ size: 512 }) : "";
    const icon = guildInfo?.iconURL({ dynamic: true });
    const name = guildInfo?.name;
    const messageAttachment = new discord_js_1.MessageAttachment(attachString);
    var prereqs = {};
    var preReqString = (prereqs.age ? "\u2022 " + prereqs.age + "+\u000a" : "")
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
    var color = unit.unitColor ? unit.unitColor : "DEFAULT";
    const unitEmbed = new discord_js_1.MessageEmbed()
        .setColor(color)
        .setTitle(name)
        .setURL(unit.discordInvite)
        .setAuthor({ name: unit.unitLeader })
        .setThumbnail(icon)
        .setThumbnail(icon)
        .addFields({ name: unit.unitDescriptionTag, value: unit.unitDescription }, (preReqString.length > 1 ? { name: 'Requirements', value: preReqString } : { name: '\u200b', value: '\u200b', inline: false }), { name: "Available Roles/Certs", value: collateRoles, inline: true }, { name: "Next Scheduled Mission(s):", value: collateOps, inline: true })
        .setImage("")
        .setFooter({
        text: "Last updated..."
    })
        .setTimestamp(new Date(unit.lastUpdated));
    const content = {
        embeds: [unitEmbed],
        files: [messageAttachment],
    };
    return new discord_js_1.MessagePayload(interaction, content);
};
const returnUnitEmbed = async (client, message) => {
    const invite = client.fetchInvite("https://discord.gg/9KAfckA");
    const guildInfo = (await invite).guild;
    const attachString = guildInfo?.splashURL ? guildInfo.splashURL({ size: 512 }) : "";
    const icon = guildInfo?.iconURL({ dynamic: true });
    const name = guildInfo?.name;
    const description = guildInfo?.description;
    const unitDescription = "We are an international ARMA 3 based StarSim unit, with a focus on armored and mechanized infantry tactics. Instead of utilising mass amounts of aircraft to get into the fight, we prefer hitting objectives hard with ground based methods such as our heavy armoured vehicles, pushing the enemy lines with power and utilise our aviation more directly for support.\u000a";
    const messageAttachment = new discord_js_1.MessageAttachment(attachString);
    var prereqs = {};
    var preReqString = (prereqs.age ? "\u2022 " + prereqs.age + "+\u000a" : "")
        + (prereqs.language ? "\u2022 " + "...speak " + prereqs.language + "\u000a" : "")
        + (prereqs.legalCopy ? "\u2022 " + "...have a legal copy of Arma3\u000a" : "")
        + (prereqs.microphone ? "\u2022 ...have a functioning microphone\u000a" : "")
        + (prereqs.teamspeak ? "\u2022 ...be able to install and use Teamspeak\u000a" : "");
    var text = ["Monday|3:00 PM EST"];
    var opTimes = [
        "Saturday|3:00 PM EST",
        "Saturday|7:00 PM EST",
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
    const embedUnit = new discord_js_1.MessageEmbed()
        .setColor('#8F00FF')
        .setTitle(name)
        .setURL("https://187th-legion.com/")
        .setAuthor({
        name: "Leader: " + "CC-2012 Sparrow",
    })
        .setThumbnail(icon)
        .addFields({ name: "Who are we?", value: unitDescription }, (preReqString.length > 1 ? { name: 'Requirements', value: preReqString } : { name: '\u200b', value: '\u200b', inline: false }), { name: "Available Roles/Certs", value: collateRoles, inline: true }, { name: "Next Scheduled Mission(s):", value: collateOps, inline: true })
        .setImage("")
        .setFooter({
        text: "Last updated..."
    })
        .setTimestamp(new Date());
    message.channel.send({ embeds: [embedUnit], files: [messageAttachment] });
};
exports.returnUnitEmbed = returnUnitEmbed;
const retrieveUnitInfo = async (client, message) => {
};
exports.retrieveUnitInfo = retrieveUnitInfo;
const createUnitInfo = async (client, message) => {
};
exports.createUnitInfo = createUnitInfo;
