const {Events} = require("discord.js")
const mysql = require("../utility/mysql.js")

module.exports = {
    EventName: Events.GuildMemberUpdate,
    Once: false,
    Execute: async (client, oldMember, newMember) => {

        //Get the monitored roles in the server
        const {results: q1} = await mysql("SELECT * FROM roles WHERE guild_id = ?", [newMember.guild.id])

        //Map the roles
        let monitoredRoles = q1.map(role => role.id);
        let oldUserRoles = oldMember.roles.cache.map(role => role.id);
        let newUserRoles = newMember.roles.cache.map(role => role.id);

        //Foreach monitored role
        for (const role of monitoredRoles) {

            //If the role was added
            if (newUserRoles.includes(role) && !oldUserRoles.includes(role)) {
                await mysql(`INSERT IGNORE INTO cache (user_id, role_id) VALUES (?, ?)`, [newMember.user.id, role]);
            }

            //If the role was removed
            else if (!newUserRoles.includes(role) && oldUserRoles.includes(role)) {
                await mysql(`DELETE FROM cache WHERE user_id=? AND role_id=?`, [newMember.user.id, role]);
            }
        }


    }


}