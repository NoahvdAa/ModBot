const { Client, Collection } = require('discord.js');
const fs = require('fs');

const config = require('./config.json');

const client = new Client({
	intents: [
		'GUILDS',
		'GUILD_MEMBERS',
		'GUILD_MESSAGES'
	],
	presence: {
		status: 'dnd',
		activities: [
			{
				name: `${config.prefix}help`,
				type: 'WATCHING'
			}
		]
	}
});

// Load config.
client.config = config;

// Database connection.
client.knex = require('knex')({
	client: 'mysql2',
	connection: {
		host: client.config.database_host,
		user: client.config.database_user,
		password: client.config.database_password,
		database: client.config.database_name
	}
});

// Create punishment history table if it doesn't exist yet.
// @TODO: Move this to a migration.
client.knex.raw('CREATE TABLE IF NOT EXISTS `punishment_history` ( `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT, `user` VARCHAR(256) NOT NULL, `user_id` VARCHAR(32) NOT NULL , `type` VARCHAR(16) NOT NULL , `reason` VARCHAR(256) NOT NULL , `moderator` VARCHAR(256) NOT NULL , `moderator_id` VARCHAR(32) NOT NULL , `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP );').then(() => { });

// Load events.
fs.readdir('./events/', (err, files) => {
	if (err) {
		return console.error(err);
	}
	files.forEach((file) => {
		if (!file.endsWith('.event.js')) {
			return;
		}
		const event = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		console.log(`Loaded event: ${eventName}.`);
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});

client.commands = new Collection();

// Load commands.
fs.readdir('./commands/', (err, files) => {
	if (err) {
		return console.error(err);
	}
	files.forEach((file) => {
		if (!file.endsWith('.command.js')) {
			return;
		}
		let props = require(`./commands/${file}`);
		let commandName = file.split('.')[0];
		console.log(`Loaded command: ${commandName}.`);
		client.commands.set(commandName, props);
	});
});

// Finally, log in.
client.login(client.config.bot_token);