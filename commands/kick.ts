import Eris from "eris";

export default function kickCommand(bot: Eris.Client, message: Eris.Message) {
  const user = message.mentions[0];
  
  if (!user) {
    bot.createMessage(message.channel.id, "Please mention a user to kick.");
    return;
  }
  
  const member = message.channel.guild.members.get(user.id);
  
  if (!member) {
    bot.createMessage(message.channel.id, "User is not a member of this server.");
    return;
  }
  
  if (!member.kickable) {
    bot.createMessage(message.channel.id, "I don't have permission to kick this user.");
    return;
  }
  
  member.kick()
    .then(() => {
      bot.createMessage(message.channel.id, `Kicked ${user.username}.`);
    })
    .catch((err) => {
      bot.createMessage(message.channel.id, `Error: ${err.message}`);
    });
}
