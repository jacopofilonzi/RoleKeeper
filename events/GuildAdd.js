const {Events} = require("discord.js")
const mysql = require("../utility/mysql.js")

module.exports = {
    EventName: Events.GuildCreate,
    Once: false,
    Execute: async (client, newGuild) => {

        //Insert the guild if not exists
        await mysql("INSERT IGNORE INTO guilds (id) VALUES (?)", [newGuild.id]);
        console.log(`[->] Joined guild ${newGuild.name} (${newGuild.id})`)
    }
}