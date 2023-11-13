const {Events} = require("discord.js")
const mysql = require("../utility/mysql.js")

module.exports = {
    EventName: Events.GuildCreate,
    Once: false,
    Execute: async (client, newGuild) => {
        
        let _auth = {
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
          };


        await mysql("INSERT IGNORE INTO guilds (id) VALUES (?)", [newGuild.id], _auth);
        console.log(`[->] Joined guild ${newGuild.name} (${newGuild.id})`)
    }
}