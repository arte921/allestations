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
        // const messages = formatteerReis(reis).split("\n").reduce((resultaatregels, line) => {
        //     const lengte = resultaatregels.at(-1).reduce((a, b) => a.length + b.length + 1, 0);
        //     if (lengte + line.length >= 1990) {
        //         return [...resultaatregels, [line]];
        //     } else {
        //         return [...resultaatregels.slice(0, -1), [...resultaatregels.at(-1), line]];
        //     }
        // }, [[]])
        // .map((regels) => regels.join("\n"));

        // for (const message of messages) {
        //     await msg.channel.send("```" + message + "```");
        // }

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
        
    }).catch(console.error);
    // }).catch((_) => msg.react("😕"));
});

client.login(process.env.DISCORD_API);