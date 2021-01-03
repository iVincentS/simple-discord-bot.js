const { MessageEmbed, Message } = require("discord.js")

module.exports = {
    name: "unlock",
    category: "moderation",
    description: "unlock a channel",
    userPerms: ["MANAGE_CHANNELS"],
    clientPerms: ["MANAGE_CHANNELS"],
    cooldown: 5,
    run: async(client, message, args) => {    
    let channel = message.mentions.channels.first()
    const reason = args.slice(1).join(" ")
    if(!channel) return message.channel.send(":x: | **Please specify a channel for Me to unlock!**")
 
   await message.mentions.channels.forEach(async channel => {

        if(channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === true) return message.channel.send(":x: | **That channel is already unlocked.**");
        try {
         await channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
        });

        const embed = new MessageEmbed()
        .setTitle(`Channel Unocked!`)
        .setDescription(
          `User \`${message.author.tag}\` has unlocked this channel!! Ya'll can chat now! `
        )
        .setColor(`RANDOM`)
        .addFields(
          { name: "Mod ID", value: `${message.author.id}`, inline: true },
          { name: "Mod Tag", value: `${message.author.tag}`, inline: true },
          { name: "Reason", value: `\`${reason || "None"}\``, inline: true },
        );
        channel.send(embed)
        message.channel.send(`✅ | **<#${channel.id}> has been successfully unlocked.**`)
        } catch(err) {
            console.log(err);
        }
    });
}
}