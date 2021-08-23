const { ban, kick, warn } = require('../util/punishmentExecutions.js');

module.exports = (client, message) => {
	// Ignore all bots.
	if (message.author.bot) return;

	// Automod!
	client.config.autopunish.forEach(async autoPunishment => {
		var matched = false;
		autoPunishment.regex_triggers.forEach(trigger => {
			if (new RegExp(trigger).test(message.content))
				matched = true;
		});

		// No match!
		if (!matched) return;

		if (autoPunishment.delete) await message.delete();

		switch (autoPunishment.type) {
			case 'none':
			default:
				break;
			case 'ban':
				ban(client, message, message.member, client.user, autoPunishment.reason);
				break;
			case 'kick':
				kick(client, message, message.member, client.user, autoPunishment.reason);
				break;
			case 'warn':
				warn(client, message, message.member, client.user, autoPunishment.reason);
				break;
		}
	});

	if (message.content.indexOf(client.config.prefix) !== 0) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	// If that command doesn't exist, silently exit and do nothing.
	if (!cmd) return;

	// Run the command.
	cmd.run(client, message, args);
};