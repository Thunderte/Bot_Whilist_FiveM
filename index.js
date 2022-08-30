const { readFileSync } = require('fs')
const {Client, Message, MessageEmbed, Collection, DiscordAPIError, MessageActionRow, MessageButton, Routes} = require("discord.js");
const configuration = require('./configuration.json');
require('dotenv').config()
const fs = require("fs");
const color = require("colors");
const client = new Client({intents: ['GUILDS',
    'GUILD_MESSAGE_REACTIONS',
    'GUILD_MESSAGES',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_MEMBERS',
    'GUILD_PRESENCES']});
const config = require("./configuration.json");
client.config = config;

console.log(readFileSync( './assets/output.txt', 'utf8').toString())

  console.log(color.green('[BOT_WHITELIST] -'), color.blue('Se você tiver alguma dúvida sobre como usá-lo, me chame no Discord!'))
  console.log(color.green('[VERSÃO] -')+`BETA`)
  console.log(color.green('[CREDITS] -')+` Total créditos ao Thunderte#0001!`)
  console.log(color.yellow('[WARN] -')+` Não é permitido que se tire os créditos!`)

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Collection()

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
      console.log(color.green('[COMANDO] -'+` ${commandName} carregado`))
    client.commands.set(commandName, props);
  });
});

  console.log(color.green('[DEVELOPER] -')+('Thunderte#0001'))
client.login(process.env.TOKEN);
