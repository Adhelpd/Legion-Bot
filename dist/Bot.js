"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubInstall = exports.GitHubConnect = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const express_1 = tslib_1.__importDefault(require("express"));
const InteractionCreate_1 = tslib_1.__importDefault(require("./listeners/InteractionCreate"));
const MessageCreate_1 = tslib_1.__importDefault(require("./listeners/MessageCreate"));
const Ready_1 = tslib_1.__importDefault(require("./listeners/Ready"));
const ConnectionInit_1 = tslib_1.__importDefault(require("./ConnectionInit"));
const dotenv = tslib_1.__importStar(require("dotenv"));
const config_1 = require("./config");
const GitHubRepository_1 = tslib_1.__importDefault(require("./repositories/GitHubRepository"));
const rest_1 = require("@octokit/rest");
const auth_app_1 = require("@octokit/auth-app");
require("./controllers/TestController");
require("./controllers/UnitController");
console.log("Bot is starting...");
dotenv.config();
const app = (0, express_1.default)();
const client = new discord_js_1.Client({
    intents: ["DIRECT_MESSAGES", "GUILD_MESSAGES", "GUILDS"],
    partials: ['CHANNEL', 'MESSAGE']
});
(0, ConnectionInit_1.default)(app);
(0, Ready_1.default)(client);
(0, InteractionCreate_1.default)(client);
(0, MessageCreate_1.default)(client);
exports.GitHubConnect = new rest_1.Octokit({
    authStrategy: auth_app_1.createAppAuth,
    auth: {
        appId: 216439,
        installationId: 27019422,
        privateKey: process.env.GITHUB_PRIVATEKEY,
        clientSecret: process.env.GITHUB_CLIENTSECRET,
    }
});
exports.GitHubInstall = exports.GitHubConnect.auth({
    type: "installation",
    installationId: 27019422,
});
(0, GitHubRepository_1.default)(exports.GitHubConnect);
client.login(config_1.config.DISCORD_TOKEN);
