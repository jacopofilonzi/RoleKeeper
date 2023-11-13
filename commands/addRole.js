const mysql = require('../utility/mysql.js');

module.exports = {

    name: "addRole",
    description: "Register a role to keep",
    execute: async (client, message, split) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) 
            return; //administrator required

            
        if (split.length < 3) {
            message.channel.send("Please specify a role to keep")
            return
        }



        const role = message.mentions.roles.first();

        if (!role)
        return message.channel.send("Please specify a role to watch")
        
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

        //Insert the role if not exists
        await mysql(`INSERT IGNORE INTO roles (id, guild_id) VALUES (?, ?)`, [role.id, message.guild.id], _auth)

        const membersWithRole = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));

        for (const member of membersWithRole) {
            const user_id = member[0];
            await mysql(`INSERT IGNORE INTO cache (user_id, role_id) VALUES (?, ?)`, [user_id, role.id], _auth);
        }

    //#endregion

        message.channel.send("```" + `Role ${role.name} (${role.id}) added` + "```")
        console.log(`[+] added role ${role.name} (${role.id}) in ${message.guild.name} (${message.guild.id})`)
    }
}

    
