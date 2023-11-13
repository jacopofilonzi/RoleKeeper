const {Events} = require("discord.js");
const mysql = require("../utility/mysql.js");

module.exports = {
    EventName: Events.GuildMemberAdd,
    Once: false,
    Execute: async (client, newMember) => {

        //Get the roles
        const {results: q1} = await mysql(`
            SELECT role_id 
            FROM cache
            JOIN roles ON cache.role_id = roles.id 
            WHERE roles.guild_id = ? AND cache.user_id = ?;`,
        [newMember.guild.id, newMember.user.id])

        //Map the query result
        let userRoles = q1.map(role => role.role_id);

        //Add the roles to the user
        for (let roleId of userRoles) {
            let role = newMember.guild.roles.cache.get(roleId);
            if (role) {
                await newMember.roles.add(role);
            }
        }
    }


}