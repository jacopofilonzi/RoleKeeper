const {Events} = require("discord.js")
const mysql = require("../utility/mysql.js")

module.exports = {
    EventName: Events.GuildDelete,
    Once: false,
    Execute: async (client, oldGuild) => {

        //Delete the guild if the option is enabled
        if (process.env.DELETEONLEAVE == "true")
            await mysql("DELETE FROM guilds WHERE id=?", [oldGuild.id])

        console.log(`[<-] Deleted guild ${oldGuild.name} (${oldGuild.id})`)
    }
}