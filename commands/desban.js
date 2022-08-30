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
    connection.query("SELECT vrp_users.id,vrp_users.banned,vrp_users.ip,vrp_users.last_login,vrp_user_identities.user_id,vrp_user_identities.phone,vrp_user_identities.name,vrp_user_identities.firstname,vrp_user_identities.age FROM vrp_users,vrp_user_identities  WHERE vrp_users.id = vrp_user_identities.user_id AND vrp_users.id =?",args[0], function (err, result) {
        if(result[0].banned === 0){
            message.react('❌');
            message.channel.send('❌ | Este usuário não está banido!')
        }
        else if(result[0].banned === 1){
            const embed = new MessageEmbed()
                .setTitle(`Usuário Desbanido`)
                .setColor('BLACK')
                .setDescription(`Informações do usuário`)
                .addFields({name: 'Nome', value: `${result[0].name} ${result[0].firstname} (${result[0].id})`, inline: true},
                    {name: `Ultimo login`, value: `${result[0].last_login}`})
            message.react('✅');
            message.channel.send({embeds: [embed]})
        if (err){console.log(err);}
        connection.query("UPDATE vrp_users SET banned = 0 WHERE id = ?",args[0], function (err, result) {
            if (err){console.log(err);}
            })
}})}