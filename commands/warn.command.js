const { GenericErrorEmbed, IncorrectUsageEmbed, NoPermissionsEmbed } = require('../util/embedTemplates.js');
const { warn } = require('../util/punishmentExecutions.js');

module.exports.run = async (client, message, args) => {
	if (!message.member.permissions.has('KICK_MEMBERS'))
		return message.channel.send({ embeds: [NoPermissionsEmbed(message.author)] });

	if (args.length < 2 || message.mentions.users.size < 1)
		return message.channel.send({ embeds: [IncorrectUsageEmbed(message.author, '?warn <@user> <reason>')] });

	const warnTarget = message.mentions.members.first();

	if (warnTarget.id === message.author.id)
		return message.channel.send({ embeds: [GenericErrorEmbed(message.author, 'Invalid target!', `You can't warn yourself, silly!`)] });

	args.shift();
	const reason = args.join(' ');

	warn(client, message, warnTarget, message.author, reason);
}