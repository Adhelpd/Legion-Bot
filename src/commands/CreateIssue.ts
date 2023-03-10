// import { Octokit } from "@octokit/rest";
import { BaseCommandInteraction, ApplicationCommandOptionData, MessageSelectOptionData, ModalSubmitInteraction, Modal, ModalActionRowComponent, TextInputComponent, CommandInteractionOption, Client, MessageActionRow, InteractionReplyOptions, MessagePayload, MessageOptions, MessageSelectMenu, MessageEmbed, ButtonInteraction, MessageSelectOption } from "discord.js";
import { GitHubIssueModel } from "../models/GitHub";
import { GitHubConnect } from "../Bot";
// import { GitHubConnect } from "../repositories/GitHubRepository";
import { ButtonSubmitReply, Command, ModalSubmitReply } from "../models/Command";

// const gitHubResponse: ApplicationCommandOptionData[] = [{
//     name: "create",
//     description: "create an issue",
//     type: 1,
//     options: [
//         {
//             name: "type",
//             description: "Feedback or Bug",
//             type: 3,
//             required: true
//         },
//         {
//             name: "title",
//             description: "Title of your feedback/bug",
//             type: 3,
//             required: true
//         },
//         {
//             name: "description",
//             description: "description of bug, include hyperlinks to pictures, videos, etc.",
//             type: 3,
//             required: true
//         }
//     ]
// }];

const GithubInteraction: ApplicationCommandOptionData[] = [{
    name: "create",
    description: "Begin creating a new Bug/Feedback",
    type: "SUB_COMMAND"
}];

const HaveYouSeenThis = new MessageActionRow()
    .addComponents(
        {
            type: "BUTTON",
            label: "Create New Topic",
            style: "SUCCESS",
            customId: "githubSearch_yes"
        },
        {
            type: "BUTTON",
            label: "Cancel",
            style: "DANGER",
            customId: "githubSearch_no"
        }
    );

const CreateTopicRow = new MessageActionRow()
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


export const GitHubIssue: Command = {
    name: "new-topic",
    description: " a bug/feedback topic",
    type: "CHAT_INPUT",
    options: [],

    run: async (client: Client, interaction: BaseCommandInteraction) => {
        // var test = interaction.options.data as CommandInteractionOption[];
        // console.log(test[0].options);
        // const content = "Test!";
        // const Button = new MessageActionRow()
        // GitHubConnect.issues.create()
        // var test = GitHubConnect.request("GET /orgs/{org}",{
        //     org: "Legion-Studios"
        // });
        // console.log("Test me: ", test);
        // interaction
        // interaction.followUp()
        const firstRow = new MessageActionRow<ModalActionRowComponent>().addComponents({
            type: "TEXT_INPUT",
            label: "Asset...",
            style: "SHORT",
            required: true,
            maxLength: 50,
            placeholder: "e.g., DC-15A, Tusken Raiders, AT-TE, etc.",
            customId: "input_asset"
        });
        const secondRow = new MessageActionRow<ModalActionRowComponent>().addComponents({
            type: "TEXT_INPUT",
            label: "Additional search terms (Separate with comma)",
            customId: "input_keywords",
            style: "SHORT",
            placeholder: "e.g., Akimbo, Textures, missing, clipping, etc."
        });
        const GitInteraction = new Modal()
            .setTitle("Search for duplicate topics...")
            .setCustomId("Github_interact_modal")
            .setComponents(firstRow, secondRow);
        // GitInteraction.
        await interaction.showModal(GitInteraction).catch(e => { console.log(e) });
        // interaction.deferReply()

        // const test = interaction.awaitModalSubmit({time: 5000});
        // console.log(test);


        // const options: MessageOptions = {
        //     content: "Before we begin, we'll be searching for duplicates, please...\n \u2022 Input the name of the asset.\n \u2022 Include Keywords, separated by commas (,) [Optional]",
        //     components: [SearchGithubForTopic]
        // }
        // const content = new MessagePayload(interaction, options)
        // const answer = await interaction.followUp(content);
        // console.log("Content: ", answer.content);
        // answer.
        // console.log("Test: ", answer);
    }
};

export const GithubModalReply: ModalSubmitReply = {
    name: "Github_interact_modal",

    run: async (client: Client, interaction: ModalSubmitInteraction) => {
        await interaction.deferReply();
        var asset = interaction.fields.getTextInputValue('input_asset').replace(/[^a-z0-9]/gi, '').toLocaleLowerCase();
        var keywords = interaction.fields.getTextInputValue('input_keywords').replace(/[^a-z0-9,]/gi, '').toLocaleLowerCase().split(',');

        if (keywords[0] == '') {
            keywords = [];
        };
        const searchTerms: string[] = [asset].concat(keywords);
        console.log(searchTerms);
        var issues: GitHubIssueModel[] = [];
        await GitHubConnect.paginate(
            "GET /repos/{owner}/{repo}/issues",
            { owner: "Legion-Studios", repo: "Legion-Issue-Tracker" },
            (response) => response.data.map((issue) => {
                var test: GitHubIssueModel = issue as GitHubIssueModel;
                // var hasSearchTerm = false;
                // search in case of multiple searches
                searchTerms.forEach(term => {
                    if (test.title.toLocaleLowerCase().includes(term) || test.body?.toLocaleLowerCase().includes(term)) {
                        console.log(test.title);
                        issues.push(test);
                        // break
                        // issues.push(test);
                        // console.log(test);
                    };
                });
                // if (hasSearchTerm) {
                //     issues.push(test);
                // };
            })
        );

        // .then((issueTitles) => {
        //     issues = issueTitles;
        // });
        // issues.
        // console.log(issues);
        const RowOptions = new MessageSelectMenu()
            .setCustomId('issueSelect')
            .setPlaceholder("Any of these look similar to your topic?");
        issues.forEach(entry => {
            var RowOption: MessageSelectOptionData = {
                label: entry.title,
                value: entry.number.toString()
            };
            RowOptions.addOptions(RowOption);
        });
        const ActionRow = new MessageActionRow().setComponents(RowOptions);
        // const embed = new MessageEmbed().setTitle('Potential Duplicate Issues:');
        // var collateTitles = "";
        // issues.forEach(opTime => {
        //     collateTitles += ("\u2022 " + opTime.title + "\u000a");
        // });


        await interaction.editReply({
            content: "Please review the dropdown menu for similar topics.\u000a\u000aSelecting a topic from the dropdown menu will give you a summary and a link to the topic on Github.\u000a\u000aIf you're unsure about how to proceed, please hit 'cancel' and ping a moderator",
            components: [ActionRow, HaveYouSeenThis]
        });

    }
};

export const GithubSearchReplyYes: ButtonSubmitReply = {
    name: "githubSearch_yes",
    type: 'MESSAGE',
    run: async (client: Client, interaction: ButtonInteraction) => {

    }

}