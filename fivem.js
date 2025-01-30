const axios = require("axios");

const SERVER_IP = "139.99.99.7";
const SERVER_PORT = "30135";

module.exports = {
    name: "fivem",
    description: "Check the FiveM server status.",
    
    async execute(message, client) {
        try {
            const embed = await fetchServerStatusEmbed();
            const statusMessage = await message.channel.send({ embeds: [embed] });

            // Update the embed every 60 seconds
            setInterval(async () => {
                try {
                    const updatedEmbed = await fetchServerStatusEmbed();
                    await statusMessage.edit({ embeds: [updatedEmbed] });
                } catch (error) {
                    console.error("Error updating server status:", error);
                }
            }, 60000); // 60 seconds
        } catch (error) {
            console.error("Error fetching server data:", error);
            message.channel.send(
                "Unable to fetch server status. Please try again later."
            );
        }
    },

    async init(client) {
        console.log("FiveM command initialized.");
    },
};

// Function to fetch server status and return an embed
async function fetchServerStatusEmbed() {
    try {
        const infoResponse = await axios.get(http://${SERVER_IP}:${SERVER_PORT}/info.json);
        const playersResponse = await axios.get(http://${SERVER_IP}:${SERVER_PORT}/players.json);

        const serverName = infoResponse.data.vars.sv_hostname || "Horizon RP";
        const maxPlayers = infoResponse.data.vars.sv_maxClients || 512;
        const playerList = playersResponse.data || [];
        const onlinePlayers = playerList.length;

        return {
            color: 0x3498db, // Blue color theme
            title: HORIZON RP | Server Status,
            thumbnail: {
                url: "https://media.discordapp.net/attachments/1138169331549753496/1297214850371551343/NEON_VARIANT.png",
            },
            fields: [
                { name: "Server Name", value: \\\${serverName}\\\`, inline: false },
                { name: "Server Status", value: \\\🟢 Online\\\`, inline: true },
                { name: "Online Players", value: \\\${onlinePlayers}/${maxPlayers}\\\`, inline: true },
                { name: "Restart Times", value: \\\11:00 AM , 06:00 PM\\\`, inline: false },
                { name: "F8 CONNECT COMMAND", value: \\\connect ${SERVER_IP}:${SERVER_PORT}\\\`, inline: false },
                { name: "Contact Us: Email", value: \\\samplemail@horizonrp.com\\\`, inline: false },
                { name: "OUR WEBSITE", value: >>> [horizonrp.in](https://horizonrp.in), inline: false },
            ],
            image: {
                url: "https://media.discordapp.net/attachments/1058072499633532969/1264518103165964323/horizon_rp_2.png",
            },
            footer: {
                text: HORIZON RP • Last updated,
                icon_url: "https://media.discordapp.net/attachments/1138169331549753496/1297214850371551343/NEON_VARIANT.png",
            },
            timestamp: new Date(),
        };
    } catch (error) {
        console.error("Error fetching server data:", error);
        throw new Error("Failed to fetch server status.");
    }
}
