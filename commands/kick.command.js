const { GenericErrorEmbed, IncorrectUsageEmbed, NoPermissionsEmbed } = require('../util/embedTemplates.js');
const { kick } = require('../util/punishmentExecutions.js');

module.exports.run = async (client, message, args) => {
	if (!message.member.permissions.has('KICK_MEMBERS'))
		return message.channel.send({ embeds: [NoPermissionsEmbed(message.author)] });

	if (args.length < 2 || message.mentions.users.size < 1)
		return message.channel.send({ embeds: [IncorrectUsageEmbed(message.author, '?kick <@user> <reason>')] });

	const kickTarget = message.mentions.members.first();

	if (kickTarget.id === message.author.id)
		return message.channel.send({ embeds: [GenericErrorEmbed(message.author, 'Invalid target!', `You can't kick yourself, silly!`)] });

	if (!kickTarget.kickable)
		return message.channel.send({ embeds: [GenericErrorEmbed(message.author, 'Invalid target!', `I can't kick that user!`)] });

	args.shift();
	const reason = args.join(' ');

	kick(client, message, kickTarget, message.author, reason);
}