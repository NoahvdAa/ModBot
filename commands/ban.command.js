const { GenericErrorEmbed, IncorrectUsageEmbed, NoPermissionsEmbed } = require('../util/embedTemplates.js');
const { ban } = require('../util/punishmentExecutions.js');

module.exports.run = async (client, message, args) => {
	if (!message.member.permissions.has('BAN_MEMBERS'))
		return message.channel.send({ embeds: [NoPermissionsEmbed(message.author)] });

	if (args.length < 2 || message.mentions.users.size < 1)
		return message.channel.send({ embeds: [IncorrectUsageEmbed(message.author, '?ban <@user> <reason>')] });

	const banTarget = message.mentions.members.first();

	if (banTarget.id === message.author.id)
		return message.channel.send({ embeds: [GenericErrorEmbed(message.author, 'Invalid target!', `You can't ban yourself, silly!`)] });

	if (!banTarget.bannable)
		return message.channel.send({ embeds: [GenericErrorEmbed(message.author, 'Invalid target!', `I can't ban that user!`)] });

	args.shift();
	const reason = args.join(' ');

	ban(client, message, banTarget, message.author, reason);
}