const {Events} = require("discord.js")

module.exports = {
    EventName: Events.ClientReady,
    Once: true,
    Execute: (client) => {
        console.log("RoleKeeper connected")
        console.log("Logged in as " + client.user.username)
        console.log("invite from here: " + "https://discord.com/oauth2/authorize?client_id=" + client.user.id + "&permissions=8&scope=bot")
    }
}