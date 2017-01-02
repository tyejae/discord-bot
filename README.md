# Discord bot

A bot for discord.

[![Build Status](https://img.shields.io/travis/chadrien/discord-bot.svg?maxAge=2592000)](https://travis-ci.org/chadrien/discord-bot)
[![Test Coverage](https://img.shields.io/codeclimate/coverage/github/chadrien/discord-bot.svg?maxAge=2592000)](https://codeclimate.com/github/chadrien/discord-bot/coverage)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/chadrien/discord-bot/)

## Features

* help – Display available commands
* ping – PONG
* image me search-term – Get a random image from Google search
* animate me search-term – Get a random gif from Google search
* youtube me search-term – Get a random video from Youtube search

On DM the bot will directly answer to those commands, on group DM or channel, you have to "talk" to it
with `BOTNAME COMMAND` or `@BOTNAME COMMAND` (the `@` mention from discord).

## Run

Requirements:

* `node`
* a [discord token](https://discordapp.com/developers/applications/me)
* a Google Custom Search [ID and key](https://cse.google.com)
* a [Youtube API key](https://console.developers.google.com/apis/)

```bash
$ DISCORD_TOKEN="XXX" GOOGLE_CSE_ID="XXX" GOOGLE_CSE_KEY="XXX" YOUTUBE_API_KEY="XXX" BOT_NAME="NAME" npm start
```

### Deploying to [heroku](https://heroku.com/)


[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/chadrien/discord-bot/)

After the deployment is done, go to the `Resources` tab in your app dashboard and configure the `Heroku Scheduler` addon like this:

![](http://i.imgur.com/th6aBOg.png)
