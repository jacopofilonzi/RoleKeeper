const {Events} = require("discord.js")
const mysql = require("../utility/mysql.js")

module.exports = {
    EventName: Events.GuildRoleDelete,
    Once: false,
    Execute: (client, oldRole) => {

        //Delete the role from the database
        mysql(`DELETE FROM roles WHERE id=?`, [oldRole.id])
        console.log(`[-] Deleted role ${oldRole.name} (${oldRole.id}) from guild ${oldRole.guild.name} (${oldRole.guild.id})`)


    }


}