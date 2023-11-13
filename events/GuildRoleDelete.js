const {Events} = require("discord.js")
const mysql = require("../utility/mysql.js")

module.exports = {
    EventName: Events.GuildRoleDelete,
    Once: false,
    Execute: (client, oldRole) => {

        let _auth = {
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
          };


        mysql(`DELETE FROM roles WHERE id=?`, [oldRole.id], _auth)
        console.log(`[-] Deleted role ${oldRole.name} (${oldRole.id}) from guild ${oldRole.guild.name} (${oldRole.guild.id})`)


    }


}