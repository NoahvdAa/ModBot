const { GenericInfoEmbed } = require('../util/embedTemplates.js');

module.exports = (client, member) => {
	const embed = GenericInfoEmbed(member.user, 'Member left!', `Sorry to see you leave, <@${member.id}>! :()`);

	client.channels.cache.get(process.env.WELCOME_GOODBYE_CHANNEL).send({ embeds: [embed] });
};