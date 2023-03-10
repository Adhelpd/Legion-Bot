"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
let conf;
try {
    conf = require('../config.json');
}
catch (e) {
    conf = {
        DISCORD_TOKEN: process.env.DISCORD_TOKEN,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        GITHUB_NAME: process.env.GITHUB_NAME,
        PREFIX: process.env.PREFIX
    };
}
;
exports.config = conf;
