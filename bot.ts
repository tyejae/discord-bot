import startBot from 'discord-bot';

const config = {
  token: process.env.DISCORD_TOKEN,
  googleCseId: process.env.GOOGLE_CSE_ID,
  googleCseKey: process.env.GOOGLE_CSE_KEY,
  youtubeApiKey: process.env.YOUTUBE_API_KEY
};

startBot(config)
    .then(() => console.log('ready'));
