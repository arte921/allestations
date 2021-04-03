const Discord = require("discord.js");

const multiReis = require('./functies/multiReis.js');
const formatteerReis = require('./functies/formatteerReis.js');
const readJSONSync = require('./functies/readJSONSync.js');

const config = readJSONSync("config");

const client = new Discord.Client();

// Runs at successful login to discord.
client.on("ready", async () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity(config.gamestatus);
});

// Runs on new message.
client.on("message", async (msg) => {
    if (msg.author.bot || !msg.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
    const route = msg.content.slice(config.prefix.length);
    multiReis(route).then((reis) => {
        const reisScriptNederlands = formatteerReis(reis);
        msg.channel.send("```" + reisScriptNederlands + "```");
    }).catch((_) => msg.react("😕"));

});

client.login(config.dicord_bot_token);