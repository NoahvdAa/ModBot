const { GenericSuccessEmbed, IncorrectUsageEmbed, NoPermissionsEmbed, ProcessingCommandEmbed } = require('../util/embedTemplates.js');

module.exports.run = async (client, message, args) => {
	if (!message.member.permissions.has('KICK_MEMBERS'))
		return message.channel.send({ embeds: [NoPermissionsEmbed(message.author)] });

	if (args.length !== 1 || message.mentions.users.size !== 1)
		return message.channel.send({ embeds: [IncorrectUsageEmbed(message.author, '?history <@user>')] });

	const historyTarget = message.mentions.users.first();

	const waitingMsg = await message.channel.send({ embeds: [ProcessingCommandEmbed(message.author)] });

	const history = await client.knex('punishment_history').where({
		user_id: historyTarget.id
	});

	var historyMessage = '```';
	history.forEach(historyItem => {
		historyMessage += `• ${historyItem.type.toUpperCase()} door ${historyItem.moderator} (${historyItem.moderator_id}) op ${historyItem.date.toLocaleString()}: ${historyItem.reason}\n`;
	});
	historyMessage += '```';

	if (historyMessage === '``````')
		historyMessage = 'No punishments found!';

	waitingMsg.edit({ embeds: [GenericSuccessEmbed(message.author, `Punishment history of ${historyTarget.tag} (${historyTarget.id})`, historyMessage)] });
}