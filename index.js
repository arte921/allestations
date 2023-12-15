const { Client, Events, GatewayIntentBits, Partials } = await import('discord.js');

import multiplanner from "multiplanner";

const {
    multiReis,
    planReis,
    formatteerReis  
} = await multiplanner(process.env.NS_API);

const {
    tekst
} = await import('bijbel-package');


const client = new Client({
    intents: [
        // GatewayIntentBits.Guilds,
        // GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});

const updateGamestatus = async () => {
    const tekstregel = await tekst("statenvertaling", ".*");
    const tekstinhoud = tekstregel.match(/(?<=^[0-9A-Za-z ]+ )[^0-9]+$/)[0];
    await client.user.setActivity(tekstinhoud);
};

client.on("ready", async () => {
    console.log(`Ingelogd als ${client.user.tag}`);
    await updateGamestatus();
    setInterval(updateGamestatus, 60000);
});

client.on("messageCreate", async msg => {
    if (msg.author.bot) return;
    const route = msg.content;
    planReis(multiReis(route)).then((reis) => {
        msg.channel.send("```" + formatteerReis(reis) + "```");
    }).catch(console.error);
    // }).catch((_) => msg.react("😕"));
});

client.login(process.env.DISCORD_API);