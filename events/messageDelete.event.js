const { GenericInfoEmbed } = require('../util/embedTemplates.js');

module.exports = (client, message) => {
	// Ignore all bots.
	if (message.author.bot) return;
	const embed = GenericInfoEmbed(message.author, 'Message deleted!', '', message.createdAt)
		.addField('Content', message.content, false);

	client.channels.cache.get(client.config.staff_logs_channel).send({ embeds: [embed] });
};