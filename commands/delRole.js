const mysql = require('../utility/mysql.js');

module.exports = {

    name: "delRole",
    description: "Delete a registered role",
    execute: async (client, message, split) => {

        //Continue only if an administrator called the command
        if (!message.member.permissions.has("ADMINISTRATOR")) 
            return; //administrator required

        //Check if the user specified a role
        if (split.length < 3) {
            message.channel.send("Please specify a role to delete from the register")
            return
        }

        //Get the role
        const role = message.mentions.roles.first();

        //Check if the role exists
        if (!role)
        return message.channel.send("Please specify a role to watch")
        
        //check if is a role of the guild
        if (!message.guild.roles.cache.has(role.id)) {
            message.channel.send("This role seems to be not from this guild");
            return;
        }

        //Insert the guild if not exists
        await mysql(`INSERT IGNORE INTO guilds (id) VALUES (?)`, [message.guild.id])

        //Delete the role
        await mysql(`DELETE FROM roles WHERE id=? and guild_id=?`, [role.id, message.guild.id])

        //Send a feedback message
        message.channel.send("```" + `Role ${role.name} (${role.id}) removed` + "```")
        console.log(`[-] removed role ${role.name} (${role.id}) in ${message.guild.name} (${message.guild.id})`)
    }
}

    
