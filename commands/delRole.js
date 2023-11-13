const mysql = require('../utility/mysql.js');

module.exports = {

    name: "delRole",
    description: "Delete a registered role",
    execute: async (client, message, split) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) 
            return; //administrator required

            
        if (split.length < 3) {
            message.channel.send("Please specify a role to delete from the register")
            return
        }

        const role = message.mentions.roles.first();

        //check if is a role of the guild
        if (!message.guild.roles.cache.has(role.id)) {
            message.channel.send("This role seems to be not from this guild");
            return;
        }

    //#region SQL

        let _auth = {
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
          };

        //Insert the guild if not exists
        await mysql(`INSERT IGNORE INTO guilds (id) VALUES (?)`, [message.guild.id], _auth)

        //Delete the role
        await mysql(`DELETE FROM roles WHERE id=? and guild_id=?`, [role.id, message.guild.id], _auth)

    //#endregion

        message.channel.send("```" + `Role ${role.name} (${role.id}) removed` + "```")
        console.log(`[-] removed role ${role.name} (${role.id}) in ${message.guild.name} (${message.guild.id})`)
    }
}

    
