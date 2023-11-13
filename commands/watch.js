const mysql = require('../utility/mysql.js');

module.exports = {

    name: "watch",
    description: "Get the members with the role",
    execute: async (client, message, split) => {

        let _auth = {
            host: process.env.MYSQL_HOST,
            database: process.env.MYSQL_DATABASE,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD
        };

        //Continue only if an administrator called the command
        if (!message.member.permissions.has("ADMINISTRATOR"))
            return; //administrator required

        //Get the role
        const role = message.mentions.roles.first();

        //If the user specify a role
        if (role) {
            //check if is a role of the guild
            if (!message.guild.roles.cache.has(role.id)) {
                message.channel.send("This role seems to be not from this guild");
                return;
            }

            //Get the users with the role
            const { results } = await mysql("SELECT * FROM cache WHERE role_id=?", [role.id], _auth)

            //Map the query result
            let users = results.map(user => user.user_id);

            //Create a message base
            let text = `Users with the role: <@&${role.id}>\n`

            //Add every user to the message
            for (const userId of users) {
                text += `<@${userId}>\n`
            }

            //Send the message
            message.channel.send(text)

        } else { //Give all the monitored role
                
                //Get the roles
                const { results } = await mysql("SELECT * FROM roles WHERE guild_id=?", [message.guild.id], _auth)
    
                //Map the query result
                let roles = results.map(role => role.id);
    
                //Create a message base
                let text = `Monitored roles:\n`
    
                //Add every role to the message
                for (const roleId of roles) {
                    let role = message.guild.roles.cache.get(roleId);
                    if (role) {
                        text += `<@&${roleId}> (${roleId})\n`
                    }
                }
    
                //Send the message
                message.channel.send(text)
        }

    }
}


