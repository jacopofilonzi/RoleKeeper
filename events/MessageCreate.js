const {Events} = require("discord.js")
const fs = require("fs")

module.exports = {
    EventName: Events.MessageCreate,
    Once: false,
    Execute: (client, message) => {
        if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {

            //Remove content
            const split = message.content.split(" ");

            commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
            for (const commandPath of commandFiles) {
                let command = require("../commands/" + commandPath)

                if (command.name.toLowerCase() == split[1].toLowerCase())
                    command.execute(client, message, split)
            }
        }
    }


}