const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
	const embed = new MessageEmbed()
		.setTitle('Available bot commands:')
		.addField(':star: Global Commands', 'These commands can be used by anyone.', false)
		.addField('?help', 'Shows all commands (this message).', true)
		.addField(':hammer_pick: Moderator Commands', 'These commands can only be used by moderators.', false)
		.addField('?ban <@user> <reason>', 'Bans the user for the specified reason.', true)
		.addField('?history <@user>', 'Shows all punishments the user has received.', true)
		.addField('?kick <@user> <reason>', 'Kicks the user for the specified reason.', true)
		.addField('?warn <@user> <reason>', 'Warns the user for the specified reason.', true)
		.setFooter(message.author.tag, message.author.avatarURL())
		.setTimestamp(new Date());

	message.reply({ embeds: [embed] });
};