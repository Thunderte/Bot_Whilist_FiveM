const {Client, Message, MessageEmbed, Collection, DiscordAPIError, MessageActionRow, MessageButton, Routes} = require("discord.js");
require('dotenv').config()
const configuration = require('../configuration.json')
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});
  connection.connect();
module.exports.run = async(client, message, args, member) => {
    message.delete()
  const channel = await message.guild.channels.create(`whitelist_${message.author.username}`); //Arguments to set the channel name
    channel.send({content: 'Qual o seu nome?'}).then(msg => {
        let coletor_1 = channel.createMessageCollector({
            filter: mm => mm.author.id == message.author.id,
            max: 1
        });

        coletor_1.on("collect", (palavra_1) => {
                message.channel.bulkDelete(1);
                const nome = palavra_1.content

            msg.edit({content: 'Qual o seu sobrenome?'}).then(msg2 => {
                let coletor_2 = channel.createMessageCollector({
                    filter: mm => mm.author.id == message.author.id,
                    max: 1
                });

                coletor_2.on("collect", (palavra_2) => {
                   channel.bulkDelete(1);
                    const sobrenome = palavra_2.content

                    msg2.edit({content: 'Qual o seu id?'}).then(msg3 => {
                        let coletor_3 = channel.createMessageCollector({
                            filter: mm => mm.author.id == message.author.id,
                            max: 1
                        });

                        coletor_3.on("collect", (palavra_3) => {
                            channel.bulkDelete(1);
                            const id = palavra_3.content




                                connection.query("SELECT id FROM vrp_users WHERE id =?", id, function (err, result) {
                                  if (err){console.log(err);}
                                
                                
                                  
                                if(result.length > 0){
                                  connection.query("UPDATE vrp_users SET whitelisted=1 WHERE id=?",id, function (err, result) {
                                    if (err){console.log(err);}
                                    const person = message.member
                                    person.roles.add(configuration.id_cargo_whitelist)
                                  channel.send(`Setando cargos`)

                                message.member.setNickname(`${nome} ${sobrenome} | ${id}`)

                                setTimeout(() => {
                                  channel.delete()
                                         }, 100)
                                })}
                                else if(result.length === 0){
                                  channel.send('Esse usuário não existe!')
                                  setTimeout(() => {
                                    channel.delete()
                                           }, 2000)
                                }
                                }

    
                            )
                        })
                    })
                })
            })
        }
        )
      } 
  )}
                                