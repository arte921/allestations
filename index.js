import { Client, GatewayIntentBits, Partials } from 'discord.js';
import multiplanner from "multiplanner";

const {
    multiReis,
    planReis,
    formatteerReis
} = await multiplanner(process.env.NS_API);


const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
    ],
    partials: [
        Partials.Channel,
        Partials.Message
    ]
});

client.on("ready", async () => {
    console.log(`Ingelogd als ${client.user.tag}`);
});

client.on("messageCreate", async msg => {
    if (msg.author.bot) return;
    const route = msg.content;
    planReis(multiReis(route)).then(async (reis) => {
        const response = formatteerReis(reis);
        if (response.length < 1990) {
            await msg.channel.send("```" + response + "```");
        } else {
            await msg.channel.send({
                files: [{
                    attachment: Buffer.from(response, "utf-8"),
                    name: 'trein.txt'
                }]
            });
        }
    }).catch((_) => msg.react("😕"));
});

client.login(process.env.DISCORD_API);