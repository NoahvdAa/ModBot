const { GenericInfoEmbed } = require('../util/embedTemplates.js');

module.exports = (client, oldMessage, message) => {
	// Ignore all bots.
	if (message.author.bot) {
		return;
	}
	// Embed created, announcement published, etc.
	if (message.content === oldMessage.content) {
		return;
	}

	const embed = GenericInfoEmbed(message.author, 'Message edited!', '', message.createdAt)
		.addField('Old Content', oldMessage.content, false)
		.addField('New Content', message.content, false);

	client.channels.cache.get(client.config.staff_logs_channel).send({ embeds: [embed] });
};