const { MessageEmbed } = require("discord.js")
const moment = require('moment')

module.exports = {
name: "ban",
category: "moderation",
description: "ban a user",
cooldown: 5,
userPerms: ["BAN_MEMBERS"],
botPerms: ["BAN_MEMBERS"],
run: async(client, message, args) => {  
const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
const reason = args.slice(1).join(" ")
        if (!args[0]) return message.channel.send(":x: | **You need to specify someone to ban.**")
        if (!member) return message.channel.send(":x: | **I can't find that member.**")
        if (member.id === message.author.id) return message.channel.send(":x: | **You can't ban yourself.**")
        if (member.roles.highest.position >= message.member.roles.highest.position && message.author.id !== message.guild.owner.id) {
            return message.channel.send(":x: | **You can\'t ban this member due to your role being lower than that members role.**")
        }
        if (member.bannable) {
            const embed = new MessageEmbed()
            .setAuthor(`${message.author.username} - (${message.author.id})`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
            .setColor(`RANDOM`)
            .setDescription(`
**Member:** ${member.user.username} - (${member.user.id})
**Reason:** ${reason || "None"}
            `)
        message.channel.send(embed)
        member.ban()
        } else {
            return message.channel.send(":x: | **I can\'t ban this user make sure I have permissions or that user role is lower than my role.**")
        }
        return undefined
    }
}