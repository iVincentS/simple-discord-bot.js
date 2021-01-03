const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "8ball",
  description: "There is a big chance I insult you!",
  category: "fun",
  cooldown: 5,
  run: async (client, message, args) => {
    const answers = [
      "It is certain.",
      "It is decidedly so.",
      "Without a doubt.",
      "Yes - definitely.",
      "You may rely on it.",
      "As I see it, yes.",
      "Most likely.",
      "Outlook good.",
      "Yes.",
      "Signs point to yes.",
      "Reply hazy, try again.",
      "Ask again later.",
      "Better not tell you now.",
      "Cannot predict now.",
      "Concentrate and ask again.",
      "Don't count on it.",
      "My reply is no.",
      "My sources say no.",
      "Outlook not so good.",
      "doubt",
      "lmao no",
      "yes 😅",
      "Very doubtful.",
    ];
        const question = args.join(" ");
        if (!question)
          return message.channel.send(
            "Please provide a question to ask"
          );
        let hex = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
        const embed = new MessageEmbed()
          .setTitle(":8ball:  Magic 8-Ball  :8ball:")
          .addField("Question", `\`${question}\``)
          .addField(
            "Answer",
            `\`${answers[Math.floor(Math.random() * answers.length)]}\``
          )
          .setFooter(
            message.member.displayName,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setColor('RANDOM');
        message.channel.send(embed);
      }
    }