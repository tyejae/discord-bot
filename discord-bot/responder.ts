import { Subject } from 'rxjs';

export default (...modules: ((message: string) => Promise<string>)[]) => {
  const replies: Subject<{ response: string, channelId: string }> = new Subject();

  return {
    disptachMessage(message: string, channelId: string) {
      modules.forEach(module => {
        const response = module(message);
        Promise.resolve(response) // ensure with have a promise even if `module` just returned null
          .then(response => replies.next({ response, channelId }));
      });
    },

    getReplyStream() {
      return replies
        .filter(({ response }) => !!response);
    },
  };
};

export { default as PingModule } from 'discord-bot/responders/ping';
export { default as ImageModule } from 'discord-bot/responders/image';
export { default as YoutubeModule } from 'discord-bot/responders/youtube';
