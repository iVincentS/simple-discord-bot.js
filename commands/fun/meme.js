const got = require("got");
const Discord = require("discord.js");

module.exports = {
    name: 'meme',
    aliases: ['memes'],
    cooldown: 5,
    description: 'sends meme',
    run: async(client, message, args) => {   

const subReddits = [
    "meme",
    "me_irl",
    "dankmeme",
    "AdviceAnimals",
    "dankmemes",
    "MemeEconomy",
    "ComedyCemetery",
    "memes",
    "PrequelMemes",
    "terriblefacebookmemes",
    "funny",
    "teenagers",
  ];
  const random = subReddits[Math.floor(Math.random() * subReddits.length)];

  const embed = new Discord.MessageEmbed();
  got(`https://www.reddit.com/r/${random}/random/.json`).then((response) => {
    let content = JSON.parse(response.body);
    let permalink = content[0].data.children[0].data.permalink;
    let memeUrl = `https://reddit.com${permalink}`;
    let memeImage = content[0].data.children[0].data.url;
    let memeTitle = content[0].data.children[0].data.title;
    let memeUpvotes = content[0].data.children[0].data.ups;
    let memeDownvotes = content[0].data.children[0].data.downs;
    let memeNumComments = content[0].data.children[0].data.num_comments;
    embed.setTitle(`${memeTitle}`);
    embed.setURL(`${memeUrl}`);
    embed.setImage(memeImage);
    embed.setColor("#ffc256")
    embed.setFooter(
      `👍 ${memeUpvotes} 👎 ${memeDownvotes} 💬 ${memeNumComments}`
    );
    message.channel.send(embed);
   });
  }
}
  