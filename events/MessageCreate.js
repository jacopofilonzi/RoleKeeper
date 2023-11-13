const {Events} = require("discord.js")
const fs = require("fs")

module.exports = {
    EventName: Events.MessageCreate,
    Once: false,
    Execute: (client, message) => {
        if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {

            //Remove content
            const split = message.content.split(" ");

            //Get all the commands
            commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"))
            
            //Loop through all the commands
            for (const commandPath of commandFiles) {
                //fetch the command
                let command = require("../commands/" + commandPath)

                //Check if the command is the one we need
                if (command.name.toLowerCase() == split[1].toLowerCase())
                    command.execute(client, message, split)
            }
        }
    }


}