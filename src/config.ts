let conf;

try {
    conf = require('../config.json');
} 
catch (e) 
{
    conf = {
        DISCORD_TOKEN: process.env.DISCORD_TOKEN,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        GITHUB_NAME: process.env.GITHUB_NAME,
        PREFIX: process.env.PREFIX
    };
};

export const config = conf;