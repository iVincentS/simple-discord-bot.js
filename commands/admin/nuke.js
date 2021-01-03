const Discord = require('discord.js')

module.exports = {
  name: "nuke",
  usage: "+nuke",
  description: "Nukes a channel.",
  userPerms: ["MANAGE_CHANNELS"],
run: async (client, message, args) => {
    let channel = client.channels.cache.get(message.channel.id)
var pos = channel.position;
  
  
  channel.clone().then((channel2) => {
    channel2.setPosition(pos)
    channel.delete()
    channel2.send("The Channel Has been Nuked!",{
    files: ['https://media.tenor.com/images/0754697c9c4dd44ca8504dbf1b36b927/tenor.gif']
    })
  })
    }
 }