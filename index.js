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

const send = async (channel, message) => {
    try {
        if (message.length < 1990) {
            await channel.send("```" + message + "```");
        } else {
            await channel.send({
                files: [{
                    attachment: Buffer.from(message, "utf-8"),
                    name: 'trein.txt'
                }]
            });
        }
    } catch(e) {
        console.error(`tried to send ${message}`);
        console.error(e);
    }
};

client.on("messageCreate", async msg => {
    if (msg.author.bot) return;
    const route = msg.content;
    try {
        const reis = formatteerReis(await planReis(multiReis(route)));
        await send(msg.channel, reis);
    } catch (e) {
        console.log(e);
        await send(msg.channel, e);
        msg.react("😕");
    }
});

client.login(process.env.DISCORD_API);