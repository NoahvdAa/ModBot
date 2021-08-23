const { GenericErrorEmbed, GenericSuccessEmbed, ProcessingCommandEmbed } = require('../util/embedTemplates.js');

const punishmentExecutions = {
	ban: async (client, message, target, moderator, reason) => {
		const waitingMsg = await message.channel.send({ embeds: [ProcessingCommandEmbed(moderator)] });

		await client.knex('punishment_history').insert({
			user: target.user.tag,
			user_id: target.id,
			type: 'ban',
			reason,
			moderator: moderator.tag,
			moderator_id: moderator.id,
			date: new Date()
		});

		const previousPunishmentsCount = (await client.knex('punishment_history').where({
			user_id: target.id
		}).count({ count: '*' }))[0].count;

		try {
			await target.send({ embeds: [GenericErrorEmbed(moderator, 'You have been banned!', `You have been banned by <@${moderator.id}> (${moderator.tag}): \`${reason}\`.`)] });
		} catch (e) {
			// Swallow, they might have DMS disabled.
		}

		await target.ban({
			reason: `${moderator.tag} (${moderator.id}) • ${new Date().toLocaleString()} • ${reason}`
		});

		waitingMsg.edit({ embeds: [GenericSuccessEmbed(moderator, 'User banned!', `:raised_hands: \`${target.user.tag} (${target.id})\` has been banned: \`${reason}\`! [punished ${previousPunishmentsCount} time${previousPunishmentsCount === 1 ? '' : 's'}]`)] });
	},
	kick: async (client, message, target, moderator, reason) => {
		const waitingMsg = await message.channel.send({ embeds: [ProcessingCommandEmbed(moderator)] });

		await client.knex('punishment_history').insert({
			user: target.user.tag,
			user_id: target.id,
			type: 'kick',
			reason,
			moderator: moderator.tag,
			moderator_id: moderator.id,
			date: new Date()
		});

		const previousPunishmentsCount = (await client.knex('punishment_history').where({
			user_id: target.id
		}).count({ count: '*' }))[0].count;

		try {
			await target.send({ embeds: [GenericErrorEmbed(moderator, 'You have been kicked!', `You have been kicked by <@${moderator.id}> (${moderator.tag}): \`${reason}\`. This isn't a ban! You can join the server again, as long as you follow the rules.`)] });
		} catch (e) {
			// Swallow, they might have DMS disabled.
		}

		await target.kick(`${moderator.tag} (${moderator.id}) • ${new Date().toLocaleString()} • ${reason}`);

		waitingMsg.edit({ embeds: [GenericSuccessEmbed(moderator, 'User kicked!', `:raised_hands: \`${target.user.tag} (${target.id})\` has been kicked: \`${reason}\`! [punished ${previousPunishmentsCount} time${previousPunishmentsCount === 1 ? '' : 's'}]`)] });
	},
	warn: async (client, message, target, moderator, reason) => {
		const waitingMsg = await message.channel.send({ embeds: [ProcessingCommandEmbed(moderator)] });

		await client.knex('punishment_history').insert({
			user: target.user.tag,
			user_id: target.id,
			type: 'warn',
			reason,
			moderator: moderator.tag,
			moderator_id: moderator.id,
			date: new Date()
		});

		const previousPunishmentsCount = (await client.knex('punishment_history').where({
			user_id: target.id
		}).count({ count: '*' }))[0].count;

		const previousWarnsCount = (await client.knex('punishment_history').where({
			user_id: target.id,
			type: 'warn'
		}).count({ count: '*' }))[0].count;

		try {
			await target.send({ embeds: [GenericErrorEmbed(moderator, 'You have been warned!', `You have been warned by <@${moderator.id}> (${moderator.tag}): \`${reason}\`.`)] });
		} catch (e) {
			// Swallow, they might have DMS disabled.
		}

		waitingMsg.edit({ embeds: [GenericSuccessEmbed(moderator, 'User warned!', `:raised_hands: \`${target.user.tag} (${target.id})\` has been warned: \`${reason}\`! [punished ${previousPunishmentsCount} time${previousPunishmentsCount === 1 ? '' : 's'}, of which ${previousWarnsCount} warning${previousWarnsCount === 1 ? '' : 's'}]`)] });
	}
}

Object.freeze(punishmentExecutions);

module.exports = punishmentExecutions;