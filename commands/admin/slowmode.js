const { MessageEmbed } = require("discord.js");
const ms = require("ms");
module.exports = {
    name: "slowmode",
    aliases: ['sm'],
    userPerms: ["MANAGE_CHANNELS"],
    clientPerms: ["MANAGE_CHANNELS"],
    category: "mod",
    cooldown: 5,
    description: "Set the slowmode for the channel!",
    run: async (bot, message, args) => {
  let channel = message.mentions.channels.first(),
      time = args.slice(1).join(" ");
  
  if (!channel) time = args.join(" "), channel = message.channel;
 
  
  if (args[0] === "off" || args[0] === "0s") {
    channel.setRateLimitPerUser(0);
    return message.channel.send(`✅ | **<#${channel.id}> slowmode has been deactivated.**`)
  }
  
  if (!time) return message.channel.send(":x: | **Please includes the time format, 1s, 1m, 1h**")
  
  let convert = ms(time); // This will results the milliseconds.
  let toSecond = Math.floor(convert / 1000);
  
  if (!toSecond || toSecond == undefined) return message.channel.send(":x: | **Please Specify a valid time format!**")
  
  if (toSecond > 21600) return message.channel.send(":x: | **Timer should be less than or equal to 6 hours.**")
  else if (toSecond < 1) return message.channel.send(":x: | **Timer should be more than or equal to 1 second.**")
  
  await channel.setRateLimitPerUser(toSecond);
    const embed = new MessageEmbed()
    .setTimestamp()
    .setColor(`BLACK`)
    .setFooter(`Slowmode has been set to 1 message every ${ms(ms(time), {long: true})}.`)
    .setTitle(`${message.author.tag} has set a slowmode to this channel.`)
    .addFields(
        { name: "✅ Moderator", value: `${message.author.tag}`, inline: true },
        { name: "⏰ Slowmode", value: `${ms(ms(time), {long: true})}.`, inline: true },
      );
    channel.send(embed);
}
}