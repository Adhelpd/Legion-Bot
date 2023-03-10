"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubSearchReplyYes = exports.GithubModalReply = exports.GitHubIssue = void 0;
const discord_js_1 = require("discord.js");
const Bot_1 = require("../Bot");
const GithubInteraction = [{
        name: "create",
        description: "Begin creating a new Bug/Feedback",
        type: "SUB_COMMAND"
    }];
const HaveYouSeenThis = new discord_js_1.MessageActionRow()
    .addComponents({
    type: "BUTTON",
    label: "Create New Topic",
    style: "SUCCESS",
    customId: "githubSearch_yes"
}, {
    type: "BUTTON",
    label: "Cancel",
    style: "DANGER",
    customId: "githubSearch_no"
});
const CreateTopicRow = new discord_js_1.MessageActionRow()
    .addComponents({
    type: "BUTTON",
    label: "New Bug",
    style: "PRIMARY",
    customId: "bug"
})
    .addComponents({
    type: "BUTTON",
    label: "New Feedback",
    style: "PRIMARY",
    customId: "feedback"
})
    .addComponents({
    type: "BUTTON",
    label: "Cancel",
    style: "DANGER",
    customId: "cancel_me"
});
exports.GitHubIssue = {
    name: "new-topic",
    description: " a bug/feedback topic",
    type: "CHAT_INPUT",
    options: [],
    run: async (client, interaction) => {
        const firstRow = new discord_js_1.MessageActionRow().addComponents({
            type: "TEXT_INPUT",
            label: "Asset...",
            style: "SHORT",
            required: true,
            maxLength: 50,
            placeholder: "e.g., DC-15A, Tusken Raiders, AT-TE, etc.",
            customId: "input_asset"
        });
        const secondRow = new discord_js_1.MessageActionRow().addComponents({
            type: "TEXT_INPUT",
            label: "Additional search terms (Separate with comma)",
            customId: "input_keywords",
            style: "SHORT",
            placeholder: "e.g., Akimbo, Textures, missing, clipping, etc."
        });
        const GitInteraction = new discord_js_1.Modal()
            .setTitle("Search for duplicate topics...")
            .setCustomId("Github_interact_modal")
            .setComponents(firstRow, secondRow);
        await interaction.showModal(GitInteraction).catch(e => { console.log(e); });
    }
};
exports.GithubModalReply = {
    name: "Github_interact_modal",
    run: async (client, interaction) => {
        await interaction.deferReply();
        var asset = interaction.fields.getTextInputValue('input_asset').replace(/[^a-z0-9]/gi, '').toLocaleLowerCase();
        var keywords = interaction.fields.getTextInputValue('input_keywords').replace(/[^a-z0-9,]/gi, '').toLocaleLowerCase().split(',');
        if (keywords[0] == '') {
            keywords = [];
        }
        ;
        const searchTerms = [asset].concat(keywords);
        console.log(searchTerms);
        var issues = [];
        await Bot_1.GitHubConnect.paginate("GET /repos/{owner}/{repo}/issues", { owner: "Legion-Studios", repo: "Legion-Issue-Tracker" }, (response) => response.data.map((issue) => {
            var test = issue;
            searchTerms.forEach(term => {
                if (test.title.toLocaleLowerCase().includes(term) || test.body?.toLocaleLowerCase().includes(term)) {
                    console.log(test.title);
                    issues.push(test);
                }
                ;
            });
        }));
        const RowOptions = new discord_js_1.MessageSelectMenu()
            .setCustomId('issueSelect')
            .setPlaceholder("Any of these look similar to your topic?");
        issues.forEach(entry => {
            var RowOption = {
                label: entry.title,
                value: entry.number.toString()
            };
            RowOptions.addOptions(RowOption);
        });
        const ActionRow = new discord_js_1.MessageActionRow().setComponents(RowOptions);
        await interaction.editReply({
            content: "Please review the dropdown menu for similar topics.\u000a\u000aSelecting a topic from the dropdown menu will give you a summary and a link to the topic on Github.\u000a\u000aIf you're unsure about how to proceed, please hit 'cancel' and ping a moderator",
            components: [ActionRow, HaveYouSeenThis]
        });
    }
};
exports.GithubSearchReplyYes = {
    name: "githubSearch_yes",
    type: 'MESSAGE',
    run: async (client, interaction) => {
    }
};
