module.exports = rigidbot => {
	
	const bot = rigidbot.bot;
	const guilds = rigidbot.configs.guilds;
	const utils = rigidbot.utils;
	
	bot.on("messageDelete", message => {
		if (message.partial) return;
		guilds.delete(message.guild.id, "reactionroles", message.channel.id, message.id);
		if (!Object.keys(guilds.get(message.guild.id, "reactionroles", message.channel.id)).length) {
			guilds.delete(message.guild.id, "reactionroles", message.channel.id);
		}
	});
	bot.on("messageReactionAdd", async (reaction, user) => {
		if (reaction.message.partial) {
			try {
				reaction.message.fetch();
			} catch(e) {
				return;
			}
		}
		if (user.bot) return;
		const o = reaction.message;
		const g = o.guild.id;
		const c = o.channel.id;
		const m = o.id;
		const member = await o.guild.members.fetch(user.id);
		if (!guilds.has(g, "reactionroles", c, m)) return;
		const roles = guilds.get(g, "reactionroles", c, m);
		roles.forEach(pair => {
			if (utils.sameEmoji(utils.toEmoji(pair.emoji, o.guild), reaction.emoji)) {
				const role = o.guild.roles.cache.get(pair.role);
				if (role != null) {
					member.roles.add(role);
				}
			}
		});
	});
	bot.on("messageReactionRemove", async (reaction, user) => {
		if (reaction.message.partial) {
			try {
				reaction.message.fetch();
			} catch(e) {
				return;
			}
		}
		if (user.bot) return;
		const o = reaction.message;
		const g = o.guild.id;
		const c = o.channel.id;
		const m = o.id;
		const member = await o.guild.members.fetch(user.id);
		if (!guilds.has(g, "reactionroles", c, m)) return;
		const roles = guilds.get(g, "reactionroles", c, m);
		roles.forEach(pair => {
			if (utils.sameEmoji(utils.toEmoji(pair.emoji, o.guild), reaction.emoji)) {
				const role = o.guild.roles.cache.get(pair.role);
				if (role != null) {
					member.roles.remove(role);
				}
			}
		});
	});
	
};