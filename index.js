const { Client, GatewayIntentBits } = require("discord.js");
const { token, prefix } = require("./config.json");
const fivemCommand = require("./fivem");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    fivemCommand.init(client);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/\s+/);
    const command = args.shift().toLowerCase();

    if (command === "fivem") {
        await fivemCommand.execute(message, client);
    }
});

client.login(token);
