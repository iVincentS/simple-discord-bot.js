const { Client, Collection } = require("discord.js");
const { prefix, token } = require("./config.json")
const client = new Client({
    disableEveryone: true
})
const Discord = require("discord.js")

client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.once("ready", () => {
    console.log(`${client.user.username} is now online!`)
  client.user.setPresence({
activity: {
name: "#help | 10 Servers",
type: "WATCHING"
}, 
status: "online"
})
})

client.on("message", async message => {
   

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);

    if (!command) command = client.commands.get(client.aliases.get(cmd));


  if (command.clientPerms) {
      const missing = message.channel
        .permissionsFor(client.user)
        .missing(command.clientPerms);
      if (missing.length) {
        message.channel.send(
          `:x: I Do Not Have The Following Permissions:\n\n${missing.map(
            (missingPermission) =>
              `-[${missingPermission
                .replace(/\-|\_/gm, " ")
                .replace(/(\B\w)/gi, (lc) => lc.toLowerCase())}]`
          )}`
        );
        return false;
      }
    }

    if (command.userPerms) {
      const missing = message.channel
        .permissionsFor(message.author)
        .missing(command.userPerms);
      if (missing.length) {
        message.channel.send(
          `:x: You're missing the following permissions:\n\n${missing.map(
            (missingPermission) =>
              `-[${missingPermission
                .replace(/\-|\_/gm, " ")
                .replace(/(\B\w)/gi, (lc) => lc.toLowerCase())}]`
          )}`
        );
        return false;
      }
    }
    if (command) 
        command.run(client, message, args);
});


client.on('messageDelete', message => {
  const snipes = message.client.snipes.get(message.channel.id) || [];
  snipes.unshift({
    content: message.content,
    author: message.author,
    image: message.attachments.first()
      ? message.attachments.first().proxyURL
      : null,
    date: new Date().toLocaleString("en-GB", {
      dataStyle: "full",
      timeStyle: "short"
    })
  });
  snipes.slice(10);
  message.client.snipes.set(message.channel.id, snipes);
}); 


client.login(token);