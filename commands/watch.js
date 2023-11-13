const mysql = require('../utility/mysql.js');

module.exports = {

    name: "watch",
    description: "Get the members with the role",
    execute: async (client, message, split) => {

        if (!message.member.permissions.has("ADMINISTRATOR")) 
            return; //administrator required

            
        if (split.length < 3) {
            message.channel.send("Please specify a role to watch")
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

        
        const {results} = await mysql("SELECT * FROM cache WHERE role_id=?",[role.id], _auth)
    
        let users = results.map(user => user.user_id);

        let text = `Users with the role: <@&${role.id}>\n`

        for (const userId of users) {
            text += `<@${userId}>\n`
        }

        message.channel.send(text)

    }
}

    
