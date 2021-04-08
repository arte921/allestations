const Discord = require("discord.js");

const {
    multiReis,
    formatteerReis
} = require("multiplanner");

const readJSONSync = require('./functies/readJSONSync.js');

const config = readJSONSync("config");

const client = new Discord.Client();

client.on("ready", async () => {
    console.log(`Ingelogd als ${client.user.tag}`);
    client.user.setActivity(config.gamestatus);
});

client.on("message", async (msg) => {
    if (msg.author.bot || !msg.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    const route = msg.content.slice(config.prefix.length);
    multiReis(route).then((reis) => {
        const reisScriptNederlands = formatteerReis(reis);
        msg.channel.send("```" + reisScriptNederlands + "```");
    }).catch((_) => msg.react("😕"));
});

client.login(config.dicord_bot_token);