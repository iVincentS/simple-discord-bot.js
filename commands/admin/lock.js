const { MessageEmbed, Message } = require("discord.js")

module.exports = {
    name: "lock",
    category: "moderation",
    userPerms: ["MANAGE_CHANNELS"],
    clientPerms: ["MANAGE_CHANNELS"],
    description: "lock a channel",
    cooldown: 5,
    run: async(client, message, args) => {    
    let channel = message.mentions.channels.first()
    const reason = args.slice(1).join(" ")
    if(!channel) return message.channel.send(":x: | **Please specify a channel for Me to lock!**")
 
   await message.mentions.channels.forEach(async channel => {

        if(channel.permissionsFor(message.guild.id).has("SEND_MESSAGES") === false) return message.channel.send("<:TickNo:766675326969315348> | **That channel is already locked.**");
        try {
         await channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
        });

        const embed = new MessageEmbed()
        .setTitle(`Channel Locked!`)
        .setDescription(
          `User \`${message.author.tag}\` has locked this channel!! `
        )
        .setColor(`BLACK`)
        .addFields(
          { name: "Mod ID", value: `${message.author.id}`, inline: true },
          { name: "Mod Tag", value: `${message.author.tag}`, inline: true },
          { name: "Reason", value: `\`${reason || "None"}\``, inline: true },
        );
        channel.send(embed)
        message.channel.send(`✅ | **<#${channel.id}> has been locked.**`)
        } catch(err) {
            console.log(err);
        }
    });
}
}