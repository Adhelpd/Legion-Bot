import { Client } from "discord.js";
import express from 'express';
import InteractionCreate from "./listeners/InteractionCreate";
import MessageCreate from "./listeners/MessageCreate";
import Ready from "./listeners/Ready";
import ConnectionInit from "./ConnectionInit";
import * as dotenv from "dotenv";
import { config } from "./config";
import ConnectToGithub from "./repositories/GitHubRepository";
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import './controllers/TestController';
import './controllers/UnitController';

console.log("Bot is starting...");

dotenv.config();
const app = express();


const client = new Client({
    intents: ["DIRECT_MESSAGES", "GUILD_MESSAGES", "GUILDS"],
    partials: ['CHANNEL','MESSAGE']
});
ConnectionInit(app);
Ready(client);
InteractionCreate(client);
MessageCreate(client);

export const GitHubConnect = new Octokit({
    authStrategy: createAppAuth,
    auth: {
        appId: 216439,
        installationId: 27019422,
        privateKey: process.env.GITHUB_PRIVATEKEY!,
        // clientId: process.env.GITHUB_CLIENTID!,
        clientSecret: process.env.GITHUB_CLIENTSECRET,
    }
});
export const GitHubInstall = GitHubConnect.auth({
    type: "installation",
    installationId: 27019422,
    //factory: ({FactoryInstallation<InstallationAuthOptionsWithFactory>,...auth}) => new Octokit({auth}),//({ octokitOptions, ...auth }) => new Octokit({ ...octokitOptions, auth }),
});
ConnectToGithub(GitHubConnect);

client.login(config.DISCORD_TOKEN);