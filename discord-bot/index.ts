import { Client, Message, Channel, DMChannel, GroupDMChannel, TextChannel, User } from 'discord.js';
import createResponder, { PingModule, ImageModule, YoutubeModule } from 'discord-bot/responder';

export default (config: { token: string, googleCseId: string, googleCseKey: string, youtubeApiKey: string }) => new Promise(resolve => {

  const { token, googleCseId, googleCseKey, youtubeApiKey } = config;
  const client = new Client();
  const isMessageFromBot = (message: Message) => message.author.id === client.user.id;
  const messageMentionsBot = (message: Message) => message.mentions.users.find((user: User) => user.id === client.user.id);

  const responder = createResponder(
    PingModule(),
    ImageModule({ googleCseId, googleCseKey  }),
    YoutubeModule(youtubeApiKey)
  );

  client.on('message', (message: Message) => {
    if (!isMessageFromBot(message)) {
      const messageContent = message.content.replace(new RegExp(` ?<@${client.user.id}> ?`), '');

      // if not in DM and the bot is not explicitely mentionned, ignore
      if (!(message.channel instanceof DMChannel) && !messageMentionsBot(message)) return;

      responder.disptachMessage(messageContent, message.channel.id);
    }
  });

  responder.getReplyStream().subscribe(({ response, channelId }) => {
    const channel = client.channels.find((channel: Channel) => channel.id === channelId);
    if ( channel instanceof DMChannel
      || channel instanceof GroupDMChannel
      || channel instanceof TextChannel
    ) {
      channel.sendMessage(response);
    }
  });

  client.login(token);
  client.on('ready', () => resolve());

});
