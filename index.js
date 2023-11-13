console.clear();
require("./utility/check")()

const fs = require("fs")
const {Client, GatewayIntentBits} = require('discord.js');

//Startup checks


const client = new Client({
    intents:[
        GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences, //TO BE ACTIVATED IN THE BOT SETTINGS ON discord.com/developers
        GatewayIntentBits.GuildMembers, //TO BE ACTIVATED IN THE BOT SETTINGS ON discord.com/developers
        GatewayIntentBits.MessageContent //TO BE ACTIVATED IN THE BOT SETTINGS ON discord.com/developers
    ]
})


//#region LOAD EVENTS
let eventFiles = fs.readdirSync("./events/").filter(file => file.endsWith(".js"))


for (const eventPath of eventFiles) {
    const event = require(`./events/${eventPath}`)

    if (event.Once) //If needed once
        client.once(event.EventName, (...args) => event.Execute(client, ...args))
    else//If constantly needed to be triggered
        client.on(event.EventName,  (...args) => event.Execute(client, ...args))

}

//#endregion



//Connect
console.log("Booting up...")
client.login(process.env.BOT_TOKEN);