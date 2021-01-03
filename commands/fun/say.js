const Discord = require('discord.js');

module.exports = {
    name: `say`,
    aliases: ['mimic'],
    category: `fun`,
    cooldown: 5,
  userPerms: ["MANAGE_CHANNELS"],
    description: `the bot will say the word u type`,
    run: async(client, message, args) => {
              try {
                  message.delete()
                  if (message.mentions.channels.first()) {
                    if(!args[1]) return message.reply(":x: | **Please provide a sentence**")
                      //gets the index of what channel you tagged
                      let channel = message.mentions.channels.first()
      
                      let index = message.content.indexOf(args[1])
                      //sends the message to your tagged channel and trims off the text before your first arg
                      await message.mentions.channels.first().send(message.content.trim().substring(index))
                      return message.channel.send(`✅ | **Sent the message on ${channel}**`)
                  } else {
                    message.delete()
                      //gets the index of your first arg
                      if(!args[0]) return message.reply(":x: | **Please provide a Sentence**")
                      let index = message.content.indexOf(args[0])
                      //trims off your command name and prefix then sends the message
                      await message.channel.send(`${message.content.trim().substring(index)}`)
                  }
              } catch (error) {
                  console.log(error)
              }
          }
      }