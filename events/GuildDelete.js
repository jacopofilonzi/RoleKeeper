const {Events} = require("discord.js")
const mysql = require("../utility/mysql.js")

module.exports = {
    EventName: Events.GuildDelete,
    Once: false,
    Execute: async (client, oldGuild) => {
        
        let _auth = {
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
          };

          
        await mysql("DELETE FROM guilds WHERE id=?", [oldGuild.id], _auth)
        console.log(`[<-] Deleted guild ${oldGuild.name} (${oldGuild.id})`)
    }
}