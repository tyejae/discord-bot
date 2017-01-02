const https = require('https');
const CronJob = require('cron').CronJob;

new CronJob('*/10 8-23 * * *', () => {
  https.get(process.env.HEROKU_KEEPALIVE_URL);
}, null, true, 'Europe/Paris');

console.log('cron running…');
