const {Events} = require("discord.js")

module.exports = {
    EventName: Events.ClientReady,
    Once: true,
    Execute: (client) => {

        console.log("[BOT] RoleKeeper connected")
        console.log(`[BOT] Logged in as: ${client.user.username} (${client.user.id})`)
        console.log("[BOT] invite url: " + "https://discord.com/oauth2/authorize?client_id=" + client.user.id + "&permissions=8&scope=bot")

    }
}