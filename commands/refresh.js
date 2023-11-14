const mysql = require('../utility/mysql.js');

module.exports = {

    name: "refresh",
    description: "Refresh the role cache",
    execute: async (client, message, split) => {

        //Continue only if an administrator called the command
        if (!message.member.permissions.has("ADMINISTRATOR")) 
            return; //administrator required

        let msg = await message.channel.send("```" + `⏳️Refreshing role cache...` + "```")

        //Insert the guild if not exists
        await mysql(`INSERT IGNORE INTO guilds (id) VALUES (?)`, [message.guild.id])

        //Get the roles
        const {results: rolesIds} = await mysql(`SELECT id FROM roles WHERE guild_id=?`, [message.guild.id])
        //map roles
        const roles = rolesIds.map(role => message.guild.roles.cache.get(role.id))


        //foreach user
        for (const member of message.guild.members.cache.values()) {
            console.log("ciao")
            //foreach role
            for (const role of roles) {
                //if the member has the role
                if (member.roles.cache.has(role.id))
                    await mysql("INSERT IGNORE INTO cache (user_id, role_id) VALUES (?, ?)", [member.id, role.id])
                else//if the member doesn't have the role
                    await mysql("DELETE FROM cache WHERE user_id=? AND role_id=?", [member.id, role.id])
            }
        }

        //Send a feedback message
        msg.edit("```" + `✅️Role cache refreshed` + "```")
        console.log(`[\\] refreshed role cache in ${message.guild.name} (${message.guild.id})`)
    }
}

    
