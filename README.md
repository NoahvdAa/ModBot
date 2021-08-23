# ModBot

A simple discord moderation bot featuring keyword based kicks/bans, punishment history and more!

This bot is intended to be used as a "template" to create a bot for a single server. **This bot is not designed to be used in multiple servers!**

## Installation

1. Install all required packages by running `npm install`.
1. Copy config.example.json to config.json.
1. Configure the bot as described in the configuration section.
1. Run the bot with `npm start`.

## Configuration

After copying config.example.json to config.json, it's time to change some settings.

- bot_token: This is your discord bot token. I **strongly** recommend using a bot that has "Public Bot" set to false in the Discord application settings. This way, only you will be able to invite it into your server.
- prefix: This is quite self-explanatory. Set this to a prefix of your choice.
- staff_logs_channel: The ID of the channel staff logs will be sent to. This (currently) can't be left empty. If you don't want to use the logging capabilities, delete `events/messageDelete.event.js`and `events/messageUpdate.event.js`.
- welcome_goodbye_channel: The ID ofthe channel to send welcome and goodbye messages to. This (currently) can't be left empty. If you don't want to use the logging capabilities, delete `events/guildMemberAdd.event.js`and `events/guildMemberRemove.event.js`.
- database_*: Connection information related to the MariaDB/MySQL database to use for your bot. Make sure the bot has permissions to select, insert and create tables.
- autopunish: Autopunish allows you to automatically punish people when their message matches a regular expression. The autopunish config option is an array containing objects following this format:
	- type: The type of punishment to issue. This can be `none`, `ban`, `kick` or `warn`. If an invalid value is provided, `none` will be used.
	- delete: Whether or not to delete the message if a punishment is issued. This can be `true` or `false`.
	- staff_bypass: Whether or not staff (manage messages permissions) can bypass this automatic punishmment. This can be `true` or `false`.
	- reason: The punishment reason to use if a punishment is issued.
	- regex_triggers: An array of regexes that will trigger this punishment, if the regex matches with the message content.