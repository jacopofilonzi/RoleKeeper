const mysql = require('../utility/mysql.js');

module.exports = {

    name: "addRole",
    description: "Register a role to keep",
    execute: async (client, message, split) => {

        //Continue only if an administrator called the command
        if (!message.member.permissions.has("ADMINISTRATOR")) 
            return; //administrator required


        //Check if the user specified a role
        if (split.length < 3) {
            message.channel.send("Please specify a role to keep")
            return
        }

        //Get the role
        const role = message.mentions.roles.first();

        if (!role)//Check if the role exists
        return message.channel.send("Please specify a role to watch")
        
        //check if is a role of the guild
        if (!message.guild.roles.cache.has(role.id)) {
            message.channel.send("This role seems to be not from this guild");
            return;
        }

        //Insert the guild if not exists
        await mysql(`INSERT IGNORE INTO guilds (id) VALUES (?)`, [message.guild.id])

        //Insert the role if not exists
        await mysql(`INSERT IGNORE INTO roles (id, guild_id) VALUES (?, ?)`, [role.id, message.guild.id])

        //Map the query result
        const membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));

        //Add the role to every member with that role
        for (const member of membersWithRole) {
            const user_id = member[0];
            await mysql(`INSERT IGNORE INTO cache (user_id, role_id) VALUES (?, ?)`, [user_id, role.id]);
        }

        //Send a feedback message
        message.channel.send("```" + `Role ${role.name} (${role.id}) added` + "```")
        console.log(`[+] added role ${role.name} (${role.id}) in ${message.guild.name} (${message.guild.id})`)
    }
}

    
