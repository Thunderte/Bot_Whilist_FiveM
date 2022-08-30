const {Client, Message, MessageEmbed, Collection, DiscordAPIError, MessageActionRow, MessageButton, Routes} = require("discord.js");
require('dotenv').config()
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
  });
  connection.connect();
module.exports.run = async(client, message, args, member) => {
    module.exports.run = async(client, message, args, member) => {
        connection.query("UPDATE vrp_users SET banned = 0 WHERE id = ?",args[0], function (err, result) {
            if (err){console.log(err);}
            const embed = new MessageEmbed()
                      .setTitle(`Usuário Desbanido`)
                      .setColor('BLACK')
                      .addFields({name: `Id do usuário:`, value: args[0], inline: true})
                      message.channel.send({embeds: [embed]})
        })
    }
}