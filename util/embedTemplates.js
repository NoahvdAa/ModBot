const { MessageEmbed } = require('discord.js');

const embeds = {
	// Generic stuff.
	GenericErrorEmbed: (author, title, description, date = new Date()) => {
		return new MessageEmbed()
			.setTitle(title)
			.setColor(0xFF4136)
			.setDescription(description)
			.setFooter(author.tag, author.avatarURL())
			.setTimestamp(date);
	},
	GenericInfoEmbed: (author, title, description, date = new Date()) => {
		return new MessageEmbed()
			.setTitle(title)
			.setColor(0x001F3F)
			.setDescription(description)
			.setFooter(author.tag, author.avatarURL())
			.setTimestamp(date);
	},
	GenericSuccessEmbed: (author, title, description, date = new Date()) => {
		return new MessageEmbed()
			.setTitle(title)
			.setColor(0x2ECC40)
			.setDescription(description)
			.setFooter(author.tag, author.avatarURL())
			.setTimestamp(date);
	},
	// Progress updates.
	ProcessingCommandEmbed: (author) => {
		return embeds.GenericInfoEmbed(author, 'Executing action...', 'Please wait...');
	},
	// Errors.
	IncorrectUsageEmbed: (author, usage) => {
		return embeds.GenericErrorEmbed(author, 'Invalid command usage!', `\`${usage}\``);
	},
	NoPermissionsEmbed: (author) => {
		return embeds.GenericErrorEmbed(author, 'Not enough permissions!', `You don't have enough permissions to use this command!`);
	}
};

Object.freeze(embeds);

module.exports = embeds;