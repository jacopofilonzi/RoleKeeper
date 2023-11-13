const {Events} = require("discord.js")

module.exports = {
    EventName: Events.ClientReady,
    Once: true,
    Execute: (client) => {
        console.log("RoleKeeper connected")
    }

}